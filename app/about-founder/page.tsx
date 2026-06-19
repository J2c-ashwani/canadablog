import type { Metadata } from 'next';
import AboutFounderClient from './AboutFounderClient';

export const metadata: Metadata = {
  title: 'About the Founder | Ashwani Kumar | FSI Digital',
  description: 'Learn about the founder of FSI Digital, Ashwani Kumar, and the mission to simplify government funding, SR&ED tax credits, and grants for Canadian businesses.',
  alternates: { canonical: 'https://www.fsidigital.ca/about-founder' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'About the Founder | Ashwani Kumar | FSI Digital',
    description: 'Learn about the founder of FSI Digital, Ashwani Kumar, and the mission to simplify government funding, SR&ED tax credits, and grants for Canadian businesses.',
    url: 'https://www.fsidigital.ca/about-founder',
    type: 'website',
  },
};

export default function AboutFounderPage() {
  return <AboutFounderClient />;
}
