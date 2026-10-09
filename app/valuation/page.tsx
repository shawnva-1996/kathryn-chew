import type { Metadata } from 'next';
import { SampleReport } from '@/components/SampleReport';
import { SampleRequestForm } from '@/components/SampleRequestForm';
import { WhatsAppLink } from '@/components/WhatsAppLink';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'A property valuation summary you can actually read',
  description:
    'See a sample valuation summary for a Singapore HDB flat: what it is worth, an entry plan for buyers and an exit plan for sellers, in plain language. Free sample by email.',
  path: '/valuation',
});

export default function ValuationPage() {
  return (
    <>
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <h1 className="display-l" style={{ maxWidth: '16ch' }}>
            A valuation summary you can actually read.
          </h1>
          <p className="lede">
            Most valuation reports are pages of tables and charts. Kathryn&rsquo;s summary turns them into three plain answers: what
            the property is worth, how to get in, and how to get out.
          </p>
        </div>
      </section>

      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="wrap valuation-grid">
          <div>
            <SampleReport />
          </div>

          <aside className="form-card" id="sample-form" aria-labelledby="form-title">
            <h2 id="form-title">Get the full sample summary</h2>
            <p className="muted" style={{ margin: 0 }}>
              One property, explained from start to finish: the value, the entry plan and the exit plan. Sent to your inbox.
            </p>
            <SampleRequestForm />
            <p className="small muted" style={{ marginTop: 18, marginBottom: 0 }}>
              Want one for your own home instead?{' '}
              <WhatsAppLink topic="valuation" className="link-arrow">
                WhatsApp Kathryn
              </WhatsAppLink>
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
