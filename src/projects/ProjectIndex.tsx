import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllProjects, isExternalProject, type ProjectMeta } from './registry';

// Bare domain for an external card's footer cue, e.g. "github.com".
function hostOf(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return 'external';
  }
}

// /projects — one card per project. Internal projects route inward to their grand
// landing; external ones link straight out to a repo or off-site writeup. Same card
// shell either way, distinguished only by the footer cue and link behavior.
export function ProjectIndex() {
  const projects = getAllProjects();

  return (
    <section className="mx-auto max-w-2xl px-6 pt-32 pb-24">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="font-sans text-5xl text-glow-soft md:text-6xl"
        style={{ fontWeight: 350, fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
      >
        projects
      </motion.h1>
      <p className="mt-4 font-sans text-sm text-glow-soft/60">
        a slow-growing list of things I've built.
      </p>

      <ul className="mt-16 space-y-12">
        {projects.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>

      <p className="mt-20 font-sans text-xs italic text-glow-soft/40">
        more surfacing slowly — the dark is full of half-finished things.
      </p>
    </section>
  );
}

function ProjectCard({ project: p }: { project: ProjectMeta }) {
  const external = isExternalProject(p);
  const footer = external ? (
    <span className="shrink-0 font-sans text-xs uppercase tracking-widest text-glow-soft/40 transition-colors group-hover:text-glow/70">
      {hostOf(p.href)} ↗
    </span>
  ) : (
    <span className="shrink-0 font-sans text-xs uppercase tracking-widest text-glow-soft/40 transition-colors group-hover:text-glow/70">
      {p.posts.length} {p.posts.length === 1 ? 'writeup' : 'writeups'} →
    </span>
  );

  const inner: ReactNode = (
    <>
      <div className="flex items-baseline justify-between gap-6">
        <h2
          className="font-sans text-2xl text-glow-soft group-hover:text-glow md:text-3xl"
          style={{ fontWeight: 400, fontVariationSettings: '"opsz" 72, "SOFT" 100' }}
        >
          {p.title}
        </h2>
        <time className="shrink-0 font-sans text-xs tracking-widest text-glow-soft/40">
          {p.year}
        </time>
      </div>
      <p className="mt-3 font-serif text-glow-soft/75">{p.summary}</p>
      <div className="mt-4 flex items-center justify-between gap-6">
        {p.tags && p.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 font-sans text-[10px] uppercase tracking-widest text-glow-soft/50">
            {p.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-glow-soft/15 px-2.5 py-1"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        {footer}
      </div>
    </>
  );

  return external ? (
    <a href={p.href} target="_blank" rel="noreferrer" className="group block">
      {inner}
    </a>
  ) : (
    <Link to={`/projects/${p.slug}`} className="group block">
      {inner}
    </Link>
  );
}
