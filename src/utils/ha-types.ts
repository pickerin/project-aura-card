/**
 * Minimal subset of the Home Assistant frontend types used by this card.
 * We intentionally avoid pulling in the full custom-card-helpers or
 * home-assistant-js-websocket dependency trees; a custom card only needs
 * a small surface area.
 */

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown> & {
    friendly_name?: string;
    unit_of_measurement?: string;
    icon?: string;
    device_class?: string;
  };
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  themes: {
    darkMode: boolean;
    theme: string;
  };
  language: string;
  locale: {
    language: string;
    number_format?: string;
    time_format?: string;
  };
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: { entity_id?: string | string[] }
  ) => Promise<unknown>;
}

export interface CardConfig {
  type: string;
  entity_prefix?: string;
  title?: string;
  show_status_banner?: boolean;
  show_controls?: boolean;
  device_ip?: string;
  show_pressure_section?: boolean;
  show_graphs?: boolean;
  compact?: boolean;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: CardConfig): void;
  getCardSize(): number | Promise<number>;
}
