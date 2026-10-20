# Matching Council Hall A — 20 October 2026

The owner selected Council Hall A from the 19 October lighting study as the target for lighting and painted finish, explicitly retaining its warmth and detail. The earlier agent recommendation to reduce that warmth is superseded. This follow-up makes grassland and snow seven-hex flowers for review alongside that selected hall; it does not approve these new candidates or expand the full tile set.

## Reference and method

- Sole attached reference on each call: ../2026-10-19-lighting-study/council-hall-A.png, the selected original. The owner supplied its appearance in chat and agreed to using it as the reference for this follow-up. No Arcadia reference or geometry template was attached.
- Tool: built-in image_gen.imagegen; no model identifier exposed. transparent_background=true on both calls.
- Two independent generations, one attempt per subject, no retries or edits. Both originals are saved byte-for-byte without cropping, resizing or retouching.
- Requested geometry: one centre pointy-top hex and six neighbours, level, straight-on 2:1 isometric, shallow rock plinth beneath every exposed edge. Direct hex painting, no square intermediate.
- The selected hall remains unchanged in the previous study folder. Its approval covers lighting and finish; its landscaping and geometry are not automatically adopted as requirements.

## Saved file measurements

| Candidate | Pixels | Mode | Alpha range | Fully transparent pixels | Attempts |
| --- | --- | --- | --- | --- | --- |
| grassland.png | 1774 × 887 | RGBA | 0–255 | 736461 | 1 |
| snow.png | 1774 × 887 | RGBA | 0–255 | 737449 | 1 |

## Review observations

Both returned previews show recognisable seven-cell flowers, warm upper-left highlights, cool shadows and tactile painted rock. Neither reproduces the Hall building. These are candidates for owner comparison rather than validated production geometry.

- Grassland: the green and warm highlight relationship follows the selected hall, but the result is more uniformly bright and golden. Repeated shrub clumps and larger rocks exceed the requested sparse planting. The outer cells can read as mounded, and vegetation extends onto the plinth in places.
- Snow: cool blue-grey shade and warm light retain snow identity, but warm highlights cover a broad area. Larger exposed rocks and surface undulations exceed the requested few small stones and level ground. The snow overhang and very craggy plinth need geometry review.
- Both: strong cell seams and an apparently flat-topped projected cell orientation remain; pointy-top geometry and exact 2:1 projection are not certified. Returned previews show possible coloured edge fringes. Alpha transparency was measured, but no clean-cutout acceptance is claimed.

No renderer, tile contract, manifest or Territory Map changes. Review these two candidates beside the chosen Hall before extending the set. No further automatic cooling or warmth reduction is implied by this assessment.

## Exact prompts

### grassland

```text
Use case: stylized-concept. Asset type: painted Island Map terrain candidate.
The sole attached reference is the OWNER-SELECTED Council Hall A painting. Match this exact image's warm upper-left light, selective golden highlights, cool green and blue-grey shadows, tactile matte painted finish, contrast and fine readable detail. Preserve the amount of warmth in this reference; do not cool, darken or desaturate it to reinterpret dusk. The reference supplies lighting, palette, brushwork and the seven-hex footprint, not a building to reproduce.
Paint a connected seven-hex flower of level green grassland: exactly one centre pointy-top hex and its six edge-sharing neighbours, all on the same level. Fixed straight-on 2:1 isometric camera, shallow rock plinth beneath every exposed outer hex edge, visible rock strata, clean stepped flower outline, fine unobtrusive internal seams. Paint the hexes directly, never square diamonds or a cropped square. Keep the entire flower in frame, with clear transparent margins on every side. All ground surfaces form one level plane; no raised rear cell, hills, mountains, tall cliffs or gaps.
Forest and moss greens with fine broken grass strokes, a few tiny flowers and only a few small stones. Retain green grass identity under the reference's golden highlights; no straw meadow or sand.
Keep the selected reference's painterly material texture and lighting at miniature-map scale, with a readable silhouette at 25%. Warmth is welcome at the strength shown in that reference. No buildings, columns, roofs, ruins, paths, decorative trees or extra objects from the reference. Vegetation and snow stop at the top edge of the plinth; rock faces remain rock only.
Genuine transparent exterior, no painted checkerboard, background colour, halo, glow, vignette, gradient or exterior cast shadow. No text, numbers, logos, people, animals, crystals, magic glow or fortifications.
```

### snow

```text
Use case: stylized-concept. Asset type: painted Island Map terrain candidate.
The sole attached reference is the OWNER-SELECTED Council Hall A painting. Match this exact image's warm upper-left light, selective golden highlights, cool green and blue-grey shadows, tactile matte painted finish, contrast and fine readable detail. Preserve the amount of warmth in this reference; do not cool, darken or desaturate it to reinterpret dusk. The reference supplies lighting, palette, brushwork and the seven-hex footprint, not a building to reproduce.
Paint a connected seven-hex flower of level snowfield: exactly one centre pointy-top hex and its six edge-sharing neighbours, all on the same level. Fixed straight-on 2:1 isometric camera, shallow rock plinth beneath every exposed outer hex edge, visible rock strata, clean stepped flower outline, fine unobtrusive internal seams. Paint the hexes directly, never square diamonds or a cropped square. Keep the entire flower in frame, with clear transparent margins on every side. All ground surfaces form one level plane; no raised rear cell, hills, mountains, tall cliffs or gaps.
Tactile snow in cool white and blue-grey, warm sunlit accents matching the reference light, a few small exposed stones. Keep most snow cool and recognisably snowy, without a uniform peach or amber wash. No grass or vegetation on the snowy top surface.
Keep the selected reference's painterly material texture and lighting at miniature-map scale, with a readable silhouette at 25%. Warmth is welcome at the strength shown in that reference. No buildings, columns, roofs, ruins, paths, decorative trees or extra objects from the reference. Vegetation and snow stop at the top edge of the plinth; rock faces remain rock only.
Genuine transparent exterior, no painted checkerboard, background colour, halo, glow, vignette, gradient or exterior cast shadow. No text, numbers, logos, people, animals, crystals, magic glow or fortifications.
```

## Original-file hashes

- grassland.png: `054680d3a51028fba40857bdf98a7c0d679de1134c2a4f3c6f8d54e4d4a67b65`.
- snow.png: `8708275758b6d5b367615a688421f6757cc16092a824399ff039e578c0b2f33a`.

## Design review, 20 October 2026

Claude reviewed both candidates beside Council Hall A and the 19 October study.

- **Light: a good match.** Both carry the Hall's warm upper-left key, green grass and cool shadows. The grassland runs brighter and warmer than the Hall's own grass: mean brightness of green pixels 0.32 against 0.21, and highlight warmth (red minus blue) +0.33 against +0.13. Hold the next grassland to the Hall, not above it.
- **Orientation: wrong, inherited from the reference.** Council Hall A and both candidates are painted with flat-top hexes: each cell has horizontal top and bottom edges and points left and right. The contract and every renderer use pointy-top hexes, with vertical left and right sides. The 19 October grassland A and snow A were pointy-top. With the Hall as the only reference, the candidates copied its orientation. Council Hall A therefore sets light and finish only; see the [Ancient brief](../../../docs/briefs/tile-set-ancient.md#reference-and-lighting).
- **Seams and plinths.** The internal cell seams are drawn as grooves, where they should be faint or absent inside one painted flower. The snow plinth is craggy and overhung, and the grass plinth is taller than the Hall's.
- **Next run.** Repaint grassland and snow, and the Council Hall itself, as pointy-top flowers. Attach Council Hall A for light and finish together with a pointy-top flower for geometry only, such as the 19 October grassland A, and state each reference's role in the prompt.
