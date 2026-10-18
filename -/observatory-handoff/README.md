# Handoff to apps-observatory.local

Drafts produced in ki-design for the Observatory's own roadmap. They are proposals for the Observatory's product thread to shape, number (`KI-OBSERVA-*`) and accept under its own process; nothing here changes that repository. Source: the design brief (`docs/briefs/design-brief.md`, "First slices" and "The local app").

| Draft | Slice | Value | Builds on |
| --- | --- | --- | --- |
| [1](01-tailnet-read-only.md) | Reach across the tailnet, read-only | Open the Observatory from any of Kit's machines | Loopback service; boundary spec |
| [2](02-git-tracker-parity.md) | Git repo tracker parity | Replace the Personal Git Repo Audit artifact day to day | Repositories instrument; 16 Oct intake |
| [3](03-known-lands-chart.md) | Known Lands chart v0 (flat SVG) | The whole realm at a glance | Repositories, Beacon, Activity evidence; `@knowledgeislands/hexmap` |
| [4](04-who-is-working.md) | Who is working | Agent runs and commit authors against what they touch | Sessions, Automation, Activity |
| [5](05-extensions-switchboard.md) | Extensions switchboard | Core and island extensions on or off per scope | Artifacts host (OBS-ART) |
| [6](06-kit-tokens-and-glyphs.md) | Tokens and glyphs from ki-design | Looks like Knowledge Islands, light and night | PDR-KI-OBSERVA-002 digest vendoring |
| [7](07-instrument-restructure.md) | Instruments grouped by the four jobs | Fourteen tabs become two to five per job | All instruments |

A working, read-only demonstration of slices 3, 4, 5 and 7 in the new design is in `examples/observatory-preview/` (run `bun run self:preview` in ki-design).
