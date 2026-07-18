import { MCAResourcePage } from '@/components/mca/MCAResourcePage';

export const metadata = {
  title: 'Working Capital Management Guide for Canadian SMEs | FSI Digital',
  description:
    'Learn how to manage and optimize working capital for your Canadian business. Explore financing options, ratios, and cash flow formulas.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/working-capital-guide',
  },
};

const CONTENT = `
<h2>What is Working Capital?</h2>
<p>Working capital is the difference between a business’s current assets (like cash and accounts receivable) and its current liabilities (like accounts payable and short-term debt). It represents the operational liquidity available to run your business day-to-day.</p>

<h2>The Working Capital Formula</h2>
<pre>Working Capital = Current Assets - Current Liabilities</pre>
<p>A positive working capital ratio indicates that a business can pay off its short-term liabilities with its short-term assets. A negative ratio suggests that a business may struggle to meet its immediate obligations, indicating a need for external funding.</p>

<h2>Options to Increase Working Capital</h2>
<ul>
  <li><strong>Accelerate Collections:</strong> Shorten invoice payment terms or offer discounts for early payments.</li>
  <li><strong>Optimize Inventory:</strong> Keep inventory levels lean to avoid tying up excess cash in unsold goods.</li>
  <li><strong>Revenue-Based Advances:</strong> Access fast operational capital based on your monthly revenue to bridge short-term cash flow gaps.</li>
</ul>
`;

export default function WorkingCapitalGuidePage() {
  return (
    <MCAResourcePage
      title="Working Capital Management Guide"
      description={metadata.description}
      readTime="5 min read"
      contentHtml={CONTENT}
    />
  );
}
