import Link from 'next/link';
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
            <p style={{ maxWidth: '38ch', marginTop: 16 }}>{SITE.tagline}</p>
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
            <h2>Talk to Kathryn</h2>
            <ul>
              <li>
                <WhatsAppLink>WhatsApp {AGENT.phoneDisplay}</WhatsAppLink>
              </li>
              <li>
                <a href={`tel:${AGENT.phoneE164}`}>Call {AGENT.phoneDisplay}</a>
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
