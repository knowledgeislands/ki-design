---
id: KI-DESIGN-MAP-001
area: MAP
title: Hex map engine v0
kind: deliver
purpose: capability
project: ki-design
component: hexmap
horizon: now
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: f1ca1cc18c09aaa9cb54a8de2e13eccfd110d1af
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-19T23:12:00Z
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

- [x] Confirm Arcadia's example map renders to SVG in the package tests: `render.test.ts` already holds it (61 hexes, structures, routes and labels in an accessible SVG).
- [x] Confirm the preview's Known Lands chart renders through the package: add a preview test that the chart's `islandmap/v1` passes the package validator and draws through `layoutFlat` and `renderFlatLayers`, the calls the Known Lands view makes, with one hex polygon per hex and one structure per island.

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

Close this item on acceptance; both checks pass.

## Review

### Delivered

Within the boundary above, from baseline `f1ca1cc`: a preview test confirming the Known Lands chart is drawn by `packages/hexmap`; Arcadia's render test already existed. No renderer or model change.

### Change Summary

`examples/observatory-preview/test/helpers.test.ts` gains one test in `territory layout`: the chart model's island map validates as `islandmap/v1` and renders through the package's `layoutFlat` and `renderFlatLayers` with every hex and structure drawn.

### Verification

- `packages/hexmap` tests: 66 pass, 0 fail, Arcadia's accessible SVG render included.
- Preview and generator tests: 87 pass, 0 fail; `tsc -p examples/observatory-preview` passes.
- Repository gates: the package tests and typechecks, `biome check .`, `rumdl check .` and `build-boards.ts --check` pass; the `ki-work-roadmap` and `ki-authoring` audits report FAIL=0. Offline, the `elements` package's `lit` and `happy-dom` and the local `rumdl` devDependency could not be installed, so the `elements` tests and typecheck did not run and `knip` reports `rumdl` unused, as at baseline; neither touches this item.

### Outstanding concerns

None for this item. The preview's chart model still names its roles `citadel` and `bridge`, which the package resolves to the Capital and the Causeway; renaming them is not in this item's scope.

### Post-change review

Both checks hold: Arcadia renders to SVG in tests, and the preview's chart is drawn by the package. One test added, no regression risk. Ready for acceptance.

### Mini recap

Added the chart-through-package test; Arcadia's test already stood. No learning to route.

## Discussion

### Origin

Captured with the design system on 18 Oct 2026; the original "Done when" line is now the Verify section.
