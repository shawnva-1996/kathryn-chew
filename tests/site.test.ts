import { describe, expect, it } from 'vitest';
import { getPosts, parsePost } from '@/lib/blog';
import { parseSampleRequest } from '@/lib/lead';
import { whatsappHref } from '@/lib/whatsapp';
import { AGENT } from '@/lib/site';

describe('blog content', () => {
  const posts = getPosts();

  it('loads the three sample posts', () => {
    expect(posts.map((p) => p.slug)).toEqual([
      'renting-out-hdb-bedrooms-without-living-there',
      'gst-surprise-on-industrial-property-purchase',
      'who-does-this-agent-actually-represent',
    ]);
  });

  it('never publishes internal front matter or placeholder CEA details', () => {
    for (const p of posts) {
      expect(p.html).not.toMatch(/source_case|R0xxxxxx|L3xxxxxx|\[Agency name\]/);
      expect(p.description.length).toBeGreaterThan(60);
      expect(p.html).not.toMatch(/<h1/);
    }
  });

  it('never calls Kathryn an expert or specialist (CEA advertising guidelines)', () => {
    for (const p of posts) expect(p.html).not.toMatch(/\b(expert|specialist)\b/i);
  });

  it('opens external links safely', () => {
    const p = parsePost('---\ntitle: T\nslug: t\ndate: 2026-10-09\n---\n**The short answer:** a long enough paragraph [x](https://example.com).');
    expect(p.html).toContain('rel="noopener noreferrer"');
    expect(p.description).toBe('a long enough paragraph x.');
  });
});

describe('sample request validation', () => {
  it('accepts a valid request', () => {
    const r = parseSampleRequest({ email: ' Me@Example.com ', consent: true, intent: 'selling' });
    expect(r).toEqual({ ok: true, value: { email: 'me@example.com', name: '', intent: 'selling', consent: true, page: '' } });
  });
  it('requires consent and a valid email', () => {
    expect(parseSampleRequest({ email: 'me@example.com', consent: false }).ok).toBe(false);
    expect(parseSampleRequest({ email: 'nope', consent: true }).ok).toBe(false);
  });
  it('flags honeypot submissions as spam', () => {
    const r = parseSampleRequest({ email: 'me@example.com', consent: true, company: 'Bot Ltd' });
    expect(r).toMatchObject({ ok: false, spam: true });
  });
});

describe('whatsapp', () => {
  it("links to Kathryn's number", () => {
    expect(whatsappHref()).toMatch(new RegExp(`^https://wa.me/${AGENT.phoneE164.replace('+', '')}\\?text=`));
  });
});

describe('AI-readable content', () => {
  it('extracts the Quick questions of every post as FAQ pairs', async () => {
    for (const p of getPosts()) {
      expect(p.faq.length).toBeGreaterThanOrEqual(3);
      for (const f of p.faq) {
        expect(f.q.endsWith('?')).toBe(true);
        expect(f.a.length).toBeGreaterThan(10);
      }
    }
  });

  it('builds llms.txt with every post and llms-full.txt with their full text', async () => {
    const { llmsTxt } = await import('@/lib/llms');
    const short = llmsTxt();
    const full = llmsTxt(true);
    for (const p of getPosts()) {
      expect(short).toContain(`/blog/${p.slug}`);
      expect(full).toContain(p.faq[0].q.slice(0, 20));
    }
    expect(short).toContain(AGENT.ceaReg);
    expect(full.length).toBeGreaterThan(short.length * 3);
  });
});
