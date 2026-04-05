#!/usr/bin/env bash
#
# validate-specs.sh — Validate that spec.md files follow the correct format.
#
# Checks each spec file under openspec/specs/ for:
#   1. Top-level heading (# title)
#   2. At least one requirement ID matching REQ-[A-Z]+-[A-Z]*-?\d+
#   3. Each requirement has an enforcement level keyword (MUST, SHOULD, CONSIDER, or LEARN)
#   4. "Why This Matters" sections
#   5. "Platform Notes" or "Platform Implementation Notes" or "Platform" sections
#   6. "Source", "Sources", or "Further Reading" references
#
# Exit code: 0 if all specs pass, 1 if any fail.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SPECS_DIR="$REPO_ROOT/openspec/specs"

if [[ ! -d "$SPECS_DIR" ]]; then
  echo "ERROR: Specs directory not found: $SPECS_DIR"
  exit 1
fi

TOTAL=0
PASSED=0
FAILED=0

REQ_ID_PATTERN='REQ-[A-Z0-9]+-[A-Z]*-?[0-9]+'

# Collect all spec files
mapfile -t SPEC_FILES < <(find "$SPECS_DIR" -name 'spec.md' -type f | sort)

if [[ ${#SPEC_FILES[@]} -eq 0 ]]; then
  echo "ERROR: No spec.md files found under $SPECS_DIR"
  exit 1
fi

for spec_file in "${SPEC_FILES[@]}"; do
  TOTAL=$((TOTAL + 1))
  rel_path="${spec_file#"$REPO_ROOT"/}"
  issues=()

  content="$(cat "$spec_file")"

  # 1. Check for top-level heading (# title)
  if ! echo "$content" | grep -qE '^# [^ ]'; then
    issues+=("Missing top-level heading (# title)")
  fi

  # 2. Check for at least one requirement ID
  req_ids="$(echo "$content" | grep -oE "$REQ_ID_PATTERN" || true)"
  if [[ -z "$req_ids" ]]; then
    issues+=("No requirement IDs found (expected pattern: REQ-XXX-NNN)")
  fi

  # 3. Check that each requirement heading has an enforcement level keyword
  # Requirements are defined as ### REQ-... headings; each should have MUST, SHOULD, CONSIDER, or LEARN nearby
  # Also check LEARN sections (### LEARN:) which are valid enforcement-level sections
  req_headings="$(echo "$content" | grep -E "^### ${REQ_ID_PATTERN}" || true)"
  if [[ -n "$req_headings" ]]; then
    while IFS= read -r heading; do
      req_id="$(echo "$heading" | grep -oE "$REQ_ID_PATTERN")"
      # Look for enforcement level in the lines following the heading (within ~5 lines)
      # The pattern is: **Enforcement:** `MUST` or similar
      section="$(echo "$content" | sed -n "/^### ${req_id}/,/^### /p" | head -20)"
      if ! echo "$section" | grep -qiE '(MUST|SHOULD|CONSIDER|LEARN)'; then
        issues+=("Requirement $req_id missing enforcement level (MUST/SHOULD/CONSIDER/LEARN)")
      fi
    done <<< "$req_headings"
  fi

  # 4. Check for "Why This Matters" sections
  if ! echo "$content" | grep -qiE '#+.*Why This Matters'; then
    issues+=("Missing 'Why This Matters' section(s)")
  fi

  # 5. Check for Platform sections
  if ! echo "$content" | grep -qiE '#+.*(Platform Notes|Platform Implementation Notes|Platform)'; then
    issues+=("Missing 'Platform Notes' or 'Platform' section(s)")
  fi

  # 6. Check for Source / Sources / Further Reading references
  if ! echo "$content" | grep -qiE '#+.*(Sources?|Further Reading|References)'; then
    issues+=("Missing 'Source', 'Sources', or 'Further Reading' section")
  fi

  # Report results
  if [[ ${#issues[@]} -eq 0 ]]; then
    echo "PASS: $rel_path"
    PASSED=$((PASSED + 1))
  else
    echo "FAIL: $rel_path"
    for issue in "${issues[@]}"; do
      echo "  - $issue"
    done
    FAILED=$((FAILED + 1))
  fi
done

echo ""
echo "========================================="
echo "Summary: $PASSED/$TOTAL specs passed"
if [[ $FAILED -gt 0 ]]; then
  echo "$FAILED spec(s) failed validation."
  exit 1
else
  echo "All specs passed validation."
  exit 0
fi
