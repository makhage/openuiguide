# Navigation Polish

Premium navigation patterns that elevate the browsing experience.

---

## 1. Scroll-Aware Shrinking Header

Header that reduces height and adds shadow on scroll.

```css
.header-shrink {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: var(--space-5) 0;
  transition: padding 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
}

.header-shrink.scrolled {
  padding: var(--space-2) 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.header-shrink .logo {
  transition: font-size 0.3s ease;
  font-size: var(--text-xl);
}

.header-shrink.scrolled .logo {
  font-size: var(--text-lg);
}
```

```html
<script>
window.addEventListener('scroll', () => {
  document.querySelector('.header-shrink')
    .classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });
</script>
```

---

## 2. Active Section Highlighting (Scroll Spy)

Nav links that highlight as you scroll past their target sections.

```css
.nav-scrollspy a {
  color: var(--color-text-secondary);
  text-decoration: none;
  position: relative;
  padding: var(--space-2) 0;
  transition: color 0.2s ease;
}

.nav-scrollspy a.active {
  color: var(--color-accent);
}

.nav-scrollspy a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: width 0.3s ease;
}

.nav-scrollspy a.active::after { width: 100%; }
```

```html
<script>
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-scrollspy a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active',
          link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(section => observer.observe(section));
</script>
```

---

## 3. Mobile Drawer Navigation

Slide-in drawer from the left/right with overlay.

```css
.nav-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.nav-drawer-overlay.open { opacity: 1; pointer-events: auto; }

.nav-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  max-width: 85vw;
  background: var(--color-bg-elevated);
  z-index: 201;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  padding: var(--space-6);
  overflow-y: auto;
}

.nav-drawer.open { transform: translateX(0); }

.nav-drawer-close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background 0.2s ease;
}

.nav-drawer-close:hover { background: var(--color-bg-subtle); }

.nav-drawer-links {
  list-style: none;
  margin-top: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.nav-drawer-links a {
  display: block;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s ease;
}

.nav-drawer-links a:hover { background: var(--color-bg-subtle); }
.nav-drawer-links a[aria-current="page"] { background: var(--color-accent-subtle); color: var(--color-accent); }
```

### Hamburger Button Animation
```css
.hamburger {
  width: 44px;
  height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: none;
  background: none;
  cursor: pointer;
  padding: var(--space-2);
}

.hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--color-text);
  transition: transform 0.3s ease, opacity 0.2s ease;
}

.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
```

---

## 4. Mega Menu

Dropdown that reveals a full-width panel with structured content.

```css
.mega-menu-trigger { position: relative; }

.mega-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  max-width: 1000px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--space-6);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.mega-menu-trigger:hover .mega-menu,
.mega-menu-trigger:focus-within .mega-menu {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
  pointer-events: auto;
}

.mega-menu-section h3 {
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: var(--space-3);
}

.mega-menu-link {
  display: flex;
  align-items: start;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: var(--color-text);
  transition: background 0.15s ease;
}

.mega-menu-link:hover { background: var(--color-bg-subtle); }
.mega-menu-link .desc { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 2px; }
```

---

## 5. Breadcrumb Navigation

Path indicator with separator arrows.

```css
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  padding: var(--space-3) 0;
}

.breadcrumb a {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb a:hover { color: var(--color-accent); }

.breadcrumb-separator {
  color: var(--color-border);
  font-size: var(--text-xs);
}

.breadcrumb-current {
  color: var(--color-text);
  font-weight: 500;
}
```

```html
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li><a href="/">Home</a></li>
    <li class="breadcrumb-separator" aria-hidden="true">›</li>
    <li><a href="/products">Products</a></li>
    <li class="breadcrumb-separator" aria-hidden="true">›</li>
    <li class="breadcrumb-current" aria-current="page">Widget Pro</li>
  </ol>
</nav>
```

---

## 6. Tab Navigation with Animated Indicator

Tabs where the active indicator smoothly slides between items.

```css
.tab-nav {
  display: flex;
  border-bottom: 1px solid var(--color-border);
  position: relative;
}

.tab-nav button {
  padding: var(--space-3) var(--space-5);
  background: none;
  border: none;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
}

.tab-nav button:hover { color: var(--color-text); }
.tab-nav button[aria-selected="true"] { color: var(--color-accent); }

.tab-indicator {
  position: absolute;
  bottom: -1px;
  height: 2px;
  background: var(--color-accent);
  transition: left 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.tab-panel {
  display: none;
  animation: fadeIn 0.3s ease;
}

.tab-panel.active { display: block; }
```

---

## Accessibility Reminders

- Hamburger button needs `aria-expanded`, `aria-controls`, and `aria-label="Menu"`
- Drawer needs focus trap when open (see REQ-MODAL-001)
- Mega menu needs `aria-haspopup="true"` on trigger
- Tabs need `role="tablist"`, `role="tab"`, `role="tabpanel"` with `aria-selected`
- Breadcrumb needs `aria-label="Breadcrumb"` on `<nav>` and `aria-current="page"` on last item
- All navigation must respect `prefers-reduced-motion`
