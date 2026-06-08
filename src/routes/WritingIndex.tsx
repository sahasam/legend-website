import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllPosts } from '../content/loadPosts';

export function WritingIndex() {
  const posts = getAllPosts();
  return (
    <section className="mx-auto max-w-2xl px-6 pt-32 pb-24">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="font-display text-5xl italic text-glow-soft md:text-6xl"
        style={{ fontWeight: 350, fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
      >
        writing
      </motion.h1>
      <p className="mt-4 font-sans text-sm text-glow-soft/60">
        notes, essays, and things that didn't fit anywhere else.
      </p>
      <ul className="mt-16 space-y-10">
        {posts.length === 0 && (
          <li className="font-serif text-glow-soft/50">
            no posts yet — drift back later.
          </li>
        )}
        {posts.map((p) => (
          <li key={p.frontmatter.slug} className="group">
            <Link to={`/writing/${p.frontmatter.slug}`} className="block">
              <div className="flex items-baseline justify-between gap-6">
                <h2
                  className="font-display text-2xl italic text-glow-soft group-hover:text-glow md:text-3xl"
                  style={{
                    fontWeight: 400,
                    fontVariationSettings: '"opsz" 72, "SOFT" 100',
                  }}
                >
                  {p.frontmatter.title}
                </h2>
                <time className="shrink-0 font-sans text-xs tracking-widest text-glow-soft/40">
                  {p.frontmatter.date}
                </time>
              </div>
              {p.frontmatter.excerpt && (
                <p className="mt-3 font-serif text-glow-soft/70">
                  {p.frontmatter.excerpt}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
