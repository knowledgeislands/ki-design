---
id: GDR-KI-DESIGN-020
title: 'Symbol statuses and meanings follow ki-principal'
date: 2026-10-19
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-020: Symbol statuses and meanings follow ki-principal

## Context

When the old DESIGN.md was split into the spec, `symbols.ts` and the old DESIGN.md disagreed on several statuses and meanings, and `ki-principal`'s Symbol Library settled some of them. Bridge and the Cartographic grid were agreed in the data but canonical in `ki-principal`; Lantern and Storm were official in the data but named nowhere in the canon; Fog appears in the canon only in the terrain language. Meanings such as Pillars, Streams, Territory and Dock were worded differently in each place.

On 19 October 2026 Kit accepted the recommendations. The same day `ki-principal` enacted the Causeway and the Mill (GDR-KI-PRINCIPAL-013), the steward roles (GDR-KI-PRINCIPAL-014), the lore sheet (GDR-KI-PRINCIPAL-015) and territory = archipelago (SDR-KI-PRINCIPAL-005, amended).

## Decision

**`symbols.ts` follows `ki-principal`: a symbol is official when `ki-principal` lists it, and its meaning starts from `ki-principal`'s wording wherever `ki-principal` has one.** The symbol data keeps its own phrasing only where `ki-principal` says nothing.

| Symbol | Status | Why |
| --- | --- | --- |
| Causeway (was Bridge) | Official | Canonical symbol, "Translation layer" (GDR-KI-PRINCIPAL-013) |
| Cartographic grid | Official | Canonical symbol, "Structure / orientation" |
| Library | Official | Held in the Capital (GDR-KI-PRINCIPAL-011) |
| Mill | Official | Canonical symbol, "Operational systems" (GDR-KI-PRINCIPAL-013) |
| Territory | Official | Drawn as an archipelago (SDR-KI-PRINCIPAL-005, amended) |
| Steward roles | Official | Seven roles (GDR-KI-PRINCIPAL-014) |
| Lantern | Agreed | Not yet named in `ki-principal` |
| Storm | Proposed | Not yet named in `ki-principal`; never shipped as settled |
| Fog | Proposed | The canon uses fog as a terrain metaphor (experimental ideas); here it is a map state over any terrain |

- Meanings take the Symbol Library's words (Island "Domain of knowledge", Route "Relationship", Reef "Risk / ambiguity" and so on), the Structure chapter's for the zones (Pillars "Internal knowledge", Streams "Knowledge in motion", Calendar "Time-based notes"), the Port modes table for the Dock, and the Agents chapter for the roles.
- Territory and Archipelago use [GDR-KI-DESIGN-015](GDR-KI-DESIGN-015-repositories-are-islands-territories-are-archipelagos.md)'s words: a territory is an archipelago, its islands in one sea region.
- The Guardian role and the Whale song signal are retired: the Guardian is not adopted (boundary-keeping is the Steward at the Council Hall) and creatures are ruled out of the lore.

## Consequences

- `@knowledgeislands/symbols` 0.2.0 carries the statuses and meanings; `guardian` and `whale-song` join `retiredSymbols`, and the `role-guardian` glyph stays, mapped to no symbol.
- When `ki-principal` changes a meaning, `symbols.ts` follows in the next release; a disagreement is listed in OPEN.md rather than settled here.
- The KI Website's Field Guide shows the new statuses when it next syncs the symbol library.

## References

- `ki-principal`: `Pillars/Aesthetics/Symbol Library`, `Pillars/Aesthetics/Visual Style`, `Pillars/Philosophy/Model/Conventions/Structure` and `Pillars/Philosophy/Model/Agents`.
- `packages/symbols/src/symbols.ts`.
