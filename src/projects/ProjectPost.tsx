import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, getProject } from './registry';
import { NotFoundNotice } from '../components/NotFoundNotice';

// /projects/:projectSlug/:postSlug — thin resolver. Looks up the bespoke post in
// the registry and renders its Component, passing the resolved project/post so the
// page reads its own metadata rather than hardcoding it. Unknown slugs get an
// on-brand not-found that sends the reader back to the project they were browsing
// when that project exists, otherwise to the projects index.
export function ProjectPost() {
  const { projectSlug, postSlug } = useParams<{
    projectSlug: string;
    postSlug: string;
  }>();
  const match =
    projectSlug && postSlug ? getPost(projectSlug, postSlug) : undefined;

  if (!match) {
    const project = projectSlug ? getProject(projectSlug) : undefined;
    return project ? (
      <NotFoundNotice to={`/projects/${project.slug}`} label={`back to ${project.title}`} />
    ) : (
      <NotFoundNotice to="/projects" label="back to projects" />
    );
  }

  const { Component } = match.post;

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Component project={match.project} post={match.post} />
    </Suspense>
  );
}
