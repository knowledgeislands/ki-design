# Briefs

Task briefs that a person, the local app or an AI designer (Claude, ChatGPT) can pick up and execute. Each brief says what to produce, to what standard, and how it will be judged. The rules they apply live in [DESIGN.md](../../DESIGN.md) and the [spec](../spec/README.md); the reasoning lives in the [design brief](design-brief.md) and the [concept atlas](concept-atlas.md).

**Resuming after a break?** Start with [Resume: the design thread](resume-design-thread.md): where everything is, what's decided, what's open and what's next.

| Brief | Produces | Status |
| --- | --- | --- |
| [Picture of Arcadia](arcadia-picture.md) | Ancient art reference | [Variation 1 chosen](arcadia-handoff.md) |
| [Tile set: Modern](tile-set-modern.md) | The clean, engraved, flat tile set used by the local app, docs and small sizes | v0 drawn: `packages/tiles/sets/modern/` |
| [Tile set: Ancient](tile-set-ancient.md) | Painted tiles for site and posters | Reference chosen; see [handoff](arcadia-handoff.md) |
| [Hex terrain research](hex-terrain-research.md) | Sources, local evidence and composition rationale | Proposed |
| [Hex terrain Claude handoff](hex-terrain-claude-handoff.md) | Review request for the proposed composition model | Ready for review |
| [Ancient prompt pack](ancient-prompt-pack.md) | One ready-to-paste image prompt per tile in the contract | Ready to run |
| [Ancient tiles, batch 1](ancient-batch-1.md) | One copy-paste instruction for the ChatGPT or Codex app: the 12 terrains and the hero structures, saved unaltered to `+/art/` with notes | Run 19 Oct 2026; painted squares, re-projected onto the hex |
| [Ancient tiles, batch 1b](ancient-batch-1b.md) | Six tiles painted on a geometry template, testing the template method and the dusk light | Ready to run |
| [Building standards](building-standards.md) | The rules every building and tile follows | Draft standard |
| [Animation standard](animation-standard.md) | The shared clock all animated tiles follow | Draft standard |
| [Illustrated explainer style](explainer-style.md) | Posters, explainers and the Field Guide's "How the map works" | Ready |
| [Prompt library](prompt-library.md) | Copy-paste image prompts: master prompt, Arcadia, terrain, structure, Port district, explainer poster, icon tracing, negative list | Ready |
| [Glyph briefs](glyph-briefs.md) | One line per glyph saying what to draw | Reference for the 73 drawn glyphs |
| [Banner glyph candidates](banner-glyph-candidates.md) | Five line glyphs for the work model's banner states, for Kit to judge | Proposed: an open question in `OPEN.md` |

## Reference images

Kit's chosen art direction, in [references/](references/):

| File | What it shows | Use it for |
| --- | --- | --- |
| `mood-website-dusk-a.png`, `mood-website-dusk-b.png` | The public site at dusk: painted hex-plinth islands on a navy sea, lamp-lit settlements, cartouches, journey rail, Living Map, archetype cards, Create wizard, terrain / structure / role catalogues | The Ancient set and the site |
| `explainer-hex-and-isometric.png` | How hex topology and isometric rendering combine, layer by layer | The tile kit and "How the map works" |
| `explainer-how-gstack-works.png`, `explainer-agentic-operating-system.png` | Daylight watercolour islands, parchment cartouches, coloured line icons in roundels, dashed routes, a tide loop | The Illustrated explainer style (style reference only: how a diagram is drawn, not what it says) |

Canonical asset sheets stay in Knowledge Islands Principal: `Pillars/Aesthetics/Isometric Tiles/` (two painted square-grid tile sheets), `Pillars/Aesthetics/Symbol Library/` (reference sheet and illustrations) and `Pillars/Aesthetics/Logo/`.

Treat the reference images and any art generated from these briefs as unlicensed until the art-licensing decision is recorded.
