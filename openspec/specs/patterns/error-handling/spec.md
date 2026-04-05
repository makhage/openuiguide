# Patterns: Error Handling

## Overview

Errors are inevitable — networks fail, users make mistakes, servers go down. What separates professional interfaces from amateur ones is how gracefully they handle these moments. Good error handling prevents errors where possible, communicates clearly when they occur, and helps users recover quickly.

## Requirements

### REQ-ERR-001: Human-Readable Error Messages

**Enforcement:** `MUST` | WCAG 2.2 SC 3.3.1, Nielsen's Heuristics
**Platforms:** All
**Detectable:** Heuristic — flag technical error codes shown to users

#### Why This Matters
"Error 500: Internal Server Error" means nothing to most users. "Something went wrong on our end. Please try again in a few minutes." is actionable. Error messages should be written for humans, not developers.

#### The Rule
- Error messages MUST be in **plain language** (no error codes, HTTP statuses, or stack traces)
- Error messages MUST explain **what went wrong** and **what the user can do**
- Tone should be empathetic, not accusatory ("We couldn't save your changes" not "You made an error")
- Technical details can be available behind a "Details" expander for debugging, but not shown by default

---

### REQ-ERR-002: Inline Validation Over Submit-Time Errors

**Enforcement:** `SHOULD` | UX Research (Luke Wroblewski)
**Platforms:** All
**Detectable:** Heuristic — check for validation patterns

#### Why This Matters
Discovering 5 errors after submitting a long form is frustrating. Inline validation catches issues as the user completes each field, reducing error count and time-to-completion.

#### The Principle
- Validate fields **on blur** (when user moves to next field)
- Show errors immediately below the relevant field
- After an error is shown, **re-validate on keystroke** so the error clears immediately when fixed
- Show success states (green check) for validated fields to build confidence
- Complex validations (password strength) can show real-time feedback

---

### REQ-ERR-003: Confirmation for Destructive Actions

**Enforcement:** `MUST` | WCAG 2.2 SC 3.3.4, UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for confirmation patterns on delete/destroy actions

#### Why This Matters
Accidental deletion is one of the most anxiety-inducing user experiences. A single mis-click shouldn't cause data loss. Confirmation dialogs (for irreversible actions) or undo mechanisms (for reversible actions) provide a safety net.

#### The Rule
- **Irreversible destructive actions** (delete account, remove data) MUST require explicit confirmation
- Confirmation dialogs should name the specific action and item: "Delete 'Project Alpha'?" not "Are you sure?"
- The destructive button should NOT be the default/primary action — use a danger/destructive style
- **Reversible actions** (archive, mark as read) MAY use undo (toast with "Undo" button) instead of confirmation

---

### REQ-ERR-004: Graceful Degradation

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Manual review only

#### Why This Matters
When one API call fails, the entire page shouldn't crash. Professional apps isolate failures so that a broken feature doesn't prevent access to working features.

#### The Principle
- Component-level failures should be **isolated** — one broken widget shouldn't take down the page
- Show meaningful error states per-component with retry options
- Critical path errors (authentication failure) can show full-page error screens
- Non-critical path errors (failed to load recommendations) should degrade gracefully (hide the section or show a minimal fallback)

---

### REQ-ERR-005: 404 and Error Pages

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** Web (primary)
**Detectable:** Heuristic — check for custom error pages

#### Why This Matters
The default browser 404 page is a dead end. A custom error page maintains your brand, explains what happened, and guides users back to useful content.

#### The Principle
- Custom error pages (404, 500, etc.) SHOULD include:
  - A clear message explaining the situation
  - A search bar or navigation to help users find what they need
  - A link back to the home page
  - Consistent branding and navigation from the rest of the site
- Maintain a friendly, helpful tone (not blame or confusion)

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-ERR-001 | Human-Readable Error Messages | MUST | Heuristic |
| REQ-ERR-002 | Inline Validation Over Submit-Time Errors | SHOULD | Heuristic |
| REQ-ERR-003 | Confirmation for Destructive Actions | MUST | Heuristic |
| REQ-ERR-004 | Graceful Degradation | SHOULD | Manual |
| REQ-ERR-005 | 404 and Error Pages | SHOULD | Heuristic |

## Platform Implementation Notes

- **Web:** Use `aria-live="assertive"` for error messages so screen readers announce them. Use `<output>` or inject messages into labeled regions. Browser-native validation (`required`, `pattern`) provides baseline inline validation.
- **iOS (SwiftUI):** Use `.alert()` for destructive confirmations. For inline validation, update `Text` views with error styling on field change. Use `accessibilityLabel` to ensure errors are announced.
- **Android (Compose):** Use `Snackbar` for transient errors, `AlertDialog` for destructive confirmations. `TextFieldDefaults` supports `isError` state. Error messages should use `semantics { error("...") }`.
- **React Native:** Use `Alert.alert()` for confirmations. For inline validation, conditionally render `Text` components with error styling beneath inputs. Set `accessibilityLiveRegion="assertive"` on error messages.

## Further Reading

- [NNGroup: Error Message Guidelines](https://www.nngroup.com/articles/error-message-guidelines/)
- [NNGroup: Confirmation Dialogs](https://www.nngroup.com/articles/confirmation-dialog/)
- [Material Design 3: Handling Errors](https://m3.material.io/foundations/content-design/style-guide/error-messages)
- [WCAG SC 3.3: Input Assistance](https://www.w3.org/TR/WCAG22/#input-assistance)
