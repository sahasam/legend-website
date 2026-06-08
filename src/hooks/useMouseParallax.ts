import { useEffect } from 'react';
import { useSceneStore } from '../state/store';

export function useMouseParallax() {
  const setMouse = useSceneStore((s) => s.setMouse);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      setMouse(x, y);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [setMouse]);
}
