import type { Metadata } from 'next';
import { AGENT, PROFILES, SITE, SITE_URL, TOPICS, absoluteUrl } from './site';

export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [{ url: absoluteUrl(AGENT.photo), width: 800, height: 937, alt: AGENT.name }],
      ...(type === 'article' ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime, authors: [AGENT.name] } : {}),
    },
    twitter: { card: 'summary', title, description },
  };
}

export const PERSON_ID = `${SITE_URL}/#kathryn`;

export function siteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Person'],
        '@id': PERSON_ID,
        name: AGENT.name,
        jobTitle: AGENT.title,
        image: absoluteUrl(AGENT.photo),
        telephone: AGENT.phoneE164,
        url: absoluteUrl('/about'),
        worksFor: { '@type': 'RealEstateAgent', name: AGENT.agency, identifier: AGENT.agencyLicence },
        identifier: { '@type': 'PropertyValue', propertyID: 'CEA Registration No.', value: AGENT.ceaReg },
        areaServed: { '@type': 'Country', name: 'Singapore' },
        knowsAbout: TOPICS,
        ...(PROFILES.length ? { sameAs: PROFILES } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE.name,
        description: SITE.description,
        publisher: { '@id': PERSON_ID },
        inLanguage: 'en-SG',
      },
    ],
  };
}

export function articleJsonLd(a: {
  title: string;
  description: string;
  slug: string;
  date: string;
  faq: { q: string; a: string }[];
}) {
  const url = absoluteUrl(`/blog/${a.slug}`);
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: a.title,
      description: a.description,
      datePublished: a.date,
      dateModified: a.date,
      author: { '@id': PERSON_ID, '@type': 'Person', name: AGENT.name, url: absoluteUrl('/about') },
      mainEntityOfPage: url,
      image: absoluteUrl(AGENT.photo),
      publisher: { '@id': PERSON_ID },
      inLanguage: 'en-SG',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Lessons', item: absoluteUrl('/blog') },
        { '@type': 'ListItem', position: 3, name: a.title, item: url },
      ],
    },
  ];
  if (a.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: a.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
