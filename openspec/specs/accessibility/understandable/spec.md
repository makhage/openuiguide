# Accessibility: Understandable

## Overview

The third WCAG principle: information and UI operation must be understandable. Users must be able to comprehend content, predict how the interface behaves, and recover from errors. This covers language, labeling, consistency, and error handling — the cognitive accessibility layer.

All requirements in this spec are enforcement level `MUST`.

## Key Concepts

### LEARN: Cognitive Accessibility

Cognitive impairments affect a larger population than most developers realize: ADHD, dyslexia, autism, acquired brain injury, aging-related cognitive decline, and temporary states like fatigue or stress. Clear, predictable interfaces benefit everyone but are essential for these users.

---

## Requirements

### REQ-A11Y-U-001: Page Language Declaration

**Enforcement:** `MUST` | WCAG 2.2 SC 3.1.1 (Level A)
**Platforms:** Web
**Detectable:** Yes — check for lang attribute on html element

#### Why This Matters
Screen readers use the language attribute to select the correct pronunciation engine. Without it, a French screen reader might try to pronounce English text with French phonetics, making it unintelligible.

#### The Rule
- The `<html>` element MUST have a valid `lang` attribute (e.g., `lang="en"`, `lang="fr"`)
- Content in a different language than the page default MUST have its own `lang` attribute on the containing element

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | `<html lang="en">`. Inline: `<span lang="fr">Bonjour</span>` |
| SwiftUI | Set `Locale` in app settings. Use `.environment(\.locale, Locale("fr"))` for sections. |
| Compose | Set `LocalConfiguration.current.locales` in app. Use `CompositionLocalProvider`. |
| Flutter | Set `locale` in `MaterialApp`. Use `Localizations.override` for sections. |

---

### REQ-A11Y-U-002: Form Input Labels

**Enforcement:** `MUST` | WCAG 2.2 SC 1.3.1, 3.3.2 (Level A)
**Platforms:** All
**Detectable:** Yes — check for label associations on form inputs

#### Why This Matters
Every form input needs a label that screen readers can announce. Placeholder text is NOT a label — it disappears on input, leaving the user with no context for what they typed. This is the most common form accessibility failure.

#### The Rule
- Every form input MUST have a programmatically associated label
- Use `<label for="id">` or wrap the input in a `<label>` element
- Placeholder text MUST NOT be the only label (it can supplement a label)
- Required fields MUST indicate their required status in the label or via `aria-required="true"`

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | `<label for="email">Email</label><input id="email">` or `aria-label="Email"` |
| SwiftUI | `TextField("Email", text: $email)` — the first parameter is the label |
| Compose | `OutlinedTextField(label = { Text("Email") })` |
| Flutter | `TextField(decoration: InputDecoration(labelText: 'Email'))` |

#### Common Mistakes
- `<input placeholder="Email">` with no `<label>` element
- Label visually present but not programmatically linked (missing `for`/`id`)
- Floating labels that are too small to read when active

---

### REQ-A11Y-U-003: Error Identification and Description

**Enforcement:** `MUST` | WCAG 2.2 SC 3.3.1, 3.3.3 (Level A/AA)
**Platforms:** All
**Detectable:** Heuristic — check for error message patterns near form inputs

#### Why This Matters
When a form submission fails, users need to know: which fields have errors, what's wrong, and how to fix it. "Please correct the errors" without specifics is useless. Red highlighting without text is invisible to color-blind and screen reader users.

#### The Rule
- Errors MUST be identified in **text** (not just color or icon)
- Error messages MUST describe the problem and suggest how to fix it
- Error messages MUST be programmatically associated with their input (`aria-describedby` or platform equivalent)
- Errors should appear near the input they relate to, not only in a summary at the top

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | `<input aria-describedby="email-error" aria-invalid="true">` + `<span id="email-error" role="alert">Please enter a valid email</span>` |
| SwiftUI | Use form validation with descriptive text below the field |
| Compose | `OutlinedTextField(isError = true, supportingText = { Text("Please enter a valid email") })` |
| Flutter | `TextField(decoration: InputDecoration(errorText: 'Please enter a valid email'))` |

#### Common Mistakes
- "Invalid input" — doesn't explain what's wrong or how to fix it
- Error summary at top of form with no per-field messages
- Error shown only by changing border to red
- Error messages not announced by screen readers

---

### REQ-A11Y-U-004: Consistent Navigation

**Enforcement:** `MUST` | WCAG 2.2 SC 3.2.3 (Level AA)
**Platforms:** All
**Detectable:** Heuristic — check navigation consistency across pages

#### Why This Matters
Users build a mental model of where things are. If the navigation moves to a different position, changes order, or uses different labels on different pages, users must re-learn the interface on every page. This is especially disorienting for cognitive disability users.

#### The Rule
- Navigation elements that appear on multiple pages MUST be in the **same relative order** on every page
- Navigation labels MUST be consistent (don't call it "Settings" on one page and "Preferences" on another)
- The overall navigation structure MUST NOT change unexpectedly between pages

---

### REQ-A11Y-U-005: Consistent Identification

**Enforcement:** `MUST` | WCAG 2.2 SC 3.2.4 (Level AA)
**Platforms:** All
**Detectable:** Heuristic — check for inconsistent naming of same-purpose elements

#### Why This Matters
If a search function is labeled "Search" on one page, has a magnifying glass with no label on another, and is called "Find" on a third, users (especially those using voice control) can't reliably interact with it.

#### The Rule
- Components with the same function MUST have **consistent labels** across the application
- Icons used for the same purpose MUST be consistent (don't use a gear icon for settings on one page and a wrench on another)
- Actions MUST use consistent verbs (don't mix "Delete," "Remove," and "Trash" for the same action)

---

### REQ-A11Y-U-006: Predictable Behavior on Input

**Enforcement:** `MUST` | WCAG 2.2 SC 3.2.2 (Level A)
**Platforms:** All
**Detectable:** Heuristic — check for onChange handlers that trigger navigation or context changes

#### Why This Matters
Changing a dropdown selection shouldn't navigate to a new page. Focusing an input shouldn't open a popup. Users expect to control when actions happen — form submission should require explicit confirmation (button press), not happen automatically on input change.

#### The Rule
- Changing a form control's value MUST NOT automatically cause a change of context (page navigation, form submission, focus shift)
- Context changes MUST be initiated by an explicit user action (button click, form submit)
- If auto-submission is necessary, warn the user beforehand

#### Common Mistakes
- Dropdown that navigates to a new page on selection (no "Go" button)
- Search input that submits on every keystroke without debounce indicator
- Checkbox that immediately triggers an irreversible action

---

### REQ-A11Y-U-007: Error Prevention for Important Actions

**Enforcement:** `MUST` | WCAG 2.2 SC 3.3.4 (Level AA)
**Platforms:** All
**Detectable:** Heuristic — check for confirmation patterns on destructive/legal/financial actions

#### Why This Matters
Legal commitments, financial transactions, and data deletion/modification deserve extra protection against user error. A single mis-click shouldn't cause irreversible consequences.

#### The Rule
For actions that are legal, financial, or modify/delete user data:
- Submissions MUST be **reversible** (undo), OR
- Data MUST be **checked and confirmed** before final submission, OR
- A **confirmation step** MUST be provided before the action executes

#### Common Mistakes
- Delete button that immediately deletes with no confirmation
- Financial form that submits on Enter with no review step
- Account deletion with a single click

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-A11Y-U-001 | Page Language Declaration | MUST | Yes |
| REQ-A11Y-U-002 | Form Input Labels | MUST | Yes |
| REQ-A11Y-U-003 | Error Identification and Description | MUST | Heuristic |
| REQ-A11Y-U-004 | Consistent Navigation | MUST | Heuristic |
| REQ-A11Y-U-005 | Consistent Identification | MUST | Heuristic |
| REQ-A11Y-U-006 | Predictable Behavior on Input | MUST | Heuristic |
| REQ-A11Y-U-007 | Error Prevention for Important Actions | MUST | Heuristic |

## Further Reading

- [WCAG 2.2 — Understandable Guidelines](https://www.w3.org/TR/WCAG22/#understandable)
- [WebAIM: Cognitive Disabilities](https://webaim.org/articles/cognitive/)
- [WAI: Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/)
- [NNGroup: Error Message Design](https://www.nngroup.com/articles/error-message-guidelines/)
