# Foundations: Text Overflow and Clipping

## Overview

Text overflow, clipping, and overlap are among the most common visual bugs in user interfaces. They happen when text content outgrows its container -- whether because of dynamic content, translations, user-generated input, or viewport changes -- and no strategy is in place to handle it gracefully. The result is text bleeding into neighboring elements, disappearing behind boundaries, or stacking on top of other content.

The core insight: **every text container must have an explicit strategy for what happens when its content exceeds its bounds.** This means pairing size constraints with overflow rules, using flexible sizing for dynamic content, and reserving proper space for positioned elements.

## Key Concepts

### LEARN: The Overflow Problem

When a container has a fixed dimension (height, width, or both) but its text content exceeds that dimension, the browser's default behavior is to let the text visually overflow -- rendering outside the container's box. This text then overlaps whatever comes next in the layout. The same problem occurs with absolute/fixed positioning, negative margins, and missing responsive constraints.

### LEARN: Overflow Strategies

There are several valid strategies for handling text that exceeds its container:

- **Truncation with ellipsis** -- cut the text and show `...` to indicate more exists
- **Scrolling** -- allow the user to scroll within the container
- **Clamping** -- show a fixed number of lines with a "read more" affordance
- **Wrapping and reflow** -- let the container grow to fit the text
- **Responsive sizing** -- use flexible units so containers adapt to viewport and content

### LEARN: Stacking and Overlap

Z-index and positioning create layers in the interface. Without a deliberate stacking system, elements overlap unpredictably -- tooltips hide behind modals, dropdown menus appear under cards, and absolutely positioned labels cover body text.

---

## Requirements

### REQ-TEXT-001: Overflow Handling on Fixed-Height Text Containers

**Enforcement:** `MUST` | CSS Overflow Module, WCAG 2.2 SC 1.4.4
**Platforms:** All
**Detectable:** Yes -- find fixed height on text-containing elements without overflow rules

#### Why This Matters
When a container has a fixed `height` or `max-height` and contains text, the text will overflow its bounds if the content is longer than expected. This causes text to visually overlap neighboring elements, breaking layouts and making content unreadable. It is especially dangerous with dynamic content, translations, or user input where text length is unpredictable.

#### The Rule
- Any element with a fixed `height` or `max-height` that contains text MUST have an explicit `overflow` strategy
- Valid strategies: `overflow: auto` (scrollable), `overflow: hidden` with `text-overflow: ellipsis`, or `overflow: scroll`
- `overflow: visible` (the default) is NOT a valid strategy for fixed-height text containers

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Set `overflow: auto` or `overflow: hidden; text-overflow: ellipsis;` on any fixed-height text container. |
| SwiftUI | Use `.lineLimit(n)` with `.truncationMode(.tail)`. For scrollable text, wrap in `ScrollView`. |
| Compose | Use `maxLines` with `overflow = TextOverflow.Ellipsis` on `Text()`. For scrollable: `Modifier.verticalScroll()`. |
| React Native | Use `numberOfLines` prop on `<Text>` for truncation. Wrap in `<ScrollView>` for scrollable overflow. |

#### Creative Freedom
You choose the strategy -- truncation, scrolling, or clamping. The requirement is that you choose one rather than letting text overflow silently.

#### Common Mistakes
- Setting `height: 200px` on a card body without any `overflow` property
- Using `max-height` to constrain a text area but forgetting `overflow: auto`
- Assuming content will always fit because it does in the design mockup

#### How to Fix
Audit every element with `height` or `max-height` that contains text. Add `overflow: hidden; text-overflow: ellipsis;` for truncation or `overflow: auto` for scrolling.

---

### REQ-TEXT-002: Text Truncation with Ellipsis

**Enforcement:** `SHOULD` | CSS Text Module Level 3
**Platforms:** Web, SwiftUI, Compose, React Native
**Detectable:** Yes -- find `white-space: nowrap` without `text-overflow: ellipsis`

#### Why This Matters
Using `white-space: nowrap` alone prevents text from wrapping to the next line but does nothing to contain it within its box. The text extends horizontally beyond the container, overlapping adjacent content or triggering horizontal scrollbars. This is one of the most common causes of text overflow bugs.

#### The Rule
- When `white-space: nowrap` is used, it SHOULD be paired with `overflow: hidden` and `text-overflow: ellipsis`
- The full truncation pattern requires all three properties together
- Without this trio, single-line text overflow is visually broken

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Apply the trio: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` Always together. |
| SwiftUI | `.lineLimit(1)` with `.truncationMode(.tail)` handles this automatically. |
| Compose | `Text(text, maxLines = 1, overflow = TextOverflow.Ellipsis)` |
| React Native | `<Text numberOfLines={1} ellipsizeMode="tail">` |

#### Creative Freedom
If `nowrap` is intentional and the container is wide enough by design (e.g., a full-width banner headline), you may omit ellipsis. The rule targets cases where overflow is unintended.

#### Common Mistakes
- Adding `white-space: nowrap` without `overflow: hidden`
- Setting `overflow: hidden` but forgetting `text-overflow: ellipsis` (text is clipped mid-character)
- Applying `nowrap` to elements with dynamic or translated content

#### How to Fix
Search for every instance of `white-space: nowrap` and ensure it is paired with `overflow: hidden` and `text-overflow: ellipsis`.

---

### REQ-TEXT-003: Line Clamping with Access to Full Text

**Enforcement:** `SHOULD` | WCAG 2.2 SC 1.3.1, CSS Overflow Module Level 4
**Platforms:** Web, SwiftUI, Compose, React Native
**Detectable:** Heuristic -- find `line-clamp` usage, check sibling/parent for title or expand mechanism

#### Why This Matters
Line clamping (`-webkit-line-clamp` or `line-clamp`) visually hides content after a specified number of lines. While this is a useful layout tool, users need a way to access the hidden text. If clamped text has no expansion mechanism, users cannot read the full content, which is especially problematic for critical information like product descriptions, error messages, or legal text.

#### The Rule
- When `-webkit-line-clamp` or `line-clamp` is used, the full text SHOULD be accessible through at least one of:
  - A `title` attribute on the element
  - A "Read more" / "Show more" expandable control
  - A tooltip on hover/focus
  - A detail view link
- Critical content (errors, warnings, legal) MUST NOT be clamped without an expansion mechanism

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Use `-webkit-line-clamp` with `display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;`. Add `title` attr or a JS-powered "Show more" button. |
| SwiftUI | `.lineLimit(n)` with a `Button("Show more")` that toggles the limit to `nil`. |
| Compose | `maxLines = n` on `Text()`, with a clickable "Show more" that sets `maxLines = Int.MAX_VALUE`. |
| React Native | `numberOfLines={n}` with an `onTextLayout` callback to detect truncation and show an expand button. |

#### Creative Freedom
The expansion mechanism is your choice -- tooltip, inline expand, modal, or navigation to a detail view. The requirement is that one exists.

#### Common Mistakes
- Clamping product descriptions without any way to read the full text
- Using `line-clamp` on error messages, hiding critical information
- Providing a `title` attribute but no keyboard/touch-accessible alternative

#### How to Fix
For every use of `line-clamp`, add a `title` attribute as a baseline and consider adding a "Show more" toggle for better UX.

---

### REQ-TEXT-004: Avoid Fixed Width on Dynamic Text Containers

**Enforcement:** `SHOULD` | CSS Sizing Module, Internationalization Best Practices
**Platforms:** All
**Detectable:** Yes -- find fixed `width` on elements with text children

#### Why This Matters
Fixed pixel widths on text containers break when content length varies. User names, translated strings, and dynamic data routinely exceed anticipated lengths. A button sized `width: 120px` for "Submit" will clip "Absenden" (German) or overflow with "Enregistrer les modifications" (French). This causes text truncation, overflow, or broken layouts.

#### The Rule
- Elements containing dynamic or user-generated text SHOULD NOT use fixed `width` in pixels
- Use `min-width` / `max-width` with flexible units (`%`, `em`, `rem`, `ch`) or `fit-content`
- If a fixed width is truly necessary, pair it with `overflow: hidden; text-overflow: ellipsis;`

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Use `min-width` / `max-width` instead of `width`. Prefer `width: fit-content` or `width: max-content` with a `max-width`. |
| SwiftUI | Avoid `.frame(width:)` on text. Use `.frame(maxWidth:)` or let the layout system size text naturally. |
| Compose | Avoid `Modifier.width()` on text. Use `Modifier.widthIn(max = ...)` or `Modifier.fillMaxWidth()`. |
| React Native | Avoid fixed `width` in `style`. Use `flex: 1` or `maxWidth` with `flexShrink`. |

#### Creative Freedom
Fixed widths are fine for non-text elements (icons, avatars, spacers) and for text containers where the content is guaranteed to be a fixed length (e.g., a two-letter country code).

#### Common Mistakes
- Buttons with `width: 120px` that clip translated labels
- Sidebar menus with `width: 200px` and no overflow strategy for long menu items
- Table columns with fixed pixel widths that truncate data

#### How to Fix
Replace `width: Xpx` with `min-width: Xpx; max-width: Ypx;` or use `width: fit-content`. Add overflow handling as a fallback.

---

### REQ-TEXT-005: Absolute/Fixed Positioning Text Overlap Prevention

**Enforcement:** `MUST` | CSS Positioned Layout Module
**Platforms:** Web, SwiftUI, Compose, React Native
**Detectable:** Yes -- find absolutely positioned text elements

#### Why This Matters
Text elements with `position: absolute` or `position: fixed` are removed from the normal document flow. Without explicit bounds, they can grow indefinitely and overlap other content. Without a positioned parent, they position relative to the viewport, landing in unpredictable locations. This creates overlapping text that is both unreadable and inaccessible.

#### The Rule
- Text elements using `position: absolute` or `position: fixed` MUST have explicit bounds (`max-width`, `width`, or containment)
- Their parent container MUST have `position: relative` (or another positioned value) to establish a positioning context
- The parent MUST reserve enough space so that the positioned text does not overlap siblings in the normal flow

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Set `position: relative` on the parent. Give the absolute child `max-width` and ensure the parent has enough padding/height to reserve space. |
| SwiftUI | Use `.overlay()` or `ZStack` with explicit alignment and frame constraints. Avoid `GeometryReader` hacks that bypass layout. |
| Compose | Use `Box` with `Modifier.align()` for overlays. Set explicit size constraints on positioned children. |
| React Native | Use `position: 'absolute'` with explicit `top`/`left`/`right`/`bottom` and `maxWidth`. Parent needs defined dimensions. |

#### Creative Freedom
Positioned text is legitimate for badges, labels, watermarks, and floating UI. The requirement is that it has bounds and a positioning context, not that you avoid positioning entirely.

#### Common Mistakes
- Absolutely positioned badge text without `max-width`, overflowing on long strings
- Forgetting `position: relative` on the parent, causing text to position relative to the viewport
- Not reserving space in the parent, so the positioned text covers sibling elements

#### How to Fix
For every `position: absolute` or `position: fixed` text element, ensure: (1) the parent has `position: relative`, (2) the element has `max-width` or `width`, and (3) the parent reserves space via padding or min-height.

---

### REQ-TEXT-006: Z-Index Stacking Order

**Enforcement:** `SHOULD` | CSS Positioned Layout Module Level 3
**Platforms:** Web, SwiftUI, Compose, React Native
**Detectable:** Heuristic -- count unique z-index values in CSS, check if they follow a defined scale

#### Why This Matters
Random z-index values (`z-index: 999`, `z-index: 99999`) lead to an arms race where each new component uses a higher number to "win." This causes overlapping layers where tooltips hide behind modals, dropdowns appear under cards, and notification banners cover interactive elements. A defined scale prevents these conflicts.

#### The Rule
- Projects SHOULD use a defined z-index scale using CSS custom properties or named constants
- Recommended scale: `--z-dropdown: 100`, `--z-sticky: 200`, `--z-modal: 300`, `--z-popover: 400`, `--z-tooltip: 500`, `--z-toast: 600`
- Arbitrary z-index values (e.g., `z-index: 9999`) SHOULD be flagged and replaced with scale values
- Components SHOULD NOT set z-index unless they participate in the stacking system

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Define a z-index scale in `:root` as custom properties. Reference them: `z-index: var(--z-modal)`. Lint for raw z-index numbers. |
| SwiftUI | Use `.zIndex()` sparingly. Define constants: `enum ZIndex { static let modal = 300.0 }`. |
| Compose | Manage stacking through composable order in `Box`. Use `Modifier.zIndex()` with named constants when needed. |
| React Native | Use `zIndex` style prop with a constants file. Note: `zIndex` only works on iOS by default; Android may need `elevation`. |

#### Creative Freedom
The exact scale values and tier names are up to your project. The requirement is that a scale exists and is used consistently, not that you use specific numbers.

#### Common Mistakes
- `z-index: 99999` to "make sure it's on top"
- Different developers using different arbitrary values across the codebase
- Setting `z-index` without `position: relative/absolute/fixed`, which has no effect in CSS

#### How to Fix
Define a z-index scale in your design tokens. Search for all raw `z-index` values and replace them with scale references. Add a lint rule to flag raw z-index numbers.

---

### REQ-TEXT-007: Negative Margins on Text Elements

**Enforcement:** `SHOULD` | CSS Box Model Module
**Platforms:** Web, React Native
**Detectable:** Yes -- find negative margin values

#### Why This Matters
Negative margins pull elements into adjacent space, causing text to overlap neighboring content. While negative margins have legitimate uses in advanced layout (e.g., breaking out of a container), they are frequently misused to "fix" spacing issues, creating fragile overlaps that break at different content lengths or viewport sizes.

#### The Rule
- Negative margins (`margin-top: -10px`, `margin-left: -20px`, etc.) SHOULD NOT be used on or adjacent to text elements
- Use proper layout mechanisms instead: flexbox `gap`, CSS Grid, padding adjustments
- If negative margins are necessary for a layout technique, the element MUST also have overflow handling to prevent text overlap

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Replace negative margins with flexbox `gap`, Grid layout, or `transform: translateY()` for visual offset without layout impact. |
| SwiftUI | Use `.padding()` with positive values and `.offset()` for visual adjustments. Negative padding is not supported. |
| Compose | Use `Modifier.offset()` for visual repositioning. Avoid `Modifier.padding()` with negative values (not supported). |
| React Native | Avoid negative `margin` values. Use `position: 'absolute'` with explicit bounds if overlay is needed. |

#### Creative Freedom
Negative margins are acceptable for non-text layout techniques (e.g., full-bleed images, overlapping card designs) where the overlap is intentional and does not obscure text content.

#### Common Mistakes
- `margin-top: -15px` to "tighten up" spacing between a heading and paragraph
- Negative margins to align elements that should be in a flex/grid container
- Negative margins that work in one language but cause overlap in longer translations

#### How to Fix
Search for all negative margin values. For each one on or near a text element, replace with a proper layout approach (flexbox gap, grid, adjusted padding).

---

### REQ-TEXT-008: Responsive Text Container Sizing

**Enforcement:** `MUST` | WCAG 2.2 SC 1.4.10 (Reflow), CSS Sizing Module
**Platforms:** Web, SwiftUI, Compose, React Native
**Detectable:** Yes -- find fixed px widths on text containers without responsive overrides

#### Why This Matters
A text container with a fixed pixel width (e.g., `width: 600px`) cannot reflow at narrow viewports. On mobile, this forces horizontal scrolling or causes text to overflow the viewport. WCAG 2.2 SC 1.4.10 requires content to reflow without horizontal scrolling at 320px CSS width. Fixed-width text containers are the most common violation of this requirement.

#### The Rule
- Text containers MUST NOT have a fixed pixel width that prevents text from reflowing at narrow viewports
- Use percentage widths, viewport units (`vw`), container-relative units (`cqi`), or `max-width` with a flexible base
- If a fixed width is used at larger viewports, a media query or container query MUST override it at narrow viewports

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Use `max-width: 600px; width: 100%;` instead of `width: 600px`. Add `@media (max-width: 640px) { width: 100%; }` for fixed-width elements. |
| SwiftUI | Use `.frame(maxWidth: 600)` instead of `.frame(width: 600)`. In compact size class, let width be unconstrained. |
| Compose | Use `Modifier.widthIn(max = 600.dp)` instead of `Modifier.width(600.dp)`. Adapt in `WindowSizeClass.Compact`. |
| React Native | Use `maxWidth` with `flex: 1` or percentage widths. Adjust with `Dimensions` or `useWindowDimensions()` for small screens. |

#### Creative Freedom
Fixed widths are acceptable when used with responsive overrides that ensure reflow at narrow viewports. The requirement is that text is always readable without horizontal scrolling.

#### Common Mistakes
- `width: 800px` on an article container with no responsive override
- Cards with `width: 350px` that overflow the viewport on 320px screens
- Sidebar layouts with fixed pixel widths that do not collapse on mobile

#### How to Fix
Search for fixed `width` values in pixels on text containers. Replace with `max-width` and `width: 100%`. Add responsive breakpoints to handle narrow viewports.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-TEXT-001 | Overflow Handling on Fixed-Height Text Containers | MUST | Yes |
| REQ-TEXT-002 | Text Truncation with Ellipsis | SHOULD | Yes |
| REQ-TEXT-003 | Line Clamping with Access to Full Text | SHOULD | Heuristic |
| REQ-TEXT-004 | Avoid Fixed Width on Dynamic Text Containers | SHOULD | Yes |
| REQ-TEXT-005 | Absolute/Fixed Positioning Text Overlap Prevention | MUST | Yes |
| REQ-TEXT-006 | Z-Index Stacking Order | SHOULD | Heuristic |
| REQ-TEXT-007 | Negative Margins on Text Elements | SHOULD | Yes |
| REQ-TEXT-008 | Responsive Text Container Sizing | MUST | Yes |

## Further Reading

- [MDN: overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
- [MDN: text-overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)
- [MDN: -webkit-line-clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp)
- [CSS Overflow Module Level 3 (W3C)](https://www.w3.org/TR/css-overflow-3/)
- [CSS Overflow Module Level 4 (W3C)](https://www.w3.org/TR/css-overflow-4/)
- [web.dev: Truncating text](https://web.dev/articles/css-text-wrap-balance)
- [WCAG 2.2 SC 1.4.4: Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)
- [WCAG 2.2 SC 1.4.10: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [CSS Positioned Layout Module Level 3 (W3C)](https://www.w3.org/TR/css-position-3/)
