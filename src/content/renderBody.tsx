import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { rehypeHighlight } from './rehypeHighlight';

export function RenderBody({ body }: { body: string }) {
  return (
    <div className="prose-invert max-w-none font-serif text-lg leading-relaxed text-glow-soft/90 [&_p]:mb-6 [&_h2]:font-sans [&_h2]:text-glow [&_h2]:font-semibold [&_h2]:text-xl [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-sans [&_h3]:text-glow-soft [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_a]:text-bloom-soft [&_a]:underline [&_a]:decoration-bloom-soft/40 [&_a:hover]:text-bloom [&_a:hover]:decoration-bloom [&_code]:text-bloom-soft [&_img]:my-8 [&_img]:w-full [&_img]:rounded-sm">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {body}
      </ReactMarkdown>
    </div>
  );
}
