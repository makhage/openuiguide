# Patterns: Performance UX

## Overview

Performance is a design decision. Every image without dimensions, every unoptimized font load, every animation on a layout property is a choice that degrades user experience. This spec covers the design-side causes of performance problems — the markup patterns, asset strategies, and rendering choices that directly impact Core Web Vitals (CLS, LCP, INP) and perceived performance. This is distinct from loading-and-performance (which covers skeleton screens, optimistic updates, and progressive loading patterns); this spec addresses the structural and asset decisions that cause performance problems in the first place.

## Requirements

### REQ-PERF-001: Image Dimension Attributes

**Enforcement:** `MUST` | Core Web Vitals (CLS)
**Platforms:** Web (primary), all platforms with image layout
**Detectable:** Yes — find `<img>` tags without `width`/`height` attributes or CSS `aspect-ratio`

#### Why This Matters
When an image loads without explicit dimensions, the browser allocates zero space for it. As the image downloads and its intrinsic size becomes known, surrounding content is pushed down — text jumps, buttons shift, users mis-click. This is Cumulative Layout Shift (CLS), a Core Web Vital that directly affects both user experience and search ranking.

#### The Rule
- All `<img>` elements MUST have explicit `width` and `height` attributes (matching the image's intrinsic or rendered aspect ratio)
- Alternatively, use CSS `aspect-ratio` on the image or its container to reserve space
- For responsive images, `width` and `height` set the aspect ratio — CSS can still control actual rendered size with `max-width: 100%; height: auto`
- Dynamically inserted images (from APIs, user uploads) MUST also reserve space, using a known aspect ratio or a fixed-height container

#### Creative Freedom
The specific dimensions are your choice — the requirement is only that *some* dimensions exist so the browser can reserve the correct space before the image loads.

---

### REQ-PERF-002: Lazy Loading Below-the-Fold Images

**Enforcement:** `SHOULD` | Web Performance (LCP)
**Platforms:** Web (primary), iOS, Android
**Detectable:** Yes — find `<img>` tags and check for `loading` attribute based on position in page

#### Why This Matters
Loading all images upfront — including those the user may never scroll to — delays the Largest Contentful Paint (LCP) by competing for bandwidth and CPU with critical above-the-fold content. Lazy loading defers off-screen images until the user approaches them, freeing resources for what matters first.

#### The Principle
- Images below the initial viewport SHOULD use `loading="lazy"` (web)
- Above-the-fold images (hero images, logos, first visible content) should NOT be lazy loaded — this delays LCP
- The LCP image specifically should use `loading="eager"` (or omit the attribute, which defaults to eager) and consider `fetchpriority="high"`
- For long pages with many images, lazy loading can save megabytes of unnecessary data transfer

#### Creative Freedom
The threshold for "below the fold" depends on your layout. The key principle is: eagerly load what the user sees immediately, defer everything else.

#### Platform Implementation Notes
- **Web:** Native `loading="lazy"` attribute on `<img>` and `<iframe>` elements
- **iOS:** Use `UIImage` with lazy initialization or `SDWebImage`/`Kingfisher` for deferred loading
- **Android:** Use `Coil` or `Glide` with placeholder support; Compose `AsyncImage` handles this natively
- **React Native:** `FlatList` with `windowSize` prop controls how many off-screen items are rendered

---

### REQ-PERF-003: Modern Image Formats

**Enforcement:** `SHOULD` | Web Performance
**Platforms:** Web (primary)
**Detectable:** Yes — check image file extensions for `.jpg`/`.png` without `.webp`/`.avif` alternatives

#### Why This Matters
JPEG and PNG are decades-old formats. WebP delivers 25-35% smaller files than JPEG at equivalent quality. AVIF delivers up to 50% smaller files. For image-heavy pages, switching formats can cut total page weight by megabytes — directly improving load times on every connection speed.

#### The Principle
- Serve images in WebP or AVIF format where browser support exists
- Use the `<picture>` element with `<source>` elements for format negotiation, falling back to JPEG/PNG
- Example pattern:
  ```html
  <picture>
    <source srcset="image.avif" type="image/avif">
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="Description" width="800" height="600">
  </picture>
  ```
- Image CDNs (Cloudinary, imgix, Vercel Image Optimization) can handle format negotiation automatically via `Accept` headers

#### Creative Freedom
Format selection is an optimization, not a design constraint. Visual quality should not be sacrificed — use appropriate quality settings for each format.

---

### REQ-PERF-004: Font Loading Strategy

**Enforcement:** `SHOULD` | Web Performance (LCP, CLS)
**Platforms:** Web (primary)
**Detectable:** Yes — check `@font-face` declarations for `font-display`, check for `<link rel="preload">` on font files

#### Why This Matters
Custom fonts without a loading strategy cause Flash of Invisible Text (FOIT) — the browser hides all text until the font downloads. On slow connections this means seconds of blank content. Even with `font-display: swap`, poorly matched fallback fonts cause layout shift when the custom font arrives and text reflows.

#### The Principle
- Use `font-display: swap` (shows fallback immediately, swaps when loaded) or `font-display: optional` (uses fallback if font is not cached, no swap)
- Preload critical fonts with `<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>`
- Limit to 2-3 font files total — each additional font file is a render-blocking request
- Use `woff2` format exclusively (best compression, universal browser support)
- Consider using CSS `size-adjust`, `ascent-override`, and `descent-override` on fallback fonts to minimize CLS during the swap

#### Creative Freedom
Font choice is a core design decision. This requirement is about *how* fonts load, not *which* fonts you choose. Any typeface can be loaded performantly.

---

### REQ-PERF-005: Render-Blocking Resources

**Enforcement:** `SHOULD` | Web Performance (LCP)
**Platforms:** Web
**Detectable:** Yes — find `<script>` tags without `async`/`defer` in `<head>`, check CSS loading strategy

#### Why This Matters
A synchronous `<script>` tag in the `<head>` blocks HTML parsing — the browser stops rendering the page until the script downloads and executes. A large CSS file blocks first paint entirely. These are the most common causes of slow LCP that are entirely within the developer's control.

#### The Principle
- Non-critical JavaScript SHOULD use `defer` (executes after HTML parsing, maintains order) or `async` (executes as soon as downloaded, no order guarantee)
- Inline critical CSS (above-the-fold styles) directly in `<head>` and load the full stylesheet asynchronously
- Move `<script>` tags to the end of `<body>` if `defer`/`async` is not feasible
- Avoid `@import` in CSS — each import is a sequential blocking request
- Use `<link rel="preload">` for critical resources that are discovered late (e.g., fonts referenced in CSS)

#### Creative Freedom
The visual design is unaffected — this is purely about *when* and *how* resources are delivered to the browser. The same styles and scripts execute; they just do not block rendering.

---

### REQ-PERF-006: Animation Performance Budget

**Enforcement:** `MUST` | Runtime Performance
**Platforms:** Web, iOS, Android
**Detectable:** Yes — check CSS transitions/animations for layout-triggering properties

#### Why This Matters
Animating `width`, `height`, `top`, `left`, `margin`, or `padding` forces the browser to recalculate layout on every frame — potentially affecting hundreds of other elements. This causes frame drops, janky scrolling, and unresponsive UI. Animating `transform`, `opacity`, and `filter` runs on the GPU compositor thread and does not trigger layout, achieving smooth 60fps.

#### The Rule
- Animations MUST only use GPU-composited properties: `transform`, `opacity`, `filter`
- Never animate `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, `padding`, `border-width`, or `font-size`
- Instead of animating `top`/`left`, use `transform: translate(x, y)`
- Instead of animating `width`/`height`, use `transform: scale(x, y)`
- Use `will-change` sparingly and only on elements that will actually animate — overuse wastes GPU memory
- Respect `prefers-reduced-motion: reduce` — disable or simplify animations for users who request it

#### Creative Freedom
Any visual effect is achievable with composited properties. Slides, fades, zooms, rotations, and complex choreography all work with `transform` and `opacity`. The constraint is on *which CSS properties* drive the animation, not on what the animation looks like.

#### Platform Implementation Notes
- **Web:** Use `transform` and `opacity` for CSS transitions/animations. Use Web Animations API for complex sequences.
- **iOS (SwiftUI):** `.animation()` and `withAnimation {}` use Core Animation (GPU-composited by default). Avoid animating frame-based layout in `GeometryReader`.
- **Android (Compose):** `animateFloatAsState`, `animateOffsetAsState` use RenderThread. Avoid recomposition-heavy animations.

---

### REQ-PERF-007: Viewport-Sized Hero Content

**Enforcement:** `SHOULD` | Web Performance (LCP)
**Platforms:** Web (primary)
**Detectable:** Yes — check hero image dimensions vs container/viewport size, check for `srcset`/`sizes` attributes

#### Why This Matters
Serving a 4000x3000px image for a container that renders at 1200x900px wastes bandwidth and decoding time. The browser must download and decode all those extra pixels even though they are never displayed. For hero images — which are often the LCP element — this directly delays the largest contentful paint.

#### The Principle
- Hero images/videos SHOULD be sized appropriately for the viewport they render in
- Use `srcset` with width descriptors and `sizes` attribute for responsive delivery:
  ```html
  <img
    src="hero-1200.jpg"
    srcset="hero-600.jpg 600w, hero-1200.jpg 1200w, hero-2000.jpg 2000w"
    sizes="100vw"
    alt="Hero image"
    width="2000" height="1000"
    fetchpriority="high"
  >
  ```
- For CSS background images, use media queries to serve different sizes
- Use `fetchpriority="high"` on the LCP image to signal importance to the browser

#### Creative Freedom
Image art direction and composition are entirely up to you. This is about serving the right *size* of your chosen image for each device, not about changing the image itself.

---

### REQ-PERF-008: Third-Party Script Impact

**Enforcement:** `SHOULD` | Web Performance (LCP, INP)
**Platforms:** Web
**Detectable:** Yes — count third-party script domains, check loading strategy

#### Why This Matters
Third-party scripts — analytics, chat widgets, social share buttons, A/B testing tools — are the most common cause of performance regressions that teams do not control. A single chat widget can add 500KB of JavaScript and block the main thread for hundreds of milliseconds. Each third-party origin requires DNS lookup, TCP connection, and TLS negotiation.

#### The Principle
- Third-party scripts SHOULD load after critical content renders
- Use `async` or `defer` on all third-party `<script>` tags
- Load non-essential widgets (chat, social, feedback) on user interaction rather than on page load (e.g., load chat widget when user clicks "Help")
- Use `requestIdleCallback` or `setTimeout` to defer analytics initialization
- Audit third-party scripts regularly — remove unused ones, measure their main-thread impact
- Use `<link rel="preconnect">` for third-party origins that are critical (e.g., your CDN)

#### Creative Freedom
Which third-party services you integrate is a product decision. This requirement is about *when* they load, not *whether* they exist.

---

### REQ-PERF-009: Interaction Responsiveness (INP)

**Enforcement:** `SHOULD` | Core Web Vitals (INP)
**Platforms:** Web (primary), all platforms
**Detectable:** Heuristic — find click/tap handlers with synchronous heavy operations

#### Why This Matters
Interaction to Next Paint (INP) measures how long the UI takes to visually respond after a user interaction. If a click handler runs a 500ms synchronous operation, the button stays "stuck" — no hover state change, no visual feedback, nothing. Users think the app is broken and click again, compounding the problem.

#### The Principle
- Click and tap handlers SHOULD respond visually in under 200ms
- Show immediate visual feedback (button state change, spinner, progress indicator) before starting heavy work
- Offload heavy computation to Web Workers to avoid blocking the main thread
- Break long synchronous tasks into smaller async chunks using `requestAnimationFrame`, `requestIdleCallback`, or `scheduler.yield()`
- Avoid layout thrashing in event handlers — batch DOM reads and writes separately

#### Creative Freedom
How you provide visual feedback is a design choice. The requirement is that *some* feedback appears quickly, not what form it takes.

#### Platform Implementation Notes
- **Web:** Use Web Workers for CPU-intensive tasks. Use `scheduler.yield()` (or `setTimeout(0)` as fallback) to break up long tasks.
- **iOS:** Use `Task {}` and `async/await` to keep the main thread responsive. Use `DispatchQueue.global()` for heavy computation.
- **Android:** Use `Dispatchers.Default` for computation, `Dispatchers.IO` for I/O. Never block `Dispatchers.Main`.

---

### REQ-PERF-010: Resource Hints for Critical Navigation

**Enforcement:** `CONSIDER` | Web Performance
**Platforms:** Web
**Detectable:** Yes — check for `<link rel="preconnect">` and `<link rel="prefetch">` elements

#### Why This Matters
Every new origin requires DNS resolution (~50ms), TCP connection (~50ms), and TLS negotiation (~100ms) before any data transfers. For critical third-party origins (CDNs, API servers, font providers), this 200ms+ latency is pure waste when you know the connection will be needed. Prefetching likely next-page resources makes subsequent navigations feel instant.

#### The Principle
- Use `<link rel="preconnect" href="https://cdn.example.com" crossorigin>` for origins used on the current page
- Use `<link rel="dns-prefetch" href="https://cdn.example.com">` as a fallback for broader browser support
- Use `<link rel="prefetch" href="/next-page.html">` for likely next-page navigations (e.g., the next step in a checkout flow)
- Limit preconnects to 2-4 critical origins — each preconnect consumes CPU and network resources
- For SPAs, programmatically prefetch route data and components on hover or when links enter the viewport

#### Creative Freedom
Navigation patterns and information architecture are design decisions. Resource hints are a transparent performance optimization that accelerates the navigation paths you have already designed.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-PERF-001 | Image Dimension Attributes | MUST | Yes |
| REQ-PERF-002 | Lazy Loading Below-the-Fold Images | SHOULD | Yes |
| REQ-PERF-003 | Modern Image Formats | SHOULD | Yes |
| REQ-PERF-004 | Font Loading Strategy | SHOULD | Yes |
| REQ-PERF-005 | Render-Blocking Resources | SHOULD | Yes |
| REQ-PERF-006 | Animation Performance Budget | MUST | Yes |
| REQ-PERF-007 | Viewport-Sized Hero Content | SHOULD | Yes |
| REQ-PERF-008 | Third-Party Script Impact | SHOULD | Yes |
| REQ-PERF-009 | Interaction Responsiveness (INP) | SHOULD | Heuristic |
| REQ-PERF-010 | Resource Hints for Critical Navigation | CONSIDER | Yes |

## Platform Implementation Notes

- **Web:** This spec is primarily web-focused. Use Lighthouse, PageSpeed Insights, and Chrome DevTools Performance panel to measure CLS, LCP, and INP. The `web-vitals` JavaScript library provides real-user measurement. All requirements map directly to HTML attributes, CSS properties, and resource loading strategies.
- **iOS (SwiftUI/UIKit):** Image sizing is handled by `UIImageView` constraints and `AsyncImage` frames. Font loading is managed by the system. Animation performance is generally GPU-composited via Core Animation, but avoid animating layout constraints directly. Use Instruments (Time Profiler, Core Animation) to identify frame drops.
- **Android (Compose/Views):** Use `Coil` or `Glide` for optimized image loading with size constraints. System fonts avoid loading issues; custom fonts should be bundled. Use `RenderThread` animations via Compose animation APIs. Use Android Studio Profiler to identify jank.
- **React Native:** Use `FastImage` for optimized image loading with cache control. Use `InteractionManager.runAfterInteractions()` to defer heavy work. Use `useNativeDriver: true` on `Animated` values to run animations on the native thread.

## Further Reading

- [web.dev: Core Web Vitals](https://web.dev/articles/vitals)
- [web.dev: Optimize CLS](https://web.dev/articles/optimize-cls)
- [web.dev: Optimize LCP](https://web.dev/articles/optimize-lcp)
- [web.dev: Optimize INP](https://web.dev/articles/optimize-inp)
- [web.dev: Use Modern Image Formats](https://web.dev/articles/choose-the-right-image-format)
- [web.dev: Optimize Web Fonts](https://web.dev/articles/optimize-webfont-loading)
- [web.dev: Render-Blocking Resources](https://web.dev/articles/render-blocking-resources)
- [Chrome Developers: Animations and Performance](https://developer.chrome.com/docs/devtools/performance)
- [web.dev: Efficiently Load Third-Party JavaScript](https://web.dev/articles/efficiently-load-third-party-javascript)
- [web.dev: Preconnect to Required Origins](https://web.dev/articles/uses-rel-preconnect)
