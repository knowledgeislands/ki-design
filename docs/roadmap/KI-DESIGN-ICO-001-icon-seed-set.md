---
id: KI-DESIGN-ICO-001
area: ICO
title: Icon seed set
kind: deliver
purpose: capability
project: ki-design
component: icons
size: s
status: done
blocks: []
blocked_by: []
baseline_ref: f41cbc5621f6c260b965c877d4126edf37b3147b
created_at: 2026-10-18T03:35:00Z
updated_at: 2026-10-21T13:40:12Z
---

# Icon seed set

## Goal

Draw the first line glyphs (24 grid, 1.5 stroke, round caps) for the canonical symbols, zones, structures, Port modes and the local app's instruments, with a sprite and a typed name list.

## Context

The site uses emoji in its Capital diagram and the Observatory has text-only tabs; both need one glyph set.

## Boundary

Glyphs only; no new meanings. Steward-role glyphs wait for the roles to enter canon.

## Current state

v0 landed in `04b2761` with 71 glyphs (73 by 19 October) in `packages/icons/svg`, a sprite and a typed name list, with SVG-contract tests. Coverage of every canon and decided symbol is not yet checked by a test. Canon and decided are now Official and Agreed (GDR-KI-DESIGN-002).

On 20 October 2026, six of the 46 Official or Agreed symbols in `packages/symbols` named no glyph: `territory`, `realm` (Agreed), `pillars`, and the conditions `thriving`, `quiet` and `weathered`; `ruined` draws `ruins`. Proposed `storm` has none either and stays outside this check.

**Decision before delivery, answered.** The conditions are also drawn as building states on tiles ([tiles-and-buildings.md](../spec/tiles-and-buildings.md)), so whether each needs a line glyph was the owner's call. On 20 October 2026, under the overnight authority (OVERNIGHT in ki-principal's `+/_WORK/ki.observatory/decisions.md`), Kit took the recommendation, CONDITION-GLYPHS a): every Official or Agreed symbol gets a glyph, with no exemptions.

## Steps

- [x] Add a test in `packages/symbols/src/symbols.test.ts` that every Official or Agreed symbol names an existing glyph; this is the test KI-DESIGN-SYM-001 shares.
- [x] Point `territory` at the existing `archipelago` glyph, since a territory is drawn as an archipelago (GDR-KI-DESIGN-015).
- [x] Draw `realm`, `pillars`, `thriving`, `quiet` and `weathered` to the glyph contract (24 grid, 1.5 stroke, round caps), following the icons README: draw, build (which lints), test, regenerate the contact sheet, and name each in the symbol data.
- [x] Run the package tests, typecheck, lint and roadmap audit.

## Files touched

`packages/icons/` (new SVGs, the sprite, the generated name list, the contact sheet, README, coverage list), `packages/symbols/src/symbols.ts`, `packages/symbols/src/symbols.test.ts`; the generated `examples/site-preview/index.html` and `field-guide.html` and the generated boards in `docs/design-review/boards/`; glyph counts and briefs in `docs/briefs/glyph-briefs.md`, `docs/briefs/README.md`, `docs/spec/iconography.md` and `-/observatory-handoff/INSTRUCTION.md`

## Verify

Every symbol with status Official or Agreed in the symbol library names an existing glyph, by test; the icons package's SVG-contract tests and lint pass for the new glyphs; the owner reviews the drawings on the contact sheet.

## Dependencies / blocks

Shares the glyph-coverage test with KI-DESIGN-SYM-001; deliver this item first, and SYM-001 then confirms the test. The owner's answer on condition glyphs is in (CONDITION-GLYPHS a).

## Documentation impact

### Decision Records

No decision record: this item delivers within decisions already recorded in the design brief.

### Specifications

`docs/spec/iconography.md` gains the rule that every Official or Agreed symbol has a glyph, by test, and its glyph count is corrected to 78.

### Guides

No guide change: the developer guide already covers running the checks and previews. The icons README's "Adding a glyph" steps now say to name a symbol's glyph in `packages/symbols`.

### Roadmap

None.

## Review

### Delivered

Within the boundary above, from baseline `f41cbc5621f6c260b965c877d4126edf37b3147b`: five new single-colour line glyphs, `realm`, `pillars`, `thriving`, `quiet` and `weathered`, each passing `lintIcon`; `territory` drawn with `archipelago`; and the shared test that every Official or Agreed symbol names an existing glyph. No new meanings; steward-role glyphs untouched; Proposed `storm` stays without a glyph.

### Change Summary

- `packages/icons/svg/`: `realm` (a globe), `pillars` (three free-standing columns with capitals and bases, no pediment, so it never reads as the Council Hall), and the condition family: one gabled house with chimney, window and door; `thriving` adds chimney smoke, `quiet` is the house unlit, `weathered` breaks the roof line and cracks the wall; `ruined` keeps `ruins`.
- `packages/icons/src/icons.generated.ts` rebuilt (78 glyphs); `src/icons.test.ts` coverage list extended; `contact-sheet.png` regenerated with the five new glyphs bordered in brass; README list and "Adding a glyph" step updated; the returned inventory paragraph is now corrected from 73 to 78 against all 78 committed SVG names.
- `packages/symbols/src/symbols.ts`: `icon` set for territory (`archipelago`), realm, pillars, thriving, quiet and weathered; `symbols.test.ts` gains `every Official or Agreed symbol names a glyph`.
- Generated outputs rebuilt from the data: `examples/site-preview/index.html` and `field-guide.html`, and the `DsIcons`, `DsMeaning`, `DsOverview` boards with `canvas.json`.
- Docs: glyph briefs for the five glyphs and the territory note; counts corrected from 72 or 73 to 78 in `docs/spec/iconography.md`, `docs/briefs/README.md` and `-/observatory-handoff/INSTRUCTION.md`; iconography gains the coverage rule.
- `packages/tiles/scripts/rasterise.ts`: launch Chromium with `--disable-gpu` to remove the observed variation between GPU renderings. This shared review-image helper has no runtime role. The icons README documents the local `NODE_PATH` and `KI_CHROMIUM` prerequisites; no dependency was installed.
- Returned findings corrected from resubmission baseline `38965f001e91bb23046637d9dcec505b19864620`: the source-fixed generator reproduces the committed `contact-sheet.png` byte for byte on three consecutive runs, so the regenerated PNG has no Git diff.

### Verification

- Offline, uncached `bun node_modules/turbo/bin/turbo run test --force`: PASS, icons 89, symbols 18, tiles 20, tokens 55, hexmap 66 and elements 11; all 10 workspace tasks pass. `bun test packages/boundaries`: PASS, 17 tests.
- Offline `bun test examples/observatory-preview docs/design-review/generators`: PASS, 90 tests, with only loopback IP traffic allowed for their temporary HTTP fixtures; external IP traffic remains denied.
- Offline, uncached `bun node_modules/turbo/bin/turbo run typecheck --force`, `node_modules/.bin/biome check .`, `node_modules/.bin/rumdl check .`, `node_modules/.bin/knip` and `bun docs/design-review/generators/build-boards.ts --check`: PASS.
- Offline `bun packages/icons/src/build.ts` and `bun examples/site-preview/build-pages.ts`: PASS; committed generated source and site pages remain unchanged.
- Offline `bun packages/icons/scripts/contact-sheet.ts --new realm,pillars,thriving,quiet,weathered`: PASS on three consecutive source-fixed runs with installed Playwright 1.64.1 and Google Chrome for Testing 156.0.8078.4. Each 2492 by 3014 PNG has SHA-256 `0dde8101079637aa7b9f6573f03c35274e27d3675202bae33985bc6f96d5d3ef`, exactly matching the previously committed sheet. The second run is byte-stable; visual inspection confirms the 78 glyphs, four sizes, navy strip and five brass borders.
- Offline roadmap and authoring audits in a fresh seed copy, with both Capitals registered read-only: zero failures, with the same five ITEM-2 project-registry warnings and one OWN-1 configuration warning as the unchanged baseline. They pass under the recorded pre-existing-warnings decision; every diagnostic matches the baseline exactly.
- Full offline repository audit: FAIL on both baseline and candidate, with exactly the same 119 failures and nine warnings. The failures comprise 116 pre-existing decision-record findings, one retired documentation-root finding and two isolated setup findings for the borrowed dependency link and memory scope. None is attributed to this correction or treated as passing; the responsible tracked files are unchanged.

### Outstanding concerns

No delivery blocker remains from the independent review. Kris's 21 October waiver of the pre-acceptance contact-sheet look stands: they will look after acceptance, and any redraw is new work. The known visual points remain that `thriving` and `quiet` differ only by chimney smoke, faint at 16 px, and `realm` is a conventional globe. This run does not accept the record. The unrelated full-audit failures remain as attributed above.

### Post-change review

Goal met: every Official or Agreed symbol names an existing glyph by test, the new glyphs pass the drawing contract, the README inventory agrees with the committed sources, and the repository generator now reproduces the committed review image exactly. Scope held to the returned findings and the shared review-image renderer; no glyph, meaning, runtime behaviour or dependency changed in this correction. The renderer also serves tile review images, whose PNGs were not regenerated; its software rendering was exercised directly by three full icon-sheet runs. Ready for independent review under the owner's standing waiver.

### Mini recap

Delivered the five glyphs, territory mapping and shared coverage test, then corrected the returned inventory count and made review-image rasterisation repeatable. The regenerated sheet exactly matches the committed PNG. Required tests, lint and focused audits pass with unchanged baseline warnings; unrelated full-audit failures remain attributed. The local renderer prerequisites now live in the icons README. Awaiting independent review, not accepted.

## Done

Accepted 21 October 2026 by GPT-6 (wow-day-ico-001-accept-b), under Kris's explicit authority, on the review packet above.

## Discussion

### Fresh independent acceptance - 21 October 2026

Independently reviewed the complete original 22-file delivery from `f41cbc5621f6c260b965c877d4126edf37b3147b` through `a3034a320e748594bb8e6a8033e50b4c111889cb`, the original acceptance findings, and the three-file correction `8515cb9c044af55b78edb2ac2dbced8fedb23ea3`, against unchanged local main at that correction. All planned Steps are complete; the six-part Review packet is present. The original baseline remains unchanged.

Kris explicitly authorised independent acceptance of KI-DESIGN-ICO-001 in ki-principal's `+/_WORK/ki.ways-of-working/decisions.md`, "owner answers" and "mark, afternoon unattended run", on 21 October 2026, under their 01:55 BST grant. Their answer, "I think on the design icons we can just go with it, and then I can take a look", waives the pre-acceptance contact-sheet look for this record only. They will look after acceptance, with any redraw as new work. This acceptance uses that specific override of the standing prohibition on accepting work records.

The returned findings are resolved: an exact inventory comparison confirms the README lists all 78 committed SVG names and states 78. A fresh offline run of the ordinary contact-sheet generator, with the five new glyphs highlighted and the corrected software renderer, reproduces the committed PNG byte for byte: 2492 by 3014 pixels, SHA-256 `0dde8101079637aa7b9f6573f03c35274e27d3675202bae33985bc6f96d5d3ef`. Independent visual inspection confirms the inventory, four sizes, navy strip and five brass borders; the known small-size distinction between `thriving` and `quiet` remains for Kris's later look.

Fresh offline uncached workspace tests, boundary tests, preview and generator tests, typecheck, Biome, rumdl, Knip, icon build, site-page generation and boards check all pass. Generated source, site pages and contact sheet remain unchanged. External IP traffic was denied throughout; only test fixtures were allowed loopback traffic. No dependency was installed.

The governing roadmap and authoring audits have zero failures in a fresh copied audit home with both Capitals registered read-only. The same five project-registry warnings and one authoring-configuration warning occur on the unchanged baseline and pass under the recorded pre-existing-warnings decision. The additional full repository audit still fails with the same attributed 119 baseline failures and nine warnings: 116 decision-record findings, one retired documentation-root finding and two isolated-home or borrowed-dependency findings. Their responsible tracked sources are unchanged; those unrelated failures are not waived or reported as passing.

The goal and drawing contract are met, the symbol mappings preserve meaning, and the shared coverage test enforces Official and Agreed coverage. No further delivery blocker was found. The record is accepted and retained; there is no pruning, tag, publication or release.

### Independent review - 21 October 2026

Returned to In Progress by the independent reviewer, wow-day-ico-001-accept, after reviewing the complete delivery from `f41cbc5621f6c260b965c877d4126edf37b3147b` to `a3034a320e748594bb8e6a8033e50b4c111889cb` against local main `bfb6a45aadd1dd4e4b782cf35a0ec6cd1e9309bf`. The delivery baseline remains unchanged in frontmatter.

Kris waived the pre-acceptance contact-sheet look on 21 October 2026: "I think on the design icons we can just go with it, and then I can take a look." This authority is recorded in ki-principal's `+/_WORK/ki.ways-of-working/decisions.md`, "owner answers" and "mark, afternoon unattended run". They will look after acceptance, with any redraw as new work. This failed review concerns the delivered evidence, not that deferred look.

- The inventory paragraph in [the icons README](../../packages/icons/README.md) still says 73 glyphs, although its opening paragraph, generated name list and SVG inventory contain 78. The stale count is present in the delivery commit and must be corrected before resubmission.
- The contact sheet regenerated offline with `--new realm,pillars,thriving,quiet,weathered`, existing Playwright and installed Chromium. Both copies are 2492 by 3014 pixels and visually show the same glyphs, order, sizes and brass borders, but they are not pixel-identical: 435,810 of 7,510,888 pixels differ. The committed PNG SHA-256 is `0dde8101079637aa7b9f6573f03c35274e27d3675202bae33985bc6f96d5d3ef`; the regenerated PNG is `b95420fb41e0a6922143b892422cef7e083579f3b5660ed54dedacb695a41b9b`. Establish the rendering difference or a reproducible renderer before claiming an exact match. The committed image is retained.
- Uncached package tests pass: icons 89, symbols 18, tiles 20, tokens 55, hexmap 66, elements 11 and boundary tests 17. The 90 preview and generator tests pass with external IP traffic denied and loopback allowed for their temporary HTTP fixtures. The seed's stricter network denial prevented those fixtures from binding; that setup failure is not a product regression.
- Uncached typecheck, Biome, rumdl, Knip, icon build, site-page generation and the boards check pass. Rebuilding icon source and site pages leaves their committed outputs unchanged.
- The governing roadmap and authoring audits have zero failures on the unchanged baseline, with pre-existing warnings for the unresolved project registry entry and authoring configuration drift. A full baseline audit also reports existing decision-record and retired-documentation-root failures, plus isolated-home and dependency-link findings; these are not treated as passing audits. No unrelated file is repaired or accepted here.

### Reproducible review rendering

The returned evidence problem was reproduced: two fresh default Chromium runs produced different PNG bytes from the same committed glyphs, including one with the reviewer's regenerated SHA-256. Disabling GPU rendering yielded three identical images in an isolated experiment; after putting `--disable-gpu` in the repository's shared rasteriser, three further runs with the ordinary generator and the real Chromium executable again yielded identical bytes. Their SHA-256 is `0dde8101079637aa7b9f6573f03c35274e27d3675202bae33985bc6f96d5d3ef`, which also matches the existing committed PNG. The regenerated image therefore needs no artificial content change. Reproduction is established for the recorded browser, installed fonts and scale; cross-platform byte identity is not claimed.

### Origin

Captured with the design system on 18 Oct 2026; the original "Done when" line is now the Verify section.
