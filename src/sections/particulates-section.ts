/**
 * Particulates section: PM0.5, PM1, PM2.5, PM4, PM10.
 *
 * All one-sided (higher = worse). PM0.5 uses particle count (#/cm³) while
 * the rest use mass concentration (ug/m³), reflecting Sensirion SEN66 output.
 */

import { html, TemplateResult } from 'lit';
import { HomeAssistant } from '../utils/ha-types';
import { resolveEntity, formatReading } from '../utils/entity-resolver';
import { oneSidedThresholds, evaluateOneSided } from '../utils/thresholds';
import { renderTile } from '../utils/tile-template';

export function renderParticulatesSection(
  hass: HomeAssistant,
  prefix: string
): TemplateResult {
  const pm05 = resolveEntity(hass, prefix, 'pm0_5');
  const pm1 = resolveEntity(hass, prefix, 'pm1_0');
  const pm25 = resolveEntity(hass, prefix, 'pm2_5');
  const pm4 = resolveEntity(hass, prefix, 'pm4_0');
  const pm10 = resolveEntity(hass, prefix, 'pm10');

  return html`
    <div class="section-header">
      <ha-icon icon="mdi:grain"></ha-icon>
      <span>Particulates</span>
    </div>
    <div class="section-grid">
      ${renderTile({
        label: 'PM0.5',
        value: formatReading(pm05, 0),
        unit: '#/cm³',
        severity: evaluateOneSided(pm05.numericValue, oneSidedThresholds.pm05_ppcm3),
      })}
      ${renderTile({
        label: 'PM1',
        value: formatReading(pm1, 1),
        unit: 'μg/m³',
        severity: evaluateOneSided(pm1.numericValue, oneSidedThresholds.pm1_ugm3),
      })}
      ${renderTile({
        label: 'PM2.5',
        value: formatReading(pm25, 1),
        unit: 'μg/m³',
        severity: evaluateOneSided(pm25.numericValue, oneSidedThresholds.pm25_ugm3),
      })}
      ${renderTile({
        label: 'PM4',
        value: formatReading(pm4, 1),
        unit: 'μg/m³',
        severity: evaluateOneSided(pm4.numericValue, oneSidedThresholds.pm4_ugm3),
      })}
      ${renderTile({
        label: 'PM10',
        value: formatReading(pm10, 1),
        unit: 'μg/m³',
        severity: evaluateOneSided(pm10.numericValue, oneSidedThresholds.pm10_ugm3),
      })}
    </div>
  `;
}
