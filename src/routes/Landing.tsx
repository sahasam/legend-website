import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LandingScene } from '../scene/LandingScene';
import { useScrollLock } from '../hooks/useScrollLock';

export function Landing() {
  // The title page is a fixed animated frame — lock scrolling so the mobile
  // toolbar never toggles and resizes the WebGL canvas (which jitters the layers).
  useScrollLock();

  return (
    <>
      <LandingScene />
      <section className="grain fixed inset-0 flex flex-col items-center justify-center px-6 text-center">
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
            className="mt-8 font-caveat text-6xl short:mt-3 short:text-4xl md:text-8xl"
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
            className="mx-auto mt-8 max-w-md font-display text-lg text-glow-soft/80 short:mt-3 short:text-sm md:text-xl"
            style={{
              fontWeight: 350,
              fontVariationSettings: '"opsz" 24',
            }}
          >
            engineer, occasional essayist, collector of half-formed ideas.
          </p>
          <div className="mt-12 hidden justify-center gap-6 font-sans text-sm uppercase tracking-widest short:mt-6 md:flex">
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
