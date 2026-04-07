# Patterns: Call-to-Action (CTA) and Conversion

## Overview

A Call-to-Action is the moment of truth in any interface — where browsing becomes doing. Whether it is signing up, purchasing, downloading, or starting a trial, CTAs bridge the gap between interest and action. Poorly designed CTAs waste traffic; well-designed ones respect the user's attention, communicate value clearly, and make the desired action effortless. This spec covers CTA design, placement, and conversion optimization while drawing a firm line against manipulative patterns.

## Requirements

### REQ-CTA-001: Single Primary CTA Per Screen/Section

**Enforcement:** `SHOULD` | NNGroup, Conversion Optimization Research, Material Design 3 FAB Pattern
**Platforms:** All
**Detectable:** Heuristic — find buttons per section, check if multiple have primary/accent styling

#### Why This Matters
When multiple CTAs compete for attention — same size, same color, same prominence — users experience decision paralysis. The interface screams "everything is important" which means nothing is. A single, visually dominant CTA guides the eye and makes the next step obvious.

#### The Principle
- Each screen or major section SHOULD have one clearly dominant CTA
- The primary CTA should be visually heavier than secondary actions: filled button, larger size, accent color
- Secondary actions (e.g., "Learn More", "Compare Plans") should use outlined, text, or ghost button styles
- If two actions are genuinely equal in importance, reconsider the page structure — split them into separate sections with their own context

#### Creative Freedom
You decide the specific accent color, button shape, shadow depth, and animation. The requirement is hierarchy, not homogeneity. A bold text link can outperform a button if the visual weight is right.

---

### REQ-CTA-002: CTA Above the Fold

**Enforcement:** `SHOULD` | NNGroup, Baymard Institute
**Platforms:** All
**Detectable:** Heuristic — check vertical position of primary CTA relative to viewport height

#### Why This Matters
Users who land on a page and cannot see how to take action without scrolling may bounce before discovering the CTA. "Above the fold" does not mean cramming everything into the top 600px — it means the primary action should be reachable without effort on initial load.

#### The Principle
- The primary CTA SHOULD be visible without scrolling on the initial viewport
- For long pages (landing pages, product pages), repeat the CTA at natural decision points: after feature lists, after testimonials, and at the bottom
- Repeating the same CTA is fine — it serves users who reach conviction at different scroll depths
- Do not sacrifice context for placement; a CTA with no preceding value proposition converts poorly regardless of position

#### Creative Freedom
The exact fold line varies by device and viewport. Use judgment about what "visible on load" means for your audience. A hero section with a CTA is a common pattern, but not the only valid one.

---

### REQ-CTA-003: Action-Oriented CTA Copy

**Enforcement:** `SHOULD` | NNGroup, UX Writing Best Practice
**Platforms:** All
**Detectable:** Heuristic — analyze button text content, flag generic labels (Submit, Click Here, Go, OK, Next, Continue without context)

#### Why This Matters
The button label is a micro-commitment. "Submit" tells the user nothing about what happens next. "Create My Account" tells them exactly what will happen and frames it as something they own. Good CTA copy reduces anxiety and increases follow-through.

#### The Principle
- CTA button labels SHOULD start with a verb and describe the outcome, not the mechanical action
- Good: "Get Started", "Create Account", "Download Free Guide", "Start Free Trial"
- Bad: "Submit", "Click Here", "Go", "OK", "Next" (without context)
- The label should answer: "What happens when I click this?"
- Keep labels concise — 2 to 5 words is the sweet spot
- Avoid jargon or internal terminology in CTA labels

#### Creative Freedom
Tone, voice, and personality in CTA copy are yours to define. "Let's Go", "Grab Your Spot", "Join the Club" can all be effective depending on brand voice. The requirement is clarity and action-orientation, not formality.

---

### REQ-CTA-004: CTA Visual Contrast Against Surroundings

**Enforcement:** `SHOULD` | Conversion Optimization, Visual Hierarchy Principles
**Platforms:** All
**Detectable:** Heuristic — compare CTA button color against section background, check if it stands out

#### Why This Matters
WCAG contrast ratios measure text legibility, not visual prominence. A muted gray button on a slightly lighter gray background can technically pass WCAG AA while being nearly invisible in the visual hierarchy. The CTA needs to pop — it should be the element the eye is drawn to.

#### The Principle
- The primary CTA button SHOULD have strong visual contrast against its surrounding background
- This is about visual prominence, not just WCAG text contrast
- The CTA should be the most visually prominent interactive element in its section
- Use color, size, whitespace, or all three to make it stand out
- Avoid placing CTAs on busy backgrounds (complex images, patterns) without a solid container or overlay

#### Creative Freedom
How you achieve contrast is up to you — a vibrant button on a neutral background, a light button on a dark hero image, a floating FAB with a shadow. The mechanism varies; the principle of standing out does not.

---

### REQ-CTA-005: CTA Size Proportional to Importance

**Enforcement:** `SHOULD` | Fitts's Law, Material Design 3 Button Hierarchy
**Platforms:** All
**Detectable:** Heuristic — compare button dimensions, primary should be >= secondary in both dimensions

#### Why This Matters
Fitts's Law tells us that larger targets are faster and easier to hit. A small, thin CTA communicates "this is optional" even when it is the most important action on the page. On mobile, undersized buttons lead to tap errors and frustration.

#### The Principle
- The primary CTA SHOULD be larger than secondary actions in both padding and font size
- On mobile, the primary CTA should be full-width or nearly full-width for easy tapping
- Minimum touch target: 44x44pt (iOS), 48x48dp (Android) — but primary CTAs should exceed minimums
- Do not make the CTA so large it feels aggressive or out of proportion with the page design
- Size hierarchy should mirror importance hierarchy: primary > secondary > tertiary

#### Creative Freedom
Exact dimensions, padding ratios, and responsive scaling are design decisions. A wide button with generous padding can feel inviting; a tall narrow button can feel urgent. Match size to intent and brand.

---

### REQ-CTA-006: Limit CTAs Per Page

**Enforcement:** `SHOULD` | Hick's Law, Conversion Optimization
**Platforms:** All
**Detectable:** Heuristic — count distinct CTA button labels/destinations per page

#### Why This Matters
Hick's Law: the time to make a decision increases with the number of choices. A page with "Sign Up", "Get Demo", "Download Whitepaper", "Watch Video", "Start Free Trial", and "Contact Sales" all competing as CTAs creates noise. Each additional CTA dilutes the effectiveness of all the others.

#### The Principle
- A page SHOULD have no more than 3 distinct CTA types
- Repeated instances of the same CTA (e.g., "Sign Up" appearing 3 times on a long page) is fine and often encouraged
- If more than 3 CTAs are genuinely needed, the page is likely trying to serve too many audiences — consider separate landing pages
- Prioritize: one primary CTA, one or two secondary CTAs at most

#### Creative Freedom
What counts as "distinct" is a judgment call. "Start Free Trial" and "Get Started" pointing to the same flow may count as one. Use common sense about user perception.

---

### REQ-CTA-007: CTA Proximity to Value Proposition

**Enforcement:** `SHOULD` | NNGroup, Persuasive Design
**Platforms:** All
**Detectable:** Heuristic — check if CTA buttons are preceded by descriptive content within the same section

#### Why This Matters
A CTA without context is a request without justification. "Sign Up" at the very top of a page before the user knows what they are signing up for converts poorly. CTAs work best when they appear at the moment of peak motivation — right after the user has read something compelling.

#### The Principle
- CTAs SHOULD appear immediately after the content that justifies them
- Effective sequences: benefit statement then CTA, feature description then CTA, social proof then CTA
- The CTA should feel like a natural next step, not an interruption
- For hero sections, pair the CTA with a concise value proposition (headline + subheadline + CTA)
- Avoid orphaned CTAs floating in whitespace with no surrounding context

#### Creative Freedom
The content that precedes a CTA can be a headline, a paragraph, a testimonial, a video, a comparison table, or an illustration. The requirement is proximity to justification, not a specific content type.

---

### REQ-CTA-008: CTA Loading and Feedback State

**Enforcement:** `MUST` | Nielsen's Visibility of System Status, UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check if primary form submit buttons have loading/disabled state handling

#### Why This Matters
Users who click a CTA and see nothing happen will click again — and again. For actions like payment processing or account creation, this can cause duplicate submissions, double charges, or confusing error states. The moment a user clicks is the moment they are most invested; silence feels like betrayal.

#### The Rule
- When a CTA triggers an async action (form submit, payment, account creation), it MUST show a loading state
- Acceptable loading states: spinner inside the button, text change ("Creating..." / "Processing..."), progress indicator
- The button MUST be disabled or debounced during the async operation to prevent duplicate submissions
- On completion, provide clear success feedback (redirect, success message, visual confirmation) or clear error feedback (inline error, toast)
- Do not remove the button during loading — replace its content but keep its position stable

#### Platform Implementation Notes
- **Web:** Disable the button and swap content to a spinner or loading text. Use `aria-busy="true"` and `aria-disabled="true"` for screen readers. Prevent form resubmission with JavaScript, not just `disabled` attribute.
- **iOS (SwiftUI):** Use `ProgressView()` inside the button. Disable interaction with `.disabled(isLoading)`. Update `accessibilityLabel` to reflect loading state.
- **Android (Compose):** Use `CircularProgressIndicator` inside the button composable. Set `enabled = false` during loading. Update `semantics { stateDescription = "Loading" }`.
- **React Native:** Use `ActivityIndicator` inside `TouchableOpacity` or `Pressable`. Set `disabled={isLoading}`. Update `accessibilityState={{ busy: true }}`.

---

### REQ-CTA-009: No Dark Patterns in CTAs

**Enforcement:** `MUST` | FTC Dark Pattern Guidelines, GDPR, Ethical Design Principles
**Platforms:** All
**Detectable:** Heuristic — check if dismiss/cancel buttons are styled to be barely visible while promoted action is prominent, check for manipulative copy patterns

#### Why This Matters
Dark patterns exploit cognitive biases to trick users into actions they did not intend. They erode trust, increase churn, generate support tickets, and increasingly attract regulatory scrutiny. Short-term conversion gains from dark patterns are wiped out by long-term reputation damage and potential legal liability.

#### The Rule
- CTAs MUST NOT make the undesired option look like a CTA while hiding the preferred user action (e.g., making "Accept All Cookies" a bright button while "Manage Preferences" is a tiny text link)
- CTAs MUST NOT use shame language: "No, I don't want to save money", "No thanks, I prefer to pay full price"
- Cancel, decline, and dismiss actions MUST be visually accessible — not hidden, not microscopic, not disguised as body text
- Preselected checkboxes for upsells, newsletters, or add-ons MUST NOT be buried or disguised
- The visual hierarchy between "accept" and "decline" should reflect a genuine choice, not a coerced one

#### Creative Freedom
It is fine for the desired business action to be visually primary — that is standard visual hierarchy (REQ-CTA-001). The line is crossed when the alternative is deliberately made hard to find, hard to read, or emotionally manipulative.

---

### REQ-CTA-010: Persistent/Sticky CTA for Long Pages

**Enforcement:** `CONSIDER` | Mobile Conversion Patterns, E-commerce Best Practice
**Platforms:** All (especially mobile)
**Detectable:** Heuristic — check for `position: sticky` or `position: fixed` on CTA containers

#### Why This Matters
On long scrollable pages — landing pages, product detail pages, pricing pages — the user may reach conviction at any scroll depth. Without a visible CTA, they must scroll back up to act. A persistent CTA eliminates this friction and captures intent at the moment it forms.

#### The Principle
- For long scrollable pages, CONSIDER a sticky/fixed CTA that remains visible as the user scrolls
- Preferred placement: bottom bar (not floating overlay that obscures content)
- The sticky CTA should not obscruct readable content — ensure body content has enough bottom padding
- On desktop, sticky CTAs are less critical (users can scroll quickly) but still useful for very long pages
- Consider showing the sticky CTA only after the user scrolls past the initial CTA (avoid doubling up on first viewport)

#### Platform Implementation Notes
- **Web:** Use `position: sticky; bottom: 0;` on a CTA bar container. Add `padding-bottom` to the body to prevent content from hiding behind it. Use `z-index` judiciously.
- **iOS (SwiftUI):** Use `.safeAreaInset(edge: .bottom)` to pin a CTA bar below scrollable content. This automatically adjusts scroll view insets.
- **Android (Compose):** Use `Scaffold` with `bottomBar` to place a persistent CTA. Alternatively, use `Box` with `Modifier.align(Alignment.BottomCenter)` over a `LazyColumn`.
- **React Native:** Use absolute positioning with `bottom: 0` inside a container, or use a `SafeAreaView` wrapper. Ensure the scroll content has bottom padding matching the CTA bar height.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-CTA-001 | Single Primary CTA Per Screen/Section | SHOULD | Heuristic |
| REQ-CTA-002 | CTA Above the Fold | SHOULD | Heuristic |
| REQ-CTA-003 | Action-Oriented CTA Copy | SHOULD | Heuristic |
| REQ-CTA-004 | CTA Visual Contrast Against Surroundings | SHOULD | Heuristic |
| REQ-CTA-005 | CTA Size Proportional to Importance | SHOULD | Heuristic |
| REQ-CTA-006 | Limit CTAs Per Page | SHOULD | Heuristic |
| REQ-CTA-007 | CTA Proximity to Value Proposition | SHOULD | Heuristic |
| REQ-CTA-008 | CTA Loading and Feedback State | MUST | Heuristic |
| REQ-CTA-009 | No Dark Patterns in CTAs | MUST | Heuristic |
| REQ-CTA-010 | Persistent/Sticky CTA for Long Pages | CONSIDER | Heuristic |

## Platform Implementation Notes

- **Web:** Use semantic `<button>` or `<a>` elements for CTAs — never `<div onclick>`. Use `role="button"` only when a non-button element must function as one. For visual hierarchy, rely on CSS classes (`.btn-primary`, `.btn-secondary`) rather than inline styles. Use `aria-busy` and `aria-disabled` for loading states.
- **iOS (SwiftUI):** Use `.buttonStyle(.borderedProminent)` for primary CTAs and `.buttonStyle(.bordered)` or `.buttonStyle(.plain)` for secondary actions. Use `.tint()` to set accent color. For sticky CTAs, use `.safeAreaInset(edge: .bottom)`. Ensure minimum 44pt touch targets with `.frame(minHeight: 44)`.
- **Android (Compose):** Use `Button` for primary CTAs, `OutlinedButton` for secondary, and `TextButton` for tertiary. Material Design 3's `FloatingActionButton` serves as a persistent primary CTA. Use `Modifier.fillMaxWidth()` for full-width mobile CTAs. Ensure minimum 48dp touch targets.
- **React Native:** Use `Pressable` (preferred) or `TouchableOpacity` for CTA buttons. Apply visual hierarchy through style props. Use `accessibilityRole="button"` and `accessibilityLabel` for screen readers. For full-width mobile CTAs, use `alignSelf: 'stretch'` or explicit width.

## Further Reading

- [NNGroup: Call to Action Buttons](https://www.nngroup.com/articles/call-to-action-buttons/)
- [NNGroup: Scrolling and Attention](https://www.nngroup.com/articles/scrolling-and-attention/)
- [Baymard Institute: CTA Design](https://baymard.com/blog)
- [Material Design 3: Buttons](https://m3.material.io/components/buttons/overview)
- [Fitts's Law and UX](https://www.nngroup.com/articles/fitts-law/)
- [NNGroup: Dark Patterns](https://www.nngroup.com/articles/dark-patterns/)
- [FTC: Bringing Dark Patterns to Light](https://www.ftc.gov/reports/bringing-dark-patterns-light)
- [Hick's Law in UX](https://www.nngroup.com/articles/hicks-law-ux/)
