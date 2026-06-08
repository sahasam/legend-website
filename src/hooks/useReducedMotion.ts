import { useEffect } from 'react';
import { useSceneStore } from '../state/store';

export function useReducedMotion() {
  const setReducedMotion = useSceneStore((s) => s.setReducedMotion);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [setReducedMotion]);
}
