/**
 * Comfort section: temperature, humidity, absolute humidity, dew point, mold risk.
 *
 * All four RH-derived metrics use bidirectional thresholds (too-low and
 * too-high both warn). Mold risk is client-computed using the firmware's
 * exact formula since it's not published over MQTT.
 */

import { html, TemplateResult } from 'lit';
import { HomeAssistant } from '../utils/ha-types';
import {
  resolveEntity,
  formatReading,
  isFahrenheit,
} from '../utils/entity-resolver';
import {
  bidirectionalThresholds,
  moldRiskThresholds,
  evaluateBidirectional,
  evaluateOneSided,
  computeMoldRisk,
  fahrenheitToCelsius,
} from '../utils/thresholds';
import { renderTile } from '../utils/tile-template';

export function renderComfortSection(
  hass: HomeAssistant,
  prefix: string
): TemplateResult {
  const temp = resolveEntity(hass, prefix, 'temperature');
  const humidity = resolveEntity(hass, prefix, 'humidity');
  const absHumidity = resolveEntity(hass, prefix, 'absolute_humidity');
  const dewPoint = resolveEntity(hass, prefix, 'dew_point');

  const tempC = temp.numericValue !== null && isFahrenheit(temp)
    ? fahrenheitToCelsius(temp.numericValue)
    : temp.numericValue;
  const dpC = dewPoint.numericValue !== null && isFahrenheit(dewPoint)
    ? fahrenheitToCelsius(dewPoint.numericValue)
    : dewPoint.numericValue;

  const moldRiskValue = computeMoldRisk(tempC, humidity.numericValue);

  return html`
    <div class="section-header">
      <ha-icon icon="mdi:home-thermometer-outline"></ha-icon>
      <span>Comfort</span>
    </div>
    <div class="section-grid">
      ${renderTile({
        label: 'Temp',
        value: formatReading(temp, 1),
        unit: temp.unit,
        severity: evaluateBidirectional(tempC, bidirectionalThresholds.temp_c),
      })}
      ${renderTile({
        label: 'RH',
        value: formatReading(humidity, 0),
        unit: '%',
        severity: evaluateBidirectional(
          humidity.numericValue,
          bidirectionalThresholds.humidity_pct
        ),
      })}
      ${renderTile({
        label: 'AH',
        value: formatReading(absHumidity, 1),
        unit: 'g/m³',
        severity: evaluateBidirectional(
          absHumidity.numericValue,
          bidirectionalThresholds.absolute_humidity_gm3
        ),
      })}
      ${renderTile({
        label: 'DP',
        value: formatReading(dewPoint, 0),
        unit: dewPoint.unit,
        severity: evaluateBidirectional(dpC, bidirectionalThresholds.dew_point_c),
      })}
      ${renderTile({
        label: 'MR',
        value: moldRiskValue !== null ? String(moldRiskValue) : '--',
        unit: '/10',
        severity: evaluateOneSided(moldRiskValue, moldRiskThresholds),
        secondaryLine: 'Mold Risk',
      })}
    </div>
  `;
}
