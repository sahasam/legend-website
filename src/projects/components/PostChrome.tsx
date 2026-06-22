import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// "2025-10-27" -> "Oct 27, 2025" (parsed by parts to dodge timezone shifts).
function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

// Shared header for a bespoke project post: a back-link to the parent project,
// the date, and the title. Each crafted post page renders this at its top so the
// nav/title treatment stays consistent while the body below is free-form.
export function PostChrome({
  projectSlug,
  projectTitle,
  title,
  date,
}: {
  projectSlug: string;
  projectTitle: string;
  title: string;
  date: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Link
        to={`/projects/${projectSlug}`}
        className="group mb-6 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-glow-soft/50 transition-colors hover:text-glow"
      >
        <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
          ←
        </span>
        {projectTitle}
      </Link>
      <time className="block font-sans text-xs uppercase tracking-widest text-glow-soft/50">
        {formatDate(date)}
      </time>
      <h1
        className="mt-4 font-sans text-4xl text-glow-soft md:text-5xl"
        style={{ fontWeight: 300, lineHeight: 1.1 }}
      >
        {title}
      </h1>
    </motion.header>
  );
}
