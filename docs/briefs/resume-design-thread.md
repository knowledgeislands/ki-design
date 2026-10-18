# Resume: the Knowledge Islands design thread

This page holds everything needed to pick the design work up again after a break. Kit or any agent can use it. The state is as of **18 October 2026, 12:40**.

Start here, then read [`DESIGN.md`](../../DESIGN.md) only for the section you need.

## Where things are

| What | Where |
| --- | --- |
| Design system spec | `DESIGN.md` (about 18,000 words; to be slimmed, see next steps) |
| Machine-readable data | `packages/tokens/tokens.json`, `packages/symbols/src/symbols.ts`, `packages/icons/svg/` (71), `packages/tiles/sets/modern/manifest.json` |
| Briefs for art and ChatGPT | `docs/briefs/` (README, picture of Arcadia, tile sets, prompt pack, building and animation standards, explainer style) |
| Chosen Arcadia painting | `docs/briefs/references/arcadia.png` (variation 1). Handoff and the fixes still to make: `docs/briefs/arcadia-handoff.md` |
| Review boards, saved | `docs/design-review/` (nine boards, early explorations, generator scripts) |
| Decision records | `docs/decisions/` (GDR-KI-DESIGN-001 so far) |
| Roadmap | `ROADMAP.md`, `docs/roadmap/` |
| Observatory handoff drafts | `-/observatory-handoff/` |

### claude.ai artifacts

All are private to Kit's account and show in his artifacts list.

- **Knowledge Islands — Design System** (Claude Design canvas): <https://claude.ai/artifact/HDoCgCDLMqMarEDToTU9i4>. Holds the eight review boards plus "Arcadia, painted".
- **Knowledge Islands — Early Explorations** (canvas): <https://claude.ai/artifact/LfDvXXQxPFqYpJ18mg911m>. Kept for history.
- **Knowledge Islands — Design Brief** (doc): <https://claude.ai/code/artifact/01ee18ce-7756-4f70-bc29-f26699c44711>. Its first tab, **Changes since we last spoke**, is the running log.
- **Knowledge Islands** (Design System artifact): <https://claude.ai/artifact/LWcv6ZziyZFCU8Xq8r1Z4A>. Rebuilt from ki-design main@47fe831; Claude uses it when making Knowledge Islands slides, docs and designs.

### Other repositories

- **apps-knowledgeislands.info.** Design v1 is live. Port wording is in place. `/arcadia/` shows the painting as the legend above the engraved chart. The record of the work is in SITE-044 and SITE-045.
- **ki-principal.**
  - GDR-KI-PRINCIPAL-010, *The Port*: the Port replaces the Harbour, with four modes (dock, rail depot, airport, customs house). Lighthouse means guidance; Council Hall means governance.
  - The note *Influences Along the Way* covers gstack, Paperclip, Gas City, Hermes and OpenClaw.
  - ki-design is listed in Known Lands.
  - GDR-011 (Citadel and Tower) was written and then reverted; the naming question is open again.

## Decided

- Port replaces Harbour. This is canon in ki-principal and ki-design, and on the site.
- Lighthouse means guidance and Council Hall means governance. Both are canon.
- "The painting is the legend; the chart is the map." The engraved Modern chart is the home hero and is used for diagrams. The painted Ancient style is used for Arcadia moments. A chart/painting switch comes later, once the Ancient tiles exist.
- ki-design is public under the MIT licence and conforms to the KI repository standard. The audit's only remaining failure is DESIGN-2.
- DESIGN.md is to be restructured as: data files, a short DESIGN.md (about 2–3k words), `docs/spec/*`, and one decision record per decision. The boards are then generated from those.
- How Kit works:
  - Push straight to main, with no pull requests.
  - Give ChatGPT prompts as copy-paste code blocks that point at files in the repo; never ask Kit to upload images.
  - Keep a "mark" and report everything since it when Kit asks.
  - Pass anything off-track to Kit's input thread as a hand-off.

## Open: Kit to answer

1. **Capital, Tower and the wall.** Kit feels a Tower reads as dictatorial. The proposal:
   - Drop the Tower, and make the **Observatory** the app's mark.
   - Use **Capital** as the only name for the idea; each tile set draws it in its own way, and the term "Citadel" is dropped.
   - Introduce a **curtain wall** as the line between settled knowledge and work in motion, with the Enactment Process as its gate: a low wall with open gates.
2. **Status labels.** "Canon" confuses. Should the labels be renamed to Official · Agreed · Proposed · Open?
3. **ki-design git history.** It still contains Observatory screenshots with private repository names and commit messages. No secrets are in them. The recommendation is to leave it; rewriting means a force-push.
4. **The remaining open questions on the Decisions board:** Bridge or Causeway, Mill or Engine house, the logo (roundel or compass), the app's name, steward roles, a night toggle on the site, Arcadia drawn from live data, art licensing (KI-DESIGN-ART-002), the tailnet design, and the 14 → 10 instrument restructure.

## Kit's to-dos on the Mac

```text
cd ~/workspaces/knowledge-islands/ki-design
ki registry add --repo ~/workspaces/knowledge-islands/ki-design
ki repo repair --repo ~/workspaces/knowledge-islands/ki-design
bun install && git config core.hooksPath .githooks
```

Also mark ART-001 (the picture of Arcadia) done, since variation 1 has been chosen.

## Next steps, in order

1. **Painting, second round.** Kit runs the ChatGPT prompt below. Then:
   - save the result as `docs/briefs/references/arcadia-v1b-<n>.png`;
   - repoint the site's sync script to the new commit;
   - use it for the Ancient tiles.
2. **Kit's answers.** Turn them into decision records in `docs/decisions/`, and carry the symbol-level ones into ki-principal.
3. **Restructure DESIGN.md** around those answers. Reconcile the drift that has been found:
   - terrain ocean `#2f5878` in the tokens against `sea` in DESIGN.md;
   - the night terrain fills;
   - spacing names (`space-<px>` against `space-1…10`);
   - the symbol statuses in `symbols.ts` against DESIGN.md (Lantern, Fog, Bridge, Library, Storm, Cartographic grid);
   - the icon inventory (71 drawn against 67 listed);
   - tile variants, footprints and loop lengths in the manifest against DESIGN.md.
4. **Generate the review boards** from the data and the decision records, so they can't drift.
5. **Ancient tile set** from the painting, following `docs/briefs/tile-set-ancient.md` and `ancient-prompt-pack.md`.
6. **Site.**
   - Re-run `sync:design` against ki-design HEAD so the Field Guide's temporary `enactedCanon` list can go.
   - Drop the last `liveWording` filter (Tower) once the Capital question is settled.
   - Consider the copy left out of v1, which needs Kit's words: the six principles strip, "Tools change. Landscapes endure.", and "Agents, human or AI, are workers."
7. **Observatory overhaul**, when Kit is ready. Another thread owns `apps-observatory.local`; don't edit it from here.

## ChatGPT prompt: Arcadia, second round

```text
Open the GitHub repository knowledgeislands/ki-design (main branch).

1. Read docs/briefs/arcadia-handoff.md — variation 1 (docs/briefs/references/arcadia.png) is the chosen Arcadia painting. Read its "What to change" notes for variation 1.
2. Read docs/briefs/arcadia-picture.md (the original brief) and look at docs/briefs/references/arcadia.png itself.

Then repaint variation 1 — the same composition, viewpoint, dusk light, palette, atmosphere and sense of distance towards the other islands. Do not redesign it. Change only these:
- make the hexagonal terraces of the island clearly readable at the cliff edges;
- put the Citadel (domed Library, colonnaded Council Hall) on the island's highest ground, above the surrounding peaks;
- make the Port's four modes readable at small size: stone docks with ships, a railway line with tracks running inland from the rail shed, the airship at its mooring mast, and a customs house with a visible inspection barrier at the gate;
- keep the top-left sunset a little calmer so text can sit over the sea on the left.

Output it landscape at the largest size you can, at least 2048 px wide if at all possible. Give me 2 versions. For each, two lines on what changed and whether anything from variation 1 was lost. Don't change anything in the repo; I'll save them as docs/briefs/references/arcadia-v1b-<n>.png.
```

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
