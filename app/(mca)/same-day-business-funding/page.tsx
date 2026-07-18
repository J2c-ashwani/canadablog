import { MCACommercialPage } from '@/components/mca/MCACommercialPage';

export const metadata = {
  title: 'Same Day Business Funding Canada | Emergency Capital | FSI Digital',
  description:
    'Need same day business funding in Canada? Apply now for emergency working capital. Approval decision within 24 hours.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/same-day-business-funding',
  },
};

const ADVANTAGES = [
  'Optimal for emergency expenses, payroll gaps, or sudden inventory needs',
  'Automated review allows for same-day underwriting review',
  'High approval rates for established cash-flowing businesses',
  'Documents can be uploaded in under 2 minutes',
];

const DISADVANTAGES = [
  'Mandatory submission of the latest 6 months of electronic PDF bank statements',
  'Higher factor rates may apply to rush approvals',
];

const FAQS = [
  {
    q: 'Can I get funded on the exact same day I apply?',
    a: 'While same-day funding is possible if your application and clean PDF statements are submitted before 10:00 AM EST on a business day, most files clear and wire within 24 to 48 hours.',
  },
  {
    q: 'What is required for a same-day review?',
    a: 'You must provide accurate contact details, complete step 1 & 2 of our application form, and upload clean electronic PDF bank statements (no pictures or print scans) for the last 6 consecutive months.',
  },
];

const RESOURCES = [
  { name: 'Fast Funding', url: '/fast-business-funding-canada' },
  { name: 'Why Applications Get Declined', url: '/why-businesses-get-declined' },
  { name: 'Business Funding Checklist', url: '/resources/business-funding-checklist' },
];

export default function SameDayBusinessFundingPage() {
  return (
    <MCACommercialPage
      keyword="Same Day Business Funding Canada"
      title={metadata.title}
      description={metadata.description}
      heroHeadline="Same Day Business Funding Canada"
      heroSubheadline="Solve emergency cash flow issues instantly. Fast-track underwriting on all applications submitted before 10:00 AM EST."
      advantages={ADVANTAGES}
      disadvantages={DISADVANTAGES}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
