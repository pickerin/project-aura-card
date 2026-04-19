/**
 * Gases section: CO2, VOC, NOx, HCHO, CO.
 *
 * CO is optional (SEN0466 not installed on most builds). HCHO is optional
 * (SFA30 not installed). Tiles hide themselves when the underlying entity
 * is unavailable rather than showing a broken pip.
 */

import { html, nothing, TemplateResult } from 'lit';
import { HomeAssistant } from '../utils/ha-types';
import { resolveEntity, formatReading } from '../utils/entity-resolver';
import { oneSidedThresholds, evaluateOneSided } from '../utils/thresholds';
import { renderTile } from '../utils/tile-template';

export function renderGasesSection(
  hass: HomeAssistant,
  prefix: string
): TemplateResult {
  const co2 = resolveEntity(hass, prefix, 'co2');
  const voc = resolveEntity(hass, prefix, 'voc_index');
  const nox = resolveEntity(hass, prefix, 'nox_index');
  const hcho = resolveEntity(hass, prefix, 'hcho');
  const co = resolveEntity(hass, prefix, 'co');

  return html`
    <div class="section-header">
      <ha-icon icon="mdi:molecule"></ha-icon>
      <span>Gases</span>
    </div>
    <div class="section-grid">
      ${renderTile({
        label: 'CO2',
        value: formatReading(co2, 0),
        unit: 'ppm',
        severity: evaluateOneSided(co2.numericValue, oneSidedThresholds.co2_ppm),
      })}
      ${renderTile({
        label: 'VOC',
        value: formatReading(voc, 0),
        unit: 'index',
        severity: evaluateOneSided(voc.numericValue, oneSidedThresholds.voc_index),
      })}
      ${renderTile({
        label: 'NOx',
        value: formatReading(nox, 0),
        unit: 'index',
        severity: evaluateOneSided(nox.numericValue, oneSidedThresholds.nox_index),
      })}
      ${hcho.available
        ? renderTile({
            label: 'HCHO',
            value: formatReading(hcho, 0),
            unit: 'ppb',
            severity: evaluateOneSided(hcho.numericValue, oneSidedThresholds.hcho_ppb),
          })
        : nothing}
      ${co.available
        ? renderTile({
            label: 'CO',
            value: formatReading(co, 1),
            unit: co.unit ?? 'ppm',
            severity: evaluateOneSided(co.numericValue, oneSidedThresholds.co_ppm),
          })
        : nothing}
    </div>
  `;
}
