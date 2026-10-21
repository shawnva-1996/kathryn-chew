import type { MetadataRoute } from 'next';
import { SITE_URL, absoluteUrl } from '@/lib/site';

/**
 * Search and AI crawlers are welcome. Named explicitly so a future blanket rule can't shut them out by
 * accident. A named group replaces the `*` group for that bot, so each one repeats the private paths.
 * /gift/ pages are for people who asked for them, and /admin is Kathryn's lead list.
 * - OpenAI: OAI-SearchBot (ChatGPT search), ChatGPT-User (links a user asks about), GPTBot (training)
 * - Anthropic: Claude-SearchBot, Claude-User, ClaudeBot
 * - Google: Googlebot (Search and AI Overviews), Google-Extended (Gemini training/grounding opt-in)
 * - Microsoft: Bingbot (Bing, Copilot, and the index ChatGPT search draws on)
 * - Perplexity: PerplexityBot, Perplexity-User · Apple: Applebot, Applebot-Extended
 */
const AI_AND_SEARCH_BOTS = [
  'Googlebot',
  'Google-Extended',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot',
  'Applebot-Extended',
  'DuckAssistBot',
  'CCBot',
];

const PRIVATE = ['/api/', '/admin', '/gift/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE },
      { userAgent: AI_AND_SEARCH_BOTS, allow: '/', disallow: PRIVATE },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}
