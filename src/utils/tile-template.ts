/**
 * Reusable tile template matching the physical Aura display aesthetic:
 * rounded border, label top-left, value center, unit right-aligned,
 * colored severity pip in the corner.
 *
 * Uses lit-html templates but kept as a plain function so sections
 * can compose tiles without inheriting from LitElement each time.
 */

import { html, nothing, TemplateResult } from 'lit';
import { Severity } from './thresholds';
import { severityColor } from './colors';

export interface TileProps {
  label: string;
  value: string;
  unit?: string | null;
  severity: Severity;
  secondaryLine?: string | null;
  onClick?: () => void;
}

export function renderTile(props: TileProps): TemplateResult {
  const pipColor = severityColor(props.severity);
  return html`
    <div
      class="aura-tile"
      @click=${props.onClick ?? nothing}
      role=${props.onClick ? 'button' : nothing}
      tabindex=${props.onClick ? 0 : nothing}
    >
      <div class="tile-header">
        <span class="tile-label">${props.label}</span>
        <span
          class="tile-pip"
          style="background-color: ${pipColor};"
          aria-label="Status: ${props.severity}"
        ></span>
      </div>
      <div class="tile-value">
        <span class="value-number">${props.value}</span>
        ${props.unit ? html`<span class="value-unit">${props.unit}</span>` : nothing}
      </div>
      ${props.secondaryLine
        ? html`<div class="tile-secondary">${props.secondaryLine}</div>`
        : nothing}
    </div>
  `;
}

export const tileStyles = `
  .aura-tile {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px 14px;
    background-color: var(--card-background-color, #1c1c1c);
    border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
    border-radius: 12px;
    min-height: 84px;
    transition: border-color 0.2s ease, transform 0.1s ease;
    box-sizing: border-box;
  }
  .aura-tile[role='button'] {
    cursor: pointer;
  }
  .aura-tile[role='button']:hover {
    border-color: var(--primary-color, #03a9f4);
  }
  .aura-tile[role='button']:active {
    transform: scale(0.98);
  }
  .tile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .tile-label {
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--secondary-text-color, #a0a0a0);
  }
  .tile-pip {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 0 0 6px currentColor;
  }
  .tile-value {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin-top: 4px;
  }
  .value-number {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--primary-text-color, #ffffff);
    line-height: 1.1;
  }
  .value-unit {
    font-size: 0.75rem;
    color: var(--secondary-text-color, #a0a0a0);
  }
  .tile-secondary {
    font-size: 0.7rem;
    color: var(--secondary-text-color, #a0a0a0);
    margin-top: 2px;
  }
`;
