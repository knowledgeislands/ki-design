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
horizon: now
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: 90c315d6637703d43849f6585a2f097285275dc6
transferred_from: knowledgeislands/apps-observatory.local design hand-off, 19 October 2026
created_at: 2026-10-19T11:30:00Z
updated_at: 2026-10-19T23:33:19Z
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

The question is in `docs/decisions/OPEN.md` ("Banner glyphs") with options and a recommendation, and five candidate glyphs are drawn, marked proposed, in `docs/briefs/banner-glyph-candidates.md` and `docs/briefs/banner-glyphs/` (`992326d`); each passes `lintIcon`. The hand-off text for `ki-agentic-harness` is in `-/observatory-handoff/ANSWER-2026-10-19.md`. Nothing is switched over.

On 20 October 2026, under the overnight authority (OVERNIGHT in ki-principal's `+/_WORK/ki.observatory/decisions.md`), Kit took the recommendation, BANNER-GLYPHS a), option (b) in `OPEN.md`: the emoji stay the `ki-coordination` standard's written notation, and rendered surfaces may draw the five line glyphs with the state's words beside them. The glyphs stay proposed until the harness standard admits the rendered form; the hand-off to `ki-agentic-harness` is raised separately, not by this record.

## Steps

- [x] Add the question to `docs/decisions/OPEN.md` with options and a recommendation.
- [x] Draw five candidate line glyphs in the house style, marked proposed, under `docs/briefs/`.
- [x] Write the hand-off text for `ki-agentic-harness` into the answer file.
- [x] Once Kit answers, record the answer as a decision record (GDR-KI-DESIGN-037), take the entry out of `OPEN.md`, and point the briefs, the Observatory design spec and the answer file at it. The change to the `ki-coordination` standard is carried by the separate hand-off to `ki-agentic-harness`.

## Files touched

`docs/decisions/OPEN.md`, `docs/decisions/README.md`, `docs/decisions/GDR-KI-DESIGN-037-banner-emoji-stay-the-notation.md` (new), `docs/briefs/banner-glyph-candidates.md` (new), `docs/briefs/banner-glyphs/*.svg` (new), `docs/briefs/README.md`, `docs/design-review/observatory/OBSERVATORY-DESIGN.md`, `docs/design-review/boards/DsDecisions.dc.html`, `docs/design-review/boards/canvas.json`, `-/observatory-handoff/ANSWER-2026-10-19.md`

## Verify

The answer is GDR-KI-DESIGN-037 and the entry has left `OPEN.md`; the five candidates pass the icon drawing contract (`lintIcon`); nothing in `packages/icons` changes.

## Dependencies / blocks

Kit's answer is in. Any change to the notation is owed by `ki-agentic-harness` (the `ki-coordination` standard) first, then by the Observatory's Work tab; neither blocks ki-design.

## Documentation impact

### Decision Records

GDR-KI-DESIGN-037 records the answer; the entry has left `OPEN.md`.

### Specifications

None yet. Once the `ki-coordination` standard admits the rendered form, `docs/spec/iconography.md` gains the glyphs.

### Guides

No guide change: no contributor procedure changes.

### Roadmap

Once the `ki-coordination` standard admits the rendered form, the candidates move into `packages/icons` under a new ICO record, captured then.

## Review

### Delivered

Within the boundary above, from baseline `90c315d`: Kit's answer recorded as GDR-KI-DESIGN-037, the question taken out of `OPEN.md`, and every pointer to the open question updated. No glyph moved into `packages/icons`; nothing in `ki-agentic-harness` or the Work tab changed.

### Change Summary

`docs/decisions/GDR-KI-DESIGN-037-banner-emoji-stay-the-notation.md` (new) and its index line in `docs/decisions/README.md`; the Banner glyphs entry removed from `docs/decisions/OPEN.md`; `docs/briefs/README.md`, `docs/briefs/banner-glyph-candidates.md` and §1 of `docs/design-review/observatory/OBSERVATORY-DESIGN.md` point to the record; `-/observatory-handoff/ANSWER-2026-10-19.md` says the answer is in and fills the option into its hand-off text. The generated `DsDecisions` board and `canvas.json` are rebuilt with `bun run self:boards`. Lettering: the brief's BANNER-GLYPHS a) is option (b) in `OPEN.md`; both name the same answer.

### Verification

The five candidates still pass `lintIcon`; `packages/icons` is unchanged; Markdown lint, the board drift check, the repository tests and the `ki-work-roadmap` audit (FAIL=0) pass.

### Outstanding concerns

The rendered form waits on the `ki-coordination` standard; the hand-off to `ki-agentic-harness` is raised separately. No follow-up ICO record is captured until the standard admits the form.

### Post-change review

The goal is met: Kit decided with the options and candidates in front of him, and the answer is recorded where the work-item and decision standards put it. Documentation only; no regression risk. Ready for acceptance.

### Mini recap

Recorded the banner-glyph answer as GDR-KI-DESIGN-037 and retired the open question. Learning route: once the harness standard admits the rendered form, capture the ICO record that moves the glyphs into the icon package.

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.

### Options

Keep the emoji as the only notation; keep the emoji as the standard's text notation and add single-colour line glyphs as an optional rendered form; or replace the emoji with line glyphs everywhere.

### Recommendation

Keep the emoji as the standard's text notation, which reads in any terminal, report or commit, and offer the five line glyphs as an optional rendered form that a surface such as the Work tab may draw, with the state's words beside them. The standard decides first; the Work tab follows.
