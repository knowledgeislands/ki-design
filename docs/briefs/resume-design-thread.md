# Resume: the Knowledge Islands design thread

This page holds everything needed to pick the design work up again after a break. Kit or any agent can use it. The state is as of **19 October 2026, 07:10**.

Start here, then read [`DESIGN.md`](../../DESIGN.md), the short entry point, and only the file in [`docs/spec/`](../spec/README.md) for the area you need.

## Where things are

| What | Where |
| --- | --- |
| Design system spec | `DESIGN.md` (the entry point, about 2,500 words) and `docs/spec/` (one file per area; `MIGRATION.md` maps the old sections) |
| Machine-readable data | `packages/tokens/tokens.json`, `packages/symbols/src/symbols.ts`, `packages/icons/svg/` (72), `packages/tiles/sets/modern/manifest.json` |
| Briefs for art and ChatGPT | `docs/briefs/` (README, picture of Arcadia, tile sets, prompt pack, prompt library, glyph briefs, building and animation standards, explainer style) |
| Chosen Arcadia painting | `docs/briefs/references/arcadia.png` (variation 1). Handoff and the fixes still to make: `docs/briefs/arcadia-handoff.md` |
| Review boards, saved | `docs/design-review/` (nine boards, early explorations, generator scripts) |
| Decision records | `docs/decisions/` (GDR-KI-DESIGN-001 to 017); open questions in `docs/decisions/OPEN.md` |
| Roadmap | `ROADMAP.md`, `docs/roadmap/` |
| Observatory handoff drafts | `-/observatory-handoff/` |

### claude.ai artifacts

All are private to Kit's account and show in his artifacts list.

- **Knowledge Islands — Design System** (Claude Design canvas): <https://claude.ai/artifact/HDoCgCDLMqMarEDToTU9i4>. Holds the eight review boards plus "Arcadia, painted".
- **Knowledge Islands — Early Explorations** (canvas): <https://claude.ai/artifact/LfDvXXQxPFqYpJ18mg911m>. Kept for history.
- **Knowledge Islands — Design Brief** (doc): <https://claude.ai/code/artifact/01ee18ce-7756-4f70-bc29-f26699c44711>. Its first tab, **Changes since we last spoke**, is the running log.
- **Knowledge Islands** (Design System artifact): <https://claude.ai/artifact/LWcv6ZziyZFCU8Xq8r1Z4A>. Rebuilt from ki-design main@47fe831; Claude uses it when making Knowledge Islands slides, docs and designs.

### Other repositories

- **apps-knowledgeislands.info.** Design v1 is live. Port wording is in place. The home page and `/arcadia/` both open on the painting, with the engraved chart below it. The record of the work is in SITE-044 and SITE-045.
- **ki-principal.**
  - GDR-KI-PRINCIPAL-010, _The Port_: the Port replaces the Harbour, with four modes (dock, rail depot, airport, customs house). Lighthouse means guidance; Council Hall means governance.
  - The note _Influences Along the Way_ covers gstack, Paperclip, Gas City, Hermes and OpenClaw.
  - ki-design is listed in Known Lands.
  - GDR-KI-PRINCIPAL-011, _The Capital_: the Capital is the civic heart, holding the Library and the Council Hall, drawn civic and never fortified; the symbol language stays non-combative; the Observatory is the local app's mark. (An earlier GDR-011, _The Citadel and the Tower_, was withdrawn; the number was reused, as the serials run contiguously.)

## Decided

- Port replaces Harbour. This is official in ki-principal and ki-design, and on the site.
- Lighthouse means guidance and Council Hall means governance. Both are official.
- **The Capital, and nothing combative** (Kit, 18 October, 18:01: "I think it's capital... Let's stay with something which isn't considered to be Combative"). Recorded in GDR-KI-PRINCIPAL-011.
  - The Capital is the only name for the civic heart. It holds the Library and the Council Hall, and is drawn as a square, never a fortress: a civic quarter and square in Modern, a hilltop forum or acropolis in Ancient.
  - "Citadel" is retired; the Tower is dropped. The Observatory is the local app's mark.
  - The curtain wall is not adopted; it stays open under the non-combative principle.
- **Status labels: Official · Agreed · Proposed · Open** (Kit: "rename Cannon to official"). Canon became Official and Decided became Agreed, in the data (`official`, `agreed`) as well as the labels. Recorded in GDR-KI-DESIGN-002.
- "The painting is the legend; the chart is the map." The painting leads: it is the home hero (live since site commit 07f4c02, Kit's call on 18 October) and the `/arcadia/` hero. The engraved Modern chart follows it: the Arcadia section on the home page, the chart on `/arcadia/`, diagrams and the local app. A chart/painting switch comes later, once the Ancient tiles exist.
- ki-design is public under the MIT licence and conforms to the KI repository standard. The audit's only remaining failure is DESIGN-2.
- DESIGN.md is restructured as: data files, a short DESIGN.md (about 2,500 words), `docs/spec/*`, and one decision record per decision (done on 18 October; see `docs/spec/MIGRATION.md`). The boards are next to be generated from those.
- How Kit works:
  - Push straight to main, with no pull requests.
  - Give ChatGPT prompts as copy-paste code blocks that point at files in the repo; never ask Kit to upload images.
  - Keep a "mark" and report everything since it when Kit asks.
  - Pass anything off-track to Kit's input thread as a hand-off.

## Open: Kit to answer

1. **The curtain wall.** Not adopted with the Capital. The idea was a low wall with open gates around the knowledge base in a territory's Principal repository, the line between settled knowledge and work in motion, with the Enactment Process as its gate. Any answer must stay within the non-combative principle.
2. **ki-design git history.** It still contains Observatory screenshots with private repository names and commit messages. No secrets are in them. The recommendation is to leave it; rewriting means a force-push.
3. **The remaining open questions, now listed with recommendations in `docs/decisions/OPEN.md`:** Bridge or Causeway, Mill or Engine house, the logo (roundel or compass), the app's name (its mark is settled as the Observatory), the curtain wall, steward roles, a night toggle on the site, Arcadia drawn from live data, art licensing (KI-DESIGN-ART-002), the tailnet design, and the 14 → 10 instrument restructure.

## Kit's to-dos on the Mac

```text
cd ~/workspaces/knowledge-islands/ki-design
ki registry add --repo ~/workspaces/knowledge-islands/ki-design
ki repo repair --repo ~/workspaces/knowledge-islands/ki-design
bun install && git config core.hooksPath .githooks
```

Also mark ART-001 (the picture of Arcadia) done, since variation 1 has been chosen.

## Next steps, in order

Done since 18 October: the painting second round (Kit kept the original), the Capital and Official/Agreed decisions, the Capital glyph and Modern Capital tile, the DESIGN.md restructure (entry point, `docs/spec/`, GDR-KI-DESIGN-003 to 017, `OPEN.md`), boards generated from data (`bun run self:boards`, drift-checked in `bun run test`), the Observatory design boards and the apply-first hand-off to the Observatory thread (`-/observatory-handoff/INSTRUCTION.md`), and the site polish pass.

1. **Kit's answers on `docs/decisions/OPEN.md`.** Each answer becomes a GDR; symbol-level ones also go to ki-principal. Then run `bun run self:boards` and republish the canvas.
2. **Drift needing a decision** (bottom of `OPEN.md`): symbol statuses and meanings, loop lengths, footprints, missing tokens, the terrain ocean token, glyph accents.
3. **Ancient tile set** from the original painting's atmosphere, following `docs/briefs/tile-set-ancient.md` and `ancient-prompt-pack.md` (ChatGPT drops candidates in `+/art/`).
4. **Site.** The v1 copy left out still needs Kit's words (the six principles, "Tools change. Landscapes endure."); `/docs/` heading order (h1 to h3); faint chart cartouche labels on dark; moving the Model and Philosophy inline styles into classes.
5. **Observatory.** The build thread applies the design; fold its feedback back into `docs/design-review/observatory/`.


## Hand-offs already given to Kit's input thread

- **Acquiring artifacts** from Claude (Artifacts, Design canvases, Docs, Design System artifacts) and from ChatGPT back into the repositories as editable source, using the acquisition model in ADR-KI-PRINCIPAL-001. `docs/design-review/` is the manual worked example.
- **ki-design DESIGN-2:** the dependency-cruiser boundary ruleset. CI stays red until it is done.
- **ki-design project registry:** add a `ki-design` project to ki-principal, or retag the roadmap items.
- **The ki-design history decision** (open item 3 above).

## Working notes for agents

- **Reaching Kit's Mac.** The repositories sit under `/Users/krisbrown/workspaces/knowledge-islands/` and are reached through the device bridge.
  - The bridge shell has no bun, no ki and no git identity.
  - Commit with the git-audit commit tool, which runs hooks on the host. It takes a single-line message and the exact paths, and it rejects paths that start with `-`.
  - For shell git, add `-c user.name="Kris Brown" -c user.email=kris@kris.me.uk`.
- **Builds and tests.** Run them in a container copy: tar into the repository's `-/` folder, stage it, then run bun from npm.
- **Commit messages.** Commitlint allows the types chore, docs, feat, fix, refactor and test. There is no `revert` type, and headers are limited to 100 characters.
- **Before committing anything public:**
  - Never commit screenshots or fixtures taken from real estate data.
  - The `/_blob/` image URLs in the boards resolve only inside their canvas.
- **Shared repository.** Other threads commit in ki-principal and ki-design. Commit only your own paths, and fetch and rebase before pushing.
- **Moving files back to the Mac.** Send images and SVGs inside a tarball. Copying them one by one through the bridge adds C2PA metadata, which breaks the icon lint and the hexmap tests.
- **Pushing.** GitHub over SSH from the Mac stops working when Kit's key locks. Commit locally and push when it works again; never push from a container.
- **Boards.** Never edit the generated boards by hand. Change the data, the decision records or `docs/design-review/generators/templates/`, then run `bun run self:boards`.
