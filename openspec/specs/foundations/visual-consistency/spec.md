# Visual Consistency

> The small details that separate polished interfaces from amateur ones — consistent border radii, shadow scales, and decorative patterns that create a unified visual language.

**Category:** Foundations
**Applies to:** All platforms
**Specs in this file:** 8 requirements (REQ-VCON-001 through REQ-VCON-008)

---

## Requirements

---

### REQ-VCON-001: Consistent Border Radius

**Enforcement:** `SHOULD` | Design Systems Best Practice
**Platforms:** All
**Detectable:** Yes — extract all border-radius values from CSS

#### Why This Matters
Mixing `border-radius: 4px`, `8px`, `12px`, `16px`, `20px`, and `50%` across a project creates visual noise. A polished UI uses 2-3 radius values consistently: one for small elements (inputs, badges), one for cards/containers, and optionally one for pills/chips.

#### The Principle
- Define a border-radius scale with 2-4 values (e.g., `--radius-sm: 4px`, `--radius-md: 8px`, `--radius-lg: 16px`, `--radius-full: 9999px`)
- All UI elements SHOULD use values from this scale
- Don't mix sharp (0px) and round (12px+) corners in the same component family

#### Platform Implementation Notes
- **Web:** Define in CSS custom properties. Use `border-radius` shorthand consistently.
- **SwiftUI:** Define radius constants in a theme: `.cornerRadius(Theme.radiusMd)`.
- **Compose:** Use `RoundedCornerShape(theme.radiusMd)` from a shared shape system.
- **React Native:** Define `borderRadius` values in a theme constants file.

---

### REQ-VCON-002: Consistent Shadow/Elevation Scale

**Enforcement:** `SHOULD` | Material Design 3, Design Systems Best Practice
**Platforms:** All
**Detectable:** Yes — extract all box-shadow values, check for consistency

#### Why This Matters
Shadows convey elevation and hierarchy. When every element has a different shadow (different blur, spread, color, offset), the elevation system breaks down and elements float at random perceived depths. A defined shadow scale creates a clear visual hierarchy.

#### The Principle
- Define 3-5 shadow levels (e.g., `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`)
- Cards at the same level should have the same shadow
- Elevated elements (modals, dropdowns, tooltips) should have progressively stronger shadows
- Don't mix colored shadows with gray shadows unless intentional

#### Platform Implementation Notes
- **Web:** Define shadows as CSS custom properties. Consistent color (use `rgba(0,0,0,0.1)` not random opacity values).
- **SwiftUI:** Use `.shadow(radius:)` with consistent values from a theme.
- **Compose:** Use `Modifier.shadow(elevation = theme.elevationMd)`.
- **React Native:** Define shadow styles in shared constants (note: Android `elevation` vs iOS `shadowOffset`).

---

### REQ-VCON-003: Consistent Divider/Separator Styling

**Enforcement:** `SHOULD` | Design Systems Best Practice
**Platforms:** All
**Detectable:** Yes — extract all border/hr styles

#### Why This Matters
Mixing `1px solid #ccc`, `2px solid #eee`, `1px dashed #999`, and `border-bottom: 1px solid rgba(0,0,0,0.1)` for dividers creates visual inconsistency. Dividers should look the same everywhere they serve the same purpose.

#### The Principle
- Define one divider style for content separation (e.g., `1px solid var(--border-color)`)
- Use consistent opacity/color for all dividers
- Use `<hr>` semantically in HTML, not decorative borders on random elements
- Dark mode dividers should be lighter, not darker

#### Platform Implementation Notes
- **Web:** Define `--border-color` and `--border-width` as custom properties. Style `hr` globally.
- **SwiftUI:** Use `Divider()` which adapts to system appearance.
- **Compose:** Use `HorizontalDivider()` from Material 3.
- **React Native:** Create a shared `<Divider />` component with consistent styling.

---

### REQ-VCON-004: Consistent Interactive Element Styling

**Enforcement:** `SHOULD` | Design Systems Best Practice
**Platforms:** All
**Detectable:** Heuristic — compare styles across similar interactive elements

#### Why This Matters
If primary buttons in the header are `blue with 8px radius` but primary buttons in forms are `blue with 4px radius and different padding`, users lose confidence that the interface is cohesive. All instances of the same component type should look identical.

#### The Principle
- Same component type = same visual treatment everywhere
- Primary buttons should look the same in the nav, in forms, in modals, and in cards
- Input fields should have the same height, border, and padding everywhere
- If a component needs to vary, create an explicit variant (`.btn-compact`) rather than ad-hoc overrides

#### Platform Implementation Notes
- **Web:** Use a component class system (BEM, utility-first, or CSS Modules) so buttons are styled once and reused.
- **SwiftUI:** Use `ButtonStyle` protocol to enforce consistent styling.
- **Compose:** Use `@Composable` button components from a shared design system module.
- **React Native:** Create shared `<Button>` components with fixed style props.

---

### REQ-VCON-005: Icon Style Uniformity

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Heuristic — check if icons come from one set or mixed sources

#### Why This Matters
Mixing outlined icons with filled icons, or Material icons with Font Awesome with custom SVGs, creates visual discord. Icons should all feel like they belong to the same family — same weight, same style, same visual density.

#### The Principle
- Use one icon set throughout the project (Material Symbols, SF Symbols, Lucide, Heroicons, etc.)
- Don't mix outline and filled variants unless used for active/inactive states
- Custom icons should match the weight and style of the chosen icon set
- Icon stroke width should be consistent across all icons

#### Platform Implementation Notes
- **Web:** Import from one icon library. If using SVGs, ensure consistent `stroke-width`.
- **SwiftUI:** Use SF Symbols exclusively — they automatically match system font weight.
- **Compose:** Use Material Symbols or a single icon library throughout.
- **React Native:** Use one icon package (e.g., `react-native-vector-icons` with one font family).

---

### REQ-VCON-006: Consistent Transition Timing

**Enforcement:** `SHOULD` | Animation Best Practice
**Platforms:** All
**Detectable:** Yes — extract all transition-duration and transition-timing-function values

#### Why This Matters
When buttons transition in 100ms, dropdowns in 300ms, hover effects in 200ms, and modals in 500ms with different easing curves, the interface feels chaotic. A consistent transition system creates a cohesive feel.

#### The Principle
- Define 2-3 duration tiers: fast (100-150ms for hovers/toggles), standard (200-300ms for reveals/transitions), slow (300-500ms for complex animations)
- Use one or two easing curves throughout (e.g., `ease-out` for entrances, `ease-in` for exits)
- Store as design tokens: `--duration-fast: 150ms`, `--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)`

#### Platform Implementation Notes
- **Web:** Define `--duration-*` and `--ease-*` custom properties. Apply consistently via `transition: all var(--duration-fast) var(--ease-standard)`.
- **SwiftUI:** Use `.animation(.easeOut(duration: 0.15))` with consistent values from a theme.
- **Compose:** Define animation specs in theme: `tween(durationMillis = 150, easing = FastOutSlowInEasing)`.
- **React Native:** Use `Animated` with consistent duration/easing config objects.

---

### REQ-VCON-007: Consistent Spacing Tokens in Use

**Enforcement:** `SHOULD` | Design Systems Best Practice
**Platforms:** All
**Detectable:** Yes — check if CSS uses custom properties or raw values for spacing

#### Why This Matters
If spacing tokens are defined but elements still use hardcoded `margin: 13px` or `padding: 7px`, the tokens serve no purpose. Consistency requires actually using the design tokens, not just defining them.

#### The Principle
- If a spacing scale is defined (CSS variables, theme constants), ALL spacing values SHOULD reference it
- Random px values that don't match the scale indicate missed spots
- Inline styles with arbitrary spacing values undermine the system

#### Platform Implementation Notes
- **Web:** Grep for `px` values in margin/padding that don't match `var(--space-*)`. Utility-class frameworks (Tailwind) enforce this automatically.
- **SwiftUI:** Reference `Theme.spacing.*` constants instead of magic numbers in `.padding()`.
- **Compose:** Use `theme.spacing.*` values in `Modifier.padding()`.
- **React Native:** Reference spacing scale object instead of inline numbers.

---

### REQ-VCON-008: Consistent Text Color Usage

**Enforcement:** `SHOULD` | Design Systems Best Practice
**Platforms:** All
**Detectable:** Yes — count unique text color values

#### Why This Matters
Using 8 different shades of gray for text (`#333`, `#444`, `#555`, `#666`, `#777`, `#888`, `#999`, `#aaa`) instead of 3 defined levels (primary, secondary, muted) creates subtle visual inconsistency. A text color system with clear tiers is more maintainable and more consistent.

#### The Principle
- Define 3-4 text color tiers: primary (headings, body), secondary (descriptions, metadata), muted (timestamps, hints), disabled
- All text SHOULD use one of these defined colors
- Each tier should have distinct contrast from the background (primary darkest, muted lightest)
- Dark mode should invert the scale appropriately

#### Platform Implementation Notes
- **Web:** `--text-primary`, `--text-secondary`, `--text-muted`, `--text-disabled` custom properties.
- **SwiftUI:** Use `.foregroundStyle(.primary)`, `.secondary`, `.tertiary` system colors.
- **Compose:** Use `MaterialTheme.colorScheme.onSurface`, `onSurfaceVariant` etc.
- **React Native:** Define text color constants in theme and reference them in all `Text` styles.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-VCON-001 | Consistent Border Radius | SHOULD | Yes |
| REQ-VCON-002 | Consistent Shadow/Elevation Scale | SHOULD | Yes |
| REQ-VCON-003 | Consistent Divider Styling | SHOULD | Yes |
| REQ-VCON-004 | Consistent Interactive Elements | SHOULD | Heuristic |
| REQ-VCON-005 | Icon Style Uniformity | SHOULD | Heuristic |
| REQ-VCON-006 | Consistent Transition Timing | SHOULD | Yes |
| REQ-VCON-007 | Spacing Tokens in Use | SHOULD | Yes |
| REQ-VCON-008 | Consistent Text Color Usage | SHOULD | Yes |

## Further Reading

- [Material Design 3: Design Tokens](https://m3.material.io/foundations/design-tokens/overview)
- [Apple HIG: Visual Design](https://developer.apple.com/design/human-interface-guidelines/color)
- [Design Tokens W3C Community Group](https://www.w3.org/community/design-tokens/)
- [Smashing Magazine: Design Systems](https://www.smashingmagazine.com/category/design-systems/)
- [Brad Frost: Atomic Design](https://atomicdesign.bradfrost.com/)
