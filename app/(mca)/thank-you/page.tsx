'use client';

// app/(mca)/thank-you/page.tsx
// Post-application confirmation + optional self-serve MCA readiness report (CAD $49)

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

const REVIEW_INCLUDES = [
  { icon: '⚡', title: 'Instant Readiness Score', desc: 'A transparent 0–100 score based on the business information declared in your application.' },
  { icon: '📊', title: 'Funding Request Ratio', desc: 'See the requested amount relative to declared monthly revenue.' },
  { icon: '📋', title: 'Document Inventory Check', desc: 'Review whether your recorded upload count meets the report preparation threshold.' },
  { icon: '✅', title: 'Preparation Checklist', desc: 'Get practical steps for complete PDFs, consistent business details, and underwriting preparation.' },
];

function ThankYouContent() {
  const params = useSearchParams();
  const applicationId = params.get('id') ?? '';
  const recoveryToken = params.get('t') ?? '';

  const [processing, setProcessing] = useState(false);
  const [paypalError, setPaypalError] = useState('');

  const handlePriorityPurchase = async () => {
    if (!applicationId || !recoveryToken) return;
    setProcessing(true);
    setPaypalError('');

    try {
      // Create PayPal order via existing payment infrastructure
      const res = await fetch('/api/mca/priority-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recoveryToken }),
      });
      const data = await res.json();

      if (!res.ok || !data.approveUrl) {
        setPaypalError('Unable to initiate payment. Please try again or contact us.');
        setProcessing(false);
        return;
      }

      // Redirect to PayPal approval
      window.location.href = data.approveUrl;
    } catch {
      setPaypalError('Payment system error. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <>
      <div className="mca-ty-page">
        {/* Success header */}
        <div className="mca-ty-header">
          <div className="mca-ty-checkmark">✓</div>
          <h1>Application Received</h1>
          <p>
            Your application <strong>{applicationId}</strong> has been submitted successfully.
            Any routing or status updates will be sent by email.
          </p>
          <p className="mca-ty-email-note">A confirmation has been sent to the email used in your application.</p>
        </div>

        {/* Timeline */}
        <div className="mca-ty-timeline-card">
          <h2>What happens next?</h2>
          <div className="mca-timeline">
            <div className="mca-tl-item done">
              <div className="mca-tl-dot">✓</div>
              <div>
                <strong>Application Submitted</strong>
                <p>Your documents and information have been securely received.</p>
              </div>
            </div>
            <div className="mca-tl-item">
              <div className="mca-tl-dot">2</div>
              <div>
                <strong>Partner Review</strong>
                <p>If routed, the funding partner reviews the information and documents provided.</p>
              </div>
            </div>
            <div className="mca-tl-item">
              <div className="mca-tl-dot">3</div>
              <div>
                <strong>Submitted to Funding Partner</strong>
                <p>Eligible profiles may be forwarded to a matching Canadian funding partner.</p>
              </div>
            </div>
            <div className="mca-tl-item">
              <div className="mca-tl-dot">4</div>
              <div>
                <strong>Funding Decision</strong>
                <p>The funding partner controls its own underwriting timeline and contacts you directly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Optional automated Funding Readiness Report */}
        <div className="mca-upsell-card">
            <div className="mca-upsell-badge">OPTIONAL SELF-SERVE REPORT</div>
            <h2 className="mca-upsell-title">MCA Funding Readiness Report ($49 CAD)</h2>
            <p className="mca-upsell-sub">
              Turn your declared application profile into an instant readiness score, funding-request ratio, and preparation checklist.
              <strong> Your application is already active—this information product is entirely optional.</strong>
            </p>

            <div className="mca-upsell-includes">
              {REVIEW_INCLUDES.map((item) => (
                <div key={item.title} className="mca-upsell-item">
                  <span className="mca-upsell-item-icon">{item.icon}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mca-upsell-cta">
              <div className="mca-upsell-price">
                <span className="mca-price-label">One-time review fee</span>
                <span className="mca-price-amount">CAD $49</span>
                <span className="mca-price-note">No subscription · No hidden fees</span>
              </div>

              <button
                id="mca-priority-purchase"
                className="mca-btn-priority"
                onClick={handlePriorityPurchase}
                disabled={processing || !recoveryToken}
              >
                {processing ? (
                  <><div className="mca-spinner-sm" /> Redirecting to secure checkout…</>
                ) : (
                  <>📋 Get My Instant Readiness Report — CAD $49</>
                )}
              </button>

              {paypalError && <p className="mca-error" style={{ marginTop: '0.75rem' }}>{paypalError}</p>}
              {!recoveryToken && <p className="mca-error" style={{ marginTop: '0.75rem' }}>Use the private link in your application email to access secure checkout.</p>}

              <p className="mca-upsell-disclaimer">
                Secure payment via PayPal. We do not store your payment information.
                The automated report evaluates declared application fields and recorded upload count only.
                It does not inspect bank-statement contents, make a credit decision, or guarantee funding.
                Your application remains active whether or not you purchase it.
              </p>
            </div>
        </div>

        {/* Next steps */}
        <div className="mca-ty-footer-card">
          <h3>Questions about your application?</h3>
          <p>Contact us with your application ID: <strong>{applicationId}</strong></p>
          <a href="mailto:info@fsidigital.ca" className="mca-ty-contact-link">
            info@fsidigital.ca
          </a>
        </div>
      </div>

      <style>{`
        .mca-ty-page {
          max-width: 760px;
          margin: 0 auto;
          padding: 2rem 1.5rem 4rem;
          font-family: var(--font-inter, system-ui, sans-serif);
        }
        /* ─ Header ─ */
        .mca-ty-header {
          text-align: center;
          padding: 2.5rem 1rem;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-radius: 16px;
          margin-bottom: 1.5rem;
          border: 1px solid #bbf7d0;
        }
        .mca-ty-checkmark {
          width: 72px; height: 72px;
          background: #16a34a;
          color: #fff;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem; font-weight: 700;
          margin: 0 auto 1.25rem;
          box-shadow: 0 4px 20px rgba(22,163,74,0.3);
          animation: mca-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .mca-ty-checkmark.small {
          width: 56px; height: 56px; font-size: 1.5rem;
          background: #1a56db;
          box-shadow: 0 4px 20px rgba(26,86,219,0.3);
        }
        @keyframes mca-pop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .mca-ty-header h1 {
          font-size: 1.8rem; font-weight: 800; color: #166534;
          margin: 0 0 0.5rem; letter-spacing: -0.02em;
        }
        .mca-ty-header p { color: #166534; font-size: 0.95rem; margin: 0 0 0.25rem; }
        .mca-ty-email-note { font-size: 0.85rem; color: #16a34a; margin-top: 0.25rem; }
        /* ─ Timeline ─ */
        .mca-ty-timeline-card {
          background: #fff;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          margin-bottom: 1.5rem;
        }
        .mca-ty-timeline-card h2 {
          font-size: 1.15rem; font-weight: 700; color: #111827;
          margin: 0 0 1.5rem;
        }
        .mca-timeline { display: flex; flex-direction: column; gap: 1.25rem; }
        .mca-tl-item {
          display: flex; align-items: flex-start; gap: 1rem;
        }
        .mca-tl-dot {
          width: 32px; height: 32px; flex-shrink: 0;
          border-radius: 50%;
          background: #f3f4f6;
          color: #9ca3af;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; font-weight: 700;
        }
        .mca-tl-item.done .mca-tl-dot {
          background: #16a34a; color: #fff;
        }
        .mca-tl-item strong { font-size: 0.9rem; color: #111827; display: block; margin-bottom: 0.15rem; }
        .mca-tl-item p { font-size: 0.82rem; color: #6b7280; margin: 0; line-height: 1.5; }
        /* ─ Upsell ─ */
        .mca-upsell-card {
          background: #fff;
          border-radius: 16px;
          padding: 2.25rem;
          box-shadow: 0 4px 24px rgba(26,86,219,0.12);
          border: 2px solid #bfdbfe;
          margin-bottom: 1.5rem;
          position: relative;
        }
        .mca-upsell-badge {
          display: inline-block;
          background: #1a56db;
          color: #fff;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 3px 10px;
          border-radius: 100px;
          margin-bottom: 1rem;
        }
        .mca-upsell-title {
          font-size: 1.4rem; font-weight: 800; color: #111827;
          margin: 0 0 0.5rem; letter-spacing: -0.02em;
        }
        .mca-upsell-sub {
          font-size: 0.9rem; color: #6b7280; line-height: 1.6;
          margin: 0 0 1.75rem;
        }
        .mca-upsell-includes { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
        .mca-upsell-item {
          display: flex; gap: 0.875rem; align-items: flex-start;
        }
        .mca-upsell-item-icon { font-size: 1.25rem; flex-shrink: 0; margin-top: 1px; }
        .mca-upsell-item strong { font-size: 0.9rem; color: #111827; display: block; margin-bottom: 0.1rem; }
        .mca-upsell-item p { font-size: 0.82rem; color: #6b7280; margin: 0; line-height: 1.5; }
        .mca-upsell-cta {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1.75rem;
          text-align: center;
          border: 1px solid #e5e7eb;
        }
        .mca-upsell-price {
          display: flex; flex-direction: column; align-items: center;
          gap: 0.2rem; margin-bottom: 1.25rem;
        }
        .mca-price-label { font-size: 0.8rem; color: #9ca3af; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
        .mca-price-amount { font-size: 2.5rem; font-weight: 900; color: #111827; letter-spacing: -0.04em; line-height: 1; }
        .mca-price-note { font-size: 0.78rem; color: #9ca3af; }
        .mca-btn-priority {
          background: linear-gradient(135deg, #1a56db, #1e40af);
          color: #fff; border: none;
          padding: 1rem 2.25rem;
          border-radius: 12px; font-size: 1.05rem; font-weight: 700;
          cursor: pointer;
          display: inline-flex; align-items: center; gap: 0.5rem;
          transition: all 0.15s;
          box-shadow: 0 4px 16px rgba(26,86,219,0.35);
          width: 100%; justify-content: center;
        }
        .mca-btn-priority:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(26,86,219,0.45);
        }
        .mca-btn-priority:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
        .mca-upsell-disclaimer {
          font-size: 0.72rem; color: #9ca3af; margin-top: 1rem; line-height: 1.6;
        }
        .mca-error { font-size: 0.82rem; color: #dc2626; font-weight: 500; }
        /* ─ Priority confirmed ─ */
        .mca-priority-confirmed {
          text-align: center;
          background: #eff6ff;
          border: 2px solid #bfdbfe;
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 1.5rem;
        }
        .mca-priority-confirmed h2 { color: #1e40af; margin: 0.75rem 0 0.5rem; }
        .mca-priority-confirmed p { color: #3b82f6; font-size: 0.9rem; margin: 0; }
        /* ─ Footer card ─ */
        .mca-ty-footer-card {
          background: #f9fafb;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          border: 1px solid #e5e7eb;
        }
        .mca-ty-footer-card h3 { font-size: 1rem; color: #374151; margin: 0 0 0.5rem; }
        .mca-ty-footer-card p { font-size: 0.85rem; color: #6b7280; margin: 0 0 0.75rem; }
        .mca-ty-contact-link {
          color: #1a56db; font-weight: 600; font-size: 0.9rem; text-decoration: none;
        }
        .mca-spinner-sm {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: mca-spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes mca-spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Loading…</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
