# SVG Graphics & Decorative Elements Library

Production-ready inline SVG and CSS for decorative graphics used in enhance mode.

---

## 1. Section Dividers

### Wave Divider (Top)

```html
<div class="divider divider--wave-top">
  <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z" fill="var(--divider-fill, currentColor)"/>
  </svg>
</div>
```

### Wave Divider (Bottom)

```html
<div class="divider divider--wave-bottom">
  <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,56 C360,0 720,120 1080,56 C1260,24 1380,40 1440,56 L1440,0 L0,0 Z" fill="var(--divider-fill, currentColor)"/>
  </svg>
</div>
```

### Angled / Diagonal Divider

```html
<div class="divider divider--angle">
  <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="0,80 1440,0 1440,80" fill="var(--divider-fill, currentColor)"/>
  </svg>
</div>
```

### Curved Divider

```html
<div class="divider divider--curve">
  <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,100 Q720,-40 1440,100 Z" fill="var(--divider-fill, currentColor)"/>
  </svg>
</div>
```

### Zigzag Divider

```html
<div class="divider divider--zigzag">
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <polyline points="0,60 60,0 120,60 180,0 240,60 300,0 360,60 420,0 480,60 540,0 600,60 660,0 720,60 780,0 840,60 900,0 960,60 1020,0 1080,60 1140,0 1200,60 1260,0 1320,60 1380,0 1440,60" fill="var(--divider-fill, currentColor)"/>
  </svg>
</div>
```

### Mountain / Peaks Divider

```html
<div class="divider divider--peaks">
  <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="0,120 200,40 400,90 600,10 800,70 1000,20 1200,80 1440,30 1440,120" fill="var(--divider-fill, currentColor)"/>
  </svg>
</div>
```

### Divider CSS (shared)

```css
.divider {
  position: absolute;
  left: 0;
  width: 100%;
  line-height: 0;          /* removes gap below inline SVG */
  overflow: hidden;
  --divider-fill: #f8f9fa; /* override per section */
}
.divider svg {
  display: block;
  width: 100%;
  height: auto;
  min-height: 40px;
}
.divider--wave-top,
.divider--angle,
.divider--curve,
.divider--zigzag,
.divider--peaks   { bottom: -1px; }
.divider--wave-bottom { top: -1px; }
```

**Usage:** Place inside a `position: relative` section. Set `--divider-fill` to the background color of the *next* section so the divider visually bridges the two.

**Responsive note:** `preserveAspectRatio="none"` stretches the wave to any viewport width. Adjust the SVG `viewBox` height or add `max-height` in CSS to control divider prominence on small screens.

---

## 2. Decorative Blobs

### Blob 1 — Rounded Organic Shape

```html
<svg class="blob blob--1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path d="M44,-56 C62,-42 82,-30 86,-13 C90,4 78,26 60,42 C42,58 18,68 -8,70 C-34,72 -62,66 -78,48 C-94,30 -98,0 -86,-24 C-74,-48 -46,-66 -22,-70 C2,-74 26,-70 44,-56 Z"
    transform="translate(100,100)"
    fill="var(--blob-color, currentColor)">
    <animate attributeName="d" dur="12s" repeatCount="indefinite" values="
      M44,-56 C62,-42 82,-30 86,-13 C90,4 78,26 60,42 C42,58 18,68 -8,70 C-34,72 -62,66 -78,48 C-94,30 -98,0 -86,-24 C-74,-48 -46,-66 -22,-70 C2,-74 26,-70 44,-56 Z;
      M52,-48 C68,-32 76,-16 72,2 C68,20 52,40 32,54 C12,68 -12,76 -36,72 C-60,68 -84,52 -90,30 C-96,8 -84,-20 -66,-40 C-48,-60 -24,-72 -2,-74 C20,-76 36,-64 52,-48 Z;
      M44,-56 C62,-42 82,-30 86,-13 C90,4 78,26 60,42 C42,58 18,68 -8,70 C-34,72 -62,66 -78,48 C-94,30 -98,0 -86,-24 C-74,-48 -46,-66 -22,-70 C2,-74 26,-70 44,-56 Z"/>
  </path>
</svg>
```

### Blob 2 — Wide Horizontal

```html
<svg class="blob blob--2" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path d="M38,-50 C56,-38 78,-28 84,-10 C90,8 80,34 62,50 C44,66 18,72 -10,72 C-38,72 -68,66 -82,46 C-96,26 -94,-8 -78,-32 C-62,-56 -32,-70 -6,-72 C20,-74 20,-62 38,-50 Z"
    transform="translate(100,100)"
    fill="var(--blob-color, currentColor)">
    <animate attributeName="d" dur="15s" repeatCount="indefinite" values="
      M38,-50 C56,-38 78,-28 84,-10 C90,8 80,34 62,50 C44,66 18,72 -10,72 C-38,72 -68,66 -82,46 C-96,26 -94,-8 -78,-32 C-62,-56 -32,-70 -6,-72 C20,-74 20,-62 38,-50 Z;
      M48,-44 C64,-28 72,-8 68,14 C64,36 48,60 26,68 C4,76 -24,68 -46,52 C-68,36 -84,12 -82,-14 C-80,-40 -60,-68 -36,-72 C-12,-76 32,-60 48,-44 Z;
      M38,-50 C56,-38 78,-28 84,-10 C90,8 80,34 62,50 C44,66 18,72 -10,72 C-38,72 -68,66 -82,46 C-96,26 -94,-8 -78,-32 C-62,-56 -32,-70 -6,-72 C20,-74 20,-62 38,-50 Z"/>
  </path>
</svg>
```

### Blob 3 — Compact Circular

```html
<svg class="blob blob--3" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path d="M36,-42 C50,-30 66,-18 68,-2 C70,14 58,34 42,48 C26,62 6,70 -16,68 C-38,66 -62,54 -72,34 C-82,14 -78,-14 -62,-34 C-46,-54 -18,-66 4,-66 C26,-66 22,-54 36,-42 Z"
    transform="translate(100,100)"
    fill="var(--blob-color, currentColor)">
    <animate attributeName="d" dur="10s" repeatCount="indefinite" values="
      M36,-42 C50,-30 66,-18 68,-2 C70,14 58,34 42,48 C26,62 6,70 -16,68 C-38,66 -62,54 -72,34 C-82,14 -78,-14 -62,-34 C-46,-54 -18,-66 4,-66 C26,-66 22,-54 36,-42 Z;
      M42,-38 C56,-24 64,-6 60,14 C56,34 40,56 20,64 C0,72 -24,66 -44,50 C-64,34 -80,8 -76,-18 C-72,-44 -48,-70 -24,-72 C0,-74 28,-52 42,-38 Z;
      M36,-42 C50,-30 66,-18 68,-2 C70,14 58,34 42,48 C26,62 6,70 -16,68 C-38,66 -62,54 -72,34 C-82,14 -78,-14 -62,-34 C-46,-54 -18,-66 4,-66 C26,-66 22,-54 36,-42 Z"/>
  </path>
</svg>
```

### Blob CSS

```css
.blob {
  position: absolute;
  width: clamp(200px, 30vw, 500px);
  height: auto;
  opacity: 0.12;
  filter: blur(40px);
  z-index: 0;
  pointer-events: none;
  --blob-color: #6366f1;
}
.blob--1 { top: -10%; right: -5%; }
.blob--2 { bottom: -8%; left: -8%; }
.blob--3 { top: 40%; left: 50%; }
```

**When to use:** Background decoration behind hero sections or feature grids. Parent must be `position: relative; overflow: hidden`.

**Responsive note:** `clamp()` on width keeps blobs proportional. Reduce `opacity` or hide entirely below 640 px if they cause layout overflow.

---

## 3. Animated SVG Icons

### Stroke Draw Animation

```html
<svg class="icon-draw" width="48" height="48" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2 L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 Z"/>
</svg>
```

```css
.icon-draw path {
  stroke-dasharray: 80;
  stroke-dashoffset: 80;
  animation: draw 1.4s ease-out forwards;
}
@keyframes draw {
  to { stroke-dashoffset: 0; }
}
```

**Tip:** Measure path length with `getTotalLength()` and set `stroke-dasharray` to that value.

### Bounce on Hover

```css
.icon-bounce {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.icon-bounce:hover {
  transform: scale(1.2);
}
```

### Color Fill on Hover

```css
.icon-fill {
  fill: transparent;
  stroke: currentColor;
  transition: fill 0.3s ease, stroke 0.3s ease;
}
.icon-fill:hover {
  fill: currentColor;
  stroke: currentColor;
}
```

### Rotate / Spin (Loading Indicator)

```html
<svg class="icon-spin" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
  <path d="M12 2 A10 10 0 0 1 22 12" stroke-linecap="round"/>
</svg>
```

```css
.icon-spin {
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

**When to use:** Stroke draw for on-scroll reveals. Bounce for interactive icon buttons. Spin for async loading states.

---

## 4. Geometric Background Patterns

### Diagonal Lines

```html
<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute">
  <defs>
    <pattern id="diag-lines" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" stroke-width="1" stroke-opacity="0.1"/>
    </pattern>
  </defs>
</svg>
```

```css
.bg-diag-lines {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4' stroke='%23000' stroke-width='0.5' opacity='0.08'/%3E%3C/svg%3E");
}
```

### Honeycomb / Hexagon Grid

```css
.bg-honeycomb {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0 0l28 16v34L28 100 0 84V50l28 16z' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.06'/%3E%3C/svg%3E");
}
```

### Isometric Grid

```css
.bg-isometric {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='69'%3E%3Cpath d='M20 0 L40 11.5 L40 34.5 L20 46 L0 34.5 L0 11.5 Z' fill='none' stroke='%23000' stroke-width='0.4' opacity='0.06'/%3E%3Cpath d='M20 23 L40 34.5 M20 23 L0 34.5 M20 23 L20 0' fill='none' stroke='%23000' stroke-width='0.4' opacity='0.04'/%3E%3C/svg%3E");
}
```

### Cross / Plus Pattern

```css
.bg-cross {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath d='M10 6v8M6 10h8' stroke='%23000' stroke-width='0.6' opacity='0.08' stroke-linecap='round'/%3E%3C/svg%3E");
}
```

**Usage:** Apply the class to any container. Patterns tile seamlessly at any size.

**Theming:** Replace `%23000` (URL-encoded `#000`) with your desired hex color in the data URI. For dynamic theming, use the inline `<svg>` + `<pattern>` approach with `fill="currentColor"` instead.

**Responsive note:** Pattern density stays consistent regardless of viewport because `patternUnits="userSpaceOnUse"` works in absolute pixels.

---

## 5. Decorative Line Art

### Horizontal Rule with Centered Diamond

```html
<div class="hr-ornament">
  <svg viewBox="0 0 400 20" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="10" x2="170" y2="10" stroke="var(--ornament-color, currentColor)" stroke-width="1" opacity="0.3"/>
    <rect x="190" y="4" width="12" height="12" transform="rotate(45 196 10)" fill="none" stroke="var(--ornament-color, currentColor)" stroke-width="1.5"/>
    <line x1="222" y1="10" x2="400" y2="10" stroke="var(--ornament-color, currentColor)" stroke-width="1" opacity="0.3"/>
  </svg>
</div>
```

```css
.hr-ornament {
  width: 100%;
  max-width: 480px;
  margin: 2rem auto;
  --ornament-color: #64748b;
}
.hr-ornament svg { width: 100%; height: auto; }
```

### Corner Decorations for Cards

```html
<!-- Place inside a position:relative card -->
<svg class="corner-deco corner-deco--tl" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 48 L0 12 Q0 0 12 0 L48 0" stroke="var(--deco-stroke, currentColor)" stroke-width="1.5" opacity="0.3"/>
  <circle cx="4" cy="4" r="2" fill="var(--deco-stroke, currentColor)" opacity="0.4"/>
</svg>
```

```css
.corner-deco {
  position: absolute;
  pointer-events: none;
}
.corner-deco--tl { top: 0; left: 0; }
.corner-deco--tr { top: 0; right: 0; transform: scaleX(-1); }
.corner-deco--bl { bottom: 0; left: 0; transform: scaleY(-1); }
.corner-deco--br { bottom: 0; right: 0; transform: scale(-1); }
```

### Bracket / Frame Border

```html
<svg class="frame-border" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 0 L0 0 L0 20" stroke="var(--frame-color, currentColor)" stroke-width="1.5"/>
  <path d="M180 0 L200 0 L200 20" stroke="var(--frame-color, currentColor)" stroke-width="1.5"/>
  <path d="M0 180 L0 200 L20 200" stroke="var(--frame-color, currentColor)" stroke-width="1.5"/>
  <path d="M200 180 L200 200 L180 200" stroke="var(--frame-color, currentColor)" stroke-width="1.5"/>
</svg>
```

```css
.frame-border {
  position: absolute;
  inset: -4px;
  width: calc(100% + 8px);
  height: calc(100% + 8px);
  pointer-events: none;
  --frame-color: #94a3b8;
}
```

**When to use:** Diamond rule for separating text sections (testimonials, quotes). Corner decorations for premium or editorial card layouts. Frame borders for featured content.

---

## 6. Gradient Mesh SVGs

### Multi-Stop Radial Gradient Background

```html
<svg class="gradient-mesh" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="gm1" cx="20%" cy="30%" r="50%">
      <stop offset="0%" stop-color="var(--mesh-c1, #6366f1)" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="var(--mesh-c1, #6366f1)" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gm2" cx="70%" cy="60%" r="50%">
      <stop offset="0%" stop-color="var(--mesh-c2, #ec4899)" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="var(--mesh-c2, #ec4899)" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gm3" cx="50%" cy="80%" r="40%">
      <stop offset="0%" stop-color="var(--mesh-c3, #06b6d4)" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="var(--mesh-c3, #06b6d4)" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="var(--mesh-bg, #0f172a)"/>
  <rect width="100%" height="100%" fill="url(#gm1)"/>
  <rect width="100%" height="100%" fill="url(#gm2)"/>
  <rect width="100%" height="100%" fill="url(#gm3)"/>
</svg>
```

### Animated Gradient Mesh (Blurred Circles)

```html
<svg class="gradient-mesh gradient-mesh--animated" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="mesh-blur">
      <feGaussianBlur stdDeviation="80"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="var(--mesh-bg, #0f172a)"/>
  <g filter="url(#mesh-blur)">
    <circle cx="200" cy="180" r="200" fill="var(--mesh-c1, #6366f1)" opacity="0.7">
      <animate attributeName="cx" values="200;350;200" dur="20s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="180;300;180" dur="25s" repeatCount="indefinite"/>
    </circle>
    <circle cx="600" cy="350" r="180" fill="var(--mesh-c2, #ec4899)" opacity="0.5">
      <animate attributeName="cx" values="600;450;600" dur="22s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="350;200;350" dur="18s" repeatCount="indefinite"/>
    </circle>
    <circle cx="400" cy="500" r="160" fill="var(--mesh-c3, #06b6d4)" opacity="0.6">
      <animate attributeName="cx" values="400;550;400" dur="24s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="500;350;500" dur="20s" repeatCount="indefinite"/>
    </circle>
  </g>
</svg>
```

### Gradient Mesh CSS

```css
.gradient-mesh {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
```

**When to use:** Static mesh for hero backgrounds or full-page backdrops. Animated mesh for landing pages and marketing sites where subtle motion adds atmosphere. Prefer `prefers-reduced-motion: reduce` to pause the SMIL animations via CSS.

```css
@media (prefers-reduced-motion: reduce) {
  .gradient-mesh--animated circle animate { /* SMIL cannot be paused via CSS */ }
  /* Fallback: hide animated version, show static version */
  .gradient-mesh--animated { display: none; }
}
```

**Responsive note:** `preserveAspectRatio="xMidYMid slice"` ensures the mesh always covers the viewport. Use `position: fixed` for full-viewport backgrounds so it does not scroll with content. Use `position: absolute` with `overflow: hidden` on the parent to confine it to a single section.
