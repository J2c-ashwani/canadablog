import { MCAResourcePage } from '@/components/mca/MCAResourcePage';

export const metadata = {
  title: 'Business Funding Checklist | Canadian Funding Guide | FSI Digital',
  description:
    'A step-by-step checklist of documents, registration information, and financial parameters needed to secure Canadian business funding.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/resources/business-funding-checklist',
  },
};

const CONTENT = `
<h2>Step 1: Verify Core Business Identity</h2>
<ul>
  <li><strong>Legal Registration:</strong> Ensure your business registration documents or articles of incorporation are current.</li>
  <li><strong>Matching Details:</strong> Confirm that your legal registration matches your CRA business number (BN) and bank account name exactly.</li>
</ul>

<h2>Step 2: Collect Financial Documentation</h2>
<ul>
  <li><strong>Electronic Bank Statements:</strong> Download the last 6 consecutive months of business checking account statements as original electronic PDFs directly from your online banking portal.</li>
  <li><strong>Complete Pages:</strong> Underwriters reject statements with missing pages. Ensure every page (e.g., page 1 of 6 through page 6 of 6) is included.</li>
</ul>

<h2>Step 3: Audit Your Cash Flow Metrics</h2>
<ul>
  <li><strong>Monthly deposits:</strong> Minimum $10,000/month average.</li>
  <li><strong>NSF Transactions:</strong> Less than 3 insufficient fund events over the last 90 days.</li>
  <li><strong>Daily Balance:</strong> Maintain a positive average daily balance.</li>
</ul>

<h2>Step 4: Align with Partner Requirements</h2>
<p>Once your documents are organized, use our interactive funding calculator to estimate your range, then apply online for a specialist document review before partner submission.</p>
`;

export default function ChecklistPage() {
  return (
    <MCAResourcePage
      title="Small Business Funding Checklist"
      description={metadata.description}
      readTime="5 min read"
      contentHtml={CONTENT}
      ctaText="Apply with Pre-Submission Document Review"
      ctaUrl="/priority-processing"
    />
  );
}
