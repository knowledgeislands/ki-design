---
id: KI-DESIGN-OBS-005
area: OBS
title: Subject glyphs
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

# Subject glyphs

## Goal

The Observatory design types Beacon subjects the way the app can honestly know them: every repository an island, this machine a machine, a signal across several repositories an archipelago.

## Context

The design spec typed subjects by repository name (`tools-*` a workshop, `mcp-*` a causeway, `apps-*` a port). The app reads `ki` contracts rather than guessing a repository's kind from its name, and no contract states the kind. Source: [PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md), "Beacon subjects carry the glyph of the place they are". Closing the gap belongs to `ki`, which would need a contract that states a repository's kind.

Decided by: the app wins (ki-design's own hand-off rule, stated in `-/observatory-handoff/INSTRUCTION.md` and in the design spec's "How to use this spec"). ki-design follows the app and decides nothing on the Observatory's behalf.

## Boundary

ki-design does not ask `ki` for the contract here; it marks kind-typed subjects as future work that depends on one.

## Current state

`docs/design-review/observatory/OBSERVATORY-DESIGN.md` §5 types subjects by name prefix, and the Beacon board's `glyphFor` does the same.

## Steps

- [ ] Restate the subject rule in the design spec's §5 as island, machine and archipelago, with name-prefix typing marked as future work that depends on a `ki` contract.
- [ ] Make the Beacon board draw island or machine only.

## Files touched

`docs/design-review/observatory/OBSERVATORY-DESIGN.md`, `docs/design-review/observatory/ObsAttend.dc.html`

## Verify

No rule in the spec or the boards types a subject by its name.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record: the app-wins rule already authorises following the app, and the Observatory's own record carries the decision.

### Specifications

The Observatory design spec's §5 takes the app's rule.

### Guides

No guide change: no contributor procedure changes.

### Roadmap

None in ki-design. Kind-typed subjects wait on a `ki` contract stating a repository's kind; that is `ki`'s to schedule.

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.
