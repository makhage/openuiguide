# Accessibility: Operable

## Overview

The second WCAG principle: users must be able to operate all interface components and navigation. This means every interactive element must work with keyboard, touch, assistive technology, and voice control. If a user can't reach, activate, or navigate away from a component, it's an operability failure.

All requirements in this spec are enforcement level `MUST` — these are non-negotiable accessibility standards.

## Key Concepts

### LEARN: Input Modalities

Users interact with interfaces through many methods:
- **Keyboard** — Tab, Enter, Space, Arrow keys, Escape
- **Touch** — tap, swipe, pinch, long-press
- **Mouse/pointer** — click, hover, drag
- **Voice** — voice commands, dictation
- **Switch devices** — single-button input for motor-impaired users
- **Screen readers** — VoiceOver, TalkBack, NVDA (keyboard + audio)

Your interface must work with all of these — or at minimum, keyboard + touch + screen reader.

---

## Requirements

### REQ-A11Y-O-001: Keyboard Accessibility

**Enforcement:** `MUST` | WCAG 2.2 SC 2.1.1 (Level A)
**Platforms:** Web (primary), All
**Detectable:** Yes — check for keyboard event handlers and focusable elements

#### Why This Matters
Many users can't use a mouse: motor impairments, broken trackpad, screen reader users, power users who prefer keyboard. If any interactive element can't be reached and activated with keyboard alone, these users are blocked.

#### The Rule
- All interactive elements MUST be operable via keyboard
- Standard controls (`<button>`, `<a>`, `<input>`) are keyboard-accessible by default — use them
- Custom interactive elements (clickable divs) MUST have `tabindex="0"`, `role`, and keyboard event handlers (Enter/Space)
- All functionality available via mouse MUST also be available via keyboard

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Use semantic `<button>` and `<a>` elements. For custom: add `tabindex="0"`, `role="button"`, `onkeydown` for Enter/Space. |
| SwiftUI | Standard controls are keyboard-accessible. Use `.focusable()` for custom views. |
| Compose | Standard composables support keyboard. Use `Modifier.focusable()` for custom. |
| Flutter | Standard widgets handle keyboard. Use `Focus` widget for custom interactive elements. |

#### Common Mistakes
- `<div onclick="...">` without tabindex, role, or keyboard handler
- Custom dropdown that only opens on mouse click
- Drag-and-drop without keyboard alternative
- Hover-only interactions (tooltips, menus) with no keyboard trigger

#### How to Fix
Replace clickable divs with `<button>`. For custom components, add `tabindex="0"`, appropriate `role`, and key event handlers for Enter and Space.

---

### REQ-A11Y-O-002: Focus Order

**Enforcement:** `MUST` | WCAG 2.2 SC 2.4.3 (Level A)
**Platforms:** All
**Detectable:** Heuristic — check tabindex values and DOM order

#### Why This Matters
Tab order should follow a logical, predictable sequence — typically left-to-right, top-to-bottom (in LTR languages). When focus jumps randomly around the page, keyboard users lose their place and can't efficiently navigate.

#### The Rule
- Focus order MUST be logical and predictable, matching the visual reading order
- Do NOT use `tabindex` values greater than 0 (this forces elements out of natural order)
- `tabindex="0"` places an element in natural DOM order (correct)
- `tabindex="-1"` makes an element programmatically focusable but not in tab order (for managed focus)

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Rely on DOM order for tab sequence. Never use `tabindex="5"` or other positive values. |
| SwiftUI | View hierarchy order determines focus order. Use `FocusState` for managed focus. |
| Compose | Composable order determines focus. Use `FocusRequester` for managed focus. |
| Flutter | Widget tree order determines focus. Use `FocusNode` for managed focus. |

#### Common Mistakes
- `tabindex="1"`, `tabindex="2"`, etc. scattered through HTML (creates unpredictable order)
- CSS `order` or absolute positioning making visual order different from DOM order
- Modal dialog where focus escapes behind the modal

---

### REQ-A11Y-O-003: Focus Visibility

**Enforcement:** `MUST` | WCAG 2.2 SC 2.4.7, 2.4.11 (Level AA)
**Platforms:** All
**Detectable:** Yes — check for outline removal without replacement

#### Why This Matters
The focus indicator (typically a blue ring) shows keyboard users where they are on the page. Removing it with `outline: none` (a common "design cleanup" move) makes the interface blind-navigable. This is the second most common accessibility mistake after missing alt text.

#### The Rule
- All interactive elements MUST have a **visible focus indicator**
- Focus indicators MUST have at least **3:1 contrast** against the background
- WCAG 2.4.11 (Level AA): focus indicator must be at least 2px thick and encompass the element
- If you remove the default outline, you MUST provide a custom focus style

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Never `outline: none` without replacement. Use `:focus-visible` for keyboard-only focus styles. |
| SwiftUI | System provides focus rings automatically. Don't override with `.focusable(false)`. |
| Compose | Material components show focus indicators. Custom: use `Modifier.border()` with `FocusState`. |
| Flutter | Material widgets show focus indicators. Custom: use `FocusNode` with decoration changes. |

#### Common Mistakes
- Global `*:focus { outline: none; }` in CSS reset
- Custom focus styles that are too subtle (1px dotted gray)
- Focus indicator visible on light backgrounds but invisible on dark backgrounds
- `:focus` instead of `:focus-visible` (shows ring on mouse click too, prompting removal)

#### How to Fix
Use `:focus-visible` (keyboard focus only) with a clear, high-contrast indicator: `outline: 2px solid; outline-offset: 2px;`

---

### REQ-A11Y-O-004: No Keyboard Traps

**Enforcement:** `MUST` | WCAG 2.2 SC 2.1.2 (Level A)
**Platforms:** All
**Detectable:** Heuristic — check for elements that receive focus but can't release it

#### Why This Matters
If a user tabs into a component and can't tab out, they're trapped. They must reload the page or abandon the task. This completely blocks keyboard users.

#### The Rule
- Users MUST be able to navigate **away from** any focusable component using standard keyboard (Tab, Shift+Tab, Escape)
- Exception: modal dialogs should trap focus intentionally (but Escape must close them)
- Custom widgets (sliders, date pickers, rich text editors) must provide documented keyboard exit

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Ensure custom widgets don't consume all keyboard events. Test: can you Tab in and Tab out? |
| SwiftUI | System handles focus management. Custom: ensure `.onExitCommand` or `.onMoveCommand` are handled. |
| Compose | Ensure `FocusRequester` doesn't create circular focus loops without an exit path. |
| Flutter | Ensure `FocusNode` hierarchy allows traversal out of custom widgets. |

---

### REQ-A11Y-O-005: Focus Management for Dynamic Content

**Enforcement:** `MUST` | WCAG 2.2 SC 2.4.3, WAI-ARIA
**Platforms:** All
**Detectable:** Heuristic — check focus behavior after dynamic content changes

#### Why This Matters
When new content appears (modal opens, inline form appears, page navigates via SPA), focus must move to the new content. Otherwise, keyboard/screen reader users are left focused on the previous context with no indication that something changed.

#### The Rule
- When a modal/dialog opens, focus MUST move to the first focusable element (or the dialog container)
- When a modal closes, focus MUST return to the element that opened it
- When content is removed, focus MUST move to a logical location (not lost in the void)
- SPA route changes should move focus to the new page's heading or main content
- Toast/snackbar notifications should be announced via aria-live, not steal focus

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Dialog: `dialog.showModal()` handles focus. SPA: `document.querySelector('h1').focus()` on navigation. |
| SwiftUI | `@FocusState` to manage focus. System sheets handle focus automatically. |
| Compose | `LaunchedEffect` + `FocusRequester.requestFocus()` for dialogs. |
| Flutter | `FocusNode.requestFocus()` after dialog opens. `FocusScopeNode` for restoration. |

---

### REQ-A11Y-O-006: Touch Target Size

**Enforcement:** `MUST` | WCAG 2.5.8 (Level AA), Apple HIG, Material Design 3
**Platforms:** All
**Detectable:** Yes — check element dimensions

#### Why This Matters
(See also REQ-SPACE-002.) Small touch targets are the most common mobile usability failure. WCAG 2.5.8 requires a minimum of 24×24 CSS pixels with adequate spacing, while platform guidelines recommend larger.

#### The Rule
- Interactive targets MUST be at least **24×24 CSS pixels** (WCAG AA minimum)
- Targets SHOULD be at least **44×44 points** (Apple) or **48×48dp** (Material)
- If targets are smaller than 24px, they MUST have at least 24px of spacing to adjacent targets
- Inline links within text are exempt

---

### REQ-A11Y-O-007: Timing and Time Limits

**Enforcement:** `MUST` | WCAG 2.2 SC 2.2.1 (Level A)
**Platforms:** All
**Detectable:** Heuristic — check for timed interactions without extension options

#### Why This Matters
Users with cognitive, motor, or vision impairments need more time to read content, fill forms, and complete tasks. Auto-advancing carousels, session timeouts, and time-limited forms create barriers.

#### The Rule
- If a time limit is set on content/interaction, users MUST be able to: turn off, adjust, or extend the time
- Provide at least **20 seconds** warning before a timeout with option to extend
- Auto-updating content (news feeds, scores) MUST have a pause mechanism
- Exception: real-time events (auctions, live streams) where timing is essential

---

### REQ-A11Y-O-008: Skip Navigation

**Enforcement:** `MUST` | WCAG 2.2 SC 2.4.1 (Level A)
**Platforms:** Web
**Detectable:** Yes — check for skip link as first focusable element

#### Why This Matters
Keyboard users must tab through the entire navigation on every page load before reaching main content. A skip link lets them jump directly to the content — saving dozens of keystrokes per page.

#### The Rule
- Web pages MUST provide a "Skip to main content" link as the first focusable element
- The link should be visually hidden by default but appear on focus
- The link MUST point to the main content area (via `#main-content` or similar)

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | `<a href="#main-content" class="skip-link">Skip to main content</a>` as first element in body. Style: visually hidden, visible on `:focus`. |
| SwiftUI | Not applicable — no repeated navigation pattern per page load |
| Compose | Not applicable for native apps |
| Flutter | Web: provide skip link in the HTML shell |

---

### REQ-A11Y-O-009: Pointer Gesture Alternatives

**Enforcement:** `MUST` | WCAG 2.2 SC 2.5.1 (Level A)
**Platforms:** All (especially mobile)
**Detectable:** Heuristic — check for swipe/pinch gestures without alternatives

#### Why This Matters
Complex gestures (pinch-to-zoom, multi-finger swipe, draw-a-shape) require fine motor control that many users don't have. Every gesture-based interaction must have a simple single-pointer alternative (tap, click).

#### The Rule
- All functionality triggered by multi-point or path-based gestures MUST have a single-pointer alternative
- Swipe-to-delete MUST also have a button/tap alternative
- Pinch-to-zoom MUST also have zoom buttons
- Drag-to-reorder MUST also have move-up/move-down buttons or a reorder mode

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-A11Y-O-001 | Keyboard Accessibility | MUST | Yes |
| REQ-A11Y-O-002 | Focus Order | MUST | Heuristic |
| REQ-A11Y-O-003 | Focus Visibility | MUST | Yes |
| REQ-A11Y-O-004 | No Keyboard Traps | MUST | Heuristic |
| REQ-A11Y-O-005 | Focus Management for Dynamic Content | MUST | Heuristic |
| REQ-A11Y-O-006 | Touch Target Size | MUST | Yes |
| REQ-A11Y-O-007 | Timing and Time Limits | MUST | Heuristic |
| REQ-A11Y-O-008 | Skip Navigation | MUST | Yes |
| REQ-A11Y-O-009 | Pointer Gesture Alternatives | MUST | Heuristic |

## Further Reading

- [WCAG 2.2 — Operable Guidelines](https://www.w3.org/TR/WCAG22/#operable)
- [WAI: Keyboard Accessibility](https://www.w3.org/WAI/perspective-videos/keyboard/)
- [WebAIM: Keyboard Testing](https://webaim.org/techniques/keyboard/)
- [Apple: Motor Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility#Motor)
- [:focus-visible MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
