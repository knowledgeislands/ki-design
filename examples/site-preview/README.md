# Site preview: the Voyage and the Atlas

A static preview of the redesigned knowledgeislands.info, built from this repository's design system. It is a preview only: nothing here touches `apps-knowledgeislands.info`.

## Open it

```sh
bun examples/site-preview/serve.ts      # http://127.0.0.1:1677
```

Or open `examples/site-preview/index.html` directly in a browser: everything is inlined or relative, so it works from `file://`. Fonts (Cormorant Garamond, Cormorant SC, Inter) come from Google Fonts, so the type falls back to Georgia and the system sans when offline.

To regenerate the drawn parts after changing the map, glyphs, symbols or tokens:

```sh
bun examples/site-preview/build-hero.ts    # hero-arcadia.svg, spliced into index.html
bun examples/site-preview/build-pages.ts   # sprite, header, footer, rail, plates, Field Guide cards and panels
```

Both scripts import package source by relative path (`packages/hexmap/src/geometry.ts`, `packages/icons/src/icons.generated.ts`, `packages/symbols/src/symbols.ts`, `packages/tokens/tokens.json`), so they need no workspace install. They only rewrite the blocks between `<!-- name:start -->` and `<!-- name:end -->` markers; everything else in the HTML is hand-written. `assets/tokens.css` is a copy of `packages/tokens/dist/tokens.css` (run `bun run build` in `packages/tokens` and copy it again if the tokens change).

## What it shows

**`index.html` — the Voyage home.** The live site's copy, in its order, as the spine:

1. Header: the canon logo roundel (cropped from `ki-principal/Pillars/Aesthetics/Logo/logo.png`, not redrawn) and wordmark; the **Voyage** group (Philosophy · Model · Arcadia · Landscapes · Create) and the **Atlas** group (Field Guide · Docs · Specifications · Projects); the one brass **Enter Arcadia** button. Below 1260 px it collapses into a Menu disclosure that works without JavaScript.
2. Hero: "Knowledge is a civilisation question." with the real sub-copy and two buttons; on the right, Arcadia drawn from `packages/hexmap/examples/arcadia.islandmap.json` in the Modern set — pointy-top hexes in 2:1 dimetric (top face 256 × 148 scaled to 88 px, row step 111, odd rows offset 128, 48 px plinth with strata), light from the top-left, terrain motifs, structure glyphs from `packages/icons` on a paper halo, brass lamps (8-frame flicker, still under reduced motion), sea lanes with vessels, fog at the edge, and five cartouches with leader lines (the Citadel, the Port, the Observatory, the Streams, the Ancient Forest). Beneath it, the districts as a text list: the map's text equivalent and, at phone width, where the cartouches go.
3. The Foundation: Information, Knowledge, Wisdom drawn as depth — one island cross-section rising from the shallows through inhabited land to the ancient forest on high stone.
4. The Cycle: Capture at the Port, Connect along the Routes, Reflect from the Tower and Observatory, on a tide loop that returns to the Port.
5. The Home: the Capital as a plate — the Citadel's seven-hex flower (Library, Council Hall, Tower around the square), then Calendar, Pillars, Resources, the Council Hall, Streams and the Port, in glyphs rather than emoji.
6. The Wider Picture: Island, Territory, Archipelago, Agents, and "Agents, human or AI, are workers."
7. Arcadia is the living instance: the same map by daylight in a deckled plate.
8. The journey rail (The Problem · A New Paradigm · The Islands · Stewardship · Landscapes · Create), the six canon principles in canon words and order, and the closing "Tools change. Landscapes endure."
9. Footer split into the Voyage and the Atlas.

**`field-guide.html` — the Atlas's Field Guide.** One card per entry in `packages/symbols` (54), grouped by category with a filter (toggle buttons; without JavaScript every group shows): glyph roundel, name, status badge (Official · Agreed · Proposed, proposed dashed), id, meaning and notes. Entries without a glyph show a dashed empty roundel and say "No glyph yet". Each group links back to where the Voyage explains it. It ends with "How the map works": hex topology → data and layers → isometric render → the map, all drawn from the Arcadia data.

Screenshots at 1440 and 390 px are in `screenshots/`.

## What changes against the live site

- Structure: two halves, the Voyage (read once, in order) and the Atlas (returned to). The nav and footer are grouped that way; the Field Guide is new.
- Hero: a map of Arcadia replaces the faint decorative island; the third hero button (Get Started) moves to the Atlas (Docs). Two buttons remain.
- Type and colour: Cormorant Garamond / Cormorant SC / Inter replace Playfair Display; the palette is the token set, with brass text on parchment in `#8a5a12`. No drop shadows, no white cards: parchment, mist and navy surfaces with hairlines.
- Copy, kept word for word except:
  - **Harbour → Port** in the Cycle ("The Port … receives everything") and the Home ("enters through the Port"; the "Harbour — Port of entry" tile reads "Port — Port of entry, in any mode"). Each change carries an HTML comment.
  - The Cycle's third place reads "The Tower and Observatory" (was "The Observatory"), after the canon cycle in DESIGN.md 2.3.
  - The Archipelago card: the live copy calls archipelagos a grouping "distinct from territory". That reading was withdrawn on 2026-10-18 (a territory is drawn as an archipelago), so the card now says so. The section's lead paragraph is unchanged and may want the same edit.
  - Small tags under the four Wider Picture cards, the "Agents, human or AI, are workers." line, the Foundation layer labels and the journey rail's one-liners (from the dusk mood boards) are new.
- The Home's emoji (📅) and the misused icons (lighthouse for the Council Hall, compass for Pillars) are replaced by glyphs with the right meanings.
- Links: Philosophy, Model, Docs, Projects and Specifications go to the live site; Arcadia goes to the Arcadia section; Landscapes and Create go to their rail entries, marked "Page planned".

## What waits on the Ancient art

- **The hero painting.** The Chart hero is meant to be the painted, dusk-lit Ancient Arcadia (DESIGN.md 9.1, 12.2). The painting now exists (`docs/briefs/references/arcadia.png`, variation 1) and the live site uses it as its hero; this preview still shows the Modern set drawn from the hex data. Swapping is a change to the hero block only: the cartouches, district list and alt text stay.
- Arcadia's daylight plate, the banner art and the archetype cards for Landscapes (not built here) all want the Ancient set.
- Real structure sprites. The map uses line glyphs standing on hexes; the Modern tile set's isometric buildings (and the Citadel drawn as three buildings on its flower) will replace them.
- Elevation. `islandmap/v1`'s example carries no elevation, so the renderer derives it from terrain (coast 0 → snow 4). The full model's `elevation` field should drive it.

## Notes for the design system

- The hero, the Cycle and the Home plate predate GDR-KI-PRINCIPAL-011: they still show the Citadel and the Tower, where the live site now shows the Capital (Library · Council Hall) and the Observatory as the app's mark. The preview is not redrawn for it.
- Some `packages/symbols` entries differ from DESIGN.md section 3 (for example Observatory's meaning reads as the local app, where DESIGN.md has insight / analytics and draws the app as the Tower; several roles borrow structure glyphs). The Field Guide renders the package as it stands; reconciling them is a symbols change.
- No horizontal scroll at 390 px (16 px gutters); the Field Guide's filter row scrolls inside its own width. Reduced motion stops the lamps and the scroll reveal. Text pairs meet 4.5:1.
