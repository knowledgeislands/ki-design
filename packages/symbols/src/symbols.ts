import type { KiSymbol } from './types.ts'

/**
 * The symbol library. Meanings mirror ki-principal; where a meaning or status is unsettled the entry says so in
 * `notes` rather than inventing canon.
 */
export const symbols = [
  // Geography
  {
    id: 'island',
    name: 'Island',
    meaning: 'A body of knowledge with its own shores: one coherent domain, project or practice.',
    status: 'canon',
    category: 'geography',
    icon: 'island',
    site: 'Illustrated island on the Map of Known Lands',
    app: 'Island card and hex map'
  },
  {
    id: 'archipelago',
    name: 'Archipelago',
    meaning: 'A cluster of related islands that share waters and trade closely.',
    status: 'canon',
    category: 'geography',
    icon: 'archipelago'
  },
  {
    id: 'territory',
    name: 'Territory',
    meaning: 'A region of the realm held together by purpose; its parts are mostly, though not always, adjacent.',
    status: 'decided',
    category: 'geography'
  },
  {
    id: 'realm',
    name: 'Realm',
    meaning: 'The whole standard world, containing many territories laid out geographically.',
    status: 'decided',
    category: 'geography'
  },
  {
    id: 'map-of-known-lands',
    name: 'Map of Known Lands',
    meaning: 'The chart of the realm: everything charted so far, often called simply Known Lands.',
    status: 'decided',
    category: 'geography',
    icon: 'known-lands',
    site: 'The landing map',
    app: 'The overview map'
  },
  {
    id: 'terrain',
    name: 'Terrain',
    meaning: 'The character of the ground on a hex, from grassland to volcanic, set by the tile set.',
    status: 'canon',
    category: 'geography',
    icon: 'terrain'
  },
  {
    id: 'ancient-forest',
    name: 'Ancient forest',
    meaning: 'Old, deep-rooted knowledge at the heart of an island; slow-growing and protected.',
    status: 'canon',
    category: 'geography',
    icon: 'ancient-forest'
  },
  {
    id: 'weave',
    name: 'Weave',
    meaning: 'The fabric of cross-links that binds islands and their contents together.',
    status: 'canon',
    category: 'geography',
    icon: 'weave'
  },
  {
    id: 'cartographic-grid',
    name: 'Cartographic grid',
    meaning: 'The hex grid every map is drawn on; the shared coordinate system of the realm.',
    status: 'decided',
    category: 'geography',
    icon: 'grid',
    notes: 'Hex grid chosen for KI maps, reusing existing isometric structure art.'
  },

  // Zones
  {
    id: 'capital',
    name: 'Capital',
    meaning: 'The seat of the realm, where the Citadel stands.',
    status: 'proposed',
    category: 'zone',
    icon: 'citadel'
  },
  {
    id: 'pillars',
    name: 'Pillars',
    meaning: 'The foundational principles an island or the realm rests on.',
    status: 'canon',
    category: 'zone'
  },
  {
    id: 'calendar',
    name: 'Calendar',
    meaning: 'The zone that keeps time: rhythms, cadences and dated commitments.',
    status: 'canon',
    category: 'zone',
    icon: 'calendar'
  },
  {
    id: 'resources',
    name: 'Resources',
    meaning: 'Reference materials, assets and supplies an island draws on.',
    status: 'canon',
    category: 'zone',
    icon: 'resources'
  },
  {
    id: 'streams',
    name: 'Streams',
    meaning: 'Flows of incoming material that feed an island over time.',
    status: 'canon',
    category: 'zone',
    icon: 'streams'
  },
  {
    id: 'admin-governance',
    name: 'Admin / Governance',
    meaning: 'The zone for decisions, policy and stewardship of the island itself.',
    status: 'canon',
    category: 'zone',
    icon: 'council-hall'
  },
  {
    id: 'admin-operations',
    name: 'Admin / Operations',
    meaning: 'The zone for the running of the island: routines, upkeep and housekeeping.',
    status: 'canon',
    category: 'zone',
    icon: 'mill'
  },

  // Structures
  {
    id: 'citadel',
    name: 'Citadel',
    meaning: 'The fortified heart of the Capital that houses the realm’s central institutions.',
    status: 'proposed',
    category: 'structure',
    icon: 'citadel',
    notes: 'Suggested as the home of the Tower and Council Hall.'
  },
  {
    id: 'library',
    name: 'Library',
    meaning: 'Where curated, durable knowledge is kept and can be consulted.',
    status: 'canon',
    category: 'structure',
    icon: 'library'
  },
  {
    id: 'council-hall',
    name: 'Council Hall',
    meaning: 'Governance: where decisions are debated and made; the parliament of the realm.',
    status: 'decided',
    category: 'structure',
    icon: 'council-hall'
  },
  {
    id: 'tower',
    name: 'Tower',
    meaning: 'A place to watch, see and guide from.',
    status: 'proposed',
    category: 'structure',
    icon: 'tower',
    notes: 'Candidate new name for the Observatory app.'
  },
  {
    id: 'observatory',
    name: 'Observatory',
    meaning: 'Insight and analytics: where an island looks out and reflects.',
    status: 'canon',
    category: 'structure',
    icon: 'observatory',
    notes: "Also the local app's working name; the app is marked by the Tower, so this keeps its canon meaning."
  },
  {
    id: 'lighthouse',
    name: 'Lighthouse',
    meaning: 'Guidance: standing direction that keeps travellers off the rocks.',
    status: 'decided',
    category: 'structure',
    icon: 'lighthouse'
  },
  {
    id: 'port',
    name: 'Port',
    meaning: 'Where knowledge and work arrive and depart, by whatever mode of transport.',
    status: 'decided',
    category: 'structure',
    icon: 'port',
    notes: 'Replaces Harbour: a port has more modes than a harbour (dock, rail depot, airport, customs house).'
  },
  {
    id: 'bridge',
    name: 'Bridge',
    meaning: 'A translation layer joining two lands so that what crosses can be understood on both sides.',
    status: 'decided',
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
    status: 'decided',
    category: 'port-mode',
    icon: 'dock'
  },
  {
    id: 'rail-depot',
    name: 'Rail depot',
    meaning: 'The port mode for scheduled, high-volume flows along fixed lines.',
    status: 'decided',
    category: 'port-mode',
    icon: 'rail-depot'
  },
  {
    id: 'airport',
    name: 'Airport',
    meaning: 'The port mode for fast, long-range connections to distant lands.',
    status: 'decided',
    category: 'port-mode',
    icon: 'airport'
  },
  {
    id: 'customs-house',
    name: 'Customs house',
    meaning: 'The border crossing: where what enters or leaves is inspected and declared.',
    status: 'decided',
    category: 'port-mode',
    icon: 'customs-house'
  },

  // Sea
  {
    id: 'route',
    name: 'Route',
    meaning: 'A charted way between two places.',
    status: 'canon',
    category: 'sea',
    icon: 'route'
  },
  {
    id: 'trade-route',
    name: 'Trade route',
    meaning: 'A regular route along which knowledge and work are exchanged between islands.',
    status: 'canon',
    category: 'sea',
    icon: 'trade-route'
  },
  {
    id: 'current',
    name: 'Current',
    meaning: 'A prevailing flow that carries things along whether or not anyone steers.',
    status: 'canon',
    category: 'sea',
    icon: 'current'
  },
  {
    id: 'reef',
    name: 'Reef',
    meaning: 'A hidden hazard beneath the surface.',
    status: 'canon',
    category: 'sea',
    icon: 'reef'
  },
  {
    id: 'celestial-guide',
    name: 'Celestial guide',
    meaning: 'A fixed point to navigate by: enduring values above the day-to-day.',
    status: 'canon',
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
    status: 'canon',
    category: 'signal',
    icon: 'inbound'
  },
  {
    id: 'outbound',
    name: 'Outbound (-)',
    meaning: 'Something is leaving or has been sent on.',
    status: 'canon',
    category: 'signal',
    icon: 'outbound'
  },
  {
    id: 'lantern',
    name: 'Lantern',
    meaning: 'Attention: a light left burning where someone should look.',
    status: 'canon',
    category: 'signal',
    icon: 'lantern'
  },
  {
    id: 'storm',
    name: 'Storm',
    meaning: 'A blocking risk: work cannot safely proceed until it passes.',
    status: 'canon',
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
    status: 'canon',
    category: 'condition'
  },
  {
    id: 'quiet',
    name: 'Quiet',
    meaning: 'Sound but little visited lately.',
    status: 'canon',
    category: 'condition'
  },
  {
    id: 'weathered',
    name: 'Weathered',
    meaning: 'Showing neglect: needs upkeep before it can be relied upon.',
    status: 'canon',
    category: 'condition'
  },
  {
    id: 'ruined',
    name: 'Ruined',
    meaning: 'No longer usable as it stands; retire or rebuild.',
    status: 'canon',
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
