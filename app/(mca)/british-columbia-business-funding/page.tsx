import { MCAProvincePage } from '@/components/mca/MCAProvincePage';

export const metadata = {
  title: 'Business Funding British Columbia | BC Small Business Grants | FSI Digital',
  description:
    'Secure business funding and working capital in British Columbia. Access BC small business grants, PacifiCan subsidies, and fast cash advances.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/british-columbia-business-funding',
  },
};

const INSIGHTS =
  'British Columbia boasts a diverse economy with strong representation in technology, tourism, agriculture, and forestry. BC businesses can access regional support programs through PacifiCan and various provincial hiring credits. Because government-managed grants take months to approve, BC business owners frequently leverage revenue-based working capital advances to secure cash reserves within 24 to 72 hours, using their monthly sales volume to qualify rather than pledging real estate or personal assets.';

const FAQS = [
  {
    q: 'Are BC sole proprietorships eligible for funding?',
    a: 'Yes. While many government grants require incorporation, our working capital advances are available to both sole proprietorships and corporations, provided you meet our monthly deposit requirements.',
  },
  {
    q: 'How fast can a BC business receive funds?',
    a: 'Once your application is submitted and your last 6 months of bank statements are uploaded, reviews are completed within 24 hours. The approved funds are wired directly to your BC business bank account.',
  },
];

const RESOURCES = [
  { name: 'Vancouver Grants', url: '/grants/bc/vancouver/women-entrepreneurs' },
  { name: 'Working Capital Canada', url: '/working-capital-canada' },
  { name: 'Apply for BC Funding', url: '/apply' },
];

export default function BCFundingPage() {
  return (
    <MCAProvincePage
      provinceName="British Columbia"
      provinceCode="BC"
      heroHeadline="Business Funding BC"
      heroSubheadline="Helping British Columbia businesses scale with non-repayable grants and fast working capital. Secure up to $250,000 based on monthly sales deposits."
      regionalInsights={INSIGHTS}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
