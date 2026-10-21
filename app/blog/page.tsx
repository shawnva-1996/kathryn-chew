import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { PostCard } from '@/components/PostCard';
import { TOPICS_LIST, getPosts } from '@/lib/blog';
import { giftForPost } from '@/lib/gifts';
import { PHOTOS } from '@/lib/photos';
import { pageMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Lessons from real cases',
  description:
    'True stories from the Council for Estate Agencies’ disciplinary records, retold by Kathryn Chew so Singapore home buyers, sellers and landlords avoid the same expensive mistakes. Each lesson comes with a free checklist.',
  path: '/blog',
});

export default function BlogIndex() {
  const posts = getPosts();
  const lead = posts[0];
  const leadGift = lead ? giftForPost(lead.slug) : undefined;
  const byTopic = TOPICS_LIST.map((t) => ({ topic: t, posts: posts.filter((p) => p.topic === t.id) })).filter((x) => x.posts.length);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Lessons from real cases',
          url: absoluteUrl('/blog'),
          hasPart: posts.map((p) => ({ '@type': 'Article', headline: p.title, url: absoluteUrl(`/blog/${p.slug}`) })),
        }}
      />
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-split">
            <div>
              <h1 className="display-l" style={{ maxWidth: '14ch' }}>
                Lessons from real cases.
              </h1>
              <p className="lede">
                Every story here comes from the Council for Estate Agencies&rsquo; published disciplinary records. Names and places are
                changed; the money is real. Each one ends with what to avoid, and a free checklist to use on your own deal.
              </p>
            </div>
            <figure className="hero-side-photo">
              <Image src={PHOTOS.hdbEstate.src} alt={PHOTOS.hdbEstate.alt} width={PHOTOS.hdbEstate.width} height={PHOTOS.hdbEstate.height} priority sizes="(min-width: 960px) 480px, 100vw" />
            </figure>
          </div>
          <nav aria-label="Topics">
            <ul className="pillar-nav">
              {byTopic.map(({ topic, posts: ps }) => (
                <li key={topic.id}>
                  <a href={`#topic-${topic.id}`}>
                    {topic.label}
                    <span className="count">{ps.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {lead ? (
        <section className="section-tight rule-top" aria-labelledby="start-title">
          <div className="wrap">
            <Link href={`/blog/${lead.slug}`} className="start-here">
              <div>
                <span className="card-pillar">Start here</span>
                <h2 id="start-title" style={{ marginTop: 10 }}>
                  {lead.title}
                </h2>
                <p>{lead.description}</p>
                <span className="link-arrow">
                  Read the lesson{leadGift ? ' and get the free worksheet' : ''} <ArrowRight aria-hidden="true" />
                </span>
              </div>
              <figure className="card-photo">
                <Image src={lead.photo.src} alt="" width={lead.photo.width} height={lead.photo.height} sizes="(min-width: 900px) 40vw, 100vw" />
              </figure>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="section-tight rule-top" style={{ paddingTop: 16 }}>
        <div className="wrap">
          {byTopic.map(({ topic, posts: ps }) => (
            <div key={topic.id} className="topic-block" id={`topic-${topic.id}`}>
              <div className="topic-block-head">
                <h2>{topic.label}</h2>
                <p>&ldquo;{topic.for}&rdquo;</p>
              </div>
              <div className="grid-3">
                {ps.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
