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
    meaning:
      'Domain of knowledge: a discrete, self-contained body of knowledge with its own shores; in practice, a repository.',
    status: 'official',
    category: 'geography',
    icon: 'island',
    site: 'Illustrated island on the Map of Known Lands',
    app: 'Island card and hex map'
  },
  {
    id: 'archipelago',
    name: 'Archipelago',
    meaning:
      "A territory, drawn; federated knowledge ecosystem: the territory's islands in one sea region, with a tinted border; an island may sit apart as an exclave.",
    status: 'official',
    category: 'geography',
    icon: 'archipelago',
    notes:
      'A territory is an archipelago (GDR-KI-DESIGN-015; SDR-KI-PRINCIPAL-005, amended 2026-10-19). Islands that share a subject across territories are described in words, never drawn as a second grouping.'
  },
  {
    id: 'territory',
    name: 'Territory',
    meaning:
      'Islands governed together under one Capital, drawn as an archipelago: its islands in one sea region with a tinted border.',
    status: 'official',
    category: 'geography',
    notes: 'Drawn as an archipelago (GDR-KI-DESIGN-015; SDR-KI-PRINCIPAL-005, amended 2026-10-19).'
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
    meaning:
      'Depth / maturity: the character of the ground on a hex, from grassland to volcanic; elevation reads as maturity.',
    status: 'official',
    category: 'geography',
    icon: 'terrain'
  },
  {
    id: 'ancient-forest',
    name: 'Ancient forest',
    meaning: 'Wisdom / continuity: old, deep-rooted knowledge at the heart of an island; slow-growing and protected.',
    status: 'official',
    category: 'geography',
    icon: 'ancient-forest'
  },
  {
    id: 'weave',
    name: 'Weave',
    meaning: 'Cross-domain synthesis: the fabric of cross-links that binds islands and their contents together.',
    status: 'official',
    category: 'geography',
    icon: 'weave'
  },
  {
    id: 'cartographic-grid',
    name: 'Cartographic grid',
    meaning: 'Structure / orientation: the hex grid every map is drawn on; the shared coordinate system of the realm.',
    status: 'official',
    category: 'geography',
    icon: 'grid',
    notes: 'Hex grid chosen for KI maps, reusing existing isometric structure art.'
  },

  // Zones
  {
    id: 'capital',
    name: 'Capital',
    meaning:
      'Civic heart of an island: it holds the Library and the Council Hall; drawn as a square, never a fortress.',
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
    meaning: 'Internal knowledge owned by the island: philosophies, methodologies and approaches, kept in the Library.',
    status: 'official',
    category: 'zone'
  },
  {
    id: 'calendar',
    name: 'Calendar',
    meaning: 'Time-based notes: daily notes, meeting notes and periodic reviews.',
    status: 'official',
    category: 'zone',
    icon: 'calendar'
  },
  {
    id: 'resources',
    name: 'Resources',
    meaning:
      'External knowledge: things that exist independently of the island and add value by being synthesised in it.',
    status: 'official',
    category: 'zone',
    icon: 'resources'
  },
  {
    id: 'streams',
    name: 'Streams',
    meaning:
      'Knowledge in motion: finite forward work, runs of recurring obligations and their review evidence; not part of the Library.',
    status: 'official',
    category: 'zone',
    icon: 'streams'
  },
  {
    id: 'admin-governance',
    name: 'Admin / Governance',
    meaning: 'Local governance: what must hold, such as the Charter, Known Lands, policies and decisions.',
    status: 'official',
    category: 'zone',
    icon: 'council-hall'
  },
  {
    id: 'admin-operations',
    name: 'Admin / Operations',
    meaning: 'Local operations: how the island runs, such as activities, processes, live artefacts and lessons.',
    status: 'official',
    category: 'zone',
    icon: 'mill'
  },

  // Structures
  {
    id: 'library',
    name: 'Library',
    meaning:
      'The canonical record: governed, version-controlled ratified knowledge, holding the Calendar, Pillars and Resources zones.',
    status: 'official',
    category: 'structure',
    icon: 'library'
  },
  {
    id: 'council-hall',
    name: 'Council Hall',
    meaning: 'Governance: where decisions are debated and made; the parliament of the island, in the Capital.',
    status: 'official',
    category: 'structure',
    icon: 'council-hall'
  },
  {
    id: 'observatory',
    name: 'Observatory',
    meaning: 'Insight / analytics: where an island looks out and reflects.',
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
    meaning: 'Entry and exit; integration: where knowledge and work arrive and depart, by whatever mode of transport.',
    status: 'official',
    category: 'structure',
    icon: 'port',
    notes: 'Replaces Harbour: a port has more modes than a harbour (dock, rail depot, airport, customs house).'
  },
  {
    id: 'causeway',
    name: 'Causeway',
    meaning:
      'Translation layer: a causeway joins two grounds across shallow water, so that what crosses keeps its footing on both sides.',
    status: 'official',
    category: 'structure',
    icon: 'causeway',
    site: 'The Agents section',
    app: 'MCP servers',
    notes:
      "GDR-KI-PRINCIPAL-013 and GDR-KI-DESIGN-018: replaces the Bridge as the translation layer, so that Bridge names only the local app's Act command (plan / confirm / receipt), for which no bridge is drawn. The old id `bridge` resolves here through `symbolAliases`; the tile id is still `structure/bridge`."
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
    name: 'Mill',
    meaning: 'Operational systems: the running of the island, routines and upkeep.',
    status: 'official',
    category: 'structure',
    icon: 'mill',
    notes:
      'GDR-KI-PRINCIPAL-013 and GDR-KI-DESIGN-019: the drawn form of Admin / Operations, a stone house with a waterwheel. The Engine house is not adopted.'
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
    meaning: 'The port mode by sea: exchange with other islands, and material carried in.',
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
    meaning: 'Relationship: a charted way between two places.',
    status: 'official',
    category: 'sea',
    icon: 'route'
  },
  {
    id: 'trade-route',
    name: 'Trade route',
    meaning: 'Collaboration / exchange: a regular route along which knowledge and work pass between islands.',
    status: 'official',
    category: 'sea',
    icon: 'trade-route'
  },
  {
    id: 'current',
    name: 'Current',
    meaning: 'Information flow: a prevailing flow that carries things along whether or not anyone steers.',
    status: 'official',
    category: 'sea',
    icon: 'current'
  },
  {
    id: 'reef',
    name: 'Reef',
    meaning: 'Risk / ambiguity: a hidden hazard beneath the surface.',
    status: 'official',
    category: 'sea',
    icon: 'reef'
  },
  {
    id: 'celestial-guide',
    name: 'Celestial guide',
    meaning: 'Long-range orientation: a fixed point to navigate by, enduring values above the day-to-day.',
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
    notes:
      'GDR-KI-DESIGN-020: proposed. The canon uses fog as a terrain metaphor (Visual Style: experimental ideas are fog or shifting sands); here it is a map state over any terrain, never a terrain tile.'
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
    status: 'agreed',
    category: 'signal',
    icon: 'lantern',
    notes: "GDR-KI-DESIGN-020: agreed until ki-principal's Symbol Library names it."
  },
  {
    id: 'storm',
    name: 'Storm',
    meaning: 'A blocking risk: work cannot safely proceed until it passes.',
    status: 'proposed',
    category: 'signal',
    notes: 'GDR-KI-DESIGN-020: proposed until ki-principal names it; never ship it as settled.'
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

  // Steward roles (GDR-KI-PRINCIPAL-014): a role is a hat, not a species; any agent, human or AI, may wear one
  {
    id: 'steward',
    name: 'Steward',
    meaning:
      'Tends an island and holds its boundaries, at the Council Hall; an AI agent in this hat tends but does not ratify.',
    status: 'official',
    category: 'role',
    icon: 'role-steward'
  },
  {
    id: 'archivist',
    name: 'Archivist',
    meaning: 'Curates the Library.',
    status: 'official',
    category: 'role',
    icon: 'role-archivist'
  },
  {
    id: 'cartographer',
    name: 'Cartographer',
    meaning: 'Maps links and routes: the Connect stage of the cycle.',
    status: 'official',
    category: 'role',
    icon: 'role-cartographer'
  },
  {
    id: 'builder',
    name: 'Builder',
    meaning: 'Builds tools and harnesses.',
    status: 'official',
    category: 'role',
    icon: 'role-builder'
  },
  {
    id: 'navigator',
    name: 'Navigator',
    meaning: 'Works the trade routes, at the Port.',
    status: 'official',
    category: 'role',
    icon: 'role-navigator'
  },
  {
    id: 'scout',
    name: 'Scout',
    meaning: 'Acquires and captures new material: the Capture stage of the cycle.',
    status: 'official',
    category: 'role',
    icon: 'role-scout'
  },
  {
    id: 'historian',
    name: 'Historian',
    meaning: 'Reflects on what has happened (retrospect); an AI agent prepares it and a person judges it.',
    status: 'official',
    category: 'role',
    icon: 'role-historian'
  }
] as const satisfies readonly KiSymbol[]

export type SymbolId = (typeof symbols)[number]['id']

/** Ids withdrawn from the library, with the reason. They are never reused for another meaning. */
export const retiredSymbols = {
  citadel:
    'Retired by GDR-KI-PRINCIPAL-011: the Capital is the only name for the civic heart, drawn civic, not fortified.',
  tower: 'Dropped by GDR-KI-PRINCIPAL-011: the symbol language stays non-combative; the Observatory is the app mark.',
  harbour: 'Retired by GDR-KI-PRINCIPAL-010: the Port is the point of entry and exit.',
  guardian:
    "Not adopted by GDR-KI-PRINCIPAL-014: boundary-keeping is the Council's work, drawn as the Steward at the Council Hall. The role-guardian glyph stays, mapped to no symbol.",
  'whale-song': 'Ruled out by GDR-KI-PRINCIPAL-015: creatures are ruled out of the lore, so whale song is not a signal.'
} as const satisfies Readonly<Record<string, string>>

/**
 * Old ids that still resolve to the symbol that replaced them, so references written before a rename keep working.
 * An alias is never reused as a symbol id. `bridge` became `causeway` (GDR-KI-DESIGN-018); the `bridge` glyph stays
 * in `@knowledgeislands/icons`, mapped to no symbol, and is never drawn for the local app's Act command.
 */
export const symbolAliases = {
  bridge: 'causeway'
} as const satisfies Readonly<Record<string, SymbolId>>
