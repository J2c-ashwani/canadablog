'use client';

// app/(mca)/funding-calculator/page.tsx
// Interactive MCA Funding Calculator with conversion path to apply form

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CANADIAN_PROVINCES = [
  { code: 'AB', name: 'Alberta' },
  { code: 'BC', name: 'British Columbia' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'NL', name: 'Newfoundland and Labrador' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'NT', name: 'Northwest Territories' },
  { code: 'NU', name: 'Nunavut' },
  { code: 'ON', name: 'Ontario' },
  { code: 'PE', name: 'Prince Edward Island' },
  { code: 'QC', name: 'Quebec' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'YT', name: 'Yukon' },
];

const INDUSTRIES = [
  { name: 'Restaurant / Food Service', multiplier: 0.9, risk: 'Medium' },
  { name: 'Retail', multiplier: 1.0, risk: 'Medium' },
  { name: 'Construction', multiplier: 0.8, risk: 'High' },
  { name: 'Transportation / Trucking', multiplier: 0.85, risk: 'Medium' },
  { name: 'Healthcare / Medical', multiplier: 1.2, risk: 'Low' },
  { name: 'Auto Repair / Automotive', multiplier: 1.0, risk: 'Low' },
  { name: 'Manufacturing', multiplier: 1.1, risk: 'Low' },
  { name: 'Professional Services', multiplier: 1.15, risk: 'Low' },
  { name: 'Real Estate', multiplier: 0.7, risk: 'High' },
  { name: 'Hospitality / Hotel', multiplier: 1.0, risk: 'Medium' },
  { name: 'Beauty / Salon', multiplier: 0.95, risk: 'Medium' },
  { name: 'Fitness / Gym', multiplier: 0.9, risk: 'Medium' },
  { name: 'Technology', multiplier: 1.25, risk: 'Low' },
  { name: 'Other', multiplier: 0.8, risk: 'Medium' },
];

export default function CalculatorPage() {
  const router = useRouter();
  
  const [revenue, setRevenue] = useState(25000);
  const [industry, setIndustry] = useState('');
  const [province, setProvince] = useState('');
  const [years, setYears] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    // Track calculator start
    fetch('/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'calculator_start',
        pagePath: window.location.pathname,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {});
  }, []);

  // Calculator calculations
  const selectedInd = INDUSTRIES.find(i => i.name === industry);
  const indMultiplier = selectedInd?.multiplier ?? 1.0;
  
  let yearsMultiplier = 0.8;
  if (years === '1.5') yearsMultiplier = 1.0;
  else if (years === '3') yearsMultiplier = 1.15;
  else if (years === '7') yearsMultiplier = 1.25;
  else if (years === '15') yearsMultiplier = 1.35;

  const minFunding = Math.round(revenue * 0.7 * indMultiplier * yearsMultiplier);
  const maxFunding = Math.round(revenue * 1.4 * indMultiplier * yearsMultiplier);

  const factorRateLow = selectedInd?.risk === 'Low' ? 1.18 : selectedInd?.risk === 'Medium' ? 1.24 : 1.29;
  const factorRateHigh = selectedInd?.risk === 'Low' ? 1.25 : selectedInd?.risk === 'Medium' ? 1.32 : 1.39;

  const averageFunding = Math.round((minFunding + maxFunding) / 2);
  const estRepaymentLow = Math.round(averageFunding * factorRateLow);
  const estRepaymentHigh = Math.round(averageFunding * factorRateHigh);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry || !province || !years) return;
    
    // Track calculator complete
    fetch('/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'calculator_complete',
        pagePath: window.location.pathname,
        timestamp: new Date().toISOString(),
        metadata: { revenue, industry, province, yearsInBusiness: years, averageFunding },
      }),
    }).catch(() => {});

    setShowResult(true);
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email || !email.includes('@')) {
      setFormError('Please enter a valid business email address.');
      return;
    }

    if (!phone || phone.replace(/[^0-9]/g, '').length < 7) {
      setFormError('Please enter a valid business phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save lead to API (Google Sheets & DB sync)
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: companyName || 'Founder',
          email,
          phone,
          companyName,
          category: 'MCA Funding Calculator',
          country: 'Canada',
          state: province,
          industry,
          businessStage: `$${revenue.toLocaleString()}/mo`,
          annualRevenue: `$${revenue.toLocaleString()}/mo`,
          fundingAmount: `$${minFunding.toLocaleString()} - $${maxFunding.toLocaleString()}`,
          fundingPurpose: 'Working Capital / MCA Expansion',
          businessDescription: `MCA Funding Calculator submission. Industry: ${industry}, Province: ${province}, Revenue: $${revenue.toLocaleString()}/mo, Estimated Funding: $${averageFunding.toLocaleString()}`,
          consentToPartnerContact: true,
          pagePath: window.location.pathname,
        }),
      });
    } catch (err) {
      console.error('Failed to save MCA calculator lead:', err);
    } finally {
      setIsSubmitting(false);
    }

    const query = new URLSearchParams({
      monthlyRevenue: revenue.toString(),
      industry,
      province,
      yearsInBusiness: years,
      fundingAmount: averageFunding.toString(),
      email,
      phone,
    });
    router.push(`/apply?${query.toString()}`);
  };

  return (
    <>
      <div className="mca-calc-page">
        {/* Header */}
        <div className="mca-calc-header">
          <h1>Business Funding Calculator</h1>
          <p>Estimate your potential funding amount and check eligibility in 60 seconds</p>
        </div>

        <div className="mca-calc-container">
          {/* Form Card */}
          <div className="mca-calc-card">
            <form onSubmit={handleCalculate}>
              {/* Revenue Slider */}
              <div className="mca-field">
                <div className="mca-field-header">
                  <label htmlFor="revenue-slider">Average Monthly Revenue (CAD)</label>
                  <span className="mca-field-value">${revenue.toLocaleString()}</span>
                </div>
                <input
                  id="revenue-slider"
                  type="range"
                  min="5000"
                  max="250000"
                  step="5000"
                  value={revenue}
                  onChange={(e) => {
                    setRevenue(parseInt(e.target.value));
                    setShowResult(false); // reset on edit
                  }}
                  className="mca-slider"
                />
                <div className="mca-slider-labels">
                  <span>$5,000</span>
                  <span>$125,000</span>
                  <span>$250,000+</span>
                </div>
              </div>

              {/* Grid fields */}
              <div className="mca-field-grid">
                <div className="mca-field">
                  <label htmlFor="calc-industry">Industry</label>
                  <select
                    id="calc-industry"
                    value={industry}
                    onChange={(e) => {
                      setIndustry(e.target.value);
                      setShowResult(false);
                    }}
                    required
                  >
                    <option value="">Select industry</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind.name} value={ind.name}>{ind.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mca-field">
                  <label htmlFor="calc-province">Province</label>
                  <select
                    id="calc-province"
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                      setShowResult(false);
                    }}
                    required
                  >
                    <option value="">Select province</option>
                    {CANADIAN_PROVINCES.map((p) => (
                      <option key={p.code} value={p.code}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mca-field full">
                  <label htmlFor="calc-years">Years in Business</label>
                  <select
                    id="calc-years"
                    value={years}
                    onChange={(e) => {
                      setYears(e.target.value);
                      setShowResult(false);
                    }}
                    required
                  >
                    <option value="">Select time in business</option>
                    <option value="0.5">Less than 1 year</option>
                    <option value="1.5">1 – 2 years</option>
                    <option value="3">2 – 5 years</option>
                    <option value="7">5 – 10 years</option>
                    <option value="15">10+ years</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="mca-btn-primary full-width"
                disabled={!industry || !province || !years}
              >
                Calculate Funding Estimate →
              </button>
            </form>
          </div>

          {/* Results section */}
          {showResult && (
            <div className="mca-result-card animated">
              <span className="mca-result-badge">ESTIMATED FUNDING</span>
              <h2 className="mca-result-range">
                ${minFunding.toLocaleString()} – ${maxFunding.toLocaleString()}
              </h2>
              <p className="mca-result-sub">
                Based on your monthly deposits of <strong>${revenue.toLocaleString()}</strong> in the {industry} sector.
              </p>

              <div className="mca-result-metrics">
                <div className="mca-metric-row">
                  <span>Factor Rate Estimate:</span>
                  <strong>{factorRateLow.toFixed(2)} – {factorRateHigh.toFixed(2)}</strong>
                </div>
                <div className="mca-metric-row">
                  <span>Approx. Total Repayment:</span>
                  <strong>${estRepaymentLow.toLocaleString()} – ${estRepaymentHigh.toLocaleString()}</strong>
                </div>
                <div className="mca-metric-row">
                  <span>Estimated Approval Speed:</span>
                  <strong className="text-success">24 – 72 Hours</strong>
                </div>
                <div className="mca-metric-row">
                  <span>Eligibility Assessment:</span>
                  <strong className={revenue >= 10000 && parseFloat(years) >= 1 ? 'text-success' : 'text-warning'}>
                    {revenue >= 15000 && parseFloat(years) >= 1.5 ? 'Strong Match' : revenue >= 10000 ? 'Moderate Match' : 'Review Required'}
                  </strong>
                </div>
              </div>

              <form onSubmit={handleApply} className="mca-result-cta text-left space-y-3">
                <p className="font-bold text-slate-800 text-sm mb-2 text-center">
                  Unlock Your Application & Save Your ${averageFunding.toLocaleString()} Estimate
                </p>

                {formError && (
                  <p className="text-xs text-red-600 font-semibold text-center bg-red-50 p-2 rounded-lg border border-red-200">
                    {formError}
                  </p>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="mca-btn-submit mt-3">
                  {isSubmitting ? 'Saving Estimate...' : `🔒 Save & Apply Online for $${averageFunding.toLocaleString()} →`}
                </button>
              </form>

              <p className="mca-calc-disclaimer">
                * This estimate is for informational purposes only and does not constitute a funding offer or approval. Actual funding amounts and terms are determined by our funding partner based on a full review of your application and business documents.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .mca-calc-page {
          min-height: 80vh;
          background: #f8fafc;
          padding-bottom: 4rem;
          font-family: var(--font-inter, system-ui, sans-serif);
        }
        .mca-calc-header {
          background: linear-gradient(135deg, #1a56db 0%, #1e3a8a 100%);
          color: #fff;
          text-align: center;
          padding: 3rem 1.5rem 2rem;
        }
        .mca-calc-header h1 {
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 800;
          margin: 0 0 0.5rem;
          letter-spacing: -0.02em;
        }
        .mca-calc-header p {
          font-size: 0.95rem;
          opacity: 0.85;
          margin: 0;
        }
        .mca-calc-container {
          max-width: 900px;
          margin: 2rem auto 0;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 1.5rem;
          padding: 0 1.5rem;
        }
        @media (max-width: 768px) {
          .mca-calc-container { grid-template-columns: 1fr; }
        }
        .mca-calc-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          padding: 2rem;
          height: fit-content;
        }
        .mca-field { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.25rem; }
        .mca-field.full { grid-column: 1 / -1; }
        .mca-field-header { display: flex; justify-content: space-between; align-items: baseline; }
        .mca-field-header label { font-size: 0.85rem; font-weight: 600; color: #374151; }
        .mca-field-value { font-size: 1.25rem; font-weight: 800; color: #1a56db; }
        
        .mca-slider {
          -webkit-appearance: none;
          width: 100%; height: 6px;
          background: #e2e8f0; border-radius: 100px;
          outline: none; margin: 0.5rem 0;
        }
        .mca-slider::-webkit-slider-thumb {
          -webkit-appearance: none; width: 20px; height: 20px;
          border-radius: 50%; background: #1a56db; cursor: pointer;
          transition: transform 0.1s;
        }
        .mca-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
        .mca-slider-labels { display: flex; justify-content: space-between; font-size: 0.72rem; color: #9ca3af; }
        
        .mca-field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
        @media (max-width: 480px) { .mca-field-grid { grid-template-columns: 1fr; } }
        .mca-field label { font-size: 0.82rem; font-weight: 600; color: #374151; }
        .mca-field select {
          padding: 0.65rem 0.9rem; border: 1.5px solid #d1d5db; border-radius: 8px;
          font-size: 0.92rem; color: #111827; background: #fff; outline: none;
        }
        .mca-field select:focus { border-color: #1a56db; }

        .mca-btn-primary {
          background: #1a56db; color: #fff; border: none;
          padding: 0.9rem 2rem; border-radius: 10px; font-size: 1rem;
          font-weight: 700; cursor: pointer; transition: background 0.15s;
        }
        .mca-btn-primary:hover { background: #1e40af; }
        .mca-btn-primary.full-width { width: 100%; }

        /* ─ Results ─ */
        .mca-result-card {
          background: #fff; border-radius: 16px;
          box-shadow: 0 4px 24px rgba(26,86,219,0.12);
          border: 2px solid #bfdbfe;
          padding: 2.25rem 2rem;
          height: fit-content;
          text-align: center;
        }
        .mca-result-card.animated {
          animation: mca-slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes mca-slide-up {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .mca-result-badge {
          display: inline-block; background: #eff6ff; color: #1a56db;
          font-size: 0.65rem; font-weight: 800; letter-spacing: 0.1em;
          padding: 3px 10px; border-radius: 100px; margin-bottom: 0.75rem;
        }
        .mca-result-range { font-size: 1.8rem; font-weight: 900; color: #111827; margin: 0 0 0.5rem; letter-spacing: -0.03em; }
        .mca-result-sub { font-size: 0.85rem; color: #6b7280; line-height: 1.5; margin: 0 0 1.5rem; }
        
        .mca-result-metrics { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.75rem; }
        .mca-metric-row { display: flex; justify-content: space-between; font-size: 0.85rem; padding-bottom: 0.6rem; border-bottom: 1px dashed #e2e8f0; }
        .mca-metric-row:last-child { border-bottom: none; }
        .mca-metric-row span { color: #6b7280; }
        .mca-metric-row strong { color: #111827; }
        
        .text-success { color: #16a34a !important; }
        .text-warning { color: #d97706 !important; }

        .mca-result-cta { background: #f8fafc; border-radius: 10px; padding: 1.25rem; border: 1px solid #e5e7eb; margin-bottom: 1rem; }
        .mca-result-cta p { font-size: 0.82rem; color: #4b5563; margin: 0 0 0.75rem; line-height: 1.4; }
        
        .mca-btn-submit {
          background: #16a34a; color: #fff; border: none;
          padding: 0.8rem 1.5rem; border-radius: 8px; font-size: 0.95rem;
          font-weight: 700; cursor: pointer; transition: background 0.15s; width: 100%;
        }
        .mca-btn-submit:hover { background: #15803d; }
        
        .mca-calc-disclaimer { font-size: 0.7rem; color: #9ca3af; line-height: 1.5; text-align: left; }
      `}</style>
    </>
  );
}
