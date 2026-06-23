import { motion, useReducedMotion } from 'framer-motion';
import logo from './assets/oae-logo.png';

// The OAE mark: a geodesic network sphere — a fabric — with a single cell lit
// amber, like one atomic commit firing in the mesh. The art is bright-on-black,
// so `screen` blend drops the black and floats the sphere on the deep-sea
// gradient; a warm ember halo sits behind it. Gentle ambient drift, stilled for
// reduced-motion. `priority` widens the halo for hero use.
export function OaeLogo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative ${className ?? ''}`}>
      {/* ember/amber halo, keyed to the lit cell's warmth */}
      <div
        aria-hidden
        className={`absolute inset-0 rounded-full ${priority ? 'blur-3xl' : 'blur-2xl'}`}
        style={{
          background:
            'radial-gradient(circle at 58% 42%, rgba(255,90,60,0.30), rgba(255,210,63,0.12) 38%, transparent 70%)',
        }}
      />
      <motion.img
        src={logo}
        alt="The Open Atomic Ethernet mark: a network sphere with a single cell lit"
        className="relative w-full select-none"
        style={{ mixBlendMode: 'screen' }}
        draggable={false}
        animate={reduce ? undefined : { y: [0, -9, 0] }}
        transition={
          reduce ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }
        }
      />
    </div>
  );
}
