---
id: GDR-KI-DESIGN-019
title: 'The Mill'
date: 2026-10-19
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-019: The Mill

## Context

GDR-KI-PRINCIPAL-010 moved the meaning "operational systems" from the Port to `Admin/Operations` and left its drawn form open. The design work offered two names for the structure: the Mill and the Engine house. The Mill is short and period-consistent, matches the waterwheel art, and leaves the Workshop as the only forge; the tile and glyph id was already `mill`.

On 19 October 2026 Kit accepted the recommendation, and `ki-principal` enacted it as GDR-KI-PRINCIPAL-013.

## Decision

**The structure for operational systems is the Mill:** the running of the island, its routines and upkeep. It is the drawn form of `Admin/Operations`, a stone house with a waterwheel, and it is official. The Engine house is not adopted.

## Consequences

- The `mill` symbol is named Mill and is official; the `mill` glyph and `structure/mill` tile keep their ids.
- Copy writes "Mill", never "Mill / Engine house" or "Mill (proposed)".
- The mill wheel loops at 12 frames, one turn per loop ([GDR-KI-DESIGN-022](GDR-KI-DESIGN-022-tile-loops-and-footprints.md)).

## References

- GDR-KI-PRINCIPAL-013, _The Causeway and the Mill_, in `ki-principal`.
- [docs/spec/meaning.md](../spec/meaning.md#the-capital-and-other-structures).
