# Deploy & hosting

How this site ships. Read this before touching `wrangler.jsonc`, DNS, or anything
domain-related — there's a specific failure mode here that has broken production
before.

## Model

- Fully static **SPA** served by **Cloudflare Workers static-assets**. There is no
  Worker script and no backend — `wrangler.jsonc` just points at the built assets.
- `wrangler.jsonc`:
  - `assets.directory: "./dist"` — the Vite build output.
  - `not_found_handling: "single-page-application"` — serves `index.html` for any
    unmatched path, so client routes (`/writing/:slug`, deep links, hard refresh)
    resolve at the edge.
- All routing is client-side via `createBrowserRouter` (see `src/main.tsx`).

## Deploy = merge to `main`

- **Cloudflare Workers Builds** is connected to the GitHub repo. Every push/merge
  to `main` auto-builds and deploys to production. PRs get preview builds.
- **Do not** instruct anyone to run a manual `wrangler deploy` as the normal path —
  the Git merge *is* the deploy. (Manual deploy is only for debugging the build.)

## Custom domains — dashboard only (critical)

`sahas.lol` (apex) and `www.sahas.lol` are attached as **Custom Domains in the
Cloudflare dashboard**: *Workers → legend-website → Domains & Routes*. They are
deliberately **not** in `wrangler.jsonc`.

- **Never declare domains as `routes` with `custom_domain: true` in `wrangler.jsonc`.**
  That makes the CI `wrangler deploy` try to *register* the domains; the domains/
  records API call fails (DNS/permissions) and **breaks the entire deploy** for
  every push — not just the domain change.
- This was tried (PR #11), broke all deploys, and was reverted (PR #12). The
  comment block in `wrangler.jsonc` says the same — keep it.

## 522 / "site down" triage

A `522` on this site almost always means **the hostname isn't attached to the
worker** (the edge has no origin), *not* a code or DNS bug.

- Check **Workers → legend-website → Domains & Routes** first — is the host listed
  as a Custom Domain? If not, add it there.
- `dig +short <host>` returning Cloudflare anycast IPs (`104.21.x` / `172.67.x`)
  means DNS is fine — the gap is the attachment, not the record.
- A stale proxied `www` DNS record with no Custom Domain attachment = 522 (this was
  the 2026-06-25 incident). Fix: delete the stale DNS record, then *Add Custom
  Domain*.
- Static-assets-only workers have **no "Variables"/env panel** — domains live under
  Domains & Routes.
- `cloudflared` is the Tunnel daemon and is irrelevant here; use `npx wrangler`.

**Rule:** check how the infra is already wired (dashboard) before "improving" it in
config. The full incident write-up lives in the knowledge vault; this file is the
operational distillation.
