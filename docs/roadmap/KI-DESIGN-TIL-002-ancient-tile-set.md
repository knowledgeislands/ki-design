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
updated_at: 2026-10-18T09:50:00Z
---

# Ancient tile set

## Goal

Produce the painted, dusk-lit Ancient tile set from the picture of Arcadia, per docs/briefs/tile-set-ancient.md.

## Context

Kit's mood boards set the bar: painted, lamp-lit, buildings readable as silhouettes, Age of Empires-esque.

## Boundary

Waits on ART-001 (the picture of Arcadia) and ART-002 (licensing).

## Current state

Not started. The brief `docs/briefs/tile-set-ancient.md` and the prompt pack are ready; no tile has been produced.

## Steps

- [ ] Generate each tile from the prompt pack against the picture of Arcadia.
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
