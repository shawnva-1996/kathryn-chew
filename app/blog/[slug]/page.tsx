import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { GiftBox } from '@/components/GiftBox';
import { JsonLd } from '@/components/JsonLd';
import { formatDate } from '@/components/PostCard';
import { WhatsAppLink } from '@/components/WhatsAppLink';
import { getPost, getPosts, nextPost, topicLabel } from '@/lib/blog';
import { giftForPost } from '@/lib/gifts';
import { articleJsonLd, pageMetadata } from '@/lib/seo';
import { AGENT } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    image: post.photo,
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const gift = giftForPost(post.slug);
  const next = nextPost(post.slug);
  const related = getPosts()
    .filter((p) => p.topic === post.topic && p.slug !== post.slug && p.slug !== next?.slug)
    .slice(0, 4);

  return (
    <article>
      <header className="article-head">
        <div className="wrap narrow">
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/blog">Lessons</Link>
              </li>
              <li>
                <Link href={`/blog#topic-${post.topic}`}>{topicLabel(post.topic)}</Link>
              </li>
            </ol>
          </nav>
          <h1>{post.title}</h1>
          <p className="post-meta">
            By <Link href="/about">{AGENT.name}</Link> · <time dateTime={post.date}>Last checked {formatDate(post.date)}</time> ·{' '}
            {post.readingMinutes} min read
            {gift ? (
              <>
                {' '}
                · <a href="#gift">Free guide below</a>
              </>
            ) : null}
          </p>
        </div>
      </header>

      <div className="wrap narrow">
        <figure className="cover-photo">
          <Image src={post.photo.src} alt={post.photo.alt} width={post.photo.width} height={post.photo.height} priority sizes="(min-width: 800px) 760px, 100vw" />
        </figure>

        {/* Post bodies are first-party markdown from content/blog, rendered at build time. */}
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

        {gift ? <GiftBox gift={gift} postTitle={post.title} wide={false} /> : null}

        <aside className="author-box" aria-label="About the author">
          <Image src={AGENT.photo} alt="" width={72} height={72} />
          <div>
            <strong>{AGENT.name}</strong>
            <p>
              {AGENT.title}, {AGENT.agency} (Licence No. {AGENT.agencyLicence}) · CEA Reg. No. {AGENT.ceaReg} ·{' '}
              <WhatsAppLink>{AGENT.phoneDisplay}</WhatsAppLink>
            </p>
          </div>
        </aside>

        {next ? (
          <nav className="article-end" aria-label="Continue">
            <Link href={`/blog/${next.slug}`} className="continue">
              <span className="k">
                Next lesson <ArrowRight aria-hidden="true" />
              </span>
              <span className="t">{next.title}</span>
              <span className="s">{next.description}</span>
            </Link>
          </nav>
        ) : null}

        {related.length ? (
          <aside className="related" aria-labelledby="related-title">
            <h2 id="related-title">More on {topicLabel(post.topic).toLowerCase()}</h2>
            <ul>
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}`}>{r.title}</Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
      <JsonLd data={articleJsonLd(post)} />
    </article>
  );
}
