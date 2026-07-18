import { MCAResourcePage } from '@/components/mca/MCAResourcePage';

export const metadata = {
  title: 'Understanding Factor Rates vs APR | Business Cash Advance Guide',
  description:
    'Learn what a factor rate is, how it differs from traditional interest (APR), and how to calculate the total cost of a Merchant Cash Advance.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/resources/understanding-factor-rates',
  },
};

const CONTENT = `
<h2>What is a Factor Rate?</h2>
<p>Unlike traditional business bank loans that express costs as an annual percentage rate (APR) with compounding interest over years, Merchant Cash Advances (MCAs) express costs as a fixed factor rate decimal (typically between 1.18 and 1.35).</p>

<h2>How to Calculate Total Cost</h2>
<p>Total cost is calculated upfront and remains fixed, regardless of how quickly or slowly you fulfill the advance. The formula is simple:</p>
<pre>Advance Amount x Factor Rate = Total Repayment Amount</pre>
<p>For example, if you secure an advance of $30,000 with a factor rate of 1.22, your total repayment is $36,600 ($30,000 x 1.22). Your cost of capital is exactly $6,600.</p>

<h2>Factor Rates vs. APR</h2>
<ul>
  <li><strong>Fixed Cost:</strong> Factor rate cost does not change over time. APR compounding means costs rise if payment is delayed.</li>
  <li><strong>Daily Flex:</strong> MCA repayments are tied to a percentage of sales. If sales drop, daily payments decrease, protecting cash flow. Traditional loans demand a fixed monthly payment regardless of sales.</li>
  <li><strong>Term Length:</strong> MCAs are short-term (typically 3–12 months). Traditional bank loans have multi-year terms.</li>
</ul>
`;

export default function FactorRatesPage() {
  return (
    <MCAResourcePage
      title="Understanding Factor Rates vs Traditional APR"
      description={metadata.description}
      readTime="5 min read"
      contentHtml={CONTENT}
    />
  );
}
