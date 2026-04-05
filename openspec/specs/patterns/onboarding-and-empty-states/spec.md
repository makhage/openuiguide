# Patterns: Onboarding and Empty States

## Overview

First impressions define retention. Onboarding is a user's first experience with your app — it should build confidence, not confusion. Empty states are the moments when there's nothing to show — they should guide, not abandon. Both are opportunities to demonstrate value and reduce abandonment.

## Requirements

### REQ-ONBOARD-001: Progressive Disclosure Over Tutorials

**Enforcement:** `SHOULD` | NNGroup Research
**Platforms:** All
**Detectable:** Manual review only

#### Why This Matters
Multi-step tutorial overlays shown before the user can interact are the most skipped and least effective onboarding pattern. Users don't learn from tutorials — they learn by doing. Progressive disclosure introduces features in context, when they're relevant.

#### The Principle
- Prefer **contextual hints** (tooltips, inline tips) that appear when the user reaches a feature for the first time
- If a walkthrough is needed, make it **interactive** (have the user perform the action, not just read about it)
- Keep initial setup to the **absolute minimum** required to start using the app
- Allow users to **skip** all onboarding at any time
- Don't require account creation before showing value (let users explore first)

---

### REQ-ONBOARD-002: Meaningful Empty States

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for empty state patterns in list/content components

#### Why This Matters
An empty screen with no guidance looks broken. Users wonder: Is it loading? Did something fail? Am I in the wrong place? A well-designed empty state communicates what this screen is for and how to populate it.

#### The Principle
- Empty states SHOULD include:
  1. **What this area is for** — brief explanation
  2. **Why it's empty** — "You haven't added any projects yet"
  3. **What to do next** — a call-to-action: "Create your first project"
- Use a lightweight illustration or icon to soften the empty space
- Distinguish between "first-time empty" (encouraging) and "filtered to empty" (helpful: "No results match your filters. Try adjusting your search.")

---

### REQ-ONBOARD-003: Minimal Signup Friction

**Enforcement:** `CONSIDER` | Conversion Best Practice
**Platforms:** All
**Detectable:** Manual review only

#### Why This Matters
Every field on a signup form reduces conversion. Every step between "I'm interested" and "I'm using it" loses users. The professional approach: get users to value as fast as possible, then ask for information progressively.

#### The Principle
- Collect only what you need to start: email + password (or social login)
- Profile details, preferences, and optional info can come later
- Let users experience the product before requiring account creation when possible
- Use social login options to reduce friction (Google, Apple, etc.)

---

### REQ-ONBOARD-004: First-Run Experience

**Enforcement:** `CONSIDER` | UX Best Practice
**Platforms:** All
**Detectable:** Manual review only

#### Why This Matters
The first screen after signup/login sets expectations. A blank dashboard with no guidance creates confusion. A curated first-run experience — sample data, a welcome message, guided first task — creates confidence and demonstrates value.

#### The Principle
- Show **sample/starter content** on first use rather than empty screens
- Highlight the **primary action** the user should take first
- Offer a brief **welcome message** (not a multi-step tutorial) explaining the product's value
- Make it easy to delete sample content once real content is added

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-ONBOARD-001 | Progressive Disclosure Over Tutorials | SHOULD | Manual |
| REQ-ONBOARD-002 | Meaningful Empty States | SHOULD | Heuristic |
| REQ-ONBOARD-003 | Minimal Signup Friction | CONSIDER | Manual |
| REQ-ONBOARD-004 | First-Run Experience | CONSIDER | Manual |

## Further Reading

- [NNGroup: Onboarding UX](https://www.nngroup.com/articles/onboarding-ux/)
- [Material Design 3: Onboarding](https://m3.material.io/foundations/content-design/onboarding)
- [NNGroup: Empty States](https://www.nngroup.com/articles/empty-state-interface-design/)
