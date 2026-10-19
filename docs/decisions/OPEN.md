# Open questions

The design questions still open after 19 October 2026, each with its recommendation and how to draw meanwhile. They are not decision records: when Kit answers one, the answer becomes a record in this folder (see the [index](README.md)) and the entry leaves this list. A question about meaning is also carried into `ki-principal`.

On 19 October 2026 Kit answered every question listed on 18 October; the answers are GDR-KI-DESIGN-018 to 036. What remains needs facts that are not yet in hand rather than a choice, apart from one question the Observatory's design hand-off raised on 19 October 2026: the banner glyphs.

## Design questions

### Art ownership

Who owns AI-generated art, and under which generator terms (KI-DESIGN-ART-002)?

- **Status:** the policy until then is recorded in [GDR-KI-DESIGN-035](GDR-KI-DESIGN-035-art-unlicensed-until-recorded.md); the answer itself is owed by ART-002.
- **Recommendation:** record the answer in ART-002 once the generator terms are read, then update GDR-KI-DESIGN-035 and the set manifests' `licence`.
- **Meanwhile:** treat references and generated art as unlicensed.

### Where the further references are

[GDR-KI-DESIGN-035](GDR-KI-DESIGN-035-art-unlicensed-until-recorded.md) files the further isometric building images into `ki-principal`'s `Pillars/Aesthetics/Isometric Tiles`, marked as references, but where those images are now is not known.

- **Recommendation:** Kit points to them, or they are dropped from the plan.
- **Meanwhile:** nothing to file.

### Banner glyphs

Should the work model's banner keep its emoji, or gain line glyphs? The banner shows each piece of work's state with five glyphs: the worker, the supervisor, a named target, on hold and finished. The design says no emoji, but Kit chose one notation everywhere, so the Observatory's Work tab prints the standard's glyphs unchanged ([PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md)). The notation belongs to the [`ki-coordination` standard's Banner section](https://github.com/knowledgeislands/ki-agentic-harness/blob/main/skills/change-management/ki-coordination/references/standards-coordination.md#banner) in `ki-agentic-harness`, not to ki-design or the app (KI-DESIGN-OBS-015).

- **Options:** (a) keep the emoji as the only notation; (b) keep the emoji as the standard's text notation and add five single-colour line glyphs as an optional rendered form, drawn with the state's words beside them; (c) replace the emoji with line glyphs everywhere.
- **Recommendation:** (b). The emoji stay the notation in reports, terminals and commits, where they read anywhere; a rendered surface such as the Work tab may draw the line glyphs instead. Any change goes to the `ki-coordination` standard first, and the Work tab follows it. Five candidates are drawn, marked proposed, in [docs/briefs/banner-glyph-candidates.md](../briefs/banner-glyph-candidates.md).
- **Meanwhile:** the Work tab prints the standard's emoji unchanged; it is the one known exception to "no emoji" in the Observatory design. Nothing is switched over.
