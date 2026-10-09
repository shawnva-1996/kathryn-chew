import { AGENT } from './site';

export const WA_MESSAGES = {
  general: "Hi Kathryn, I found your website and I'd like to talk about a property.",
  valuation: "Hi Kathryn, I'd like a valuation summary for my property.",
  buyer: "Hi Kathryn, I'm planning to buy and I'd like to see the evidence on a property.",
  seller: "Hi Kathryn, I'm thinking of selling and I'd like to understand what my home is worth.",
} as const;

export type WaTopic = keyof typeof WA_MESSAGES;

export function whatsappHref(topic: WaTopic = 'general'): string {
  const number = AGENT.phoneE164.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(WA_MESSAGES[topic])}`;
}
