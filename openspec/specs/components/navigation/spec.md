# Components: Navigation

## Overview

Navigation is how users move through your application. It should be instantly understandable, consistently placed, and reflect the app's information architecture. Good navigation is invisible — users find what they need without thinking. Bad navigation is the number one reason users abandon apps.

## Key Concepts

### LEARN: Navigation Patterns by Platform

- **Web:** Top navigation bar (horizontal), sidebar (vertical), breadcrumbs
- **iOS:** Tab bar (bottom), navigation bar (top with back button), sidebar (iPad)
- **Android:** Bottom navigation, navigation drawer (hamburger), top app bar
- **Cross-platform:** Bottom tab bar is the most consistent pattern across platforms

### LEARN: Information Architecture

Navigation reflects your IA — how content is organized:
- **Flat:** All destinations equally accessible (tab bar with 3-5 items)
- **Hierarchical:** Drill-down from general to specific (settings > account > email)
- **Hub-and-spoke:** Central hub with destinations branching off (home screen)

---

## Requirements

### REQ-NAV-001: Clear Current Location

**Enforcement:** `MUST` | WCAG 2.2 SC 2.4.8, UX Best Practice
**Platforms:** All
**Detectable:** Yes — check for active/selected state on navigation items

#### Why This Matters
Users must always know where they are in your app. An active navigation indicator (highlighted tab, bold menu item, breadcrumb trail) prevents disorientation. Without it, users feel lost and backtrack unnecessarily.

#### The Rule
- The currently active navigation item MUST be visually distinct from inactive items
- Active state should use at least 2 visual cues (color change + bold/weight, or color + icon fill change)
- On web, use `aria-current="page"` for the current page link
- Breadcrumbs should show the current page as the last non-linked item

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Active nav link: bold + color change + `aria-current="page"` |
| SwiftUI | `TabView` handles this. Custom: use `@State` selection with visual distinction |
| Compose | `NavigationBarItem(selected = true)` handles visual state |
| Flutter | `BottomNavigationBar(currentIndex: selectedIndex)` handles visual state |

---

### REQ-NAV-002: Navigation Item Limit

**Enforcement:** `SHOULD` | Miller's Law, Platform Guidelines
**Platforms:** All
**Detectable:** Yes — count primary navigation items

#### Why This Matters
Too many navigation items overwhelm users and reduce findability. Research shows 5-7 items is the practical limit for immediate comprehension. Beyond that, users stop scanning and start hunting.

#### The Principle
- **Bottom/tab navigation:** Maximum 5 items (Apple HIG, Material recommend 3-5)
- **Top navigation bar:** Maximum 7 primary items before needing a "More" overflow
- **Sidebar navigation:** Can hold more items if grouped into sections with clear headers
- If you have more than 7 top-level destinations, reconsider your information architecture

---

### REQ-NAV-003: Navigation Landmark

**Enforcement:** `MUST` | WCAG 2.2 SC 1.3.1
**Platforms:** Web
**Detectable:** Yes — check for nav element or navigation role

#### Why This Matters
Screen readers let users jump directly to navigation landmarks. Without the `<nav>` element (or `role="navigation"`), assistive tech users must tab through the entire page to find navigation.

#### The Rule
- Navigation areas MUST use the `<nav>` element (web) or equivalent landmark
- If multiple `<nav>` elements exist, each MUST have a unique `aria-label` (e.g., "Primary navigation", "Footer navigation")
- Main page content MUST be wrapped in `<main>`

---

### REQ-NAV-004: Consistent Placement

**Enforcement:** `MUST` | WCAG 2.2 SC 3.2.3
**Platforms:** All
**Detectable:** Heuristic — check navigation position consistency across pages/screens

#### Why This Matters
Navigation that moves between pages forces users to re-learn the interface on every screen. Consistent placement builds muscle memory and confidence.

#### The Rule
- Primary navigation MUST appear in the **same position** on every page/screen
- Navigation order MUST be consistent across all pages
- Navigation labels MUST use consistent wording (don't rename items between pages)

---

### REQ-NAV-005: Mobile Navigation Pattern

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** Mobile, Cross-platform
**Detectable:** Heuristic — check for appropriate mobile nav pattern

#### Why This Matters
Desktop navigation patterns (horizontal top bars with dropdowns) don't translate well to mobile. Platform-native patterns (bottom tab bar, hamburger drawer) are what users expect and can operate one-handed.

#### The Principle
- **3-5 top destinations:** Use a **bottom tab bar** (universally understood, thumb-reachable)
- **5+ destinations or deep hierarchy:** Use a **navigation drawer** (hamburger menu)
- Avoid top-only navigation on mobile (hard to reach with one hand)
- Critical actions should be reachable within the thumb zone

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (mobile) | Bottom fixed nav bar or hamburger menu. Avoid hover-dependent navigation. |
| SwiftUI | `TabView` for bottom tabs, `NavigationSplitView` for sidebar (iPad) |
| Compose | `NavigationBar` (bottom) or `ModalNavigationDrawer` |
| Flutter | `BottomNavigationBar` or `Drawer` |

#### Creative Freedom
The specific navigation pattern depends on your content structure. Not every app needs a bottom tab bar — a simple app might use a single-screen with sections. Match the pattern to your complexity.

---

### REQ-NAV-006: Back Navigation

**Enforcement:** `MUST` | Platform Conventions, WCAG
**Platforms:** All
**Detectable:** Heuristic — check for back navigation in hierarchical flows

#### Why This Matters
Users must always be able to go back. Trapping users in a flow with no exit creates frustration and violates platform conventions. The back button is the most-used navigation action in any app.

#### The Rule
- Hierarchical screens MUST provide a **back/up button** or support system back gesture
- Web: browser back button must work correctly (don't break history)
- The back button should return to the previous screen in the same state the user left it
- Modals/sheets should have a close/dismiss affordance (X button or swipe-to-dismiss)

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-NAV-001 | Clear Current Location | MUST | Yes |
| REQ-NAV-002 | Navigation Item Limit | SHOULD | Yes |
| REQ-NAV-003 | Navigation Landmark | MUST | Yes |
| REQ-NAV-004 | Consistent Placement | MUST | Heuristic |
| REQ-NAV-005 | Mobile Navigation Pattern | SHOULD | Heuristic |
| REQ-NAV-006 | Back Navigation | MUST | Heuristic |

## Further Reading

- [Material Design 3: Navigation](https://m3.material.io/components/navigation-bar/overview)
- [Apple HIG: Navigation and Search](https://developer.apple.com/design/human-interface-guidelines/navigation-and-search)
- [NNGroup: Navigation Design](https://www.nngroup.com/articles/navigation-ia/)
- [WAI: Menu Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)
