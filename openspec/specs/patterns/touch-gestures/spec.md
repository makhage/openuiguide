# Touch Gestures

> Platform-appropriate gesture patterns that users expect on mobile and tablet devices. Using the wrong gestures — or not supporting expected ones — creates friction.

**Category:** Patterns
**Applies to:** iOS, Android, Cross-platform (Flutter, React Native)
**Specs in this file:** 8 requirements (REQ-GESTURE-001 through REQ-GESTURE-008)

---

## Requirements

---

### REQ-GESTURE-001: Swipe-to-Dismiss for Bottom Sheets and Modals

**Enforcement:** `SHOULD` | Apple HIG, Material Design 3
**Platforms:** iOS, Android, Cross-platform
**Detectable:** Heuristic — check if bottom sheets/modals have swipe gesture handlers

#### Why This Matters
Users on mobile expect to dismiss bottom sheets by swiping down. Modals that can only be closed with a tiny X button feel trapped. Swipe-to-dismiss is a learned convention that feels natural on touch devices.

#### The Principle
- Bottom sheets SHOULD be dismissible by swiping down
- Full-screen modals SHOULD support swipe-from-edge to dismiss (iOS) or back gesture (Android)
- Provide a visible grab handle/indicator at the top of bottom sheets
- Always provide a button alternative (X or Cancel) for accessibility

#### Platform Implementation Notes
- **SwiftUI:** `.sheet` and `.presentationDetents` handle swipe-to-dismiss automatically.
- **Compose:** `ModalBottomSheet` includes swipe-to-dismiss. Use `SheetState.hide()`.
- **React Native:** Use `react-native-bottom-sheet` or `Modal` with `onRequestClose` for Android back.
- **Flutter:** `showModalBottomSheet` includes swipe-to-dismiss by default.

---

### REQ-GESTURE-002: Swipe Actions on List Items

**Enforcement:** `CONSIDER` | Apple HIG, Material Design 3
**Platforms:** iOS, Android, Cross-platform
**Detectable:** Heuristic — check if list items have swipe gesture handlers

#### Why This Matters
Swipe actions (swipe-to-delete, swipe-to-archive) are expected in list-based apps (email, messaging, task management). They provide quick access to common actions without opening a detail view or showing a context menu.

#### The Principle
- Destructive actions (delete) SHOULD appear on the trailing swipe (right-to-left in LTR)
- Common actions (archive, flag, pin) on the leading swipe
- Show action labels AND icons — icons alone are ambiguous
- Always provide an alternative way to access the same actions (long-press menu, detail view)
- Swipe distance should reveal the action, full swipe should execute it

#### Platform Implementation Notes
- **SwiftUI:** Use `.swipeActions(edge:)` modifier on list items.
- **Compose:** Use `SwipeToDismissBox` or Material 3 swipe-to-reveal pattern.
- **React Native:** Use `Swipeable` from `react-native-gesture-handler` or `FlatList` with swipeable rows.
- **Flutter:** Use `Dismissible` widget with `confirmDismiss` callback.

---

### REQ-GESTURE-003: Pull-to-Refresh

**Enforcement:** `SHOULD` | Apple HIG, Material Design 3
**Platforms:** iOS, Android, Cross-platform
**Detectable:** Heuristic — check if scrollable lists have refresh handlers

#### Why This Matters
Pull-to-refresh is the universal mobile gesture for "get the latest data." Users expect it on any list or feed that could have new content. Not supporting it forces users to navigate away and back, or hunt for a refresh button.

#### The Principle
- Scrollable content lists with server data SHOULD support pull-to-refresh
- Show a clear loading indicator during refresh (spinner, progress bar)
- The refresh should feel responsive (begin animation immediately, not after network response)
- Don't auto-refresh and pull-to-refresh at the same time (confusing)

#### Platform Implementation Notes
- **SwiftUI:** Use `.refreshable { }` modifier on `List` or `ScrollView`.
- **Compose:** Use `PullToRefreshBox` (Material 3) or `pullRefresh` modifier.
- **React Native:** Use `RefreshControl` component with `FlatList` or `ScrollView`.
- **Flutter:** Use `RefreshIndicator` widget wrapping a `ListView`.

---

### REQ-GESTURE-004: Long-Press for Context Menu

**Enforcement:** `SHOULD` | Apple HIG, Material Design 3
**Platforms:** iOS, Android, Cross-platform
**Detectable:** Heuristic — check for long-press/context menu handlers on interactive elements

#### Why This Matters
Long-press is the mobile equivalent of right-click — it reveals secondary actions without cluttering the primary UI. Users expect it on images (save/share), list items (edit/delete/move), and text (copy/select).

#### The Principle
- Provide long-press context menus on items that have multiple possible actions
- Include haptic feedback when the context menu appears (see REQ-IOS-006)
- Menu items should have icons + labels
- Don't put primary/critical actions only in the long-press menu — it's a secondary discovery mechanism

#### Platform Implementation Notes
- **SwiftUI:** Use `.contextMenu { }` modifier. Haptics are automatic.
- **Compose:** Use `DropdownMenu` triggered by `Modifier.combinedClickable(onLongClick = ...)`.
- **React Native:** Use `onLongPress` prop + custom menu, or `ActionSheetIOS`/`Alert` for platform-native menus.
- **Flutter:** Use `GestureDetector(onLongPress:)` with `showMenu()`.

---

### REQ-GESTURE-005: Pinch-to-Zoom on Media

**Enforcement:** `SHOULD` | Apple HIG, Material Design 3
**Platforms:** iOS, Android, Cross-platform
**Detectable:** Heuristic — check if images/media have zoom gesture handlers

#### Why This Matters
Users expect to pinch-to-zoom on images, maps, and detailed content. Blocking zoom on images (especially in e-commerce, photo galleries, or documents) frustrates users who need to see details.

#### The Principle
- Full-screen images and media SHOULD support pinch-to-zoom
- Maps SHOULD support pinch-to-zoom (platform map SDKs handle this)
- Double-tap should zoom to a preset level and back
- Provide visual boundaries so users don't zoom into empty space
- Don't disable browser zoom on web (see WCAG 1.4.4)

#### Platform Implementation Notes
- **SwiftUI:** Use `MagnifyGesture` or wrap images in a zoomable container.
- **Compose:** Use `Modifier.transformable()` or `Modifier.pointerInput()` for pinch handling.
- **React Native:** Use `react-native-image-zoom-viewer` or `PanResponder` for custom zoom.
- **Flutter:** Use `InteractiveViewer` widget which handles pinch-to-zoom automatically.

---

### REQ-GESTURE-006: Edge Swipe for Navigation

**Enforcement:** `MUST` | Apple HIG, Android Guidelines
**Platforms:** iOS, Android, Cross-platform
**Detectable:** Heuristic — check if navigation supports back gesture

#### Why This Matters
iOS users swipe from the left edge to go back. Android users have the system back gesture (swipe from either edge or back button). If your app intercepts or blocks these gestures, users feel trapped. This is a platform contract, not a suggestion.

#### The Principle
- MUST NOT override or block the system back gesture
- iOS: Support interactive swipe-back on navigation stacks
- Android: Support predictive back gesture (Android 14+)
- If back navigation would cause data loss, show a confirmation — don't block the gesture
- Custom gesture areas near screen edges should not conflict with system gestures

#### Platform Implementation Notes
- **SwiftUI:** `NavigationStack` handles swipe-back automatically. Don't disable `interactiveDismissDisabled` unless saving unsaved data.
- **Compose:** Use `BackHandler` for custom back behavior. Support predictive back with `PredictiveBackHandler`.
- **React Native:** React Navigation supports swipe-back on iOS by default. Android back is handled automatically.
- **Flutter:** `Navigator` supports swipe-back on iOS. Use `WillPopScope` only for confirmation dialogs.

---

### REQ-GESTURE-007: Gesture Discoverability

**Enforcement:** `SHOULD` | NNGroup Research
**Platforms:** iOS, Android, Cross-platform
**Detectable:** Heuristic — check for visual affordances near gesture-driven UI

#### Why This Matters
Gestures are invisible — there's no visual cue that swiping a list item reveals actions, or that pulling down refreshes. First-time users need subtle hints: a grab handle on bottom sheets, a slight peek of the swipe action on first view, or an onboarding tooltip.

#### The Principle
- Bottom sheets SHOULD have a visible grab handle/drag indicator
- Swipe actions SHOULD "peek" slightly on first view to hint at their existence
- Novel or custom gestures SHOULD have an onboarding hint on first use
- Always provide a non-gesture alternative (button, menu item) for the same action

#### Platform Implementation Notes
- **SwiftUI:** Bottom sheet drag indicators are shown by default. For custom hints, use `.onAppear` animations.
- **Compose:** `ModalBottomSheet` shows a drag handle by default. Use `LaunchedEffect` for peek animations.
- **React Native:** Show swipe hints with `Animated` translations on first render.
- **Flutter:** Use `DraggableScrollableSheet` which shows a drag handle.

---

### REQ-GESTURE-008: Gesture Conflict Prevention

**Enforcement:** `MUST` | Platform Convention
**Platforms:** iOS, Android, Cross-platform
**Detectable:** Heuristic — find overlapping gesture recognizers

#### Why This Matters
When two gestures compete for the same input (horizontal swipe on a carousel inside a horizontally-swipeable page, or scroll inside a scrollable modal), the result is unpredictable and frustrating. Gesture conflicts are one of the most common sources of "it feels broken" feedback.

#### The Principle
- Horizontal swipe areas (carousels, tabs) MUST NOT conflict with page-level horizontal gestures
- Nested scrollable areas MUST have clear gesture delegation (inner scroll takes priority)
- Map interactions MUST NOT conflict with page scroll
- Test all gesture interactions on actual devices, not just simulators

#### Platform Implementation Notes
- **SwiftUI:** Use `.simultaneousGesture()` or `.highPriorityGesture()` to manage conflicts.
- **Compose:** Use `Modifier.nestedScroll()` for nested scroll containers. Priority is handled by composition order.
- **React Native:** Use `react-native-gesture-handler` with proper `simultaneousHandlers` and `waitFor`.
- **Flutter:** Use `GestureRecognizer.rejectGesture()` and `GestureArena` for conflict resolution.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-GESTURE-001 | Swipe-to-Dismiss | SHOULD | Heuristic |
| REQ-GESTURE-002 | Swipe Actions on List Items | CONSIDER | Heuristic |
| REQ-GESTURE-003 | Pull-to-Refresh | SHOULD | Heuristic |
| REQ-GESTURE-004 | Long-Press Context Menu | SHOULD | Heuristic |
| REQ-GESTURE-005 | Pinch-to-Zoom on Media | SHOULD | Heuristic |
| REQ-GESTURE-006 | Edge Swipe Navigation | MUST | Heuristic |
| REQ-GESTURE-007 | Gesture Discoverability | SHOULD | Heuristic |
| REQ-GESTURE-008 | Gesture Conflict Prevention | MUST | Heuristic |

## Further Reading

- [Apple HIG: Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures)
- [Material Design 3: Gestures](https://m3.material.io/foundations/interaction/gestures)
- [NNGroup: Gesture Usability](https://www.nngroup.com/articles/gestures-tutorial/)
- [Android: Predictive Back](https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture)
