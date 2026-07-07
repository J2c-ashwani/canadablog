import type { Metadata } from 'next';
import AuditClient from './AuditClient';

export const metadata: Metadata = {
  title: 'Funding Strategy Audit — $199 | FSI Digital',
  description: 'Book a paid 30-minute Funding Strategy Audit. Pay first, then immediately book your call. An FSI advisor reviews your eligibility, identifies your top 3 programs, and builds a custom application roadmap.',
  alternates: { canonical: 'https://www.fsidigital.ca/audit' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Funding Strategy Audit — $199 | FSI Digital',
    description: 'Pay first. Book your call instantly. An FSI advisor reviews 1,200+ active programs and delivers a custom Funding Eligibility Report before your 30-min strategy call.',
    url: 'https://www.fsidigital.ca/audit',
    type: 'website',
  },
};

export default function AuditPage() {
  return <AuditClient />;
}
