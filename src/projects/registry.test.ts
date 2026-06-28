import { describe, it, expect } from 'vitest';
import {
  getAllProjects,
  getProject,
  getPost,
  isExternalProject,
} from './registry';

// The project registry is hand-authored TypeScript, so the compiler catches type
// errors — but not semantic ones: a duplicate slug, a 4th post on a project, an
// external project missing its href. Those are what these tests guard.
const projects = getAllProjects();
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_POSTS = 3;

describe('project registry', () => {
  it('has at least one project', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('has unique project slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('is sorted newest-first by year', () => {
    const years = projects.map((p) => p.year);
    const sorted = [...years].sort((a, b) => b.localeCompare(a));
    expect(years).toEqual(sorted);
  });

  it.each(projects.map((p) => [p.slug, p] as const))(
    'project "%s" has required base fields',
    (_slug, project) => {
      expect(project.title.trim()).not.toBe('');
      expect(project.year.trim()).not.toBe('');
      expect(project.summary.trim()).not.toBe('');
    },
  );

  it('external projects link out and internal projects hold valid posts', () => {
    for (const project of projects) {
      if (isExternalProject(project)) {
        expect(project.href).toMatch(/^https?:\/\//);
        continue;
      }
      expect(project.posts.length).toBeGreaterThan(0);
      expect(project.posts.length).toBeLessThanOrEqual(MAX_POSTS);

      const postSlugs = project.posts.map((p) => p.slug);
      expect(new Set(postSlugs).size).toBe(postSlugs.length);

      for (const post of project.posts) {
        expect(post.title.trim()).not.toBe('');
        expect(post.excerpt.trim()).not.toBe('');
        expect(post.date).toMatch(ISO_DATE);
        // The route resolver must round-trip the registry entry.
        expect(getPost(project.slug, post.slug)?.post).toBe(post);
      }
    }
  });

  it('resolves a known project and rejects an unknown one', () => {
    expect(getProject(projects[0].slug)).toBe(projects[0]);
    expect(getProject('not-a-project')).toBeUndefined();
  });
});
