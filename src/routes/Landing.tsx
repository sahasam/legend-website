import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LandingScene } from '../scene/LandingScene';

export function Landing() {
  return (
    <>
      <LandingScene />
      <section className="grain relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="relative"
        >
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-glow-soft/60">
            field notes from underwater
          </p>
          <h1
            className="mt-8 font-caveat text-6xl md:text-8xl"
            style={{
              fontWeight: 400,
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              color: '#f5ecd9',
            }}
          >
            sahas munamala
          </h1>
          <p
            className="mx-auto mt-8 max-w-md font-display text-lg text-glow-soft/80 md:text-xl"
            style={{
              fontWeight: 350,
              fontVariationSettings: '"opsz" 24',
            }}
          >
            engineer, occasional essayist, collector of half-formed ideas.
          </p>
          <div className="mt-12 flex justify-center gap-6 font-sans text-sm uppercase tracking-widest">
            <Link to="/writing" className="border-b border-glow/40 pb-1">
              read
            </Link>
            <Link to="/projects" className="border-b border-glow/40 pb-1">
              projects
            </Link>
            <Link to="/resume" className="border-b border-glow/40 pb-1">
              resume
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
