# Ancient square and hex shape study

This art is unlicensed until KI-DESIGN-ART-002 is decided. These are candidates for review, not the Ancient set.

## Purpose

Compare the same grassland, civic hall and stone material on a square diamond and the repository's exact projected hex footprint. This is a geometry and composition study; it does not change the map contract, choose the final lighting or add production tiles to the manifest.

## Method

- Date: 19 October 2026.
- Generation tool: Codex built-in `image_gen`; the underlying image model was not exposed.
- Style reference attached to all three generations: `docs/briefs/references/arcadia-reference-small.jpg`. The geometry is constructed separately, so no geometry template was attached to these material/sprite generations.
- Three generations, one attempt each: grass material, stone material and an isolated civic hall. Original returned PNGs were copied unchanged.
- Native SVG composition keeps those assets separate. Grass is mapped into a shared projected plane and clipped to an exact polygon. Stone is mapped onto two exact front plinth faces. The identical building sprite is positioned at the same scale and ground contact in both versions.
- Raster previews are renders of these SVG compositions, not generator outputs. Source PNGs remain unaltered. The compositions use relative asset references; keep the study folder together.

## Exact geometry

At 1×, the hex top vertices are `(128,0) (256,37) (256,111) (128,148) (0,111) (0,37)`, matching the current 256 × 148 contract. This is the projected pointy-top regular hex, with the contract's pixel rounding. The square diamond vertices are `(128,10) (256,74) (128,138) (0,74)`, giving a 256 × 128 top face centred on the same point. Both plinths extend 48 px vertically, and both buildings use exactly the same 200 × 200 source-image placement at `(28,-60)`.

The comparison is equal width, not equal ground area. The hex has about 73% more top-face area at that width, and its complete base is 20 px taller. The board includes an enlarged 384 px tile width, a native 256 px map-size row and a 64 px silhouette row. View the board at 100% to judge those pixel sizes; a chat may fit the image to a narrower display.

## Files and measurements

- `grass.png`: original generated ground material, 1254 × 1254, opaque, requested 1024 × 1024.
- `stone.png`: original generated rock material, 1254 × 1254, opaque, requested 1024 × 1024.
- `hall.png`: original generated building sprite, 1254 × 1254, alpha transparency, requested 1024 × 1024.
- `square.svg` and `hex.svg`: editable assemblies, 512 × 464 raster-render size, with common viewBox `0 -36 256 232`.
- `square.png` and `hex.png`: transparent 512 × 464 renders of the assemblies.
- `comparison.svg` and `comparison.png`: labelled comparison board and its raster render, 1100 × 1110.

## Review

The exact boundaries and the building silhouette survive the hex assembly. This provides evidence for continuing with hex geometry and modular painted assets, without asking the generator to draw the boundary. At the same width, the hex gives more planting and forecourt space around the building. The square is more compact vertically. At 64 px the hall still reads as a building, but individual columns and windows largely merge.

The study does not settle seams between adjacent tiles, variable terrain heights, shorelines, roads, decals or occlusion between buildings. Those remain production work. The grass texture was requested seamless but has not been tested for seamless repetition. Its flowers and stones are more numerous than requested. The stone swatch reads partly as coursed masonry rather than entirely natural rock strata. The hall and stone retain stronger golden highlights than the Arcadia dusk target, and the hall's camera is approximately rather than measurably exactly 2:1. Neither source is a final style calibration. The geometric cutouts themselves are deterministic and do not depend on generator compliance.

## Grass generation prompt

```text
Use case: stylized-concept. Asset: seamless painted grass ground material for an Ancient landscape tile. The attached Arcadia image is the style and lighting reference only. Paint one square, edge-to-edge, top-down flat grass surface, no tile border, no island, no plinth, no building, no trees, no hills, no horizon. Moss and forest green living grass, fine matte brushwork, subtle broken strokes, a very few tiny wildflowers and flat small stones, no large features. Quiet late dusk, soft cool desaturated green shadows retaining their local colour, sparse restrained warm flecks from a low upper-left sun, most of the surface mid-dark green. Even spatial distribution, no vignette, no bright centre, no dramatic contrast, no amber wash. This material will be projected onto exact tile geometry. No text, symbols, people, animals, creatures, crystals, magic, weapons, glow, black outlines or names. 1024 x 1024.
```

## Stone generation prompt

```text
Use case: stylized-concept. Asset: painted limestone cliff material swatch for the side faces of an Ancient tile plinth. The attached Arcadia image is the style and palette reference only. One square image entirely filled edge-to-edge with a frontal close view of a flat vertical rock face, subtle horizontal limestone and sandstone strata, fine fissures and modest weathering. No protruding rocks, no silhouette, no perspective, no landscape, no plants, no grass, no water, no sky, no buildings. Matte softly painted warm grey-brown stone in late dusk, cool desaturated shadows keeping local brown colour, very restrained warm light from upper left. Low contrast and consistent material density across the whole image, no vignette. This texture will be mapped onto exact geometric side faces. No text, symbols, people, animals, creatures, crystals, magic, weapons, glow or black outlines. 1024 x 1024.
```

## Hall generation prompt

```text
Use case: stylized-concept. Asset: isolated transparent building sprite for a painted Ancient isometric landscape tile. Match the attached Arcadia painting's rich matte brushwork and late calm dusk: mostly mid-dark, cool desaturated local-colour shadows, restrained warm upper-left sunlight on selected edges only, small warm windows, no bloom or amber wash. Subject: one modest long civic Council Hall of pale warm limestone and sandstone, muted slate low-pitched gabled roof, plain unsculpted pediment, colonnaded loggia only along its long front side, visible doors and warm-lit windows behind the columns, broad open front steps. No dome, peristyle, temple ornament, side wing, garden, trees, ground tile, terrain, plinth, forecourt, enclosing walls, fortifications, horizon or scenery. Building only, clean alpha exterior, no halo or cast shadow outside the building. Precisely straight-on 2:1 isometric camera, looking down at 30 degrees approximately; parallel vertical walls, horizontal world axes project at equal and opposite slopes of 1:2, no perspective convergence. Keep all parts inside canvas with generous transparent margin. Crisp readable civic silhouette at 25% scale, local-colour outlines never black. No text, symbols, numbers, close-up people, creatures, animals, crystals, magic or weapons. 1024 x 1024.
```
