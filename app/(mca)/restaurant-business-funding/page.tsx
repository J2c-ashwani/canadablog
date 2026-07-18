import { MCAIndustryPage } from '@/components/mca/MCAIndustryPage';

export const metadata = {
  title: 'Restaurant Business Funding Canada | Fast Restaurant MCA | FSI Digital',
  description:
    'Need funding for your restaurant in Canada? Secure fast working capital to purchase inventory, upgrade kitchen equipment, or cover payroll gaps.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/restaurant-business-funding',
  },
};

const USE_CASES = [
  'Inventory purchasing: Cover bulk orders of food, beverages, and seasonal ingredients.',
  'Kitchen equipment upgrades: Repair or replace ovens, refrigerators, ranges, or POS systems.',
  'Payroll management: Stabilize cash flow during slower periods or seasonal shifts.',
  'Renovations & expansion: Upgrade dining rooms, expand outdoor patios, or open new locations.',
];

const FAQS = [
  {
    q: 'How does restaurant cash advance funding work?',
    a: 'Restaurant funding is structured as a Merchant Cash Advance (MCA). The funding partner advances you a lump sum and retrieves repayment as a fixed percentage of your daily credit and debit card sales, meaning you pay back less on slower days.',
  },
  {
    q: 'Can a restaurant with bad credit get approved?',
    a: 'Yes. Since underwriting is based on your daily food and beverage deposit history, restaurants with weak credit but consistent customer sales have excellent approval rates.',
  },
];

const RESOURCES = [
  { name: 'Fast Funding Canada', url: '/fast-business-funding-canada' },
  { name: 'Working Capital Canada', url: '/working-capital-canada' },
  { name: 'Same Day Funding', url: '/same-day-business-funding' },
];

export default function RestaurantFundingPage() {
  return (
    <MCAIndustryPage
      industryName="Restaurant"
      heroHeadline="Restaurant Business Funding Canada"
      heroSubheadline="Keep your kitchen running and tables full. Secure up to $250,000 in fast, collateral-free cash advances based on your monthly food and beverage sales."
      useCases={USE_CASES}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
