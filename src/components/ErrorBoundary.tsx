import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

export function ErrorBoundary() {
  const error = useRouteError();

  let title = 'something drifted out of reach';
  let detail: string | undefined;

  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? 'nothing here' : 'something drifted out of reach';
    detail = error.statusText || error.data;
  } else if (error instanceof Error) {
    detail = error.message;
  }

  const looksLikeChunkLoad =
    detail !== undefined &&
    /Importing a module script failed|Failed to fetch dynamically imported module|ChunkLoadError/i.test(
      detail,
    );

  return (
    <section className="mx-auto max-w-2xl px-6 pt-32 pb-24 text-center">
      <h1
        className="font-display text-4xl italic text-glow-soft md:text-5xl"
        style={{
          fontWeight: 350,
          fontVariationSettings: '"opsz" 144, "SOFT" 100',
          lineHeight: 1.1,
        }}
      >
        {title}
      </h1>
      <p className="mx-auto mt-6 max-w-md font-serif text-glow-soft/75">
        {looksLikeChunkLoad
          ? 'a stale tab is pointing at a file that no longer exists. a refresh usually fixes it.'
          : 'the current is unusually rough today. try heading back to shallower water.'}
      </p>
      {detail && (
        <pre className="mx-auto mt-6 max-w-md overflow-x-auto rounded border border-glow-soft/15 px-4 py-3 text-left font-sans text-xs text-glow-soft/50">
          {detail}
        </pre>
      )}
      <div className="mt-12 flex justify-center gap-6 font-sans text-sm uppercase tracking-widest">
        {looksLikeChunkLoad && (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="border-b border-glow/40 pb-1 text-glow"
          >
            refresh
          </button>
        )}
        <Link to="/" className="border-b border-glow/40 pb-1">
          home
        </Link>
      </div>
    </section>
  );
}
