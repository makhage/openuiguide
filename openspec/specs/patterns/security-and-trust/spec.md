# Security & Trust UX

> Design patterns that build user trust and protect sensitive data. Security UX is where design meets data protection — get it wrong and users either get hacked or abandon your product out of distrust.

**Category:** Patterns
**Applies to:** All platforms
**Specs in this file:** 10 requirements (REQ-SEC-001 through REQ-SEC-010)

---

## Requirements

---

### REQ-SEC-001: Password Field Masking with Toggle

**Enforcement:** `SHOULD` | NNGroup, Apple HIG
**Platforms:** All
**Detectable:** Yes — find input[type="password"], check for adjacent toggle button

#### Why This Matters
Masked-only password fields increase typos by 20-30%, especially on mobile. A show/hide toggle lets users verify what they typed without compromising security in public. Every major design system now recommends this pattern.

#### The Principle
- Password inputs SHOULD have a show/hide toggle button
- Default state: masked (hidden)
- Toggle button must have an accessible label: `aria-label="Show password"` / `aria-label="Hide password"`
- On mobile: consider showing the last character briefly (iOS default behavior)

#### Platform Implementation Notes
- **Web:** Add a `<button type="button" aria-label="Show password">` adjacent to the input. Toggle `type` between `password` and `text`.
- **SwiftUI:** Use `SecureField` with a toggle to switch to `TextField`.
- **Compose:** Use `OutlinedTextField` with `visualTransformation = PasswordVisualTransformation()` and a toggle icon.
- **React Native:** Use `TextInput` with `secureTextEntry` prop toggled by state.

---

### REQ-SEC-002: Sensitive Data Masking in UI

**Enforcement:** `MUST` | OWASP, PCI-DSS
**Platforms:** All
**Detectable:** Heuristic — find patterns matching SSN/CC/API key formats in UI output

#### Why This Matters
Displaying full credit card numbers, SSNs, API keys, or passwords in plain text on screen creates security risks — shoulder surfing, screenshots, screen sharing. Mask sensitive data by default, showing only enough for identification (last 4 digits).

#### The Principle
- SSNs MUST show only last 4: `***-**-1234`
- Credit cards MUST show only last 4: `**** **** **** 5678`
- API keys MUST be masked with a copy button: `sk-****...****a3f2`
- Passwords MUST never be displayed in settings or admin screens
- Provide a "Reveal" button with re-authentication for full values when needed

---

### REQ-SEC-003: Secure Form Submission Indicators

**Enforcement:** `SHOULD` | Trust UX, Conversion Optimization
**Platforms:** Web (primarily)
**Detectable:** Heuristic — check for trust indicators near forms with sensitive inputs

#### Why This Matters
Users hesitate before entering payment info, personal data, or credentials. Trust indicators reduce abandonment — Baymard Institute found that 18% of cart abandonments are due to not trusting the site with credit card info.

#### The Principle
- Forms collecting sensitive data SHOULD display trust signals
- Patterns: lock icon, "Secured with SSL", security badge, "Your data is encrypted"
- Place trust indicators near the submit button (where anxiety peaks)
- Don't overdo it — 1-2 trust signals, not a wall of badges

---

### REQ-SEC-004: Session Timeout Warning

**Enforcement:** `SHOULD` | UX Best Practice, WCAG 2.2.1
**Platforms:** All
**Detectable:** Heuristic — check for session timeout warning UI

#### Why This Matters
Users filling out a long form who get silently logged out lose all their work. A warning before session expiry ("Your session expires in 2 minutes — extend?") gives users a chance to save their work or extend the session.

#### The Principle
- Warn users 2-5 minutes before session expiry
- Offer "Extend session" and "Log out" actions
- If possible, auto-save form data before timeout
- After timeout: redirect to login with a clear message, not a cryptic error
- WCAG 2.2.1: users must be able to extend time limits

---

### REQ-SEC-005: Auth Error Messages — No Information Leakage

**Enforcement:** `MUST` | OWASP
**Platforms:** All
**Detectable:** Yes — find login error message strings, check for specific field identification

#### Why This Matters
"No account found with that email" tells attackers which emails are registered. "Incorrect password" confirms the account exists. Both leak information. Use a generic message that reveals nothing about which field is wrong.

#### The Principle
- Login errors MUST use generic messages: "Invalid email or password"
- MUST NOT reveal: "Email not found", "Incorrect password", "Account locked"
- Password reset: "If an account exists, we've sent a reset link" (don't confirm existence)
- Rate-limit login attempts without revealing lockout status to the attacker

---

### REQ-SEC-006: Clear Permission Requests

**Enforcement:** `SHOULD` | Apple HIG, Android Guidelines
**Platforms:** Mobile (primarily)
**Detectable:** Heuristic — check for custom pre-permission explanation UI before permission API calls

#### Why This Matters
The system permission dialog is a one-shot chance on iOS. Showing "App wants to access your camera" with no context gets denied 50%+ of the time. A pre-prompt explaining "We need your camera to scan the QR code on your device" gets 70%+ acceptance.

#### The Principle
- Explain WHY before requesting any device permission (camera, location, mic, notifications)
- Show the pre-prompt at the moment the feature is needed, not on first launch
- Include "Not now" option that doesn't trigger the system dialog
- If denied, show how to re-enable in Settings with a deep link

---

### REQ-SEC-007: Privacy-Respecting Defaults

**Enforcement:** `SHOULD` | GDPR, Privacy by Design
**Platforms:** All
**Detectable:** Yes — find privacy-related checkboxes/toggles, check default state

#### Why This Matters
Pre-checked "Share my data with partners" checkboxes are a dark pattern and illegal under GDPR. Privacy-respecting defaults (opt-in, not opt-out) build trust and comply with regulations.

#### The Principle
- Privacy toggles SHOULD default to OFF (opt-in, not opt-out)
- Analytics, marketing emails, data sharing: off by default
- Essential functionality: on by default (with explanation of what's essential)
- Cookie consent: reject should be as easy as accept (same visual weight)

---

### REQ-SEC-008: Logout Accessibility and Visibility

**Enforcement:** `SHOULD` | Security UX
**Platforms:** All
**Detectable:** Heuristic — check if logout exists within 2 navigation levels

#### Why This Matters
Users on shared or public devices need to log out quickly. A logout link buried in Settings > Account > Danger Zone > Sign Out is a security risk. It should be accessible from the user menu or main navigation.

#### The Principle
- Logout SHOULD be accessible within 1-2 taps from any screen
- Place in: user avatar dropdown, settings page top-level, or navigation footer
- Label clearly: "Log out" or "Sign out" (not "Exit" which might mean close app)
- Confirm only for destructive logouts that lose unsaved data

---

### REQ-SEC-009: Two-Factor Authentication UX

**Enforcement:** `SHOULD` | Security UX
**Platforms:** All
**Detectable:** Heuristic — find OTP/2FA input patterns, check for paste prevention

#### Why This Matters
2FA is critical for security but is often implemented with hostile UX — tiny inputs that don't allow paste, no auto-focus, no indication of code expiry. Bad 2FA UX drives users to disable it, defeating the purpose.

#### The Principle
- Auto-focus the code input field on the 2FA screen
- MUST allow paste (do not block clipboard — users copy from authenticator apps)
- Show a timer for TOTP codes ("Code expires in 23s")
- Provide fallback methods: backup codes, SMS, email
- Auto-submit when all digits are entered (6 inputs pattern)
- Support `autocomplete="one-time-code"` for SMS autofill on mobile

---

### REQ-SEC-010: Data Deletion Confirmation and Feedback

**Enforcement:** `MUST` | GDPR Right to Erasure, UX Ethics
**Platforms:** All
**Detectable:** Heuristic — check for account deletion flow, verify confirmation steps

#### Why This Matters
Account deletion that's intentionally hidden (requiring emailing support, navigating 5 screens deep, or clicking a barely-visible link) is a dark pattern and increasingly illegal (FTC, GDPR). Conversely, deletion without confirmation risks accidental data loss.

#### The Principle
- Account deletion MUST be findable within settings (not hidden)
- MUST clearly state what will be deleted: "All your projects, files, and account data"
- MUST require explicit confirmation (type "DELETE" or re-enter password)
- SHOULD offer a grace period (7-30 days) with cancellation option
- MUST show completion feedback: "Your account has been scheduled for deletion"
- MUST NOT use shame language: "Are you sure you want to leave us?"

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-SEC-001 | Password Show/Hide Toggle | SHOULD | Yes |
| REQ-SEC-002 | Sensitive Data Masking | MUST | Heuristic |
| REQ-SEC-003 | Trust Indicators on Forms | SHOULD | Heuristic |
| REQ-SEC-004 | Session Timeout Warning | SHOULD | Heuristic |
| REQ-SEC-005 | No Auth Info Leakage | MUST | Yes |
| REQ-SEC-006 | Clear Permission Requests | SHOULD | Heuristic |
| REQ-SEC-007 | Privacy-Respecting Defaults | SHOULD | Yes |
| REQ-SEC-008 | Logout Visibility | SHOULD | Heuristic |
| REQ-SEC-009 | 2FA UX | SHOULD | Heuristic |
| REQ-SEC-010 | Data Deletion UX | MUST | Heuristic |

## Further Reading

- [OWASP: Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [NNGroup: Trust in Design](https://www.nngroup.com/articles/trust-signaling/)
- [Apple HIG: Privacy](https://developer.apple.com/design/human-interface-guidelines/privacy)
- [Material Design 3: Security](https://m3.material.io/foundations/content-design/style-guide/security)
- [Baymard Institute: Checkout Trust](https://baymard.com/blog/perceived-security-of-payment-form)
- [GDPR: Right to Erasure](https://gdpr-info.eu/art-17-gdpr/)
- [FTC: Dark Patterns](https://www.ftc.gov/reports/bringing-dark-patterns-light)
