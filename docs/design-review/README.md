# Design review boards

The interactive review of the Knowledge Islands design system, as published to Claude Design.

- `boards/` — the eight review boards (`Ds*.dc.html`), the Arcadia reference board and their `canvas.json`, as published to the canvas **Knowledge Islands — Design System**: Overview, Meaning, Colour, Type and voice, Icons, Tiles, Structure, Decisions. They are generated: do not edit them by hand.
- `generators/` — `build-boards.ts`, which builds the boards, its test, and `templates/`, one template per board.
- `explorations/` — the earlier exploration boards, as published to **Knowledge Islands — Early Explorations**. Kept for history; superseded by the review boards.
- `observatory/` — the Observatory overhaul: `OBSERVATORY-DESIGN.md`, the screen spec, and seven screen boards (`Obs*.dc.html`) for the shell, Attend, Observe, Act, Extend and the fifteen-tabs-to-ten-instruments map. Synthetic data only, and not generated.

The boards are `.dc.html` Design Components (Claude Design's format): they render in Claude Design, not as plain HTML pages. Images are referenced by `/_blob/<id>` urls that resolve only inside their canvas; the originals are in `packages/tiles/sets/modern/` and `examples/`.

## How the boards are generated

The boards are built from the repository's data and decision records, so the review cannot drift from the spec.

| Board | From data | Hand-written in its template |
| --- | --- | --- |
| Icons | Every glyph in `packages/icons/svg/`; groups and briefs from `docs/briefs/glyph-briefs.md`; meanings and statuses from `symbols.ts`; value icons and the glyph rules from `docs/spec/iconography.md` | The layout and controls |
| Meaning | Every symbol in `symbols.ts` (meaning, status, category, glyph, site, app, notes) and its retired ids; "Drawn as" from the tables in `docs/spec/meaning.md` | The layout and controls |
| Decisions | Agreed: each `docs/decisions/GDR-KI-DESIGN-*.md` (title, summary, decision, date, path). Open: each question in `docs/OPEN.md` (question, recommendation, meanwhile, affects) | The layout and controls |
| Colour | Every role, wash, sea, core and terrain value from `tokens.json`; night terrain from `nightTerrain()`; contrast ratios | The notes on each colour, fog and the island palettes |
| Type and voice | Font stacks from `tokens.json`; both type scales from `docs/spec/typography.md` | Specimens, voice rules and the do and don't pairs |
| Tiles | The Modern manifest (tiles, footprints, loops, conditions, aliases); contract counts from `packages/tiles`; what moves from `docs/spec/motion.md`; families from `docs/spec/tiles-and-buildings.md` | Geometry and building drawings, the standards |
| Overview | Symbol statuses for the layers, the realm-to-island chain and the zones; the board list | Essence, principles, how to read |
| Structure | The Voyage order from GDR-KI-DESIGN-011; record ids; Open chips checked against `OPEN.md` | Page and instrument descriptions |
| Arcadia | The GDR-KI-DESIGN-014 summary and record ids | The commentary on the painting |

`canvas.json` keeps every board's position and the canvas order; the generator sets only each generated board's title and height.

A template is the board's own markup and logic with every value from data written as a marker, `@@kind:argument@@`: for example `@@token:color.role.night.warn@@`, `@@status:capital@@`, `@@json:symbols@@` or `@@gdr-title:018@@`. The generator fails on a marker it cannot resolve, so a renamed token, a removed symbol or an answered open question breaks the build instead of leaving a stale board.

## Regenerate and check

```bash
bun run self:boards               # rebuild boards/ from the sources
bun run self:boards -- --check    # fail if the committed boards differ
bun test docs/design-review/generators
```

`bun run test` runs the check: it fails when a source changes and the boards were not rebuilt, and checks that every board keeps the Design Component shell, a fixed root matching its canvas height, balanced tags and holes that resolve. To change a board, edit its template in `generators/templates/` or the source it reads, then rebuild.
