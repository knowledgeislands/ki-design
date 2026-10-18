# AGENTS.md — ki-design

`ki-design` is the machine-readable Knowledge Islands design system. The [README](README.md) is the entry point. [DESIGN.md](DESIGN.md) is the short design system: essence, principles, hard rules and status words, with a map to [docs/spec/](docs/spec/README.md), one self-contained file per area. The data in `packages/` is the source of truth for values. This file keeps only standing contribution context.

## Working contract

- Meaning is canon. A symbol's meaning, a zone's name or a concept's definition changes in `ki-principal` (Philosophy or Aesthetics) through its Enactment Process first; this repository then follows. Never invent meaning here.
- Data is the source of truth. `tokens.json`, `symbols.ts`, the glyph SVGs and the tile contract and manifests hold the values; the spec in `docs/spec/` points to them and never restates their tables. Where prose and data disagree, fix the prose, or list the question in `docs/decisions/OPEN.md` when a decision is needed.
- One decision, one record in `docs/decisions/`. Open questions are not records; they live in `OPEN.md` until answered.
- Values and drawings are authoritative here. Token values, glyph drawings, tile manifests and component behaviour are changed here and released; consumers take a tagged release.
- Keep the charter: things both surfaces render with. No app code, no data access, no instruments, no network calls at runtime.
- Every colour role keeps the contrast floor recorded in [docs/spec/accessibility.md](docs/spec/accessibility.md) (text 4.5:1, including large display text; control boundaries 3:1) in light and night. A change that drops a pair below its floor fails review.
- The tile-set contract is complete or it is nothing: a tile set is valid only when it covers every id in the inventory, in every condition state, at 1× and 2×.
- Animation follows the clock: 12 fps, a 48-frame master cycle, loops of 4, 6, 8, 12, 16, 24 or 48 frames; frame 0 is the still image.
- Web components exist only for elements both surfaces use. Each exports its stylesheet as a string so consumers' density and contrast tests can read it.
- British English throughout. No i18n in V1.
- Treat generated art as unlicensed until the art-licensing decision is recorded.
- Preserve unrelated dirty work, stage only explicitly owned paths, and do not push, publish or release without separate authority.
