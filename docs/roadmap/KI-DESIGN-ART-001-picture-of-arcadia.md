---
id: KI-DESIGN-ART-001
area: ART
title: The picture of Arcadia
kind: deliver
purpose: capability
project: ki-design
component: art
horizon: now
status: draft
blocks: []
blocked_by: []
baseline_ref: null
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-18T09:50:00Z
---

# The picture of Arcadia

## Goal

Generate the defining painting of Arcadia from docs/briefs/arcadia-picture.md and choose the reference.

## Context

It fixes light, palette and detail for the Ancient set and becomes the site's hero.

## Boundary

Generation by an image model Kit chooses; no generator credentials are stored here.

## Current state

Variation 1 of three generations is chosen and saved at `docs/briefs/references/arcadia.png`, with the generation prompts in `docs/briefs/arcadia-generation-prompts.md` and the reasons and handoff in `docs/briefs/arcadia-handoff.md`. The art-licensing decision (KI-DESIGN-ART-002) has not been recorded.

## Steps

- [ ] Run the Arcadia brief in the image model Kit chooses.
- [ ] Choose one image and save it at `docs/briefs/references/arcadia.png`.
- [ ] Write the notes on why it was chosen beside the brief.

## Files touched

`docs/briefs/references/arcadia.png`, `docs/briefs/arcadia-picture.md`

## Verify

A chosen image at references/arcadia.png with notes on why.

## Dependencies / blocks

Should follow the art-licensing decision (KI-DESIGN-ART-002), so the chosen image's terms are known before it becomes the reference. Blocks the Ancient tile set (KI-DESIGN-TIL-002).

## Documentation impact

### Decision Records

The art-licensing record (KI-DESIGN-ART-002) governs the image's terms; this item adds none.

### Specifications

No specification change: the repository holds no specifications yet; the package tests carry the contract.

### Guides

No guide change: the developer guide already covers running the checks and previews.

### Roadmap

Unblocks KI-DESIGN-TIL-002 once chosen.

## Discussion

### Origin

Captured with the design system on 18 Oct 2026; the original "Done when" line is now the Verify section.
