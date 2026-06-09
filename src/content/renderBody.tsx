import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { rehypeHighlight } from './rehypeHighlight';

export function RenderBody({ body }: { body: string }) {
  return (
    <div className="prose-invert max-w-none font-serif text-lg leading-relaxed text-glow-soft/90 [&_p]:mb-6 [&_h2]:font-sans [&_h2]:text-glow [&_h3]:font-sans [&_h3]:text-glow-soft [&_a]:text-glow [&_code]:text-bloom-soft">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {body}
      </ReactMarkdown>
    </div>
  );
}
