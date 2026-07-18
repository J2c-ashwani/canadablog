'use client';

// app/mca/priority-success/page.tsx
// Captures PayPal transaction client-side, updates sheets, shows confirmation

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState, useRef } from 'react';

function PrioritySuccessContent() {
  const params = useSearchParams();
  const router = useRouter();
  
  const token = params.get('token') ?? ''; // PayPal Order ID
  const applicationId = params.get('id') ?? '';
  const email = params.get('email') ?? '';
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const capturedRef = useRef(false);

  useEffect(() => {
    if (!token || !applicationId) {
      setStatus('error');
      setErrorMsg('Missing required parameters to verify payment.');
      return;
    }

    // Prevent double invocation in React StrictMode
    if (capturedRef.current) return;
    capturedRef.current = true;

    async function capturePayment() {
      try {
        const res = await fetch('/api/mca/capture-priority-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, applicationId, email }),
        });
        const data = await res.json();

        if (!res.ok) {
          setStatus('error');
          setErrorMsg(data.error ?? 'Verification failed.');
          return;
        }

        // Track priority_purchase event
        fetch('/api/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName: 'priority_purchase',
            pagePath: window.location.pathname,
            timestamp: new Date().toISOString(),
            metadata: { applicationId, token, amount: 49 },
          }),
        }).catch(() => {});

        setStatus('success');
      } catch {
        setStatus('error');
        setErrorMsg('Network error verifying payment.');
      }
    }

    capturePayment();
  }, [token, applicationId, email]);

  return (
    <>
      <div className="mca-success-page">
        <div className="mca-success-card">
          {status === 'loading' && (
            <div className="mca-success-loading">
              <div className="mca-spinner" />
              <h2>Verifying Your Payment…</h2>
              <p>Please do not close this window or click back.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="mca-success-content">
              <div className="mca-success-icon">⚡</div>
              <h1>Priority Processing Activated!</h1>
              <p className="mca-success-subtitle">
                Your payment of <strong>CAD $49</strong> was processed successfully.
              </p>

              <div className="mca-success-details">
                <div className="mca-detail-row">
                  <span>Application ID:</span>
                  <strong>{applicationId}</strong>
                </div>
                <div className="mca-detail-row">
                  <span>PayPal Order ID:</span>
                  <strong>{token}</strong>
                </div>
                <div className="mca-detail-row">
                  <span>Confirmation Email:</span>
                  <strong>{email}</strong>
                </div>
              </div>

              <div className="mca-success-next">
                <h3>What happens next?</h3>
                <ul>
                  <li>🔒 <strong>Fast-Track Review:</strong> A dedicated specialist reviews your bank statements within 4 hours.</li>
                  <li>📋 <strong>Readiness Assessment:</strong> We compile your readiness feedback report.</li>
                  <li>🚀 <strong>Priority Forward:</strong> Your application moves straight to the front of the funding queue.</li>
                </ul>
              </div>

              <button 
                onClick={() => router.push(`/thank-you?id=${applicationId}&email=${encodeURIComponent(email)}`)}
                className="mca-btn-primary"
              >
                Return to Confirmation Page →
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="mca-success-error">
              <div className="mca-error-icon">⚠️</div>
              <h1>Payment Verification Issue</h1>
              <p className="mca-error-msg">{errorMsg}</p>
              <p>
                If your payment was processed by PayPal, please contact us with your details and Application ID to manually activate priority processing.
              </p>
              <div className="mca-btn-row-center">
                <a href={`/thank-you?id=${applicationId}&email=${encodeURIComponent(email)}`} className="mca-btn-secondary">
                  Go back to thank-you page
                </a>
                <a href="mailto:info@fsidigital.ca" className="mca-btn-primary">
                  Contact Support
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .mca-success-page {
          min-height: 80vh;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          font-family: var(--font-inter, system-ui, sans-serif);
        }
        .mca-success-card {
          max-width: 600px;
          width: 100%;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          padding: 3rem 2rem;
          text-align: center;
        }
        .mca-spinner {
          width: 48px; height: 48px;
          border: 4px solid #eff6ff;
          border-top-color: #1a56db;
          border-radius: 50%;
          animation: mca-spin 0.8s linear infinite;
          margin: 0 auto 1.5rem;
        }
        @keyframes mca-spin { to { transform: rotate(360deg); } }
        
        .mca-success-loading h2 { font-size: 1.4rem; color: #111827; margin: 0 0 0.5rem; }
        .mca-success-loading p { color: #6b7280; font-size: 0.92rem; margin: 0; }

        .mca-success-icon {
          width: 72px; height: 72px;
          background: #1a56db;
          color: #fff;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem;
          margin: 0 auto 1.5rem;
          box-shadow: 0 4px 20px rgba(26,86,219,0.3);
        }
        .mca-success-content h1 { font-size: 1.8rem; font-weight: 800; color: #111827; margin: 0 0 0.5rem; }
        .mca-success-subtitle { color: #4b5563; font-size: 1rem; margin: 0 0 2rem; }
        
        .mca-success-details {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 1.25rem;
          margin-bottom: 2rem;
          text-align: left;
        }
        .mca-detail-row {
          display: flex; justify-content: space-between;
          padding: 0.4rem 0;
          font-size: 0.88rem;
          border-bottom: 1px dashed #e2e8f0;
        }
        .mca-detail-row:last-child { border-bottom: none; }
        .mca-detail-row span { color: #6b7280; }
        .mca-detail-row strong { color: #111827; }

        .mca-success-next {
          text-align: left;
          margin-bottom: 2.25rem;
        }
        .mca-success-next h3 { font-size: 1rem; color: #111827; margin: 0 0 0.75rem; }
        .mca-success-next ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; }
        .mca-success-next li { font-size: 0.88rem; color: #4b5563; display: flex; gap: 0.5rem; align-items: flex-start; }

        .mca-btn-primary {
          background: #1a56db;
          color: #fff;
          border: none;
          padding: 0.85rem 2rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s;
          display: inline-block;
          text-decoration: none;
          width: 100%;
        }
        .mca-btn-primary:hover { background: #1e40af; }

        .mca-error-icon {
          font-size: 3rem; margin-bottom: 1rem;
        }
        .mca-success-error h1 { color: #dc2626; font-size: 1.6rem; margin: 0 0 0.75rem; }
        .mca-error-msg { color: #b91c1c; font-size: 0.95rem; font-weight: 600; }
        .mca-success-error p { color: #6b7280; font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem; }
        
        .mca-btn-row-center {
          display: flex; gap: 1rem; justify-content: center; align-items: center;
          flex-direction: column;
        }
        .mca-btn-secondary {
          border: 1px solid #d1d5db;
          color: #374151;
          padding: 0.85rem 2rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          display: inline-block;
          width: 100%;
        }
        .mca-btn-secondary:hover { background: #f9fafb; }
      `}</style>
    </>
  );
}

export default function PrioritySuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Loading verification page…</div>}>
      <PrioritySuccessContent />
    </Suspense>
  );
}
