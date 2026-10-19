# Prompt library

Copy-paste prompts for image generation: the canon master prompt, the picture of Arcadia, and templates for terrain tiles, structure tiles, Port districts, explainer posters and icon tracing, with the negative list that ends every prompt. The rules they serve are in [docs/spec/illustration.md](../spec/illustration.md); the per-tile Ancient prompts are in the [Ancient prompt pack](ancient-prompt-pack.md), and the one-line glyph drawings in [glyph briefs](glyph-briefs.md).

## How to use the prompts

All prompts are written for ChatGPT image generation (or any capable image model). Paste the **master prompt** first, then the asset template, then the **negative list**. Replace `{…}` placeholders. For the Ancient set, also attach the chosen picture of Arcadia (`docs/briefs/references/arcadia.png`) as the style reference; the Ancient brief's shorter per-tile prompt is an equivalent. Generate at the largest square or 3:2 size available, then clean, normalise and slice to the [tile geometry](../spec/tiles-and-buildings.md#geometry).

## Master prompt (canon, verbatim)

```text
Create a premium Knowledge Islands visual in a calm, human-centred systems aesthetic. Blend elegant cartography, modern infographic design, organic interconnected knowledge systems, and subtle civilisational library influences. Use oceanic and natural colour palettes with deep blues, greens, sandstone, parchment, and restrained gold accents. The style should feel intelligent, timeless, exploratory, and structured - combining knowledge architecture, archipelago metaphors, woven connective fabric, and thoughtful technological futurism. Represent knowledge as a navigable ecology rather than a database. Prioritise breathable layouts, soft gradients, smooth curves, atmospheric depth, layered terrain, and calm infrastructural clarity. Motion and composition should evoke ocean currents, celestial navigation, and interconnected ecosystems. Avoid cyberpunk, harsh corporate aesthetics, neon colours, rigid technical diagrams, and generic AI imagery. Prioritise clarity, stewardship, wisdom, interconnectedness, and elegant systems thinking.
```

## The picture of Arcadia (verbatim from the brief)

The defining image of the Ancient set; every later tile is painted to its light and palette.

```text
[Visual Style master prompt], then: A legendary, timeless painted map-illustration of Arcadia, the origin island of the Knowledge Islands Realm, seen from a high three-quarter isometric angle at dusk. The island rises from a deep navy sea in hexagonal terraces whose cliff edges show the faint geometry of a hex grid at the shoreline. On the highest ground lies the Capital in pale limestone, an open civic square with no walls: a domed Library and a colonnaded Council Hall facing each other across it, lit from within. Below it, a Port town spreads to the coast: stone quays and wooden docks with small sailing ships, a caravan road winding inland, a tall mooring mast, and a customs house at the harbour gate. A domed observatory sits on a hill; a lighthouse stands on a far headland. Rivers run from the mountains to the sea past a watermill and a quarter of workshops. At the island's heart is an ancient forest of enormous old trees, untouched. On an outer ridge, honoured ruins of older buildings. Hundreds of small warm lamp-lights in windows and along roads; soft cloud banks drifting in from one edge; a fog bank where the map ends; gentle glints of light on the water and faint sea lanes curving away towards other islands. Painterly, richly detailed, calm and harmonious, in the tradition of illustrated atlases and environmental animation art, with buildings as crisp, readable silhouettes in the manner of a classic isometric strategy game. Palette of deep ocean blues, forest and moss greens, sandstone, parchment and restrained brass gold. No people in close-up, no text, no creatures, no crystals, no magic glow, no fantasy armour, no walls, towers or battlements around the Capital.
```

## Terrain tile

```text
[Master prompt], then: A single isometric terrain tile for a strategy-map tile set, {tileset: "Ancient — painted, dusk-lit atlas art" | "Modern — clean engraved linework with flat colour fills, no texture"}. The tile is one pointy-top hexagon seen in 2:1 dimetric projection, top face exactly filling a 256 × 148 pixel hexagon, with a 48-pixel-deep stratified rock plinth visible on the three front faces. Terrain: {terrain, e.g. "marsh: low wet ground, reeds, small pools, a few stepping stones"}. Variant {1|2|3}: vary only small details. Light from the top-left, warm, soft; shadows fall to the bottom-right. Palette: {island palette, e.g. "Archipelago: deep ocean #1b3a5c, moss #4a7a5a, forest #2d5a3d, sand #e3d3a8, brass #c8963c"}. Centred on a plain transparent or flat light-grey background, nothing outside the hex, no neighbouring tiles, no buildings, no text, no border.
```

## Structure tile (with family and condition)

```text
[Master prompt], then: A single isometric building sprite for a strategy-map tile set, {tileset}. Structure: {structure, e.g. "Library — a domed building with a colonnade, the island's canonical record"}. Architectural family: {family, e.g. "Classical observatory — pale limestone, domes, colonnades, telescopes"}. Footprint: {"one pointy-top hexagon" | "two adjacent hexagons, long axis running to the upper right" | "a flower of seven hexagons"}, seen in 2:1 dimetric projection, standing on a hexagonal, 48-pixel-deep stratified rock plinth; the building must not overhang the plinth by more than a sliver. Condition: {"thriving — lit windows, a thin wisp of chimney smoke, a small pennant" | "quiet — clean, unlit, still" | "weathered — moss and ivy on the walls, one cracked stone, a missing roof tile" | "ruined — roof partly fallen, broken walls, overgrown, honoured not grim"}. Light from the top-left; fine outlines in darkened local colour, never black. Crisp, readable silhouette at small size, like a classic isometric strategy game. Palette: {island palette}. Isolated on a plain transparent or flat light-grey background, no people, no text, no surrounding terrain beyond the plinth.
```

## Port district

```text
[Master prompt], then: An isometric Port district for a Knowledge Islands map, {tileset}, on a flower of seven pointy-top hexagons along a coastline in 2:1 dimetric projection. The Port is where knowledge enters and is exchanged, shown as distinct quarters of one port town: {include the modes this island has: "a wooden dock with small sailing boats (hand-carried material)", "a small rail depot with a platform canopy and a short line of track running inland (scheduled feeds)", "a tall mooring mast with a moored airship (long-range arrivals from other systems)", "a stone customs house with a barrier at the port gate (a governed boundary where things are checked)"}. Arrivals quay on the left, departures quay on the right. Stone quays, timber warehouses, carts, coiled rope, lamps. {family}. Light from the top-left at {"dusk with warm lamp-light" | "soft daylight"}. Palette: {island palette}. Small figures only, distant, unarmed, in practical clothes. No jets, no runways, no modern containers, no text.
```

## Illustrated explainer poster

```text
[Master prompt], then: A tall illustrated explainer poster, portrait 2:3, in a daylight watercolour style on warm parchment: small watercolour islands on a pale sea-glass blue sea (#d6e3e1), rounded parchment cards with thin hairline borders, each card headed by a coloured line icon inside a circular roundel, dashed coloured routes connecting cards and islands, and a band at the foot showing a numbered six-step loop titled with a tide motif. Subject: {subject, e.g. "how a Knowledge Island captures, connects and reflects: the Port receives material, routes carry it to the Library and Streams, the Observatory reviews it"}. Panels: {list panels}. Use generous whitespace, one idea per panel, a lighthouse islet in one top corner and a brass compass rose in a cartouche. Leave every text area blank or as soft placeholder lines so real typography can be set afterwards. Muted colours: ocean blue, teal, forest green, moss, sandstone, restrained gold, one desaturated rust for risk. No robots, no avatars of AI, no emoji, no neon, no heavy black outlines.
```

## Icon description for vector tracing

```text
A single line icon for tracing into SVG: {glyph id and one-line drawing from glyph-briefs.md, e.g. "lighthouse — tapered tower with a lamp room and two short light rays to one side, standing on a rock line"}. Drawn on a 24 × 24 grid with a 2-unit empty margin, uniform 1.5-unit stroke, round line caps and round joins, no fills except {none | "a small gold fill in the lamp"}, front elevation (not isometric), engraved cartographic character, geometric and calm. Dark ink line (#1a2030) on a flat parchment (#f5efe0) background, centred, large, high contrast, nothing else in the image — no shadow, no gradient, no texture, no text, no frame.
```

## Negative list (append to every prompt)

```text
Avoid: humanoid robots, androids, glowing eyes, AI brains, circuit boards, blockchain cubes, node-graph hairballs, cyberpunk, neon, bloom, lens flare, sci-fi HUDs, glossy 3D, plastic render, photorealism, photographs of real people, close-up faces, comic-book style, childish cartoon, clip-art, crystals, magic glow, spells, monsters, dragons, creatures of any kind, whales included, temples, religious buildings, fantasy armour, weapons, skulls, game UI, health or XP bars, percentages, scores, emoji, logos, watermarks, signatures, any text or lettering, pure black, pure white, oversaturated RGB colour.
```
