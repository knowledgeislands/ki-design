---
id: GDR-KI-DESIGN-004
title: 'Two tile sets and the illustrated explainer style'
date: 2026-10-18
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-004: Two tile sets and the illustrated explainer style

## Context

Kit likes the painterly, legendary look of his mood boards and the Aesthetics pillar, and also simpler flat styles. He expects others to make tile sets of their own. The local app, print and small sizes need a flat, legible set; the public hero and posters want painted art; and explainers need a diagram style that is neither.

## Decision

**The world has two tile sets and one diagram style.**

- **Modern**: crisp engraved linework over flat token fills. The default in the local app, docs, diagrams, print and small sizes, and the flat twin of everything.
- **Ancient**: painted, dusk-lit atlas art in the manner of the mood boards and the chosen painting of Arcadia. Used for the public hero, the Living Map, Arcadia, posters and archetype cards.
- **Illustrated explainer**: a daylight watercolour diagram style for explainers, posters and decks. It is a style, not a tile set.

A tile set is a skin over one inventory of ids. Any set, including a community set, is valid when it covers every id in the contract and passes `validateTileSet` and the building standards. An island may adopt any valid set as local character.

## Consequences

- `@knowledgeislands/tiles` holds the contract and the sets; `<ki-hexmap>` is to take a `tileset` choice.
- Modern v0 is drawn as SVG; Ancient waits on art painted from the chosen Arcadia painting.
- The release target is three variants for terrain and the five hero structures, and one for other structures.
- Generated art is treated as unlicensed until the art-licensing decision is recorded.

## References

- [docs/spec/illustration.md](../spec/illustration.md) - the three directions and the 70 / 30 balance.
- [docs/spec/tiles-and-buildings.md](../spec/tiles-and-buildings.md) - the contract.
- [Tile set: Modern](../briefs/tile-set-modern.md), [Tile set: Ancient](../briefs/tile-set-ancient.md), [Illustrated explainer style](../briefs/explainer-style.md).
