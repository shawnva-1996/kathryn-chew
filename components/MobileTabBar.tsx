'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, FileText, MessageCircle, Search } from 'lucide-react';
import { whatsappHref } from '@/lib/whatsapp';

/** The Airbnb app's bottom tab bar, shown on phones only (CSS hides it from 880px up and when printing). */
export function MobileTabBar() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;
  const on = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));
  return (
    <nav className="tab-bar" aria-label="Quick links">
      <Link href="/" aria-current={on('/') ? 'page' : undefined}>
        <Search aria-hidden="true" />
        Explore
      </Link>
      <Link href="/blog" aria-current={on('/blog') ? 'page' : undefined}>
        <BookOpen aria-hidden="true" />
        Lessons
      </Link>
      <Link href="/valuation" aria-current={on('/valuation') ? 'page' : undefined}>
        <FileText aria-hidden="true" />
        Valuation
      </Link>
      <a href={whatsappHref('general')} target="_blank" rel="noopener noreferrer">
        <MessageCircle aria-hidden="true" />
        WhatsApp
      </a>
    </nav>
  );
}
