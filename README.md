# Project Aura Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub release](https://img.shields.io/github/release/pickerin/project-aura-card.svg)](https://github.com/pickerin/project-aura-card/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A Home Assistant Lovelace card that mirrors the physical display of the [Project Aura](https://github.com/21cncstudio/project_aura) DIY air quality sensor. Severity thresholds are copied directly from the firmware source — the card and the device always agree on what's good, elevated, poor, or hazardous.

![Screenshot placeholder](screenshot.png)

---

## Compatibility

| Firmware | Home Assistant | Card version |
|----------|---------------|-------------|
| v1.0.x   | 2025.x+       | v0.1.x      |
| v1.1.x   | 2025.x+       | v0.1.x      |

The card uses standard Lovelace APIs and HA CSS custom properties — it works on any HA theme.

---

## Installation

### Via HACS (recommended)

1. Open HACS in your Home Assistant sidebar.
2. Click the three-dot menu → **Custom repositories**.
3. Add `https://github.com/pickerin/project-aura-card` with category **Lovelace**.
4. Search for "Project Aura Card" and click **Download**.
5. Add the resource: **Settings → Dashboards → Resources** → `+ Add resource`
   - URL: `/hacsfiles/project-aura-card/project-aura-card.js`
   - Type: `JavaScript Module`
6. Hard-refresh your browser (`Cmd+Shift+R` / `Ctrl+Shift+R`).

### Manual install

1. Download `project-aura-card.js` from the [latest release](https://github.com/pickerin/project-aura-card/releases/latest).
2. Copy it to `<config>/www/project-aura-card/project-aura-card.js`.
3. Add the resource: **Settings → Dashboards → Resources** → `+ Add resource`
   - URL: `/local/project-aura-card/project-aura-card.js`
   - Type: `JavaScript Module`
4. Hard-refresh your browser.

---

## Adding the card

### Visual editor

The card registers itself with HA's custom card picker, so it appears in the **Add Card** dialog as "Project Aura Card".

### YAML

**Basic — single sensor, all defaults:**

```yaml
type: custom:project-aura-card
entity_prefix: project_aura
title: Air Quality
```

**Multi-device — two sensors on different topics:**

```yaml
type: horizontal-stack
cards:
  - type: custom:project-aura-card
    entity_prefix: project_aura_office
    title: Office
  - type: custom:project-aura-card
    entity_prefix: project_aura_bedroom
    title: Bedroom
```

**Minimal — hide optional sections:**

```yaml
type: custom:project-aura-card
entity_prefix: project_aura
show_status_banner: false
show_pressure_section: false
```

---

## Configuration options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | — | Must be `custom:project-aura-card` |
| `entity_prefix` | string | `project_aura` | MQTT base topic / entity name prefix. All entities are expected as `sensor.<prefix>_*`. |
| `title` | string | _(none)_ | Optional card title. Omit to hide the header row. |
| `show_status_banner` | boolean | `true` | Show the top-of-card overall status banner. |
| `show_pressure_section` | boolean | `true` | Show the Pressure section (barometric pressure + altitude). |
| `compact` | boolean | `false` | Reserved for a future compact layout. Has no effect in v0.1.x. |

---

## Sections and entities

### Comfort

| Tile | Entity | Unit |
|------|--------|------|
| Temperature | `sensor.<prefix>_temperature` | °C or °F (auto-detected) |
| Humidity | `sensor.<prefix>_humidity` | % |
| Dew Point | `sensor.<prefix>_dew_point` | °C or °F (auto-detected) |
| Abs. Humidity | `sensor.<prefix>_absolute_humidity` | g/m³ |
| Mold Risk | computed client-side | 0–10 |

### Particulates (SPS30)

| Tile | Entity |
|------|--------|
| PM0.5 | `sensor.<prefix>_pm0_5` |
| PM1.0 | `sensor.<prefix>_pm1_0` |
| PM2.5 | `sensor.<prefix>_pm2_5` |
| PM4.0 | `sensor.<prefix>_pm4_0` |
| PM10 | `sensor.<prefix>_pm10` |

### Gases

| Tile | Entity | Notes |
|------|--------|-------|
| CO2 | `sensor.<prefix>_co2` | SCD4x |
| VOC Index | `sensor.<prefix>_voc_index` | SGP41 |
| NOx Index | `sensor.<prefix>_nox_index` | SGP41 |
| CO | `sensor.<prefix>_co` | Hidden if entity absent |
| HCHO | `sensor.<prefix>_hcho` | Hidden if entity absent |

### Pressure

| Tile | Entity |
|------|--------|
| Pressure | `sensor.<prefix>_pressure` |
| Altitude | `sensor.<prefix>_altitude` |

---

## Severity thresholds

Thresholds are copied verbatim from the Project Aura firmware. If the firmware is updated, open a PR updating `src/utils/thresholds.ts`.

### One-sided metrics (higher = worse)

| Metric | Green | Yellow | Orange | Red |
|--------|-------|--------|--------|-----|
| CO2 (ppm) | ≤ 800 | ≤ 1000 | ≤ 1500 | > 1500 |
| CO (ppm) | ≤ 9 | ≤ 35 | ≤ 100 | > 100 |
| PM2.5 (µg/m³) | ≤ 12 | ≤ 35 | ≤ 55 | > 55 |
| PM1.0 (µg/m³) | ≤ 10 | ≤ 25 | ≤ 50 | > 50 |
| PM4.0 (µg/m³) | ≤ 25 | ≤ 50 | ≤ 75 | > 75 |
| PM10 (µg/m³) | ≤ 54 | ≤ 154 | ≤ 254 | > 254 |
| PM0.5 (#/cm³) | ≤ 250 | ≤ 600 | ≤ 1200 | > 1200 |
| HCHO (ppb) | ≤ 30 | ≤ 60 | ≤ 100 | > 100 |
| VOC Index | ≤ 150 | ≤ 250 | ≤ 350 | > 350 |
| NOx Index | ≤ 50 | ≤ 100 | ≤ 200 | > 200 |

Source: `src/config/AppConfig.h` lines 303–333

### Bidirectional metrics (comfort band; both too-low and too-high warn)

| Metric | Red low | Orange low | Yellow low | Green | Yellow high | Orange high | Red high |
|--------|---------|------------|------------|-------|-------------|-------------|----------|
| Temp (°C) | < 16 | < 18 | < 20 | 20–25 | > 25 | > 26 | > 28 |
| Humidity (%) | < 20 | < 30 | < 40 | 40–60 | > 60 | > 65 | > 70 |
| Dew Point (°C) | < 5 | < 8 | < 10 | 10–16 | > 16 | > 18 | > 21 |
| Abs. Humidity (g/m³) | < 4 | < 5 | < 7 | 7–15 | > 15 | > 18 | > 20 |

Source: `src/ui/StatusMessages.cpp` lines 170–290

### Mold Risk Index

Client-side computation mirrors `compute_mold_risk_index()` from `src/core/MathUtils.h` line 36:

```
raw = ((rh - 55) / 4) + ((temp_c - 18) / 7)
mold_risk = clamp(round(raw), 0, 10)
```

| Score | Severity |
|-------|---------|
| 0–3 | Green |
| 4–5 | Yellow |
| 6–7 | Orange |
| 8–10 | Red |

---

## Troubleshooting

**"Project Aura not found" error in card**

The card looks for `sensor.<prefix>_co2` or `sensor.<prefix>_temperature`. If neither exists, it shows an error. Check:
- Your MQTT integration is connected and the device is online.
- The `entity_prefix` in the card config matches your MQTT base topic (default: `project_aura`).
- Developer Tools → States — search for `project_aura` to verify entities exist.

**CO / HCHO tiles not showing**

Those sensors are optional hardware add-ons. The tiles only appear when the corresponding entities exist in HA.

**Values look right but colors seem off**

Temperature and dew-point thresholds are stored in Celsius. The card auto-detects your unit via the entity's `unit_of_measurement` attribute and converts before evaluating. If your sensor reports in Fahrenheit and the attribute is missing or wrong, open an issue.

**Card not appearing in the Add Card dialog**

The card registers with HA's custom card picker on first load. If it doesn't appear:
1. Verify the resource is loaded: **Settings → Dashboards → Resources**.
2. Hard-refresh the browser (`Cmd+Shift+R`).
3. Check the browser console for load errors.

---

## Development

```bash
npm install
npm run build      # one-shot build to dist/
npm run watch      # rebuild on file change
npm run typecheck  # TypeScript type-check only
npm run lint       # ESLint
```

The built `dist/project-aura-card.js` is committed so HACS can serve it without a build step on the user's end.

---

## Credits

- **[21cncstudio/project_aura](https://github.com/21cncstudio/project_aura)** — the original Project Aura firmware, hardware design, and threshold definitions that this card is built to mirror.

---

## License

MIT — see [LICENSE](LICENSE).
