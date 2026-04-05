# Patterns: Responsive and Adaptive Design

## Overview

Users access interfaces on everything from 320px phone screens to 3840px ultrawide monitors. Responsive design means your interface adapts fluidly to any viewport. Adaptive design means you provide distinct layouts optimized for specific breakpoint ranges. Professional products use both — fluid within breakpoints, distinct layouts between them.

## Key Concepts

### LEARN: Responsive vs. Adaptive

- **Responsive:** Fluid layout that continuously adjusts (percentages, flexbox, grid, clamp())
- **Adaptive:** Distinct layouts that switch at specific breakpoints (phone, tablet, desktop)
- Best practice: use both — fluid sizing within each breakpoint range, with layout changes at breakpoints

### LEARN: Mobile-First Approach

Write styles for the smallest screen first, then add complexity with `min-width` media queries. This ensures the base experience works everywhere, and larger screens get enhancements — not the other way around.

---

## Requirements

### REQ-RESP-001: Viewport Meta Tag

**Enforcement:** `MUST` | Web Standard
**Platforms:** Web
**Detectable:** Yes — check for viewport meta tag

#### Why This Matters
Without the viewport meta tag, mobile browsers render the page at desktop width (typically 980px) and then scale it down. Text becomes unreadable, touch targets become untappable.

#### The Rule
- Every HTML page MUST include `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Do NOT set `maximum-scale=1` or `user-scalable=no` (blocks zoom, accessibility violation)

---

### REQ-RESP-002: No Horizontal Scrolling

**Enforcement:** `MUST` | WCAG 2.2 SC 1.4.10
**Platforms:** Web (primary), All
**Detectable:** Yes — test at 320px viewport width

#### Why This Matters
Horizontal scrolling forces users to scroll in two dimensions to read each line — an extremely frustrating experience. Content should reflow into a single column at narrow widths.

#### The Rule
- Content MUST NOT require horizontal scrolling at any supported viewport width (down to 320px)
- Exceptions: data tables, maps, code blocks, and other inherently two-dimensional content (but wrap these in scrollable containers)
- No element should overflow the viewport width

---

### REQ-RESP-003: Responsive Images

**Enforcement:** `MUST` | Web Performance, Responsive Design
**Platforms:** Web (primary)
**Detectable:** Yes — check for max-width on images and srcset usage

#### Why This Matters
A 2000px-wide hero image on a 375px phone wastes bandwidth, slows loading, and can overflow the layout. Responsive images serve appropriately sized files and never break their container.

#### The Rule
- Images MUST use `max-width: 100%` (or equivalent) to prevent overflow
- Raster images SHOULD use `srcset` and `sizes` to serve resolution-appropriate files
- Images MUST have explicit `width` and `height` attributes to prevent layout shift

---

### REQ-RESP-004: Breakpoint Consistency

**Enforcement:** `SHOULD` | Design Systems Best Practice
**Platforms:** Web, Cross-platform
**Detectable:** Heuristic — count distinct breakpoint values

#### Why This Matters
Inconsistent breakpoints (one component switches at 768px, another at 800px, another at 750px) create a janky experience where layout shifts happen unpredictably as the viewport changes.

#### The Principle
- Define **4-5 standard breakpoints** and use them consistently
- Common breakpoints: 480px (phone landscape), 768px (tablet), 1024px (tablet landscape), 1280px (desktop), 1536px (large desktop)
- All components should reference the same breakpoint tokens, not hard-coded values
- Use `min-width` (mobile-first) rather than `max-width`

---

### REQ-RESP-005: Responsive Typography

**Enforcement:** `CONSIDER` | Responsive Design Best Practice
**Platforms:** Web
**Detectable:** Heuristic — check for fluid or breakpoint-responsive font sizes

#### Why This Matters
Font sizes that work on mobile (16px body, 28px h1) feel too small on a 27" desktop monitor. Font sizes that work on desktop (18px body, 48px h1) overwhelm a phone screen. Fluid typography scales smoothly between breakpoints.

#### The Principle
- Use `clamp()` for fluid typography: `font-size: clamp(1rem, 0.5rem + 1vw, 1.25rem);`
- Or define font sizes at each breakpoint using your type scale
- Headings typically need more scaling than body text across breakpoints

---

### REQ-RESP-006: Adaptive Layout Patterns

**Enforcement:** `SHOULD` | Material Adaptive Layout, Apple HIG
**Platforms:** All
**Detectable:** Heuristic — check for layout changes at different size classes

#### Why This Matters
Simply shrinking a desktop layout for mobile doesn't work. Professional apps provide **different layouts** optimized for each size class: single column on phone, master-detail on tablet, multi-pane on desktop.

#### The Principle
- **Phone:** Single-column, stacked content, bottom navigation, full-screen modal
- **Tablet:** Master-detail (list on left, detail on right), side navigation, embedded modals
- **Desktop:** Multi-pane layouts, persistent sidebars, expanded content areas
- Navigation pattern should adapt: bottom tabs → sidebar → persistent navigation rail

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Use Grid with responsive `grid-template-columns`. Switch from stacked to side-by-side at breakpoints. |
| SwiftUI | `NavigationSplitView` adapts automatically. Use `horizontalSizeClass` for custom decisions. |
| Compose | `WindowSizeClass` determines layout: `Compact` → single pane, `Medium` → list-detail, `Expanded` → multi-pane |
| Flutter | `LayoutBuilder` or `MediaQuery.sizeOf(context)` to switch layouts |

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-RESP-001 | Viewport Meta Tag | MUST | Yes |
| REQ-RESP-002 | No Horizontal Scrolling | MUST | Yes |
| REQ-RESP-003 | Responsive Images | MUST | Yes |
| REQ-RESP-004 | Breakpoint Consistency | SHOULD | Heuristic |
| REQ-RESP-005 | Responsive Typography | CONSIDER | Heuristic |
| REQ-RESP-006 | Adaptive Layout Patterns | SHOULD | Heuristic |

## Further Reading

- [Material Design 3: Adaptive Layout](https://m3.material.io/foundations/layout/applying-layout/window-size-classes)
- [Apple HIG: Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Web.dev: Responsive Design](https://web.dev/articles/responsive-web-design-basics)
- [WCAG SC 1.4.10: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
