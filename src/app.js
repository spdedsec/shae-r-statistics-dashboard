/* ========================================================================
   SHAE R Statistics Dashboard — app.js
   Pure vanilla JavaScript. No external dependencies.

   Exports pure statistics functions and initializes the DOM when running
   in a browser.
   ======================================================================== */

const pasteEl = () => document.getElementById("paste");
const csvEl = () => document.getElementById("csv");
const calcBtn = () => document.getElementById("calc");
const clearBtn = () => document.getElementById("clear");
const histogram = () => document.getElementById("histogram");
const boxplot = () => document.getElementById("boxplot");
const statEls = () => ({
  count: document.getElementById("val-count"),
  mean: document.getElementById("val-mean"),
  median: document.getElementById("val-median"),
  mode: document.getElementById("val-mode"),
  stddev: document.getElementById("val-stddev"),
  variance: document.getElementById("val-variance"),
});

export function parseInput(text) {
  const tokens = text.split(/[\s,]+/).filter((t) => t.length > 0);
  const values = tokens.map(Number).filter(Number.isFinite);
  const invalid = tokens.map(Number).filter((v) => !Number.isFinite(v));
  return { values, invalid };
}

export function mean(values) {
  if (values.length === 0) return null;
  let sum = 0;
  for (const v of values) sum += v;
  return sum / values.length;
}

export function median(values) {
  if (values.length === 0) return null;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  if (s.length % 2 === 0) return (s[mid - 1] + s[mid]) / 2;
  return s[mid];
}

export function mode(values) {
  if (values.length === 0) return [];
  const freq = {};
  for (const v of values) freq[v] = (freq[v] || 0) + 1;
  let maxFreq = 0;
  for (const k in freq) maxFreq = Math.max(maxFreq, freq[k]);
  if (maxFreq === 1) return [];
  return Object.keys(freq)
    .filter((k) => freq[k] === maxFreq)
    .map(Number)
    .sort((a, b) => a - b);
}

export function variance(values) {
  if (values.length < 2) return null;
  const m = mean(values);
  let sumSq = 0;
  for (const v of values) {
    const d = v - m;
    sumSq += d * d;
  }
  return sumSq / (values.length - 1);
}

export function stdDev(values) {
  const v = variance(values);
  return v === null ? null : Math.sqrt(v);
}

export function quantile(sorted, q) {
  const n = sorted.length;
  const pos = q * (n - 1);
  const base = Math.floor(pos);
  const rest = pos - base;
  if (base + 1 < n) return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  return sorted[base];
}

/* ---- Canvas helpers (browser only) ----------------------------------- */

function fitCanvas(canvas, width, height) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  return ctx;
}

function ctxOf(canvas) {
  return canvas.getContext("2d");
}

function clearRect(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
}

function drawAxis(ctx, { left, right, top, bottom, color }) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left, bottom);
  ctx.lineTo(right, bottom);
  ctx.moveTo(left, top);
  ctx.lineTo(left, bottom);
  ctx.stroke();
}

function drawText(ctx, text, x, y, { color = "#191712", size = 10, align = "left", font = "JetBrains Mono, monospace", bold = false } = {}) {
  ctx.font = (bold ? "bold " : "") + size + "px " + font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

/* ---- Histogram -------------------------------------------------------- */

function drawHistogram(canvas, values) {
  const ctx = fitCanvas(canvas, 700, 300);
  clearRect(ctx, 700, 300);

  if (!values || values.length === 0) {
    drawText(ctx, "No data", 350, 150, { align: "center", color: "#6e675e" });
    return;
  }

  const margin = { top: 30, right: 30, bottom: 45, left: 55 };
  const w = 700 - margin.left - margin.right;
  const h = 300 - margin.top - margin.bottom;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const binCount = Math.min(10, Math.ceil(Math.sqrt(values.length)) || 1);
  const binWidth = (max - min) / binCount || 1;

  const bins = new Array(binCount).fill(0);
  for (const v of values) {
    let idx = Math.floor((v - min) / binWidth);
    if (idx >= binCount) idx = binCount - 1;
    if (idx < 0) idx = 0;
    bins[idx]++;
  }
  const maxBin = Math.max(...bins);

  const scaleX = (i) => margin.left + (i / binCount) * w;
  const scaleY = (b) => margin.bottom + h - (b / maxBin) * h;

  drawAxis(ctx, {
    left: margin.left, right: margin.left + w,
    top: margin.top, bottom: margin.bottom + h,
    color: "#cfc8ba",
  });
  drawText(ctx, "Value", margin.left + w / 2, margin.bottom + h + 30, { align: "center", size: 10, color: "#6e675e" });
  for (let i = 0; i <= binCount; i++) {
    const x = scaleX(i);
    ctx.strokeStyle = "#cfc8ba"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, margin.bottom + h); ctx.lineTo(x, margin.bottom + h + 4); ctx.stroke();
    const val = min + i * binWidth;
    drawText(ctx, val.toFixed(1), x, margin.bottom + h + 16, { size: 9, align: "center", color: "#6e675e" });
  }
  for (let i = 0; i <= 5; i++) {
    const y = margin.bottom + h - (i / 5) * h;
    ctx.beginPath(); ctx.moveTo(margin.left - 4, y); ctx.lineTo(margin.left, y); ctx.stroke();
    drawText(ctx, Math.round((maxBin / 5) * i), margin.left - 8, y, { size: 9, align: "right", color: "#6e675e" });
  }

  for (let i = 0; i < binCount; i++) {
    const x = scaleX(i);
    const bw = w / binCount * 0.85;
    const y = scaleY(bins[i]);
    const bh = margin.bottom + h - y;
    ctx.fillStyle = bins[i] > 0 ? "#B3341B" : "#cfc8ba";
    ctx.fillRect(x + (w / binCount - bw) / 2, y, bw, bh);
    ctx.strokeStyle = "#191712"; ctx.lineWidth = 1;
    ctx.strokeRect(x + (w / binCount - bw) / 2, y, bw, bh);
  }
}

/* ---- Box plot ---------------------------------------------------------- */

function drawBoxPlot(canvas, values) {
  const ctx = fitCanvas(canvas, 700, 220);
  clearRect(ctx, 700, 220);

  if (!values || values.length === 0) {
    drawText(ctx, "No data", 350, 110, { align: "center", color: "#6e675e" });
    return;
  }

  const margin = { top: 25, right: 30, bottom: 35, left: 55 };
  const w = 700 - margin.left - margin.right;
  const h = 220 - margin.top - margin.bottom;

  const s = [...values].sort((a, b) => a - b);
  const q1 = quantile(s, 0.25);
  const q2 = quantile(s, 0.5);
  const q3 = quantile(s, 0.75);
  const iqr = q3 - q1;
  const lowerWhisker = s.find((v) => v >= q1 - 1.5 * iqr) ?? s[0];
  const upperWhisker = s.findLast((v) => v <= q3 + 1.5 * iqr) ?? s[s.length - 1];

  const minV = s[0];
  const maxV = s[s.length - 1];
  const rangeMin = Math.min(minV, lowerWhisker);
  const rangeMax = Math.max(maxV, upperWhisker);
  const pad = (rangeMax - rangeMin) * 0.08 || 1;

  const scaleX = (v) => margin.left + ((v - (rangeMin - pad)) / (rangeMax - rangeMin + 2 * pad)) * w;

  drawAxis(ctx, {
    left: margin.left, right: margin.left + w,
    top: margin.top, bottom: margin.bottom + h,
    color: "#cfc8ba",
  });
  drawText(ctx, "Box Plot", margin.left + w / 2, margin.top - 10, { align: "center", size: 11, color: "#191712", bold: true });
  drawText(ctx, "Value", margin.left + w / 2, margin.bottom + h + 25, { align: "center", size: 10, color: "#6e675e" });

  const tickVals = [minV, lowerWhisker, q1, q2, q3, upperWhisker, maxV];
  for (const v of tickVals) {
    const x = scaleX(v);
    ctx.beginPath(); ctx.moveTo(x, margin.bottom + h); ctx.lineTo(x, margin.bottom + h + 4); ctx.stroke();
    drawText(ctx, v.toFixed(1), x, margin.bottom + h + 16, { size: 8, align: "center", color: "#6e675e" });
  }

  ctx.strokeStyle = "#191712"; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(scaleX(lowerWhisker), margin.bottom + h / 2);
  ctx.lineTo(scaleX(q1), margin.bottom + h / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(scaleX(q3), margin.bottom + h / 2);
  ctx.lineTo(scaleX(upperWhisker), margin.bottom + h / 2);
  ctx.stroke();

  ctx.fillStyle = "#B3341B";
  ctx.fillRect(scaleX(q1), margin.bottom + h / 2 - 14, scaleX(q3) - scaleX(q1), 28);
  ctx.strokeStyle = "#191712"; ctx.lineWidth = 1;
  ctx.strokeRect(scaleX(q1), margin.bottom + h / 2 - 14, scaleX(q3) - scaleX(q1), 28);

  ctx.strokeStyle = "#191712"; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(scaleX(q2), margin.bottom + h / 2 - 14);
  ctx.lineTo(scaleX(q2), margin.bottom + h / 2 + 14);
  ctx.stroke();

  const outlierMin = q1 - 1.5 * iqr;
  const outlierMax = q3 + 1.5 * iqr;
  for (const v of s) {
    if (v < outlierMin || v > outlierMax) {
      const x = scaleX(v);
      ctx.beginPath(); ctx.arc(x, margin.bottom + h / 2, 3, 0, Math.PI * 2); ctx.fill();
    }
  }
}

/* ---- DOM init (browser only) ----------------------------------------- */

function compute() {
  const pasteText = pasteEl().value.trim();
  const csv = csvEl().files && csvEl().files[0];
  const statsPanel = statEls();

  let text = pasteText;
  let values = [];
  let invalid = [];

  const run = async () => {
    if (csv) {
      const parsed = await parseFile(csv);
      values = parsed.values;
      invalid = parsed.invalid;
    } else if (text && text.length) {
      const parsed = parseInput(text);
      values = parsed.values;
      invalid = parsed.invalid;
    }

    if (values.length === 0) {
      for (const k in statsPanel) statsPanel[k].textContent = "—";
      statsPanel.count.textContent = "No data";
      return;
    }
    if (invalid.length) {
      console.warn("Ignored non-numeric tokens:", invalid);
    }
    renderStats(values);
    drawHistogram(histogram(), values);
    drawBoxPlot(boxplot(), values);
  };

  return run();
}

async function parseFile(file) {
  const reader = new FileReader();
  const text = await new Promise((resolve, reject) => {
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error("Failed to read CSV file"));
    reader.readAsText(file);
  });
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const tokens = [];
  for (const line of lines) {
    for (const part of line.split(/,/)) {
      const t = part.trim();
      if (t.length > 0) tokens.push(t);
    }
  }
  const values = tokens.map(Number);
  const invalid = values.filter((v) => !Number.isFinite(v));
  return { values, invalid };
}

function renderStats(values) {
  const s = statEls();
  s.count.textContent = values.length;
  s.mean.textContent = fmt(mean(values));
  s.median.textContent = fmt(median(values));
  s.mode.textContent = mode(values).length ? mode(values).join(", ") : "—";
  s.stddev.textContent = fmt(stdDev(values));
  s.variance.textContent = fmt(variance(values));
}

function fmt(n) {
  if (n === null || !Number.isFinite(n)) return "—";
  return Number(n.toFixed(4));
}

function clearAll() {
  const s = statEls();
  for (const k in s) s[k].textContent = "—";
  drawHistogram(histogram(), []);
  drawBoxPlot(boxplot(), []);
}

function init() {
  if (typeof document === "undefined") return;
  const calc = calcBtn();
  const clear = clearBtn();
  if (calc) calc.addEventListener("click", () => compute());
  if (clear) clear.addEventListener("click", clearAll);
  clearAll();
}

init();

export { fitCanvas, clearRect, drawAxis, drawText, drawHistogram, drawBoxPlot };
export default {
  parseInput,
  mean,
  median,
  mode,
  variance,
  stdDev,
  quantile,
  compute,
  clearAll,
  drawHistogram,
  drawBoxPlot,
};
