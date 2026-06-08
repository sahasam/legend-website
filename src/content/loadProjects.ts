import matter from 'gray-matter';
import { Buffer } from 'buffer';

if (typeof window !== 'undefined' && !(window as unknown as { Buffer?: unknown }).Buffer) {
  (window as unknown as { Buffer: typeof Buffer }).Buffer = Buffer;
}

export type ProjectFrontmatter = {
  title: string;
  year: string;
  slug: string;
  summary: string;
  href?: string;
  tags?: string[];
};

export type Project = {
  frontmatter: ProjectFrontmatter;
  body: string;
};

const rawProjects = import.meta.glob('/content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function normalizeYear(value: unknown): string {
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return value;
  return '';
}

function parse(raw: string, fallbackSlug: string): Project {
  const { data, content } = matter(raw);
  return {
    frontmatter: {
      title: data.title ?? fallbackSlug,
      year: normalizeYear(data.year),
      slug: data.slug ?? fallbackSlug,
      summary: data.summary ?? '',
      href: data.href,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    },
    body: content.trim(),
  };
}

const projects: Project[] = Object.entries(rawProjects)
  .map(([path, raw]) => {
    const fallbackSlug = path.split('/').pop()?.replace(/\.md$/, '') ?? 'untitled';
    return parse(raw, fallbackSlug);
  })
  .sort((a, b) => (a.frontmatter.year < b.frontmatter.year ? 1 : -1));

export function getAllProjects(): Project[] {
  return projects;
}
