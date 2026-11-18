# SHAE R Statistics Dashboard — DESIGN.md

This document explains how the SHAE Field Manual design system is applied to a
web dashboard that visualizes basic statistics with HTML5 canvas.

## Design System Mapping

The SHAE design system is a visual language built around the SHAE site
redesign. We adapt it to a statistics dashboard as follows.

### 1. Precise over decorative

- Data is presented as plain numbers, aligned to a tabular mono font.
- Charts are drawn with 1px gridlines and crisp rectangles; no gradients, no
  3D effects, no decorative chart junk.
- The histogram bars and box plot use flat fills; the oxide signal marks the
  interquartile range and frequency bars.

### 2. Confident restraint

- Page background: warm paper `#F2EEE5`.
- Text and axis lines: near-black ink `#191712`.
- Signal accent: oxide `#B3341B` used for the primary button, histogram bars,
  and the box in the box plot.
- No glassmorphism, no rounded corners, no drop shadows.

### 3. Density with air

- 62–68ch reading measure is approximated by centering the page at 1100px
  max-width with 1.5rem side padding.
- 4px spacing base used for margins and padding.
- Compact mono metadata (labels, axis ticks) sits beside larger data values.

### 4. Motion is typesetting, state, and orientation

- Transitions limited to 140–240ms for focus/hover states.
- No animation libraries; canvas draws instantly when data changes.
- Reduced-motion preference is honoured: transitions collapse to 0.01ms.

### 5. Accessibility is part of the aesthetic

- WCAG AA contrast: ink on paper (7.5:1), oxide on paper (5.9:1), muted text
  (4.6:1).
- Keyboard focus ring: oxide 2.5px outline on `:focus-visible`.
- Touch targets: buttons are 44px minimum height via padding.
- No horizontal overflow; responsive grid collapses to single column on narrow
  viewports.
- Screen-reader text: statistics are exposed as text, not just canvas pixels.

## Typography

- Display / headings: Archivo (bold, tight tracking)
- Body: Instrument Sans
- Labels, values, code: JetBrains Mono (tabular numerals)
- No third typeface family.

## Colour

| Token   | Hex       | Use |
|---------|-----------|-----|
| paper   | #F2EEE5   | page background |
| ink     | #191712   | body text, axis lines |
| oxide   | #B3341B   | signal: button, bars, box |
| muted   | #6e675e   | labels, hints |
| border  | #cfc8ba   | hairline rules |

## Charts

### Histogram

- Bins: `min(10, ceil(sqrt(n)))` bins.
- Bars: oxide fill, 1px ink stroke.
- Axis: 1px hairline, mono tick labels.

### Box Plot

- Quartiles computed via linear interpolation.
- Box: oxide fill, 1px ink stroke.
- Median: 3px ink line.
- Whiskers: 1.5×IQR rule; outliers drawn as oxide dots.

## Anti-patterns avoided

- No SaaS card grids, no decorative confetti, no rounded floating panels.
- No glassmorphism, no gradient text, no scroll-jacking.
- No animation libraries; no centred mobile hero.

## Interaction model

- Paste or upload → press **Compute statistics**.
- **Clear** resets input, stats, and charts.
- Errors are shown in the stats area (no `alert()`).

## Future extensions

- Export chart as PNG.
- Additional plots: scatter, line, cumulative distribution.
- Save/load datasets to localStorage.
- Dark-mode variant (ink on paper inverted).