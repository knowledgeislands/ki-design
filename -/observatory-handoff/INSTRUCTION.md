# Instruction: apply the Knowledge Islands design to the Observatory

**From:** the Knowledge Islands design thread (`knowledgeislands/ki-design`). **To:** the thread that owns the Observatory build (`apps-observatory.local`). **Date:** 18 October 2026. **Blocking:** no. This is a direction to schedule in the Observatory's own roadmap, under its own process and numbering (`KI-OBSERVA-*`).

## What Kit wants

> "take what the observatory is and try to apply these as best as possible without losing anything, then we can converge towards improving the UI and consolidation of the tools and making sense of all the options"

So this is **apply, don't impose**:

- **Keep everything working.** All fifteen tabs (sixteen once the Known Lands chart lands), every route, every `?view=` address and every capability stay working and reachable throughout. Nothing is removed, merged or renamed just because a design board shows it grouped differently.
- **Apply the design system first.** Tokens, type, glyphs, night and day, pane states and the signal anatomy improve every existing screen without changing what it does.
- **Converge later.** The four jobs (Observe · Attend · Act · Extend) and the ten-instrument grouping are a destination to move towards in small steps, each agreed with Kit as it comes. They are not a starting rebuild.
- **The app wins.** Where a board conflicts with something the app already does well, or with the data it actually has, keep the app's behaviour. Record the difference back in ki-design: open an issue, or note it in the hand-off README. The design then follows the real tool.

## Read these (all in knowledgeislands/ki-design, which is public)

| What | Path |
| --- | --- |
| The Observatory design spec. Start with "How to use this spec" | `docs/design-review/observatory/OBSERVATORY-DESIGN.md` |
| Seven screen boards: the shell, Attend, Observe ×2, Act, Extend, and the tab map | `docs/design-review/observatory/Obs*.dc.html` |
| The original seven slice drafts, now with an "apply first" note | `-/observatory-handoff/README.md` and `01`–`07` |
| The design system: the entry point, then the spec files for voice, colour, type, layout, icons, components and maps | `DESIGN.md`, then `docs/spec/` (`voice.md`, `colour.md`, `typography.md`, `layout.md`, `iconography.md`, `components.md`, `maps.md`) |
| Tokens (DTCG, light and night) | `packages/tokens/tokens.json`; the built `dist/tokens.css` and `dist/theme.css` via `bun run build` |
| 78 line glyphs (24 px grid) | `packages/icons/svg/` |
| Symbol meanings and statuses (Official · Agreed · Proposed) | `packages/symbols/src/symbols.ts` |
| Flat hex-chart renderer for Known Lands | `packages/hexmap` |
| A working read-only preview of the new look against the live API | `examples/observatory-preview/`. Run `bun run self:preview` in ki-design; it proxies GET `/api/*` from 127.0.0.1:1675 |

The `.dc.html` boards are Claude Design components. Kit can show them on the "Knowledge Islands — Design System" canvas. Read as source, they still give the exact layout, copy, colours and states.

## Settled design facts to respect

- **Symbols.**
  - The app's mark is the **Observatory** (the domed observatory glyph). Tower and Citadel are retired.
  - The civic heart of an island is the **Capital**: Library and Council Hall, civic, never fortified.
  - The **Port** replaces the Harbour, with four modes: dock, rail depot, airport and customs house.
  - **Reef** = risk or blocking. **Lantern** = attention.
  - Conditions: thriving, quiet, weathered, ruined.
- **Status labels:** Official · Agreed · Proposed · Open. Never "canon" or "decided". "Canonical knowledge" stays the term for ratified knowledge.
- **Look.**
  - Night is the reference; the app follows the operating system's theme.
  - The app type dialect uses system stacks only. No web fonts, nothing fetched.
  - No emoji; use the glyphs.
  - Dense, calm, instrument-like.
  - British English.
- **Principles.**
  - Agents, human or AI, are workers.
  - Knowledge and the work are the subject.
  - The app doesn't replace the agentic harnesses; it shows their runs as evidence.
- **Privacy.** ki-design is public. Never commit screenshots or fixtures taken from real estate data, in either repository.

## Suggested order

Each step is shippable on its own, with existing tests passing. Treat this as a proposal and number it in your own roadmap.

1. **Tokens and glyphs.** This is slice 6.
   - Re-vendor the ki-design role values under the PDR-KI-OBSERVA-002 digest scheme.
   - Replace colours and type with the tokens, and replace any emoji with glyphs.
   - Add 14 px glyphs to tabs and Beacon subjects. Update the tab-width model in the same change, since PDR-002 says tabs are text.
   - Contrast, density (12 Beacon rows at 800 px) and width (720 px) tests must pass unchanged.
2. **Shell polish, without regrouping.**
   - Put the Observatory mark in the top bar and add the status line.
   - Show the pane states: observed, observing, empty, not observed, stale.
   - Add the "filter, not scope" chip.
   - Add the four jobs as an _optional lens_ over the existing tabs, such as a grouped tab bar or a job filter, with every tab still one click away.
3. **Per-tab upgrades in place.** These are independent; take them in whatever order suits the code.
   - Beacon: the signal anatomy (mark, kind, category, condition, freshness, new) and its filters. See `ObsAttend`.
   - Known Lands: the flat hex chart from `@knowledgeislands/hexmap` as a **new** view next to the existing tabs. See `ObsObserve1` and slice 3.
   - Act: the declare → confirm → receipt pattern applied to the existing Repositories and Rig actions. Act panes look different: a control-edge outline and the word "governed". See `ObsAct`.
   - Tailnet: a read-only appearance, where acting routes return 404 and the UI says so plainly. See slice 1 and `ObsShell`'s way-in toggle.
   - Workers: agent runs and commit authors against what they touch. See slice 4 and `ObsObserve2`.
   - Extensions switchboard. See slice 5 and `ObsExtend`.
4. **Converge.**
   - Consolidate tabs into instruments one at a time, only where the reskinned app shows it helps.
   - Keep redirects from every old `?view=` address. The spec's §10 lists them.
   - Bring each consolidation to Kit before doing it.

## Open questions to bring to Kit as you meet them

These are from the spec's §11.

- Should the ten-instrument restructure be adopted at all?
- Where should Work go: folded into Streams, or its own instrument?
- Automation splits between Workers (runs) and Machine (schedules). Which one should `?view=automation` open?
- ~~Bridge or Causeway~~: settled by GDR-KI-DESIGN-018. Causeway is the translation glyph; the Observatory draws it for the MCP servers tab.
- Is the outline plus "governed" enough to mark Act out?
- When does an observation become stale: a fixed age, or per instrument?
- Is switching an extension on a preference, or an Act operation with a receipt?
- ~~The Capital has no glyph yet~~: settled. `capital` is in `@knowledgeislands/icons`, and the Known Lands chart draws it (CAPITAL-GLYPH a).

## Reporting back

When a step lands, tell the design thread what changed and what you learned. Kit relays this between threads. Anything the design got wrong becomes a change in ki-design, not a workaround in the app.
