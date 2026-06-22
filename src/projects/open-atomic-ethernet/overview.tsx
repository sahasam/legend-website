import { motion } from 'framer-motion';

// OAE's project-specific "grand" intro, rendered at the top of its landing page.
// Bigger and more atmospheric than a writing-post header: an eyebrow, an oversized
// variable-font title, a tagline, and a short prose framing of what OAE is. Kept
// restrained and on-brand (deep-sea, prose-first) per the site vision.
export function Overview() {
  return (
    <header className="border-b border-glow/10 pb-14">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="font-sans text-xs uppercase tracking-[0.3em] text-glow/50"
      >
        clock-free coordination · 2025
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.05 }}
        className="mt-5 font-sans text-5xl text-glow-soft md:text-7xl"
        style={{ fontWeight: 330, lineHeight: 1.02, fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
      >
        Open Atomic
        <br />
        Ethernet
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.12 }}
        className="mt-6 max-w-xl font-display text-xl italic text-glow-soft/70 md:text-2xl"
      >
        A fabric that produces simultaneous action without a shared global clock.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.18 }}
        className="mt-8 max-w-2xl space-y-4 font-serif text-lg leading-relaxed text-glow-soft/80"
      >
        <p>
          OAE replaces timestamps with interaction. Nodes advance only on confirmed,
          two-way causal exchange — the echo path itself becomes a dynamical clock,
          derived from the network rather than imposed on it. The payoff is a
          deterministic, barrier-style commit: either everyone acts together, or no
          one does.
        </p>
        <p>
          What follows are field notes from building and demoing it — starting with a
          live <em>firing squad</em> at Flash Memory Summit.
        </p>
      </motion.div>
    </header>
  );
}
