---
id: KI-DESIGN-OBS-004
area: OBS
title: One glyph per tab
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

# One glyph per tab

## Goal

The Observatory design names a glyph for each of today's tabs, as the app draws them, and keeps the ten-instrument glyphs as the future.

## Context

The design spec's §5 named glyphs for the ten future instruments only. The app draws one distinct glyph before each of its fifteen tabs, with the mapping recorded in its tokens-and-glyphs delivery and decided in [PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md): Beacon `beacon`, Trade routes `trade-route`, Roadmap `streams`, Sessions `role-steward`, Work `hourglass`, Review queue `inbound`, Decisions `council-hall`, Knowledge Bases `library`, Documents `scroll`, Artifacts `workbench`, Repositories `workshop`, Activity `tide-gauge`, MCP servers `bridge`, Automation `calendar`, Rig `machine`.

Decided by: the app wins (ki-design's own hand-off rule, stated in `-/observatory-handoff/INSTRUCTION.md` and in the design spec's "How to use this spec"). ki-design follows the app and decides nothing on the Observatory's behalf.

## Boundary

ki-design does not change any glyph the app draws. Where a tab's glyph differs from a ki-design rule, the difference is noted for the Observatory to weigh, not decided here.

## Current state

`docs/design-review/observatory/OBSERVATORY-DESIGN.md` §5 lists instrument glyphs only.

## Steps

- [x] Add today's tab-to-glyph table to the design spec's §5, beside the ten-instrument mapping, which stays as the destination.
- [x] Note that the MCP servers tab draws `bridge`, while GDR-KI-DESIGN-018 makes `causeway` the translation glyph and says nothing new uses `bridge`.

## Files touched

`docs/design-review/observatory/OBSERVATORY-DESIGN.md`

## Verify

§5 lists all fifteen tabs with the glyph the app draws, and the ten-instrument mapping is still present and marked as the future.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record: the app-wins rule already authorises following the app, and the Observatory's own record carries the decision.

### Specifications

The Observatory design spec's §5 gains today's mapping.

### Guides

No guide change: no contributor procedure changes.

### Roadmap

None: no follow-on work in ki-design.

## Review

### Delivered

Within the boundary above, from baseline `2ada5be`, in `327f8b8` (spec, boards, decisions and brief), pushed to `main`. ki-design followed the app; nothing was decided on the Observatory's behalf.

### Change Summary

`OBSERVATORY-DESIGN.md` §5: today's fifteen-tab glyph table, the ten-instrument mapping kept as the destination, and the note on the MCP servers tab.

### Verification

§5 lists all fifteen tabs with the glyph the app draws; the ten-instrument mapping is still present. `bun run test` (package suites and the 86 generator and preview tests) passes; `bun run self:typecheck` passes; `bunx biome check .`, `bunx rumdl check .` (the `-/` hand-off files included) and `bunx knip` report no issue; `bun docs/design-review/generators/build-boards.ts --check` reports the ten generated boards match their sources; `ki repo audit --skill ki-work-roadmap` and `--skill ki-authoring` add no finding (the existing warnings are older records without `size` and the `.rumdl.toml` template drift).

### Outstanding concerns

The MCP servers tab draws `bridge` while GDR-KI-DESIGN-018 settles `causeway`; ki-design suggests the swap, and the choice is the Observatory's, so nothing is owed here.

### Post-change review

The change is documentation and hand-drawn boards only: no token value, glyph drawing or package code changed, so no consumer is affected until it chooses to read the corrected spec. The boards stay within their fixed sizes.

### Mini recap

The design now follows the app on this point, verified by the gates above. Ready for Kit's acceptance.

## Done

Accepted 2026-10-19 by Kris Brown on the review packet above. Kris said, on 19 October, "I think we should accept all the awaiting reviews."

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.

### The MCP tab

The app chose `bridge` for MCP following an earlier reading of the spec (`mcp-*` a bridge). GDR-KI-DESIGN-018 later settled the Causeway as the translation symbol. ki-design records the difference and suggests `causeway` at the Observatory's next glyph refresh; the choice is the Observatory's.
