# Platform: iOS / macOS (SwiftUI, UIKit)

## Overview

Apple's Human Interface Guidelines (HIG) define a distinctive design language: clarity, deference, and depth. iOS users expect specific patterns — tab bars at the bottom, swipe-to-go-back, system fonts that scale with Dynamic Type. Following HIG creates apps that feel native and earn user trust.

## Requirements

### REQ-IOS-001: Use System Components

**Enforcement:** `SHOULD` | Apple HIG
**Platforms:** iOS, macOS
**Detectable:** Heuristic — check for custom implementations of system components

#### Why This Matters
Apple's system components (NavigationStack, TabView, List, Sheet) automatically handle accessibility, Dynamic Type, dark mode, and platform conventions. Custom replacements lose all of this for free behavior.

#### The Principle
- Use SwiftUI's built-in components: `NavigationStack`, `TabView`, `List`, `Form`, `Sheet`, `Alert`
- Only create custom components when system ones genuinely can't serve your needs
- When customizing, build ON system components (modifiers) rather than replacing them
- System components automatically support Dynamic Type, VoiceOver, and dark mode

---

### REQ-IOS-002: Support Dynamic Type

**Enforcement:** `MUST` | Apple HIG, Accessibility
**Platforms:** iOS, macOS
**Detectable:** Yes — check for fixed font sizes that ignore Dynamic Type

#### Why This Matters
Dynamic Type lets users set their preferred text size system-wide. Ignoring it means your app's text doesn't scale with the user's preference, creating an accessibility barrier.

#### The Rule
- Text MUST scale with the user's Dynamic Type preference
- Use system text styles (`.body`, `.title`, `.caption`) which scale automatically
- For custom font sizes, use `@ScaledMetric` to enable scaling
- Layout MUST accommodate larger text sizes without clipping or overlap
- Test with the largest Dynamic Type size (Accessibility Large)

---

### REQ-IOS-003: Tab Bar Navigation (3-5 Tabs)

**Enforcement:** `SHOULD` | Apple HIG
**Platforms:** iOS
**Detectable:** Yes — check tab bar item count

#### Why This Matters
Apple's HIG specifies tab bars as the primary navigation for flat app structures. More than 5 tabs creates a "More" overflow that degrades usability. Tab bars should represent the top-level destinations.

#### The Principle
- Use a **bottom tab bar** for 3-5 top-level destinations
- If you have more than 5 destinations, restructure your IA or use a sidebar (iPad)
- Tab bar should persist across all main screens (don't hide it on sub-screens unless focused task)
- Use SF Symbols for tab bar icons — they scale and adapt automatically

---

### REQ-IOS-004: SF Symbols and System Iconography

**Enforcement:** `SHOULD` | Apple HIG
**Platforms:** iOS, macOS
**Detectable:** Heuristic — check for third-party icon usage where SF Symbols exist

#### Why This Matters
SF Symbols are Apple's icon system — 5,000+ symbols that automatically align with text, support Dynamic Type, support all weights, and adapt to accessibility settings. Using them creates a native feel; using third-party icons creates inconsistency.

#### The Principle
- Use **SF Symbols** for standard actions (search, settings, share, delete, etc.)
- SF Symbols automatically match text weight and size
- For custom icons, ensure they align with SF Symbol metrics and weight
- Use symbol rendering modes (monochrome, hierarchical, multicolor) consistently

---

### REQ-IOS-005: Safe Area Compliance

**Enforcement:** `MUST` | Apple HIG
**Platforms:** iOS
**Detectable:** Yes — check for safe area handling

#### Why This Matters
iPhones with the Dynamic Island, notch, and rounded corners have areas where content can be obscured. Home indicator and status bar overlap content without safe area handling. Ignoring safe areas produces a broken-looking app.

#### The Rule
- Content MUST respect safe area insets on all edges
- Use `safeAreaInset` in SwiftUI or `safeAreaLayoutGuide` in UIKit
- Full-bleed content (images, maps) may extend behind safe areas but interactive elements must remain within them
- Test on devices with notch/Dynamic Island, not just simulator

---

### REQ-IOS-006: Haptic Feedback

**Enforcement:** `CONSIDER` | Apple HIG
**Platforms:** iOS
**Detectable:** Manual review only

#### Why This Matters
Haptic feedback (tactile vibrations) reinforces actions and creates a premium feel. A subtle tap when toggling a switch, a notch click when scrolling through a picker, or a success bump on task completion — these micro-interactions make the app feel alive.

#### The Principle
- Use **UIImpactFeedbackGenerator** for discrete actions (button tap, toggle)
- Use **UISelectionFeedbackGenerator** for selection changes (picker, segment control)
- Use **UINotificationFeedbackGenerator** for outcomes (success, warning, error)
- Keep haptics subtle — too much vibration is annoying
- Always pair haptics with visual feedback (never haptics alone)

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-IOS-001 | Use System Components | SHOULD | Heuristic |
| REQ-IOS-002 | Support Dynamic Type | MUST | Yes |
| REQ-IOS-003 | Tab Bar Navigation | SHOULD | Yes |
| REQ-IOS-004 | SF Symbols and System Iconography | SHOULD | Heuristic |
| REQ-IOS-005 | Safe Area Compliance | MUST | Yes |
| REQ-IOS-006 | Haptic Feedback | CONSIDER | Manual |

## Further Reading

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [SF Symbols](https://developer.apple.com/sf-symbols/)
- [SwiftUI Documentation](https://developer.apple.com/documentation/swiftui)
- [Dynamic Type Guide](https://developer.apple.com/documentation/uikit/uifont/scaling_fonts_automatically)
