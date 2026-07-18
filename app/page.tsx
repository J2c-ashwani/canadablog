import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
        <div className="container mx-auto px-6 text-center">
          <div className="mca-hero-badge">
            🇨🇦 <span>CANADIAN BUSINESS FUNDING PORTAL · 2026</span>
          </div>
          <h1 className="mca-hero-title">
            Secure the Capital Your Business Needs to Grow
          </h1>
          <p className="mca-hero-desc">
            FSI Digital connects Canadian small businesses with non-repayable government grants,
            tax credits, and fast working capital solutions. Check your eligibility in 3 minutes.
          </p>

          <div className="mca-hero-ctas">
            <Link href="/apply" className="mca-hero-btn-primary">
              Apply for Funding Now
            </Link>
            <Link href="/funding-calculator" className="mca-hero-btn-secondary">
              Calculate Funding Range
            </Link>
          </div>

          <p className="mca-hero-disclosure">
            FSI Digital is an independent private advisory. We are not affiliated with the government.
          </p>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-6 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6 flex flex-wrap justify-around gap-4 text-center">
          <div className="mca-trust-pill">⚡ <strong>24–72h Approval</strong> for working capital</div>
          <div className="mca-trust-pill">🇨🇦 <strong>$2.5B+ Government Grants</strong> tracked</div>
          <div className="mca-trust-pill">🔒 <strong>No Credit Impact</strong> to check eligibility</div>
        </div>
      </section>

      {/* Two Pillars Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Choose the Right Funding Option for Your Stage
            </h2>
            <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
              We help founders secure the capital they need via non-repayable programs or fast cash-flow advances.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pillar 1: Grants */}
            <div className="mca-pillar-card">
              <div className="mca-pillar-icon bg-blue-50 text-blue-600">🇨🇦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Government Grants &amp; Tax Credits</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Access non-repayable funding from provincial and federal agencies (like SR&amp;ED or IRAP).
                Best for technology developers, hiring, export expansion, and R&amp;D.
              </p>
              <ul className="mca-pillar-features">
                <li>✓ <strong>Non-repayable:</strong> 100% equity-free capital</li>
                <li>✓ <strong>$15K – $500K+</strong> average funding amounts</li>
                <li>⏱ <strong>Timeline:</strong> 3 – 6 months approval</li>
              </ul>
              <Link href="/grant-finder" className="mca-pillar-btn-blue">
                Find Government Grants →
              </Link>
            </div>

            {/* Pillar 2: Fast Capital / MCA */}
            <div className="mca-pillar-card border-blue-200 shadow-md">
              <div className="mca-pillar-badge">POPULAR</div>
              <div className="mca-pillar-icon bg-green-50 text-green-600">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Capital &amp; Cash Advances</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Get an advance against your future business revenue deposits. No collateral, no high
                credit scores needed. Best for inventory, equipment, payroll, or immediate cash flow.
              </p>
              <ul className="mca-pillar-features">
                <li>✓ <strong>Speed:</strong> Funds in bank within 24–72 hours</li>
                <li>✓ <strong>$5K – $250K</strong> based on monthly revenue</li>
                <li>⏱ <strong>Timeline:</strong> Same day decision</li>
              </ul>
              <Link href="/apply" className="mca-pillar-btn-green">
                Get Fast Business Funding →
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
