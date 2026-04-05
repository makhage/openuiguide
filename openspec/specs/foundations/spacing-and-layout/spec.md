# Foundations: Spacing and Layout

## Overview

Spacing is the invisible architecture of every interface. Professional UIs feel "right" not because of flashy graphics, but because every element has deliberate, consistent breathing room. Amateur interfaces betray themselves through inconsistent margins, cramped touch targets, and arbitrary gaps that create visual noise.

The core insight is simple: **use a spacing scale derived from a base unit, not arbitrary pixel values.** This creates rhythm, reduces decision fatigue, and makes your layout feel cohesive even across dozens of screens.

## Key Concepts

### LEARN: The Spatial System

Every major design system is built on a **base unit grid**:
- **Material Design 3** uses a 4dp baseline grid (components sized in multiples of 8dp)
- **Apple HIG** uses an 8pt grid with 4pt for fine adjustments
- **IBM Carbon** uses a 2/4/8px mini unit system

The idea: instead of choosing margins and paddings by eye (16px here, 13px there, 22px somewhere else), you pick a base unit and derive all spacing from multiples of it. This is like a musical scale — the intervals between notes are proportional, creating harmony.

**Common base-8 scale:** 0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

### LEARN: Density and Breathing Room

**Information density** is how much content occupies a given area. There's no universal "right" density — a stock trading dashboard needs high density, a meditation app needs low density. The principle is: **choose a density deliberately, then apply it consistently.**

- **Compact:** 4-8px spacing between related elements
- **Default:** 8-16px spacing between related elements
- **Comfortable:** 16-24px spacing between related elements

### LEARN: The Relationship Between Space and Grouping

Gestalt psychology tells us: **elements that are closer together are perceived as related.** This is the Law of Proximity. Use it intentionally:
- Tight spacing (4-8px) = these elements belong together
- Medium spacing (16-24px) = these are in the same section
- Large spacing (32-64px) = these are separate sections

---

## Requirements

### REQ-SPACE-001: Base Spacing Unit

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Heuristic — flag when spacing values don't follow a consistent scale

#### Why This Matters
When every spacing value is chosen ad hoc, the interface feels subtly "off" — like a room where the furniture is placed without a plan. A base unit system eliminates this by constraining your choices to a harmonious set of values. It also makes responsive adjustments easier: scale the base unit, and everything scales proportionally.

#### The Principle
- Define a **base spacing unit** (recommended: 4px or 8px)
- Derive all margins, paddings, and gaps from **multiples of the base unit**
- For a base-4 system: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
- For a base-8 system: 8, 16, 24, 32, 40, 48, 64, 80, 96, 128

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Use CSS custom properties: `--space-1: 4px; --space-2: 8px;` etc. Or use Tailwind's built-in spacing scale. |
| SwiftUI | Define spacing constants: `enum Spacing { static let xs: CGFloat = 4; static let sm: CGFloat = 8 }` |
| Compose | Use a spacing object: `object Spacing { val xs = 4.dp; val sm = 8.dp }` |
| Flutter | Define in theme extension: `const double spaceXs = 4; const double spaceSm = 8;` |

#### Creative Freedom
The base unit is your choice. A 4px base gives more granularity; 8px is simpler. Some designs use 5px or 6px bases — that's fine if applied consistently. The principle is consistency, not a specific number.

#### Common Mistakes
- Mixing arbitrary values (13px, 17px, 22px) that don't relate to any scale
- Using the spacing scale for most elements but "eyeballing" a few
- Different developers on the same project using different spacing values

#### How to Fix
1. Audit your codebase for unique spacing values
2. Choose a base unit (4px or 8px recommended)
3. Map each existing value to the nearest scale value
4. Define spacing tokens/variables and replace hard-coded values

---

### REQ-SPACE-002: Touch and Click Target Size

**Enforcement:** `MUST` | WCAG 2.5.8, Apple HIG, Material Design 3
**Platforms:** All
**Detectable:** Yes — check element dimensions and padding

#### Why This Matters
Small touch targets cause frustration, mis-taps, and exclude users with motor impairments. This isn't just mobile — mouse users with tremors, elderly users, and anyone in a bumpy vehicle benefits from adequately sized targets. Every major platform mandates minimum sizes.

#### The Rule
- **Minimum touch target:** 44×44 CSS pixels (Apple HIG) or 48×48dp (Material Design 3)
- **Minimum click target (desktop):** 24×24 CSS pixels (WCAG 2.5.8 Level AA)
- Target size includes the element itself **plus any padding that extends the tappable area**
- Inline text links within paragraphs are exempt from size requirements

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Use `min-width`/`min-height` or `padding` to ensure 44px minimum. For icon buttons: `padding: 12px` on a 20px icon = 44px total. |
| SwiftUI | `.frame(minWidth: 44, minHeight: 44)` or let the system handle it with standard controls |
| Compose | `Modifier.sizeIn(minWidth = 48.dp, minHeight = 48.dp)` or use Material `IconButton` which handles this |
| Flutter | `SizedBox(width: 48, height: 48)` or use `Material` widgets that include minimum sizes |

#### Common Mistakes
- Icon buttons without enough padding (a 16px icon with 4px padding = 24px — too small)
- Links styled as small text without adequate tap area
- Close buttons (×) that are visually small and have no extra hit area
- Adjacent targets with no spacing between them (even if individually sized, they cause mis-taps)

#### How to Fix
Add padding to increase the tappable area without changing visual size. The visual element can be small; the tap target must be large.

---

### REQ-SPACE-003: Consistent Spacing Between Related Elements

**Enforcement:** `SHOULD` | Gestalt Law of Proximity
**Platforms:** All
**Detectable:** Heuristic — flag inconsistent spacing between sibling elements

#### Why This Matters
The Law of Proximity is one of the most powerful tools in visual design: items placed close together are perceived as a group. When spacing between related elements varies randomly, users can't quickly parse the grouping structure. Consistent spacing creates scannable, predictable layouts.

#### The Principle
- Elements within a group should have **uniform spacing** between them
- Spacing between groups should be **noticeably larger** (at least 1.5-2× the intra-group spacing)
- Use your spacing scale values — don't mix 12px and 14px within the same group

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Use `gap` with Flexbox/Grid for uniform spacing: `gap: var(--space-3)` |
| SwiftUI | `VStack(spacing: 8)` or `LazyVStack(spacing: 12)` for uniform child spacing |
| Compose | `Column(verticalArrangement = Arrangement.spacedBy(8.dp))` |
| Flutter | `Column(children: [...])` with `SizedBox(height: 8)` between items, or use `ListView.separated` |

#### Creative Freedom
The specific spacing values are your choice. Tight spacing creates energy and density; generous spacing creates calm and focus. Match the spacing personality to your product's character.

#### Common Mistakes
- Form fields with 16px gap, except one pair that has 12px and another with 20px
- Card grids where gutters vary between rows
- Navigation items with inconsistent padding

#### How to Fix
Identify groups of related elements. Set a single spacing value per group type and apply it uniformly. Use layout components that enforce uniform gaps (CSS Grid, VStack with spacing, etc.).

---

### REQ-SPACE-004: Section Separation

**Enforcement:** `SHOULD` | Visual Design Fundamentals
**Platforms:** All
**Detectable:** Heuristic — flag when section spacing isn't meaningfully larger than element spacing

#### Why This Matters
Users scan interfaces in chunks. Clear section boundaries help them quickly find what they need. When section breaks are subtle, the page feels like an undifferentiated wall of content.

#### The Principle
- Space between major sections should be **at least 2× the spacing between elements within a section**
- Use a combination of space, dividers, or background color changes to delineate sections
- Be consistent: all section breaks at the same level of hierarchy should use the same spacing

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Use `margin-block` or `padding-block` with larger scale values (32-64px) between sections |
| SwiftUI | Use `Section` in `List`/`Form`, or add `.padding(.vertical, 32)` between groups |
| Compose | Use `Spacer(modifier = Modifier.height(32.dp))` or `Divider()` between sections |
| Flutter | Use `SizedBox(height: 32)` or `Divider()` between sections in a `Column` |

#### Creative Freedom
Section separation can be achieved through space alone, or through color/divider/card boundaries. Some interfaces use generous whitespace (editorial style); others use subtle dividers (dashboard style). Match your product's information density needs.

#### Common Mistakes
- 16px between form fields AND between form sections — no visual hierarchy
- Sections separated only by a heading, with no additional space
- Inconsistent section spacing throughout the app

#### How to Fix
Define 2-3 levels of spacing hierarchy in your design tokens: element spacing (8-16px), group spacing (16-24px), section spacing (32-64px). Apply them consistently.

---

### REQ-SPACE-005: Content Padding from Screen Edges

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Yes — check for content touching or too close to viewport edges

#### Why This Matters
Content that touches screen edges feels cramped and is harder to read. On mobile, edge content can be accidentally triggered during grip adjustments. Every platform specifies minimum edge margins.

#### The Principle
- **Mobile:** Minimum 16px horizontal padding from screen edges (Material: 16dp, Apple: 16pt)
- **Tablet:** 24-32px horizontal padding or centered content with max-width
- **Desktop:** Content should have a max-width (typically 1200-1440px) centered with generous margins
- Vertical padding from top/bottom edges: at least 16px on mobile

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | `padding-inline: 16px;` on mobile, use `max-width: 1200px; margin-inline: auto;` on desktop |
| SwiftUI | Standard `List`/`Form` handle this automatically. For custom views: `.padding(.horizontal, 16)` |
| Compose | `Scaffold` provides default padding. For custom: `Modifier.padding(horizontal = 16.dp)` |
| Flutter | `Scaffold` with `body: Padding(padding: EdgeInsets.symmetric(horizontal: 16))` |

#### Creative Freedom
Edge-to-edge images, hero sections, and full-bleed color blocks can intentionally break edge padding for dramatic effect. The principle applies to text content and interactive elements, not decorative backgrounds.

#### Common Mistakes
- Text running edge-to-edge on mobile with no padding
- Inconsistent padding: 16px on some screens, 20px on others, 12px on another
- Desktop layouts that stretch content to fill ultra-wide monitors

#### How to Fix
Set a global content padding variable. Apply it at the layout/scaffold level so individual components inherit it consistently.

---

### REQ-SPACE-006: Alignment and Grid Consistency

**Enforcement:** `SHOULD` | Visual Design Fundamentals
**Platforms:** All
**Detectable:** Heuristic — flag elements with left edges that don't align to a common grid

#### Why This Matters
Misaligned elements create visual noise. When form labels start at slightly different x-positions, or cards in a grid have inconsistent widths, the eye notices the irregularity even if the conscious mind doesn't. Consistent alignment signals professionalism and care.

#### The Principle
- Use a **layout grid** (column grid for pages, baseline grid for typography)
- All elements should **align to the grid** — left edges, right edges, and gutters should be consistent
- Content within similar containers should start at the same position

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Use CSS Grid or Flexbox for layout. `display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px;` |
| SwiftUI | Use `LazyVGrid(columns: [...])` or `HStack`/`VStack` with consistent alignment |
| Compose | Use `LazyVerticalGrid(columns = GridCells.Fixed(2))` or consistent `Arrangement` |
| Flutter | Use `GridView`, `Wrap`, or `Row`/`Column` with consistent `crossAxisAlignment` |

#### Creative Freedom
Intentionally breaking the grid can create visual interest — a pull quote that extends into the margin, an image that breaks column boundaries. This is effective when done deliberately and sparingly. The principle is: **establish a grid first, then break it with purpose.**

#### Common Mistakes
- Elements that are "almost" aligned but off by 1-2 pixels
- Mixing centered and left-aligned content without clear hierarchy reasoning
- Cards or list items with inconsistent internal padding

#### How to Fix
Use layout components (Grid, Flexbox, VStack) instead of manual positioning. Set alignment at the container level and let children inherit it.

---

### REQ-SPACE-007: Responsive Spacing Scaling

**Enforcement:** `CONSIDER` | Responsive Design Best Practice
**Platforms:** Web, Cross-platform
**Detectable:** Heuristic — check if spacing values change between breakpoints

#### Why This Matters
Spacing that works on a phone often feels cramped on a tablet and too tight on a desktop. Conversely, desktop spacing creates excessive whitespace on mobile. Professional interfaces scale their spacing system across breakpoints.

#### The Principle
- Define spacing scale values for each major breakpoint (or use fluid spacing)
- Mobile spacing can be tighter (base-4: 4, 8, 12, 16, 24, 32)
- Desktop spacing can be more generous (base-4: 8, 16, 24, 32, 48, 64)
- **Fluid spacing** using `clamp()` (CSS) can smoothly interpolate between breakpoints

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | `gap: clamp(16px, 2vw, 32px);` for fluid spacing, or redefine custom properties at breakpoints |
| SwiftUI | Use `horizontalSizeClass` to switch between compact and regular spacing |
| Compose | Use `WindowSizeClass` to adjust spacing: `if (windowSizeClass.widthSizeClass == WindowWidthSizeClass.Compact) 8.dp else 16.dp` |
| Flutter | Use `LayoutBuilder` or `MediaQuery` to adjust spacing based on screen size |

#### Creative Freedom
Not every project needs fluid spacing. Simple apps with one breakpoint may only need two spacing sets. Complex responsive apps might benefit from smooth interpolation. Match the complexity to your needs.

---

### REQ-SPACE-008: Whitespace as a Design Element

**Enforcement:** `CONSIDER` | Visual Design Fundamentals
**Platforms:** All
**Detectable:** Manual review only

#### Why This Matters
Whitespace (negative space) is not "empty" — it's an active design element that directs attention, creates hierarchy, and gives content room to breathe. Beginners tend to fill every pixel; professionals know when to leave space.

#### The Principle
- **Macro whitespace:** Large areas of empty space between sections, around hero elements, in page margins. Creates focus and premium feel.
- **Micro whitespace:** Small spaces between lines of text, between icon and label, between elements in a group. Creates readability and order.
- More important elements deserve more surrounding whitespace
- High-value screens (landing pages, onboarding) benefit from generous whitespace
- Data-dense screens (dashboards, tables) can have tighter whitespace

#### Creative Freedom
Whitespace is one of the most powerful creative tools. A minimalist app might use 50% whitespace; a data dashboard might use 10%. Neither is wrong — it depends on your product's purpose and personality. The principle is: use whitespace intentionally, not as leftover.

---

### REQ-SPACE-009: Consistent Component Internal Spacing

**Enforcement:** `SHOULD` | Design Systems Best Practice
**Platforms:** All
**Detectable:** Heuristic — flag when similar components have different internal padding

#### Why This Matters
When buttons, cards, inputs, and other components each have unique internal spacing, the interface looks like it was built by different people on different days (even if it was one person). Consistent internal padding is what makes a "system" feel like a system.

#### The Principle
- Define standard internal padding for each component type in your design tokens
- **Buttons:** Consistent horizontal/vertical padding across all button variants
- **Cards:** Consistent content padding within all cards
- **Inputs:** Consistent padding within all form fields
- **List items:** Consistent padding for all list rows

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Define component tokens: `--btn-padding: 12px 24px; --card-padding: 16px; --input-padding: 12px;` |
| SwiftUI | Create reusable view modifiers: `.buttonStyle(ConsistentButtonStyle())` |
| Compose | Define in theme: `ButtonDefaults.ContentPadding` or custom padding constants |
| Flutter | Define in `ThemeData` or custom widget classes with consistent `EdgeInsets` |

#### Common Mistakes
- Primary buttons with 12px vertical padding, secondary with 8px, tertiary with 10px
- Cards with 16px padding on one screen, 20px on another
- Input fields with varying heights due to inconsistent padding

#### How to Fix
Audit component internal spacing. Pick one value per component type. Extract to tokens/constants.

---

### REQ-SPACE-010: Adequate Spacing Between Interactive Elements

**Enforcement:** `MUST` | WCAG 2.5.8, Usability
**Platforms:** All (especially mobile)
**Detectable:** Yes — measure distance between adjacent interactive elements

#### Why This Matters
When buttons, links, or other tappable elements are too close together, users accidentally activate the wrong one. This is especially problematic on mobile, for users with motor impairments, and in any situation where precision is difficult (walking, one-handed use, gloves).

#### The Rule
- Adjacent interactive elements MUST have at least **8px of non-interactive space** between them
- On mobile/touch interfaces, prefer **12-16px** between adjacent targets
- Inline text links within the same paragraph are exempt

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Use `gap` on flex/grid containers: `gap: 12px;` between buttons |
| SwiftUI | `HStack(spacing: 12) { Button(...) Button(...) }` |
| Compose | `Row(horizontalArrangement = Arrangement.spacedBy(12.dp))` |
| Flutter | `Row(children: [button1, SizedBox(width: 12), button2])` or `Wrap(spacing: 12)` |

#### Common Mistakes
- Icon buttons in a toolbar with 2px gaps
- Table row action buttons flush against each other
- Mobile navigation with tightly packed tab items

#### How to Fix
Add gap/spacing between adjacent interactive elements. If layout is constrained, consider grouping actions into a menu instead of displaying them all inline.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-SPACE-001 | Base Spacing Unit | SHOULD | Heuristic |
| REQ-SPACE-002 | Touch and Click Target Size | MUST | Yes |
| REQ-SPACE-003 | Consistent Spacing Between Related Elements | SHOULD | Heuristic |
| REQ-SPACE-004 | Section Separation | SHOULD | Heuristic |
| REQ-SPACE-005 | Content Padding from Screen Edges | SHOULD | Yes |
| REQ-SPACE-006 | Alignment and Grid Consistency | SHOULD | Heuristic |
| REQ-SPACE-007 | Responsive Spacing Scaling | CONSIDER | Heuristic |
| REQ-SPACE-008 | Whitespace as a Design Element | CONSIDER | Manual |
| REQ-SPACE-009 | Consistent Component Internal Spacing | SHOULD | Heuristic |
| REQ-SPACE-010 | Adequate Spacing Between Interactive Elements | MUST | Yes |

## Further Reading

- [Material Design 3: Layout](https://m3.material.io/foundations/layout/understanding-layout/overview)
- [Apple HIG: Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [WCAG 2.5.8: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [Laws of UX: Law of Proximity](https://lawsofux.com/law-of-proximity/)
- [Spacing in Design Systems](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62)
