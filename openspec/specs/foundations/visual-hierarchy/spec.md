# Foundations: Visual Hierarchy

## Overview

Visual hierarchy is the order in which the eye perceives elements on a screen. When hierarchy is clear, users instantly know what to look at first, what's important, and what's secondary. When it's missing, every element competes for attention and users feel overwhelmed. Professional designers create hierarchy through deliberate use of size, weight, color, contrast, position, and whitespace.

## Key Concepts

### LEARN: How the Eye Scans

Eye-tracking research reveals consistent scanning patterns:
- **F-pattern** — for text-heavy pages: users scan the top, then down the left side
- **Z-pattern** — for minimal layouts: top-left → top-right → bottom-left → bottom-right
- **Focal point** — the single element with the most visual weight gets attention first
- **Gutenberg diagram** — users tend to move from top-left (primary optical area) to bottom-right (terminal area)

### LEARN: Visual Weight

Elements "weigh" more when they are:
- **Larger** than surrounding elements
- **Bolder** or higher contrast
- **More colorful** (saturated) than surroundings
- **Isolated** with more whitespace around them
- **Positioned higher** or more centrally

---

## Requirements

### REQ-HIER-001: Single Primary Focal Point

**Enforcement:** `SHOULD` | Visual Design Fundamentals
**Platforms:** All
**Detectable:** Manual review only

#### Why This Matters
When everything is emphasized, nothing is. A screen with three equal-sized headings, two competing call-to-action buttons, and bold text everywhere creates decision paralysis. Each screen should have ONE thing the user's eye goes to first.

#### The Principle
- Every screen/view should have a **clear primary focal point** — the most important element
- The focal point should be visually distinguished through size, color, position, or whitespace
- Secondary elements should be visually subordinate to the primary focal point
- Limit competing emphasis: maximum 1 primary action, 1-2 secondary actions per screen section

#### Creative Freedom
The focal point can be anything: a headline, a hero image, a primary button, a data visualization. What matters is that one element clearly dominates. How you achieve dominance (size vs. color vs. isolation) is your creative choice.

#### Common Mistakes
- Two primary CTA buttons of equal visual weight on the same screen
- Everything in bold or all-caps, eliminating hierarchy
- Hero section where the image, heading, subheading, and button all compete equally

#### How to Fix
Identify the single most important action or message per screen section. Make it visually dominant. Reduce the visual weight of everything else.

---

### REQ-HIER-002: Primary vs. Secondary Actions

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Heuristic — flag multiple high-emphasis buttons in the same context

#### Why This Matters
When "Save" and "Cancel" look identical, users hesitate. When "Delete" is as prominent as "Submit," users make mistakes. Action hierarchy guides users toward the right choice by making the primary action visually dominant.

#### The Principle
- **Primary action:** Filled/solid, most prominent (e.g., filled button)
- **Secondary action:** Outlined or toned, visually lighter (e.g., outlined button)
- **Tertiary/destructive:** Text-only or subtle, least prominent
- Only ONE primary action per context (dialog, form, card)

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Primary: solid background + white text. Secondary: outlined/ghost. Tertiary: text-only link style. |
| SwiftUI | `.buttonStyle(.borderedProminent)` for primary, `.bordered` for secondary, `.plain` for tertiary |
| Compose | `Button()` for primary, `OutlinedButton()` for secondary, `TextButton()` for tertiary |
| Flutter | `ElevatedButton` for primary, `OutlinedButton` for secondary, `TextButton` for tertiary |

#### Common Mistakes
- Two filled primary buttons side by side ("Save" and "Save & Continue" both solid)
- Cancel button more prominent than the confirm action
- Destructive action (Delete) styled as a primary button

---

### REQ-HIER-003: Content Hierarchy Through Size

**Enforcement:** `SHOULD` | Typography, Visual Design
**Platforms:** All
**Detectable:** Heuristic — check that heading sizes decrease as level increases

#### Why This Matters
Size is the strongest hierarchy signal. When h1, h2, and h3 are similar sizes, the content structure collapses. Clear size differentiation lets users scan and find sections quickly.

#### The Principle
- Each heading level should be **noticeably smaller** than the level above
- Minimum size ratio between adjacent levels: **1.2×** (e.g., h1: 32px, h2: 26px, h3: 22px)
- Body text should be clearly smaller than the smallest heading
- Use your type scale (REQ-TYPO-002) to ensure mathematical consistency

#### Common Mistakes
- h2 at 20px and h3 at 18px (barely distinguishable)
- Body text the same size as the smallest heading
- Headings that are larger than they should be for their hierarchy level

---

### REQ-HIER-004: Information Density Appropriateness

**Enforcement:** `CONSIDER` | UX Best Practice
**Platforms:** All
**Detectable:** Manual review only

#### Why This Matters
The right information density depends on context. A stock trading dashboard needs high density (many data points visible at once). A meditation app needs low density (calm, focused). Mismatched density — a cluttered wellness app or a sparse data dashboard — creates cognitive dissonance.

#### The Principle
- Match information density to your **product's purpose and user context**
- High-density: dashboards, admin panels, developer tools, data tables
- Medium-density: e-commerce, social feeds, productivity apps
- Low-density: landing pages, onboarding, reading apps, creative tools
- Maintain consistent density within the same screen — don't mix sparse and dense sections without clear visual separation

#### Creative Freedom
Density is a core design decision. There's no universal right answer. The question is: does your density serve your users' needs?

---

### REQ-HIER-005: Visual Grouping

**Enforcement:** `SHOULD` | Gestalt Principles
**Platforms:** All
**Detectable:** Heuristic — flag related elements with inconsistent grouping cues

#### Why This Matters
Gestalt principles (proximity, similarity, enclosure, continuity) explain how humans perceive groups. Using these intentionally means users instantly understand which elements belong together without reading labels or instructions.

#### The Principle
- **Proximity:** Related items close together, unrelated items far apart (see REQ-SPACE-003)
- **Similarity:** Elements with the same role should look the same (same style, color, size)
- **Enclosure:** Borders, cards, or background colors can group elements
- **Continuity:** Elements aligned along a line or curve are perceived as related
- Use at least 2 grouping cues for important groups

#### Common Mistakes
- Related form fields spaced the same as unrelated sections
- Cards with inconsistent visual treatment (some with shadows, some with borders, some flat)
- Labels visually closer to the wrong input field

---

### REQ-HIER-006: Emphasis Restraint

**Enforcement:** `CONSIDER` | Visual Design Fundamentals
**Platforms:** All
**Detectable:** Heuristic — flag excessive use of bold, color, or large text

#### Why This Matters
Emphasis is relative. Bold text only works as emphasis when most text isn't bold. Color highlights only work when the surrounding content is neutral. Overusing emphasis is the visual equivalent of shouting — everything blurs together.

#### The Principle
- **Bold** should be used for no more than ~10-15% of visible text
- **Color accents** should cover no more than ~10-20% of the screen area
- **ALL CAPS** should be reserved for short labels only (buttons, badges, overlines)
- If everything looks important, step back and decide what's actually important

#### Creative Freedom
Some interfaces intentionally use high contrast and bold styling throughout (brutalist design, gaming). This works when it's a deliberate aesthetic choice applied consistently. The principle is about accidental over-emphasis, not stylistic boldness.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-HIER-001 | Single Primary Focal Point | SHOULD | Manual |
| REQ-HIER-002 | Primary vs. Secondary Actions | SHOULD | Heuristic |
| REQ-HIER-003 | Content Hierarchy Through Size | SHOULD | Heuristic |
| REQ-HIER-004 | Information Density Appropriateness | CONSIDER | Manual |
| REQ-HIER-005 | Visual Grouping | SHOULD | Heuristic |
| REQ-HIER-006 | Emphasis Restraint | CONSIDER | Heuristic |

## Further Reading

- [NNGroup: Visual Hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)
- [Laws of UX](https://lawsofux.com/)
- [Material Design 3: Applying Color](https://m3.material.io/styles/color/roles)
- [Gestalt Principles in UI Design](https://www.interaction-design.org/literature/topics/gestalt-principles)
