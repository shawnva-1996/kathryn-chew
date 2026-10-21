// Checks firestore.rules in the Firestore emulator (needs Java). From the repo root:
//   npx -y firebase-tools@14 emulators:exec --only firestore --project kathryn-chew "node tests/rules/firestore-rules.test.mjs"
// Uses port 8089, set in firebase.json.
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import fs from 'node:fs';
const env = await initializeTestEnvironment({ projectId: 'kathryn-chew', firestore: { rules: fs.readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8'), host: '127.0.0.1', port: 8089 } });
const anon = env.unauthenticatedContext().firestore();
const lead = () => ({ name: 'Tan Ah Kow', phone: '+6591234567', email: 'a@b.co', consent: true, consentText: 'I agree that Kathryn Chew may contact me about this guide.', giftSlug: 'fair-price-worksheet', postSlug: 'x', page: '/blog/x', status: 'new', createdAt: serverTimestamp(), waClickedAt: null });
const r = await assertSucceeds(addDoc(collection(anon, 'leads'), lead()));
console.log('public create ok');
await assertFails(addDoc(collection(anon, 'leads'), { ...lead(), phone: '123' })); console.log('bad phone rejected');
await assertFails(addDoc(collection(anon, 'leads'), { ...lead(), consent: false })); console.log('no consent rejected');
await assertFails(addDoc(collection(anon, 'leads'), { ...lead(), extra: 1 })); console.log('extra field rejected');
await assertFails(addDoc(collection(anon, 'leads'), { ...lead(), status: 'client' })); console.log('status forged rejected');
await assertFails(getDoc(doc(anon, 'leads', r.id))); console.log('public read rejected');
await assertFails(getDocs(collection(anon, 'leads'))); console.log('public list rejected');
await assertFails(updateDoc(doc(anon, 'leads', r.id), { email: 'x@y.zz' })); console.log('public edit rejected');
await assertSucceeds(updateDoc(doc(anon, 'leads', r.id), { waClickedAt: serverTimestamp() })); console.log('public wa click ok');
await assertFails(updateDoc(doc(anon, 'leads', r.id), { waClickedAt: serverTimestamp() })); console.log('second wa click rejected');
const stranger = env.authenticatedContext('u2', { email: 'someone@x.com' }).firestore();
await assertFails(getDocs(collection(stranger, 'leads'))); console.log('signed-in non-admin read rejected');
await env.withSecurityRulesDisabled(async (c) => setDoc(doc(c.firestore(), 'admins/u1'), { note: 'Kathryn' }));
const admin = env.authenticatedContext('u1').firestore();
await assertSucceeds(getDocs(collection(admin, 'leads'))); console.log('admin list ok');
await assertSucceeds(updateDoc(doc(admin, 'leads', r.id), { status: 'contacted' })); console.log('admin status ok');
await assertSucceeds(deleteDoc(doc(admin, 'leads', r.id))); console.log('admin delete ok');
await assertFails(setDoc(doc(anon, 'admins/u3'), { x: 1 })); console.log('cannot self-add admin');
await env.cleanup();
console.log('ALL RULES TESTS PASSED');
