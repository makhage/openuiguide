# OpenUI Guide — Complete Checklist

A scannable quick-reference of all requirements. Use this as a review checklist for your UI projects.

**Legend:** `MUST` = Required (accessibility/usability) | `SHOULD` = Recommended (best practice) | `CONSIDER` = Suggested (polish) | `LEARN` = Educational

---

## Accessibility (WCAG 2.2)

### Perceivable

- [ ] **REQ-A11Y-P-001** [MUST] Alt text for all non-decorative images
- [ ] **REQ-A11Y-P-002** [MUST] Color contrast ratio >= 4.5:1 for normal text
- [ ] **REQ-A11Y-P-003** [MUST] Color contrast ratio >= 3:1 for large text (18px+ bold or 24px+)
- [ ] **REQ-A11Y-P-004** [MUST] Non-text contrast ratio >= 3:1 for UI components and graphics
- [ ] **REQ-A11Y-P-005** [MUST] Information not conveyed by color alone
- [ ] **REQ-A11Y-P-006** [MUST] Text resizable up to 200% without loss of content
- [ ] **REQ-A11Y-P-007** [MUST] Meaningful reading order in markup matches visual order
- [ ] **REQ-A11Y-P-008** [MUST] Instructions don't rely solely on sensory characteristics
- [ ] **REQ-A11Y-P-009** [MUST] Captions and alternatives for audio/video content
- [ ] **REQ-A11Y-P-010** [MUST] Content reflows at 320px width without horizontal scrolling
- [ ] **REQ-A11Y-P-011** [MUST] Text spacing adjustable without breaking layout

### Operable

- [ ] **REQ-A11Y-O-001** [MUST] All functionality accessible via keyboard
- [ ] **REQ-A11Y-O-002** [MUST] Logical focus order following visual layout
- [ ] **REQ-A11Y-O-003** [MUST] Visible focus indicator on all interactive elements
- [ ] **REQ-A11Y-O-004** [MUST] No keyboard traps — focus can always move away
- [ ] **REQ-A11Y-O-005** [MUST] Focus management for dynamic content (modals, drawers)
- [ ] **REQ-A11Y-O-006** [MUST] Minimum target size of 24x24px (44x44px recommended)
- [ ] **REQ-A11Y-O-007** [MUST] Adjustable or no time limits on interactions
- [ ] **REQ-A11Y-O-008** [MUST] Skip navigation link as first focusable element
- [ ] **REQ-A11Y-O-009** [MUST] Touch gestures have single-pointer alternatives

### Understandable

- [ ] **REQ-A11Y-U-001** [MUST] Page language declared with lang attribute
- [ ] **REQ-A11Y-U-002** [MUST] All form inputs have visible, associated labels
- [ ] **REQ-A11Y-U-003** [MUST] Error messages are specific and suggest corrections
- [ ] **REQ-A11Y-U-004** [MUST] Navigation is consistent across pages
- [ ] **REQ-A11Y-U-005** [MUST] Components with same function identified consistently
- [ ] **REQ-A11Y-U-006** [MUST] No unexpected context changes on input
- [ ] **REQ-A11Y-U-007** [MUST] Error prevention for legal/financial/data submissions

### Robust

- [ ] **REQ-A11Y-R-001** [MUST] Correct semantic HTML elements for all UI components
- [ ] **REQ-A11Y-R-002** [MUST] ARIA roles, states, and properties used correctly
- [ ] **REQ-A11Y-R-003** [MUST] Status messages announced via aria-live regions
- [ ] **REQ-A11Y-R-004** [MUST] Name, role, and value determinable for all components
- [ ] **REQ-A11Y-R-005** [MUST] Valid, well-formed HTML markup

---

## Foundations

### Spacing & Layout

- [ ] **REQ-SPACE-001** [SHOULD] Base spacing unit (8pt grid system)
- [ ] **REQ-SPACE-002** [MUST] Touch/click target minimum size (44x44px / 48x48dp)
- [ ] **REQ-SPACE-003** [SHOULD] Consistent spacing between related elements
- [ ] **REQ-SPACE-004** [SHOULD] Clear section separation via whitespace
- [ ] **REQ-SPACE-005** [SHOULD] Adequate content padding from screen edges (16px minimum)
- [ ] **REQ-SPACE-006** [SHOULD] Elements aligned to a consistent grid
- [ ] **REQ-SPACE-007** [CONSIDER] Spacing scales responsively with viewport
- [ ] **REQ-SPACE-008** [CONSIDER] Whitespace used intentionally as a design element
- [ ] **REQ-SPACE-009** [SHOULD] Consistent internal spacing within components
- [ ] **REQ-SPACE-010** [MUST] Adequate spacing between interactive elements (no accidental taps)

### Typography

- [ ] **REQ-TYPO-001** [MUST] Minimum body text size (16px web, platform defaults for native)
- [ ] **REQ-TYPO-002** [SHOULD] Consistent type scale (limited set of font sizes)
- [ ] **REQ-TYPO-003** [MUST] Line height 1.4-1.6 for body text
- [ ] **REQ-TYPO-004** [SHOULD] Line length 45-75 characters for body text
- [ ] **REQ-TYPO-005** [SHOULD] Font weight used purposefully (max 3 weights)
- [ ] **REQ-TYPO-006** [SHOULD] Maximum 2 font families per project
- [ ] **REQ-TYPO-007** [SHOULD] Font loading optimized (font-display, preload)
- [ ] **REQ-TYPO-008** [MUST] Heading hierarchy (h1-h6) follows logical order

### Color & Theming

- [ ] **REQ-COLOR-001** [SHOULD] Systematic color palette from design tokens
- [ ] **REQ-COLOR-002** [SHOULD] Semantic color tokens (not raw hex values)
- [ ] **REQ-COLOR-003** [CONSIDER] Maximum 5-7 primary palette hues
- [ ] **REQ-COLOR-004** [MUST] Sufficient contrast for all themes (4.5:1 text, 3:1 UI)
- [ ] **REQ-COLOR-005** [MUST] Accessible color pairs verified in all themes
- [ ] **REQ-COLOR-006** [SHOULD] Consistent feedback colors (red=error, green=success, etc.)
- [ ] **REQ-COLOR-007** [CONSIDER] Opacity/transparency used sparingly and purposefully
- [ ] **REQ-COLOR-008** [CONSIDER] Brand color integrated without compromising usability

### Visual Hierarchy

- [ ] **REQ-HIER-001** [SHOULD] Single primary focal point per screen/section
- [ ] **REQ-HIER-002** [SHOULD] Primary vs. secondary action visually differentiated
- [ ] **REQ-HIER-003** [SHOULD] Content hierarchy communicated through size variation
- [ ] **REQ-HIER-004** [CONSIDER] Information density appropriate for use case
- [ ] **REQ-HIER-005** [SHOULD] Visual grouping via proximity and containment (Gestalt)
- [ ] **REQ-HIER-006** [CONSIDER] Emphasis used with restraint (not everything is bold)

### Iconography & Imagery

- [ ] **REQ-ICON-001** [SHOULD] Consistent icon style throughout the app
- [ ] **REQ-ICON-002** [SHOULD] Text labels accompany ambiguous icons
- [ ] **REQ-ICON-003** [SHOULD] Icons sized consistently (24dp standard, 20dp compact)
- [ ] **REQ-ICON-004** [MUST] Icon-only buttons have accessible names (aria-label or sr-only text)
- [ ] **REQ-ICON-005** [SHOULD] Images optimized for performance (WebP/AVIF, lazy loading)

### Motion & Animation

- [ ] **REQ-MOTION-001** [MUST] Respect prefers-reduced-motion system setting
- [ ] **REQ-MOTION-002** [SHOULD] Animation duration 100-500ms (150-300ms for micro-interactions)
- [ ] **REQ-MOTION-003** [SHOULD] Meaningful easing curves (not linear for UI transitions)
- [ ] **REQ-MOTION-004** [MUST] Animations use only transform and opacity (60fps safe)
- [ ] **REQ-MOTION-005** [MUST] No autoplay continuous/looping animations without pause control
- [ ] **REQ-MOTION-006** [CONSIDER] Transition continuity between related states

---

## Components

### Buttons & Actions

- [ ] **REQ-BTN-001** [SHOULD] Clear button hierarchy (primary, secondary, tertiary)
- [ ] **REQ-BTN-002** [MUST] Interactive states for all buttons (hover, active, focus, disabled)
- [ ] **REQ-BTN-003** [MUST] Descriptive button labels (not just "Click here" or "Submit")
- [ ] **REQ-BTN-004** [MUST] Adequate button size (minimum 44x44px touch target)
- [ ] **REQ-BTN-005** [MUST] Button vs. link semantics used correctly
- [ ] **REQ-BTN-006** [SHOULD] Loading and disabled states for async actions

### Forms & Inputs

- [ ] **REQ-FORM-001** [MUST] Visible labels on all inputs (not just placeholders)
- [ ] **REQ-FORM-002** [MUST] Meaningful error messages that suggest corrections
- [ ] **REQ-FORM-003** [SHOULD] Input types match expected data (email, tel, number)
- [ ] **REQ-FORM-004** [SHOULD] Validate on blur, not on every keystroke
- [ ] **REQ-FORM-005** [SHOULD] Single-column form layout for simple forms
- [ ] **REQ-FORM-006** [SHOULD] Field width hints at expected input length
- [ ] **REQ-FORM-007** [MUST] Related fields grouped with fieldset/legend
- [ ] **REQ-FORM-008** [SHOULD] Autocomplete attributes on standard fields

### Navigation

- [ ] **REQ-NAV-001** [MUST] Clear indication of current location
- [ ] **REQ-NAV-002** [SHOULD] Maximum 5-7 primary navigation items
- [ ] **REQ-NAV-003** [MUST] Navigation wrapped in `<nav>` landmark
- [ ] **REQ-NAV-004** [MUST] Navigation placement consistent across pages
- [ ] **REQ-NAV-005** [SHOULD] Mobile-appropriate navigation pattern (hamburger, bottom nav, tabs)
- [ ] **REQ-NAV-006** [MUST] Back navigation works predictably

### Cards & Containers

- [ ] **REQ-CARD-001** [SHOULD] Consistent card styling (border radius, shadow, padding)
- [ ] **REQ-CARD-002** [SHOULD] Clickable cards use proper semantics (link or button wrapping)
- [ ] **REQ-CARD-003** [SHOULD] Card content follows consistent structure (image, title, description, action)
- [ ] **REQ-CARD-004** [CONSIDER] Surface differentiation through elevation or color

### Modals & Overlays

- [ ] **REQ-MODAL-001** [MUST] Focus trapped inside open modal, restored on close
- [ ] **REQ-MODAL-002** [MUST] Dismissible via Escape key and backdrop click
- [ ] **REQ-MODAL-003** [SHOULD] Background scrim to indicate modal context
- [ ] **REQ-MODAL-004** [SHOULD] Clear title and action buttons in every modal
- [ ] **REQ-MODAL-005** [CONSIDER] Prefer inline alternatives when modal isn't necessary
- [ ] **REQ-MODAL-006** [MUST] Dialogs use `role="dialog"` with `aria-labelledby`

### Lists & Tables

- [ ] **REQ-LIST-001** [SHOULD] Consistent list item structure (avatar, text, action)
- [ ] **REQ-LIST-002** [MUST] Tables use `<th>`, `scope`, and `<caption>` for accessibility
- [ ] **REQ-LIST-003** [SHOULD] Responsive table strategy (scroll, stack, or hide columns)
- [ ] **REQ-LIST-004** [SHOULD] Empty state shown when list has no items
- [ ] **REQ-LIST-005** [CONSIDER] Sortable table headers with visible sort indicators

### Feedback & Status

- [ ] **REQ-FEED-001** [MUST] Immediate acknowledgment for user actions
- [ ] **REQ-FEED-002** [MUST] Loading indicators for operations over 1 second
- [ ] **REQ-FEED-003** [MUST] Distinct success and error feedback
- [ ] **REQ-FEED-004** [SHOULD] Toasts/snackbars auto-dismiss (5-10s) with manual dismiss option
- [ ] **REQ-FEED-005** [SHOULD] Status badges use both color and text/icon

---

## Patterns

### Responsive & Adaptive

- [ ] **REQ-RESP-001** [MUST] Viewport meta tag present and correctly configured
- [ ] **REQ-RESP-002** [MUST] No horizontal scrolling at any standard viewport width
- [ ] **REQ-RESP-003** [MUST] Responsive images (srcset/sizes or CSS object-fit)
- [ ] **REQ-RESP-004** [SHOULD] Consistent breakpoint system across the project
- [ ] **REQ-RESP-005** [CONSIDER] Responsive typography (fluid scaling with clamp())
- [ ] **REQ-RESP-006** [SHOULD] Adaptive layouts for different screen size classes

### Dark Mode

- [ ] **REQ-DARK-001** [MUST] Respect system color scheme preference (prefers-color-scheme)
- [ ] **REQ-DARK-002** [SHOULD] Purposefully designed dark palette (not just inverted)
- [ ] **REQ-DARK-003** [MUST] Dark mode passes all contrast requirements
- [ ] **REQ-DARK-004** [SHOULD] Images and media adapted for dark backgrounds
- [ ] **REQ-DARK-005** [CONSIDER] Surface elevation conveyed through lighter surfaces in dark mode

### Loading & Performance

- [ ] **REQ-LOAD-001** [SHOULD] Skeleton screens for content loading states
- [ ] **REQ-LOAD-002** [SHOULD] Progressive/lazy content loading
- [ ] **REQ-LOAD-003** [CONSIDER] Optimistic updates for user actions
- [ ] **REQ-LOAD-004** [SHOULD] Prevent cumulative layout shift (reserve space for async content)
- [ ] **REQ-LOAD-005** [MUST] Error recovery with retry action for failed loads

### Onboarding & Empty States

- [ ] **REQ-ONBOARD-001** [SHOULD] Progressive disclosure over upfront tutorials
- [ ] **REQ-ONBOARD-002** [SHOULD] Meaningful empty states with illustration and call-to-action
- [ ] **REQ-ONBOARD-003** [CONSIDER] Minimal signup friction (fewest possible required fields)
- [ ] **REQ-ONBOARD-004** [CONSIDER] First-run experience with sample content

### Error Handling

- [ ] **REQ-ERR-001** [MUST] Human-readable error messages (not error codes)
- [ ] **REQ-ERR-002** [SHOULD] Inline validation over submit-time-only errors
- [ ] **REQ-ERR-003** [MUST] Confirmation dialog for destructive actions
- [ ] **REQ-ERR-004** [SHOULD] Graceful degradation when features fail
- [ ] **REQ-ERR-005** [SHOULD] Custom 404 and error pages with navigation

---

## Platforms

### Web (HTML/CSS/JS)

- [ ] **REQ-WEB-001** [MUST] Semantic HTML structure (main, nav, header, footer, section)
- [ ] **REQ-WEB-002** [SHOULD] CSS custom properties for theming
- [ ] **REQ-WEB-003** [SHOULD] Modern CSS layout (Grid, Flexbox — not floats)
- [ ] **REQ-WEB-004** [MUST] :focus-visible styles for keyboard users
- [ ] **REQ-WEB-005** [SHOULD] Low CSS specificity strategy (BEM, utility classes, or CSS Modules)
- [ ] **REQ-WEB-006** [CONSIDER] Performance budget (< 200KB JS, < 100KB CSS)

### iOS (SwiftUI)

- [ ] **REQ-IOS-001** [SHOULD] Use system/platform components where possible
- [ ] **REQ-IOS-002** [MUST] Support Dynamic Type for text scaling
- [ ] **REQ-IOS-003** [SHOULD] Tab bar navigation with 3-5 tabs
- [ ] **REQ-IOS-004** [SHOULD] SF Symbols for system-consistent iconography
- [ ] **REQ-IOS-005** [MUST] Safe area compliance (notch, home indicator)
- [ ] **REQ-IOS-006** [CONSIDER] Haptic feedback for meaningful interactions

### Android (Compose)

- [ ] **REQ-ANDROID-001** [SHOULD] Material Theme integration with dynamic color
- [ ] **REQ-ANDROID-002** [SHOULD] Use Material Components (not custom for standard patterns)
- [ ] **REQ-ANDROID-003** [SHOULD] Bottom navigation for top-level destinations
- [ ] **REQ-ANDROID-004** [SHOULD] Adaptive layouts with window size classes
- [ ] **REQ-ANDROID-005** [SHOULD] Edge-to-edge design with system bar handling
- [ ] **REQ-ANDROID-006** [SHOULD] Predictive back gesture support

### Cross-Platform (Flutter / React Native)

- [ ] **REQ-XPLAT-001** [SHOULD] Respect platform navigation patterns (back vs. swipe)
- [ ] **REQ-XPLAT-002** [SHOULD] Platform-appropriate typography (SF Pro vs. Roboto)
- [ ] **REQ-XPLAT-003** [SHOULD] Platform-appropriate feedback patterns
- [ ] **REQ-XPLAT-004** [SHOULD] Shared design tokens, platform-adapted components
- [ ] **REQ-XPLAT-005** [MUST] Test on both platforms during development

### Desktop (Electron / Tauri)

- [ ] **REQ-PLAT-DESK-001** [MUST] Window management (resize, minimize, maximize, restore)
- [ ] **REQ-PLAT-DESK-002** [SHOULD] System menu integration
- [ ] **REQ-PLAT-DESK-003** [MUST] Platform-correct keyboard shortcuts (Cmd vs. Ctrl)
- [ ] **REQ-PLAT-DESK-004** [SHOULD] Drag-and-drop support for relevant content
- [ ] **REQ-PLAT-DESK-005** [CONSIDER] System tray integration
- [ ] **REQ-PLAT-DESK-006** [SHOULD] Multi-window support where appropriate
- [ ] **REQ-PLAT-DESK-007** [MUST] Native file dialogs for open/save operations
- [ ] **REQ-PLAT-DESK-008** [SHOULD] Offline-first capability
- [ ] **REQ-PLAT-DESK-009** [MUST] High-DPI and display scaling support
- [ ] **REQ-PLAT-DESK-010** [SHOULD] System theme integration (light/dark)

### TV (tvOS / Android TV / Fire TV)

- [ ] **REQ-PLAT-TV-001** [MUST] 10-foot UI with large text and high contrast
- [ ] **REQ-PLAT-TV-002** [MUST] D-pad and remote navigation
- [ ] **REQ-PLAT-TV-003** [MUST] Clear focus indicators and focus management
- [ ] **REQ-PLAT-TV-004** [MUST] Content within overscan safe area
- [ ] **REQ-PLAT-TV-005** [MUST] Limited text input handling (search, auth)
- [ ] **REQ-PLAT-TV-006** [SHOULD] Media-first layouts
- [ ] **REQ-PLAT-TV-007** [SHOULD] Voice input support
- [ ] **REQ-PLAT-TV-008** [MUST] Large touch targets for remote interaction

### Wearable (watchOS / Wear OS)

- [ ] **REQ-PLAT-WEAR-001** [MUST] Glanceable content (key info in 2-3 seconds)
- [ ] **REQ-PLAT-WEAR-002** [MUST] Minimal interaction design (< 3 taps per task)
- [ ] **REQ-PLAT-WEAR-003** [SHOULD] Crown and bezel navigation support
- [ ] **REQ-PLAT-WEAR-004** [SHOULD] Complications and widgets for at-a-glance data
- [ ] **REQ-PLAT-WEAR-005** [MUST] Small screen typography (minimum 16pt)
- [ ] **REQ-PLAT-WEAR-006** [SHOULD] Haptic feedback for confirmations and alerts
- [ ] **REQ-PLAT-WEAR-007** [MUST] Health data privacy (no logging, encrypted storage)
- [ ] **REQ-PLAT-WEAR-008** [MUST] Battery-conscious animations (minimal, short)

---

## Summary

| Category | MUST | SHOULD | CONSIDER | Total |
|----------|------|--------|----------|-------|
| Accessibility | 36 | 0 | 0 | 36 |
| Foundations | 8 | 26 | 7 | 41 |
| Components | 17 | 17 | 4 | 38 |
| Patterns | 9 | 11 | 5 | 25 |
| Platforms | 23 | 24 | 4 | 51 |
| **Total** | **93** | **78** | **20** | **191** |
