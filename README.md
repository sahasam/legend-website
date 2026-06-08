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

Deployed as a fully static build to **Cloudflare Pages**.

## Getting started

```bash
npm install
npm run dev      # start the Vite dev server
```

Other scripts:

```bash
npm run build    # type-check (tsc -b) then build to dist/
npm run preview  # preview the production build locally
npm run lint     # type-check only (tsc -b --noEmit)
```

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
```

Routes: `/` (landing), `/writing`, `/writing/:slug`, `/about`, `/projects`,
`/resume`. Pages are lazy-loaded.

## Writing a post

Add a Markdown file to `content/writing/`. Posts are loaded and sorted by date
at build time via `import.meta.glob`. Frontmatter:

```yaml
---
title: hello, from underwater
date: 2026-06-05
slug: hello-world
hero: jellyfish      # optional — a per-post hero accent (see src/scene/heroes)
excerpt: a first signal blinking back from the abyss.   # optional
---
```

Project cards live in `content/projects/` with frontmatter `title`, `year`,
`slug`, `summary`, optional `href` and `tags`. Only the frontmatter renders on
the projects index.

The Markdown renderer is factored into `src/content/renderBody.tsx` so it can be
swapped for MDX later without touching the rest of the pipeline.

## Deployment

Cloudflare Pages, static output:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 20

The 3D scene runs entirely client-side, so the host imposes no SSR
constraints — keep the build static and avoid SSR-only patterns.
