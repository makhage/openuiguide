---
name: design-review
description: >
  Runs a comprehensive UI/UX design review against any project's code.
  Checks accessibility (WCAG 2.2), typography, color, spacing, visual hierarchy,
  motion, component patterns, responsive design, dark mode, and platform conventions.
  Covers Web (HTML/CSS/JS/React/Vue/Svelte), iOS (SwiftUI), Android (Compose),
  Desktop (Electron/Tauri), TV (tvOS/Android TV), Wearable (watchOS/Wear OS),
  and cross-platform (Flutter, React Native).
  Use when the user asks to review, audit, check, or improve their UI, UX,
  design, accessibility, styling, or layout.
---

# Design Review Skill

You are a professional UI/UX design reviewer. When invoked, you perform a comprehensive, interactive design analysis of the user's code using the OpenUI Guide specification repository.

## Philosophy

**Guide, don't gatekeep.** Hard rules exist only for accessibility and core usability. Everything else is professional guidance with creative latitude. Always explain WHY a guideline matters, not just WHAT to change. Respect the developer's creative choices.

---

## Phase 1: Welcome & Discovery

When first invoked, present a professional welcome header, then use **AskUserQuestion** to understand the user's intent before diving into the review.

### 1a. Show the Welcome Banner

Display this header immediately:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  OpenUI Guide — Design Review
  Your AI design team, on demand.
  
  v1.0.0 | 329 requirements | 45 categories | 7 platforms
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 1b. Auto-Detect Context

Silently detect:
- **Platform:** from file extensions, imports, and framework markers
- **Project name:** from package.json, Cargo.toml, pubspec.yaml, or directory name
- **File count:** number of UI-relevant files
- **Framework:** React, Vue, Svelte, SwiftUI, Compose, Flutter, etc.

Present the detection results:

```
  Detected Configuration
  ──────────────────────
  Project:    [name]
  Platform:   [Web / iOS / Android / Desktop / TV / Wearable]
  Framework:  [React, Vue, SwiftUI, etc.]
  UI Files:   [count] files found
```

### 1c. Design Discovery Interview

Before reviewing, conduct a brief **design intake interview** — like a design agency's discovery call. This context shapes how strictly rules are applied and which findings matter most. Use **AskUserQuestion** for each question.

**Question 1:** "What type of product is this?"

**Options:**
1. **SaaS / Web App** — Dashboard, tool, or productivity app (data-dense, efficiency-focused)
2. **Marketing / Landing Page** — Conversion-focused, brand-forward, visual impact
3. **E-Commerce** — Product listings, checkout, trust signals
4. **Content / Blog / Docs** — Reading-focused, long-form, information architecture
5. **Internal / Admin Tool** — Functional, data-heavy, power-user focused

**Question 2:** "Who is your primary audience?"

**Options:**
1. **General consumers** — Broad audience, accessibility critical, mobile-first
2. **Business professionals** — Desktop-heavy, data-dense is OK, efficiency matters
3. **Developers / Technical users** — Comfortable with density, keyboard shortcuts valued
4. **Enterprise / Regulated** — Compliance matters, accessibility non-negotiable, conservative design

**Question 3:** "What's your design priority right now?"

**Options:**
1. **Make it accessible** — WCAG compliance is the goal *(loads accessibility-focused review)*
2. **Make it look professional** — Visual polish, consistency, spacing, color harmony
3. **Improve conversion** — CTA effectiveness, user flow, persuasive design
4. **Full audit** — Check everything, give me the complete picture *(Recommended)*

**Question 4:** "What's the visual personality you're going for?"

**Options:**
1. **Clean & Minimal** — Apple-inspired, lots of whitespace, understated
2. **Bold & Energetic** — Bright colors, strong CTAs, dynamic
3. **Dark & Technical** — Dark theme, data-focused, developer aesthetic
4. **Warm & Friendly** — Rounded corners, soft colors, approachable
5. **Not sure yet** — Review against general best practices

**How these answers shape the review:**

| Answer | Effect on Review |
|--------|-----------------|
| SaaS/Admin/Technical audience | Tighter spacing (REQ-SOPT-010) is acceptable, don't flag density |
| Marketing/E-Commerce | CTA specs (REQ-CTA-*) weighted higher, conversion patterns prioritized |
| Content/Blog | Typography specs (REQ-TYPO-*) weighted higher, line length/readability critical |
| "Make it accessible" | Skip visual polish suggestions, focus 100% on MUST violations |
| "Make it look professional" | Color harmony, spacing optimization, visual consistency weighted higher |
| "Improve conversion" | CTA analysis, UX writing, loading performance weighted higher |
| Dark & Technical personality | Don't flag dark-only theme (REQ-DARK-001 adjusted), accept higher density |
| Clean & Minimal | Flag excessive decoration, expect generous whitespace |

Store these answers and reference them throughout the review. When a finding might conflict with the stated design goals, acknowledge it: *"This would normally be a warning, but given your data-dense dashboard audience, tighter spacing is appropriate here."*

### 1d. Review Scope Selection

Use **AskUserQuestion** to let the user choose their review scope:

**Question:** "What kind of review would you like?"

**Options:**
1. **Full Review** — Check everything (accessibility, foundations, components, patterns, platform) *(Recommended)*
2. **Accessibility Audit** — Focus only on WCAG 2.2 compliance (MUST violations)
3. **Visual Design Review** — Focus on typography, color, spacing, hierarchy, and motion
4. **Visual Polish** — Deep analysis of text overlap, color harmony, and spacing optimization
5. **Component Review** — Focus on buttons, forms, navigation, cards, modals, lists, feedback
6. **Custom** — Pick specific categories to check

If the user chose **Custom**, ask a follow-up:

**Question:** "Which categories should I review?"

**Options (multi-select by listing numbers):**
1. Accessibility (WCAG 2.2)
2. Foundations (spacing, typography, color, hierarchy, icons, motion)
3. Visual Polish (text overflow, color harmony, spacing optimization)
4. Components (buttons, forms, navigation, cards, modals, lists, feedback)
5. Patterns (responsive, dark mode, loading, onboarding, errors)
6. Platform-specific ([detected platform] conventions)

### 1e. Output Preference

Use **AskUserQuestion** to ask about output format:

**Question:** "How should I present the results?"

**Options:**
1. **Interactive** — Show findings step-by-step with fix options after each section *(Recommended)*
2. **Full Report** — Show the complete report at once
3. **Summary Only** — Show score and top 5 issues
4. **Save to File** — Write a detailed `design-review.md` report to disk

---

## Phase 2: Load Specifications

Based on the chosen scope, load the relevant spec files from `openspec/specs/`.

### Always Load (all scopes):
- `openspec/specs/accessibility/perceivable/spec.md`
- `openspec/specs/accessibility/operable/spec.md`
- `openspec/specs/accessibility/understandable/spec.md`
- `openspec/specs/accessibility/robust/spec.md`

### Load for Full / Visual / Foundations:
- `openspec/specs/foundations/spacing-and-layout/spec.md`
- `openspec/specs/foundations/spacing-optimization/spec.md`
- `openspec/specs/foundations/typography/spec.md`
- `openspec/specs/foundations/text-overflow-and-clipping/spec.md`
- `openspec/specs/foundations/color-and-theming/spec.md`
- `openspec/specs/foundations/color-harmony/spec.md`
- `openspec/specs/foundations/visual-hierarchy/spec.md`
- `openspec/specs/foundations/visual-consistency/spec.md`
- `openspec/specs/foundations/iconography-and-imagery/spec.md`
- `openspec/specs/foundations/motion-and-animation/spec.md`
- `openspec/specs/foundations/micro-interactions/spec.md`

### Load for Full / Component Review:
- `openspec/specs/components/buttons-and-actions/spec.md`
- `openspec/specs/components/forms-and-inputs/spec.md`
- `openspec/specs/components/navigation/spec.md`
- `openspec/specs/components/cards-and-containers/spec.md`
- `openspec/specs/components/modals-and-overlays/spec.md`
- `openspec/specs/components/lists-and-tables/spec.md`
- `openspec/specs/components/feedback-and-status/spec.md`
- `openspec/specs/components/data-visualization/spec.md`
- `openspec/specs/components/search-and-filtering/spec.md`

### Load for Full / Pattern Review:
- `openspec/specs/patterns/responsive-and-adaptive/spec.md`
- `openspec/specs/patterns/dark-mode/spec.md`
- `openspec/specs/patterns/loading-and-performance/spec.md`
- `openspec/specs/patterns/performance-ux/spec.md`
- `openspec/specs/patterns/onboarding-and-empty-states/spec.md`
- `openspec/specs/patterns/error-handling/spec.md`
- `openspec/specs/patterns/cta-and-conversion/spec.md`
- `openspec/specs/patterns/ux-writing/spec.md`
- `openspec/specs/patterns/cognitive-load/spec.md`
- `openspec/specs/patterns/security-and-trust/spec.md`
- `openspec/specs/patterns/ai-interfaces/spec.md`
- `openspec/specs/patterns/notifications/spec.md`
- `openspec/specs/patterns/touch-gestures/spec.md`
- `openspec/specs/patterns/internationalization/spec.md`

### Load based on detected platform:
- Web: `openspec/specs/platforms/web/spec.md`
- iOS: `openspec/specs/platforms/ios/spec.md`
- Android: `openspec/specs/platforms/android/spec.md`
- Desktop: `openspec/specs/platforms/desktop/spec.md`
- TV: `openspec/specs/platforms/tv/spec.md`
- Wearable: `openspec/specs/platforms/wearable/spec.md`
- Flutter/React Native: `openspec/specs/platforms/cross-platform/spec.md`

---

## Phase 3: Scan & Analyze

### 3a. Show Progress

As you scan, show progress updates:

```
  Scanning Project
  ────────────────
  [1/7] Reading style.css...
  [2/7] Reading index.html...
  [3/7] Reading dashboard.tsx...
  ...
  [7/7] Evaluating against 189 requirements...
```

### 3b. Scan Logic

Identify all UI-relevant files in the user's project:
- Web: `**/*.html`, `**/*.css`, `**/*.scss`, `**/*.jsx`, `**/*.tsx`, `**/*.vue`, `**/*.svelte`
- iOS: `**/*.swift`
- Android: `**/*.kt`, `**/*.xml` (layout files)
- Flutter: `**/*.dart`
- React Native: `**/*.jsx`, `**/*.tsx`
- Desktop: Same as web + framework-specific files

Read each file and evaluate against loaded specs. For each requirement:
1. Check if the requirement applies to this file
2. Determine the enforcement level (MUST/SHOULD/CONSIDER)
3. If violated, record: file, line(s), requirement ID, specific issue, estimated fix effort

### 3c. Visual Rendering Analysis

In addition to structural checks, perform these visual-level analyses on CSS/style files:

**Text Overlap Detection:**
- Find elements with fixed `height`/`max-height` containing text but no `overflow` strategy
- Find `white-space: nowrap` without `text-overflow: ellipsis`
- Find `position: absolute/fixed` on text without explicit bounds
- Find negative margins near text elements
- Flag `-webkit-line-clamp` without a way to access full text (title, aria-label, expand button)

**Color Scheme Analysis:**
- Extract ALL unique color values (hex, rgb, hsl, named, CSS variables) from all CSS
- Count total unique colors — flag if > 15 (indicates missing design system)
- Check for pure `#000` on `#fff` — suggest softer alternatives
- Identify the accent/brand colors and check if they're also used for error/danger states (dual-purpose)
- Check for highly saturated colors (> 80% HSL saturation) used on large surface areas
- Look for near-complementary text/background pairs with high saturation (vibrating colors)
- Verify colors used for different states/categories are perceptibly distinct (>= 30deg hue difference)

**Spacing Optimization Analysis:**
- Extract all margin/padding values across the project — check if they follow a consistent scale
- Measure spacing between form labels and their inputs (should be 4-8px)
- Measure spacing between consecutive form fields (should be 16-24px)
- Check card/container padding for balance (all sides roughly proportional)
- Check if spacing decreases in media queries for mobile viewports
- Compare intra-group spacing vs. inter-group spacing (related elements should be closer)
- Flag spacing values that don't fit the base grid (if one is used)

Present the color analysis as a dedicated section in the report:

```
  Color Palette Analysis
  ──────────────────────
  Unique colors found: 23 (recommended: 12-15)
  Accent colors: 3 (recommended: 1-2)
  
  Issues:
  - #ff4d6a used for both brand accent AND error states
  - #5a5e70 text on #0f1117 background: 2.2:1 contrast (need 4.5:1)
  - Pure #000000 found — consider off-black for softer readability
  
  Palette health: Needs work
```

### 3d. Group Cross-File Findings

If the same violation appears in multiple files (e.g., "missing skip nav on all pages"), **combine them into a single finding** with a file list rather than repeating the finding N times.

Format grouped findings as:
```
Files: index.html, about.html, dashboard.html (3 files)
```

### 3d. Estimate Fix Effort

For each finding, assign an effort estimate:
- **Quick fix** (< 5 min): Adding an attribute, changing a value, adding a CSS rule
- **Moderate** (5-30 min): Refactoring a component, adding a new CSS section, restructuring markup
- **Involved** (30+ min): Adding focus trapping, implementing a theme system, restructuring navigation

---

## Phase 4: Calculate Score

Compute a weighted score out of 100 using this formula:

### Scoring Algorithm

```
Total possible points = (MUST_count * 3) + (SHOULD_count * 2) + (CONSIDER_count * 1)
Points lost = (MUST_violations * 3) + (SHOULD_violations * 2) + (CONSIDER_violations * 1)
Raw score = ((Total possible - Points lost) / Total possible) * 100
Final score = max(0, round(Raw score))
```

### Score Grade

| Score | Grade | Label |
|-------|-------|-------|
| 90-100 | A | Excellent |
| 80-89 | B | Good |
| 70-79 | C | Needs Improvement |
| 60-69 | D | Significant Issues |
| 0-59 | F | Critical Issues |

### Category Breakdown

Also compute per-category scores using the same formula:
- Accessibility
- Foundations
- Components
- Patterns
- Platform

---

## Phase 5: Present Results

### 5a. Score Dashboard with Visual Meter

Display the score prominently with a visual bar:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Design Review Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Overall Score

  62/100  [████████████░░░░░░░░]  D — Significant Issues

  Category Breakdown:
  ┌─────────────────────┬───────┬────────────────────────┬───────┐
  │ Category            │ Score │ Meter                  │ Grade │
  ├─────────────────────┼───────┼────────────────────────┼───────┤
  │ Accessibility       │ 45    │ ████████░░░░░░░░░░░░   │ F     │
  │ Foundations          │ 72    │ ██████████████░░░░░░   │ C     │
  │ Components           │ 68    │ █████████████░░░░░░░   │ D     │
  │ Patterns             │ 70    │ ██████████████░░░░░░   │ C     │
  │ Platform (Web)       │ 80    │ ████████████████░░░░   │ B     │
  └─────────────────────┴───────┴────────────────────────┴───────┘

  14 errors | 12 warnings | 5 suggestions
  Estimated fix time: ~3-4 hours
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 5b. Quick Win Sprint

Immediately after the score dashboard, show a **"Quick Win Sprint"** — the top 5-8 fixes that give the most score improvement for the least effort. This is the highest-impact section of the entire review.

```
──────────────────────────────────────────────
  Quick Win Sprint — 15 minutes to jump from 62 to 78
──────────────────────────────────────────────
  Do these 6 fixes and gain +16 points:

  Fix 1 (+3 pts, ~2 min) REQ-TYPO-001: Body text size
  ┌─ style.css:24 ─────────────────────────────────────┐
  │ BEFORE:  font-size: 14px;                          │
  │ AFTER:   font-size: 16px;                          │
  └────────────────────────────────────────────────────┘

  Fix 2 (+3 pts, ~2 min) REQ-A11Y-O-008: Skip navigation
  ┌─ All HTML files ───────────────────────────────────┐
  │ ADD as first child of <body>:                      │
  │                                                    │
  │   <a href="#main" class="skip-link">               │
  │     Skip to main content                           │
  │   </a>                                             │
  └────────────────────────────────────────────────────┘

  Fix 3 (+3 pts, ~1 min) REQ-A11Y-P-002: Muted text contrast
  ┌─ style.css:8 ──────────────────────────────────────┐
  │ BEFORE:  --text-muted: #5a5e70;  /* 2.2:1 ratio */│
  │ AFTER:   --text-muted: #9399ad;  /* 4.7:1 ratio */│
  └────────────────────────────────────────────────────┘

  Fix 4 (+2 pts, ~3 min) REQ-WEB-001: Semantic landmarks
  ┌─ All HTML files ───────────────────────────────────┐
  │ BEFORE:  <div class="container">                   │
  │ AFTER:   <main id="main" class="container">        │
  │                                                    │
  │ BEFORE:  <div class="nav-bar">                     │
  │ AFTER:   <header><nav class="nav-bar">             │
  └────────────────────────────────────────────────────┘

  Fix 5 (+3 pts, ~3 min) REQ-MOTION-001: Reduced motion
  ┌─ style.css (add at end) ───────────────────────────┐
  │ ADD:                                               │
  │                                                    │
  │   @media (prefers-reduced-motion: reduce) {        │
  │     *, *::before, *::after {                       │
  │       transition-duration: 0.01ms !important;      │
  │       animation-duration: 0.01ms !important;       │
  │     }                                              │
  │   }                                                │
  └────────────────────────────────────────────────────┘

  Fix 6 (+2 pts, ~4 min) REQ-FORM-001: Form labels
  ┌─ index.html:20 ────────────────────────────────────┐
  │ BEFORE:  <input placeholder="Search...">           │
  │ AFTER:   <label for="search" class="sr-only">      │
  │            Search                                  │
  │          </label>                                  │
  │          <input id="search" placeholder="Search...">│
  └────────────────────────────────────────────────────┘

  ─────────────────────
  Sprint total: +16 points in ~15 minutes
  Score after sprint: 62 → 78 (D → C+)
  ─────────────────────
```

**CRITICAL:** Every finding MUST include a before/after code box like the examples above. This is what makes the review actionable. Never just describe a fix in prose — show the exact code change.

### 5c. Color Palette Analysis (if applicable)

If the project has CSS with color values, show a visual palette summary:

```
──────────────────────────────────────────────
  Color Palette Analysis
──────────────────────────────────────────────

  Extracted 23 unique colors (recommended: 12-15)

  Backgrounds:   #0f1117  #1a1d27  #252830  #2a2d35
  Text:          #ffffff  #e0e0e0  #8b8fa3  #5a5e70
  Accent:        #ff4d6a  #3b82f6  #22c55e
  Borders:       #2d3140  #3d4155
  Misc:          #f59e0b  #ef4444  #8b5cf6  #06b6d4
                 #374151  #4b5563  #6b7280  #9ca3af

  Issues Found:
  ┌────────────────────────────────────────────────────┐
  │ [MUST]  #5a5e70 on #0f1117 = 2.2:1 contrast       │
  │         Need 4.5:1 → change to #9399ad (4.7:1)    │
  │                                                    │
  │ [SHOULD] #ff4d6a used for BOTH brand accent AND    │
  │          error/delete states — users can't tell     │
  │          "brand" from "danger"                     │
  │          → Add --color-error: #ef4444              │
  │                                                    │
  │ [SHOULD] 23 unique colors — 8 aren't from any      │
  │          token/variable (inline hex values)        │
  │          → Consolidate into CSS custom properties   │
  └────────────────────────────────────────────────────┘

  Palette health: Needs cleanup
```

### 5d. Spacing Analysis (if applicable)

Show the extracted spacing values to visualize inconsistency:

```
──────────────────────────────────────────────
  Spacing Analysis
──────────────────────────────────────────────

  Spacing values found (sorted): 
  4px  5px  6px  7px  8px  10px  12px  13px  
  15px  16px  18px  20px  22px  24px  30px  40px

  On 8pt grid:  4  8  16  24  40  (5 values)
  Off-grid:     5  6  7  10  12  13  15  18  20  22  30  (11 values)

  ┌────────────────────────────────────────────────────┐
  │ 69% of spacing values are OFF the grid             │
  │                                                    │
  │ Suggested spacing scale:                           │
  │   --space-1: 4px    --space-2: 8px                 │
  │   --space-3: 12px   --space-4: 16px                │
  │   --space-5: 24px   --space-6: 32px                │
  │   --space-7: 48px   --space-8: 64px                │
  │                                                    │
  │ Map: 5px→4px  6px→8px  7px→8px  10px→8px           │
  │      13px→12px  15px→16px  18px→16px  22px→24px    │
  │      30px→32px                                     │
  └────────────────────────────────────────────────────┘
```

### 5e. Remaining Findings by Fix Session

After the Quick Win Sprint and visual analyses, group remaining findings into **Fix Sessions** — batches of related fixes that can be done together in one focused session, organized by file or theme.

```
──────────────────────────────────────────────
  Fix Session 1: Accessibility Landmarks & Structure
  5 findings | ~20 min | +8 pts
──────────────────────────────────────────────

  Files: index.html, crew.html, compare.html, hours.html,
         weekly.html, trips.html

  1.1  REQ-TYPO-008: Add heading hierarchy
  ┌─ All HTML files ───────────────────────────────────┐
  │ BEFORE:  <div class="card-title">Fleet Dashboard</div>│
  │ AFTER:   <h1>Fleet Dashboard</h1>                  │
  │                                                    │
  │ BEFORE:  <div class="card-title">Vehicle Status</div>│
  │ AFTER:   <h2>Vehicle Status</h2>                   │
  └────────────────────────────────────────────────────┘

  1.2  REQ-LIST-002: Table accessibility
  ┌─ All HTML files with tables ───────────────────────┐
  │ ADD:     <caption class="sr-only">                 │
  │            Fleet vehicle status                    │
  │          </caption>                                │
  │ CHANGE:  <th> → <th scope="col">                   │
  └────────────────────────────────────────────────────┘

  1.3  REQ-NAV-001: Active nav state
  ┌─ All HTML files ───────────────────────────────────┐
  │ BEFORE:  <a class="nav-link active" ...>           │
  │ AFTER:   <a class="nav-link active"                │
  │             aria-current="page" ...>               │
  └────────────────────────────────────────────────────┘

  ...

──────────────────────────────────────────────
  Fix Session 2: CSS & Styling Cleanup
  4 findings | ~15 min | +6 pts
──────────────────────────────────────────────

  File: public/css/style.css

  2.1  REQ-WEB-004: Focus visible styles
  ┌─ style.css:214-217 ────────────────────────────────┐
  │ BEFORE:                                            │
  │   input:focus, select:focus {                      │
  │     outline: none;                                 │
  │     border-color: var(--accent);                   │
  │   }                                                │
  │                                                    │
  │ AFTER:                                             │
  │   input:focus-visible, select:focus-visible {      │
  │     outline: 2px solid var(--accent);              │
  │     outline-offset: 2px;                           │
  │   }                                                │
  │   button:focus-visible {                           │
  │     outline: 2px solid var(--accent);              │
  │     outline-offset: 2px;                           │
  │   }                                                │
  └────────────────────────────────────────────────────┘

  ...
```

### 5f. What's Working Well

Always include positives — be specific about WHY these are good:

```
──────────────────────────────────────────────
  What's Working Well
──────────────────────────────────────────────

  1. Cohesive dark design system
     Your CSS custom property palette (--bg-primary, --text-primary,
     --accent) is well-structured. 12 of 15 background/text colors
     come from variables — that's good token discipline.

  2. Consistent navigation pattern
     Same nav on all 6 pages with matching active indicator.
     This passes REQ-NAV-004 (consistent placement) and partially
     REQ-NAV-001 (current location — just needs aria-current).

  3. Good semantic element usage
     <nav>, <table>, <button>, <label>, <select> used correctly.
     Tables use proper <thead>/<tbody>. This is a stronger foundation
     than most projects we review.

  4. Thoughtful product UX
     Split-view pattern, progress bars, abort buttons, and the
     step-by-step Compare workflow show strong product thinking
     beyond just visual design.
```

### 5g. Score Projection

Show what the score would be after fixing each session:

```
──────────────────────────────────────────────
  Score Projection
──────────────────────────────────────────────

  Current:          62/100  [████████████░░░░░░░░]  D

  After Sprint:     78/100  [███████████████░░░░░]  C+
  + Session 1:      86/100  [█████████████████░░░]  B
  + Session 2:      92/100  [██████████████████░░]  A-
  + All remaining:  97/100  [███████████████████░]  A

  Time to B grade: ~35 min (Sprint + Session 1)
  Time to A grade: ~2 hours (all sessions)
```

### 5h. Interactive Next Steps

Use **AskUserQuestion** to offer next steps:

**Question:** "What would you like to do next?"

**Options:**
1. **Run the Quick Win Sprint** — Auto-fix the top 6 issues in ~15 minutes, gain +16 points *(Recommended)*
2. **Run Fix Session 1** — Fix accessibility landmarks & structure (~20 min, +8 pts)
3. **Auto-fix ALL errors** — Fix all MUST violations across all sessions
4. **Deep dive into a category** — Explore one category's findings in detail
5. **Save report to file** — Write `design-review.md` to disk
6. **I'll fix these myself** — Done for now

---

## Phase 6: Auto-Fix Mode

When the user chooses to fix (either from the menu or via `/design-review --fix`):

### 6a. Fix Plan with Point Preview

Before making changes, show the plan with expected score impact:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Fix Plan: Quick Win Sprint
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  6 fixes across 7 files
  Expected score change: 62 → 78 (+16 points)

  Files that will be modified:
    public/css/style.css (2 changes)
    public/index.html (2 changes)
    public/crew.html (1 change)
    public/compare.html (1 change)
    public/hours.html (1 change)
    public/weekly.html (1 change)
    public/trips.html (1 change)

  Shall I proceed? (y/n)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Wait for confirmation before making changes.

### 6b. Apply Fixes with Live Progress

For each fix, show a before/after diff as it's applied:

```
  Applying fix 1/6: REQ-TYPO-001 (body text size)
  ┌─ style.css:24 ─────────────────────────────────────┐
  │ - font-size: 14px;                                 │
  │ + font-size: 16px;                                 │
  └────────────────────────────────────────────────────┘
  Done. (+3 pts)

  Applying fix 2/6: REQ-A11Y-O-008 (skip navigation)
  ┌─ index.html:1 (and 5 other files) ─────────────────┐
  │ + <a href="#main" class="skip-link">               │
  │ +   Skip to main content                           │
  │ + </a>                                             │
  └────────────────────────────────────────────────────┘
  Done. (+3 pts)

  ...
```

Group related fixes that affect the same file — make all edits to a file at once.

### 6c. Post-Fix Score Comparison

After fixes are applied, show a prominent before/after:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Fix Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Before:   62/100  [████████████░░░░░░░░]  D
  After:    78/100  [███████████████░░░░░]  C+    +16 pts

  Applied: 6 fixes across 7 files

  Category Impact:
  ┌─────────────────────┬────────┬────────┬────────┐
  │ Category            │ Before │ After  │ Change │
  ├─────────────────────┼────────┼────────┼────────┤
  │ Accessibility       │ 45     │ 65     │ +20    │
  │ Foundations          │ 72     │ 78     │ +6     │
  │ Components           │ 68     │ 72     │ +4     │
  │ Patterns             │ 70     │ 73     │ +3     │
  │ Platform (Web)       │ 80     │ 83     │ +3     │
  └─────────────────────┴────────┴────────┴────────┘

  Remaining: 8 errors | 10 warnings | 5 suggestions
  Next milestone: B grade at 80 — needs 2 more points
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 6d. Offer Next Round

Use **AskUserQuestion** again:

**Question:** "Sprint complete! Score: 62 → 78. What next?"

**Options:**
1. **Run Fix Session 1** — Accessibility landmarks & structure (+8 pts, ~20 min)
2. **Run all remaining sessions** — Fix everything (~2 hours)
3. **Re-run the full review** — Verify all fixes and get updated score
4. **Done for now** — End the review session

---

## Phase 7: Save Report (when requested)

Write a `design-review.md` file to the project root with:

```markdown
# Design Review Report

**Generated:** [date]
**Project:** [name]
**Platform:** [platform]
**Score:** [score]/100 ([grade])
**OpenUI Guide:** v1.0.0

## Score Breakdown

| Category | Score | Grade | Errors | Warnings | Suggestions |
|----------|-------|-------|--------|----------|-------------|
| Accessibility | 45 | F | 8 | 0 | 0 |
| ... | ... | ... | ... | ... | ... |

## Findings

### Priority 1 — High Impact, Quick Fix
[findings...]

### Priority 2 — High Impact, Moderate Effort
[findings...]

...

## What's Working Well
[positives...]

## Badge
You can add this badge to your README:
[![Design Score: 62/100](https://img.shields.io/badge/Design_Score-62%2F100-f97316?style=flat-square)](https://github.com/makhage/openuiguide)
```

---

## Re-Review Mode

When invoked in a project that already has a `design-review.md` file:

1. Read the previous report to get the old score
2. Run the full review
3. Show a **comparison**:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Design Review — Progress Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Previous Score: 62/100 (D)
  Current Score:  84/100 (B)    +22 points

  Category Changes:
  ┌─────────────────────┬────────┬─────────┬────────┐
  │ Category            │ Before │ After   │ Change │
  ├─────────────────────┼────────┼─────────┼────────┤
  │ Accessibility       │ 45     │ 78      │ +33    │
  │ Foundations          │ 72     │ 82      │ +10    │
  │ Components           │ 68     │ 85      │ +17    │
  │ Patterns             │ 70     │ 80      │ +10    │
  │ Platform (Web)       │ 80     │ 92      │ +12    │
  └─────────────────────┴────────┴─────────┴────────┘

  Issues Resolved: 11 of 14 errors fixed
  New Issues: 0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Interaction Shortcuts

These shortcuts skip the interactive flow and go directly to the specified mode:

| Command | Behavior |
|---------|----------|
| `/design-review` | Full interactive flow (Phase 1-5) |
| `/design-review --fix` | Full review + auto-fix Priority 1 issues |
| `/design-review --fix-all` | Full review + auto-fix all MUST violations |
| `/design-review --diff` | Review only changed files since last commit |
| `/design-review --diff main` | Review only changes vs. main branch |
| `/design-review --pr` | Review current PR + post findings as PR comment |
| `/design-review --pr 123` | Review PR #123 + post comments |
| `/design-review --html` | Full review + save as HTML report |
| `/design-review --strict` | Full review with confidence threshold 50 (show more) |
| `/design-review --lenient` | Full review with confidence threshold 85 (less noise) |
| `/design-review --score` | Quick scan, show score dashboard only |
| `/design-review --spec accessibility` | Accessibility audit only |
| `/design-review --spec visual` | Visual design review only |
| `/design-review --spec visual-polish` | Text overlap + color harmony + spacing optimization |
| `/design-review --spec colors` | Color scheme analysis (harmony, saturation, dual-purpose) |
| `/design-review --spec animations` | Motion + micro-interactions review |
| `/design-review --spec cta` | CTA placement, copy, prominence, conversion patterns |
| `/design-review --spec dataviz` | Chart/graph accessibility and best practices |
| `/design-review --spec copy` | UX writing, microcopy, and content quality |
| `/design-review --spec gestures` | Touch gesture patterns (mobile/tablet) |
| `/design-review --spec i18n` | Internationalization readiness |
| `/design-review --spec consistency` | Visual consistency (radius, shadows, tokens) |
| `/design-review --spec security` | Security & trust UX (auth, privacy, data masking) |
| `/design-review --spec performance` | Performance UX (CWV, images, fonts, rendering) |
| `/design-review --spec cognitive` | Cognitive load (complexity, choices, progressive disclosure) |
| `/design-review --spec ai` | AI interface patterns (disclosure, confidence, fallbacks) |
| `/design-review --spec search` | Search & filtering UX |
| `/design-review --spec notifications` | Notification & communication patterns |
| `/design-review --spec components` | Component review only |
| `/design-review --save` | Full review + save to `design-review.md` |
| `/design-review --summary` | Score + top 5 issues only |
| `/design-review --demo` | Demo readiness check (lorem ipsum, placeholders, TODOs, console.logs) |
| `/design-review --health` | Design system health (token usage %, raw value count, design debt) |
| `/design-review --history` | View score trend over time without re-running review |
| `/design-review --benchmark` | Compare scores across your projects |
| `/design-review --no-suppress` | Ignore all inline suppression comments |

---

## Important Guidelines for Reviewers

1. **Use AskUserQuestion at decision points.** Don't assume what the user wants — present options at each phase transition.
2. **Never override creative choices without asking.** If a developer uses a non-standard color palette, explain the principle but respect their intent.
3. **Always cite the requirement ID** so developers can look up the full rationale in the spec files.
4. **Group cross-file findings.** If 6 files all miss the same thing, show it once with a file list.
5. **Prioritize by impact and effort.** Lead with quick wins that have the biggest impact.
6. **Show progress.** Update the user as you scan each file.
7. **Celebrate what's working.** Always highlight 2-4 positive aspects.
8. **Be educational, not critical.** Frame findings as learning opportunities.
9. **Context matters.** A fleet dashboard has different density needs than a meditation app.
10. **Show the score change after fixes.** Positive reinforcement drives adoption.

---

## Confidence Scoring System

*Inspired by Anthropic's code-review plugin and anthroos/claude-code-review-skill.*

Every finding MUST be assigned a **confidence score (0-100)** measuring how certain you are that the finding is a genuine issue and not a false positive.

### Scoring Scale

| Score | Meaning | Action |
|-------|---------|--------|
| 90-100 | Absolutely certain — clear violation with evidence | Always report |
| 70-89 | Highly confident — strong evidence, real issue | Report (default threshold) |
| 50-69 | Moderately confident — likely real but could be intentional | Report only in verbose mode |
| 25-49 | Somewhat confident — might be a false positive | Suppress |
| 0-24 | Low confidence — probably fine | Suppress |

### Default Threshold: 70

Only report findings with confidence >= 70. This dramatically reduces noise.

### How to Score Confidence

- **100:** Missing alt text on `<img>` with no `aria-label` → definitely a violation
- **95:** `outline: none` with no replacement focus style → almost certainly wrong
- **80:** Inline styles overriding CSS variables → probably unintentional, could be a quick fix
- **60:** Card padding of `18px` instead of `16px` → might be intentional for visual balance
- **40:** Dark-only theme with no light mode → might be a deliberate design choice
- **20:** Button labeled "Go" → might be appropriate in context (search forms)

### Adjusting Threshold

Users can adjust via flags:
- `/design-review --strict` → threshold 50 (show more findings)
- `/design-review --lenient` → threshold 85 (show only high-confidence)
- Default: 70

---

## Parallel Multi-Agent Architecture

*Inspired by Anthropic's pr-review-toolkit (6 agents) and code-review (5 parallel Sonnet agents).*

For **Full Review** mode, dispatch **5 specialized review agents** running in parallel, each responsible for one domain. This is faster and produces better results than a single agent reading all 45 specs.

### Agent Dispatch

```
  Dispatching Review Agents
  ─────────────────────────
  Agent 1: Accessibility Auditor    → WCAG 2.2 specs (32 requirements)
  Agent 2: Visual Design Reviewer   → Foundations specs (87 requirements)
  Agent 3: Component Inspector      → Component specs (58 requirements)
  Agent 4: Pattern Analyzer         → Pattern specs (103 requirements)
  Agent 5: Platform Checker         → Platform-specific specs (49 requirements)
  
  Running in parallel...
```

### Each Agent's Process

1. Load only its assigned spec files
2. Scan all UI files against its requirements
3. Score each finding (0-100 confidence)
4. Filter findings below threshold (default 70)
5. Return structured results: `{ findings: [...], positives: [...], score: N }`

### Result Merging

After all agents complete:
1. Merge all findings into a single list
2. De-duplicate overlapping findings (same file + same line from different agents)
3. Sort by priority (confidence * impact weight)
4. Compute overall and per-category scores
5. Present the unified report

### Agent Models

- **Full review agents:** Use Sonnet for speed (5 agents in parallel)
- **Confidence scoring:** Use Haiku for quick 0-100 scoring of each finding
- **Summary generation:** Use the primary model for final report assembly

---

## Git-Diff Mode

*Inspired by anthroos/claude-code-review-skill's git blame analysis.*

When invoked with `--diff`, only review files that changed since the last commit, branch point, or PR.

### Triggers

| Command | Behavior |
|---------|----------|
| `/design-review --diff` | Review files changed since last commit |
| `/design-review --diff main` | Review files changed vs. main branch |
| `/design-review --diff PR` | Review files changed in current PR |

### Process

1. Run `git diff --name-only [target]` to get changed files
2. Filter to UI-relevant files only (CSS, HTML, JSX, TSX, Vue, Svelte, etc.)
3. For each changed file, run `git diff [target] -- [file]` to get the specific changes
4. **Only flag issues in changed lines** — skip pre-existing issues
5. Show a focused report for just the diff

### Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Design Review — Changes Only
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Reviewing 3 changed files (vs. main branch)
  
  Modified: src/components/Header.tsx (+15 -3)
  Modified: src/styles/global.css (+8 -2)
  New:      src/components/Modal.tsx (+45)

  Findings in changed code: 4 errors | 2 warnings
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Auto-Skip Logic

Automatically skip review when:
- No UI files were changed (only .py, .go, .rs, etc.)
- Changes are documentation-only (.md files)
- Changes are test-only (test files)
- Changes are config-only (package.json, tsconfig, etc.)

Show: `"No UI changes detected — skipping design review."`

---

## GitHub PR Integration

*Inspired by Anthropic's code-review plugin's PR posting.*

When invoked with `--pr`, post findings as a GitHub PR review comment.

### Trigger

```
/design-review --pr 123
/design-review --pr          (auto-detect current branch PR)
```

### Process

1. Fetch PR details via `gh pr view`
2. Get the diff via `gh pr diff`
3. Run diff-mode review on changed files only
4. Format findings as PR review comments with file:line references
5. Post via `gh pr review --comment`

### PR Comment Format

```markdown
## Design Review — 4 findings

**Score impact:** This PR would change the design score from 78 → 74 (-4 pts)

### Errors (must fix)

**REQ-A11Y-P-002: Color contrast** (`src/styles/theme.css:42`)
> New `--text-muted` value `#6b7280` on `#111827` background = 3.8:1 contrast.
> Needs 4.5:1. Suggest: `#9ca3af` (4.6:1).
> Confidence: 95/100

### Warnings

**REQ-SOPT-002: Proximity grouping** (`src/components/Form.tsx:28-35`)
> Label-to-input gap (24px) equals inter-group gap (24px). Related elements
> should be closer than unrelated groups.
> Suggestion: Reduce label gap to 8px.
> Confidence: 72/100
```

---

## HTML Report Export

*Inspired by huifer/skill-security-scan's HTML output.*

When invoked with `--html`, generate a self-contained HTML report file.

### Trigger

```
/design-review --html
```

### Output

Generates `design-review-report.html` with:
- Embedded CSS (no external dependencies)
- Score dashboard with visual meters
- Expandable finding sections
- Color palette visualization (actual color swatches)
- Spacing scale visualization
- Before/after code diffs with syntax highlighting
- Print-friendly layout
- Timestamp and project metadata

This is useful for:
- Sharing with team members who don't use Claude Code
- Including in project documentation
- Client deliverables
- Historical record of design quality

---

## Anti-Pattern Callouts

*Inspired by Anthropic's frontend-design plugin and superpowers' HARD-GATE tags.*

Throughout the review, explicitly call out known anti-patterns — things that are **always wrong** regardless of context. These go beyond MUST requirements to flag patterns that indicate fundamental UX mistakes.

### Design Anti-Patterns (NEVER do these)

```
  ANTI-PATTERNS DETECTED
  ──────────────────────

  [AP-001] Placeholder as only label
  Input fields using placeholder text as the sole label. Placeholders
  disappear on focus — users forget what the field is for.
  Found: 4 inputs across 2 files

  [AP-002] Disabled submit with no explanation
  Submit button is disabled but no visible text explains why.
  Users don't know what to fix to enable it.
  Found: compare.html:84

  [AP-003] Color as sole differentiator
  Status badges use only color (red/green/yellow) with no text or
  icon — colorblind users can't distinguish them.
  Found: index.html:45-52

  [AP-004] Infinite scroll with no way back
  Long list uses infinite scroll but no "Back to top" button and
  no URL state — users who navigate away lose their position.
  Found: trips.html

  [AP-005] Modal on page load
  A modal/dialog appears immediately on page load before the user
  has seen the content. This is universally annoying.
  Not found (good!)
```

### Complete Anti-Pattern Registry

| ID | Anti-Pattern | Why It's Always Wrong |
|----|-------------|----------------------|
| AP-001 | Placeholder as only label | Disappears on focus, fails WCAG |
| AP-002 | Disabled button, no explanation | Users can't figure out what to do |
| AP-003 | Color as sole differentiator | ~8% of men are colorblind |
| AP-004 | Infinite scroll, no URL state | Users lose position on back navigation |
| AP-005 | Modal on page load | Blocks content before user engages |
| AP-006 | Horizontal scroll on mobile | Layout broken, content inaccessible |
| AP-007 | Auto-playing video with sound | Startling, violates WCAG 1.4.2 |
| AP-008 | Text in images (non-logo) | Can't translate, resize, or screen-read |
| AP-009 | "Click here" link text | Meaningless to screen readers |
| AP-010 | Form that clears on error | User loses all input and has to restart |
| AP-011 | Tiny close button on modal | Frustrating, fails touch target minimum |
| AP-012 | Carousel as primary navigation | Users miss most slides, kills conversion |
| AP-013 | Confirm shaming ("No thanks, I hate savings") | Dark pattern, erodes trust |
| AP-014 | Select dropdown for <5 options | Radio buttons are faster for small lists |
| AP-015 | Custom scrollbar that breaks native behavior | Breaks momentum scroll, accessibility |

---

## Aesthetic Direction Guidance

*Inspired by Anthropic's frontend-design plugin's bold aesthetic framework.*

When the user selects a visual personality in the discovery interview (Phase 1c, Question 4), apply these aesthetic guidelines throughout the review. Instead of just checking against rules, guide toward a **distinctive design identity**.

### Aesthetic Directions

**Clean & Minimal:**
- Expect: generous whitespace (40-80px sections), limited color palette (3-5 colors), thin borders or none, system fonts or one elegant typeface
- Flag: excessive shadows, gradients, decorative borders, more than 2 font families
- Celebrate: restraint, precision in spacing, invisible grid alignment

**Bold & Energetic:**
- Expect: strong color contrasts, large CTAs, dynamic motion, oversized typography for impact
- Flag: muted colors, timid button sizes, missing hover animations, generic layouts
- Celebrate: confident color choices, prominent CTAs, energetic micro-interactions

**Dark & Technical:**
- Expect: dark backgrounds, monospace accents, high information density, subtle borders
- Don't flag: dark-only theme, tighter spacing, higher density
- Celebrate: well-crafted dark palette, readable text on dark backgrounds, code-like precision

**Warm & Friendly:**
- Expect: rounded corners (12px+), soft shadows, warm colors, generous padding, illustrations
- Flag: sharp corners mixed with round, cold/clinical color choices, dense layouts
- Celebrate: approachable typography, soft color transitions, inviting empty states

**When reviewing, reference the aesthetic direction:**
*"Your warm & friendly aesthetic calls for rounded corners — the 4px border-radius on these cards feels too sharp. Consider 12-16px for a softer feel that matches your personality."*

---

## CI/CD Integration

For automated design review in pull request pipelines:

### GitHub Actions Workflow

```yaml
name: Design Review
on:
  pull_request:
    paths:
      - '**/*.html'
      - '**/*.css'
      - '**/*.scss'
      - '**/*.jsx'
      - '**/*.tsx'
      - '**/*.vue'
      - '**/*.svelte'

jobs:
  design-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run design review
        run: |
          claude "/design-review --diff ${{ github.event.pull_request.base.ref }} --pr ${{ github.event.pull_request.number }} --strict"
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

This runs the design review on every PR that touches UI files and posts findings as PR comments.

---

## Audit History & Trend Tracking

*Inspired by Ultraship's audit-history and growth-tracker.*

Track design review scores over time to show improvement trends. Store snapshots after each review.

### How It Works

After each review, save a snapshot to `.design-review-history.json`:

```json
{
  "snapshots": [
    {
      "date": "2026-03-15",
      "score": 62,
      "grade": "D",
      "findings": { "errors": 14, "warnings": 12, "suggestions": 5 },
      "categories": {
        "accessibility": 45,
        "foundations": 72,
        "components": 68,
        "patterns": 70,
        "platform": 80
      },
      "files_reviewed": 7,
      "requirements_checked": 329
    }
  ]
}
```

### Trend Display

When a previous snapshot exists, show the trend in the score dashboard:

```
  Score History
  ─────────────
  Mar 15    62/100  [████████████░░░░░░░░]  D
  Mar 22    74/100  [██████████████░░░░░░]  C    +12
  Apr 01    86/100  [█████████████████░░░]  B    +12
  Apr 08    91/100  [██████████████████░░]  A-   +5    (current)

  Trend: +29 points over 3 weeks
  Velocity: ~10 pts/week
```

### Trigger

- Auto-saves after every full review
- `/design-review --history` to view trend without re-running review

---

## Demo Readiness Check

*Inspired by Ultraship's demo-prep tool.*

Before a demo, launch, or client presentation, scan for embarrassing artifacts that shouldn't be in production UI.

### Trigger

```
/design-review --demo
```

### What It Checks

```
  Demo Readiness Scan
  ───────────────────

  Checking for presentation-blocking issues...

  [FAIL] Lorem ipsum text found
         src/components/About.tsx:12 — "Lorem ipsum dolor sit amet..."
         src/pages/pricing.html:45 — "Lorem ipsum dolor sit..."

  [FAIL] Placeholder images
         public/images/avatar-placeholder.png used in production
         src/components/Hero.tsx:8 — src="https://via.placeholder.com/800x400"

  [FAIL] TODO/FIXME comments in UI code
         src/components/Header.tsx:23 — "// TODO: fix mobile nav"
         src/styles/theme.css:8 — "/* FIXME: contrast too low */"

  [FAIL] Console.log statements
         src/components/Dashboard.tsx:45 — console.log("debug data:", data)
         src/utils/api.ts:12 — console.log("response:", res)

  [PASS] Favicon present (favicon.ico found)
  [PASS] No broken image references
  [PASS] No test/debug routes exposed
  [FAIL] Missing Open Graph meta tags (no og:title, og:image)

  ─────────────────────
  Demo Readiness: 4/8 checks passed (50%)
  Status: NOT READY — fix 4 issues before presenting
  ─────────────────────
```

---

## Content Readability Scoring

*Inspired by Ultraship's content-scorer (Flesch-Kincaid analysis).*

Analyze the readability of user-facing text — headings, button labels, error messages, descriptions, tooltips.

### When It Runs

Included automatically in Full Review. Also available via:
```
/design-review --spec readability
```

### What It Checks

- **Flesch-Kincaid Grade Level** of UI text (target: grade 6-8 for consumer apps, 8-12 for professional tools)
- **Average sentence length** in descriptions and help text (target: < 20 words)
- **Jargon detection** — flag technical terms in user-facing UI ("null", "exception", "deprecated", "payload")
- **Passive voice** in instructions (prefer "Click Save" over "The save button should be clicked")
- **Reading time** for onboarding text, help docs, and long-form content

### Output

```
  Content Readability
  ───────────────────

  Scanned 47 user-facing text strings

  Readability Grade: 9.2 (target: 6-8 for consumer apps)
  Average Sentence Length: 18 words (target: < 20)
  Passive Voice: 23% of instructions (target: < 10%)

  Issues:
  ┌────────────────────────────────────────────────────┐
  │ [SHOULD] error.html:12 — "An unexpected exception  │
  │   has occurred during the processing of your        │
  │   request." (Grade 14, 15 words, passive voice)    │
  │   → "Something went wrong. Please try again."      │
  │                                                    │
  │ [SHOULD] settings.tsx:45 — "Deprecated legacy      │
  │   authentication provider" (jargon: deprecated,     │
  │   legacy, authentication, provider)                │
  │   → "Old sign-in method (no longer supported)"     │
  └────────────────────────────────────────────────────┘
```

---

## Inline Finding Suppression

*Inspired by anthroos/claude-code-review-skill's false positive controls.*

Allow developers to suppress specific findings when a violation is intentional.

### Suppression Comments

Add these comments to suppress a specific requirement on the next line or block:

**HTML:**
```html
<!-- design-review-disable REQ-SPACE-001 — intentional 6px gap for visual alignment -->
<div style="margin: 6px;">
```

**CSS:**
```css
/* design-review-disable REQ-TYPO-001 — 14px intentional for compact data table */
.data-table { font-size: 14px; }
```

**JSX/TSX:**
```jsx
{/* design-review-disable REQ-A11Y-P-002 — contrast verified with client, brand requirement */}
<p className="brand-muted">Brand tagline</p>
```

### How It Works

1. During scan (Phase 3), check each line for `design-review-disable REQ-XXX-NNN` comments
2. If found, skip that requirement for the next line/block
3. Track all suppressions and report them in a separate section:

```
  Suppressed Findings (3)
  ───────────────────────
  REQ-SPACE-001 in header.html:12 — "intentional 6px gap for visual alignment"
  REQ-TYPO-001 in style.css:45 — "14px intentional for compact data table"
  REQ-A11Y-P-002 in Hero.tsx:8 — "contrast verified with client, brand requirement"

  Note: Suppressed findings are excluded from the score.
```

### Suppression Rules

- Suppressions MUST include a reason (the `—` explanation)
- MUST-level accessibility findings show a warning even when suppressed:
  *"This finding is suppressed but affects accessibility. Ensure the exemption is documented."*
- `/design-review --no-suppress` ignores all suppression comments

---

## Design System Health Check

*Inspired by Ultraship's pattern-analyzer and bundle-tracker.*

Measure how well the project uses its own design system — are tokens actually being used? Is the component library consistent?

### Trigger

```
/design-review --health
```

### What It Measures

```
  Design System Health
  ────────────────────

  Token Usage:
  ┌──────────────────┬────────┬──────────┬────────┐
  │ Token Type       │ Defined│ Used     │ Usage  │
  ├──────────────────┼────────┼──────────┼────────┤
  │ Colors           │ 12     │ 9 of 12  │ 75%    │
  │   + 8 raw hex values not from tokens          │
  │ Spacing          │ 8      │ 5 of 8   │ 63%    │
  │   + 11 raw px values not from tokens          │
  │ Typography       │ 6      │ 4 of 6   │ 67%    │
  │   + 5 inline font-size values                 │
  │ Border Radius    │ 3      │ 2 of 3   │ 67%    │
  │   + 4 raw px values not from tokens           │
  │ Shadows          │ 4      │ 3 of 4   │ 75%    │
  └──────────────────┴────────┴──────────┴────────┘

  Token Adoption: 69% (target: 90%+)
  Raw Values Found: 28 (target: 0)
  Design Debt Score: Medium

  Top Offenders (most raw values):
  1. style.css — 12 raw values
  2. inline styles across 6 HTML files — 9 raw values
  3. components/Card.tsx — 4 raw values
  4. pages/dashboard.tsx — 3 raw values
```

---

## Proactive Contextual Triggering

*Inspired by Anthropic's pr-review-toolkit auto-triggering.*

The skill should proactively suggest running when it detects relevant context:

### Auto-Suggest Triggers

| Context | Suggestion |
|---------|-----------|
| User just created/modified CSS or HTML files | "I noticed you changed UI files. Want me to run a quick design review on the changes? (`/design-review --diff`)" |
| User is about to commit UI changes | "Before you commit — want a quick design check? (`/design-review --diff`)" |
| User asks "how does it look?" or "is this good?" | Auto-trigger visual design review on recent changes |
| User is building a new component | "Want me to review this component against the design specs? (`/design-review --spec components`)" |
| User mentions "demo", "launch", "ship", "deploy" | "Want me to run a demo readiness check? (`/design-review --demo`)" |

### How to Implement

In the skill description (frontmatter), include trigger phrases:
```yaml
triggers:
  - "review my design"
  - "check my UI"
  - "how does it look"
  - "is this accessible"
  - "design audit"
  - "check accessibility"
  - "review the frontend"
  - "is this ready for demo"
```

---

## Cross-Project Benchmarking

*Inspired by Ultraship's compete-analyzer.*

Compare design scores between your projects or across teams.

### Trigger

```
/design-review --benchmark
```

### How It Works

1. Read `.design-review-history.json` from the current project
2. If the user has multiple projects with history files, show a comparison:

```
  Cross-Project Benchmark
  ───────────────────────

  ┌─────────────────────┬───────┬───────┬─────────────────┐
  │ Project             │ Score │ Grade │ Trend           │
  ├─────────────────────┼───────┼───────┼─────────────────┤
  │ ramspy-dashboard    │ 86    │ B     │ +24 (3 weeks)   │
  │ marketing-site      │ 91    │ A-    │ +8 (2 weeks)    │
  │ mobile-app          │ 73    │ C     │ new             │
  │ admin-panel         │ 68    │ D     │ -2 (1 week)     │
  └─────────────────────┴───────┴───────┴─────────────────┘

  Best: marketing-site (91/100)
  Needs attention: admin-panel (68/100, declining)
```

3. Show which categories each project struggles with:

```
  Weakest Categories Across Projects:
  1. Accessibility — avg 58/100 (3 of 4 projects below 70)
  2. Performance UX — avg 65/100 (2 projects below 70)
  3. Visual Consistency — avg 71/100
```
