// app/(mca)/layout.tsx
// MCA route group layout — clean, trust-focused, conversion-optimised

import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.fsidigital.ca'),
  robots: { index: true, follow: true },
};

export default function MCALayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Minimal navbar — keeps focus on conversion */}
      <header className="mca-nav">
        <div className="mca-nav-inner">
          <a href="/" className="mca-logo" aria-label="FSI Digital — Home">
            <span className="mca-logo-fsi">FSI</span>
            <span className="mca-logo-digital">Digital</span>
            <span className="mca-logo-tag">Business Funding</span>
          </a>
          <div className="mca-nav-trust">
            <span>🔒 Secure &amp; Encrypted</span>
            <span>🇨🇦 Canadian Business</span>
            <a href="tel:+1-800-000-0000" className="mca-nav-phone">Contact Us</a>
          </div>
        </div>
      </header>

      <main>{children}</main>

      {/* Footer */}
      <footer className="mca-footer">
        <div className="mca-footer-inner">
          <div className="mca-footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact</a>
          </div>
          <p className="mca-footer-disclaimer">
            FSI Digital is an independent business funding advisory platform. We do not provide loans directly.
            Applications are reviewed and forwarded to our funding partners. Approval is subject to lender criteria.
            Merchant Cash Advances are not loans — they are advances against future receivables.
            All amounts are in Canadian dollars (CAD).
          </p>
          <p className="mca-footer-copy">
            © {new Date().getFullYear()} FSI Digital Inc. All rights reserved.
          </p>
        </div>
      </footer>

      <style>{`
        .mca-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #fff;
          border-bottom: 1px solid #e8ecf0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .mca-nav-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .mca-logo {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1;
        }
        .mca-logo-fsi { color: #1a56db; }
        .mca-logo-digital { color: #111827; }
        .mca-logo-tag {
          font-size: 0.65rem;
          font-weight: 500;
          color: #6b7280;
          background: #f3f4f6;
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 4px;
          letter-spacing: 0.02em;
        }
        .mca-nav-trust {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.8rem;
          color: #6b7280;
        }
        .mca-nav-phone {
          background: #1a56db;
          color: #fff;
          padding: 0.4rem 0.9rem;
          border-radius: 6px;
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 600;
          transition: background 0.15s;
        }
        .mca-nav-phone:hover { background: #1e40af; }
        @media (max-width: 600px) {
          .mca-nav-trust span { display: none; }
          .mca-logo-tag { display: none; }
        }
        .mca-footer {
          background: #111827;
          color: #9ca3af;
          padding: 2.5rem 1.5rem;
          margin-top: 4rem;
        }
        .mca-footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          text-align: center;
        }
        .mca-footer-links {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .mca-footer-links a {
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.15s;
        }
        .mca-footer-links a:hover { color: #fff; }
        .mca-footer-disclaimer {
          font-size: 0.75rem;
          line-height: 1.6;
          max-width: 700px;
          color: #6b7280;
        }
        .mca-footer-copy {
          font-size: 0.75rem;
          color: #4b5563;
        }
      `}</style>
    </>
  );
}
