/**
 * Pressure section: MSL pressure with 3h/24h trend deltas.
 *
 * Pressure itself doesn't have a severity-colored pip on the physical device;
 * it's the delta values that get colored. Fast-changing pressure (large 3h or
 * 24h delta) warns of weather shifts. Thresholds here are inferred from
 * firmware defaults and meteorological conventions since the firmware source
 * doesn't encode specific thresholds for pressure deltas.
 */

import { html, nothing, TemplateResult } from 'lit';
import { HomeAssistant } from '../utils/ha-types';
import { resolveEntity, formatReading } from '../utils/entity-resolver';
import { Severity } from '../utils/thresholds';
import { renderTile } from '../utils/tile-template';

/**
 * Pressure delta severity using absolute value.
 * Meteorological rule of thumb: hPa changes over 3h/24h that indicate
 * significant weather movement. Equivalent inHg thresholds computed at runtime.
 */
function deltaSeverity(deltaHpa: number | null, windowHours: 3 | 24): Severity {
  if (deltaHpa === null) return 'unknown';
  const absDelta = Math.abs(deltaHpa);
  if (windowHours === 3) {
    if (absDelta < 1.5) return 'green';
    if (absDelta < 3.0) return 'yellow';
    if (absDelta < 5.0) return 'orange';
    return 'red';
  }
  if (absDelta < 5.0) return 'green';
  if (absDelta < 10.0) return 'yellow';
  if (absDelta < 15.0) return 'orange';
  return 'red';
}

function formatDelta(value: number | null, unit: string | null): string {
  if (value === null) return '--';
  const sign = value >= 0 ? '+' : '';
  const decimals = unit === 'inHg' ? 2 : 1;
  return `${sign}${value.toFixed(decimals)}`;
}

export function renderPressureSection(
  hass: HomeAssistant,
  prefix: string
): TemplateResult {
  const pressure = resolveEntity(hass, prefix, 'pressure');
  const delta3h = resolveEntity(hass, prefix, 'pressure_delta_3h');
  const delta24h = resolveEntity(hass, prefix, 'pressure_delta_24h');

  if (!pressure.available) return html`${nothing}`;

  return html`
    <div class="section-header">
      <ha-icon icon="mdi:gauge"></ha-icon>
      <span>Pressure</span>
    </div>
    <div class="section-grid pressure-grid">
      ${renderTile({
        label: 'MSL Pressure',
        value: formatReading(pressure, pressure.unit === 'inHg' ? 2 : 1),
        unit: pressure.unit,
        severity: 'green',
      })}
      ${renderTile({
        label: '3h Trend',
        value: formatDelta(delta3h.numericValue, delta3h.unit),
        unit: delta3h.unit,
        severity: deltaSeverity(delta3h.numericValue, 3),
      })}
      ${renderTile({
        label: '24h Trend',
        value: formatDelta(delta24h.numericValue, delta24h.unit),
        unit: delta24h.unit,
        severity: deltaSeverity(delta24h.numericValue, 24),
      })}
    </div>
  `;
}
