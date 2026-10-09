import { NextResponse } from 'next/server';
import { parseSampleRequest } from '@/lib/lead';

/**
 * Receives "email me the sample" requests.
 *
 * Where the request goes:
 * - With LEAD_WEBHOOK_URL set, the request is POSTed there as JSON (Zapier, Make, Google Apps Script,
 *   Formspree and similar all accept this). This is the only place a lead is stored.
 * - Without it, the request is written to the server log only (Vercel → project → Logs). Set the webhook
 *   before sending traffic, or leads will be hard to find.
 */
export async function POST(req: Request) {
  const parsed = parseSampleRequest(await req.json().catch(() => null));
  if (!parsed.ok) {
    // Honeypot hits get a quiet success so bots learn nothing.
    if (parsed.spam) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const record = { ...parsed.value, type: 'valuation_sample_request', receivedAt: new Date().toISOString() };
  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (!webhook) {
    console.log('[sample-request] LEAD_WEBHOOK_URL not set; logging only', JSON.stringify(record));
    return NextResponse.json({ ok: true, delivered: 'log' });
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return NextResponse.json({ ok: true, delivered: 'webhook' });
  } catch (err) {
    console.error('[sample-request] webhook failed; record follows', String(err), JSON.stringify(record));
    return NextResponse.json(
      { error: "We couldn't save your request just now. Please try again, or WhatsApp Kathryn on 8804 0301." },
      { status: 502 },
    );
  }
}
