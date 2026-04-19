# Resume Notes for Claude Code

This scaffolding was started in a Claude web session. Unzip this into your target
working directory, then hand Claude Code the prompt in the conversation that
generated this archive.

## Project identity

- Repo: `pickerin/project-aura-card`
- License: MIT
- Distribution: HACS frontend plugin
- Author: Robert A. Pickering Jr.
- Purpose: Custom Lovelace card mirroring the physical Project Aura DIY air
  quality sensor display, using firmware-aligned severity thresholds.

## Status

14 of ~20 files scaffolded. TypeScript source is complete and internally
consistent. Build tooling is wired but not yet run.

### Files present

```
package.json
rollup.config.js
tsconfig.json
src/project-aura-card.ts
src/sections/comfort-section.ts
src/sections/gases-section.ts
src/sections/particulates-section.ts
src/sections/pressure-section.ts
src/sections/status-banner.ts
src/utils/colors.ts
src/utils/entity-resolver.ts
src/utils/ha-types.ts
src/utils/thresholds.ts
src/utils/tile-template.ts
```

### Files still to create

1. `hacs.json` - HACS frontend plugin metadata. Fields:
   - name: "Project Aura Card"
   - filename: "project-aura-card.js"
   - render_readme: true
   - content_in_root: false

2. `LICENSE` - MIT license text, copyright 2026 Robert A. Pickering Jr.

3. `.gitignore` - node_modules/, npm logs, editor junk, OS junk. Keep `dist/`
   tracked because HACS serves the built bundle from there.

4. `README.md` - comprehensive install and usage guide. Must include:
   - Screenshot placeholder
   - Compatibility matrix (firmware v1.0.x, v1.1.x; HA 2025.x+)
   - HACS install steps (custom repo, install, add resource, add card)
   - Manual install steps
   - Config options table with defaults
   - Example YAML configs (basic, multi-device, minimal)
   - Threshold reference table citing firmware source files and line numbers
   - Troubleshooting section
   - Credits to 21cncstudio upstream

5. `info.md` - ~300-word HACS info panel content.

6. `.github/workflows/release.yml` - GitHub Actions workflow that on tag push
   (v*) runs `npm ci`, `npm run build`, and attaches `dist/project-aura-card.js`
   to the release. Use `actions/checkout@v4`, `actions/setup-node@v4` with
   Node 20, `softprops/action-gh-release@v2`.

7. `.eslintrc.json` - TypeScript parser, recommended rules, sensible overrides
   (no-explicit-any warn not error).

## Next commands Claude Code should run

```bash
npm install
npm run typecheck
npm run build
# Then verify dist/project-aura-card.js exists and is under ~50KB
```

Commit with: `Initial release v0.1.0 - MVP card with all four sections,
firmware-aligned thresholds, client-computed mold risk`

Do NOT push - leave that to Rob.

## Key architectural decisions already locked in

- TypeScript + LitElement + Rollup (no custom-card-helpers dependency)
- Thresholds centralized in `src/utils/thresholds.ts` with source file +
  line number references to upstream firmware
- Mold Risk computed client-side using firmware formula from
  `src/core/MathUtils.h` line 36
- Unit-aware: detects F/C and inHg/hPa via entity unit_of_measurement attribute
- Graceful degradation: HCHO and CO tiles hide when sensors not installed
- Theme-respecting: uses HA CSS variables, no hardcoded colors
- Sections grouped logically: Comfort / Particulates / Gases / Pressure
- Bidirectional thresholds for climate metrics (both too-low and too-high warn)
- Four-tier severity system (green/yellow/orange/red), red implicit for one-sided

## Upstream firmware reference

https://github.com/21cncstudio/project_aura

Threshold sources:
- `src/config/AppConfig.h` lines 303-333 (one-sided AQ metrics)
- `src/ui/StatusMessages.cpp` lines 170-290 (bidirectional climate metrics)
- `src/core/MathUtils.h` line 36 (compute_mold_risk_index formula)

## Rob's preferences to respect

- Address as "Rob" in any conversational output
- Ruthless mentor feedback style; no sugar-coating
- Build for longevity over convenience
- Cite sources and document assumptions
- HA 2026.1.1 is current running version
- Engineer-and-storyteller tone in docs: explain how AND why
