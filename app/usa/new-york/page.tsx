import type { Metadata } from 'next';
import { PriorityResearchLandingPage } from '@/components/editorial/PriorityResearchLandingPage';
import { getPriorityResearchProfile } from '@/lib/editorial/priorityResearch';

const researchProfile = getPriorityResearchProfile('/usa/new-york')!;

export const metadata: Metadata = {
  title: researchProfile.seoTitle,
  description: researchProfile.seoDescription,
  keywords: [
    'New York business grants 2026',
    'New York state funding startup',
    'START-UP NY grants',
    'Excelsior Jobs Tax Credit',
    'NY Pre-Seed Fund',
    'New York small business grants',
    'NYC business grants',
    'upstate New York startup funding',
    'NYBDC loans',
  ],
  alternates: {
    canonical: 'https://www.fsidigital.ca/usa/new-york',
  },
  openGraph: {
    title: researchProfile.seoTitle,
    description: researchProfile.seoDescription,
    url: 'https://www.fsidigital.ca/usa/new-york',
    images: ['/og-image.png'],
    type: 'article',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function NewYorkGrantsPage() {
  return (
    <PriorityResearchLandingPage
      profile={researchProfile}
      eyebrow="New York business funding research"
      title="New York Business Grants & Incentives"
    />
  );
}
