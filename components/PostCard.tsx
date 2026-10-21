import Image from 'next/image';
import Link from 'next/link';
import { type Post, topicLabel } from '@/lib/blog';
import { giftForPost } from '@/lib/gifts';

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00+08:00`).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Singapore' });
}

export function PostCard({ post }: { post: Post }) {
  const gift = giftForPost(post.slug);
  return (
    <article className="card post-card">
      <figure className="card-photo">
        <Image src={post.photo.src} alt="" width={post.photo.width} height={post.photo.height} sizes="(min-width: 760px) 33vw, 100vw" />
      </figure>
      <div className="card-body">
        <span className="card-pillar">
          {topicLabel(post.topic)} · {post.readingMinutes} min read
        </span>
        <h3>
          <Link href={`/blog/${post.slug}`} className="stretched">
            {post.title}
          </Link>
        </h3>
        <p>{post.description}</p>
        {gift ? (
          <p className="card-gift">
            Free guide: <b>{gift.title.split(':')[0]}</b>
          </p>
        ) : null}
      </div>
    </article>
  );
}
