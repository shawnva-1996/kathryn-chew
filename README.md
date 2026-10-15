# Kathryn Chew — website MVP

Personal site for Kathryn Chew, Associate Advisor at PropNex Realty Pte Ltd (CEA Reg. No. R073469E).
Visual, data-driven property analysis for Singapore home buyers and sellers.

- **Source of truth:** [`shawnva-1996/Aurelis-group`](https://github.com/shawnva-1996/Aurelis-group). Brand rules live in
  `content_research/KATHRYN_AGENT_BRANDING_2026-10-09.md`; blog posts are written in `cea_disciplinary_cases/blogs/`.
- **Stack:** Next.js 15 / React 19 / TypeScript, one hand-written CSS visual system (`app/globals.css`), no CMS. Built the
  same way as the VizGrow website: static pages, opt-in motion, skip link, JSON-LD, sitemap and robots.

## Pages

| Route | What it is |
|---|---|
| `/` | Hero, the three things buyers and sellers want (fair price, entry plan, exit plan), the "one street, prices that double" chart, services, four promises, latest lessons, CTA |
| `/valuation` | Sample valuation summary skeleton (1. property at a glance, 2. entry plan, 3. exit plan) and the "email me the sample" form |
| `/about` | Agent profile: photo, role, agency, CEA and licence numbers, how Kathryn works |
| `/blog`, `/blog/[slug]` | Lessons from CEA disciplinary cases (3 sample posts) |
| `/api/sample-request` | Receives the email form (see below) |

## Deploy on Vercel

1. Import this repo in Vercel (framework: Next.js, root directory: `/`).
2. Environment variables:
   - `NEXT_PUBLIC_SITE_URL`: the final domain, e.g. `https://kathrynchew.sg` (used for canonical URLs, sitemap and
     Open Graph). Falls back to the Vercel production URL.
   - `LEAD_WEBHOOK_URL` (**set this before sending traffic**): every sample request is POSTed here as JSON
     (`email`, `name`, `intent`, `consent`, `page`, `receivedAt`). Any webhook works: a Google Apps Script that appends to a
     Sheet, Zapier, Make or Formspree. Without it, requests only appear in Vercel's function logs.

## Commands

```bash
npm install
npm run dev        # http://localhost:3020
npm run validate   # typecheck + tests + production build
npm run lint
```

## Content

- **Blog posts** are markdown in `content/blog/`. Import new ones from the source of truth with
  `node scripts/import-blogs.mjs ../Aurelis-group/cea_disciplinary_cases/blogs`. The importer drops internal front matter
  (such as `source_case`, which would undo the anonymising) and the placeholder author line; the site renders the author
  box with the real CEA details from `lib/site.ts`.
- **Kathryn's details** (name, role, agency, CEA and licence numbers, phone) live only in `lib/site.ts`, taken from page 1 of
  her Property Analysis Report. The footer shows them on every page, as CEA's advertising guidelines require.
- **Sample figures** for the chart and the valuation skeleton live in `lib/sample.ts`: one 4-room flat in Clementi, address
  and block numbers withheld. Replace them when the real sample PDF is ready.
- **Photo**: `public/kathryn-chew.webp`, cut out of the same report page.

## AI search (GEO)

What the site does so ChatGPT, Gemini, Claude, Perplexity, Copilot and Google AI Overviews can find and cite it:

- `robots.txt` names the search and AI crawlers explicitly and allows them (`app/robots.ts`).
- `/llms.txt` and `/llms-full.txt` give assistants a plain-markdown map of the site and every post in full (`lib/llms.ts`).
- Every post carries `Article`, `BreadcrumbList` and `FAQPage` JSON-LD; the FAQ comes from each post's "Quick questions".
- `Person` schema has Kathryn's CEA number, agency, topics (`TOPICS`) and, once filled in, her profiles (`PROFILES` in
  `lib/site.ts`). Add every profile URL there: LinkedIn, PropNex page, PropertyGuru/99.co agent pages, Google Business Profile.
- IndexNow: after each deploy that adds or edits pages, run `node scripts/indexnow.mjs https://<domain>` so Bing (which
  also feeds Copilot and ChatGPT search) recrawls quickly. The key file is in `public/`.

The full off-site plan is in Aurelis-group: `content_research/KATHRYN_GEO_PLAYBOOK_2026-10-15.md`.

## Not yet done

- The sample PDF itself. The form promises it by email "as soon as it's ready".
- PropertyGuru background. The branding file's chosen line mentions it, but the exact public job title is still to be
  confirmed, so the site leaves it out for now.
- A check with PropNex compliance on personal-site rules and testimonial use.
