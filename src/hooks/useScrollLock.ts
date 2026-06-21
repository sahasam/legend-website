import { useEffect } from 'react';

/**
 * Locks document scrolling while the calling component is mounted, restoring
 * the previous values on unmount. Scoped per-route so pages that need to scroll
 * (writing, posts) are untouched.
 *
 * On mobile this keeps the landing page a fixed "animated frame": with no
 * scrollable overflow the browser never toggles its dynamic toolbar, so the
 * fixed WebGL canvas never resizes mid-scroll and the parallax layers stop
 * jittering. `overscroll-behavior: none` additionally kills rubber-band bounce.
 */
export function useScrollLock() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
    };

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';

    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.overscrollBehavior = prev.bodyOverscroll;
    };
  }, []);
}
