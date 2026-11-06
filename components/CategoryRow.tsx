import Link from 'next/link';
import { Home, KeyRound, LineChart, ShoppingBag, Tag, type LucideIcon } from 'lucide-react';
import { TOPICS_LIST, type TopicId } from '@/lib/blog';

const ICONS: Record<TopicId, LucideIcon> = { price: LineChart, buying: ShoppingBag, selling: Tag, renting: KeyRound };

/** Airbnb's icon category row, used for the lesson topics. Each icon jumps to that topic on the lessons page. */
export function CategoryRow({ counts }: { counts?: Partial<Record<TopicId, number>> }) {
  return (
    <nav className="cat-row" aria-label="Lesson topics">
      <Link href="/blog" className="cat">
        <Home aria-hidden="true" />
        All lessons
      </Link>
      {TOPICS_LIST.map((t) => {
        const Icon = ICONS[t.id];
        const n = counts?.[t.id];
        return (
          <Link key={t.id} href={`/blog#topic-${t.id}`} className="cat">
            <Icon aria-hidden="true" />
            {t.label}
            {n ? <span className="sr-only"> ({n} lessons)</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}
