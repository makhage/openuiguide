# Platform: TV (tvOS, Android TV, Fire TV)

## Overview

TV platforms present a fundamentally different interaction model: users sit 8-12 feet from the screen, navigate with a directional pad or remote control, and have limited text input capability. The "10-foot UI" demands large, high-contrast visuals, predictable focus-based navigation, and media-optimized layouts. This spec covers TV-specific best practices that complement the cross-platform specs.

## Requirements

### REQ-PLAT-TV-001: 10-Foot UI — Large Text and High Contrast

**Enforcement:** `MUST` | tvOS HIG, Android TV Guidelines
**Platforms:** tvOS, Android TV, Fire TV
**Detectable:** Yes — check minimum text sizes and contrast ratios

#### Why This Matters
At a viewing distance of 8-12 feet, text that is comfortable on a phone or desktop becomes illegible on a TV. Low-contrast elements that work on a bright phone screen disappear on a TV in a dimly lit living room. The entire visual language must be scaled and simplified for distance viewing.

#### The Rule
- Body text MUST be at least 18sp/pt on TV interfaces; titles at least 32sp/pt
- Maintain a minimum contrast ratio of 4.5:1 for all text (WCAG AA), with 7:1 preferred for body text at viewing distance
- Use bold or semi-bold weights for body text to improve legibility at distance
- Limit line length to approximately 40-60 characters for readability
- Use simple, sans-serif typefaces optimized for screen rendering
- Avoid thin fonts, fine details, and small icons — the minimum tappable/focusable element is 48dp

---

### REQ-PLAT-TV-002: D-Pad and Remote Navigation

**Enforcement:** `MUST` | tvOS HIG, Android TV Guidelines
**Platforms:** tvOS, Android TV, Fire TV
**Detectable:** Yes — check for directional key event handling and focus management

#### Why This Matters
TV interfaces have no touch or pointer input. Navigation is entirely through a directional pad (up, down, left, right) and select button. Every interactive element must be reachable through sequential directional movement, and the navigation path must be logical and predictable.

#### The Rule
- All interactive elements MUST be reachable via D-pad navigation (up, down, left, right, select)
- Navigation order MUST follow a logical spatial layout — moving right should select the element visually to the right
- Support the Back/Menu button on the remote for backward navigation
- Never create focus traps — every screen must have a clear exit path via Back
- Provide a "select" action for the primary action and "long press" for secondary actions where supported

#### Platform Notes
- **tvOS:** Use `UIFocusEnvironment` and the focus engine — avoid overriding focus behavior unless necessary
- **Android TV:** Use `Leanback` library components which handle D-pad navigation automatically
- **Fire TV:** Follows Android TV conventions; test with the Fire TV remote (which lacks a touchpad)

---

### REQ-PLAT-TV-003: Focus Management and Visual Indicators

**Enforcement:** `MUST` | tvOS HIG, Android TV Guidelines, Accessibility
**Platforms:** tvOS, Android TV, Fire TV
**Detectable:** Yes — check for visible focus states on all interactive elements

#### Why This Matters
Without a cursor or touch, focus is the only way users know which element is selected. An invisible or subtle focus indicator on a TV means the user is navigating blind. Focus states must be large, obvious, and consistent across the entire interface.

#### The Rule
- Every focusable element MUST have a clearly visible focus state (scale, border, glow, or color shift)
- Focus indicators should be visible from 10 feet away — use at least a 4px border or 1.05x-1.1x scale increase
- Maintain consistent focus styling across the entire application
- Set an initial focus target on every screen — never leave the user without a focused element
- When content loads or updates, preserve or logically reassign focus

#### Platform Notes
- **tvOS:** The focus engine provides built-in scale and parallax effects; customize via `UIFocusEffect`
- **Android TV:** Use `Leanback` card presenters or apply custom `selector` drawables for focus states
- **Fire TV:** Same as Android TV; ensure focus visibility is tested on both LCD and OLED TV panels

---

### REQ-PLAT-TV-004: Overscan Safe Area

**Enforcement:** `MUST` | TV Display Standards
**Platforms:** tvOS, Android TV, Fire TV
**Detectable:** Yes — check for safe area insets and margin application

#### Why This Matters
Many TVs crop the edges of the signal — a phenomenon called overscan. Content placed at the very edge of the screen may be partially or fully hidden. While modern TVs reduce this, older sets and certain display modes still clip 3-5% of each edge.

#### The Rule
- Keep all essential UI elements (text, buttons, navigation) within the overscan safe area
- Apply a minimum margin of 48dp (approximately 5%) on all edges for critical content
- Background images and decorative elements may extend to the full screen edge (bleed)
- Test with overscan simulation enabled (available in most TV development tools)

#### Platform Notes
- **tvOS:** Use `safeAreaLayoutGuide` — tvOS applies a 60pt safe area inset by default
- **Android TV:** Apply 48dp margins or use the `Leanback` library which handles safe areas automatically
- **Fire TV:** Follow Android TV safe area guidelines; test on actual Fire TV hardware

---

### REQ-PLAT-TV-005: Limited Text Input Handling

**Enforcement:** `MUST` | TV UX Best Practice
**Platforms:** tvOS, Android TV, Fire TV
**Detectable:** Heuristic — check for text input frequency and alternative input methods

#### Why This Matters
Entering text with a TV remote is slow and frustrating. Every character requires multiple D-pad presses on an on-screen keyboard. Applications that rely heavily on text input create a poor TV experience. Minimize typing, and when text input is unavoidable, make it as painless as possible.

#### The Rule
- Minimize text input requirements — prefer browsing, selection, and voice over typing
- For search, prioritize voice input and offer predictive suggestions after 2-3 characters
- For authentication, support QR code pairing, PIN-based login, or companion device authentication — avoid full email/password entry on the TV
- When text input is necessary, use the platform's native on-screen keyboard
- Pre-populate fields where possible (e.g., remembered search terms, account names)

#### Platform Notes
- **tvOS:** Use `UISearchController` with Siri voice input; support iPhone/iPad as a text input companion
- **Android TV:** Use `SearchFragment` from the Leanback library with Google Assistant voice integration
- **Fire TV:** Support Alexa voice search; use the Fire TV companion app for text input

---

### REQ-PLAT-TV-006: Media-First Layouts

**Enforcement:** `SHOULD` | TV UX Best Practice
**Platforms:** tvOS, Android TV, Fire TV
**Detectable:** Heuristic — check for content-forward layout patterns

#### Why This Matters
TV is primarily a media consumption platform. Users expect large, visually rich content previews — not dense lists or text-heavy layouts. The interface should showcase content (artwork, thumbnails, previews) and minimize chrome.

#### The Principle
- Use large imagery as the primary content representation (cover art, thumbnails, hero images)
- Adopt horizontal scrolling rows organized by category (the "content rail" pattern)
- Minimize UI chrome — hide navigation elements until needed, maximize content area
- Support background video or image previews when an item is focused
- Use a hero/billboard area at the top of the home screen for featured content
- Maintain a grid or rail structure with consistent card sizes within each row

---

### REQ-PLAT-TV-007: Voice Input Support

**Enforcement:** `SHOULD` | TV UX Best Practice
**Platforms:** tvOS, Android TV, Fire TV
**Detectable:** Yes — check for voice input API integration

#### Why This Matters
Voice is the most efficient input method on TV — it eliminates the pain of on-screen keyboard navigation. Users increasingly expect voice search and voice commands as a primary interaction method on TV platforms.

#### The Principle
- Integrate platform voice search APIs for content discovery
- Support deep linking from voice search results directly into content playback
- Register searchable content with the platform's global search index
- Provide voice-triggered actions where appropriate (play, pause, search, navigate)
- Show visual feedback when voice input is active (listening indicator)

#### Platform Notes
- **tvOS:** Integrate with Siri and `SiriKit` intents for media playback
- **Android TV:** Implement `SearchFragment` and register content with the global search provider
- **Fire TV:** Integrate with Alexa voice search and register content for Fire TV's universal search

---

### REQ-PLAT-TV-008: Large Touch Targets for Remote Interaction

**Enforcement:** `MUST` | TV UX Best Practice, Accessibility
**Platforms:** tvOS, Android TV, Fire TV
**Detectable:** Yes — check minimum focusable element dimensions

#### Why This Matters
Even though TV remotes use D-pad navigation (not direct touch), small interactive elements make navigation tedious — users must press the D-pad many times to traverse a grid of tiny items. Larger, fewer targets per screen reduce navigation effort and are easier to read from a distance.

#### The Rule
- Focusable elements MUST be at least 48dp in height and width
- Recommended minimum card size is 160dp wide for comfortable focus navigation
- Maintain consistent spacing between focusable elements (minimum 16dp) so focus movement is predictable
- Limit the number of focusable items visible at once — prefer fewer, larger items over many small ones
- Ensure focus can move in a straight line across rows and columns without zigzagging

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-PLAT-TV-001 | 10-Foot UI — Large Text and High Contrast | MUST | Yes |
| REQ-PLAT-TV-002 | D-Pad and Remote Navigation | MUST | Yes |
| REQ-PLAT-TV-003 | Focus Management and Visual Indicators | MUST | Yes |
| REQ-PLAT-TV-004 | Overscan Safe Area | MUST | Yes |
| REQ-PLAT-TV-005 | Limited Text Input Handling | MUST | Heuristic |
| REQ-PLAT-TV-006 | Media-First Layouts | SHOULD | Heuristic |
| REQ-PLAT-TV-007 | Voice Input Support | SHOULD | Yes |
| REQ-PLAT-TV-008 | Large Touch Targets for Remote Interaction | MUST | Yes |

## Creative Freedom

TV platforms offer unique creative opportunities beyond these requirements:

- **Ambient modes** — screensavers, ambient art displays, or slow-cycling content for when the TV is idle
- **Parallax and depth effects** — tvOS's layered image format and focus parallax create a rich, dimensional feel; use these to enhance content cards
- **Cinematic transitions** — TV is a visual medium; use smooth, sweeping transitions between screens to create a premium feel
- **Sound design** — TV interfaces can use subtle audio feedback for navigation and selection, enhancing the living-room experience
- **Second-screen experiences** — companion apps on phone or tablet can enhance the TV experience with additional information, controls, or synced content

## Further Reading

- [Apple: tvOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/designing-for-tvos)
- [Android TV: Design Guidelines](https://developer.android.com/design/ui/tv)
- [Amazon: Fire TV Design Guidelines](https://developer.amazon.com/docs/fire-tv/design-and-user-experience-guidelines.html)
- [Google: Leanback Library](https://developer.android.com/training/tv/start/layouts)
