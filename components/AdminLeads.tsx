'use client';

import { useEffect, useMemo, useState } from 'react';
import type { User } from 'firebase/auth';
import { firebaseApp } from '@/lib/firebase';
import { GIFTS } from '@/lib/gifts';

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  giftSlug: string;
  postSlug: string;
  status: string;
  createdAt: Date | null;
  waClickedAt: Date | null;
};

const giftTitle = (slug: string) => GIFTS.find((g) => g.slug === slug)?.title ?? slug;
const fmt = (d: Date | null) => (d ? d.toLocaleString('en-SG', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Singapore' }) : '');

function toCsv(rows: Lead[]): string {
  const cells = (r: Lead) => [fmt(r.createdAt), r.name, r.phone, r.email, giftTitle(r.giftSlug), r.waClickedAt ? 'yes' : 'no', r.status];
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  return [['Received', 'Name', 'Mobile', 'Email', 'Gift', 'WhatsApp clicked', 'Status'], ...rows.map(cells)].map((r) => r.map(esc).join(',')).join('\n');
}

/**
 * Admin view of gift leads. Sign-in is Firebase Auth email/password; what a signed-in user may read is decided
 * by firestore.rules (only accounts listed in the `admins` collection). No credentials live in this code.
 */
export function AdminLeads() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let off = () => {};
    void (async () => {
      const { getAuth, onAuthStateChanged } = await import('firebase/auth');
      off = onAuthStateChanged(getAuth(firebaseApp()), setUser);
    })();
    return () => off();
  }, []);

  useEffect(() => {
    if (!user) return;
    let off = () => {};
    void (async () => {
      const { collection, getFirestore, onSnapshot, orderBy, query } = await import('firebase/firestore');
      off = onSnapshot(
        query(collection(getFirestore(firebaseApp()), 'leads'), orderBy('createdAt', 'desc')),
        (snap) =>
          setLeads(
            snap.docs.map((d) => {
              const x = d.data();
              return {
                id: d.id,
                name: x.name ?? '',
                phone: x.phone ?? '',
                email: x.email ?? '',
                giftSlug: x.giftSlug ?? '',
                postSlug: x.postSlug ?? '',
                status: x.status ?? 'new',
                createdAt: x.createdAt?.toDate?.() ?? null,
                waClickedAt: x.waClickedAt?.toDate?.() ?? null,
              };
            }),
          ),
        () => setError('This account is signed in but is not on the admin list. See the README for how to add it.'),
      );
    })();
    return () => off();
  }, [user]);

  const csvHref = useMemo(() => (leads ? `data:text/csv;charset=utf-8,${encodeURIComponent(toCsv(leads))}` : ''), [leads]);

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError('');
    try {
      const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');
      await signInWithEmailAndPassword(getAuth(firebaseApp()), String(f.get('email')), String(f.get('password')));
    } catch {
      setError('Sign-in failed. Check the email and password.');
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    const { getAuth, signOut: out } = await import('firebase/auth');
    await out(getAuth(firebaseApp()));
    setLeads(null);
  }

  async function setStatus(id: string, status: string) {
    const { doc, getFirestore, updateDoc } = await import('firebase/firestore');
    await updateDoc(doc(getFirestore(firebaseApp()), 'leads', id), { status });
  }

  if (user === undefined) return <p className="muted">Loading…</p>;

  if (!user) {
    return (
      <form className="form-card" style={{ maxWidth: 420, marginTop: 24 }} onSubmit={signIn}>
        <div className="field">
          <label htmlFor="admin-email">Email</label>
          <input id="admin-email" name="email" type="email" autoComplete="username" required />
        </div>
        <div className="field">
          <label htmlFor="admin-password">Password</label>
          <input id="admin-password" name="password" type="password" autoComplete="current-password" required />
        </div>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        <button className="btn btn-primary" type="submit" disabled={busy} style={{ marginTop: 20 }}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    );
  }

  return (
    <>
      <div className="admin-bar">
        <span className="muted small">
          Signed in as {user.email} · {leads ? `${leads.length} leads` : 'loading leads…'}
        </span>
        <span style={{ display: 'flex', gap: 10 }}>
          {leads?.length ? (
            <a className="btn btn-ghost btn-sm" href={csvHref} download={`leads-${new Date().toISOString().slice(0, 10)}.csv`}>
              Download CSV
            </a>
          ) : null}
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => void signOut()}>
            Sign out
          </button>
        </span>
      </div>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      {leads?.length ? (
        <div className="admin-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Received</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Gift</th>
                <th>WhatsApp</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td>{fmt(l.createdAt)}</td>
                  <td>{l.name}</td>
                  <td>
                    <a href={`https://wa.me/${l.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                      {l.phone}
                    </a>
                  </td>
                  <td>
                    <a href={`mailto:${l.email}`}>{l.email}</a>
                  </td>
                  <td>{giftTitle(l.giftSlug)}</td>
                  <td>
                    <span className={`pill${l.waClickedAt ? ' on' : ''}`}>{l.waClickedAt ? 'clicked' : 'not yet'}</span>
                  </td>
                  <td>
                    <select aria-label={`Status for ${l.name}`} value={l.status} onChange={(e) => void setStatus(l.id, e.target.value)}>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="client">Client</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : leads ? (
        <p className="muted">No leads yet.</p>
      ) : null}
    </>
  );
}
