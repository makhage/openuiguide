# Components: Modals and Overlays

## Overview

Modals, dialogs, bottom sheets, popovers, and tooltips are overlay patterns that demand user attention or provide contextual information. They interrupt the main flow — which means they should be used sparingly and implemented correctly. Poor modal implementation is one of the most common sources of accessibility failures and user frustration.

## Key Concepts

### LEARN: Overlay Types

- **Modal dialog** — blocks interaction with the page until dismissed. For critical decisions.
- **Non-modal dialog** — allows interaction with the page. For supplementary information.
- **Bottom sheet** — slides up from bottom. For contextual actions (mobile-native pattern).
- **Popover/Tooltip** — appears near a trigger element. For brief supplementary info.
- **Toast/Snackbar** — brief notification, auto-dismisses. For status feedback.

---

## Requirements

### REQ-MODAL-001: Focus Management

**Enforcement:** `MUST` | WCAG 2.2 SC 2.4.3, WAI-ARIA Dialog Pattern
**Platforms:** All
**Detectable:** Heuristic — check focus behavior when modal opens/closes

#### Why This Matters
When a modal opens, keyboard focus must move into it. When it closes, focus must return to the trigger. Without this, keyboard users are stranded — focused on invisible content behind the modal, or lost in the page with no orientation.

#### The Rule
- When a modal opens, focus MUST move to the **first focusable element** inside it (or the modal container itself)
- Focus MUST be **trapped** inside the modal (Tab should cycle within the modal, not escape to the page behind)
- When the modal closes, focus MUST **return to the element that opened it**
- The `<dialog>` element (web) handles all of this natively — prefer it over custom implementations

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Use `<dialog>` with `.showModal()`. It handles focus trapping and restoration natively. |
| SwiftUI | `.sheet()` and `.alert()` handle focus automatically |
| Compose | `AlertDialog()` and `ModalBottomSheet()` handle focus |
| Flutter | `showDialog()` and `showModalBottomSheet()` handle focus |

---

### REQ-MODAL-002: Dismiss Mechanisms

**Enforcement:** `MUST` | WCAG 2.2 SC 2.1.2, Platform Conventions
**Platforms:** All
**Detectable:** Yes — check for close button and Escape key handling

#### Why This Matters
Users must always be able to dismiss a modal. Trapped in a modal with no way out, a keyboard user must reload the page. Multiple dismiss mechanisms improve usability for all users.

#### The Rule
- Modals MUST have a **visible close button** (×, "Cancel", or "Close")
- Pressing **Escape** MUST close the modal (web and desktop)
- Clicking the **backdrop/scrim** SHOULD close the modal (for non-destructive modals)
- Mobile bottom sheets SHOULD support **swipe-to-dismiss**
- The close button should be in a consistent, predictable position (top-right for LTR)

---

### REQ-MODAL-003: Background Scrim

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Heuristic — check for backdrop/overlay behind modal

#### Why This Matters
A scrim (semi-transparent overlay) signals that the modal is foreground and the page behind is inactive. Without it, users may not realize the page behind is blocked, and the modal's boundaries are unclear.

#### The Principle
- Modal dialogs SHOULD display a **semi-transparent scrim** over the background content
- The scrim should be dark enough to clearly indicate the background is inactive (typically 40-60% opacity black)
- Content behind the scrim should be visually de-emphasized but not completely hidden
- The scrim itself should not receive focus

---

### REQ-MODAL-004: Modal Content Structure

**Enforcement:** `SHOULD` | Material Design 3
**Platforms:** All
**Detectable:** Heuristic — check for title, content, and action areas in dialogs

#### Why This Matters
Dialogs without a clear title leave users wondering what they're looking at. Dialogs without clear actions leave users wondering what to do. A consistent structure (title → content → actions) makes every dialog instantly understandable.

#### The Principle
- Dialogs SHOULD include: **Title** (what this is about), **Content** (details/question), **Actions** (what the user can do)
- Title should be concise and descriptive: "Delete this file?" not "Warning"
- Actions should follow button hierarchy: primary action on the right (or leading on mobile), cancel on the left
- Destructive confirmations should name the action: "Delete" not "OK"

---

### REQ-MODAL-005: Avoid Modal Overuse

**Enforcement:** `CONSIDER` | UX Best Practice
**Platforms:** All
**Detectable:** Manual review only

#### Why This Matters
Modals interrupt the user's flow. Every modal is a forced context switch. Overusing modals for non-critical information (newsletters, cookies, "rate our app") trains users to dismiss them reflexively — including important ones.

#### The Principle
- Use modals only for content that **requires immediate attention** or **prevents data loss**
- Good uses: confirmations for destructive actions, critical alerts, focused input tasks
- Bad uses: informational messages (use inline or toast), settings changes (use inline), login prompts on first visit
- Consider inline alternatives: expanding sections, toasts, banners, inline forms

---

### REQ-MODAL-006: Accessible Dialog Markup

**Enforcement:** `MUST` | WCAG 2.2 SC 4.1.2, WAI-ARIA
**Platforms:** Web (primary), All
**Detectable:** Yes — check for role, aria-modal, aria-labelledby

#### Why This Matters
Screen readers need to know that a modal is a dialog, what it's called, and that the background is inert. Without proper ARIA markup, a screen reader user may not realize a dialog opened or may try to interact with hidden background content.

#### The Rule
- Use native `<dialog>` element (preferred) or `role="dialog"` with `aria-modal="true"`
- The dialog MUST have an accessible name via `aria-labelledby` (pointing to the title) or `aria-label`
- Background content MUST be inert when modal is open (`<dialog>` handles this; custom: use `inert` attribute on background)

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-MODAL-001 | Focus Management | MUST | Heuristic |
| REQ-MODAL-002 | Dismiss Mechanisms | MUST | Yes |
| REQ-MODAL-003 | Background Scrim | SHOULD | Heuristic |
| REQ-MODAL-004 | Modal Content Structure | SHOULD | Heuristic |
| REQ-MODAL-005 | Avoid Modal Overuse | CONSIDER | Manual |
| REQ-MODAL-006 | Accessible Dialog Markup | MUST | Yes |

## Further Reading

- [Material Design 3: Dialogs](https://m3.material.io/components/dialogs/overview)
- [Apple HIG: Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- [WAI-ARIA: Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [HTML dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
