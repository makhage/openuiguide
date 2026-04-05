# Components: Feedback and Status

## Overview

Users need to know what's happening. Is my action processing? Did it succeed? Did something go wrong? Feedback components — toasts, snackbars, progress indicators, status badges — close the loop between user action and system response. Without feedback, users feel like they're operating in the dark.

## Key Concepts

### LEARN: The Feedback Loop

Good interfaces maintain a continuous feedback loop:
1. **User acts** (clicks, submits, navigates)
2. **System acknowledges** (loading indicator, button state change)
3. **System responds** (success message, error message, content update)
4. **User confirms** (sees the result, moves on)

Breaks in this loop — actions with no visible response — destroy user confidence.

---

## Requirements

### REQ-FEED-001: Immediate Action Acknowledgment

**Enforcement:** `MUST` | Nielsen's Heuristic #1: Visibility of System Status
**Platforms:** All
**Detectable:** Heuristic — check for visual feedback on interactive element activation

#### Why This Matters
Users need feedback within 100ms of an action. If a button click produces no visual change for 2+ seconds, users click again (causing double submissions). Immediate acknowledgment — even just a button state change — prevents this.

#### The Rule
- Interactive elements MUST provide visual feedback within **100ms** of activation
- Button press: at minimum, show a pressed/active state
- Form submit: immediately show a loading state on the submit button
- If the result will take >1 second, show a progress indicator

---

### REQ-FEED-002: Loading State Indicators

**Enforcement:** `MUST` | Nielsen's Heuristic #1
**Platforms:** All
**Detectable:** Heuristic — check for loading patterns on async operations

#### Why This Matters
Async operations that take >1 second with no indicator make users think the app is frozen. There are three time thresholds: <100ms (instant, no indicator needed), 100ms-1s (subtle indicator), >1s (prominent loading indicator).

#### The Rule
- Operations taking >1 second MUST show a **loading indicator** (spinner, progress bar, skeleton screen)
- For unknown duration: use an **indeterminate indicator** (spinner, pulsing dots)
- For known duration: use a **determinate indicator** (progress bar with percentage)
- **Skeleton screens** (content-shaped placeholders) are preferred over spinners for page/section loading

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | CSS skeleton screens, `<progress>` element, or spinner component |
| SwiftUI | `ProgressView()` (indeterminate) or `ProgressView(value: 0.5)` (determinate) |
| Compose | `CircularProgressIndicator()` or `LinearProgressIndicator(progress = 0.5f)` |
| Flutter | `CircularProgressIndicator()` or `LinearProgressIndicator(value: 0.5)` |

---

### REQ-FEED-003: Success and Error Feedback

**Enforcement:** `MUST` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for success/error patterns after form submissions

#### Why This Matters
After an operation completes, users need confirmation: did it work? Users who submit a form and see no success message will submit again, or check manually, or assume it failed. Clear success/error feedback closes the loop.

#### The Rule
- Successful operations MUST show **confirmation feedback** (toast, inline message, page state change)
- Failed operations MUST show **error feedback** explaining what went wrong and how to recover
- Feedback MUST be accessible: announced to screen readers via `aria-live` or platform equivalent
- Don't use only color to indicate success/error (see REQ-A11Y-P-005)

---

### REQ-FEED-004: Toast/Snackbar Behavior

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Heuristic — check toast duration, position, and dismissibility

#### Why This Matters
Toasts that disappear too quickly can't be read. Toasts that persist forever clutter the screen. Toasts that stack on top of each other create chaos. Good toast behavior balances visibility with unobtrusiveness.

#### The Principle
- Toasts SHOULD display for **5-10 seconds** (enough to read, not overstaying)
- Toasts SHOULD be **dismissible** (swipe or close button)
- Only ONE toast should be visible at a time (queue subsequent toasts)
- Toasts with actions (e.g., "Undo") SHOULD persist longer or until the action expires
- Position: **bottom** of screen (Material) or **top** (some iOS patterns) — be consistent

---

### REQ-FEED-005: Status Badges and Indicators

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check status indicators for accessibility

#### Why This Matters
Status badges (notification counts, online indicators, update dots) provide at-a-glance information. But they must be accessible — a red dot means nothing to a screen reader user.

#### The Principle
- Status badges MUST have an accessible text equivalent (e.g., `aria-label="3 unread notifications"`)
- Don't rely solely on color for status (pair with icon, text, or position)
- Notification badges should show a count or a generic indicator (dot), not both
- Update badges to reflect current state in real-time

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-FEED-001 | Immediate Action Acknowledgment | MUST | Heuristic |
| REQ-FEED-002 | Loading State Indicators | MUST | Heuristic |
| REQ-FEED-003 | Success and Error Feedback | MUST | Heuristic |
| REQ-FEED-004 | Toast/Snackbar Behavior | SHOULD | Heuristic |
| REQ-FEED-005 | Status Badges and Indicators | SHOULD | Heuristic |

## Further Reading

- [Material Design 3: Snackbar](https://m3.material.io/components/snackbar/overview)
- [Apple HIG: Feedback](https://developer.apple.com/design/human-interface-guidelines/feedback)
- [NNGroup: Visibility of System Status](https://www.nngroup.com/articles/visibility-system-status/)
- [NNGroup: Progress Indicators](https://www.nngroup.com/articles/progress-indicators/)
