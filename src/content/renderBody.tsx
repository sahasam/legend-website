import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { rehypeHighlight } from './rehypeHighlight';

export function RenderBody({ body }: { body: string }) {
  return (
    <div className="prose-invert max-w-none font-serif text-lg leading-relaxed text-glow-soft/90 [&_p]:mb-6 [&_h2]:font-sans [&_h2]:text-glow [&_h2]:font-semibold [&_h2]:text-xl [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-sans [&_h3]:text-glow-soft [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_a]:text-bloom-soft [&_a]:underline [&_a]:decoration-bloom-soft/40 [&_a:hover]:text-bloom [&_a:hover]:decoration-bloom [&_code]:text-bloom-soft [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_li]:pl-1 [&_li]:marker:text-glow/60 [&_img]:my-8 [&_img]:w-full [&_img]:rounded-sm [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-glow/40 [&_blockquote]:pl-5 [&_blockquote]:font-display [&_blockquote]:text-xl [&_blockquote]:italic [&_blockquote]:text-glow-soft/75 [&_hr]:my-12 [&_hr]:h-px [&_hr]:border-0 [&_hr]:bg-gradient-to-r [&_hr]:from-transparent [&_hr]:via-glow/30 [&_hr]:to-transparent">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {body}
      </ReactMarkdown>
    </div>
  );
}
