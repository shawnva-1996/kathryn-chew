import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ArrowLeft } from 'lucide-react';
import { GiftBox } from '@/components/GiftBox';
import { GiftGate } from '@/components/GiftGate';
import { PrintButton } from '@/components/PrintButton';
import { getPost } from '@/lib/blog';
import { GIFTS, getGift } from '@/lib/gifts';
import { AGENT } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return GIFTS.map((g) => ({ slug: g.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = getGift((await params).slug);
  if (!g) return {};
  // Gifts are for people who asked for them: keep them out of search results.
  return { title: g.title, robots: { index: false, follow: false } };
}

export default async function GiftPage({ params }: Props) {
  const gift = getGift((await params).slug);
  const post = gift ? getPost(gift.post) : undefined;
  if (!gift || !post) notFound();

  return (
    <section className="section-tight">
      <div className="wrap narrow">
        <Link href={`/blog/${post.slug}`} className="back-link no-print">
          <ArrowLeft aria-hidden="true" style={{ width: 14, height: 14, display: 'inline', verticalAlign: '-2px' }} /> Back to the lesson
        </Link>
        <div style={{ height: 20 }} />
        <Suspense fallback={null}>
          <GiftGate giftSlug={gift.slug} locked={<GiftBox gift={gift} postTitle={post.title} wide={false} />}>
            <article className="gift-doc">
              <p className="gift-kicker">Free guide · {AGENT.name}</p>
              <h1>{gift.title}</h1>
              <p className="muted" style={{ margin: 0 }}>
                {gift.promise}
              </p>
              {gift.sections.map((s) => (
                <div key={s.heading}>
                  <h2>{s.heading}</h2>
                  <ol>
                    {s.items.map((i) => (
                      <li key={i.t}>
                        <span className="box" aria-hidden="true" />
                        <div>
                          {i.t}
                          {i.d ? <span>{i.d}</span> : null}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
              {gift.fill ? (
                <div>
                  <h2>{gift.fill.heading}</h2>
                  <div className="fill">
                    {gift.fill.rows.map((r) => (
                      <div key={r}>
                        <span>{r}</span>
                        <span aria-hidden="true" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              <p className="gift-foot">
                From the lesson &ldquo;{post.title}&rdquo;. General information only, not advice for your situation; rules change, so check the
                official source on the day you act. {AGENT.name} · {AGENT.title} · CEA Reg. No. {AGENT.ceaReg} · {AGENT.agency}, Licence No.{' '}
                {AGENT.agencyLicence} · {AGENT.phoneDisplay}
              </p>
              <div className="hero-actions no-print" style={{ marginTop: 24 }}>
                <PrintButton />
                <Link href={`/blog/${post.slug}`} className="btn btn-ghost">
                  Re-read the lesson
                </Link>
              </div>
            </article>
          </GiftGate>
        </Suspense>
      </div>
    </section>
  );
}
