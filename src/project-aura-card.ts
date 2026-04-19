/**
 * Project Aura Card - a Home Assistant Lovelace custom card that mirrors the
 * physical Project Aura air quality sensor display.
 *
 * Repository: https://github.com/pickerin/project-aura-card
 * License: MIT
 * Author: Robert A. Pickering Jr.
 *
 * Compatible with Project Aura firmware v1.0.x and v1.1.x
 * Source of truth for thresholds: 21cncstudio/project_aura firmware
 */

import { LitElement, html, css, unsafeCSS, TemplateResult, PropertyValues, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, CardConfig } from './utils/ha-types';
import { tileStyles } from './utils/tile-template';
import {
  renderStatusBanner,
  statusBannerStyles,
} from './sections/status-banner';
import { renderComfortSection } from './sections/comfort-section';
import { renderParticulatesSection } from './sections/particulates-section';
import { renderGasesSection } from './sections/gases-section';
import { renderPressureSection } from './sections/pressure-section';
import { renderGraphsSection } from './sections/graphs-section';

const tileStylesSheet = unsafeCSS(tileStyles);
const statusBannerStylesSheet = unsafeCSS(statusBannerStyles);

const CARD_VERSION = '0.2.3';
const DEFAULT_PREFIX = 'project_aura';

@customElement('project-aura-card')
export class ProjectAuraCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: CardConfig;
  private _graphCards: Map<string, HTMLElement> = new Map();

  public static getStubConfig(): CardConfig {
    return {
      type: 'custom:project-aura-card',
      entity_prefix: DEFAULT_PREFIX,
      title: 'Air Quality',
      show_status_banner: true,
      show_pressure_section: true,
      show_graphs: true,
      compact: false,
    };
  }

  public setConfig(config: CardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this._config = {
      entity_prefix: DEFAULT_PREFIX,
      show_status_banner: true,
      show_pressure_section: true,
      show_graphs: true,
      compact: false,
      ...config,
    };
  }

  public getCardSize(): number {
    let size = 1;
    if (this._config?.show_status_banner) size += 1;
    size += 2;
    size += 2;
    size += 2;
    if (this._config?.show_pressure_section) size += 2;
    if (this._config?.show_graphs !== false) size += 6;
    return size;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (!this._config || !this.hass) return;
    if (this._config.show_graphs === false) return;
    void this._updateGraphCards();
  }

  private async _updateGraphCards(): Promise<void> {
    const helpers = await (window as any).loadCardHelpers?.();
    if (!helpers) return;

    const prefix = this._config.entity_prefix ?? DEFAULT_PREFIX;
    const graphs = [
      { key: 'temperature', entity: `sensor.${prefix}_temperature`, title: 'Temperature' },
      { key: 'humidity', entity: `sensor.${prefix}_humidity`, title: 'Humidity' },
      { key: 'co2', entity: `sensor.${prefix}_co2`, title: 'CO2 Concentration' },
    ];

    for (const { key, entity, title } of graphs) {
      const container = this.shadowRoot?.querySelector(`#graph-${key}`);
      if (!container) continue;

      let card = this._graphCards.get(key);
      if (!card) {
        card = await helpers.createCardElement({
          type: 'history-graph',
          entities: [{ entity }],
          hours_to_show: 24,
          title,
        });
        if (!card) continue;
        container.appendChild(card);
        this._graphCards.set(key, card);
      }
      (card as any).hass = this.hass;
    }
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('_config')) return true;
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (!oldHass) return true;
    return this._relevantStatesChanged(oldHass, this.hass);
  }

  private _relevantStatesChanged(
    oldHass: HomeAssistant,
    newHass: HomeAssistant
  ): boolean {
    const prefix = this._config.entity_prefix ?? DEFAULT_PREFIX;
    const matchingEntityId = (id: string) => id.startsWith(`sensor.${prefix}_`)
      || id.startsWith(`switch.${prefix}_`)
      || id.startsWith(`button.${prefix}_`);

    for (const entityId of Object.keys(newHass.states)) {
      if (!matchingEntityId(entityId)) continue;
      if (oldHass.states[entityId]?.state !== newHass.states[entityId].state) {
        return true;
      }
    }
    return false;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    const prefix = this._config.entity_prefix ?? DEFAULT_PREFIX;

    const anySensorPresent = Boolean(
      this.hass.states[`sensor.${prefix}_co2`]
        || this.hass.states[`sensor.${prefix}_temperature`]
    );

    if (!anySensorPresent) {
      return html`
        <ha-card>
          <div class="card-error">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            <div>
              <strong>Project Aura not found</strong>
              <div class="error-detail">
                No entities found with prefix <code>sensor.${prefix}_*</code>.
                Check your MQTT base topic or adjust <code>entity_prefix</code> in the card config.
              </div>
            </div>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card>
        ${this._config.title
          ? html`<h1 class="card-title">${this._config.title}</h1>`
          : nothing}
        <div class="card-content">
          ${this._config.show_status_banner !== false
            ? renderStatusBanner(this.hass, prefix)
            : nothing}
          <div class="section">${renderComfortSection(this.hass, prefix)}</div>
          <div class="section">${renderParticulatesSection(this.hass, prefix)}</div>
          <div class="section">${renderGasesSection(this.hass, prefix)}</div>
          ${this._config.show_pressure_section !== false
            ? html`<div class="section">${renderPressureSection(this.hass, prefix)}</div>`
            : nothing}
          ${this._config.show_graphs !== false
            ? html`<div class="section">${renderGraphsSection()}</div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    ha-card {
      padding: 16px;
    }
    .card-title {
      margin: 0 0 12px 0;
      font-size: 1.2rem;
      font-weight: 500;
      color: var(--primary-text-color, #ffffff);
    }
    .card-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .section-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--secondary-text-color, #a0a0a0);
      padding-bottom: 4px;
      border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
    }
    .section-header ha-icon {
      --mdc-icon-size: 18px;
    }
    .section-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
      gap: 8px;
    }
    .pressure-grid {
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    }
    .card-error {
      display: flex;
      gap: 12px;
      padding: 16px;
      align-items: flex-start;
    }
    .card-error ha-icon {
      --mdc-icon-size: 24px;
      color: var(--warning-color, #ff9800);
      flex-shrink: 0;
    }
    .error-detail {
      font-size: 0.85rem;
      color: var(--secondary-text-color, #a0a0a0);
      margin-top: 4px;
    }
    .error-detail code {
      background: var(--code-editor-background-color, rgba(255, 255, 255, 0.08));
      padding: 1px 5px;
      border-radius: 3px;
      font-family: 'Roboto Mono', monospace;
      font-size: 0.8rem;
    }
    .graphs-row {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
    .graph-container {
      flex: 1;
      min-width: 0;
    }
    ${tileStylesSheet}
    ${statusBannerStylesSheet}
  `;
}

// Register with HA's custom card picker so it appears in the visual editor
interface WindowWithCardPicker extends Window {
  customCards?: Array<{
    type: string;
    name: string;
    description: string;
    preview?: boolean;
    documentationURL?: string;
  }>;
}

const win = window as WindowWithCardPicker;
win.customCards = win.customCards ?? [];
win.customCards.push({
  type: 'project-aura-card',
  name: 'Project Aura Card',
  description:
    'Mirrors the physical Project Aura air quality monitor display with firmware-aligned severity thresholds.',
  preview: true,
  documentationURL: 'https://github.com/pickerin/project-aura-card',
});

// Console banner for discoverability during install
/* eslint-disable no-console */
console.info(
  `%c PROJECT-AURA-CARD %c v${CARD_VERSION} `,
  'color: white; background: #43a047; font-weight: 700;',
  'color: #43a047; background: white; font-weight: 700;'
);
