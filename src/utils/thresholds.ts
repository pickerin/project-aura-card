/**
 * Air quality thresholds mirrored from Project Aura firmware source.
 *
 * Source of truth:
 *   - src/config/AppConfig.h (lines 303-333): one-sided AQ metrics
 *   - src/ui/StatusMessages.cpp (lines 170-290): bidirectional climate metrics
 *   - src/core/MathUtils.h (line 36): compute_mold_risk_index formula
 *
 * Tiers: green (good) -> yellow (elevated) -> orange (poor) -> red (hazardous).
 * For one-sided metrics (CO2, particulates, gases): red is implicit (above orange ceiling).
 * For bidirectional metrics (temp, RH, DP, AH): both too-low and too-high trigger warnings.
 */

export type Severity = 'green' | 'yellow' | 'orange' | 'red' | 'unknown';

/** Firmware Celsius thresholds; convert per-metric at evaluation time. */
interface OneSidedBands {
  green: number;
  yellow: number;
  orange: number;
}

interface BidirectionalBands {
  redLow: number;
  orangeLow: number;
  yellowLow: number;
  yellowHigh: number;
  orangeHigh: number;
  redHigh: number;
}

/** One-sided: higher values worse. Green ceiling -> yellow ceiling -> orange ceiling -> red. */
export const oneSidedThresholds = {
  co2_ppm: { green: 800, yellow: 1000, orange: 1500 } as OneSidedBands,
  co_ppm: { green: 9, yellow: 35, orange: 100 } as OneSidedBands,
  pm25_ugm3: { green: 12, yellow: 35, orange: 55 } as OneSidedBands,
  pm1_ugm3: { green: 10, yellow: 25, orange: 50 } as OneSidedBands,
  pm4_ugm3: { green: 25, yellow: 50, orange: 75 } as OneSidedBands,
  pm10_ugm3: { green: 54, yellow: 154, orange: 254 } as OneSidedBands,
  pm05_ppcm3: { green: 250, yellow: 600, orange: 1200 } as OneSidedBands,
  hcho_ppb: { green: 30, yellow: 60, orange: 100 } as OneSidedBands,
  voc_index: { green: 150, yellow: 250, orange: 350 } as OneSidedBands,
  nox_index: { green: 50, yellow: 100, orange: 200 } as OneSidedBands,
} as const;

/** Bidirectional: comfort band is green; deviations in either direction escalate. */
export const bidirectionalThresholds = {
  temp_c: {
    redLow: 16, orangeLow: 18, yellowLow: 20,
    yellowHigh: 25, orangeHigh: 26, redHigh: 28,
  } as BidirectionalBands,
  humidity_pct: {
    redLow: 20, orangeLow: 30, yellowLow: 40,
    yellowHigh: 60, orangeHigh: 65, redHigh: 70,
  } as BidirectionalBands,
  dew_point_c: {
    redLow: 5, orangeLow: 8, yellowLow: 10,
    yellowHigh: 16, orangeHigh: 18, redHigh: 21,
  } as BidirectionalBands,
  absolute_humidity_gm3: {
    redLow: 4, orangeLow: 5, yellowLow: 7,
    yellowHigh: 15, orangeHigh: 18, redHigh: 20,
  } as BidirectionalBands,
} as const;

/** Mold risk index: 0-10 integer from compute_mold_risk_index(). Inferred tier mapping. */
export const moldRiskThresholds = {
  green: 3,
  yellow: 5,
  orange: 7,
} as OneSidedBands;

export function evaluateOneSided(
  value: number | null,
  bands: OneSidedBands
): Severity {
  if (value === null || !Number.isFinite(value)) return 'unknown';
  if (value <= bands.green) return 'green';
  if (value <= bands.yellow) return 'yellow';
  if (value <= bands.orange) return 'orange';
  return 'red';
}

export function evaluateBidirectional(
  value: number | null,
  bands: BidirectionalBands
): Severity {
  if (value === null || !Number.isFinite(value)) return 'unknown';
  if (value < bands.redLow) return 'red';
  if (value < bands.orangeLow) return 'orange';
  if (value < bands.yellowLow) return 'yellow';
  if (value > bands.redHigh) return 'red';
  if (value > bands.orangeHigh) return 'orange';
  if (value > bands.yellowHigh) return 'yellow';
  return 'green';
}

/** Mirror of firmware compute_mold_risk_index(). Returns 0-10 integer, or null if inputs invalid. */
export function computeMoldRisk(tempC: number | null, rh: number | null): number | null {
  if (tempC === null || rh === null) return null;
  if (!Number.isFinite(tempC) || !Number.isFinite(rh) || rh < 0 || rh > 100) return null;
  const raw = ((rh - 55) / 4) + ((tempC - 18) / 7);
  return Math.round(Math.min(Math.max(raw, 0), 10));
}

export function fahrenheitToCelsius(f: number): number {
  return (f - 32) * (5 / 9);
}
