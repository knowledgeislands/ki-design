import type { KiSymbol } from './types.ts'

/**
 * The symbol library. Meanings mirror ki-principal; where a meaning or status is unsettled the entry says so in
 * `notes` rather than inventing canon. Retired ids are listed in `retiredSymbols` and never reused.
 */
export const symbols = [
  // Geography
  {
    id: 'island',
    name: 'Island',
    meaning: 'A body of knowledge with its own shores: one coherent domain, project or practice.',
    status: 'official',
    category: 'geography',
    icon: 'island',
    site: 'Illustrated island on the Map of Known Lands',
    app: 'Island card and hex map'
  },
  {
    id: 'archipelago',
    name: 'Archipelago',
    meaning: 'A cluster of related islands that share waters and trade closely.',
    status: 'official',
    category: 'geography',
    icon: 'archipelago'
  },
  {
    id: 'territory',
    name: 'Territory',
    meaning: 'A region of the realm held together by purpose; its parts are mostly, though not always, adjacent.',
    status: 'agreed',
    category: 'geography'
  },
  {
    id: 'realm',
    name: 'Realm',
    meaning: 'The whole standard world, containing many territories laid out geographically.',
    status: 'agreed',
    category: 'geography'
  },
  {
    id: 'map-of-known-lands',
    name: 'Map of Known Lands',
    meaning: 'The chart of the realm: everything charted so far, often called simply Known Lands.',
    status: 'agreed',
    category: 'geography',
    icon: 'known-lands',
    site: 'The landing map',
    app: 'The overview map'
  },
  {
    id: 'terrain',
    name: 'Terrain',
    meaning: 'The character of the ground on a hex, from grassland to volcanic, set by the tile set.',
    status: 'official',
    category: 'geography',
    icon: 'terrain'
  },
  {
    id: 'ancient-forest',
    name: 'Ancient forest',
    meaning: 'Old, deep-rooted knowledge at the heart of an island; slow-growing and protected.',
    status: 'official',
    category: 'geography',
    icon: 'ancient-forest'
  },
  {
    id: 'weave',
    name: 'Weave',
    meaning: 'The fabric of cross-links that binds islands and their contents together.',
    status: 'official',
    category: 'geography',
    icon: 'weave'
  },
  {
    id: 'cartographic-grid',
    name: 'Cartographic grid',
    meaning: 'The hex grid every map is drawn on; the shared coordinate system of the realm.',
    status: 'agreed',
    category: 'geography',
    icon: 'grid',
    notes: 'Hex grid chosen for KI maps, reusing existing isometric structure art.'
  },

  // Zones
  {
    id: 'capital',
    name: 'Capital',
    meaning:
      'The civic heart of an island, holding the Library and the Council Hall; drawn as a square, never a fortress.',
    status: 'official',
    category: 'zone',
    site: 'The Capital district on the Map of Known Lands',
    app: 'Territory Principal',
    icon: 'capital',
    notes:
      'GDR-KI-PRINCIPAL-011. Replaces the Citadel; each tile set draws it its own way (a civic quarter and square, or a hilltop forum). The glyph is a small dome (the Library) beside a low colonnaded front (the Council Hall) on a shared base.'
  },
  {
    id: 'pillars',
    name: 'Pillars',
    meaning: 'The foundational principles an island or the realm rests on.',
    status: 'official',
    category: 'zone'
  },
  {
    id: 'calendar',
    name: 'Calendar',
    meaning: 'The zone that keeps time: rhythms, cadences and dated commitments.',
    status: 'official',
    category: 'zone',
    icon: 'calendar'
  },
  {
    id: 'resources',
    name: 'Resources',
    meaning: 'Reference materials, assets and supplies an island draws on.',
    status: 'official',
    category: 'zone',
    icon: 'resources'
  },
  {
    id: 'streams',
    name: 'Streams',
    meaning: 'Flows of incoming material that feed an island over time.',
    status: 'official',
    category: 'zone',
    icon: 'streams'
  },
  {
    id: 'admin-governance',
    name: 'Admin / Governance',
    meaning: 'The zone for decisions, policy and stewardship of the island itself.',
    status: 'official',
    category: 'zone',
    icon: 'council-hall'
  },
  {
    id: 'admin-operations',
    name: 'Admin / Operations',
    meaning: 'The zone for the running of the island: routines, upkeep and housekeeping.',
    status: 'official',
    category: 'zone',
    icon: 'mill'
  },

  // Structures
  {
    id: 'library',
    name: 'Library',
    meaning: 'Where curated, durable knowledge is kept and can be consulted.',
    status: 'official',
    category: 'structure',
    icon: 'library'
  },
  {
    id: 'council-hall',
    name: 'Council Hall',
    meaning: 'Governance: where decisions are debated and made; the parliament of the realm.',
    status: 'official',
    category: 'structure',
    icon: 'council-hall'
  },
  {
    id: 'observatory',
    name: 'Observatory',
    meaning: 'Insight and analytics: where an island looks out and reflects.',
    status: 'official',
    category: 'structure',
    icon: 'observatory',
    app: "The local app's name and mark",
    notes: 'Also the mark of the local app, which is called the Observatory (GDR-KI-PRINCIPAL-011).'
  },
  {
    id: 'lighthouse',
    name: 'Lighthouse',
    meaning: 'Guidance: standing direction that keeps travellers off the rocks.',
    status: 'official',
    category: 'structure',
    icon: 'lighthouse'
  },
  {
    id: 'port',
    name: 'Port',
    meaning: 'Where knowledge and work arrive and depart, by whatever mode of transport.',
    status: 'official',
    category: 'structure',
    icon: 'port',
    notes: 'Replaces Harbour: a port has more modes than a harbour (dock, rail depot, airport, customs house).'
  },
  {
    id: 'bridge',
    name: 'Bridge',
    meaning: 'A translation layer joining two lands so that what crosses can be understood on both sides.',
    status: 'agreed',
    category: 'structure',
    icon: 'bridge',
    notes: 'Open question: whether a land-to-land link should be a Causeway, keeping Bridge for translation.'
  },
  {
    id: 'workshop',
    name: 'Workshop',
    meaning: 'Where things are made and work in progress lives.',
    status: 'proposed',
    category: 'structure',
    icon: 'workshop'
  },
  {
    id: 'mill',
    name: 'Mill / Engine house',
    meaning: 'Operational systems: the machinery that keeps turning, such as automations and pipelines.',
    status: 'proposed',
    category: 'structure',
    icon: 'mill'
  },
  {
    id: 'ruins',
    name: 'Ruins',
    meaning: 'Retired knowledge: kept for history, no longer maintained or relied upon.',
    status: 'proposed',
    category: 'structure',
    icon: 'ruins'
  },

  // Port modes
  {
    id: 'dock',
    name: 'Dock',
    meaning: 'The port mode for exchange by sea with other islands.',
    status: 'official',
    category: 'port-mode',
    icon: 'dock'
  },
  {
    id: 'rail-depot',
    name: 'Rail depot',
    meaning: 'The port mode for scheduled, high-volume flows along fixed lines.',
    status: 'official',
    category: 'port-mode',
    icon: 'rail-depot'
  },
  {
    id: 'airport',
    name: 'Airport',
    meaning: 'The port mode for fast, long-range connections to distant lands.',
    status: 'official',
    category: 'port-mode',
    icon: 'airport'
  },
  {
    id: 'customs-house',
    name: 'Customs house',
    meaning: 'The border crossing: where what enters or leaves is inspected and declared.',
    status: 'official',
    category: 'port-mode',
    icon: 'customs-house'
  },

  // Sea
  {
    id: 'route',
    name: 'Route',
    meaning: 'A charted way between two places.',
    status: 'official',
    category: 'sea',
    icon: 'route'
  },
  {
    id: 'trade-route',
    name: 'Trade route',
    meaning: 'A regular route along which knowledge and work are exchanged between islands.',
    status: 'official',
    category: 'sea',
    icon: 'trade-route'
  },
  {
    id: 'current',
    name: 'Current',
    meaning: 'A prevailing flow that carries things along whether or not anyone steers.',
    status: 'official',
    category: 'sea',
    icon: 'current'
  },
  {
    id: 'reef',
    name: 'Reef',
    meaning: 'A hidden hazard beneath the surface.',
    status: 'official',
    category: 'sea',
    icon: 'reef'
  },
  {
    id: 'celestial-guide',
    name: 'Celestial guide',
    meaning: 'A fixed point to navigate by: enduring values above the day-to-day.',
    status: 'official',
    category: 'sea',
    icon: 'celestial-guide'
  },
  {
    id: 'fog',
    name: 'Fog',
    meaning: 'Uncertainty: waters not yet charted or no longer clearly seen.',
    status: 'proposed',
    category: 'sea',
    icon: 'fog',
    notes: 'Experimental.'
  },

  // Signals
  {
    id: 'incoming',
    name: 'Incoming (+)',
    meaning: 'Something has arrived and awaits attention.',
    status: 'official',
    category: 'signal',
    icon: 'inbound'
  },
  {
    id: 'outbound',
    name: 'Outbound (-)',
    meaning: 'Something is leaving or has been sent on.',
    status: 'official',
    category: 'signal',
    icon: 'outbound'
  },
  {
    id: 'lantern',
    name: 'Lantern',
    meaning: 'Attention: a light left burning where someone should look.',
    status: 'official',
    category: 'signal',
    icon: 'lantern'
  },
  {
    id: 'storm',
    name: 'Storm',
    meaning: 'A blocking risk: work cannot safely proceed until it passes.',
    status: 'official',
    category: 'signal'
  },
  {
    id: 'whale-song',
    name: 'Whale song',
    meaning: 'A long-range signal heard across many islands.',
    status: 'proposed',
    category: 'signal'
  },

  // Conditions
  {
    id: 'thriving',
    name: 'Thriving',
    meaning: 'Actively tended and in good health.',
    status: 'official',
    category: 'condition'
  },
  {
    id: 'quiet',
    name: 'Quiet',
    meaning: 'Sound but little visited lately.',
    status: 'official',
    category: 'condition'
  },
  {
    id: 'weathered',
    name: 'Weathered',
    meaning: 'Showing neglect: needs upkeep before it can be relied upon.',
    status: 'official',
    category: 'condition'
  },
  {
    id: 'ruined',
    name: 'Ruined',
    meaning: 'No longer usable as it stands; retire or rebuild.',
    status: 'official',
    category: 'condition',
    icon: 'ruins'
  },

  // Steward roles (agents are workers, human or robot)
  {
    id: 'steward',
    name: 'Steward',
    meaning: 'Holds overall care of an island.',
    status: 'proposed',
    category: 'role',
    icon: 'role-steward'
  },
  {
    id: 'archivist',
    name: 'Archivist',
    meaning: 'Keeps the record: files, preserves and retrieves.',
    status: 'proposed',
    category: 'role',
    icon: 'role-archivist'
  },
  {
    id: 'cartographer',
    name: 'Cartographer',
    meaning: 'Charts the lands and keeps the maps true.',
    status: 'proposed',
    category: 'role',
    icon: 'role-cartographer'
  },
  {
    id: 'builder',
    name: 'Builder',
    meaning: 'Raises and repairs structures.',
    status: 'proposed',
    category: 'role',
    icon: 'role-builder'
  },
  {
    id: 'navigator',
    name: 'Navigator',
    meaning: 'Plots routes and steers work between places.',
    status: 'proposed',
    category: 'role',
    icon: 'role-navigator'
  },
  {
    id: 'scout',
    name: 'Scout',
    meaning: 'Ventures into fog and reports back on uncharted waters.',
    status: 'proposed',
    category: 'role',
    icon: 'role-scout'
  },
  {
    id: 'historian',
    name: 'Historian',
    meaning: 'Tells how things came to be and tends the ruins.',
    status: 'proposed',
    category: 'role',
    icon: 'role-historian'
  },
  {
    id: 'guardian',
    name: 'Guardian',
    meaning: 'Protects boundaries and watches for storms and reefs.',
    status: 'proposed',
    category: 'role',
    icon: 'role-guardian'
  }
] as const satisfies readonly KiSymbol[]

export type SymbolId = (typeof symbols)[number]['id']

/** Ids withdrawn from the library, with the reason. They are never reused for another meaning. */
export const retiredSymbols = {
  citadel:
    'Retired by GDR-KI-PRINCIPAL-011: the Capital is the only name for the civic heart, drawn civic, not fortified.',
  tower: 'Dropped by GDR-KI-PRINCIPAL-011: the symbol language stays non-combative; the Observatory is the app mark.',
  harbour: 'Retired by GDR-KI-PRINCIPAL-010: the Port is the point of entry and exit.'
} as const satisfies Readonly<Record<string, string>>
