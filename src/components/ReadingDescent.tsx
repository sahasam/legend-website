import { motion, useScroll, useTransform } from 'framer-motion';

// Reading a post is a descent. This gauge tracks how far the reader has sunk
// through the page — a glowing node sliding down a slim track on the left margin,
// with a depth readout that deepens toward the abyss. Collapses to a thin top
// bar on narrow screens. Scroll-linked, so it's calm even with reduced motion.

// 1100m ≈ the edge of the midnight zone — an evocative "seafloor" for 100% read.
const SEAFLOOR_M = 1100;

export function ReadingDescent() {
  const { scrollYProgress } = useScroll();
  const nodeTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const depth = useTransform(
    scrollYProgress,
    (v) => `${Math.round(v * SEAFLOOR_M)}m`,
  );

  return (
    <>
      {/* Desktop: vertical descent gauge in the left margin */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-20 top-1/2 z-40 hidden h-[44vh] -translate-y-1/2 lg:block"
      >
        <div className="relative h-full">
          {/* vertical "DEPTH" label running alongside the line */}
          <span
            className="absolute right-full top-1/2 mr-3 -translate-y-1/2 font-sans text-[10px] uppercase text-glow-soft/35"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
              letterSpacing: '0.25em',
            }}
          >
            Depth
          </span>
          {/* faint full track */}
          <div className="absolute left-0 top-0 h-full w-px -translate-x-1/2 bg-glow/15" />
          {/* glowing fill from the surface down to the node */}
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-0 top-0 h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-glow/40 to-glow"
          />
          {/* descending node + live depth readout */}
          <motion.div
            style={{ top: nodeTop }}
            className="absolute left-0 -translate-x-1/2 -translate-y-1/2"
          >
            <div
              className="h-2 w-2 rounded-full bg-glow"
              style={{ boxShadow: '0 0 8px 2px rgba(125, 249, 255, 0.7)' }}
            />
            <motion.span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap font-sans text-[10px] tracking-widest text-glow/70">
              {depth}
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Mobile / tablet: thin top progress bar */}
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-40 h-0.5 origin-left bg-gradient-to-r from-glow-deep to-glow lg:hidden"
      />
    </>
  );
}
