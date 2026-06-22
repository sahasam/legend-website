import type { ReactNode } from 'react';

// Shared reading typography for bespoke project-post pages. Mirrors the look of
// the markdown writing posts (see content/renderBody) so crafted TSX pages read
// consistently with /writing — but here the children are hand-authored JSX, free
// to interleave prose with custom interactive blocks.
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-none font-serif text-lg leading-relaxed text-glow-soft/90 [&>p]:mb-6 [&_a]:text-bloom-soft [&_a]:underline [&_a]:decoration-bloom-soft/40 [&_a:hover]:text-bloom [&_a:hover]:decoration-bloom [&_em]:text-glow-soft [&_strong]:font-semibold [&_strong]:text-glow">
      {children}
    </div>
  );
}
