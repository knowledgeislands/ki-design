# @knowledgeislands/tokens

The Knowledge Islands design tokens. `tokens.json` is the source, in [DTCG](https://www.designtokens.org/) format (`$value`, `$type`, `$description`); everything else is generated from it.

## What is in it

| Group | Contents |
| --- | --- |
| `color.core` | The palette: navy, ocean, teal, forest, moss, sandstone, parchment, gold, text gold, rust, mist, ink, ink light, border, border light |
| `color.role.light` / `color.role.night` | Semantic roles: paper, ink, muted, accent, ok, teal, warn, bad, rule, boundary (PDR-002) |
| `color.wash.light` / `color.wash.night` | Tinted backgrounds for ok, warn and bad, mixed into paper |
| `color.terrain` | Flat fills for the 12 terrains. `ocean` is a deprecated alias of `color.tile.water`: the flat chart paints water in `color.sea` |
| `color.tile` | `water`: the water of the isometric tiles only, never the flat chart's sea (GDR-KI-DESIGN-023) |
| `color.fog.light` / `color.fog.night` | The fog hatch, a map state over any terrain |
| `color.sea.light` / `color.sea.night` | Map water: deep, sea, shallow, current and lane |
| `font` | Site families (Cormorant Garamond, Cormorant SC, Inter), app system stacks and a mono stack. These stacks are authoritative; prose quotes them, never the other way round |
| `space`, `radius` | 2–96 px spacing scale (96 is the hero rhythm); radii sm 4, md 8, lg 16 and round 999 |
| `motion` | 12 fps clock, 48-frame master cycle, allowed loops 4, 6, 8, 12, 16, 24, 48; the UI easing `cubic-bezier(0.4, 0, 0.2, 1)` and durations state 160 ms, panel 240 ms, map 400 ms |

Aliases use the DTCG form `{group.token}` and are resolved when the tokens load (`resolveValue`); a deprecated token carries `$deprecated` and points at its replacement.

Washes follow one rule: the ok and bad roles, and decorative gold for warn, mixed into paper at 12 %, 8 % and 12 % (`washSource`, `washAmount`). Night washes use the same rule with night values.

## Build

`bun run build` writes `dist/`:

- `tokens.css`: bare role variables (`--paper`, `--ink`, `--wash-ok`, `--fog`, …) on `:root` for light; night under `@media (prefers-color-scheme: dark)` (unless the page sets `data-theme="light"`) and under `[data-theme="night"]`. Also the Tailwind v4 namespaced variables (`--color-*`, `--font-*`, `--radius-*`), `--space-*` and `--motion-*` (including `--motion-easing` and `--motion-duration-state`, `-panel`, `-map`). `--color-terrain-ocean` is `var(--color-tile-water)`, kept for consumers that still use it.
- `theme.css`: imports `tokens.css` and declares the Tailwind v4 `@theme` (literal values) and `@theme inline` (theme-aware role aliases such as `--color-paper: var(--paper)`).
- `tokens.ts`: the resolved values as a typed `as const` export.
- `digest.txt`: SHA-256 of the CSS declarations in canonical form (`at-rule|selector|property:value` per line), so comments and whitespace never change it. The Observatory pins this when it vendors the stylesheet.

## API

```ts
import { contrastRatio, mix, tokens, washSource } from '@knowledgeislands/tokens'

tokens.roles.night.paper // '#0f2440'
mix('#f5efe0', '#2d5a3d', 0.12) // '#ddddcc', the light ok wash
contrastRatio(tokens.roles.light.warn, tokens.roles.light.paper) // 5.15
```

- `tokens`: every value, resolved and typed; `tokenDocument` is the raw DTCG tree.
- Name lists and unions: `coreNames`, `roleNames`, `textRoles`, `themes`, `washNames`, `terrainNames`, `seaNames`, `fontNames`, `spaceSteps`, `radiusNames`, `loopLengths`, `durationNames`.
- `resolveValue(value)`: follows a DTCG alias to its value.
- Colour: `parseHex`, `toHex`, `mix(a, b, t)` (sRGB, as CSS `color-mix(in srgb, …)`).
- `nightTerrain(fills?)`: the night chart's terrain fills, each day fill mixed 45 % into navy (`nightTerrainAmount`).
- Contrast: `relativeLuminance`, `contrastRatio`, `meetsContrast`, `contrastFloor` (text 4.5, boundary 3).
- CSS: `cssBlocks`, `renderCss`, `renderTailwindTheme`, `renderTokensModule`, `cssDigest`.

## Releases

- **0.2.0** (2026-10-19, GDR-KI-DESIGN-023): adds `color.fog`, `color.tile.water`, `space.96`, `radius.round`, `motion.easing.standard` and `motion.duration`; `color.terrain.ocean` becomes a deprecated alias of `color.tile.water`. Additive, so minor; the digest changes.
- **0.1.0** (2026-10-18): the first token set.

## Contrast floors

The tests hold every text role at 4.5:1 on paper, the boundary at 3:1, and each role's text (and ink) at 4.5:1 on its own wash, in both themes. Current values:

| Theme | ink | muted | accent | ok | teal | warn | bad | boundary | ok wash | warn wash | bad wash |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| light | 14.16 | 6.56 | 10.13 | 6.93 | 4.97 | 5.15 | 6.61 | 3.18 | 5.79 | 4.85 | 5.47 |
| night | 13.59 | 7.43 | 7.85 | 7.85 | 7.71 | 5.85 | 6.85 | 3.43 | 6.20 | 5.24 | 5.66 |

The tightest margins are light teal (4.97), light warn on its wash (4.85) and the light boundary (3.18). `rule` is a decorative hairline and is deliberately not held to a floor.
