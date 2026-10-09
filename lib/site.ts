/** Single source for the public origin and Kathryn's details. Everything canonical derives from this. */
function normaliseSiteUrl(raw: string | undefined): string {
  const fallback = 'https://kathryn-chew.vercel.app';
  const value =
    (raw || '').trim() ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : fallback);
  return value.replace(/\/+$/, '');
}

export const SITE_URL = normaliseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

/**
 * CEA advertising guidelines: every ad (and a website counts) must show the salesperson's name,
 * CEA registration number, contact number, and the agency's name and licence number.
 * Source: page 1 of Kathryn's PropNex Property Analysis Report (9 Oct 2026).
 */
export const AGENT = {
  name: 'Kathryn Chew',
  title: 'Associate Advisor',
  agency: 'PropNex Realty Pte Ltd',
  ceaReg: 'R073469E',
  agencyLicence: 'L3008022J',
  phoneDisplay: '8804 0301',
  phoneE164: '+6588040301',
  photo: '/kathryn-chew.webp',
} as const;

export const SITE = {
  name: 'Kathryn Chew',
  tagline: 'Property decisions, with the evidence shown.',
  description:
    'Kathryn Chew offers visual, data-driven property analysis for home buyers and home sellers in Singapore: what a property is worth, how to get in, and how to get out.',
  locale: 'en_SG',
} as const;

export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
