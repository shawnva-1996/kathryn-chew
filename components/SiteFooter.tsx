import Link from 'next/link';
import { getPosts } from '@/lib/blog';
import { AGENT, SITE } from '@/lib/site';
import { BrandMark } from './BrandMark';
import { WhatsAppLink } from './WhatsAppLink';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand">
              <BrandMark className="brand-mark" />
              {AGENT.name}
            </Link>
            <p className="footer-promise" style={{ marginTop: 20 }}>
              {SITE.tagline}
            </p>
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              <li>
                <Link href="/valuation">Valuation summary</Link>
              </li>
              <li>
                <Link href="/blog">Lessons from real cases</Link>
              </li>
              <li>
                <Link href="/about">About Kathryn</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Latest lessons</h2>
            <ul>
              {getPosts()
                .slice(0, 4)
                .map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`}>{p.title.split(/[?:]/)[0]}</Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2>Talk to Kathryn</h2>
            <ul>
              <li>
                <WhatsAppLink>WhatsApp {AGENT.phoneDisplay}</WhatsAppLink>
              </li>
              <li>
                <a href={`tel:${AGENT.phoneE164}`}>Call {AGENT.phoneDisplay}</a>
              </li>
              <li>
                <Link href="/privacy">Privacy notice</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="cea-line">
          <span>
            {AGENT.name} · {AGENT.title} · CEA Reg. No. {AGENT.ceaReg} · {AGENT.agency}, Licence No. {AGENT.agencyLicence} · {AGENT.phoneDisplay}
          </span>
          <span>© {new Date().getFullYear()} {AGENT.name}</span>
        </div>
      </div>
    </footer>
  );
}
