# Anti-Pattern Registry

These patterns are **always wrong** regardless of design context, product type, or aesthetic direction. Flag them with maximum confidence (95-100).

## Detection Rules

| ID | Pattern | How to Detect | Confidence |
|----|---------|---------------|------------|
| AP-001 | Placeholder as only label | `<input placeholder="...">` with no associated `<label>` or `aria-label` | 100 |
| AP-002 | Disabled button, no explanation | `<button disabled>` with no adjacent help text explaining why | 95 |
| AP-003 | Color as sole differentiator | Status badges/indicators using only `background-color` with no text or icon variant | 90 |
| AP-004 | Infinite scroll, no URL state | Scroll-based loading with no `history.pushState` or URL query params | 85 |
| AP-005 | Modal on page load | `dialog` or modal `div` with no user-triggered open (auto-shows on DOMContentLoaded) | 95 |
| AP-006 | Horizontal scroll on mobile | Container with `overflow-x: scroll` or content wider than viewport with no responsive handling | 90 |
| AP-007 | Auto-playing video with sound | `<video autoplay>` without `muted` attribute | 100 |
| AP-008 | Text in images (non-logo) | `<img>` elements in content areas with text-like filenames and no CSS text overlay alternative | 80 |
| AP-009 | "Click here" link text | `<a>` with text content matching "click here", "here", "read more", "learn more" without surrounding context | 90 |
| AP-010 | Form clears on error | Form with `reset()` or page reload on validation failure (detected via submit handler patterns) | 90 |
| AP-011 | Tiny close button on modal | Close button (`[aria-label*="close"]`, `.close-btn`) with width/height < 32px | 95 |
| AP-012 | Carousel as primary navigation | Content carousel (`.carousel`, `.slider`, Swiper) used as the main way to access distinct content sections | 80 |
| AP-013 | Confirm shaming | Dismiss/cancel text containing shame language: "No thanks", "I don't want", "I hate", "I'll pass on" | 95 |
| AP-014 | Select dropdown for < 5 options | `<select>` with 2-4 `<option>` children — radio buttons are faster | 75 |
| AP-015 | Custom scrollbar breaking native | `::-webkit-scrollbar` styles that change scroll behavior (not just appearance) | 70 |

## Output Format

When anti-patterns are found, present them in a dedicated section BEFORE the main findings:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ANTI-PATTERNS DETECTED (fix these first)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  AP-001  Placeholder as only label          4 inputs, 2 files
  AP-009  "Click here" link text             1 link
  AP-013  Confirm shaming in modal           1 dialog

  These are universally recognized UX failures. Fix before
  addressing other findings.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Anti-patterns cannot be suppressed

Unlike regular findings, anti-pattern detections cannot be silenced with `design-review-disable` comments. They represent patterns that harm users regardless of context.
