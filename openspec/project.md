# OpenUI Guide — Project Overview

**Version:** 1.0.0

## Identity

OpenUI Guide is a universal UI design companion for developers building user interfaces with AI assistance. It codifies professional design knowledge from the world's leading design systems into formal, machine-readable specifications that AI coding assistants can use to review, educate, and refine UI code.

## Philosophy

**Guide, don't gatekeep.**

- Hard rules exist only where users would be harmed: accessibility and core usability
- Everything else is professional guidance with creative latitude
- Every guideline explains *why* it matters, not just *what* to do
- Developers keep creative control — the guide teaches principles, not prescriptions

## Audience

Developers who may not have formal design training, working with AI coding assistants to build user interfaces. The goal is to bridge the gap between "it works" and "it feels professional" by teaching design thinking alongside practical code review.

## Scope

**In scope:** Visual design, layout systems, typography, color, accessibility, interaction patterns, responsive design, component patterns, platform conventions.

**Out of scope:** Backend architecture, API design, business logic, performance optimization beyond perceived UI speed, content strategy, copywriting.

## Supported Platforms

| Platform | Languages / Frameworks |
|----------|----------------------|
| Web | HTML, CSS, SCSS, JavaScript, TypeScript, React, Vue, Svelte, Angular |
| iOS / macOS | SwiftUI, UIKit |
| Android | Jetpack Compose, XML layouts, Kotlin |
| Cross-platform | Flutter (Dart), React Native |

## Enforcement Levels

Every requirement carries one of four enforcement levels using modified RFC 2119 keywords:

| Level | Keyword | Meaning | During Review |
|-------|---------|---------|---------------|
| **Required** | `MUST` | Accessibility or usability failure if violated. Non-negotiable. | Flag as **error**. Must fix before shipping. |
| **Recommended** | `SHOULD` | Professional best practice. Violating this looks unprofessional, but valid creative reasons to deviate may exist. | Flag as **warning**. Explain the principle and tradeoff. Accept if developer provides reasoning. |
| **Suggested** | `CONSIDER` | Elevated technique that distinguishes good from great. Shows design sophistication. | Flag as **tip**. Purely educational. Never block. |
| **Reference** | `LEARN` | Background knowledge and design theory. Not directly actionable as a check. | Never flag during review. Available when developer asks "why" or "teach me." |

## Requirement Format

Every requirement in every spec follows this structure:

```
### REQ-[CATEGORY]-[NUMBER]: [Short Name]

**Enforcement:** `MUST` | `SHOULD` | `CONSIDER` | `LEARN`
**Source:** [Authoritative reference, e.g., WCAG 2.2 SC 1.4.3, Material Design 3, Apple HIG]
**Platforms:** All | Web | iOS | Android | Cross-platform
**Detectable:** Yes (static analysis) | Heuristic | Manual review only

#### Why This Matters
[2-4 sentences explaining the design principle and its impact on users.
This is the educational core — teach the developer WHY.]

#### The Rule / The Principle
[Concrete, actionable guidance. For MUST: precise threshold.
For SHOULD/CONSIDER: the principle with room for interpretation.]

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS/HTML) | ... |
| SwiftUI | ... |
| Compose | ... |
| Flutter | ... |

#### Creative Freedom (SHOULD/CONSIDER only)
[How to adapt this principle to your design vision.
What choices are yours to make within the principle.]

#### Common Mistakes
[Bulleted list of frequent violations]

#### How to Fix
[Concrete remediation steps]
```

For `LEARN` requirements, the format is simplified to just the educational content without enforcement mechanics.

## Spec Document Structure

Every `spec.md` file follows this outline:

```
# [Category]: [Spec Name]

## Overview
[2-3 paragraph educational introduction]

## Key Concepts
[LEARN-level content: vocabulary, mental models, design theory]

## Requirements
[Individual requirements in the format above]

## Quick Reference
[Condensed table: ID | Name | Level | Detectable]

## Further Reading
[Links to canonical sources]
```

## Requirement ID Convention

Format: `REQ-[CATEGORY]-[NUMBER]`

| Category | Prefix |
|----------|--------|
| Spacing & Layout | `SPACE` |
| Typography | `TYPO` |
| Color & Theming | `COLOR` |
| Visual Hierarchy | `HIER` |
| Iconography & Imagery | `ICON` |
| Motion & Animation | `MOTION` |
| Perceivable (a11y) | `A11Y-P` |
| Operable (a11y) | `A11Y-O` |
| Understandable (a11y) | `A11Y-U` |
| Robust (a11y) | `A11Y-R` |
| Buttons & Actions | `BTN` |
| Forms & Inputs | `FORM` |
| Navigation | `NAV` |
| Cards & Containers | `CARD` |
| Modals & Overlays | `MODAL` |
| Lists & Tables | `LIST` |
| Feedback & Status | `FEED` |
| Responsive & Adaptive | `RESP` |
| Dark Mode | `DARK` |
| Loading & Performance | `LOAD` |
| Onboarding & Empty States | `ONBOARD` |
| Error Handling | `ERR` |
| Web Platform | `WEB` |
| iOS Platform | `IOS` |
| Android Platform | `ANDROID` |
| Cross-platform | `XPLAT` |

## Design Constraints

1. **Static analysis only.** All rules must be verifiable by reading source code. No rules require running the app, rendering in a browser, or measuring pixels at runtime.
2. **Framework-agnostic principles.** The design principle is universal; only the implementation varies by platform.
3. **Cite your sources.** Every requirement references its authoritative origin (WCAG SC number, Material guideline, Apple HIG section, NNGroup article, etc.).
4. **Include a fix, not just a flag.** Every actionable requirement includes concrete remediation guidance.

## Authoritative Sources

| Domain | Primary Sources |
|--------|----------------|
| Accessibility | WCAG 2.2 (W3C), WAI-ARIA Authoring Practices 1.2, EN 301 549, Section 508 |
| Design Foundations | Material Design 3 (Google), Apple Human Interface Guidelines, Nielsen Norman Group |
| Typography | Butterick's Practical Typography, Material Type Scale, Apple Typography Guidelines |
| Color | WCAG contrast algorithms, Material Color System, Apple Color Guidelines |
| Components | Material Design 3 Components, Apple HIG Components, WAI-ARIA Component Patterns |
| Responsive | Ethan Marcotte's Responsive Web Design, Material Adaptive Layout, Apple Layout Guidelines |
| Platforms | MDN Web Docs, SwiftUI Documentation, Jetpack Compose Docs, Flutter Documentation |

## Versioning

This project follows semantic versioning (MAJOR.MINOR.PATCH) to communicate the impact of spec changes to downstream projects. In brief:

- **MAJOR** — Removing requirements or raising enforcement levels (e.g., SHOULD to MUST). May break compliance for existing projects.
- **MINOR** — Adding new requirements or new spec categories. Existing compliant projects remain compliant.
- **PATCH** — Clarifications, typo fixes, and additional platform notes. No change in requirements or enforcement.

For the full versioning policy, pinning strategies, changelog format, and migration guide conventions, see [VERSIONING.md](/VERSIONING.md).
