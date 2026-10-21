import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, CalendarClock, FileText, LineChart, LogIn, LogOut, ScrollText, TriangleAlert } from 'lucide-react';
import { PostCard } from '@/components/PostCard';
import { PriceStrip } from '@/components/PriceStrip';
import { Reveal } from '@/components/Reveal';
import { WhatsAppLink } from '@/components/WhatsAppLink';
import { getPosts } from '@/lib/blog';
import { PHOTOS } from '@/lib/photos';
import { STREET_3Y, STREET_SALES, SAMPLE_PROPERTY, sgd } from '@/lib/sample';
import { pageMetadata } from '@/lib/seo';
import { AGENT, SITE } from '@/lib/site';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Visualising property data to support your next move',
    description: SITE.description,
    path: '/',
  }),
  title: { absolute: 'Kathryn Chew · Visualising property data to support your next move' },
};

const leaseStarts = STREET_SALES.map((s) => s.leaseStart);
const leaseGap = Math.max(...leaseStarts) - Math.min(...leaseStarts);
const sameAge = STREET_SALES.filter((s) => s.leaseStart === SAMPLE_PROPERTY.leaseStart).map((s) => s.price);

export default function HomePage() {
  const posts = getPosts();
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1 className="display-l">Visualising property data to support your next move.</h1>
            <p className="lede">
              Kathryn Chew offers visual, data-driven and dynamic property analysis for home buyers and home sellers in Singapore.
              Every price, rule and timeline comes with the evidence shown.
            </p>
            <div className="hero-actions">
              <Link href="/valuation" className="btn btn-primary">
                See a sample valuation <ArrowRight aria-hidden="true" />
              </Link>
              <WhatsAppLink className="btn btn-ghost">WhatsApp Kathryn</WhatsAppLink>
            </div>
          </div>
          <figure className="agent-card" style={{ margin: 0 }}>
            <Image src={AGENT.photo} alt="Kathryn Chew" width={800} height={937} priority sizes="(min-width: 960px) 420px, 90vw" />
            <figcaption>
              <strong>{AGENT.name}</strong>
              {AGENT.title}, {AGENT.agency}
              <br />
              <span className="muted">CEA Reg. No. {AGENT.ceaReg}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="wrap">
        <figure className="photo-band">
          <Image src={PHOTOS.hdbPunggol.src} alt={PHOTOS.hdbPunggol.alt} width={PHOTOS.hdbPunggol.width} height={PHOTOS.hdbPunggol.height} sizes="(min-width: 1280px) 1200px, 100vw" />
        </figure>
      </div>

      <section className="section section-alt" aria-labelledby="want-title">
        <div className="wrap">
          <div className="section-head split">
            <h2 id="want-title" className="display-m">
              Buyers and sellers want to be more data-informed, in order to:
            </h2>
            <p className="lede">
              Property is the biggest purchase most families make, and most of the evidence sits in tables nobody reads. Kathryn turns
              it into pictures and plain answers.
            </p>
          </div>
          <ol className="aspirations">
            <li>
              <span className="n">01</span>
              <h3>Know what a fair price looks like</h3>
              <p>Compare like with like: the same flat type, in blocks of a similar age, sold recently. Not a street average.</p>
            </li>
            <li>
              <span className="n">02</span>
              <h3>Plan how to get in</h3>
              <p>What to offer, the cash you need on day one, and whether CPF and a loan work for this lease and your ages.</p>
            </li>
            <li>
              <span className="n">03</span>
              <h3>Plan how to get out</h3>
              <p>When you can sell, who will buy it next, and what you&rsquo;ll actually keep after the loan and your CPF refund.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="evidence-title">
        <div className="wrap">
          <div className="section-head split">
            <h2 id="evidence-title" className="display-m">
              One street. One flat type. Prices that double.
            </h2>
            <p className="lede">
              These are six recent 4-room sales on a single street in Clementi. The street&rsquo;s average says {sgd(STREET_3Y.average)}.
              For a flat in a 1978 block, the sales that matter were {sameAge.map(sgd).join(' and ')}.
            </p>
          </div>
          <Reveal as="figure" className="chart-card" threshold={0.3}>
            <p className="chart-hint" aria-hidden="true">
              Swipe to see the full chart →
            </p>
            <div className="chart-scroll">
              <PriceStrip />
            </div>
            <div className="stat-row">
              <div className="stat">
                <div className="value">{sgd(STREET_3Y.average)}</div>
                <div className="label">Street average, all 4-room flats, last 3 years</div>
              </div>
              <div className="stat accent">
                <div className="value">
                  {sgd(Math.min(...sameAge))}&ndash;{sgd(Math.max(...sameAge)).replace('$', '')}
                </div>
                <div className="label">Recent sales in blocks the same age as the sample flat</div>
              </div>
              <div className="stat">
                <div className="value">{leaseGap} years</div>
                <div className="label">Between the oldest and newest leases among these sales</div>
              </div>
            </div>
            <figcaption>
              Source: HDB resale transactions, Jul to Oct 2026, from a property analysis report for a {SAMPLE_PROPERTY.flatType} flat in{' '}
              {SAMPLE_PROPERTY.town}. Block numbers and the subject address are withheld.
            </figcaption>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="help-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="help-title" className="display-m">
              Kathryn helps buyers and sellers with
            </h2>
          </div>
          <div className="grid-2">
            <Link href="/valuation" className="card">
              <span className="icon-chip">
                <FileText aria-hidden="true" />
              </span>
              <h3>A valuation summary you can read</h3>
              <p>Pages of tables turned into three plain answers: what it&rsquo;s worth, how to get in, how to get out.</p>
              <span className="link-arrow">
                See the sample <ArrowRight aria-hidden="true" />
              </span>
            </Link>
            <div className="card">
              <span className="icon-chip">
                <LogIn aria-hidden="true" />
              </span>
              <h3>An entry plan for buyers</h3>
              <p>A fair offer range from like-for-like sales, the cash you need on day one, and the checks before you sign.</p>
            </div>
            <div className="card">
              <span className="icon-chip">
                <LogOut aria-hidden="true" />
              </span>
              <h3>An exit plan for sellers</h3>
              <p>Your earliest sale date, your likely buyers, and the cash you keep after the loan and CPF refund.</p>
            </div>
            <Link href="/blog" className="card">
              <span className="icon-chip">
                <BookOpen aria-hidden="true" />
              </span>
              <h3>Lessons from real cases</h3>
              <p>True stories from CEA&rsquo;s disciplinary records, retold so you don&rsquo;t learn the same expensive lessons.</p>
              <span className="link-arrow">
                Read the lessons <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="why-title">
        <div className="wrap">
          <div className="section-head split">
            <h2 id="why-title" className="display-m">
              Why clients work with Kathryn
            </h2>
            <p className="lede">Four promises that hold for every conversation, every report and every post.</p>
          </div>
          <div className="grid-2">
            <Reveal className="card reveal">
              <span className="icon-chip">
                <LineChart aria-hidden="true" />
              </span>
              <h3>The evidence, shown</h3>
              <p>Every price opinion comes with the real transactions behind it, so you can check the working yourself.</p>
            </Reveal>
            <Reveal className="card reveal">
              <span className="icon-chip">
                <ScrollText aria-hidden="true" />
              </span>
              <h3>The rule, with its date</h3>
              <p>Every rule comes with when it took effect and a link to the official source: HDB, URA, IRAS, CPF or CEA.</p>
            </Reveal>
            <Reveal className="card reveal">
              <span className="icon-chip">
                <CalendarClock aria-hidden="true" />
              </span>
              <h3>The timeline, on one page</h3>
              <p>Minimum occupation, stamp duty clocks and move-out dates interact. Kathryn puts them on a single timeline.</p>
            </Reveal>
            <Reveal className="card reveal">
              <span className="icon-chip">
                <TriangleAlert aria-hidden="true" />
              </span>
              <h3>What could go wrong</h3>
              <p>Every recommendation includes the counter-case, and Kathryn will say so when the data isn&rsquo;t enough.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {posts.length ? (
        <section className="section section-alt" aria-labelledby="posts-title">
          <div className="wrap">
            <div className="section-head split">
              <h2 id="posts-title" className="display-m">
                Lessons from real cases
              </h2>
              <p className="lede">
                What went wrong for other buyers, sellers and landlords, and how to avoid it. Every lesson comes with a free checklist for your
                own deal.
              </p>
            </div>
            <div className="grid-3">
              {posts.slice(0, 3).map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
            <p style={{ marginTop: 28 }}>
              <Link href="/blog" className="link-arrow">
                All {posts.length} lessons <ArrowRight aria-hidden="true" />
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      <section className="section section-deep" aria-labelledby="cta-title">
        <div className="wrap cta-band">
          <div>
            <h2 id="cta-title" className="display-m">
              See what a valuation summary looks like.
            </h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Leave your email and Kathryn will send the sample summary: one property, explained in plain language.
            </p>
          </div>
          <div className="hero-actions">
            <Link href="/valuation#sample-form" className="btn btn-primary">
              Get the sample <ArrowRight aria-hidden="true" />
            </Link>
            <WhatsAppLink className="btn btn-ghost" topic="valuation">
              WhatsApp Kathryn
            </WhatsAppLink>
          </div>
        </div>
      </section>

      <WhatsAppLink className="btn btn-primary float-wa" ariaLabel="WhatsApp Kathryn">
        WhatsApp
      </WhatsAppLink>
    </>
  );
}
