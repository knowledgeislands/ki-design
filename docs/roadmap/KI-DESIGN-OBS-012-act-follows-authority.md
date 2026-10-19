---
id: KI-DESIGN-OBS-012
area: OBS
title: Act follows authority
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

# Act follows authority

## Goal

The Observatory design says that where its declare, confirm, receipt pattern and the app differ, the app's authority specification wins.

## Context

The board's declare, confirm, receipt already matches what the app enforces: the tier decides the confirmation, a plan comes before anything runs, and a mutation runs only on its own fresh plan. Where they differ, [the Observatory's authority specification](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/specs/authority.md) wins.

Decided by: the app wins (ki-design's own hand-off rule, stated in `-/observatory-handoff/INSTRUCTION.md` and in the design spec's "How to use this spec"). ki-design follows the app and decides nothing on the Observatory's behalf.

## Boundary

No change to the board's look.

## Current state

`docs/design-review/observatory/OBSERVATORY-DESIGN.md` §7 and `docs/spec/components.md` (Bridge: plan / confirm / receipt) state the pattern without naming the app's specification as authoritative.

## Steps

- [ ] Add to the design spec's §7 and to `docs/spec/components.md` that the app's authority specification wins where they differ.

## Files touched

`docs/design-review/observatory/OBSERVATORY-DESIGN.md`, `docs/spec/components.md`

## Verify

Both files name the Observatory's authority specification as the authority for acting.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record: the app-wins rule already authorises following the app, and the Observatory's own record carries the decision.

### Specifications

`docs/spec/components.md` defers to the app's authority specification.

### Guides

No guide change: no contributor procedure changes.

### Roadmap

None: no follow-on work in ki-design.

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.
