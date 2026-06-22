import type { ReactNode } from 'react';

// Shared reading typography for bespoke project-post pages. Mirrors the look of
// the markdown writing posts (see content/renderBody) so crafted TSX pages read
// consistently with /writing — but here the children are hand-authored JSX, free
// to interleave prose with custom interactive blocks.
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-none font-serif text-lg leading-relaxed text-glow-soft/90 [&>p]:mb-6 [&_h2]:font-sans [&_h2]:text-glow [&_h2]:font-semibold [&_h2]:text-xl [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-sans [&_h3]:text-glow-soft [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_a]:text-bloom-soft [&_a]:underline [&_a]:decoration-bloom-soft/40 [&_a:hover]:text-bloom [&_a:hover]:decoration-bloom [&_em]:text-glow-soft [&_strong]:font-semibold [&_strong]:text-glow">
      {children}
    </div>
  );
}
