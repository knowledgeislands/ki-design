---
id: KI-DESIGN-ART-002
area: ART
title: Art-licensing decision
kind: deliver
purpose: capability
component: art
size: s
horizon: now
status: draft
blocks: []
blocked_by: []
baseline_ref: null
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-27T02:35:00Z
---

# Art-licensing decision

## Goal

Record ownership, generator terms and style-reference risk for AI-generated brand art before production.

## Context

The repository went public on 18 Oct 2026 before this was settled, so until the record exists the README and the briefs tell readers to treat the reference images and generated art as unlicensed.

## Boundary

A decision record only.

## Current state

Not started. The code and documentation are MIT-licensed; the reference images and generated art carry no recorded licence.

## Steps

- [ ] Record ownership, generator terms and the style-reference risk as a Decision Record in `docs/decisions/`.
- [ ] Update the README licence section and the briefs' unlicensed notes to match.

## Files touched

`docs/decisions/`, `README.md`, `docs/briefs/README.md`, `AGENTS.md`

## Verify

A decision record exists, and the README's licence section and the briefs follow it.

## Dependencies / blocks

Depends on nothing. It blocked KI-DESIGN-TIL-002, the Ancient tile set, until 27 October 2026, when the roadmap sweep moved the tile set to [the ideas list](_IDEAS.md); the dependency returns with it. [KI-DESIGN-ART-001](https://github.com/knowledgeislands/ki-design/blob/b7d3467c1613a0ebfec2fa6735d9b690e35225aa/docs/roadmap/KI-DESIGN-ART-001-picture-of-arcadia.md), the picture of Arcadia, is done.

## Documentation impact

### Decision Records

Adds the art-licensing Decision Record.

### Specifications

No specification change: the repository holds no specifications yet; the package tests carry the contract.

### Guides

No guide change: the developer guide already covers running the checks and previews.

### Roadmap

Unblocks the Ancient tile set idea when it returns to the roadmap.

## Discussion

### Origin

Captured with the design system on 18 Oct 2026; the original "Done when" line is now the Verify section.
