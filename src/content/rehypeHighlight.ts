import { visit } from 'unist-util-visit';
import { toText } from 'hast-util-to-text';
import { createLowlight } from 'lowlight';
import type { Element, ElementContent, Root } from 'hast';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import diff from 'highlight.js/lib/languages/diff';
import go from 'highlight.js/lib/languages/go';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';
import rust from 'highlight.js/lib/languages/rust';
import typescript from 'highlight.js/lib/languages/typescript';
import yaml from 'highlight.js/lib/languages/yaml';

const lowlight = createLowlight({
  bash,
  css,
  diff,
  go,
  javascript,
  json,
  markdown,
  python,
  rust,
  typescript,
  yaml,
});

function languageOf(node: Element): string | undefined {
  const list = node.properties?.className;
  if (!Array.isArray(list)) return;
  for (const raw of list) {
    const value = String(raw);
    if (value.startsWith('language-')) return value.slice(9);
    if (value.startsWith('lang-')) return value.slice(5);
  }
}

export function rehypeHighlight() {
  return (tree: Root) => {
    visit(tree, 'element', (node, _index, parent) => {
      if (
        node.tagName !== 'code' ||
        !parent ||
        parent.type !== 'element' ||
        (parent as Element).tagName !== 'pre'
      ) {
        return;
      }
      const lang = languageOf(node);
      if (!lang || !lowlight.registered(lang)) return;

      if (!Array.isArray(node.properties.className)) {
        node.properties.className = [];
      }
      if (!node.properties.className.includes('hljs')) {
        node.properties.className.unshift('hljs');
      }

      const text = toText(node, { whitespace: 'pre' });
      const result = lowlight.highlight(lang, text);
      if (result.children.length > 0) {
        node.children = result.children as ElementContent[];
      }
    });
  };
}
