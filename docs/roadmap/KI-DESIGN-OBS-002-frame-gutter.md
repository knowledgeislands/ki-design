---
id: KI-DESIGN-OBS-002
area: OBS
title: Frame gutter
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

# Frame gutter

## Goal

The Observatory design states the frame gutter the app ships, 24 px wide and 12 px at 760 px and below.

## Context

The boards and `docs/spec/layout.md` use 16 px wide and 8 px narrow. The app's `--gutter` is its `--space-7` (24 px), narrowing to `--space-5` (12 px) at or below 760 px. Source: [PDR-KI-OBSERVA-002](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-002-observatory-design-language.md), "Width is a stated target".

Decided by: the app wins (ki-design's own hand-off rule, stated in `-/observatory-handoff/INSTRUCTION.md` and in the design spec's "How to use this spec"). ki-design follows the app and decides nothing on the Observatory's behalf.

## Boundary

The site's grid and gutters are untouched.

## Current state

`docs/design-review/observatory/OBSERVATORY-DESIGN.md` §4 and `docs/spec/layout.md` "Grids and widths" say 16 / 8 px; the shell board pads its bands by 14 px.

## Steps

- [x] Set the frame gutter to 24 / 12 px in the design spec's §4 and in `docs/spec/layout.md`.
- [x] Pad the shell board's bands and pane by the 24 px gutter, within its fixed width.

## Files touched

`docs/design-review/observatory/OBSERVATORY-DESIGN.md`, `docs/spec/layout.md`, `docs/design-review/observatory/ObsShell.dc.html`

## Verify

The spec files and the shell board show 24 / 12 px; no 16 / 8 px frame gutter remains.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record: the app-wins rule already authorises following the app, and the Observatory's own record carries the decision.

### Specifications

`docs/spec/layout.md` takes the app's gutter.

### Guides

No guide change: no contributor procedure changes.

### Roadmap

None: no follow-on work in ki-design.

## Review

### Delivered

Within the boundary above, from baseline `2ada5be`, in `327f8b8` (spec, boards, decisions and brief), pushed to `main`. ki-design followed the app; nothing was decided on the Observatory's behalf.

### Change Summary

`OBSERVATORY-DESIGN.md` §4, `docs/spec/layout.md` (24 / 12 px), `ObsShell.dc.html` (bands and pane padded by 24 px).

### Verification

The spec files and the shell board show 24 / 12 px. `bun run test` (package suites and the 86 generator and preview tests) passes; `bun run self:typecheck` passes; `bunx biome check .`, `bunx rumdl check .` (the `-/` hand-off files included) and `bunx knip` report no issue; `bun docs/design-review/generators/build-boards.ts --check` reports the ten generated boards match their sources; `ki repo audit --skill ki-work-roadmap` and `--skill ki-authoring` add no finding (the existing warnings are older records without `size` and the `.rumdl.toml` template drift).

### Outstanding concerns

None.

### Post-change review

The change is documentation and hand-drawn boards only: no token value, glyph drawing or package code changed, so no consumer is affected until it chooses to read the corrected spec. The boards stay within their fixed sizes.

### Mini recap

The design now follows the app on this point, verified by the gates above. Ready for Kit's acceptance.

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.
