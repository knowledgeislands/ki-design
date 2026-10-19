# Draft: Reach across the tailnet, read-only

**Status: overtaken, 19 October 2026.** The tailnet listener, `tailscale serve` and the ACLs are connection-critical and belong to the host network Project. The Observatory plans only the app's read-only side, in its own record KI-OBSERVA-OPS-004 (Tailnet read-only appearance). The draft is kept below as written.

**Value.** Kit can open the Observatory from any of his machines.

**Builds on.** The loopback service (OBS-BOUND-001), its Host and Origin checks (OBS-BOUND-012, -013), `tailscale serve`.

**Shape.** A second, opt-in listener (`--tailnet`) on another loopback port or a Unix socket that `tailscale serve` targets. It serves the page and read routes only; the acting routes are absent (404). Its Host rule accepts only the tailnet FQDN; `Tailscale-User-Login` must equal the operator; a Tailscale ACL limits it to Kit's devices; Funnel never. Receipts and the status line record the way in.

**Boundary.** The primary listener is unchanged. Bridge over the tailnet is a later, separate decision record. Baseline to note: `ssh -L` already gives full authority, so the designed path must be least-privilege.

**Done when.** From a second machine on the tailnet the Beacon loads; every acting route answers 404 there; the local listener's tests are unchanged.
