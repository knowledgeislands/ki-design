# Draft: Extensions switchboard

**Value.** Turn core instruments and island live artifacts on or off per scope.

**Builds on.** The artifacts host (OBS-ART); host preferences in XDG state (OBS-LOCAL-007).

**Shape.** Core extensions are toggleable native instruments (a registry); island extensions are artifacts under a KB's `Admin/Operations/Live Artifacts/`, drawn as a building on that KB's island.

**Boundary.** Artifacts stay read-only (writes are an OBS-ART gap). Tokens reach an artifact only if the bridge sets them on the frame root; both that and shared elements are OBS-ART-003 changes.

**Done when.** Toggling an extension hides or shows it everywhere for that scope and survives restarts.
