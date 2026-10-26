---
id: GDR-KI-DESIGN-008
title: 'The Capital and the non-combative principle'
date: 2026-10-18
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-008: The Capital and the non-combative principle

## Context

The design work had drawn an island's civic heart as a walled Citadel and given the local app a third building there, the Tower. A Tower and a Citadel read as dictatorial and fortified beside the friendlier Library and Council Hall. On 18 October 2026 Kit decided: "I think it's capital... Let's stay with something which isn't considered to be Combative." Knowledge Islands Principal recorded it as GDR-KI-PRINCIPAL-011, _The Capital_.

## Decision

**The Capital is the civic heart of an island and the only name for it. The symbol language is non-combative.**

- The Capital holds the Library (canonical knowledge) and the Council Hall (governance).
- It is drawn as a civic square, open and welcoming, never a fortress: a civic quarter and square in Modern, a hilltop forum or acropolis in Ancient. It always spans a 7-hex flower and is never a single-hex building.
- Nothing fortifies: no citadels, keeps, battlements or fortified towers, and no walls around the Capital. The Lighthouse keeps its tall form because it guides, not guards. Civic towers, a clock tower or a cloister tower, may stand as architecture, never fortified and never on the Capital.
- "Citadel" is retired as a term and the Tower is dropped.

## Consequences

- The tile id is `structure/capital`; `structure/citadel` stays as a deprecated alias that renderers and the validator resolve. The hex map model resolves `citadel` to `capital` too.
- The Capital has its own civic glyph, `capital`. The `citadel` and `tower` glyphs stay in the icon package, mapped to no symbol.
- No curtain wall is drawn around a territory's Principal knowledge base; it is revisited only in a form that does not read as a fortification.
- The Arcadia painting keeps variation 1 unchanged. A repaint that painted the Capital civic lost the original's haze and mood, so Kit kept the original; its tower beside the Library is part of the picture, not the retired Tower symbol (Arcadia handoff).

## References

- GDR-KI-PRINCIPAL-011, _The Capital_, in `ki-principal` (`Admin/Governance/Decisions/`).
- docs/spec/meaning.md and docs/spec/tiles-and-buildings.md.
