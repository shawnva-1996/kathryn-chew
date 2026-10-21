import Image from 'next/image';
import type { Photo } from '@/lib/photos';

/** Two photos side by side, edge to edge, used as a divider between sections (as on 11co.one). */
export function PhotoPair({ a, b, priority = false }: { a: Photo; b: Photo; priority?: boolean }) {
  return (
    <div className="photo-pair">
      {[a, b].map((p) => (
        <figure key={p.src}>
          <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="50vw" priority={priority} />
        </figure>
      ))}
    </div>
  );
}
