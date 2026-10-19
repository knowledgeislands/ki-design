---
areas: { ART: 2, ELE: 1, ICO: 1, MAP: 2, OBS: 15, SYM: 1, TIL: 2, TOK: 1 }
---

# Roadmap issue ledger

This ledger reserves fixed issuing-area namespaces. Allocate the next work item in its area as one greater than that area's high-water mark; never lower a value or reuse an issued number after a record is pruned. Reserve a number by committing this ledger's advance on its own before writing the record. Areas are not mutable themes or groups.

- `ART` reserves through `002`.
- `ELE` reserves through `001`.
- `ICO` reserves through `001`.
- `MAP` reserves through `002`.
- `OBS` reserves through `015`.
- `SYM` reserves through `001`.
- `TIL` reserves through `002`.
- `TOK` reserves through `001`.
