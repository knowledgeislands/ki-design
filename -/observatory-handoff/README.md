# Handoff to apps-observatory.local

**Start here:** [INSTRUCTION.md](INSTRUCTION.md) is the instruction for the Observatory build thread.

**Reply, 19 October 2026:** [ANSWER-2026-10-19.md](ANSWER-2026-10-19.md) is ki-design's answer to the Observatory's report back: what changed for each of the fourteen app wins, the open banner-glyph question, and what can be re-vendored.

Drafts produced in ki-design for the Observatory's own roadmap. They are proposals for the Observatory's product thread to shape, number (`KI-OBSERVA-*`) and accept under its own process; nothing here changes that repository. Source: the design brief (`docs/briefs/design-brief.md`, "First slices" and "The local app").

| Draft | Slice | Value | Builds on |
| --- | --- | --- | --- |
| [1](01-tailnet-read-only.md) | Reach across the tailnet, read-only (overtaken: the listener is host network work; the Observatory plans the read-only appearance) | Open the Observatory from any of Kit's machines | Loopback service; boundary spec |
| [2](02-git-tracker-parity.md) | Git repo tracker parity (overtaken: a Git view replaces Repositories) | Replace the Personal Git Repo Audit artifact day to day | Repositories instrument; 16 Oct intake |
| [3](03-known-lands-chart.md) | Known Lands chart v0 (flat SVG) | The whole realm at a glance | Repositories, Beacon, Activity evidence; `@knowledgeislands/hexmap` |
| [4](04-who-is-working.md) | Who is working | Agent runs and commit authors against what they touch | Sessions, Automation, Activity |
| [5](05-extensions-switchboard.md) | Extensions switchboard (overtaken: the inbound and outbound live-artifact adapters) | Core and island extensions on or off per scope | Artifacts host (OBS-ART) |
| [6](06-kit-tokens-and-glyphs.md) | Tokens and glyphs from ki-design (landed) | Looks like Knowledge Islands, light and night | PDR-KI-OBSERVA-002 digest vendoring |
| [7](07-instrument-restructure.md) | Instruments grouped by the four jobs | Fifteen tabs (sixteen with the Known Lands chart) become two to five per job | All instruments |

A working, read-only demonstration of slices 3, 4, 5 and 7 in the new design is in `examples/observatory-preview/` (run `bun run self:preview` in ki-design).

## How to take these (18 October 2026)

**Apply, don't impose.** Start from the Observatory as it is, and keep every tab, route and capability. Apply the design system first: slice 6 (tokens and glyphs), then the shell polish and per-tab upgrades shown in `docs/design-review/observatory/`. Restructuring into the four jobs and ten instruments (slice 7) comes last, one consolidation at a time and only where it clearly helps. See "How to use this spec" in [OBSERVATORY-DESIGN.md](../../docs/design-review/observatory/OBSERVATORY-DESIGN.md).

Note: the app has fifteen tabs, because Work was added on 18 October 2026, and the Known Lands chart makes sixteen before any consolidation.
