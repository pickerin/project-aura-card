# Graphs Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Graphs" section at the bottom of the Project Aura Card displaying 24-hour history line charts for Temperature, Humidity, and CO2 Concentration, each as its own widget, using HA's native `hui-history-graph-card` element.

**Architecture:** A new `graphs-section.ts` exports a pure template function that renders the section header and three empty container divs. The main card class manages the `hui-history-graph-card` element lifecycle imperatively in `updated()` — creating each card once, appending it to its container, and updating `.hass` on every pass. No state decorator needed since DOM is managed directly.

**Tech Stack:** TypeScript, LitElement, Rollup, HA `hui-history-graph-card` internal element

---

### Task 1: Add `show_graphs` to CardConfig

**Files:**
- Modify: `src/utils/ha-types.ts`

- [ ] **Step 1: Add the field**

In `src/utils/ha-types.ts`, add `show_graphs?: boolean;` to the `CardConfig` interface after `compact`:

```typescript
export interface CardConfig {
  type: string;
  entity_prefix?: string;
  title?: string;
  show_status_banner?: boolean;
  show_pressure_section?: boolean;
  show_graphs?: boolean;
  compact?: boolean;
}
```

- [ ] **Step 2: Verify typecheck passes**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/utils/ha-types.ts
git commit -m "Add show_graphs option to CardConfig"
```

---

### Task 2: Create graphs-section.ts

**Files:**
- Create: `src/sections/graphs-section.ts`

- [ ] **Step 1: Create the file**

```typescript
import { html, TemplateResult } from 'lit';

/**
 * Graphs section: 24-hour history charts for Temperature, Humidity, and CO2.
 *
 * This function renders only the section header and empty container divs.
 * The actual hui-history-graph-card elements are created and managed by the
 * main card class in updated() so they have access to the hass lifecycle.
 */
export function renderGraphsSection(): TemplateResult {
  return html`
    <div class="section-header">
      <ha-icon icon="mdi:chart-line"></ha-icon>
      <span>Graphs</span>
    </div>
    <div id="graph-temperature" class="graph-container"></div>
    <div id="graph-humidity" class="graph-container"></div>
    <div id="graph-co2" class="graph-container"></div>
  `;
}
```

- [ ] **Step 2: Verify typecheck passes**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/sections/graphs-section.ts
git commit -m "Add graphs section template with history graph containers"
```

---

### Task 3: Wire graphs section into the main card

**Files:**
- Modify: `src/project-aura-card.ts`

- [ ] **Step 1: Add the import**

At the top of `src/project-aura-card.ts`, add after the `renderPressureSection` import line:

```typescript
import { renderGraphsSection } from './sections/graphs-section';
```

- [ ] **Step 2: Add the `_graphCards` field**

Inside the `ProjectAuraCard` class, after the `@state() private _config!: CardConfig;` line, add:

```typescript
private _graphCards: Map<string, HTMLElement> = new Map();
```

- [ ] **Step 3: Add `updated()` lifecycle method**

Add this method to the class after `shouldUpdate()`:

```typescript
protected updated(changedProps: PropertyValues): void {
  super.updated(changedProps);
  if (!this._config || !this.hass) return;
  if (this._config.show_graphs === false) return;

  const prefix = this._config.entity_prefix ?? DEFAULT_PREFIX;
  const graphs = [
    { key: 'temperature', entity: `sensor.${prefix}_temperature`, title: 'Temperature' },
    { key: 'humidity', entity: `sensor.${prefix}_humidity`, title: 'Humidity' },
    { key: 'co2', entity: `sensor.${prefix}_co2`, title: 'CO2 Concentration' },
  ];

  for (const { key, entity, title } of graphs) {
    const container = this.shadowRoot?.querySelector(`#graph-${key}`);
    if (!container) continue;

    let card = this._graphCards.get(key);
    if (!card) {
      card = document.createElement('hui-history-graph-card') as HTMLElement;
      (card as any).setConfig({
        entities: [{ entity }],
        hours_to_show: 24,
        title,
      });
      container.appendChild(card);
      this._graphCards.set(key, card);
    }
    (card as any).hass = this.hass;
  }
}
```

- [ ] **Step 4: Add graphs section to `render()`**

In the `render()` method, after the pressure section block:

```typescript
${this._config.show_pressure_section !== false
  ? html`<div class="section">${renderPressureSection(this.hass, prefix)}</div>`
  : nothing}
${this._config.show_graphs !== false
  ? html`<div class="section">${renderGraphsSection()}</div>`
  : nothing}
```

- [ ] **Step 5: Update `setConfig()` defaults**

In `setConfig()`, add `show_graphs: true` to the spread defaults:

```typescript
this._config = {
  entity_prefix: DEFAULT_PREFIX,
  show_status_banner: true,
  show_pressure_section: true,
  show_graphs: true,
  compact: false,
  ...config,
};
```

- [ ] **Step 6: Update `getStubConfig()`**

```typescript
public static getStubConfig(): CardConfig {
  return {
    type: 'custom:project-aura-card',
    entity_prefix: DEFAULT_PREFIX,
    title: 'Air Quality',
    show_status_banner: true,
    show_pressure_section: true,
    show_graphs: true,
    compact: false,
  };
}
```

- [ ] **Step 7: Update `getCardSize()`**

Add graphs size after the pressure block:

```typescript
public getCardSize(): number {
  let size = 1;
  if (this._config?.show_status_banner) size += 1;
  size += 2;
  size += 2;
  size += 2;
  if (this._config?.show_pressure_section) size += 2;
  if (this._config?.show_graphs !== false) size += 6;
  return size;
}
```

- [ ] **Step 8: Add `.graph-container` CSS**

In the `static styles = css\`...\`` block, add before the closing backtick:

```css
.graph-container {
  width: 100%;
}
```

- [ ] **Step 9: Verify typecheck passes**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 10: Commit**

```bash
git add src/project-aura-card.ts
git commit -m "Wire graphs section into card with hui-history-graph-card lifecycle"
```

---

### Task 4: Build and verify

**Files:** none new

- [ ] **Step 1: Run full build**

```bash
npm run build
```

Expected: `dist/project-aura-card.js` emitted with no errors. Size will be roughly the same as before (~29 KB) since `hui-history-graph-card` is provided by HA at runtime.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors or warnings.

- [ ] **Step 3: Commit dist**

```bash
git add dist/project-aura-card.js
git commit -m "Build: add graphs section (24h history charts for temperature, humidity, CO2)"
```

---

### Task 5: Update README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add `show_graphs` to the configuration table**

In the Configuration options table, add after the `show_pressure_section` row:

```markdown
| `show_graphs` | boolean | `true` | Show the Graphs section with 24-hour history charts for Temperature, Humidity, and CO2. |
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "Docs: document show_graphs config option"
```

---

### Task 6: Tag and release

- [ ] **Step 1: Bump version in package.json**

Change `"version": "0.1.0"` to `"version": "0.2.0"` in `package.json`.

- [ ] **Step 2: Update CARD_VERSION constant**

In `src/project-aura-card.ts`, change:

```typescript
const CARD_VERSION = '0.1.0';
```

to:

```typescript
const CARD_VERSION = '0.2.0';
```

- [ ] **Step 3: Rebuild**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit version bump**

```bash
git add package.json src/project-aura-card.ts dist/project-aura-card.js
git commit -m "Bump version to 0.2.0"
```

- [ ] **Step 5: Tag and release**

```bash
git tag v0.2.0
git push origin main
git push origin v0.2.0
gh release create v0.2.0 dist/project-aura-card.js \
  --title "v0.2.0" \
  --notes "Add Graphs section with 24-hour history charts for Temperature, Humidity, and CO2 Concentration"
```

Expected: release URL printed to stdout.
