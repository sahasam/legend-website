# Projects as Crafted, Multi-Post Showcases

**Date:** 2026-06-22
**Status:** Approved design, pending spec review

## Problem

The site's projects are currently flat, frontmatter-only cards (`content/projects/*.md`)
with no detail page — they either link out via `href` or aren't clickable. That doesn't
"show the work off." Projects should feel **grander than a blog post**: each project gets
its own route, a grand landing page, and up to **3 bespoke, individually crafted post
pages** that use the web medium (motion, interactivity, eventually 3D) to present the work.

First project: **Open Atomic Ethernet (OAE)**. First post: the Flash Memory Summit (FMS)
"firing squad" demo writeup (content extracted from `FMS Writeup.pages`, plus the demo photo).

## Goals

- Projects get real, routed detail pages — grand, on-brand (deep-sea, prose-first,
  restrained 3D per the site vision).
- Each project holds **≤3 posts**; each post is a **bespoke TSX page**, not a uniform
  markdown render.
- Ship the OAE project + the FMS post (prose + demo photo) now, with a tasteful animated
  placeholder where the interactive demo will go later.
- General `content/writing` stays separate and untouched.

## Non-Goals (this pass)

- The full interactive `FiringSquadDemo` (fault injection / self-heal / converge-to-FIRE).
  Scoped as a **follow-up**; this pass ships an animated placeholder in its slot.
- Migrating `content/writing` posts into the project system.
- Posts 2 and 3 of OAE (structure supports them; none authored yet).
- A CMS / markdown authoring path for project posts — posts are code.

## Approach

**Code-driven registry** replaces the markdown `loadProjects` pipeline. A project post is a
React component, so a TS registry (not markdown frontmatter) is the natural source of truth
for metadata, ordering, and lazy component references.

### File layout

```
src/projects/
  registry.ts                      # source of truth: projects + their posts
  ProjectIndex.tsx                 # /projects — one grand-ish card per project
  ProjectDetail.tsx                # shared grand project landing shell
  ProjectPost.tsx                  # /projects/:p/:post route resolver -> bespoke Component
  components/
    Prose.tsx                      # shared post body typography (matches site voice)
    PostChrome.tsx                 # shared post header: back-nav, title, date
    PostCard.tsx                   # featured post card used on the project landing
  open-atomic-ethernet/
    overview.tsx                   # OAE's custom grand hero/intro block
    FmsFiringSquad.tsx             # bespoke post page #1 (prose + photo + viz slot)
    FiringSquadDemo.tsx            # animated placeholder now; interactive viz later
    assets/
      demo-photo.jpg               # IMG_5855 from the Pages doc, converted from HEIC
```

### Registry types

```ts
type PostMeta = {
  slug: string;
  title: string;
  date: string;            // ISO yyyy-mm-dd
  excerpt: string;
  hero?: string;           // imported asset URL
  Component: React.LazyExoticComponent<React.ComponentType>;
};

type ProjectMeta = {
  slug: string;
  title: string;
  year: string;
  tagline: string;         // short line under the title on the grand page
  summary: string;         // 1–2 sentences, used on the index card
  tags?: string[];
  Overview: React.LazyExoticComponent<React.ComponentType>; // project-specific hero/intro
  posts: PostMeta[];       // length ≤ 3 (enforced by a dev-time assertion)
};
```

Helpers: `getAllProjects()`, `getProject(slug)`, `getPost(projectSlug, postSlug)`.
A dev-only check warns if any project has `posts.length > 3`.

### Routes (added to `src/main.tsx`)

| Path | Element | Renders |
|------|---------|---------|
| `/projects` | `ProjectIndex` | cards from `getAllProjects()` |
| `/projects/:projectSlug` | `ProjectDetail` | project's `Overview` + `PostCard` list |
| `/projects/:projectSlug/:postSlug` | `ProjectPost` | the post's bespoke `Component` |

`ProjectDetail` and `ProjectPost` show an on-brand "drifted out of reach" fallback for
unknown slugs (matching the existing `Post.tsx` not-found pattern). The existing
`src/routes/Projects.tsx` is replaced by `ProjectIndex`; the old `/projects` route is repointed.

### Components & responsibilities

- **`ProjectIndex`** — keeps the current projects-index look/feel (variable-font heading,
  card per project) but data comes from the registry and each card links to
  `/projects/:slug`. Externally-hrefed projects are no longer the model; cards route inward.
- **`ProjectDetail`** (shared "grand" shell) — full-width hero region rendering the project's
  custom `Overview`, then a prose project summary, then the featured posts as `PostCard`s.
  Bigger type and more vertical drama than a writing post, reusing `text-glow` / `abyss` /
  variable-font tokens so it stays on-brand.
- **`ProjectPost`** — thin resolver: looks up `getPost(projectSlug, postSlug)`, renders its
  bespoke `Component` (or the not-found fallback). Each bespoke component owns its own layout
  but is encouraged to use `PostChrome` + `Prose` for consistency.
- **`Prose`** — wraps post body text in the site's reading typography (port the relevant
  styling from `renderBody`/`Post.tsx` so crafted pages read consistently with `/writing`).
- **`PostChrome`** — shared back-link (← to the parent project), title, date.
- **`FmsFiringSquad`** — the bespoke OAE post: `PostChrome`, the demo photo, the 6-paragraph
  writeup in `<Prose>`, and `<FiringSquadDemo/>` placed mid-article.
- **`FiringSquadDemo`** — **this pass:** a restrained, looping animated placeholder (e.g.
  a node chain with a soft pulse) clearly standing in for the future interactive demo;
  honors `prefers-reduced-motion`. **Follow-up:** swap in the real interactive viz.

### Content

- FMS writeup prose (already extracted) lives inline in `FmsFiringSquad.tsx`, wrapped in
  `<Prose>`. Suggested post title: **"A Firing Squad at Flash Memory Summit"**
  (slug `fms-firing-squad`), date `2025-10-27`.
- Demo photo: convert `Data/IMG_5855-24.HEIC` → `assets/demo-photo.jpg`, used as the post hero.
- OAE project metadata: title "Open Atomic Ethernet", year `2025`, tagline + summary drawn
  from the writeup (clock-free, fabric-level deterministic commits).

### Migration / cleanup

- Delete `content/projects/placeholder.md` and retire `src/content/loadProjects.ts`
  (and its `ProjectFrontmatter`/`Project` types) — superseded by the registry.
- Remove `src/routes/Projects.tsx` once `ProjectIndex` replaces it.
- The root `FMS Writeup.pages` source file: leave in place (untracked) — not committed.

## Data flow

1. Build time: Vite imports `registry.ts`; each post `Component` is a `lazy()` import so
   post bundles split per page. Photo imported as an asset URL.
2. `/projects` → `getAllProjects()` → cards.
3. `/projects/:p` → `getProject(p)` → render `Overview` + post cards.
4. `/projects/:p/:post` → `getPost(p, post)` → render bespoke `Component`.

## Error handling

- Unknown project or post slug → on-brand not-found section with a link back to `/projects`
  (or to the parent project), mirroring `Post.tsx`.
- `>3 posts` in a project → dev-time `console.warn` (soft guard, not a hard failure).

## Testing / verification

- `npm run build` (tsc + vite) passes.
- Headless screenshot verification of `/projects`, `/projects/open-atomic-ethernet`, and
  `/projects/open-atomic-ethernet/fms-firing-squad` per the site's WebGL screenshot recipe
  (deep-sea backdrop + restrained motion present, no layout breakage). Use the `ship-check`
  skill before merge.
- Manual: reduced-motion check on the `FiringSquadDemo` placeholder.

## Open follow-ups (tracked, not this pass)

- Build the real interactive `FiringSquadDemo` (fault injection, self-heal, converge-to-FIRE).
- Author OAE posts 2–3.
