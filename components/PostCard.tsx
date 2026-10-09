import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/blog';

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00+08:00`).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card post-card">
      <span className="post-meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
      </span>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <span className="link-arrow">
        Read the lesson <ArrowRight aria-hidden="true" />
      </span>
    </Link>
  );
}
