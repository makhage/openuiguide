# Foundations: Motion and Animation

## Overview

Motion brings interfaces to life. A button that subtly scales on press, a page that slides in from the right, a toast that fades into view — these micro-animations communicate state changes, guide attention, and make interactions feel responsive and natural. But motion done wrong — too slow, too flashy, or too constant — creates distraction and can cause physical discomfort for users with vestibular disorders.

## Key Concepts

### LEARN: Purpose-Driven Motion

Every animation should serve one of four purposes:
1. **Feedback** — confirm an action was received (button press, toggle switch)
2. **Orientation** — show spatial relationships (sliding to a new page, expanding a section)
3. **Focus** — direct attention to something important (a notification badge appearing)
4. **Delight** — add personality and polish (a subtle bounce on completion)

If an animation doesn't serve one of these purposes, remove it.

### LEARN: Easing Curves

Objects in the real world don't move at constant speed — they accelerate and decelerate. Easing curves simulate this:
- **ease-out** — starts fast, ends slow. Best for elements entering the screen.
- **ease-in** — starts slow, ends fast. Best for elements leaving the screen.
- **ease-in-out** — slow start and end. Best for state transitions.
- **linear** — constant speed. Almost never appropriate for UI (feels robotic).
- **spring** — overshoots then settles. Feels natural and playful (Apple's preferred style).

---

## Requirements

### REQ-MOTION-001: Respect Reduced Motion Preferences

**Enforcement:** `MUST` | WCAG 2.2 SC 2.3.3, Apple HIG
**Platforms:** All
**Detectable:** Yes — check for prefers-reduced-motion handling

#### Why This Matters
Some users experience dizziness, nausea, or seizures from animated content. Both operating systems and browsers provide a "reduce motion" preference. Ignoring it can make your app physically unusable for these users.

#### The Rule
- All non-essential animations MUST be reduced or removed when the user has enabled reduced motion preferences
- Essential motion (progress indicators, meaningful state changes) can be simplified rather than removed
- Replace sliding/zooming transitions with instant or fade transitions
- Disable parallax scrolling, auto-playing animations, and continuous motion
- **Include the `prefers-reduced-motion` media query even when current animations are minimal** — it serves as defensive CSS for future additions, third-party content, and browser-default animations
- Detection: flag ANY CSS file that contains `transition` or `animation` properties but has no `prefers-reduced-motion` media query

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }` |
| SwiftUI | Check `UIAccessibility.isReduceMotionEnabled` or use `withAnimation` which respects it automatically |
| Compose | Check `LocalReduceMotion.current` or use `animateAs*` APIs that respect system settings |
| Flutter | Check `MediaQuery.of(context).disableAnimations` |

#### Common Mistakes
- No reduced-motion media query at all
- Only reducing some animations but leaving others (parallax, page transitions)
- Removing all animations including essential state feedback (loading spinners)

#### How to Fix
Add a global reduced-motion media query. Test your app with reduced motion enabled. Replace motion with opacity changes or instant transitions.

---

### REQ-MOTION-002: Appropriate Duration

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Heuristic — flag animations faster than 100ms or slower than 500ms

#### Why This Matters
Animations that are too fast feel jarring — the eye can't track them. Animations that are too slow feel sluggish and waste the user's time. There's a sweet spot based on the type of motion and the distance traveled.

#### The Principle
- **Micro-interactions** (button states, toggles, icon changes): **100-200ms**
- **Small transitions** (dropdown opening, accordion expanding): **200-300ms**
- **Medium transitions** (modal appearing, page sliding): **250-350ms**
- **Large transitions** (full-screen navigation, complex reveals): **300-500ms**
- Nothing should exceed **500ms** for UI transitions (users perceive >400ms as slow)

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | `transition: all 200ms ease-out;` for micro-interactions. Scale with distance. |
| SwiftUI | `.animation(.easeOut(duration: 0.2))` for micro, `.spring(duration: 0.35)` for transitions |
| Compose | `animateFloatAsState(animationSpec = tween(200))` or `spring(dampingRatio = 0.8)` |
| Flutter | `AnimatedContainer(duration: Duration(milliseconds: 200))` |

#### Creative Freedom
These are ranges, not exact values. A playful app might use slightly longer durations with spring easing. A productivity tool might use shorter, crisper transitions. Match the tempo to your product's personality.

#### Common Mistakes
- 50ms transitions that feel like flickering
- 1000ms+ page transitions that feel like loading screens
- All animations the same duration regardless of distance/complexity
- Linear easing making everything feel robotic

---

### REQ-MOTION-003: Meaningful Easing

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Heuristic — flag linear easing on UI transitions

#### Why This Matters
Linear motion (constant speed) feels mechanical and unnatural. The physical world uses acceleration and deceleration. Proper easing makes interfaces feel alive and connected to physical reality.

#### The Principle
- **Entering elements:** ease-out (decelerates — arrives and settles)
- **Exiting elements:** ease-in (accelerates — picks up and leaves)
- **State changes:** ease-in-out (smooth both ways)
- **Never use linear** for UI transitions (acceptable only for progress bars and continuous animations)
- **Spring easing** creates the most natural-feeling motion

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | `transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);` (Material standard) or `ease-out` |
| SwiftUI | `.spring(response: 0.35, dampingFraction: 0.85)` — Apple's preferred easing |
| Compose | `spring(dampingRatio = Spring.DampingRatioMediumBouncy)` or `tween(easing = FastOutSlowInEasing)` |
| Flutter | `Curves.easeOut` for entering, `Curves.easeIn` for exiting, `Curves.easeInOut` for state changes |

#### Common Mistakes
- `transition: all 200ms linear` — feels robotic
- Same easing for both entering and exiting elements
- No easing specified (browser default is often `ease` which is acceptable but not optimal)

---

### REQ-MOTION-004: Performance-Safe Animations

**Enforcement:** `MUST` | Web Performance, 60fps Rendering
**Platforms:** Web (primary), All
**Detectable:** Yes — check which CSS properties are animated

#### Why This Matters
Animating certain CSS properties (width, height, top, left, margin, padding) triggers layout recalculation on every frame, causing jank (dropped frames, stuttering). Only `transform` and `opacity` can be animated at 60fps without triggering layout.

#### The Rule
- On web: only animate `transform` and `opacity` for smooth 60fps animation
- Use `transform: translateX()` instead of animating `left` or `margin-left`
- Use `transform: scale()` instead of animating `width`/`height`
- Use `will-change` sparingly and only on elements that will actually animate

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | `transform: translateX(100px); opacity: 0;` instead of `left: 100px; display: none;` |
| SwiftUI | Core Animation handles GPU acceleration automatically for most properties |
| Compose | Compose animation APIs handle rendering optimization internally |
| Flutter | Skia/Impeller engine handles this, but avoid animating properties that trigger relayout |

#### Common Mistakes
- Animating `width` for an expanding panel (use `transform: scaleX()` or `max-height`)
- Animating `margin-left` for a sliding element (use `transform: translateX()`)
- Adding `will-change` to dozens of elements (causes memory overhead)

---

### REQ-MOTION-005: No Autoplay Continuous Animation

**Enforcement:** `MUST` | WCAG 2.2 SC 2.2.2
**Platforms:** All
**Detectable:** Yes — check for infinite/looping animations without pause controls

#### Why This Matters
Continuous motion (carousels, blinking elements, animated backgrounds) is distracting and can trigger seizures or vestibular symptoms. WCAG requires that users can pause, stop, or hide any animation that starts automatically and lasts more than 5 seconds.

#### The Rule
- Auto-playing animations lasting more than 5 seconds MUST have a **pause/stop mechanism**
- Auto-playing carousels MUST have pause controls and stop on hover/focus
- Background animations (particles, gradient shifts) MUST be pausable
- Blinking/flashing content MUST NOT flash more than 3 times per second (seizure risk)

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Provide pause/play buttons. Use `animation-play-state: paused` on hover/focus or button click. |
| SwiftUI | Provide a toggle to pause `.animation()`. Respect `isReduceMotionEnabled`. |
| Compose | Provide pause state for `infiniteTransition`. Respect system settings. |
| Flutter | Provide pause via `AnimationController.stop()`. Respect `disableAnimations`. |

---

### REQ-MOTION-006: Transition Continuity

**Enforcement:** `CONSIDER` | Material Design 3 (Container Transform)
**Platforms:** All
**Detectable:** Manual review only

#### Why This Matters
When a user taps a card and the detail page just appears (hard cut), it feels disconnected. When the card expands into the detail page (shared element transition), the user understands the spatial relationship. Motion creates a sense of place in your interface.

#### The Principle
- Navigation transitions should communicate spatial relationships
- Forward navigation: slide in from right (LTR) or expand from source
- Back navigation: slide out to right or collapse back to source
- Modal presentation: slide up from bottom or fade in with scale
- Shared elements should animate between source and destination

#### Creative Freedom
Not every transition needs to be animated. Simple apps may use instant transitions effectively. The principle is: if you animate, be consistent and use motion to communicate direction/hierarchy.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-MOTION-001 | Respect Reduced Motion Preferences | MUST | Yes |
| REQ-MOTION-002 | Appropriate Duration | SHOULD | Heuristic |
| REQ-MOTION-003 | Meaningful Easing | SHOULD | Heuristic |
| REQ-MOTION-004 | Performance-Safe Animations | MUST | Yes |
| REQ-MOTION-005 | No Autoplay Continuous Animation | MUST | Yes |
| REQ-MOTION-006 | Transition Continuity | CONSIDER | Manual |

## Further Reading

- [Material Design 3: Motion](https://m3.material.io/styles/motion/overview)
- [Apple HIG: Motion](https://developer.apple.com/design/human-interface-guidelines/motion)
- [WCAG 2.2 SC 2.3: Seizures and Physical Reactions](https://www.w3.org/TR/WCAG22/#seizures-and-physical-reactions)
- [Web.dev: Animations and Performance](https://web.dev/articles/animations-guide)
- [An Introduction to the Reduced Motion Media Query](https://css-tricks.com/introduction-reduced-motion-media-query/)
