---
title: Voice and copy
status: draft
updated: 2026-10-18
---

# Voice and copy

Knowledge Islands writes like a good atlas or a scientific publication: calm, exact, unhurried and hopeful. The metaphor carries warmth and the sentences carry precision. This file sets the tone, the words to use and avoid, sentence style, worked examples and naming conventions, for copy on the site, in the local app and in anything an AI designer writes.

## Tone

Confident statements, plain words, one idea per sentence. Never breathless, never salesy, never cute.

| Be | Not |
| --- | --- |
| Calm and declarative | Hype, exclamation marks, "revolutionary", "supercharge" |
| Specific: name the place, the record, the time | Vague: "stuff", "things", "magic" |
| Metaphor that maps to meaning ([meaning.md](meaning.md)) | Decorative fantasy: quests, spells, levelling up |
| Human-centred: people and agents work _in_ the realm | AI as hero or threat |
| British English: organise, colour, centre, catalogue, programme, licence (noun) | US spelling |

## Words

| Use | Avoid | Why |
| --- | --- | --- |
| realm, territory, island, Capital | estate (in display copy), workspace, tenant; Citadel, Tower | [world.md](world.md); GDR-KI-PRINCIPAL-011 |
| Port | Harbour | Retired 18 Oct 2026 (GDR-KI-PRINCIPAL-010) |
| steward, tend, ratify, chart, voyage | own, harvest, crush, hack | Stewardship over extraction |
| workers; Steward, Archivist… | bots, minions, copilots (as a class) | Agents are workers, human or AI |
| thriving · quiet · weathered · ruined | health score, 96 % harmony, map completion 34 % | No game scores |
| Known Lands | the metaverse, the grid | Canon name |
| Capture · Connect · Reflect | ingest · process · output | Canon cycle |
| observe, attend, act, extend | monitor, alert, execute, plugin | The local app's four jobs |
| Official · Agreed · Proposed · Open (status labels) | Canon, Decided (as labels) | GDR-KI-DESIGN-002; "canonical knowledge" stays the term for ratified knowledge |

## Sentence style

- Sentence case for headings, buttons and labels. Title Case only for proper names (Council Hall, Map of Known Lands).
- Cartouche and map labels are set in small caps by the typeface, not typed in capitals.
- Headlines: one short declarative sentence ending in a full stop. Subheads: one sentence, under 20 words.
- Microcopy: verb first, under six words. Errors say what happened and what to do.
- Numbers: figures for all counts. Dates `YYYY-MM-DD`. Times `YYYY-MM-DD HH:MM` (24-hour, local). Never "3 days ago" alone in the app; relative time may follow the stamp in muted text. See [typography.md](typography.md#figures-and-dates).
- No emoji anywhere. Use glyphs ([iconography.md](iconography.md)).

## Examples

| Kind | Good | Why it works |
| --- | --- | --- |
| Headline (home) | **Knowledge is a civilisation question.** | Canonical; declarative; stays |
| Banner | **Tools change. Landscapes endure.** | Canonical; two beats |
| Section head | The Port — Capture | Place, then cycle step (replaces "The Harbour — Capture") |
| Subhead | Information arrives without judgement and is routed inward. | Says what happens |
| CTA (brass) | Enter Arcadia | Place as verb; one primary per page |
| Secondary CTA | Begin the journey · Explore the map | Quiet outline |
| Archetype card | Engineering Forge — Build, ship and evolve software systems. | Name + one line |
| Empty state (app) | No signals. The realm is quiet. | Calm, true |
| Foot-of-view note (app) | Ranked by severity, then by last change. Gold: attention. Rust: blocking. | Rules below the data |
| Confirmation (app) | Pull 3 repositories in territory `hnr`? This changes files on disk. | Names scope and effect |
| Receipt (app) | Pulled 3 of 3 · 2026-10-18 09:42 · via loopback | Outcome, time, way in |
| Don't | 🚀 Supercharge your knowledge with AI! | Emoji, hype, AI as hero |

## Naming conventions

| Thing | Convention | Example |
| --- | --- | --- |
| Product names | Title Case, no articles | Knowledge Islands, Map of Known Lands, Living Map |
| Places in copy | "the" + Title Case | the Port, the Council Hall, the Capital |
| Repository / record ids | Monospace, exact case | `ki-principal`, `PDR-KI-OBSERVA-002` |
| Tokens | kebab-case, role first | `--paper`, `--wash-ok`, `--color-terrain-marsh` (the token build's names; see [colour.md](colour.md)) |
| Glyph ids | kebab-case noun, matching the tile name where both exist | `council-hall`, `rail-depot` |
| Tile ids | `<kind>/<id>`, as the contract keys them | `terrain/marsh`, `structure/dock`, `decal/ivy` |
| Components | `ki-` prefix; only the two shared elements | `<ki-glyph>`, `<ki-hexmap>` |
| Packages | `@knowledgeislands/<name>` | `@knowledgeislands/tokens` |
| Repository | `ki-design` | — |
| Decision records | Existing series only; ids never rewritten | `PDR-KI-OBSERVA-007`, `GDR-KI-DESIGN-003` |
