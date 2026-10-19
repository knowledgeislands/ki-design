---
id: GDR-KI-DESIGN-023
title: 'Token additions and the isometric water token (tokens 0.2.0)'
date: 2026-10-19
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-023: Token additions and the isometric water token (tokens 0.2.0)

## Context

The old DESIGN.md used values that were not tokens: a 96 px hero step, a round radius, the fog colour, and the UI easing and durations. `color.terrain.ocean` (`#2f5878`) is the water of the Modern isometric tiles, but its name suggested the flat chart's ocean, which is painted in the theme's `sea`; ink on `#2f5878` is only 2.16:1. The app's font stacks in `tokens.json` also differed slightly from the stacks the old DESIGN.md quoted. On 19 October 2026 Kit accepted the recommendations.

## Decision

**`@knowledgeislands/tokens` 0.2.0, a minor release, adds the missing tokens and names the isometric water for what it is.**

| Token | Value |
| --- | --- |
| `color.fog.light` / `color.fog.night` | `#cfd3d6` / `#657384`, the fog hatch (CSS `--fog`, `--color-fog`) |
| `color.tile.water` | `#2f5878`, the isometric tiles' water only (CSS `--color-tile-water`) |
| `space.96` | 96 px, the hero rhythm |
| `radius.round` | 999 px, roundels and step markers |
| `motion.easing.standard` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `motion.duration.state` / `.panel` / `.map` | 160 ms / 240 ms / 400 ms |

- `color.terrain.ocean` stays as a deprecated alias, `{color.tile.water}`; the CSS keeps `--color-terrain-ocean: var(--color-tile-water)`. The token build now resolves DTCG aliases.
- The token font stacks are authoritative; prose quotes them.
- The type scales stay in prose until the Observatory's published scale is vendored.

## Consequences

- The digest changes with 0.2.0, so consumers that vendor by digest re-pin.
- The Modern tiles paint water from `--tile-water`, falling back to `color.tile.water`.
- Consumers move from `--color-terrain-ocean` to `--color-tile-water`; the alias is removed only in a major release.

## References

- [`packages/tokens/README.md`](../../packages/tokens/README.md) and [docs/spec/colour.md](../spec/colour.md).
- [GDR-KI-DESIGN-013](GDR-KI-DESIGN-013-tokens-vendored-by-digest.md).
