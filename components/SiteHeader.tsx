'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { WhatsAppLink } from './WhatsAppLink';

const NAV = [
  { href: '/valuation', label: 'Valuation' },
  { href: '/blog', label: 'Lessons' },
  { href: '/about', label: 'About Kathryn' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // The menu sits outside <header>: the header's backdrop-filter would otherwise trap a fixed child inside its 64px.
  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <Link href="/" className="brand" aria-label="Kathryn Chew home">
            <BrandMark className="brand-mark" />
            Kathryn Chew
          </Link>

          <nav className="nav-desktop" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? 'page' : undefined}>
                {n.label}
              </Link>
            ))}
            <WhatsAppLink className="btn btn-primary btn-sm">WhatsApp Kathryn</WhatsAppLink>
          </nav>

          <div className="nav-mobile-actions">
            <button
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
          <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>
            Home
          </Link>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? 'page' : undefined}>
              {n.label}
            </Link>
          ))}
          <WhatsAppLink>WhatsApp 8804 0301</WhatsAppLink>
        </nav>
      ) : null}
    </>
  );
}
