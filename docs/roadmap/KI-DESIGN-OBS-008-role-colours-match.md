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
status: done
blocks: []
blocked_by: []
baseline_ref: 2ada5be5ce278e3f988e1e2c5147a3831ca20cba
transferred_from: knowledgeislands/apps-observatory.local design hand-off, 19 October 2026
created_at: 2026-10-19T11:30:00Z
updated_at: 2026-10-19T22:17:32Z
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

- [x] Say in `docs/spec/colour.md` and the design spec's §5 that the app's role colours match hex for hex and that its contrast record is the evidence.

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

## Review

### Delivered

Within the boundary above, from baseline `2ada5be`, in `327f8b8` (spec, boards, decisions and brief), pushed to `main`. ki-design followed the app; nothing was decided on the Observatory's behalf.

### Change Summary

`docs/spec/colour.md` and `OBSERVATORY-DESIGN.md` §5 (the hex-for-hex match, with PDR-KI-OBSERVA-002's contrast record as evidence).

### Verification

Both files state the match and point to PDR-KI-OBSERVA-002. `bun run test` (package suites and the 86 generator and preview tests) passes; `bun run self:typecheck` passes; `bunx biome check .`, `bunx rumdl check .` (the `-/` hand-off files included) and `bunx knip` report no issue; `bun docs/design-review/generators/build-boards.ts --check` reports the ten generated boards match their sources; `ki repo audit --skill ki-work-roadmap` and `--skill ki-authoring` add no finding (the existing warnings are older records without `size` and the `.rumdl.toml` template drift).

### Outstanding concerns

None.

### Post-change review

The change is documentation and hand-drawn boards only: no token value, glyph drawing or package code changed, so no consumer is affected until it chooses to read the corrected spec. The boards stay within their fixed sizes.

### Mini recap

The design now follows the app on this point, verified by the gates above. Ready for Kit's acceptance.

## Done

Accepted 2026-10-19 by Kris Brown on the review packet above. Kris said, on 19 October, "I think we should accept all the awaiting reviews."

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.
