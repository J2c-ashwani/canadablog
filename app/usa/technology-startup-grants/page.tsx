import type { Metadata } from 'next';
import { PriorityResearchLandingPage } from '@/components/editorial/PriorityResearchLandingPage';
import { getPriorityResearchProfile } from '@/lib/editorial/priorityResearch';

const researchProfile = getPriorityResearchProfile('/usa/technology-startup-grants')!;

export const metadata: Metadata = {
  title: researchProfile.seoTitle,
  description: researchProfile.seoDescription,
  keywords: [
    'USA technology startup funding',
    'SBIR STTR funding',
    'federal R&D grants',
    'technology startup grants',
    'America’s Seed Fund',
    'SBIR agency fit',
  ],
  alternates: {
    canonical: 'https://www.fsidigital.ca/usa/technology-startup-grants',
  },
  openGraph: {
    title: researchProfile.seoTitle,
    description: researchProfile.seoDescription,
    url: 'https://www.fsidigital.ca/usa/technology-startup-grants',
    images: ['/og-image.png'],
    type: 'article',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function USATechnologyStartupGrantsPage() {
  return (
    <PriorityResearchLandingPage
      profile={researchProfile}
      eyebrow="U.S. technology funding research"
      title="Federal R&D Funding for Technology Startups"
    />
  );
}
