/**
 * Controls section: Night Mode, Backlight, Alert Blink (switches) and Restart (button).
 * Entity naming follows the Project Aura firmware MQTT discovery convention.
 */

import { html, nothing, TemplateResult } from 'lit';
import { HomeAssistant } from '../utils/ha-types';
import { resolveSwitch } from '../utils/entity-resolver';

interface ControlTile {
  label: string;
  icon: string;
  available: boolean;
  isOn: boolean;
  stateLabel: string;
  onTap: () => void;
}

function renderControlTile(tile: ControlTile): TemplateResult {
  return html`
    <button
      class="control-tile"
      @click=${tile.onTap}
      ?disabled=${!tile.available}
    >
      <span class="control-icon-circle ${tile.isOn ? 'control-icon-circle--on' : ''}">
        <ha-icon icon=${tile.icon}></ha-icon>
      </span>
      <span class="control-label">
        <span class="control-name">${tile.label}</span>
        <span class="control-state">${tile.stateLabel}</span>
      </span>
    </button>
  `;
}

function switchStateLabel(available: boolean, isOn: boolean): string {
  if (!available) return '--';
  return isOn ? 'On' : 'Off';
}

function buttonStateLabel(state: string | null): string {
  if (!state) return '--';
  // Button state is 'unknown' before first press, ISO timestamp after
  if (state === 'unknown') return 'Unknown';
  if (state === 'unavailable') return '--';
  return 'Ready';
}

export function renderControlsSection(
  hass: HomeAssistant,
  prefix: string
): TemplateResult | typeof nothing {
  const nightMode = resolveSwitch(hass, prefix, 'night_mode');
  const backlight = resolveSwitch(hass, prefix, 'backlight');
  const alertBlink = resolveSwitch(hass, prefix, 'alert_blink');

  const restartEntityId = `button.${prefix}_restart`;
  const restartEntity = hass.states[restartEntityId];
  const restartAvailable = Boolean(restartEntity)
    && restartEntity.state !== 'unavailable';

  // Hide the section entirely if none of the entities exist
  if (!nightMode.available && !backlight.available && !alertBlink.available && !restartAvailable) {
    return nothing;
  }

  const toggle = (entityId: string, isOn: boolean) =>
    hass.callService('switch', isOn ? 'turn_off' : 'turn_on', {}, { entity_id: entityId });

  const press = (entityId: string) =>
    hass.callService('button', 'press', {}, { entity_id: entityId });

  return html`
    <div class="section-header">
      <ha-icon icon="mdi:tune"></ha-icon>
      <span>Controls</span>
    </div>
    <div class="controls-grid">
      ${renderControlTile({
        label: 'Night Mode',
        icon: 'mdi:weather-night',
        available: nightMode.available,
        isOn: nightMode.isOn,
        stateLabel: switchStateLabel(nightMode.available, nightMode.isOn),
        onTap: () => toggle(nightMode.entityId, nightMode.isOn),
      })}
      ${renderControlTile({
        label: 'Backlight',
        icon: 'mdi:television',
        available: backlight.available,
        isOn: backlight.isOn,
        stateLabel: switchStateLabel(backlight.available, backlight.isOn),
        onTap: () => toggle(backlight.entityId, backlight.isOn),
      })}
      ${renderControlTile({
        label: 'Alert Blink',
        icon: 'mdi:alarm-light',
        available: alertBlink.available,
        isOn: alertBlink.isOn,
        stateLabel: switchStateLabel(alertBlink.available, alertBlink.isOn),
        onTap: () => toggle(alertBlink.entityId, alertBlink.isOn),
      })}
      ${renderControlTile({
        label: 'Restart',
        icon: 'mdi:restart-alert',
        available: restartAvailable,
        isOn: false,
        stateLabel: buttonStateLabel(restartEntity?.state ?? null),
        onTap: () => press(restartEntityId),
      })}
    </div>
  `;
}
