/**
 * Project Aura Compact Card - mimics the physical device's touchscreen layout:
 * a dark 5-column tile grid with warm-bordered tiles, glowing severity pips,
 * the CO2 bar gauge, pressure trend pills, and the status banner.
 *
 * Registered from the same bundle as project-aura-card; use with
 *   type: custom:project-aura-compact-card
 */

import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, CardConfig } from './utils/ha-types';
import {
  resolveEntity,
  formatReading,
  isFahrenheit,
  ResolvedReading,
} from './utils/entity-resolver';
import {
  Severity,
  oneSidedThresholds,
  bidirectionalThresholds,
  moldRiskThresholds,
  evaluateOneSided,
  evaluateBidirectional,
  computeMoldRisk,
  fahrenheitToCelsius,
} from './utils/thresholds';
import { severityColor } from './utils/colors';
import { deltaSeverity } from './sections/pressure-section';

const DEFAULT_PREFIX = 'project_aura';

/** CO2 gauge range mirroring the device's bar (400 ppm floor to red zone). */
const CO2_GAUGE_MIN = 400;
const CO2_GAUGE_MAX = 2000;

function airStatusSeverity(status: string | null): Severity {
  switch ((status ?? '').toLowerCase()) {
    case 'excellent':
    case 'good':
      return 'green';
    case 'fair':
      return 'yellow';
    case 'poor':
      return 'red';
    default:
      return 'unknown';
  }
}

@customElement('project-aura-compact-card')
export class ProjectAuraCompactCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: CardConfig;
  @state() private _now = new Date();

  private _clock?: number;

  public setConfig(config: CardConfig): void {
    if (!config) throw new Error('Invalid configuration');
    this._config = { entity_prefix: DEFAULT_PREFIX, ...config };
  }

  public getCardSize(): number {
    return 6;
  }

  public static getStubConfig(): Record<string, unknown> {
    return { type: 'custom:project-aura-compact-card', entity_prefix: DEFAULT_PREFIX };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._clock = window.setInterval(() => {
      this._now = new Date();
    }, 15000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._clock) window.clearInterval(this._clock);
  }

  private _moreInfo(entityId: string): void {
    const event = new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    this.dispatchEvent(event);
  }

  private _pip(severity: Severity): TemplateResult {
    return html`<span
      class="pip"
      style="color: ${severityColor(severity)}"
    ></span>`;
  }

  /** Standard tile: label, big value, unit, pip. */
  private _tile(
    label: string,
    reading: ResolvedReading,
    severity: Severity,
    decimals: number,
    unit: string,
    subtitle?: string
  ): TemplateResult {
    return html`
      <div class="tile" role="button" tabindex="0"
        @click=${() => this._moreInfo(reading.entityId)}>
        <div class="tile-top"><span class="label">${label}</span>${this._pip(severity)}</div>
        <div class="value-row">
          <span class="value">${formatReading(reading, decimals)}</span>
          <span class="unit">${unit}</span>
        </div>
        ${subtitle ? html`<div class="subtitle">${subtitle}</div>` : nothing}
      </div>
    `;
  }

  /** Half-height row used in the stacked duo tiles (RH/AH, MR/DP). */
  private _duoRow(
    label: string,
    display: string,
    severity: Severity,
    entityId: string
  ): TemplateResult {
    return html`
      <div class="duo-row" role="button" tabindex="0"
        @click=${() => this._moreInfo(entityId)}>
        <span class="label">${label}:</span>
        <span class="duo-value">${display}</span>
        ${this._pip(severity)}
      </div>
    `;
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) return html``;
    const hass = this.hass;
    const prefix = this._config.entity_prefix ?? DEFAULT_PREFIX;

    const co2 = resolveEntity(hass, prefix, 'co2');
    const temp = resolveEntity(hass, prefix, 'temperature');
    const rh = resolveEntity(hass, prefix, 'humidity');
    const ah = resolveEntity(hass, prefix, 'absolute_humidity');
    const dp = resolveEntity(hass, prefix, 'dew_point');
    const pressure = resolveEntity(hass, prefix, 'pressure');
    const d3 = resolveEntity(hass, prefix, 'pressure_delta_3h');
    const d24 = resolveEntity(hass, prefix, 'pressure_delta_24h');
    const pm05 = resolveEntity(hass, prefix, 'pm0_5');
    const pm1 = resolveEntity(hass, prefix, 'pm1_0');
    const pm25 = resolveEntity(hass, prefix, 'pm2_5');
    const pm10 = resolveEntity(hass, prefix, 'pm10');
    const voc = resolveEntity(hass, prefix, 'voc_index');
    const nox = resolveEntity(hass, prefix, 'nox_index');
    const hcho = resolveEntity(hass, prefix, 'hcho');
    const co = resolveEntity(hass, prefix, 'co');
    const airStatus = resolveEntity(hass, prefix, 'air_status');
    const mainIssue = resolveEntity(hass, prefix, 'main_issue');

    const tempC =
      temp.numericValue === null
        ? null
        : isFahrenheit(temp)
          ? fahrenheitToCelsius(temp.numericValue)
          : temp.numericValue;
    const dpC =
      dp.numericValue === null
        ? null
        : isFahrenheit(dp)
          ? fahrenheitToCelsius(dp.numericValue)
          : dp.numericValue;
    const mold = computeMoldRisk(tempC, rh.numericValue);

    const co2Sev = evaluateOneSided(co2.numericValue, oneSidedThresholds.co2_ppm);
    const gaugePct =
      co2.numericValue === null
        ? 0
        : Math.min(
            1,
            Math.max(0, (co2.numericValue - CO2_GAUGE_MIN) / (CO2_GAUGE_MAX - CO2_GAUGE_MIN))
          ) * 100;

    const statusSev = airStatusSeverity(airStatus.rawState);
    const issue = (mainIssue.rawState ?? '').trim();
    const statusText =
      issue && issue.toLowerCase() !== 'clear'
        ? `STATUS: ${issue}`
        : `STATUS: All readings normal (${airStatus.rawState ?? '--'})`;

    const time = this._now.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });
    const [clock, meridiem] = time.split(' ');
    const date = this._now.toLocaleDateString(undefined, {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });

    return html`
      <ha-card>
        <div class="panel">
          <div class="banner" style="border-color: ${severityColor(statusSev)}"
            role="button" tabindex="0"
            @click=${() => this._moreInfo(airStatus.entityId)}>
            <span class="banner-text">${statusText}</span>
          </div>
          <div class="grid">
            <div class="tile span2" role="button" tabindex="0"
              @click=${() => this._moreInfo(co2.entityId)}>
              <div class="tile-top"><span class="label">CO2</span>${this._pip(co2Sev)}</div>
              <div class="value-row hero">
                <span class="value">${formatReading(co2, 0)}</span>
                <span class="unit">${co2.unit ?? 'ppm'}</span>
              </div>
              <div class="gauge">
                <div class="gauge-marker" style="left: ${gaugePct}%"></div>
              </div>
            </div>
            ${this._tile(
              'TEMP',
              temp,
              evaluateBidirectional(tempC, bidirectionalThresholds.temp_c),
              1,
              temp.unit ?? '°'
            )}
            <div class="tile duo">
              ${this._duoRow(
                'RH',
                `${formatReading(rh, 0)}%`,
                evaluateBidirectional(rh.numericValue, bidirectionalThresholds.humidity_pct),
                rh.entityId
              )}
              ${this._duoRow(
                'AH',
                `${formatReading(ah, 0)}g`,
                evaluateBidirectional(ah.numericValue, bidirectionalThresholds.absolute_humidity_gm3),
                ah.entityId
              )}
            </div>
            <div class="tile duo">
              ${this._duoRow(
                'MR',
                mold === null ? '--' : `${mold}`,
                evaluateOneSided(mold, moldRiskThresholds),
                rh.entityId
              )}
              ${this._duoRow(
                'DP',
                `${formatReading(dp, 0)}${isFahrenheit(dp) ? 'F' : 'C'}`,
                evaluateBidirectional(dpC, bidirectionalThresholds.dew_point_c),
                dp.entityId
              )}
            </div>

            <div class="tile span2" role="button" tabindex="0"
              @click=${() => this._moreInfo(pressure.entityId)}>
              <div class="tile-top"><span class="label">MSL PRESSURE</span></div>
              <div class="pressure-row">
                <div class="value-row">
                  <span class="value">${formatReading(pressure, 1)}</span>
                  <span class="unit">${pressure.unit ?? ''}</span>
                </div>
                <div class="trends">
                  <span class="trend-pill"
                    style="border-color: ${severityColor(deltaSeverity(d3.numericValue, 3))}">
                    3h: ${d3.numericValue !== null && d3.numericValue >= 0 ? '+' : ''}${formatReading(d3, 2)}
                  </span>
                  <span class="trend-pill"
                    style="border-color: ${severityColor(deltaSeverity(d24.numericValue, 24))}">
                    24h: ${d24.numericValue !== null && d24.numericValue >= 0 ? '+' : ''}${formatReading(d24, 2)}
                  </span>
                </div>
              </div>
            </div>
            ${this._tile(
              'PM0.5',
              pm05,
              evaluateOneSided(pm05.numericValue, oneSidedThresholds.pm05_ppcm3),
              0,
              '#/cm³'
            )}
            ${this._tile(
              'PM2.5',
              pm25,
              evaluateOneSided(pm25.numericValue, oneSidedThresholds.pm25_ugm3),
              1,
              'µg/m³'
            )}
            ${this._tile(
              'PM10',
              pm10,
              evaluateOneSided(pm10.numericValue, oneSidedThresholds.pm10_ugm3),
              1,
              'µg/m³',
              `PM1: ${formatReading(pm1, 1)}`
            )}

            <div class="tile">
              <div class="tile-top">
                <span class="label">TIME</span>
                <span class="label">${meridiem ?? ''}</span>
              </div>
              <div class="value-row"><span class="value">${clock}</span></div>
              <div class="subtitle">${date}</div>
            </div>
            ${this._tile(
              'VOC',
              voc,
              evaluateOneSided(voc.numericValue, oneSidedThresholds.voc_index),
              0,
              'Index'
            )}
            ${this._tile(
              'NOx',
              nox,
              evaluateOneSided(nox.numericValue, oneSidedThresholds.nox_index),
              0,
              'Index'
            )}
            ${this._tile(
              'HCHO',
              hcho,
              evaluateOneSided(hcho.numericValue, oneSidedThresholds.hcho_ppb),
              0,
              'ppb'
            )}
            ${this._tile(
              'CO',
              co,
              evaluateOneSided(co.numericValue, oneSidedThresholds.co_ppm),
              1,
              'ppm'
            )}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      background: transparent;
      border: none;
      box-shadow: none;
    }
    .panel {
      background: #101014;
      border-radius: 14px;
      padding: 12px;
      font-family: ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace;
    }
    .banner {
      display: flex;
      align-items: center;
      border: 2px solid;
      border-radius: 999px;
      padding: 7px 16px;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .banner-text {
      font-size: 0.85rem;
      font-weight: 700;
      color: #f3ead0;
      letter-spacing: 0.02em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
    }
    .span2 {
      grid-column: span 2;
    }
    .tile {
      background: #15151b;
      border: 2px solid #cfc08f;
      border-radius: 10px;
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 74px;
      box-sizing: border-box;
      cursor: pointer;
    }
    .tile-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
    }
    .label {
      font-size: 0.68rem;
      font-weight: 700;
      color: #cfc08f;
      letter-spacing: 0.05em;
    }
    .pip {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: currentColor;
      box-shadow: 0 0 7px currentColor;
      flex-shrink: 0;
    }
    .value-row {
      display: flex;
      align-items: baseline;
      gap: 4px;
      justify-content: center;
    }
    .value {
      font-size: 1.5rem;
      font-weight: 800;
      color: #f5f5f0;
      line-height: 1.05;
    }
    .hero .value {
      font-size: 2.4rem;
    }
    .unit {
      font-size: 0.65rem;
      font-weight: 700;
      color: #cfc08f;
    }
    .subtitle {
      font-size: 0.62rem;
      font-weight: 700;
      color: #9c9478;
      text-align: center;
    }
    .gauge {
      position: relative;
      height: 8px;
      border: 1px solid #cfc08f;
      border-radius: 999px;
      background: linear-gradient(
        to right,
        #43a047 0%,
        #43a047 25%,
        #fdd835 40%,
        #ff9800 65%,
        #d32f2f 100%
      );
      margin-top: 6px;
    }
    .gauge-marker {
      position: absolute;
      top: -3px;
      width: 4px;
      height: 12px;
      border-radius: 2px;
      background: #ffffff;
      transform: translateX(-50%);
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
    }
    .duo {
      padding: 4px 8px;
      gap: 2px;
    }
    .duo-row {
      display: flex;
      align-items: center;
      gap: 5px;
      flex: 1;
    }
    .duo-row + .duo-row {
      border-top: 1px solid rgba(207, 192, 143, 0.4);
    }
    .duo-value {
      font-size: 0.95rem;
      font-weight: 800;
      color: #f5f5f0;
      flex: 1;
      text-align: right;
    }
    .pressure-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .trends {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .trend-pill {
      border: 2px solid;
      border-radius: 999px;
      padding: 1px 8px;
      font-size: 0.62rem;
      font-weight: 800;
      color: #f5f5f0;
      white-space: nowrap;
    }
    @media (max-width: 460px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .span2 {
        grid-column: span 2;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'project-aura-compact-card': ProjectAuraCompactCard;
  }
}

interface CustomCardsWindow {
  customCards?: Array<{ type: string; name: string; description: string }>;
}

const win = window as unknown as CustomCardsWindow;
win.customCards = win.customCards ?? [];
win.customCards.push({
  type: 'project-aura-compact-card',
  name: 'Project Aura Compact Card',
  description: 'Compact dashboard card mimicking the physical Project Aura display',
});
