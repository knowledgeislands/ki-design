# @knowledgeislands/symbols

The Knowledge Islands symbol library as typed data: every place, structure, signal, condition and role in the vocabulary, with its meaning, status and the glyph that draws it.

Meaning is canon in `ki-principal`; this package mirrors it. Statuses:

- `canon`: enacted.
- `decided`: agreed, awaiting enactment. (Port replacing Harbour, Lighthouse as guidance and Council Hall as governance were enacted by GDR-KI-PRINCIPAL-010 and are now canon.)
- `proposed`: open (for example Workshop, Mill / Engine house, Ruins, Whale song, Fog as experimental, the steward roles, and the Tower as a name for the Observatory).

Open questions sit in `notes`, such as whether a land-to-land link should be a Causeway so that Bridge keeps its meaning as a translation layer.

## API

```ts
import { byCategory, byId, symbols } from '@knowledgeislands/symbols'

byId.get('port')?.meaning
byCategory['port-mode'].map((s) => s.name) // ['Dock', 'Rail depot', 'Airport', 'Customs house']
```

- `symbols`: the library, in order, typed `as const` (so `SymbolId` is a union of ids).
- `byId`: `ReadonlyMap<string, KiSymbol>`.
- `byCategory`: every category, each a list in library order.
- Types: `KiSymbol` (also exported as `Symbol`), `SymbolStatus`, `SymbolCategory`; lists `symbolStatuses`, `symbolCategories`.

Each entry is `{ id, name, meaning, status, category, icon?, site?, app?, notes? }`. `icon` is typed as `IconName` from `@knowledgeislands/icons`, and a test checks every one exists.
