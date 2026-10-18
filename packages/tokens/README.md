# @knowledgeislands/tokens

The Knowledge Islands design tokens. `tokens.json` is the source, in [DTCG](https://www.designtokens.org/) format (`$value`, `$type`, `$description`); everything else is generated from it.

## What is in it

| Group | Contents |
| --- | --- |
| `color.core` | The palette: navy, ocean, teal, forest, moss, sandstone, parchment, gold, text gold, rust, mist, ink, ink light, border, border light |
| `color.role.light` / `color.role.night` | Semantic roles: paper, ink, muted, accent, ok, teal, warn, bad, rule, boundary (PDR-002) |
| `color.wash.light` / `color.wash.night` | Tinted backgrounds for ok, warn and bad, mixed into paper |
| `color.terrain` | Fills for the 12 terrains |
| `color.sea.light` / `color.sea.night` | Map water: deep, sea, shallow, current and lane |
| `font` | Site families (Cormorant Garamond, Cormorant SC, Inter), app system stacks and a mono stack |
| `space`, `radius` | 2–64 px spacing scale; radii sm 4, md 8, lg 16 |
| `motion` | 12 fps clock, 48-frame master cycle, allowed loops 4, 6, 8, 12, 16, 24, 48 |

Washes follow one rule: the ok and bad roles, and decorative gold for warn, mixed into paper at 12 %, 8 % and 12 % (`washSource`, `washAmount`). Night washes use the same rule with night values.

## Build

`bun run build` writes `dist/`:

- `tokens.css`: bare role variables (`--paper`, `--ink`, `--wash-ok`, …) on `:root` for light; night under `@media (prefers-color-scheme: dark)` (unless the page sets `data-theme="light"`) and under `[data-theme="night"]`. Also the Tailwind v4 namespaced variables (`--color-*`, `--font-*`, `--radius-*`), `--space-*` and `--motion-*`.
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
- Name lists and unions: `coreNames`, `roleNames`, `textRoles`, `themes`, `washNames`, `terrainNames`, `seaNames`, `fontNames`, `spaceSteps`, `radiusNames`, `loopLengths`.
- Colour: `parseHex`, `toHex`, `mix(a, b, t)` (sRGB, as CSS `color-mix(in srgb, …)`).
- `nightTerrain(fills?)`: the night chart's terrain fills, each day fill mixed 45 % into navy (`nightTerrainAmount`).
- Contrast: `relativeLuminance`, `contrastRatio`, `meetsContrast`, `contrastFloor` (text 4.5, boundary 3).
- CSS: `cssBlocks`, `renderCss`, `renderTailwindTheme`, `renderTokensModule`, `cssDigest`.

## Contrast floors

The tests hold every text role at 4.5:1 on paper, the boundary at 3:1, and each role's text (and ink) at 4.5:1 on its own wash, in both themes. Current values:

| Theme | ink | muted | accent | ok | teal | warn | bad | boundary | ok wash | warn wash | bad wash |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| light | 14.16 | 6.56 | 10.13 | 6.93 | 4.97 | 5.15 | 6.61 | 3.18 | 5.79 | 4.85 | 5.47 |
| night | 13.59 | 7.43 | 7.85 | 7.85 | 7.71 | 5.85 | 6.85 | 3.43 | 6.20 | 5.24 | 5.66 |

The tightest margins are light teal (4.97), light warn on its wash (4.85) and the light boundary (3.18). `rule` is a decorative hairline and is deliberately not held to a floor.
