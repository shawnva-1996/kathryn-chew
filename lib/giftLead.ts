/** Validation for the gift form. The same limits are enforced again in firestore.rules. */
export type GiftLead = {
  name: string;
  phone: string;
  email: string;
  consent: true;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Singapore mobiles are 8 digits starting with 8 or 9; overseas numbers must start with + and a country code. */
export function normalisePhone(raw: string): string | null {
  const t = raw.replace(/[\s()-]/g, '');
  if (/^(\+65|65)?[89]\d{7}$/.test(t)) return `+65${t.slice(-8)}`;
  if (/^\+[1-9]\d{7,14}$/.test(t)) return t;
  return null;
}

export function parseGiftLead(input: {
  name?: string;
  phone?: string;
  email?: string;
  consent?: boolean;
  company?: string;
}): { ok: true; value: GiftLead } | { ok: false; error: string; spam?: true } {
  if (input.company?.trim()) return { ok: false, error: 'Please try again.', spam: true };
  const name = (input.name ?? '').trim().replace(/\s+/g, ' ');
  if (name.length < 2 || name.length > 80) return { ok: false, error: 'Please enter your name.' };
  const phone = normalisePhone(input.phone ?? '');
  if (!phone) return { ok: false, error: 'Please enter a valid mobile number, e.g. 9123 4567.' };
  const email = (input.email ?? '').trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) return { ok: false, error: 'Please enter a valid email address.' };
  if (input.consent !== true) return { ok: false, error: 'Please tick the box so Kathryn may contact you.' };
  return { ok: true, value: { name, phone, email, consent: true } };
}

/** A short reference the visitor sends in their WhatsApp message, so Kathryn can match it to the lead. */
export function leadRef(id: string): string {
  return id.slice(0, 6).toUpperCase();
}

export const CONSENT_TEXT =
  'I agree that Kathryn Chew (PropNex Realty) may collect and use my name, mobile number and email to send me this guide and to contact me about property by phone, WhatsApp, SMS and email. I can withdraw consent at any time.';
