/**
 * Graphs section: 24-hour history charts for Temperature, Humidity, and CO2.
 *
 * This function renders only the section header and empty container divs.
 * The actual hui-history-graph-card elements are created and managed by the
 * main card class in updated() so they have access to the hass lifecycle.
 */

import { html, TemplateResult } from 'lit';

export function renderGraphsSection(): TemplateResult {
  return html`
    <div class="section-header">
      <ha-icon icon="mdi:chart-line"></ha-icon>
      <span>Graphs</span>
    </div>
    <div class="graphs-row">
      <div id="graph-temperature" class="graph-container"></div>
      <div id="graph-humidity" class="graph-container"></div>
      <div id="graph-co2" class="graph-container"></div>
    </div>
  `;
}
