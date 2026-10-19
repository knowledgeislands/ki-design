---
id: KI-DESIGN-MAP-002
area: MAP
title: Isometric renderer
kind: deliver
purpose: capability
project: ki-design
component: hexmap
horizon: next
status: draft
blocks: []
blocked_by: []
baseline_ref: null
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-19T23:40:34Z
---

# Isometric renderer

## Goal

Render an IslandMap isometrically from a tile set's atlas in Canvas 2D, with per-cell painter's order, ground-level routes and decals.

## Context

Needed for the Living Map and the Arcadia page once the Ancient set exists.

## Boundary

Canvas 2D only (no PixiJS) so the local app can inline it if it ever wants it.

## Current state

Not started. The flat renderer exists; there is no Canvas 2D renderer.

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

Depends on the hex map engine (KI-DESIGN-MAP-001) and the tile-set contract (KI-DESIGN-TIL-001).

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
