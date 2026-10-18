---
id: KI-DESIGN-TIL-001
area: TIL
title: Tile-set contract, Modern set
kind: deliver
purpose: capability
project: ki-design
component: tiles
horizon: now
status: draft
blocks: []
blocked_by: []
baseline_ref: null
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-18T09:50:00Z
---

# Tile-set contract, Modern set

## Goal

Publish the tile manifest schema, the required id inventory and a validator, then draw the Modern set against it.

## Context

Kit wants several tile sets over time, including community ones; the contract is what makes them interchangeable.

## Boundary

The Modern set is drawn here; the Ancient set is TIL-002.

## Current state

v0 landed in `04b2761`: the manifest schema, id inventory and validator in `packages/tiles`, and the Modern set (37 tiles) in `packages/tiles/sets/modern`.

## Steps

- [ ] Confirm the validator passes for the Modern set.
- [ ] Confirm every id renders in the preview's Known Lands chart.

## Files touched

`packages/tiles/`, `examples/observatory-preview/`

## Verify

The validator passes for the Modern set; every id renders in the preview's Known Lands chart.

## Dependencies / blocks

Blocks the Ancient tile set (KI-DESIGN-TIL-002) and the isometric renderer (KI-DESIGN-MAP-002).

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
