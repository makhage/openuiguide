# Versioning Strategy

OpenUI Guide uses semantic versioning to communicate the nature and impact of changes to downstream projects that depend on these specs.

## Version Format

```
MAJOR.MINOR.PATCH
```

The current version is tracked in `openspec/project.md`.

---

## Version Increment Rules

### MAJOR (breaking changes)

Increment MAJOR when a change could cause a previously compliant project to become non-compliant, or when guidance that projects relied on is removed.

Specific triggers:

- **Removing a requirement.** Any requirement that existed in a previous version is deleted.
- **Raising an enforcement level.** A requirement moves to a stricter level:
  - `CONSIDER` to `SHOULD`
  - `CONSIDER` to `MUST`
  - `SHOULD` to `MUST`
  - `LEARN` to any actionable level
- **Changing a MUST threshold to be more restrictive.** For example, raising a minimum contrast ratio from 4.5:1 to 7:1.
- **Renaming or splitting a spec category** in a way that changes requirement IDs.
- **Changing the requirement format** in a way that invalidates existing tooling.

MAJOR changes reset MINOR and PATCH to zero (e.g., 1.4.2 becomes 2.0.0).

### MINOR (additive changes)

Increment MINOR when new content is added but nothing existing is removed or made stricter.

Specific triggers:

- **Adding a new requirement** to an existing spec.
- **Adding a new spec category** with its own set of requirements.
- **Lowering an enforcement level.** A requirement moves to a less strict level:
  - `MUST` to `SHOULD`
  - `MUST` to `CONSIDER`
  - `SHOULD` to `CONSIDER`
  - Any actionable level to `LEARN`
- **Adding a new platform** to the Supported Platforms table.
- **Adding new platform notes** to an existing requirement that previously had none for that platform.

MINOR changes reset PATCH to zero (e.g., 1.4.2 becomes 1.5.0).

### PATCH (non-breaking refinements)

Increment PATCH when no requirements are added, removed, or changed in enforcement.

Specific triggers:

- **Clarifying existing text** without changing its meaning or enforcement.
- **Fixing typos** or grammatical errors.
- **Adding or updating platform notes** for platforms already covered.
- **Improving "Why This Matters" explanations** for educational quality.
- **Adding entries to "Common Mistakes" or "How to Fix"** sections.
- **Updating source links** (e.g., a URL changed but the reference is the same).
- **Adding items to "Further Reading"** sections.

PATCH changes increment only the patch number (e.g., 1.4.2 becomes 1.4.3).

---

## How Projects Can Pin to a Version

Downstream projects that adopt OpenUI Guide can pin to a specific version to ensure stability.

### Pinning strategies

**Pin to exact version:**

```
openuiguide: 1.4.2
```

Use this when you need full reproducibility. You will not receive any updates until you manually upgrade.

**Pin to minor version:**

```
openuiguide: ~1.4
```

Use this to receive PATCH updates (clarifications and fixes) automatically while avoiding new requirements. This is the recommended approach for most projects.

**Pin to major version:**

```
openuiguide: ^1
```

Use this to receive both PATCH and MINOR updates (new requirements, new categories) automatically. Existing requirements will not change enforcement level upward.

### Referencing a version

When referencing the spec in tooling, documentation, or configuration, always include the version:

```
# In your project configuration
openuiguide_version: "1.4.2"

# In documentation
"This project follows OpenUI Guide v1.4 specs."

# In code comments
# Compliant with REQ-A11Y-P-001 (OpenUI Guide v1.4.2)
```

---

## Changelog Format

The changelog is maintained in `CHANGELOG.md` at the repository root. Every release gets an entry following this format:

```markdown
## [MAJOR.MINOR.PATCH] - YYYY-MM-DD

### Added
- REQ-CATEGORY-NNN: Short name — brief description of the new requirement
- New spec category: [Category Name]

### Changed
- REQ-CATEGORY-NNN: Enforcement level changed from SHOULD to MUST
- REQ-CATEGORY-NNN: Threshold updated from X to Y

### Removed
- REQ-CATEGORY-NNN: [Reason for removal]

### Fixed
- REQ-CATEGORY-NNN: Clarified wording in "The Rule" section
- REQ-CATEGORY-NNN: Fixed incorrect source reference

### Migration
[For MAJOR versions only — see Migration Guide Format below]
```

### Changelog rules

- List every individual requirement affected, by ID.
- Group changes under the correct heading (Added, Changed, Removed, Fixed).
- Order entries by requirement ID within each group.
- Link each version header to the corresponding git tag.
- The "Unreleased" section at the top tracks changes not yet in a release.

Example:

```markdown
## [Unreleased]

### Added
- REQ-TYPO-008: Line height for body text

## [1.5.0] - 2026-03-15

### Added
- REQ-MOTION-004: Reduced motion media query support
- REQ-MOTION-005: Animation duration limits
- New spec category: Loading & Performance

### Fixed
- REQ-COLOR-003: Clarified that contrast ratios apply to the computed color, not the CSS value

## [1.4.2] - 2026-02-28

### Fixed
- REQ-A11Y-P-001: Updated WCAG source link to point to WCAG 2.2 instead of 2.1
- REQ-SPACE-003: Fixed typo in Platform Notes for SwiftUI
```

---

## Migration Guide Format

Every MAJOR version release must include a migration guide. This guide lives in the `migrations/` directory:

```
migrations/v1-to-v2.md
migrations/v2-to-v3.md
```

### Migration guide structure

```markdown
# Migration Guide: v[OLD] to v[NEW]

## Overview

[1-2 paragraphs summarizing the nature and scope of the breaking changes.]

## Breaking Changes

### Removed Requirements

| ID | Name | Reason | Alternative |
|----|------|--------|-------------|
| REQ-XXX-NNN | ... | ... | ... or "None" |

### Enforcement Level Changes

| ID | Name | Old Level | New Level | Action Required |
|----|------|-----------|-----------|-----------------|
| REQ-XXX-NNN | ... | SHOULD | MUST | [What to do] |

### Threshold Changes

| ID | Name | Old Value | New Value | Action Required |
|----|------|-----------|-----------|-----------------|
| REQ-XXX-NNN | ... | 4.5:1 | 7:1 | [What to do] |

## Step-by-Step Migration

1. [First thing to check or change]
2. [Second thing to check or change]
3. ...

## Tooling Updates

[Any changes needed in linting rules, CI configuration, or review tool settings.]

## Timeline

- **Release date:** YYYY-MM-DD
- **Recommended migration deadline:** YYYY-MM-DD (typically 3-6 months after release)
- **Previous version support ends:** YYYY-MM-DD
```

### Migration guide rules

- Every removed requirement must list an alternative or explicitly state "None."
- Every enforcement level increase must include concrete action steps.
- The guide must be reviewable independently of the changelog — include enough context to understand each change.
- Keep the tone helpful and constructive. Migration should feel like an upgrade, not a burden.
