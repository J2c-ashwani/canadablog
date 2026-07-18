import { MCAIndustryPage } from '@/components/mca/MCAIndustryPage';

export const metadata = {
  title: 'Manufacturing Business Funding Canada | Factory Capital | FSI Digital',
  description:
    'Need working capital for your manufacturing plant or factory in Canada? Fast funding for raw materials, machinery repair, and shipping.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/manufacturing-business-funding',
  },
};

const USE_CASES = [
  'Raw materials: Purchase metals, plastics, textiles, or chemical inputs in bulk for large purchase orders.',
  'Tooling and machinery: Repair heavy plant machinery, molds, or assembly line gear.',
  'Logistics and shipping: Fund shipping, freight forwarding, and warehouse labor for finished goods.',
  'Invoice bridging: Stabilize operations while waiting for corporate buyers to pay Net-60 or Net-90 invoices.',
];

const FAQS = [
  {
    q: 'How do manufacturing companies use cash advances?',
    a: 'Manufacturers use advances to cover raw material procurement and payroll costs for large contract orders before shipping and invoicing.',
  },
  {
    q: 'What is the maximum limit for manufacturing facilities?',
    a: 'Funding limits are up to $250,000 based on your historical monthly sales deposits. If your average monthly deposits exceed $150,000, you qualify for maximum limits.',
  },
];

const RESOURCES = [
  { name: 'Working Capital Canada', url: '/working-capital-canada' },
  { name: 'Understanding Factor Rates', url: '/resources/understanding-factor-rates' },
  { name: 'Same Day Funding', url: '/same-day-business-funding' },
];

export default function ManufacturingFundingPage() {
  return (
    <MCAIndustryPage
      industryName="Manufacturing"
      heroHeadline="Manufacturing Business Funding Canada"
      heroSubheadline="Keep your production lines running and orders shipping. Get up to $250,000 in raw material and machinery working capital."
      useCases={USE_CASES}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
