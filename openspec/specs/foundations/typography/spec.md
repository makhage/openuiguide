# Foundations: Typography

## Overview

Typography is the single most impactful design decision you'll make. Text accounts for 80-95% of the information on most interfaces. Getting type right — scale, weight, spacing, and hierarchy — elevates an amateur interface to a professional one. Getting it wrong makes even beautiful layouts feel cheap.

The core insight: **use a constrained type system with a mathematical scale, limited weights, and consistent line heights.** This creates rhythm and hierarchy without requiring design expertise.

## Key Concepts

### LEARN: The Type Scale

A type scale is a set of font sizes derived from a mathematical ratio, just like musical intervals. Instead of choosing sizes ad hoc (14px here, 15px there, 17px somewhere), you pick a ratio and generate sizes from it:

- **Base size × ratio^n** produces each step
- Common ratios: 1.125 (minor second), 1.200 (minor third), 1.250 (major third), 1.333 (perfect fourth), 1.618 (golden ratio)
- A major third (1.250) scale from 16px base: 10, 12, 16, 20, 25, 31, 39, 49

### LEARN: Typographic Hierarchy

Hierarchy tells users what to read first, second, and third. It's created through a combination of:
- **Size** — larger text draws attention first
- **Weight** — bolder text stands out from regular text
- **Color/contrast** — darker or more saturated text dominates lighter text
- **Position** — top-left content (in LTR languages) is read first
- **Whitespace** — text with more surrounding space appears more important

### LEARN: The Anatomy of Readable Text

Three properties determine whether text is comfortable to read:
1. **Font size** — minimum 16px for body text on screens
2. **Line height (leading)** — the vertical space between baselines, typically 1.4-1.6× font size for body text
3. **Line length (measure)** — the number of characters per line, optimally 45-75 characters for body text

---

## Requirements

### REQ-TYPO-001: Minimum Body Text Size

**Enforcement:** `MUST` | WCAG, Apple HIG, Material Design 3
**Platforms:** All
**Detectable:** Yes — check computed font sizes for body text

#### Why This Matters
Text below 16px on screens becomes difficult to read for many users, especially on mobile. Small body text is the most common reason users zoom or abandon a page. The 16px standard isn't arbitrary — it's the default browser font size and matches comfortable reading distance for screens.

#### The Rule
- Body text MUST be at least **16px / 1rem** (web), **17pt** (iOS), **14sp** (Android, with system scaling)
- Secondary text (captions, timestamps) may go as low as **12px** but should be used sparingly
- Never set body text below 12px for any purpose

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | `font-size: 1rem` (inherits browser default, usually 16px). Never set `html { font-size: 10px }` as a "convenience." |
| SwiftUI | `.font(.body)` uses 17pt. Custom: minimum `Font.system(size: 17)` |
| Compose | `MaterialTheme.typography.bodyLarge` (16sp). Custom: minimum `14.sp` with system scaling. |
| Flutter | `Theme.of(context).textTheme.bodyLarge` (16sp). Respect `textScaleFactor`. |

#### Common Mistakes
- Setting `html { font-size: 62.5% }` (makes 1rem = 10px, breaks user preferences)
- Body text at 14px to "fit more content"
- Mobile interfaces with 12px body text

#### How to Fix
Set body text to 1rem/16px minimum. If you need more content density, improve layout rather than shrinking text.

---

### REQ-TYPO-002: Type Scale Consistency

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Heuristic — flag more than 6-8 distinct font sizes

#### Why This Matters
When an interface uses 12 different font sizes, none of them feel intentional. A constrained scale (5-8 sizes) creates clear hierarchy — users instantly know what's a heading, subheading, body, or caption. It also makes responsive design easier.

#### The Principle
- Define a **type scale** with 5-8 distinct sizes
- Every text element should map to a step on your scale
- Avoid one-off sizes that don't fit the scale

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Define tokens: `--text-xs: 0.75rem; --text-sm: 0.875rem; --text-base: 1rem; --text-lg: 1.125rem; --text-xl: 1.25rem; --text-2xl: 1.5rem; --text-3xl: 1.875rem;` |
| SwiftUI | Use system styles: `.caption2`, `.caption`, `.footnote`, `.body`, `.title3`, `.title2`, `.title`, `.largeTitle` |
| Compose | Use Material type scale: `labelSmall`, `bodySmall`, `bodyLarge`, `titleMedium`, `headlineSmall`, `displaySmall` |
| Flutter | Use `TextTheme`: `labelSmall`, `bodySmall`, `bodyLarge`, `titleMedium`, `headlineSmall`, `displaySmall` |

#### Creative Freedom
The ratio is yours to choose. A 1.125 ratio creates a subtle, compact scale good for data-dense UIs. A 1.333 ratio creates a bold, dramatic scale good for editorial/marketing. Pick what matches your product's character.

#### Common Mistakes
- More than 8 distinct font sizes in a single application
- One-off sizes for specific elements ("this card title needs 19px")
- Different type scales on different screens

#### How to Fix
Audit all font sizes in use. Map each to the nearest scale step. Extract to tokens/variables.

---

### REQ-TYPO-003: Line Height for Body Text

**Enforcement:** `MUST` | WCAG 2.2 SC 1.4.12, Typography Best Practice
**Platforms:** All
**Detectable:** Yes — check line-height values on body text elements

#### Why This Matters
Line height that's too tight causes lines to visually merge, making reading exhausting. Too loose and the eye can't track from the end of one line to the start of the next. The sweet spot for body text on screens is well-established through decades of research.

#### The Rule
- Body text MUST have a line-height between **1.4 and 1.6** times the font size
- For most body text, **1.5** is the ideal starting point
- Headings can use tighter line-height (1.1-1.3) because they're shorter
- Small text (captions) may need slightly more generous line-height (1.5-1.7)

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | `line-height: 1.5` on body text. Use unitless values (not px) so they scale with font-size. |
| SwiftUI | `.lineSpacing(8)` for additional spacing, or use system font styles which have appropriate defaults |
| Compose | `TextStyle(lineHeight = 24.sp)` for 16sp body text (1.5×) |
| Flutter | `TextStyle(height: 1.5)` — the `height` property is a multiplier of font size |

#### Common Mistakes
- `line-height: 1` or `line-height: 1.2` on body text (too tight)
- Using pixel values for line-height that don't scale with font size changes
- Same line-height for both headings and body text

#### How to Fix
Set `line-height: 1.5` on all body text. Adjust headings to 1.1-1.3. Use unitless values.

---

### REQ-TYPO-004: Line Length (Measure)

**Enforcement:** `SHOULD` | Butterick's Practical Typography, Readability Research
**Platforms:** All
**Detectable:** Yes — check content width against character count

#### Why This Matters
Lines that are too long make the eye lose track when jumping to the next line. Lines that are too short cause excessive line-breaks and disrupt reading rhythm. The optimal range (45-75 characters) has been validated by readability research since the 1920s.

#### The Principle
- Body text lines SHOULD be **45-75 characters** wide (including spaces)
- The ideal target is **65 characters** per line
- Set a `max-width` on text containers in character-relative units (`ch`)

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | `max-width: 65ch` on text containers. The `ch` unit is relative to the "0" character width. |
| SwiftUI | `.frame(maxWidth: 600)` for content areas (approximates 65 characters at body size) |
| Compose | `Modifier.widthIn(max = 600.dp)` for text-heavy content areas |
| Flutter | `ConstrainedBox(constraints: BoxConstraints(maxWidth: 600))` for text containers |

#### Creative Freedom
Short-form content (dashboards, cards) can go below 45 characters. Long-form reading (articles, documentation) should stay within the 45-75 range. Marketing headlines intentionally break measure rules for visual impact.

#### Common Mistakes
- Full-width text on desktop screens (100+ characters per line)
- No max-width on blog/article content containers
- Text in ultra-wide cards stretching to 100+ characters

#### How to Fix
Add `max-width: 65ch` (or 60-70ch) to the text container, not the page container.

---

### REQ-TYPO-005: Font Weight Usage

**Enforcement:** `SHOULD` | Typography Best Practice
**Platforms:** All
**Detectable:** Heuristic — flag more than 3-4 distinct font weights

#### Why This Matters
Weight is one of the primary tools for typographic hierarchy. But when an interface uses 6 different weights (thin, light, regular, medium, semibold, bold), none of them stand out clearly. Constraining to 2-3 weights creates decisive hierarchy.

#### The Principle
- Use **2-3 font weights** maximum in your type system
- **Regular (400)** for body text and most content
- **Medium (500) or Semibold (600)** for emphasis, subheadings, labels
- **Bold (700)** for headings and strong emphasis
- Avoid light/thin weights (100-300) for body text on screens — they reduce readability

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Define weight tokens: `--font-regular: 400; --font-medium: 500; --font-bold: 700;` |
| SwiftUI | Use `.regular`, `.medium`, `.semibold`, `.bold` — pick 2-3 and use consistently |
| Compose | Use `FontWeight.Normal`, `FontWeight.Medium`, `FontWeight.Bold` |
| Flutter | Use `FontWeight.w400`, `FontWeight.w500`, `FontWeight.w700` |

#### Creative Freedom
Your weight choices affect personality. A system using only Regular and Bold feels assertive and clean. A system using Regular, Medium, and Semibold feels nuanced and sophisticated. Match to your brand.

#### Common Mistakes
- Using 5+ different font weights
- Light/thin body text that becomes invisible on low-quality displays
- Bold used for everything (if everything is bold, nothing is bold)

#### How to Fix
Pick 2-3 weights. Map every text style in your system to one of them.

---

### REQ-TYPO-006: Font Family Limiting

**Enforcement:** `SHOULD` | Typography Best Practice
**Platforms:** All
**Detectable:** Yes — count distinct font families in use

#### Why This Matters
Each additional font family adds visual complexity and cognitive load. Mixing too many typefaces creates a ransom-note effect. Professional interfaces typically use 1-2 font families, creating cohesion through constraint.

#### The Principle
- Use **1-2 font families** maximum
- One font family is sufficient for most interfaces (vary weight and size for hierarchy)
- If using two: one for headings (display/serif), one for body (text/sans-serif)
- Every platform provides excellent system fonts — custom fonts should add clear value

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | System font stack: `font-family: system-ui, -apple-system, sans-serif;` or 1-2 custom fonts loaded via `@font-face` |
| SwiftUI | System: `.font(.body)` uses SF Pro. Custom: `.font(.custom("Poppins", size: 16))` |
| Compose | System: `MaterialTheme.typography` uses Roboto. Custom: `FontFamily(Font(R.font.poppins))` |
| Flutter | System: `Theme` defaults to Roboto/SF. Custom: `TextStyle(fontFamily: 'Poppins')` |

#### Creative Freedom
Font choice is one of the most impactful creative decisions. A geometric sans-serif (Inter, Poppins) feels modern. A humanist sans-serif (Source Sans, Noto) feels warm. A serif (Lora, Merriweather) feels editorial. Choose deliberately — but choose few.

#### Common Mistakes
- 3+ font families in one interface
- Using a custom font that's nearly identical to the system font (adds load time for no visual benefit)
- Loading all weights of a custom font when only 2-3 are used

#### How to Fix
Audit font families in use. Reduce to 1-2. Remove unused font weight files.

---

### REQ-TYPO-007: Font Loading Performance

**Enforcement:** `SHOULD` | Web Performance Best Practice
**Platforms:** Web
**Detectable:** Yes — check @font-face declarations for font-display

#### Why This Matters
Custom fonts that load slowly cause either invisible text (FOIT — Flash of Invisible Text) or text that shifts when the font loads (FOUT — Flash of Unstyled Text). Both degrade the user experience. The `font-display` property controls this behavior.

#### The Principle
- Custom fonts SHOULD use `font-display: swap` (show fallback immediately, swap when loaded) or `font-display: optional` (use font only if already cached)
- Subset fonts to only include characters you need
- Preload critical fonts with `<link rel="preload">`

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | `@font-face { font-display: swap; }` — always include this property |
| SwiftUI | System fonts are pre-loaded. Custom fonts bundled in the app load instantly. |
| Compose | Bundled fonts load instantly. Downloadable fonts: use `GoogleFont` with fallback. |
| Flutter | Bundled fonts load instantly. Use `FontLoader` for async loading with fallback. |

#### Common Mistakes
- Missing `font-display` property entirely (browser default is `auto`, often causes FOIT)
- Loading 6+ font files (regular, italic, bold, bold-italic, etc.) when only 2-3 are needed
- Not preloading the primary font file

#### How to Fix
Add `font-display: swap` to all `@font-face` declarations. Subset fonts. Preload critical files.

---

### REQ-TYPO-008: Heading Hierarchy

**Enforcement:** `MUST` | WCAG 2.2 SC 1.3.1, Semantic HTML
**Platforms:** All
**Detectable:** Yes — check heading level order

#### Why This Matters
Screen readers allow users to navigate by heading level. Skipping levels (h1 → h3) breaks this navigation and confuses the content structure. Headings must descend in order to create a logical outline.

#### The Rule
- Heading levels MUST NOT skip (e.g., h1 → h3 without h2)
- Each page should have exactly **one h1** (the page title)
- Headings MUST be used for structure, not just for visual styling
- Don't use headings just because you want big/bold text — use CSS for that

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (HTML) | Use `<h1>` through `<h6>` in order. Don't skip levels. One `<h1>` per page. |
| SwiftUI | Use `.font(.largeTitle)` for h1, `.title` for h2, etc. Use `AccessibilityHeading` trait. |
| Compose | Use `semantics { heading() }` on heading text. Maintain logical order. |
| Flutter | Use `Semantics(header: true)` on heading widgets. Maintain logical order. |

#### Common Mistakes
- Multiple h1 elements on a page
- Jumping from h2 to h4 because h3 "looks too big"
- Using `<h3>` for a card title that should be a `<p>` with styling

#### How to Fix
Map your visual hierarchy to heading levels. Style with CSS, not heading tags. If an h3 looks too big, change its CSS, don't skip to h4.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-TYPO-001 | Minimum Body Text Size | MUST | Yes |
| REQ-TYPO-002 | Type Scale Consistency | SHOULD | Heuristic |
| REQ-TYPO-003 | Line Height for Body Text | MUST | Yes |
| REQ-TYPO-004 | Line Length (Measure) | SHOULD | Yes |
| REQ-TYPO-005 | Font Weight Usage | SHOULD | Heuristic |
| REQ-TYPO-006 | Font Family Limiting | SHOULD | Yes |
| REQ-TYPO-007 | Font Loading Performance | SHOULD | Yes |
| REQ-TYPO-008 | Heading Hierarchy | MUST | Yes |

## Further Reading

- [Material Design 3: Typography](https://m3.material.io/styles/typography/overview)
- [Apple HIG: Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- [Butterick's Practical Typography](https://practicaltypography.com/)
- [The Elements of Typographic Style Applied to the Web](https://webtypography.net/)
- [WCAG SC 1.4.12: Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)
