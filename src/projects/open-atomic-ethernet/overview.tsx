import { motion } from 'framer-motion';
import { OaeLogo } from './OaeLogo';

// OAE's project-specific "grand" intro, rendered at the top of its landing page.
// The mark leads as the hero — a network sphere with one cell lit — paired with an
// oversized title and a short framing. OAE carries its own ember/amber accent (from
// the logo) as a sub-identity inside the site's deep-sea palette; everything else
// stays cool and quiet so the warm signal reads as the signature.
export function Overview() {
  return (
    <header className="border-b border-[#ff5a3c]/15 pb-16">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_minmax(280px,40%)]">
        {/* mark first on mobile for impact; moves right on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="order-first mx-auto w-3/5 max-w-[300px] md:order-last md:w-full md:max-w-none"
        >
          <OaeLogo priority />
        </motion.div>

        <div className="md:order-first">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-sans text-xs uppercase tracking-[0.3em] text-[#ffd23f]/75"
          >
            clock-free coordination · 2025
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="mt-5 font-sans text-5xl text-glow-soft md:text-6xl lg:text-7xl"
            style={{
              fontWeight: 330,
              lineHeight: 1.02,
              fontVariationSettings: '"opsz" 144, "SOFT" 100',
            }}
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
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.18 }}
        className="mt-10 max-w-2xl space-y-4 font-serif text-lg leading-relaxed text-glow-soft/80"
      >
        <p>
          OAE replaces timestamps with interaction. Nodes advance only on confirmed,
          two-way causal exchange — the echo path itself becomes a dynamical clock,
          derived from the network rather than imposed on it. The payoff is a
          deterministic, barrier-style commit: either everyone acts together, or no one
          does.
        </p>
        <p>
          What follows are field notes from building and demoing it — starting with what
          OAE actually is, then a live <em>firing squad</em> at Flash Memory Summit.
        </p>
      </motion.div>
    </header>
  );
}
