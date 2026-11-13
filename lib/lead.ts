export type SampleRequest = {
  email: string;
  name: string;
  intent: '' | 'buying' | 'selling' | 'both';
  consent: true;
  page: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INTENTS = new Set(['', 'buying', 'selling', 'both']);

/** Validates and normalises a sample request. Returns an error message for the visitor, or the clean record. */
export function parseSampleRequest(input: unknown): { ok: true; value: SampleRequest } | { ok: false; error: string; spam?: true } {
  if (!input || typeof input !== 'object') return { ok: false, error: 'Please fill in the form.' };
  const r = input as Record<string, unknown>;
  if (typeof r.company === 'string' && r.company.trim()) return { ok: false, error: 'Please try again.', spam: true };
  const email = typeof r.email === 'string' ? r.email.trim().toLowerCase() : '';
  if (!EMAIL.test(email) || email.length > 254) return { ok: false, error: 'Please enter a valid email address.' };
  if (r.consent !== true) return { ok: false, error: 'Please tick the box so Kathryn may email you the sample.' };
  const name = typeof r.name === 'string' ? r.name.trim().slice(0, 80) : '';
  const intent = typeof r.intent === 'string' && INTENTS.has(r.intent) ? (r.intent as SampleRequest['intent']) : '';
  const page = typeof r.page === 'string' ? r.page.slice(0, 200) : '';
  return { ok: true, value: { email, name, intent, consent: true, page } };
}
