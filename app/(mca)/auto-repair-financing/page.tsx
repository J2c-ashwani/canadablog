import { MCAIndustryPage } from '@/components/mca/MCAIndustryPage';

export const metadata = {
  title: 'Auto Repair Shop Financing Canada | Garage Funding | FSI Digital',
  description:
    'Need working capital for your auto repair shop or garage in Canada? Secure fast funding for diagnostic tools, lifts, bulk parts, and payroll.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/auto-repair-financing',
  },
};

const USE_CASES = [
  'Diagnostic computers: Purchase the latest vehicle OBD scanners and tuning software.',
  'Garage equipment: Install or upgrade hydraulic vehicle lifts, tire changers, or air compressors.',
  'Bulk parts ordering: Stock high-turnover items like tires, filters, oils, and brake pads upfront.',
  'Seasonal technician hiring: Scale up your crew of certified mechanics ahead of seasonal tire switches.',
];

const FAQS = [
  {
    q: 'How do auto repair garages secure working capital?',
    a: 'Auto repair shops qualify using a Merchant Cash Advance based on your credit/debit register receipts and local fleet repair contract deposits.',
  },
  {
    q: 'Can a repair shop owner with average credit qualify?',
    a: 'Yes. Auto repair is considered an essential service with stable revenue. Credit score is secondary; underwriters focus on monthly garage revenue consistency.',
  },
];

const RESOURCES = [
  { name: 'Business Cash Advance', url: '/business-cash-advance-canada' },
  { name: 'Fast Funding Canada', url: '/fast-business-funding-canada' },
  { name: 'Why Applications Get Declined', url: '/why-businesses-get-declined' },
];

export default function AutoRepairFinancingPage() {
  return (
    <MCAIndustryPage
      industryName="Auto Repair"
      heroHeadline="Auto Repair Shop Financing Canada"
      heroSubheadline="Keep your bays busy and clients on the road. Get up to $250,000 in fast, collateral-free funding based on garage sales."
      useCases={USE_CASES}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
