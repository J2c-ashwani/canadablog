import { MCAIndustryPage } from '@/components/mca/MCAIndustryPage';

export const metadata = {
  title: 'Construction Business Funding Canada | Contractor Financing | FSI Digital',
  description:
    'Need working capital for your construction or contracting business in Canada? Secure fast funding for materials, equipment lease, and subcontractor payroll.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/construction-business-funding',
  },
};

const USE_CASES = [
  'Material purchases: Secure lumber, steel, concrete, and supplies upfront before project draws clear.',
  'Subcontractor payroll: Keep crew members paid weekly during long project payment intervals.',
  'Equipment rental: Lease specialized machinery, loaders, or scaffolding for specific bids.',
  'Bid bonding support: Supplement operational cash reserves to secure larger commercial contracts.',
];

const FAQS = [
  {
    q: 'How do construction companies use cash advances?',
    a: 'Construction and trade contractors use advances to purchase materials and fund weekly labor costs upfront. Underwriters review your contract draw deposit history rather than checking real estate assets.',
  },
  {
    q: 'Can seasonal contractors qualify during winter months?',
    a: 'Yes. Our partners look at average annual cash flow deposits rather than a single slow month, making it easier for seasonal contractors to secure capital.',
  },
];

const RESOURCES = [
  { name: 'Working Capital Canada', url: '/working-capital-canada' },
  { name: 'Same Day Funding', url: '/same-day-business-funding' },
  { name: 'Why Applications Get Declined', url: '/why-businesses-get-declined' },
];

export default function ConstructionFundingPage() {
  return (
    <MCAIndustryPage
      industryName="Construction"
      heroHeadline="Construction Business Funding Canada"
      heroSubheadline="Bridge construction draw delays and purchase job-site materials. Access up to $250,000 in fast contracting capital without real estate collateral."
      useCases={USE_CASES}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
