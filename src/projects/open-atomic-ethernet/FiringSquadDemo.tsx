import { motion, useReducedMotion } from 'framer-motion';

// PLACEHOLDER for the future interactive Firing Squad demo.
//
// This pass ships a restrained, looping animation that evokes the idea: a chain
// of nodes passing a readiness pulse down the line, then flashing FIRE in unison.
// The real version (fault injection, self-heal, converge-to-FIRE on interaction)
// is a tracked follow-up — see docs/superpowers/specs.
//
// Reduced-motion: the pulse/flash loops are suppressed and the chain renders in a
// calm, fully-lit resting state.

const NODE_COUNT = 7;
// One full cycle: pulse travels the chain, then everyone fires together.
const HANDSHAKE_STEP = 0.22; // seconds between adjacent handshakes
const CYCLE = NODE_COUNT * HANDSHAKE_STEP + 1.6;

export function FiringSquadDemo() {
  const reduce = useReducedMotion();
  const nodes = Array.from({ length: NODE_COUNT });
  // When everyone fires, relative to the start of a cycle.
  const fireAt = NODE_COUNT * HANDSHAKE_STEP + 0.1;

  return (
    <figure className="my-10">
      <div className="relative overflow-hidden rounded-lg border border-glow/15 bg-abyss-400/50 px-6 py-12">
        {/* faint connecting line behind the nodes */}
        <div className="absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 bg-glow/15" />

        <div className="relative flex items-center justify-between">
          {nodes.map((_, i) => {
            const handshake = i * HANDSHAKE_STEP;
            return (
              <motion.span
                key={i}
                className="relative z-10 h-3 w-3 rounded-full bg-glow-soft"
                style={{ boxShadow: '0 0 0 0 rgba(125,249,255,0)' }}
                animate={
                  reduce
                    ? { opacity: 0.9 }
                    : {
                        scale: [1, 1, 1.9, 2.6, 1],
                        boxShadow: [
                          '0 0 4px 1px rgba(125,249,255,0.3)',
                          '0 0 4px 1px rgba(125,249,255,0.3)',
                          '0 0 12px 3px rgba(125,249,255,0.7)',
                          '0 0 22px 7px rgba(217,126,230,0.9)',
                          '0 0 4px 1px rgba(125,249,255,0.3)',
                        ],
                      }
                }
                transition={
                  reduce
                    ? undefined
                    : {
                        duration: CYCLE,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        // Each node's keyframes are timed so its "handshake" beat
                        // lands in sequence, but the bright FIRE beat (2.6) lands
                        // at the same instant for every node.
                        times: [
                          0,
                          handshake / CYCLE,
                          (handshake + 0.12) / CYCLE,
                          fireAt / CYCLE,
                          1,
                        ],
                      }
                }
              />
            );
          })}
        </div>
      </div>
      <figcaption className="mt-3 text-center font-sans text-xs uppercase tracking-widest text-glow-soft/40">
        Readiness propagates, then the chain fires as one
        <span className="ml-2 normal-case tracking-normal text-glow-soft/30">
          (interactive demo coming soon)
        </span>
      </figcaption>
    </figure>
  );
}
