# Contributing to OpenUI Guide

Thank you for your interest in contributing to OpenUI Guide. This document explains how to propose changes, add requirements, and maintain the quality standards that make this project useful for developers and AI assistants alike.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Adding a Requirement to an Existing Spec](#adding-a-requirement-to-an-existing-spec)
- [Proposing a New Spec Category](#proposing-a-new-spec-category)
- [The Change Proposal Process](#the-change-proposal-process)
- [Requirement ID Format](#requirement-id-format)
- [Enforcement Level Guidelines](#enforcement-level-guidelines)
- [Spec File Format Requirements](#spec-file-format-requirements)
- [Testing Your Changes](#testing-your-changes)
- [Pull Request Guidelines](#pull-request-guidelines)

---

## Code of Conduct

All contributors are expected to follow our Code of Conduct. We are committed to providing a welcoming and inclusive experience for everyone. Be respectful, constructive, and professional in all interactions. Harassment, discrimination, and hostile behavior will not be tolerated.

If you witness or experience unacceptable behavior, please report it to the project maintainers.

---

## Getting Started

1. Fork the repository and clone your fork locally.
2. Read `openspec/project.md` to understand the project philosophy, enforcement levels, requirement format, and design constraints.
3. Browse the existing specs in `openspec/specs/` to see examples of the expected format and tone.
4. Read `VERSIONING.md` to understand how changes affect the project version number.

---

## Adding a Requirement to an Existing Spec

To add a new requirement to a spec that already exists:

1. **Identify the correct spec file.** Specs live under `openspec/specs/`. Find the category your requirement belongs to.

2. **Choose the next requirement ID.** Look at existing requirements in that spec and increment the number. See [Requirement ID Format](#requirement-id-format) below.

3. **Write the requirement.** Follow the full [Spec File Format Requirements](#spec-file-format-requirements). Every requirement needs all required sections filled out completely.

4. **Add the requirement** to the `## Requirements` section of the spec, in numerical order by ID.

5. **Update the Quick Reference table** at the bottom of the spec with a row for your new requirement.

6. **File a change proposal** in `openspec/changes/` (see [The Change Proposal Process](#the-change-proposal-process)).

7. **Open a pull request** following the [PR Guidelines](#pull-request-guidelines).

---

## Proposing a New Spec Category

If your requirement does not fit into any existing spec category:

1. **Open a discussion or issue first.** Before writing the spec, propose the new category by explaining:
   - What design domain does it cover?
   - Why does it not fit into an existing category?
   - What are 3-5 example requirements that would belong in this category?
   - What authoritative sources back this category?

2. **Choose a category prefix.** The prefix must be short, uppercase, and descriptive. Check `openspec/project.md` under "Requirement ID Convention" to ensure it does not conflict with an existing prefix.

3. **Create the spec file.** Place it in `openspec/specs/` following the directory conventions of existing specs. The spec must follow the full [Spec File Format Requirements](#spec-file-format-requirements) including the document structure.

4. **Update `openspec/project.md`.** Add the new category prefix to the Requirement ID Convention table.

5. **File a change proposal** in `openspec/changes/`.

6. **Note:** Adding a new spec category is a MINOR version change per our versioning policy.

---

## The Change Proposal Process

All non-trivial changes to specs require a change proposal filed in `openspec/changes/`.

### When to file a proposal

- Adding a new requirement
- Modifying an existing requirement's enforcement level, rule text, or platform notes
- Removing a requirement
- Adding or renaming a spec category
- Changing the requirement format itself

### When a proposal is NOT needed

- Fixing typos or grammatical errors
- Adding links to further reading
- Clarifying existing text without changing its meaning

### Proposal format

Create a new Markdown file in `openspec/changes/` with the following naming convention:

```
openspec/changes/YYYY-MM-DD-short-description.md
```

The file should contain:

```markdown
# Change Proposal: [Short Title]

**Date:** YYYY-MM-DD
**Author:** [Your GitHub username]
**Type:** Addition | Modification | Removal | New Category
**Affected Specs:** [List of spec files affected]
**Version Impact:** MAJOR | MINOR | PATCH

## Summary

[1-3 sentences describing the change.]

## Motivation

[Why is this change needed? What problem does it solve? Link to issues or discussions.]

## Detailed Description

[Full description of the proposed change. Include the exact requirement text if adding or modifying a requirement.]

## Authoritative Sources

[List sources that support this change — WCAG references, design system documentation, research papers, etc.]

## Migration Impact

[For MAJOR changes only: what existing projects need to do to adapt.]
```

### Review process

1. Submit your change proposal as part of your pull request.
2. Maintainers and community members will review the proposal.
3. Discussion happens on the PR. The proposal may be accepted, revised, or declined.
4. Once accepted, the change is merged and the proposal file remains in `openspec/changes/` as a historical record.

---

## Requirement ID Format

Every requirement has a unique ID following this pattern:

```
REQ-CATEGORY-NNN
```

- **REQ** is the literal prefix for all requirements.
- **CATEGORY** is the uppercase category prefix (e.g., `SPACE`, `TYPO`, `COLOR`, `A11Y-P`). See the full list in `openspec/project.md`.
- **NNN** is a zero-padded three-digit number, starting at `001` within each category.

Examples:
- `REQ-TYPO-001` — First typography requirement
- `REQ-A11Y-P-003` — Third perceivable accessibility requirement
- `REQ-COLOR-012` — Twelfth color and theming requirement

Rules:
- Numbers are assigned sequentially. Never reuse a number, even if a requirement is removed.
- If a requirement is removed, its ID is retired. Add a note: `[REMOVED in vX.Y.Z]`.
- Never renumber existing requirements. Downstream projects may reference specific IDs.

---

## Enforcement Level Guidelines

Choosing the correct enforcement level is critical. The wrong level either blocks creative freedom unnecessarily or fails to protect users from real harm.

### MUST — Required

Use `MUST` when **all** of the following are true:

- Violating the rule causes a measurable accessibility failure or a clear usability breakdown.
- There is an authoritative standard behind it (WCAG success criterion, platform accessibility requirement).
- No reasonable creative justification exists for violating it.
- The rule can be stated as a precise, testable threshold.

Examples: minimum contrast ratios, touch target sizes, focus visibility, semantic heading structure.

### SHOULD — Recommended

Use `SHOULD` when:

- The practice is a well-established professional standard backed by major design systems.
- Violating it will look unprofessional or confuse users in most contexts.
- Legitimate creative or contextual reasons to deviate exist (e.g., brand expression, artistic intent, domain-specific conventions).
- The developer should consciously decide to deviate rather than unknowingly violating the practice.

Examples: consistent spacing scales, typographic hierarchy, button visual weight, card shadow conventions.

### CONSIDER — Suggested

Use `CONSIDER` when:

- The technique elevates a design from good to great.
- It represents an advanced or nuanced practice that not all projects need.
- Skipping it does not result in a broken or unprofessional interface, just a less refined one.
- It teaches a design principle that broadens the developer's skill.

Examples: optical alignment adjustments, advanced motion choreography, contextual color temperature shifts, micro-interactions.

### LEARN — Reference

Use `LEARN` when:

- The content is background theory, history, or vocabulary.
- It is not directly actionable as a code review check.
- It helps developers understand the "why" behind actionable requirements.
- It provides mental models and design thinking frameworks.

Examples: Gestalt principles overview, color theory fundamentals, the history of the 8px grid, why whitespace communicates hierarchy.

### When in doubt

- If you are unsure between `MUST` and `SHOULD`, ask: "Would a reasonable designer ever intentionally break this rule?" If yes, it is `SHOULD`.
- If you are unsure between `SHOULD` and `CONSIDER`, ask: "Would most professional interfaces follow this?" If yes, it is `SHOULD`.
- If you are unsure between `CONSIDER` and `LEARN`, ask: "Can a reviewer check this in code?" If no, it is `LEARN`.

---

## Spec File Format Requirements

Every requirement within a spec must include these sections. Omitting a required section will cause the PR to be rejected.

### Required sections for MUST, SHOULD, and CONSIDER requirements

```markdown
### REQ-CATEGORY-NNN: Short Name

**Enforcement:** `MUST` | `SHOULD` | `CONSIDER`
**Source:** [Authoritative reference]
**Platforms:** All | Web | iOS | Android | Cross-platform
**Detectable:** Yes (static analysis) | Heuristic | Manual review only

#### Why This Matters
[2-4 sentences. Explain the design principle and user impact. This is the educational core.]

#### The Rule / The Principle
[Concrete, actionable guidance. For MUST: precise thresholds. For SHOULD/CONSIDER: the principle with creative latitude.]

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS/HTML) | ... |
| SwiftUI | ... |
| Compose | ... |
| Flutter | ... |

#### Creative Freedom (SHOULD/CONSIDER only)
[How to adapt the principle to different design visions. Omit for MUST requirements.]

#### Common Mistakes
[Bulleted list of frequent violations.]

#### How to Fix
[Concrete remediation steps.]
```

### Required sections for LEARN requirements

LEARN requirements use a simplified format — only the educational content without enforcement mechanics:

```markdown
### REQ-CATEGORY-NNN: Short Name

**Enforcement:** `LEARN`
**Source:** [Authoritative reference]

#### Why This Matters
[Educational content: theory, history, vocabulary, mental models.]
```

### Section writing guidelines

- **Why This Matters:** Write for a developer who has never studied design. Be concise but genuinely educational. Do not just restate the rule.
- **The Rule / The Principle:** Be precise for `MUST`. Be principled but flexible for `SHOULD` and `CONSIDER`. Include numeric thresholds where they exist.
- **Platform Notes:** Cover at least Web and one native platform. Use "N/A" or "Same as general rule" when a platform has no special considerations. Do not leave cells blank.
- **Creative Freedom:** Explain what the developer CAN do, not just what they cannot. Celebrate design expression within the principle.
- **Source:** Always cite specific sections, not just "Material Design" — say "Material Design 3, Typography Guidelines, Type Scale." Include URLs when possible.

### Spec document structure

Every `spec.md` file must follow this outline:

```markdown
# [Category]: [Spec Name]

## Overview
[2-3 paragraph educational introduction.]

## Key Concepts
[LEARN-level content: vocabulary, mental models, design theory.]

## Requirements
[Individual requirements in the format above, ordered by ID.]

## Quick Reference
[Condensed table: ID | Name | Level | Detectable]

## Further Reading
[Links to canonical sources.]
```

---

## Testing Your Changes

Before submitting a PR, verify the following:

### Structure checks

- [ ] Requirement IDs follow the `REQ-CATEGORY-NNN` format and are sequential.
- [ ] No duplicate requirement IDs exist across the entire spec.
- [ ] All required sections are present for the enforcement level used.
- [ ] The Quick Reference table is updated.
- [ ] Platform Notes cover at least Web and one native platform.
- [ ] Enforcement level metadata matches the actual tone and content of the requirement.

### Content checks

- [ ] "Why This Matters" genuinely educates rather than restating the rule.
- [ ] "Source" references are specific and verifiable.
- [ ] "Common Mistakes" lists real, observed patterns — not hypotheticals.
- [ ] "How to Fix" provides concrete steps, not vague advice.
- [ ] MUST requirements have precise, testable thresholds.
- [ ] SHOULD/CONSIDER requirements include a Creative Freedom section.
- [ ] LEARN requirements do not include enforcement mechanics.

### Consistency checks

- [ ] Terminology is consistent with existing specs (check `openspec/project.md` for canonical terms).
- [ ] Enforcement level follows the guidelines in this document.
- [ ] The change proposal in `openspec/changes/` is complete and accurate.
- [ ] Links and cross-references are valid.

### Markdown formatting

- [ ] The file renders correctly as Markdown.
- [ ] Tables are properly formatted.
- [ ] Code blocks use the correct language identifiers.
- [ ] No trailing whitespace or inconsistent line endings.

---

## Pull Request Guidelines

### Before opening a PR

1. Ensure all [testing checks](#testing-your-changes) pass.
2. Ensure your change proposal exists in `openspec/changes/`.
3. Rebase your branch onto the latest `main` to avoid merge conflicts.

### PR title format

Use one of these prefixes:

- `feat: ` — New requirement or new spec category
- `fix: ` — Correction to an existing requirement
- `docs: ` — Clarification, typo fix, or documentation improvement
- `refactor: ` — Restructuring without changing requirement meaning
- `remove: ` — Removing a requirement

Example: `feat: add REQ-TYPO-008 line-height for body text`

### PR description

Every PR must include:

1. **Summary:** One sentence describing the change.
2. **Motivation:** Why this change improves the spec.
3. **Change proposal:** Link to or include the change proposal from `openspec/changes/`.
4. **Version impact:** Whether this is a MAJOR, MINOR, or PATCH change per `VERSIONING.md`.
5. **Checklist:** Confirm you have completed the testing checks.

### PR template

```markdown
## Summary
[One sentence.]

## Motivation
[Why this change matters.]

## Change Proposal
[Link to the file in `openspec/changes/` included in this PR.]

## Version Impact
MAJOR | MINOR | PATCH

## Checklist
- [ ] Requirement IDs are correct and sequential
- [ ] All required sections are present
- [ ] Sources are cited with specific references
- [ ] Quick Reference table is updated
- [ ] Change proposal filed in `openspec/changes/`
- [ ] Tested rendering of Markdown locally
```

### Review process

- All PRs require at least one maintainer approval.
- MUST-level requirements require review from someone with accessibility expertise.
- New spec categories require discussion before the PR is opened.
- Reviewers will check both technical accuracy and educational quality of the "Why This Matters" sections.

### After merge

- The change proposal remains in `openspec/changes/` as historical record.
- Version numbers are updated by maintainers at release time according to `VERSIONING.md`.
