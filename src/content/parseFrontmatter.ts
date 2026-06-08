import yaml from 'js-yaml';

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export function parseFrontmatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(FRONTMATTER);
  if (!match) return { data: {}, content: raw };
  const data = (yaml.load(match[1]) ?? {}) as Record<string, unknown>;
  const content = raw.slice(match[0].length);
  return { data, content };
}
