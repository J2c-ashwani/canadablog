import { MCACommercialPage } from '@/components/mca/MCACommercialPage';

export const metadata = {
  title: 'Fast Business Funding Canada | Quick Capital Solutions | FSI Digital',
  description:
    'Need fast business funding in Canada? Apply online and get approved for up to $250,000 in working capital within 24 to 72 hours.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/fast-business-funding-canada',
  },
};

const ADVANTAGES = [
  'Quick online assessment takes under 3 minutes',
  'Approved capital is wired within 24 to 72 hours',
  'No business plans or tax returns required for first-stage review',
  'Flexible qualification based on cash flow deposits',
];

const DISADVANTAGES = [
  'Underwriting requires bank statement uploads (mandatory)',
  'Not available to businesses with frequent negative daily balances',
];

const FAQS = [
  {
    q: 'How fast is the funding process?',
    a: 'Once you submit your application and upload your 6 months of bank statements, our funding partner completes the review and reaches an approval decision within 24 hours. Funding is wired directly to your account immediately upon signing.',
  },
  {
    q: 'Does checking eligibility impact my credit score?',
    a: 'No. Checking your eligibility through our portal only uses soft credit checks which have zero impact on your personal or business credit score.',
  },
];

const RESOURCES = [
  { name: 'Fast Funding Canada', url: '/fast-business-funding-canada' },
  { name: 'Same Day Funding', url: '/same-day-business-funding' },
  { name: 'Understanding Factor Rates', url: '/resources/understanding-factor-rates' },
];

export default function FastBusinessFundingPage() {
  return (
    <MCACommercialPage
      keyword="Fast Business Funding Canada"
      title={metadata.title}
      description={metadata.description}
      heroHeadline="Fast Business Funding Canada"
      heroSubheadline="When opportunities or emergencies arise, don't wait weeks for banks. Access up to $250,000 in capital with decisions in under 24 hours."
      advantages={ADVANTAGES}
      disadvantages={DISADVANTAGES}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
