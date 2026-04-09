# Frontend Design Enhancement Guide

When the user runs `/design-review --redesign` or `/design-review --enhance`, switch from REVIEW mode to DESIGN ENHANCEMENT mode. In this mode, you are no longer a reviewer — you are a **design partner** who actively improves the visual quality of the UI.

## Philosophy

**No design should look like it was made by AI.** Avoid generic patterns, cookie-cutter layouts, and safe choices. Every project deserves a distinctive visual identity. Bold maximalism and refined minimalism both work — the key is **intentionality, not intensity.**

---

## Phase 1: Design Audit & Direction

Before changing anything, understand what exists and where it should go.

### 1a. Analyze Current State

Read all CSS/style files and HTML/component files. Document:
- Current color palette (extract all colors)
- Current typography (fonts, sizes, weights)
- Current spacing system (or lack thereof)
- Current motion/animation (or lack thereof)
- Current visual personality (corporate? playful? dark? minimal?)
- What's working well (don't throw away good foundations)

### 1b. Ask the User for Direction

Present these options (numbered list, wait for reply):

**"What direction do you want to take the design?"**

1. **Polish & Refine** — Keep the current design identity, make it more consistent and professional. Fix spacing, align typography, smooth transitions. *(Safest — enhances without changing identity)*
2. **Elevate & Modernize** — Same structure, but upgrade the visual language. Better fonts, richer colors, subtle animations, refined spacing. *(Medium change — looks noticeably better)*  
3. **Bold Redesign** — New visual identity. Distinctive typography, unique color palette, eye-catching animations, memorable layout. *(Biggest change — new personality)*
4. **Specific Focus** — "Just improve the animations" or "Just fix the color scheme" *(Targeted enhancement)*

### 1c. Choose an Aesthetic Direction

If the user chose Bold Redesign or Elevate, ask:

**"What personality should the design have?"**

1. **Swiss Precision** — Clean grid, Helvetica-inspired type, mathematical spacing, restrained color, micro-animations
2. **Neo-Brutalist** — Raw borders, bold system fonts, stark contrast, intentionally rough, high-energy
3. **Luxury Minimal** — Serif headings, muted neutrals, generous whitespace, subtle gold/copper accents, silk-smooth transitions
4. **Retro-Futuristic** — Monospace accents, neon on dark, scan-line textures, glitch effects, terminal aesthetic
5. **Soft & Organic** — Rounded everything, warm gradients, hand-drawn accents, gentle bounce animations, natural colors
6. **Editorial Magazine** — Strong type hierarchy, pull quotes, column layouts, dramatic images, sophisticated serif/sans pairing
7. **Glassmorphism & Depth** — Frosted glass surfaces, layered depth, blur effects, floating cards, subtle parallax
8. **Let me describe it** — User describes their own vision

---

## Phase 2: Design System Generation

Based on the chosen direction, generate a complete design system before touching any files.

### 2a. Typography Selection

Choose fonts that match the personality. **Never use these overused fonts:** Arial, Helvetica (unless Swiss Precision), Inter (unless intentional), Roboto (unless Android), Open Sans, Lato, Montserrat.

**Instead, choose from distinctive alternatives:**

| Personality | Heading Font | Body Font |
|------------|-------------|-----------|
| Swiss Precision | Neue Haas Grotesk, Suisse | Suisse, Akkurat |
| Neo-Brutalist | Space Grotesk, Monument Extended | Space Mono, JetBrains Mono |
| Luxury Minimal | Playfair Display, Cormorant | Source Serif, Lora |
| Retro-Futuristic | Orbitron, Exo 2 | IBM Plex Mono, Fira Code |
| Soft & Organic | Nunito, Quicksand | Plus Jakarta Sans, DM Sans |
| Editorial | Fraunces, Libre Baskerville | Inter (OK here), Work Sans |
| Glassmorphism | Outfit, General Sans | Satoshi, Cabinet Grotesk |

Use Google Fonts or system fonts. Generate `@font-face` or `<link>` imports.

### 2b. Color Palette Generation

Generate a complete palette as CSS custom properties:

```css
:root {
  /* Primary palette */
  --color-bg: #...;
  --color-bg-elevated: #...;
  --color-bg-subtle: #...;
  --color-text: #...;
  --color-text-secondary: #...;
  --color-text-muted: #...;
  
  /* Accent */
  --color-accent: #...;
  --color-accent-hover: #...;
  --color-accent-subtle: #...;
  
  /* Feedback */
  --color-success: #...;
  --color-warning: #...;
  --color-error: #...;
  
  /* Borders & surfaces */
  --color-border: #...;
  --color-border-subtle: #...;
  --color-surface: #...;
}
```

**Rules:**
- All text colors MUST pass 4.5:1 contrast against their backgrounds
- Accent color must pass 3:1 against the background it sits on
- Generate BOTH light and dark palettes
- Don't use pure black (#000) or pure white (#fff) — use off-tones

### 2c. Spacing Scale

```css
:root {
  --space-1: 4px;    /* tight */
  --space-2: 8px;    /* compact */
  --space-3: 12px;   /* default-sm */
  --space-4: 16px;   /* default */
  --space-5: 24px;   /* relaxed */
  --space-6: 32px;   /* section-sm */
  --space-7: 48px;   /* section */
  --space-8: 64px;   /* section-lg */
  --space-9: 96px;   /* hero */
}
```

### 2d. Motion System

Generate animation presets:

```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Entrance animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(-16px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Hover effects */
.hover-lift {
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

/* Button press */
button:active { transform: scale(0.97); }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 2e. Component Styles

Generate refined styles for common components:
- **Buttons:** Primary (filled), secondary (outlined), ghost (text-only) with hover/focus/active states
- **Cards:** Consistent radius, shadow scale, hover lift
- **Inputs:** Focus ring, label animation, validation states
- **Navigation:** Active indicator, smooth transitions
- **Tables:** Striped or hover rows, sticky header
- **Badges/Tags:** Pill shape with tinted backgrounds

---

## Phase 3: Present the Design Plan

**IMPORTANT: Do NOT apply changes yet.** Show the user what will change first.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Design Enhancement Plan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Direction: Elevate & Modernize
  Personality: Luxury Minimal
  
  Changes planned:
  
  Typography:
    Current: system-ui, 14px body
    Proposed: Cormorant (headings) + Source Serif (body), 16px body
  
  Color:
    Current: 23 random colors, dark-only
    Proposed: 15 semantic tokens, light + dark themes
  
  Spacing:
    Current: ad-hoc (5px, 7px, 13px, 22px)
    Proposed: 9-step scale (4px to 96px)
  
  Motion:
    Current: no animations
    Proposed: fade-in-up on cards, hover-lift on interactive,
              smooth focus transitions, staggered list entrance
  
  Files to modify:
    style.css (complete overhaul)
    index.html (add font imports, update some classes)
  
  Files to create:
    animations.css (motion system)
  
  Shall I proceed? (yes / show me a preview first / modify the plan)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Phase 4: Apply Enhancements

Only after user confirms. Apply changes incrementally:

1. **Typography first** — fonts, sizes, weights, line-heights
2. **Colors second** — replace raw values with tokens, add dark mode
3. **Spacing third** — normalize to scale
4. **Components fourth** — button styles, card styles, input styles
5. **Motion last** — animations, transitions, hover effects

After each step, briefly describe what changed and ask if it looks right before continuing.

---

## Phase 5: Post-Enhancement Review

After enhancements are applied, automatically run a **review-only** pass (not redesign) to verify:
- All contrast ratios still pass
- No accessibility regressions
- Animations respect reduced-motion
- New fonts load properly (font-display: swap)
- Responsive breakpoints still work

Report any issues the enhancement introduced.

---

## Specific Enhancement Modes

### `/design-review --enhance animations`
Only add/improve motion and animations:
- Button press feedback (scale 0.97)
- Hover transitions (200ms ease)
- Card hover lift (translateY + shadow)
- Focus ring animation (150ms)
- Page load stagger (fadeInUp, 40ms delay per item)
- Modal entrance/exit (scaleIn/fadeOut)
- Toggle/switch animation
- Skeleton shimmer for loading states

### `/design-review --enhance colors`
Only improve the color system:
- Extract current colors, consolidate into tokens
- Fix contrast failures
- Add dark mode via prefers-color-scheme
- Separate brand from feedback colors
- Generate harmonious palette from primary color

### `/design-review --enhance typography`
Only improve typography:
- Choose distinctive font pairing
- Establish type scale (5-8 sizes)
- Set proper line-heights
- Limit line length (65ch)
- Add responsive font sizing

### `/design-review --enhance spacing`
Only normalize spacing:
- Define spacing scale as CSS custom properties
- Replace ad-hoc values with scale tokens
- Fix proximity grouping (related elements closer)
- Add section breathing room

---

## Anti-Patterns for Generated Designs

When generating or enhancing designs, NEVER produce:

- Purple gradient hero sections (the #1 AI design cliché)
- Card grids with identical rounded rectangles and no variation
- Generic "Hero heading / subtitle / CTA button" layouts with no personality
- Glassmorphism on everything (use sparingly)
- Dark mode that's just "invert colors"
- Animations on every single element (pick 3-5 key moments)
- Font sizes that only differ by 1-2px (make the scale dramatic)
- Gray-on-white that technically passes contrast but feels washed out
- Centered everything with no visual tension
- Stock illustration style (abstract blobs, generic people)
