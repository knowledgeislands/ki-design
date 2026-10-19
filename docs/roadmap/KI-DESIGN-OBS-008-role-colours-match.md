---
id: KI-DESIGN-OBS-008
area: OBS
title: Role colours match
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

# Role colours match

## Goal

ki-design records that its role colours and washes are the values the Observatory already holds by test, hex for hex, and that the app's contrast record is the evidence.

## Context

When the app re-vendored from `ki-design`, its night and light role values matched the values it had derived and held by test, and its washes matched its `color-mix` result. Re-vendoring changed where the values come from, not what the screen shows. Source: [PDR-KI-OBSERVA-002](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-002-observatory-design-language.md), "The light theme is a printed chart, and the dark theme is the chart at night", with [PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md).

Decided by: the app wins (ki-design's own hand-off rule, stated in `-/observatory-handoff/INSTRUCTION.md` and in the design spec's "How to use this spec"). ki-design follows the app and decides nothing on the Observatory's behalf.

## Boundary

No token value changes.

## Current state

`docs/spec/colour.md` and `docs/design-review/observatory/OBSERVATORY-DESIGN.md` §5 do not say that the app's values match or where the evidence lives.

## Steps

- [ ] Say in `docs/spec/colour.md` and the design spec's §5 that the app's role colours match hex for hex and that its contrast record is the evidence.

## Files touched

`docs/spec/colour.md`, `docs/design-review/observatory/OBSERVATORY-DESIGN.md`

## Verify

Both files state the match and point to PDR-KI-OBSERVA-002.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record: the app-wins rule already authorises following the app, and the Observatory's own record carries the decision.

### Specifications

`docs/spec/colour.md` names the app's contrast record as evidence.

### Guides

No guide change: no contributor procedure changes.

### Roadmap

None: no follow-on work in ki-design.

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.
