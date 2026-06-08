# Sahas Munamala — personal site

A personal portfolio and writing site with a surreal, deep-sea visual mood —
drifting parallax layers, soft bioluminescent glow, and a slow current. The
atmosphere is deliberately restrained so it supports the writing rather than
burying it.

## Stack

- **Vite 6** + **React 18** + **TypeScript**
- **react-three-fiber** / **drei** / **postprocessing** — the landing scene and
  per-post hero accents
- **react-router-dom** — client-side routing
- **react-markdown** + **remark-gfm** + **lowlight/highlight.js** — the writing
  pipeline
- **Tailwind CSS** — styling
- **framer-motion** — page transitions
- **zustand** — scene/UI state

Deployed as a fully static build to **Cloudflare Workers** (static assets).

## Project structure

```
content/
  writing/        Markdown posts (one file per post)
  projects/       Markdown project cards (frontmatter-driven)
public/
  scene/          parallax layer images (background/midground/foreground)
  resume.pdf      served at /resume
src/
  routes/         page components (Landing, WritingIndex, Post, About, Projects, Resume)
  scene/          3D landing scene, parallax, particles, creatures, per-post heroes
  content/        Markdown loading, frontmatter parsing, and rendering
  components/      Nav, PostHero, ErrorBoundary
  hooks/          useMouseParallax, useReducedMotion
  state/          zustand store
  styles/         Tailwind entry
wrangler.jsonc    Cloudflare Workers static-assets deploy config
```

Routes: `/` (landing), `/writing`, `/writing/:slug`, `/about`, `/projects`,
`/resume`. Pages are lazy-loaded.

## Writing a post

Drop a Markdown file into `content/writing/` — one file per post, the filename
doesn't matter (the `slug` in frontmatter is what's used for the URL). There's
no build step to run or index to register: `src/content/loadPosts.ts` picks up
every `content/writing/*.md` at build time via Vite's `import.meta.glob`, parses
the frontmatter, sorts by `date` descending, and exposes them to the routes.

### Post frontmatter

```yaml
---
title: hello, from underwater        # required — shown as the post heading
date: 2026-06-05                      # required — YYYY-MM-DD, drives sort order
slug: hello-world                     # required — the URL is /writing/<slug>
hero: jellyfish                       # optional — a 3D hero accent (see below)
excerpt: a first signal from the abyss.  # optional — teaser on the writing index
---

Body goes here. Standard Markdown + GitHub-flavored Markdown (tables,
strikethrough, task lists). Fenced code blocks are syntax-highlighted.
```

Field notes:

- **title** — falls back to the slug if omitted, but always set it.
- **date** — used only for sorting and the displayed timestamp; a `Date` value
  or a `YYYY-MM-DD` string both work.
- **slug** — must be unique; this is the URL path and how `getPostBySlug` finds
  the post. If omitted it falls back to the filename.
- **hero** — optional. Names a 3D accent rendered above the post (see next
  section). Unknown or omitted values just render nothing — no error.
- **excerpt** — optional teaser text on the `/writing` index.

### Hero accents

`hero` maps to a lazy-loaded 3D component registered in
`src/scene/heroes/index.ts`. Today only `jellyfish` exists:

```ts
export const heroes: Record<string, ComponentType> = {
  jellyfish: lazy(() => import('./jellyfish')),
};
```

To add a new one, create the component under `src/scene/heroes/` and add a line
to that registry; then reference its key as `hero:` in any post. An unrecognized
key is ignored gracefully (`PostHero` renders nothing), so it's safe to leave
`hero` off entirely.

### Project cards

Project cards live in `content/projects/*.md` and are loaded the same way by
`src/content/loadProjects.ts`. Frontmatter:

```yaml
---
title: my project          # required
year: 2026                 # required
slug: my-project           # required — unique id
summary: one-line blurb.   # required — shown on the card
href: https://...          # optional — external link
tags:                      # optional
  - wip
---
```

Only the frontmatter renders on the projects index — the Markdown body is
currently unused.

### Rendering pipeline

The Markdown renderer is isolated in `src/content/renderBody.tsx`
(react-markdown + remark-gfm + a lowlight/highlight.js rehype plugin for code).
It's factored out deliberately so it can be swapped for MDX later by changing
only that one file — nothing in the loaders or routes needs to change.

## Deployment (Cloudflare Workers static assets)

The site is a fully static bundle served by **Cloudflare Workers** using the
static-assets feature. There is **no Worker script** — it's a script-less,
assets-only deploy, so nothing runs server-side. Everything (including the 3D
scene) runs client-side in the browser.

> **Note:** the deploy uses Workers, *not* Cloudflare Pages. They're different
> products with different config — Pages conventions like a `public/_redirects`
> file do **not** apply here. SPA routing is configured in `wrangler.jsonc`
> instead (see below).

### Configuration — `wrangler.jsonc`

```jsonc
{
  "name": "legend-website",
  "compatibility_date": "2026-06-08",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}
```

- **`assets.directory: "./dist"`** — the built output. For a script-less static
  site this *is* the deploy entry point. (Without it, `wrangler deploy` errors
  with `Missing entry-point to Worker script or to assets directory`.)
- **`not_found_handling: "single-page-application"`** — serves `index.html` for
  any path that isn't a real asset, so client-side routes like
  `/writing/:slug` resolve on direct visits and hard refreshes instead of
  404ing. This is the Workers-native equivalent of a Pages SPA redirect.

### Build

`npm run build` runs `tsc -b` (type-check) then `vite build`, emitting static
HTML/JS/CSS/asset files into `dist/`. Markdown in `content/` is bundled into the
JS at build time (via `import.meta.glob`), so there are no `.md` files served at
runtime.

### How deploys happen

Cloudflare **Workers Builds** is connected to the GitHub repo
(`sahasam/legend-website`). Every push to the production branch builds and
deploys; pull requests get a build check. To ship a change to writing or
projects, commit the new Markdown and push — the build picks it up
automatically.

### Cost

Static-asset requests are free and unlimited on the Workers free plan and don't
count against Worker invocation limits (no Worker script runs for this site).
The free plan throttles rather than auto-billing if limits are ever exceeded, so
there's no charge unless you explicitly upgrade to a paid plan.

### Constraints to keep in mind

Stay static. Don't introduce features that need a long-running server. If
something genuinely needs server logic later, it can be added as a Worker script
alongside the assets in the same `wrangler.jsonc` — but default to client-only.
