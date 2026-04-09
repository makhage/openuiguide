# Layout Patterns Library

Production-ready CSS layout patterns for the enhance mode. Each pattern includes complete CSS, HTML structure, usage guidance, and responsive behavior.

---

## 1. Bento Grid Layout

A modern Apple-style bento grid with mixed-size cards arranged on a named-area grid.

**When to use:** Landing pages, dashboards, feature showcases, portfolio sites.

```html
<div class="bento-grid">
  <div class="bento-cell bento-large">Featured</div>
  <div class="bento-cell">Item 2</div>
  <div class="bento-cell">Item 3</div>
  <div class="bento-cell bento-wide">Item 4</div>
  <div class="bento-cell bento-tall">Item 5</div>
  <div class="bento-cell">Item 6</div>
</div>
```

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    "large large item2 item3"
    "item4 item4 tall  item6";
  gap: 16px;
  padding: 16px;
}

.bento-cell {
  background: #f5f5f7;
  border-radius: 16px;
  padding: 32px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.bento-cell:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.bento-large { grid-area: large; }            /* 2x1 */
.bento-wide  { grid-area: item4; }            /* 2x1 */
.bento-tall  { grid-area: tall; }             /* 1x2 — spans rows if needed */
.bento-cell:nth-child(2) { grid-area: item2; }
.bento-cell:nth-child(3) { grid-area: item3; }
.bento-cell:nth-child(6) { grid-area: item6; }

@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "large large"
      "item2 item3"
      "item4 item4"
      "tall  item6";
  }
}

@media (max-width: 480px) {
  .bento-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
      "large" "item2" "item3"
      "item4" "tall"  "item6";
  }
}
```

---

## 2. Asymmetric Two-Column Layout

Content paired with a visual in a 60/40 split that alternates direction between sections.

**When to use:** Feature sections, about pages, case studies, product pages.

```html
<section class="asym-section">
  <div class="asym-content">...</div>
  <div class="asym-visual"><img src="..." alt="..." /></div>
</section>
<section class="asym-section">
  <div class="asym-content">...</div>
  <div class="asym-visual"><img src="..." alt="..." /></div>
</section>
```

```css
.asym-section {
  display: grid;
  grid-template-columns: 1.5fr 1fr; /* 60 / 40 */
  gap: 48px;
  align-items: center;
  padding: 80px 5%;
}

.asym-section:nth-child(even) {
  grid-template-columns: 1fr 1.5fr;
  direction: rtl;
}

.asym-section:nth-child(even) > * {
  direction: ltr;
}

.asym-content {
  max-width: 560px;
}

.asym-visual img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .asym-section,
  .asym-section:nth-child(even) {
    grid-template-columns: 1fr;
    direction: ltr;
    gap: 32px;
    padding: 48px 5%;
  }
}
```

---

## 3. Overlapping Section Design

Sections that overlap their neighbors with negative margins, creating visual depth and layering.

**When to use:** Landing pages, marketing sites, creative portfolios — anywhere you want strong visual depth.

```html
<section class="overlap-section overlap-section--light">...</section>
<section class="overlap-section overlap-section--dark">...</section>
<section class="overlap-section overlap-section--light">...</section>
```

```css
.overlap-section {
  position: relative;
  padding: 96px 5% 96px;
  z-index: 1;
}

.overlap-section + .overlap-section {
  margin-top: -60px;
  border-radius: 24px 24px 0 0;
  z-index: 2;
}

.overlap-section + .overlap-section + .overlap-section {
  z-index: 3;
}

.overlap-section--light {
  background: #ffffff;
}

.overlap-section--dark {
  background: #1a1a2e;
  color: #f0f0f0;
}

/* Breakout card — extends beyond its container */
.overlap-card {
  position: relative;
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  margin: -24px -12px 0;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.08);
  z-index: 4;
}

@media (max-width: 768px) {
  .overlap-section + .overlap-section {
    margin-top: -32px;
    border-radius: 16px 16px 0 0;
  }

  .overlap-card {
    margin: -16px 0 0;
  }
}
```

---

## 4. Magazine / Editorial Layout

Multi-column article layout with drop caps, pull quotes, and images spanning columns.

**When to use:** Blog posts, long-form articles, editorial content, documentation with visual emphasis.

```html
<article class="editorial">
  <p class="editorial-dropcap">First paragraph content...</p>
  <p>Regular paragraph...</p>
  <blockquote class="pull-quote">
    <p>A striking pull quote that spans both columns.</p>
  </blockquote>
  <p>More content...</p>
  <figure class="editorial-feature">
    <img src="..." alt="..." />
    <figcaption>Caption text</figcaption>
  </figure>
  <p>Continuing content...</p>
</article>
```

```css
.editorial {
  column-count: 2;
  column-gap: 48px;
  column-rule: 1px solid #e0e0e0;
  max-width: 960px;
  margin: 0 auto;
  padding: 64px 24px;
  font-size: 1.125rem;
  line-height: 1.75;
}

.editorial p {
  margin-bottom: 1.5em;
  break-inside: avoid;
}

.editorial-dropcap::first-letter {
  float: left;
  font-size: 4.5em;
  line-height: 0.8;
  padding-right: 12px;
  padding-top: 6px;
  font-weight: 700;
  color: #1a1a2e;
}

.pull-quote {
  column-span: all;
  margin: 48px 0;
  padding: 32px 48px;
  border-left: 4px solid #1a1a2e;
  font-size: 1.75rem;
  font-style: italic;
  line-height: 1.4;
  color: #333;
  break-inside: avoid;
}

.editorial-feature {
  column-span: all;
  margin: 48px 0;
  break-inside: avoid;
}

.editorial-feature img {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
}

.editorial-feature figcaption {
  margin-top: 12px;
  font-size: 0.875rem;
  color: #666;
  text-align: center;
}

@media (max-width: 768px) {
  .editorial {
    column-count: 1;
    padding: 32px 16px;
  }

  .pull-quote {
    font-size: 1.375rem;
    padding: 24px;
  }
}
```

---

## 5. Masonry Grid

Pinterest-style layout for cards of varying heights. Pure CSS, no JavaScript.

**When to use:** Image galleries, card collections, testimonials, portfolio grids.

```html
<div class="masonry">
  <div class="masonry-item">Card content of varying height</div>
  <div class="masonry-item">Short card</div>
  <div class="masonry-item">Tall card with more content...</div>
  <!-- more items -->
</div>
```

```css
.masonry {
  columns: 3;
  column-gap: 20px;
  padding: 20px;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.masonry-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.masonry-item img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 12px;
}

@media (max-width: 960px) {
  .masonry {
    columns: 2;
  }
}

@media (max-width: 560px) {
  .masonry {
    columns: 1;
  }
}
```

---

## 6. Split Screen Hero

Full-viewport hero divided into content and visual halves.

**When to use:** Landing page heroes, app marketing pages, product launches, signup/login screens.

```html
<section class="split-hero">
  <div class="split-hero-content">
    <h1>Headline</h1>
    <p>Supporting text</p>
    <a href="#" class="split-hero-cta">Get Started</a>
  </div>
  <div class="split-hero-visual">
    <img src="..." alt="..." />
  </div>
</section>
```

```css
.split-hero {
  display: grid;
  grid-template-columns: 1.2fr 1fr; /* 55/45 split */
  min-height: 100vh;
  overflow: hidden;
}

.split-hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 64px 8% 64px 10%;
}

.split-hero-content h1 {
  font-size: clamp(2.25rem, 5vw, 4rem);
  line-height: 1.1;
  margin-bottom: 24px;
  font-weight: 800;
}

.split-hero-content p {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 40px;
  max-width: 480px;
}

.split-hero-cta {
  display: inline-block;
  padding: 16px 40px;
  background: #1a1a2e;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s ease;
  align-self: flex-start;
}

.split-hero-cta:hover {
  background: #2d2d4e;
}

.split-hero-visual {
  position: relative;
}

.split-hero-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .split-hero {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .split-hero-content {
    padding: 48px 6%;
    text-align: center;
    align-items: center;
  }

  .split-hero-cta {
    align-self: center;
  }

  .split-hero-visual {
    max-height: 50vh;
  }
}
```

---

## 7. Sticky Sidebar Content

Main content scrolls while the sidebar remains fixed in the viewport.

**When to use:** Documentation, settings panels, dashboards, long-form content with navigation.

```html
<div class="sticky-layout">
  <aside class="sticky-sidebar">
    <nav>Sidebar navigation or filters</nav>
  </aside>
  <main class="sticky-main">
    <p>Scrollable main content...</p>
  </main>
</div>
```

```css
.sticky-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
  align-items: start;
}

.sticky-sidebar {
  position: sticky;
  top: 32px;
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  padding: 24px;
  background: #f8f8fa;
  border-radius: 12px;
}

/* Thin custom scrollbar for the sidebar */
.sticky-sidebar::-webkit-scrollbar {
  width: 4px;
}

.sticky-sidebar::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.sticky-main {
  min-width: 0; /* prevent grid blowout */
}

@media (max-width: 860px) {
  .sticky-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .sticky-sidebar {
    position: static;
    max-height: none;
  }
}
```

---

## 8. Full-Bleed Sections

Sections that span the full viewport width while keeping inner text constrained to a readable container.

**When to use:** Marketing pages, hero banners, alternating background sections, image showcases within constrained layouts.

```html
<div class="page-container">
  <p>Content in the normal container.</p>
  <section class="full-bleed">
    <div class="full-bleed-inner">
      <h2>Full-width background, contained text</h2>
    </div>
  </section>
  <p>More contained content.</p>
</div>
```

```css
.page-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px;
}

.full-bleed {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 80px 24px;
  background: #1a1a2e;
  color: #f0f0f0;
}

.full-bleed-inner {
  max-width: 720px;
  margin: 0 auto;
}

/* Variant: full-bleed image */
.full-bleed--image {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 0;
}

.full-bleed--image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}

/* Variant: full-bleed with parallax hint */
.full-bleed--parallax {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  padding: 120px 24px;
}

@media (max-width: 768px) {
  .full-bleed {
    padding: 48px 16px;
  }

  .full-bleed--image img {
    height: 240px;
  }

  .full-bleed--parallax {
    background-attachment: scroll; /* fixed is janky on mobile */
    padding: 64px 16px;
  }
}
```

---

## Layout Pattern Selection Guide

| Site Type | Primary Layout | Secondary Layout |
|---|---|---|
| **SaaS Landing Page** | Split Screen Hero | Bento Grid, Overlapping Sections |
| **Portfolio** | Masonry Grid | Asymmetric Two-Column |
| **Blog / Editorial** | Magazine Layout | Full-Bleed Sections |
| **Documentation** | Sticky Sidebar | Full-Bleed Sections |
| **Dashboard** | Bento Grid | Sticky Sidebar |
| **E-commerce Product** | Split Screen Hero | Asymmetric Two-Column |
| **Agency / Creative** | Overlapping Sections | Masonry Grid |
| **App Marketing** | Split Screen Hero | Bento Grid, Asymmetric |
| **Case Study** | Asymmetric Two-Column | Magazine Layout, Full-Bleed |

**Combination tips:**

- Pair **Split Screen Hero** at the top with **Bento Grid** for a features section below.
- Use **Full-Bleed Sections** between **Asymmetric Two-Column** blocks to break rhythm.
- **Overlapping Sections** work best when alternating light/dark backgrounds.
- **Sticky Sidebar** pairs well with **Magazine Layout** for long-form content with a table of contents.
- **Masonry Grid** is strongest for visual-heavy content; combine with **Full-Bleed** image breaks.
