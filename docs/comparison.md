# Design System Comparison

How OpenUI Guide requirements map to Material Design 3, Apple HIG, and other major design systems.

## Philosophy Comparison

| Aspect | OpenUI Guide | Material Design 3 | Apple HIG |
|--------|-------------|-------------------|-----------|
| **Scope** | Universal, cross-platform | Android-first, web | Apple platforms |
| **Enforcement** | 4 levels (MUST/SHOULD/CONSIDER/LEARN) | Guidelines only | Guidelines only |
| **Accessibility** | WCAG 2.2 AA (non-negotiable) | Integrated but not separated | Integrated but not separated |
| **Theming** | Token-based, system-agnostic | Material Theme / Dynamic Color | System appearances |
| **Opinionated?** | On accessibility yes, aesthetics no | Yes (Material aesthetic) | Yes (Apple aesthetic) |
| **Creative Freedom** | Explicitly encouraged for visual design | Within Material framework | Within Apple framework |

## Spacing & Layout

| OpenUI Guide | Material Design 3 | Apple HIG | Notes |
|-------------|-------------------|-----------|-------|
| REQ-SPACE-001: 8pt base grid (SHOULD) | 4dp increment system | 8pt grid | MD3 uses 4dp; OpenUI Guide and Apple align on 8pt |
| REQ-SPACE-002: 44x44px / 48dp touch targets (MUST) | 48dp minimum | 44pt minimum | All agree on large targets; MD3 slightly larger |
| REQ-SPACE-005: 16px minimum edge padding (SHOULD) | 16dp standard margins | 16pt (20pt on larger devices) | Universal agreement |
| REQ-SPACE-010: Spacing between interactive elements (MUST) | 8dp minimum between targets | 8pt minimum | All agree — prevent accidental taps |

## Typography

| OpenUI Guide | Material Design 3 | Apple HIG | Notes |
|-------------|-------------------|-----------|-------|
| REQ-TYPO-001: 16px minimum body text (MUST) | 14sp Body Medium | 17pt Body (Dynamic Type) | MD3 allows smaller; Apple and OpenUI Guide are stricter |
| REQ-TYPO-002: Consistent type scale (SHOULD) | 15-role type scale | 11 Dynamic Type sizes | All agree on systematic scaling |
| REQ-TYPO-003: Line height 1.4-1.6 (MUST) | ~1.43 (20sp/14sp) | ~1.47 (25pt/17pt) | Close alignment across all three |
| REQ-TYPO-004: 45-75 char line length (SHOULD) | ~60 characters recommended | No explicit guidance | MD3 aligns; Apple doesn't specify |
| REQ-TYPO-006: Max 2 font families (SHOULD) | Roboto (1 family) | SF Pro + SF Mono (2 families) | OpenUI Guide aligns with Apple's approach |
| REQ-TYPO-008: Heading hierarchy h1-h6 (MUST) | Display/Headline/Title/Body/Label | Large Title/Title/Headline/Body/etc. | All use hierarchical text styles |

## Color

| OpenUI Guide | Material Design 3 | Apple HIG | Notes |
|-------------|-------------------|-----------|-------|
| REQ-COLOR-001: Systematic palette (SHOULD) | Tonal palettes from seed color | System colors + semantic colors | MD3 is most prescriptive |
| REQ-COLOR-002: Semantic tokens (SHOULD) | Material Color Roles (40+ tokens) | Semantic system colors | All agree on semantic abstraction |
| REQ-COLOR-004: 4.5:1 contrast (MUST) | "Meet or exceed" WCAG AA | "Sufficient contrast" | OpenUI Guide is most specific |
| REQ-COLOR-005: Accessible color pairs (MUST) | On-Primary, On-Surface system | No explicit pairing system | MD3 has the most robust pairing model |
| REQ-COLOR-006: Feedback colors (SHOULD) | Error/Warning/Success tokens | Destructive action tinting | All agree on semantic feedback colors |

## Buttons & Actions

| OpenUI Guide | Material Design 3 | Apple HIG | Notes |
|-------------|-------------------|-----------|-------|
| REQ-BTN-001: Button hierarchy (SHOULD) | FAB, Extended FAB, Filled, Tonal, Outlined, Text | Prominent, Default, Borderless | All have 3-4 tier hierarchy |
| REQ-BTN-002: Interactive states (MUST) | Enabled, Hovered, Focused, Pressed, Disabled | Normal, Highlighted, Disabled, Selected | OpenUI Guide requires all states |
| REQ-BTN-003: Descriptive labels (MUST) | "Describe what happens" | "Use a verb or verb phrase" | Universal agreement |
| REQ-BTN-004: 44px minimum size (MUST) | 48dp height minimum | 44pt minimum | MD3 slightly larger |
| REQ-BTN-005: Button vs. link (MUST) | Buttons for actions, links for navigation | Buttons and links distinguished | All agree on semantic distinction |

## Forms & Inputs

| OpenUI Guide | Material Design 3 | Apple HIG | Notes |
|-------------|-------------------|-----------|-------|
| REQ-FORM-001: Visible labels (MUST) | Labels required (above or floating) | Labels required | OpenUI Guide is explicit that placeholder != label |
| REQ-FORM-002: Error messages (MUST) | Supporting text turns error color | Inline error messages | All agree on inline, specific errors |
| REQ-FORM-003: Input types (SHOULD) | Type-specific keyboards | Keyboard type matching | Universal agreement |
| REQ-FORM-005: Single-column (SHOULD) | Recommended for mobile | Not specified | Backed by Baymard Institute research |
| REQ-FORM-008: Autocomplete (SHOULD) | Not specified | AutoFill support | OpenUI Guide aligns with web standards |

## Navigation

| OpenUI Guide | Material Design 3 | Apple HIG | Notes |
|-------------|-------------------|-----------|-------|
| REQ-NAV-001: Current location (MUST) | Active indicator on selected destination | Selected tab highlighted | Universal agreement |
| REQ-NAV-002: 5-7 items (SHOULD) | 3-5 bottom nav destinations | 3-5 tab bar items | MD3 and Apple are stricter (max 5) |
| REQ-NAV-003: `<nav>` landmark (MUST) | Semantic structure | VoiceOver rotor navigation | All emphasize semantic navigation |
| REQ-NAV-005: Mobile pattern (SHOULD) | Bottom navigation bar | Tab bar (bottom) | Agreement on bottom navigation for mobile |
| REQ-NAV-006: Back navigation (MUST) | System back button | Swipe-back gesture + back button | Different mechanisms, same principle |

## Modals & Overlays

| OpenUI Guide | Material Design 3 | Apple HIG | Notes |
|-------------|-------------------|-----------|-------|
| REQ-MODAL-001: Focus trapping (MUST) | Dialog focus management | Sheet/alert focus | Universal accessibility requirement |
| REQ-MODAL-002: Escape dismiss (MUST) | Scrim tap to dismiss | Swipe down or tap outside | Different gestures, same principle |
| REQ-MODAL-003: Background scrim (SHOULD) | Scrim (opacity 32%) | Dimmed background | All agree on visual context separation |
| REQ-MODAL-005: Avoid overuse (CONSIDER) | "Use dialogs sparingly" | "Minimize use of alerts" | Universal agreement — modals interrupt flow |
| REQ-MODAL-006: Dialog role + label (MUST) | AlertDialog component | UIAlertController | Framework components handle this; custom modals need manual ARIA |

## Accessibility Comparison

| Area | OpenUI Guide | Material Design 3 | Apple HIG | WCAG 2.2 |
|------|-------------|-------------------|-----------|----------|
| **Contrast** | 4.5:1 normal, 3:1 large (MUST) | "Meet or exceed" | "Sufficient" | 4.5:1 / 3:1 (AA) |
| **Touch targets** | 44px (MUST), 48dp recommended | 48dp (MUST) | 44pt (MUST) | 24x24px minimum (AA) |
| **Focus visible** | Required (MUST) | Material ripple + focus ring | System focus ring | Required (AA) |
| **Screen readers** | Semantic HTML + ARIA (MUST) | Component-level a11y | VoiceOver integration | Programmatic name/role/value |
| **Reduced motion** | MUST respect (prefers-reduced-motion) | "Support" | "Support Reduce Motion" | WCAG 2.3.3 |
| **Color alone** | MUST NOT be sole indicator | "Don't rely on color alone" | "Don't rely on color alone" | SC 1.4.1 |

## Responsive Design

| OpenUI Guide | Material Design 3 | Apple HIG | Notes |
|-------------|-------------------|-----------|-------|
| REQ-RESP-001: Viewport meta (MUST) | Implied for web | N/A (native) | Web-specific requirement |
| REQ-RESP-002: No horizontal scroll (MUST) | Responsive layouts | Size classes | All agree — horizontal scroll is a bug |
| REQ-RESP-004: Consistent breakpoints (SHOULD) | Compact/Medium/Expanded (600/840dp) | Compact/Regular size classes | Different systems, same concept |
| REQ-RESP-006: Adaptive layouts (SHOULD) | Canonical layouts (list-detail, feed, etc.) | Split views, sidebars | MD3 is most prescriptive with named patterns |

## Dark Mode

| OpenUI Guide | Material Design 3 | Apple HIG | Notes |
|-------------|-------------------|-----------|-------|
| REQ-DARK-001: Respect system preference (MUST) | Dynamic Color auto-adapts | System appearance setting | All agree — respect the OS |
| REQ-DARK-002: Designed palette (SHOULD) | Tonal surfaces with elevation | Elevated base + vibrancy | MD3 has the most systematic approach |
| REQ-DARK-003: Contrast verified (MUST) | Tonal palette ensures contrast | "Test with both appearances" | OpenUI Guide is strictest |
| REQ-DARK-005: Surface elevation (CONSIDER) | Lighter surfaces = higher elevation | Vibrancy + materials | MD3's signature approach |

## Where OpenUI Guide Fills Gaps

These areas are covered by OpenUI Guide but not fully addressed by MD3 or Apple HIG alone:

| Area | What OpenUI Guide Adds |
|------|----------------------|
| **Cross-platform consistency** | REQ-XPLAT-001 through 005 bridge platform differences |
| **Enforcement clarity** | 4-level system (MUST/SHOULD/CONSIDER/LEARN) vs. ambiguous "guidelines" |
| **Desktop apps** | REQ-PLAT-DESK-001 through 010 for Electron/Tauri (neither MD3 nor HIG covers well) |
| **TV platforms** | REQ-PLAT-TV-001 through 008 (Apple has tvOS HIG but it's separate) |
| **Wearables** | REQ-PLAT-WEAR-001 through 008 (consolidated guidance) |
| **Error handling patterns** | REQ-ERR-001 through 005 as formal requirements |
| **Onboarding** | REQ-ONBOARD-001 through 004 with enforcement levels |
| **Loading states** | REQ-LOAD-001 through 005 with specific patterns |
| **Machine readability** | JSON spec format for automated tooling |
