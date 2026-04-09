# Advanced Visual Effects & Motion Library

When the user runs `/design-review --enhance animations` or `/design-review --redesign` and wants eye-catching, complex motion and visual effects, use this library. These are production-ready CSS patterns — no JavaScript required for most effects.

## Philosophy

**Motion tells a story.** Every animation should have a purpose: guide attention, confirm actions, create spatial awareness, or build personality. The goal is "wow, this feels premium" not "wow, everything is moving."

Pick 3-5 signature effects per site. Not everything needs to animate.

---

## 1. Hero Section Effects

### Gradient Text Animation
```css
.hero-heading {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

### Animated Gradient Background
```css
.hero {
  background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #0f0c29);
  background-size: 400% 400%;
  animation: gradientBg 15s ease infinite;
}

@keyframes gradientBg {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

### Floating Elements (subtle parallax feel)
```css
.hero-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
```

### Typewriter Effect (CSS only)
```css
.typewriter {
  overflow: hidden;
  border-right: 2px solid var(--color-accent);
  white-space: nowrap;
  width: 0;
  animation: typing 3s steps(30) 1s forwards, blink 0.75s step-end infinite;
}

@keyframes typing { to { width: 100%; } }
@keyframes blink { 50% { border-color: transparent; } }
```

### Counter/Number Roll-Up
```css
@property --num {
  syntax: '<integer>';
  inherits: false;
  initial-value: 0;
}

.stat-number {
  --num: 0;
  animation: countUp 2s ease-out forwards;
  counter-reset: num var(--num);
}
.stat-number::after { content: counter(num); }

@keyframes countUp { to { --num: 2847; } }
```

---

## 2. Scroll-Triggered Reveals

### Fade In Up on Scroll (IntersectionObserver based)
```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```
```html
<script>
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
</script>
```

### Staggered Grid Reveal
```css
.grid-item.reveal {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.grid-item.reveal.visible { opacity: 1; transform: translateY(0) scale(1); }
.grid-item:nth-child(1).visible { transition-delay: 0ms; }
.grid-item:nth-child(2).visible { transition-delay: 80ms; }
.grid-item:nth-child(3).visible { transition-delay: 160ms; }
.grid-item:nth-child(4).visible { transition-delay: 240ms; }
.grid-item:nth-child(5).visible { transition-delay: 320ms; }
.grid-item:nth-child(6).visible { transition-delay: 400ms; }
```

### Slide In From Side
```css
.slide-in-left {
  opacity: 0;
  transform: translateX(-40px);
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-in-left.visible { opacity: 1; transform: translateX(0); }

.slide-in-right {
  opacity: 0;
  transform: translateX(40px);
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-in-right.visible { opacity: 1; transform: translateX(0); }
```

### Scale Up Reveal
```css
.scale-reveal {
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.scale-reveal.visible { opacity: 1; transform: scale(1); }
```

---

## 3. Card & Component Effects

### 3D Card Tilt on Hover
```css
.tilt-card {
  transition: transform 0.3s ease;
  transform-style: preserve-3d;
  perspective: 1000px;
}
.tilt-card:hover {
  transform: rotateX(-5deg) rotateY(5deg) translateY(-4px);
  box-shadow: -8px 8px 30px rgba(0,0,0,0.15);
}
```

### Glassmorphism Card
```css
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
}
```

### Glow Effect on Hover
```css
.glow-card {
  transition: box-shadow 0.3s ease;
}
.glow-card:hover {
  box-shadow:
    0 0 20px rgba(79, 70, 229, 0.15),
    0 0 60px rgba(79, 70, 229, 0.08),
    0 8px 24px rgba(0, 0, 0, 0.12);
}
```

### Border Gradient Card
```css
.gradient-border {
  position: relative;
  background: var(--color-bg-elevated);
  border-radius: 16px;
}
.gradient-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.gradient-border:hover::before { opacity: 1; }
```

### Shimmer Loading Skeleton
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-bg-subtle) 25%,
    var(--color-bg-elevated) 50%,
    var(--color-bg-subtle) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 4. Button Effects

### Ripple Effect (CSS + minimal JS)
```css
.btn-ripple {
  position: relative;
  overflow: hidden;
}
.btn-ripple::after {
  content: '';
  position: absolute;
  width: 300%;
  height: 300%;
  top: 50%;
  left: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%);
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.3s ease;
}
.btn-ripple:active::after {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  transition: 0s;
}
```

### Magnetic Button (hover pull effect)
```css
.btn-magnetic {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
/* Requires minimal JS for mouse-position tracking:
   element.style.transform = `translate(${dx}px, ${dy}px)` */
```

### Animated Gradient Button
```css
.btn-gradient {
  background: linear-gradient(135deg, #667eea, #764ba2);
  background-size: 200% 200%;
  color: white;
  border: none;
  transition: background-position 0.4s ease, transform 0.15s ease, box-shadow 0.3s ease;
}
.btn-gradient:hover {
  background-position: 100% 0;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}
.btn-gradient:active { transform: scale(0.97); }
```

### Icon Slide Button
```css
.btn-icon-slide .icon {
  display: inline-block;
  transition: transform 0.25s ease;
}
.btn-icon-slide:hover .icon {
  transform: translateX(4px);
}
```

---

## 5. Background & Atmosphere Effects

### Noise Texture Overlay
```css
.noise-bg::before {
  content: '';
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1000;
  opacity: 0.4;
}
```

### Animated Mesh Gradient
```css
.mesh-bg {
  background:
    radial-gradient(at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
    radial-gradient(at 80% 70%, rgba(168, 85, 247, 0.12) 0%, transparent 50%),
    radial-gradient(at 50% 50%, rgba(236, 72, 153, 0.08) 0%, transparent 50%);
  animation: meshMove 20s ease infinite;
}

@keyframes meshMove {
  0%, 100% { background-position: 0% 0%, 100% 100%, 50% 50%; }
  25% { background-position: 30% 20%, 70% 80%, 20% 60%; }
  50% { background-position: 60% 40%, 40% 60%, 80% 30%; }
  75% { background-position: 20% 70%, 80% 30%, 50% 80%; }
}
```

### Dot Grid Pattern
```css
.dot-grid {
  background-image: radial-gradient(
    circle,
    rgba(255,255,255,0.08) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
}
```

### Gradient Blur Orbs
```css
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: orbFloat 20s ease-in-out infinite;
}
.orb-1 { width: 400px; height: 400px; background: #667eea; top: -100px; left: -100px; }
.orb-2 { width: 300px; height: 300px; background: #764ba2; bottom: -50px; right: -50px; animation-delay: -7s; }
.orb-3 { width: 250px; height: 250px; background: #f093fb; top: 50%; left: 30%; animation-delay: -14s; }

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(30px, -20px); }
  50% { transform: translate(-20px, 30px); }
  75% { transform: translate(20px, 20px); }
}
```

---

## 6. Text Effects

### Highlight/Marker Effect
```css
.text-highlight {
  background: linear-gradient(120deg, rgba(79, 70, 229, 0.2) 0%, rgba(79, 70, 229, 0.2) 100%);
  background-repeat: no-repeat;
  background-size: 0% 40%;
  background-position: 0 90%;
  transition: background-size 0.4s ease;
}
.text-highlight.visible,
.text-highlight:hover {
  background-size: 100% 40%;
}
```

### Split Text Reveal (per-character animation)
```css
.split-text span {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: charReveal 0.5s ease forwards;
}
.split-text span:nth-child(1) { animation-delay: 0.02s; }
.split-text span:nth-child(2) { animation-delay: 0.04s; }
/* ... continue per character */

@keyframes charReveal {
  to { opacity: 1; transform: translateY(0); }
}
```

### Underline Draw on Hover
```css
.draw-underline {
  position: relative;
  text-decoration: none;
}
.draw-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: width 0.3s ease;
}
.draw-underline:hover::after { width: 100%; }
```

---

## 7. Cursor & Interactive Effects

### Custom Cursor Follower
```css
.cursor-dot {
  position: fixed;
  width: 8px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.15s ease;
  mix-blend-mode: difference;
}
/* Requires JS: document.addEventListener('mousemove', ...) */
```

### Scroll Progress Bar
```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent), #f093fb);
  z-index: 9999;
  transform-origin: left;
  animation: scrollProgress linear;
  animation-timeline: scroll();
}

@keyframes scrollProgress { to { transform: scaleX(1); } }
```

---

## 8. Page Transition Effects

### Smooth Page Load Choreography
```css
/* Step 1: Header slides down */
.site-header {
  animation: slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Step 2: Hero content fades up (staggered) */
.hero-badge { animation: fadeInUp 0.6s ease 0.2s both; }
.hero h1 { animation: fadeInUp 0.6s ease 0.3s both; }
.hero-subtitle { animation: fadeInUp 0.6s ease 0.4s both; }
.hero-actions { animation: fadeInUp 0.6s ease 0.5s both; }
.hero-visual { animation: fadeInUp 0.8s ease 0.6s both; }

/* Step 3: Below-fold content reveals on scroll */
/* (handled by IntersectionObserver) */

@keyframes slideDown {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## Accessibility: ALWAYS Include

Every effect file MUST end with this:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .cursor-dot { display: none; }
}
```

---

## Effect Selection Guide

Match effects to personality:

| Personality | Recommended Effects |
|------------|-------------------|
| **Swiss Precision** | Fade reveals, subtle hover lifts, scroll progress bar, clean transitions. NO glows, NO gradients, NO 3D. |
| **Neo-Brutalist** | Instant state changes (no transitions), bold border animations, typewriter text, glitch effects. NO smooth easing, NO soft shadows. |
| **Luxury Minimal** | Slow, elegant fades (600-800ms), text highlight draw, underline animations, subtle parallax. NO bounce, NO ripples. |
| **Retro-Futuristic** | Gradient text, noise texture, glow effects, cursor follower, scan-line overlay, typewriter. NO organic motion. |
| **Soft & Organic** | Spring easing everywhere, bounce on cards, floating elements, smooth gradient shifts. NO sharp transitions. |
| **Editorial** | Text reveals, staggered content entrance, scroll-driven animations, highlight markers. NO flashy effects. |
| **Glassmorphism** | Blur cards, gradient orbs, mesh backgrounds, glow on hover, depth with parallax. NO hard shadows. |

---

## How Many Effects Per Page

- **Landing page:** 5-8 effects (hero entrance, scroll reveals, card hovers, CTA animation, background atmosphere)
- **Dashboard:** 2-3 effects (hover feedback, transition smoothing, loading skeletons)
- **Blog/Content:** 3-4 effects (fade reveals, text highlights, smooth scroll, image parallax)
- **E-Commerce:** 4-6 effects (product card hovers, CTA animations, gallery transitions, add-to-cart feedback)

**Rule:** If the user notices the animation more than the content, you've gone too far.
