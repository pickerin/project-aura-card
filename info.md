# Project Aura Card

A Home Assistant Lovelace card that mirrors the display of the **Project Aura** DIY air quality sensor — built by [21cncstudio](https://github.com/21cncstudio/project_aura).

## What it shows

The card is divided into four logical sections, matching what you'd see on the physical device:

- **Comfort** — Temperature, Relative Humidity, Dew Point, Absolute Humidity, and a computed Mold Risk Index (using the firmware's own `compute_mold_risk_index()` formula)
- **Particulates** — PM0.5, PM1.0, PM2.5, PM4.0, PM10 particle counts and mass concentrations from the Sensirion SPS30
- **Gases** — CO2 (SCD4x), VOC Index, NOx Index (SGP41), and optionally CO and Formaldehyde (HCHO) when those sensors are installed
- **Pressure** — Absolute pressure and altitude from the barometric sensor

## Severity colors

Every tile is color-coded using thresholds copied directly from the firmware source (`src/config/AppConfig.h` and `src/ui/StatusMessages.cpp`):

| Color | Meaning |
|-------|---------|
| Green | Good — within comfort band |
| Yellow | Elevated — attention suggested |
| Orange | Poor — take action |
| Red | Hazardous / out of range |

Climate metrics (temperature, humidity, dew point) use bidirectional thresholds — both too-low and too-high trigger warnings, matching the firmware's own status messages.

## Requirements

- Home Assistant 2025.x or later
- Project Aura sensor integrated via MQTT (entities follow the `sensor.project_aura_*` naming pattern)
- Project Aura firmware v1.0.x or v1.1.x

## Quick config

```yaml
type: custom:project-aura-card
entity_prefix: project_aura
title: Air Quality
```

If you have multiple sensors, set `entity_prefix` to match each device's MQTT base topic.
