'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { unlockKey } from './GiftForm';

/**
 * Shows the gift once this browser has completed the form and the WhatsApp step; otherwise shows the form.
 * This is a courtesy gate for a free guide, not access control.
 */
export function GiftGate({ giftSlug, locked, children }: { giftSlug: string; locked: ReactNode; children: ReactNode }) {
  const params = useSearchParams();
  const [state, setState] = useState<'checking' | 'open' | 'locked'>('checking');

  useEffect(() => {
    let saved = '';
    try {
      saved = localStorage.getItem(unlockKey(giftSlug)) ?? '';
    } catch {
      // Storage blocked: fall back to the reference in the link.
    }
    const ref = params.get('ref') ?? '';
    setState(saved || /^[A-Z0-9]{6}$/.test(ref) ? 'open' : 'locked');
  }, [giftSlug, params]);

  if (state === 'checking') return <div style={{ minHeight: 320 }} aria-busy="true" />;
  return <>{state === 'open' ? children : locked}</>;
}
