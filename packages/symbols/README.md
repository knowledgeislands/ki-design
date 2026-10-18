# @knowledgeislands/symbols

The Knowledge Islands symbol library as typed data: every place, structure, signal, condition and role in the vocabulary, with its meaning, status and the glyph that draws it.

Meaning is ratified in `ki-principal`; this package mirrors it. Statuses, displayed as **Official · Agreed · Proposed** (GDR-KI-DESIGN-002):

- `official`: enacted in `ki-principal`. (Port replacing Harbour, Lighthouse as guidance and Council Hall as governance were enacted by GDR-KI-PRINCIPAL-010; the Capital, holding the Library and the Council Hall, by GDR-KI-PRINCIPAL-011.)
- `agreed`: agreed with the owner, awaiting enactment.
- `proposed`: open for discussion (for example Workshop, Mill / Engine house, Ruins, Whale song, Fog as experimental, and the steward roles).

The fourth label, **Open**, belongs to open questions rather than symbols; they sit in `notes` and in DESIGN.md.

`retiredSymbols` lists ids withdrawn from the library, with the reason, so they are never reused: `citadel` (the Capital is the only name for the civic heart), `tower` (dropped; the Observatory is the local app's mark) and `harbour` (now the Port). The `citadel` and `tower` glyphs stay in `@knowledgeislands/icons` but no symbol maps to them.

Open questions sit in `notes`, such as whether a land-to-land link should be a Causeway so that Bridge keeps its meaning as a translation layer.

## API

```ts
import { byCategory, byId, symbols } from '@knowledgeislands/symbols'

byId.get('port')?.meaning
byCategory['port-mode'].map((s) => s.name) // ['Dock', 'Rail depot', 'Airport', 'Customs house']
```

- `symbols`: the library, in order, typed `as const` (so `SymbolId` is a union of ids).
- `retiredSymbols`: retired ids and why they were retired.
- `byId`: `ReadonlyMap<string, KiSymbol>`.
- `byCategory`: every category, each a list in library order.
- Types: `KiSymbol` (also exported as `Symbol`), `SymbolStatus`, `SymbolCategory`; lists `symbolStatuses`, `symbolCategories`.

Each entry is `{ id, name, meaning, status, category, icon?, site?, app?, notes? }`. `icon` is typed as `IconName` from `@knowledgeislands/icons`, and a test checks every one exists.
