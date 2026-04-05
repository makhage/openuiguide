# OpenUI Guide

[![Spec Validation](https://github.com/makhage/openuiguide/actions/workflows/validate-specs.yml/badge.svg)](https://github.com/makhage/openuiguide/actions/workflows/validate-specs.yml)
[![OpenUI Guide v1.0.0](https://img.shields.io/badge/OpenUI_Guide-v1.0.0-6366f1?style=flat-square)](https://github.com/makhage/openuiguide)
[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG_2.2-AA_Compliant-22c55e?style=flat-square)](https://github.com/makhage/openuiguide)

A universal UI design companion for developers building interfaces with AI assistance. OpenUI Guide codifies professional design knowledge from the world's leading design systems into formal, machine-readable specifications that AI coding assistants can use to review, educate, and refine UI code.

## What It Does

Point it at any UI codebase and get a professional design review:

- **Audits** your code against 189 design requirements across 29 spec categories
- **Explains** why each guideline matters — teaches design thinking, not just rules
- **Suggests fixes** with concrete, platform-specific code changes
- **Respects creativity** — hard rules only for accessibility; everything else is guidance

## Design Systems Covered

| Category | What's Included |
|----------|----------------|
| **Accessibility** | WCAG 2.2 Level AA (perceivable, operable, understandable, robust) |
| **Foundations** | Spacing, typography, color, visual hierarchy, iconography, motion |
| **Components** | Buttons, forms, navigation, cards, modals, lists, feedback |
| **Patterns** | Responsive design, dark mode, loading states, onboarding, error handling |
| **Platforms** | Web, iOS, Android, Desktop (Electron/Tauri), TV (tvOS/Android TV), Wearable (watchOS/Wear OS), Cross-platform (Flutter/React Native) |

## Enforcement Levels

Not all rules are equal. OpenUI Guide uses four levels:

| Level | Keyword | When It Applies |
|-------|---------|-----------------|
| **Required** | `MUST` | Accessibility/usability failures. Non-negotiable. |
| **Recommended** | `SHOULD` | Professional best practices. Creative deviation accepted with reasoning. |
| **Suggested** | `CONSIDER` | Polish techniques. Never blocking. |
| **Reference** | `LEARN` | Design theory and education. Available on demand. |

## Installation

### As a Claude Code Skill (recommended)

Copy the `.claude/skills/design-review/` directory and `openspec/` directory into your project:

```bash
# Clone the repo
git clone https://github.com/makhage/openuiguide.git

# Copy into your project
cp -r openuiguide/.claude/skills/design-review/ your-project/.claude/skills/design-review/
cp -r openuiguide/openspec/ your-project/openspec/
```

Or add as a git submodule:

```bash
cd your-project
git submodule add https://github.com/makhage/openuiguide.git openui-guide
```

### As a global Claude Code skill

```bash
cp -r openuiguide/.claude/skills/design-review/ ~/.claude/skills/design-review/
```

## Usage

### Full Design Review

```
/design-review
```

Scans your project's UI files and produces a structured report with errors, warnings, and suggestions.

### Review + Auto-Fix

```
/design-review --fix
```

Same as above, plus applies fixes for identified issues (asks before making creative changes).

### Category-Focused Review

```
/design-review --spec accessibility
/design-review --spec typography
/design-review --spec responsive
```

Review only a specific category.

### Ask About Design Principles

```
"Why should I use an 8-point grid?"
"Explain color contrast requirements"
"What's the right line height for body text?"
```

The skill provides educational content from the relevant spec.

## Spec Structure

```
openspec/
├── project.md                    # Philosophy, conventions, enforcement levels
├── specs/
│   ├── foundations/              # Design theory & universal principles
│   │   ├── spacing-and-layout/
│   │   ├── typography/
│   │   ├── color-and-theming/
│   │   ├── visual-hierarchy/
│   │   ├── iconography-and-imagery/
│   │   └── motion-and-animation/
│   ├── accessibility/           # Non-negotiable WCAG 2.2 rules
│   │   ├── perceivable/
│   │   ├── operable/
│   │   ├── understandable/
│   │   └── robust/
│   ├── components/              # UI component patterns
│   │   ├── buttons-and-actions/
│   │   ├── forms-and-inputs/
│   │   ├── navigation/
│   │   ├── cards-and-containers/
│   │   ├── modals-and-overlays/
│   │   ├── lists-and-tables/
│   │   └── feedback-and-status/
│   ├── patterns/                # Higher-order patterns
│   │   ├── responsive-and-adaptive/
│   │   ├── dark-mode/
│   │   ├── loading-and-performance/
│   │   ├── onboarding-and-empty-states/
│   │   └── error-handling/
│   └── platforms/               # Platform-specific guidance
│       ├── web/
│       ├── ios/
│       ├── android/
│       ├── cross-platform/
│       ├── desktop/
│       ├── tv/
│       └── wearable/
├── specs.json                    # Machine-readable spec index (auto-generated)
└── changes/                     # Proposals for new rules

scripts/
├── validate-specs.sh             # Bash spec validator
├── validate-spec-format.js       # Node.js spec validator (CI-ready)
└── generate-specs-json.js        # Regenerates specs.json from spec files

docs/
├── checklist.md                  # Quick-reference checklist of all 189 requirements
├── comparison.md                 # Mapping to Material Design 3, Apple HIG, etc.
└── badges.md                    # Shields.io badges for your README

examples/
├── sample-app/                   # Dashboard with intentional design issues
│   ├── index.html
│   └── styles.css
└── sample-review-output.md       # What a /design-review produces
```

## Authoritative Sources

Every requirement cites its source:

- **WCAG 2.2** (W3C) — Accessibility standards
- **Material Design 3** (Google) — Design system and component specs
- **Apple Human Interface Guidelines** — iOS/macOS design language
- **Nielsen Norman Group** — UX research and heuristics
- **WAI-ARIA Authoring Practices** — Accessible component patterns
- **MDN Web Docs** — Web platform reference
- **Butterick's Practical Typography** — Typography principles

## Documentation

| Document | Description |
|----------|-------------|
| [Checklist](docs/checklist.md) | Quick-reference of all 189 requirements with checkboxes |
| [Comparison](docs/comparison.md) | How OpenUI Guide maps to Material Design 3, Apple HIG, etc. |
| [Badges](docs/badges.md) | Shields.io badges for your project README |
| [Versioning](VERSIONING.md) | Semantic versioning strategy for specs |
| [Contributing](CONTRIBUTING.md) | How to add requirements and propose new specs |
| [Example Review](examples/sample-review-output.md) | Sample review output from the design-review skill |

## Machine-Readable Specs

`openspec/specs.json` provides a structured JSON index of all requirements for tooling beyond Claude:

```bash
# Regenerate after changing specs
node scripts/generate-specs-json.js

# Validate all specs follow the correct format
bash scripts/validate-specs.sh
node scripts/validate-spec-format.js
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide. Quick start:

1. Create a folder under `openspec/changes/<your-change-name>/`
2. Add a `proposal.md` explaining what rules to add/modify and why
3. Follow the requirement format in `openspec/project.md`
4. Run `bash scripts/validate-specs.sh` to verify your changes
5. Submit a pull request

## License

MIT License. See [LICENSE](LICENSE).
