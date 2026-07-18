import { MCAResourcePage } from '@/components/mca/MCAResourcePage';

export const metadata = {
  title: 'Business Funding Eligibility Guide Canada | FSI Digital',
  description:
    'A comprehensive guide detailing business funding eligibility requirements for Canadian startups and established small businesses.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/funding-eligibility-guide',
  },
};

const CONTENT = `
<h2>Eligibility Parameters Explained</h2>
<p>To qualify for business funding in Canada, your enterprise must meet specific financial, operational, and geographical parameters. We break down the core eligibility requirements below.</p>

<h2>1. Location and Incorporation</h2>
<p>Your business must be legally registered and active in Canada. While government grants often require full incorporation, alternative working capital solutions accept sole proprietorships, partnerships, and corporations.</p>

<h2>2. Average Monthly Revenue</h2>
<p>For revenue-based advances and cash flow financing, underwriters require a minimum average of <strong>$10,000 in monthly deposits</strong> into your business checking account. This shows you have the cash flow consistency needed to support repayments.</p>

<h2>3. Time in Business</h2>
<p>A minimum of <strong>6 months in active operation</strong> is required for working capital advances. For government grants, pre-revenue startups can qualify if they are developing novel technology or intellectual property.</p>

<h2>4. Bank Account Health</h2>
<p>Underwriters analyze your business bank statement health. Having more than 3 NSF (non-sufficient funds) returns in the last 90 days or maintaining negative balances will decrease your probability of approval.</p>
`;

export default function FundingEligibilityGuidePage() {
  return (
    <MCAResourcePage
      title="Business Funding Eligibility Guide"
      description={metadata.description}
      readTime="5 min read"
      contentHtml={CONTENT}
    />
  );
}
