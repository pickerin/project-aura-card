/**
 * Air Quality section: AQI score, Air Status classification, and Main Issue indicator.
 *
 * All three are firmware-calculated aggregates published over MQTT.
 * AQI is 0-100; Air Status is the text band (Excellent/Good/Fair/Poor);
 * Main Issue names the dominant pollutant (Particles/CO2/VOC/NOx/HCHO/CO/Clear).
 *
 * AQI bands mirror the firmware's classification:
 *   0-25 Excellent | 26-50 Good | 51-75 Fair | 76-100 Poor
 */

import { html, nothing, TemplateResult } from 'lit';
import { HomeAssistant } from '../utils/ha-types';
import { resolveEntity, formatReading } from '../utils/entity-resolver';
import { Severity } from '../utils/thresholds';
import { renderTile } from '../utils/tile-template';

function aqiSeverity(value: number | null): Severity {
  if (value === null || !Number.isFinite(value)) return 'unknown';
  if (value <= 25) return 'green';
  if (value <= 50) return 'yellow';
  if (value <= 75) return 'orange';
  return 'red';
}

function airStatusSeverity(status: string | null): Severity {
  if (!status) return 'unknown';
  switch (status.toLowerCase()) {
    case 'excellent': return 'green';
    case 'good': return 'yellow';
    case 'fair': return 'orange';
    case 'poor': return 'red';
    default: return 'unknown';
  }
}

export function renderAirQualitySection(
  hass: HomeAssistant,
  prefix: string
): TemplateResult | typeof nothing {
  const aqi = resolveEntity(hass, prefix, 'aqi');
  const airStatus = resolveEntity(hass, prefix, 'air_status');
  const mainIssue = resolveEntity(hass, prefix, 'main_issue');

  if (!aqi.available && !airStatus.available && !mainIssue.available) return nothing;

  const overallSeverity = aqiSeverity(aqi.numericValue);

  return html`
    <div class="section-header">
      <ha-icon icon="mdi:air-filter"></ha-icon>
      <span>Air Quality</span>
    </div>
    <div class="section-grid">
      ${renderTile({
        label: 'AQI',
        value: formatReading(aqi, 0),
        unit: '/100',
        severity: overallSeverity,
      })}
      ${renderTile({
        label: 'Status',
        value: airStatus.rawState ?? '--',
        unit: null,
        severity: airStatusSeverity(airStatus.rawState),
      })}
      ${renderTile({
        label: 'Main Issue',
        value: mainIssue.rawState ?? '--',
        unit: null,
        severity: overallSeverity,
      })}
    </div>
  `;
}
