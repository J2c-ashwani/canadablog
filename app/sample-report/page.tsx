import type { Metadata } from 'next';
import SampleReportClient from './SampleReportClient';

export const metadata: Metadata = {
  title: 'Sample Funding Report | See What You Get Before You Buy | FSI Digital',
  description:
    'Preview exactly what is inside the FSI Digital Funding Match Report, Action Plan, and Complete Bundle before purchasing. Real structure, real format, real value.',
  alternates: { canonical: 'https://www.fsidigital.ca/sample-report' },
  robots: { index: true, follow: true },
};

export default function SampleReportPage() {
  return <SampleReportClient />;
}
