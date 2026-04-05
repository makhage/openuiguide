# Patterns: Loading and Performance

## Overview

Perceived performance is as important as actual performance. A 2-second load with a well-designed skeleton screen feels faster than a 1-second load with a blank white screen. This spec covers how to design for loading, perceived speed, and graceful degradation.

## Requirements

### REQ-LOAD-001: Skeleton Screens for Content Loading

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for skeleton/placeholder patterns during content loading

#### Why This Matters
Spinner-only loading screens give no indication of what's coming. Skeleton screens (content-shaped gray placeholders) preview the layout and feel faster because the user sees progress immediately. Facebook, YouTube, and LinkedIn popularized this pattern because it measurably reduces perceived wait time.

#### The Principle
- Use **skeleton screens** for page/section loading instead of blank screens or spinner-only
- Skeleton shapes should approximate the real content layout (text blocks, image rectangles, avatar circles)
- Use subtle shimmer or pulse animation on skeletons to indicate loading (respect reduced-motion)
- Transition smoothly from skeleton to real content (fade-in, not hard switch)

---

### REQ-LOAD-002: Progressive Content Loading

**Enforcement:** `SHOULD` | Web Performance
**Platforms:** All
**Detectable:** Heuristic — check for lazy loading patterns

#### Why This Matters
Loading everything upfront creates long initial wait times. Loading content progressively — critical content first, below-the-fold content on demand — creates the perception of instant loading even on slow connections.

#### The Principle
- Load **above-the-fold content first** (visible without scrolling)
- **Lazy-load** images, videos, and heavy components below the fold
- Use `loading="lazy"` on images (web) or equivalent platform APIs
- Paginate or infinite-scroll long lists instead of loading all items at once

---

### REQ-LOAD-003: Optimistic Updates

**Enforcement:** `CONSIDER` | UX Best Practice
**Platforms:** All
**Detectable:** Manual review only

#### Why This Matters
When a user likes a post, toggling the heart immediately (before the server confirms) feels instant. Waiting for the server round-trip before showing the change feels sluggish. Optimistic updates assume success and roll back on failure.

#### The Principle
- For low-risk actions (likes, bookmarks, read/unread), update the UI **immediately** and sync with the server in the background
- If the server request fails, revert the UI and show an error
- For high-risk actions (payments, deletions), DO NOT use optimistic updates — wait for confirmation
- Always provide feedback if the background sync fails

---

### REQ-LOAD-004: Prevent Layout Shift

**Enforcement:** `SHOULD` | Core Web Vitals (CLS)
**Platforms:** Web (primary)
**Detectable:** Yes — check for explicit dimensions on images and dynamic content

#### Why This Matters
Content that shifts after loading (text jumping down when an image loads, buttons moving when a banner appears) is disorienting and can cause mis-clicks. Cumulative Layout Shift (CLS) is a Core Web Vital that affects both UX and SEO.

#### The Principle
- Reserve space for images with explicit `width` and `height` attributes or `aspect-ratio` CSS
- Reserve space for ads, embeds, and dynamic content with minimum-height containers
- Use `font-display: swap` with a similar-sized fallback font to minimize text shift
- Inject new content below the viewport or use a "New items" indicator, not above current content

---

### REQ-LOAD-005: Error Recovery for Failed Loads

**Enforcement:** `MUST` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for error states on data-fetching components

#### Why This Matters
Network failures happen. APIs timeout. If a component fails to load and shows nothing (or a cryptic error), users are stuck. A retry mechanism gives them control.

#### The Rule
- Failed data loads MUST show an **error message with a retry action**
- The error message should be human-readable: "Couldn't load your messages. Check your connection and try again."
- Provide a "Retry" button — don't require page refresh
- Partial failures should not break the entire page (isolate component-level errors)

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-LOAD-001 | Skeleton Screens for Content Loading | SHOULD | Heuristic |
| REQ-LOAD-002 | Progressive Content Loading | SHOULD | Heuristic |
| REQ-LOAD-003 | Optimistic Updates | CONSIDER | Manual |
| REQ-LOAD-004 | Prevent Layout Shift | SHOULD | Yes |
| REQ-LOAD-005 | Error Recovery for Failed Loads | MUST | Heuristic |

## Platform Implementation Notes

- **Web:** Use `loading="lazy"` on images, `Suspense` boundaries in React, and CSS `content-visibility: auto` for off-screen content. Reserve explicit dimensions with `width`/`height` attributes or `aspect-ratio` CSS to prevent CLS.
- **iOS (SwiftUI):** Use `ProgressView()` for loading indicators, `redacted(reason: .placeholder)` for skeleton screens. Use `task {}` modifier for async data loading with automatic cancellation.
- **Android (Compose):** Use `CircularProgressIndicator` or `LinearProgressIndicator`. For skeletons, use `Modifier.placeholder()` from Accompanist. Use `LaunchedEffect` for async loading.
- **React Native:** Use `ActivityIndicator` for spinners, `FlatList` with `onEndReached` for progressive loading. Use `FastImage` for optimized image loading with placeholders.

## Further Reading

- [Web.dev: Optimize CLS](https://web.dev/articles/optimize-cls)
- [NNGroup: Skeleton Screens](https://www.nngroup.com/articles/skeleton-screens/)
- [Material Design 3: Progress Indicators](https://m3.material.io/components/progress-indicators/overview)
