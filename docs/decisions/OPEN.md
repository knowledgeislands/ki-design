# Open questions

The design questions still open after 18 October 2026, each with its recommendation and how to draw meanwhile. They are not decision records: when Kit answers one, the answer becomes a record in this folder (see the [index](README.md)) and the entry leaves this list. A question about meaning is also carried into `ki-principal`.

The first part holds the questions from the design work; their recommendations come from the design review, the old DESIGN.md or the Decisions board in `docs/design-review/`. The second holds drift found between the data and the old DESIGN.md while it was split into [docs/spec/](../spec/README.md), where a choice is needed rather than a correction. Its recommendations are this restructure's, for Kit to accept or change.

## Design questions

### Bridge vs Causeway

Should the canon translation symbol be renamed Causeway, freeing Bridge for the app's command concept (Act's plan / confirm / receipt)?

- **Recommendation:** yes, rename it Causeway. One word with two meanings in one product will confuse, and the app already says Bridge for Act.
- **Affects:** the symbol entry, the `bridge` glyph, `structure/bridge` (an id rename is a major release), the site's Agents section.
- **Meanwhile:** draw the stone bridge for translation; in the app write "Bridge" only for the Act job; never put the bridge glyph on the Act job.

### Mill vs Engine house

Which name for the structure that stands for operational systems?

- **Recommendation:** the Mill. It is short and period-consistent, matches the waterwheel art, and leaves the Workshop as the only "forge". The tile and glyph id is already `mill`.
- **Meanwhile:** a stone house with a waterwheel, labelled "Mill (proposed)".

### Steward roles into canon

Write Steward, Archivist, Cartographer, Builder, Navigator, Scout, Historian and Guardian into `Philosophy/Model/Agents`, or map them onto its existing roles, before the Field Guide publishes them?

- **Recommendation:** map them onto the existing roles first and add only what is missing. The explainer mapping (Curator → Archivist and so on) shows most fit.
- **Meanwhile:** mark every role proposed in public copy.

### The local app's name

Keep "Observatory" as the product name until Gate B?

- **Recommendation:** keep it until Gate B. Kit has said the app will act, not only observe, so the name may be wrong; Gate B is the moment to decide with evidence. Its mark is the Observatory either way ([GDR-KI-DESIGN-009](GDR-KI-DESIGN-009-the-observatory-mark.md)); the Tower is no longer a candidate.
- **Meanwhile:** write "Observatory"; draw its mark as the domed Observatory.

### The curtain wall

Draw a low wall with open gates around the knowledge base in a territory's Principal repository, as the line between settled knowledge and work in motion, with the Enactment Process as its gate?

- **Status:** not adopted with the Capital ([GDR-KI-DESIGN-008](GDR-KI-DESIGN-008-the-capital-and-non-combative.md)). Kit liked the idea earlier; any answer must stay within the non-combative principle.
- **Recommendation:** revisit only with a form that does not read as a fortification.
- **Meanwhile:** draw no wall; keep the Capital open.

### The primary mark

The canon logo is a roundel (an island and an arch, `ki-principal/Pillars/Aesthetics/Logo/logo.png`); the site header and mood boards use a compass rose. Which is primary?

- **Recommendation:** the roundel stays the logo. The compass is the Realm's orientation motif and the candidate for favicon. The app's mark is the Observatory.
- **Meanwhile:** never substitute the compass for the logo.

### Night on the public site

Should the site follow the OS theme like the app shell, with or without a manual toggle?

- **Recommendation:** follow the OS, plus a small manual toggle. Night is the reference rendering and the site is where people meet it; a `theme` glyph already exists.
- **Meanwhile:** follow the OS.

### Arcadia drawn from live data

Publish the territory roster and freshness at build time, or keep the Arcadia page illustrative?

- **Recommendation:** a dated snapshot at build time, public islands only, stamped "Charted `YYYY-MM-DD`".
- **Meanwhile:** keep it illustrative.

### Art licensing

Who owns AI-generated art, and under which generator terms (KI-DESIGN-ART-002)?

- **Recommendation:** treat all references and generated art as unlicensed until ART-002 records the answer. Describe the style in our own words; state the "Ghibli-like" style risk plainly and keep studio names out of prompts.
- **Meanwhile:** treat references and generated art as unlicensed.

### Living Map without JavaScript

Is the no-JS state the static SVG plus a text list of districts?

- **Recommendation:** yes. `<ki-hexmap>` renders static SVG first, and the hero already lists districts in text.
- **Meanwhile:** build it that way.

### Instrument restructure

Adopt the ten-instrument grouping under the four jobs?

- **Recommendation:** yes, by convergence, as the Observatory design describes: apply the design to the app as it is first, then consolidate one instrument at a time.
- **Meanwhile:** keep today's instruments.

### The tailnet design

How does the app behave when opened from another of Kit's machines over the tailnet?

- **Recommendation:** read-only over the tailnet for now; Act stays on loopback until identity is designed. Write the design as a PDR in the Observatory.
- **Meanwhile:** Act is absent over the tailnet and receipts name the way in ("via tailnet as …").

### Lore sheet

One page of 8–10 named motifs for the Aesthetics pillar: the Great Library, the Capital, the Port and its customs house, the Mill, the tides as the cycle, the Known Lands and their fog, the compass, and Ruins as honoured retirement, with creatures, magic and crystals ruled out?

- **Recommendation:** yes, and decide Whale song with it, since it is a creature.
- **Meanwhile:** use only motifs the symbol library or [meaning.md](../spec/meaning.md) names.

### Further references

File the extra isometric building images into `Pillars/Aesthetics/Isometric Tiles`?

- **Recommendation:** yes, marked as references, not licensed art.

### Enact territory = archipelago

[GDR-KI-DESIGN-015](GDR-KI-DESIGN-015-islands-and-archipelagos.md) is agreed, but SDR-KI-PRINCIPAL-005 in `ki-principal` still says an archipelago is a grouping independent of jurisdiction.

- **Recommendation:** carry the change into `ki-principal` through its Enactment Process, and update `symbols.ts` (Territory and Archipelago) to the same words.
- **Meanwhile:** draw territories as archipelagos; the agreed item wins.

### The ki-design git history

The history still contains Observatory screenshots with private repository names and commit messages. No secrets are in them.

- **Recommendation:** leave it. Rewriting means a force-push to a public repository.

## Drift needing a decision

### Symbol statuses

`symbols.ts` and the old DESIGN.md disagree, and `ki-principal`'s Symbol Library (seventeen canonical symbols) settles some of them:

| Symbol | `symbols.ts` | Old DESIGN.md | `ki-principal` |
| --- | --- | --- | --- |
| Bridge | agreed | official (name open) | Canonical symbol ("Translation layer") |
| Cartographic grid | agreed | official | Canonical symbol ("Structure / orientation") |
| Library | official | official | Held in the Capital (GDR-KI-PRINCIPAL-011); not in the list of seventeen |
| Lantern | official | agreed | Not listed |
| Storm | official | proposed | Not listed |
| Fog | proposed | official | Listed only in the terrain language ("Experimental ideas: fog / shifting sands") |

- **Recommendation:** mark Bridge and Cartographic grid official, as `ki-principal` lists them. Mark Lantern agreed and Storm proposed until `ki-principal` names them. Keep Fog proposed, with a note that the canon uses it as a terrain metaphor. Library stays official.
- **Meanwhile:** the spec reads statuses from `symbols.ts`; do not ship Storm as settled.

### Symbol meanings

Some meanings in `symbols.ts` differ from the old DESIGN.md and from `ki-principal`. Examples: Pillars ("the foundational principles", against "owned, canonical knowledge"); Streams ("flows of incoming material", against "knowledge in motion: initiatives, projects, roadmap"); Territory ("a region held together by purpose", against "islands governed together under one Capital"); Dock ("exchange by sea", against "material carried in by hand").

- **Recommendation:** align `symbols.ts` with the `ki-principal` wording, which is where meaning is decided, and keep its own phrasing only where `ki-principal` has none.

### Loop lengths

The Modern manifest declares the lighthouse lamp at 12 frames and the mill at 16. The animation standard and the old DESIGN.md say 24 (a slow sweep) and 12 (one turn per loop).

- **Recommendation:** change the manifest to 24 and 12. No frames beyond frame 0 are drawn yet, so nothing is lost.

### Footprints in the contract

The contract fixes only the Capital's footprint (a flower). The old DESIGN.md gave the Council Hall and the Workshop pairs, the Library single or pair, the Port pair or flower, and the ancient forest single or flower. Modern v0 draws all of them on one hex except the Port (a pair). The old DESIGN.md also listed manifest fields the contract does not have: the flat SVG twin, the family, the palette and an `edge` footprint.

- **Recommendation:** keep footprints a set's choice, apart from the Capital, and add the missing fields to the contract when the Ancient set needs them.

### Towers in the architectural families

The Collegiate family lists towers and the Civic harbour town lists clock towers, but the symbol language has no towers.

- **Recommendation:** keep a clock tower (it already draws the Calendar zone) and cloister towers as architecture, never fortified and never on the Capital; or drop them from the families. Kit to choose.

### Tokens the prose names but the data lacks

The old DESIGN.md used values that are not tokens: `space-0` and a 96 px hero step; a round radius (999 px); the fog colour (`#cfd3d6` light, `#657384` night); both type scales and `--font-identifier`; the UI easing and durations. The app's system font stacks in `tokens.json` also differ slightly from the stacks the old DESIGN.md quoted.

- **Recommendation:** add the fog colour, `space-96`, `radius-round` and the motion easing and durations to `tokens.json` in a minor release. Keep the type scales in prose until the Observatory's published scale is vendored. Treat the token font stacks as authoritative.

### The terrain ocean token

`color.terrain.ocean` is `#2f5878`, the water of the Modern isometric tiles. The flat chart paints ocean hexes in the theme's `sea` instead, as the old DESIGN.md said; ink on `#2f5878` is only 2.16:1.

- **Recommendation:** rename it, for example `color.tile.water`, or describe it as isometric water only, in a major or minor release as the rename requires.

### Brass accents in glyphs

The old DESIGN.md allowed small brass accents in glyphs (a lamp, a flame, a star point, up to 10 % of the live area). The icon lint forbids fills and colours, and no glyph has one.

- **Recommendation:** keep glyphs single-colour. Where a brass accent matters (the Beacon's flame), apply it in the consumer, not in the glyph file.
