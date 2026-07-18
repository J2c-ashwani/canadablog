import { MCAResourcePage } from '@/components/mca/MCAResourcePage';

export const metadata = {
  title: 'Cash Flow Forecasting for Small Business | FSI Digital',
  description:
    'Learn how to create a cash flow forecast for your small business. Maintain liquidity and plan for growth with step-by-step forecasting methods.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/resources/cash-flow-forecasting',
  },
};

const CONTENT = `
<h2>The Importance of Cash Flow Forecasting</h2>
<p>A cash flow forecast estimates the money coming into and going out of your business over a specific period. It helps business owners anticipate cash shortages, plan purchases, and determine when they need to secure external working capital to bridge operational gaps.</p>

<h2>Step-by-Step Forecasting Method</h2>
<h3>1. Estimate Cash Inflows</h3>
<p>List all expected sources of cash, including credit card sales, invoice receipts, and government grants or refunds. Be conservative—base your estimates on historical sales trends.</p>

<h3>2. Project Cash Outflows</h3>
<p>List all predictable expenses, including rent, payroll, inventory purchases, supplier invoices, taxes, and loan/cash advance payments.</p>

<h3>3. Calculate Net Cash Flow</h3>
<p>Subtract your total cash outflows from your total cash inflows for each period. Add this to your opening cash balance to find your closing balance.</p>

<h2>Managing Cash Flow Gaps</h2>
<p>If your forecast projects a negative closing cash balance, you have a cash flow gap. You can address this gap by:
<ul>
  <li>Delaying non-essential payments to suppliers.</li>
  <li>Speeding up collections of receivables.</li>
  <li>Securing a flexible working capital advance to ensure operational continuity.</li>
</ul>
</p>
`;

export default function CashFlowForecastingPage() {
  return (
    <MCAResourcePage
      title="Cash Flow Forecasting for Small Business"
      description={metadata.description}
      readTime="5 min read"
      contentHtml={CONTENT}
    />
  );
}
