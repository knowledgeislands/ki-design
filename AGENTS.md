# AGENTS.md — ki-design

`ki-design` is the machine-readable Knowledge Islands design system. The [README](README.md) is the entry point and [DESIGN.md](DESIGN.md) is the complete system; this file keeps only standing contribution context.

## Working contract

- Meaning is canon. A symbol's meaning, a zone's name or a concept's definition changes in `ki-principal` (Philosophy or Aesthetics) through its Enactment Process first; this repository then follows. Never invent meaning here.
- Values and drawings are authoritative here. Token values, glyph drawings, tile manifests and component behaviour are changed here and released; consumers take a tagged release.
- Keep the charter: things both surfaces render with. No app code, no data access, no instruments, no network calls at runtime.
- Every colour role keeps the contrast floor recorded in DESIGN.md (text 4.5:1, large text and control boundaries 3:1) in light and night. A change that drops a pair below its floor fails review.
- The tile-set contract is complete or it is nothing: a tile set is valid only when it covers every id in the inventory, in every condition state, at 1× and 2×.
- Animation follows the clock: 12 fps, a 48-frame master cycle, loops of 4, 6, 8, 12, 16, 24 or 48 frames; frame 0 is the still image.
- Web components exist only for elements both surfaces use. Each exports its stylesheet as a string so consumers' density and contrast tests can read it.
- British English throughout. No i18n in V1.
- Treat generated art as unlicensed until the art-licensing decision is recorded.
- Preserve unrelated dirty work, stage only explicitly owned paths, and do not push, publish or release without separate authority.
