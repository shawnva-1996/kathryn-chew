'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';

type State = 'idle' | 'sending' | 'done' | 'error';

export function SampleRequestForm() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState('sending');
    setError('');
    try {
      const res = await fetch('/api/sample-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, consent: data.consent === 'on', page: window.location.pathname }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || 'Something went wrong. Please try again.');
      setState('done');
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  if (state === 'done') {
    return (
      <div className="form-done" role="status">
        <h3>Thank you, you&rsquo;re on the list.</h3>
        <p>
          The sample summary is being finalised. Kathryn will email it to you as soon as it&rsquo;s ready. Nothing else, and no
          calls unless you ask.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      <div className="field">
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
      </div>
      <div className="field">
        <label htmlFor="name">First name (optional)</label>
        <input id="name" name="name" type="text" autoComplete="given-name" maxLength={80} />
      </div>
      <div className="field">
        <label htmlFor="intent">I&rsquo;m mainly</label>
        <select id="intent" name="intent" defaultValue="">
          <option value="">Just curious</option>
          <option value="buying">Buying</option>
          <option value="selling">Selling</option>
          <option value="both">Selling, then buying</option>
        </select>
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="consent" htmlFor="consent">
        <input id="consent" type="checkbox" name="consent" required />
        <span>
          I agree that Kathryn Chew may email me the sample summary and keep my email address for that purpose. I can ask for it
          to be deleted at any time.
        </span>
      </label>
      <div style={{ marginTop: 22 }}>
        <button type="submit" className="btn btn-primary" disabled={state === 'sending'} style={{ width: '100%' }}>
          {state === 'sending' ? 'Sending…' : 'Email me the sample'}
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
      {state === 'error' ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
