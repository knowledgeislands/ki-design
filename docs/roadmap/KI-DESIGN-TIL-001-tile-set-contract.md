---
id: KI-DESIGN-TIL-001
area: TIL
title: Tile-set contract, Modern set
kind: deliver
purpose: capability
project: ki-design
component: tiles
horizon: now
status: ready
blocks: []
blocked_by: []
baseline_ref: null
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-19T23:14:00Z
---

# Tile-set contract, Modern set

## Goal

Publish the tile manifest schema, the required id inventory and a validator, then draw the Modern set against it.

## Context

Kit wants several tile sets over time, including community ones; the contract is what makes them interchangeable.

## Boundary

The Modern set is drawn here; the Ancient set is TIL-002.

## Current state

v0 landed in `04b2761`: the manifest schema, id inventory and validator in `packages/tiles`, and the Modern set (37 tiles) in `packages/tiles/sets/modern`. The test `the Modern stub is valid but unfinished` already holds the validator at no errors (`ok`), with every tile still marked `draft`, so the set is not yet `complete`.

The preview's Known Lands chart is the flat renderer: it draws terrain as token fills and patterns and structures as glyphs, never tile art. Of the 36 inventory ids, the 12 terrains have fills and 15 of the 16 structures have glyphs (`cottage` falls back to the neutral marker); the 4 decals and 4 connectors have no flat form. Tile art reaches a chart only through the isometric renderer, KI-DESIGN-MAP-002, which this item blocks.

**Decision before delivery.** As written, Step 2 cannot pass until MAP-002, which waits on this item. This plan follows the recommendation in the run report: hold the flat chart to the ids it can draw, terrains and structures, and leave decals and connectors to MAP-002.

## Steps

- [ ] Confirm the validator passes for the Modern set: the existing test holds `ok` with no errors; re-run it.
- [ ] Add a test that every terrain and structure id in the inventory renders in the flat Known Lands chart: a terrain fill for each terrain, and a structure group, by glyph or the neutral marker, for each structure.
- [ ] Run the package and preview tests, typecheck, lint and roadmap audit.

## Files touched

`packages/tiles/src/validate.test.ts` or `examples/observatory-preview/test/` for the new test; no art changes

## Verify

The validator passes for the Modern set; every terrain and structure id in the inventory renders in the flat Known Lands chart, by test. Decals and connectors are checked when MAP-002 draws tile art.

## Dependencies / blocks

Blocks the Ancient tile set (KI-DESIGN-TIL-002) and the isometric renderer (KI-DESIGN-MAP-002). Waits on the owner's answer on the chart check.

## Documentation impact

### Decision Records

No decision record: this item delivers within decisions already recorded in the design brief.

### Specifications

No specification change: the repository holds no specifications yet; the package tests carry the contract.

### Guides

No guide change: the developer guide already covers running the checks and previews.

### Roadmap

Close this item once both checks pass.

## Discussion

### Origin

Captured with the design system on 18 Oct 2026; the original "Done when" line is now the Verify section.
