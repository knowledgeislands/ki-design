---
id: KI-DESIGN-OBS-013
area: OBS
title: Tab count
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

# Tab count

## Goal

Every place in ki-design counts the Observatory's tabs correctly: fifteen today, sixteen with the Known Lands chart, before any consolidation.

## Context

Draft 7, the hand-off README and the generated Structure board still said fourteen. Work landed after the brief as the fifteenth tab, and the Known Lands chart arrives as a new view beside the others, making sixteen. The app's tab-width model counts the fifteen tabs ([PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md)).

Decided by: the app wins (ki-design's own hand-off rule, stated in `-/observatory-handoff/INSTRUCTION.md` and in the design spec's "How to use this spec"). ki-design follows the app and decides nothing on the Observatory's behalf.

## Boundary

The ten-instrument destination is unchanged; only today's count is corrected.

## Current state

`-/observatory-handoff/07-instrument-restructure.md`, `-/observatory-handoff/README.md`, the `DsStructure` template, `docs/briefs/design-brief.md` and the tab-map board say fourteen or omit Work.

## Steps

- [x] Correct draft 7 and the README to fifteen, sixteen with the Known Lands chart.
- [x] Add Work to the Structure board's list of today's tabs, say fifteen, and regenerate the boards.
- [x] Correct the tab-map board's note and the design spec's intro and §11.
- [x] Note in the design brief that it counted fourteen before Work landed.

## Files touched

`-/observatory-handoff/07-instrument-restructure.md`, `-/observatory-handoff/README.md`, `-/observatory-handoff/INSTRUCTION.md`, `docs/design-review/generators/templates/DsStructure.dc.html`, generated `docs/design-review/boards/DsStructure.dc.html`, `docs/design-review/observatory/ObsMap.dc.html`, `docs/design-review/observatory/OBSERVATORY-DESIGN.md`, `docs/briefs/design-brief.md`

## Verify

`git grep -n -i fourteen` outside `docs/roadmap/` finds only the brief's dated note; `bun run self:boards` leaves no drift.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record: the app-wins rule already authorises following the app, and the Observatory's own record carries the decision.

### Specifications

The Observatory design spec's intro and §11 count fifteen, sixteen with the chart.

### Guides

No guide change: no contributor procedure changes.

### Roadmap

None: no follow-on work in ki-design.

## Review

### Delivered

Within the boundary above, from baseline `2ada5be`, in `327f8b8` (spec, boards, decisions and brief) and `b34e89f` (hand-off drafts), pushed to `main`. ki-design followed the app; nothing was decided on the Observatory's behalf.

### Change Summary

`-/observatory-handoff/07-instrument-restructure.md`, `README.md` and `INSTRUCTION.md`, the `DsStructure` template (Work added, fifteen) and its regenerated board, `ObsMap.dc.html`, `OBSERVATORY-DESIGN.md` (intro and §11), `docs/briefs/design-brief.md` (dated note).

### Verification

`git grep -n -i fourteen` outside `docs/roadmap/` finds only the brief's dated note; the board drift check passes. `bun run test` (package suites and the 86 generator and preview tests) passes; `bun run self:typecheck` passes; `bunx biome check .`, `bunx rumdl check .` (the `-/` hand-off files included) and `bunx knip` report no issue; `bun docs/design-review/generators/build-boards.ts --check` reports the ten generated boards match their sources; `ki repo audit --skill ki-work-roadmap` and `--skill ki-authoring` add no finding (the existing warnings are older records without `size` and the `.rumdl.toml` template drift).

### Outstanding concerns

None.

### Post-change review

The change is documentation and hand-drawn boards only: no token value, glyph drawing or package code changed, so no consumer is affected until it chooses to read the corrected spec. The boards stay within their fixed sizes.

### Mini recap

The design now follows the app on this point, verified by the gates above. Ready for Kit's acceptance.

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.
