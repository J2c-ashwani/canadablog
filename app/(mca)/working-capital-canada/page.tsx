import { MCACommercialPage } from '@/components/mca/MCACommercialPage';

export const metadata = {
  title: 'Working Capital Canada | Small Business Financing | FSI Digital',
  description:
    'Secure working capital in Canada. Compare grants and fast cash advances to improve your cash flow and cover operating expenses.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/working-capital-canada',
  },
};

const ADVANTAGES = [
  'Use funds for any business purpose (payroll, inventory, equipment, tax)',
  'Fast access to liquidity when banks say no',
  'Flexible terms matching your seasonal cash flow',
  'Does not dilute corporate ownership or require board seats',
];

const DISADVANTAGES = [
  'Short repayment terms compared to traditional 5-year loans',
  'Repayments start immediately following funding',
];

const FAQS = [
  {
    q: 'What is working capital used for?',
    a: 'Working capital is used to fund daily operations, bridge seasonal cash gaps, buy inventory, meet payroll, or cover emergency expenses. Unlike equipment finance, it is not restricted to a specific asset.',
  },
  {
    q: 'How much working capital can I qualify for?',
    a: 'Most Canadian partners approve working capital amounts up to 100% to 150% of your average monthly deposits. If you average $30,000/month, you can expect an approval range between $30,000 and $45,000.',
  },
];

const RESOURCES = [
  { name: 'Working Capital Guide', url: '/working-capital-guide' },
  { name: 'How to Prepare Financials', url: '/resources/how-to-prepare-financial-documents' },
  { name: 'Business Cash Advance', url: '/business-cash-advance-canada' },
];

export default function WorkingCapitalPage() {
  return (
    <MCACommercialPage
      keyword="Working Capital Canada"
      title={metadata.title}
      description={metadata.description}
      heroHeadline="Working Capital Canada"
      heroSubheadline="Bridge seasonal sales dips and cover operations with fast, non-dilutive working capital. Up to $250,000 in operational liquidity within 72 hours."
      advantages={ADVANTAGES}
      disadvantages={DISADVANTAGES}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
