# Arcadia painting: chosen reference and handoff

## Owner selection — 18 October 2026

Kris chose **variation 1** as the defining Arcadia art reference: “100% the variation one”. Its atmosphere and the sense of distance towards other islands are the approved direction for Arcadia and the home page. Preserve those qualities when refining the geography or preparing production assets.

The chosen reference is [references/arcadia.png](references/arcadia.png), an unchanged copy of [variation 1](references/arcadia-1.png). [Variation 2](references/arcadia-2.png) and [variation 3](references/arcadia-3.png) are retained as alternatives, not competing chosen references.

This records approval of the visual direction. It does not claim the painting meets every technical requirement in the [brief](arcadia-picture.md), enact new symbol meanings, or approve a production release.

## What the other design work should carry forward

- **Atmosphere:** calm, richly painted dusk; deep navy sea, forest and moss greens, warm pale stone and hundreds of small inhabited lights. Buildings retain clear civic silhouettes within a landscape that feels lived in.
- **Distance and exploration:** the far islands and atmospheric depth give Arcadia somewhere to go. Kris identified them as a possible invitation to the wider world map. Preserve the distant shores; the navigation interaction still needs design.
- **Home page:** variation 1 establishes the intended ethos. Work out the hero crop and copy placement around this atmosphere rather than substituting a flatter or more diagrammatic treatment.
  - *Done on 18 October 2026.* The painting is the home hero on knowledgeislands.info, with the copy on a navy scrim over the open sea at the left and the Citadel and Port kept clear. The engraved Modern chart moved down to the Arcadia section. `/arcadia/` opens the same way, then shows the chart. The site vendors this exact file, pinned to ki-design commit `c73cefe`, so a new painting reaches the site only by a deliberate re-pin.
- **Personal islands:** Kris wants people eventually to create islands in their own styles. Establish Arcadia first; retain personal island creation as a future product ambition, with its mechanics and implementation still to be planned.
- **Ancient tiles:** use the chosen image for light, palette, atmosphere and detail, following the [Ancient tile brief](tile-set-ancient.md). The painting is a reference, not a tile atlas or a replacement for the tile geometry and building contracts.

## Reference guidance

Use only `mood-website-dusk-a.png` and `mood-website-dusk-b.png` for palette, light and density, and `explainer-hex-and-isometric.png` for isometric hex geometry. Kris corrected the reference guidance during this session: ignore the other explainer images for this work, even while they remain in the reference directory. No reference images were moved or removed here.

The coast is one **Port**, with dock, rail depot, airport drawn as a mooring mast with an airship, and customs house. Follow DESIGN.md sections 2, 3 and 9 and GDR-KI-PRINCIPAL-010 in `ki-principal`; the Harbour is retired as a system symbol.

## Variation review against the brief

### Variation 1 — chosen

**What works:** strongest approved atmosphere and sense of distance. All nine required places are represented: Citadel, Port, Observatory, Lighthouse, Streams, Ancient Forest, Ruins, fog at the edge of known, and trade routes towards other islands. Major civic silhouettes remain readable at reduced scale; the palette fits and no Never-list item is apparent.

**What to change:** make the hexagonal terraces, rail tracks and customs barrier more recognisable; place the Citadel on the highest ground rather than below the mountain peaks. Test the actual home-page copy over the painting: the brighter sunset and activity at the left may compete with it. At 25% scale, the small Port details need particular attention. No major place is absent, but those details are unclear.

### Variation 2 — retained alternative

**What works:** a complete island composition, all nine places represented, distinct civic silhouettes and four Port districts, matching palette and useful sea space for copy. No Never-list item is apparent.

**What to change:** strengthen the hex terrace geometry, customs barrier and mountain sources of the Streams; verify the smaller infrastructure at 25% scale and with real hero copy. No major place is absent. This is not the selected direction.

### Variation 3 — retained alternative

**What works:** generous navy space for hero copy, a strong ancient forest, readable railway and distinct civic buildings. All nine places are represented, the palette fits and no Never-list item is apparent.

**What to change:** restore the cropped right coastline, clarify hex terraces and the customs inspection boundary, and raise the Citadel above the mountain ridge. Verify the smaller infrastructure at 25% scale. The complete island outline is missing from the frame. This is not the selected direction.

## Asset limits and provenance

All three PNGs are **1672 × 941 pixels**, the native files returned by the built-in image generation tool despite requests for a larger landscape canvas. They fall below the brief's minimum width of 2048 pixels. They have not been upscaled or retouched; `arcadia.png` is byte-identical to `arcadia-1.png`.

Retain the selected image's atmosphere when resolving these limitations. The [exact generation prompts](arcadia-generation-prompts.md) are preserved for follow-up work; a prompt's requested feature or dimension is not evidence that the generator delivered it.

Treat the generated art and references as unlicensed until the repository's art-licensing decision is recorded. This handoff does not publish or deploy the images, change the design canon, implement the home page, or close the roadmap record.
