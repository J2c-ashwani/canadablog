import { MCAIndustryPage } from '@/components/mca/MCAIndustryPage';

export const metadata = {
  title: 'Healthcare Business Funding Canada | Medical Clinic Financing | FSI Digital',
  description:
    'Need working capital for your medical clinic, dental practice, or healthcare facility in Canada? Fast funding for medical supplies, equipment, and operations.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/healthcare-business-funding',
  },
};

const USE_CASES = [
  'Medical supplies: Stock dental molds, syringes, PPE, and prescription inventory.',
  'Specialized equipment: Purchase or repair X-ray machines, chairs, lasers, or diagnostic tools.',
  'Insurance draw bridging: Keep payroll and operations stable while waiting for provincial health insurance payouts.',
  'Office expansion: Renovate patient waiting rooms or add treatment rooms to increase client capacity.',
];

const FAQS = [
  {
    q: 'Do medical practices qualify for priority score boosts?',
    a: 'Yes. Medical, dental, and healthcare practices are low-risk sectors. Because of their stable deposit history, they receive priority underwriting reviews and lower factor rates.',
  },
  {
    q: 'Can private practitioners qualify?',
    a: 'Yes. As long as your private practice, chiropractic clinic, or dental office is registered in Canada and deposits at least $10,000/month, you qualify.',
  },
];

const RESOURCES = [
  { name: 'Working Capital Canada', url: '/working-capital-canada' },
  { name: 'Funding Eligibility Guide', url: '/funding-eligibility-guide' },
  { name: 'Fast Funding Canada', url: '/fast-business-funding-canada' },
];

export default function HealthcareFundingPage() {
  return (
    <MCAIndustryPage
      industryName="Healthcare"
      heroHeadline="Healthcare Business Funding Canada"
      heroSubheadline="Focus on patient care, not cash flow delays. Secure up to $250,000 in fast, collateral-free practice capital with decisions in under 24 hours."
      useCases={USE_CASES}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
