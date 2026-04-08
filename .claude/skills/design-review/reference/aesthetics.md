# Aesthetic Direction Guide

When the user selects a visual personality (via discovery interview or `.designreviewrc.json`), use these detailed guidelines to shape how findings are framed and which rules are adjusted.

## Clean & Minimal

**Inspiration:** Apple, Linear, Notion, Stripe
**Keywords:** Restraint, precision, invisible grid, breathing room

**Expect and celebrate:**
- Generous whitespace (48-96px between sections)
- Limited color palette (3-5 colors max)
- Thin borders or borderless design
- System fonts or one elegant typeface (Inter, SF Pro, Söhne)
- Consistent 8pt grid with no exceptions
- Subtle shadows (0 2px 4px rgba(0,0,0,0.05))
- Smooth, minimal transitions (150-200ms, ease-out)

**Flag as inconsistent with personality:**
- More than 3 shadow depths
- Gradient backgrounds (unless very subtle)
- Decorative borders, patterns, or textures
- More than 2 font families
- Heavy box shadows (blur > 20px)
- Bold/loud accent colors on large surfaces
- Complex animations or staggered entrances

**Adjusted requirements:**
- REQ-SOPT-007 (section breathing room): INCREASE minimum to 64px
- REQ-HIER-006 (emphasis restraint): Weight HIGHER — flag any bold overuse
- REQ-VCON-001 (border radius): Expect 0px or very small (2-4px)
- REQ-COLOR-003 (max palette hues): Reduce to 3-4

---

## Bold & Energetic

**Inspiration:** Figma, Vercel, Framer, Duolingo
**Keywords:** Confident, dynamic, high-contrast, attention-grabbing

**Expect and celebrate:**
- Strong color contrasts and saturated accents
- Large, prominent CTAs (full-width on mobile)
- Oversized typography for hero sections (48px+)
- Dynamic hover animations and transitions
- Bold button styles with strong visual weight
- Energetic micro-interactions (bounce, spring easing)
- Asymmetric or grid-breaking layouts

**Flag as inconsistent with personality:**
- Muted, washed-out colors
- Timid button sizes (small, low-contrast)
- Missing hover/active animations on interactive elements
- Generic, predictable layouts (same-size cards in a grid)
- Lack of visual hierarchy (everything same weight)
- No motion at all (static feel)

**Adjusted requirements:**
- REQ-CTA-005 (CTA size): Weight HIGHER — primary CTA must dominate
- REQ-MICRO-001 (button press feedback): Weight HIGHER — mandatory
- REQ-MICRO-002 (hover transitions): Weight HIGHER — all interactive elements
- REQ-COLOR-003 (max palette hues): Allow up to 7 with strong contrast

---

## Dark & Technical

**Inspiration:** GitHub, VS Code, Raycast, Warp, Arc
**Keywords:** Precision, density, monospace accents, command-line feel

**Expect and celebrate:**
- Dark backgrounds (#0d1117 to #1a1d27 range)
- High information density with clear hierarchy
- Monospace or code-style typography accents
- Subtle borders (1px solid rgba(255,255,255,0.1))
- Compact spacing (8-16px internal padding)
- Keyboard shortcut indicators
- Terminal-inspired UI elements

**Flag as inconsistent with personality:**
- Rounded corners > 8px (keep sharp: 4-6px)
- Bright, warm colors on large surfaces
- Generous whitespace that wastes screen real estate
- Playful illustrations or emoji
- Large, padded buttons (keep compact)

**Adjusted requirements:**
- REQ-DARK-001 (system preference): REDUCE — dark-only is acceptable
- REQ-SOPT-010 (content density): Accept "data-dense" as default
- REQ-SPACE-008 (whitespace as design): Don't flag tight spacing
- REQ-TYPO-001 (min body size): Accept 14px for data-dense contexts
- REQ-SOPT-007 (section breathing): Reduce to 24-32px

---

## Warm & Friendly

**Inspiration:** Notion (light mode), Headspace, Mailchimp, Slack
**Keywords:** Approachable, soft, rounded, inviting, human

**Expect and celebrate:**
- Rounded corners (12-16px on cards, 8px on inputs)
- Soft shadows with warm tones
- Warm color palette (oranges, yellows, soft blues, muted purples)
- Generous padding (16-24px internal)
- Friendly, conversational copy
- Illustrations or hand-drawn elements
- Gentle animations (ease-in-out, 200-300ms)

**Flag as inconsistent with personality:**
- Sharp corners (0-2px border radius) mixed with rounded ones
- Cold, clinical color choices (pure gray, stark blue)
- Dense layouts with tight spacing
- Aggressive CTAs ("BUY NOW", "LAST CHANCE")
- System fonts (prefer friendly typefaces: Nunito, Poppins, Plus Jakarta Sans)

**Adjusted requirements:**
- REQ-VCON-001 (border radius): Expect 12-16px consistently
- REQ-SOPT-003 (card padding): Expect generous (20-24px)
- REQ-COPY-008 (no blame language): Weight HIGHER
- REQ-COPY-005 (positive empty states): Weight HIGHER
- REQ-MICRO-009 (exit animations): Weight HIGHER — smooth dismissals important

---

## Neutral / Not Sure Yet

When the user selects "Not sure yet" or no personality is configured:
- Apply all requirements at their default enforcement levels
- Don't make aesthetic judgments
- Focus on objective issues (accessibility, functionality, performance)
- Note: *"Consider defining a visual personality — it helps create a cohesive, intentional design. Run `/design-review --init` to set one."*
