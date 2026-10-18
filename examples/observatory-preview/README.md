# Observatory preview

A reskinned, read-only front end for the local Observatory (`apps-observatory.local`), drawn with the Knowledge Islands design system: the chart at night or the light chart, following the system theme until you choose with the toggle, dense tables, cartographic line glyphs and a hex Map of Known Lands.

It is an example, not the Observatory. It reads the real Observatory's JSON API through a tiny proxy and never changes anything. The Observatory itself is untouched.

## Run it

From the repository root:

```sh
bun run self:preview            # reads the live Observatory at http://127.0.0.1:1675
bun run self:preview -- --fixtures # reads the saved samples in fixtures/ instead
```

Then open <http://127.0.0.1:1676/>. `bun examples/observatory-preview/server.ts` works too.

| Setting | Default | |
| --- | --- | --- |
| `OBSERVATORY_URL` | `http://127.0.0.1:1675` | The Observatory to read |
| `--port` or `PORT` | `1676` | Where the preview listens (loopback only) |
| `--fixtures` | off | Serve `fixtures/*.json` instead of the live API |

The client is framework-free TypeScript, bundled once by `Bun.build` when the server starts, importing `packages/tokens`, `packages/icons` and `packages/hexmap` by relative path (no install step beyond `bun install` at the root). The server serves `packages/tokens/dist/tokens.css` as `/tokens.css`; if `bun run build` has not been run it renders the same CSS from `tokens.json` in memory and says so on start-up.

```sh
bun run test                    # includes bun test examples/observatory-preview
bunx tsc -p examples/observatory-preview
```

## What it never does

- **No writes.** Every method other than `GET` is answered `405`. Paths containing `execute`, `plan`, `probe` or `call` are answered `404` before any request leaves the process.
- **Only `/api/*` is proxied**, server-side, with the `Host` header the Observatory checks (`127.0.0.1:1675`). The page itself only talks to the preview.
- **Operations are shown, not run.** Repositories and Machine list what the Observatory offers as inert buttons, each with a link to open the Observatory and run it there.
- **No secrets.** MCP servers show how many secrets are set, never their names or values.
- **Switches are local.** The Extensions switchboard keeps its state in this browser's `localStorage` and is labelled _preview only_.

## How it maps to the design brief

The shell has a top bar (compass mark, _Knowledge Islands_, _Observatory_ with its small muted Observatory mark), a scope picker from `/api/scopes`, the job switch **Observe · Attend · Act · Extend**, the Beacon's observed-at time and a workers chip counting active agent runs. Under it, the selected job's instruments are text tabs with 14 px line glyphs; the current one is ink on a brass underline.

| Job | Instrument | Reads | Notes |
| --- | --- | --- | --- |
| Attend | Beacon | `/api/beacon` | Ranked blocking › attention › note, then most recently changed. Group by severity, category or instrument; filter chips; _new_ tag; unobserved contributors and their reasons in the foot. |
| Attend | Waiting for you | `/api/review` | Queries, records, captures, intake. |
| Observe | Known Lands | `/preview/lands`, `/api/repositories`, `/api/activity`, `/api/beacon`, `/api/trade-routes` | The chart (below). |
| Observe | Library | `/api/knowledge-bases`, `/api/documents` | Lists only; zones and notes stay in the Observatory. |
| Observe | Council | `/api/decisions` | Records by repository with status, type and date; dangling and not-current findings above. |
| Observe | Streams | `/api/roadmap` | Grouped by horizon, then status. |
| Observe | Workers | `/api/sessions`, `/api/automation` | Runs (at work, waiting, stopped short, finished), threads, scheduled jobs with a run gauge. |
| Act | Repositories | `/api/repositories?source=git` | Drift, changed files, signals as chips, head; operations inert. |
| Act | Machine | `/api/machine`, `/api/mcp`, `/api/automation` | Tooling, configuration drift, services, MCP daemon and servers, schedule. |
| Extend | Extensions | `/api/artifacts` | Core instruments and island extensions as a switchboard, preview only. |

### The Map of Known Lands

- **Territories are archipelagos.** The server reads `/api/scopes`, then `/api/repositories?scope=territory:<handle>&source=git` for each territory, and serves the membership at `/preview/lands`, cached for 30 seconds. Repositories in no territory sail as _Unclaimed waters_; a territory the Observatory cannot list is shown as _uncharted_ with its reason.
- **Repositories are islands**: one hex each, three for a territory's capital (`*-principal`). Structure by role from the name: `*-principal` the Capital (tile id `citadel`), `tools-*` and `*-harness` workshop, `mcp-*` bridge, `apps-*` and `homebrew-*` port, otherwise island. A capital stands on hills, every other island on grassland (terrain elevation = maturity).
- **Drawn by `@knowledgeislands/hexmap`**: the chart is an `islandmap/v1` rendered with `layoutFlat` and `renderFlatLayers` — sea, shallows, land, terrain patterns, coastline, trade lanes, structure roundels with `@knowledgeislands/icons` glyphs, halo labels (monospace, as docs/spec/maps.md asks for the app) and the selected ring — in `night` or `day` to match the theme; the toggle and a system theme change redraw it. Territory waters (a tint and a dashed border) are laid under the land, and an interactive layer of islands over it.
- **Condition by evidence**: the age of the latest commit (from `/api/activity`, falling back to the repository's head) at the time of observation — up to 2 days thriving, 14 quiet, 60 weathered, older ruined — drawn as fill strength: the island fades towards the paper as it weathers.
- **Signals as marks**: a rust reef for a blocking signal, a brass lantern for attention.
- **Trade routes** from `/api/trade-routes` (`ki/trade-routes/v1`): both ends' reports fold into one brass sea lane per pair and kind of trade, solid when active, dashed while either side awaits reciprocity, with a small vessel at its middle; listed as text beside the chart. Routes to repositories not on the chart are left off.
- **Legend** in DESIGN's symbols: structures by role, hills and grassland, the four condition states, lantern and reef, active and awaiting lanes, territory as archipelago, and the selected ring.
- **Deterministic layout**: territories sorted by name and set outward from the centre, nearest first by a landscape-weighted distance so the chart is wider than tall, with a sea lane between them; within each, the capital first, then the rest by name, with at least one hex of sea between islands.
- **Interaction**: hover or focus to take a bearing in the side panel; arrow keys move between neighbouring islands (a roving tab stop), Home goes to the territory's capital; Enter, Space or a click filters the shell to that repository — a filter, not a scope — shown as a _filtered to …_ chip with a clear button, and Escape clears it. The focus ring is drawn on the hex outline (accent over a paper inner stroke); the filtered island keeps a brass ring. Beacon, Waiting, Council, Streams, Workers, Repositories and Library honour the filter.

### Tokens, glyphs and hex maths

- **Tokens**: colour roles, washes, fonts and the theme switch are `@knowledgeislands/tokens` (`/tokens.css`, loaded before `client/styles.css`): light on `:root`, night under `prefers-color-scheme: dark` or `[data-theme="night"]`. The preview adds only derived values (`--raised`, the teal, accent and muted washes) as `color-mix` of the roles. Lane colour on the chart is the `--lane` sea token for the theme.
- **Glyphs**: `client/glyphs.ts` renders `@knowledgeislands/icons` bodies only; the package now draws every glyph the preview uses (`beacon` for the Beacon, `workbench` for Extensions, `theme` for the night-chart toggle among them), so there are no local stand-ins.
- **Hex maths**: axial coordinates, spirals, offset rectangles, corners and pixels are `@knowledgeislands/hexmap`; `client/hex.ts` is gone.

Type is system stacks only: Georgia for headings, `system-ui` for text, `ui-monospace` for identifiers and times, with tabular figures. Times are local `YYYY-MM-DD HH:MM`. Rows are 30 px; tables never become cards and drop their least important columns below 1100 px and 880 px, with no horizontal page scroll down to 720 px.

## Fixtures

`fixtures/*.json` are small samples taken from the live Observatory on 2026-10-18, trimmed to a few items per list, with secret names replaced and a handful of commit dates aged so the chart shows every condition. In fixture mode a `scope` query narrows lists by repository using `fixtures/lands.json`.

The live estate declares no trade route yet, so `fixtures/trade-routes.json` carries three illustrative route reports between real repositories (one active pair, one awaiting a receiver) to show the lanes; they are not observed.

Estate data is private, so `fixtures/` is ignored by this folder's `.gitignore`; commit it deliberately if you want the demo to travel. Screenshots taken from real fixtures show private estate data (repository names, commit messages, thread titles), so none are committed: this repository is public. Screenshots belong here only when taken from synthetic fixtures.

## Tests

`test/server.test.ts` runs the handler against a stub Observatory that, like the real one, answers only `Host: 127.0.0.1:1675`: every non-`GET` method is 405 and never forwarded; acting paths (including case and `%2F` spellings) are 404 before any request leaves; `GET /api/beacon` arrives with the right `Host`; non-JSON and unreachable upstreams are 502; fixture mode serves, scopes, refuses climbing names and keeps the same rules; the token CSS falls back to `tokens.json`. `test/helpers.test.ts` covers Beacon ranking, condition from commit age, roles, territory layout determinism (input order does not move anything), sea between islands, the island map, and trade-lane folding.

## Known gaps

- **Untested against the live API from here.** The proxy was exercised against a stand-in that enforces the same `Host` check; the shapes come from the live API, but the first live run is yours.
- Library and Extensions list what the API names; opening notes, documents or artifacts stays in the Observatory.
- The observation network and the decision graph are not drawn yet; trade routes are untested against a live report with routes.
- The chart draws flat only; the Modern and Ancient tile sets and isometric projection wait on `@knowledgeislands/tiles`. Positions are computed, not yet stored (docs/spec/maps.md).
- Arrow keys move to the nearest island in the arrow's direction rather than along strict axial neighbours (docs/spec/maps.md), since islands are separated by sea.
- Reads are cached per page load; _Read again_ (the refresh button) clears them. There is no live push.
