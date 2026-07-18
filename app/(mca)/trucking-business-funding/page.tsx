import { MCAIndustryPage } from '@/components/mca/MCAIndustryPage';

export const metadata = {
  title: 'Trucking Business Funding Canada | Transportation Capital | FSI Digital',
  description:
    'Secure working capital for your trucking company in Canada. Fast funding for fuel deposits, fleet maintenance, insurance payments, and expansion.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/trucking-business-funding',
  },
};

const USE_CASES = [
  'Fuel deposits: Cover advance fuel costs for large shipping contracts.',
  'Fleet maintenance: Repair trucks, replace tires, or buy parts to keep rigs road-ready.',
  'Insurance premiums: Pay annual commercial auto liability payments upfront.',
  'Driver payroll: Bridge the cash flow gap between load delivery and invoice payment.',
];

const FAQS = [
  {
    q: 'How do trucking companies qualify for a cash advance?',
    a: 'Underwriters check your average monthly invoice deposits and contract revenue history. If your trucking company deposits at least $10,000/month, you qualify.',
  },
  {
    q: 'What documents are required for trucking companies?',
    a: 'You only need to upload your last 6 months of business bank statements showing freight deposits. No tax returns or equipment assets are required for review.',
  },
];

const RESOURCES = [
  { name: 'Transportation Funding', url: '/transportation-business-funding' },
  { name: 'Working Capital Canada', url: '/working-capital-canada' },
  { name: 'Same Day Funding', url: '/same-day-business-funding' },
];

export default function TruckingFundingPage() {
  return (
    <MCAIndustryPage
      industryName="Trucking"
      heroHeadline="Trucking Business Funding Canada"
      heroSubheadline="Keep your fleet moving and lanes full. Access up to $250,000 in fast, asset-free working capital based on your shipping invoice deposits."
      useCases={USE_CASES}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
