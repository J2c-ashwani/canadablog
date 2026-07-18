import { MCAResourcePage } from '@/components/mca/MCAResourcePage';

export const metadata = {
  title: 'How Merchant Cash Advances Work | Step-by-Step Guide | FSI Digital',
  description:
    'A complete guide explaining how Merchant Cash Advances (MCAs) work in Canada, from application and underwriting to funding and repayments.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/how-merchant-cash-advance-works',
  },
};

const CONTENT = `
<h2>Step 1: Application & bank statement upload</h2>
<p>You apply online and upload your last 6 months of business bank statements. This allows underwriters to verify your average monthly deposits and confirm the business is active in Canada.</p>

<h2>Step 2: Underwriting & risk scoring</h2>
<p>Unlike bank loans that evaluate credit, MCA underwriters analyze cash flow consistency. They check daily balances, deposit frequency, and look for negative balances or NSF items. A priority score is calculated to determine your funding bracket.</p>

<h2>Step 3: Offer & factor rate agreement</h2>
<p>If eligible, you receive an offer detailing the advance amount, the factor rate (e.g. 1.20), and the retrieval percentage (typically 10% to 15% of your daily deposits). Once you sign the purchase agreement, funds are wired directly to your business checking account.</p>

<h2>Step 4: Automated repayment draws</h2>
<p>Repayments begin automatically. The funding partner withdraws the agreed percentage from your daily card transactions or via ACH bank transfer. On days when your sales are high, you pay back more. On days when your sales are low, the repayment amount decreases proportionally, protecting your cash flow.</p>
`;

export default function HowMCAWorksPage() {
  return (
    <MCAResourcePage
      title="How Merchant Cash Advances Work"
      description={metadata.description}
      readTime="5 min read"
      contentHtml={CONTENT}
    />
  );
}
