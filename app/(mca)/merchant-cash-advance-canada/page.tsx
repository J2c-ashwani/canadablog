import { MCACommercialPage } from '@/components/mca/MCACommercialPage';

export const metadata = {
  title: 'Merchant Cash Advance Canada | Fast Working Capital | FSI Digital',
  description:
    'Secure a Merchant Cash Advance (MCA) in Canada. Get fast, collateral-free working capital based on your future card sales and deposits. Apply in 3 minutes.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/merchant-cash-advance-canada',
  },
};

const ADVANTAGES = [
  'Extremely fast approvals — decision in 24–72 hours',
  'No asset collateral or personal guarantees required',
  'Payments adjust automatically to your daily credit/debit card revenue',
  'No compound interest — fixed factor rate agreed upfront',
  'Poor credit history is acceptable if business revenue is strong',
];

const DISADVANTAGES = [
  'Higher APR compared to traditional long-term bank loans',
  'Frequent daily or weekly automated repayment deductions',
  'Does not build traditional business credit scores',
];

const FAQS = [
  {
    q: 'How does a Merchant Cash Advance differ from a business loan?',
    a: 'A Merchant Cash Advance (MCA) is not a loan. It is the purchase of a portion of your future card receivables or bank deposits at a discount. Because of this, it does not carry an interest rate (APR) but rather a fixed factor rate, and repayments flex according to your daily credit card sales.',
  },
  {
    q: 'What is a factor rate?',
    a: 'A factor rate is a decimal multiplier used to determine the total cost of the advance. For example, if you receive $50,000 with a factor rate of 1.22, you will repay a total of $61,000 ($50,000 x 1.22). This amount is fixed and does not change based on how long it takes to repay.',
  },
  {
    q: 'Will my credit score be checked?',
    a: 'We perform a soft credit check that has zero impact on your credit score. Underwriters prioritize your average monthly deposits and business consistency over personal credit history.',
  },
];

const RESOURCES = [
  { name: 'How MCA Works', url: '/how-merchant-cash-advance-works' },
  { name: 'MCA vs Business Loan', url: '/merchant-cash-advance-vs-business-loan' },
  { name: 'Business Funding Eligibility', url: '/funding-eligibility-guide' },
];

export default function MerchantCashAdvancePage() {
  return (
    <MCACommercialPage
      keyword="Merchant Cash Advance Canada"
      title={metadata.title}
      description={metadata.description}
      heroHeadline="Merchant Cash Advance Canada"
      heroSubheadline="Leverage your future sales deposits to unlock immediate working capital today. Up to $250,000 with no collateral and decision in 24–72 hours."
      advantages={ADVANTAGES}
      disadvantages={DISADVANTAGES}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
