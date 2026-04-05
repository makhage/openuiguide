# Foundations: Color and Theming

## Overview

Color is the most emotionally powerful design tool. It sets mood, guides attention, communicates meaning, and creates brand identity — all before a user reads a single word. But color is also where accessibility failures are most common. The professional approach: build a **systematic color palette** with semantic tokens, verify contrast ratios, and never rely on color alone.

## Key Concepts

### LEARN: Color Roles

Every design system organizes colors by role, not by raw value:
- **Primary** — your brand's signature color, used for key actions and emphasis
- **Secondary** — a complementary color for less prominent interactive elements
- **Surface/Background** — the canvas colors your content sits on
- **On-[color]** — the text/icon color used on top of each color (e.g., on-primary is the text color used on primary-colored backgrounds)
- **Error/Warning/Success/Info** — semantic colors for system feedback
- **Neutral** — grays used for text, borders, dividers, and subtle backgrounds

### LEARN: Color Psychology Basics

Colors carry cultural associations (in Western contexts):
- **Blue** — trust, stability, professionalism (banking, enterprise)
- **Green** — growth, success, nature (health, finance, eco)
- **Red** — urgency, error, passion (alerts, sales, food)
- **Orange/Yellow** — warmth, energy, caution (warnings, social)
- **Purple** — luxury, creativity, wisdom (premium, creative tools)
- **Neutral/Gray** — sophistication, professionalism (enterprise, minimalist)

These are starting points, not rules. Your creative color choices define your brand.

---

## Requirements

### REQ-COLOR-001: Systematic Color Palette

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Heuristic — flag more than 10 distinct hue families or many one-off hex values

#### Why This Matters
When colors are chosen ad hoc (this button is #3B82F6, that link is #2563EB, this other button is #1D4ED8), the interface feels inconsistent and maintaining it becomes a nightmare. A systematic palette with defined roles creates coherence.

#### The Principle
- Define a palette with **5-7 distinct hue families** maximum
- Each hue should have a range of tints/shades (e.g., blue-50 through blue-900)
- Assign semantic roles to colors (primary, secondary, error, success, etc.)
- All color usage should reference the palette — no one-off hex values

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | CSS custom properties: `--color-primary: #2563eb; --color-primary-light: #60a5fa;` |
| SwiftUI | `Color("Primary")` from asset catalog, or `extension Color { static let primary = Color(...) }` |
| Compose | `MaterialTheme.colorScheme.primary`, `secondary`, `error`, etc. |
| Flutter | `Theme.of(context).colorScheme.primary`, or custom `ColorScheme` |

#### Creative Freedom
Your palette is entirely your creative choice. Warm, cool, monochromatic, complementary, analogous — all valid. The principle is systematization, not specific color choices. Express your brand through color.

#### Common Mistakes
- 15+ distinct hex colors scattered through the codebase with no system
- Hard-coded hex values instead of semantic tokens
- Using brand colors for semantic purposes (red brand color used for errors and decoration)

#### How to Fix
Audit all colors in use. Group by hue family. Define a palette with tint/shade ranges. Replace hard-coded values with tokens.

---

### REQ-COLOR-002: Semantic Color Tokens

**Enforcement:** `SHOULD` | Design Systems Best Practice
**Platforms:** All
**Detectable:** Yes — check for raw color values vs. semantic variables

#### Why This Matters
A raw hex value like `#EF4444` tells you nothing about its purpose. Is it an error color? A brand color? A decorative accent? Semantic tokens like `--color-error` make purpose explicit, enable theming, and prevent misuse.

#### The Principle
- Define colors by their **role**, not their visual value
- Minimum semantic tokens: `primary`, `on-primary`, `secondary`, `on-secondary`, `background`, `on-background`, `surface`, `on-surface`, `error`, `on-error`
- All component styles should reference semantic tokens, never raw color values
- This enables theming (light/dark mode, brand variants) by swapping token values

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | `color: var(--color-on-surface);` not `color: #1a1a1a;` |
| SwiftUI | `Color.accentColor` or custom semantic colors in asset catalog with dark mode variants |
| Compose | `MaterialTheme.colorScheme.onSurface` — Material 3 provides a complete semantic system |
| Flutter | `Theme.of(context).colorScheme.onSurface` |

#### Common Mistakes
- Using `#ff0000` directly instead of `var(--color-error)`
- Naming tokens by color instead of role: `--blue-500` is a palette value, not a semantic token
- Forgetting `on-[color]` tokens (the text color to use on a colored background)

#### How to Fix
Create a semantic token layer that maps roles to palette values. Reference only semantic tokens in component styles.

---

### REQ-COLOR-003: Maximum Palette Hues

**Enforcement:** `CONSIDER` | Visual Design Best Practice
**Platforms:** All
**Detectable:** Heuristic — count distinct hue families

#### Why This Matters
Interfaces with too many distinct colors feel chaotic and uncoordinated. Limiting your palette to 5-7 hue families (plus neutrals) forces you to create cohesion. The constraint actually makes design easier — fewer choices, more consistency.

#### The Principle
- Use **no more than 5-7 distinct hue families** (excluding grays/neutrals)
- A typical professional palette: 1 primary hue, 1-2 secondary/accent hues, and 3-4 semantic hues (error, warning, success, info)
- Derive variety from tints/shades of the same hue, not from adding more hues

#### Creative Freedom
A monochromatic palette (one hue with many tints/shades) can be stunning. A triadic palette (three evenly-spaced hues) can be vibrant. There's no wrong number of hues below the threshold — just pick intentionally.

---

### REQ-COLOR-004: Sufficient Contrast for All Themes

**Enforcement:** `MUST` | WCAG 2.2 SC 1.4.3
**Platforms:** All
**Detectable:** Yes — compute contrast ratios per theme

#### Why This Matters
Many teams check contrast in light mode but forget dark mode (or vice versa). Each theme is a separate visual environment with its own contrast requirements. Auto-generated dark themes (simple inversion) often produce terrible contrast ratios.

#### The Rule
- Contrast ratios MUST meet WCAG AA thresholds (4.5:1 normal text, 3:1 large text) **in every theme variant**
- Light mode, dark mode, and any custom themes must be checked independently
- System-level appearance changes (prefers-color-scheme) must not break contrast

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Check both `@media (prefers-color-scheme: light)` and `dark` palettes separately |
| SwiftUI | Verify color pairs in both `.light` and `.dark` `ColorScheme` appearances |
| Compose | Verify `lightColorScheme()` and `darkColorScheme()` contrast separately |
| Flutter | Verify both `ThemeData.light()` and `ThemeData.dark()` color pairs |

#### Common Mistakes
- Dark mode generated by simply inverting light mode colors
- Colored text on colored backgrounds that passes in light mode but fails in dark mode
- Surface colors too similar to background in dark mode

#### How to Fix
Check every text/background pair in every theme. Use separate, purpose-built palettes for each theme rather than mathematically inverting.

---

### REQ-COLOR-005: Accessible Color Pairs

**Enforcement:** `MUST` | WCAG 2.2 SC 1.4.3, 1.4.11
**Platforms:** All
**Detectable:** Yes — validate predefined color pairs

#### Why This Matters
The most common contrast failures happen at the seams: text on colored backgrounds, icons on colored surfaces, borders on subtle backgrounds. Pre-validating your color pairs means you catch failures in the design system, not in every component.

#### The Rule
- Every semantic color MUST have a pre-validated `on-[color]` counterpart
- `on-primary` must have ≥4.5:1 contrast against `primary`
- `on-surface` must have ≥4.5:1 contrast against `surface`
- `on-error` must have ≥4.5:1 contrast against `error`
- Document all valid color pairs in your design tokens

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Validate: `var(--color-on-primary)` against `var(--color-primary)` — document the ratio |
| SwiftUI | Test `foregroundColor` against background in Accessibility Inspector |
| Compose | Material 3 `colorScheme` enforces this pattern. Verify custom overrides. |
| Flutter | Material `ColorScheme` enforces `onPrimary`/`primary` pairs. Verify custom colors. |

---

### REQ-COLOR-006: Color for Feedback States

**Enforcement:** `SHOULD` | Material Design 3, Universal UX
**Platforms:** All
**Detectable:** Heuristic — check for semantic color usage in error/success/warning patterns

#### Why This Matters
Users have strong expectations about feedback colors: red means error, green means success, yellow/orange means warning, blue means information. Breaking these conventions creates confusion.

#### The Principle
- Use established color conventions for system feedback:
  - **Error/Danger:** Red family
  - **Success/Positive:** Green family
  - **Warning/Caution:** Orange/yellow family
  - **Information/Neutral:** Blue family
- Always pair feedback color with an icon and text (see REQ-A11Y-P-005)

#### Creative Freedom
The specific shade within each family is your choice. Your error red can be warm (#DC2626) or cool (#E11D48). Just ensure it reads as "error" to most users.

#### Common Mistakes
- Green used for errors, or red used for success (confusing cultural expectations)
- Warning using the same yellow as the brand color (dilutes the warning)
- No visual distinction between informational and warning states

---

### REQ-COLOR-007: Opacity and Transparency Usage

**Enforcement:** `CONSIDER` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Heuristic — flag excessive use of opacity without checking resulting contrast

#### Why This Matters
Semi-transparent colors (rgba, opacity) create depth and layering effects, but they produce different effective colors depending on the background. A 50% opacity black text looks great on white (#808080 equivalent, 4.5:1) but fails on a dark gray background.

#### The Principle
- When using opacity/transparency, verify the **resulting effective contrast** against all possible backgrounds
- Prefer solid semantic colors over transparency for text and critical UI elements
- Use opacity for decorative overlays, scrims, and disabled states

#### Common Mistakes
- Semi-transparent text that passes contrast on white but fails on image backgrounds
- Overlapping semi-transparent elements creating unpredictable colors
- Using opacity to create "lighter" text instead of using a lighter solid color

---

### REQ-COLOR-008: Brand Color Integration

**Enforcement:** `CONSIDER` | Design Systems Best Practice
**Platforms:** All
**Detectable:** Manual review only

#### Why This Matters
Brand colors often don't work perfectly as UI colors. A vibrant brand red might be great for a logo but too aggressive for a primary button on every screen. Professional designers adapt brand colors for UI use — creating lighter, darker, and muted variants.

#### The Principle
- Brand colors should inform your palette, not dictate it verbatim
- Create UI-appropriate tints and shades from brand colors
- Use the full-saturation brand color sparingly (logo, primary CTA, accents)
- Derive quieter variants for surfaces, backgrounds, and secondary elements

#### Creative Freedom
This is entirely your creative territory. Some brands use their primary color boldly throughout the UI (Spotify green). Others reserve it for key moments (Apple's minimal use of blue). Match the intensity to your product's personality.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-COLOR-001 | Systematic Color Palette | SHOULD | Heuristic |
| REQ-COLOR-002 | Semantic Color Tokens | SHOULD | Yes |
| REQ-COLOR-003 | Maximum Palette Hues | CONSIDER | Heuristic |
| REQ-COLOR-004 | Sufficient Contrast for All Themes | MUST | Yes |
| REQ-COLOR-005 | Accessible Color Pairs | MUST | Yes |
| REQ-COLOR-006 | Color for Feedback States | SHOULD | Heuristic |
| REQ-COLOR-007 | Opacity and Transparency Usage | CONSIDER | Heuristic |
| REQ-COLOR-008 | Brand Color Integration | CONSIDER | Manual |

## Further Reading

- [Material Design 3: Color System](https://m3.material.io/styles/color/overview)
- [Apple HIG: Color](https://developer.apple.com/design/human-interface-guidelines/color)
- [WCAG Understanding SC 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [A11y Color Contrast Checker](https://color.a11y.com/)
- [Inclusive Design: Color](https://inclusive.microsoft.design/tools-and-activities/color)
