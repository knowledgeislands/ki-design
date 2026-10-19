# @knowledgeislands/hexmap

A pure TypeScript hex map engine: no DOM, no dependencies beyond the tokens. It covers coordinates, flat and isometric geometry, the `islandmap/v1` model and a deterministic SVG renderer.

## Coordinates

Pointy-top axial `{ q, r }` (`r` grows southward). Directions, in neighbour-mask bit order: e, ne, nw, w, sw, se.

- `hex`, `hexKey`, `parseHexKey`, `hexEquals`, `hexAdd`, `hexScale`, `axialToCube`, `cubeToAxial`, `hexRound`
- `neighbour(h, d)`, `neighbours(h)`, `distance(a, b)`, `ring(c, k)`, `spiral(c, k)`, `line(a, b)`
- `axialToOffset` / `offsetToAxial` (odd-r)
- `neighbourMask(h, test)` gives a 6-bit mask for picking coast, river and road variants; `maskDirections(mask)` names the bits.

## Geometry

- Flat top-down: `toPixel(h, size)`, `fromPixel(p, size)`, `hexCorners(h, size)`.
- Isometric (the tile sets' 2:1 dimetric): `isoPosition(h, w = 256)` is the centre of the top face; `isoProject(h, w = 256)` is the top-face polygon (256 × 148 at the reference width, rows stepping 111, odd rows shifted 128); `isoSort(hexes)` gives painter's order.

## Island maps

```ts
interface IslandMap {
  schema: 'islandmap/v1'
  id: string
  name: string
  hexes: { q: number; r: number; terrain: TerrainName; structure?: string; condition?: Condition }[]
  routes?: { from: Axial; to: Axial; kind: 'active' | 'pending' }[]
  labels?: { q: number; r: number; text: string }[]
}
```

`validateIslandMap(value)` collects every problem (`{ ok: true, map } | { ok: false, errors }`); `assertIslandMap` throws instead.

`structureAliases` maps deprecated structure ids to their replacements (`citadel` is `capital`, GDR-KI-PRINCIPAL-011; `bridge` is `causeway`, GDR-KI-DESIGN-018) and `resolveStructure(id)` follows them; the renderer resolves before asking for a glyph or a name, so an older map that still says `citadel` draws the Capital and one that says `bridge` draws the Causeway.

## Rendering

```ts
import { assertIslandMap, renderFlatSvg } from '@knowledgeislands/hexmap'
import { iconBodies, isIconName } from '@knowledgeislands/icons'
import arcadia from '@knowledgeislands/hexmap/examples/arcadia.islandmap.json' with { type: 'json' }

const svg = renderFlatSvg(assertIslandMap(arcadia), {
  theme: 'night',
  glyph: (id) => (isIconName(id) ? iconBodies[id] : undefined),
  selected: { q: 0, r: 0 }
})
```

`renderFlatSvg` draws a naturalist's chart, layer by layer (`renderFlatLayers` returns the same drawing without the root `<svg>`):

- **Paper and neat line**: the theme's paper with a hairline frame (`frame: false` leaves them out).
- **Sea**: the theme's sea token, a pale band of shallows along the coast edged by a hairline water line.
- **Terrain**: token fills with a low-contrast `<pattern>` per terrain, so terrain is never colour alone: grass tufts, pine ticks, contour arcs, peaks, shore dashes, cliff hatching, sand stipple, river flow lines, marsh reeds, snow dots, volcanic fissures (gold) and sea waves. Each pattern's pen is ink or parchment, whichever reads better on its fill. `patterns: false` turns them off.
- **Coastline**: a deep-ink stroke along every land edge that meets the ocean, joined into runs.
- **Routes**: brass (`#c8963c`) quadratic curves with round caps on a faint paper casing; pending ones are dashed.
- **Structures**: the glyph from the injected `glyph` resolver (inner markup of a 24-grid line glyph), in ink on a small parchment roundel with a hairline ring, with a `<title>`. Without a resolver, or for an unknown id, a small neutral marker. The engine has no dependency on the glyph set.
- **Labels**: small capitals (`font-variant: small-caps`, Cormorant SC by default, `labelFont` to change) on a paper halo (`paint-order: stroke`), so they read on any terrain.
- **Selected**: a brass ring inside the hex.

`theme: 'night'` is the same chart by lantern-light: navy paper, parchment ink, the night sea, and terrain fills mixed 45 % into navy (`nightTerrain` from the tokens). Output is byte-stable: hexes are drawn north to south, numbers are rounded to two decimals, ids are prefixed per map (`ki-map-<id>-…`). `layoutFlat` returns the same geometry as data, which `<ki-hexmap>` renders.

## Example

`examples/arcadia.islandmap.json` is Arcadia, hand-made on 61 hexes: a sea ring, a ragged coast, the Old Wood around an ancient-forest heart, a mountain core with a snowfield, the Capital on the central high ground, the Observatory on a hill, a Lighthouse on the eastern headland, a river with a Mill running to a marshy mouth, a Workshop quarter, a Library, ruins on the north-west ridge and the Port on the south coast. `bun run build` re-renders `examples/arcadia.svg` (day) and `examples/arcadia-night.svg` with the icons package as the glyph resolver (a development dependency only); a test checks the committed SVGs match. `arcadia.png` and `arcadia-night.png` are Chromium renders of them for review.
