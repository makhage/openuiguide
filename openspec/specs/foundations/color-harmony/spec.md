# Foundations: Color Harmony

## Overview

Color harmony is the art of combining colors so they feel intentional, cohesive, and comfortable to view. While contrast ratios and accessibility compliance catch the most critical failures, many color problems are subtler: clashing palettes, vibrating text, inconsistent color temperature, oversaturated surfaces, and ad-hoc color sprawl. These issues make an interface feel amateurish even when every WCAG check passes. The professional approach: build a constrained, intentional palette with consistent temperature, deliberate accent usage, and awareness of how colors interact when placed together.

## Key Concepts

### LEARN: Color Harmony Basics

Color harmony draws from color theory principles applied to UI:
- **Complementary colors** — colors opposite on the color wheel (red/green, blue/orange). High energy but dangerous for text readability.
- **Analogous colors** — colors adjacent on the color wheel. Naturally harmonious, low tension.
- **Color temperature** — warm (red, orange, yellow undertones) vs. cool (blue, green, purple undertones). Mixing temperatures carelessly creates visual dissonance.
- **Saturation** — how vivid or muted a color is. High saturation grabs attention; low saturation recedes. Large saturated areas cause eye fatigue.
- **Vibrating colors** — high-saturation complementary pairs placed adjacent create optical illusions and physical discomfort.

### LEARN: Why Pure Black and White Cause Problems

Pure black (`#000000`) on pure white (`#ffffff`) produces a 21:1 contrast ratio — the theoretical maximum. While this exceeds WCAG minimums, the extreme difference causes **halation** (bright white bleeds around dark letterforms) for users with astigmatism (roughly 50% of the population). Off-black on off-white achieves excellent contrast (~16-18:1) without the harshness.

---

## Requirements

### REQ-HARMONY-001: Avoid Pure Black on Pure White

**Enforcement:** `SHOULD` | Typographic Research, Apple HIG
**Platforms:** All
**Detectable:** Yes — find `color: #000`/`#000000` paired with `background: #fff`/`#ffffff`

#### Why This Matters
Body text using `#000000` on `#ffffff` (or vice versa) produces extreme contrast (21:1) that causes visual strain and halation for many users, particularly those with astigmatism. The effect is especially pronounced on bright screens and in extended reading. Apple's Human Interface Guidelines use systemGray6, not pure white, for exactly this reason.

#### The Principle
- Body text SHOULD NOT use `#000000` on `#ffffff` (or vice versa)
- Use off-black values like `#1a1a2e`, `#2d2d2d`, or `#1e1e1e` for text
- Use off-white values like `#fafafa`, `#f5f5f5`, or `#f8f8f8` for backgrounds
- The resulting contrast (~16-18:1) still far exceeds WCAG AA requirements while being significantly more comfortable to read

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Avoid `color: #000; background: #fff;`. Use `color: #1a1a2e; background: #fafafa;` or semantic tokens. |
| SwiftUI | Use `Color.primary` (which is off-black) instead of `Color.black`. Use `Color(.systemBackground)` instead of `Color.white`. |
| Compose | Use `MaterialTheme.colorScheme.onSurface` (off-black) and `MaterialTheme.colorScheme.surface` (off-white). Never hardcode `Color.Black`/`Color.White` for content. |
| React Native | Avoid `color: '#000000'` and `backgroundColor: '#ffffff'`. Define theme tokens with off-black/off-white values. |

#### Creative Freedom
The specific off-black and off-white values are your choice. Cool off-blacks (bluish), warm off-blacks (brownish), and neutral off-blacks all work. Match the undertone to your brand's color temperature.

#### Sources
- Typographic research on halation and reading comfort
- Apple Human Interface Guidelines (systemGray6, semantic system colors)
- UX research on extended reading and screen fatigue

---

### REQ-HARMONY-002: Limit Total Unique Colors

**Enforcement:** `SHOULD` | Design Systems Best Practice, Material Design 3
**Platforms:** All
**Detectable:** Yes — extract and count all unique hex/rgb/hsl values in CSS

#### Why This Matters
When a project accumulates dozens of unique color values — `#3B82F6` here, `#2563EB` there, `#4A90D9` somewhere else — it signals the absence of a design system. The interface feels patchy and inconsistent. Each ad-hoc color is a maintenance burden and a potential accessibility failure waiting to happen.

#### The Principle
- A project SHOULD use no more than **12-15 unique color values** across all CSS/style definitions
- Colors should come from defined design tokens, not ad-hoc hex values
- Variations (hover states, disabled states) should derive from palette scales, not new one-off values
- Count unique values by auditing all stylesheets, inline styles, and theme definitions

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Audit all CSS files for unique hex/rgb/hsl values. Consolidate into CSS custom properties: `--color-primary`, `--color-surface`, etc. |
| SwiftUI | Define all colors in an asset catalog or `Color` extensions. Search for hardcoded `Color(red:green:blue:)` or `Color(hex:)` calls. |
| Compose | All colors should flow from `MaterialTheme.colorScheme` or a custom theme. Search for hardcoded `Color(0xFF...)` values. |
| React Native | Centralize colors in a theme file. Search for inline hex strings in `StyleSheet.create` and component styles. |

#### Creative Freedom
The 12-15 limit is a guideline for practical constraint, not a hard ceiling. A complex data visualization app may legitimately need more. The key is that every color should be intentional and defined in a central palette.

#### Sources
- Design Systems best practice (Atomic Design, Brad Frost)
- Material Design 3 color system
- Style auditing tools (CSS Stats, Stylelint)

---

### REQ-HARMONY-003: Avoid Vibrating Color Combinations

**Enforcement:** `MUST` | WCAG, Color Theory, Accessibility Research
**Platforms:** All
**Detectable:** Yes — analyze text color and background color, check if they are near-complementary with high saturation

#### Why This Matters
When two highly saturated complementary colors are placed adjacent — red text on a green background, blue on orange, purple on yellow — they create a "vibrating" optical illusion where the boundary between colors appears to shimmer or buzz. This effect causes physical discomfort, headaches, and is particularly harmful for users with visual sensitivities, epilepsy, or migraine disorders. This is not a subjective aesthetic preference; it is a documented physiological response.

#### The Rule
- MUST NOT use saturated complementary color pairs for text-on-background
- Complementary pairs: red/green, blue/orange, purple/yellow (and near-complements within ~30 degrees)
- The issue occurs when **both** colors are highly saturated (saturation > 70% in HSL)
- Desaturating either color eliminates the vibrating effect
- Adding sufficient lightness difference also mitigates the problem

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Check all `color`/`background-color` pairs. Flag combinations where both are high-saturation and near-complementary on the hue wheel. |
| SwiftUI | Audit `foregroundColor`/`background` modifier pairs. Avoid `.red` on `.green` or similarly saturated complements. |
| Compose | Audit `color`/`containerColor` pairs in composables. Avoid `Color.Red` on `Color.Green` and similar combinations. |
| React Native | Check all `color`/`backgroundColor` pairs in stylesheets and inline styles for complementary high-saturation combinations. |

#### Creative Freedom
Complementary color schemes are a valid and powerful design choice — the issue is only with high-saturation complements used for *text on background*. You can use complementary colors for adjacent sections, illustrations, decorative elements, or anywhere text readability is not at stake. Desaturated complements (muted red on sage green) are fine.

#### Sources
- WCAG 2.2 (general accessibility principles)
- Color theory: simultaneous contrast and chromatic vibration
- Accessibility research on photosensitive conditions

---

### REQ-HARMONY-004: Consistent Color Temperature

**Enforcement:** `SHOULD` | Color Theory, Design Systems Best Practice
**Platforms:** All
**Detectable:** Heuristic — analyze gray values for hue shifts, check if grays cluster on warm or cool side

#### Why This Matters
Color temperature is one of the most overlooked aspects of palette cohesion. When warm grays (brownish undertone, like `#8a8070`) are mixed with cool grays (bluish undertone, like `#7a8090`) in the same interface, the result feels unpolished and disjointed — as if two different designers worked on the project without coordinating. Users may not consciously identify the problem, but they perceive it as a lack of quality.

#### The Principle
- The color palette SHOULD maintain consistent color temperature across all neutral/gray values
- Choose either warm grays (slight yellow/brown undertone) or cool grays (slight blue/purple undertone) and use them consistently
- If mixing temperatures, it should be an intentional design choice for contrast (e.g., warm content area, cool navigation) rather than accidental
- Check all gray/neutral values for hue consistency — they should cluster on the same side of the hue wheel

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Define gray scale with consistent undertone: `--gray-100: #f5f5f7;` through `--gray-900: #1d1d1f;` (cool) or `--gray-100: #f5f3f0;` through `--gray-900: #1f1d1a;` (warm). |
| SwiftUI | Use system grays (`Color(.systemGray)`, `.systemGray2` through `.systemGray6`) which maintain consistent cool temperature, or define custom grays with matched undertones. |
| Compose | Material 3 neutral tones are consistently tempered. If overriding, ensure custom grays share the same hue bias. |
| React Native | Define a gray scale in your theme with intentional and consistent undertone across all steps. |

#### Creative Freedom
The choice between warm and cool is entirely creative. Cool grays feel modern, technical, and clean. Warm grays feel approachable, organic, and cozy. Neither is better — but consistency is essential. Intentional temperature mixing (warm brand accent on cool neutral base) can also be sophisticated when done deliberately.

#### Sources
- Color theory (color temperature and harmony)
- Design systems best practice
- Professional palette construction methodology

---

### REQ-HARMONY-005: Limit Accent Color Count

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Heuristic — identify which colors are used for interactive/accent purposes, count them

#### Why This Matters
Accent colors create emphasis — they draw the eye and signal interactivity or importance. When an interface uses three or more distinct accent colors, they compete for attention and none achieves true emphasis. Every color used for emphasis weakens the emphasis of every other color. The result is visual noise where nothing stands out because everything tries to.

#### The Principle
- Use **1-2 accent/brand colors** for interactive elements and emphasis
- A primary accent for main CTAs, active states, and key interactive elements
- An optional secondary accent for less prominent interactive elements or complementary emphasis
- Reserve all other colors for semantic purposes (error, warning, success) or neutral UI
- If you need a third accent, question whether it is truly an accent or should be a semantic color

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Define `--color-accent-primary` and optionally `--color-accent-secondary`. Audit CSS for other colors used on buttons, links, and interactive elements. |
| SwiftUI | Use `.tint()` or `accentColor` for the primary accent. Avoid applying multiple distinct `.foregroundColor` values to interactive elements. |
| Compose | Use `MaterialTheme.colorScheme.primary` and `secondary`. Audit for hardcoded colors on `Button`, `FloatingActionButton`, and clickable elements. |
| React Native | Define `accent` and optionally `accentSecondary` in your theme. Audit `TouchableOpacity`, `Pressable`, and `Button` styles for color consistency. |

#### Creative Freedom
Material Design 3 defines primary, secondary, and tertiary color roles — but tertiary is used with great restraint, typically for complementary accents rather than competing emphasis. You can use a vibrant triadic scheme if it serves your brand, but ensure one color clearly dominates.

#### Sources
- Material Design 3 (primary, secondary, tertiary color roles)
- Apple Human Interface Guidelines (accent color system)
- Visual hierarchy and emphasis principles

---

### REQ-HARMONY-006: Avoid Oversaturated Large Surfaces

**Enforcement:** `SHOULD` | Color Theory, Material Design 3
**Platforms:** All
**Detectable:** Yes — find background-color values, check saturation on elements with large computed areas

#### Why This Matters
A vivid `hsl(220, 95%, 50%)` might look striking as a button color, but when applied to an entire page background, card, or container, it causes rapid eye fatigue. Saturated large surfaces overwhelm the visual system, make text harder to read regardless of contrast ratio, and create afterimage effects when users look away. Material Design 3's tonal surfaces are intentionally desaturated for this reason.

#### The Principle
- Large surface areas (backgrounds, cards, containers, modals) SHOULD NOT use highly saturated colors (saturation > 80% in HSL)
- Reserve high saturation for small accent elements: buttons, badges, icons, indicators, and small interactive elements
- For colored backgrounds, use tonal variants with saturation below 30-40%
- The larger the surface area, the lower the saturation should be

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Audit `background-color` on `body`, `.card`, `.container`, `.modal`, and similar large-area elements. Flag HSL saturation > 80%. |
| SwiftUI | Check `.background()` modifiers on `VStack`, `ScrollView`, `NavigationView`, and full-screen containers. Use desaturated tonal variants. |
| Compose | Check `containerColor` and `Modifier.background()` on `Surface`, `Card`, `Scaffold`. Material 3 tonal surfaces are correct by default. |
| React Native | Audit `backgroundColor` on root `View`, `ScrollView`, `Modal`, and card-like containers. Convert to HSL and check saturation. |

#### Creative Freedom
Bold, saturated backgrounds can be a powerful creative statement for hero sections, splash screens, onboarding flows, or marketing pages. The concern is for persistent UI surfaces where users spend extended time reading and interacting. A saturated hero banner is fine; a saturated background for an entire email client is not.

#### Sources
- Color theory (saturation and visual fatigue)
- Material Design 3 (tonal surface system)
- UX research on extended screen use

---

### REQ-HARMONY-007: Sufficient Color Differentiation

**Enforcement:** `MUST` | WCAG 1.4.1, Data Visualization Research
**Platforms:** All
**Detectable:** Yes — find colors used in similar contexts (badges, statuses, chart series), measure hue/lightness distance

#### Why This Matters
When colors used to distinguish different states, categories, or data series are too similar, users cannot tell them apart. A status system using `#22C55E` for "active" and `#16A34A` for "approved" fails because the two greens are nearly identical at normal viewing distances. This is especially critical for colorblind users, who already have a reduced ability to distinguish certain hue pairs. Status indicators, chart colors, tag systems, and category markers must use perceptibly distinct colors.

#### The Rule
- Colors used to distinguish different meanings MUST be at least **30 degrees apart on the hue wheel** or significantly different in lightness (at least 30% lightness difference in HSL)
- Status indicator colors must be clearly distinguishable at small sizes (badges, dots, icons)
- Chart/data series colors must remain distinguishable to colorblind users (test with simulation tools)
- Tag and category colors must be scannable — users should instantly identify which category something belongs to

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Audit badge, tag, status dot, and chart color values. Convert to HSL and measure hue/lightness distances between colors used in the same context. |
| SwiftUI | Check colors applied to status indicators (`Circle().fill()`), `Badge`, and chart `BarMark`/`LineMark`. Ensure distinct hue or lightness values. |
| Compose | Audit `Badge`, `Chip`, status icon tints, and chart series colors. Verify hue/lightness separation meets thresholds. |
| React Native | Check color values on status badges, category tags, and any charting library color arrays. Measure perceptual distance. |

#### Creative Freedom
You can use any hues you want for your status and category systems. The requirement is differentiation, not specific color choices. Monochromatic systems (all blues, different lightness) are valid if the lightness differences are large enough.

#### Sources
- WCAG 2.2 SC 1.4.1 (Use of Color)
- Data visualization research (ColorBrewer, Tableau color guidelines)
- Color blindness simulation and accessible palette design

---

### REQ-HARMONY-008: Dual-Purpose Color Avoidance

**Enforcement:** `SHOULD` | NNGroup, WCAG 1.4.1, Material Design 3
**Platforms:** All
**Detectable:** Heuristic — check if accent/brand color variables are also used in error/warning contexts

#### Why This Matters
When the same color serves both branding/decorative and semantic purposes, users cannot distinguish between them. If your brand accent is red, and you also use red for error states, a red element could mean "on brand" or "something is wrong" — the user has to rely entirely on context to decode the meaning. This cognitive overhead slows users down and causes misinterpretation, especially in stressful moments when error communication matters most.

#### The Principle
- The same color SHOULD NOT be used for both branding/decoration and semantic meaning (error, warning, success)
- If your brand accent is red, use a distinct shade or different hue for error states (e.g., brand: `#E11D48` rose, error: `#DC2626` true red)
- If your brand accent is green, use a distinct shade for success states
- Semantic colors should be reserved exclusively for their meaning — not reused decoratively
- Check that CSS variables/tokens for brand colors and semantic colors resolve to different values

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Verify that `--color-primary` and `--color-error` resolve to distinct values. If both are red, ensure they are perceptibly different shades. |
| SwiftUI | Ensure `Color.accentColor` and the color used in `.alert()` or error `Text` are visually distinct. |
| Compose | Verify `colorScheme.primary` and `colorScheme.error` are distinct. Material 3 enforces this by default but custom themes may break it. |
| React Native | Check that `theme.colors.primary` and `theme.colors.error` are not the same or near-identical values. |

#### Creative Freedom
This is a constraint on reuse, not on color choice. Your brand can absolutely be red — just ensure your error red is a clearly different red (or an orange-red vs. a cool red). Material Design 3 handles this elegantly by generating distinct error colors from the same seed color.

#### Sources
- Nielsen Norman Group (color and meaning in UI)
- WCAG 2.2 SC 1.4.1 (Use of Color)
- Material Design 3 (error color system, distinct from primary)

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-HARMONY-001 | Avoid Pure Black on Pure White | SHOULD | Yes |
| REQ-HARMONY-002 | Limit Total Unique Colors | SHOULD | Yes |
| REQ-HARMONY-003 | Avoid Vibrating Color Combinations | MUST | Yes |
| REQ-HARMONY-004 | Consistent Color Temperature | SHOULD | Heuristic |
| REQ-HARMONY-005 | Limit Accent Color Count | SHOULD | Heuristic |
| REQ-HARMONY-006 | Avoid Oversaturated Large Surfaces | SHOULD | Yes |
| REQ-HARMONY-007 | Sufficient Color Differentiation | MUST | Yes |
| REQ-HARMONY-008 | Dual-Purpose Color Avoidance | SHOULD | Heuristic |

## Further Reading

- [Material Design 3: Color System](https://m3.material.io/styles/color/overview)
- [Apple HIG: Color](https://developer.apple.com/design/human-interface-guidelines/color)
- [WCAG Understanding SC 1.4.1: Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
- [WCAG Understanding SC 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [ColorBrewer: Color Advice for Maps](https://colorbrewer2.org/)
- [Nielsen Norman Group: Color in Design](https://www.nngroup.com/topic/color/)
- [Data Visualization Color Guidelines](https://blog.datawrapper.de/colorguide/)
