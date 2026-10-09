'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

/** Adds `is-in` when the element enters the viewport. Content is fully visible without JS. */
export function Reveal({
  as: Tag = 'div',
  className = '',
  children,
  threshold = 0.2,
  id,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  threshold?: number;
  id?: string;
  'aria-labelledby'?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add('is-in');
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref} className={className} id={id} {...rest}>
      {children}
    </Tag>
  );
}
