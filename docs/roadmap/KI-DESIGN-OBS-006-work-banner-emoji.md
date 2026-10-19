---
id: KI-DESIGN-OBS-006
area: OBS
title: Work banner emoji
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

# Work banner emoji

## Goal

The Observatory design records that the Work tab prints the work model's banner glyphs unchanged, as the one known exception to "no emoji".

## Context

The design says no emoji. The Work tab prints the banner notation of the work model (the emoji for the worker, the supervisor, a named target, on hold and finished) exactly as the standard writes it, and Kit chose to keep one notation everywhere. Source: [PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md), "The Work tab's banner notation stays". Whether the notation itself should change is a separate question, KI-DESIGN-OBS-015.

Decided by: the app wins (ki-design's own hand-off rule, stated in `-/observatory-handoff/INSTRUCTION.md` and in the design spec's "How to use this spec"). ki-design follows the app and decides nothing on the Observatory's behalf.

## Boundary

This record changes only how the design states the rule. The notation question is KI-DESIGN-OBS-015.

## Current state

`docs/design-review/observatory/OBSERVATORY-DESIGN.md` §1 says "No emoji" without exception.

## Steps

- [ ] Name the Work tab's banner notation as the exception in the design spec's §1, pointing to the open question.

## Files touched

`docs/design-review/observatory/OBSERVATORY-DESIGN.md`

## Verify

§1 names the exception and points to the open banner-glyph question.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record: the app-wins rule already authorises following the app, and the Observatory's own record carries the decision.

### Specifications

The Observatory design spec's §1 names the exception.

### Guides

No guide change: no contributor procedure changes.

### Roadmap

None: no follow-on work in ki-design.

## Discussion

### Origin

Carried by the Observatory build thread's design hand-off of 19 October 2026, which answered the "Reporting back" section of `-/observatory-handoff/INSTRUCTION.md`. Kit relayed it and asked for each item to be captured here. Following the work-item standard, this record links the Observatory's decision records and specifications, not its roadmap records.
