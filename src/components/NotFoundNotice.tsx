import { Link } from 'react-router-dom';

// Shared "this drifted out of reach" fallback for missing posts/projects (and
// reused by the writing post route). One place to keep the wording and styling in
// sync. `to`/`label` name where to send the reader back.
export function NotFoundNotice({ to, label }: { to: string; label: string }) {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-32 pb-24">
      <p className="font-serif text-glow-soft/70">
        this drifted out of reach.{' '}
        <Link to={to} className="underline">
          {label}
        </Link>
      </p>
    </section>
  );
}
