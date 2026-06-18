import { Suspense } from 'react';
import { heroes } from '../scene/heroes';

export function PostHero({ hero, title }: { hero?: string; title?: string }) {
  if (!hero) return null;

  if (hero.startsWith('/') || hero.startsWith('http')) {
    return (
      <div className="w-full overflow-hidden rounded-sm">
        <img
          src={hero}
          alt={title ? `Hero image for “${title}”` : ''}
          className="w-full object-cover"
          style={{ maxHeight: '480px', objectPosition: 'center' }}
        />
      </div>
    );
  }

  const Component = heroes[hero];
  if (!Component) return null;
  return (
    <Suspense fallback={<div className="h-48 w-full" />}>
      <Component />
    </Suspense>
  );
}
