# Image & Media Treatment Library

Production-ready CSS patterns for premium image presentation. Use when running `/design-review --redesign` or `/design-review --enhance images` to elevate how images are displayed, masked, revealed, and interacted with.

---

## 1. Duotone Filter

Converts images to a two-tone color scheme using blend modes and a pseudo-element overlay.

### Warm Duotone (coral/navy)
```css
.duotone-warm {
  position: relative;
  display: inline-block;
  overflow: hidden;
}
.duotone-warm img {
  display: block;
  width: 100%;
  filter: grayscale(100%) contrast(1.1);
}
.duotone-warm::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #ff6b6b, #1a1a4e);
  mix-blend-mode: color;
  pointer-events: none;
}
```

### Cool Duotone (teal/purple)
```css
.duotone-cool img { filter: grayscale(100%) contrast(1.2); }
.duotone-cool::after {
  background: linear-gradient(135deg, #00b4d8, #6c2eb9);
  mix-blend-mode: color;
}
```

```html
<div class="duotone-warm"><img src="photo.jpg" alt="..."></div>
```

**Use for:** Hero images, editorial sections, brand-heavy pages. **Responsive:** Works at all sizes; no changes needed.

---

## 2. Clip-Path Masks

Non-rectangular image shapes using `clip-path`.

```css
/* Diagonal cut */
.clip-diagonal { clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); }

/* Hexagon */
.clip-hex { clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }

/* Organic blob */
.clip-blob { clip-path: path("M 180,30 C 280,10 350,90 340,180 C 330,270 260,340 170,340 C 80,340 10,260 20,170 C 30,80 80,50 180,30 Z"); }

/* Circle with notch */
.clip-notch { clip-path: circle(45% at 50% 50%); }

.clipped-img {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: clip-path 0.5s ease;
}
```

```html
<img class="clipped-img clip-hex" src="photo.jpg" alt="...">
```

**Use for:** Team photos, feature sections, creative portfolios. **Responsive:** blob `path()` values use fixed coords -- consider viewport-relative sizing or SVG `clipPath` for fluid layouts.

---

## 3. Hover Zoom & Reveal

Smooth zoom with info overlay on hover.

```css
.hover-zoom {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}
.hover-zoom img {
  display: block;
  width: 100%;
  transition: transform 400ms ease;
}
.hover-zoom:hover img {
  transform: scale(1.08);
}
.hover-zoom .overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 400ms ease;
}
.hover-zoom:hover .overlay {
  opacity: 1;
}
.hover-zoom .overlay p {
  color: #fff;
  margin: 0;
  transform: translateY(8px);
  transition: transform 400ms ease;
}
.hover-zoom:hover .overlay p {
  transform: translateY(0);
}
```

```html
<div class="hover-zoom">
  <img src="photo.jpg" alt="...">
  <div class="overlay"><p>Project description</p></div>
</div>
```

**Use for:** Portfolio grids, product cards, team directories. **Responsive:** On touch devices, consider showing the overlay by default or using `:focus-within` as a fallback.

---

## 4. Parallax Image Scrolling

### Classic (background-attachment)
```css
.parallax-classic {
  height: 60vh;
  background: url("hero.jpg") center/cover no-repeat fixed;
}
```

### Modern (transform-based, GPU-accelerated)
```css
.parallax-container {
  height: 60vh;
  overflow: hidden;
  position: relative;
}
.parallax-container img {
  position: absolute;
  inset: -20% 0;
  width: 100%;
  height: 140%;
  object-fit: cover;
  will-change: transform;
}
```
```js
// Performant scroll handler
const el = document.querySelector('.parallax-container img');
window.addEventListener('scroll', () => {
  const rate = window.scrollY * 0.3;
  el.style.transform = `translate3d(0, ${rate}px, 0)`;
}, { passive: true });
```

**Use for:** Hero sections, section dividers, storytelling pages. **Responsive:** `background-attachment: fixed` is ignored on iOS Safari. Always use the transform approach for mobile.

---

## 5. Image Reveal Animation

### Wipe from Left
```css
.wipe-reveal {
  position: relative;
  overflow: hidden;
}
.wipe-reveal img {
  display: block;
  width: 100%;
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.8s cubic-bezier(0.77, 0, 0.175, 1);
}
.wipe-reveal.is-visible img {
  clip-path: inset(0 0 0 0);
}
```

### Curtain from Center
```css
.curtain-reveal img {
  clip-path: inset(0 50% 0 50%);
  transition: clip-path 0.7s ease-out;
}
.curtain-reveal.is-visible img {
  clip-path: inset(0 0 0 0);
}
```

### Fade-Blur-In
```css
.fade-blur img {
  opacity: 0;
  filter: blur(12px);
  transition: opacity 0.6s ease, filter 0.6s ease;
}
.fade-blur.is-visible img {
  opacity: 1;
  filter: blur(0);
}
```

### IntersectionObserver trigger (shared for all reveal types)
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.wipe-reveal, .curtain-reveal, .fade-blur')
  .forEach(el => observer.observe(el));
```

```html
<div class="wipe-reveal"><img src="photo.jpg" alt="..."></div>
```

**Use for:** Long-scroll pages, portfolios, case studies. **Responsive:** Works consistently across breakpoints. Consider `prefers-reduced-motion` to disable animation for accessibility.

---

## 6. Aspect Ratio Image Grid

Uniform grid regardless of source image dimensions.

```css
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}
.image-grid figure {
  margin: 0;
  overflow: hidden;
  border-radius: 8px;
}
.image-grid img {
  display: block;
  width: 100%;
  object-fit: cover;
}

/* Aspect ratio variants */
.ratio-16-9 img { aspect-ratio: 16 / 9; }
.ratio-4-3 img  { aspect-ratio: 4 / 3; }
.ratio-1-1 img  { aspect-ratio: 1 / 1; }
.ratio-3-4 img  { aspect-ratio: 3 / 4; }
```

```html
<div class="image-grid ratio-16-9">
  <figure><img src="a.jpg" alt="..."></figure>
  <figure><img src="b.jpg" alt="..."></figure>
  <figure><img src="c.jpg" alt="..."></figure>
</div>
```

**Use for:** Blog grids, product listings, galleries. **Responsive:** `auto-fill` handles column count. Switch to a single column below 480px with `grid-template-columns: 1fr`.

---

## 7. Image Hover Caption

Caption slides up from the bottom with a gradient backdrop.

```css
.caption-card {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}
.caption-card img {
  display: block;
  width: 100%;
  transition: transform 400ms ease;
}
.caption-card:hover img {
  transform: scale(1.04);
}
.caption-card figcaption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 1rem 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.75), transparent);
  color: #fff;
  transform: translateY(100%);
  transition: transform 400ms ease;
}
.caption-card:hover figcaption {
  transform: translateY(0);
}
.caption-card figcaption h3 { margin: 0 0 0.25rem; font-size: 1.1rem; }
.caption-card figcaption p  { margin: 0; font-size: 0.85rem; opacity: 0.85; }
```

```html
<figure class="caption-card">
  <img src="photo.jpg" alt="...">
  <figcaption>
    <h3>Title</h3>
    <p>Short description of the image.</p>
  </figcaption>
</figure>
```

**Use for:** Portfolio items, team members, product showcases. **Responsive:** On touch devices, show captions by default or toggle via tap using `:focus-within`.

---

## 8. Gradient Overlay on Images

Three overlay patterns for placing readable text on images.

### Bottom-to-Top Dark
```css
.overlay-bottom {
  position: relative;
}
.overlay-bottom::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%);
  pointer-events: none;
}
```

### Full Color Tint
```css
.overlay-tint::after {
  background: rgba(29, 78, 137, 0.55);
  mix-blend-mode: multiply;
}
```

### Mesh Gradient
```css
.overlay-mesh::after {
  background:
    radial-gradient(ellipse at 20% 80%, rgba(255,107,107,0.5) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(108,46,185,0.4) 0%, transparent 50%),
    rgba(0,0,0,0.3);
}
```

All overlays use the same base structure:
```html
<div class="overlay-bottom">
  <img src="bg.jpg" alt="...">
  <div class="overlay-content">
    <h2>Heading</h2>
    <p>Text is readable on any image.</p>
  </div>
</div>
```

**Use for:** Hero banners, CTA sections, card headers. **Responsive:** Gradient stops work proportionally at all sizes.

---

## 9. Image Border & Frame Effects

### Polaroid
```css
.frame-polaroid {
  background: #fff;
  padding: 0.75rem 0.75rem 2.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: rotate(-2deg);
}
.frame-polaroid img { display: block; width: 100%; }
```

### Rounded with Shadow
```css
.frame-rounded img {
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.18);
}
```

### Offset Border
```css
.frame-offset {
  position: relative;
  display: inline-block;
}
.frame-offset img { display: block; position: relative; z-index: 1; }
.frame-offset::after {
  content: "";
  position: absolute;
  inset: 8px -8px -8px 8px;
  border: 2px solid currentColor;
  z-index: 0;
}
```

### Dotted Artistic Frame
```css
.frame-dotted {
  padding: 6px;
  border: 3px dotted #888;
  border-radius: 4px;
}
.frame-dotted img { display: block; width: 100%; }
```

```html
<div class="frame-polaroid"><img src="photo.jpg" alt="..."></div>
```

**Use for:** Testimonials (polaroid), profiles (rounded), creative/agency sites (offset), editorial (dotted). **Responsive:** Polaroid padding can be expressed in `em` to scale with font size.

---

## 10. Before/After Image Slider (CSS Only)

Uses the CSS `resize` property to create a draggable comparison.

```css
.ba-slider {
  position: relative;
  overflow: hidden;
  max-width: 700px;
}
.ba-slider img {
  display: block;
  width: 100%;
}
/* "After" image sits behind */
.ba-after {
  position: absolute;
  inset: 0;
}
/* "Before" image is in a resizable container */
.ba-before {
  position: absolute;
  inset: 0;
  width: 50%;
  overflow: hidden;
  resize: horizontal;
  max-width: 100%;
  min-width: 0;
  cursor: ew-resize;
}
.ba-before img {
  width: 100cqw; /* match parent's natural width */
  max-width: none;
  display: block;
}
/* Divider line */
.ba-before::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 3px;
  height: 100%;
  background: #fff;
  box-shadow: 0 0 6px rgba(0,0,0,0.4);
}
/* Hide the default resize handle and add a custom grip */
.ba-before::-webkit-resizer { display: none; }
.ba-before::before {
  content: "⟷";
  position: absolute;
  right: -18px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 36px;
  height: 36px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  font-size: 1rem;
  pointer-events: none;
}
```

```html
<div class="ba-slider">
  <img class="ba-after" src="after.jpg" alt="After">
  <div class="ba-before">
    <img src="before.jpg" alt="Before">
  </div>
</div>
```

**Use for:** Design comparisons, retouching showcases, product transformations. **Responsive:** Set `max-width: 100%` on the container. Touch support for `resize` varies -- consider a JS fallback for mobile.

---

## Selection Guide by Site Type

| Site Type | Recommended Treatments |
|---|---|
| Portfolio / Agency | Hover Zoom, Clip-Path Masks, Image Reveal, Before/After |
| E-commerce | Aspect Ratio Grid, Hover Caption, Rounded Frames |
| Editorial / Blog | Duotone Filter, Gradient Overlay, Parallax Scrolling |
| SaaS / Product | Gradient Overlay, Aspect Ratio Grid, Fade-Blur Reveal |
| Photography | Before/After Slider, Hover Zoom, Polaroid Frames |
| Corporate | Rounded with Shadow, Bottom Gradient, Aspect Ratio Grid |

### Accessibility Checklist
- Always include descriptive `alt` text on every `<img>`.
- Wrap hover-only reveals with `:focus-within` so keyboard users can trigger them.
- Respect `prefers-reduced-motion: reduce` -- disable parallax, reveals, and zoom transitions.
- Ensure overlay text meets WCAG AA contrast (4.5:1 minimum) against the gradient backdrop.
