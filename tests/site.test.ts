import { describe, expect, it } from 'vitest';
import { getPosts, parsePost } from '@/lib/blog';
import { GIFTS, giftForPost } from '@/lib/gifts';
import { leadRef, normalisePhone, parseGiftLead } from '@/lib/giftLead';
import { parseSampleRequest } from '@/lib/lead';
import { whatsappHref } from '@/lib/whatsapp';
import { AGENT } from '@/lib/site';

describe('blog content', () => {
  const posts = getPosts();

  it('loads every post with a topic, a photo and a gift', () => {
    expect(posts.length).toBeGreaterThanOrEqual(10);
    for (const p of posts) {
      expect(p.photo.src).toMatch(/^\/images\/.+\.webp$/);
      expect(giftForPost(p.slug), p.slug).toBeDefined();
    }
  });

  it('keeps every gift tied to a real post', () => {
    const slugs = new Set(posts.map((p) => p.slug));
    for (const g of GIFTS) expect(slugs.has(g.post), g.slug).toBe(true);
    expect(new Set(GIFTS.map((g) => g.slug)).size).toBe(GIFTS.length);
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
    for (const g of GIFTS) expect(JSON.stringify(g)).not.toMatch(/\b(expert|specialist)\b/i);
  });

  it('never claims to predict prices', () => {
    for (const p of posts) expect(p.markdown).not.toMatch(/\bpredicts? (the )?prices?\b/i);
  });

  it('opens external links safely', () => {
    const p = parsePost('---\ntitle: T\nslug: t\ndate: 2026-10-09\n---\n**The short answer:** a long enough paragraph [x](https://example.com).');
    expect(p.html).toContain('rel="noopener noreferrer"');
    expect(p.description).toBe('A long enough paragraph x.');
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

describe('gift lead validation', () => {
  it('normalises Singapore and overseas mobiles', () => {
    expect(normalisePhone('9123 4567')).toBe('+6591234567');
    expect(normalisePhone('+65 8123-4567')).toBe('+6581234567');
    expect(normalisePhone('+44 7700 900123')).toBe('+447700900123');
    expect(normalisePhone('6123 4567')).toBeNull();
    expect(normalisePhone('123')).toBeNull();
  });
  it('needs name, mobile, email and consent', () => {
    const ok = parseGiftLead({ name: ' Tan  Ah Kow ', phone: '91234567', email: 'A@B.co', consent: true });
    expect(ok).toEqual({ ok: true, value: { name: 'Tan Ah Kow', phone: '+6591234567', email: 'a@b.co', consent: true } });
    expect(parseGiftLead({ name: 'T', phone: '91234567', email: 'a@b.co', consent: true }).ok).toBe(false);
    expect(parseGiftLead({ name: 'Tan', phone: '91234567', email: 'a@b.co', consent: false }).ok).toBe(false);
    expect(parseGiftLead({ name: 'Tan', phone: '91234567', email: 'a@b.co', consent: true, company: 'x' })).toMatchObject({ spam: true });
  });
  it('makes a six-character reference', () => {
    expect(leadRef('abcDEF123')).toBe('ABCDEF');
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
