import type { Metadata } from 'next';
import CustomerSuccessClient from './CustomerSuccessClient';

export const metadata: Metadata = {
  title: 'Customer Case Studies & Success Stories | FSI Digital',
  description: 'Read detailed case studies of Canadian businesses using FSI Digital to identify and stack funding programs, SR&ED tax credits, and government grants.',
  alternates: { canonical: 'https://www.fsidigital.ca/customer-success' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Customer Case Studies & Success Stories | FSI Digital',
    description: 'Read detailed case studies of Canadian businesses using FSI Digital to identify and stack funding programs, SR&ED tax credits, and government grants.',
    url: 'https://www.fsidigital.ca/customer-success',
    type: 'website',
  },
};

export default function CustomerSuccessPage() {
  return <CustomerSuccessClient />;
}
