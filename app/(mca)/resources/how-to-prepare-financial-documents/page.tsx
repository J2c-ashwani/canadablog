import { MCAResourcePage } from '@/components/mca/MCAResourcePage';

export const metadata = {
  title: 'How to Prepare Financial Documents for Funding | FSI Digital',
  description:
    'A guide on exporting, naming, and reviewing your business bank statements and registration documents for fast underwriting approvals.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/resources/how-to-prepare-financial-documents',
  },
};

const CONTENT = `
<h2>1. Export Original Electronic PDFs</h2>
<p>Never print statements to scan them or take phone photographs. Underwriters use optical character recognition (OCR) systems that directly read transaction details from electronic documents. Go to your online banking portal, navigate to statements, and download the exact PDF files.</p>

<h2>2. Ensure All Pages Are Included</h2>
<p>Underwriting engines check document page counts. If a statement says "Page 1 of 5" but you only upload the first page with transactions, the file is automatically flagged as incomplete or modified, delaying review.</p>

<h2>3. Verify Corporate Registrations</h2>
<p>Keep your Articles of Incorporation, Trade Name (DBA) registration certificates, or CRA tax filings on hand. The legal name, business address, and registration number must match your bank account title exactly to avoid security flags.</p>

<h2>4. Clean Up Your Accounts Prior to Submission</h2>
<ul>
  <li>Resolve any overdrafts or negative balances.</li>
  <li>Avoid insufficient fund (NSF) returns.</li>
  <li>Consolidate deposits from multiple merchant services into your main checking account.</li>
</ul>
`;

export default function PrepareDocumentsPage() {
  return (
    <MCAResourcePage
      title="How to Prepare Financial Documents for Funding"
      description={metadata.description}
      readTime="4 min read"
      contentHtml={CONTENT}
      ctaText="Apply with Priority Document Verification"
      ctaUrl="/apply"
    />
  );
}
