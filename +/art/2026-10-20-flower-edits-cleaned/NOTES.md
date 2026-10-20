# Flower edits, cleaned — 20 October 2026

Derived copies of the three [flower edits](../2026-10-20-flower-edits/NOTES.md), made by script, not by an image generator. The originals there are unchanged. This art is unlicensed until KI-DESIGN-ART-002 is decided. These are review derivatives, not the Ancient set.

## Review of the edits

- **All three are now pointy-top.** Each has two cells at the back, three across the middle and two at the front. Editing the pointy-top grassland fixed the snow, which four fresh generations had not.
- **Grassland:** faint seams, a shallow level base, and grass much less yellow (red-to-green ratio 0.91, against Council Hall A's 0.90). Still brighter than the target: mean grass brightness 0.35, against 0.21.
- **Council Hall:** no dome, half the planting, open turf, shallow base, faint seams. Grass brightness 0.32.
- **Snow:** right orientation, but it keeps the dark seams and the deep, snow-dusted base of its source.
- **Edges:** alpha peaks at 254, with a faint exterior halo, in all three.

## What the script does

`clean.py`, run as `python3 clean.py ../2026-10-20-flower-edits . ../2026-10-19-lighting-study/council-hall-A.png`:

1. **Alpha.** Values below 16 become 0, values from 16 to 240 are stretched linearly to 0–255, and everything above 240 is fully opaque. This removes the halo and gives a clean cutout.
2. **Tone.** For grassland and the Hall only, one gamma curve is applied to luminance across the whole image. It is chosen by bisection so that the mean brightness of the grass pixels equals Council Hall A's own grass, 0.208. Hue, and the balance between grass, rock and building, are kept. The resulting gammas are 1.51 for grassland and 1.40 for the Hall. Snow gets the alpha clean-up only.

`comparison.jpg` shows Council Hall A, the edited Hall, the cleaned Hall and the cleaned grassland side by side.

## Judgement needed

Matched on brightness, the cleaned images sit closer to Council Hall A, but they read more olive and less golden. Council Hall A's warmth comes partly from its dense, sunlit planting, not only from its grass. Kit to choose between the edit as painted and this cleaned version, or ask for a lighter grade.
