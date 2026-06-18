import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllPosts } from '../content/loadPosts';

// "2026-06-16" -> "Jun 16, 2026" (parsed by parts to dodge timezone shifts).
function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

export function WritingIndex() {
  const posts = getAllPosts();
  return (
    <section className="mx-auto max-w-2xl px-6 pt-32 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-glow/50">
          field notes from the deep
        </p>
        <h1
          className="mt-3 font-sans text-5xl text-glow-soft md:text-6xl"
          style={{ fontWeight: 350, fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
        >
          writing
        </h1>
        <p className="mt-4 max-w-md font-serif text-glow-soft/60">
          notes, essays, and things that didn't fit anywhere else.
        </p>
      </motion.div>

      <motion.ul
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-14 space-y-4"
      >
        {posts.length === 0 && (
          <li className="rounded-lg border border-glow/10 bg-abyss-300/30 p-6 font-serif text-glow-soft/50">
            no posts yet — drift back later.
          </li>
        )}
        {posts.map((p) => (
          <li key={p.frontmatter.slug}>
            <Link
              to={`/writing/${p.frontmatter.slug}`}
              className="group block rounded-lg border border-glow/15 bg-abyss-300/40 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-glow/35 hover:bg-abyss-200/60 hover:shadow-[0_0_24px_-8px_rgba(125,249,255,0.35)]"
            >
              <div className="flex items-center justify-between gap-4">
                <time className="font-sans text-xs uppercase tracking-widest text-glow-soft/40">
                  {formatDate(p.frontmatter.date)}
                </time>
                <span
                  aria-hidden
                  className="font-sans text-lg text-glow/0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-glow/70"
                >
                  →
                </span>
              </div>
              <h2
                className="mt-2 font-sans text-2xl text-glow-soft transition-colors group-hover:text-glow"
                style={{
                  fontWeight: 400,
                  fontVariationSettings: '"opsz" 72, "SOFT" 100',
                }}
              >
                {p.frontmatter.title}
              </h2>
              {p.frontmatter.excerpt && (
                <p className="mt-2 font-serif text-glow-soft/65">
                  {p.frontmatter.excerpt}
                </p>
              )}
            </Link>
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
