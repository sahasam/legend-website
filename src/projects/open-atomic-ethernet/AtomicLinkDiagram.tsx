import { motion, useReducedMotion } from 'framer-motion';

// Visual for the central OAE idea: a conventional link runs two independent state
// machines that can drift apart when a packet is lost; an atomic link runs ONE
// state machine that spans the link, carried inside the packets themselves — so
// the two ends can never hold contradictory views. Here a single "state" token
// shuttles between the nodes and both ends pulse in unison as it lands, evoking
// the shared, entangled state. Reduced-motion: token rests at center, both lit.

const CYCLE = 3.2; // seconds for a full A -> B -> A round trip

function Node({ label, glowDelay }: { label: string; glowDelay: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.span
        className="grid h-12 w-12 place-items-center rounded-full border border-glow/40 bg-abyss-300/60 font-sans text-glow-soft"
        animate={
          reduce
            ? { boxShadow: '0 0 10px 1px rgba(125,249,255,0.4)' }
            : {
                boxShadow: [
                  '0 0 6px 0px rgba(125,249,255,0.25)',
                  '0 0 18px 4px rgba(125,249,255,0.65)',
                  '0 0 6px 0px rgba(125,249,255,0.25)',
                ],
              }
        }
        transition={
          reduce
            ? undefined
            : { duration: CYCLE, repeat: Infinity, times: [0, 0.12, 0.4], delay: glowDelay }
        }
      >
        {label}
      </motion.span>
    </div>
  );
}

export function AtomicLinkDiagram() {
  const reduce = useReducedMotion();

  return (
    <figure className="my-10">
      <div className="relative overflow-hidden rounded-lg border border-glow/15 bg-abyss-400/50 px-8 py-12">
        <div className="relative flex items-center justify-between">
          <Node label="A" glowDelay={CYCLE / 2} />

          {/* the link, with the shared state token shuttling across it */}
          <div className="relative mx-4 h-px flex-1 bg-glow/20">
            <motion.div
              className="absolute top-1/2 grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bloom/30 font-sans text-[10px] uppercase tracking-wider text-bloom-soft"
              style={{ boxShadow: '0 0 12px 2px rgba(217,126,230,0.6)' }}
              animate={reduce ? { left: '50%' } : { left: ['0%', '100%', '0%'] }}
              transition={
                reduce
                  ? undefined
                  : { duration: CYCLE, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              S
            </motion.div>
          </div>

          <Node label="B" glowDelay={0} />
        </div>

        <p className="mt-8 text-center font-sans text-xs uppercase tracking-widest text-glow-soft/45">
          one state machine, spanning the link
        </p>
        <p className="mt-1 text-center font-serif text-sm text-glow-soft/55">
          the shared state <span className="text-bloom-soft">S</span> lives in the packets,
          not in either endpoint — so the two ends can never disagree.
        </p>
      </div>
    </figure>
  );
}
