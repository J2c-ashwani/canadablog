import { MCAResourcePage } from '@/components/mca/MCAResourcePage';

export const metadata = {
  title: 'Common Small Business Funding Mistakes | Underwriting Declines',
  description:
    'Learn the top 5 mistakes Canadian business owners make when applying for funding, and how to avoid them to guarantee approval.',
  alternates: {
    canonical: 'https://www.fsidigital.ca/resources/common-funding-mistakes',
  },
};

const CONTENT = `
<h2>1. Submitting Low-Quality Document Scans</h2>
<p>Modern underwriting portals use optical character recognition (OCR) software to automatically analyze transaction data. If you submit phone pictures of paper statements or cropped screenshots, the system rejects them, triggering manual review delays or automatic declines.</p>

<h2>2. Having Multiple Active Cash Positions (Stacking)</h2>
<p>Applying for a third or fourth cash advance position (known as stacking) without settling previous positions suggests cash flow distress. Funding partners will decline stacked files because the daily ACH withdrawals drain operational cash flow.</p>

<h2>3. Mixing Personal and Business Accounts</h2>
<p>Underwriters require a dedicated business checking account to verify business deposit volume. Running business revenue through personal accounts makes it impossible to verify corporate sales history.</p>

<h2>4. Frequent Insufficient Fund (NSF) Transactions</h2>
<p>NSF events are major red flags. More than 3 NSF items over a 90-day period indicate weak cash flow management. Ensure your balances remain positive, especially on weekdays when automated payments clear.</p>
`;

export default function MistakesPage() {
  return (
    <MCAResourcePage
      title="Common Small Business Funding Mistakes"
      description={metadata.description}
      readTime="7 min read"
      contentHtml={CONTENT}
      ctaText="Read Why Businesses Get Declined"
      ctaUrl="/why-businesses-get-declined"
    />
  );
}
