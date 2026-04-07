# Patterns: Cognitive Load & UI Complexity

## Overview

Every interface asks users to think. Every button, label, option, and layout decision adds to the mental effort required. Cognitive load is the total amount of mental processing power a user must spend to understand and use your interface. When cognitive load exceeds working memory capacity, users make mistakes, feel overwhelmed, and abandon tasks. The best interfaces feel effortless — not because they lack features, but because they carefully manage how much they ask of users at any given moment.

## Requirements

### REQ-COGLOAD-001: Limit Choices Per Screen

**Enforcement:** `SHOULD` | Hick-Hyman Law
**Platforms:** All
**Detectable:** Automated — count interactive elements per section/screen

#### Why This Matters
Hick-Hyman Law states that the time it takes to make a decision increases logarithmically with the number of choices. A navigation bar with 12 items, a form with 20 visible fields, or a settings page with 30 toggles overwhelms users and causes decision paralysis. Reducing choices to the essential few lets users act faster and with more confidence.

#### The Rule
- Any single screen or section SHOULD present no more than **5-7 primary choices**
- Navigation menus SHOULD group items into categories rather than presenting a flat list of 10+ items
- If more options are necessary, use grouping, tabs, or progressive disclosure to reduce the visible set
- Distinguish **primary actions** (1-2 per screen) from secondary and tertiary actions visually

#### Creative Freedom
The 5-7 guideline is not a hard ceiling — it applies to *primary* choices competing for attention at the same level of hierarchy. A data table with 50 rows is fine because the rows are uniform and scannable. The goal is to avoid decision paralysis, not to arbitrarily restrict content.

---

### REQ-COGLOAD-002: Progressive Disclosure

**Enforcement:** `SHOULD` | Miller's Law, NNGroup Research
**Platforms:** All
**Detectable:** Heuristic — check if long forms/settings have grouping or expandable sections

#### Why This Matters
Showing everything at once forces users to parse information they may not need. Progressive disclosure keeps the default experience simple while making advanced capabilities accessible on demand. It respects both novice users (who need simplicity) and power users (who need depth).

#### The Principle
- Show only **essential information and controls** upfront; reveal details on demand
- Advanced settings SHOULD be behind an "Advanced" toggle or expandable section
- Extra form fields SHOULD be behind a "Show more" or "Additional options" control
- Detailed data rows SHOULD support expand/collapse for secondary information
- Help text and documentation SHOULD be available on demand (tooltips, popovers, "Learn more" links) rather than permanently visible

#### Creative Freedom
What counts as "essential" depends entirely on your user base. A developer tool may surface more controls by default than a consumer app. The principle is: don't front-load complexity for the majority to serve a minority of use cases.

---

### REQ-COGLOAD-003: Chunking Long Forms

**Enforcement:** `SHOULD` | Miller's Law, UX Research
**Platforms:** All
**Detectable:** Automated — count form fields per page/form element

#### Why This Matters
Miller's Law tells us that working memory holds roughly 7 (plus or minus 2) items. A 20-field form on one page overwhelms working memory, leading to higher abandonment rates. The same fields split across 3 logical steps feel manageable because users focus on one chunk at a time.

#### The Principle
- Forms with more than **6-8 fields** SHOULD be split into logical steps (wizard/stepper pattern) or grouped into collapsible sections
- Each step or group should have a clear, descriptive label ("Personal Info", "Payment", "Review")
- A progress indicator SHOULD show users where they are and how much remains
- Users SHOULD be able to navigate back to previous steps without losing data
- Within each step, fields should follow a logical order (name before address, email before phone)

#### Creative Freedom
Short, simple forms (login, search, contact) do not need to be split into steps — that would add unnecessary friction. Chunking is for complex, multi-concern forms like registration flows, checkout processes, or profile editors.

---

### REQ-COGLOAD-004: Sensible Defaults

**Enforcement:** `SHOULD` | Nielsen's Heuristic #6, UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check if selects/radios have a default selected, if fields use autocomplete attributes

#### Why This Matters
Every decision a user must make adds cognitive load. Sensible defaults remove unnecessary decisions by pre-selecting the most likely option. Users who agree with the default simply move on; users who disagree can change it. Either way, the interaction is faster than starting from a blank slate.

#### The Principle
- Pre-select the **most common option** in dropdowns, radio groups, and toggles
- Default to the user's **locale, timezone, and language** when detectable
- Pre-fill **known data** (name, email, address) from user profiles or previous interactions
- Use the `autocomplete` attribute on form fields so browsers can auto-fill
- Date pickers SHOULD default to today's date (or the most contextually relevant date)
- Toggles for common preferences (e.g., email notifications) SHOULD have a sensible default rather than forcing an explicit choice

#### Creative Freedom
Defaults should never be deceptive. Pre-checking a "Subscribe to marketing emails" checkbox is a dark pattern, not a sensible default. Defaults should genuinely reflect the most common or most helpful choice.

---

### REQ-COGLOAD-005: Clear Visual Hierarchy Guides the Eye

**Enforcement:** `SHOULD` | Gestalt Principles, NNGroup Research
**Platforms:** All
**Detectable:** Heuristic — analyze heading sizes, button prominence, whitespace distribution

#### Why This Matters
If everything on a screen is the same size, weight, and color, nothing stands out. Users are forced to read everything sequentially rather than scanning for what matters. A clear visual hierarchy tells users where to look first, second, and third — reducing the mental effort needed to orient themselves.

#### The Principle
- Each screen SHOULD have a **clear visual reading path** — a primary focal point, supporting content, and peripheral elements
- Use **size, weight, and color contrast** to establish importance levels (e.g., large bold heading > medium subheading > body text > muted metadata)
- Primary actions (CTA buttons) SHOULD be visually distinct from secondary actions
- Group related elements using **proximity and whitespace** (Gestalt principle of proximity)
- Avoid "flat" layouts where all elements compete equally for attention
- Headings SHOULD follow a logical hierarchy (h1 > h2 > h3) both visually and semantically

#### Creative Freedom
Visual hierarchy is an art, not a formula. Different design systems achieve hierarchy through different means — typography scale, color, spacing, elevation, or layout position. The requirement is that hierarchy *exists* and is *clear*, not that it follows a specific recipe.

---

### REQ-COGLOAD-006: Reduce Unnecessary Decoration

**Enforcement:** `CONSIDER` | Edward Tufte (Data-Ink Ratio), UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — count decorative CSS properties (box-shadow count, border count, background-image patterns)

#### Why This Matters
Every visual element competes for attention. Purely decorative elements that don't aid comprehension — gratuitous borders, excessive shadows, background patterns, decorative dividers — add visual noise. They dilute the signal of meaningful content and interactive elements, making the interface harder to parse.

#### The Principle
- Avoid excessive use of borders, shadows, and dividers when whitespace alone can create separation
- Background patterns and textures SHOULD serve a purpose (e.g., distinguishing regions) rather than existing purely for decoration
- Minimize the number of distinct visual styles — each additional style adds to the visual vocabulary users must learn
- Icons SHOULD convey meaning; avoid purely decorative icons that add clutter without aiding comprehension
- Consider whether each visual element earns its place by aiding usability or comprehension

#### Creative Freedom
This is explicitly a `CONSIDER`, not a `MUST`. Brand expression, delight, and personality are legitimate design goals. A playful illustration on an empty state, a subtle texture on a hero section, or tasteful shadows for depth are all valid. The caution is against *excess* — decoration that actively harms clarity.

---

### REQ-COGLOAD-007: Consistent Mental Models

**Enforcement:** `SHOULD` | Nielsen's Heuristic #4 (Consistency and Standards)
**Platforms:** All
**Detectable:** Heuristic — compare interaction patterns across similar components

#### Why This Matters
Inconsistency forces users to re-learn interactions. If swiping deletes in one list but archives in another, users cannot build reliable mental models. If clicking a card opens a detail view in one section but triggers an edit modal in another, users lose trust in the interface. Consistency lets users transfer knowledge from one part of your app to another.

#### The Principle
- Similar actions SHOULD work the **same way everywhere** in the application
- If a gesture (swipe, long-press) performs an action in one context, it SHOULD perform the same action in similar contexts
- Navigation patterns SHOULD be consistent — if tapping a list item navigates to a detail view, all list items should behave this way
- Terminology SHOULD be consistent — don't call it "Delete" in one place and "Remove" in another for the same action
- Visual patterns SHOULD be consistent — if blue text means "link" in one place, blue text should mean "link" everywhere
- Follow **platform conventions** (iOS back gestures, Android material patterns, web link styling) unless there is a strong reason not to

#### Creative Freedom
Consistency applies within a single application and with platform norms. It does not mean every app must look identical. Your design system defines your conventions — the requirement is that you follow them consistently once established.

---

### REQ-COGLOAD-008: Recognition Over Recall

**Enforcement:** `SHOULD` | Nielsen's Heuristic #6
**Platforms:** All
**Detectable:** Heuristic — check for search with suggestions, recent items lists, autocomplete on repeat-use fields

#### Why This Matters
Recognition is cognitively easier than recall. Picking from a list of visible options is faster and less error-prone than typing from memory. Showing recent items, suggesting completions, and displaying previously selected values all reduce the burden on users' memory.

#### The Principle
- Search fields SHOULD offer **suggestions and autocomplete** as the user types
- Recently used or frequently accessed items SHOULD be surfaced prominently
- Previously selected values SHOULD be remembered and shown on return visits
- Commands and actions SHOULD be visible in menus rather than requiring memorized keyboard shortcuts (shortcuts can supplement, not replace, visible controls)
- Form fields SHOULD use selection controls (dropdowns, pickers) over free-text input when the set of valid options is known and manageable
- Breadcrumbs, navigation highlights, and page titles SHOULD orient users within the application structure

#### Creative Freedom
Some interfaces intentionally favor recall for expert users — keyboard-driven tools, command palettes, terminal UIs. This is valid when the audience is experienced and speed is paramount. The principle applies most strongly to general-purpose and consumer-facing interfaces.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-COGLOAD-001 | Limit Choices Per Screen | SHOULD | Automated |
| REQ-COGLOAD-002 | Progressive Disclosure | SHOULD | Heuristic |
| REQ-COGLOAD-003 | Chunking Long Forms | SHOULD | Automated |
| REQ-COGLOAD-004 | Sensible Defaults | SHOULD | Heuristic |
| REQ-COGLOAD-005 | Clear Visual Hierarchy | SHOULD | Heuristic |
| REQ-COGLOAD-006 | Reduce Unnecessary Decoration | CONSIDER | Heuristic |
| REQ-COGLOAD-007 | Consistent Mental Models | SHOULD | Heuristic |
| REQ-COGLOAD-008 | Recognition Over Recall | SHOULD | Heuristic |

## Platform Implementation Notes

- **Web (HTML/CSS/JS):** Use `autocomplete` attributes on form inputs for sensible defaults. Implement progressive disclosure with `<details>`/`<summary>` elements or ARIA `aria-expanded` toggles. Multi-step forms can use `<fieldset>` grouping with step indicators. Limit top-level `<nav>` items and use dropdown menus for secondary navigation. Use CSS custom properties for consistent visual hierarchy across components.
- **iOS (SwiftUI):** Use `Form` with `Section` to chunk fields. `DisclosureGroup` provides native progressive disclosure. `NavigationSplitView` manages complexity on larger screens. Use `.searchSuggestions()` for recognition over recall. `.pickerStyle()` and `.defaultValue` support sensible defaults. Follow Human Interface Guidelines for consistent mental models.
- **Android (Compose):** Use `Stepper` or `HorizontalPager` for multi-step forms. `ExpandableCard` or `AnimatedVisibility` for progressive disclosure. `ExposedDropdownMenuBox` with pre-selected values for defaults. `SearchBar` with suggestion chips for recognition. Material Design 3 components enforce consistent visual hierarchy through typography and color roles.
- **React Native:** Use `SectionList` to chunk long lists and forms. Implement progressive disclosure with `Accordion` or `Collapsible` components. Use `FlatList` with recent items for recognition patterns. Platform-specific defaults (locale, timezone) via `react-native-localize`. Ensure consistent gesture handling across screens using shared navigation patterns.

## Sources

- [NNGroup: Cognitive Load](https://www.nngroup.com/articles/minimize-cognitive-load/)
- [NNGroup: Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)
- [NNGroup: Recognition vs. Recall](https://www.nngroup.com/articles/recognition-and-recall/)
- [Hick-Hyman Law](https://lawsofux.com/hicks-law/)
- [Miller's Law](https://lawsofux.com/millers-law/)
- [Nielsen's 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [Edward Tufte: Data-Ink Ratio](https://infovis-wiki.net/wiki/Data-Ink_Ratio)
