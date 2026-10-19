---
id: KI-DESIGN-OBS-014
area: OBS
title: Sessions stays runs
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

# Sessions stays runs

## Goal

The Observatory design says that the Sessions tab stays a runs view until Kit approves the Workers consolidation.

## Context

The design's principle is that agents are never a dashboard of their own. The app's Sessions tab is a runs view today, and the Observatory plans a Workers instrument that would absorb it, but only once Kit approves that consolidation. The principle is a destination, not a reason to change Sessions now.

Decided by: the app wins (ki-design's own hand-off rule, stated in `-/observatory-handoff/INSTRUCTION.md` and in the design spec's "How to use this spec"). ki-design follows the app and decides nothing on the Observatory's behalf.

## Boundary

The principle stands; this record only says how today's tab relates to it.

## Current state

`docs/design-review/observatory/OBSERVATORY-DESIGN.md` §1 states the principle with no note about Sessions, and §9 lists Workers as absorbing Sessions.

## Steps

- [ ] Note under the principle in §1 and in the Workers row of §9 that Sessions stays a runs view until Kit approves the Workers consolidation.

## Files touched

`docs/design-review/observatory/OBSERVATORY-DESIGN.md`

## Verify

§1 and §9 carry the note.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record: the app-wins rule already authorises following the app, and the Observatory's own record carries the decision.

### Specifications

The Observatory design spec's §1 and §9 carry the note.

### Guides

No guide change: no contributor procedure changes.

### Roadmap

None: no follow-on work in ki-design.

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.
