/**
 * Resolves entities against the user-configured prefix, reads numeric state values,
 * detects per-entity units (F vs C, inHg vs hPa), and reports availability.
 *
 * Firmware quirk: the HA MQTT discovery entity_id does not always match the MQTT
 * state topic key. The physical HCHO tile, for instance, turns into AQI when no
 * SFA30 is connected. We treat any state of "unknown" or "unavailable" as missing
 * so the tile can render a neutral placeholder instead of a broken pip.
 */

import { HomeAssistant } from './ha-types';

export interface ResolvedReading {
  entityId: string;
  available: boolean;
  rawState: string | null;
  numericValue: number | null;
  unit: string | null;
  friendlyName: string | null;
}

const MISSING_STATES = new Set(['unknown', 'unavailable', 'none', '']);

export function resolveEntity(
  hass: HomeAssistant,
  prefix: string,
  suffix: string
): ResolvedReading {
  const entityId = `sensor.${prefix}_${suffix}`;
  const state = hass.states[entityId];

  if (!state) {
    return {
      entityId,
      available: false,
      rawState: null,
      numericValue: null,
      unit: null,
      friendlyName: null,
    };
  }

  const raw = state.state;
  const missing = MISSING_STATES.has(String(raw).toLowerCase());
  const numeric = missing ? null : Number.parseFloat(raw);

  return {
    entityId,
    available: !missing,
    rawState: raw,
    numericValue: Number.isFinite(numeric) ? numeric : null,
    unit: state.attributes?.unit_of_measurement ?? null,
    friendlyName: state.attributes?.friendly_name ?? null,
  };
}

export function resolveSwitch(
  hass: HomeAssistant,
  prefix: string,
  suffix: string
): { entityId: string; available: boolean; isOn: boolean } {
  const entityId = `switch.${prefix}_${suffix}`;
  const state = hass.states[entityId];
  return {
    entityId,
    available: Boolean(state) && !MISSING_STATES.has(String(state?.state ?? '').toLowerCase()),
    isOn: state?.state === 'on',
  };
}

/** Format for display with unit. Handles null gracefully. */
export function formatReading(
  reading: ResolvedReading,
  decimals: number = 0
): string {
  if (!reading.available || reading.numericValue === null) return '--';
  return reading.numericValue.toFixed(decimals);
}

/** True if the entity reports Fahrenheit. Device supports both via user setting. */
export function isFahrenheit(reading: ResolvedReading): boolean {
  return reading.unit === '°F' || reading.unit === 'F';
}

/** True if pressure is in inHg. Device supports hPa, inHg, mmHg. */
export function isInHg(reading: ResolvedReading): boolean {
  return reading.unit === 'inHg';
}
