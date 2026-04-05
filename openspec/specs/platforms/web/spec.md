# Platform: Web (HTML/CSS/JavaScript)

## Overview

The web platform has unique considerations: browser compatibility, CSS specificity, HTML semantics, performance budgets, and the open nature of the platform (users can zoom, resize, use extensions, override styles). This spec covers web-specific best practices that complement the cross-platform specs.

## Requirements

### REQ-WEB-001: Semantic HTML Structure

**Enforcement:** `MUST` | HTML Specification, WCAG
**Platforms:** Web
**Detectable:** Yes — check for landmark elements and semantic structure

#### Why This Matters
Semantic HTML is the foundation of web accessibility. It provides the document structure that screen readers, search engines, and browser features rely on. A page built entirely with `<div>` elements is a blank slate to assistive technology.

#### The Rule
Every page MUST include these semantic landmarks:
- `<header>` — page header/branding
- `<nav>` — navigation (with `aria-label` if multiple)
- `<main>` — primary content (exactly one per page)
- `<footer>` — page footer
- Use `<section>`, `<article>`, `<aside>` for content grouping
- Use `<h1>` through `<h6>` for heading hierarchy (see REQ-TYPO-008)

---

### REQ-WEB-002: CSS Custom Properties for Theming

**Enforcement:** `SHOULD` | CSS Best Practice
**Platforms:** Web
**Detectable:** Yes — check for CSS custom properties vs. hard-coded values

#### Why This Matters
Hard-coded colors, spacing, and font values scattered through dozens of CSS files create maintenance nightmares and prevent theming. CSS custom properties centralize these values, enable dark mode, and allow component-level customization.

#### The Principle
- Define all design tokens as CSS custom properties on `:root`
- Colors: `--color-primary`, `--color-surface`, `--color-on-surface`, etc.
- Spacing: `--space-1` through `--space-12`
- Typography: `--text-sm`, `--text-base`, `--text-lg`, etc.
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Switch token values for dark mode: `@media (prefers-color-scheme: dark) { :root { ... } }`

---

### REQ-WEB-003: Modern CSS Layout

**Enforcement:** `SHOULD` | CSS Best Practice
**Platforms:** Web
**Detectable:** Heuristic — flag float-based layouts

#### Why This Matters
CSS Grid and Flexbox are the modern, correct tools for layout. Floats, absolute positioning hacks, and table-based layouts are legacy techniques that create fragile, inaccessible layouts.

#### The Principle
- Use **Flexbox** for one-dimensional layouts (rows, columns, centering)
- Use **CSS Grid** for two-dimensional layouts (page grids, card grids)
- Reserve `position: absolute/fixed` for overlays, tooltips, and sticky elements — not page layout
- Do not use floats for layout (acceptable for text wrapping around images only)

---

### REQ-WEB-004: Focus-Visible for Keyboard Users

**Enforcement:** `MUST` | WCAG 2.2 SC 2.4.7
**Platforms:** Web
**Detectable:** Yes — check for :focus-visible usage and outline handling

#### Why This Matters
The `:focus-visible` pseudo-class shows focus indicators only for keyboard navigation, not mouse clicks. This solves the common conflict between designers who want to remove focus rings (for visual cleanliness) and accessibility requiring them (for keyboard users).

#### The Rule
- Use `:focus-visible` instead of `:focus` for focus styles
- NEVER use `*:focus { outline: none }` without a `:focus-visible` replacement
- Focus indicator: at least 2px solid, at least 3:1 contrast, with offset for visibility

```css
/* Recommended pattern */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

### REQ-WEB-005: CSS Specificity Management

**Enforcement:** `SHOULD` | CSS Best Practice
**Platforms:** Web
**Detectable:** Heuristic — flag high-specificity selectors and !important usage

#### Why This Matters
CSS specificity battles (`!important` overriding `!important`, IDs overriding classes overriding elements) create unmaintainable stylesheets where changes have unpredictable cascade effects. Flat, low-specificity selectors are predictable and maintainable.

#### The Principle
- Use **class selectors** for all styling (avoid ID selectors for styling)
- Keep selector nesting to **3 levels maximum**
- Use `!important` only in utility classes (display utilities, screen-reader-only)
- Use CSS layers (`@layer`) or BEM methodology to manage cascade intentionally

---

### REQ-WEB-006: Performance Budget

**Enforcement:** `CONSIDER` | Web Performance Best Practice
**Platforms:** Web
**Detectable:** Heuristic — check bundle sizes and resource counts

#### Why This Matters
Performance directly impacts user experience and business metrics. A 1-second delay in page load reduces conversions by 7% (Akamai). Web performance is a design consideration, not just an engineering one.

#### The Principle
- Aim for **Largest Contentful Paint (LCP)** under 2.5 seconds
- Aim for **First Input Delay (FID)** under 100ms
- Aim for **Cumulative Layout Shift (CLS)** under 0.1
- Minimize JavaScript bundle size — consider if heavy frameworks are justified
- Optimize images (WebP/AVIF, srcset, lazy loading)
- Use code splitting and lazy loading for non-critical JavaScript

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-WEB-001 | Semantic HTML Structure | MUST | Yes |
| REQ-WEB-002 | CSS Custom Properties for Theming | SHOULD | Yes |
| REQ-WEB-003 | Modern CSS Layout | SHOULD | Heuristic |
| REQ-WEB-004 | Focus-Visible for Keyboard Users | MUST | Yes |
| REQ-WEB-005 | CSS Specificity Management | SHOULD | Heuristic |
| REQ-WEB-006 | Performance Budget | CONSIDER | Heuristic |

## Further Reading

- [MDN: Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [Web.dev: Core Web Vitals](https://web.dev/articles/vitals)
- [CSS-Tricks: CSS Custom Properties](https://css-tricks.com/a-complete-guide-to-custom-properties/)
- [MDN: :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
