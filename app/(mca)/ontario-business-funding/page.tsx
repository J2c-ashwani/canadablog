import { MCAProvincePage } from '@/components/mca/MCAProvincePage';

export const metadata = {
  title: 'Business Funding Ontario | Small Business Grants & Capital | FSI Digital',
  description:
    'Secure business funding and working capital in Ontario. Access provincial grants, federal subsidies, and fast cash advances for Ontario SMEs.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/ontario-business-funding',
  },
};

const INSIGHTS =
  'Ontario is Canada’s economic engine, hosting over 400,000 small and medium-sized enterprises. The province offers various local grant incentives such as the Regional Development Program, Ontario Trillium Foundation grants, and various sector-specific green initiative credits. However, securing these grants typically takes 3 to 6 months. For businesses needing immediate inventory capital, equipment purchasing, or payroll bridging, revenue-based working capital advances provide access to up to $250,000 within 24 to 72 hours, utilizing monthly bank deposits rather than asset collateral.';

const FAQS = [
  {
    q: 'Can Ontario businesses combine grants with working capital advances?',
    a: 'Yes. Stacking different funding sources is a common strategy. You can use a working capital advance to cover immediate expenses while waiting for provincial grant payouts or SR&ED tax credit refunds.',
  },
  {
    q: 'What are the requirements for Ontario business funding?',
    a: 'Your business must be incorporated or registered in Ontario, have been operating for at least 6 months, and generate a minimum of $10,000 in average monthly checking account deposits.',
  },
];

const RESOURCES = [
  { name: 'Toronto Grants', url: '/grants/on/toronto/restaurants-hospitality' },
  { name: 'Working Capital Canada', url: '/working-capital-canada' },
  { name: 'Apply for Funding', url: '/apply' },
];

export default function OntarioFundingPage() {
  return (
    <MCAProvincePage
      provinceName="Ontario"
      provinceCode="ON"
      heroHeadline="Business Funding Ontario"
      heroSubheadline="Empowering Ontario small businesses with non-repayable grants and fast working capital. Secure up to $250,000 without asset collateral."
      regionalInsights={INSIGHTS}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
