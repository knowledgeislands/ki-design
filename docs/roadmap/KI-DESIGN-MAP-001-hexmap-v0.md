---
id: KI-DESIGN-MAP-001
area: MAP
title: Hex map engine v0
kind: deliver
purpose: capability
project: ki-design
component: hexmap
horizon: now
status: draft
blocks: []
blocked_by: []
baseline_ref: null
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-18T09:50:00Z
---

# Hex map engine v0

## Goal

Pure TypeScript hex geometry (pointy-top, axial, odd-r), 2:1 dimetric projection, the `islandmap/v1` model with a validator, and a deterministic flat SVG renderer.

## Context

One data model, two renderers is the brief's core architecture; the flat renderer gives value before any painted art exists.

## Boundary

No DOM in the core; isometric rendering is MAP-002.

## Current state

v0 landed in `04b2761`: geometry, projection, the `islandmap/v1` model and validator and the flat SVG renderer in `packages/hexmap`, with Arcadia's example map in `packages/hexmap/examples`. The preview's Known Lands chart uses the hex maths.

## Steps

- [ ] Confirm Arcadia's example map renders to SVG in the package tests.
- [ ] Confirm the preview's Known Lands chart renders through the package.

## Files touched

`packages/hexmap/`, `examples/observatory-preview/`

## Verify

Arcadia's example map renders to SVG in tests; the Known Lands chart in the preview uses it.

## Dependencies / blocks

Blocks the isometric renderer (KI-DESIGN-MAP-002).

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
