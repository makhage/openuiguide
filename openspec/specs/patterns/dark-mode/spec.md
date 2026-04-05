# Patterns: Dark Mode

## Overview

Dark mode isn't just inverting colors. It's a separate color environment that requires its own carefully designed palette, contrast verification, and surface hierarchy. Done well, dark mode reduces eye strain in low-light conditions and can save battery on OLED screens. Done poorly, it creates unreadable text, harsh contrasts, and visual fatigue.

## Key Concepts

### LEARN: Why Not Just Invert

Simply inverting light mode colors produces terrible results: pure white text on pure black is harsh and causes halation (glow effect that reduces readability). Shadows and elevation that work in light mode lose meaning in dark mode. Images become jarring against dark surfaces. Professional dark mode requires a purposefully designed palette.

---

## Requirements

### REQ-DARK-001: Respect System Preference

**Enforcement:** `MUST` | Apple HIG, Material Design 3
**Platforms:** All
**Detectable:** Yes — check for prefers-color-scheme handling

#### Why This Matters
Users choose their system-level color scheme preference for comfort and accessibility. Ignoring it and forcing light mode (or dark mode) disrespects user choice and may cause physical discomfort.

#### The Rule
- Applications MUST respect the system's `prefers-color-scheme` preference
- The app may also provide a manual toggle (system / light / dark)
- The user's explicit in-app choice should override the system preference

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | `@media (prefers-color-scheme: dark) { ... }` or CSS custom property switching |
| SwiftUI | System handles this automatically with semantic colors. Custom: check `colorScheme` environment value. |
| Compose | `isSystemInDarkTheme()` + `MaterialTheme(colorScheme = if (dark) darkColorScheme() else lightColorScheme())` |
| Flutter | `ThemeMode.system` in `MaterialApp`. Use `Theme.of(context).brightness`. |

---

### REQ-DARK-002: Designed Dark Palette (Not Inverted)

**Enforcement:** `SHOULD` | Apple HIG, Material Design 3
**Platforms:** All
**Detectable:** Heuristic — flag `filter: invert()` or simple color swapping

#### Why This Matters
CSS `filter: invert(1)` or simple color swaps produce terrible results: images invert, shadows look wrong, contrast ratios break, and the UI feels jarring. A proper dark palette is designed from scratch.

#### The Principle
- Use **dark gray backgrounds** (#121212 to #1E1E1E), NOT pure black (#000000)
- Use **off-white text** (#E0E0E0 to #F5F5F5), NOT pure white (#FFFFFF)
- Reduce color saturation for dark mode (vibrant colors on dark backgrounds cause eye strain)
- Surface hierarchy uses lighter grays for elevated surfaces (opposite of light mode)
- Never use `filter: invert()` as a dark mode implementation

#### Common Mistakes
- Pure black background (#000000) causing halation with white text
- Pure white text on dark backgrounds (too harsh, causes eye fatigue)
- Same saturated brand colors in both modes (too vibrant in dark mode)
- Images with no darkened overlay or treatment against dark surfaces

---

### REQ-DARK-003: Dark Mode Contrast Verification

**Enforcement:** `MUST` | WCAG 2.2 SC 1.4.3
**Platforms:** All
**Detectable:** Yes — check contrast ratios in dark theme

#### Why This Matters
Contrast requirements apply in EVERY color scheme. A text/background pair that passes at 5:1 in light mode might fail at 3:1 in dark mode with different colors. Both must be verified independently.

#### The Rule
- All text/background pairs in dark mode MUST meet the same WCAG AA contrast thresholds as light mode
- 4.5:1 for normal text, 3:1 for large text, 3:1 for UI components
- Verify semantic color pairs: `on-surface` vs `surface`, `on-primary` vs `primary`, etc. for BOTH themes

---

### REQ-DARK-004: Image and Media Treatment

**Enforcement:** `SHOULD` | Apple HIG
**Platforms:** All
**Detectable:** Heuristic — check for image/media dark mode handling

#### Why This Matters
Bright images against a dark interface create a harsh visual contrast that's distracting and uncomfortable. Images designed for light backgrounds (logos with white backgrounds, screenshots with light UI) look jarring in dark mode.

#### The Principle
- Reduce image brightness slightly in dark mode (optional, ~85-90% brightness)
- Provide dark mode variants for logos and illustrations with transparent backgrounds
- Screenshots and diagrams may need dark mode variants
- Consider adding a subtle border or rounded corner treatment to images so they blend with the dark surface

---

### REQ-DARK-005: Surface Elevation in Dark Mode

**Enforcement:** `CONSIDER` | Material Design 3
**Platforms:** All
**Detectable:** Heuristic — check dark mode surface differentiation

#### Why This Matters
In light mode, elevation is shown with shadows (darker = more shadow = more elevated). In dark mode, shadows are invisible against dark backgrounds. Material Design 3 solves this by making elevated surfaces **lighter** — the higher the elevation, the lighter the surface.

#### The Principle
- Elevated surfaces in dark mode should be **lighter** than the base surface
- Base surface: dark gray (#121212). Cards/elevated: slightly lighter (#1E1E1E). Top-level sheets: even lighter (#2C2C2C).
- This creates a sense of depth without relying on shadows

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-DARK-001 | Respect System Preference | MUST | Yes |
| REQ-DARK-002 | Designed Dark Palette | SHOULD | Heuristic |
| REQ-DARK-003 | Dark Mode Contrast Verification | MUST | Yes |
| REQ-DARK-004 | Image and Media Treatment | SHOULD | Heuristic |
| REQ-DARK-005 | Surface Elevation in Dark Mode | CONSIDER | Heuristic |

## Further Reading

- [Material Design 3: Dark Theme](https://m3.material.io/styles/color/dynamic/choosing-a-source)
- [Apple HIG: Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode)
- [Web.dev: prefers-color-scheme](https://web.dev/articles/prefers-color-scheme)
