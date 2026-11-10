import { useEffect } from 'react';
import { CHAPTERS } from '@/data/chapters';

/**
 * Applies scroll-triggered reveal animations to every exhibition section
 * (except the hero, which animates on load) and stamps chapter numerals.
 *
 * - Uses a single IntersectionObserver (no window listeners → zero leaks).
 * - Grid items get a staggered delay for a cascading effect.
 * - Skipped entirely when IntersectionObserver is unavailable (tests / old
 *   browsers) or when the user prefers reduced motion, so content is never
 *   left invisible.
 * - The data-reveal attribute is removed once the transition finishes.
 */
export function useScrollReveal(rootId = 'main-content'): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.getElementById(rootId);
    if (!root) return;

    // Chapter numerals (01–09) — purely decorative CSS ::before content
    CHAPTERS.forEach((chapter) => {
      document.getElementById(chapter.id)?.setAttribute('data-chapter', chapter.num);
    });

    if (typeof window === 'undefined' || typeof window.IntersectionObserver !== 'function') {
      return;
    }
    let prefersReduced = false;
    try {
      prefersReduced =
        typeof window.matchMedia === 'function' &&
        Boolean(window.matchMedia('(prefers-reduced-motion: reduce)')?.matches);
    } catch {
      prefersReduced = false;
    }
    if (prefersReduced) return;

    const targets: HTMLElement[] = [];
    root.querySelectorAll<HTMLElement>(':scope > section:not(#hero)').forEach((section) => {
      const container = section.firstElementChild as HTMLElement | null;
      if (!container) return;
      Array.from(container.children).forEach((child) => {
        const el = child as HTMLElement;
        if (el.classList.contains('grid') && el.children.length > 0 && el.children.length <= 24) {
          Array.from(el.children).forEach((item, i) => {
            const node = item as HTMLElement;
            node.style.setProperty('--reveal-delay', `${Math.min(i, 8) * 80}ms`);
            targets.push(node);
          });
        } else {
          targets.push(el);
        }
      });
    });

    const cleanupHandlers = new Map<HTMLElement, (e: TransitionEvent) => void>();

    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          const onEnd = (e: TransitionEvent) => {
            if (e.target !== el || e.propertyName !== 'opacity') return;
            el.removeAttribute('data-reveal');
            el.style.removeProperty('--reveal-delay');
            el.removeEventListener('transitionend', onEnd);
            cleanupHandlers.delete(el);
          };
          cleanupHandlers.set(el, onEnd);
          el.addEventListener('transitionend', onEnd);
          el.setAttribute('data-reveal', 'shown');
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    );
    } catch {
      return;
    }

    targets.forEach((el) => {
      el.setAttribute('data-reveal', 'hidden');
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      cleanupHandlers.forEach((handler, el) => el.removeEventListener('transitionend', handler));
      cleanupHandlers.clear();
      targets.forEach((el) => {
        el.removeAttribute('data-reveal');
        el.style.removeProperty('--reveal-delay');
      });
    };
  }, [rootId]);
}

