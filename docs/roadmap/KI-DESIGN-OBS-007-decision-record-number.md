---
id: KI-DESIGN-OBS-007
area: OBS
title: Decision record number
kind: deliver
purpose: corrective
project: ki-design
component: observatory
priority: medium
size: s
horizon: now
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: 2ada5be5ce278e3f988e1e2c5147a3831ca20cba
transferred_from: knowledgeislands/apps-observatory.local design hand-off, 19 October 2026
created_at: 2026-10-19T11:30:00Z
updated_at: 2026-10-19T11:45:00Z
---

# Decision record number

## Goal

Every reference in ki-design names the Observatory decision record that exists: PDR-KI-OBSERVA-008 for the tokens-and-glyphs change, not 007.

## Context

ki-design's hand-off and several of its documents named PDR-KI-OBSERVA-007 for the visual change, but 007 was already taken by feedback. The visual decision is [PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md). It records the tokens and glyphs moving to `ki-design` and the tab-width model; it does not record the Known Lands chart or an exception for shared components, which no Observatory record yet covers.

Decided by: the app wins (ki-design's own hand-off rule, stated in `-/observatory-handoff/INSTRUCTION.md` and in the design spec's "How to use this spec"). ki-design follows the app and decides nothing on the Observatory's behalf.

## Boundary

Each reference is corrected to what is true: 008 where it covers the tokens and glyphs, and "a later Observatory decision record, not yet written" where it meant the chart or the shared components.

## Current state

`docs/spec/components.md`, `docs/spec/governance.md`, `docs/spec/voice.md`, `docs/briefs/design-brief.md`, GDR-KI-DESIGN-012, GDR-KI-DESIGN-013 and hand-off drafts 3 and 6 name 007.

## Steps

- [x] Correct each reference to 007 in the spec, the brief, the decision records and the hand-off drafts.

## Files touched

`docs/spec/components.md`, `docs/spec/governance.md`, `docs/spec/voice.md`, `docs/briefs/design-brief.md`, `docs/decisions/GDR-KI-DESIGN-012-shared-web-components.md`, `docs/decisions/GDR-KI-DESIGN-013-tokens-vendored-by-digest.md`, `-/observatory-handoff/03-known-lands-chart.md`, `-/observatory-handoff/06-kit-tokens-and-glyphs.md`

## Verify

`git grep -n 'OBSERVA-007\|PDR-007'` outside `docs/roadmap/` finds nothing.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

GDR-KI-DESIGN-012 and GDR-KI-DESIGN-013 are living records and are repointed in place.

### Specifications

`docs/spec/components.md`, `governance.md` and `voice.md` name the right record.

### Guides

No guide change: no contributor procedure changes.

### Roadmap

None: no follow-on work in ki-design.

## Review

### Delivered

Within the boundary above, from baseline `2ada5be`, in `327f8b8` (spec, boards, decisions and brief) and `b34e89f` (hand-off drafts), pushed to `main`. ki-design followed the app; nothing was decided on the Observatory's behalf.

### Change Summary

`docs/spec/components.md`, `docs/spec/governance.md`, `docs/spec/voice.md`, `docs/briefs/design-brief.md`, GDR-KI-DESIGN-012, GDR-KI-DESIGN-013, `-/observatory-handoff/03-known-lands-chart.md` and `06-kit-tokens-and-glyphs.md`.

### Verification

`git grep -n -E 'OBSERVA-007|PDR-007'` outside `docs/roadmap/` finds nothing. `bun run test` (package suites and the 86 generator and preview tests) passes; `bun run self:typecheck` passes; `bunx biome check .`, `bunx rumdl check .` (the `-/` hand-off files included) and `bunx knip` report no issue; `bun docs/design-review/generators/build-boards.ts --check` reports the ten generated boards match their sources; `ki repo audit --skill ki-work-roadmap` and `--skill ki-authoring` add no finding (the existing warnings are older records without `size` and the `.rumdl.toml` template drift).

### Outstanding concerns

None.

### Post-change review

The change is documentation and hand-drawn boards only: no token value, glyph drawing or package code changed, so no consumer is affected until it chooses to read the corrected spec. The boards stay within their fixed sizes.

### Mini recap

The design now follows the app on this point, verified by the gates above. Ready for Kit's acceptance.

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.
