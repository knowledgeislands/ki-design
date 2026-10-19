---
id: KI-DESIGN-OBS-011
area: OBS
title: Switchboard draft overtaken
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

# Switchboard draft overtaken

## Goal

ki-design's extensions switchboard draft is marked as overtaken by the Observatory's live-artifact adapters, inbound and outbound.

## Context

Draft 5 overlapped the live-artifact extension model: manifest keys, "Extended by", the directory and the tokens passed to a framed artifact. The Observatory keeps both side by side: the switchboard work is now its inbound live-artifact adapter, with an outbound adapter as the other half. The framed-artifact behaviour today is in [the Observatory's artifacts specification](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/specs/artifacts.md).

Decided by: the app wins (ki-design's own hand-off rule, stated in `-/observatory-handoff/INSTRUCTION.md` and in the design spec's "How to use this spec"). ki-design follows the app and decides nothing on the Observatory's behalf.

## Boundary

The design spec's Extend board keeps its look; ki-design does not design the adapters.

## Current state

`-/observatory-handoff/05-extensions-switchboard.md` presents the switchboard as its own slice, and `docs/design-review/observatory/OBSERVATORY-DESIGN.md` §9 lists "the new switchboard".

## Steps

- [x] Mark draft 5 as overtaken in the draft and the README.
- [x] Note in the design spec's §9 that the switchboard is now the inbound live-artifact adapter, with an outbound adapter beside it.

## Files touched

`-/observatory-handoff/05-extensions-switchboard.md`, `-/observatory-handoff/README.md`, `docs/design-review/observatory/OBSERVATORY-DESIGN.md`

## Verify

Draft 5, the README and §9 point to the adapters.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record: the app-wins rule already authorises following the app, and the Observatory's own record carries the decision.

### Specifications

The Observatory design spec's §9 notes the adapters.

### Guides

No guide change: no contributor procedure changes.

### Roadmap

None: no follow-on work in ki-design.

## Review

### Delivered

Within the boundary above, from baseline `2ada5be`, in `327f8b8` (spec, boards, decisions and brief) and `b34e89f` (hand-off drafts), pushed to `main`. ki-design followed the app; nothing was decided on the Observatory's behalf.

### Change Summary

`-/observatory-handoff/05-extensions-switchboard.md` and `README.md` (overtaken), `OBSERVATORY-DESIGN.md` §9 (the inbound and outbound live-artifact adapters).

### Verification

Draft 5, the README and §9 point to the adapters. `bun run test` (package suites and the 86 generator and preview tests) passes; `bun run self:typecheck` passes; `bunx biome check .`, `bunx rumdl check .` (the `-/` hand-off files included) and `bunx knip` report no issue; `bun docs/design-review/generators/build-boards.ts --check` reports the ten generated boards match their sources; `ki repo audit --skill ki-work-roadmap` and `--skill ki-authoring` add no finding (the existing warnings are older records without `size` and the `.rumdl.toml` template drift).

### Outstanding concerns

None.

### Post-change review

The change is documentation and hand-drawn boards only: no token value, glyph drawing or package code changed, so no consumer is affected until it chooses to read the corrected spec. The boards stay within their fixed sizes.

### Mini recap

The design now follows the app on this point, verified by the gates above. Ready for Kit's acceptance.

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.
