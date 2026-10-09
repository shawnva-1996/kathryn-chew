import type { Metadata } from 'next';
import { AGENT, SITE, SITE_URL, absoluteUrl } from './site';

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
        areaServed: 'SG',
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

export function articleJsonLd(a: { title: string; description: string; slug: string; date: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.date,
    author: { '@id': PERSON_ID, '@type': 'Person', name: AGENT.name },
    mainEntityOfPage: absoluteUrl(`/blog/${a.slug}`),
    inLanguage: 'en-SG',
  };
}
