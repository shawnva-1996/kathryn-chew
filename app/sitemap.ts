import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/blog';
import { absoluteUrl } from '@/lib/site';

const SITE_UPDATED = '2026-10-21';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/valuation'), lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/about'), lastModified: SITE_UPDATED, changeFrequency: 'yearly', priority: 0.7 },
    { url: absoluteUrl('/blog'), lastModified: SITE_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/privacy'), lastModified: SITE_UPDATED, changeFrequency: 'yearly', priority: 0.2 },
    ...getPosts().map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.date,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: [absoluteUrl(p.photo.src)],
    })),
  ];
}
