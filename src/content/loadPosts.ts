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

// Each post lives in its own folder under content/writing, with its images
// stored alongside the index.md they belong to.
const rawPosts = import.meta.glob('/content/writing/*/index.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Co-located images, resolved to their built/served URLs so markdown and hero
// references can point at files next to the post.
const postImages = import.meta.glob(
  '/content/writing/*/*.{png,jpg,jpeg,gif,webp,svg,avif}',
  { query: '?url', import: 'default', eager: true },
) as Record<string, string>;

function dirOf(path: string): string {
  return path.slice(0, path.lastIndexOf('/'));
}

// Resolve a relative asset reference (e.g. ./hero.jpg) against the post's
// folder to the URL Vite emits for it. Absolute and external URLs pass through.
function resolveAsset(src: string, dir: string): string {
  if (/^(https?:|\/)/.test(src)) return src;
  const full = `${dir}/${src.replace(/^\.\//, '')}`;
  return postImages[full] ?? src;
}

// Rewrite relative image sources in markdown body to resolved URLs.
function resolveBodyImages(body: string, dir: string): string {
  return body.replace(
    /(!\[[^\]]*\]\()([^)\s]+)(\))/g,
    (_match, prefix, src, suffix) => `${prefix}${resolveAsset(src, dir)}${suffix}`,
  );
}

function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'string') return value;
  return '';
}

function parse(raw: string, path: string, fallbackSlug: string): Post {
  const { data, content } = parseFrontmatter(raw);
  const dir = dirOf(path);
  const hero = data.hero as string | undefined;
  return {
    frontmatter: {
      title: (data.title as string) ?? fallbackSlug,
      date: normalizeDate(data.date),
      slug: (data.slug as string) ?? fallbackSlug,
      hero: hero ? resolveAsset(hero, dir) : undefined,
      excerpt: data.excerpt as string | undefined,
    },
    body: resolveBodyImages(content.trim(), dir),
  };
}

const posts: Post[] = Object.entries(rawPosts)
  .map(([path, raw]) => {
    // Slug falls back to the post's folder name (.../<slug>/index.md).
    const fallbackSlug = dirOf(path).split('/').pop() ?? 'untitled';
    return parse(raw, path, fallbackSlug);
  })
  .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.frontmatter.slug === slug);
}
