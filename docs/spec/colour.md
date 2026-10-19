---
title: Colour
status: draft
updated: 2026-10-19
---

# Colour

One palette, two papers: light is the printed chart and night is the same chart by lantern-light. The values live in [`packages/tokens/tokens.json`](../../packages/tokens/tokens.json) (DTCG) and the token build turns them into CSS custom properties, a typed module and a digest; the measured contrast ratios are in the [tokens README](../../packages/tokens/README.md#contrast-floors), held by its tests. This file holds what the values cannot say: what each colour is for, how roles, washes, edges, sea and terrain are used, the per-island palettes, and the usage rules.

## Where the values live

| Group | In `tokens.json` | Emitted as |
| --- | --- | --- |
| Core palette (15 colours) | `color.core` | `--color-<name>` (Tailwind v4 `@theme`) |
| Semantic roles, light and night | `color.role.light`, `color.role.night` | Bare roles: `--paper`, `--ink`, `--muted`, `--accent`, `--ok`, `--teal`, `--warn`, `--bad`, `--rule`, `--boundary` |
| Washes | `color.wash.light`, `color.wash.night` | `--wash-ok`, `--wash-warn`, `--wash-bad` |
| Terrain fills (12) | `color.terrain` | `--color-terrain-<name>` |
| Sea fills, light and night | `color.sea.light`, `color.sea.night` | The typed module (`tokens.sea`), used by the hex map renderer |

Night roles are emitted under `@media (prefers-color-scheme: dark)` (unless the page sets `data-theme="light"`) and under `[data-theme="night"]`.

## The core palette: what each colour is for

The site's palette is kept verbatim and the local app's derived values are promoted to core.

- **Sea and sky.** Navy is night paper, deep sea and hero ground. Ocean is the light accent, links and open sea. Teal is shallows, currents and a secondary accent. Mist is a cool alternate surface.
- **Land.** Forest is the light ok role and forests. Moss is secondary land and growth. Sandstone is limestone, sand and warm rules on the hero.
- **Paper and ink.** Parchment is light paper and night ink. Ink is light text, never pure black. Ink light is muted text in light. Border is the light rule. Border light is faint internal division, site only.
- **Brass.** Gold is brass fills, calls to action, lanterns and gold on navy. Text gold is **brass text on parchment**.
- **Hazard.** Rust is blocking and reefs.

## Semantic roles

Each role maps to a core colour in light (ink, muted, accent = ocean, ok = forest, teal, warn = text gold, bad = rust) and has its own night value. Every foreground role holds 4.5:1 on its paper in both themes. The values match PDR-KI-OBSERVA-002, which calls night "dark".

- **Night is the reference rendering** ([GDR-KI-DESIGN-010](../decisions/GDR-KI-DESIGN-010-night-as-reference.md)). Mock up and judge night first, then check light.
- The app shell follows the OS theme (`prefers-color-scheme`). The site follows it too, with a small manual toggle that sets `data-theme` ([GDR-KI-DESIGN-025](../decisions/GDR-KI-DESIGN-025-night-on-the-site.md)).
- Night muted is a cool neutral on purpose. Sandstone shares gold's hue, so metadata in sandstone would read as warning. Gold means attention, alone.

## Washes

A wash is a role mixed into the paper. Status chips and the Beacon's severity column are drawn on it, and each wash keeps its own role's text at 4.5:1 or better.

- The mix is the source of truth: ok and bad at 12 %, decorative gold for warn at 8 %, into the theme's paper (`washSource`, `washAmount` in the token package). Night uses the same rule with night values.
- The hex values in `tokens.json` are computed from the mixes, and a test checks them.

## Rule and boundary

Two edges, two jobs.

- The **rule** separates rows and panes and recedes. It has no contrast floor; its ratio is recorded so a change is deliberate. Use it for table rows, pane edges and hairline frames.
- The **boundary** is a control's edge, where a reader can act. It holds 3:1 (WCAG 1.4.11). Use it for inputs, selects, buttons, pickers and focusable hexes.

Never draw a control's edge in the rule colour.

## Sea fills (maps)

`color.sea` holds five fills per theme: `deep` for open ocean far from land, `sea` for default water, `shallow` for water within one hex of land, `current` for current lines and `lane` for trade-route lanes. Night `sea` is the night paper.

**On the flat chart, ocean hexes take the theme's `sea`.** The renderer paints them so unless a caller supplies its own ocean colour. `color.tile.water` (a deeper blue) is the water of the isometric tiles only; it is never the flat chart's sea. `color.terrain.ocean` is its deprecated alias ([GDR-KI-DESIGN-023](../decisions/GDR-KI-DESIGN-023-token-additions.md)).

## Terrain fills (flat)

`color.terrain` holds twelve fills for the flat renderer, one per terrain id. Isometric art is painted to match. The values are _proposed_, chosen to sit inside the palette and to keep a pattern or label legible.

- **Every terrain also carries a pattern**, so colour is never the only carrier. The patterns are drawn in [`packages/hexmap/src/patterns.ts`](../../packages/hexmap/src/patterns.ts), each in ink or parchment (whichever reads better on the fill), with gold embers on volcanic.
- **Night fills are derived, not stored.** Each night fill is its day fill mixed 45 % into navy by `nightTerrain()` in the token package (`nightTerrainAmount`). Night ocean is the night `sea`, not a mix.
- **Map labels never sit bare on a fill.** Forest and mountain fall just under 4.5:1 for text set directly on them, so map labels always carry a paper halo ([maps.md](maps.md#layers)).
- Ruins and ancient forest are **structures** standing on grassland or forest. There is no ruins or uncharted terrain fill.

### Fog

**Fog is a map state, not a terrain.** It is a diagonal hatch laid over whatever lies beneath, marking uncharted or unobserved hexes. Its colour is the token `color.fog`: `#cfd3d6` in light (ink on it 10.78:1) and `#657384` at night, as `--fog` ([GDR-KI-DESIGN-023](../decisions/GDR-KI-DESIGN-023-token-additions.md)).

## Per-island palettes

The canon's four palettes become per-island options within any tile set. Each has five colours, in the order **sea · land · accent land · stone/built · brass**. The values are _proposed_ and are not yet tokens.

| Palette | Sea | Land | Accent land | Stone / built | Brass | Character |
| --- | --- | --- | --- | --- | --- | --- |
| **Archipelago** (default) | `#1b3a5c` | `#4a7a5a` | `#2d5a3d` | `#e3d3a8` | `#c8963c` | Deep blue sea, green islands, pale sand; the brand at rest |
| **Savanna** | `#3f6f7a` | `#b8a061` | `#6b7a3e` | `#a65a3a` | `#c79a4b` | Dry grass, acacia green, terracotta roofs, ochre light |
| **Natural Colours** | `#6f9fb0` | `#a3b26f` | `#4a7a5a` | `#8c8a80` | `#6b4f3a` | Meadow, moss, grey stone, bark brown; no gilt: the "brass" slot is timber |
| **Glass and Stone** | `#4f8f86` | `#9cc5bf` | `#4f5b66` | `#e8e1d0` | `#b0843a` | Limestone, slate, sea-glass, verdigris; the classical observatory look |

A palette recolours terrain and buildings in the art. It never changes semantic roles (`--ok`, `--warn`, `--bad`), which stay identical on every island so signals mean the same thing everywhere.

## Usage rules

1. **Brass text on parchment is text gold** (`#8a5a12`). Gold (`#c8963c`) on parchment is 2.32:1 and fails. Use gold only for fills, rules, lanterns and text on navy (5.85:1). Ink on a gold button is 6.1:1; navy on gold is 5.85:1.
2. **Never pure black (`#000`) or pure white (`#fff`).** Ink is `#1a2030`; light is parchment `#f5efe0`.
3. **Colour is never the only carrier of meaning.** Every status has a word; every terrain has a pattern; every signal has a shape (lantern, reef, fog).
4. One brass call to action per view. Gold elsewhere means attention.
5. No neon, no saturated RGB, no gradients beyond soft atmospheric ones in illustration. UI surfaces are flat.
6. Night is the same chart by lantern-light, not a separate "gamer" theme: same hues, adjusted lightness.
7. Every colour role keeps its contrast floor in light and night ([accessibility.md](accessibility.md)). A change that drops a pair below its floor fails review.
