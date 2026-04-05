# Components: Lists and Tables

## Overview

Lists and tables are the workhorses of data display. Lists present sequential items (contacts, messages, search results). Tables present structured data with multiple attributes per item. Both require clear visual hierarchy, consistent row patterns, and accessibility markup to be usable by all users.

## Requirements

### REQ-LIST-001: Consistent List Item Structure

**Enforcement:** `SHOULD` | Material Design 3, Apple HIG
**Platforms:** All
**Detectable:** Heuristic — flag list items with inconsistent internal structure

#### Why This Matters
When list items have different internal layouts — some with icons and some without, some with subtitles and some without — scanning becomes slow and unpredictable. Consistent item structure lets users extract information from long lists quickly.

#### The Principle
- All items in a list SHOULD share the **same visual structure** (leading element, primary text, secondary text, trailing element)
- Optional elements (subtitle, icon, action) should be present or absent for the entire list, not mixed
- Use a consistent row height for items at the same complexity level

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Use consistent markup: `<li><img><div class="text"><span class="title">...<span class="subtitle">...</div><button>...</li>` |
| SwiftUI | Use `List` with consistent row views. `Label`, `HStack` structure per item. |
| Compose | Use `LazyColumn` with consistent `ListItem(headlineContent, supportingContent, leadingContent, trailingContent)` |
| Flutter | Use `ListView` with consistent `ListTile(leading, title, subtitle, trailing)` |

---

### REQ-LIST-002: Accessible Table Markup

**Enforcement:** `MUST` | WCAG 2.2 SC 1.3.1
**Platforms:** Web (primary)
**Detectable:** Yes — check for th, scope, and caption elements in tables

#### Why This Matters
Screen readers navigate tables cell by cell, announcing the column header for each data cell. Without proper `<th>` headers and `scope` attributes, screen readers can't associate data cells with their headers, making the table incomprehensible.

#### The Rule
- Data tables MUST use `<table>`, `<thead>`, `<tbody>`, `<th>`, and `<td>` elements
- Header cells MUST use `<th>` with `scope="col"` (column headers) or `scope="row"` (row headers)
- Tables SHOULD have a `<caption>` describing the table's purpose
- Do NOT use `<table>` for layout — only for tabular data

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | `<table><caption>Sales by quarter</caption><thead><tr><th scope="col">Quarter</th>...` |
| SwiftUI | Use `Grid` or `Table` (macOS). Ensure header labels are clear. |
| Compose | Use `LazyColumn` with header items using `stickyHeader`. |
| Flutter | Use `DataTable(columns: [...], rows: [...])` with proper column labels. |

---

### REQ-LIST-003: Responsive Tables

**Enforcement:** `SHOULD` | Responsive Design
**Platforms:** Web (primary), Cross-platform
**Detectable:** Heuristic — check table behavior at narrow viewports

#### Why This Matters
Wide tables on narrow screens cause horizontal scrolling, which is one of the most frustrating mobile experiences. Tables need a responsive strategy.

#### The Principle
- Tables with many columns SHOULD adapt to narrow viewports through one of:
  - **Horizontal scroll** within a container (with scroll indicator)
  - **Column hiding** — show key columns, let users toggle others
  - **Card transformation** — each row becomes a card on mobile
  - **Priority columns** — show most important columns, others accessible via detail view
- The chosen strategy should be consistent across all tables in the app

---

### REQ-LIST-004: Empty State for Lists

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for empty state handling in list/table components

#### Why This Matters
An empty list with no message looks broken. Users wonder: is it loading? Is there an error? Is there really no data? A clear empty state communicates what happened and what to do next.

#### The Principle
- Empty lists/tables SHOULD display a meaningful **empty state message**
- The message should explain WHY it's empty and suggest an action: "No messages yet. Start a conversation."
- Consider using an illustration or icon to soften the empty state
- Distinguish between "no data exists" and "no results match your filter"

---

### REQ-LIST-005: Sortable Table Headers

**Enforcement:** `CONSIDER` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for sort indicators on table headers

#### Why This Matters
Data tables with many rows become unwieldy without sorting. Sortable headers with clear direction indicators (↑↓) let users find what they need quickly.

#### The Principle
- Sortable columns SHOULD have a visible sort indicator (arrow icon)
- Current sort column and direction MUST be visually clear
- Sort state should be announced to screen readers (`aria-sort="ascending"` or `"descending"`)
- Default sort should be the most useful for the primary use case

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-LIST-001 | Consistent List Item Structure | SHOULD | Heuristic |
| REQ-LIST-002 | Accessible Table Markup | MUST | Yes |
| REQ-LIST-003 | Responsive Tables | SHOULD | Heuristic |
| REQ-LIST-004 | Empty State for Lists | SHOULD | Heuristic |
| REQ-LIST-005 | Sortable Table Headers | CONSIDER | Heuristic |

## Further Reading

- [Material Design 3: Lists](https://m3.material.io/components/lists/overview)
- [Apple HIG: Lists and Tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)
- [WAI: Table Tutorial](https://www.w3.org/WAI/tutorials/tables/)
- [Responsive Data Tables](https://css-tricks.com/responsive-data-tables/)
