# Design review boards

The interactive review of the Knowledge Islands design system, as published to Claude Design.

- `boards/` — the eight review boards (`Ds*.dc.html`) and their `canvas.json`, exactly as published to the canvas **Knowledge Islands — Design System**: Overview, Meaning, Colour, Type and voice, Icons, Tiles, Structure, Decisions.
- `explorations/` — the earlier exploration boards, as published to **Knowledge Islands — Early Explorations**. Kept for history; superseded by the review boards.
- `generators/` — the one-off scripts that produced some boards from `tokens.json`, `symbols.ts` and `DESIGN.md`. They still carry the scratch paths they were written with.

The boards are `.dc.html` Design Components (Claude Design's format): they render in Claude Design, not as plain HTML pages. Images are referenced by `/_blob/<id>` urls that resolve only inside their canvas; the originals are in `packages/tiles/sets/modern/` and `examples/`.

## Status

Hand-written snapshot, 18 October 2026. The plan is to generate these boards from the source data and the decision records (`docs/decisions/`), so the review can never drift from the spec. Until then, a change to the data means regenerating or editing the board by hand.
