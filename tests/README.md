# Design Review Test Suite

Test the design review skill against known-good and known-bad UI to verify accuracy before using it on real projects.

## Test Cases

### 1. Good UI (`tests/good-ui/`)
A professional dashboard that follows all best practices. The review tool should:
- Score **85-95** (A/B grade)
- Flag **0 MUST errors** (any MUST finding = false positive)
- Flag at most **2-5 SHOULD warnings** (minor polish items)
- Detect **0 anti-patterns**

### 2. Bad UI (`tests/bad-ui/`)
A hastily-built dashboard with 22 intentional issues. The review tool should:
- Score **30-45** (D/F grade)
- Flag **8-15 MUST errors** (all 12 intentional violations)
- Flag **5-12 SHOULD warnings**
- Detect **3 anti-patterns** (AP-001, AP-003, AP-009)

## How to Run Tests

### Manual Test
```bash
# Copy test files to a temp project
mkdir -p /tmp/test-good && cp tests/good-ui/* /tmp/test-good/
cp -r .claude /tmp/test-good/.claude
cp -r openspec /tmp/test-good/openspec

# Run review
cd /tmp/test-good && claude "/design-review --score"

# Compare score against expected: 85-95
# Check: are any MUST violations flagged? (they shouldn't be)
```

```bash
# Same for bad UI
mkdir -p /tmp/test-bad && cp tests/bad-ui/* /tmp/test-bad/
cp -r .claude /tmp/test-bad/.claude
cp -r openspec /tmp/test-bad/openspec

cd /tmp/test-bad && claude "/design-review --score"

# Compare against expected: 30-45
# Check: did it catch all 12 MUST violations?
```

### What to Check

| Test | Pass Criteria | Fail Criteria |
|------|--------------|---------------|
| Good UI score | 85-100 | Below 80 (too strict) |
| Good UI MUST errors | 0 | Any MUST error (false positive) |
| Bad UI score | 25-50 | Above 60 (too lenient) |
| Bad UI MUST catches | All 12 found | Missed 3+ (false negative) |
| Bad UI anti-patterns | 3 found | Missed 2+ |

### Expected Results

See `tests/expected-results/` for detailed expected findings:
- `good-ui.json` — what should and should NOT be flagged
- `bad-ui.json` — what MUST be caught

## Calibration

If the tool fails tests:

**Too many false positives (good UI scores low):**
- Confidence threshold is too low — raise to 80+
- Rules are too strict for the context — check aesthetic direction
- SKILL.md is too long and agents aren't processing instructions well

**Too many false negatives (bad UI scores high):**
- Confidence threshold is too high — lower to 60
- Agents aren't reading spec files thoroughly
- Anti-pattern detection is too weak

**Fixes suggestions are wrong (makes UI worse):**
- The fix suggestions in spec files may be too generic
- Need more context-aware fixes that consider existing design
- The auto-fix mode should show before/after and ASK before applying

## Known Issues to Watch For

1. **Over-fixing:** The tool suggests changes that conflict with each other
2. **Context blindness:** Flagging dark-only themes when the user intentionally chose dark
3. **Aesthetic mismatch:** Suggesting rounded corners on a deliberately sharp design
4. **Generic fixes:** Suggesting the same fix for every project regardless of context
5. **Cascade damage:** Fixing one CSS rule breaks 5 other elements
