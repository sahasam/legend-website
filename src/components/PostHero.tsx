import { Suspense } from 'react';
import { heroes } from '../scene/heroes';

export function PostHero({ hero }: { hero?: string }) {
  if (!hero) return null;
  const Component = heroes[hero];
  if (!Component) return null;
  return (
    <Suspense fallback={<div className="h-48 w-full" />}>
      <Component />
    </Suspense>
  );
}
