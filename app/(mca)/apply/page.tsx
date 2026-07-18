'use client';

// app/(mca)/apply/page.tsx
// 3-Step MCA Application Form
// Step 1: Business Identity | Step 2: Financial Profile | Step 3: Documents + Consent

import { useState, useRef, useEffect } from 'react';
import type { Metadata } from 'next';

// ─── Canadian Data ────────────────────────────────────────────────────────────

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
  'Restaurant / Food Service',
  'Retail',
  'Construction',
  'Transportation / Trucking',
  'Healthcare / Medical',
  'Auto Repair / Automotive',
  'Manufacturing',
  'Professional Services',
  'Real Estate',
  'Hospitality / Hotel',
  'Beauty / Salon',
  'Fitness / Gym',
  'Technology',
  'Other',
];

const FUNDING_PURPOSES = [
  'Working Capital / Cash Flow',
  'Equipment Purchase',
  'Inventory',
  'Renovation / Expansion',
  'Payroll',
  'Marketing / Advertising',
  'Tax Obligations',
  'Debt Consolidation',
  'New Location',
  'Other',
];

const YEARS_OPTIONS = [
  { value: '0.5', label: 'Less than 1 year' },
  { value: '1.5', label: '1 – 2 years' },
  { value: '3', label: '2 – 5 years' },
  { value: '7', label: '5 – 10 years' },
  { value: '15', label: '10+ years' },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  // Step 1
  legalBusinessName: string;
  tradeName: string;
  businessRegistrationNumber: string;
  businessAddress: string;
  city: string;
  province: string;
  postalCode: string;
  ownerName: string;
  email: string;
  phone: string;
  website: string;
  // Step 2
  industry: string;
  yearsInBusiness: string;
  employees: string;
  monthlyRevenue: string;
  fundingAmount: string;
  fundingPurpose: string;
  // Step 3
  consentToShare: boolean;
  consent: boolean;
}

interface UploadedFile {
  name: string;
  sizeBytes: number;
  storageUrl: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    legalBusinessName: '', tradeName: '', businessRegistrationNumber: '',
    businessAddress: '', city: '', province: '', postalCode: '',
    ownerName: '', email: '', phone: '', website: '',
    industry: '', yearsInBusiness: '', employees: '',
    monthlyRevenue: '', fundingAmount: '', fundingPurpose: '',
    consentToShare: false, consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const monthlyRevenue = params.get('monthlyRevenue') || '';
    const industry = params.get('industry') || '';
    const province = params.get('province') || '';
    const yearsInBusiness = params.get('yearsInBusiness') || '';
    const fundingAmount = params.get('fundingAmount') || '';

    // Standardize matching options
    const matchedIndustry = INDUSTRIES.find(
      (ind) => ind.toLowerCase() === industry.toLowerCase()
    ) || '';

    const matchedProvince = CANADIAN_PROVINCES.find(
      (p) => p.code.toUpperCase() === province.toUpperCase()
    )?.code || '';

    setForm((prev) => ({
      ...prev,
      monthlyRevenue: monthlyRevenue ? Number(monthlyRevenue).toLocaleString() : prev.monthlyRevenue,
      industry: matchedIndustry || prev.industry,
      province: matchedProvince || prev.province,
      yearsInBusiness: yearsInBusiness || prev.yearsInBusiness,
      fundingAmount: fundingAmount ? Number(fundingAmount).toLocaleString() : prev.fundingAmount,
    }));
  }, []);

  // ─── Field update ──────────────────────────────────────────────────────────

  const set = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // ─── Validation ────────────────────────────────────────────────────────────

  function validateStep1(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.legalBusinessName.trim()) e.legalBusinessName = 'Legal business name is required';
    if (!form.businessAddress.trim()) e.businessAddress = 'Business address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.province) e.province = 'Province is required';
    if (!form.postalCode.trim()) e.postalCode = 'Postal code is required';
    if (!form.ownerName.trim()) e.ownerName = 'Owner name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email address is required';
    if (form.phone.replace(/[^0-9]/g, '').length < 10) e.phone = 'Valid 10-digit phone number is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.industry) e.industry = 'Please select your industry';
    if (!form.yearsInBusiness) e.yearsInBusiness = 'Please select years in business';
    if (!form.monthlyRevenue || Number(form.monthlyRevenue.replace(/,/g, '')) <= 0) {
      e.monthlyRevenue = 'Monthly revenue is required';
    }
    if (!form.fundingAmount || Number(form.fundingAmount.replace(/,/g, '')) < 1000) {
      e.fundingAmount = 'Funding amount must be at least $1,000';
    }
    if (!form.fundingPurpose) e.fundingPurpose = 'Please select funding purpose';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep3(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (uploadedFiles.length === 0) {
      setUploadError('Bank statements are required to submit your application');
    }
    if (!form.consentToShare) e.consentToShare = 'Authorization to share documents is required';
    if (!form.consent) e.consent = 'Agreement to terms is required';
    setErrors(e);
    return uploadedFiles.length > 0 && Object.keys(e).length === 0;
  }

  // ─── Navigation ────────────────────────────────────────────────────────────

  const goNext = () => {
    const valid = step === 1 ? validateStep1() : step === 2 ? validateStep2() : false;
    if (valid) {
      setStep((s) => s + 1);
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goBack = () => {
    setStep((s) => s - 1);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ─── File Upload ───────────────────────────────────────────────────────────

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadError('');

    const data = new FormData();
    Array.from(files).forEach((f) => data.append('file', f));

    try {
      const res = await fetch('/api/mca/upload', { method: 'POST', body: data });
      const json = await res.json();

      if (!res.ok) {
        setUploadError(json.error ?? 'Upload failed. Please try again.');
        return;
      }

      const newFiles: UploadedFile[] = json.files ?? [];
      setUploadedFiles((prev) => {
        const combined = [...prev, ...newFiles];
        if (combined.length > 5) {
          setUploadError('Maximum 5 files allowed.');
          return prev;
        }
        return combined;
      });
    } catch {
      setUploadError('Upload failed. Please check your connection and try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadError('');
  };

  // ─── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setSubmitting(true);

    // Read UTM params from URL
    const params = new URLSearchParams(window.location.search);

    const payload = {
      legalBusinessName: form.legalBusinessName,
      tradeName: form.tradeName || undefined,
      businessRegistrationNumber: form.businessRegistrationNumber || undefined,
      businessAddress: form.businessAddress,
      city: form.city,
      province: form.province,
      postalCode: form.postalCode,
      ownerName: form.ownerName,
      email: form.email,
      phone: form.phone,
      website: form.website || undefined,
      industry: form.industry,
      yearsInBusiness: parseFloat(form.yearsInBusiness),
      employees: form.employees ? parseInt(form.employees) : undefined,
      monthlyRevenue: parseFloat(form.monthlyRevenue.replace(/,/g, '')),
      fundingAmount: parseFloat(form.fundingAmount.replace(/,/g, '')),
      fundingPurpose: form.fundingPurpose,
      storageFileUrls: uploadedFiles.map((f) => f.storageUrl),
      fileCount: uploadedFiles.length,
      consentToShare: form.consentToShare,
      consent: form.consent,
      utmSource: params.get('utm_source') || undefined,
      utmMedium: params.get('utm_medium') || undefined,
      utmCampaign: params.get('utm_campaign') || undefined,
      landingPage: window.location.pathname,
      referrer: document.referrer || undefined,
    };

    try {
      const res = await fetch('/api/mca/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (res.status === 409 && json.duplicate) {
        setErrors({});
        setSubmitting(false);
        // Show duplicate notice
        setApplicationId('DUPLICATE');
        setStep(4);
        return;
      }

      if (!res.ok) {
        setErrors({});
        setUploadError(json.error ?? 'Submission failed. Please try again.');
        setSubmitting(false);
        return;
      }

      // Track application_submit
      fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: 'application_submit',
          pagePath: window.location.pathname,
          timestamp: new Date().toISOString(),
          metadata: { applicationId: json.applicationId, industry: form.industry, province: form.province },
        }),
      }).catch(() => {});

      setApplicationId(json.applicationId);
      window.location.href = `/thank-you?id=${json.applicationId}&email=${encodeURIComponent(form.email)}`;
    } catch {
      setUploadError('Submission failed. Please check your connection and try again.');
      setSubmitting(false);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="mca-apply-page" ref={topRef}>
        {/* Header */}
        <div className="mca-apply-header">
          <h1>Apply for Business Funding</h1>
          <p>Free application · No credit impact · Canadian businesses only · 3-minute process</p>
        </div>

        {/* Progress Steps */}
        <div className="mca-steps-wrap">
          <div className="mca-steps">
            {['Business Identity', 'Financial Profile', 'Bank Statements'].map((label, i) => {
              const n = i + 1;
              const active = step === n;
              const done = step > n;
              return (
                <div key={n} className={`mca-step ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
                  <div className="mca-step-circle">
                    {done ? '✓' : n}
                  </div>
                  <span className="mca-step-label">{label}</span>
                  {i < 2 && <div className={`mca-step-line ${done ? 'done' : ''}`} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="mca-form-card">

          {/* ── STEP 1: Business Identity ─────────────────────────────────── */}
          {step === 1 && (
            <div className="mca-form-section">
              <h2 className="mca-section-title">Tell us about your business</h2>
              <p className="mca-section-sub">All information is kept strictly confidential and secure.</p>

              <div className="mca-field-grid">
                <div className="mca-field full">
                  <label htmlFor="legalBusinessName">Legal Business Name <span className="req">*</span></label>
                  <input id="legalBusinessName" type="text" placeholder="As registered with the government"
                    value={form.legalBusinessName} onChange={(e) => set('legalBusinessName', e.target.value)}
                    className={errors.legalBusinessName ? 'error' : ''} />
                  {errors.legalBusinessName && <span className="mca-error">{errors.legalBusinessName}</span>}
                </div>

                <div className="mca-field">
                  <label htmlFor="tradeName">Trade / Operating Name <span className="opt">(optional)</span></label>
                  <input id="tradeName" type="text" placeholder="If different from legal name"
                    value={form.tradeName} onChange={(e) => set('tradeName', e.target.value)} />
                </div>

                <div className="mca-field">
                  <label htmlFor="businessRegistrationNumber">Business Registration Number <span className="opt">(optional)</span></label>
                  <input id="businessRegistrationNumber" type="text" placeholder="BN or CRA number"
                    value={form.businessRegistrationNumber} onChange={(e) => set('businessRegistrationNumber', e.target.value)} />
                </div>

                <div className="mca-field full">
                  <label htmlFor="businessAddress">Business Address <span className="req">*</span></label>
                  <input id="businessAddress" type="text" placeholder="Street address"
                    value={form.businessAddress} onChange={(e) => set('businessAddress', e.target.value)}
                    className={errors.businessAddress ? 'error' : ''} />
                  {errors.businessAddress && <span className="mca-error">{errors.businessAddress}</span>}
                </div>

                <div className="mca-field">
                  <label htmlFor="city">City <span className="req">*</span></label>
                  <input id="city" type="text" placeholder="City"
                    value={form.city} onChange={(e) => set('city', e.target.value)}
                    className={errors.city ? 'error' : ''} />
                  {errors.city && <span className="mca-error">{errors.city}</span>}
                </div>

                <div className="mca-field">
                  <label htmlFor="province">Province <span className="req">*</span></label>
                  <select id="province" value={form.province} onChange={(e) => set('province', e.target.value)}
                    className={errors.province ? 'error' : ''}>
                    <option value="">Select province</option>
                    {CANADIAN_PROVINCES.map((p) => (
                      <option key={p.code} value={p.code}>{p.name}</option>
                    ))}
                  </select>
                  {errors.province && <span className="mca-error">{errors.province}</span>}
                </div>

                <div className="mca-field">
                  <label htmlFor="postalCode">Postal Code <span className="req">*</span></label>
                  <input id="postalCode" type="text" placeholder="A1A 1A1"
                    value={form.postalCode} onChange={(e) => set('postalCode', e.target.value.toUpperCase())}
                    className={errors.postalCode ? 'error' : ''} maxLength={7} />
                  {errors.postalCode && <span className="mca-error">{errors.postalCode}</span>}
                </div>

                <div className="mca-field">
                  <label htmlFor="ownerName">Owner / Director Name <span className="req">*</span></label>
                  <input id="ownerName" type="text" placeholder="Full legal name"
                    value={form.ownerName} onChange={(e) => set('ownerName', e.target.value)}
                    className={errors.ownerName ? 'error' : ''} />
                  {errors.ownerName && <span className="mca-error">{errors.ownerName}</span>}
                </div>

                <div className="mca-field">
                  <label htmlFor="email">Business Email <span className="req">*</span></label>
                  <input id="email" type="email" placeholder="owner@yourbusiness.com"
                    value={form.email} onChange={(e) => set('email', e.target.value)}
                    className={errors.email ? 'error' : ''} />
                  {errors.email && <span className="mca-error">{errors.email}</span>}
                </div>

                <div className="mca-field">
                  <label htmlFor="phone">Phone Number <span className="req">*</span></label>
                  <input id="phone" type="tel" placeholder="(416) 000-0000"
                    value={form.phone} onChange={(e) => set('phone', e.target.value)}
                    className={errors.phone ? 'error' : ''} />
                  {errors.phone && <span className="mca-error">{errors.phone}</span>}
                </div>

                <div className="mca-field">
                  <label htmlFor="website">Business Website <span className="opt">(optional)</span></label>
                  <input id="website" type="url" placeholder="https://yourbusiness.com"
                    value={form.website} onChange={(e) => set('website', e.target.value)} />
                </div>
              </div>

              <button id="mca-step1-next" className="mca-btn-primary" onClick={goNext}>
                Continue to Financial Profile →
              </button>
            </div>
          )}

          {/* ── STEP 2: Financial Profile ─────────────────────────────────── */}
          {step === 2 && (
            <div className="mca-form-section">
              <h2 className="mca-section-title">Your financial profile</h2>
              <p className="mca-section-sub">This helps us match you with the right funding amount and process your application faster.</p>

              <div className="mca-field-grid">
                <div className="mca-field">
                  <label htmlFor="industry">Industry <span className="req">*</span></label>
                  <select id="industry" value={form.industry} onChange={(e) => set('industry', e.target.value)}
                    className={errors.industry ? 'error' : ''}>
                    <option value="">Select your industry</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                  {errors.industry && <span className="mca-error">{errors.industry}</span>}
                </div>

                <div className="mca-field">
                  <label htmlFor="yearsInBusiness">Years in Business <span className="req">*</span></label>
                  <select id="yearsInBusiness" value={form.yearsInBusiness} onChange={(e) => set('yearsInBusiness', e.target.value)}
                    className={errors.yearsInBusiness ? 'error' : ''}>
                    <option value="">Select years in business</option>
                    {YEARS_OPTIONS.map((y) => (
                      <option key={y.value} value={y.value}>{y.label}</option>
                    ))}
                  </select>
                  {errors.yearsInBusiness && <span className="mca-error">{errors.yearsInBusiness}</span>}
                </div>

                <div className="mca-field">
                  <label htmlFor="employees">Number of Employees <span className="opt">(optional)</span></label>
                  <input id="employees" type="number" min="0" placeholder="0"
                    value={form.employees} onChange={(e) => set('employees', e.target.value)} />
                </div>

                <div className="mca-field">
                  <label htmlFor="monthlyRevenue">Average Monthly Revenue (CAD) <span className="req">*</span></label>
                  <div className="mca-input-prefix">
                    <span>$</span>
                    <input id="monthlyRevenue" type="text" inputMode="numeric" placeholder="0"
                      value={form.monthlyRevenue} onChange={(e) => set('monthlyRevenue', e.target.value.replace(/[^0-9,]/g, ''))}
                      className={errors.monthlyRevenue ? 'error' : ''} />
                  </div>
                  {errors.monthlyRevenue && <span className="mca-error">{errors.monthlyRevenue}</span>}
                  <span className="mca-field-hint">Your average monthly deposits over the last 6 months</span>
                </div>

                <div className="mca-field">
                  <label htmlFor="fundingAmount">Funding Amount Requested (CAD) <span className="req">*</span></label>
                  <div className="mca-input-prefix">
                    <span>$</span>
                    <input id="fundingAmount" type="text" inputMode="numeric" placeholder="0"
                      value={form.fundingAmount} onChange={(e) => set('fundingAmount', e.target.value.replace(/[^0-9,]/g, ''))}
                      className={errors.fundingAmount ? 'error' : ''} />
                  </div>
                  {errors.fundingAmount && <span className="mca-error">{errors.fundingAmount}</span>}
                </div>

                <div className="mca-field full">
                  <label htmlFor="fundingPurpose">Funding Purpose <span className="req">*</span></label>
                  <select id="fundingPurpose" value={form.fundingPurpose} onChange={(e) => set('fundingPurpose', e.target.value)}
                    className={errors.fundingPurpose ? 'error' : ''}>
                    <option value="">Select primary purpose</option>
                    {FUNDING_PURPOSES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  {errors.fundingPurpose && <span className="mca-error">{errors.fundingPurpose}</span>}
                </div>
              </div>

              <div className="mca-btn-row">
                <button id="mca-step2-back" className="mca-btn-secondary" onClick={goBack}>← Back</button>
                <button id="mca-step2-next" className="mca-btn-primary" onClick={goNext}>
                  Continue to Bank Statements →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Documents + Consent ───────────────────────────────── */}
          {step === 3 && (
            <div className="mca-form-section">
              <h2 className="mca-section-title">Upload your bank statements</h2>

              <div className="mca-upload-notice">
                <div className="mca-upload-icon">📄</div>
                <p>
                  Please upload your <strong>last 6 months of business bank statements</strong>.
                  This helps our funding specialists assess your eligibility accurately and speeds up
                  the review process with our funding partner.
                </p>
              </div>

              {/* Upload Area */}
              <div className={`mca-upload-zone ${uploading ? 'uploading' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files.length > 0) {
                    const dt = new DataTransfer();
                    Array.from(e.dataTransfer.files).forEach((f) => dt.items.add(f));
                    if (fileInputRef.current) {
                      fileInputRef.current.files = dt.files;
                      fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                  }
                }}>
                <input ref={fileInputRef} type="file" accept=".pdf,application/pdf"
                  multiple style={{ display: 'none' }} onChange={handleFileChange} />
                {uploading ? (
                  <div className="mca-upload-uploading">
                    <div className="mca-spinner" />
                    <span>Uploading securely…</span>
                  </div>
                ) : (
                  <>
                    <div className="mca-upload-cloud">☁️</div>
                    <p className="mca-upload-main">Click to upload or drag &amp; drop</p>
                    <p className="mca-upload-sub">PDF files only · Max 10MB per file · Up to 5 files</p>
                  </>
                )}
              </div>

              {uploadError && <p className="mca-error mca-upload-error">{uploadError}</p>}

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mca-uploaded-files">
                  {uploadedFiles.map((f, i) => (
                    <div key={i} className="mca-uploaded-file">
                      <span className="mca-file-icon">📄</span>
                      <span className="mca-file-name">{f.name}</span>
                      <span className="mca-file-size">({Math.round(f.sizeBytes / 1024)} KB)</span>
                      <button className="mca-file-remove" onClick={() => removeFile(i)}
                        aria-label={`Remove ${f.name}`} type="button">✕</button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mca-upload-security">
                🔒 Your documents are encrypted and stored on secure private servers. They are only accessible to our funding specialists and your funding partner.
              </div>

              {/* Consent Checkboxes */}
              <div className="mca-consent-block">
                <label className={`mca-checkbox-label ${errors.consentToShare ? 'error' : ''}`}>
                  <input type="checkbox" id="consentToShare" checked={form.consentToShare}
                    onChange={(e) => set('consentToShare', e.target.checked)} />
                  <span>
                    I authorize FSI Digital to review my application and securely share my submitted information
                    and supporting documents with its funding partner(s) for the purpose of assessing my
                    business funding eligibility. <span className="req">*</span>
                  </span>
                </label>
                {errors.consentToShare && <span className="mca-error">{errors.consentToShare}</span>}

                <label className={`mca-checkbox-label ${errors.consent ? 'error' : ''}`}>
                  <input type="checkbox" id="consent" checked={form.consent}
                    onChange={(e) => set('consent', e.target.checked)} />
                  <span>
                    I agree to the <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a> and{' '}
                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                    I understand this application does not guarantee approval or funding. <span className="req">*</span>
                  </span>
                </label>
                {errors.consent && <span className="mca-error">{errors.consent}</span>}
              </div>

              <div className="mca-btn-row">
                <button id="mca-step3-back" className="mca-btn-secondary" onClick={goBack} disabled={submitting}>
                  ← Back
                </button>
                <button id="mca-step3-submit" className="mca-btn-submit" onClick={handleSubmit} disabled={submitting || uploading}>
                  {submitting ? (
                    <><div className="mca-spinner-sm" /> Submitting Application…</>
                  ) : (
                    '🔒 Submit Application →'
                  )}
                </button>
              </div>

              <p className="mca-submit-note">
                By submitting, you confirm all information is accurate. Free application — no payment required at this step.
              </p>
            </div>
          )}

          {/* ── DUPLICATE NOTICE ──────────────────────────────────────────── */}
          {step === 4 && applicationId === 'DUPLICATE' && (
            <div className="mca-form-section mca-duplicate">
              <div className="mca-duplicate-icon">⚠️</div>
              <h2>Existing Application Found</h2>
              <p>
                We found an existing application associated with your business information.
                If you would like to update your application or check its status, please contact our team directly.
              </p>
              <a href="mailto:info@fsidigital.ca" className="mca-btn-primary" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
                Contact Us About Your Application
              </a>
            </div>
          )}

        </div>

        {/* Trust bar */}
        <div className="mca-trust-bar">
          <div className="mca-trust-item">🔒<span>Secure Application</span></div>
          <div className="mca-trust-item">🇨🇦<span>Canadian Businesses Only</span></div>
          <div className="mca-trust-item">✅<span>No Credit Impact</span></div>
          <div className="mca-trust-item">⚡<span>Decision in 24–72 Hours</span></div>
        </div>
      </div>

      <style>{`
        .mca-apply-page {
          min-height: 80vh;
          background: #f8fafc;
          padding-bottom: 4rem;
          font-family: var(--font-inter, system-ui, sans-serif);
        }
        .mca-apply-header {
          background: linear-gradient(135deg, #1a56db 0%, #1e3a8a 100%);
          color: #fff;
          text-align: center;
          padding: 3rem 1.5rem 2rem;
        }
        .mca-apply-header h1 {
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 800;
          margin: 0 0 0.5rem;
          letter-spacing: -0.02em;
        }
        .mca-apply-header p {
          font-size: 0.95rem;
          opacity: 0.85;
          margin: 0;
        }
        /* ─ Steps ─ */
        .mca-steps-wrap {
          background: #fff;
          border-bottom: 1px solid #e8ecf0;
          padding: 1.25rem 1.5rem;
        }
        .mca-steps {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          position: relative;
        }
        .mca-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          flex: 1;
          gap: 0.4rem;
        }
        .mca-step-circle {
          width: 36px; height: 36px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; font-weight: 700;
          background: #e5e7eb; color: #6b7280;
          border: 2px solid #e5e7eb;
          transition: all 0.2s;
          position: relative; z-index: 2;
        }
        .mca-step.active .mca-step-circle {
          background: #1a56db; color: #fff; border-color: #1a56db;
        }
        .mca-step.done .mca-step-circle {
          background: #16a34a; color: #fff; border-color: #16a34a;
        }
        .mca-step-label {
          font-size: 0.72rem; font-weight: 500; color: #9ca3af;
          text-align: center; white-space: nowrap;
        }
        .mca-step.active .mca-step-label { color: #1a56db; font-weight: 700; }
        .mca-step.done .mca-step-label { color: #16a34a; }
        .mca-step-line {
          position: absolute;
          top: 18px; left: 60%; right: -60%;
          height: 2px; background: #e5e7eb; z-index: 1;
        }
        .mca-step-line.done { background: #16a34a; }
        /* ─ Form Card ─ */
        .mca-form-card {
          max-width: 760px;
          margin: 2rem auto 0;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          padding: 2.5rem;
        }
        @media (max-width: 640px) {
          .mca-form-card { margin: 1rem 1rem 0; padding: 1.5rem 1.25rem; }
        }
        .mca-section-title {
          font-size: 1.4rem; font-weight: 800; color: #111827;
          margin: 0 0 0.35rem; letter-spacing: -0.02em;
        }
        .mca-section-sub {
          font-size: 0.9rem; color: #6b7280; margin: 0 0 1.75rem;
        }
        /* ─ Field Grid ─ */
        .mca-field-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 560px) { .mca-field-grid { grid-template-columns: 1fr; } }
        .mca-field { display: flex; flex-direction: column; gap: 0.35rem; }
        .mca-field.full { grid-column: 1 / -1; }
        .mca-field label {
          font-size: 0.82rem; font-weight: 600; color: #374151;
        }
        .mca-field input, .mca-field select {
          padding: 0.65rem 0.9rem;
          border: 1.5px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.92rem;
          color: #111827;
          background: #fff;
          transition: border-color 0.15s, box-shadow 0.15s;
          outline: none;
          width: 100%;
          box-sizing: border-box;
        }
        .mca-field input:focus, .mca-field select:focus {
          border-color: #1a56db;
          box-shadow: 0 0 0 3px rgba(26,86,219,0.12);
        }
        .mca-field input.error, .mca-field select.error {
          border-color: #dc2626;
        }
        .mca-input-prefix {
          display: flex; align-items: center;
          border: 1.5px solid #d1d5db; border-radius: 8px; overflow: hidden;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .mca-input-prefix:focus-within {
          border-color: #1a56db; box-shadow: 0 0 0 3px rgba(26,86,219,0.12);
        }
        .mca-input-prefix span {
          padding: 0.65rem 0.75rem; background: #f3f4f6;
          font-size: 0.92rem; color: #6b7280; border-right: 1px solid #d1d5db;
          user-select: none;
        }
        .mca-input-prefix input {
          border: none; border-radius: 0;
          padding: 0.65rem 0.75rem; flex: 1;
          box-shadow: none !important;
        }
        .mca-input-prefix input:focus { box-shadow: none !important; }
        .mca-input-prefix input.error { border: none; }
        .mca-field-hint { font-size: 0.75rem; color: #9ca3af; }
        .mca-error { font-size: 0.78rem; color: #dc2626; font-weight: 500; }
        .req { color: #dc2626; }
        .opt { color: #9ca3af; font-weight: 400; font-size: 0.75rem; }
        /* ─ Buttons ─ */
        .mca-btn-primary {
          background: #1a56db;
          color: #fff;
          border: none;
          padding: 0.85rem 2rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          display: inline-flex; align-items: center; gap: 0.5rem;
        }
        .mca-btn-primary:hover { background: #1e40af; transform: translateY(-1px); }
        .mca-btn-secondary {
          background: transparent;
          color: #6b7280;
          border: 1.5px solid #d1d5db;
          padding: 0.85rem 1.5rem;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
        }
        .mca-btn-secondary:hover { border-color: #9ca3af; color: #374151; }
        .mca-btn-submit {
          background: linear-gradient(135deg, #16a34a, #15803d);
          color: #fff;
          border: none;
          padding: 0.9rem 2.25rem;
          border-radius: 10px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
          display: inline-flex; align-items: center; gap: 0.5rem;
          box-shadow: 0 4px 14px rgba(22,163,74,0.3);
        }
        .mca-btn-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(22,163,74,0.4); }
        .mca-btn-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .mca-btn-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem; margin-top: 0.5rem;
        }
        /* ─ Upload ─ */
        .mca-upload-notice {
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 10px;
          padding: 1.25rem;
          display: flex; gap: 1rem; align-items: flex-start;
          margin-bottom: 1.5rem;
        }
        .mca-upload-icon { font-size: 1.5rem; flex-shrink: 0; }
        .mca-upload-notice p { margin: 0; font-size: 0.9rem; color: #1e40af; line-height: 1.6; }
        .mca-upload-zone {
          border: 2px dashed #d1d5db;
          border-radius: 12px;
          padding: 2.5rem 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.15s;
          background: #fafafa;
          margin-bottom: 1rem;
        }
        .mca-upload-zone:hover { border-color: #1a56db; background: #eff6ff; }
        .mca-upload-zone.uploading { border-color: #1a56db; background: #eff6ff; cursor: wait; }
        .mca-upload-cloud { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .mca-upload-main { font-size: 1rem; font-weight: 600; color: #374151; margin: 0 0 0.25rem; }
        .mca-upload-sub { font-size: 0.8rem; color: #9ca3af; margin: 0; }
        .mca-upload-uploading { display: flex; align-items: center; gap: 0.75rem; justify-content: center; color: #1a56db; font-weight: 600; }
        .mca-upload-error { margin-top: 0; margin-bottom: 1rem; }
        .mca-uploaded-files { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
        .mca-uploaded-file {
          display: flex; align-items: center; gap: 0.75rem;
          background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;
          padding: 0.6rem 0.9rem; font-size: 0.85rem;
        }
        .mca-file-icon { font-size: 1rem; }
        .mca-file-name { flex: 1; color: #166534; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .mca-file-size { color: #9ca3af; font-size: 0.78rem; white-space: nowrap; }
        .mca-file-remove {
          background: none; border: none; cursor: pointer;
          color: #dc2626; font-size: 0.85rem; padding: 0 0.25rem;
          line-height: 1;
        }
        .mca-upload-security {
          font-size: 0.78rem; color: #6b7280;
          background: #f9fafb; border-radius: 8px;
          padding: 0.75rem 1rem;
          margin-bottom: 1.5rem;
        }
        /* ─ Consent ─ */
        .mca-consent-block { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
        .mca-checkbox-label {
          display: flex; align-items: flex-start; gap: 0.75rem;
          font-size: 0.85rem; color: #374151; line-height: 1.6; cursor: pointer;
        }
        .mca-checkbox-label.error { color: #dc2626; }
        .mca-checkbox-label input[type="checkbox"] {
          width: 18px; height: 18px; margin-top: 2px; flex-shrink: 0;
          cursor: pointer; accent-color: #1a56db;
        }
        .mca-checkbox-label a { color: #1a56db; text-decoration: underline; }
        .mca-submit-note { font-size: 0.78rem; color: #9ca3af; text-align: center; margin-top: 1rem; }
        /* ─ Spinners ─ */
        .mca-spinner {
          width: 28px; height: 28px;
          border: 3px solid #bfdbfe;
          border-top-color: #1a56db;
          border-radius: 50%;
          animation: mca-spin 0.7s linear infinite;
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
        /* ─ Duplicate ─ */
        .mca-duplicate { text-align: center; }
        .mca-duplicate-icon { font-size: 3rem; margin-bottom: 1rem; }
        .mca-duplicate h2 { color: #92400e; margin: 0 0 0.75rem; }
        .mca-duplicate p { color: #78350f; font-size: 0.95rem; line-height: 1.7; }
        /* ─ Trust Bar ─ */
        .mca-trust-bar {
          max-width: 760px; margin: 1.5rem auto 0;
          display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;
          padding: 0 1rem;
        }
        .mca-trust-item {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.82rem; color: #6b7280; font-weight: 500;
        }
      `}</style>
    </>
  );
}
