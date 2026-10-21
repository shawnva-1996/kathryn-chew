import { Check, Gift as GiftIcon } from 'lucide-react';
import type { Gift } from '@/lib/gifts';
import { GiftForm } from './GiftForm';

/** The lead magnet panel shown at the end of every lesson (and on a locked gift page). */
export function GiftBox({ gift, postTitle, wide = true }: { gift: Gift; postTitle: string; wide?: boolean }) {
  return (
    <section className={`gift-box${wide ? ' wide' : ''}`} id="gift" aria-labelledby={`gift-${gift.slug}`}>
      <div>
        <p className="gift-kicker">
          <GiftIcon aria-hidden="true" /> Free guide for this lesson
        </p>
        <h2 id={`gift-${gift.slug}`}>{gift.title}</h2>
        <p className="gift-what">{gift.promise}</p>
        <ul className="gift-inside">
          {gift.inside.map((x) => (
            <li key={x}>
              <Check aria-hidden="true" />
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </div>
      <GiftForm giftSlug={gift.slug} giftTitle={gift.title} postSlug={gift.post} postTitle={postTitle} />
    </section>
  );
}
