---
title: Illustration and art direction
status: draft
updated: 2026-10-19
---

# Illustration and art direction

The world has three looks: the **Modern** tile set (engraved line, flat fills), the **Ancient** tile set (painted, dusk-lit atlas art) and the **Illustrated explainer** diagram style (daylight watercolour). The canon balance is 70 % infographic clarity to 30 % illustrative warmth. AI is drawn as infrastructure, never as a humanoid, and people are drawn small and grounded. Since 20 October 2026, Ancient is the only isometric tile set; Modern's engraved line and flat fills remain for flat top-down charts and diagrams, and its isometric tiles are frozen ([GDR-KI-DESIGN-038](../decisions/GDR-KI-DESIGN-038-ancient-is-the-only-isometric-tile-set-the-flat-chart-keeps-its-engraved-treatment.md)). This file sets the directions, the balance per surface, how agents are shown and what is never drawn. Copy-paste prompts are in the [prompt library](../briefs/prompt-library.md); the briefs that commission art are in [docs/briefs/](../briefs/README.md).

## The three directions

The two tile sets and the explainer style are recorded in [GDR-KI-DESIGN-004](../decisions/GDR-KI-DESIGN-004-two-tile-sets-and-the-illustrated-explainer-style.md).

| | **Modern** (tile set) | **Ancient** (tile set) | **Illustrated explainer** (diagram style) |
| --- | --- | --- | --- |
| Reference | The "Hex tile kit" sketch on the early design canvas, and the "Hex maps + isometrics" board: clean engraved linework, flat token fills | The two dusk website mood boards; "Age of Empires-esque"; the chosen painting of Arcadia (`docs/briefs/references/arcadia.png`) | The "How gstack works" and "Agentic operating system" boards |
| Character | Crisp engraved outlines in deep ink; flat terrain fills ([colour.md](colour.md)) with each terrain's small ink motif; buildings as simple isometric line drawings with low-opacity fills; brass only for small accents | Painted, dusk-lit atlas art: layered terrain, lamp-lit dense settlements, cloud banks, glints on navy water; buildings crisp and readable as silhouettes at small scale | Daylight watercolour islands on a pale sea; parchment cartouches; coloured line icons in roundels; dashed routes; a tide loop at the foot |
| Light | Even, shadowless, or one flat 15 % shade on south-east faces | Low warm sun from top-left at dusk, warm window light, cool sea | Soft overcast daylight, gentle cast shadows |
| Palette | Tokens exactly; island palette applied to fills | Navy and ocean dominant, forest and moss, sandstone, warm lamp gold; night is a tint layer | Pale sea (about `#d6e3e1`), parchment, greens; one tint per role column (teal, ocean, forest, gold, rust, moss), each desaturated |
| Used for | The local app, docs, diagrams, print, small sizes, the flat twin of everything | Public hero, Living Map, Arcadia, posters, archetype cards | Explainers, the Field Guide's "How the map works", architecture posters, decks |
| Do | Constant stroke weight; legible at 32 px; a pattern per terrain | Hundreds of tiny lights; fog at the map's edge; honoured ruins; ancient forest untouched | Generous whitespace; numbered steps; one idea per panel; real labels |
| Don't | Gradients, painted texture, perspective tricks | Glow, bloom, crystals, monsters, close-up faces, text baked into art | Heavy black outlines, saturated primaries, clip-art, crowded panels |

## The painting is the legend; the chart is the map

The painting leads and the chart follows ([GDR-KI-DESIGN-014](../decisions/GDR-KI-DESIGN-014-the-painting-as-the-home-hero.md)). The painted Arcadia is the home hero and the `/arcadia/` hero. The engraved Modern chart follows it: the Arcadia section on the home page, the chart on `/arcadia/`, diagrams and the local app. A chart / painting switch comes later, once the Ancient tiles exist.

## Reference images, in words

- _Dusk mood boards (two variants):_ a navy page with a full-bleed painted island seen from high three-quarter view, hex lattice faintly visible on its terraces; a pale civic Capital on the summit; districts labelled in dark translucent cartouches with Cormorant SC titles and a one-line subtitle ("The Archives — Memory & History"); a journey rail of six hex badges on parchment; archetype cards with painted thumbnails; a parchment principle strip of engraved glyphs; a compass rose in brass on parchment in the closing call to action.
- _Hex maps + isometrics board:_ a parchment explainer showing a hex topology beside its isometric render, then terrain swatches, settlements with leader-line labels, territory tint, routes (gold trade route, blue sea route), stacked data layers, and a four-step strip: hex layout → data / layers → isometric render → final map.
- _Explainer boards:_ tall posters on a pale blue sea; a lighthouse islet top-left; rows of rounded parchment cards, each headed by a coloured roundel glyph; small watercolour islands beneath each card; dashed coloured connectors; a bottom band titled "the tide" with six numbered roundels.
- _Canon sheets:_ hand-painted isometric tiles on a **square** grid under soft daylight (teal roofs, limestone domes, a 4×4 lighthouse landmark). Re-cut them to hexes ([tiles-and-buildings.md](tiles-and-buildings.md#footprints)). Their prop list includes crystals, which this system excludes.

## The 70 / 30 balance

Canon: **70 % infographic clarity, 30 % illustrative warmth.** In practice:

| Surface | Infographic | Illustrative |
| --- | --- | --- |
| Home hero | 30 | 70 (the one place the painting leads) |
| Voyage pages | 70 | 30 |
| Explainer posters | 70 | 30 |
| Field Guide | 80 | 20 |
| Docs | 95 | 5 (section header only) |
| Local app | 100 | 0 (flat Modern only, as data) |

Semi-flat, lightly painterly, premium infographic quality; detailed but clean; atmospheric without becoming fantasy art. No photorealism, comic-book, childish or clip-art styles.

## Agent representation

- Humans represent stewardship, interpretation, context, wisdom and judgement. AI agents represent augmentation, operational scale, synthesis, continuity and infrastructure support. They coexist and collaborate; neither dominates.
- **AI is drawn as infrastructure, never as a humanoid.** Show AI work as the things it moves and tends: vessels on currents, lit lanterns along a route, a waterwheel turning, an airship at the mooring mast, light in the Observatory. Never robots, androids, glowing eyes, brains or circuit faces.
- People are drawn small, grounded and diverse (age, build, skin tone, dress), in practical clothes of no single period, carrying their role's tool. No close-up faces in brand art. A figure is at most 1/12 of the image height, except in a deliberate role portrait in the Field Guide.
- In diagrams, a worker is a **role glyph** plus a label ("Archivist — Claude Code"), never an avatar.
- Explainer boards that draw agents as islands are wrong for this system: agents work _on_ islands.

## Never draw

Humanoid robots; glowing evil AI; neon; cyberpunk cities; circuit boards; blockchain cubes; node-graph hairballs; crystals; magic glow or spell effects; monsters or creatures of any kind, whales included ([GDR-KI-DESIGN-030](../decisions/GDR-KI-DESIGN-030-the-lore-sheet-following-gdr-ki-principal-015.md)); temples or religious buildings; fantasy armour; weapons; skulls; game UI (XP bars, health bars, "map completion 34 %", "96 % harmony"); emoji; third-party logos inside the art; text baked into images; photographs of real people; pure black or pure white; walls, towers or battlements around the Capital, and fortified towers anywhere (a civic clock or cloister tower is architecture, never on the Capital).

## Licensing

Treat references and generated art as unlicensed until the art-licensing decision (KI-DESIGN-ART-002) is recorded. Describe the style in our own words; the "Ghibli-like" reference in early material is a style risk to state plainly, and studio names stay out of prompts ([GDR-KI-DESIGN-035](../decisions/GDR-KI-DESIGN-035-art-is-unlicensed-until-its-licensing-is-recorded.md)). Who owns the art is still in [OPEN.md](../OPEN.md).
