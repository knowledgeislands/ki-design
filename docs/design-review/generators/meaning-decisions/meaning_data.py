# Symbol data for DsMeaning. Status follows DESIGN.md where it gives one (it is newer than symbols.ts);
# ts = status in packages/symbols/src/symbols.ts when it differs.
S = []
def add(id, name, cat, status, scope, meaning, not_, drawn, site, app, rel, icon=None, key=False, flag=None, ts=None, note=None):
    S.append(dict(id=id, name=name, cat=cat, status=status, scope=scope, meaning=meaning, not_=not_, drawn=drawn,
                  site=site, app=app, rel=rel, icon=icon if icon is not None else id, key=key, flag=flag, ts=ts, note=note))

# Geography
add('island','Island','geography','official','Both','A domain of knowledge; in practice, one repository.',
    'Not a territory and not a folder: one island is one repository.','A land mass of hexes rising from the sea.',
    'Model, Landscapes; every island on the Map of Known Lands.','A repository: island card and hex map.',['archipelago','territory','capital','terrain'])
add('archipelago','Archipelago','geography','official','Both','The drawn form of a territory: several islands in one tinted sea region.',
    'Not a second, non-governing grouping. That reading is withdrawn; never draw a line across territories.','Several islands in one tinted sea region.',
    'Model.','A territory.',['territory','island','realm'])
add('territory','Territory','geography','agreed','Both','Islands governed together under one Capital, one authority and one harness.',
    'Not always contiguous: an island may sit apart as an exclave.','An archipelago with a tinted border.',
    'Model.','Scope territory:&lt;handle&gt;.',['archipelago','capital','realm'],icon='')
add('realm','Realm','geography','agreed','Both','The governed environment: its rules of identity, capability and crossing.',
    'Not "estate". That is Kit\'s local word; display copy says realm.','The whole chart; other realms beyond its edge, in fog.',
    'The whole chart on the landing map.','Scope picker: "Known Lands".',['map-of-known-lands','territory','fog'],icon='')
add('map-of-known-lands','Map of Known Lands','geography','agreed','Both','The canonical chart of the realm\'s territories and islands.',
    'Not an illustration: it shows the real realm, with condition states.','The chart, with compass rose and scale bar.',
    'The landing map.','The Known Lands chart instrument.',['realm','cartographic-grid','thriving'],icon='known-lands')
add('terrain','Terrain elevation','geography','official','Both','Depth and maturity: the higher the ground, the more mature the knowledge.',
    'Not decoration. Uncharted ground is fog, not a terrain.','Contour terraces; twelve terrain types set by the tile set.',
    'Philosophy.','Elevation on the chart.',['ancient-forest','fog','cartographic-grid'])
add('ancient-forest','Ancient forest','geography','official','Site','Wisdom and continuity: old, deep-rooted knowledge.',
    'Never built on, never shares a hex. A structure, not a terrain.','One vast old tree among old growth.',
    'Philosophy.','Not shown.',['terrain','library'])
add('weave','Weave / Fabric','geography','official','Both','Cross-domain synthesis: the cross-links that bind islands together.',
    'Not a route. A route is one relationship; the weave is many.','Interlaced brass and teal threads meeting at points of light.',
    'Philosophy.','Cross-island links.',['route','trade-route'])
add('cartographic-grid','Cartographic grid','geography','official','Both','Structure and orientation: the pointy-top hex grid every map is drawn on.',
    'Not the painting. The hex is the truth; the isometric render only shows it.','Faint graticule; the hex lattice at shorelines.',
    'Field Guide.','The grid itself.',['terrain','map-of-known-lands'],icon='grid',ts='agreed')

# Zones
add('capital','Capital','zone','official','Both','The civic heart of an island or territory: it holds the Library and the Council Hall.',
    'Never a fortress and never one hex: an open civic square across a 7-hex flower, with no walls, towers or battlements.','A civic square on a 7-hex flower: a civic quarter in Modern, a hilltop forum or acropolis in Ancient.',
    'Model; the Capital on the summit of the Arcadia hero.','Territory Principal repository.',['library','council-hall','territory'],icon='',key=True,
    flag='Replaces the Citadel, now retired, and drops the Tower (GDR-KI-PRINCIPAL-011). The curtain wall stays open; see board 8.')
add('pillars','Pillars','zone','official','Both','Owned, canonical knowledge.',
    'Not the Library building: it is the Library\'s hall of pillars.','The Library\'s hall of pillars, in the Capital.',
    'Philosophy, Arcadia (via the Library).','Knowledge Bases, Documents.',['library','capital','resources'],icon='')
add('calendar','Calendar','zone','official','Both','Time-bound knowledge: rhythms, cadences, dated commitments.',
    'Not a scheduler screen. It is a place on the island.','Clock tower or sundial on the Capital square.',
    'A place on the island (Living Map).','Activity, automation timing.',['capital','streams'])
add('resources','Resources','zone','official','Both','External reference.',
    'Not owned knowledge. That is Pillars.','Archive and reading room beside the Library.',
    'A place on the island (Living Map).','Artifacts, references.',['pillars','library'])
add('streams','Streams','zone','official','Both','Knowledge in motion: initiatives, projects, roadmap.',
    'Not a feed. Navigation over consumption.','Rivers and canals running to the sea.',
    'A place on the island (Living Map); the Cycle.','Roadmap, Sessions.',['current','port'])
add('admin-governance','Admin / Governance','zone','official','Both','What must hold: Charter, Known Lands, policies, decisions.',
    'Not the Lighthouse. Governance is the Council Hall.','The Council Hall, in the Capital.',
    'Model.','Decisions.',['council-hall','capital'],icon='council-hall')
add('admin-operations','Admin / Operations','zone','official','Both','How the island runs: activities, processes, live artefacts, lessons.',
    'Not the Port. Operational systems moved from Port to the Mill on 18 Oct.','The Mill / Engine house (drawing proposed, name open).',
    'A place on the island (Living Map).','Automation, Rig, Extensions.',['mill','port'],icon='mill',
    note='The zone is official; only its drawing is proposed.')

# Structures
add('library','Library','structure','official','Both','Canonical knowledge (Pillars) and knowledge resources.',
    'Not governance, and not storage of decisions. Columns stay the Library\'s, not the Ruins\'.','Domed building with a colonnade.',
    'Philosophy, Arcadia.','Knowledge Bases, Documents.',['pillars','capital','resources'],
    note='Held in the Capital with the Council Hall (GDR-KI-PRINCIPAL-011).')
add('council-hall','Council Hall','structure','official','Both','Governance: a parliament. Decisions are made here, not stored.',
    'Not the Lighthouse. Not where knowledge is kept; that is the Library.','Colonnaded hall with a pediment, on the Capital square.',
    'Model.','Decisions.',['capital','lighthouse','admin-governance'],key=True,
    flag='Supersedes the old "Governance = lighthouses / citadels". Enacted by GDR-KI-PRINCIPAL-010; held in the Capital (GDR-KI-PRINCIPAL-011).')
add('observatory','Observatory','structure','official','Both','Insight and analytics: where an island looks out and reflects. Also the local app\'s mark.',
    'Not a watchtower: the Tower is dropped. The domed observatory is the app\'s mark.','A domed observatory on a hill or cliff.',
    'Home hero, Reflect.','Activity, insight; the app\'s own mark. The Beacon is its lamp.',['lantern','current','lighthouse'],key=True,
    flag='The local app is the Observatory, so the dome is its mark (GDR-KI-PRINCIPAL-011).')
add('lighthouse','Lighthouse','structure','official','Both','Guidance only: standing direction that keeps travellers off the rocks.',
    'Not governance (Council Hall). Not the Beacon, which is the Observatory\'s lamp.','A tall pale tower on a rocky headland.',
    'Principles, wayfinding.','Guidance and help.',['council-hall','observatory','reef'],key=True,
    flag='Canon said "guidance / governance". Narrowed by GDR-KI-PRINCIPAL-010.')
add('port','Port','structure','official','Both','Entry and exchange, in any mode: where knowledge and work arrive and leave.',
    'Not the Harbour, which is retired: never draw it. Not operational systems; those moved to the Mill.','A port town of four districts: dock, rail depot, airport, customs house.',
    'Capture, in the Cycle.','Review queue intake (+ and -).',['dock','rail-depot','airport','customs-house','incoming','outbound'],key=True,
    flag='Replaces Harbour (GDR-KI-PRINCIPAL-010).')
add('bridge','Bridge','structure','official','Both','A translation layer between systems.',
    'Not the app\'s Act command path. Never put the bridge glyph on the Act job.','A stone arched bridge.',
    'Agents section.','MCP servers.',['route','mill'],ts='agreed',
    flag='Name open: Causeway for translation, freeing Bridge for the app\'s command path? See board 8.')
add('workshop','Workshop / Forge','structure','proposed','App','Building tools and harnesses.',
    'Not where knowledge is kept. Things are made here.','Timber workshop with a chimney and an anvil yard.',
    'Not yet used.','Repositories (tools-*, harnesses).',['mill','builder'])
add('mill','Mill / Engine house','structure','proposed','App','Operational systems: automations and pipelines that keep turning.',
    'Not the Port. Canon\'s old "Port = operational systems" is superseded.','A stone house with a waterwheel; label "Mill (proposed)".',
    'Not yet used.','Rig, Automation.',['admin-operations','port','workshop'],
    flag='Name open: Mill or Engine house. Tile id stays mill meanwhile.')
add('ruins','Ruins','structure','proposed','Both','Retired knowledge: honoured, not hidden.',
    'Not failure and not deletion. A structure, not a terrain.','Broken walls, a fallen lintel, ivy.',
    'Drafts and mockups, marked proposed.','Archived repositories and records.',['ruined','historian'])

# Port modes
add('dock','Dock','port-mode','official','Both','Material carried in by hand.',
    'Not the whole Port: one district of it.','A wooden jetty with small sailing boats.',
    'A district of the Port on the Living Map.','Captures at Stage.',['port','customs-house'])
add('rail-depot','Rail depot','port-mode','official','Both','Scheduled, regular feeds.',
    'Not hand capture. A depot means the island runs on schedules.','A small station, platform canopy, a short run of track inland.',
    'A district of the Port on the Living Map.','Automation-fed intake.',['port','current'])
add('airport','Airport','port-mode','official','Both','Long-range arrivals from other systems and agents.',
    'Never jets or runways. A mooring mast with an airship.','A tall mooring mast with a moored airship.',
    'A district of the Port on the Living Map.','Agent and remote intake.',['port','bridge'])
add('customs-house','Customs house','port-mode','official','Both','A governed boundary where what crosses is checked.',
    'Not governance itself (the Council Hall). It checks crossings.','A gatehouse with a barrier at the port gate.',
    'A district of the Port on the Living Map.','What never reaches the browser; confirmations.',['port','guardian','council-hall'])

# Sea
add('route','Route','sea','official','Both','A relationship: a charted way between two places.',
    'Not exchange. That is a Trade route.','A fine dotted or inked path between places.',
    'Model.','Links.',['trade-route','weave'])
add('trade-route','Trade route','sea','official','Both','Collaboration and exchange between islands.',
    'Not a one-way link. Dashed means awaiting reciprocity.','A brass sea lane with small vessels; solid = active, dashed = awaiting.',
    'Model.','Trade routes layer (_TRADES).',['route','port','navigator'])
add('current','Current','sea','official','Both','Information flow.',
    'Not steered work. Sessions are the vessels that ride it.','Curved arrowed lines in the water.',
    'The Cycle.','Flow between islands; Sessions are vessels on it.',['streams','trade-route'])
add('reef','Reef','sea','official','App','Risk or ambiguity that blocks: work stops here.',
    'Not attention; that is the Lantern. A reef means stop, not look.','Sandstone rocks in shallows; in the app, a rust reef.',
    'Not used on the site.','Beacon blocking signal, rust (--bad).',['lantern','storm','lighthouse'],key=True)
add('celestial-guide','Celestial guide','sea','official','Both','Long-range orientation: enduring values above the day-to-day.',
    'Not the compass rose, which is the Realm\'s orientation motif.','An eight-point star over constellations.',
    'Journey.','Horizon, the Charter.',['lighthouse','route'])
add('fog','Fog','sea','official','Both','Experimental, or not yet observed: uncharted.',
    'A map state laid over any terrain, never a terrain tile.','Drifting fog over hexes; flat: the --fog hatch.',
    'The chart\'s edge; other realms beyond it.','Proposals, drafts, unobserved repositories.',['scout','realm','terrain'],key=True,ts='proposed')

# Signals
add('incoming','Incoming (+)','signal','official','Both','Material received for triage. A working area, not a zone.',
    'Never drawn inside the Capital.','The Port\'s arrivals quay.',
    'Capture.','Review queue (intake).',['port','outbound','dock'],icon='inbound')
add('outbound','Outbound (-)','signal','official','Both','Material prepared to leave. A working area, not a zone.',
    'Never drawn inside the Capital.','The Port\'s departures quay.',
    'Capture.','Outbound.',['port','incoming'])
add('lantern','Lantern','signal','agreed','App','Attention: the Beacon ranks it as unusual. Look here.',
    'Not blocking; that is the Reef. Not the Lighthouse, which is standing guidance.','A brass lantern hung on the structure.',
    'Not used on the site.','Beacon signal, gold (--warn).',['reef','observatory','lighthouse'],key=True,ts='official')
add('storm','Storm','signal','proposed','App','Risks, conflicts, policy violations.',
    'Drafts only. The Reef carries blocking meanwhile.','A storm cloud over an island.',
    'Not used.','Beacon (blocking), in drafts.',['reef','guardian'],icon='',ts='official')
add('whale-song','Whale song','signal','proposed','App','A high-value, long-range signal.',
    'Drafts only. Clashes with the proposed lore sheet, which rules out creatures.','A whale far out at sea.',
    'Not used.','Beacon (long horizon), in drafts.',['lantern','current'],icon='')

# Conditions
for cid, nm, mean, not_, drawn, rel in [
    ('thriving','Thriving','Fresh evidence; actively tended.','Never a score or a percentage.','Clean; lit windows, chimney smoke, a flag.',['quiet','weathered','ruined']),
    ('quiet','Quiet','Healthy, but little recent activity.','Not neglect. Quiet is sound.','Clean; unlit windows, no smoke.',['thriving','weathered','ruined']),
    ('weathered','Weathered','Stale evidence: needs upkeep before it is relied on.','Not broken: it can be repaired, and should be before anyone relies on it.','Moss, ivy, a cracked wall, a missing shingle.',['quiet','ruined','thriving']),
    ('ruined','Ruined','Retired or archived.','Not a failure state. Honoured retirement: the Ruins look.','A fallen roof piece, broken walls, overgrowth.',['ruins','weathered','historian']),
]:
    add(cid, nm, 'condition', 'official', 'Both', mean, not_, drawn + ' Alpha decal over the same base art.',
        'Living Map; Arcadia (if built from live data, see board 8).', 'Condition wording on the Known Lands chart.', rel, icon=('ruins' if cid=='ruined' else '@'+cid), key=True,
        note='Driven by evidence freshness: a stale repository visibly weathers, so the map reports health without a chart.')

# Roles
for rid, nm, does, alias in [
    ('steward','Steward','Tends and ratifies an island.','Explainer "Gardener".'),
    ('archivist','Archivist','Curates the Library.','Explainer "Curator".'),
    ('cartographer','Cartographer','Maps links and routes (Connect).',None),
    ('builder','Builder','Builds tools and harnesses.',None),
    ('navigator','Navigator','Works the trade routes between islands.','Explainer "Harbourman", at the Port.'),
    ('scout','Scout','Acquires and captures new material.',None),
    ('historian','Historian','Reflects on history; retrospect.','Explainer "Observer" (or the Observatory).'),
    ('guardian','Guardian','Holds boundaries and authority.','Explainer "Governance". Drawn with a shield, no weapon.'),
]:
    add(rid, nm, 'role', 'proposed', 'Both', does,
        'A hat, not a species: the same role is worn by a person or an agent. Never a humanoid robot.',
        'A tool in the glyph set; a figure only in illustration.',
        'Field Guide, marked proposed.', 'Who is working column: role glyph + worker name.',
        [r for r in ['steward','archivist','cartographer','scout'] if r != rid][:3], icon='role-'+rid,
        note=('Proposed until written into Philosophy/Model/Agents. ' + (alias or '')).strip())

CATS = [('geography','Geography'),('zone','Zones'),('structure','Structures'),('port-mode','Port modes'),
        ('sea','Sea'),('signal','Signals'),('condition','Conditions'),('role','Steward roles')]
