import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { formatDate } from '@/components/PostCard';
import { WhatsAppLink } from '@/components/WhatsAppLink';
import { getPost, getPosts } from '@/lib/blog';
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
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article>
      <header className="article-head">
        <div className="wrap narrow">
          <Link href="/blog" className="back-link">
            <ArrowLeft aria-hidden="true" style={{ width: 14, height: 14, display: 'inline', verticalAlign: '-2px' }} /> All lessons
          </Link>
          <h1>{post.title}</h1>
          <p className="post-meta">
            By {AGENT.name} · <time dateTime={post.date}>Last checked {formatDate(post.date)}</time> · {post.readingMinutes} min read
          </p>
        </div>
      </header>

      <div className="wrap narrow">
        {/* Post bodies are first-party markdown from content/blog, rendered at build time. */}
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

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
      </div>
      <JsonLd data={articleJsonLd(post)} />
    </article>
  );
}
