# @knowledgeislands/symbols

The Knowledge Islands symbol library as typed data: every place, structure, signal, condition and role in the vocabulary, with its meaning, status and the glyph that draws it.

Meaning is ratified in `ki-principal`; this package mirrors it. Statuses, displayed as **Official · Agreed · Proposed** (GDR-KI-DESIGN-002):

- `official`: enacted in `ki-principal`. (Port replacing Harbour, Lighthouse as guidance and Council Hall as governance were enacted by GDR-KI-PRINCIPAL-010; the Capital, holding the Library and the Council Hall, by GDR-KI-PRINCIPAL-011; the Causeway as the translation layer and the Mill by GDR-KI-PRINCIPAL-013; the seven steward roles by GDR-KI-PRINCIPAL-014; territory = archipelago by SDR-KI-PRINCIPAL-005, amended.)
- `agreed`: agreed with the owner, awaiting enactment.
- `proposed`: open for discussion (for example the Workshop, Ruins, Fog and Storm).

The fourth label, **Open**, belongs to open questions rather than symbols; they sit in `notes` and in [docs/decisions/OPEN.md](../../docs/decisions/OPEN.md). How each symbol is drawn is in [docs/spec/meaning.md](../../docs/spec/meaning.md).

Meanings mirror `ki-principal`'s wording (GDR-KI-DESIGN-020): where its Symbol Library, Structure chapter or Agents chapter gives a meaning, the entry starts from it.

`retiredSymbols` lists ids withdrawn from the library, with the reason, so they are never reused: `citadel` (the Capital is the only name for the civic heart), `tower` (dropped; the Observatory is the local app's mark), `harbour` (now the Port), `guardian` (not adopted; boundary-keeping is the Steward at the Council Hall) and `whale-song` (creatures are ruled out of the lore). The `citadel`, `tower` and `role-guardian` glyphs stay in `@knowledgeislands/icons` but no symbol maps to them; the Capital has its own civic glyph, `capital`.

`symbolAliases` maps old ids that still resolve to the symbol that replaced them: `bridge` is `causeway` (GDR-KI-DESIGN-018). The `bridge` glyph stays in the icon package, mapped to no symbol; the Act command is never drawn with it (GDR-KI-PRINCIPAL-013). `resolveSymbol(id)` follows an alias.

## API

```ts
import { byCategory, byId, symbols } from '@knowledgeislands/symbols'

byId.get('port')?.meaning
byCategory['port-mode'].map((s) => s.name) // ['Dock', 'Rail depot', 'Airport', 'Customs house']
```

- `symbols`: the library, in order, typed `as const` (so `SymbolId` is a union of ids).
- `retiredSymbols`: retired ids and why they were retired.
- `symbolAliases` and `resolveSymbol(id)`: old ids that resolve to their replacement.
- `byId`: `ReadonlyMap<string, KiSymbol>`.
- `byCategory`: every category, each a list in library order.
- Types: `KiSymbol` (also exported as `Symbol`), `SymbolStatus`, `SymbolCategory`; lists `symbolStatuses`, `symbolCategories`.

Each entry is `{ id, name, meaning, status, category, icon?, site?, app?, notes? }`. `icon` is typed as `IconName` from `@knowledgeislands/icons`, and a test checks every one exists.
