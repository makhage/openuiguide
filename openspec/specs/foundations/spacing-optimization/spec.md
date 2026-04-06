# Spacing Optimization

> Professional spacing patterns that make interfaces feel polished and intentional. Goes beyond "use a grid" to cover the specific spatial relationships that differentiate amateur layouts from professional ones.

**Category:** Foundations
**Applies to:** All platforms
**Specs in this file:** 10 requirements (REQ-SOPT-001 through REQ-SOPT-010)

---

## Requirements

---

### REQ-SOPT-001: Vertical Rhythm

**Enforcement:** `SHOULD` | Typographic Best Practice
**Platforms:** All
**Detectable:** Yes — extract vertical margin/padding values and check if they're multiples of a base unit

#### Why This Matters
Vertical rhythm means all vertical spacing (margins, paddings, line-heights) follows a consistent base unit — typically the body line-height or half of it. When elements align to a vertical grid, the layout feels harmonious even if users can't articulate why. Without it, the layout feels subtly "off" and unprofessional.

#### The Principle
- Choose a base vertical unit (commonly 4px, 8px, or the body line-height)
- All vertical margins and paddings SHOULD be multiples of this unit
- Line-heights SHOULD produce values that align to the vertical grid
- Headings, paragraphs, and section gaps should all "snap" to the rhythm

#### Platform Implementation Notes
- **Web:** Set a base line-height (e.g., `1.5` on a `16px` body = `24px` rhythm). Use `margin-bottom: 24px`, `padding: 48px`, etc. CSS custom properties help: `--rhythm: 24px`.
- **SwiftUI:** Use `.padding()` values that are multiples of your base unit. Define spacing constants in a theme file.
- **Compose:** Use `Modifier.padding()` with consistent `dp` values from a spacing scale.
- **React Native:** Define a spacing scale object and reference it in all style definitions.

#### Creative Freedom
The specific base unit is your choice — 4px, 8px, or line-height-based all work. What matters is consistency, not which value you pick.

---

### REQ-SOPT-002: Proximity Grouping — Related vs. Unrelated

**Enforcement:** `SHOULD` | Gestalt Law of Proximity
**Platforms:** All
**Detectable:** Heuristic — compare spacing between related siblings (label+input) vs. section gaps

#### Why This Matters
The Gestalt Law of Proximity states that elements close together are perceived as belonging together. If a form label is equidistant from its own input and the previous field's input, users can't tell which label belongs to which field. The space between related elements must be noticeably less than the space between groups.

#### The Principle
- Intra-group spacing (label to its input) SHOULD be <= 50% of inter-group spacing (between field groups)
- Example: 4-8px from label to input, 16-24px between form groups
- Example: 8px between icon and text, 24px between list items
- When grouping fails, add a visual separator (border, background) as a fallback

#### Platform Implementation Notes
- **Web:** Use `gap` in flex/grid layouts. Set `margin-bottom` on labels to 4-8px, `margin-bottom` on field groups to 16-24px.
- **SwiftUI:** Use `.spacing()` parameter in `VStack` for intra-group, and `Spacer()` or larger padding between groups.
- **Compose:** Use `Arrangement.spacedBy()` for consistent intra-group spacing, larger `Spacer(modifier = Modifier.height())` between groups.
- **React Native:** Use `marginBottom` on label `Text` components (4-8), `marginBottom` on field wrapper `View` (16-24).

#### Creative Freedom
The exact ratio can vary — the key is that the difference is perceptible. A 2:1 or 3:1 ratio between inter-group and intra-group spacing works well.

---

### REQ-SOPT-003: Card Internal Padding Consistency

**Enforcement:** `SHOULD` | Design Systems Best Practice
**Platforms:** All
**Detectable:** Yes — compare padding values on card/container elements

#### Why This Matters
Cards with uneven internal padding (20px top, 8px left, 30px bottom) look unbalanced and amateurish. Consistent padding creates a sense of order. Even asymmetric padding (more vertical than horizontal) should be intentional and proportional.

#### The Principle
- All sides of a card/container SHOULD have equal or proportional padding
- Equal: `padding: 16px` (same all sides)
- Proportional: `padding: 24px 16px` (more vertical breathing room)
- Avoid arbitrary values: `padding: 20px 8px 30px 12px` signals accidental styling
- Card padding should come from the spacing scale, not ad-hoc values

#### Platform Implementation Notes
- **Web:** Use `padding` shorthand consistently. Define card padding as a CSS variable: `--card-padding: 16px`.
- **SwiftUI:** Use `.padding()` with consistent values or edge-specific `.padding(.horizontal, 16)`.
- **Compose:** Use `Modifier.padding()` with values from your theme's spacing scale.
- **React Native:** Define card padding in a shared style constant.

---

### REQ-SOPT-004: Spacing Between Form Fields

**Enforcement:** `SHOULD` | Baymard Institute Research
**Platforms:** All
**Detectable:** Yes — measure vertical margins/gaps between form elements

#### Why This Matters
Form field spacing directly affects completion rates. Fields too close together (< 12px) feel cramped and increase mis-taps on mobile. Fields too far apart (> 32px) break the visual flow and make the form feel longer than it is. Research shows 16-24px is optimal.

#### The Principle
- Label to its own input: 4-8px gap
- Between field groups (input to next label): 16-24px gap
- Between form sections (e.g., "Personal Info" and "Payment"): 32-48px gap
- Submit button: 24-32px above it, separating it from the last field

#### Platform Implementation Notes
- **Web:** Use `margin-bottom` on form groups or `gap` in a flex column. `label { margin-bottom: 4px; }`, `.form-group { margin-bottom: 20px; }`.
- **SwiftUI:** Use `Form` with default spacing, or `VStack(spacing: 20)` for custom forms.
- **Compose:** Use `Column(verticalArrangement = Arrangement.spacedBy(20.dp))` for field groups.
- **React Native:** Use `marginBottom: 20` on field wrapper `View` components.

---

### REQ-SOPT-005: List Item Separation

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Yes — check padding/margin on list items, table rows

#### Why This Matters
List items that are too close together (< 4px) visually merge into a wall of text. Items too far apart (> 32px) feel disconnected and waste space. The right spacing depends on content density — data tables need tighter spacing than content lists.

#### The Principle
- Dense lists (data tables, admin): 8-12px vertical padding per row
- Standard lists (settings, menus): 12-16px vertical padding per item
- Content lists (articles, cards): 16-24px vertical spacing between items
- Always maintain at least 8px between interactive list items to prevent mis-taps

#### Platform Implementation Notes
- **Web:** Use `padding: 12px 16px` on `li` or `tr` elements. Or use `gap` in a flex column of list items.
- **SwiftUI:** `List` has default spacing. For custom lists, use `VStack(spacing: 12)` or `LazyVStack(spacing: 16)`.
- **Compose:** Use `LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp))`.
- **React Native:** Use `FlatList` with `ItemSeparatorComponent` or `contentContainerStyle={{ gap: 12 }}`.

---

### REQ-SOPT-006: Button Group Spacing

**Enforcement:** `SHOULD` | Fitts's Law, Material Design 3
**Platforms:** All
**Detectable:** Yes — check spacing between adjacent buttons

#### Why This Matters
Buttons placed too close together (< 4px) risk accidental clicks on the wrong button — a critical UX failure for destructive actions. Buttons too far apart (> 24px) break the visual grouping. Fitts's Law tells us that target separation affects error rates.

#### The Principle
- Horizontal button groups: 8-16px gap between buttons
- Vertical button groups (stacked): 8-12px gap
- Primary action should be visually separated from destructive actions (more spacing or opposite side)
- Use flexbox `gap` rather than margins for more maintainable spacing

#### Platform Implementation Notes
- **Web:** `display: flex; gap: 12px;` on button containers. Or `.button + .button { margin-left: 12px; }`.
- **SwiftUI:** `HStack(spacing: 12)` for horizontal button groups.
- **Compose:** `Row(horizontalArrangement = Arrangement.spacedBy(12.dp))`.
- **React Native:** `flexDirection: 'row', gap: 12` on the button container View.

---

### REQ-SOPT-007: Section Breathing Room

**Enforcement:** `SHOULD` | Web Design Best Practice
**Platforms:** All
**Detectable:** Yes — measure margins between major section elements

#### Why This Matters
Major page sections (hero, features, testimonials, footer) need generous vertical separation — "breathing room" — to prevent the page from feeling like a wall of content. Without it, users experience cognitive overload and can't easily distinguish where one section ends and another begins.

#### The Principle
- Content-focused sites (marketing, blogs): 48-96px vertical separation between major sections
- Data-dense tools (dashboards, admin panels): 24-48px between sections
- Mobile: reduce by 30-40% (e.g., 64px desktop → 40px mobile)
- The first section after the header and the last section before the footer deserve extra breathing room

#### Platform Implementation Notes
- **Web:** Use `padding: 64px 0` or `margin-bottom: 64px` on `<section>` elements. Use `clamp(40px, 8vw, 96px)` for fluid spacing.
- **SwiftUI:** Use `.padding(.vertical, 48)` on section containers.
- **Compose:** Use `Modifier.padding(vertical = 48.dp)` on section composables.
- **React Native:** Use `paddingVertical: 48` on section wrapper Views.

---

### REQ-SOPT-008: First and Last Child Padding

**Enforcement:** `SHOULD` | iOS HIG, Material Design 3
**Platforms:** All
**Detectable:** Heuristic — check if first/last children in scroll containers have adequate spacing

#### Why This Matters
When the first or last item in a scrollable container sits flush against the container edge, it looks cut off and feels cramped. This is especially noticeable in horizontal scroll containers (carousels), bottom of long lists, and edge-to-edge content. Adding padding to the first and last items creates a polished "breathing space."

#### The Principle
- First and last items in scrollable containers SHOULD have padding equal to the container's own content padding
- Horizontal scroll: add left padding on first item, right padding on last item
- Vertical scroll: add top padding on first item, bottom padding (+ safe area) on last item
- This prevents content from being visually "glued" to the container edge

#### Platform Implementation Notes
- **Web:** Use `scroll-padding` on the container, or `padding-inline` on first/last children with `:first-child`/`:last-child`.
- **SwiftUI:** `List` handles this automatically. For `ScrollView`, use `.contentMargins()` (iOS 17+) or padding on first/last items.
- **Compose:** Use `contentPadding` parameter on `LazyColumn`/`LazyRow`: `contentPadding = PaddingValues(horizontal = 16.dp)`.
- **React Native:** Use `contentContainerStyle={{ paddingHorizontal: 16 }}` on `FlatList`/`ScrollView`.

---

### REQ-SOPT-009: Responsive Spacing Reduction

**Enforcement:** `SHOULD` | Responsive Design Best Practice
**Platforms:** Web, Cross-platform
**Detectable:** Yes — check if spacing values change in media queries or use fluid units

#### Why This Matters
Desktop-sized spacing on a mobile screen wastes precious viewport space. A 64px section gap on a 375px screen eats 17% of the viewport height. Spacing should scale down proportionally on smaller screens — roughly 60-75% of desktop values.

#### The Principle
- Section spacing: desktop 64px → mobile 40-48px
- Container padding: desktop 32px → mobile 16-20px
- Component spacing: desktop 24px → mobile 16px
- Use CSS `clamp()` or media queries to implement responsive spacing
- Font-size-relative units (`em`, `rem`) help spacing scale naturally with text

#### Platform Implementation Notes
- **Web:** Use `clamp(40px, 6vw, 64px)` for fluid spacing. Or define spacing in media queries: `@media (max-width: 768px) { --section-gap: 40px; }`.
- **SwiftUI:** Use `@Environment(\.horizontalSizeClass)` to switch between compact and regular spacing values.
- **Compose:** Use `WindowSizeClass` to switch between spacing scales for compact, medium, and expanded.
- **React Native:** Use `Dimensions.get('window').width` to choose spacing scale, or use percentage-based values.

---

### REQ-SOPT-010: Content Density Matching

**Enforcement:** `CONSIDER` | NNGroup Information Density Research
**Platforms:** All
**Detectable:** Heuristic — analyze content type (tables/data vs. articles/text) and compare to spacing

#### Why This Matters
There is no universal "correct" spacing — it depends on the content type and use case. Data-heavy interfaces (dashboards, admin panels, spreadsheets) benefit from tighter spacing that lets users scan more information. Content-focused interfaces (blogs, marketing pages, reading apps) benefit from generous spacing that aids comprehension and reduces eye fatigue.

#### The Principle
- **Data-dense interfaces:** 8-16px gaps, compact padding (8-12px), tighter line-height (1.3-1.4)
- **Content-focused interfaces:** 16-32px gaps, generous padding (16-24px), relaxed line-height (1.5-1.6)
- **Mixed interfaces:** Use data-dense spacing in data areas (tables, dashboards) and content spacing in text areas (help text, descriptions)
- Match the density to what users need to accomplish — scanning data vs. reading content

#### Platform Implementation Notes
- **Web:** Define two spacing scales in CSS variables: `--space-dense-*` and `--space-content-*`. Apply to sections based on content type.
- **SwiftUI:** Create `DenseSpacing` and `ContentSpacing` environment values that components read.
- **Compose:** Define `DenseTheme` and `ContentTheme` with different spacing in `MaterialTheme`.
- **React Native:** Use a spacing context provider that switches between dense and content scales.

#### Creative Freedom
The exact density is a product decision — some users prefer dense UIs (power users), others prefer spacious ones (casual users). Consider offering a density toggle for complex tools.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-SOPT-001 | Vertical Rhythm | SHOULD | Yes |
| REQ-SOPT-002 | Proximity Grouping | SHOULD | Heuristic |
| REQ-SOPT-003 | Card Internal Padding | SHOULD | Yes |
| REQ-SOPT-004 | Form Field Spacing | SHOULD | Yes |
| REQ-SOPT-005 | List Item Separation | SHOULD | Yes |
| REQ-SOPT-006 | Button Group Spacing | SHOULD | Yes |
| REQ-SOPT-007 | Section Breathing Room | SHOULD | Yes |
| REQ-SOPT-008 | First/Last Child Padding | SHOULD | Heuristic |
| REQ-SOPT-009 | Responsive Spacing Reduction | SHOULD | Yes |
| REQ-SOPT-010 | Content Density Matching | CONSIDER | Heuristic |

## Further Reading

- [Material Design 3: Spacing](https://m3.material.io/foundations/layout/understanding-layout/spacing)
- [Baymard Institute: Form Field Usability](https://baymard.com/blog/form-field-usability-matching-user-expectations)
- [NNGroup: Whitespace in Web Design](https://www.nngroup.com/articles/whitespace/)
- [Gestalt Principles of Perception](https://www.interaction-design.org/literature/topics/gestalt-principles)
- [Butterick's Practical Typography: Vertical Rhythm](https://practicaltypography.com/)
- [Fitts's Law and Target Spacing](https://www.interaction-design.org/literature/article/fitts-s-law-the-importance-of-size-and-distance-in-ui-design)
- [Apple HIG: Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
