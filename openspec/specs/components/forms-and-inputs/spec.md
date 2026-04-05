# Components: Forms and Inputs

## Overview

Forms are where users exchange information with your application. They're also where the most friction, frustration, and abandonment occurs. Every unnecessary field, confusing label, or unclear error message costs conversions. Professional form design minimizes friction while ensuring data quality.

## Key Concepts

### LEARN: Form Design Principles

1. **Ask only what you need** — every field is friction. Remove optional fields when possible.
2. **One column** — single-column forms are completed faster and with fewer errors than multi-column.
3. **Top-aligned labels** — labels above inputs are scanned fastest (Matteo Penzo's eye-tracking research).
4. **Progressive disclosure** — show fields as they become relevant, not all at once.
5. **Inline validation** — validate on blur (not on every keystroke), show errors immediately.

---

## Requirements

### REQ-FORM-001: Visible Labels on All Inputs

**Enforcement:** `MUST` | WCAG 2.2 SC 1.3.1, 3.3.2
**Platforms:** All
**Detectable:** Yes — check for label elements associated with inputs

#### Why This Matters
Labels tell users what to enter. Placeholder text is NOT a substitute — it disappears on focus, leaving users (especially those with short-term memory issues) wondering what the field is for. This is the most common form accessibility failure.

#### The Rule
- Every input MUST have a **visible, persistent label** (not just placeholder text)
- Labels MUST be programmatically associated with inputs (`for`/`id`, wrapping, or ARIA)
- Floating labels (labels that start as placeholders and move above on focus) are acceptable if they remain visible when the input has value
- Required fields MUST indicate their required status

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | `<label for="name">Full name</label><input id="name">` — always pair them |
| SwiftUI | `TextField("Full name", text: $name)` — first parameter is the label |
| Compose | `OutlinedTextField(value = name, label = { Text("Full name") })` |
| Flutter | `TextField(decoration: InputDecoration(labelText: 'Full name'))` |

---

### REQ-FORM-002: Meaningful Error Messages

**Enforcement:** `MUST` | WCAG 2.2 SC 3.3.1, 3.3.3
**Platforms:** All
**Detectable:** Heuristic — check error message specificity

#### Why This Matters
"Invalid input" is useless. "Email must include @ and a domain (e.g., name@example.com)" is actionable. Good error messages tell users exactly what's wrong and exactly how to fix it. This reduces form abandonment.

#### The Rule
- Error messages MUST be specific: state what's wrong and how to fix it
- Errors MUST appear **near the field** they relate to (not only in a top-of-form summary)
- Errors MUST be announced to screen readers (use `aria-describedby` + `role="alert"` or platform equivalent)
- Errors MUST use text, not just color (see REQ-A11Y-P-005)

#### Common Mistakes
- "Invalid input" / "This field is required" / "Error"
- Error messages only at the top of the form
- Error indicated only by red border (invisible to color-blind users)
- Error not linked to the field programmatically

---

### REQ-FORM-003: Input Types and Keyboard Optimization

**Enforcement:** `SHOULD` | Mobile UX Best Practice
**Platforms:** All
**Detectable:** Yes — check input type attributes match expected content

#### Why This Matters
Using the correct input type triggers the right keyboard on mobile: `type="email"` shows the @ key, `type="tel"` shows a number pad, `type="url"` shows .com shortcut. This small detail dramatically improves mobile form completion speed.

#### The Principle
- Use the most specific input type for each field
- `email` for email addresses
- `tel` for phone numbers
- `url` for URLs
- `number` for numeric input (with `inputmode="numeric"` for better mobile support)
- `password` for passwords (with show/hide toggle)
- `search` for search fields
- `date`, `time`, `datetime-local` for date/time inputs

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | `<input type="email">`, `<input type="tel">`, `<input inputmode="numeric" pattern="[0-9]*">` |
| SwiftUI | `TextField("Phone", text: $phone).keyboardType(.phonePad)` |
| Compose | `OutlinedTextField(keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone))` |
| Flutter | `TextField(keyboardType: TextInputType.phone)` |

---

### REQ-FORM-004: Inline Validation Timing

**Enforcement:** `SHOULD` | UX Research
**Platforms:** All
**Detectable:** Heuristic — check validation trigger timing

#### Why This Matters
Validating on every keystroke is aggressive — users haven't finished typing and are already seeing errors. Validating only on submit forces users to scroll back and fix issues after they thought they were done. The sweet spot: **validate on blur** (when the user moves to the next field).

#### The Principle
- Validate on **blur** (when the user leaves the field) for most fields
- For complex fields (password strength), show real-time feedback as the user types
- Show success confirmation on valid fields (green checkmark) to build confidence
- After an error is shown, re-validate on each keystroke so the error clears immediately when fixed

---

### REQ-FORM-005: Single-Column Layout

**Enforcement:** `SHOULD` | Baymard Institute Research
**Platforms:** All
**Detectable:** Heuristic — check for side-by-side form fields

#### Why This Matters
Multi-column forms are completed 15% slower and with more errors than single-column forms (Baymard Institute). The eye follows a single vertical path more easily. Exceptions: closely related short fields (city/state/zip, first/last name).

#### The Principle
- Form fields SHOULD be arranged in a **single column**
- Exceptions: logically grouped short fields (first name + last name, city + state + zip)
- Full-width inputs are faster to scan than varied-width inputs
- On mobile, always use single-column regardless

#### Creative Freedom
Wide desktop forms can use sidebar help text or progressive disclosure panels alongside a single-column form. The inputs themselves should still flow vertically.

---

### REQ-FORM-006: Appropriate Field Length

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check if input width matches expected content length

#### Why This Matters
Input field width signals expected content length. A full-width field for a 5-digit ZIP code suggests a long answer. A tiny field for an address frustrates users. Matching field width to content type reduces cognitive load.

#### The Principle
- Field width SHOULD approximate the expected input length
- Short inputs (ZIP, phone, date): narrower width
- Long inputs (name, address, email): full-width or near-full-width
- Textareas for multi-line input: adequate height to show at least 3-4 lines

---

### REQ-FORM-007: Accessible Form Groups

**Enforcement:** `MUST` | WCAG 2.2 SC 1.3.1
**Platforms:** All
**Detectable:** Yes — check for fieldset/legend on grouped inputs

#### Why This Matters
Radio buttons and checkbox groups need a group label that screen readers announce. Without `<fieldset>` + `<legend>`, a screen reader user hears "Yes" and "No" radio buttons but doesn't know the question they're answering.

#### The Rule
- Related inputs (radio buttons, checkbox groups) MUST be wrapped in a group with a label
- On web: use `<fieldset>` with `<legend>`
- The group label MUST describe what the group is about

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | `<fieldset><legend>Payment method</legend><input type="radio">...</fieldset>` |
| SwiftUI | `Section("Payment method") { Picker... }` in a `Form` |
| Compose | Use `Text("Payment method")` as section header with semantics grouping |
| Flutter | Group with a label `Text` and use `Semantics(label: 'Payment method')` wrapper |

---

### REQ-FORM-008: Autocomplete Attributes

**Enforcement:** `SHOULD` | WCAG 2.2 SC 1.3.5, UX Best Practice
**Platforms:** Web (primary)
**Detectable:** Yes — check for autocomplete attributes on common fields

#### Why This Matters
The `autocomplete` attribute lets browsers and password managers fill in common fields (name, email, address, payment) automatically. This dramatically reduces form completion time and reduces errors, especially on mobile.

#### The Principle
- Add `autocomplete` attributes to all personal/payment fields
- Common values: `name`, `given-name`, `family-name`, `email`, `tel`, `street-address`, `postal-code`, `cc-number`, `new-password`, `current-password`
- This is also a WCAG requirement for cognitive accessibility

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-FORM-001 | Visible Labels on All Inputs | MUST | Yes |
| REQ-FORM-002 | Meaningful Error Messages | MUST | Heuristic |
| REQ-FORM-003 | Input Types and Keyboard Optimization | SHOULD | Yes |
| REQ-FORM-004 | Inline Validation Timing | SHOULD | Heuristic |
| REQ-FORM-005 | Single-Column Layout | SHOULD | Heuristic |
| REQ-FORM-006 | Appropriate Field Length | SHOULD | Heuristic |
| REQ-FORM-007 | Accessible Form Groups | MUST | Yes |
| REQ-FORM-008 | Autocomplete Attributes | SHOULD | Yes |

## Further Reading

- [Material Design 3: Text Fields](https://m3.material.io/components/text-fields/overview)
- [Apple HIG: Text Fields](https://developer.apple.com/design/human-interface-guidelines/text-fields)
- [Baymard Institute: Form Usability](https://baymard.com/blog/form-usability-guidelines)
- [WAI: Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/)
- [NNGroup: Website Forms Usability](https://www.nngroup.com/articles/web-form-design/)
