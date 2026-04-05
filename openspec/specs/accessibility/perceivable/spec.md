# Accessibility: Perceivable

## Overview

The first principle of web accessibility: information and UI components must be presentable to users in ways they can perceive. This means content cannot rely on a single sense — if something is visual, it needs a text alternative; if something conveys meaning through color, it needs a redundant indicator.

These are **non-negotiable rules**, not style preferences. They are legally mandated in many jurisdictions (ADA, EAA, EN 301 549) and directly impact whether people with disabilities can use your product. Every requirement in this spec is enforcement level `MUST`.

## Key Concepts

### LEARN: The Four Principles of Accessibility (POUR)

WCAG is organized around four principles. "Perceivable" is the first:
1. **Perceivable** — Users must be able to perceive the information (this spec)
2. **Operable** — Users must be able to operate the interface
3. **Understandable** — Users must be able to understand the information
4. **Robust** — Content must be robust enough for diverse user agents

### LEARN: Who Benefits

Perceivability rules help:
- **Blind users** who rely on screen readers (need text alternatives for images)
- **Low-vision users** who need sufficient contrast and resizable text
- **Deaf users** who need captions for audio content
- **Color-blind users** (~8% of men) who need meaning conveyed beyond color alone
- **Everyone** in suboptimal conditions: bright sunlight, small screens, noisy environments

---

## Requirements

### REQ-A11Y-P-001: Text Alternatives for Images

**Enforcement:** `MUST` | WCAG 2.2 SC 1.1.1 (Level A)
**Platforms:** All
**Detectable:** Yes — check for missing alt attributes on images

#### Why This Matters
Screen readers announce images by reading their alt text. Without it, a blind user encounters an image-shaped void in the content — or worse, hears the file name ("DSC_0847.jpg"). This is the single most common accessibility failure found in audits.

#### The Rule
- Every `<img>` element MUST have an `alt` attribute
- **Informative images** MUST have descriptive alt text that conveys the same information
- **Decorative images** MUST have an empty alt attribute (`alt=""`) to be skipped by screen readers
- **Functional images** (inside links/buttons) MUST have alt text describing the action, not the image
- Complex images (charts, diagrams) MUST have both a brief alt and a longer description

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (HTML) | `<img src="..." alt="Description">` or `alt=""` for decorative. Use `aria-describedby` for complex images. |
| SwiftUI | `Image("photo").accessibilityLabel("Description")` or `.accessibilityHidden(true)` for decorative |
| Compose | `Image(painter, contentDescription = "Description")` or `contentDescription = null` for decorative |
| Flutter | `Image.asset('photo', semanticLabel: 'Description')` or `Semantics(excludeSemantics: true)` |

#### Common Mistakes
- Missing alt attribute entirely (not the same as `alt=""`)
- Generic alt text: "image", "photo", "icon", "banner"
- Alt text that describes appearance instead of meaning: "red circle" instead of "error indicator"
- Decorative images with descriptive alt text (adds noise for screen reader users)
- Logo images inside links with alt="logo" instead of alt="Company Name - Home"

#### How to Fix
For each image, ask: "If this image disappeared, what information would be lost?" The answer is your alt text. If no information would be lost, use `alt=""`.

---

### REQ-A11Y-P-002: Color Contrast — Normal Text

**Enforcement:** `MUST` | WCAG 2.2 SC 1.4.3 (Level AA)
**Platforms:** All
**Detectable:** Yes — compute contrast ratio from color values

#### Why This Matters
Low-contrast text is the most common accessibility failure on the web (found on 83% of home pages per WebAIM's annual survey). It affects everyone — not just users with vision impairments. Bright sunlight, cheap monitors, aging eyes, and fatigue all reduce contrast sensitivity.

#### The Rule
- **Normal text** (below 18pt / 24px, or below 14pt / 18.5px bold): minimum contrast ratio of **4.5:1** against its background
- This applies to all text content including placeholders, captions, labels, and timestamps
- Contrast is measured between the text color and its immediate background color

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Check `color` against `background-color`. Account for inherited/transparent backgrounds. Use DevTools Accessibility panel. |
| SwiftUI | Check `.foregroundColor()` against parent background. Verify both light and dark mode appearances. |
| Compose | Verify `contentColor` against `containerColor` in Material theme. Check `onSurface`/`surface` pairs. |
| Flutter | Verify `TextStyle.color` against parent `Container.color` or scaffold background. |

#### Common Mistakes
- Light gray text on white background (#999 on #fff = 2.8:1 — fails)
- Placeholder text with insufficient contrast (#aaa on #fff = 2.3:1 — fails)
- Text over images without a scrim or solid background fallback
- Colored text on colored backgrounds without checking the ratio
- Forgetting to verify contrast in dark mode separately

#### How to Fix
Use a contrast checker tool. If below 4.5:1, adjust the **lightness** (not the hue) of either the text or background. Darken light text or lighten dark backgrounds until the ratio passes.

---

### REQ-A11Y-P-003: Color Contrast — Large Text

**Enforcement:** `MUST` | WCAG 2.2 SC 1.4.3 (Level AA)
**Platforms:** All
**Detectable:** Yes — compute contrast ratio with size-aware thresholds

#### Why This Matters
Large text is more legible at lower contrast ratios because the letter forms are bigger and easier to distinguish. WCAG provides a relaxed threshold for large text.

#### The Rule
- **Large text** (18pt / 24px and above, or 14pt / 18.5px bold and above): minimum contrast ratio of **3:1**
- Headings and display text typically qualify as large text
- The 3:1 ratio is a minimum — 4.5:1 is still preferred for all text

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Check computed `font-size` and `font-weight` to determine if text qualifies as "large" |
| SwiftUI | `.title`, `.largeTitle`, and custom fonts ≥24pt qualify |
| Compose | `displayLarge` through `headlineSmall` in Material typography typically qualify |
| Flutter | `TextTheme.displayLarge` through `headlineSmall` typically qualify |

#### Common Mistakes
- Assuming all headings are "large text" (an h3 at 16px is not large text)
- Using the 3:1 ratio for text that is actually below the size threshold

#### How to Fix
Measure the rendered font size. If ≥24px (or ≥18.5px bold), 3:1 is sufficient. Otherwise, you need 4.5:1.

---

### REQ-A11Y-P-004: Color Contrast — UI Components

**Enforcement:** `MUST` | WCAG 2.2 SC 1.4.11 (Level AA)
**Platforms:** All
**Detectable:** Yes — check border/icon colors against adjacent backgrounds

#### Why This Matters
Interactive components (buttons, inputs, toggles) and meaningful graphical objects (icons, charts) must be distinguishable from their surroundings. A light gray input border on a white background can be invisible to low-vision users.

#### The Rule
- UI component boundaries (borders, outlines) MUST have at least **3:1** contrast against adjacent colors
- Meaningful icons and graphical objects MUST have at least **3:1** contrast
- Focus indicators MUST have at least **3:1** contrast against the background
- This applies to all visual states: default, hover, focus, disabled (disabled elements are exempt only if they are clearly indicated as non-interactive)

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Check `border-color` and `outline-color` against adjacent `background-color` |
| SwiftUI | Check `.overlay()` and `.border()` colors against the view's background |
| Compose | Check `OutlinedTextField` border color, `Icon` tint against surface color |
| Flutter | Check `InputDecoration.border` color, `Icon.color` against scaffold/container color |

#### Common Mistakes
- Input fields with very light gray borders (#ddd on #fff = 1.5:1 — fails)
- Icons using the same light gray for both active and inactive states
- Custom focus rings that are too subtle to see

#### How to Fix
Darken borders, outlines, and icon colors until they reach 3:1 against their background.

---

### REQ-A11Y-P-005: Color Not as Sole Indicator

**Enforcement:** `MUST` | WCAG 2.2 SC 1.4.1 (Level A)
**Platforms:** All
**Detectable:** Heuristic — flag elements where meaning is conveyed only through color

#### Why This Matters
Approximately 8% of men and 0.5% of women have some form of color vision deficiency. If your error state is "the field turns red" with no other indicator, these users won't see the error. Color is a great reinforcement — it should never be the only signal.

#### The Rule
- Color MUST NOT be the sole means of conveying information, indicating an action, prompting a response, or distinguishing a visual element
- Always pair color with at least one other visual indicator: text, icon, pattern, underline, bold, shape change

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (HTML/CSS) | Error fields: red border + error icon + error text. Links: color + underline. Required: asterisk + label. |
| SwiftUI | Pair `.foregroundColor(.red)` with an SF Symbol like `exclamationmark.circle` |
| Compose | Pair `Color.Red` with an `Icon(Icons.Error)` and descriptive text |
| Flutter | Pair `Colors.red` with an `Icon(Icons.error)` and helper text |

#### Common Mistakes
- Form validation shown only by changing the input border to red
- Status indicators (online/offline) shown only as green/red dots
- Required fields marked only by red asterisks
- Charts/graphs using color-only legend differentiation
- Links in body text distinguishable only by color (no underline)

#### How to Fix
For every use of meaningful color, add a redundant indicator: icon, text label, pattern, underline, or shape. Test by viewing your interface in grayscale.

---

### REQ-A11Y-P-006: Text Resize Support

**Enforcement:** `MUST` | WCAG 2.2 SC 1.4.4 (Level AA)
**Platforms:** Web (primary), Cross-platform
**Detectable:** Heuristic — flag fixed pixel font sizes and overflow issues

#### Why This Matters
Many users with low vision increase their browser's default font size or use zoom. If your layout breaks at 200% zoom or text is locked to fixed pixel sizes, these users can't read your content.

#### The Rule
- Text MUST be resizable up to **200%** without loss of content or functionality
- Text MUST NOT require horizontal scrolling when resized on a standard viewport
- Do not use `!important` on fixed font sizes that override user preferences
- Prefer relative units (rem, em) over absolute units (px) for font sizes

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Use `rem` for font sizes. Avoid `overflow: hidden` on text containers. Test at browser zoom 200%. |
| SwiftUI | Support Dynamic Type: use `.font(.body)` system styles or `@ScaledMetric` for custom sizes |
| Compose | Support system font scaling. Don't hard-code `sp` values that ignore `fontScale`. |
| Flutter | Respect `MediaQuery.textScaleFactor`. Use `Theme.of(context).textTheme` styles. |

#### Common Mistakes
- Setting font sizes in `px` that don't respond to browser zoom
- Containers with `overflow: hidden` that clip resized text
- Fixed-height elements that don't expand when text size increases
- `max-height` on text containers that truncates content at larger sizes

#### How to Fix
Use relative units (rem) for all font sizes. Ensure containers use flexible heights (min-height, not fixed height). Test at 200% browser zoom.

---

### REQ-A11Y-P-007: Meaningful Sequence

**Enforcement:** `MUST` | WCAG 2.2 SC 1.3.2 (Level A)
**Platforms:** All
**Detectable:** Heuristic — compare DOM/view order to visual order

#### Why This Matters
Screen readers and keyboard navigation follow the document order, not the visual layout. If you use CSS Grid, Flexbox `order`, or absolute positioning to rearrange elements visually, the reading order may not match what users see, creating confusion.

#### The Rule
- The DOM/view order MUST match the intended reading/interaction sequence
- If visual order differs from source order, ensure the source order still makes logical sense
- Do not use CSS `order`, `flex-direction: row-reverse`, or `grid` reordering to create a reading sequence that differs from the logical content flow

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (HTML) | Ensure HTML source order matches visual reading order. Avoid CSS `order` property for meaningful content reordering. |
| SwiftUI | View hierarchy order determines accessibility order. Use `.accessibilitySort(.priority)` if needed. |
| Compose | Composable order determines semantics order. Use `semantics { traversalIndex = ... }` if needed. |
| Flutter | Widget tree order determines semantics order. Use `Semantics(sortKey:)` for reordering. |

#### Common Mistakes
- Sidebar that appears first in DOM but displays on the right visually
- CSS Grid layout where visual order doesn't match source order
- Flexbox `order` used to rearrange navigation items

#### How to Fix
Restructure the source order to match the intended reading sequence. Only use CSS reordering for purely visual adjustments where reading order doesn't matter.

---

### REQ-A11Y-P-008: Sensory Characteristics

**Enforcement:** `MUST` | WCAG 2.2 SC 1.3.3 (Level A)
**Platforms:** All
**Detectable:** Heuristic — flag instructions referencing shape, size, position, or sound only

#### Why This Matters
Instructions like "click the round button" or "see the sidebar on the right" rely on users being able to perceive shape and position. Blind users can't see shape; screen magnifier users may not see positional context.

#### The Rule
- Instructions for operating content MUST NOT rely solely on sensory characteristics: shape, color, size, visual location, orientation, or sound
- Always include a text-based identifier (button label, heading name) alongside sensory references

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| All | Instead of "Click the green button," say "Click the Submit button." Instead of "See the panel on the left," say "See the Navigation panel." |

#### Common Mistakes
- "Click the icon below" — which icon? What does it look like to a screen reader user?
- "The red items are errors" — what about color-blind users?
- "Use the slider on the right" — what if the layout is different on mobile?

#### How to Fix
Add a text identifier to every instruction. Sensory hints can supplement but never replace text-based references.

---

### REQ-A11Y-P-009: Audio and Video Alternatives

**Enforcement:** `MUST` | WCAG 2.2 SC 1.2.1-1.2.5 (Level A/AA)
**Platforms:** All
**Detectable:** Heuristic — flag media elements without associated captions/transcripts

#### Why This Matters
Deaf users can't hear audio. Blind users can't see video. Users in quiet environments (libraries, offices) may not be able to play sound. Captions and transcripts make media accessible to everyone.

#### The Rule
- **Pre-recorded audio** MUST have a text transcript
- **Pre-recorded video with audio** MUST have synchronized captions
- **Pre-recorded video** MUST have an audio description or text alternative for visual-only information
- **Live audio** MUST have captions (Level AA)
- Auto-playing media with audio MUST have a mechanism to pause or mute

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (HTML) | Use `<track kind="captions">` for video. Provide transcript links for audio. |
| SwiftUI | Use `AVPlayer` with `addMediaSelection` for captions. Provide transcript views. |
| Compose | Use `ExoPlayer` with `SubtitleView`. Provide transcript alongside media. |
| Flutter | Use `video_player` with subtitle support. Provide transcript widget. |

#### Common Mistakes
- Embedded videos without captions
- Podcasts/audio clips without transcripts
- Auto-playing video with sound on page load
- Tutorial videos where actions are shown but not described

#### How to Fix
Add captions to all video content. Provide transcripts for audio content. Ensure all auto-playing media is muted by default with controls to unmute.

---

### REQ-A11Y-P-010: Content Reflow

**Enforcement:** `MUST` | WCAG 2.2 SC 1.4.10 (Level AA)
**Platforms:** Web (primary)
**Detectable:** Yes — test at 320px viewport width

#### Why This Matters
Users who zoom to 400% effectively see content at a 320px-wide viewport. If your layout requires horizontal scrolling at this width, these users must scroll in two dimensions to read every line — an extremely frustrating experience.

#### The Rule
- Content MUST reflow to a single column at 320 CSS pixels width without horizontal scrolling
- No loss of information or functionality at this width
- Exceptions: data tables, maps, diagrams, and other content that inherently requires two-dimensional layout

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Test at viewport width 320px. Use responsive layouts that collapse to single column. Avoid fixed-width containers. |
| SwiftUI | Use adaptive layouts with `ViewThatFits` or `GeometryReader` for narrow widths |
| Compose | Use `WindowSizeClass` to provide compact layouts |
| Flutter | Use `LayoutBuilder` to provide single-column layouts at narrow widths |

#### Common Mistakes
- Fixed-width containers that don't collapse
- Horizontal scrolling required for navigation or content
- Side-by-side layouts that don't stack on narrow viewports

#### How to Fix
Use responsive/adaptive layout techniques. Test at 320px viewport width. Ensure all content is accessible in a single-column flow.

---

### REQ-A11Y-P-011: Text Spacing Override

**Enforcement:** `MUST` | WCAG 2.2 SC 1.4.12 (Level AA)
**Platforms:** Web
**Detectable:** Yes — test with modified text spacing

#### Why This Matters
Some users with reading disabilities (dyslexia, cognitive impairments) need increased spacing between lines, words, letters, or paragraphs. If your layout breaks when these values change, you're blocking their accommodation.

#### The Rule
Content MUST remain functional and readable when users override text spacing to:
- Line height: at least 1.5× the font size
- Paragraph spacing: at least 2× the font size
- Letter spacing: at least 0.12× the font size
- Word spacing: at least 0.16× the font size

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Don't use fixed `height` on text containers. Use `min-height` instead. Test with a text spacing bookmarklet. |
| SwiftUI | System text styles handle this automatically. Avoid fixed-height `Text` frames. |
| Compose | Use `lineHeight` in `TextStyle` as a minimum, not fixed. Don't constrain text containers to fixed heights. |
| Flutter | Use flexible containers. Don't set fixed `height` on text-containing widgets. |

#### Common Mistakes
- Fixed-height buttons or cards that clip text when spacing increases
- Overlapping text when line-height is increased
- Layout breaking when letter-spacing is increased

#### How to Fix
Use `min-height` instead of `height` for text containers. Test with the WCAG text spacing bookmarklet.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-A11Y-P-001 | Text Alternatives for Images | MUST | Yes |
| REQ-A11Y-P-002 | Color Contrast — Normal Text | MUST | Yes |
| REQ-A11Y-P-003 | Color Contrast — Large Text | MUST | Yes |
| REQ-A11Y-P-004 | Color Contrast — UI Components | MUST | Yes |
| REQ-A11Y-P-005 | Color Not as Sole Indicator | MUST | Heuristic |
| REQ-A11Y-P-006 | Text Resize Support | MUST | Heuristic |
| REQ-A11Y-P-007 | Meaningful Sequence | MUST | Heuristic |
| REQ-A11Y-P-008 | Sensory Characteristics | MUST | Heuristic |
| REQ-A11Y-P-009 | Audio and Video Alternatives | MUST | Heuristic |
| REQ-A11Y-P-010 | Content Reflow | MUST | Yes |
| REQ-A11Y-P-011 | Text Spacing Override | MUST | Yes |

## Further Reading

- [WCAG 2.2 — Perceivable Guidelines](https://www.w3.org/TR/WCAG22/#perceivable)
- [WebAIM: Million — Annual Accessibility Analysis](https://webaim.org/projects/million/)
- [Understanding SC 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [Understanding SC 1.1.1: Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html)
- [Apple: Accessibility — Vision](https://developer.apple.com/design/human-interface-guidelines/accessibility#Vision)
- [Material Design 3: Accessibility](https://m3.material.io/foundations/accessible-design/overview)
