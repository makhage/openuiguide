# Platform: Wearable (watchOS, Wear OS)

## Overview

Wearable platforms are the most constrained UI environment: screens as small as 1.5 inches, interactions measured in seconds, and a user who is often in motion or mid-activity. Wearable UI must be glanceable, actionable in one or two taps, and deeply respectful of battery life and user attention. This spec covers wearable-specific best practices that complement the cross-platform specs.

## Requirements

### REQ-PLAT-WEAR-001: Glanceable Content

**Enforcement:** `MUST` | watchOS HIG, Wear OS Guidelines
**Platforms:** watchOS, Wear OS
**Detectable:** Heuristic — check for content density, text length, and interaction depth

#### Why This Matters
A wearable interaction lasts 3-5 seconds on average. Users raise their wrist, glance at the screen, and lower it. If the information they need is not immediately visible — buried in scrolling, navigation, or loading — they will reach for their phone instead, defeating the purpose of the wearable app entirely.

#### The Rule
- The primary information MUST be visible immediately on screen launch, with no scrolling or tapping required
- Limit each screen to a single focused task or piece of information
- Use no more than 3-5 lines of text per screen; truncate with "..." rather than requiring scrolling for non-essential content
- Prefer data visualization (progress rings, icons, charts) over text for status information
- Design for a maximum interaction time of 5-10 seconds per session

---

### REQ-PLAT-WEAR-002: Minimal Interaction Design

**Enforcement:** `MUST` | watchOS HIG, Wear OS Guidelines
**Platforms:** watchOS, Wear OS
**Detectable:** Heuristic — check navigation depth and interaction step count

#### Why This Matters
Every tap on a wearable is harder than on a phone — the screen is small, the user may be using one hand, and they may be walking, exercising, or in a social situation. Deep navigation hierarchies and multi-step flows that work on phones are unacceptable on a watch.

#### The Rule
- Navigation depth MUST NOT exceed 2-3 levels from the app root
- Complete primary tasks in 1-3 taps maximum
- Provide clear, large tap targets — minimum 38pt/38dp for interactive elements
- Avoid text input entirely; use pre-composed replies, voice dictation, or companion phone input
- Support quick actions from notifications without launching the full app

#### Platform Notes
- **watchOS:** Use `WKInterfaceController` with a flat or page-based navigation structure; avoid deep hierarchical stacks
- **Wear OS:** Use `HorizontalPagerScreen` for swipeable views and `ScalingLazyColumn` for scrollable lists

---

### REQ-PLAT-WEAR-003: Crown and Bezel Navigation

**Enforcement:** `SHOULD` | watchOS HIG, Wear OS Guidelines
**Platforms:** watchOS, Wear OS
**Detectable:** Yes — check for Digital Crown / rotary input event handling

#### Why This Matters
The Digital Crown (watchOS) and rotating bezel or side button (Wear OS) are the primary physical input methods on a watch. They allow precise scrolling and selection without the user's finger obscuring the tiny screen. Apps that ignore these inputs force users into imprecise touch scrolling on a small display.

#### The Principle
- Support Digital Crown (watchOS) for scrolling lists, adjusting values, and zooming
- Support rotary input (Wear OS) for scrolling and value selection
- Use the crown/bezel for precise adjustments (e.g., setting a time, adjusting a value slider)
- Provide haptic feedback at detent points when scrolling through discrete values
- Side button should map to a secondary action or app-specific shortcut

#### Platform Notes
- **watchOS:** Use `digitalCrownRotation()` in SwiftUI or `WKCrownDelegate` for crown events; use `focusable()` to manage crown focus
- **Wear OS:** Implement `RotaryScrollableState` or `onRotaryScrollEvent` in Compose for Wear OS

---

### REQ-PLAT-WEAR-004: Complications and Widgets

**Enforcement:** `SHOULD` | watchOS HIG, Wear OS Guidelines
**Platforms:** watchOS, Wear OS
**Detectable:** Yes — check for complication/tile provider implementation

#### Why This Matters
Complications (watchOS) and Tiles (Wear OS) are the most-viewed surfaces on a wearable — they live on the watch face or are one swipe away. An app without a complication forces the user to find and launch it from the app grid, adding seconds to every interaction. A well-designed complication can eliminate the need to open the app at all.

#### The Principle
- Provide at least one complication (watchOS) or Tile (Wear OS) for the most frequently needed data
- Support multiple complication families/sizes: small, medium, and large where appropriate
- Update complication data on a reasonable schedule (use background refresh, not real-time polling)
- Keep complication content minimal: one primary value, one optional label or icon
- Design complications to be legible on any watch face background (test on light and dark faces)

#### Platform Notes
- **watchOS:** Implement `CLKComplicationDataSource` or use `WidgetKit` (watchOS 9+) for timeline-based complications
- **Wear OS:** Implement `TileService` for Tiles and `ComplicationDataSourceService` for watch face complications

---

### REQ-PLAT-WEAR-005: Small Screen Typography

**Enforcement:** `MUST` | watchOS HIG, Wear OS Guidelines
**Platforms:** watchOS, Wear OS
**Detectable:** Yes — check font sizes, weights, and line counts

#### Why This Matters
A watch screen is typically 1.5-2 inches. Typography that works on a phone at arm's length is far too small on a watch at wrist distance. Readability is non-negotiable — if users have to squint or bring the watch closer to their face, the UI has failed.

#### The Rule
- Body text MUST be at least 16pt (watchOS) or 14sp (Wear OS)
- Titles MUST be at least 20pt (watchOS) or 18sp (Wear OS)
- Use the system font (SF Compact for watchOS, Roboto for Wear OS) for optimal rendering at small sizes
- Use medium or semi-bold weights for body text — regular weight becomes too thin at small sizes
- Limit text to essential content; prefer abbreviations and symbols over full words where meaning is clear (e.g., "5 min" not "5 minutes remaining")
- Ensure sufficient contrast: minimum 4.5:1, with 7:1 strongly recommended

---

### REQ-PLAT-WEAR-006: Haptic Feedback

**Enforcement:** `SHOULD` | watchOS HIG, Wear OS Guidelines
**Platforms:** watchOS, Wear OS
**Detectable:** Heuristic — check for haptic/vibration API usage

#### Why This Matters
On a tiny screen with limited audio output, haptic feedback is a critical communication channel. It confirms actions, signals errors, provides navigation cues, and creates a tactile sense of direct manipulation. Wearable apps without haptics feel flat and unresponsive.

#### The Principle
- Use haptic feedback to confirm user actions (taps, selections, completions)
- Use distinct haptic patterns for different events: success, failure, notification, warning
- Use haptics to mark boundaries when scrolling through discrete values with the crown or bezel
- Keep haptics subtle — overuse creates annoyance and drains battery
- Use platform-provided haptic types rather than custom vibration patterns for consistency

#### Platform Notes
- **watchOS:** Use `WKInterfaceDevice.play()` with semantic types: `.success`, `.failure`, `.notification`, `.click`, `.directionUp`, `.directionDown`
- **Wear OS:** Use `VibrationEffect.createPredefined()` with `EFFECT_CLICK`, `EFFECT_TICK`, `EFFECT_HEAVY_CLICK`

---

### REQ-PLAT-WEAR-007: Health Data Privacy

**Enforcement:** `MUST` | Platform Policy, Legal (HIPAA, GDPR)
**Platforms:** watchOS, Wear OS
**Detectable:** Heuristic — check for health data API usage and permission handling

#### Why This Matters
Wearables collect some of the most sensitive personal data in existence: heart rate, blood oxygen, sleep patterns, menstrual cycles, medication schedules, and location during exercise. Mishandling this data is not just a design failure — it is a legal liability and a betrayal of user trust.

#### The Rule
- Request health data permissions only when the user initiates a feature that requires them — never at first launch
- Clearly explain what health data is collected, why, and how it is used before requesting permission
- Store health data on-device whenever possible; if synced to a server, encrypt in transit and at rest
- Never share health data with third parties without explicit, informed, granular user consent
- Provide a clear mechanism to delete all stored health data
- Display health data only on the user's own device — do not surface it in notifications visible on shared screens

#### Platform Notes
- **watchOS:** Use `HealthKit` with appropriate `HKObjectType` permissions; Apple reviews health data usage during App Store review
- **Wear OS:** Use `Health Services` API with granular permission requests; comply with Google Play health data policies

---

### REQ-PLAT-WEAR-008: Battery-Conscious Animations

**Enforcement:** `MUST` | watchOS HIG, Wear OS Guidelines
**Platforms:** watchOS, Wear OS
**Detectable:** Heuristic — check for animation frequency, duration, and always-on display handling

#### Why This Matters
A wearable battery lasts 18-48 hours under normal use. Animations, continuous updates, and bright pixels drain battery disproportionately on these small devices. An app that noticeably impacts battery life will be deleted, regardless of how useful it is.

#### The Rule
- Keep animations short: 200-300ms maximum duration
- Avoid continuous or looping animations — use them only for active, user-initiated interactions
- Reduce frame rate and visual complexity when the app is in the always-on (ambient) display mode
- In always-on mode, use minimal content with mostly black backgrounds (OLED screens consume no power for black pixels)
- Update the display at most once per minute in always-on mode
- Stop all animations and unnecessary processing when the wrist is lowered or the screen turns off

#### Platform Notes
- **watchOS:** Implement `isLuminanceReduced` checks for always-on display; use `TimelineView` for efficient periodic updates
- **Wear OS:** Implement `AmbientModeSupport` and switch to a simplified, low-power layout in ambient mode

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-PLAT-WEAR-001 | Glanceable Content | MUST | Heuristic |
| REQ-PLAT-WEAR-002 | Minimal Interaction Design | MUST | Heuristic |
| REQ-PLAT-WEAR-003 | Crown and Bezel Navigation | SHOULD | Yes |
| REQ-PLAT-WEAR-004 | Complications and Widgets | SHOULD | Yes |
| REQ-PLAT-WEAR-005 | Small Screen Typography | MUST | Yes |
| REQ-PLAT-WEAR-006 | Haptic Feedback | SHOULD | Heuristic |
| REQ-PLAT-WEAR-007 | Health Data Privacy | MUST | Heuristic |
| REQ-PLAT-WEAR-008 | Battery-Conscious Animations | MUST | Heuristic |

## Creative Freedom

Wearable platforms reward restraint, but there is still room for creativity:

- **Watch face integration** — custom watch faces and rich complications can define the entire brand experience on the wrist
- **Animation personality** — within the 200-300ms window, animations can express brand character (a playful bounce vs. a precise slide)
- **Color as identity** — on a small screen, a single accent color becomes the entire brand; choose it carefully and use it consistently
- **Sound and haptics** — custom notification sounds and haptic patterns (where allowed) create a distinct sensory identity
- **Contextual intelligence** — wearables know time, location, activity, and health state; use this context to show the right information at the right moment without the user asking

## Further Reading

- [Apple: watchOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/designing-for-watchos)
- [Google: Wear OS Design Principles](https://developer.android.com/design/ui/wear)
- [Apple: HealthKit](https://developer.apple.com/documentation/healthkit)
- [Google: Health Services on Wear OS](https://developer.android.com/health-and-fitness/guides)
