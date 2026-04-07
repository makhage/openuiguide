# Components: Data Visualization

## Overview

Charts, graphs, data tables, and visual data representations turn raw numbers into insight. They appear in dashboards, reports, analytics tools, and anywhere users need to understand trends, comparisons, or distributions. Effective data visualization requires accessibility for screen reader users, clarity for colorblind users, and responsive behavior across devices. Getting these wrong means some users cannot access the data at all, while others are misled by poor visual choices.

## Requirements

### REQ-DATAVIZ-001: Chart Alternative Text

**Enforcement:** `MUST` | WCAG 2.2 SC 1.1.1
**Platforms:** All
**Detectable:** Yes — find `<svg>`, `<canvas>`, chart library elements, check for alt text/aria-label/accompanying table

#### Why This Matters
Screen reader users cannot perceive SVG or canvas-based charts. Without a text alternative, an entire visualization — potentially the most important content on the page — is completely invisible to these users. A chart without alt text is the data equivalent of an image with no alt attribute.

#### The Rule
- Every chart or graph MUST have a text alternative through at least one of:
  - A descriptive `aria-label` on the chart container summarizing the key insight (e.g., "Bar chart showing revenue grew 40% from Q1 to Q4 2025")
  - A visually-hidden summary paragraph adjacent to the chart describing the trend or key data points
  - An accessible data table companion presenting the same data in tabular form
- The text alternative should convey the **meaning** of the data, not just describe the visual (say "sales peaked in July" not "a line that goes up then down")
- Complex charts with multiple series SHOULD provide a data table fallback in addition to a summary

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Use `role="img"` and `aria-label` on the chart `<svg>` or wrapper `<div>`. For `<canvas>`, provide fallback content inside the element or an adjacent description. Consider a "View as table" toggle. Popular libraries: Chart.js supports `aria-label` on canvas wrapper; D3.js requires manual ARIA on generated SVGs; Highcharts has built-in accessibility module (`accessibility.enabled: true`). |
| SwiftUI | Use `.accessibilityLabel()` and `.accessibilityValue()` on `Chart {}` views. Swift Charts provides automatic VoiceOver descriptions via `AudioGraph`. Use `.accessibilityChartDescriptor` for custom summaries. |
| Compose | Wrap chart composables with `Modifier.semantics { contentDescription = "..." }`. Vico and other Compose chart libraries require manual content descriptions. |
| React Native | Use `accessibilityLabel` on chart container `<View>`. Libraries like react-native-chart-kit and Victory Native require wrapping with accessible props. Provide a `<Text>` summary for screen readers. |

#### Creative Freedom
The format of the alternative — label, paragraph, table, or combination — is up to you. Choose what best conveys the data's meaning.

---

### REQ-DATAVIZ-002: Color-Independent Data Encoding

**Enforcement:** `MUST` | WCAG 2.2 SC 1.4.1
**Platforms:** All
**Detectable:** Heuristic — check if chart datasets rely solely on color to distinguish series

#### Why This Matters
Approximately 8% of men and 0.5% of women have some form of color vision deficiency. The most common type makes red and green appear nearly identical. A chart that uses only color to distinguish data series — red line vs. green line, red bar vs. green bar — makes it impossible for these users to read the data correctly.

#### The Rule
- Data series in charts MUST be distinguishable without color using at least one additional visual channel:
  - **Patterns or textures** (hatched, dotted, striped fills for bars/areas)
  - **Shapes** (circle, square, triangle, diamond markers for data points)
  - **Line styles** (solid, dashed, dotted for line charts)
  - **Direct labels** (labeling each series inline rather than relying on a color-coded legend)
- Do not rely on subtle color differences (light blue vs. slightly lighter blue)
- Test charts with a color blindness simulator (e.g., Sim Daltonism, Chrome DevTools color vision emulation)

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Chart.js: use `borderDash` for line styles, `pointStyle` for shapes. D3.js: apply pattern fills via `<pattern>` elements in SVG `<defs>`. Highcharts: use `dashStyle` on series, enable `accessibility.enabled`. Use CSS `background-image` patterns for bar fills. |
| SwiftUI | Swift Charts: use `.symbol()` modifier for point shapes (`.circle`, `.square`, `.triangle`), `.lineStyle(StrokeStyle(dash:))` for dashed lines. Apply `.foregroundStyle(by:)` with symbol differentiation. |
| Compose | Vico: configure different `LineSpec` dash patterns and point markers per series. Use `PathEffect.dashPathEffect()` for dashed lines. |
| React Native | Victory Native: use `symbol` prop on `VictoryScatter`, `dashArray` on lines. react-native-chart-kit: limited pattern support, prefer direct labels. |

#### Creative Freedom
Which secondary encoding you choose — patterns, shapes, labels, or line styles — is a design decision. Use what fits your visual style while maintaining clear differentiation.

---

### REQ-DATAVIZ-003: Chart Axis Labels and Units

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check chart configuration for axis label properties

#### Why This Matters
Unlabeled axes force users to guess what they are looking at. A Y-axis showing "0, 50, 100, 150" could mean dollars, users, milliseconds, or anything else. Without labels and units, a chart fails at its primary job of communicating data clearly.

#### The Principle
- All chart axes SHOULD have visible labels that include units where applicable (e.g., "Revenue ($M)", "Time (months)", "Response Time (ms)")
- Axis tick values SHOULD use appropriate formatting: currency symbols, percentage signs, abbreviations for large numbers (1K, 1M)
- Labels SHOULD be readable — not rotated to extreme angles, not overlapping, not truncated
- For time axes, use consistent and recognizable date/time formatting

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Chart.js: use `scales.x.title.display: true, text: "Month"` and `ticks.callback` for formatting. D3.js: use `axisBottom().tickFormat()` and append text labels to axis groups. Highcharts: use `xAxis.title.text` and `yAxis.labels.format`. |
| SwiftUI | Swift Charts: use `.chartXAxisLabel("Month")` and `.chartYAxisLabel("Revenue ($M)")`. Customize with `AxisMarks { AxisValueLabel(format:) }`. |
| Compose | Vico: configure `AxisItemPlacer` and label formatters. Set axis title via custom label composable above or beside the axis. |
| React Native | Victory Native: use `VictoryAxis` with `label` and `tickFormat` props. react-native-chart-kit: limited axis labeling, may need custom text overlays. |

#### Creative Freedom
Label placement (top, bottom, rotated, inline), formatting style, and abbreviation conventions are design choices. The requirement is that the information is present and readable.

---

### REQ-DATAVIZ-004: Data Point Interactivity

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check for tooltip/hover configuration in chart libraries

#### Why This Matters
A visual chart gives users the general shape of the data — trends, peaks, valleys. But users frequently need exact values: "What was the revenue in March exactly?" Tooltips on hover or tap provide this precision without cluttering the chart with labels on every data point.

#### The Principle
- Charts SHOULD provide tooltips on hover (desktop) and tap (mobile) showing the exact value of a data point
- Tooltips SHOULD include: the data value, the series name (if multiple), and the axis label (e.g., "March 2025: $4.2M Revenue")
- Tooltips MUST be accessible: keyboard-focusable data points, tooltip content exposed to screen readers
- Tooltip appearance should not obscure neighboring data points

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Chart.js: tooltips enabled by default, customize via `plugins.tooltip.callbacks`. D3.js: implement with mouseover events and a positioned `<div>`. Highcharts: use `tooltip.formatter` or `tooltip.pointFormat`. Ensure tooltips work with keyboard (`tabindex`, `focus` events). |
| SwiftUI | Swift Charts: use `.chartOverlay` with `GeometryReader` to detect tap/drag position and display a custom overlay view. VoiceOver users access values via `AudioGraph`. |
| Compose | Vico: configure `ChartEntryModelProducer` with marker visibility on touch. Display a `Popup` composable at the touched position with the data value. |
| React Native | Victory Native: use `VictoryTooltip` or `VictoryVoronoiContainer` for nearest-point tooltips. Handle touch events for mobile interaction. |

#### Creative Freedom
Tooltip style, animation, positioning logic, and content formatting are all design decisions. Showing additional context (percentage change, comparison to average) is encouraged but not required.

---

### REQ-DATAVIZ-005: Legend Placement and Clarity

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — check legend configuration and placement

#### Why This Matters
A legend placed far from the data it describes forces users to scan back and forth between the chart and the legend, trying to match colors or patterns. This is slow and error-prone, especially for users with color vision deficiency. Inline labels or well-placed legends reduce cognitive load.

#### The Principle
- Inline labels (labeling each series directly on the chart) are preferred over separate legends when feasible
- When a separate legend is necessary, it SHOULD be placed adjacent to the chart (not below a scrollable area or on a separate page)
- Legend entries SHOULD use readable text sizes — not tiny fine print
- Legend visual indicators SHOULD match the actual encoding (same dash pattern, same shape, same color)
- Interactive legends that highlight or toggle series visibility are encouraged
- Legends SHOULD NOT exceed 6-8 entries; if more series exist, consider a different visualization strategy

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Chart.js: legend is auto-generated, customize position via `plugins.legend.position`. D3.js: build custom legends or use direct line labels with `text` elements at the end of each series. Highcharts: use `legend.layout`, `legend.align`. Consider click-to-toggle series via `legend.itemClick`. |
| SwiftUI | Swift Charts: automatic legends via `.chartLegend()`. Position with `.chartLegend(position:)`. Prefer `.annotation` modifiers for inline labels where possible. |
| Compose | Vico: configure legend composable placement. For inline labels, draw text on the canvas at the last data point of each series. |
| React Native | Victory Native: use `VictoryLegend` with configurable position and style. For inline labels, use `VictoryLabel` at the last data point of each series. |

#### Creative Freedom
Legend position, style, interactivity, and whether to use inline labels versus a separate legend are design decisions. Choose the approach that minimizes the distance between the data and its label.

---

### REQ-DATAVIZ-006: Appropriate Chart Type

**Enforcement:** `SHOULD` | UX Best Practice
**Platforms:** All
**Detectable:** Heuristic — analyze data shape and chart type choice

#### Why This Matters
Choosing the wrong chart type actively misleads users. A pie chart with 15 slices is unreadable. A bar chart for time-series data hides the trend. A 3D chart distorts proportions for the sake of decoration. The chart type is not a style choice — it is a data communication decision.

#### The Principle
- **Line charts** SHOULD be used for continuous data over time (trends, changes)
- **Bar charts** SHOULD be used for comparing discrete categories
- **Pie/donut charts** SHOULD only be used for parts-of-whole relationships with 6 or fewer segments
- **Scatter plots** SHOULD be used for showing correlation between two variables
- **Area charts** SHOULD be used for showing volume/magnitude over time, especially stacked
- Avoid these anti-patterns:
  - Pie charts with more than 6 segments
  - 3D charts of any kind (they distort data perception)
  - Dual Y-axis charts (they confuse more than they clarify — use two separate charts instead)
  - Rainbow color schemes with no logical mapping

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Chart.js: select type via `type: 'line' | 'bar' | 'pie' | 'scatter'`. D3.js: choose the appropriate layout generator. Highcharts: select via `chart.type`. Linting: consider custom ESLint rules to flag pie charts with >6 data points. |
| SwiftUI | Swift Charts: use `LineMark` for trends, `BarMark` for comparisons, `SectorMark` for parts-of-whole. The declarative API encourages choosing the right mark type. |
| Compose | Vico: select `LineChart`, `ColumnChart`, etc. Compose does not have a built-in pie chart — if you need one, ensure the data has few segments. |
| React Native | Victory Native: use `VictoryLine`, `VictoryBar`, `VictoryPie`, `VictoryScatter`. Validate data-to-chart mapping during development. |

#### Creative Freedom
The specific visual style of any chart type — colors, animation, spacing, corner rounding on bars — is entirely yours. The requirement is that the chart type matches the data relationship.

---

### REQ-DATAVIZ-007: Responsive Charts

**Enforcement:** `SHOULD` | Responsive Design
**Platforms:** All
**Detectable:** Heuristic — check if chart containers have fixed width or responsive configuration

#### Why This Matters
Fixed-width charts break mobile layouts, cause horizontal scrolling, or shrink to unreadable sizes. Dashboards are increasingly viewed on tablets and phones. Charts that cannot adapt to different viewports fail a significant portion of users.

#### The Principle
- Charts SHOULD resize to fit their container width, reflowing or resizing as the viewport changes
- On narrow viewports, consider:
  - Simplifying axis labels (fewer ticks, abbreviated labels)
  - Hiding the legend and using inline labels or a toggle
  - Allowing horizontal scroll for data-dense charts with a clear scroll indicator
  - Switching to a simpler chart type (e.g., sparkline instead of full chart)
- Chart aspect ratio SHOULD be maintained to avoid distortion
- Touch targets for interactive elements SHOULD remain at least 44x44pt on mobile

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Chart.js: set `responsive: true` and `maintainAspectRatio: true` (both default). D3.js: use `ResizeObserver` on the container and re-render on size change. Highcharts: set `chart.reflow: true`. Place charts in a flex/grid container, not fixed pixel widths. |
| SwiftUI | Swift Charts automatically adapts to the available space. Use `.frame(minHeight:)` to set minimum readable sizes. Wrap in `GeometryReader` for custom responsive logic. |
| Compose | Vico: charts fill available width by default. Use `Modifier.fillMaxWidth()` and set height constraints. Listen to configuration changes for recomposition. |
| React Native | Victory Native: uses `containerComponent` with responsive sizing. Use `Dimensions.addEventListener` or `useWindowDimensions` for viewport-aware chart sizing. Wrap in flex containers with `flex: 1`. |

#### Creative Freedom
How the chart adapts — reflowing, simplifying, scrolling, or switching type — is a design decision. The requirement is that it adapts rather than breaking.

---

### REQ-DATAVIZ-008: Meaningful Zero Baseline

**Enforcement:** `SHOULD` | Data Integrity Best Practice
**Platforms:** All
**Detectable:** Heuristic — check Y-axis min configuration in chart options

#### Why This Matters
A bar chart where the Y-axis starts at 95 instead of 0 makes a 2% difference look like a 10x difference. Truncated baselines are the most common way charts mislead, whether intentionally or by accident. Users trust that the visual proportions in a bar chart correspond to actual data proportions.

#### The Principle
- Bar charts and area charts SHOULD start the Y-axis at zero
- If a non-zero baseline is necessary for analytical reasons (e.g., showing small fluctuations in a narrow range), clearly indicate the truncation with:
  - Axis break marks (zigzag or cut indicators)
  - A note explaining the non-zero start
- Line charts MAY use a non-zero baseline since they encode data in position and slope, not bar height
- Do not use chart library defaults that auto-scale to the data range without checking if zero-baseline is appropriate

#### Platform Notes
| Platform | Implementation Detail |
|----------|----------------------|
| Web | Chart.js: set `scales.y.beginAtZero: true` for bar charts. D3.js: explicitly set domain to `[0, max]` rather than `[d3.min(data), d3.max(data)]`. Highcharts: set `yAxis.min: 0`. |
| SwiftUI | Swift Charts: use `.chartYScale(domain: 0...maxValue)` to enforce zero baseline. Without this, Swift Charts auto-scales to the data range. |
| Compose | Vico: configure `AxisValueOverrider.fixed(minY = 0f)` to force zero baseline on bar charts. |
| React Native | Victory Native: set `domain={{ y: [0, max] }}` on `VictoryChart` or `minDomain={{ y: 0 }}`. |

#### Creative Freedom
Whether to include gridlines, how to style the zero line, and how to indicate axis breaks are all design choices. The requirement is that bar proportions are not misleading.

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-DATAVIZ-001 | Chart Alternative Text | MUST | Yes |
| REQ-DATAVIZ-002 | Color-Independent Data Encoding | MUST | Heuristic |
| REQ-DATAVIZ-003 | Chart Axis Labels and Units | SHOULD | Heuristic |
| REQ-DATAVIZ-004 | Data Point Interactivity | SHOULD | Heuristic |
| REQ-DATAVIZ-005 | Legend Placement and Clarity | SHOULD | Heuristic |
| REQ-DATAVIZ-006 | Appropriate Chart Type | SHOULD | Heuristic |
| REQ-DATAVIZ-007 | Responsive Charts | SHOULD | Heuristic |
| REQ-DATAVIZ-008 | Meaningful Zero Baseline | SHOULD | Heuristic |

## Sources

- [WCAG 2.2 SC 1.1.1: Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)
- [WCAG 2.2 SC 1.4.1: Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)
- [Chartability: Accessible Data Visualization](https://chartability.fizz.studio/)
- [W3C WAI: Complex Images (Charts and Graphs)](https://www.w3.org/WAI/tutorials/images/complex/)

## Further Reading

- [Chart.js Accessibility](https://www.chartjs.org/docs/latest/)
- [Highcharts Accessibility Module](https://www.highcharts.com/docs/accessibility/accessibility-module)
- [Apple HIG: Charts](https://developer.apple.com/design/human-interface-guidelines/charts)
- [Material Design: Data Visualization](https://m3.material.io/styles/color/dynamic/choosing-a-source)
- [Visa Chart Components (Accessible Chart Library)](https://github.com/visa/visa-chart-components)
- [Do No Harm Guide: Applying Equity Awareness in Data Visualization](https://www.urban.org/research/publication/do-no-harm-guide-applying-equity-awareness-data-visualization)
- [Data Visualization Accessibility (Penn State)](https://accessibility.psu.edu/images/charts/)
