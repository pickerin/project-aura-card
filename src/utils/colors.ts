/**
 * Maps severity tiers to Home Assistant theme CSS variables.
 *
 * We use HA's built-in state color variables so the card automatically
 * respects light/dark mode and any custom theme the user has applied.
 * Fallbacks to hardcoded hex ensure the card renders even under themes
 * that omit these variables.
 */

import { Severity } from './thresholds';

export function severityColor(severity: Severity): string {
  switch (severity) {
    case 'green':
      return 'var(--success-color, var(--state-sensor-on-color, #43a047))';
    case 'yellow':
      return 'var(--warning-color, #ff9800)';
    case 'orange':
      return '#ff6f00';
    case 'red':
      return 'var(--error-color, var(--state-sensor-off-color, #d32f2f))';
    case 'unknown':
    default:
      return 'var(--disabled-text-color, #9e9e9e)';
  }
}

/** Icon to show next to severity pip for each tier. */
export function severityIcon(severity: Severity): string {
  switch (severity) {
    case 'green':
      return 'mdi:check-circle';
    case 'yellow':
      return 'mdi:alert-circle-outline';
    case 'orange':
      return 'mdi:alert';
    case 'red':
      return 'mdi:alert-octagon';
    case 'unknown':
    default:
      return 'mdi:help-circle-outline';
  }
}

/** Human-readable label for each severity tier. */
export function severityLabel(severity: Severity): string {
  switch (severity) {
    case 'green':
      return 'Good';
    case 'yellow':
      return 'Elevated';
    case 'orange':
      return 'Poor';
    case 'red':
      return 'Hazardous';
    case 'unknown':
    default:
      return 'Unknown';
  }
}
