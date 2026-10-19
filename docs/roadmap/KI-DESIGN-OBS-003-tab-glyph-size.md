---
id: KI-DESIGN-OBS-003
area: OBS
title: Tab glyph size
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

# Tab glyph size

## Goal

The Observatory design names one size for the glyph beside each tab title and Beacon subject: 14 px, as the app draws it.

## Context

ki-design's instruction said 14 px, while the design spec's §2 and `docs/spec/components.md` said 16 px. The app draws 14 px (`--glyph: 14px`), counted in its tab-width model. Source: [PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md), "Each tab title follows its glyph".

Decided by: the app wins (ki-design's own hand-off rule, stated in `-/observatory-handoff/INSTRUCTION.md` and in the design spec's "How to use this spec"). ki-design follows the app and decides nothing on the Observatory's behalf.

## Boundary

No new optical-size drawing: the 24 px drawings are scaled to 14 px, as the app does today.

## Current state

`docs/design-review/observatory/OBSERVATORY-DESIGN.md` §2, `docs/spec/components.md` "Instrument tabs" and the shell board's note and tab glyphs say 16 px; `docs/spec/iconography.md` gives no app shell size.

## Steps

- [x] Settle the design spec's §2 and `docs/spec/components.md` on 14 px.
- [x] State the app shell's 14 px size in `docs/spec/iconography.md` under optical sizes.
- [x] Draw the shell board's tab glyphs and the Beacon board's subject glyphs at 14 px and correct the shell board's note.

## Files touched

`docs/design-review/observatory/OBSERVATORY-DESIGN.md`, `docs/spec/components.md`, `docs/spec/iconography.md`, `docs/design-review/observatory/ObsShell.dc.html`, `docs/design-review/observatory/ObsAttend.dc.html`

## Verify

Every statement of the tab or subject glyph size in ki-design says 14 px.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record: the app-wins rule already authorises following the app, and the Observatory's own record carries the decision.

### Specifications

`docs/spec/components.md` and `docs/spec/iconography.md` state 14 px.

### Guides

No guide change: no contributor procedure changes.

### Roadmap

None: no follow-on work in ki-design.

## Review

### Delivered

Within the boundary above, from baseline `2ada5be`, in `327f8b8` (spec, boards, decisions and brief), pushed to `main`. ki-design followed the app; nothing was decided on the Observatory's behalf.

### Change Summary

`OBSERVATORY-DESIGN.md` §2, `docs/spec/components.md` (Instrument tabs), `docs/spec/iconography.md` (the app shell's 14 px exception), `ObsShell.dc.html` (tab and row glyphs at 14 px, note 4), `ObsAttend.dc.html` (subject glyphs at 14 px).

### Verification

Every statement of the tab or subject glyph size says 14 px. `bun run test` (package suites and the 86 generator and preview tests) passes; `bun run self:typecheck` passes; `bunx biome check .`, `bunx rumdl check .` (the `-/` hand-off files included) and `bunx knip` report no issue; `bun docs/design-review/generators/build-boards.ts --check` reports the ten generated boards match their sources; `ki repo audit --skill ki-work-roadmap` and `--skill ki-authoring` add no finding (the existing warnings are older records without `size` and the `.rumdl.toml` template drift).

### Outstanding concerns

None owed: small-size redraws stay under the iconography spec's optical-size rule, which now names the app shell as the known exception.

### Post-change review

The change is documentation and hand-drawn boards only: no token value, glyph drawing or package code changed, so no consumer is affected until it chooses to read the corrected spec. The boards stay within their fixed sizes.

### Mini recap

The design now follows the app on this point, verified by the gates above. Ready for Kit's acceptance.

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.

### Scaling below 20 px

`docs/spec/iconography.md` says never to scale a 24 px drawing below 20 px. The app scales it to 14 px today; the rule now names the app shell as the known exception until small-size redraws exist.
