# Components: Cards and Containers

## Overview

Cards are self-contained units of content — a product listing, a social post, a settings group. They chunk information into scannable pieces and create clear visual boundaries. Professional card design is about consistency: same padding, same corner radius, same shadow treatment, same content structure across your entire application.

## Key Concepts

### LEARN: Container Hierarchy

Interfaces use layers of containment to organize content:
1. **Page/Screen** — the outermost container (background color)
2. **Sections** — major content areas (separated by spacing or dividers)
3. **Cards** — self-contained content groups (elevated or bordered surfaces)
4. **Inline groups** — smaller groupings within cards (field groups, button rows)

Material Design 3 calls these **surface levels**, each with a subtle tonal difference to indicate depth.

---

## Requirements

### REQ-CARD-001: Consistent Card Styling

**Enforcement:** `SHOULD` | Design Systems Best Practice
**Platforms:** All
**Detectable:** Heuristic — flag cards with inconsistent padding, radius, or elevation

#### Why This Matters
When one card has 16px padding and another has 20px, one has 8px border-radius and another has 12px, one has a shadow and another has a border — the interface feels assembled from spare parts. Consistent card tokens create visual cohesion.

#### The Principle
- Define card tokens: `--card-padding`, `--card-radius`, `--card-elevation`/`--card-border`
- All cards of the same type should use the same visual treatment
- Cards at the same hierarchy level should have the same surface style

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | `padding: var(--card-padding); border-radius: var(--card-radius); box-shadow: var(--card-shadow);` |
| SwiftUI | Create a reusable card modifier or `ViewModifier` for consistent styling |
| Compose | Use `Card(shape = RoundedCornerShape(12.dp), elevation = CardDefaults.cardElevation())` consistently |
| Flutter | Use `Card(shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)))` consistently |

---

### REQ-CARD-002: Card as Interactive Unit

**Enforcement:** `SHOULD` | Material Design 3
**Platforms:** All
**Detectable:** Heuristic — check if tappable cards have appropriate semantics

#### Why This Matters
If tapping a card navigates somewhere, the entire card should be the tap target — not just the title link. But the card also needs proper semantics so screen readers and keyboard users can interact with it.

#### The Principle
- If a card is tappable, make the **entire card the tap target**
- On web: wrap content in an `<a>` or use a click handler on the card with `role="link"` or `role="button"`
- Provide hover/focus states on the entire card
- If the card has multiple interactive elements (link + menu + button), only the primary action should be the card-level interaction

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Use `<article>` with a stretched link: `<a class="stretched-link" href="...">Title</a>` |
| SwiftUI | `NavigationLink { DetailView() } label: { CardContent() }` |
| Compose | `Card(onClick = { navigate() })` |
| Flutter | `InkWell(onTap: () => navigate(), child: CardContent())` |

---

### REQ-CARD-003: Content Structure Within Cards

**Enforcement:** `SHOULD` | Material Design 3, UX Best Practice
**Platforms:** All
**Detectable:** Manual review only

#### Why This Matters
Cards with no internal structure — just a blob of text — are hard to scan. A clear visual hierarchy within the card (media → header → body → actions) makes each card scannable in under 2 seconds.

#### The Principle
- Cards SHOULD follow a consistent **internal structure**:
  1. **Media** (optional) — image, video, or illustration at top
  2. **Header** — title (and optional subtitle/metadata)
  3. **Body** — description or content
  4. **Actions** (optional) — buttons, links, overflow menu at bottom
- Maintain this order consistently across all cards of the same type
- Content should be left-aligned within cards (LTR languages)

---

### REQ-CARD-004: Container Surface Differentiation

**Enforcement:** `CONSIDER` | Material Design 3
**Platforms:** All
**Detectable:** Heuristic — check for visual distinction between container levels

#### Why This Matters
When cards sit on a background that's the same color with no border or shadow, the containment is invisible. Users can't tell where one card ends and another begins. Surface differentiation (elevation, border, tonal shift) makes boundaries clear.

#### The Principle
- Cards should be visually distinct from their background through at least ONE of:
  - **Elevation** (box-shadow/drop shadow)
  - **Border** (subtle outline)
  - **Tonal surface** (slightly different background color)
- Nested containers should use progressively different surface tones
- Choose one containment strategy and use it consistently

#### Creative Freedom
Shadows feel dimensional. Borders feel clean and flat. Tonal surfaces feel modern and subtle. All are valid — pick the one that matches your design language.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-CARD-001 | Consistent Card Styling | SHOULD | Heuristic |
| REQ-CARD-002 | Card as Interactive Unit | SHOULD | Heuristic |
| REQ-CARD-003 | Content Structure Within Cards | SHOULD | Manual |
| REQ-CARD-004 | Container Surface Differentiation | CONSIDER | Heuristic |

## Further Reading

- [Material Design 3: Cards](https://m3.material.io/components/cards/overview)
- [Apple HIG: Content Containers](https://developer.apple.com/design/human-interface-guidelines/content)
- [NNGroup: Cards in UI Design](https://www.nngroup.com/articles/cards-component/)
