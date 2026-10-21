'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { firebaseApp, track } from '@/lib/firebase';
import { CONSENT_TEXT, leadRef, parseGiftLead } from '@/lib/giftLead';
import { AGENT } from '@/lib/site';

type Props = { giftSlug: string; giftTitle: string; postSlug: string; postTitle: string };
type Stage = { step: 'form' } | { step: 'whatsapp'; id: string; name: string };

export const unlockKey = (giftSlug: string) => `kc-gift-${giftSlug}`;

function waHref(name: string, ref: string, giftTitle: string, postTitle: string): string {
  const text = `Hi Kathryn, I'm ${name}. Please send me "${giftTitle}" from your article "${postTitle}". (Ref ${ref})`;
  return `https://wa.me/${AGENT.phoneE164.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

/**
 * Two steps: (1) name, mobile and email are saved to Firestore `leads`; (2) the visitor sends Kathryn a
 * prefilled WhatsApp message with a reference, which unlocks the gift page.
 */
export function GiftForm({ giftSlug, giftTitle, postSlug, postTitle }: Props) {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>({ step: 'form' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // Someone who already unlocked this gift goes straight to it.
  const [unlocked, setUnlocked] = useState(false);
  useEffect(() => {
    try {
      setUnlocked(!!localStorage.getItem(unlockKey(giftSlug)));
    } catch {
      // Storage blocked: show the form.
    }
  }, [giftSlug]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const parsed = parseGiftLead({
      name: String(f.get('name') ?? ''),
      phone: String(f.get('phone') ?? ''),
      email: String(f.get('email') ?? ''),
      consent: f.get('consent') === 'on',
      company: String(f.get('company') ?? ''),
    });
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }
    setError('');
    setBusy(true);
    try {
      const { addDoc, collection, getFirestore, serverTimestamp } = await import('firebase/firestore');
      const ref = await addDoc(collection(getFirestore(firebaseApp()), 'leads'), {
        ...parsed.value,
        consentText: CONSENT_TEXT,
        giftSlug,
        postSlug,
        page: window.location.pathname,
        status: 'new',
        createdAt: serverTimestamp(),
        waClickedAt: null,
      });
      void track('generate_lead', { gift: giftSlug, post: postSlug });
      setStage({ step: 'whatsapp', id: ref.id, name: parsed.value.name.split(' ')[0] });
    } catch {
      setError(`Sorry, that didn't go through. Please try again, or WhatsApp Kathryn on ${AGENT.phoneDisplay}.`);
    } finally {
      setBusy(false);
    }
  }

  async function onWhatsApp(id: string) {
    try {
      localStorage.setItem(unlockKey(giftSlug), leadRef(id));
    } catch {
      // The gift page still opens via the ?ref= query below.
    }
    void track('whatsapp_click', { gift: giftSlug });
    try {
      const { doc, getFirestore, serverTimestamp, updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(getFirestore(firebaseApp()), 'leads', id), { waClickedAt: serverTimestamp() });
    } catch {
      // Recording the click is a nice-to-have.
    }
    router.push(`/gift/${giftSlug}?ref=${leadRef(id)}`);
  }

  if (unlocked && stage.step === 'form') {
    return (
      <div className="steps-done">
        <p style={{ margin: 0 }}>You&rsquo;ve already unlocked this guide on this device.</p>
        <Link href={`/gift/${giftSlug}`} className="btn btn-primary">
          Open your guide <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    );
  }

  if (stage.step === 'whatsapp') {
    const ref = leadRef(stage.id);
    return (
      <div className="steps-done" aria-live="polite">
        <div className="step done">
          <span className="dot">1</span>
          <div>
            <strong>Details received, {stage.name}.</strong>
            <p>Thank you. Your reference is {ref}.</p>
          </div>
        </div>
        <div className="step">
          <span className="dot">2</span>
          <div>
            <strong>Send Kathryn a WhatsApp to get your guide.</strong>
            <p>The message is written for you. Press send in WhatsApp, and your guide opens here.</p>
          </div>
        </div>
        <a
          className="btn btn-primary"
          href={waHref(stage.name, ref, giftTitle, postTitle)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => void onWhatsApp(stage.id)}
        >
          <MessageCircle aria-hidden="true" /> WhatsApp Kathryn for the guide
        </a>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <div className="hp" aria-hidden="true">
        <label htmlFor={`company-${giftSlug}`}>Company</label>
        <input id={`company-${giftSlug}`} name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="field">
        <label htmlFor={`name-${giftSlug}`}>Name</label>
        <input id={`name-${giftSlug}`} name="name" autoComplete="name" required maxLength={80} />
      </div>
      <div className="row-2">
        <div className="field">
          <label htmlFor={`phone-${giftSlug}`}>Mobile</label>
          <input id={`phone-${giftSlug}`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="9123 4567" required />
        </div>
        <div className="field">
          <label htmlFor={`email-${giftSlug}`}>Email</label>
          <input id={`email-${giftSlug}`} name="email" type="email" autoComplete="email" required maxLength={254} />
        </div>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          {CONSENT_TEXT} See the <Link href="/privacy">privacy notice</Link>.
        </span>
      </label>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <button className="btn btn-primary" type="submit" disabled={busy}>
        {busy ? 'Sending…' : 'Get the free guide'}
        {busy ? null : <ArrowRight aria-hidden="true" />}
      </button>
    </form>
  );
}
