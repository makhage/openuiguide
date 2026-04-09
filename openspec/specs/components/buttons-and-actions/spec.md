# Components: Buttons and Actions

## Overview

Buttons are the primary way users take action in an interface. They're deceptively simple — a rectangle with text — but professional button design involves clear hierarchy (primary vs. secondary), appropriate sizing, visible states, meaningful labels, and accessibility. A well-designed button system is the backbone of any UI.

## Key Concepts

### LEARN: Button Hierarchy

Every button system needs three levels:
1. **Primary** (high emphasis) — the main action: filled/solid background, prominent color. One per context.
2. **Secondary** (medium emphasis) — alternative actions: outlined or toned. Supporting the primary.
3. **Tertiary** (low emphasis) — less common actions: text-only, subtle. Cancel, dismiss, "learn more."

### LEARN: Button vs. Link

- **Button** (`<button>`) — performs an action (submit, save, delete, toggle)
- **Link** (`<a>`) — navigates to a destination (new page, new section, external URL)
- Don't style links as buttons for actions. Don't use buttons for navigation.

---

## Requirements

### REQ-BTN-001: Clear Button Hierarchy

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Heuristic — flag multiple primary-styled buttons in same context

#### Why This Matters
When two buttons look equally important, users hesitate. "Save" and "Cancel" should not be twins. Clear visual hierarchy guides users to the right action and reduces decision time.

#### The Principle
- Maximum ONE primary (filled) button per screen section or dialog
- Secondary actions should be visually lighter (outlined, toned, or text-only)
- Destructive actions should be distinct (red/danger variant, or text-only to reduce prominence)
- Button hierarchy should match action importance

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Primary: solid bg + contrasting text. Secondary: outlined/ghost. Tertiary: text-only with padding. |
| SwiftUI | `.buttonStyle(.borderedProminent)` primary, `.bordered` secondary, `.plain` tertiary |
| Compose | `Button()` primary, `OutlinedButton()` secondary, `TextButton()` tertiary |
| Flutter | `ElevatedButton` primary, `OutlinedButton` secondary, `TextButton` tertiary |

#### Creative Freedom
Your button styles define your product's personality. Rounded corners feel friendly, square feels precise, pill-shaped feels modern. Color, shape, and typography are all yours to decide within the hierarchy framework.

---

### REQ-BTN-002: Interactive States

**Enforcement:** `MUST` | WCAG 2.2, Material Design 3
**Platforms:** All
**Detectable:** Yes — check for hover, focus, active, and disabled styles

#### Why This Matters
Buttons without state feedback feel broken. Users click and nothing happens visually — did it register? Is it loading? Interactive states confirm that the interface is alive and responsive.

#### The Rule
Every button MUST have visually distinct styles for:
- **Default** — resting state (MUST)
- **Hover** — pointer is over the button, desktop (MUST)
- **Focus** — keyboard focus indicator, see REQ-A11Y-O-003 (MUST)
- **Active/Pressed** — button is being clicked/tapped (SHOULD — browser defaults satisfy this for standard buttons)
- **Disabled** — button is non-interactive, reduced opacity, muted color (SHOULD — only applies when disabled buttons exist in the UI)
- **Loading** (optional) — action is in progress (spinner or text change)

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | Define `:hover`, `:focus-visible`, `:active`, `:disabled`, `[aria-busy="true"]` states |
| SwiftUI | System handles most states. Custom: use `.opacity()` in `ButtonStyle` for pressed. |
| Compose | Material `Button` handles states. Custom: use `interactionSource` to read state. |
| Flutter | Material widgets handle states. Custom: use `MaterialStateProperty` for each state. |

#### Common Mistakes
- No hover state — button looks static on desktop
- Disabled button with same opacity as enabled (can't tell it's disabled)
- No visual change on press/active (user doesn't know click registered)
- `cursor: pointer` not set on custom button elements (web)

---

### REQ-BTN-003: Descriptive Button Labels

**Enforcement:** `MUST` | WCAG 2.2 SC 2.4.6, UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — flag generic labels like "Submit", "Click here", "OK"

#### Detection Guidance
Check for exact matches against single-word generic labels: 'Submit', 'OK', 'Yes', 'No', 'Send', 'Clear', 'Go', 'Click here'. Do NOT flag multi-word labels that include these words but add context: 'Send Feedback', 'Clear Form', 'Submit Order' are all descriptive and acceptable.

#### Why This Matters
"Submit" tells users nothing about what happens next. "Create account" tells them everything. Specific labels reduce anxiety, increase confidence, and help screen reader users who navigate by button list.

#### The Rule
- Button labels MUST describe the **action** that will happen: "Save changes," "Add to cart," "Send message"
- Avoid generic labels: "Submit," "OK," "Click here," "Yes/No"
- Labels should be concise (2-4 words) but specific
- For icon-only buttons, provide an accessible label describing the action (see REQ-ICON-004)

#### Common Mistakes
- "Submit" on every form (submit what?)
- "OK" / "Cancel" in dialogs (OK to what? What gets cancelled?)
- "Click here" (meaningless out of context, especially for screen readers)

#### How to Fix
Replace generic labels: "Submit" → "Create account." "OK" → "Delete message." "Cancel" → "Keep editing."

---

### REQ-BTN-004: Adequate Button Size

**Enforcement:** `MUST` | WCAG 2.5.8, Apple HIG, Material Design 3
**Platforms:** All
**Detectable:** Yes — check button dimensions

#### Why This Matters
Buttons that are too small cause mis-taps and frustrate users. Minimum size requirements ensure all users — including those with motor impairments — can reliably hit the target.

#### The Rule
- Button minimum height: **44px** (Apple) / **48dp** (Material) / **24px** (WCAG AA minimum with spacing)
- Button minimum width: at least as wide as its height (no tiny square buttons unless icon-only with adequate padding)
- Button padding: at least **12px vertical, 24px horizontal** for text buttons

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | `min-height: 44px; padding: 12px 24px;` |
| SwiftUI | System buttons meet size requirements. Custom: `.frame(minHeight: 44)` |
| Compose | `Button(modifier = Modifier.heightIn(min = 48.dp))` or use Material defaults |
| Flutter | `ElevatedButton` defaults to 48dp height. Custom: `SizedBox(height: 48)` wrapper |

---

### REQ-BTN-005: Button vs. Link Semantics

**Enforcement:** `MUST` | HTML Specification, Accessibility
**Platforms:** Web (primary), All
**Detectable:** Yes — check for links styled as buttons performing actions, or vice versa

#### Why This Matters
Screen readers announce buttons and links differently. Voice control users say "click button" or "click link." When semantics are wrong, assistive tech users can't find or activate elements. Additionally, links can be opened in new tabs and are in the browser history — buttons are not.

#### The Rule
- Use `<button>` for actions (submit form, open modal, toggle state, delete item)
- Use `<a href="...">` for navigation (go to another page, jump to section, external URL)
- Do NOT use `<a href="#" onclick="...">` for actions — use `<button>`
- Do NOT use `<button onclick="navigate(...)">` for navigation — use `<a>`

---

### REQ-BTN-006: Loading and Disabled States

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for loading patterns on form submit buttons

#### Why This Matters
When a user clicks "Submit" and nothing visible happens for 2 seconds, they click again. And again. This can cause duplicate submissions, errors, and frustration. Loading states prevent this.

#### The Principle
- Buttons that trigger async operations SHOULD show a loading state (spinner, text change, or progress)
- While loading, the button SHOULD be disabled to prevent double-submission
- The loading indicator should replace the button content, not appear next to it (prevents layout shift)
- After completion, restore the button or show success feedback

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Replace text with spinner: `<button disabled aria-busy="true"><Spinner/> Saving...</button>` |
| SwiftUI | `Button { } label: { if isLoading { ProgressView() } else { Text("Save") } }.disabled(isLoading)` |
| Compose | `Button(enabled = !isLoading) { if (isLoading) CircularProgressIndicator() else Text("Save") }` |
| Flutter | `ElevatedButton(onPressed: isLoading ? null : onSave, child: isLoading ? CircularProgressIndicator() : Text('Save'))` |

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-BTN-001 | Clear Button Hierarchy | SHOULD | Heuristic |
| REQ-BTN-002 | Interactive States | MUST | Yes |
| REQ-BTN-003 | Descriptive Button Labels | MUST | Heuristic |
| REQ-BTN-004 | Adequate Button Size | MUST | Yes |
| REQ-BTN-005 | Button vs. Link Semantics | MUST | Yes |
| REQ-BTN-006 | Loading and Disabled States | SHOULD | Heuristic |

## Further Reading

- [Material Design 3: Buttons](https://m3.material.io/components/buttons/overview)
- [Apple HIG: Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- [NNGroup: Button UX Design](https://www.nngroup.com/articles/button-design-best-practices/)
- [WAI-ARIA: Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
