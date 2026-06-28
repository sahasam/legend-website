import { describe, it, expect } from 'vitest';
import { parseFrontmatter } from './parseFrontmatter';

describe('parseFrontmatter', () => {
  it('splits YAML frontmatter from the body', () => {
    const { data, content } = parseFrontmatter('---\ntitle: Hi\nslug: hi\n---\nBody text');
    expect(data.title).toBe('Hi');
    expect(data.slug).toBe('hi');
    expect(content).toBe('Body text');
  });

  it('returns the raw string and empty data when there is no frontmatter', () => {
    const { data, content } = parseFrontmatter('Just a body, no frontmatter');
    expect(data).toEqual({});
    expect(content).toBe('Just a body, no frontmatter');
  });

  it('tolerates CRLF line endings', () => {
    const { data, content } = parseFrontmatter('---\r\ntitle: Win\r\n---\r\nBody');
    expect(data.title).toBe('Win');
    expect(content).toBe('Body');
  });
});
