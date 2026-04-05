# Foundations: Iconography and Imagery

## Overview

Icons and images are visual shortcuts that communicate faster than text. A magnifying glass means "search," a trash can means "delete" — when used consistently. But icons can also confuse when they're ambiguous, inconsistent in style, or inaccessible. Professional icon usage follows three rules: be consistent, be clear, and always provide text alternatives.

## Key Concepts

### LEARN: Icon Types

- **System icons** — represent actions or concepts (search, settings, back, share). Small, typically 20-24px.
- **Product icons** — represent your app or brand. Used in launchers, headers. Larger, more detailed.
- **Decorative icons** — purely visual embellishment. Should not convey essential information.

### LEARN: Icon vs. Label

Research consistently shows: **icon + label > icon alone > label alone** for recognition speed and accuracy. Icons without labels rely on users knowing the convention, which varies by age, culture, and platform familiarity.

---

## Requirements

### REQ-ICON-001: Consistent Icon Style

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Manual review only

#### Why This Matters
Mixing outlined icons with filled icons, rounded with sharp, thin-stroke with thick-stroke — it looks like the interface was assembled from different icon packs (because it probably was). Consistent icon style is one of the clearest signals of a polished product.

#### The Principle
- Use icons from a **single icon set or style family**
- All icons should share: same stroke weight, same corner treatment, same optical size
- Filled vs. outlined can be used for state (outlined = inactive, filled = active) if applied consistently
- Don't mix icon sets from different sources

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Use one icon library: Lucide, Phosphor, Heroicons, Material Symbols, or Feather |
| SwiftUI | SF Symbols — Apple's system icons, consistent by default |
| Compose | Material Symbols or Material Icons — use one variant (outlined/rounded/sharp) |
| Flutter | `Icons` class (Material) or a single third-party icon package |

#### Creative Freedom
Your icon style contributes to personality. Rounded icons feel friendly. Sharp/angular icons feel precise. Thin strokes feel elegant. Thick strokes feel bold. Choose what matches your brand.

#### Common Mistakes
- Search icon from Font Awesome, menu icon from Material, arrows from Feather
- Mixing outlined and filled icons for non-state purposes
- Icons at different stroke weights

---

### REQ-ICON-002: Icon Labels for Ambiguous Icons

**Enforcement:** `SHOULD` | NNGroup Research
**Platforms:** All
**Detectable:** Heuristic — flag icon-only buttons without adjacent text or tooltip

#### Why This Matters
The hamburger menu, share icon, and kebab menu are universally recognized. But most other icons are not. A gear could mean settings, preferences, admin, or configuration. Without a label, users guess — and guess wrong. NNGroup research shows icon+label combinations are always faster to use.

#### The Principle
- **Always label icons** when space permits (icon + text label)
- If space is constrained, provide a **tooltip/title** on hover (desktop) or long-press (mobile)
- Only use icon-only for universally recognized symbols: search (magnifying glass), close (×), back (arrow), home (house), navigation (hamburger)
- When in doubt, add a label

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | `<button><svg>...</svg> Settings</button>` or `title="Settings"` attribute |
| SwiftUI | `Label("Settings", systemImage: "gear")` shows both icon and text |
| Compose | `NavigationBarItem(icon = {...}, label = { Text("Settings") })` |
| Flutter | `BottomNavigationBarItem(icon: Icon(...), label: 'Settings')` |

#### Common Mistakes
- Toolbar with 5+ icon-only buttons that require memorization
- Settings icon without any label anywhere
- Non-standard icons used without labels (custom icons are never "obvious")

---

### REQ-ICON-003: Icon Sizing Consistency

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Yes — check icon element sizes

#### Why This Matters
Icons at inconsistent sizes create visual noise. When a 16px icon sits next to a 24px icon with no deliberate reason, it looks careless. Define 2-3 icon sizes and use them consistently.

#### The Principle
- Define **2-3 standard icon sizes** (e.g., 16px small, 20-24px default, 32px large)
- Icons within the same context (toolbar, navigation, list) should be the same size
- Icon size should be proportional to adjacent text (icons roughly match the text's x-height or cap-height)

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web (CSS) | `width: 24px; height: 24px;` for default. Use consistent sizes across components. |
| SwiftUI | `.font(.body)` on SF Symbols matches text size automatically |
| Compose | `Icon(modifier = Modifier.size(24.dp))` — Material default is 24dp |
| Flutter | `Icon(size: 24)` — Material default is 24 |

---

### REQ-ICON-004: Accessible Icon Buttons

**Enforcement:** `MUST` | WCAG 2.2 SC 1.1.1, 4.1.2
**Platforms:** All
**Detectable:** Yes — check for accessible names on icon-only interactive elements

#### Why This Matters
An icon button without an accessible name is invisible to screen readers. The user encounters a button but has no idea what it does. This is a hard accessibility failure.

#### The Rule
- Every icon-only button MUST have an accessible name (aria-label, accessibilityLabel, contentDescription)
- Decorative icons inside labeled buttons should be hidden from screen readers
- The accessible name should describe the **action**, not the icon ("Delete item," not "Trash can")

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | `<button aria-label="Delete item"><svg>...</svg></button>` |
| SwiftUI | `Button(action: delete) { Image(systemName: "trash") }.accessibilityLabel("Delete item")` |
| Compose | `IconButton(onClick = onDelete) { Icon(Icons.Delete, contentDescription = "Delete item") }` |
| Flutter | `IconButton(icon: Icon(Icons.delete), tooltip: 'Delete item', onPressed: onDelete)` |

#### Common Mistakes
- `<button><img src="trash.svg"></button>` without aria-label
- Accessible name describes the icon ("Trash") instead of the action ("Delete")
- Decorative icons inside labeled buttons reading redundantly ("Delete Delete item")

---

### REQ-ICON-005: Image Optimization

**Enforcement:** `SHOULD` | Web Performance
**Platforms:** Web (primary), Cross-platform
**Detectable:** Yes — check image file sizes and formats

#### Why This Matters
Unoptimized images are the number one cause of slow page loads. A single 5MB hero image can make your entire page feel sluggish, especially on mobile networks.

#### The Principle
- Use modern formats: **WebP** (web), **AVIF** (web, where supported), **SVG** (icons, illustrations)
- Serve **responsive images** at appropriate sizes (don't send 2000px images to 400px screens)
- Lazy-load images below the fold
- Set explicit `width` and `height` to prevent layout shift

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | `<img srcset="..." sizes="..." loading="lazy" width="400" height="300">` |
| SwiftUI | `AsyncImage(url:)` with placeholder. Use asset catalogs with @1x/@2x/@3x. |
| Compose | `AsyncImage(model = url)` with placeholder. Use appropriate drawable densities. |
| Flutter | `Image.network(url)` with `cacheWidth`/`cacheHeight`. Use `FadeInImage` for loading. |

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-ICON-001 | Consistent Icon Style | SHOULD | Manual |
| REQ-ICON-002 | Icon Labels for Ambiguous Icons | SHOULD | Heuristic |
| REQ-ICON-003 | Icon Sizing Consistency | SHOULD | Yes |
| REQ-ICON-004 | Accessible Icon Buttons | MUST | Yes |
| REQ-ICON-005 | Image Optimization | SHOULD | Yes |

## Further Reading

- [Material Symbols & Icons](https://fonts.google.com/icons)
- [Apple SF Symbols](https://developer.apple.com/sf-symbols/)
- [NNGroup: Icon Usability](https://www.nngroup.com/articles/icon-usability/)
- [Web.dev: Image Optimization](https://web.dev/articles/fast#optimize_your_images)
