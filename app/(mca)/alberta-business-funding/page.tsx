import { MCAProvincePage } from '@/components/mca/MCAProvincePage';

export const metadata = {
  title: 'Business Funding Alberta | Small Business Grants & Capital | FSI Digital',
  description:
    'Secure business funding and working capital in Alberta. Access Alberta small business grants, energy innovation credits, and fast cash advances.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/alberta-business-funding',
  },
};

const INSIGHTS =
  'Alberta’s business community spans traditional energy, agriculture, manufacturing, and a rapidly expanding technology sector. The province offers various local growth incentives, including Alberta Innovates programs and PrairiesCan grants. However, waiting for government reviews can lead to missed operational opportunities. Revenue-based working capital advances allow Alberta businesses to leverage their monthly deposit history to secure up to $250,000 in operational liquidity within 24 to 72 hours, with no asset collateral requirements.';

const FAQS = [
  {
    q: 'Do Alberta oil and gas support services qualify for cash advances?',
    a: 'Yes. Businesses in the oil & gas service sector, trucking, construction, and manufacturing qualify for working capital advances based on their monthly deposit history.',
  },
  {
    q: 'What is the minimum criteria for Alberta business funding?',
    a: 'Your business must be registered in Alberta, have been operating for at least 6 months, and generate a minimum of $10,000 in average monthly deposits.',
  },
];

const RESOURCES = [
  { name: 'Alberta Grants', url: '/canada/alberta' },
  { name: 'Working Capital Canada', url: '/working-capital-canada' },
  { name: 'Apply for Alberta Funding', url: '/apply' },
];

export default function AlbertaFundingPage() {
  return (
    <MCAProvincePage
      provinceName="Alberta"
      provinceCode="AB"
      heroHeadline="Business Funding Alberta"
      heroSubheadline="Accelerating growth for Alberta businesses. Get matched with non-repayable grants and fast working capital up to $250,000."
      regionalInsights={INSIGHTS}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
