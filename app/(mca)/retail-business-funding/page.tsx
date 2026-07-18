import { MCAIndustryPage } from '@/components/mca/MCAIndustryPage';

export const metadata = {
  title: 'Retail Business Funding Canada | Retail Store MCA | FSI Digital',
  description:
    'Need working capital for your retail store in Canada? Secure fast funding to buy inventory, cover seasonal expenses, or expand retail locations.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/retail-business-funding',
  },
};

const USE_CASES = [
  'Inventory restocking: Buy bulk inventory ahead of peak shopping seasons (holidays, summer).',
  'Store layout upgrades: Refresh store fixtures, displays, window signage, or POS hardware.',
  'Marketing campaigns: Boost localized digital advertising to drive in-store traffic.',
  'Lease deposits: Secure deposit capital for secondary storefronts or warehouse expansion.',
];

const FAQS = [
  {
    q: 'How does retail store cash advance funding work?',
    a: 'Retail funding utilizes a standard Merchant Cash Advance (MCA) where payments are tied directly to your daily credit and debit card cash register receipt deposits.',
  },
  {
    q: 'What is the minimum sales requirement for retail stores?',
    a: 'Your retail storefront or e-commerce shop must generate at least $10,000 in monthly credit card sales and deposits to qualify for fast-track processing.',
  },
];

const RESOURCES = [
  { name: 'Business Cash Advance', url: '/business-cash-advance-canada' },
  { name: 'Working Capital Canada', url: '/working-capital-canada' },
  { name: 'Fast Business Funding', url: '/fast-business-funding-canada' },
];

export default function RetailFundingPage() {
  return (
    <MCAIndustryPage
      industryName="Retail"
      heroHeadline="Retail Business Funding Canada"
      heroSubheadline="Keep your shelves stocked and registers ringing. Get up to $250,000 in inventory financing and working capital based on store receipts."
      useCases={USE_CASES}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
