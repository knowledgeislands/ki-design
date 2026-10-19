---
id: KI-DESIGN-TIL-002
area: TIL
title: Ancient tile set
kind: deliver
purpose: capability
project: ki-design
component: tiles
horizon: next
status: draft
blocks: []
blocked_by: []
baseline_ref: null
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-19T18:00:00Z
---

# Ancient tile set

## Goal

Produce the painted, dusk-lit Ancient tile set from the picture of Arcadia, per docs/briefs/tile-set-ancient.md.

## Context

Kit's mood boards set the bar: painted, lamp-lit, buildings readable as silhouettes, Age of Empires-esque.

## Boundary

Waits on ART-001 (the picture of Arcadia) and ART-002 (licensing).

## Current state

Batch 1 ran on 19 October 2026: 20 candidates in `+/art/2026-10-19-ancient-batch-1/`. The style matches the painting; the light is golden hour rather than dusk; the generator painted square diamonds despite exact hex geometry. A prototype re-projection (`+/art/2026-10-19-ancient-batch-1-hexed/_hexify.py`) cuts each diamond down to the hex cell, and a 37-hex island built from the results tiles cleanly. So the geometry is ours and the generator only paints. Batch 1b (`docs/briefs/ancient-batch-1b.md`) tests painting on a template and the dusk light on six tiles.

## Steps

- [x] Run batch 1 against the picture of Arcadia (19 Oct 2026).
- [x] Prototype the diamond-to-hex re-projection and test it on a 37-hex island.
- [ ] Run batch 1b on the geometry templates and judge the template method and the dusk light.
- [ ] Port the re-projection to the `packages/tiles` TypeScript tooling, and record the geometry decision as a Decision Record.
- [ ] Generate the rest of the set from the prompt pack the same way.
- [ ] Record each chosen image and its prompt in `packages/tiles/sets/ancient/manifest.json`.
- [ ] Validate the set against the contract and place it on the Arcadia map.

## Files touched

`packages/tiles/sets/ancient/`

## Verify

The set passes the contract and sits seamlessly on the Arcadia map.

## Dependencies / blocks

Waits on the picture of Arcadia (KI-DESIGN-ART-001) and the art-licensing decision (KI-DESIGN-ART-002).

## Documentation impact

### Decision Records

The art-licensing record (KI-DESIGN-ART-002) governs the tiles' terms; this item adds none.

### Specifications

No specification change: the repository holds no specifications yet; the package tests carry the contract.

### Guides

No guide change: the developer guide already covers running the checks and previews.

### Roadmap

None.

## Discussion

### Origin

Captured with the design system on 18 Oct 2026; the original "Done when" line is now the Verify section.
