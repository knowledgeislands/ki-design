---
id: GDR-KI-DESIGN-022
title: 'Tile loops follow the animation standard; footprints are each set''s choice'
date: 2026-10-19
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-022: Tile loops follow the animation standard; footprints are each set's choice

## Context

The Modern manifest declared the lighthouse lamp at 12 frames and the mill at 16, while the animation standard says 24 (a slow sweep) and 12 (one turn per loop). No frames beyond frame 0 are drawn, so nothing is lost by changing them.

The contract fixes only the Capital's footprint, a 7-hex flower. The old DESIGN.md suggested others (Council Hall and Workshop as pairs, the Library single or pair, the Port pair or flower, the ancient forest single or flower) and listed manifest fields the contract lacks: the flat SVG twin, the architectural family, the island palette and an `edge` footprint for connectors. On 19 October 2026 Kit accepted the recommendations.

## Decision

**A tile's loop follows the animation standard, and every footprint except the Capital's is the tile set's choice.**

- The Modern manifest loops the lighthouse at 24 frames and the mill at 12.
- The contract fixes only the Capital's flower. Each set declares the rest in its manifest.
- The missing manifest fields are added when the Ancient set needs them, not before, and as optional fields.

## Consequences

- `sets/modern/manifest.json` declares `structure/lighthouse` 24 and `structure/mill` 12 (`@knowledgeislands/tiles` 0.1.1).
- The contract notes in [docs/spec/tiles-and-buildings.md](../spec/tiles-and-buildings.md#footprints) and the [tiles README](../../packages/tiles/README.md) say footprints are per set.
- The flat SVG twin (`flat`), the family (`family`, hero structures only), the palette (`palette`, on the set and per tile) and the `edge` footprint (connectors only) were added to the contract as optional fields ahead of the first Ancient batch (`@knowledgeislands/tiles` 0.2.0). The Modern manifest declares its palette and the families it plainly draws; see [Optional manifest fields](../spec/tiles-and-buildings.md#optional-manifest-fields).

## References

- [docs/spec/motion.md](../spec/motion.md#what-moves) and the [animation standard](../briefs/animation-standard.md).
- [GDR-KI-DESIGN-005](GDR-KI-DESIGN-005-animation-clock.md).
