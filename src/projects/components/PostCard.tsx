import { Link } from 'react-router-dom';
import type { PostMeta } from '../registry';

// "2025-10-27" -> "Oct 27, 2025"
function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

// A featured post on a project's grand landing page. Larger and more image-led
// than a writing-index row — these are the showpieces of a project.
export function PostCard({
  projectSlug,
  post,
}: {
  projectSlug: string;
  post: PostMeta;
}) {
  return (
    <Link
      to={`/projects/${projectSlug}/${post.slug}`}
      className="group block overflow-hidden rounded-lg border border-glow/15 bg-abyss-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:border-glow/35 hover:bg-abyss-200/60 hover:shadow-[0_0_28px_-8px_rgba(125,249,255,0.4)]"
    >
      {post.hero && (
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={post.hero}
            alt=""
            className="h-full w-full object-cover opacity-85 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <time className="font-sans text-xs uppercase tracking-widest text-glow-soft/40">
            {formatDate(post.date)}
          </time>
          <span
            aria-hidden
            className="font-sans text-lg text-glow/0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-glow/70"
          >
            →
          </span>
        </div>
        <h3
          className="mt-2 font-sans text-2xl text-glow-soft transition-colors group-hover:text-glow"
          style={{ fontWeight: 400, fontVariationSettings: '"opsz" 72, "SOFT" 100' }}
        >
          {post.title}
        </h3>
        <p className="mt-2 font-serif text-glow-soft/65">{post.excerpt}</p>
      </div>
    </Link>
  );
}
