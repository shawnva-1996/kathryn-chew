// Copy blog posts from the Aurelis-group source of truth into content/blog/.
// Usage: node scripts/import-blogs.mjs ../Aurelis-group/cea_disciplinary_cases/blogs
//
// Keeps only public front matter (title, slug, date, reader) and drops internal fields such as
// `source_case`, which would undo the anonymising. Drops the H1 and the author line: the site
// renders both itself, with the CEA details from lib/site.ts.
import fs from 'node:fs';
import path from 'node:path';

const src = process.argv[2];
if (!src) {
  console.error('usage: node scripts/import-blogs.mjs <blogs-dir>');
  process.exit(1);
}
const out = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'content', 'blog');
fs.mkdirSync(out, { recursive: true });

for (const file of fs.readdirSync(src).filter((f) => /^\d+_.+\.md$/.test(f)).sort()) {
  const raw = fs.readFileSync(path.join(src, file), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: no front matter`);
  const fm = Object.fromEntries(
    m[1]
      .split('\n')
      .filter((l) => /^[a-z_]+:\s*\S/.test(l))
      .map((l) => {
        const i = l.indexOf(':');
        return [l.slice(0, i), l.slice(i + 1).trim().replace(/^"(.*)"$/, '$1')];
      }),
  );
  if (fm.status && !/sample|approved|publish/i.test(fm.status)) continue;
  const body = m[2]
    .replace(/^# .+\n+/m, '')
    .replace(/\n\*\*Kathryn Chew\*\* ·.*\n?$/, '\n')
    .trim();
  const front = [
    '---',
    `title: ${JSON.stringify(fm.title)}`,
    `slug: ${fm.slug}`,
    `date: ${fm.last_checked}`,
    `reader: ${JSON.stringify(fm.reader ?? '')}`,
    '---',
    '',
  ].join('\n');
  fs.writeFileSync(path.join(out, `${fm.slug}.md`), `${front}${body}\n`);
  console.log('imported', fm.slug);
}
