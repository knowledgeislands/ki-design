---
title: Governance and versioning
status: draft
updated: 2026-10-18
---

# Governance and versioning

Meaning is decided in `ki-principal`; values and drawings are decided here. This file says which repository wins on what, how meaning changes, how this repository records its own decisions, how releases are versioned, and how a design is judged before it is called done. The status labels used throughout are defined in [DESIGN.md](../../DESIGN.md#status-vocabulary) and recorded in [GDR-KI-DESIGN-002](../decisions/GDR-KI-DESIGN-002-status-labels-official-agreed-proposed-open.md).

## Canon and this repository

| | `ki-principal/Pillars/Aesthetics` | `ki-design` (this repository) |
| --- | --- | --- |
| Holds | Prose canon: Visual Style, Symbol Library, Isometric Tiles, Diagrams, Logo; meaning | Machine-readable authority: tokens, glyphs, symbol data, tile contract and sets, hexmap, elements, and this spec |
| Changes by | The `ki-principal` **Enactment Process** (Stream ↔ Council → Pillars) and its GDRs | A change on `main`, Kit's approval, a semver release |
| Wins on | **Meaning** | **Values** (hex, px, ids), within the meaning canon sets |

The home of the kit is recorded in [GDR-KI-DESIGN-017](../decisions/GDR-KI-DESIGN-017-ki-design-is-the-home-of-the-design-kit.md).

## How meaning changes

Meaning never changes in `ki-design` first. A new symbol, a renamed concept (Harbour → Port) or a role is proposed as a Stream, reviewed in the Council Hall and ratified into the Aesthetics pillar; for a model zone, also into Home of Knowledge and Structure. The Port was enacted by GDR-KI-PRINCIPAL-010 and the Capital by GDR-KI-PRINCIPAL-011. Only then is a symbol marked _official_ here.

## How this repository records decisions

- Each significant design decision has one record in [`docs/decisions/`](../decisions/README.md), following [GDR-KI-DESIGN-001](../decisions/GDR-KI-DESIGN-001-adopting-decision-records.md). Records are living present-state documents: when a decision changes, its record is updated in place.
- An open question is not a record. It is listed in [`docs/OPEN.md`](../OPEN.md) with its recommendation and how to draw meanwhile, until Kit answers it; the answer then becomes a record.
- A decision about meaning is carried into `ki-principal` as well; the record here points to the principal record.

## Data is the source of truth

The data files hold the values; prose points to them and never restates their tables.

| Data | File |
| --- | --- |
| Tokens | `packages/tokens/tokens.json` |
| Symbols | `packages/symbols/src/symbols.ts` |
| Glyphs | `packages/icons/svg/` |
| Tile contract | `packages/tiles/src/contract.ts` |
| Modern tile set | `packages/tiles/sets/modern/manifest.json` |
| Map model | `packages/hexmap/src/model.ts` |

Where prose and data disagree, the data wins, unless a decision record says otherwise. Where the data itself seems wrong, the question goes in `OPEN.md` rather than being guessed.

## Versioning

- `ki-design` and every `@knowledgeislands/*` package follow **semver**. A removed or renamed token, glyph id or tile id is **major**; a new one is **minor**; a value tweak within its floor is **patch**.
- Each release publishes a **SHA-256 digest** of the token declarations. The local app vendors tokens by digest (PDR-KI-OBSERVA-002; from `ki-design` since PDR-KI-OBSERVA-008 recorded the switch); a hand edit fails its test. See [GDR-KI-DESIGN-013](../decisions/GDR-KI-DESIGN-013-dtcg-tokens-vendored-by-digest.md).
- Both apps render from one tagged kit release with matching digests.
- Packages are pinned by exact version and lockfile integrity in the app.

## How designs are judged

Kit approves token changes. Mockups (as Design artifacts) are judged against the do and don't list in [DESIGN.md](../../DESIGN.md#do-and-dont) and the contrast floors ([accessibility.md](accessibility.md)), with the verdict recorded as a comment on the artifact. A design passes when:

- every meaning used has an entry in the symbol library or in [meaning.md](meaning.md);
- every colour is a token;
- every text pair meets its floor;
- the app's density (12 Beacon rows at 800 px) and width (720 px, no horizontal scroll) budgets hold;
- nothing on the never-draw list ([illustration.md](illustration.md#never-draw)) appears.

**Success:**

- a newcomer can name Island, Capital, Library, Council Hall, Port and Streams after reading the home page (a five-person hallway test);
- the Known Lands chart v0 shows the real realm with condition states, inside the density and width budgets.
