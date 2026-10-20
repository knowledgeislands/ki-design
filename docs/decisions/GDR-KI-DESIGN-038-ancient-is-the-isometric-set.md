---
id: GDR-KI-DESIGN-038
title: 'Ancient is the only isometric tile set; the flat chart keeps its engraved treatment'
date: 2026-10-20
status: current
decision_type: governance
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
---

# GDR-KI-DESIGN-038: Ancient is the only isometric tile set; the flat chart keeps its engraved treatment

## Context

Two tile sets were planned: Modern, engraved and flat-filled, drawn as v0 in `packages/tiles/sets/modern/`; and Ancient, painted from the picture of Arcadia. On 19 October 2026 Kit decided against the Modern set: "I'm gonna avoid the modern tile set. I want ancient ones now, please." The same evening he confirmed that the top-down chart stays as it is, and named the two map scales: the Territory Map, flat and top-down, and the Island Map, isometric and painted ([maps.md](../spec/maps.md#two-scales-the-territory-map-and-the-island-map)).

## Decision

**Ancient is the only isometric tile set.** Isometric maps, the Island Map and the site's Living Map, are drawn in the painted Ancient style, and no new Modern isometric art is made.

**The flat top-down chart is not affected.** The Territory Map, the local app's Known Lands chart and diagrams keep the engraved line and flat fills that Modern defined. From now on "Modern" names only that flat treatment.

## Consequences

- **The Modern isometric tiles stay in the repository, frozen.** They remain the tile contract's reference implementation and test fixture until the Ancient set passes `validateTileSet`. Whether they are then removed is a later decision.
- **The Living Map has no set switcher.** Its isometric rendering is Ancient only. `<ki-hexmap>` keeps `tileset="modern"` only for that fixture and the flat renderer.
- **This amends [GDR-KI-DESIGN-014](GDR-KI-DESIGN-014-the-painting-as-home-hero.md).** The painting still leads. The engraved isometric chart now shown below it on the home page and on `/arcadia/` (`arcadia-iso`) is interim. It is replaced by the Ancient Island Map of Arcadia once that exists, and the site keeps the flat Territory Map of the islands.
- **The local app is unchanged.** Its Known Lands chart is the flat treatment. An isometric toggle in the app would draw Ancient.
- **Aligned with this record:** `maps.md`, `illustration.md`, `tiles-and-buildings.md`, `components.md`, the glossary, `DESIGN.md` and the briefs README. The [Modern brief](../briefs/tile-set-modern.md) is kept as the record of the frozen v0.

## References

- [maps.md](../spec/maps.md#two-scales-the-territory-map-and-the-island-map): the two map scales.
- [tile-set-ancient.md](../briefs/tile-set-ancient.md): the Ancient surface style.
