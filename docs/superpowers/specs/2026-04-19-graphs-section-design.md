# Design: Graphs Section

**Date:** 2026-04-19
**Status:** Approved

## Overview

Add a "Graphs" section at the bottom of the Project Aura Card (below Pressure) displaying 24-hour history line charts for Temperature, Humidity, and CO2 Concentration. Each chart is an individual widget, grouped under a section header styled identically to existing sections (Comfort, Gases, Pressure).

## Approach

Embed HA's native `hui-history-graph-card` element for each graph. This element handles its own history data fetching and rendering, is automatically theme-adaptive, and matches the native HA history graph appearance exactly.

## Component Structure

### New file: `src/sections/graphs-section.ts`

Exports `renderGraphsSection(prefix: string): TemplateResult`.

Returns:
- Section header: `mdi:chart-line` icon + "GRAPHS" label + bottom divider (same markup pattern as all other sections)
- Three `<div class="graph-container" id="graph-temperature">`, `id="graph-humidity"`, `id="graph-co2"` — empty containers; the main card appends card elements into them via `updated()`

No card creation or hass access occurs in this file. It is purely a template fragment.

### Changes to `src/project-aura-card.ts`

**Private field:**
```ts
private _graphCards: Map<string, HTMLElement> = new Map();
```

Not decorated with `@state()` — DOM is managed imperatively, no re-render needed when this map changes.

**`updated()` override:**
```
for each graph in [temperature, humidity, co2]:
  find container: this.shadowRoot.querySelector(`#graph-${key}`)
  if container exists:
    if card not yet in _graphCards:
      create element 'hui-history-graph-card'
      call setConfig({ entities: [{ entity: `sensor.${prefix}_${key}` }], hours_to_show: 24 })
      append to container
      store in _graphCards
    set card.hass = this.hass
```

Cards are created once and reused. `hass` is updated on every `updated()` call so the graph data stays current.

**`render()` change:**
After the pressure section block, add:
```
${this._config.show_graphs !== false
  ? html`<div class="section">${renderGraphsSection(prefix)}</div>`
  : nothing}
```

**`setConfig()` default:**
```ts
show_graphs: true,
```

**`getCardSize()` update:**
Add `if (this._config?.show_graphs !== false) size += 6;` (3 graphs × ~2 units each).

**`getStubConfig()` update:**
Add `show_graphs: true`.

### Changes to `src/utils/ha-types.ts`

Add to `CardConfig`:
```ts
show_graphs?: boolean;
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `show_graphs` | boolean | `true` | Show the Graphs section with 24h history charts |

## Layout

Each graph container is full-width within the section (no grid columns — single column stack). The three containers are separated by the section's existing `gap: 8px` from the `.section` flex column. No additional tile chrome; the embedded card provides its own title and chart axes.

## Entity Mapping

| Graph title | Entity suffix | Full entity ID |
|---|---|---|
| Temperature | `temperature` | `sensor.<prefix>_temperature` |
| Humidity | `humidity` | `sensor.<prefix>_humidity` |
| CO2 Concentration | `co2` | `sensor.<prefix>_co2` |

Titles are set via `hui-history-graph-card`'s `title` config field.

## Out of Scope

- Configurable `hours_to_show` per graph (fixed at 24h)
- Additional graph metrics beyond the three listed
- Custom chart styling (HA native rendering handles appearance)
