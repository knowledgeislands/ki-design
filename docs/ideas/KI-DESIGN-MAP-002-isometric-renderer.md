---
id: KI-DESIGN-MAP-002
area: MAP
title: Isometric renderer
kind: deliver
purpose: capability
component: hexmap
size: l
horizon: hold
hold:
  reason: waiting-for
  condition: composition Pilot 0 (docs/spec/hex-terrain-composition.md) lands and its review board is judged
status: draft
blocks: []
blocked_by: []
baseline_ref: null
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-22T07:37:07Z
---

> **Idea, not on the roadmap.** Render an IslandMap isometrically from a tile set's atlas in Canvas 2D; needs the tile set first. Moved out of `docs/roadmap/` on 27 October 2026 under the roadmap sweep, with its record kept in full here so that it can return when Kris brings it back; it was `KI-DESIGN-MAP-002`.

# Isometric renderer

## Goal

Render an IslandMap isometrically from a tile set's atlas in Canvas 2D, with per-cell painter's order, ground-level routes and decals.

## Context

Needed for the Living Map and the Arcadia page once the Ancient set exists.

## Boundary

Canvas 2D only (no PixiJS) so the local app can inline it if it ever wants it.

## Current state

Not started. The flat renderer exists; there is no Canvas 2D renderer.

**On hold behind composition Pilot 0.** On 20 October 2026 the owner held this record (DESIGN-DISPOSITIONS a) until [Pilot 0](../spec/hex-terrain-composition.md#pilot-0-the-smallest-useful-test), the flat-colour `renderTerrainSvg` and its 19-cell fixture, has proved the terrain geometry, visibility and draw order. On release it is to be replanned against an atlas format and the Ancient isometric set ([GDR-KI-DESIGN-038](../decisions/GDR-KI-DESIGN-038-ancient-is-the-only-isometric-tile-set-the-flat-chart-keeps-its-engraved-treatment.md)), which makes Ancient the only isometric set and freezes the Modern isometric tiles as a fixture; the Steps and Verify below still name the Modern set and are superseded by that replan.

## Steps

- [ ] Render an IslandMap from a tile set's atlas in Canvas 2D with per-cell painter's order.
- [ ] Draw ground-level routes and decals.
- [ ] Add a test that every decal and connector id in the tile inventory renders from the Modern set's tile art; this check moved here from KI-DESIGN-TIL-001, whose flat-chart check covers terrains and structures only.
- [ ] Measure frame rate and image budgets on a laptop.

## Files touched

`packages/hexmap/`

## Verify

Arcadia renders from the Modern set at 60 fps on a laptop and within the image budgets; every decal and connector id in the inventory renders from tile art, by test (moved from KI-DESIGN-TIL-001 on 20 October 2026, TILE-CHECK a).

## Dependencies / blocks

Held behind composition Pilot 0, which no record yet carries. It builds on the hex map engine ([KI-DESIGN-MAP-001](https://github.com/knowledgeislands/ki-design/blob/e1d20b6b96770c35ac1c1c3186c672fb710aa969/docs/roadmap/KI-DESIGN-MAP-001-hexmap-v0.md)) and the tile-set contract ([KI-DESIGN-TIL-001](https://github.com/knowledgeislands/ki-design/blob/e1d20b6b96770c35ac1c1c3186c672fb710aa969/docs/roadmap/KI-DESIGN-TIL-001-tile-set-contract.md)), both done.

## Documentation impact

### Decision Records

No decision record: this item delivers within decisions already recorded in the design brief.

### Specifications

No specification change: the repository holds no specifications yet; the package tests carry the contract.

### Guides

No guide change: the developer guide already covers running the checks and previews.

### Roadmap

None.

## Discussion

### Origin

Captured with the design system on 18 Oct 2026; the original "Done when" line is now the Verify section.
