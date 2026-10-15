// Tell Bing (and Yandex, Seznam, Naver) that pages changed, so they recrawl within hours, not weeks.
// Bing's index also feeds Copilot and ChatGPT search. Run after each deploy that adds or edits pages:
//   node scripts/indexnow.mjs https://your-domain.sg
import fs from 'node:fs';
import path from 'node:path';

const site = (process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/+$/, '');
if (!site) {
  console.error('usage: node scripts/indexnow.mjs https://your-domain.sg');
  process.exit(1);
}
const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const keyFile = fs.readdirSync(path.join(root, 'public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('no IndexNow key file in public/');
const key = keyFile.replace('.txt', '');

const sitemap = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${keyFile}`, urlList }),
});
console.log(`IndexNow: ${res.status} for ${urlList.length} URLs`);
