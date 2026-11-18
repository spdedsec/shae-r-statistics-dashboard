# SHAE R Statistics Dashboard

<div align="center">

```
   ____  _   _    _    _____     ____    _    _     ____
  / ___|| | | |  / \  | ____|   / ___|  / \  | |   / ___|
  \___ \| |_| | / _ \ |  _|    | |     / _ \ | |  | |
   ___) |  _  |/ ___ \| |___   | |___ / ___ \| |__| |___
  |____/|_| |_/_/   \_\_____|   \____/_/   \_\_____\____|
```

**R-inspired statistics visualization dashboard with histogram and box plot on HTML5 canvas.**

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-lightgrey.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deploy-green.svg)](#)

</div>

---

## What is this?

The **SHAE R Statistics Dashboard** is a single-page web application for exploring
basic statistical measures and visualizing data distributions. Paste numbers or
upload a CSV file to instantly see:

- Mean, median, mode, standard deviation, variance
- Interactive histogram and box plot (drawing with HTML5 canvas)
- No data leaves your browser — all computation is done client-side

Designed with the **SHAE Field Manual aesthetic**: warm paper background, ink
data values, oxide signal accents, flat design with 0px radius and 1px borders.

## Features

- **Paste data** — comma-, space-, tab-, or newline-separated values
- **Upload CSV** — single column of numbers
- **Calculate** mean, median, mode, standard deviation, variance
- **Histogram** — auto-scaled bin frequency chart
- **Box plot** — quartiles, whiskers, median line, outlier dots
- **Export-free** — all drawing done on HTML5 canvas with pure JS
- **Responsive** — works from mobile to desktop
- **Dark-mode aware** — respects `prefers-reduced-motion` and theme
- **Zero dependencies** — no frameworks, no libraries

## Quick Start

### Host locally

```bash
# 1. Clone / open the repository
git clone https://github.com/spdedsec/shae-r-statistics-dashboard.git
cd shae-r-statistics-dashboard

# 2. Install a local Python server
python3 -m http.server 8000 -d src
# or use: npx serve src
```

### Launch the dashboard

Open your browser to `http://localhost:8000`.

### Publish to GitHub Pages

This project includes a GitHub Actions workflow that publishes to
GitHub Pages on every push to `main`. The `dist` (src) folder is deployed.

## Usage

1. Paste numbers into the textarea (e.g. `1, 2, 3, 4, 5`).
2. Or click **Upload CSV** and select a file with one column of numbers.
3. Press **Compute statistics**.
4. View results in the **Statistics** card and charts.

## Available Scripts

| Script | Description |
|--------|-------------|
| `make test` | Run Jest / Vitest suite (check test runner config) |
| `make build` | No-op — this is a static site, nothing to build |
| `make web` | Start local server (`python3 -m http.server 8000 -d src`) |
| `make lint` | Run ESLint on `src/app.js` |
| `make clean` | No-op |

## Project Structure

```
shae-r-statistics-dashboard/
├── .github/
│   └── workflows/
│       └── release.yml         # GitHub Pages deploy
├── src/
│   ├── index.html              # markup
│   ├── styles.css              # SHAE-inspired styling
│   └── app.js                  # logic + canvas rendering
├── scripts/
│   └── install.sh              # CLI shortcut to launch dashboard
├── tests/
│   └── test.js                 # Jest test suite
├── Makefile                    # build / test / lint / web targets
├── .gitignore
├── package.json
├── README.md                   # this file
└── DESIGN.md                   # design notes
```

## Design Decisions

The SHAE Field Manual design system is translated from visual media into a
terminal-friendly web aesthetic:

- **Warm paper** (`#F2EEE5`) as the page background — reduces eye strain and
  references the SHAE specimen sheets.
- **Ink data** (`#191712`) for body text and labels — high contrast, readable.
- **Oxide signal** (`#B3341B`) used sparingly for prompts, buttons, and chart
  emphasis — the "red accent" from the palette.
- **0px radius, 1px borders** — flat, physical, border-defined cards. No
  rounded corners, no glassmorphism, no gradients, no shadows.
- **Typography** — display: Archivo (uppercase short labels), body: Instrument
  Sans, labels/code: JetBrains Mono (tabular numerals).
- **Motion** — state changes and transitions in 140–240ms; simple
  transform/opacity/clip-path only; reduced-motion fallback to static output.
- **Accessibility** — WCAG AA colour contrast; focus-visible oxide ring; no
  horizontal overflow; alt text for charts via text representation in stats.

## Browser Compatibility

Works in all modern browsers that support HTML5 canvas and ES6 modules
(Chrome, Firefox, Safari, Edge). Mobile browsers supported via responsive
layout.

## License

MIT — see [LICENSE](LICENSE).

---

*Built with the SHAE Field Manual design system: warm paper, near-black ink,
oxide signal, flat and physical, motion is typesetting.*