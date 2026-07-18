'use client';

// app/(mca)/thank-you/page.tsx
// Post-application confirmation + Priority Funding Processing upsell (CAD $49)

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

const PRIORITY_PRICE_CAD = 49;
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

const PRIORITY_INCLUDES = [
  { icon: '⚡', title: 'Immediate Application Review', desc: 'A dedicated specialist reviews your file within 4 hours.' },
  { icon: '📋', title: 'Document Verification', desc: 'We verify your bank statements and confirm completeness.' },
  { icon: '✅', title: 'Funding Readiness Assessment', desc: 'Identify any missing items before your partner receives the file.' },
  { icon: '🚀', title: 'Priority Submission', desc: 'Your application moves to the front of the partner queue.' },
  { icon: '📞', title: 'Dedicated Support', desc: 'Direct contact with your specialist until funding decision.' },
];

function ThankYouContent() {
  const params = useSearchParams();
  const applicationId = params.get('id') ?? '';
  const email = params.get('email') ?? '';

  const [priorityPurchased, setPriorityPurchased] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paypalError, setPaypalError] = useState('');

  const handlePriorityPurchase = async () => {
    if (!applicationId) return;
    setProcessing(true);
    setPaypalError('');

    try {
      // Create PayPal order via existing payment infrastructure
      const res = await fetch('/api/mca/priority-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId, email }),
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
            Our team will be in touch within 24 hours.
          </p>
          {email && (
            <p className="mca-ty-email-note">
              A confirmation has been sent to <strong>{email}</strong>
            </p>
          )}
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
                <strong>Documents Reviewed</strong>
                <p>Our team reviews your bank statements and application details.</p>
              </div>
            </div>
            <div className="mca-tl-item">
              <div className="mca-tl-dot">3</div>
              <div>
                <strong>Submitted to Funding Partner</strong>
                <p>Your complete application is forwarded to our Canadian funding partner.</p>
              </div>
            </div>
            <div className="mca-tl-item">
              <div className="mca-tl-dot">4</div>
              <div>
                <strong>Funding Decision</strong>
                <p>The partner contacts you directly with their decision — typically 24–72 hours.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Processing Upsell */}
        {!priorityPurchased && (
          <div className="mca-upsell-card">
            <div className="mca-upsell-badge">OPTIONAL UPGRADE</div>
            <h2 className="mca-upsell-title">Want your application reviewed first?</h2>
            <p className="mca-upsell-sub">
              Get a dedicated funding specialist to prepare and submit your application with priority handling.
              <strong> Not required — your free application is already submitted.</strong>
            </p>

            <div className="mca-upsell-includes">
              {PRIORITY_INCLUDES.map((item) => (
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
                <span className="mca-price-label">One-time</span>
                <span className="mca-price-amount">CAD $49</span>
                <span className="mca-price-note">No subscription · No hidden fees</span>
              </div>

              <button
                id="mca-priority-purchase"
                className="mca-btn-priority"
                onClick={handlePriorityPurchase}
                disabled={processing}
              >
                {processing ? (
                  <><div className="mca-spinner-sm" /> Redirecting to secure checkout…</>
                ) : (
                  <>⚡ Get Priority Processing — CAD $49</>
                )}
              </button>

              {paypalError && <p className="mca-error" style={{ marginTop: '0.75rem' }}>{paypalError}</p>}

              <p className="mca-upsell-disclaimer">
                Secure payment via PayPal. We do not store your payment information.
                Priority Processing does not guarantee funding approval — it ensures professional
                handling and priority submission to our funding partner.
              </p>
            </div>
          </div>
        )}

        {/* Priority purchased confirmation */}
        {priorityPurchased && (
          <div className="mca-priority-confirmed">
            <div className="mca-ty-checkmark small">⚡</div>
            <h2>Priority Processing Activated</h2>
            <p>A specialist will review your application within 4 hours.</p>
          </div>
        )}

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
