import { Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProject } from './registry';
import { PostCard } from './components/PostCard';
import { NotFoundNotice } from '../components/NotFoundNotice';

// /projects/:projectSlug — the grand project landing page. Renders the project's
// own Overview (its custom hero/intro), then its posts as featured cards. Bigger
// and more atmospheric than a writing post; the per-project drama lives in Overview.
export function ProjectDetail() {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const project = projectSlug ? getProject(projectSlug) : undefined;

  if (!project) {
    return <NotFoundNotice to="/projects" label="back to projects" />;
  }

  const { Overview } = project;

  return (
    <section className="mx-auto max-w-4xl px-6 pt-28 pb-24">
      <Link
        to="/projects"
        className="group mb-10 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-glow-soft/50 transition-colors hover:text-glow"
      >
        <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
          ←
        </span>
        Projects
      </Link>

      <Suspense fallback={<div className="h-64" />}>
        <Overview />
      </Suspense>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-16"
      >
        <h2 className="font-sans text-xs uppercase tracking-[0.25em] text-glow/50">
          writeups
        </h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2">
          {project.posts.map((post) => (
            <li key={post.slug} className="h-full">
              <PostCard projectSlug={project.slug} post={post} />
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
