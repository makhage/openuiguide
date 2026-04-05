# Accessibility: Robust

## Overview

The fourth WCAG principle: content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies. This means using valid, semantic markup with proper roles, states, and properties so that screen readers, voice control, and other assistive tools can correctly interpret your interface.

All requirements in this spec are enforcement level `MUST`.

## Key Concepts

### LEARN: The Accessibility Tree

Browsers build an accessibility tree from your markup — a parallel structure to the DOM that assistive technologies read. When you use semantic HTML (`<button>`, `<nav>`, `<main>`), the accessibility tree is populated automatically. When you use generic elements (`<div>`, `<span>`) for interactive components, the tree has gaps that assistive technology can't fill without explicit ARIA attributes.

---

## Requirements

### REQ-A11Y-R-001: Semantic HTML Elements

**Enforcement:** `MUST` | WCAG 2.2 SC 4.1.2, HTML Specification
**Platforms:** Web (primary), All
**Detectable:** Yes — check for div/span used as interactive elements without roles

#### Why This Matters
Semantic elements carry built-in accessibility: `<button>` is focusable, clickable via keyboard, and announced as "button" by screen readers — for free. A `<div>` has none of this. Using semantic elements is the single most effective thing you can do for accessibility.

#### The Rule
- Use semantic HTML elements for their intended purpose:
  - `<button>` for actions, `<a>` for navigation
  - `<nav>`, `<main>`, `<header>`, `<footer>`, `<aside>` for page landmarks
  - `<section>` and `<article>` for content grouping
  - `<ul>`, `<ol>`, `<li>` for lists
  - `<table>`, `<th>`, `<td>` for tabular data
  - `<form>`, `<fieldset>`, `<legend>` for forms
- Do NOT use `<div>` or `<span>` for interactive elements unless absolutely necessary (and then add full ARIA)

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Use native elements. `<button>` not `<div role="button">`. `<nav>` not `<div class="nav">`. |
| SwiftUI | Use system components (`Button`, `NavigationLink`, `List`). They provide accessibility free. |
| Compose | Use Material components (`Button`, `TextField`, `NavigationBar`). They include semantics. |
| Flutter | Use Material/Cupertino widgets. They include semantic annotations. |

#### Common Mistakes
- `<div onclick="...">` instead of `<button>`
- `<span>` styled as a link instead of `<a href="...">`
- `<div class="table">` instead of `<table>`
- Entire page is nested `<div>` elements with no landmarks

---

### REQ-A11Y-R-002: ARIA Roles and Properties

**Enforcement:** `MUST` | WCAG 2.2 SC 4.1.2, WAI-ARIA 1.2
**Platforms:** Web (primary)
**Detectable:** Yes — validate ARIA attributes

#### Why This Matters
When native semantic elements can't be used (complex custom widgets), ARIA fills the gap by explicitly declaring what an element is (role), what state it's in (aria-expanded, aria-checked), and what it's labeled as (aria-label). But incorrect ARIA is worse than no ARIA — it provides false information to assistive tech.

#### The Rule
- ARIA attributes MUST be valid (no typos, no made-up attributes)
- Roles MUST have their required properties (e.g., `role="checkbox"` requires `aria-checked`)
- ARIA states MUST be updated dynamically (e.g., toggle `aria-expanded` when a menu opens)
- **First rule of ARIA:** Don't use ARIA if a native semantic element exists
- ARIA labels MUST NOT duplicate visible text (creates redundant announcements)

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Validate with axe-core or Lighthouse. Example: `<div role="tablist"><div role="tab" aria-selected="true">Tab 1</div></div>` |
| SwiftUI | Use accessibility modifiers: `.accessibilityAddTraits(.isButton)`, `.accessibilityValue("50%")` |
| Compose | Use semantics: `Modifier.semantics { role = Role.Tab; selected = true }` |
| Flutter | Use `Semantics` widget: `Semantics(button: true, label: 'Submit')` |

#### Common Mistakes
- `aria-label` on an element that already has visible text (redundant)
- `role="button"` without keyboard handler (role doesn't add behavior)
- `aria-expanded` never toggled when content opens/closes
- Made-up ARIA attributes (`aria-tooltip`, `aria-size` — these don't exist)

---

### REQ-A11Y-R-003: Status Messages and Live Regions

**Enforcement:** `MUST` | WCAG 2.2 SC 4.1.3 (Level AA)
**Platforms:** All
**Detectable:** Heuristic — check for dynamic content updates without aria-live

#### Why This Matters
When content updates dynamically (search results count, form validation message, toast notification), sighted users see the change. Screen reader users don't — unless the change is announced via a live region. Without this, dynamic updates are invisible to assistive tech.

#### The Rule
- Dynamic status messages MUST be announced via `aria-live` regions or `role="status"`/`role="alert"`
- Use `aria-live="polite"` for non-urgent updates (results count, save confirmation)
- Use `aria-live="assertive"` or `role="alert"` for urgent messages (errors, warnings)
- Don't overuse assertive — it interrupts the user's current activity

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | `<div role="status" aria-live="polite">3 results found</div>` or `<div role="alert">Error: invalid email</div>` |
| SwiftUI | `AccessibilityNotification.Announcement("3 results found").post()` |
| Compose | `LiveRegion` modifier: `Modifier.semantics { liveRegion = LiveRegionMode.Polite }` |
| Flutter | `SemanticsService.announce("3 results found", TextDirection.ltr)` |

---

### REQ-A11Y-R-004: Name, Role, Value

**Enforcement:** `MUST` | WCAG 2.2 SC 4.1.2 (Level A)
**Platforms:** All
**Detectable:** Yes — check that all interactive elements have accessible name, role, and value

#### Why This Matters
Every interactive element must communicate three things to assistive tech: what it's called (name), what kind of element it is (role), and its current state (value). A toggle without a name, a slider without a value, or a custom component without a role is opaque to screen reader users.

#### The Rule
- All interactive elements MUST have an **accessible name** (visible label, aria-label, or aria-labelledby)
- All interactive elements MUST have an appropriate **role** (native element role or explicit ARIA role)
- Elements with variable state MUST expose their current **value** (aria-valuenow, aria-checked, aria-expanded)

#### Common Mistakes
- Custom slider with no `aria-valuenow` or `aria-valuemin`/`aria-valuemax`
- Icon button with no accessible name at all
- Custom toggle with `role="checkbox"` but `aria-checked` never updated

---

### REQ-A11Y-R-005: Valid Markup

**Enforcement:** `MUST` | WCAG 2.2 SC 4.1.1 (Level A, deprecated but still good practice)
**Platforms:** Web
**Detectable:** Yes — run HTML validator

#### Why This Matters
Duplicate IDs, malformed nesting, and unclosed tags can confuse assistive technology parsers. While modern browsers are forgiving, screen readers may not handle markup errors gracefully.

#### The Rule
- HTML MUST NOT have duplicate `id` attributes (breaks label associations and ARIA references)
- Elements MUST be properly nested (no `<p>` inside `<p>`, no block inside inline)
- All opened tags MUST be properly closed
- Attribute values MUST be properly quoted

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-A11Y-R-001 | Semantic HTML Elements | MUST | Yes |
| REQ-A11Y-R-002 | ARIA Roles and Properties | MUST | Yes |
| REQ-A11Y-R-003 | Status Messages and Live Regions | MUST | Heuristic |
| REQ-A11Y-R-004 | Name, Role, Value | MUST | Yes |
| REQ-A11Y-R-005 | Valid Markup | MUST | Yes |

## Further Reading

- [WCAG 2.2 — Robust Guidelines](https://www.w3.org/TR/WCAG22/#robust)
- [WAI-ARIA Authoring Practices 1.2](https://www.w3.org/WAI/ARIA/apg/)
- [The First Rule of ARIA Use](https://www.w3.org/TR/using-aria/#firstrule)
- [HTML Validator](https://validator.w3.org/)
- [axe-core Accessibility Testing](https://www.deque.com/axe/)
