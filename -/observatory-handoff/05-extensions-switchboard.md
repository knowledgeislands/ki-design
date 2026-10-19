# Draft: Extensions switchboard

**Status: overtaken, 19 October 2026.** The switchboard overlapped the live-artifact extension model (manifest keys, "Extended by", the directory and the tokens passed to the frame). The Observatory keeps both side by side: the work is now its inbound live-artifact adapter, KI-OBSERVA-INT-003, with KI-OBSERVA-INT-004, the outbound adapter, as the other half. The draft is kept below as written.

**Value.** Turn core instruments and island live artifacts on or off per scope.

**Builds on.** The artifacts host (OBS-ART); host preferences in XDG state (OBS-LOCAL-007).

**Shape.** Core extensions are toggleable native instruments (a registry); island extensions are artifacts under a KB's `Admin/Operations/Live Artifacts/`, drawn as a building on that KB's island.

**Boundary.** Artifacts stay read-only (writes are an OBS-ART gap). Tokens reach an artifact only if the bridge sets them on the frame root; both that and shared elements are OBS-ART-003 changes.

**Done when.** Toggling an extension hides or shows it everywhere for that scope and survives restarts.
