---
id: GDR-KI-DESIGN-037
title: 'The banner emoji stay the written notation; line glyphs may be a rendered form'
date: 2026-10-20
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-037: The banner emoji stay the written notation; line glyphs may be a rendered form

## Context

The work model's banner shows each piece of work's state with five emoji: the worker, the supervisor, a named target, on hold and finished. The design says no emoji, but Kit chose one notation everywhere, so the Observatory's Work tab prints the standard's glyphs unchanged ([PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md)). The notation belongs to the [`ki-coordination` standard's Banner section](https://github.com/knowledgeislands/ki-agentic-harness/blob/main/skills/change-management/ki-coordination/references/standards-coordination.md#banner) in `ki-agentic-harness`. ki-design drew five candidate line glyphs and asked (KI-DESIGN-OBS-015). On 20 October 2026, under the overnight authority, Kit took the recommendation (BANNER-GLYPHS a, option (b) in the question as asked).

## Decision

**The emoji stay the `ki-coordination` standard's written notation** in reports, terminals and commits. **A rendered surface, such as the Work tab, may draw the five single-colour line glyphs instead, always with the state's words beside them.**

## Consequences

- The five candidates in docs/briefs/banner-glyph-candidates.md stay proposed and outside `@knowledgeislands/icons` until the `ki-coordination` standard admits the rendered form. A hand-off to `ki-agentic-harness` asks it to.
- Once the standard admits it, the glyphs move into `@knowledgeislands/icons` under a new ICO record, `docs/spec/iconography.md` gains them, and the Work tab follows the standard.
- Until then, the Work tab keeps printing the standard's emoji, the one known exception to "no emoji" in the Observatory design.

## References

- KI-DESIGN-OBS-015.
- docs/briefs/banner-glyph-candidates.md.
