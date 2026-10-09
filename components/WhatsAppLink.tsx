import type { ReactNode } from 'react';
import { whatsappHref, type WaTopic } from '@/lib/whatsapp';

export function WhatsAppLink({
  topic = 'general',
  className,
  children,
  ariaLabel,
}: {
  topic?: WaTopic;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a href={whatsappHref(topic)} className={className} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
      {children}
    </a>
  );
}
