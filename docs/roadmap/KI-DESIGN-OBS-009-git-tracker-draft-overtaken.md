---
id: KI-DESIGN-OBS-009
area: OBS
title: Git tracker overtaken
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

# Git tracker overtaken

## Goal

ki-design's Git tracker parity draft is marked as overtaken, pointing to where the Observatory now plans the work: a Git view that replaces Repositories.

## Context

Under Kit's EXT-MODEL decision the Observatory plans to make Kit Git Repo Audit a first-class Git view that replaces the Repositories instrument, carrying over every capability, governed operation and `?view=` address. That supersedes draft 2's parity slice. The Observatory's roadmap holds the plan; its [the Observatory's specifications](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/specs/index.md) hold the current behaviour.

Decided by: the app wins (ki-design's own hand-off rule, stated in `-/observatory-handoff/INSTRUCTION.md` and in the design spec's "How to use this spec"). ki-design follows the app and decides nothing on the Observatory's behalf.

## Boundary

The design spec's Repositories instrument keeps its place; ki-design does not redesign the Git view.

## Current state

`-/observatory-handoff/02-git-tracker-parity.md` and the hand-off README present the slice as live.

## Steps

- [ ] Mark draft 2 as overtaken in the draft and the README.
- [ ] Note in the design spec's §9 that the Observatory plans a Git view to replace Repositories.

## Files touched

`-/observatory-handoff/02-git-tracker-parity.md`, `-/observatory-handoff/README.md`, `docs/design-review/observatory/OBSERVATORY-DESIGN.md`

## Verify

Draft 2 and the README say overtaken and point to the Observatory's Git view work.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record: the app-wins rule already authorises following the app, and the Observatory's own record carries the decision.

### Specifications

The Observatory design spec's §9 notes the planned Git view.

### Guides

No guide change: no contributor procedure changes.

### Roadmap

None: no follow-on work in ki-design.

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.
