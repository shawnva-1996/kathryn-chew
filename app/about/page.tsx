import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { WhatsAppLink } from '@/components/WhatsAppLink';
import { pageMetadata } from '@/lib/seo';
import { AGENT } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'About Kathryn Chew',
  description: `${AGENT.name}, ${AGENT.title} at ${AGENT.agency} (CEA Reg. No. ${AGENT.ceaReg}). Visual, data-driven property analysis for home buyers and sellers in Singapore.`,
  path: '/about',
});

export default function AboutPage() {
  return (
    <section className="section">
      <div className="wrap about-grid">
        <figure className="agent-card" style={{ margin: 0 }}>
          <Image src={AGENT.photo} alt="Kathryn Chew" width={800} height={937} priority sizes="(min-width: 900px) 420px, 90vw" />
        </figure>

        <div>
          <h1 className="display-l">{AGENT.name}</h1>
          <p className="lede" style={{ marginTop: 20 }}>
            Kathryn helps home buyers and home sellers in Singapore make their next move with the evidence on the table: the recent
            sales that really compare, the rules that apply with their dates, and the timeline that ties them together.
          </p>

          <dl className="details">
            <div>
              <dt>Role</dt>
              <dd>{AGENT.title}</dd>
            </div>
            <div>
              <dt>Agency</dt>
              <dd>
                {AGENT.agency}
                <br />
                <span className="muted small">Licence No. {AGENT.agencyLicence}</span>
              </dd>
            </div>
            <div>
              <dt>CEA Reg. No.</dt>
              <dd>{AGENT.ceaReg}</dd>
            </div>
            <div>
              <dt>Mobile</dt>
              <dd>
                <a href={`tel:${AGENT.phoneE164}`}>{AGENT.phoneDisplay}</a>
              </dd>
            </div>
          </dl>

          <h2 className="display-s" style={{ marginTop: 48 }}>
            How Kathryn works
          </h2>
          <ul className="aspirations" style={{ marginTop: 20 }}>
            <li>
              <span className="n">01</span>
              <h3>Show the evidence</h3>
              <p>Price opinions come with the transactions behind them, compared like with like.</p>
            </li>
            <li>
              <span className="n">02</span>
              <h3>Show the rule</h3>
              <p>Every rule carries its effective date and a link to the official source.</p>
            </li>
            <li>
              <span className="n">03</span>
              <h3>Show the timeline</h3>
              <p>Clocks that interact, like the Minimum Occupation Period and stamp duty, go on one page.</p>
            </li>
            <li>
              <span className="n">04</span>
              <h3>Show what could go wrong</h3>
              <p>Every recommendation includes the counter-case, and a plain &ldquo;the data isn&rsquo;t enough&rdquo; when that&rsquo;s true.</p>
            </li>
          </ul>

          <div className="hero-actions" style={{ marginTop: 36 }}>
            <WhatsAppLink className="btn btn-primary">WhatsApp Kathryn</WhatsAppLink>
            <Link href="/valuation" className="btn btn-ghost">
              See a sample valuation <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <p className="small muted" style={{ marginTop: 28 }}>
            You can check any salesperson&rsquo;s registration on the Council for Estate Agencies&rsquo;{' '}
            <a href="https://eservices.cea.gov.sg/aceas/public-register/" target="_blank" rel="noopener noreferrer">
              Public Register
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
