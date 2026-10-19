---
id: GDR-KI-DESIGN-018
title: 'The Causeway is the translation symbol; Bridge names the Act command'
date: 2026-10-19
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-018: The Causeway is the translation symbol; Bridge names the Act command

## Context

The canon's Symbol Library gave the Bridge the meaning "translation layer", drawn as a stone arched bridge. The local app also says Bridge for its Act job: the plan, confirm and receipt path every mutation goes through. One word with two meanings in one product confuses readers and drawings alike.

The open question recommended renaming the translation symbol Causeway. On 19 October 2026 Kit accepted the recommendation and confirmed it explicitly. `ki-principal` enacted it the same day as GDR-KI-PRINCIPAL-013.

## Decision

**The Causeway is the translation layer, and "Bridge" names only the local app's Act command.** A causeway joins two grounds across shallow water, so that what crosses keeps its footing on both sides. It is official.

- The symbol id is `causeway` and its glyph is `causeway`: a low stone causeway with culverts, water on both sides.
- `bridge` is an alias of `causeway` in `symbolAliases`, so references written before the rename still resolve. It is never reused as a symbol id.
- "Bridge" in copy means the Act command only. No bridge is drawn for the Act command; it is written as a word.
- The `bridge` glyph stays in `@knowledgeislands/icons`, mapped to no symbol, so removing it is not a breaking change. Nothing new uses it.

## Consequences

- `@knowledgeislands/symbols` 0.2.0 carries `causeway` and the `bridge` alias; `@knowledgeislands/icons` 0.2.0 adds the `causeway` glyph.
- `mcp-*` repositories, the translation layer in the app, are typed and drawn as the Causeway.
- The tile id is `structure/causeway`, with `structure/bridge` as a deprecated alias in `tileAliases` and hexmap's `structureAliases`, as the Capital's `citadel` is. The Modern set draws it as a low stone causeway on culverts across shallow water.
- The KI Website renames the symbol in its Field Guide when it next syncs the symbol library.

## References

- GDR-KI-PRINCIPAL-013, _The Causeway and the Mill_, in `ki-principal`.
- [docs/spec/meaning.md](../spec/meaning.md#the-canonical-symbols-how-they-are-drawn).
- [`@knowledgeislands/symbols`](../../packages/symbols/README.md).
