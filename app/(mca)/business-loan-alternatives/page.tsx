import { MCAResourcePage } from '@/components/mca/MCAResourcePage';

export const metadata = {
  title: 'Unsecured Business Loan Alternatives in Canada | FSI Digital',
  description:
    'Explore non-traditional business loan alternatives in Canada, including government grants, tax credits, and revenue-based cash advances.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/business-loan-alternatives',
  },
};

const CONTENT = `
<h2>Why Look for Alternatives?</h2>
<p>Traditional Canadian bank loans require high credit scores, years of operational history, and extensive collateral (like real estate or equipment). When banks say no, or when you need funding faster, several alternative financing structures are available.</p>

<h2>Alternative 1: Government Grants &amp; Tax Credits</h2>
<p>Government programs like SR&amp;ED or IRAP offer non-dilutive, equity-free funding. While the application process is rigorous and takes 3 to 6 months, it does not require repayment or equity dilution.</p>

<h2>Alternative 2: Merchant Cash Advances (MCA)</h2>
<p>An MCA purchases a percentage of your future card sales or bank deposits. Approvals are based on daily deposit volume and cash flow stability, with funds wired in 24–72 hours. No collateral is required.</p>

<h2>Alternative 3: Factoring / Invoice Financing</h2>
<p>If your business invoices other companies on Net-30 or Net-60 terms, you can sell those outstanding invoices to a factoring company at a discount to receive immediate cash flow.</p>
`;

export default function BusinessLoanAlternativesPage() {
  return (
    <MCAResourcePage
      title="Unsecured Business Loan Alternatives"
      description={metadata.description}
      readTime="5 min read"
      contentHtml={CONTENT}
    />
  );
}
