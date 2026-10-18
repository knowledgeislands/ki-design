# Brief: tile set — Ancient

## Goal

The painted, dusk-lit tile set for the public hero, the Living Map, the Arcadia page and posters: art, in the manner of Kit's mood boards and the [picture of Arcadia](arcadia-picture.md), with buildings as crisp silhouettes in the way of a classic isometric strategy game.

## Sequence

1. Produce the picture of Arcadia first; it fixes light, palette and detail.
2. Generate each tile against the same light, using the per-tile prompt below, at 2× (512 × 296 top face) or larger.
3. Normalise to the geometry in the [building standards](building-standards.md): cut to the hex template, remove the background, repaint plinths as hex, record anchor and footprint.
4. Paint condition decals (ivy, cracks, moss, fallen roof) as separate overlays under the same light.
5. Animate only what the [animation standard](animation-standard.md) lists, as sprite sheets.
6. Pack into atlases; write `packages/tiles/sets/ancient/manifest.json`.

## Inventory

The same contract as the Modern set, id for id:

| Kind | Ids |
| --- | --- |
| Terrain (12) | `grassland`, `forest`, `hills`, `mountain`, `coastal`, `cliffs`, `sand`, `river`, `marsh`, `snow`, `volcanic`, `ocean` |
| Structures (16) | `capital` (the Capital: Library + Council Hall around an open square on a 7-hex flower, drawn as a hilltop forum or acropolis, never walled; `citadel` is a deprecated alias), `library`, `council-hall`, `observatory`, `lighthouse`, `port`, `dock`, `rail-depot`, `airport`, `customs-house`, `bridge`, `workshop`, `mill`, `ruins`, `ancient-forest`, `cottage` |
| Decals (4) | `ivy`, `cracks`, `moss`, `fallen-roof` |
| Connectors (4) | `road`, `river`, `bridge-span`, `quay` |

## Per-tile prompt template

```text
A single isometric game tile for the Knowledge Islands Realm, painted in the same style, light and palette as the attached reference picture of Arcadia: dusk, warm lamp-light, deep navy sea, forest and moss greens, sandstone, restrained brass. Pointy-top hexagonal tile seen in 2:1 dimetric projection, light from the top-left, with a 48-pixel-deep stratified rock plinth, on a plain transparent or flat light-grey background so it can be cut out. Subject: <SUBJECT> in the <FAMILY> architectural family (<MATERIALS>), condition <STATE>. Crisp readable silhouette at small size, richly painted detail, no text, no people in close-up, no creatures, no crystals, no magic glow.
```

Substitute `<SUBJECT>` from the inventory and `<FAMILY>`/`<MATERIALS>` from the families table in the building standards.

## Judged by

Sits seamlessly beside its neighbours on the Arcadia map; matches the reference light; passes `validateTileSet`; under the image budgets.
