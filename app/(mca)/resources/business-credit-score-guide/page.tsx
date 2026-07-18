import { MCAResourcePage } from '@/components/mca/MCAResourcePage';

export const metadata = {
  title: 'Business Credit Score Guide for Canadian Startups | FSI Digital',
  description:
    'A complete guide to understanding and building your business credit score in Canada. Learn how Equifax and TransUnion score your business.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/resources/business-credit-score-guide',
  },
};

const CONTENT = `
<h2>What is a Business Credit Score?</h2>
<p>Just like your personal credit score, a business credit score measures the creditworthiness of your business entity. In Canada, the two main credit bureaus that track business credit are <strong>Equifax Canada</strong> and <strong>TransUnion Canada</strong>. These scores determine your eligibility for loans, supplier trade credit, and interest rates.</p>

<h2>How Business Credit is Calculated</h2>
<p>Unlike personal credit scores (which range from 300 to 900), business credit reports use different index scales depending on the bureau:
<ul>
  <li><strong>Payment Performance:</strong> Historically paying bills on time is the single largest factor.</li>
  <li><strong>Credit Utilization:</strong> The percentage of available credit you use. Keeping utilization below 30% is ideal.</li>
  <li><strong>Company Demographics:</strong> Years in operation, size, and industry risk classification.</li>
  <li><strong>Public Records:</strong> Liens, judgments, or bankruptcies filed against the corporation.</li>
</ul>
</p>

<h2>Steps to Build Your Business Credit in Canada</h2>
<ol>
  <li><strong>Incorporate Your Business:</strong> Establishing a separate legal entity (LLC or Corporation) is necessary to separate your business and personal credit.</li>
  <li><strong>Get a Business Credit Card:</strong> Use a dedicated corporate credit card for company expenses and pay the balance in full every month.</li>
  <li><strong>Establish Trade Lines with Suppliers:</strong> Ask suppliers to report your on-time payments to Equifax and TransUnion.</li>
  <li><strong>Avoid Delinquent Accounts:</strong> Even a single 30-day late payment can drop your business credit score significantly.</li>
</ol>
`;

export default function BusinessCreditScoreGuidePage() {
  return (
    <MCAResourcePage
      title="Business Credit Score Guide"
      description={metadata.description}
      readTime="6 min read"
      contentHtml={CONTENT}
    />
  );
}
