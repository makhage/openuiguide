# Internationalization (i18n)

> Building UIs that work across languages, scripts, and locales. Even if you only support English today, i18n-ready code prevents costly rewrites later.

**Category:** Patterns
**Applies to:** All platforms
**Specs in this file:** 8 requirements (REQ-I18N-001 through REQ-I18N-008)

---

## Requirements

---

### REQ-I18N-001: No Hardcoded User-Facing Strings

**Enforcement:** `SHOULD` | i18n Best Practice
**Platforms:** All
**Detectable:** Heuristic — find string literals in UI rendering code

#### Why This Matters
Hardcoded strings in component code make translation impossible without touching every file. Even if you only support one language today, extracting strings into a localization system costs minutes now versus weeks later.

#### The Principle
- User-facing text SHOULD be in a localization file (JSON, XLIFF, .strings, .arb), not inline in components
- Developer-facing strings (log messages, error codes) can remain hardcoded
- Button labels, headings, placeholders, error messages, and tooltips are all user-facing

#### Platform Implementation Notes
- **Web:** Use `i18next`, `react-intl`, or Vue i18n. Store strings in JSON files per locale.
- **SwiftUI:** Use `String(localized:)` or `LocalizedStringKey`. Strings go in `.strings`/`.stringsdict` files.
- **Compose:** Use `stringResource(R.string.*)`. Strings in `res/values/strings.xml` per locale.
- **React Native:** Use `react-native-localize` with `i18next` or similar.

---

### REQ-I18N-002: Text Expansion Room

**Enforcement:** `SHOULD` | i18n Best Practice
**Platforms:** All
**Detectable:** Heuristic — find fixed-width containers with text that could be translated

#### Why This Matters
German text is ~30% longer than English. Finnish can be 40% longer. Chinese/Japanese may be shorter. If your layout assumes English word lengths, translated text will overflow, truncate, or break layouts. Design for the longest reasonable translation.

#### The Principle
- Text containers SHOULD NOT have fixed widths that prevent text expansion
- Buttons SHOULD use padding-based sizing, not fixed widths
- Allow at least 30-40% extra space for text expansion
- Test with pseudo-localization (artificially expanded strings) during development

#### Platform Implementation Notes
- **Web:** Use `min-width` instead of `width` on text containers. Avoid `white-space: nowrap` on translatable text.
- **SwiftUI:** Layouts naturally expand. Test with longer locale strings.
- **Compose:** Use `wrapContentWidth()` rather than fixed `width()` on text containers.
- **React Native:** Use `flexShrink: 1` on text containers to prevent overflow.

---

### REQ-I18N-003: RTL (Right-to-Left) Layout Support

**Enforcement:** `SHOULD` | WCAG, i18n Best Practice
**Platforms:** All
**Detectable:** Yes — check for logical CSS properties, RTL test configurations

#### Why This Matters
Arabic, Hebrew, Farsi, and Urdu are read right-to-left. If your layout uses `margin-left`/`padding-right` instead of logical properties (`margin-inline-start`/`padding-inline-end`), the entire layout breaks for RTL users.

#### The Principle
- Use **logical properties** (start/end) instead of physical properties (left/right) for spacing and positioning
- Icons that indicate direction (arrows, chevrons) SHOULD flip in RTL
- Text alignment should follow the document direction, not be hardcoded to `left`
- Test the entire UI in an RTL locale

#### Platform Implementation Notes
- **Web:** Use `margin-inline-start` instead of `margin-left`, `padding-inline-end` instead of `padding-right`. Set `dir="rtl"` on `<html>` for RTL locales. Use `text-align: start` not `text-align: left`.
- **SwiftUI:** Use `.leading`/`.trailing` instead of `.left`/`.right`. SwiftUI auto-flips.
- **Compose:** Use `Arrangement.Start`/`.End` instead of fixed positioning. Compose auto-mirrors.
- **React Native:** Use `marginStart`/`marginEnd`, `paddingStart`/`paddingEnd`. Set `I18nManager.forceRTL(true)` for testing.

---

### REQ-I18N-004: Locale-Aware Formatting

**Enforcement:** `SHOULD` | i18n Best Practice
**Platforms:** All
**Detectable:** Heuristic — find date/number formatting without locale parameters

#### Why This Matters
`12/01/2024` means December 1st in the US and January 12th everywhere else. `1,234.56` is `1.234,56` in Germany. Hardcoded formatting creates confusion and errors for international users.

#### The Principle
- Dates SHOULD use `Intl.DateTimeFormat` or platform locale formatters, not manual string concatenation
- Numbers and currency SHOULD use `Intl.NumberFormat` or platform formatters
- Use ISO 8601 (`2024-12-01`) for unambiguous machine dates, locale format for display

#### Platform Implementation Notes
- **Web:** Use `Intl.DateTimeFormat(locale)` and `Intl.NumberFormat(locale)`. Never build date strings manually.
- **SwiftUI:** Use `Text(date, format: .dateTime)` which auto-localizes.
- **Compose:** Use `DateFormat.getDateInstance(DateFormat.MEDIUM, locale)`.
- **React Native:** Use `Intl` API or `date-fns` with locale support.

---

### REQ-I18N-005: Pluralization Rules

**Enforcement:** `SHOULD` | i18n Best Practice
**Platforms:** All
**Detectable:** Heuristic — find string concatenation with counts (e.g., `count + " items"`)

#### Why This Matters
English has two plural forms (1 item, 2 items). Arabic has six. Russian has three. Hardcoding `count + " items"` breaks in every language with different pluralization rules. Use ICU MessageFormat or platform pluralization APIs.

#### The Principle
- Never concatenate numbers with hardcoded strings for plurals
- Use platform pluralization APIs that handle all CLDR plural categories (zero, one, two, few, many, other)
- Test with 0, 1, 2, 5, 21 items (these trigger different rules in many languages)

#### Platform Implementation Notes
- **Web:** Use ICU MessageFormat with `i18next`: `"{count, plural, one {# item} other {# items}}"`.
- **SwiftUI:** Use `.stringsdict` files with `NSStringPluralRuleType`.
- **Compose:** Use `pluralStringResource(R.plurals.items, count)`.
- **React Native:** Use `i18next` with `{count}` interpolation and plural keys.

---

### REQ-I18N-006: No Text in Images

**Enforcement:** `MUST` | WCAG 1.4.5, i18n Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for images that appear to contain text (by filename or context)

#### Why This Matters
Text embedded in images cannot be translated, cannot be resized for accessibility, and cannot be read by screen readers. Use HTML/CSS text overlaid on images instead.

#### The Principle
- MUST NOT embed translatable text in images (logos with brand names are acceptable)
- Use CSS text overlay on background images instead
- Diagrams with text should use SVG with text elements (translatable) or separate text labels
- Screenshots in documentation are exempt but should have text alternatives

#### Platform Implementation Notes
- **Web:** Use `<figure>` with text overlay via CSS `position: absolute` on text, `position: relative` on container.
- **SwiftUI:** Use `ZStack` to overlay `Text` on `Image`.
- **Compose:** Use `Box` with `Text` composable overlaying `Image`.
- **React Native:** Use `ImageBackground` component with `Text` children.

---

### REQ-I18N-007: Accessible Language Declaration

**Enforcement:** `MUST` | WCAG 3.1.1, 3.1.2
**Platforms:** Web (primarily)
**Detectable:** Yes — check for lang attribute on html and on foreign-language content

#### Why This Matters
Screen readers use the `lang` attribute to choose the correct pronunciation engine. Without it, a French paragraph in an English page gets read with English phonetics, making it incomprehensible.

#### The Principle
- The `<html>` element MUST have a `lang` attribute with the correct BCP 47 language code
- Content in a different language than the page MUST have its own `lang` attribute
- Dynamic language changes (language switcher) MUST update the `lang` attribute

#### Platform Implementation Notes
- **Web:** `<html lang="en">`. For mixed-language content: `<p lang="fr">Bonjour le monde</p>`.
- **SwiftUI:** Use `.environment(\.locale, Locale("fr"))` for localized sections.
- **Compose:** Use `LocaleList` in `CompositionLocalProvider`.
- **React Native:** Accessibility language is set per-element with `accessibilityLanguage`.

---

### REQ-I18N-008: Font Support for Target Scripts

**Enforcement:** `SHOULD` | i18n Best Practice
**Platforms:** All
**Detectable:** Heuristic — check if custom fonts support target locale character sets

#### Why This Matters
Custom fonts that only support Latin characters will show blank boxes or system fallbacks for CJK (Chinese/Japanese/Korean), Arabic, Cyrillic, or Devanagari text. If you support those locales, your font stack must cover their character sets.

#### The Principle
- Custom fonts SHOULD support all character sets for target locales
- Define proper font fallback stacks: `font-family: "Custom Font", "Noto Sans", system-ui, sans-serif`
- Consider CJK-optimized fonts for East Asian locales (Noto Sans CJK, Source Han Sans)
- Test font rendering in all target locales

#### Platform Implementation Notes
- **Web:** Use `@font-face` with `unicode-range` for selective loading. Include Noto Sans as fallback.
- **SwiftUI:** System fonts (SF Pro) support all scripts. Custom fonts need explicit character set coverage.
- **Compose:** System fonts (Roboto) support Latin/Cyrillic. Add Noto Sans CJK for East Asian support.
- **React Native:** Custom fonts need to include all target script glyphs in the .ttf/.otf file.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-I18N-001 | No Hardcoded Strings | SHOULD | Heuristic |
| REQ-I18N-002 | Text Expansion Room | SHOULD | Heuristic |
| REQ-I18N-003 | RTL Layout Support | SHOULD | Yes |
| REQ-I18N-004 | Locale-Aware Formatting | SHOULD | Heuristic |
| REQ-I18N-005 | Pluralization Rules | SHOULD | Heuristic |
| REQ-I18N-006 | No Text in Images | MUST | Heuristic |
| REQ-I18N-007 | Language Declaration | MUST | Yes |
| REQ-I18N-008 | Font Support for Scripts | SHOULD | Heuristic |

## Further Reading

- [W3C: Internationalization Best Practices](https://www.w3.org/International/quicktips/)
- [Apple: Localization](https://developer.apple.com/localization/)
- [Material Design 3: Bidirectionality](https://m3.material.io/foundations/layout/understanding-layout/bidirectionality)
- [MDN: CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values)
- [Unicode CLDR: Plural Rules](https://cldr.unicode.org/index/cldr-spec/plural-rules)
