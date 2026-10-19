---
id: KI-DESIGN-OBS-001
area: OBS
title: Row and type scale
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

# Row and type scale

## Goal

The Observatory design and the app's type specification show the row and type scale the Observatory actually ships, so a designer mocks up at the sizes a reader sees.

## Context

The boards draw 31 px table rows (14/20 text and 5 px padding), 20/26 instrument titles and fixed 44/38/38/26 px shell bands. The app publishes one scale on `:root` and holds it by test: 13/16 text, 4 px row padding and a 1 px rule make a 25 px row, titles are 19/24, controls 22 px, and its density test (at least 12 Beacon rows at 800 px, at 1440 and 720) decides. Source: [PDR-KI-OBSERVA-002](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-002-observatory-design-language.md), "One scale, published by the shell" and "Density is a stated target".

Decided by: the app wins (ki-design's own hand-off rule, stated in `-/observatory-handoff/INSTRUCTION.md` and in the design spec's "How to use this spec"). ki-design follows the app and decides nothing on the Observatory's behalf.

## Boundary

The app's values are copied as reference values, not made into tokens; `tokens.json` still holds no size tokens. The site's type scale is untouched.

## Current state

`docs/design-review/observatory/OBSERVATORY-DESIGN.md` §2 and §4, `docs/spec/typography.md` "App type scale", `docs/spec/layout.md` "Density targets" and the seven `Obs*` boards still carry the board scale. The generated `DsType` board reads the typography table.

## Steps

- [ ] Restate the shell bands and the row arithmetic in the design spec's §2 and §4 from the app's scale.
- [ ] Replace the app type scale table in `docs/spec/typography.md` with the app's published sizes and leadings.
- [ ] Restate the row and control height in `docs/spec/layout.md`.
- [ ] Set the boards' table rows to 13/16 with 4 px padding and their instrument titles to 19/24, within each board's fixed size.
- [ ] Regenerate the `Ds*` boards and confirm the drift check passes.

## Files touched

`docs/design-review/observatory/OBSERVATORY-DESIGN.md`, `docs/spec/typography.md`, `docs/spec/layout.md`, `docs/design-review/observatory/Obs*.dc.html`, `docs/design-review/generators/templates/DsType.dc.html`, generated `docs/design-review/boards/DsType.dc.html`

## Verify

No 31 px, 14/20 or 20/26 app value remains in the design spec, the spec files or the `Obs*` boards; `bun run self:boards` leaves no drift and `bun run test` passes.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record: the app-wins rule already authorises following the app, and the Observatory's own record carries the decision.

### Specifications

`docs/spec/typography.md` and `docs/spec/layout.md` take the app's reference values.

### Guides

No guide change: no contributor procedure changes.

### Roadmap

None: no follow-on work in ki-design.

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.

### Band heights

The app does not publish fixed band heights; its bands are what its scale sums to. The spec now says so rather than quoting 44/38/38/26 px.
