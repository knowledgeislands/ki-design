---
id: GDR-KI-DESIGN-003
title: 'Hex grid geometry'
date: 2026-10-18
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-003: Hex grid geometry

## Context

The canon's isometric tile sheets in `ki-principal/Pillars/Aesthetics/Isometric Tiles` are painted on a square grid. Knowledge Islands maps need adjacency, distance and routes that read the same on the site, in the local app and in print, and the existing structure art should not be thrown away.

On 18 October 2026 Kit chose a hex grid for Knowledge Islands maps, reusing the existing isometric structure art. The design brief recorded it as decided: hex for logic and maps; the square-grid structures re-cut onto hex plinths; a new hex terrain set.

## Decision

**Every Knowledge Islands map is drawn on pointy-top hexes. The hex grid is the truth; the isometric painting shows it.**

- Coordinates are axial `(q, r)`, with cube coordinates for distance and pathing and an odd-r offset layout.
- The projection is 2:1 dimetric. At 1× the top face is 256 × 148 px, the row step is 111 px, odd rows shift 128 px, and a 48 px stratified plinth sits beneath, making a 256 × 196 px cell. Rasters come at 1× and 2×.
- Light is fixed at the top-left; painted art is never rotated.
- Square-grid art is re-cut: 1×1 to one hex, 1×2 to a pair, 2×2 to 4×4 to a 7-hex flower, with the square plinth matted out and a hex plinth repainted.
- The same map renders flat or isometric, in any tile set, without changing its data.

## Consequences

- `@knowledgeislands/hexmap` and `@knowledgeislands/tiles` carry the same numbers (`isoPosition`, `isoProject`, `tileGeometry`), and every tile set is drawn to them.
- The geometry is held fixed. A change would break every tile set, so it would be a major release.
- Transitions between terrains are composited per edge with a 6-bit neighbour mask, because fixed light forbids rotating art.

## References

- docs/spec/tiles-and-buildings.md - geometry, footprints, auto-tiling and layering.
- docs/spec/world.md - hex for logic, isometric for life.
- Building standards.
