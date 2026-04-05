# Platform: Android (Jetpack Compose, Material Design 3)

## Overview

Android's design language is Material Design 3. It provides a comprehensive, opinionated system for color (dynamic color from wallpaper), typography (Material type scale), shape (corner radius tokens), and component patterns. Following MD3 creates apps that feel native on Android and benefit from automatic theming features.

## Requirements

### REQ-ANDROID-001: Material Theme Integration

**Enforcement:** `SHOULD` | Material Design 3
**Platforms:** Android
**Detectable:** Yes — check for MaterialTheme usage in Compose

#### Why This Matters
Material 3's theme system provides dynamic color, dark mode, typography scale, and shape tokens out of the box. Apps that bypass the theme system lose all of this and must reimplement it manually — poorly.

#### The Principle
- Use `MaterialTheme` for all theming in Compose
- Reference `MaterialTheme.colorScheme`, `MaterialTheme.typography`, and `MaterialTheme.shapes` throughout
- Don't hard-code colors, fonts, or shapes in individual composables
- Use `dynamicLightColorScheme()` / `dynamicDarkColorScheme()` for dynamic color on Android 12+

---

### REQ-ANDROID-002: Use Material Components

**Enforcement:** `SHOULD` | Material Design 3
**Platforms:** Android
**Detectable:** Heuristic — check for custom implementations vs Material composables

#### Why This Matters
Material 3 components (Button, TextField, Card, NavigationBar) handle accessibility, theming, ripple effects, and state management automatically. Custom replacements must reimplement all of this.

#### The Principle
- Use Material 3 Compose components: `Button`, `OutlinedButton`, `TextButton`, `OutlinedTextField`, `Card`, `NavigationBar`, `TopAppBar`
- Customize through the theme and component parameters, not by building from scratch
- Only create custom components when Material ones genuinely can't serve the use case

---

### REQ-ANDROID-003: Bottom Navigation for Top Destinations

**Enforcement:** `SHOULD` | Material Design 3
**Platforms:** Android
**Detectable:** Yes — check navigation pattern and item count

#### Why This Matters
Material Design 3 specifies `NavigationBar` (bottom navigation) for 3-5 top-level destinations and `NavigationRail` (side rail) for tablets/foldables. These are the expected patterns on Android.

#### The Principle
- Use **NavigationBar** (bottom) for 3-5 top-level destinations on phones
- Use **NavigationRail** (side) for tablets, foldables, and large screens
- Use **NavigationDrawer** for 5+ destinations or deep hierarchies
- Tab labels should be short (1-2 words) and paired with icons

---

### REQ-ANDROID-004: Adaptive Layout with Window Size Classes

**Enforcement:** `SHOULD` | Material Design 3
**Platforms:** Android
**Detectable:** Heuristic — check for WindowSizeClass usage

#### Why This Matters
Android runs on phones, tablets, foldables, Chromebooks, and TVs. A single fixed layout doesn't work. Window size classes (Compact, Medium, Expanded) provide the framework for adaptive layouts.

#### The Principle
- Detect `WindowSizeClass` and provide appropriate layouts:
  - **Compact** (phone): single-pane, bottom navigation
  - **Medium** (foldable/small tablet): list-detail side by side
  - **Expanded** (tablet/desktop): multi-pane with persistent navigation
- Test on multiple form factors, especially foldables

---

### REQ-ANDROID-005: Edge-to-Edge Design

**Enforcement:** `SHOULD` | Android 15+, Material Design 3
**Platforms:** Android
**Detectable:** Yes — check for edge-to-edge configuration and inset handling

#### Why This Matters
Android 15+ enforces edge-to-edge display by default. Apps must handle system bar insets (status bar, navigation bar) properly, or content will be hidden behind them.

#### The Principle
- Enable edge-to-edge: `enableEdgeToEdge()` in Activity
- Handle insets: use `WindowInsets` in Compose to pad content appropriately
- Content should draw behind system bars (transparent bars) with proper inset handling
- Interactive elements must not be obscured by system bars

---

### REQ-ANDROID-006: Predictive Back Gesture

**Enforcement:** `SHOULD` | Android 14+
**Platforms:** Android
**Detectable:** Heuristic — check for back gesture handling

#### Why This Matters
Android's predictive back gesture (swipe from edge) previews the previous screen before the user commits. Apps that use custom back handling must integrate with the predictive back API for a seamless experience.

#### The Principle
- Support the system back gesture (don't override it with custom gestures on the edge)
- Use `OnBackPressedCallback` with proper `isEnabled` management
- For custom navigation, integrate with `NavController`'s back stack
- Test that swipe-back gesture preview works correctly

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-ANDROID-001 | Material Theme Integration | SHOULD | Yes |
| REQ-ANDROID-002 | Use Material Components | SHOULD | Heuristic |
| REQ-ANDROID-003 | Bottom Navigation for Top Destinations | SHOULD | Yes |
| REQ-ANDROID-004 | Adaptive Layout with Window Size Classes | SHOULD | Heuristic |
| REQ-ANDROID-005 | Edge-to-Edge Design | SHOULD | Yes |
| REQ-ANDROID-006 | Predictive Back Gesture | SHOULD | Heuristic |

## Further Reading

- [Material Design 3](https://m3.material.io/)
- [Jetpack Compose Documentation](https://developer.android.com/jetpack/compose)
- [Android Adaptive Layout Guide](https://developer.android.com/develop/ui/compose/layouts/adaptive)
- [Edge-to-Edge Guide](https://developer.android.com/develop/ui/views/layout/edge-to-edge)
