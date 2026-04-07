# Notifications & Communication

> Design patterns for push notifications, in-app messages, banners, and communication channels. Poor notification UX is the #1 reason users disable notifications or uninstall apps.

**Category:** Patterns
**Applies to:** All platforms
**Specs in this file:** 8 requirements (REQ-NOTIFY-001 through REQ-NOTIFY-008)

---

## Requirements

---

### REQ-NOTIFY-001: Permission Pre-Prompt

**Enforcement:** `SHOULD` | Apple HIG, NNGroup
**Platforms:** All (especially mobile)
**Detectable:** Heuristic — check for pre-permission UI before notification permission request

#### Why This Matters
The system notification permission dialog is a one-shot chance on iOS — if the user denies, you can't ask again. Showing it cold on first launch gets a 50%+ denial rate. A pre-prompt explaining the value ("Get notified when your order ships") lets users make an informed choice.

#### The Principle
- SHOULD show a custom pre-prompt explaining WHY before triggering the system permission dialog
- Show the pre-prompt at a relevant moment (after first purchase, not on first launch)
- Include a "Not now" option that doesn't trigger the system dialog
- Never ask for notification permission on the first screen

#### Platform Implementation Notes
- **Web:** Show a custom banner/modal before calling `Notification.requestPermission()`. Never use the browser prompt on page load.
- **SwiftUI:** Show a custom view before `UNUserNotificationCenter.requestAuthorization()`.
- **Compose:** Show a dialog before `NotificationManagerCompat.requestPermission()`.
- **React Native:** Show a custom modal before `Notifications.requestPermissionsAsync()`.

---

### REQ-NOTIFY-002: Notification Preference Controls

**Enforcement:** `SHOULD` | UX Best Practice, GDPR
**Platforms:** All
**Detectable:** Heuristic — check for notification settings/preferences UI

#### Why This Matters
"All or nothing" notification settings lead to users disabling everything. Granular controls ("Order updates: ON, Marketing: OFF, Tips: OFF") let users keep the notifications they value and silence the ones they don't.

#### The Principle
- SHOULD provide granular notification preferences (not just on/off)
- Group by category: Transactional, Social, Marketing, System
- Let users choose channels: push, email, in-app, SMS
- Respect preferences immediately — don't send one more "just in case"

---

### REQ-NOTIFY-003: Actionable Notifications

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** Mobile (primarily)
**Detectable:** Heuristic — check notification payload for action buttons

#### Why This Matters
A notification that says "You have a new message" and opens the app's home page wastes the user's time. A notification that says "John: Are you free for lunch?" with "Reply" and "Decline" actions lets users respond without even opening the app.

#### The Principle
- Notifications SHOULD include direct action buttons where applicable
- Common patterns: Reply, Accept/Decline, Snooze, Mark as Read
- Tapping the notification body should deep-link to the relevant screen — not the home page
- Keep actions to 2-3 maximum per notification

#### Platform Implementation Notes
- **Web:** Use `actions` array in `ServiceWorkerRegistration.showNotification()`.
- **SwiftUI:** Use `UNNotificationAction` and `UNNotificationCategory`.
- **Compose:** Use `NotificationCompat.Builder.addAction()`.
- **React Native:** Use notification action categories in your push notification library.

---

### REQ-NOTIFY-004: In-App Notification Center

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for notification bell/inbox UI element

#### Why This Matters
Push notifications are ephemeral — once dismissed, they're gone. An in-app notification center (bell icon with count badge) gives users a persistent place to review missed notifications, especially important for desktop/web where push notifications may be blocked.

#### The Principle
- Apps with notifications SHOULD have an in-app notification center
- Show unread count badge on the bell/inbox icon
- Mark notifications as read when viewed
- Group by time: Today, Yesterday, This Week, Earlier
- Provide "Mark all as read" action

---

### REQ-NOTIFY-005: Non-Intrusive In-App Messages

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for toast/banner/snackbar patterns vs. modal interruptions

#### Why This Matters
Not every in-app message needs a modal that blocks the entire screen. Use the right pattern for the urgency level: toasts for confirmations, banners for warnings, modals only for critical actions. Over-using modals causes "dialog fatigue" — users start dismissing without reading.

#### The Principle
- Match message urgency to intrusiveness level:
  - **Low:** Toast/snackbar (auto-dismiss, bottom of screen)
  - **Medium:** Banner (persistent, top of screen, dismissible)
  - **High:** Dialog/modal (requires action, blocks interaction)
  - **Critical:** Full-screen blocking (system errors, security alerts only)
- SHOULD NOT use modals for low-priority messages
- Never interrupt a user mid-task with a marketing message

---

### REQ-NOTIFY-006: Notification Frequency Capping

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for notification throttling/batching logic

#### Why This Matters
Sending 15 notifications in 10 minutes guarantees the user will disable all notifications. Batch related notifications ("3 new messages from the team") rather than sending individually. Respect the user's attention as a limited resource.

#### The Principle
- SHOULD batch related notifications rather than sending individually
- Cap push notifications to a reasonable frequency (varies by app type)
- Group by source: "3 messages from #general" not 3 separate notifications
- Provide a "Digest" option: daily/weekly summary instead of real-time

---

### REQ-NOTIFY-007: Notification Sound and Vibration Respect

**Enforcement:** `MUST` | Platform Convention
**Platforms:** Mobile
**Detectable:** Heuristic — check notification configuration for sound/vibration settings

#### Why This Matters
Notifications that ignore the user's Do Not Disturb settings, silent mode, or focus mode are hostile. The OS provides these controls for a reason — medical professionals, sleeping users, and people in meetings need silence respected.

#### The Principle
- Notifications MUST respect system Do Not Disturb / Focus mode settings
- MUST respect system silent/vibrate mode
- SHOULD let users customize sound per notification category
- Don't use custom notification sounds that are louder or more alarming than system defaults

---

### REQ-NOTIFY-008: Unsubscribe and Opt-Out Ease

**Enforcement:** `MUST` | GDPR, CAN-SPAM, UX Ethics
**Platforms:** All
**Detectable:** Heuristic — check for unsubscribe links in notification/email templates

#### Why This Matters
Making it hard to unsubscribe from notifications or emails is a dark pattern and often illegal. The unsubscribe action should be 1-2 taps/clicks — not a multi-step form asking why you're leaving with a 48-hour processing time.

#### The Principle
- Email notifications MUST include a one-click unsubscribe link (CAN-SPAM, GDPR)
- Push notification categories MUST be individually disable-able
- The unsubscribe process MUST be instant — no "48 hours to process"
- Don't guilt-trip users for unsubscribing: "Are you SURE you want to miss out?"

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-NOTIFY-001 | Permission Pre-Prompt | SHOULD | Heuristic |
| REQ-NOTIFY-002 | Preference Controls | SHOULD | Heuristic |
| REQ-NOTIFY-003 | Actionable Notifications | SHOULD | Heuristic |
| REQ-NOTIFY-004 | In-App Notification Center | SHOULD | Heuristic |
| REQ-NOTIFY-005 | Non-Intrusive Messages | SHOULD | Heuristic |
| REQ-NOTIFY-006 | Frequency Capping | SHOULD | Heuristic |
| REQ-NOTIFY-007 | Sound/Vibration Respect | MUST | Heuristic |
| REQ-NOTIFY-008 | Unsubscribe Ease | MUST | Heuristic |

## Further Reading

- [Apple HIG: Notifications](https://developer.apple.com/design/human-interface-guidelines/notifications)
- [Material Design 3: Notifications](https://m3.material.io/foundations/interaction/notifications)
- [NNGroup: Push Notification UX](https://www.nngroup.com/articles/push-notification/)
- [OneSignal: Notification Best Practices](https://onesignal.com/blog/push-notification-best-practices/)
- [CAN-SPAM Act Requirements](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)
