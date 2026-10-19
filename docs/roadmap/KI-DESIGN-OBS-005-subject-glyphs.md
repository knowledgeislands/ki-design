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
status: done
blocks: []
blocked_by: []
baseline_ref: 2ada5be5ce278e3f988e1e2c5147a3831ca20cba
transferred_from: knowledgeislands/apps-observatory.local design hand-off, 19 October 2026
created_at: 2026-10-19T11:30:00Z
updated_at: 2026-10-19T22:17:32Z
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

- [x] Restate the subject rule in the design spec's §5 as island, machine and archipelago, with name-prefix typing marked as future work that depends on a `ki` contract.
- [x] Make the Beacon board draw island or machine only.

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

## Review

### Delivered

Within the boundary above, from baseline `2ada5be`, in `327f8b8` (spec, boards, decisions and brief), pushed to `main`. ki-design followed the app; nothing was decided on the Observatory's behalf.

### Change Summary

`OBSERVATORY-DESIGN.md` §5 and §11 (island, machine and archipelago; kind typing as future work that depends on a `ki` contract), `ObsAttend.dc.html` (`glyphFor` draws island or machine only).

### Verification

No rule in the spec or the boards types a subject by its name. `bun run test` (package suites and the 86 generator and preview tests) passes; `bun run self:typecheck` passes; `bunx biome check .`, `bunx rumdl check .` (the `-/` hand-off files included) and `bunx knip` report no issue; `bun docs/design-review/generators/build-boards.ts --check` reports the ten generated boards match their sources; `ki repo audit --skill ki-work-roadmap` and `--skill ki-authoring` add no finding (the existing warnings are older records without `size` and the `.rumdl.toml` template drift).

### Outstanding concerns

Kind-typed subjects wait on a `ki` contract stating a repository's kind; that is `ki`'s to schedule, not ki-design's.

### Post-change review

The change is documentation and hand-drawn boards only: no token value, glyph drawing or package code changed, so no consumer is affected until it chooses to read the corrected spec. The boards stay within their fixed sizes.

### Mini recap

The design now follows the app on this point, verified by the gates above. Ready for Kit's acceptance.

## Done

Accepted 2026-10-19 by Kris Brown on the review packet above. Kris said, on 19 October, "I think we should accept all the awaiting reviews."

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.
