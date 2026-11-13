import type { Metadata, Viewport } from 'next';
import { Chakra_Petch, Inter, JetBrains_Mono } from 'next/font/google';
import { JsonLd } from '@/components/JsonLd';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { siteJsonLd } from '@/lib/seo';
import { AGENT, SITE, SITE_URL } from '@/lib/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const display = Chakra_Petch({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display-face', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-mono-face', display: 'swap' });

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
  themeColor: '#04060d',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

/** Motion is opt-in: without JS, or with reduced motion requested, everything renders static and complete. */
const MOTION_SCRIPT = `try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-motion')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-SG" className={`${inter.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
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
