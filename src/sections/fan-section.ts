/**
 * Fan/Ventilation section: status display + mode controls.
 * Only rendered when fan hardware is detected (fan_status entity exists and is not unavailable).
 *
 * Status tiles: Fan Status (text), Output %, Current Speed, Timer Remaining
 * Control tiles: Auto, Manual, Stop (switches) — horizontal row
 */

import { html, nothing, TemplateResult } from 'lit';
import { HomeAssistant } from '../utils/ha-types';
import { resolveEntity, resolveSwitch, formatReading } from '../utils/entity-resolver';
import { Severity } from '../utils/thresholds';
import { renderTile } from '../utils/tile-template';
import { renderControlTile } from './controls-section';

function fanStatusSeverity(status: string | null): Severity {
  if (!status) return 'unknown';
  switch (status.toUpperCase()) {
    case 'RUNNING': return 'green';
    case 'STOPPED': return 'yellow';
    case 'OFFLINE': return 'orange';
    case 'FAULT': return 'red';
    default: return 'unknown';
  }
}

function faultSeverity(isOn: boolean): Severity {
  return isOn ? 'red' : 'green';
}

export function renderFanSection(
  hass: HomeAssistant,
  prefix: string
): TemplateResult | typeof nothing {
  const fanStatus = resolveEntity(hass, prefix, 'fan_status');

  // Hide section entirely if no fan hardware
  if (!fanStatus.available) return nothing;

  const outputPct = resolveEntity(hass, prefix, 'fan_output_percent');
  const timerRemaining = resolveEntity(hass, prefix, 'fan_timer_remaining');

  // Number entity: state is the current value string
  const speedEntityId = `number.${prefix}_fan_manual_percent`;
  const speedEntity = hass.states[speedEntityId];
  const speedValue = speedEntity?.state
    && speedEntity.state !== 'unknown'
    && speedEntity.state !== 'unavailable'
    ? speedEntity.state
    : '--';

  // Binary sensor: fan_fault
  const faultEntityId = `binary_sensor.${prefix}_fan_fault`;
  const faultEntity = hass.states[faultEntityId];
  const faultAvailable = Boolean(faultEntity) && faultEntity.state !== 'unavailable';
  const faultOn = faultEntity?.state === 'on';

  // Mode switches
  const fanAuto = resolveSwitch(hass, prefix, 'fan_auto');
  const fanManual = resolveSwitch(hass, prefix, 'fan_manual');
  const fanStop = resolveSwitch(hass, prefix, 'fan_stop');

  const toggle = (entityId: string, isOn: boolean) =>
    hass.callService('switch', isOn ? 'turn_off' : 'turn_on', {}, { entity_id: entityId });

  return html`
    <div class="section-header">
      <ha-icon icon="mdi:fan"></ha-icon>
      <span>Ventilation</span>
    </div>
    <div class="section-grid">
      ${renderTile({
        label: 'Status',
        value: fanStatus.rawState ?? '--',
        unit: null,
        severity: fanStatusSeverity(fanStatus.rawState),
      })}
      ${outputPct.available ? renderTile({
        label: 'Output',
        value: formatReading(outputPct, 0),
        unit: '%',
        severity: 'green',
      }) : nothing}
      ${speedEntity ? renderTile({
        label: 'Speed',
        value: speedValue,
        unit: '%',
        severity: 'green',
      }) : nothing}
      ${timerRemaining.available ? renderTile({
        label: 'Timer',
        value: timerRemaining.rawState ?? '--',
        unit: null,
        severity: 'green',
      }) : nothing}
      ${faultAvailable ? renderTile({
        label: 'Fault',
        value: faultOn ? 'Yes' : 'No',
        unit: null,
        severity: faultSeverity(faultOn),
      }) : nothing}
    </div>
    <div class="controls-grid">
      ${renderControlTile({
        label: 'Auto',
        icon: 'mdi:fan-auto',
        available: fanAuto.available,
        isOn: fanAuto.isOn,
        stateLabel: fanAuto.available ? (fanAuto.isOn ? 'On' : 'Off') : '--',
        onTap: () => toggle(fanAuto.entityId, fanAuto.isOn),
      })}
      ${renderControlTile({
        label: 'Manual',
        icon: 'mdi:fan',
        available: fanManual.available,
        isOn: fanManual.isOn,
        stateLabel: fanManual.available ? (fanManual.isOn ? 'On' : 'Off') : '--',
        onTap: () => toggle(fanManual.entityId, fanManual.isOn),
      })}
      ${renderControlTile({
        label: 'Stop',
        icon: 'mdi:fan-off',
        available: fanStop.available,
        isOn: fanStop.isOn,
        stateLabel: fanStop.available ? (fanStop.isOn ? 'On' : 'Off') : '--',
        onTap: () => toggle(fanStop.entityId, fanStop.isOn),
      })}
    </div>
  `;
}
