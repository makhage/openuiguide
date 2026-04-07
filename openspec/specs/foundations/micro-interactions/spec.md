# Micro-Interactions & Animation Patterns

> Detailed animation patterns that make interfaces feel alive and responsive. Covers the specific interaction animations that go beyond basic motion principles (see motion-and-animation for fundamentals).

**Category:** Foundations
**Applies to:** All platforms
**Specs in this file:** 10 requirements (REQ-MICRO-001 through REQ-MICRO-010)

---

## Requirements

---

### REQ-MICRO-001: Button Press Feedback Animation

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Yes — check for :active/:pressed styles or tap animation on buttons

#### Why This Matters
A button that doesn't visually respond to being pressed feels broken. Users need immediate confirmation that their tap or click registered. Without press feedback, users click again (causing double submissions) or assume the interface is frozen.

#### The Principle
- Buttons SHOULD provide immediate visual feedback on press/click
- Common patterns: subtle scale (0.95-0.98), background color shift, ripple effect, opacity change
- The feedback must be instant (< 50ms to start) — any delay and it feels laggy
- Keep the effect subtle — buttons shouldn't jump or flash

#### Platform Implementation Notes
- **Web:** Use `:active { transform: scale(0.97); }` with `transition: transform 100ms ease`. Material ripple via `::after` pseudo-element.
- **SwiftUI:** Use `.buttonStyle(.bordered)` or custom `ButtonStyle` with `configuration.isPressed` to scale.
- **Compose:** Material buttons include ripple by default. Custom: `Modifier.clickable(interactionSource, indication)`.
- **React Native:** Use `Pressable` with `style={({pressed}) => [{opacity: pressed ? 0.8 : 1}]}` or `TouchableOpacity`.

---

### REQ-MICRO-002: Hover State Transitions

**Enforcement:** `SHOULD` | CSS Best Practice
**Platforms:** Web, Desktop
**Detectable:** Yes — check for `transition` property on interactive elements' hover states

#### Why This Matters
Interactive elements that change appearance on hover (color, shadow, scale) SHOULD transition smoothly rather than snapping instantly. Abrupt hover changes feel jarring and cheap. A 150-250ms transition makes the interface feel fluid and responsive.

#### The Principle
- All `:hover` style changes SHOULD be animated with `transition` (150-250ms)
- Apply to: buttons, links, cards, list items, nav items, icon buttons
- Transition the specific properties that change (not `transition: all` — it's imprecise and can cause performance issues)
- Ensure the transition-out (mouse leave) is equally smooth

#### Platform Implementation Notes
- **Web:** `button { transition: background-color 200ms ease, transform 150ms ease; }`. Apply on the element, not the `:hover` state.
- **SwiftUI (macOS):** Use `.onHover` with `.animation(.easeOut(duration: 0.2))`.
- **Compose (Desktop):** Use `Modifier.hoverable()` with `animateColorAsState()`.
- **React Native:** Not applicable (no hover on mobile). Desktop: use `onMouseEnter`/`onMouseLeave`.

---

### REQ-MICRO-003: Scroll-Triggered Animation Restraint

**Enforcement:** `SHOULD` | NNGroup, Web Performance
**Platforms:** Web, Cross-platform
**Detectable:** Heuristic — find scroll event listeners, IntersectionObserver, scroll-animation CSS

#### Why This Matters
Scroll-triggered animations (fade-in, slide-up, parallax) can enhance storytelling on marketing pages but quickly become annoying on content-heavy or frequently-visited pages. Excessive scroll animations slow comprehension, cause jank on low-end devices, and annoy repeat visitors.

#### The Principle
- Scroll animations SHOULD be subtle and fast (200-400ms)
- Each element SHOULD only animate once (not re-animate when scrolling back up)
- Limit to 3-5 scroll-animated sections per page — not every element
- Use `IntersectionObserver` (web) instead of scroll event listeners (performance)
- MUST respect `prefers-reduced-motion` (see REQ-MOTION-001)

#### Platform Implementation Notes
- **Web:** Use `IntersectionObserver` with `threshold: 0.1`. CSS: `@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } }`. Apply class on intersection.
- **SwiftUI:** Use `.onAppear` with `.transition(.opacity.combined(with: .move(edge: .bottom)))`.
- **Compose:** Use `LaunchedEffect` with `animateFloatAsState` triggered by visibility.
- **React Native:** Use `onViewableItemsChanged` on `FlatList` or `Animated.event` tied to scroll position.

---

### REQ-MICRO-004: Page/Route Transition Consistency

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** Web (SPA), iOS, Android, Cross-platform
**Detectable:** Heuristic — check router transition configuration for mixed transition types

#### Why This Matters
If navigating from Home to Settings uses a fade, Settings to Profile uses a slide, and Profile to Home uses no transition, the app feels disjointed. Consistent page transitions create a sense of spatial coherence — users feel like they're moving through a connected space.

#### The Principle
- All page/route transitions SHOULD use the same type, duration, and easing
- Common patterns: fade (200-300ms), slide (250-350ms), shared-element/container transform
- Forward navigation should feel different from backward (push vs. pop direction)
- Keep transitions fast — long transitions (500ms+) feel sluggish on repeated navigation

#### Platform Implementation Notes
- **Web (React):** Use `react-transition-group` or `framer-motion` with consistent `AnimatePresence` config.
- **SwiftUI:** `NavigationStack` handles push/pop transitions automatically. Customize with `.navigationTransition()` (iOS 18+).
- **Compose:** Use `AnimatedNavHost` with consistent `EnterTransition`/`ExitTransition` specs.
- **React Native:** React Navigation's `screenOptions={{ animation: 'slide_from_right' }}` applied globally.

---

### REQ-MICRO-005: Staggered List Animation

**Enforcement:** `CONSIDER` | Material Design 3
**Platforms:** All
**Detectable:** Heuristic — find animation-delay patterns on list children

#### Why This Matters
When a list of items appears, animating them all simultaneously creates a flash of content. Staggering the entrance (each item delayed 30-50ms after the previous) draws the eye through the content and feels more natural and polished. This is a signature polish detail.

#### The Principle
- List items CONSIDER animating in with a 30-50ms stagger per item
- Cap total stagger at 300-500ms (don't stagger 100 items — only the first 8-10)
- Use opacity + slight translateY (10-20px) for the entrance effect
- Only stagger on first load, not on re-renders or scroll-into-view for already-loaded items
- MUST respect `prefers-reduced-motion`

#### Platform Implementation Notes
- **Web:** `li:nth-child(n) { animation-delay: calc(n * 40ms); }` or dynamically via JS with `IntersectionObserver`.
- **SwiftUI:** Use `.transition(.asymmetric(...))` with `DispatchQueue.main.asyncAfter` stagger or `.animation(.easeOut.delay(Double(index) * 0.04))`.
- **Compose:** Use `LazyColumn` with `animateItem()` or custom `AnimatedVisibility` with staggered delays.
- **React Native:** Use `Animated.stagger(40, animations)` from the `Animated` API.

---

### REQ-MICRO-006: Toggle and Switch Animation

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Yes — check for transition on toggle/switch/checkbox elements

#### Why This Matters
Toggles, switches, checkboxes, and radio buttons that snap between states feel mechanical and provide less confidence that the action registered. A smooth 150-250ms transition between on/off states confirms the change and feels satisfying.

#### The Principle
- State-change controls SHOULD animate between states (150-250ms)
- Animate: thumb position (switches), check mark appearance (checkboxes), fill color, border color
- The animation should feel tactile — use slight overshoot or spring easing for physical feel
- Maintain accessibility: state change must be programmatically determinable regardless of animation

#### Platform Implementation Notes
- **Web:** `input[type="checkbox"] + label::before { transition: background-color 200ms ease, transform 200ms ease; }`. Custom toggles: animate thumb with `transform: translateX()`.
- **SwiftUI:** `Toggle` animates automatically. Custom: use `.animation(.spring())` on state change.
- **Compose:** `Switch` and `Checkbox` from Material 3 include animations. Custom: use `animateDpAsState()`.
- **React Native:** `Switch` animates natively. Custom: use `Animated.spring()` for thumb movement.

---

### REQ-MICRO-007: Form Input Focus Animation

**Enforcement:** `SHOULD` | Material Design 3, CSS Best Practice
**Platforms:** All
**Detectable:** Yes — check for transition on input :focus/:focus-within styles

#### Why This Matters
When a user taps into a form field, the focus state transition (border color change, outline appearance, floating label) should be smooth, not instant. An abrupt jump to the focus state feels harsh; a smooth 150-200ms transition feels polished and responsive.

#### The Principle
- Form inputs SHOULD animate their focus state transition over 150-200ms
- Animate: border-color, outline/ring, box-shadow, label position (floating labels)
- The transition should be fast enough to feel responsive but visible enough to notice
- Consistent focus animation across all form elements (inputs, selects, textareas)

#### Platform Implementation Notes
- **Web:** `input { transition: border-color 150ms ease, box-shadow 150ms ease; } input:focus-visible { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-ring); }`.
- **SwiftUI:** Use `.animation(.easeOut(duration: 0.15))` on focus state changes with `@FocusState`.
- **Compose:** `OutlinedTextField` from Material 3 animates focus automatically. Custom: use `animateColorAsState()`.
- **React Native:** Use `onFocus`/`onBlur` with `Animated.timing` to animate border color.

---

### REQ-MICRO-008: Skeleton Shimmer Animation

**Enforcement:** `CONSIDER` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — find skeleton/placeholder elements with animation

#### Why This Matters
Static gray placeholder blocks during loading can be mistaken for broken content or empty states. A subtle shimmer/wave animation (a moving gradient highlight across the skeleton) signals "content is loading" and makes the wait feel shorter. Studies show shimmer skeletons reduce perceived loading time by 15-20%.

#### The Principle
- Loading skeleton placeholders CONSIDER using a shimmer animation (1-2s loop)
- The shimmer should be subtle — a gentle gradient sweep, not a flashy pulse
- Use skeleton shapes that match the expected content layout (text lines, avatar circles, card rectangles)
- MUST respect `prefers-reduced-motion` — show static skeletons instead

#### Platform Implementation Notes
- **Web:** CSS shimmer: `background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; @keyframes shimmer { to { background-position: -200% 0; } }`.
- **SwiftUI:** Use `.redacted(reason: .placeholder)` with a shimmer overlay using `LinearGradient` + `offset` animation.
- **Compose:** Use `Modifier.placeholder(visible = true, highlight = PlaceholderHighlight.shimmer())` from Accompanist.
- **React Native:** Use `react-native-skeleton-placeholder` or custom `Animated` gradient.

---

### REQ-MICRO-009: Exit/Dismiss Animation

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Heuristic — check for exit/leave transitions on dismissible elements

#### Why This Matters
Elements that disappear instantly (toasts, modals, deleted list items, closed panels) are disorienting. Users lose track of what just happened — "Wait, where did that go?" A brief exit animation (150-250ms fade, slide, or collapse) lets users see the element leaving, maintaining spatial awareness.

#### The Principle
- Dismissible elements SHOULD animate out over 150-250ms
- Common exit patterns: fade out, slide out (direction should match where it came from), collapse height
- Exit animations should be slightly faster than entrance animations (users want things gone quickly)
- Deleted list items: collapse the row height so the list doesn't jump

#### Platform Implementation Notes
- **Web:** Use CSS `transition` + class toggling, or `@keyframes` with `animation-fill-mode: forwards`. For list items: `max-height` + `opacity` transition.
- **SwiftUI:** Use `.transition(.opacity.combined(with: .move(edge: .trailing)))` with `withAnimation { items.remove(...) }`.
- **Compose:** Use `AnimatedVisibility(visible = false, exit = fadeOut() + slideOutHorizontally())`.
- **React Native:** Use `Animated.parallel([fadeOut, slideOut])` before removing from state. Or use `LayoutAnimation.configureNext()`.

---

### REQ-MICRO-010: Animation Choreography

**Enforcement:** `CONSIDER` | Material Design 3
**Platforms:** All
**Detectable:** Heuristic — find multiple concurrent animations on page load or modal open

#### Why This Matters
When a modal opens and the scrim, container, title, body, and buttons all appear at the exact same millisecond, it feels like a pop-up. When they're choreographed — scrim fades first, then container slides up, then content fades in — it feels like an intentional reveal. Choreography guides the user's attention through a hierarchy.

#### The Principle
- When multiple elements animate simultaneously, CONSIDER sequencing them
- Background/container elements should animate first, content elements second
- Stagger by 30-60ms between layers (total choreography < 400ms)
- The choreography should have a clear "story" — what do you want users to see first?
- Keep it simple — 2-3 choreography layers max

#### Platform Implementation Notes
- **Web:** Use `animation-delay` on child elements: `.modal-scrim { animation-delay: 0ms; } .modal-container { animation-delay: 60ms; } .modal-content { animation-delay: 120ms; }`.
- **SwiftUI:** Use `.animation(.easeOut.delay(0.06))` with increasing delays per element.
- **Compose:** Use `AnimatedVisibility` with `MutableTransitionState` and staggered `EnterTransition` delays.
- **React Native:** Use `Animated.sequence()` or `Animated.stagger()` for choreographed entrance.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-MICRO-001 | Button Press Feedback | SHOULD | Yes |
| REQ-MICRO-002 | Hover State Transitions | SHOULD | Yes |
| REQ-MICRO-003 | Scroll Animation Restraint | SHOULD | Heuristic |
| REQ-MICRO-004 | Page Transition Consistency | SHOULD | Heuristic |
| REQ-MICRO-005 | Staggered List Animation | CONSIDER | Heuristic |
| REQ-MICRO-006 | Toggle/Switch Animation | SHOULD | Yes |
| REQ-MICRO-007 | Form Input Focus Animation | SHOULD | Yes |
| REQ-MICRO-008 | Skeleton Shimmer | CONSIDER | Heuristic |
| REQ-MICRO-009 | Exit/Dismiss Animation | SHOULD | Heuristic |
| REQ-MICRO-010 | Animation Choreography | CONSIDER | Heuristic |

## Creative Freedom

Animation style is deeply personal to your brand. A playful app might use bouncy spring animations, while a finance app uses restrained linear transitions. The requirements here are about **having** animations, not dictating their personality. Your animation style is part of your design language — own it.

## Further Reading

- [Material Design 3: Motion](https://m3.material.io/styles/motion/overview)
- [Apple HIG: Motion](https://developer.apple.com/design/human-interface-guidelines/motion)
- [NNGroup: Animation for UX](https://www.nngroup.com/articles/animation-ux/)
- [web.dev: Animations Guide](https://web.dev/articles/animations-guide)
- [Val Head: Designing Interface Animation](https://valhead.com/book/)
