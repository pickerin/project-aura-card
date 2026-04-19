/**
 * Status banner rendering the firmware-computed Air Status and Main Issue.
 *
 * The firmware evaluates all sensors and reports:
 *   - air_status: "Excellent" | "Good" | "Fair" | "Poor"
 *   - main_issue: human-readable string like "AH low - Use humidifier" or "Clear"
 *
 * We show both: a colored bar for status (severity pip) and the main_issue text
 * as the message. If main_issue is "Clear", we show a generic "All readings normal".
 */

import { html, TemplateResult } from 'lit';
import { HomeAssistant } from '../utils/ha-types';
import { Severity } from '../utils/thresholds';
import { severityColor, severityIcon } from '../utils/colors';

function airStatusToSeverity(status: string | null): Severity {
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

export function renderStatusBanner(
  hass: HomeAssistant,
  prefix: string
): TemplateResult {
  const airStatusEntity = hass.states[`sensor.${prefix}_air_status`];
  const mainIssueEntity = hass.states[`sensor.${prefix}_main_issue`];

  const airStatus = airStatusEntity?.state ?? null;
  const mainIssue = mainIssueEntity?.state ?? 'Unknown';
  const severity = airStatusToSeverity(airStatus);

  const message =
    mainIssue === 'Clear' || mainIssue === 'unknown'
      ? `All readings normal (${airStatus ?? '--'})`
      : mainIssue;

  return html`
    <div
      class="status-banner"
      style="border-color: ${severityColor(severity)};"
    >
      <ha-icon
        icon=${severityIcon(severity)}
        style="color: ${severityColor(severity)};"
      ></ha-icon>
      <span class="status-text">STATUS: ${message}</span>
    </div>
  `;
}

export const statusBannerStyles = `
  .status-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border: 2px solid;
    border-radius: 10px;
    background-color: var(--card-background-color, #1c1c1c);
    margin-bottom: 12px;
  }
  .status-banner ha-icon {
    --mdc-icon-size: 20px;
    flex-shrink: 0;
  }
  .status-text {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--primary-text-color, #ffffff);
    letter-spacing: 0.02em;
  }
`;
