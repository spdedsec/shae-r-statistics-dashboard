/* ========================================================================
   SHAE R Statistics Dashboard — tests/test.js
   ESM test runner (no external dependencies).
   Run: node tests/test.js
   ======================================================================== */

import {
  parseInput,
  mean,
  median,
  mode,
  variance,
  stdDev,
  quantile,
} from "../src/app.js";

let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) {
    passed++;
  } else {
    failed++;
    console.error("FAIL:", msg);
  }
}

function approx(a, b, eps = 1e-6) {
  return Math.abs(a - b) < eps;
}

// mean
assert(approx(mean([1, 2, 3, 4, 5]), 3), "mean of 1..5 is 3");
assert(approx(mean([10, 20]), 15), "mean of 10,20 is 15");
assert(mean([]) === null, "mean of empty is null");

// median
assert(approx(median([1, 2, 3, 4, 5]), 3), "median odd");
assert(approx(median([1, 2, 3, 4]), 2.5), "median even");
assert(median([]) === null, "median empty is null");

// mode
assert(JSON.stringify(mode([1, 2, 2, 3, 3, 3, 4])) === JSON.stringify([3]), "mode single");
assert(JSON.stringify(mode([1, 2, 3, 4])) === JSON.stringify([]), "mode none");
assert(JSON.stringify(mode([1, 1, 2, 2])) === JSON.stringify([1, 2]), "mode multi");

// variance (sample)
assert(approx(variance([1, 2, 3, 4, 5]), 2.5), "variance 1..5 is 2.5");
assert(variance([1]) === null, "variance of single value is null");

// stdDev
assert(approx(stdDev([1, 2, 3, 4, 5]), Math.sqrt(2.5)), "stdDev");

// quantile
assert(approx(quantile([1, 2, 3, 4, 5], 0.5), 3), "quantile median");
assert(approx(quantile([1, 2, 3, 4], 0.25), 1.75), "quantile q1");

// parseInput
const p1 = parseInput("1, 2, 3, 4, 5");
assert(p1.values.length === 5, "parse comma-separated");
assert(p1.invalid.length === 0, "no invalid tokens");
const p2 = parseInput("1 2 3");
assert(p2.values.length === 3, "parse space-separated");
const p3 = parseInput("1,abc,3");
assert(p3.values.length === 2, "invalid token skipped");
assert(p3.invalid.length === 1, "invalid token counted");
assert(JSON.stringify(p3.values) === JSON.stringify([1, 3]), "values exclude invalid");

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);