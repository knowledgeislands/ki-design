---
id: KI-DESIGN-OBS-010
area: OBS
title: Tailnet draft overtaken
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

# Tailnet draft overtaken

## Goal

ki-design's tailnet draft is marked as overtaken: the listener belongs to the host network work, and the Observatory plans only its read-only appearance.

## Context

The tailnet listener, `tailscale serve` and the ACLs are connection-critical and belong to the host network Project. The Observatory plans only the app's read-only side over the tailnet. ki-design's own GDR-KI-DESIGN-034 (read-only over the tailnet) still holds. The Observatory's acting routes are specified in [the Observatory's browser-boundary specification](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/specs/boundary.md).

Decided by: the app wins (ki-design's own hand-off rule, stated in `-/observatory-handoff/INSTRUCTION.md` and in the design spec's "How to use this spec"). ki-design follows the app and decides nothing on the Observatory's behalf.

## Boundary

The design spec's §8 appearance stays; only who builds the listener changes.

## Current state

`-/observatory-handoff/01-tailnet-read-only.md` shapes the listener as the Observatory's own slice, and `docs/design-review/observatory/OBSERVATORY-DESIGN.md` §8 calls it "handoff draft 1".

## Steps

- [ ] Mark draft 1 as overtaken in the draft and the README.
- [ ] Restate the design spec's §8 opening: the listener is host network work; the Observatory owns the read-only appearance.

## Files touched

`-/observatory-handoff/01-tailnet-read-only.md`, `-/observatory-handoff/README.md`, `docs/design-review/observatory/OBSERVATORY-DESIGN.md`

## Verify

Draft 1, the README and §8 say who owns the listener and who owns the appearance.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record: the app-wins rule already authorises following the app, and the Observatory's own record carries the decision.

### Specifications

The Observatory design spec's §8 is restated.

### Guides

No guide change: no contributor procedure changes.

### Roadmap

None: no follow-on work in ki-design.

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.
