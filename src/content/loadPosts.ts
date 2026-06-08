import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Make gray-matter (which depends on Buffer) work in the browser bundle.
if (typeof window !== 'undefined' && !(window as unknown as { Buffer?: unknown }).Buffer) {
  (window as unknown as { Buffer: typeof Buffer }).Buffer = Buffer;
}

export type PostFrontmatter = {
  title: string;
  date: string;
  slug: string;
  hero?: string;
  excerpt?: string;
};

export type Post = {
  frontmatter: PostFrontmatter;
  body: string;
};

const rawPosts = import.meta.glob('/content/writing/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'string') return value;
  return '';
}

function parse(raw: string, fallbackSlug: string): Post {
  const { data, content } = matter(raw);
  return {
    frontmatter: {
      title: data.title ?? fallbackSlug,
      date: normalizeDate(data.date),
      slug: data.slug ?? fallbackSlug,
      hero: data.hero,
      excerpt: data.excerpt,
    },
    body: content.trim(),
  };
}

const posts: Post[] = Object.entries(rawPosts)
  .map(([path, raw]) => {
    const fallbackSlug = path.split('/').pop()?.replace(/\.md$/, '') ?? 'untitled';
    return parse(raw, fallbackSlug);
  })
  .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.frontmatter.slug === slug);
}
