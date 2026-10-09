import type { Metadata } from 'next';
import { PostCard } from '@/components/PostCard';
import { getPosts } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Lessons from real cases',
  description:
    'True stories from the Council for Estate Agencies’ disciplinary records, retold by Kathryn Chew so Singapore home buyers, sellers and landlords avoid the same expensive mistakes.',
  path: '/blog',
});

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <>
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <h1 className="display-l" style={{ maxWidth: '14ch' }}>
            Lessons from real cases.
          </h1>
          <p className="lede">
            Every story here comes from the Council for Estate Agencies&rsquo; published disciplinary records. Names and places are
            changed; the money is real. Each one ends with what to avoid, so you don&rsquo;t learn the same lesson the expensive way.
          </p>
        </div>
      </section>
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="wrap grid-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </>
  );
}
