# Design Review: Acme Analytics Dashboard

**Reviewed:** `examples/sample-app/index.html`, `examples/sample-app/styles.css`
**Date:** 2026-04-05
**Spec version:** OpenUI Guide v0.1

---

## Summary

| Severity | Count |
|----------|-------|
| Errors (MUST fix) | 8 |
| Warnings (SHOULD fix) | 6 |
| Suggestions (CONSIDER) | 4 |

**Overall score: 38 / 100** — This dashboard has a solid structural foundation but ships with critical accessibility gaps and several visual consistency issues that need attention before production use.

---

## Errors — MUST Fix

These are violations of hard requirements. Each one blocks users or breaks compliance.

### E1. Images missing alternative text

**Requirement:** ACC-IMG-1 — All `<img>` elements must have descriptive `alt` attributes.
**Location:** `index.html` lines 14, 43, 44, 46
**Severity:** Error

The logo, notification icon, settings icon, and avatar images all lack `alt` attributes. Screen readers will either announce the filename or skip them entirely.

**Fix:**
```html
<img src="logo.png" class="logo" alt="Acme Analytics logo">
<button class="icon-btn"><img src="bell.svg" width="16" alt="Notifications"></button>
<button class="icon-btn"><img src="settings.svg" width="16" alt="Settings"></button>
<img src="avatar.jpg" class="avatar" alt="Jamie's profile photo">
```

---

### E2. No skip navigation link

**Requirement:** ACC-NAV-1 — Pages with repeated navigation blocks must provide a skip link.
**Location:** `index.html` (top of `<body>`)
**Severity:** Error

Keyboard users must tab through 5 sidebar links on every page load before reaching main content. A skip link lets them jump directly.

**Fix:** Add as the first child of `<body>`:
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```
And add `id="main-content"` to the `.main` container. Style the skip link to be visually hidden until focused.

---

### E3. Missing landmark roles

**Requirement:** ACC-LANDMARK-1 — Pages must use semantic landmarks (`<nav>`, `<main>`, `<header>`, `<footer>`).
**Location:** `index.html` — all major sections use generic `<div>` elements
**Severity:** Error

The sidebar, header, main content, and footer all use `<div>` with class names instead of semantic HTML5 elements. Assistive technology cannot build a page outline.

**Fix:** Replace:
- `<div class="sidebar">` with `<aside>` containing a `<nav>`
- `<div class="main">` with `<main id="main-content">`
- `<div class="header">` with `<header>`
- `<div class="footer">` with `<footer>`

---

### E4. Form inputs missing visible labels

**Requirement:** ACC-FORM-1 — Every form control must have a visible `<label>` associated via `for`/`id`.
**Location:** `index.html` lines 108-117
**Severity:** Error

The email input, amount input, and currency select all rely on `placeholder` text as their only label. Placeholders disappear on input, leaving users with no context. The `<select>` has no indication of what it controls.

**Fix:** Add `<label>` elements above or beside each input:
```html
<label for="recipient-email">Recipient email</label>
<input id="recipient-email" type="email" placeholder="e.g. name@company.com">
```

---

### E5. Color contrast failures

**Requirement:** ACC-CONTRAST-1 — Normal text must meet 4.5:1 contrast ratio (WCAG AA).
**Location:** Multiple locations
**Severity:** Error

| Element | Foreground | Background | Ratio | Verdict |
|---------|-----------|------------|-------|---------|
| `.card-label` | `#999` | `#fff` | 2.85:1 | Fail |
| Header subtitle | `#bbb` | `#f5f5f5` | 1.60:1 | Fail |
| Sidebar version text | `#aaa` on `#1a1a2e` | — | 3.84:1 | Fail |
| Footer text | `#ccc` | `#f5f5f5` | 1.43:1 | Fail |
| Table headers | `#888` | `#fff` | 3.54:1 | Fail |

**Fix:** Darken text colors. For example, `.card-label` should use at least `#595959` on white for 7:1, or `#767676` for the 4.5:1 minimum.

---

### E6. Touch targets below minimum size

**Requirement:** ACC-TOUCH-1 — Interactive elements must have a minimum target size of 44x44 CSS pixels.
**Location:** `.nav-item` (sidebar links), `.icon-btn` (header buttons), table "View" links
**Severity:** Error

The sidebar nav items render at roughly 28px tall. The icon buttons are approximately 26x26px. The "View" links in the table are even smaller. All fall below the WCAG 2.2 minimum of 24x24px and the recommended 44x44px.

**Fix:** Increase padding on `.nav-item` to at least `padding: 10px 12px` and ensure icon buttons have `min-width: 44px; min-height: 44px`. For table action links, use a button with adequate padding or enlarge the click area with pseudo-elements.

---

### E7. No focus indicators

**Requirement:** ACC-FOCUS-1 — All interactive elements must have a visible focus indicator.
**Location:** `styles.css` — no `:focus` or `:focus-visible` rules defined
**Severity:** Error

The stylesheet defines hover states but no focus states. Many browsers' default focus rings are removed by resets or are too subtle. Keyboard users cannot see where they are on the page.

**Fix:** Add global focus styles:
```css
:focus-visible {
  outline: 2px solid #4a6cf7;
  outline-offset: 2px;
}
```

---

### E8. Status conveyed by color alone

**Requirement:** ACC-COLOR-ONLY-1 — Information must not be communicated solely through color.
**Location:** `index.html` — transaction status column (lines 82-101)
**Severity:** Error

"Completed" (green), "Pending" (orange), and "Failed" (red) statuses use only color to convey meaning. Users with color vision deficiencies cannot distinguish them.

**Fix:** Add a status icon or badge with both color and a text/icon indicator:
```html
<td><span class="badge badge--success">&#10003; Completed</span></td>
<td><span class="badge badge--warning">&#9679; Pending</span></td>
<td><span class="badge badge--error">&#10007; Failed</span></td>
```

---

## Warnings — SHOULD Fix

Best-practice issues that degrade quality but are not hard blockers.

### W1. Inconsistent spacing values

**Requirement:** SPACING-GRID-1 — Use a consistent spacing scale (recommended: 4/8pt grid).
**Location:** Throughout `styles.css` and inline styles in `index.html`
**Severity:** Warning

Padding and margin values include 5px, 6px, 7px, 10px, 15px, 18px, 22px, 25px, and 30px. None of these align to a coherent scale. Each card has different inline padding (15px, 18px, 20px, 22px).

**Fix:** Define spacing tokens and apply consistently:
```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
}
```

---

### W2. Inline styles override stylesheet

**Requirement:** CSS-MAINTAINABILITY-1 — Avoid inline `style` attributes; use semantic class names.
**Location:** `index.html` — 19 inline `style` attributes
**Severity:** Warning

Almost every section in the HTML contains inline styles for padding, color, font-size, and margin. This makes the design impossible to maintain or theme consistently.

**Fix:** Move all inline styles to `styles.css` using descriptive class names (e.g., `.text-muted`, `.card-trend--positive`).

---

### W3. No responsive breakpoints

**Requirement:** RESPONSIVE-1 — Layout must adapt to viewport widths from 320px to 1440px+.
**Location:** `styles.css` — no `@media` queries present
**Severity:** Warning

The 4-column card grid, fixed sidebar, and table will break on screens below ~900px. The sidebar has no mobile collapse behavior.

**Fix:** Add breakpoints:
- At 1024px: collapse to 2-column card grid
- At 768px: hide sidebar behind a hamburger menu, stack cards to 1 column
- At 480px: make the form stack vertically

---

### W4. No form error states

**Requirement:** FORM-VALIDATION-1 — Forms should provide clear inline error messaging on invalid input.
**Location:** `index.html` lines 108-124
**Severity:** Warning

The transfer form has no validation feedback. If a user submits an invalid email or leaves amount blank, nothing happens. There are no `aria-invalid`, `aria-describedby`, or visual error messages.

**Fix:** Add validation states:
```css
.input--error { border-color: #dc3545; }
.error-message { color: #dc3545; font-size: 13px; margin-top: 4px; }
```
Use `aria-invalid="true"` and `aria-describedby` pointing to the error message element.

---

### W5. No loading or empty states

**Requirement:** STATE-FEEDBACK-1 — Async data regions should show loading, empty, and error states.
**Location:** Cards grid and transaction table
**Severity:** Warning

Dashboard data is presumably loaded asynchronously, but there are no skeleton loaders, spinners, or empty-state messages. If the API is slow or returns zero results, users see a blank screen.

**Fix:** Add skeleton placeholders:
```html
<div class="card card--loading">
  <div class="skeleton skeleton--text-sm"></div>
  <div class="skeleton skeleton--text-lg"></div>
</div>
```

---

### W6. Text line length exceeds 80 characters

**Requirement:** TYPOGRAPHY-MEASURE-1 — Body text line length should be between 45 and 75 characters.
**Location:** Header subtitle paragraph, `.main` container
**Severity:** Warning

On a 1440px screen the header subtitle renders at approximately 140+ characters per line. The `.main` container has no `max-width`, allowing all text to stretch edge-to-edge.

**Fix:** Constrain `.main` to a reasonable max-width:
```css
.main {
  max-width: 1120px;
}
```
For long descriptive text, add `max-width: 65ch` to the paragraph.

---

## Suggestions — CONSIDER

Polish items that would elevate the design further.

### S1. Add `prefers-reduced-motion` support

The sidebar hover transition (`transition: background 0.15s`) is minor, but as the app grows with more animations, wrapping them in a `prefers-reduced-motion` media query demonstrates respect for user preferences and prevents future issues.

---

### S2. Use `prefers-color-scheme` for dark mode readiness

The dashboard uses a dark sidebar and light main area. A full dark mode pass would improve usability in low-light environments. Even a minimal approach — CSS custom properties toggled via `prefers-color-scheme` — would be a meaningful improvement.

---

### S3. Add table row keyboard interaction

The transaction table rows are not interactive, but each contains a "View" action link. Consider making the entire row clickable (with the link as the accessible element) and adding `:focus-within` styles to the row for better keyboard navigation.

---

### S4. Improve the select element styling

The native `<select>` for currency looks inconsistent with the other form controls. Consider using a custom select component or at least normalizing its appearance to match the input fields' border radius, padding, and height.

---

## What's Working Well

- **Clean visual hierarchy in cards.** The metric cards use a clear pattern: muted uppercase label, bold large number, and colored trend indicator. The information architecture is immediately scannable.

- **Sensible font stack.** The system font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`) loads instantly and looks native on every platform. No unnecessary web font download.

- **Table uses native `<table>` markup.** The transaction list uses proper `<table>`, `<thead>`, and `<tbody>` elements instead of a `<div>`-based grid, which gives screen readers correct row/column semantics out of the box.

---

## Score Breakdown

| Category | Score | Max | Notes |
|----------|-------|-----|-------|
| Accessibility | 6 | 30 | 8 critical violations |
| Color & Contrast | 4 | 10 | Multiple failures below 4.5:1 |
| Typography | 5 | 10 | Good font stack, but line length unconstrained |
| Spacing & Layout | 4 | 10 | No consistent scale, many arbitrary values |
| Responsive Design | 2 | 10 | No breakpoints at all |
| Component Quality | 6 | 10 | Clean card pattern, but forms and buttons lack states |
| Visual Consistency | 4 | 10 | Inline styles fragment the design |
| Motion & Feedback | 5 | 10 | Hover states exist, but no loading/error/focus states |
| **Total** | **36** | **100** | |

---

*Review generated by OpenUI Guide `/design-review`*
