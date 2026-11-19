# Statistics Dashboard

A high-performance statistical analysis and visualization dashboard built with vanilla JavaScript and styled strictly following the Apple Human Interface Guidelines (HIG).

## Features

- **Apple HIG Design System** — Cupertino-style card hierarchy, San Francisco typography, light/dark mode support
- **Core Statistics Engine** — Count, mean, median, mode, standard deviation, and sample variance
- **Interactive Visualizations** — Dynamic histogram with frequency bins and five-number summary box plot with outlier detection
- **Flexible Data Input** — Paste delimiter-separated numbers or upload CSV files
- **Responsive** — Adaptive grid layout from iPhone screens to 4K displays
- **Accessibility** — Semantic HTML5, live regions, ARIA attributes, touch targets ≥ 44pt, `prefers-reduced-motion`

## Quick Start

```bash
# Serve locally
python3 -m http.server 8080 -d src
```

Then visit `http://localhost:8080`.

## Design System

Engineered strictly following the [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/):
- **Typography:** San Francisco (`-apple-system`, `BlinkMacSystemFont`, `SF Pro Text`, `SF Pro Display`)
- **System Colors:** Apple System Blue (`#007AFF` / `#0A84FF`), Apple System Indigo (`#5856D6` / `#5E5CE6`), Apple System Yellow (`#FFCC00` / `#FFD60A`), Apple System Grays
- **Light/Dark Mode:** Full native support via `color-scheme: light dark` and system preference tracking
- **8pt Grid:** 8, 16, 24, 32, 48px rhythm
- **Corner Radii:** 8pt, 12pt, 16pt, pill buttons
- **Elevation:** Apple 5-tier elevation shadows
- **Motion:** Spring curves (`cubic-bezier(0.4, 0, 0.2, 1)`) with reduced motion fallbacks

## License

MIT © 2026 spdedsec
