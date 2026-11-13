# Kathryn Chew — website MVP

Personal site for Kathryn Chew, Associate Advisor at PropNex Realty Pte Ltd (CEA Reg. No. R073469E).
Visual, data-driven property analysis for Singapore home buyers and sellers.

- **Source of truth:** [`shawnva-1996/Aurelis-group`](https://github.com/shawnva-1996/Aurelis-group). Brand rules live in
  `content_research/KATHRYN_AGENT_BRANDING_2026-10-09.md`; blog posts are written in `cea_disciplinary_cases/blogs/`.
- **Stack:** Next.js 15 / React 19 / TypeScript, one hand-written CSS visual system (`app/globals.css`), no CMS. Built the
  same way as the VizGrow website and, since v2 (21 Oct 2026), in its look: graphite canvas, warm off-white type, one
  accent colour (the `--teal*` tokens at the top of `globals.css`; set to VizGrow's lime). Firebase for leads.

## Pages

| Route | What it is |
|---|---|
| `/` | Hero, the three things buyers and sellers want (fair price, entry plan, exit plan), the "one street, prices that double" chart, services, four promises, latest lessons, CTA |
| `/valuation` | Sample valuation summary skeleton (1. property at a glance, 2. entry plan, 3. exit plan) and the "email me the sample" form |
| `/about` | Agent profile: photo, role, agency, CEA and licence numbers, how Kathryn works |
| `/blog`, `/blog/[slug]` | Lessons from CEA disciplinary cases and data posts, grouped by topic, each with a cover photo and a free guide |
| `/gift/[slug]` | The free guide for a lesson (printable checklist). Unlocked after the gift form and the WhatsApp step. Not indexed |
| `/admin` | Kathryn's lead list: Firebase Auth sign-in, live table, status, CSV download. Not indexed |
| `/privacy` | PDPA privacy notice for the forms |
| `/api/sample-request` | Receives the valuation email form (see below) |

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
- IndexNow: `.github/workflows/indexnow.yml` runs `node scripts/indexnow.mjs` after every successful Vercel production
  deploy (or by hand from the Actions tab), so Bing (which also feeds Copilot and ChatGPT search) recrawls quickly. The key
  file is in `public/`. Change the URL in the workflow when the site moves to a custom domain.

The full off-site plan is in Aurelis-group: `content_research/KATHRYN_GEO_PLAYBOOK_2026-10-15.md`.

## Not yet done

- The sample PDF itself. The form promises it by email "as soon as it's ready".
- PropertyGuru background. The branding file's chosen line mentions it, but the exact public job title is still to be
  confirmed, so the site leaves it out for now.
- A check with PropNex compliance on personal-site rules and testimonial use.

## Gifts and leads (Firebase)

Every lesson ends with a free guide (`lib/gifts.ts`). The visitor gives name, mobile and email and ticks the consent
box; the browser writes a document to Firestore `leads`. They then press "WhatsApp Kathryn for the guide", which opens
WhatsApp with a prefilled message and a 6-character reference, records `waClickedAt`, and opens `/gift/<slug>`.
The site cannot see whether the WhatsApp message was actually sent; Kathryn matches the reference in WhatsApp.

One-time setup in the [Firebase console](https://console.firebase.google.com/project/kathryn-chew):

1. **Firestore:** create the database if it doesn't exist (production mode, region `asia-southeast1`).
2. **Rules:** Firestore → Rules → paste `firestore.rules` → Publish (or `npx firebase-tools deploy --only firestore:rules`).
   Until this is done, the form either fails or, under test-mode rules, leaves leads readable by anyone.
3. **Admin:** Authentication → Users → copy Kathryn's **User UID**. Firestore → Start collection `admins` → Document ID =
   that UID → any field (e.g. `note: "Kathryn"`). Only users listed there can read leads. Sign-in details never go in this repo.
4. **Authentication → Settings → Authorized domains:** add `kathryn-chew.vercel.app` and the custom domain when there is one.
5. Sign in at `/admin` to see leads.

The Firebase web config in `lib/firebase.ts` is public by design; access is controlled by the rules. Test the rules with
the emulator (needs Java): `npx -y firebase-tools@14 emulators:exec --only firestore --project kathryn-chew "node tests/rules/firestore-rules.test.mjs"`.

## Photos

Free Adobe Stock photos licensed through Adobe (standard licence), listed with their Stock IDs in `lib/photos.ts` and
stored as WebP in `public/images/`. Each lesson's cover photo and topic are set in `POST_META` in `lib/blog.ts`;
add a line there for every new post.
