# Observatory overhaul — design spec

Draft for review, 18 October 2026; brought in line with the app on 19 October 2026, where the Observatory's build showed the app knew better (its design hand-off of that date). The seven boards in this folder show every rule below; this file states the rules once.

## How to use this spec: apply, don't impose

This is a **direction to converge towards, not a rebuild**. Kit's guidance (18 October 2026): "take what the observatory is and try to apply these as best as possible without losing anything, then we can converge towards improving the UI and consolidation of the tools and making sense of all the options."

So, for whoever builds in `apps-observatory.local`:

- **Start from the Observatory as it is.** Keep all fifteen tabs (sixteen once the Known Lands chart lands beside them), every route, every `?view=` address and every capability working throughout. Nothing is removed or merged just because a board shows it grouped differently.
- **Apply the design system first.** Use the ki-design tokens, the app type dialect, the glyphs, night and day, the pane states, and the signal anatomy. These improve every existing screen without changing what it does. The boards show what "applied" looks like.
- **Restructure later, by convergence.** The four jobs, the ten instruments and the tab mapping (§9, `ObsMap`) are where things could end up, not where they must start. Each consolidation is its own small step, taken once the reskinned app shows which grouping makes sense, and agreed with Kit as it comes. §11 lists the open questions that steer it.
- **Where the app knows better, the app wins.** If a board conflicts with something the app already does well, or with data it actually has, keep the app's behaviour and note the difference here, so the design follows the real tool.

### Suggested order

1. **Tokens and glyphs** (handoff draft 6): vendor `@knowledgeislands/tokens` and the icons, and swap colours, type and emoji for glyphs across all existing tabs.
2. **Shell polish without regrouping:** the top bar with the Observatory mark, the status line, the pane states (observed, observing, empty, not observed, stale) and the filter-not-scope chip. Add the four jobs as an optional lens over the existing tabs, for example a grouped tab bar or a job filter, with every tab still reachable.
3. **Per-tab upgrades in place:**
   - Beacon signal anatomy and filters;
   - the Known Lands chart as a new view, alongside the existing tabs;
   - the Act pattern (declare, confirm, receipt) applied to the existing Repositories and Rig actions;
   - the tailnet read-only appearance.
4. **Converge:** consolidate tabs into instruments one at a time, only where it clearly helps, keeping redirects from the old addresses (§10).

## The boards

| Board | Shows | Interaction |
| --- | --- | --- |
| `ObsShell.dc.html` (1 of 7) | The shell: top bar, job switch, instrument tabs, filter bar, pane, status line | Job and tab switch, filter chip, night or day, loopback or tailnet, pane state |
| `ObsAttend.dc.html` (2 of 7) | Beacon and Waiting for you, with signal anatomy | Severity and instrument filters, row selection, kind tabs |
| `ObsObserve1.dc.html` (3 of 7) | Known Lands chart (flat), Library, Council | Select an island to filter all three, layers, time window |
| `ObsObserve2.dc.html` (4 of 7) | Streams, Workers, Repositories, Machine | Grouping, worker kinds, repository detail, Machine sections |
| `ObsAct.dc.html` (5 of 7) | Declare, confirm, receipt; what the tailnet shows instead | Step-through, three operations, way in |
| `ObsExtend.dc.html` (6 of 7) | The extensions switchboard and a framed live artifact | Scope, switches per scope |
| `ObsMap.dc.html` (7 of 7) | Fifteen tabs to ten instruments to four jobs | Select an instrument or a tab |

All data on the boards is invented. Only the public Knowledge Islands repository names appear; everything else is `example-*`, `lowmarsh-*` or `scratch-isle`.

## 1. Principles

- Knowledge and the work are the subject. Agents, human or AI, are workers: a column, a figure on the chart, never a dashboard of their own. This is the destination: the app's Sessions tab is a runs view today, and it stays one until Kit approves the Workers consolidation (§9).
- Observation is the default and authority is the exception. Act is the only job that changes anything, and it looks different.
- Dense, calm, instrument-like. Night is the reference rendering; the shell follows the operating system's theme, and light is checked second.
- The app dialect only: system serif for titles, system sans for text, monospace for identifiers and map labels. Nothing is fetched or bundled. No emoji; glyphs from `packages/icons`. One known exception: the Work tab prints the work model's banner glyphs exactly as the `ki-coordination` standard writes them, because Kit chose one notation everywhere ([PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md)). The emoji stay the written notation, and the Work tab may draw the proposed line glyphs with the state's words beside them once the `ki-coordination` standard admits the rendered form ([GDR-KI-DESIGN-037](../../decisions/GDR-KI-DESIGN-037-banner-emoji-stay-the-notation.md)).
- The app does not replace agentic harnesses. It shows their runs as evidence.

## 2. The shell

One frame, the same height on every instrument (board 1). The bands have no fixed heights of their own: each is what the app's published scale sums to (row 25 px, control 22 px, 13/16 text), as [PDR-KI-OBSERVA-002](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-002-observatory-design-language.md) holds by test.

| Band | Contents |
| --- | --- |
| Top bar | Observatory glyph and name · scope picker · job switch · observed time · workers chip · way in · theme |
| Instrument tabs | Today's tabs, each a 14 px glyph before its title (§5), counts in muted monospace; after convergence, the current job's instruments only |
| Filter bar | The one filter chip, grouping, rows shown |
| Pane | Instrument title (serif 19/24), one-line answer, the table or chart, foot-of-view note |
| Status line | Subject · summary · observed time · way in |

- **Mark.** The domed Observatory glyph in brass beside "Observatory". The Tower and the Citadel are retired and never used.
- **Job switch.** Four text segments, Observe · Attend · Act · Extend. Current: accent text on a brass underline. Act carries a boundary-colour edge (the role that means "a reader can act here") and the small word "governed", or "read-only" over the tailnet. The shell opens on Attend, at the Beacon.
- **Instrument tabs.** Two to five at a time. Current: ink on a brass underline. At 720 px the row scrolls inside its own width with an edge fade; the active tab stays clear of the fade.
- **Workers chip.** Counts agent runs at work now; it opens Workers. It is a count, not a panel.

## 3. Navigation

- **Job, then instrument.** Choosing a job opens its first instrument; the last instrument used in each job is remembered per browser.
- **Scope decides what is observed** (this repository, a territory, the realm). **The filter decides what is shown**: selecting an island on Known Lands, or a repository anywhere, sets one filter chip that holds across every instrument without re-observing. One way to clear it.
- **Deep links.** `?view=` takes the new instrument ids (`beacon`, `waiting`, `known-lands`, `library`, `council`, `streams`, `workers`, `repositories`, `machine`, `extensions`). Every old id redirects to its new home (table in section 10).
- **Keyboard.** Tabs and segments are buttons in reading order. The chart is one tab stop with roving focus: arrows along axial neighbours, Home for the Capital, Enter to select, Escape to clear.

## 4. Layout grid and density

- Reference widths: **1440 px** (wide) and **720 px** (half a screen beside an editor). Frame gutter 24 px; 12 px at 760 px and below, as the app ships it.
- No horizontal page scroll at any width. The only sideways scroller is the tab row.
- Table rows: one line of 13/16 text, 4 px padding each side, one 1 px rule: 25 px. **The Beacon shows at least 12 ranked rows at 800 px height** at both widths, and the app's density test decides ([PDR-KI-OBSERVA-002](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-002-observatory-design-language.md)); shell glyphs cost zero rows.
- Tables stay tables. Each instrument declares which columns drop at 760 px and below; rank and subject always survive.
- Panes are square-edged with one rule; chips, tags, inputs and buttons use the 4 px radius. No shadows.
- Two-pane instruments (Beacon with anatomy, Known Lands with detail) put the detail on the right at 1440 and below the data at 720.

## 5. Colour, type and glyphs

- Roles from `packages/tokens/tokens.json`, night values first: paper `#0f2440`, ink `#f5efe0`, muted `#a9b4c4`, accent `#9fbbd8`, ok `#8fc4a0`, warn `#c8963c`, bad `#f0947a`, rule `#24476e`, boundary `#5f7896`, with the three washes for chips. These match the values the app derived and holds by test, hex for hex, washes included; the app's contrast record in [PDR-KI-OBSERVA-002](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-002-observatory-design-language.md) is the evidence.
- Gold means attention, alone. Rust means blocking. A note has no colour and no mark. Every state has its word.
- Conditions are words on chips: thriving (ok wash), quiet (outline), weathered (dashed outline), ruined (dotted, struck through). Never a score or a percentage.
- Severity in rows: reef glyph and `blocking` chip; lantern glyph and `attention` chip; `note` as an outline tag.
- Tab glyphs today: one distinct 14 px glyph before each of the fifteen tab titles, as the app draws them ([PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md)):

  | Tab (`?view=`) | Glyph |
  | --- | --- |
  | Beacon (`beacon`) | `beacon` |
  | Trade routes (`trade-routes`) | `trade-route` |
  | Roadmap (`roadmap`) | `streams` |
  | Sessions (`sessions`) | `role-steward` |
  | Work (`work`) | `hourglass` |
  | Review queue (`review`) | `inbound` |
  | Decisions (`decisions`) | `council-hall` |
  | Knowledge Bases (`knowledge-bases`) | `library` |
  | Documents (`documents`) | `scroll` |
  | Artifacts (`artifacts`) | `workbench` |
  | Repositories (`repositories`) | `workshop` |
  | Activity (`activity`) | `tide-gauge` |
  | MCP servers (`mcp`) | `bridge` |
  | Automation (`automation`) | `calendar` |
  | Rig (`rig`) | `machine` |

  The MCP servers tab draws `bridge`, chosen before [GDR-KI-DESIGN-018](../../decisions/GDR-KI-DESIGN-018-the-causeway-and-the-bridge.md) made `causeway` the translation glyph; ki-design suggests `causeway` at the Observatory's next glyph refresh, and the choice is the Observatory's.
- Instrument glyphs after convergence (§9), the destination: Beacon `beacon`, Waiting for you `inbound`, Known Lands `known-lands`, Library `library`, Council `council-hall`, Streams `streams`, Workers `role-steward`, Repositories `workshop`, Machine `machine`, Extensions `workbench`. No bridge glyph marks Act: the Bridge is written, never drawn.
- Subject glyphs in the Beacon follow what the app can know from `ki` contracts, and no contract states a repository's kind ([PDR-KI-OBSERVA-008](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/decisions/PDR-KI-OBSERVA-008-line-glyphs-beside-tabs-and-subjects.md)): every repository is an `island`, this machine is `machine`, and a signal across several repositories is `archipelago`. Typing subjects by kind (a Capital as its `capital`, a tool as a workshop, an MCP server as a causeway, an app as a port, a knowledge base as a library) is future work that depends on a `ki` contract stating the kind; it is never guessed from a repository's name.

## 6. States

Each pane has five states (board 1, "Pane state"). The frame and the status line never change height.

| State | What the pane shows | Status line |
| --- | --- | --- |
| Observed | The data, with its foot-of-view note | `n rows · observed YYYY-MM-DD HH:MM` |
| Observing (first load) | Header row and one muted line naming what is being observed; nothing guessed | `observing… · started …` |
| Observing (refresh) | The last observation stays, unchanged | `observing…` beside the previous time |
| Empty | A serif 24/30 sentence ("Nothing warrants attention."), what was checked and when | `0 rows · observed …` |
| Not observed | A rust-edged block: what failed, in the API's redacted reason, and what to do | `not observed · tried …` |
| Stale | The data, dimmed slightly, with the observed time in warn and a refresh control | `stale: last observed … · refresh` |
| Partial | The data, with the missing sources named in the foot note | as Observed, plus `incomplete` |

An unobserved instrument is never counted as quiet. The Beacon lists every contributor that failed, with its reason, in its foot note.

## 7. Act: declare, confirm, receipt

Board 5. Every mutation goes through all three steps. The pattern below already matches what the app enforces; where they differ, the Observatory's [authority specification](https://github.com/knowledgeislands/apps-observatory.local/blob/main/docs/specs/authority.md) wins and this section follows it.

1. **Declare.** The plan pane names the operation, its tier (`plan`, `mutate`, `destructive`) and confirmation (`none`, `planned`, `typed`), the scope, every input (one row each, withheld rows shown with their reason), the command, and the effect as the operation's own list of changes. It shows when the plan was issued and when it expires.
2. **Confirm.** One boundary-edged button that names the action and its count ("Pull 2 repositories"). Never brass: brass is for going somewhere. A destructive tier asks the operator to type the operation's id. No mutation from a row click, a shortcut or a link.
3. **Receipt.** Outcome (`succeeded`, `failed`, `stopped`, `refused`), counts, requested and completed times, exit code, command and the way in ("via loopback"). The receipt joins the host's receipts log, newest first. The instrument then re-observes.

Operations come from the contract: Repositories offers fetch (dry run), fetch, pull (fast-forward only) and push per repository; Machine offers `rig apply`, `update`, `maintain`, `clean` and service restarts.

## 8. The tailnet, read-only

The tailnet listener itself (the listener, `tailscale serve` and the ACLs) is connection-critical and belongs to the host network work, not to the Observatory; the Observatory plans only the app's read-only side. Its appearance:

- The way-in badge in the top bar reads "Read-only · via tailnet"; the status line ends "via tailnet as operator, read-only". Loopback shows `127.0.0.1:1675`.
- Act stays in the job switch, labelled "read-only", so instruments keep their place. Repositories and Machine show their observations; where the Plan button would be, one quiet line: "Acting is on this Observatory's host. Open it there to pull, push or apply."
- The acting routes (`POST /api/repositories/plan`, `/execute`, `POST /api/machine/plan`, `/execute`) are not served, so no plan can start: "no Act" is structural. Receipts stay readable.
- Extension switches are shown, not changed.

## 9. Instruments

| Instrument | Job | Absorbs today's tabs | Reads |
| --- | --- | --- | --- |
| Beacon | Attend | Beacon; Activity's "what changed" | `/api/beacon`, `/api/history`, `/api/activity` |
| Waiting for you | Attend | Review queue; Work's "with you" view | `/api/review`, `/api/work` |
| Known Lands | Observe | Trade routes (layer); Activity's 7 / 14 / 30-day window (time control) | `/api/scopes`, `/api/repositories`, `/api/activity`, `/api/beacon`, `/api/trade-routes`, `/api/observation` |
| Library | Observe | Knowledge Bases; Documents | `/api/knowledge-bases` (+ `/note`, `/search`, `/asset`, `/sources`), `/api/documents` (+ `/document`, `/asset`), `/api/diagrams` |
| Council | Observe | Decisions | `/api/decisions`, `/api/decisions/detail` |
| Streams | Observe | Roadmap; Work (moving, stuck, blocked, on hold) | `/api/roadmap`, `/api/work` |
| Workers | Observe | Sessions; Automation's run history; commit authors from Activity. Until Kit approves this consolidation, Sessions stays a runs view of its own | `/api/sessions`, `/api/automation`, `/api/activity` |
| Repositories | Act | Repositories. The Observatory now plans a Git view, from Kit Git Repo Audit, to replace Repositories with every capability, governed operation and `?view=` address carried over | `/api/repositories`, `/api/repositories/detail`, `/api/receipts`; acts through `POST /api/repositories/plan`, `/execute` |
| Machine | Act | Rig; MCP servers; Automation's schedules | `/api/machine`, `/api/mcp`, `/api/mcp/probe`, `/api/automation`, `/api/receipts`; acts through `POST /api/machine/plan`, `/execute` |
| Extensions | Extend | Artifacts; the switchboard, which the Observatory now plans as its inbound live-artifact adapter, beside an outbound adapter that opens a view as a live artifact | `/api/artifacts`, `/artifacts/frame`, `/artifacts/bridge.js`, `/api/artifacts/call` |

Shell routes for every instrument: `/api/instruments`, `/api/scopes`, `/api/observation`, `/health`.

## 10. Old addresses

| `?view=` today | Lands at |
| --- | --- |
| `beacon` | `beacon` |
| `activity` | `beacon` (what changed); its window is the Known Lands time control |
| `review` | `waiting` |
| `work` | `streams`; its "with you" view also lists in `waiting` |
| `trade-routes` | `known-lands`, routes layer on |
| `knowledge-bases`, `documents` | `library` |
| `decisions` | `council` |
| `roadmap` | `streams` |
| `sessions` | `workers` |
| `automation` | `workers` (runs) and `machine` (schedules); the redirect goes to `machine` |
| `repositories` | `repositories` |
| `rig`, `mcp` | `machine` |
| `artifacts` | `extensions` |

## 11. Open questions

- **Instrument restructure.** Settled on 19 October 2026: the ten instruments under the four jobs, reached by convergence ([GDR-KI-DESIGN-033](../../decisions/GDR-KI-DESIGN-033-instruments-by-convergence.md)).
- **Where Work goes.** There are fifteen tabs today, because Work landed after the brief, and the Known Lands chart makes sixteen before any consolidation. This design folds Work into Streams and sends its "with you" view to Waiting for you. Agree, or give Work its own place?
- **Automation splits in two** (runs to Workers, schedules to Machine). Which one does `?view=automation` land on?
- **Bridge or Causeway.** Settled on 19 October 2026: the translation symbol is the Causeway, so "Bridge" names only the Act command, written and never drawn ([GDR-KI-DESIGN-018](../../decisions/GDR-KI-DESIGN-018-the-causeway-and-the-bridge.md)). An MCP server takes the `causeway` glyph wherever its kind is known, which for Beacon subjects waits on a `ki` contract (§5).
- **How Act looks different.** The boards give the Act segment a boundary-colour edge and "governed". Enough, or should Act panes also carry a top rule in the boundary colour (as on boards 4 and 5)?
- **The Capital glyph.** Settled on 18 October 2026: `packages/icons` now has `capital`, a small dome beside a low colonnaded front on one base. The Known Lands chart uses it, vendored at a pinned commit, in place of the Library and Council Hall pair; a Beacon subject can use it once a `ki` contract says which repository is a Capital (§5).
- **Stored chart positions.** No endpoint holds island positions today; Known Lands needs one so islands stay where they were learnt.
- **Stale threshold.** When does an observation become stale: a fixed age, or per instrument?
- **Extension switches.** Is a switch a host preference (no receipt) or an Act operation? Over the tailnet it is shown and not changed either way.
- **Workers chip.** Should it count only agent runs at work, or also people with commits today?
- **Library search.** Search covers notes today; should the merged reader search documents too?
- **Narrow width.** Which columns each instrument drops at 760 px still needs declaring per table; the boards show the 1440 layout.
- **Bridge over the tailnet.** Read-only over the tailnet; Act stays on loopback until identity is designed ([GDR-KI-DESIGN-034](../../decisions/GDR-KI-DESIGN-034-read-only-over-the-tailnet.md)). The full design is a later Observatory decision record.
