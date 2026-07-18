import { MCAResourcePage } from '@/components/mca/MCAResourcePage';

export const metadata = {
  title: 'Merchant Cash Advance Rates Canada | Funding Cost Guide | FSI Digital',
  description:
    'Understand Merchant Cash Advance rates, factors, and fee structures in Canada. Compare funding costs and calculate your total repayment requirements.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/merchant-cash-advance-rates',
  },
};

const CONTENT = `
<h2>How MCA Rates Work in Canada</h2>
<p>Unlike traditional loans that use compounding interest rates (APR), Merchant Cash Advances (MCAs) use fixed <strong>factor rates</strong>. A factor rate is a flat multiplier applied to the advance amount to determine the total repayment fee upfront. Once agreed upon, this rate does not fluctuate.</p>

<h2>Typical Factor Rate Ranges</h2>
<p>In Canada, factor rates typically range from <strong>1.15 to 1.38</strong>. The rate you qualify for depends on several underwriting parameters:
<ul>
  <li><strong>Industry Risk:</strong> Lower risk sectors (like medical or manufacturing) qualify for lower factor rates.</li>
  <li><strong>Deposit Consistency:</strong> Businesses with stable daily cash balances and fewer NSF items secure better terms.</li>
  <li><strong>Time in Business:</strong> Operating history over 2 years unlocks preferred pricing.</li>
</ul>
</p>

<h2>Example of Total Repayment</h2>
<p>If you receive a $50,000 cash advance at a 1.20 factor rate:
<ul>
  <li><strong>Total Repayment:</strong> $60,000 ($50,000 x 1.20)</li>
  <li><strong>Total Cost of Capital:</strong> $10,000</li>
  <li><strong>Holdback Percentage:</strong> Typically 10% to 15% of your daily card sales or deposits will be withheld until the $60,000 is fully repaid.</li>
</ul>
</p>
`;

export default function MCARatesPage() {
  return (
    <MCAResourcePage
      title="Merchant Cash Advance Rates & Costs"
      description={metadata.description}
      readTime="5 min read"
      contentHtml={CONTENT}
    />
  );
}
