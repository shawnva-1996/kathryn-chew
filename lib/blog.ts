import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

export type Post = {
  slug: string;
  title: string;
  date: string;
  reader: string;
  /** The post's "short answer" paragraph, as plain text. Used for cards and meta descriptions. */
  description: string;
  html: string;
  readingMinutes: number;
};

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
  const description = first
    .replace(/^\*\*The short answer:\*\*\s*/i, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();

  const html = marked.parse(body, { async: false, gfm: true }) as string;
  const words = body.split(/\s+/).length;
  return {
    slug: fm.slug,
    title: fm.title,
    date: fm.date,
    reader: fm.reader ?? '',
    description,
    html: externalLinks(html),
    readingMinutes: Math.max(1, Math.round(words / 220)),
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

const BLOG_ORDER = [
  'renting-out-hdb-bedrooms-without-living-there',
  'gst-surprise-on-industrial-property-purchase',
  'who-does-this-agent-actually-represent',
];
function order(slug: string): number {
  const i = BLOG_ORDER.indexOf(slug);
  return i === -1 ? BLOG_ORDER.length : i;
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
