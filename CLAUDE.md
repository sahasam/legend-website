# CLAUDE.md — personal-website

Agent onboarding contract. Read this before changing anything. It's the source of
truth for how to work in this repo; the README is for humans and may lag.

## What this is

Sahas's personal site — a surreal, deep-sea portfolio + writing site. Vite 6 +
React 18 + TypeScript (strict), react-three-fiber for the landing scene and
per-post 3D hero accents, react-markdown for writing, Tailwind. Fully static
build deployed to Cloudflare Workers static-assets. **No backend, no SSR.**

## Golden rules

- **Never push to `main`.** Branch, then open a PR. `main` auto-deploys to
  production on merge (see Deploy).
- **All gates must pass before you call work done:** `npm run lint && npm test && npm run build`.
- **Visual changes need eyes.** Strict TypeScript + tests catch logic, not looks.
  Screenshot affected routes (the `ship-check` skill does this) or rely on the
  Cloudflare PR preview deploy.
- **Match the surrounding code.** It's small and consistent — mirror its naming,
  comment density, and idioms.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server on `:5173` |
| `npm run lint` | `tsc -b --noEmit` — strict typecheck (incl. test files) |
| `npm test` | Vitest smoke tests (pure logic; no DOM/WebGL) |
| `npm run build` | `tsc -b && vite build` → `dist/` |

## Add a writing post

The contract is **folder-per-post**, not one loose file (README is stale on this).

1. Create `content/writing/<slug>/index.md`.
2. Frontmatter (parsed at build time by `src/content/loadPosts.ts` via
   `import.meta.glob` — no registration step):
   ```yaml
   ---
   title: hello, from underwater   # required, shown as heading
   date: 2026-06-05                # required, YYYY-MM-DD, drives sort (newest first)
   slug: hello-world              # required, URL = /writing/<slug>
   hero: jellyfish                # optional — 3D hero accent (src/scene/heroes registry)
   excerpt: one-line teaser       # optional — shown on the index
   ---
   ```
3. **Co-locate images** in the same folder; reference them relatively
   (`![alt](./photo.jpg)`). The loader rewrites relative paths to built URLs.
4. `hero:` can also be a co-located image filename instead of a 3D accent name.
5. Verify: `npm test` checks every post has valid required frontmatter, a unique
   slug, and a non-empty body.

## Add a project

Projects are **code-driven**, not markdown — the registry is `src/projects/registry.ts`.

- **Internal project** (in-site landing + up to **3** bespoke React post pages):
  add an entry with `Overview` (a `lazy()` component) and a `posts[]` array. Each
  post page is its own `.tsx` under `src/projects/<slug>/`, lazy-loaded.
- **External project** (links out to a repo/off-site writeup): add an entry with
  an `href` instead of `Overview`/`posts` — its card opens in a new tab. There's
  a commented template at the bottom of `registry.ts`.
- Max 3 posts per internal project (dev-time warning + enforced by `npm test`).
- Verify: `npm test` checks slug uniqueness, the ≤3 cap, ISO dates, and that the
  route resolver round-trips every entry.

## Where things live

```
content/writing/<slug>/index.md   posts + co-located images
src/projects/registry.ts          project + project-post source of truth
src/projects/<slug>/              bespoke project pages (Overview, post .tsx)
src/routes/                       page components (Landing, WritingIndex, Post, About, Resume)
src/scene/                        3D landing scene, parallax, particles, per-post heroes
src/content/                      markdown load / frontmatter parse / render pipeline
src/components/                   Nav, PostHero, ErrorBoundary
src/main.tsx                      router (route table lives here)
```

Routes: `/`, `/writing`, `/writing/:slug`, `/about`, `/projects`,
`/projects/:projectSlug`, `/projects/:projectSlug/:postSlug`, `/resume`.

## Landmines (learned the hard way)

- **Background gradient lives on `html` (fixed).** Do **not** add a `background-color`
  to `html`/`body` — it paints over the WebGL scene and the page goes flat.
- **Lock scroll per-route on full-frame 3D scenes.** Mobile browser toolbars
  resize the fixed WebGL canvas mid-scroll, causing layer jitter. The landing
  route locks scroll for this reason — keep it.
- **Custom domains are Cloudflare-dashboard-managed.** Do **not** add domain
  `routes` to `wrangler.jsonc` (that was tried and reverted).
- **Headless screenshots + delayed framer-motion animations:** elements with a
  framer entrance `delay` can screenshot as invisible under chrome-headless-shell.
  Account for this when verifying (wait, or screenshot a settled state).

## Deploy

Cloudflare **Workers Builds** auto-deploys on merge to `main` (and builds PRs for
preview). **Do not** instruct anyone to run a manual `wrangler deploy` — pushing
is the deploy. A `522` means the host isn't attached in the dashboard, not a code
bug.

## Verifying before merge

`ship-check` (project skill) is the heavy gate: deterministic checks (lint/test/
build) + agentic code review + headless screenshots of affected routes. Use it
before merging. CI / Cloudflare PR previews are the lightweight always-on signal.
