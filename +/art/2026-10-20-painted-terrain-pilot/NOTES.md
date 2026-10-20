# Painted terrain review pilot — 20 October 2026

This is an experimental painted review, not a production tile set or a replacement for the Territory Map. The owner requested a reread of the whole approach and approved a standalone pilot with independent hexes, flat joins, slopes, height steps, an upright Hall and an optional projected grid.

## What was already done

Claude's review had added the endpoint conventions, straight-profile faces, closure at three-cell junctions, visibility and draw-order rules, affine material mapping, level foundations and the recommended staged pilot. The source studies had demonstrated shape assembly and Arcadia sampling, but no terrain renderer. The current package still exposes the existing map and fixed-plinth implementation; no package-level Pilot 0 or Pilot 1 was found.

This review implements a bounded subset in its own folder. It does not claim to complete the proposed package pilots or accept their unsettled numerical choices for production.

## Ground and grid direction

The owner explicitly clarified that each ground hex stays independent. There must be no artificial edge highlights, outlines, bevels, grooves or shadows at ordinary shared boundaries. A map-wide seamless painting is not a substitute for independently composable cells. When needed, the grid is projected separately onto the actual viewed surface and heights.

The pilot gives each cell its own axial address, elevation, six normalised corner heights and reusable material variant. It draws that cell independently as six affine-warped material triangles. Four reusable material variants share a compatible boundary band and vary in their interiors. Their material sampling uses local cell coordinates, not a scene-wide canvas, neighbour pixels or map dimensions. Changing the selected material variant does not alter geometry or require repainting neighbours.

There are no top-face cell strokes with the grid off. The grid is rendered as a separate surface pass, before foreground faces and upright objects, so it follows relief and remains occluded by the Hall. Actual exposed faces are derived from the two incident profiles rather than decorative cell borders.

## Scenes and controls

- **Flat joins:** 19 pointy-top cells at height zero. Ordinary internal faces disappear; exposed outer faces retain the existing 48 px plinth.
- **Slopes and steps:** the seven-cell centre pad is level at elevation one, outer corners rise or fall, and the front row has a real one-unit step. The texture is mapped triangle by triangle.
- **Crossing edge profiles:** two eastern outer cells have opposing height profiles. Their faces split at the exact crossing rather than making a bow-tie.
- **Project grid:** shows or hides the separate height-following overlay; no material image changes.
- **Council Hall:** shows or hides the upright building sprite. The seven-cell level pad is checked before drawing it. Foreground terrain is drawn later; the Hall is never warped with the ground.
- **Rearrange ground tiles:** changes the assignment of the four compatible material variants while keeping addresses, heights and foundations unchanged.

The fixture uses the proposal's experimental height rise of W/8, or 32 px for the existing 256 × 148 top-face geometry. These are dated experiment inputs, not a new production contract.

## Preserved art and transformations

The generation tool was built-in image_gen.imagegen; no model identifier was exposed. There were two calls, one attempt each: a raw grass material and an isolated Hall sprite. Both attached only the chosen ../2026-10-19-lighting-study/council-hall-A.png. The exact requests are preserved verbatim in prompts.json.

- originals/grass.png is the unaltered new material swatch. It is raw surface material, not a square landscape candidate cropped into a hex. The renderer constructs hex topology independently, as described in the proposal's material-mapping section.
- originals/hall.png is the unaltered new isolated Hall result, generated from the selected reference. It is a derivative candidate rather than a pixel-exact extraction of the original Hall.
- originals/stone.png is a byte-identical copy of the 19 October shape study's stone material. Its exact source prompt and first review remain in ../2026-10-19-ancient-shape-study/NOTES.md.
- build.py makes separately labelled, reduced WebP review derivatives. The Hall is trimmed to its alpha content at threshold 16 before reduction, and its displayed anchor is centred at the level pad with its steps toward the viewer. Originals are untouched.
- The renderer reduces the grass swatch to a 256 px material sample, symmetrically feathers opposite edges over 24 texels, then constructs four local 2× material images with shared boundary coordinates. Interior changes blend in beyond a 10 px boundary collar over 30 px; the collar is not lightened or outlined. Two source pixels of padding and a 0.22 world-pixel triangle overlap prevent raster antialiasing cracks.
- Stone is mapped onto generated vertical faces, with a cooler shade on e2. Only actual visible e2/e3 faces are drawn. Slope shading is a restrained illustrative adjustment, not a physically validated lighting model.
- The Hall uses a 340 world-pixel-wide image placement above the central pad. This is an experimental display anchor and scale, not a building manifest entry or occupancy policy.

The original dimensions, alpha ranges and hashes are in measurements.json. Asset sizes in assets/ are review derivatives, not original generator resolutions. No painted top surface, building or cliff asset is declared final or licensed.

## Verification

The standalone geometry tests cover reversed endpoint identity in all six directions at positive and negative coordinates; normalisation with negative elevations; the documented continuous join across differing base elevations; equal, wedge and crossed profiles; the all-zero exterior plinth; exact incident endpoints of generated faces; affine source mapping; compatible boundary material coordinates; the level building pad and permitted foreground; corner range; and independent reassignment of material variants.

Browser review covers all three scenes, grid on/off, Hall on/off, material reassignment, a narrow 360 px layout and runtime errors. The grid switch is checked for a changed visible state; reassignment is checked for changed painted output. Flat joins were inspected visually and the initial raster cracks were repaired. This is review evidence, not full renderer acceptance.

## Limitations and next judgement

The grass has a regular fine-scale texture and visible repetition at some scales; its finish is less varied than the selected Hall scene. The reused rock material reads partly as masonry and repeats on separate faces. The new Hall has brighter windows and altered details relative to the original. These need art judgement rather than being described as a perfect style match.

Compatible material coordinates do not prove that arbitrary unrelated paintings or different materials will join automatically. This pilot demonstrates a deliberately compatible grass family. It does not yet test snow/grass transitions, water, river crossings, waterfalls, an irregular tree compound, an Arcadia-derived repaired patch, depth-aware picking, chunk invariance, world scale or detailed/overview accessibility acceptance. East/west height steps remain edge-on and may read as texture shear; no artificial boundary line is added to conceal that limitation.

The level-pad check is intentionally narrow: it is not a complete compound occupancy, hole-rejection or placement validator. The Hall does not establish the Capital's civic footprint or add a Library.

Judge whether the independent grass joins read naturally, whether the painted detail survives the slopes, and whether the optional grid behaves as intended. The larger proposal remains Proposed until its remaining tests and decisions are addressed.

## Files and reproduction

- terrain.js: pure experimental geometry, fixture and material-coordinate rules.
- terrain.test.js: targeted geometry and independence checks.
- viewer.js and pilot.html: the editable renderer and compact review controls.
- originals/: preserved generated inputs; assets/: separately built review derivatives.
- painted-terrain-pilot.html: self-contained conversation fragment with embedded material images.
- build.py: rebuilds derivatives, the browser bundle and the fragment using Python with Pillow and Bun.

From the repository root, run bun test ./+/art/2026-10-20-painted-terrain-pilot/terrain.test.js to repeat the geometry checks. Run build.py with a Python installation containing Pillow to rebuild the review. No package exports, production schemas, manifests, renderer or Territory Map were changed.
