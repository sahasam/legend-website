import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function About() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-32 pb-24">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="font-sans text-5xl text-glow-soft md:text-6xl"
        style={{ fontWeight: 350, fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
      >
        about
      </motion.h1>

      <p className="mt-12 font-serif text-lg leading-relaxed text-glow-soft/85 md:text-xl">
        I'm Sahas, an engineer based in the SF Bay Area. I write code most days
        and prose some days. This site is a slow project that collects both
        alongside the loose threads I'm thinking through.
      </p>

      <h2
        className="mt-16 font-sans text-2xl text-glow md:text-3xl"
        style={{ fontWeight: 400, fontVariationSettings: '"opsz" 72, "SOFT" 100' }}
      >
        currently
      </h2>
      <p className="mt-6 font-serif leading-relaxed text-glow-soft/80">
        Looking for the next thing. Drifting toward bio and neuro, picking up
        AlphaFold and learning enough wet lab adjacent vocabulary to be useful.
        Running ns-3 simulations to study how networks behave under failure and
        rollout pressure. Positioning to take full advantage of the AIs,
        figuring out which workflows compound and which ones quietly rot.
      </p>

      <h2
        className="mt-16 font-sans text-2xl text-glow md:text-3xl"
        style={{ fontWeight: 400, fontVariationSettings: '"opsz" 72, "SOFT" 100' }}
      >
        i touch grass too
      </h2>
      <p className="mt-6 font-serif leading-relaxed text-glow-soft/80">
        Outside of work, I'm usually training judo, hiking or backpacking,
        taking photos, reading, baking, or working on small creative projects.
        I like building things that make complex ideas feel tangible, whether
        that's through code, writing, visuals, or conversation.
      </p>

      <h2
        className="mt-16 font-sans text-2xl text-glow md:text-3xl"
        style={{ fontWeight: 400, fontVariationSettings: '"opsz" 72, "SOFT" 100' }}
      >
        contact
      </h2>
      <p className="mt-6 font-serif leading-relaxed text-glow-soft/80">
        Reach me at{' '}
        <a href="mailto:munamalasahas@gmail.com">munamalasahas@gmail.com</a>.
      </p>
      <p className="mt-4 font-serif leading-relaxed text-glow-soft/80">
        If you want the formal version,{' '}
        <Link to="/resume">my resume lives here</Link>.
      </p>
    </section>
  );
}
