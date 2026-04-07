# Patterns: UX Writing

## Overview

Every word in a UI is a design decision. Micro-copy — button labels, error messages, placeholders, tooltips, empty states — shapes how users understand, navigate, and feel about your product. Bad copy creates confusion, erodes trust, and drives support tickets. Good copy is invisible: it guides users effortlessly through tasks without making them stop and think about the interface itself.

## Requirements

### REQ-COPY-001: Descriptive Button Labels

**Enforcement:** `MUST` | WCAG 2.4.6, NNGroup
**Platforms:** All
**Detectable:** Heuristic — scan button/submit text for generic labels

#### Why This Matters
"Submit" and "OK" tell the user nothing about what will happen next. "Save Changes", "Create Account", and "Send Message" set clear expectations. Descriptive labels reduce hesitation, prevent errors, and are critical for screen reader users who navigate by button labels alone.

#### The Rule
- Buttons MUST use **descriptive, action-oriented labels** that describe what happens when clicked
- Avoid generic labels: "Submit", "OK", "Yes", "No", "Click Here", "Go", "Continue"
- Prefer specific labels: "Save Changes", "Create Account", "Send Message", "Download Report", "Add to Cart"
- The label should describe the **outcome**, not the mechanic of clicking
- For destructive actions, name the destruction: "Delete Project" not "Confirm"

#### Creative Freedom
Icon-only buttons are acceptable when the icon is universally understood (close X, play triangle) AND an accessible label is provided via `aria-label` or equivalent. Teams may use brand voice in labels ("Let's Go!" for onboarding) as long as the action remains clear.

---

### REQ-COPY-002: Human Error Messages

**Enforcement:** `MUST` | WCAG 2.2 SC 3.3.1, NNGroup
**Platforms:** All
**Detectable:** Heuristic — find error message strings, check for technical jargon patterns

#### Why This Matters
"Error 422: Unprocessable Entity" helps no one except the developer who wrote it. Users need to know what went wrong and how to fix it. Cryptic error messages are the number one cause of user abandonment in form flows.

#### The Rule
- Error messages MUST be written in **plain language**
- Error messages MUST explain **what went wrong** and **suggest how to fix it**
- "Your password must be at least 8 characters" > "Error: Invalid input"
- Never show raw error codes, stack traces, or technical jargon to end users
- Technical details MAY be available behind a "Details" expander for debugging, but not shown by default
- Tone should be empathetic, not robotic: "We couldn't process your payment" not "Transaction failed"

#### Creative Freedom
Teams may include error codes in small print alongside human-readable messages for support purposes (e.g., "Something went wrong. If this keeps happening, contact support with code ERR-4812."). Humor in error messages is acceptable if it does not obscure the message or trivialize the user's frustration.

---

### REQ-COPY-003: Helpful Placeholder Text

**Enforcement:** `SHOULD` | UX Best Practice (NNGroup)
**Platforms:** All
**Detectable:** Heuristic — compare placeholder text to label text

#### Why This Matters
Placeholders that just repeat the label ("Email" in both the label and placeholder) waste an opportunity to guide users. A format example like "e.g., john@example.com" clarifies expected input and reduces errors. But placeholders must never be the only label — they disappear on focus and fail accessibility requirements.

#### The Principle
- Placeholder text SHOULD show a **format example or hint**, not repeat the label
- `placeholder="e.g., john@example.com"` > `placeholder="Email"`
- `placeholder="MM/DD/YYYY"` > `placeholder="Date"`
- Placeholder MUST NOT be the **only label** for an input (see REQ-FORM-001)
- Placeholder text should be visually distinct from user-entered text (lighter color, italic)
- Keep placeholders short — they are hints, not instructions

#### Creative Freedom
For simple, unambiguous fields (a single search box with a magnifying glass icon), a placeholder like "Search..." is acceptable without a visible label, provided an accessible label exists in the markup. Teams may omit placeholders entirely if the label and surrounding context make the expected input obvious.

---

### REQ-COPY-004: Confirmation Copy That States Consequences

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — find confirmation dialog text, check if it describes the action and consequences

#### Why This Matters
"Are you sure?" is meaningless without context. Users often click through confirmations on autopilot. When the dialog says "Delete 3 files? This cannot be undone.", it forces the user to actually register what they are about to do and makes informed consent possible.

#### The Principle
- Confirmation dialogs SHOULD clearly **state what will happen** and its **consequences**
- "Delete 3 files? This cannot be undone." > "Are you sure?"
- "Cancel your subscription? You'll lose access to premium features on April 30." > "Confirm cancellation?"
- Include the **specific item or count** being affected when possible
- State whether the action is **reversible or permanent**
- The confirm button label should match the action: "Delete Files" not "OK"

#### Creative Freedom
For low-risk, easily reversible actions (archiving, moving items), a lightweight undo toast may replace a confirmation dialog entirely. Teams may style confirmation dialogs to match their brand as long as the destructive option is visually distinct from the safe option.

---

### REQ-COPY-005: Positive Empty State Copy

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — find empty state messages, check for actionable language

#### Why This Matters
A blank screen or a terse "No data" tells users nothing and feels broken. Empty states are a first impression — they are where new users land. Encouraging, action-oriented copy turns a dead end into an on-ramp: "No projects yet — create your first one" invites engagement instead of confusion.

#### The Principle
- Empty states SHOULD use **encouraging, action-oriented copy**
- "No projects yet — create your first one" > "No data" > blank screen
- Include a **call-to-action** (button or link) to help users populate the empty state
- Empty states for search results should suggest broadening the query or checking spelling
- Empty states for error conditions should explain what happened and how to recover

#### Creative Freedom
Teams may use illustrations, mascots, or brand-specific humor in empty states. The visual treatment is open — the requirement is about the copy being helpful and guiding users forward. For power-user tools, a minimal empty state ("No results") may be appropriate if the audience expects it.

---

### REQ-COPY-006: Concise Tooltip and Help Text

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check tooltip/title text length

#### Why This Matters
Tooltips are meant to be quick clarifications, not documentation. A tooltip that overflows its container, requires scrolling, or contains paragraphs of text defeats its own purpose. Users hover (or long-press on mobile) expecting a brief hint — not an essay.

#### The Principle
- Tooltips and help text SHOULD be **1-2 sentences max**
- If more explanation is needed, use an **expandable section**, info modal, or **link to documentation**
- Tooltip text should add information the label alone does not convey
- Avoid tooltips that simply repeat the label or button text
- On touch devices, ensure tooltip content is accessible without hover (info icons, expandable text)

#### Creative Freedom
For complex features (formula editors, advanced filters), inline help panels or guided tours may replace tooltips entirely. The 1-2 sentence guideline applies to hover/focus tooltips specifically — help drawers and sidebars can be longer.

---

### REQ-COPY-007: Consistent Terminology

**Enforcement:** `SHOULD` | UX Best Practice, NNGroup
**Platforms:** All
**Detectable:** Heuristic — find action labels across the app and check for synonyms used for the same operation

#### Why This Matters
If "Delete" appears on one screen, "Remove" on another, and "Trash" on a third — all for the same action — users wonder if they do different things. Inconsistent terminology creates cognitive overhead and erodes trust. A consistent vocabulary makes the interface predictable and learnable.

#### The Principle
- The same concept SHOULD use the **same word throughout the app**
- Pick one term per concept and use it everywhere: "Delete" or "Remove", not both
- Maintain a **content glossary** or terminology guide for your product
- Consistency applies across all surfaces: UI labels, error messages, documentation, onboarding
- When introducing a new concept, define it once and use that term consistently afterward

#### Creative Freedom
Different contexts may justify different terms (e.g., "Remove" a collaborator vs. "Delete" a file) when the underlying actions are genuinely different. The requirement is that the same action on the same type of object always uses the same label. Teams may evolve terminology over time with coordinated updates.

---

### REQ-COPY-008: No Blame Language

**Enforcement:** `SHOULD` | UX Best Practice, Microsoft Inclusive Design
**Platforms:** All
**Detectable:** Heuristic — scan for second-person blame patterns in error/warning messages

#### Why This Matters
"You made an error" and "You failed to save" put the user on the defensive. Even when the user did cause the problem, blame language creates a negative emotional response and damages trust. System-focused or passive language keeps the tone supportive: "Something went wrong" feels collaborative, "You broke it" feels accusatory.

#### The Principle
- UI copy SHOULD NOT **blame the user** for errors or failures
- "Something went wrong" > "You made an error"
- "We couldn't save your changes" > "You failed to save"
- "That password isn't quite right" > "You entered the wrong password"
- Use **passive or system-focused language** for errors and warnings
- Frame messages around the **situation**, not the user's action
- Avoid "you" in error contexts; prefer "we" or impersonal constructions

#### Creative Freedom
Instructional copy ("You can find settings in the menu") and celebratory copy ("You just completed your first project!") absolutely should use "you" — the restriction applies specifically to error, warning, and failure states. Teams may adopt a conversational brand voice that uses "you" positively while keeping error states blame-free.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-COPY-001 | Descriptive Button Labels | MUST | Heuristic |
| REQ-COPY-002 | Human Error Messages | MUST | Heuristic |
| REQ-COPY-003 | Helpful Placeholder Text | SHOULD | Heuristic |
| REQ-COPY-004 | Confirmation Copy That States Consequences | SHOULD | Heuristic |
| REQ-COPY-005 | Positive Empty State Copy | SHOULD | Heuristic |
| REQ-COPY-006 | Concise Tooltip and Help Text | SHOULD | Heuristic |
| REQ-COPY-007 | Consistent Terminology | SHOULD | Heuristic |
| REQ-COPY-008 | No Blame Language | SHOULD | Heuristic |

## Platform Implementation Notes

- **Web:** Use `aria-label` or `aria-labelledby` to ensure button labels are accessible even when using icons. For placeholders, ensure sufficient color contrast (WCAG 1.4.3) between placeholder text and background. Use `aria-live="polite"` for dynamic empty state messages that change after user actions.
- **iOS (SwiftUI):** Use `.buttonStyle()` with descriptive `Text()` labels. For placeholders, use the `prompt` parameter on `TextField`. Empty states can use `ContentUnavailableView` (iOS 17+) which provides a standard layout for illustration, title, description, and action button.
- **Android (Compose):** Use `Button(onClick = ...) { Text("Descriptive Label") }`. For text fields, `TextFieldDefaults` supports `placeholder` composables. Empty states should follow Material Design empty state patterns with illustration, headline, body, and action.
- **React Native:** Use descriptive `title` or child `Text` in `Pressable`/`TouchableOpacity`. For `TextInput`, use the `placeholder` prop with `placeholderTextColor` for visual distinction. Set `accessibilityLabel` on all interactive elements to ensure screen reader compatibility.

## Further Reading

- [NNGroup: Writing for the Web](https://www.nngroup.com/topic/writing-web/)
- [NNGroup: Placeholders in Form Fields Are Harmful](https://www.nngroup.com/articles/form-design-placeholders/)
- [NNGroup: Error Message Guidelines](https://www.nngroup.com/articles/error-message-guidelines/)
- [Google Material Design: Writing](https://m3.material.io/foundations/content-design/overview)
- [Microsoft Inclusive Design: Writing](https://inclusive.microsoft.design/)
- [WCAG SC 2.4.6: Headings and Labels](https://www.w3.org/TR/WCAG22/#headings-and-labels)
- [WCAG SC 3.3.1: Error Identification](https://www.w3.org/TR/WCAG22/#error-identification)
- [Mailchimp Content Style Guide](https://styleguide.mailchimp.com/)
