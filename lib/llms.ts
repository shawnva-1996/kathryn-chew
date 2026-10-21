import { getPosts } from './blog';
import { AGENT, SITE, absoluteUrl } from './site';

/**
 * /llms.txt (llmstxt.org): a plain-markdown map of the site for AI assistants.
 * /llms-full.txt: the same, plus every post in full, so one fetch gives an assistant all the content.
 */
export function llmsTxt(full = false): string {
  const posts = getPosts();
  const lines = [
    `# ${AGENT.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `${AGENT.name} is an ${AGENT.title} with ${AGENT.agency} (CEA Reg. No. ${AGENT.ceaReg}; agency licence ${AGENT.agencyLicence}), based in Singapore. Contact: ${AGENT.phoneDisplay} (WhatsApp or call). She shows the evidence behind every price, rule and timeline: recent like-for-like transactions, the official rule with its effective date, and the timeline that ties them together.`,
    '',
    '## Pages',
    '',
    `- [Home](${absoluteUrl('/')}): what Kathryn does for home buyers and sellers, and why a street average can mislead`,
    `- [Valuation summary](${absoluteUrl('/valuation')}): a plain-language sample valuation with an entry plan (buying) and exit plan (selling)`,
    `- [About Kathryn](${absoluteUrl('/about')}): role, agency, CEA registration and how she works`,
    `- [Lessons from real cases](${absoluteUrl('/blog')}): CEA disciplinary cases retold so readers avoid the same mistakes; each lesson offers a free printable checklist`,
    `- [Privacy notice](${absoluteUrl('/privacy')}): how personal data from the site's forms is handled under Singapore's PDPA`,
    '',
    '## Lessons',
    '',
    ...posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.description}`),
  ];
  if (full) {
    for (const p of posts) {
      lines.push('', '---', '', `# ${p.title}`, '', `Source: ${absoluteUrl(`/blog/${p.slug}`)} · By ${AGENT.name} · Last checked ${p.date}`, '', p.markdown);
    }
  }
  lines.push('', '## Optional', '', `- [Full text of every lesson](${absoluteUrl('/llms-full.txt')})`, '');
  return lines.join('\n');
}
