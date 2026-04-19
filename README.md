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
| v1.0.x   | 2025.x+       | v0.3.x      |
| v1.1.x   | 2025.x+       | v0.3.x      |

The card uses standard Lovelace APIs and HA CSS custom properties — it works on any HA theme.

---

## Installation

### Via HACS (recommended)

1. Open HACS in your Home Assistant sidebar.
2. Click the three-dot menu → **Custom repositories**.
3. Add `https://github.com/pickerin/project-aura-card` with category **Dashboard**.
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

### Full-width layout (Sections view)

In a Sections dashboard view (HA 2024.1+), add `layout_options` to span the full row:

```yaml
type: custom:project-aura-card
entity_prefix: project_aura
layout_options:
  grid_columns: full
```

### YAML

**Basic — single sensor, all defaults:**

```yaml
type: custom:project-aura-card
entity_prefix: project_aura
title: Air Quality
```

**With device dashboard link:**

```yaml
type: custom:project-aura-card
entity_prefix: project_aura
title: Air Quality
device_ip: 192.168.1.42
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
show_air_quality: false
show_pressure_section: false
show_graphs: false
show_fan: false
show_controls: false
```

---

## Configuration options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | — | Must be `custom:project-aura-card` |
| `entity_prefix` | string | `project_aura` | MQTT base topic / entity name prefix. All entities are expected as `sensor.<prefix>_*`. |
| `title` | string | _(none)_ | Optional card title. Omit to hide the header row. |
| `show_status_banner` | boolean | `true` | Show the top-of-card overall status banner. |
| `show_air_quality` | boolean | `true` | Show the Air Quality section (AQI score, Air Status, Main Issue). |
| `show_pressure_section` | boolean | `true` | Show the Pressure section (MSL pressure, absolute pressure, 3h/24h trends). |
| `show_graphs` | boolean | `true` | Show the Graphs section with 24-hour history charts for Temperature, Humidity, and CO2. |
| `show_fan` | boolean | `true` | Show the Ventilation section. Automatically hidden if no fan hardware is detected. |
| `show_controls` | boolean | `true` | Show the Controls section (Night Mode, Backlight, Alert Blink, Restart, and optionally Dashboard). |
| `device_ip` | string | _(none)_ | IP address of the Project Aura device (e.g. `192.168.1.42`). When set, a **Dashboard** button appears in the Controls section that opens `http://<device_ip>/dashboard` in a new tab. The firmware does not publish its IP over MQTT, so this must be set manually. Recommended: assign a static DHCP reservation so the IP never changes. |
| `compact` | boolean | `false` | Reserved for a future compact layout. Has no effect currently. |

---

## Sections and entities

Sections appear in this order (top to bottom):

1. Status Banner
2. Air Quality
3. Comfort
4. Particulates
5. Gases
6. Pressure
7. Graphs
8. Ventilation *(only if fan hardware detected)*
9. Controls

### Air Quality

Firmware-calculated aggregate metrics. Section is hidden if none of these entities exist.

| Tile | Entity | Notes |
|------|--------|-------|
| AQI | `sensor.<prefix>_aqi` | 0–100 aggregate score |
| Status | `sensor.<prefix>_air_status` | Excellent / Good / Fair / Poor |
| Main Issue | `sensor.<prefix>_main_issue` | Dominant pollutant or "Clear" |

### Comfort

| Tile | Entity | Unit |
|------|--------|------|
| Temp | `sensor.<prefix>_temperature` | °C or °F (auto-detected) |
| RH | `sensor.<prefix>_humidity` | % |
| AH | `sensor.<prefix>_absolute_humidity` | g/m³ |
| DP | `sensor.<prefix>_dew_point` | °C or °F (auto-detected) |
| MR | computed client-side | 0–10 Mold Risk index |

### Particulates (SEN66)

| Tile | Entity | Unit |
|------|--------|------|
| PM0.5 | `sensor.<prefix>_pm0_5` | #/cm³ |
| PM1.0 | `sensor.<prefix>_pm1_0` | µg/m³ |
| PM2.5 | `sensor.<prefix>_pm2_5` | µg/m³ |
| PM4.0 | `sensor.<prefix>_pm4_0` | µg/m³ |
| PM10 | `sensor.<prefix>_pm10` | µg/m³ |

### Gases

| Tile | Entity | Notes |
|------|--------|-------|
| CO2 | `sensor.<prefix>_co2` | SEN66 |
| VOC Index | `sensor.<prefix>_voc_index` | SEN66; hidden during warmup |
| NOx Index | `sensor.<prefix>_nox_index` | SEN66; hidden during warmup |
| CO | `sensor.<prefix>_co` | Optional hardware; hidden if entity absent |
| HCHO | `sensor.<prefix>_hcho` | Hidden if entity absent |

### Pressure

| Tile | Entity | Notes |
|------|--------|-------|
| MSL Pressure | `sensor.<prefix>_pressure` | Altitude-corrected if configured |
| Abs Pressure | `sensor.<prefix>_pressure_absolute` | Raw uncorrected pressure |
| 3h Trend | `sensor.<prefix>_pressure_delta_3h` | |
| 24h Trend | `sensor.<prefix>_pressure_delta_24h` | |

### Graphs

24-hour history charts embedded using HA's native history-graph card. Theme-adaptive.

| Graph | Entity |
|-------|--------|
| Temperature | `sensor.<prefix>_temperature` |
| Humidity | `sensor.<prefix>_humidity` |
| CO2 Concentration | `sensor.<prefix>_co2` |

### Ventilation

Only shown when `sensor.<prefix>_fan_status` exists and is not unavailable (i.e. fan hardware is detected).

**Status tiles:**

| Tile | Entity | Notes |
|------|--------|-------|
| Status | `sensor.<prefix>_fan_status` | RUNNING / STOPPED / FAULT / OFFLINE |
| Output | `sensor.<prefix>_fan_output_percent` | % |
| Speed | `number.<prefix>_fan_manual_percent` | Current manual speed % |
| Timer | `sensor.<prefix>_fan_timer_remaining` | Countdown text |
| Fault | `binary_sensor.<prefix>_fan_fault` | Yes / No |

**Mode controls:**

| Control | Entity |
|---------|--------|
| Auto | `switch.<prefix>_fan_auto` |
| Manual | `switch.<prefix>_fan_manual` |
| Stop | `switch.<prefix>_fan_stop` |

### Controls

| Control | Entity | Notes |
|---------|--------|-------|
| Night Mode | `switch.<prefix>_night_mode` | Unavailable when auto-night is enabled |
| Backlight | `switch.<prefix>_backlight` | |
| Alert Blink | `switch.<prefix>_alert_blink` | |
| Restart | `button.<prefix>_restart` | |
| Dashboard | *(opens browser tab)* | Only shown when `device_ip` is set |

---

## Severity thresholds

Thresholds are copied verbatim from the Project Aura firmware. If the firmware is updated, open a PR updating `src/utils/thresholds.ts`.

### AQI (aggregate score)

| Green | Yellow | Orange | Red |
|-------|--------|--------|-----|
| 0–25 | 26–50 | 51–75 | 76–100 |

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

**Ventilation section not showing**

The section is hidden when no fan hardware is detected. If a fan is installed, check that `sensor.<prefix>_fan_status` exists in Developer Tools → States.

**VOC / NOx tiles showing `--`**

The SEN66 gas sensors require a short warmup period on startup. The card shows `--` until the warmup flag clears (typically within 10 seconds of the device coming online).

**Dashboard button not appearing in Controls**

The Dashboard button only appears when `device_ip` is set in the card config. Add `device_ip: <your-device-ip>` to your card YAML.

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
