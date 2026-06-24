import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';
import oaeDemoPhoto from './open-atomic-ethernet/assets/demo-photo.jpg';
import oaeLogo from './open-atomic-ethernet/assets/oae-logo.png';

// Source of truth for projects and their posts. Unlike the writing index (markdown
// + frontmatter), project posts are bespoke React pages — so a typed registry is
// the natural home for metadata, ordering, and lazy component references. Each
// post Component is code-split so a project's post bundles load per page.

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  excerpt: string;
  hero?: string; // imported asset URL
  heroFit?: 'cover' | 'contain'; // 'contain' for logo-style art; default 'cover'
  heroBlend?: boolean; // screen-blend bright-on-black art onto the backdrop
  Component: LazyExoticComponent<ComponentType<PostPageProps>>;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  year: string;
  summary: string; // 1–2 sentences, used on the /projects index card
  tags?: string[];
  Overview: LazyExoticComponent<ComponentType>; // project-specific grand intro
  posts: PostMeta[]; // ≤ 3 — see MAX_POSTS guard below
};

// Props the route resolver passes into every bespoke post page, so a post reads
// its title/date/back-link from the registry rather than re-declaring them.
export type PostPageProps = {
  project: ProjectMeta;
  post: PostMeta;
};

const MAX_POSTS = 3;

const projects: ProjectMeta[] = [
  {
    slug: 'open-atomic-ethernet',
    title: 'Open Atomic Ethernet',
    year: '2025',
    summary:
      'A network fabric that produces simultaneous, all-or-nothing action without a shared global clock — coordination derived from interaction, not timestamps.',
    tags: ['interconnect', 'distributed systems', 'hardware'],
    Overview: lazy(() =>
      import('./open-atomic-ethernet/overview').then((m) => ({ default: m.Overview })),
    ),
    posts: [
      {
        slug: 'what-is-open-atomic-ethernet',
        title: 'What is Open Atomic Ethernet?',
        date: '2025-08-15',
        excerpt:
          "Most networks leave you guessing after a failure — did the message arrive or not? OAE removes the guess: every message either commits completely or leaves no trace.",
        hero: oaeLogo,
        heroFit: 'contain',
        heroBlend: true,
        Component: lazy(() =>
          import('./open-atomic-ethernet/WhatIsOae').then((m) => ({
            default: m.WhatIsOae,
          })),
        ),
      },
      {
        slug: 'fms-firing-squad',
        title: 'A Firing Squad at Flash Memory Summit',
        date: '2025-10-27',
        excerpt:
          'Live-demoing a distributed firing-squad synchronization on the OAE emulator — local handshakes converging on a simultaneous FIRE, with no global clock.',
        hero: oaeDemoPhoto,
        Component: lazy(() =>
          import('./open-atomic-ethernet/FmsFiringSquad').then((m) => ({
            default: m.FmsFiringSquad,
          })),
        ),
      },
    ],
  },
];

// Soft dev-time guard: a project is meant to hold at most three posts.
if (import.meta.env.DEV) {
  for (const p of projects) {
    if (p.posts.length > MAX_POSTS) {
      console.warn(
        `[projects] "${p.slug}" has ${p.posts.length} posts; max is ${MAX_POSTS}.`,
      );
    }
  }
}

// Newest first by year, so appending to the registry array doesn't surface an
// older project above a newer one on the index.
export function getAllProjects(): ProjectMeta[] {
  return [...projects].sort((a, b) => (a.year < b.year ? 1 : -1));
}

export function getProject(slug: string): ProjectMeta | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getPost(
  projectSlug: string,
  postSlug: string,
): { project: ProjectMeta; post: PostMeta } | undefined {
  const project = getProject(projectSlug);
  const post = project?.posts.find((p) => p.slug === postSlug);
  if (!project || !post) return undefined;
  return { project, post };
}
