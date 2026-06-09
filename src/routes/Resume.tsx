import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

const Nautilus = lazy(() =>
  import('../scene/creatures/Nautilus').then((m) => ({ default: m.Nautilus })),
);

type Role = {
  title: string;
  org: string;
  dates: string;
  bullets: string[];
};

const experience: Role[] = [
  {
    title: 'Founding Engineer',
    org: 'DÆDÆLUS',
    dates: 'July 2023 – December 2025',
    bullets: [
      'Developed a low-latency protocol stack on Xilinx FPGA hardware — AXI-stream packet processing and acknowledgment, 20 ns round-trip latency at 1G in SystemVerilog and CocoTB.',
      'Engineered an emulation rig for rapid protocol prototyping over point-to-point Thunderbolt in Python/Rust, 15 µs round-trip on Mac Minis.',
      'Validated a custom reversible communication protocol over a Thunderbolt mesh with a network dashboard and sub-ms failure detection and rerouting.',
    ],
  },
  {
    title: 'Project Lead',
    org: 'Open Atomic Ethernet (OCP)',
    dates: 'January 2025 – December 2025',
    bullets: [
      'Co-founded the Open Atomic Ethernet workstream — drove early architecture, organized contributor collaboration, set direction for the next 50 years of Ethernet.',
      'Authored technical papers and specifications on reliable layer-2 communication, atomic link-layer protocols, and graph algorithms.',
    ],
  },
  {
    title: 'Software Engineer',
    org: 'Amazon Rufus',
    dates: 'November 2023 – April 2025',
    bullets: [
      'Shipped a global rule deployment system impacting 120,000 TPS for AI conversational safety — cut deployment time 95% and improved rollout reliability.',
      'Automated rule reporting and retirement, eliminating manual workflows and saving an estimated $3M+ annually in operational overhead.',
      'Built cross-region rule replication and internationalization support, deployed across three regions.',
    ],
  },
  {
    title: 'Software Development Intern',
    org: 'Amazon Alexa',
    dates: 'Summer 2022',
    bullets: [
      'Built, tested, and deployed an interface to interpret 7 different Alexa Shopping language model outputs for internal analysis.',
      'Implemented new API endpoints on an AWS Serverless backend — model overrides and language-pack switching.',
      'Conducted user research and shipped enhancements through beta testing to production, used by managers, data scientists, and developers org-wide.',
    ],
  },
];

const languages = ['Python', 'Rust', 'C / C++', 'SystemVerilog', 'Java', 'JavaScript'];
const tools = [
  'GitHub',
  'React',
  'Docker',
  'DynamoDB',
  'Kubernetes',
  'OpenCV',
  'FPGAs',
  'Raspberry Pi',
  'PyTorch',
  'Linux / Bash',
  'MySQL',
];
const focus = [
  'Distributed Systems',
  'Low-Latency Networking',
  'Cloud Security',
  'AWS',
  'Linux Kernel Interfaces',
  'Mathematical Simulation',
  'Writing',
];

export function Resume() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-20 pb-32 md:pt-32">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-start gap-2"
      >
        <div className="flex w-full items-center justify-between gap-4 md:gap-12">
          <h1
            className="font-caveat text-4xl md:text-7xl"
            style={{
              fontWeight: 400,
              letterSpacing: '0.02em',
              lineHeight: 1.05,
              color: '#f5ecd9',
            }}
          >
            sahas munamala
          </h1>
          <div className="w-24 shrink-0 md:w-40" aria-hidden>
            <Suspense fallback={<div className="h-24 w-full md:h-40" />}>
              <Nautilus className="h-24 w-full md:h-40" />
            </Suspense>
          </div>
        </div>
        <p className="font-sans text-xs uppercase tracking-[0.4em] text-glow-soft/60">
          engineer · systems · networks
        </p>
      </motion.header>

      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-sans text-sm text-glow-soft/75">
        <li>
          <a href="mailto:munamalasahas@gmail.com" className="text-glow/80 hover:text-glow">
            munamalasahas@gmail.com
          </a>
        </li>
        <li className="text-glow-soft/50">(408) 482-6392</li>
        <li>
          <a
            href="https://github.com/sahasam"
            target="_blank"
            rel="noreferrer"
            className="text-glow/80 hover:text-glow"
          >
            github.com/sahasam
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/sahas-munamala"
            target="_blank"
            rel="noreferrer"
            className="text-glow/80 hover:text-glow"
          >
            in/sahas-munamala
          </a>
        </li>
      </ul>

      <div className="mt-8 flex justify-center">
        <a
          href="/resume.pdf"
          download="sahas-munamala-resume.pdf"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-glow/40 bg-glow/5 px-5 py-2 font-sans text-xs uppercase tracking-widest text-glow transition hover:border-glow hover:bg-glow/10 hover:text-glow-soft"
        >
          download pdf
          <span aria-hidden>↓</span>
        </a>
      </div>

      {/* FOCUS — above experience */}
      <div className="mt-10">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-glow-soft/50">
          focus
        </p>
        <ul className="mt-4 flex flex-wrap gap-2 font-sans text-xs uppercase tracking-widest text-glow-soft/70">
          {focus.map((s) => (
            <li
              key={s}
              className="rounded-full border border-glow-soft/15 px-3 py-1"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* EXPERIENCE */}
      <div className="mt-10">
        <ul className="space-y-20">
          {experience.map((role) => (
            <li key={`${role.org}-${role.title}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <h3
                    className="font-display text-2xl italic text-glow-soft md:text-3xl"
                    style={{
                      fontWeight: 400,
                      fontVariationSettings: '"opsz" 72, "SOFT" 100',
                    }}
                  >
                    {role.title}
                  </h3>
                  <p className="mt-1 font-sans text-sm tracking-wide text-glow-soft/70">
                    {role.org}
                  </p>
                </div>
                <time className="shrink-0 font-sans text-xs uppercase tracking-widest text-glow-soft/40">
                  {role.dates}
                </time>
              </div>
              <ul className="mt-6 space-y-3 font-serif text-glow-soft/80">
                {role.bullets.map((b, i) => (
                  <li key={i} className="pl-5 -indent-5">
                    <span className="text-glow/60">— </span>
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* EDUCATION */}
      <div className="mt-24">
        <h3
          className="font-display text-2xl italic text-glow-soft md:text-3xl"
          style={{
            fontWeight: 400,
            fontVariationSettings: '"opsz" 72, "SOFT" 100',
          }}
        >
          University of Illinois — Urbana-Champaign
        </h3>
        <p className="mt-2 font-sans text-sm text-glow-soft/70">
          B.S. Computer Engineering · May 2023 · Champaign, IL
        </p>
      </div>

      {/* LANGUAGES / TOOLS */}
      <div className="mt-16 space-y-10">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-glow-soft/50">
            languages
          </p>
          <p className="mt-4 font-serif text-glow-soft/80">
            {languages.join(' · ')}
          </p>
        </div>
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-glow-soft/50">
            tools & frameworks
          </p>
          <p className="mt-4 font-serif text-glow-soft/80">{tools.join(' · ')}</p>
        </div>
      </div>

      <p className="mt-24 text-center font-sans text-xs italic text-glow-soft/40">
        the rest is still surfacing.
      </p>
    </section>
  );
}
