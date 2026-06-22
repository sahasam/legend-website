import { Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPost } from './registry';

// /projects/:projectSlug/:postSlug — thin resolver. Looks up the bespoke post
// Component in the registry and renders it; the page's layout is owned by that
// component. Unknown slugs get an on-brand not-found, matching the writing post.
export function ProjectPost() {
  const { projectSlug, postSlug } = useParams<{
    projectSlug: string;
    postSlug: string;
  }>();
  const match =
    projectSlug && postSlug ? getPost(projectSlug, postSlug) : undefined;

  if (!match) {
    return (
      <section className="mx-auto max-w-2xl px-6 pt-32 pb-24">
        <p className="font-serif text-glow-soft/70">
          this drifted out of reach.{' '}
          <Link to="/projects" className="underline">
            back to projects
          </Link>
        </p>
      </section>
    );
  }

  const { Component } = match.post;

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Component />
    </Suspense>
  );
}
