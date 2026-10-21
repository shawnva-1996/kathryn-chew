import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { AGENT } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy notice',
  description: `How ${AGENT.name} collects, uses and protects the personal data you share on this website, under Singapore’s Personal Data Protection Act.`,
  path: '/privacy',
});

const UPDATED = '21 October 2026';

export default function PrivacyPage() {
  return (
    <section className="section-tight">
      <div className="wrap narrow">
        <h1 className="display-m">Privacy notice</h1>
        <p className="post-meta">Last updated {UPDATED}</p>
        <div className="prose" style={{ marginTop: 24 }}>
          <p>
            This website is run by {AGENT.name}, {AGENT.title} with {AGENT.agency} (CEA Reg. No. {AGENT.ceaReg}; agency licence{' '}
            {AGENT.agencyLicence}). This notice explains what personal data is collected here and how it is used, in line with Singapore&rsquo;s
            Personal Data Protection Act 2012 (PDPA).
          </p>
          <h2>What is collected</h2>
          <ul>
            <li>
              <strong>When you ask for a free guide:</strong> your name, mobile number and email address, the guide you asked for, the page you
              were on, the time, and the consent wording you agreed to.
            </li>
            <li>
              <strong>When you ask for the sample valuation:</strong> your email address and, if you give them, your name and whether you are
              buying or selling.
            </li>
            <li>
              <strong>When you message on WhatsApp:</strong> whatever you choose to send.
            </li>
            <li>
              <strong>When you browse:</strong> anonymous usage data through Google Analytics (pages viewed, device type, approximate location),
              which uses cookies. You can block these in your browser settings.
            </li>
          </ul>
          <h2>Why it is used</h2>
          <ul>
            <li>To send you the guide or sample you asked for.</li>
            <li>
              To contact you about property by phone, WhatsApp, SMS and email, only if you ticked the consent box. Clear consent given here
              allows contact even if your number is on the Do Not Call Registry; you can withdraw it at any time.
            </li>
            <li>To understand which pages are useful, so the site can improve.</li>
          </ul>
          <p>Your data is not sold or rented to anyone.</p>
          <h2>Where it is kept</h2>
          <p>
            Form details are stored in Google Firebase (Cloud Firestore), which may hold data on servers outside Singapore under Google&rsquo;s
            security and data protection commitments. Only {AGENT.name} can sign in to see them.
          </p>
          <h2>How long it is kept</h2>
          <p>
            Until you ask for it to be deleted, or for as long as it is needed for the purposes above and for legal or regulatory reasons. Leads
            with no contact for 24 months are deleted.
          </p>
          <h2>Your choices</h2>
          <ul>
            <li>Withdraw consent to be contacted at any time. Reply &ldquo;STOP&rdquo; on WhatsApp or SMS, or use the contact below.</li>
            <li>Ask to see or correct the personal data held about you.</li>
            <li>Ask for your personal data to be deleted.</li>
          </ul>
          <h2>Contact</h2>
          <p>
            For any privacy question or request, WhatsApp or call {AGENT.name} on {AGENT.phoneDisplay}. Requests are answered within 30 days.
          </p>
        </div>
      </div>
    </section>
  );
}
