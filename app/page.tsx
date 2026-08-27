import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { OrganicProductLadder } from '@/components/products/OrganicProductLadder';

export const metadata: Metadata = {
  title: 'Business Funding Canada | Small Business Grants & Fast Capital',
  description:
    'Secure the capital your business needs. Find non-repayable government grants, tax credits, and fast working capital solutions for Canadian businesses.',
  keywords:
    'business funding canada, small business grants canada, fast business financing, working capital loans, merchant cash advance canada, emergency business funding, government grants, cash flow financing',
  alternates: {
    canonical: 'https://www.fsidigital.ca',
  },
  openGraph: {
    title: 'Business Funding Canada | Small Business Grants & Fast Capital',
    description:
      'Secure the capital your business needs. Find non-repayable government grants, tax credits, and fast working capital solutions for Canadian businesses.',
    url: 'https://www.fsidigital.ca',
    type: 'website',
    siteName: 'FSI Digital',
  },
};

const FAQS = [
  {
    question: 'How do I know whether my business needs a grant or a cash advance?',
    answer: 'Government grants are non-repayable but take 3–6 months for approval and require strict project reporting. Working capital advances (MCAs) are approved in 24–72 hours based on your monthly revenue deposits, with zero collateral or credit impact, making them ideal for short-term inventory, equipment, or cash flow emergencies.',
  },
  {
    question: 'What are the minimum qualifications for fast business funding?',
    answer: 'To qualify for our working capital solutions, your business must be located in Canada, have been operating for at least 6 months, and generate a minimum of $10,000 in average monthly deposits. No collateral or high credit scores are required.',
  },
  {
    question: 'Are government grants repayable?',
    answer: 'No. Government grants are non-dilutive, equity-free, and non-repayable, provided you complete the project as outlined in your application and submit all required progress reports.',
  },
  {
    question: 'What is a factor rate and how does it work?',
    answer: 'Unlike traditional loans with compound interest rates, Merchant Cash Advances use a fixed factor rate (typically 1.18 to 1.35). The total repayment amount is calculated upfront by multiplying the advance amount by the factor rate. You repay a fixed percentage of your daily card sales or monthly deposits, meaning payments adjust naturally with your business volume.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      {/* Hero Section */}
      <section className="mca-hero text-white py-16 sm:py-24">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="mca-hero-badge bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-6">
            🌎 <span>NORTH AMERICA'S GOVERNMENT GRANTS &amp; FUNDING PLATFORM</span>
          </div>
          <h1 className="mca-hero-title text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            Find Government Grants Your Business May Qualify For
          </h1>
          <p className="mca-hero-desc text-lg sm:text-xl text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            FSI Digital helps small businesses across Canada and the United States discover non-repayable government grants,
            subsidies, and tax credits. Check your grant eligibility in 3 minutes.
          </p>

          {/* Core Value Checkmarks */}
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-emerald-200 mb-10">
            <span className="flex items-center gap-1.5 bg-emerald-950/40 px-3.5 py-1.5 rounded-lg border border-emerald-800/40">✓ 100% Equity-Free Capital</span>
            <span className="flex items-center gap-1.5 bg-emerald-950/40 px-3.5 py-1.5 rounded-lg border border-emerald-800/40">✓ No Bank Statements Required</span>
            <span className="flex items-center gap-1.5 bg-emerald-950/40 px-3.5 py-1.5 rounded-lg border border-emerald-800/40">✓ USA &amp; Canada Coverage</span>
          </div>

          {/* Primary Hero CTA - Dominant Grants Focus */}
          <div className="mb-10">
            <Link href="/calculator" className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg sm:text-xl px-10 py-5 rounded-xl shadow-2xl transition duration-200 transform hover:-translate-y-0.5 w-full sm:w-auto">
              🏛️ Find Government Grants (Non-Repayable) →
            </Link>
            <p className="text-xs text-slate-400 mt-2 font-medium">Free eligibility check · Takes 3 minutes · Zero credit impact</p>
          </div>

          {/* Secondary Financing Option (Complementary Module) */}
          <div className="pt-8 border-t border-slate-800/80 max-w-xl mx-auto">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">Need funding faster?</p>
            <p className="text-sm text-slate-300 mb-4">Government grants take 30–90 days for approval. If your business needs emergency working capital this week:</p>
            <Link href="/funding-calculator" className="inline-flex items-center justify-center gap-2 bg-slate-800/90 hover:bg-slate-700 text-sky-300 border border-sky-500/40 font-bold text-sm px-6 py-3 rounded-lg transition duration-200">
              ⚡ Explore Fast Business Financing (24–48h Approval) →
            </Link>
            <p className="text-[11px] text-slate-400 mt-1.5">Revenue-based financing ($10k–$100k) · Requires 3 months bank statements</p>
          </div>

          <p className="mca-hero-disclosure text-[11px] text-slate-500 mt-8">
            FSI Digital is an independent private advisory platform. We are not affiliated with government agencies.
          </p>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-6 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6 flex flex-wrap justify-around gap-4 text-center">
          <div className="mca-trust-pill">🌎 <strong>$2.5B+ Government Grants</strong> tracked in USA &amp; Canada</div>
          <div className="mca-trust-pill">⚡ <strong>24–48h Approval</strong> for business financing</div>
          <div className="mca-trust-pill">🔒 <strong>No Credit Impact</strong> to check eligibility</div>
        </div>
      </section>

      {/* Comparison Section: Grants vs Business Financing */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Compare Your Funding Options
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mt-3">
              Explore our core government grant database or fast revenue-based business financing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pillar 1: Government Grants (Primary Brand) */}
            <div className="mca-pillar-card border-2 border-emerald-500 shadow-xl relative bg-emerald-50/20">
              <div className="mca-pillar-badge bg-emerald-600 text-white font-bold text-xs uppercase px-3 py-1 rounded-full">CORE EXPERTISE</div>
              <div className="mca-pillar-icon bg-emerald-100 text-emerald-700">🏛️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Government Grants &amp; Subsidies</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Access non-repayable federal, state, and provincial government programs (like SBIR, STTR, SR&amp;ED, or IRAP). Best for hiring, R&amp;D, technology, export, and expansion.
              </p>
              <ul className="mca-pillar-features space-y-2 mb-8 text-sm text-gray-700">
                <li className="flex items-center gap-2">✓ <strong>Capital Type:</strong> Non-repayable (100% Equity-Free)</li>
                <li className="flex items-center gap-2">✓ <strong>Coverage:</strong> United States &amp; Canada</li>
                <li className="flex items-center gap-2">✓ <strong>Bank Statements:</strong> Not required</li>
                <li className="flex items-center gap-2">✓ <strong>Average Range:</strong> $15,000 – $500,000+</li>
                <li className="flex items-center gap-2">⏱ <strong>Timeline:</strong> 30 to 90 days approval</li>
              </ul>
              <Link href="/calculator" className="w-full inline-block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-lg transition duration-200">
                Find Government Grants →
              </Link>
            </div>

            {/* Pillar 2: Business Financing (Secondary Solution) */}
            <div className="mca-pillar-card border border-slate-200 shadow-md bg-white">
              <div className="mca-pillar-badge bg-sky-100 text-sky-800 font-bold text-xs uppercase px-3 py-1 rounded-full">FAST FINANCING</div>
              <div className="mca-pillar-icon bg-sky-100 text-sky-700">⚡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Revenue-Based Business Financing</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                For established businesses that need cash flow this week before grant decisions are finalized. Repayable based on your monthly revenue deposits.
              </p>
              <ul className="mca-pillar-features space-y-2 mb-8 text-sm text-gray-700">
                <li className="flex items-center gap-2">✓ <strong>Capital Type:</strong> Repayable (Revenue-based)</li>
                <li className="flex items-center gap-2">✓ <strong>Bank Statements:</strong> 3 recent months required</li>
                <li className="flex items-center gap-2">✓ <strong>Average Range:</strong> $10,000 – $100,000+</li>
                <li className="flex items-center gap-2">⏱ <strong>Timeline:</strong> 24 to 48 hours approval</li>
              </ul>
              <Link href="/funding-calculator" className="w-full inline-block text-center bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 px-6 rounded-lg transition duration-200">
                Explore Business Financing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How FSI Digital Works</h2>
            <p className="text-gray-600 mt-2">Get matched with optimal funding sources in three simple steps.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mca-step-num">1</div>
              <h4 className="font-bold text-gray-900 mb-1">Check Eligibility</h4>
              <p className="text-gray-600 text-sm">Submit your basic business profile and average monthly revenue.</p>
            </div>
            <div className="text-center">
              <div className="mca-step-num">2</div>
              <h4 className="font-bold text-gray-900 mb-1">Submit Documents</h4>
              <p className="text-gray-600 text-sm">Upload your last 6 months of bank statements securely to verify deposits.</p>
            </div>
            <div className="text-center">
              <div className="mca-step-num">3</div>
              <h4 className="font-bold text-gray-900 mb-1">Get Funded</h4>
              <p className="text-gray-600 text-sm">Receive a decision in 24–72 hours and get capital sent directly to your account.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-6">
                <h4 className="font-bold text-gray-900 text-lg mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <OrganicProductLadder surface="homepage" context="homepage" />
      </div>
      <Footer />

      <style>{`
        .mca-hero {
          background: linear-gradient(135deg, #111827 0%, #1e3a8a 100%);
          font-family: var(--font-inter, system-ui, sans-serif);
        }
        .mca-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #bfdbfe;
          margin-bottom: 2rem;
          letter-spacing: 0.05em;
        }
        .mca-hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.15;
          max-width: 800px;
          margin: 0 auto 1.5rem;
          text-balance: balance;
        }
        .mca-hero-desc {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          line-height: 1.6;
          color: #93c5fd;
          max-width: 680px;
          margin: 0 auto 2.5rem;
          text-pretty: pretty;
        }
        .mca-hero-ctas {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .mca-hero-btn-primary {
          background: #1a56db;
          color: #fff;
          font-weight: 700;
          padding: 1rem 2.25rem;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.15s;
          box-shadow: 0 4px 12px rgba(26, 86, 219, 0.2);
        }
        .mca-hero-btn-primary:hover {
          background: #1e40af;
        }
        .mca-hero-btn-secondary {
          background: rgba(255,255,255,0.1);
          color: #fff;
          font-weight: 600;
          padding: 1rem 2.25rem;
          border-radius: 10px;
          text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.2);
          transition: all 0.15s;
        }
        .mca-hero-btn-secondary:hover {
          background: rgba(255,255,255,0.2);
          border-color: #fff;
        }
        .mca-hero-disclosure {
          font-size: 0.72rem;
          color: #64748b;
          margin: 0;
        }
        
        .mca-trust-pill {
          font-size: 0.85rem;
          color: #4b5563;
        }
        
        /* ─ Pillars ─ */
        .mca-pillar-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .mca-pillar-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
        }
        .mca-pillar-badge {
          position: absolute;
          top: 1.5rem; right: 1.5rem;
          background: #dcfce7;
          color: #15803d;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 100px;
          letter-spacing: 0.05em;
        }
        .mca-pillar-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .mca-pillar-features {
          list-style: none; padding: 0; margin: 0 0 2rem;
          display: flex; flex-direction: column; gap: 0.6rem;
          font-size: 0.88rem; color: #374151;
        }
        .mca-pillar-btn-blue {
          background: #eff6ff; color: #1a56db; font-weight: 700;
          padding: 0.8rem 1.5rem; border-radius: 8px; text-decoration: none;
          text-align: center; font-size: 0.9rem; transition: background 0.15s;
          margin-top: auto;
        }
        .mca-pillar-btn-blue:hover { background: #dbeafe; }
        .mca-pillar-btn-green {
          background: #16a34a; color: #fff; font-weight: 700;
          padding: 0.8rem 1.5rem; border-radius: 8px; text-decoration: none;
          text-align: center; font-size: 0.9rem; transition: background 0.15s;
          margin-top: auto;
          box-shadow: 0 4px 12px rgba(22,163,74,0.15);
        }
        .mca-pillar-btn-green:hover { background: #15803d; }
        
        .mca-step-num {
          width: 40px; height: 40px; background: #1a56db; color: #fff;
          font-size: 1.15rem; font-weight: 800; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
        }
      `}</style>
    </div>
  );
}
