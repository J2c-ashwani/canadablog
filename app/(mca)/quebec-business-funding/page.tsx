import { MCAProvincePage } from '@/components/mca/MCAProvincePage';

export const metadata = {
  title: 'Business Funding Quebec | Subventions et Capital PME | FSI Digital',
  description:
    'Secure business funding and working capital in Quebec. Access Quebec SME grants, federal subsidies, and fast cash advances. Services in English & French.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/quebec-business-funding',
  },
};

const INSIGHTS =
  'Quebec is home to a highly innovative business ecosystem with robust support from Investissement Québec and various regional innovation credits. While provincial grants are excellent for long-term growth, the administrative timeline can be slow. For Quebec PMEs needing immediate inventory capital, equipment purchasing, or cash flow bridging, revenue-based working capital advances offer access to up to $250,000 within 24 to 72 hours, using monthly deposits instead of traditional asset collateral.';

const FAQS = [
  {
    q: 'Can Quebec PMEs combine provincial grants with cash advances?',
    a: 'Yes. Stacking different funding sources is standard practice. You can use working capital to fund immediate inventory or payroll needs while awaiting reimbursement from provincial grant programs or SR&ED tax credits.',
  },
  {
    q: 'What are the eligibility requirements in Quebec?',
    a: 'Your business must be registered in Quebec, have been active for at least 6 months, and generate a minimum of $10,000 in average monthly deposits.',
  },
];

const RESOURCES = [
  { name: 'Quebec Grants Guide', url: '/blog/quebec-small-business-grants-guide' },
  { name: 'Working Capital Canada', url: '/working-capital-canada' },
  { name: 'Apply for Quebec Funding', url: '/apply' },
];

export default function QuebecFundingPage() {
  return (
    <MCAProvincePage
      provinceName="Quebec"
      provinceCode="QC"
      heroHeadline="Business Funding Quebec"
      heroSubheadline="Empowering Quebec PMEs with non-repayable grants and fast working capital. Secure up to $250,000 based on monthly sales deposits."
      regionalInsights={INSIGHTS}
      faqs={FAQS}
      relatedResources={RESOURCES}
    />
  );
}
