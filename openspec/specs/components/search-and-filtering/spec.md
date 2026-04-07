# Search & Filtering

> Patterns for search interfaces, filter controls, and result presentation. Search is how users find what they need when navigation fails — getting it wrong means users can't use your product.

**Category:** Components
**Applies to:** All platforms
**Specs in this file:** 10 requirements (REQ-SEARCH-001 through REQ-SEARCH-010)

---

## Requirements

---

### REQ-SEARCH-001: Visible Search Input

**Enforcement:** `SHOULD` | NNGroup Research
**Platforms:** All
**Detectable:** Yes — check for search input or search icon in navigation/header

#### Why This Matters
A visible search bar converts 2-3x more searches than a hidden search icon. If search is important to your product (e-commerce, documentation, dashboards), show the full input — don't hide it behind a magnifying glass icon that requires a click to reveal.

#### The Principle
- If search is a primary feature, SHOULD show the full search input (not just an icon)
- Minimum width: 200-300px on desktop, full-width on mobile
- Place in the header or top of the content area — users look there first
- Include a placeholder hint: "Search products...", "Search documentation..."

#### Platform Implementation Notes
- **Web:** `<input type="search" placeholder="Search...">` in the header. Use `role="search"` on the containing form.
- **SwiftUI:** Use `.searchable(text:)` modifier on `NavigationStack` for native search.
- **Compose:** Use `SearchBar` from Material 3 or `TextField` with search icon.
- **React Native:** Use `TextInput` with search styling, or platform `SearchBar` component.

---

### REQ-SEARCH-002: Search Suggestions and Autocomplete

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for autocomplete/suggestion UI on search inputs

#### Why This Matters
Users frequently misspell, use wrong terms, or don't know exactly what they're looking for. Autocomplete suggestions guide them to valid results, reduce typing, and prevent "no results" dead ends.

#### The Principle
- Search SHOULD show suggestions as the user types (debounced, 150-300ms)
- Show recent searches for returning users
- Highlight the matching text in suggestions
- Limit to 5-8 suggestions — too many creates its own choice overload
- Suggestions should be keyboard-navigable (arrow keys + Enter)

#### Platform Implementation Notes
- **Web:** Use `<datalist>` for simple autocomplete, or custom dropdown with `role="listbox"` and `aria-autocomplete="list"`.
- **SwiftUI:** Use `.searchSuggestions { }` modifier with `ForEach` over suggestions.
- **Compose:** Use `ExposedDropdownMenuBox` or custom dropdown below `SearchBar`.
- **React Native:** Use `FlatList` positioned below search input with filtered results.

---

### REQ-SEARCH-003: No-Results State

**Enforcement:** `MUST` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for empty state handling on search results

#### Why This Matters
A blank screen or generic "No results" after searching is a dead end. Users don't know if they misspelled, used the wrong term, or if the content simply doesn't exist. A helpful no-results state keeps users engaged.

#### The Principle
- "No results" MUST include:
  - Clear statement: "No results for '[query]'"
  - Suggestions: "Did you mean...?", "Try searching for...", or related content
  - Alternative actions: browse categories, clear filters, contact support
- Never show an empty page with no explanation

#### Platform Implementation Notes
- **Web:** Use a centered empty state with illustration, message, and suggested actions.
- **SwiftUI:** Use `ContentUnavailableView` (iOS 17+) with search suggestions.
- **Compose:** Show a centered column with icon, text, and action buttons.
- **React Native:** Use `FlatList`'s `ListEmptyComponent` with helpful content.

---

### REQ-SEARCH-004: Filter Visibility and Affordance

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for filter UI near list/grid content

#### Why This Matters
Filters that are hidden behind a "Filter" button with no indication of available options get used less than visible filter controls. Users need to see what filtering is possible to know they can narrow results.

#### The Principle
- Frequently-used filters SHOULD be visible (not hidden behind a button)
- Show active filter count on the filter button if collapsed: "Filters (3)"
- Active filters should be displayed as removable chips/tags above results
- Filter changes should update results immediately (no "Apply" button for simple filters)

#### Platform Implementation Notes
- **Web:** Use a sidebar filter panel on desktop, bottom sheet on mobile. Show active filters as `<button>` chips with an X to remove.
- **SwiftUI:** Use `.sheet` or sidebar for filters. Display active filters in a `ScrollView(.horizontal)` of `Chip` views.
- **Compose:** Use `FilterChip` from Material 3 for active filters. Use `ModalBottomSheet` for filter panel on mobile.
- **React Native:** Use horizontal `ScrollView` of `Chip` components for active filters.

---

### REQ-SEARCH-005: Sort Controls

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for sort UI near list/grid content

#### Why This Matters
Users have different priorities — some want newest first, others want cheapest or most relevant. Without sort controls, you're forcing one ordering that won't work for everyone. "Most relevant" should be the default, with clear options to change.

#### The Principle
- Sortable content lists SHOULD have visible sort controls
- Show the current sort order: "Sorted by: Newest"
- Common sort options: Relevance, Newest, Oldest, Price (low/high), Name (A-Z), Popular
- Sort changes should be instant — no page reload required

---

### REQ-SEARCH-006: Result Count

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for result count display near search results

#### Why This Matters
"47 results for 'bluetooth speaker'" gives users immediate context about scope. Without a count, users don't know if there are 3 results or 3,000 — which changes how they browse and whether they need to filter more.

#### The Principle
- Search results SHOULD display the total count: "47 results" or "Showing 1-20 of 47"
- For filtered results: "12 results (47 total)" to show filter impact
- Update the count live when filters change
- Use approximate counts for large datasets: "About 10,000 results"

---

### REQ-SEARCH-007: Keyboard Navigation for Search Results

**Enforcement:** `MUST` | WCAG 2.1.1
**Platforms:** Web, Desktop
**Detectable:** Yes — check for keyboard event handlers on search results

#### Why This Matters
Users who type a search query expect to navigate results with keyboard — Arrow Down through results, Enter to select, Escape to close suggestions. Requiring a mouse to interact with search results breaks the keyboard flow.

#### The Principle
- Search suggestions MUST be navigable with Arrow Up/Down keys
- Enter MUST select the highlighted suggestion
- Escape MUST close the suggestion dropdown and return focus to the input
- Use `aria-activedescendant` to indicate the highlighted suggestion to screen readers

#### Platform Implementation Notes
- **Web:** Add `keydown` handler for ArrowUp/Down/Enter/Escape. Use `role="listbox"` with `aria-activedescendant`.
- **SwiftUI:** `List` with `.searchable` handles keyboard navigation natively on macOS.
- **Compose:** Focus management with `FocusRequester` and key event handlers.

---

### REQ-SEARCH-008: Search History and Recent Queries

**Enforcement:** `CONSIDER` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for recent search storage/display

#### Why This Matters
Users often search for the same things repeatedly. Showing recent searches when the search input is focused saves time and helps users remember their previous queries. This is recognition over recall (Nielsen's Heuristic #6).

#### The Principle
- CONSIDER showing recent searches when the search input is focused (before typing)
- Limit to 5-8 recent searches
- Provide "Clear recent searches" option for privacy
- Recent searches should be stored locally (not sent to server unless needed)

---

### REQ-SEARCH-009: Faceted Search for Large Datasets

**Enforcement:** `SHOULD` | E-Commerce, Documentation
**Platforms:** All
**Detectable:** Heuristic — check for multi-dimensional filter UI on search results

#### Why This Matters
When searching large catalogs (products, articles, files), simple text search isn't enough. Users need faceted filtering (by category, price range, date, status) with counts showing how many results each facet produces. Without facets, users scroll endlessly.

#### The Principle
- Large searchable datasets (100+ items) SHOULD support faceted filtering
- Show result counts per facet: "Electronics (23)", "Clothing (8)"
- Allow multiple facets simultaneously (category AND price AND rating)
- Update facet counts dynamically as other filters change

---

### REQ-SEARCH-010: Persistent Search State

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** Web, Cross-platform
**Detectable:** Heuristic — check if search query persists in URL or state

#### Why This Matters
When a user searches, navigates to a result, then presses Back, the search query and results should still be there. Losing search state forces users to re-type their query and re-apply filters — a major friction point.

#### The Principle
- Search query and active filters SHOULD persist when navigating back
- On web: encode search state in the URL (`?q=query&sort=newest&category=electronics`)
- On mobile: maintain search state in navigation stack
- Shareable search URLs are a bonus for collaboration

#### Platform Implementation Notes
- **Web:** Use URL query parameters for search state. Update with `history.replaceState()`.
- **SwiftUI:** Use `@State` or `@StateObject` that persists across navigation push/pop.
- **Compose:** Use `SavedStateHandle` in ViewModel to persist across configuration changes.
- **React Native:** Use navigation params to pass search state.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-SEARCH-001 | Visible Search Input | SHOULD | Yes |
| REQ-SEARCH-002 | Search Suggestions | SHOULD | Heuristic |
| REQ-SEARCH-003 | No-Results State | MUST | Heuristic |
| REQ-SEARCH-004 | Filter Visibility | SHOULD | Heuristic |
| REQ-SEARCH-005 | Sort Controls | SHOULD | Heuristic |
| REQ-SEARCH-006 | Result Count | SHOULD | Heuristic |
| REQ-SEARCH-007 | Keyboard Navigation | MUST | Yes |
| REQ-SEARCH-008 | Search History | CONSIDER | Heuristic |
| REQ-SEARCH-009 | Faceted Search | SHOULD | Heuristic |
| REQ-SEARCH-010 | Persistent Search State | SHOULD | Heuristic |

## Further Reading

- [NNGroup: Search UX](https://www.nngroup.com/articles/search-visible-and-simple/)
- [Baymard Institute: E-Commerce Search](https://baymard.com/blog/ecommerce-search-query-types)
- [Material Design 3: Search](https://m3.material.io/components/search/overview)
- [Apple HIG: Search](https://developer.apple.com/design/human-interface-guidelines/searching)
- [Algolia: Search UX Best Practices](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/in-depth/search-behavior/)
