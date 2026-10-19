---
title: Hex terrain mathematics
status: draft
updated: 2026-10-19
---

# Hex terrain mathematics

**Proposed.** This is the self-contained mathematical companion to [hex terrain composition](hex-terrain-composition.md). It defines the coordinate, boundary, height and compound operations needed to review and pilot that proposal. External references provide attribution in the [research note](../briefs/hex-terrain-research.md); no external tutorial or code is needed to apply the formulas here. These conventions do not yet extend the production contract.

## Inputs and units

Read nominal top-face width `W0` and height `H0` from `tileGeometry` in the [existing contract](../../packages/tiles/src/contract.ts). Let `s` be display scale, `W = s × W0`, `H = s × H0`, and `(ox, oy)` the projected origin. Let `Z` be the screen rise for one terrain-height unit at that display scale. `Z`, physical cell size and physical height-unit size are not yet selected. Do not derive them from the fixed plinth depth.

Map coordinates and heights exist independently of pixels. Screen x points right and screen y down. Axial q points right; axial r points towards the lower right. A projected height `z` moves a point upwards by `Z × z`. Setting a camera origin or zoom never changes stored terrain heights.

## Cell centres and corners

The centre of cell `(q, r)` at height `z` projects to:

```text
x = ox + W × (q + r/2)
y = oy + (3H/4) × r − Z × z
```

Number corners clockwise from north. Use these dimensionless integer corner offsets:

| Corner | dx | dy |
| --- | --- | --- |
| c0 | 0 | −2 |
| c1 | 1 | −1 |
| c2 | 1 | 1 |
| c3 | 0 | 2 |
| c4 | −1 | 1 |
| c5 | −1 | −1 |

For corner `i`, its exact plan-position key is the integer pair `K = (2q + r + dxi, 3r + dyi)`. Its screen position is `x = ox + (W/2) × Kx`, `y = oy + (H/4) × Ky − Z × Hi`. Adjacent cells therefore derive the same plan-position key without rounding floating-point coordinates. Store height per incident surface at this key when a cliff deliberately separates levels.

For a continuous world vertex, reconcile one absolute height shared by all incident cells. At `ci`, the incident neighbours are across `ei` and `e(i−1 mod 6)`. Where a neighbour is absent, use an explicit outside-boundary treatment rather than an invented neighbouring surface.

## Neighbours and shared boundary keys

The neighbour offsets for local edges `e0…e5` are, in order, `[(1,−1), (1,0), (0,1), (−1,1), (−1,0), (0,−1)]`. Edge `ei` runs from `ci` to `c(i+1 mod 6)`. Its neighbour uses edge `e(i+3 mod 6)` in the opposite direction. For example, A at `(0,0)` on e2 meets B at `(0,1)` on e5; A c2 equals B c0 in plan position and A c3 equals B c5.

Derive a stable edge identity from the unordered pair of incident cell positions: sort positions numerically by q then r. The outside neighbour's position is still computable even if that cell is absent. As an equivalent geometry check, derive the two integer corner keys and sort them numerically by Kx then Ky. The two incident cells must produce the same sorted endpoint pair.

Use that sorted endpoint order as canonical P → Q for all profile and crossing calculations. A local edge whose endpoint order disagrees must reverse its samples, endpoint heights and crossing parameters. For a normalised position `t` along an edge, reversal is `1 − t`. For an interval `[a, b]`, reversal is `[1 − b, 1 − a]`.

## World-space lengths

Let R be the physical distance from a regular hex centre to a corner. A corner key `(Kx, Ky)` corresponds to unprojected ground coordinates `X = (sqrt(3)/2) × R × Kx`, `Y = (R/2) × Ky`. Consequently an edge has physical length R and a crossing interval `[a,b]` spans `(b−a) × R`. R is a world-scale choice; it is not the source-painting crop width.

Let U be the physical distance of one height unit. A straight edge with endpoint heights HP and HQ has slope magnitude `abs(HQ−HP) × U/R`; its inclination is `atan2(abs(HQ−HP) × U, R)`. Traversable road and building-foundation slope limits are policy choices still to be set. This formula measures a slope without choosing a permitted threshold.

## Picking a cell on a known plane

At a known height z, undo the height rise and solve the centre projection:

```text
fractional_r = 4 × (y − oy + Z × z) / (3H)
fractional_q = (x − ox) / W − fractional_r/2
fractional_s = −fractional_q − fractional_r
```

Round in cube coordinates to obtain a cell. For this pilot, `round(v)` means `floor(v + 0.5)` even for negative values. Round q, r and s independently; calculate their absolute rounding errors. Replace the component with the largest error by minus the sum of the other two. Resolve equal errors in the order q, then r, then s. The repaired integers always sum to zero; return q and r.

This defines deterministic assignment at exact boundaries, not an enlarged hit target. A raised terrain mesh cannot generally be picked by assuming z = 0: overlapping projected surfaces require a visible-surface intersection or depth-aware hit test. A flat image cutout does not provide that depth information.

## Distance and logical rotation

For cells A and B, let `dq = Bq − Aq`, `dr = Br − Ar` and `ds = −dq − dr`. Their grid distance is `max(abs(dq), abs(dr), abs(ds))`. One step across any shared edge has distance 1.

To rotate a logical offset clockwise by 60 degrees in this q/r convention, use `(q, r) → (−r, q + r)`. Apply repeatedly for further turns. Rotate about an anchor by subtracting the anchor, rotating the offset and adding the anchor back. Six turns recover the original coordinate. This operation changes logical positions only; fixed-light painted artwork cannot be rotated with it.

## Height normalisation and interpolation

Given absolute corner heights `Hi`, set `b = min(Hi)` and `hi = Hi − b`. Then every local height is non-negative, at least one is zero and `b + hi` exactly reconstructs `Hi`. A whole-cell rise by k changes `b` to `b + k`; the local shape remains unchanged. Negative b is valid relative to the chosen world datum.

For the proposed first pilot, corner heights are integers and the centre height is the arithmetic mean `C = sum(Hi)/6`. C can be fractional even when all corners are integral. Form six world-space triangles `(centre, ci, c(i+1))`. Within a triangle, use barycentric weights `u, v, w` with `u + v + w = 1`: the height is `uC + vHi + wH(i+1)`. This produces the same linear boundary profile on both triangles meeting that boundary.

To calculate those barycentric weights locally, let planar triangle vertices be A, B and C, and the query point be T. Define the 2D cross product as `cross((x1,y1),(x2,y2)) = x1y2 − y1x2`. Let `D = cross(B−A,C−A)`, `v = cross(T−A,C−A)/D`, `w = cross(B−A,T−A)/D` and `u = 1−v−w`. Reject a zero-area triangle where D is zero. Non-negative weights identify a point inside or on the triangle; apply a shared numerical boundary policy if floating-point input is used. Interpolate the three corresponding heights with u, v and w. This avoids needing a third-party triangle routine to define the result.

Equal boundary heights guarantee positional continuity, not equal surface normals or identical painted textures. A visually smooth join may also require compatible normals and material blending. Different interior shapes require additional control data; six corner heights cannot encode an arbitrary ridge or hollow. Do not use the mean-centre pilot to imply support for overhangs or caves.

## Deriving exposed edge geometry

First align both sides to canonical P → Q. Let the absolute endpoint heights be `(AP, AQ)` and `(BP, BQ)`. For `0 ≤ t ≤ 1`:

```text
A(t) = AP + t × (AQ − AP)
B(t) = BP + t × (BQ − BP)
d(t) = B(t) − A(t)
dP = BP − AP
dQ = BQ − AQ
```

If dP and dQ are zero, there is no exposed height face. Otherwise, if their signs do not oppose, connect the two boundary segments as a quadrilateral in the vertical plane through P and Q. Triangulate it and discard zero-area triangles when an endpoint gap is zero. Positive differences mean B is higher; negative differences mean A is higher. The exposed face belongs to the higher incident surface, not automatically to the cell being drawn first.

If the signs oppose, compute `tCross = dP / (dP − dQ)`. It lies strictly inside the edge. Compute the world point on P → Q at that parameter and its common height using either A or B. Make one triangular face towards P and another towards Q; the higher owner changes at the crossing. Do not make a bow-tie quadrilateral. This is the complete straight-profile case split; detailed profiles require the same procedure per shared segment.

Compute shared values once per boundary to avoid cracks from inconsistent tolerances. The integer-height pilot permits exact endpoint comparisons. If continuous height input is later supported, decide common quantisation or comparison tolerance explicitly. Face visibility and occlusion follow the fixed camera and scene depth; height difference alone does not prove a face is visible.

At a three-cell junction, reconcile the incident continuous heights or retain the ordered split levels, then close the meeting edge faces. Reject a geometry combination the pilot has not implemented rather than drawing independent faces with an unfilled corner. The pilot acceptance cases in the composition spec define the required junction coverage; a general corner-cap algorithm remains Open.

## Feature crossings and waterfalls

Parameter t denotes the same world position for both incident cells after endpoint alignment. A crossing interval `[a, b]` defines its extent along the boundary; its physical width uses the unprojected edge length, not its foreshortened screen length. Keep terrain level, channel-bed level and water-surface level separate.

For a directed water connection, require one connection identity, aligned crossing interval, compatible upper and lower reaches and explicit water levels. A vertical waterfall exists where the upstream water surface is higher than the receiving water surface at the connected crossing. Join those water surfaces over the crossing interval and create receiving foam or spray only within its declared extent. Where levels vary across the channel, evaluate both sides of that interval; do not substitute the terrain edge's entire height gap.

A declared upstream water level below the supposed receiving level is inconsistent with that directed drop. Reject or reclassify the connection rather than inventing uphill flow. Equal levels describe a continuous or otherwise explicitly modelled reach. Terrain without a water crossing produces no waterfall.

## Compound operations

Represent a compound footprint as a set of distinct integer axial offsets, containing `(0,0)` as its occupied anchor. For placement at `(aq, ar)`, each member occupies `(aq + dq, ar + dr)`. A translation changes the anchor only. Use the six neighbour offsets above for connectivity and exposed-boundary calculations.

To validate edge connectivity, start at `(0,0)`, visit all occupied neighbours using a queue, and compare the number visited with the number of offsets. Reject disconnected sets and duplicates. An occupied cell edge is internal if its neighbour is also occupied; otherwise it is a compound boundary edge. Preserve all boundary edges and their world-vertex identities. Do not assume an arbitrary connected set has one simple outer loop: holes and corner contacts need an explicit support policy.

Test placement against map availability, the chosen occupancy layers, terrain contact and supported external crossings. Occupancy, canopy overhang and blocking space are different data; a plan-position overlap alone is not a universal collision rule. Multi-level bridges and canopy selection require a layer/volume policy, which remains Open. Artwork bounds and clipping must not silently redefine occupied cells.

## Reproducing the Arcadia sampling study

The local [study metadata](../../+/art/2026-10-19-arcadia-hex-composition-study/study.json) records source identity, image dimensions, grid origin, projection snapshot, named region anchors, compound offsets and the Great Tree outline. Those are experiment inputs, not new contract constants.

For source sampling width w, use h = w × H0/W0 and the same projection at z = 0. Choose an anchor cell by inverse projection and cube rounding. For a fixed-footprint study, add each listed offset to that anchor and clip the original image to the union of those cell polygons. Preserve source coordinates; do not independently resize individual crops.

For the tree mask, reproduce the study's selection rule: include a hex if its centre lies in the outline, any hex corner lies in the outline, or any outline vertex lies in the hex. Point-in-polygon uses an even/odd ray crossing test: each edge straddling the query y toggles membership if its horizontal intersection lies to the right of the query x. For the saved inputs this gives the recorded connected cell sets.

That selection heuristic is not a general polygon-intersection algorithm. Production coverage must additionally test all outline-edge versus hex-edge segment intersections, with a consistent boundary-inclusive policy. For segments AB and CD, use signed 2D cross products to test whether endpoints lie on opposite sides of each other's lines; also accept collinear points that fall within both coordinate bounds. Test degenerate and boundary-touch cases. This prevents a crossing sliver from being missed when neither polygon contains a vertex of the other.

The SVG studies preserve clipping geometry and the full-resolution source reference. They are sufficient to reproduce the saved crops independently of an external source or this conversation. Rasterising a different SVG engine may change antialiasing; it must not change the selected footprint or source coordinates.

## Mathematical acceptance checks

Verify every edge/opposite-edge pair produces the same unordered corner keys and reversed local endpoints. Check this at positive and negative q/r positions. Verify cube-rounded coordinates sum to zero; neighbour distance is 1; six clockwise rotations are identity; and normalising heights preserves every absolute height.

Exercise all edge-gap sign cases, including an internal crossing, one zero endpoint and negative cell elevations. Verify both sides compute the same crossing point. Check compound connectivity, missing-cell rejection, boundary extraction, holes and corner contacts. Keep geometry failures distinct from missing artistic cleanup or unreadable display scale. Full renderer, junction, foundation and water tests remain part of the implementation pilot, not something this document claims to have delivered.
