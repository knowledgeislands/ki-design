---
id: KI-DESIGN-OBS-015
area: OBS
title: Banner glyphs question
kind: decide
purpose: capability
project: ki-design
component: icons
priority: medium
size: s
horizon: hold
hold:
  reason: waiting-for
  condition: Kit answers the banner-glyph question in docs/decisions/OPEN.md
  review: 2026-11-02
status: draft
blocks: []
blocked_by: []
baseline_ref: null
transferred_from: knowledgeislands/apps-observatory.local design hand-off, 19 October 2026
created_at: 2026-10-19T11:30:00Z
updated_at: 2026-10-19T11:30:00Z
---

# Banner glyphs question

## Goal

Kit decides whether the work model's banner should keep its emoji or gain line glyphs, with ki-design's options, recommendation and candidate drawings in front of him.

## Context

The Work tab shows each piece of work's state with the work model's banner glyphs: the worker, the supervisor, a named target, on hold and finished. The design says no emoji, but Kit chose to keep one notation everywhere, so the app prints the standard's glyphs unchanged ([PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md)). The question is therefore for the notation itself, which belongs to [the `ki-coordination` standard's Banner section](https://github.com/knowledgeislands/ki-agentic-harness/blob/main/skills/change-management/ki-coordination/references/standards-coordination.md#banner) in `ki-agentic-harness`. Any change goes to that standard first, and the Work tab follows it.

Needs Kit. ki-design does not decide this.

## Boundary

ki-design draws candidates and asks; it does not switch anything over, does not edit `ki-agentic-harness`, and does not change the Work tab.

## Current state

The question is not yet in `docs/decisions/OPEN.md`, and no candidate glyphs exist.

## Steps

- [ ] Add the question to `docs/decisions/OPEN.md` with options and a recommendation.
- [ ] Draw five candidate line glyphs in the house style, marked proposed, under `docs/briefs/`.
- [ ] Write the hand-off text for `ki-agentic-harness` into the answer file.
- [ ] Once Kit answers, record the answer as a decision record and carry any change to the `ki-coordination` standard.

## Files touched

`docs/decisions/OPEN.md`, `docs/briefs/banner-glyph-candidates.md` (new), `docs/briefs/banner-glyphs/*.svg` (new), `docs/briefs/README.md`, `-/observatory-handoff/ANSWER-2026-10-19.md`

## Verify

The question is in `OPEN.md`; the five candidates pass the icon drawing contract (`lintIcon`); nothing in `packages/icons` changes.

## Dependencies / blocks

Needs Kit's answer. Any change to the notation is owed by `ki-agentic-harness` (the `ki-coordination` standard) first, then by the Observatory's Work tab; neither blocks ki-design.

## Documentation impact

### Decision Records

When Kit answers, the answer becomes a GDR in `docs/decisions/` and the entry leaves `OPEN.md`.

### Specifications

None until Kit answers. If line glyphs are adopted as a rendered form, `docs/spec/iconography.md` gains them.

### Guides

No guide change: no contributor procedure changes.

### Roadmap

If Kit adopts the rendered form, the candidates move into `packages/icons` under a new ICO record.

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.

### Options

Keep the emoji as the only notation; keep the emoji as the standard's text notation and add single-colour line glyphs as an optional rendered form; or replace the emoji with line glyphs everywhere.

### Recommendation

Keep the emoji as the standard's text notation, which reads in any terminal, report or commit, and offer the five line glyphs as an optional rendered form that a surface such as the Work tab may draw, with the state's words beside them. The standard decides first; the Work tab follows.
