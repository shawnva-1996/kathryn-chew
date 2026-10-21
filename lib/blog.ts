import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { PHOTOS, type Photo } from './photos';

export type Post = {
  slug: string;
  title: string;
  date: string;
  reader: string;
  /** The post's "short answer" paragraph, as plain text. Used for cards and meta descriptions. */
  description: string;
  html: string;
  /** The markdown body, for /llms-full.txt. */
  markdown: string;
  /** Pairs from the post's "Quick questions" section, for FAQPage schema. */
  faq: { q: string; a: string }[];
  readingMinutes: number;
  topic: TopicId;
  photo: Photo;
};

/** Library topics, in the order a reader usually meets them. */
export const TOPICS_LIST = [
  { id: 'price', label: 'Checking a price', for: 'I want to know whether a price is fair before I offer.' },
  { id: 'buying', label: 'Buying', for: 'I’m buying and don’t want a surprise after I sign.' },
  { id: 'selling', label: 'Selling', for: 'I’m selling and want to know what I’ll really walk away with.' },
  { id: 'renting', label: 'Renting out', for: 'I’m renting out my home or a room and want to stay inside the rules.' },
] as const;
export type TopicId = (typeof TOPICS_LIST)[number]['id'];

/** Per-post placement: library topic and cover photo. New posts must be added here, newest first. */
const POST_META: Record<string, { topic: TopicId; photo: Photo }> = {
  'how-to-check-if-a-condo-asking-price-is-fair': { topic: 'price', photo: PHOTOS.condo },
  'hdb-cash-proceeds-second-hdb-loan': { topic: 'selling', photo: PHOTOS.movingBoxes },
  'hdb-negative-sale-cpf-refund': { topic: 'selling', photo: PHOTOS.calculator },
  'sellers-stamp-duty-22-days-too-early': { topic: 'selling', photo: PHOTOS.clockCalendar },
  'check-hdb-floor-area-before-offer': { topic: 'buying', photo: PHOTOS.floorPlan },
  'option-to-purchase-expiry-date': { topic: 'buying', photo: PHOTOS.calendarPages },
  'landlord-tenant-identity-checks': { topic: 'renting', photo: PHOTOS.houseKeys },
  'renting-out-hdb-bedrooms-without-living-there': { topic: 'renting', photo: PHOTOS.bedroom },
  'gst-surprise-on-industrial-property-purchase': { topic: 'buying', photo: PHOTOS.factory },
  'who-does-this-agent-actually-represent': { topic: 'selling', photo: PHOTOS.handshake },
};

const plain = (md: string) =>
  md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

/** Reads "**Question?**\nAnswer" pairs under a "## Quick questions" heading. */
export function extractFaq(body: string): { q: string; a: string }[] {
  const m = body.match(/^## Quick questions[ \t]*\n([\s\S]*?)(?=\n---|\n## |(?![\s\S]))/m);
  if (!m) return [];
  return m[1]
    .split(/\n\s*\n/)
    .map((block) => block.trim().match(/^\*\*(.+?)\*\*\s*\n([\s\S]+)$/))
    .filter((x): x is RegExpMatchArray => !!x)
    .map((x) => ({ q: plain(x[1]), a: plain(x[2]) }));
}

const DIR = path.join(process.cwd(), 'content', 'blog');

function parseValue(v: string): string {
  const t = v.trim();
  return t.startsWith('"') ? (JSON.parse(t) as string) : t;
}

export function parsePost(raw: string): Post {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error('post has no front matter');
  const fm: Record<string, string> = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) fm[line.slice(0, i).trim()] = parseValue(line.slice(i + 1));
  }
  for (const k of ['title', 'slug', 'date']) if (!fm[k]) throw new Error(`post is missing "${k}"`);

  const body = m[2].trim();
  const first = body.split(/\n\s*\n/)[0] ?? '';
  const description = plain(first.replace(/^\*\*The short answer:\*\*\s*/i, ''));
  const lead = description.charAt(0).toUpperCase() + description.slice(1);

  const html = marked.parse(body, { async: false, gfm: true }) as string;
  const words = body.split(/\s+/).length;
  return {
    slug: fm.slug,
    title: fm.title,
    date: fm.date,
    reader: fm.reader ?? '',
    description: lead,
    html: externalLinks(html),
    markdown: body,
    faq: extractFaq(body),
    readingMinutes: Math.max(1, Math.round(words / 220)),
    topic: POST_META[fm.slug]?.topic ?? 'buying',
    photo: POST_META[fm.slug]?.photo ?? PHOTOS.hdbEstate,
  };
}

/** Links leaving the site open in a new tab without leaking the opener. */
function externalLinks(html: string): string {
  return html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');
}

let cache: Post[] | null = null;

export function getPosts(): Post[] {
  if (cache) return cache;
  const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith('.md')) : [];
  // Order follows the source numbering kept in BLOG_ORDER, then date.
  cache = files
    .map((f) => parsePost(fs.readFileSync(path.join(DIR, f), 'utf8')))
    .sort((a, b) => order(a.slug) - order(b.slug) || b.date.localeCompare(a.date));
  return cache;
}

const BLOG_ORDER = Object.keys(POST_META);
function order(slug: string): number {
  const i = BLOG_ORDER.indexOf(slug);
  return i === -1 ? BLOG_ORDER.length : i;
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function topicLabel(id: TopicId): string {
  return TOPICS_LIST.find((t) => t.id === id)?.label ?? '';
}

/** The next lesson to suggest: the next one in the same topic, else the next one in the library. */
export function nextPost(slug: string): Post | undefined {
  const posts = getPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  const same = posts.filter((p) => p.topic === posts[i].topic);
  const j = same.findIndex((p) => p.slug === slug);
  if (same.length > 1) return same[(j + 1) % same.length];
  return posts[(i + 1) % posts.length];
}
