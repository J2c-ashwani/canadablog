import { MCAIndustryPage } from '@/components/mca/MCAIndustryPage';

export const metadata = {
  title: 'Transportation Business Funding Canada | Fleet Financing | FSI Digital',
  description:
    'Need working capital for your transportation, logistics, or delivery business in Canada? Secure fast funding for fleet operations and fuel.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/transportation-business-funding',
  },
};

const USE_CASES = [
  'Fuel deposits: Fund fleet card fuel deposits to cover cross-border shipping lanes.',
  'Vehicle maintenance: Cover repairs, safety audits, and mechanical tune-ups for transport vans or rigs.',
  'Logistics software: Purchase routing dispatch systems, tracking hardware, or ELD compliance software.',
  'Contract bidding: Maintain strong cash reserves to bid on municipal or corporate shipping contracts.',
];

const FAQS = [
  {
    q: 'How do transportation fleets qualify for cash advances?',
    a: 'Fleets qualify using a Business Cash Advance based on average monthly delivery receipt deposits and freight invoice payments.',
  },
  {
    q: 'Can logistics companies stack funding with equipment leases?',
    a: 'Yes. Merchant Cash Advances are based on bank deposits and do not place liens on vehicles, meaning you can stack them with vehicle leases.',
  },
];

const RESOURCES = [
  { name: 'Trucking Funding', url: '/trucking-business-funding' },
  { name: 'Fast Funding Canada', url: '/fast-business-funding-canada' },
  { name: 'Working Capital Canada', url: '/working-capital-canada' },
];

export default function TransportationFundingPage() {
  return (
    <MCAIndustryPage
      industryName="Transportation"
      heroHeadline="Transportation Business Funding Canada"
      heroSubheadline="Keep your freight moving and deliveries on time. Access up to $250,000 in fast fleet working capital without vehicle asset liens."
      useCases={USE_CASES}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
