import type { Metadata } from 'next';
import TestimonialsClient from './TestimonialsClient';

export const metadata: Metadata = {
  title: 'Customer Stories & Reviews | FSI Digital Funding Reports',
  description:
    'Read what Canadian business owners say about FSI Digital funding reports and eligibility assessments. Real outcomes, real businesses.',
  alternates: { canonical: 'https://www.fsidigital.ca/testimonials' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Customer Stories & Reviews | FSI Digital Funding Reports',
    description:
      'Read what Canadian business owners say about FSI Digital funding reports and eligibility assessments. Real outcomes, real businesses.',
    url: 'https://www.fsidigital.ca/testimonials',
    type: 'website',
  },
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
