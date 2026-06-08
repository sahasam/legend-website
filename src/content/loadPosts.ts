import { parseFrontmatter } from './parseFrontmatter';

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
  const { data, content } = parseFrontmatter(raw);
  return {
    frontmatter: {
      title: (data.title as string) ?? fallbackSlug,
      date: normalizeDate(data.date),
      slug: (data.slug as string) ?? fallbackSlug,
      hero: data.hero as string | undefined,
      excerpt: data.excerpt as string | undefined,
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
