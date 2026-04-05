# Platform: Cross-Platform (Flutter, React Native)

## Overview

Cross-platform frameworks let you build for iOS and Android (and sometimes web) from a single codebase. The challenge: creating an experience that feels native on each platform without maintaining separate designs. This spec covers the unique design considerations for Flutter, React Native, and similar frameworks.

## Key Concepts

### LEARN: The Platforming Decision

Every cross-platform team faces a choice:
1. **Platform-adaptive:** Use Material Design on Android, Cupertino on iOS (maximum native feel, more code)
2. **Brand-consistent:** Use one design system across both platforms (consistent brand, less native feel)
3. **Hybrid:** Use your own design system but adapt key patterns per platform (navigation, gestures, typography)

Option 3 is the professional standard — your brand identity stays consistent while respecting platform conventions for navigation, gestures, and system integration.

---

## Requirements

### REQ-XPLAT-001: Respect Platform Navigation Patterns

**Enforcement:** `SHOULD` | Apple HIG, Material Design 3
**Platforms:** Flutter, React Native
**Detectable:** Heuristic — check navigation pattern per platform

#### Why This Matters
iOS users expect bottom tab bars and swipe-to-go-back. Android users expect bottom navigation and the system back gesture. Using the wrong navigation pattern makes the app feel foreign and confusing on each platform.

#### The Principle
- **iOS:** Bottom tab bar, push navigation with swipe-back, modals slide up
- **Android:** Bottom navigation bar, back gesture support, modals slide up or fade in
- Share the navigation structure but adapt the pattern implementation per platform
- Use platform-aware navigation components from your framework

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Flutter | Use `CupertinoTabBar` on iOS, `NavigationBar` on Android, or `adaptive` widgets |
| React Native | Use `@react-navigation/bottom-tabs` with platform-specific styling |

---

### REQ-XPLAT-002: Platform-Appropriate Typography

**Enforcement:** `SHOULD` | Platform Conventions
**Platforms:** Flutter, React Native
**Detectable:** Yes — check font family configuration per platform

#### Why This Matters
iOS uses San Francisco (SF Pro), Android uses Roboto. Using Roboto on iOS (or SF Pro on Android) feels wrong to users, even if they can't articulate why. System fonts are optimized for their platform's rendering engine.

#### The Principle
- Use **system fonts by default** on each platform
- If using a custom brand font, ensure it has a system font fallback for each platform
- Respect platform type scale conventions (iOS Dynamic Type sizes, Material type scale)
- Test text rendering on both platforms (hinting, smoothing, weight rendering differs)

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Flutter | Default theme uses Roboto. For iOS native feel, use `CupertinoTheme` or set `fontFamily` conditionally. |
| React Native | `Platform.select({ ios: 'System', android: 'Roboto' })` or let the default handle it |

---

### REQ-XPLAT-003: Platform-Appropriate Feedback

**Enforcement:** `SHOULD` | Platform Conventions
**Platforms:** Flutter, React Native
**Detectable:** Heuristic — check for platform-adaptive interaction feedback

#### Why This Matters
iOS uses subtle highlight feedback on buttons. Android uses ripple effects. Showing a ripple effect on iOS (or no ripple on Android) breaks platform expectations for interaction feedback.

#### The Principle
- **Android:** Material ripple effect on interactive elements
- **iOS:** Subtle opacity/highlight change on interactive elements
- Use platform-adaptive widgets or conditional styling
- Haptic feedback patterns differ per platform (see REQ-IOS-006)

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Flutter | Use `Material(type: MaterialType.transparency)` for Android ripple, `CupertinoButton` for iOS highlight |
| React Native | Use `Pressable` with platform-specific `android_ripple` and `style` on press |

---

### REQ-XPLAT-004: Consistent Design Tokens Across Platforms

**Enforcement:** `SHOULD` | Design Systems Best Practice
**Platforms:** Flutter, React Native
**Detectable:** Heuristic — check for centralized token/theme definitions

#### Why This Matters
Without centralized design tokens, spacing becomes 16px in one component and 15px in another, colors drift between screens, and the app loses visual cohesion. Cross-platform apps need a single source of truth for design values.

#### The Principle
- Define all design tokens (colors, spacing, typography, shadows, radii) in a **centralized theme**
- All components should reference tokens, never hard-coded values
- Tokens can have platform-specific overrides (spacing might be slightly different on iOS vs Android)
- Use the framework's built-in theming: Flutter `ThemeData`, React Native `StyleSheet` with theme context

---

### REQ-XPLAT-005: Test on Both Platforms

**Enforcement:** `MUST` | Cross-Platform Development
**Platforms:** Flutter, React Native
**Detectable:** Manual review only

#### Why This Matters
Font rendering, spacing, shadows, scrolling physics, and gesture behavior all differ between iOS and Android. An interface that looks perfect on one platform may have subtle (or major) issues on the other. Cross-platform != cross-tested.

#### The Rule
- Test your UI on **both iOS and Android** devices/simulators
- Pay special attention to: font rendering, safe areas, navigation gestures, keyboard behavior, scroll physics
- Test on real devices, not just simulators (simulators don't perfectly replicate rendering)
- Test on both recent and older OS versions that you support

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-XPLAT-001 | Respect Platform Navigation Patterns | SHOULD | Heuristic |
| REQ-XPLAT-002 | Platform-Appropriate Typography | SHOULD | Yes |
| REQ-XPLAT-003 | Platform-Appropriate Feedback | SHOULD | Heuristic |
| REQ-XPLAT-004 | Consistent Design Tokens | SHOULD | Heuristic |
| REQ-XPLAT-005 | Test on Both Platforms | MUST | Manual |

## Further Reading

- [Flutter: Platform-Adaptive Apps](https://docs.flutter.dev/platform-integration/platform-adaptations)
- [React Native: Platform-Specific Code](https://reactnative.dev/docs/platform-specific-code)
- [Material Design 3: Cross-Platform](https://m3.material.io/develop)
- [Flutter Cupertino Widgets](https://docs.flutter.dev/development/ui/widgets/cupertino)
