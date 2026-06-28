import { describe, it, expect } from 'vitest';
import { getAllPosts, getPostBySlug } from './loadPosts';

// Validates every real post under content/writing/*/index.md. These are the
// authoring mistakes most likely to slip through a code review of a content PR:
// a missing/blank required field, a malformed date, or a duplicate slug.
const posts = getAllPosts();

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe('writing posts', () => {
  it('finds at least one post', () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it.each(posts.map((p) => [p.frontmatter.slug || '(no slug)', p] as const))(
    'post "%s" has valid required frontmatter',
    (_label, post) => {
      expect(post.frontmatter.title.trim()).not.toBe('');
      expect(post.frontmatter.slug.trim()).not.toBe('');
      expect(post.frontmatter.date).toMatch(ISO_DATE);
      expect(post.body.trim()).not.toBe('');
    },
  );

  it('has unique slugs', () => {
    const slugs = posts.map((p) => p.frontmatter.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('is sorted newest-first by date', () => {
    const dates = posts.map((p) => p.frontmatter.date);
    const sorted = [...dates].sort((a, b) => b.localeCompare(a));
    expect(dates).toEqual(sorted);
  });

  it('resolves every post by its slug', () => {
    for (const post of posts) {
      expect(getPostBySlug(post.frontmatter.slug)).toBe(post);
    }
  });

  it('returns undefined for an unknown slug', () => {
    expect(getPostBySlug('definitely-not-a-real-slug')).toBeUndefined();
  });
});
