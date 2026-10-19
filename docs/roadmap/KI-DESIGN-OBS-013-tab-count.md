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
status: draft
blocks: []
blocked_by: []
baseline_ref: null
transferred_from: knowledgeislands/apps-observatory.local design hand-off, 19 October 2026
created_at: 2026-10-19T11:30:00Z
updated_at: 2026-10-19T11:30:00Z
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

- [ ] Correct draft 7 and the README to fifteen, sixteen with the Known Lands chart.
- [ ] Add Work to the Structure board's list of today's tabs, say fifteen, and regenerate the boards.
- [ ] Correct the tab-map board's note and the design spec's intro and §11.
- [ ] Note in the design brief that it counted fourteen before Work landed.

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

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.
