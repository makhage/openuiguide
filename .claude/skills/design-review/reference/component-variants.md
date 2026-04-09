# Component Variant Library

A collection of ready-to-apply component designs. When enhancing, pick the variant that matches the site's personality and replace the existing component styling.

---

## Hero Section Variants

### Hero 1: Centered Classic
```css
.hero-centered {
  text-align: center;
  padding: var(--space-9) var(--space-5);
  max-width: 800px;
  margin: 0 auto;
}
.hero-centered h1 { font-size: clamp(2.5rem, 6vw, 4rem); line-height: 1.1; letter-spacing: -0.03em; }
.hero-centered .subtitle { font-size: var(--text-lg); color: var(--color-text-secondary); max-width: 55ch; margin: var(--space-5) auto var(--space-7); }
```

### Hero 2: Split Screen (Content + Visual)
```css
.hero-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 80vh;
  align-items: center;
  gap: var(--space-8);
  padding: var(--space-8) var(--space-5);
}
.hero-split .hero-content { max-width: 540px; }
.hero-split .hero-media { border-radius: var(--radius-lg); overflow: hidden; aspect-ratio: 4/3; }
@media (max-width: 768px) { .hero-split { grid-template-columns: 1fr; min-height: auto; } }
```

### Hero 3: Full-Bleed Background
```css
.hero-fullbleed {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-subtle) 100%);
  overflow: hidden;
}
.hero-fullbleed::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 30% 50%, rgba(79,70,229,0.15), transparent 60%);
}
.hero-fullbleed .hero-content { position: relative; z-index: 1; max-width: 720px; padding: var(--space-5); }
```

### Hero 4: Asymmetric with Badge
```css
.hero-asymmetric {
  display: grid;
  grid-template-columns: 55% 45%;
  gap: var(--space-6);
  padding: var(--space-9) var(--space-5);
  align-items: center;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  background: var(--color-accent-subtle);
  color: var(--color-accent);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  margin-bottom: var(--space-5);
}
```

### Hero 5: Video Background
```css
.hero-video {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.hero-video video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
}
.hero-video .hero-content { position: relative; z-index: 1; text-align: center; color: white; }
```

---

## Card Variants

### Card 1: Elevated (Material)
```css
.card-elevated {
  background: var(--color-bg-elevated);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}
.card-elevated:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}
```

### Card 2: Outlined Minimal
```css
.card-outlined {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  transition: border-color 0.2s ease, background 0.2s ease;
}
.card-outlined:hover {
  border-color: var(--color-accent);
  background: var(--color-bg-subtle);
}
```

### Card 3: Gradient Accent Border
```css
.card-gradient {
  position: relative;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  overflow: hidden;
}
.card-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent), #a855f7, #ec4899);
}
```

### Card 4: Glass
```css
.card-glass {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}
```

---

## Pricing Table Variants

### Pricing 1: Cards with Featured Highlight
```css
.pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5); align-items: start; }
.pricing-card { border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-6); }
.pricing-featured {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 1px var(--color-accent), var(--shadow-lg);
  transform: scale(1.05);
  position: relative;
}
```

### Pricing 2: Toggle Monthly/Annual
```css
.pricing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-7);
}
.pricing-toggle-track {
  width: 48px; height: 24px;
  background: var(--color-bg-subtle);
  border-radius: var(--radius-full);
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;
}
.pricing-toggle-track.active { background: var(--color-accent); }
.pricing-toggle-thumb {
  width: 20px; height: 20px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px; left: 2px;
  transition: transform 0.2s ease;
}
.pricing-toggle-track.active .pricing-toggle-thumb { transform: translateX(24px); }
```

### Pricing 3: Comparison Table
```css
.pricing-comparison {
  width: 100%;
  border-collapse: collapse;
}
.pricing-comparison th { text-align: center; padding: var(--space-4); font-weight: 700; }
.pricing-comparison td { padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--color-border-subtle); text-align: center; }
.pricing-comparison .feature-name { text-align: left; font-weight: 500; }
.pricing-comparison .featured-col { background: var(--color-accent-subtle); }
```

---

## Testimonial Variants

### Testimonial 1: Large Quote (centered)
```css
.testimonial-large {
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-5);
}
.testimonial-large blockquote {
  font-size: var(--text-xl);
  font-style: italic;
  line-height: 1.6;
  position: relative;
}
.testimonial-large blockquote::before {
  content: '"';
  font-size: 6rem;
  color: var(--color-accent);
  opacity: 0.2;
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: Georgia, serif;
}
```

### Testimonial 2: Card Grid
```css
.testimonial-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5); }
.testimonial-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-5);
}
.testimonial-card .stars { color: #fbbf24; font-size: var(--text-sm); margin-bottom: var(--space-3); }
.testimonial-card .author { display: flex; align-items: center; gap: var(--space-3); margin-top: var(--space-4); }
.testimonial-card .author img { width: 40px; height: 40px; border-radius: 50%; }
```

### Testimonial 3: Carousel with Fade
```css
.testimonial-carousel { position: relative; overflow: hidden; min-height: 200px; }
.testimonial-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.testimonial-slide.active { opacity: 1; }
.carousel-dots { display: flex; justify-content: center; gap: var(--space-2); margin-top: var(--space-5); }
.carousel-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--color-border);
  border: none;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}
.carousel-dot.active { background: var(--color-accent); transform: scale(1.3); }
```

### Testimonial 4: Social Proof Wall
```css
.social-wall {
  columns: 3;
  column-gap: var(--space-4);
}
.social-card {
  break-inside: avoid;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  margin-bottom: var(--space-4);
}
@media (max-width: 768px) { .social-wall { columns: 1; } }
```

---

## Footer Variants

### Footer 1: Multi-Column with Brand
```css
.footer-multi {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: var(--space-8);
  padding: var(--space-9) var(--space-5) var(--space-7);
}
.footer-brand { max-width: 280px; }
.footer-brand p { color: var(--color-text-muted); font-size: var(--text-sm); margin-top: var(--space-3); }
.footer-col h4 { font-size: var(--text-sm); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-4); color: var(--color-text-muted); }
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: var(--space-2); }
.footer-col a { color: var(--color-text-secondary); text-decoration: none; font-size: var(--text-sm); transition: color 0.2s ease; }
.footer-col a:hover { color: var(--color-text); }
@media (max-width: 768px) { .footer-multi { grid-template-columns: 1fr 1fr; } }
```

### Footer 2: Centered Minimal
```css
.footer-minimal {
  text-align: center;
  padding: var(--space-7) var(--space-5);
  border-top: 1px solid var(--color-border);
}
.footer-minimal .footer-links { display: flex; justify-content: center; gap: var(--space-5); margin-bottom: var(--space-4); }
.footer-minimal .footer-links a { color: var(--color-text-secondary); text-decoration: none; font-size: var(--text-sm); }
.footer-minimal .copyright { color: var(--color-text-muted); font-size: var(--text-xs); }
```

### Footer 3: CTA Banner + Links
```css
.footer-cta-section {
  background: var(--color-accent);
  color: white;
  text-align: center;
  padding: var(--space-8) var(--space-5);
  border-radius: var(--radius-lg);
  margin: 0 var(--space-5) var(--space-7);
}
.footer-cta-section h2 { font-size: var(--text-3xl); margin-bottom: var(--space-3); }
.footer-cta-section .btn { background: white; color: var(--color-accent); margin-top: var(--space-5); }
```

---

## Selection Guide

| Site Type | Hero | Cards | Pricing | Testimonials | Footer |
|-----------|------|-------|---------|-------------|--------|
| SaaS | Centered or Asymmetric | Outlined or Elevated | Cards + Featured | Large Quote | Multi-Column |
| Marketing | Split Screen or Full-Bleed | Gradient Accent | Toggle M/A | Card Grid | CTA Banner |
| E-Commerce | Full-Bleed or Video | Elevated | Comparison Table | Social Wall | Multi-Column |
| Blog/Content | Centered | Outlined | N/A | Large Quote | Centered Minimal |
| Dashboard | N/A (no hero) | Outlined | N/A | N/A | Centered Minimal |
