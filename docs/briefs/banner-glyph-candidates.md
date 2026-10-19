# Banner glyph candidates

**Status: Proposed.** Five candidate line glyphs for the work model's banner states, drawn for Kit to judge. Kit answered on 20 October 2026 ([GDR-KI-DESIGN-037](../decisions/GDR-KI-DESIGN-037-banner-emoji-stay-the-notation.md)): the emoji stay the written notation, and a rendered surface may draw these glyphs with the state's words beside them. They stay proposed until the `ki-coordination` standard admits the rendered form. Nothing uses them, and they are not in `@knowledgeislands/icons`. The banner notation belongs to the [`ki-coordination` standard](https://github.com/knowledgeislands/ki-agentic-harness/blob/main/skills/change-management/ki-coordination/references/standards-coordination.md#banner) in `ki-agentic-harness`, which writes it with emoji today; the Observatory's Work tab prints it unchanged, because Kit chose one notation everywhere.

## What they would be

The recommendation is to keep the emoji as the standard's text notation, which reads the same in a terminal, a report or a commit message, and to offer these glyphs as an optional rendered form: a surface such as the Work tab could draw the line glyph with the state's words beside it. Any change goes to the `ki-coordination` standard first; the Work tab then follows it.

## The candidates

Each file follows the drawing contract in the [icons README](../../packages/icons/README.md) (24 grid, 1.5 stroke, round caps, single colour, no fills) and passes `lintIcon`. At 14 px they are drawn from the 24 px drawing, as the app shell draws every glyph today.

| State | File | Draw | Why |
| --- | --- | --- | --- |
| With worker | [`banner-worker.svg`](banner-glyphs/banner-worker.svg) | A mallet on its handle, laid against a short ground line | Work in hand, by whoever holds the tool: a person or an agent, never a robot head (iconography forbids them) |
| With supervisor | [`banner-supervisor.svg`](banner-glyphs/banner-supervisor.svg) | A head and shoulders, no face | The person whose move it is; no expression is drawn |
| Handoff to a named target | [`banner-target.svg`](banner-glyphs/banner-target.svg) | A map pin with a ring at its heart | A named destination on the chart; the target's name, written beside it, says whether it is other work, a run or a person |
| On hold | [`banner-hold.svg`](banner-glyphs/banner-hold.svg) | An anchor: ring, shank, stock and flukes | At anchor, not sailing: paused until a release |
| Finished | [`banner-finished.svg`](banner-glyphs/banner-finished.svg) | A swallowtail pennant on a staff planted in the ground | Arrived and planted; the line form of the chequered flag |

The handoff arrow stays a written `→` between two glyphs, as the standard writes it; it needs no glyph of its own.

## If Kit adopts them

1. The `ki-coordination` standard records the rendered form beside its emoji notation.
2. ki-design moves the five files into `packages/icons/svg/` under a new ICO record, adds them to the coverage test and the contact sheet, and releases.
3. The Observatory re-vendors them at a pinned ki-design commit, as it does every glyph.
