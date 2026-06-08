import { motion } from 'framer-motion';
import { getAllProjects } from '../content/loadProjects';

export function Projects() {
  const projects = getAllProjects();

  return (
    <section className="mx-auto max-w-2xl px-6 pt-32 pb-24">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="font-display text-5xl italic text-glow-soft md:text-6xl"
        style={{ fontWeight: 350, fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
      >
        projects
      </motion.h1>
      <p className="mt-4 font-sans text-sm text-glow-soft/60">
        a slow-growing list of things I've built.
      </p>

      <ul className="mt-16 space-y-12">
        {projects.map(({ frontmatter: p }) => {
          const inner = (
            <div className="group">
              <div className="flex items-baseline justify-between gap-6">
                <h2
                  className="font-display text-2xl italic text-glow-soft group-hover:text-glow md:text-3xl"
                  style={{
                    fontWeight: 400,
                    fontVariationSettings: '"opsz" 72, "SOFT" 100',
                  }}
                >
                  {p.title}
                </h2>
                <time className="shrink-0 font-sans text-xs tracking-widest text-glow-soft/40">
                  {p.year}
                </time>
              </div>
              <p className="mt-3 font-serif text-glow-soft/75">{p.summary}</p>
              {p.tags && p.tags.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2 font-sans text-[10px] uppercase tracking-widest text-glow-soft/50">
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
            </div>
          );
          return (
            <li key={p.slug}>
              {p.href ? (
                <a href={p.href} target="_blank" rel="noreferrer" className="block">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-20 font-sans text-xs italic text-glow-soft/40">
        more surfacing slowly — the dark is full of half-finished things.
      </p>
    </section>
  );
}
