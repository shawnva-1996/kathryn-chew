import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { JsonLd } from '@/components/JsonLd';
import { SiteFooter } from '@/components/SiteFooter';
import { MobileTabBar } from '@/components/MobileTabBar';
import { SiteHeader } from '@/components/SiteHeader';
import { siteJsonLd } from '@/lib/seo';
import { AGENT, SITE, SITE_URL } from '@/lib/site';
import './globals.css';

// One rounded family throughout, the free face closest to Airbnb Cereal.
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-jakarta', display: 'swap' });

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
  // Ownership proof for Google Search Console and Bing Webmaster Tools (public tokens, safe to commit).
  verification: {
    google: 'ql8To1DqETkNhmYAR6B26lCGjkNKaBzg2BtEZB9Kwh8',
    other: { 'msvalidate.01': '26D9FD6422A95F3EA54F2FCA9DB2C626' },
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

/** Motion is opt-in: without JS, or with reduced motion requested, everything renders static and complete. */
const MOTION_SCRIPT = `try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-motion')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-SG" className={jakarta.variable} suppressHydrationWarning>
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
        <MobileTabBar />
        <JsonLd data={siteJsonLd()} />
      </body>
    </html>
  );
}
