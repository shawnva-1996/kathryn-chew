import type { Metadata } from 'next';
import { AdminLeads } from '@/components/AdminLeads';

export const metadata: Metadata = {
  title: 'Leads',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <section className="section-tight">
      <div className="wrap">
        <h1 className="display-m">Leads</h1>
        <AdminLeads />
      </div>
    </section>
  );
}
