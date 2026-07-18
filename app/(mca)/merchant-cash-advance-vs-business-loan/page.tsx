import { MCAResourcePage } from '@/components/mca/MCAResourcePage';

export const metadata = {
  title: 'Merchant Cash Advance vs Business Loan Canada | FSI Digital',
  description:
    'Compare Merchant Cash Advances (MCAs) against traditional small business loans in Canada. Learn the pros, cons, costs, and qualification requirements.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/merchant-cash-advance-vs-business-loan',
  },
};

const CONTENT = `
<h2>The Core Difference</h2>
<p>The primary difference lies in the legal structure of the transaction. A <strong>Business Loan</strong> is debt that you repay over a fixed term with interest. A <strong>Merchant Cash Advance</strong> is the purchase of your future receivables at a discount; it is not a loan, but a purchase agreement.</p>

<h2>Comparison Matrix</h2>
<table class="min-w-full border-collapse border border-gray-200 text-xs my-6">
  <thead>
    <tr class="bg-gray-100">
      <th class="border border-gray-200 px-4 py-2 text-left">Feature</th>
      <th class="border border-gray-200 px-4 py-2 text-left">Business Loan</th>
      <th class="border border-gray-200 px-4 py-2 text-left">Merchant Cash Advance</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-gray-200 px-4 py-2 font-bold">Pricing structure</td>
      <td class="border border-gray-200 px-4 py-2">Interest Rate (APR)</td>
      <td class="border border-gray-200 px-4 py-2">Fixed Factor Rate</td>
    </tr>
    <tr>
      <td class="border border-gray-200 px-4 py-2 font-bold">Repayment terms</td>
      <td class="border border-gray-200 px-4 py-2">Fixed monthly payments</td>
      <td class="border border-gray-200 px-4 py-2">Flexible daily/weekly % of sales</td>
    </tr>
    <tr>
      <td class="border border-gray-200 px-4 py-2 font-bold">Collateral needed</td>
      <td class="border border-gray-200 px-4 py-2">Yes (Assets, personal guarantee)</td>
      <td class="border border-gray-200 px-4 py-2">None required</td>
    </tr>
    <tr>
      <td class="border border-gray-200 px-4 py-2 font-bold">Approval speed</td>
      <td class="border border-gray-200 px-4 py-2">2 to 8 weeks</td>
      <td class="border border-gray-200 px-4 py-2">24 to 72 hours</td>
    </tr>
    <tr>
      <td class="border border-gray-200 px-4 py-2 font-bold">Credit requirement</td>
      <td class="border border-gray-200 px-4 py-2">Excellent (680+)</td>
      <td class="border border-gray-200 px-4 py-2">Strong revenue (Credit is secondary)</td>
    </tr>
  </tbody>
</table>

<h2>Which Should You Choose?</h2>
<h3>Choose a Business Loan if:</h3>
<ul>
  <li>You need long-term capital (2+ years) to fund major real estate purchases.</li>
  <li>You have pristine business credit and can wait several weeks for underwriting.</li>
  <li>You want the lowest possible cost of capital.</li>
</ul>

<h3>Choose a Merchant Cash Advance if:</h3>
<ul>
  <li>You need immediate capital (within 24–72 hours) to cover emergency cash flow gaps or buy discounted inventory.</li>
  <li>You do not want to pledge personal or business assets as collateral.</li>
  <li>Your revenue is strong but your credit score prevents traditional bank approvals.</li>
</ul>
`;

export default function MCAvsLoanPage() {
  return (
    <MCAResourcePage
      title="Merchant Cash Advance vs Business Loan"
      description={metadata.description}
      readTime="6 min read"
      contentHtml={CONTENT}
    />
  );
}
