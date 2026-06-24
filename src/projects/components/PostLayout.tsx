import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ReadingDescent } from '../../components/ReadingDescent';
import { PostChrome } from './PostChrome';
import type { PostPageProps } from '../registry';

// The shared shell every bespoke project post sits inside: reading-descent gauge,
// an optional hero slot, the PostChrome header (title/date/back-link, all read
// from the registry — no per-page hardcoding), the free-form body, and the footer
// back-pill. A post supplies only its hero and its body; the chrome and structure
// stay in one place so adding or restyling a post can't drift between pages.
export function PostLayout({
  project,
  post,
  hero,
  children,
}: PostPageProps & { hero?: ReactNode; children: ReactNode }) {
  const backTo = `/projects/${project.slug}`;

  return (
    <article className="mx-auto max-w-2xl px-6 pt-28 pb-24">
      <ReadingDescent />

      {hero && <div className="mb-6">{hero}</div>}

      <PostChrome
        projectSlug={project.slug}
        projectTitle={project.title}
        title={post.title}
        date={post.date}
      />

      <div className="mt-12">{children}</div>

      <div className="mt-20 border-t border-glow/10 pt-10">
        <Link
          to={backTo}
          className="group inline-flex items-center gap-2 rounded-full border border-glow/30 px-5 py-2.5 font-sans text-sm text-glow/90 transition-colors hover:border-glow/60 hover:bg-glow/10 hover:text-glow"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          {project.title}
        </Link>
      </div>
    </article>
  );
}
