import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import { JsonLd } from '@/components/JsonLd';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { siteJsonLd } from '@/lib/seo';
import { AGENT, SITE, SITE_URL } from '@/lib/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const interTight = Inter_Tight({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-inter-tight', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Kathryn Chew · Visual, data-driven property analysis for Singapore home buyers and sellers',
    template: '%s · Kathryn Chew',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: AGENT.name }],
  creator: AGENT.name,
  alternates: { canonical: SITE_URL },
  openGraph: { siteName: SITE.name, locale: SITE.locale, type: 'website' },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#f7f5f0',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

/** Motion is opt-in: without JS, or with reduced motion requested, everything renders static and complete. */
const MOTION_SCRIPT = `try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-motion')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-SG" className={`${inter.variable} ${interTight.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLd data={siteJsonLd()} />
      </body>
    </html>
  );
}
