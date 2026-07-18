import { MCACommercialPage } from '@/components/mca/MCACommercialPage';

export const metadata = {
  title: 'Business Cash Advance Canada | Fast Working Capital | FSI Digital',
  description:
    'Secure a Business Cash Advance in Canada. Flexible working capital based on your monthly business bank deposits. Simple online application.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/business-cash-advance-canada',
  },
};

const ADVANTAGES = [
  'Simple application — minimal documentation required',
  'Repayments match your cash flow (more sales = faster repayment, less sales = slower)',
  'Approved limits are based on overall monthly bank deposits',
  'Zero asset collateral required to secure funds',
];

const DISADVANTAGES = [
  'Deductions are automated directly from your business checking account',
  'Not suitable for pre-revenue startups under 6 months old',
];

const FAQS = [
  {
    q: 'Can I qualify if I do not accept credit cards?',
    a: 'Yes. A Business Cash Advance evaluates all monthly deposits into your business checking account, including ACH, bank transfers, cash, check, and debit card transactions.',
  },
  {
    q: 'How does repayment work?',
    a: 'Repayments are calculated as a fixed percentage of your monthly sales deposits. The funding partner automatically collects this set percentage (typically 8% to 15%) via daily or weekly bank withdrawals (ACH/EFT) until the agreed sum is fulfilled.',
  },
];

const RESOURCES = [
  { name: 'Same Day Funding', url: '/same-day-business-funding' },
  { name: 'Working Capital Canada', url: '/working-capital-canada' },
  { name: 'Why Applications Get Declined', url: '/why-businesses-get-declined' },
];

export default function BusinessCashAdvancePage() {
  return (
    <MCACommercialPage
      keyword="Business Cash Advance Canada"
      title={metadata.title}
      description={metadata.description}
      heroHeadline="Business Cash Advance Canada"
      heroSubheadline="Access flexible working capital based on all bank deposits, not just credit cards. No asset security required, funds cleared in 24–72 hours."
      advantages={ADVANTAGES}
      disadvantages={DISADVANTAGES}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
