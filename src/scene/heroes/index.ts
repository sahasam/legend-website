import { ComponentType, lazy } from 'react';

export const heroes: Record<string, ComponentType> = {
  jellyfish: lazy(() => import('./jellyfish')),
};

export type HeroKey = keyof typeof heroes;
