import { motion } from 'framer-motion';
import { OaeLogo } from './OaeLogo';

// Recruiter-facing, scannable content kept out of JSX so the markup stays flat
// and the copy is easy to edit. Bullets are trimmed to active phrases; tech areas
// render as chips (denser + more scannable than a comma-run paragraph).
const ROLE = [
  'Built and debugged emulator + demo components for link-behavior experiments.',
  'Co-developed the live firing-squad demo shown at Flash Memory Summit.',
  'Built link- and node-state visualization to make protocol behavior legible on stage.',
  "Wrote up OAE's reliability model, perfect-information feedback, and clock-free sync semantics.",
  'Turned early protocol ideas into demos, diagrams, and state-machine specs.',
];

const TECH = [
  'Distributed systems',
  'Link-layer reliability',
  'Network emulation',
  'Acknowledgment semantics',
  'Fault recovery',
  'Causal synchronization',
  'Thunderbolt testbeds',
  'Real-time visualization',
  'Python / async',
  'Hardware-adjacent infra',
];

// OAE's project-specific "grand" intro, rendered at the top of its landing page.
// The mark leads as the hero — a network sphere with one cell lit — paired with the
// title and a short framing, then compact recruiter context. OAE carries its own
// ember/amber accent (from the logo) as a sub-identity inside the site's deep-sea
// palette; everything else stays cool and quiet so the warm signal reads as the
// signature.
export function Overview() {
  return (
    <header className="border-b border-[#ff5a3c]/15 pb-10">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_minmax(180px,32%)]">
        {/* mark first on mobile for impact; moves right on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="order-first mx-auto w-1/2 max-w-[200px] md:order-last md:w-full md:max-w-[240px]"
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
            className="mt-4 font-sans text-4xl text-glow-soft md:text-5xl"
            style={{
              fontWeight: 330,
              lineHeight: 1.03,
              fontVariationSettings: '"opsz" 96, "SOFT" 100',
            }}
          >
            Open Atomic Ethernet
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="mt-4 max-w-xl font-display text-lg italic text-glow-soft/70 md:text-xl"
          >
            A fabric that produces coordinated action without a shared global clock.
          </motion.p>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.18 }}
        className="mt-8 max-w-2xl font-serif text-base leading-relaxed text-glow-soft/80"
      >
        OAE replaces time with interaction. A node's state is derived from the events it
        experiences, not by its distance to a grandmaster clock. The payoff is a provably
        deterministic, barrier-style commit: either everyone acts together, or no one does.
      </motion.p>

      {/* Recruiter context — summary + role side by side on desktop, stacked on
          mobile; keeps the gist above a hard scroll. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.24 }}
        className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2"
      >
        <section>
          <h2 className="font-sans text-xs uppercase tracking-[0.3em] text-[#ffd23f]/75">
            Project summary
          </h2>
          <div className="mt-3 space-y-3 font-serif text-base leading-relaxed text-glow-soft/80">
            <p>
              An{' '}
              <a
                href="https://www.opencompute.org/w/index.php?title=Open_Atomic_Ethernet"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-glow/40 underline-offset-2 transition-colors hover:decoration-glow"
              >
                Open Compute Project (OCP) effort
              </a>{' '}
              to keep Ethernet as simple as its original design while scaling to chiplet
              interconnects and AI accelerators.
              OAE treats each link as a slot-reconciliation protocol: paired registers at
              both endpoints reconcile so every round has a bounded-time, bilateral, and
              unambiguous outcome — both sides reach common knowledge of what happened.
            </p>
            <p>
              That makes delivery reversible — a message either commits or rolls back
              cleanly, with no dropped packets, no timeouts, and no ambiguity.
              Coordination comes from synchronizing interactions, not clocks. The
              reference demo ran on a small Thunderbolt-connected cluster: distributed
              firing-squad synchronization under fault injection, cable pulls, node
              reordering, and recovery.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-sans text-xs uppercase tracking-[0.3em] text-[#ffd23f]/75">
            My role
          </h2>
          <ul className="mt-3 space-y-2 font-serif text-base leading-relaxed text-glow-soft/80">
            {ROLE.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-[#ff5a3c]/70"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8"
      >
        <h2 className="font-sans text-xs uppercase tracking-[0.3em] text-[#ffd23f]/75">
          Technical areas
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {TECH.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[#ff5a3c]/20 bg-[#ff5a3c]/[0.06] px-3 py-1 font-sans text-xs text-glow-soft/70"
            >
              {tag}
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.36 }}
        className="mt-8 max-w-2xl font-serif text-base leading-relaxed text-glow-soft/70"
      >
        What follows are field notes from building and demoing it — starting with what OAE
        actually is, then a live <em>firing squad</em> at Flash Memory Summit.
      </motion.p>
    </header>
  );
}
