"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Download, Loader2 } from 'lucide-react';

interface GuideDetails {
  slug: string;
  name: string;
  pdfName: string;
  items: string[];
}

const GUIDE_MAP: Record<string, GuideDetails> = {
  "nih-sbir-biotech-grants": {
    slug: "nih-sbir-biotech-guide",
    name: "NIH SBIR Biotech Application Toolkit",
    pdfName: "NIH-SBIR-Biotech-Guide-2026.pdf",
    items: [
      "NIH SBIR Phase I Application Checklist",
      "Program Officer Pre-Flight Pitch Template",
      "Capital Budget Builder (Excel Spreadsheet)",
      "Technical Proposal Outline (Word Template)"
    ]
  },
  "nsf-sbir-grants-technology-startups": {
    slug: "nsf-sbir-grants-guide",
    name: "NSF SBIR Technology Startup Toolkit",
    pdfName: "NSF-SBIR-Startup-Guide-2026.pdf",
    items: [
      "NSF Project Pitch Compliance Outline",
      "Startup Financial Viability Checklist",
      "NSF Phase I Budget Template (Excel)",
      "Technical Innovation & Commercialization Guide"
    ]
  },
  "dod-sbir-defense-tech-grants": {
    slug: "dod-sbir-defense-tech-guide",
    name: "DOD SBIR Defense Technology Toolkit",
    pdfName: "DOD-SBIR-Defense-Guide-2026.pdf",
    items: [
      "DOD Phase I Proposal Structuring Outline",
      "Defense Commercialization Strategy Template",
      "ITAR & Security Compliance Checklist",
      "Topic Identification and Bidding Playbook"
    ]
  },
  "nasa-sbir-space-tech-grants": {
    slug: "nasa-sbir-space-tech-guide",
    name: "NASA SBIR Space Tech Application Toolkit",
    pdfName: "NASA-SBIR-Space-Tech-Guide-2026.pdf",
    items: [
      "NASA Proposal Formatting Checklist",
      "Technology Readiness Level (TRL) Assessment Tool",
      "NASA Budget Allocation Template (Excel)",
      "Subcontractor Agreement Templates"
    ]
  },
  "doe-sbir-clean-energy-grants": {
    slug: "doe-sbir-clean-energy-guide",
    name: "DOE SBIR Clean Energy Toolkit",
    pdfName: "DOE-SBIR-Clean-Energy-Guide-2026.pdf",
    items: [
      "DOE Phase I Letter of Intent Format",
      "Clean Energy Commercialization Strategy Plan",
      "Techno-Economic Analysis (TEA) Checklist",
      "DOE Budget Spreadsheet Builder"
    ]
  },
  "quebec-small-business-grants-guide": {
    slug: "quebec-business-grants-kit",
    name: "Quebec Small Business Grants Toolkit",
    pdfName: "Quebec-Business-Grants-Kit-2026.pdf",
    items: [
      "Quebec Provincial Grant Eligibility Checklist",
      "Programme Croissance Québec Guide",
      "Bilingual Application Translation Template",
      "Investissement Québec Loan Application Guide"
    ]
  },
  "alberta-small-business-grants-guide": {
    slug: "alberta-business-grants-kit",
    name: "Alberta Business Grants Toolkit",
    pdfName: "Alberta-Business-Grants-Kit-2026.pdf",
    items: [
      "Alberta Innovates Vouchers Application Guide",
      "Alberta Jobs Now Program Checklist",
      "Capital Equipment Subsidies Template",
      "Alberta Provincial Stacking Strategy Guide"
    ]
  },
  "british-columbia-grants-guide": {
    slug: "british-columbia-grants-kit",
    name: "British Columbia Business Grants Toolkit",
    pdfName: "BC-Business-Grants-Kit-2026.pdf",
    items: [
      "BC Tech Co-op Wage Subsidy Application Checklist",
      "Innovate BC Ignite Program Guidelines",
      "BC Provincial Tax Credits Checklist",
      "Application Writing Best Practices"
    ]
  },
  "ontario-small-business-grants-guide": {
    slug: "ontario-business-grants-kit",
    name: "Ontario Business Grants Toolkit",
    pdfName: "Ontario-Business-Grants-Kit-2026.pdf",
    items: [
      "Ontario Starter Company Plus Application Kit",
      "Eastern/Southwestern Ontario Development Fund Checklist",
      "Ontario Skills Development Fund Guidelines",
      "Provincial & Federal Grant Stacking Matrix"
    ]
  },
  "cybersecurity-grants": {
    slug: "cybersecurity-grants-guide",
    name: "Cybersecurity Grants Application Toolkit",
    pdfName: "Cybersecurity-Grants-Guide-2026.pdf",
    items: [
      "Cybersecurity Modernization Grant Checklist",
      "Vendor Security Assessment Outline",
      "Compliance Cost Builder (Excel)",
      "Employee Security Training Program Template"
    ]
  },
  "ai-ml-grants-guide": {
    slug: "ai-ml-grants-guide",
    name: "AI & Machine Learning Grants Toolkit",
    pdfName: "AI-ML-Grants-Guide-2026.pdf",
    items: [
      "AI/ML Research Funding Eligibility Outline",
      "Mitacs Academic Intern Co-Funding Template",
      "Cloud Compute Subsidies Guide",
      "R&D Technical Risk Statement Template"
    ]
  },
  "software-saas-grants-guide": {
    slug: "software-saas-grants-guide",
    name: "Software & SaaS Grants Application Toolkit",
    pdfName: "Software-SaaS-Grants-Guide-2026.pdf",
    items: [
      "SaaS R&D Cost Allocation Sheet (Excel)",
      "CDAP Digital Main Street Application Checklist",
      "Software Developer Salary Subsidy Guide",
      "SaaS R&D Project Scope Template"
    ]
  },
  "agriculture-agri-food-canada-government-grants": {
    slug: "agriculture-agri-food-application-kit",
    name: "Agriculture & Agri-Food Application Toolkit",
    pdfName: "AAFC-Agricultural-Application-Kit-2026.pdf",
    items: [
      "AAFC Cost-Shared Cost Calculator (Excel)",
      "AgriInnovate Pre-Screening Eligibility Checklist",
      "Agricultural Stacking Matrix Strategy",
      "Project Equipment Subsidies Checklist"
    ]
  }
};

const DEFAULT_CANADA_GUIDE: GuideDetails = {
  slug: "irap-application-kit",
  name: "NRC IRAP Application Toolkit",
  pdfName: "Canada-IRAP-Application-Kit-2026.pdf",
  items: [
    "NRC IRAP Proposal Outline Checklist",
    "ITA Introduction Staging Playbook",
    "SME R&D Salary Subsidy Spreadsheet",
    "Project Commercial Potential Framework"
  ]
};

const DEFAULT_USA_GUIDE: GuideDetails = {
  slug: "sba-application-checklist",
  name: "SBA Loan Application Checklist & Guide",
  pdfName: "SBA-Loan-Application-Checklist-2026.pdf",
  items: [
    "SBA 7(a) & 504 Loan Document Checklist",
    "Small Business Financial Statement Template",
    "Lender Credit Memo Structuring Blueprint",
    "SBA Debt Service Coverage Calculator"
  ]
};

interface ContextualDownloadCTAProps {
  postSlug: string;
  postCategory?: string;
  postKeywords?: string[];
}

export function ContextualDownloadCTA({ postSlug, postCategory, postKeywords }: ContextualDownloadCTAProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // 1. Resolve matching guide dynamically
  let guide = GUIDE_MAP[postSlug];
  if (!guide) {
    const isUS = 
      (postCategory || '').toLowerCase().includes('usa') || 
      (postKeywords || []).some(k => ['usa', 'us', 'sba', 'sbir', 'state'].includes(k.toLowerCase())) ||
      postSlug.startsWith('usa-') ||
      postSlug.includes('-us-');

    if (postSlug.includes('women')) {
      guide = {
        slug: "women-entrepreneurship-application-kit",
        name: "Women Entrepreneurship Application Kit",
        pdfName: "Women-Entrepreneurship-Fund-Guide-2026.pdf",
        items: [
          "WES Funding Stream Eligibility Checklist",
          "Startup Pitch Outline & Financial Plan",
          "BDC Women Financing Program Blueprint",
          "Grant Stacking Verification Template"
        ]
      };
    } else if (postSlug.includes('sred')) {
      guide = {
        slug: "sred-application-kit",
        name: "SR&ED Tax Credit Claim Toolkit",
        pdfName: "SRED-Tax-Credit-Claim-Kit-2026.pdf",
        items: [
          "CRA SR&ED Eligibility Pre-Flight Checklist",
          "Technological Uncertainty Assessment Form",
          "Eligible R&D Costs Calculator (Excel)",
          "Contemporaneous Documentation Checklist"
        ]
      };
    } else if (postSlug.includes('csbfp')) {
      guide = {
        slug: "csbfp-application-kit",
        name: "Canada Small Business Loan Kit",
        pdfName: "CSBFP-Application-Kit-2026.pdf",
        items: [
          "CSBFP Lender Document Checklist",
          "Equipment & Leasehold Capital Planner",
          "Working Capital Borrowing Calculator",
          "Eligible Franchise Cost Template"
        ]
      };
    } else {
      guide = isUS ? DEFAULT_USA_GUIDE : DEFAULT_CANADA_GUIDE;
    }
  }

  // 2. Telemetry tracking helpers
  const fireTelemetry = async (eventName: string) => {
    try {
      const sessionId = typeof window !== 'undefined' ? (sessionStorage.getItem('fsi_session_id') || 'sess_anonymous') : 'sess_anonymous';
      const pagePath = typeof window !== 'undefined' ? window.location.pathname : '';
      const referrer = typeof window !== 'undefined' ? document.referrer : '';
      
      const utmSource = typeof window !== 'undefined' ? (sessionStorage.getItem('fsi_first_touch_utm_source') || '') : '';
      const utmMedium = typeof window !== 'undefined' ? (sessionStorage.getItem('fsi_first_touch_utm_medium') || '') : '';
      const utmCampaign = typeof window !== 'undefined' ? (sessionStorage.getItem('fsi_first_touch_utm_campaign') || '') : '';

      await fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName,
          sessionId,
          pagePath,
          referrer,
          utmSource: utmSource || undefined,
          utmMedium: utmMedium || undefined,
          utmCampaign: utmCampaign || undefined,
          productId: guide.slug
        })
      });
    } catch (err) {
      console.warn('Telemetry event fail:', err);
    }
  };

  // Log "pdf_cta_viewed" when component mounts
  useEffect(() => {
    fireTelemetry('pdf_cta_viewed');
  }, []);

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      fireTelemetry('pdf_cta_clicked');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          name: name || "Founder",
          company: "Not provided",
          guideName: guide.name,
          industry: "Technology",
          country: guide.slug === DEFAULT_USA_GUIDE.slug ? "USA" : "Canada",
          pagePath: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        fireTelemetry('pdf_lead_submitted');
        
        // Trigger download
        const link = document.createElement('a');
        link.href = `/lead-magnets/${guide.pdfName}`;
        link.download = guide.pdfName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Redirect to targeted OTO Thank You Page after brief delay
        setTimeout(() => {
          window.location.href = `/download/${guide.slug}/thank-you`;
        }, 1200);
      } else {
        setError(data.error || "Failed to process download request. Please check your details.");
      }
    } catch (err) {
      setError("We encountered a connection issue. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-indigo-500/20 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-indigo-500/10 blur-xl"></div>
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-emerald-500/10 blur-xl"></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-500/20 pb-4 mb-6">
          <div>
            <span className="inline-block px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-500/30 mb-2">
              Free Premium Download
            </span>
            <h3 className="text-xl md:text-2xl font-black tracking-tight">{guide.name}</h3>
          </div>
          <div className="flex items-center gap-1.5 self-start md:self-center shrink-0">
            <Download className="w-5 h-5 text-indigo-400 animate-bounce" />
            <span className="text-xs font-semibold text-slate-400">PDF + Templates included</span>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Left Checklist */}
          <div className="md:col-span-7 space-y-4">
            <p className="text-sm text-slate-300 font-medium">
              We package the complete document toolkit required to prepare your applications. Get instant access to:
            </p>
            <ul className="space-y-3">
              {guide.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-bold text-slate-100">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Lead Capture Form */}
          <div className="md:col-span-5 bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
            {success ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-sm text-white">Download Started!</h4>
                <p className="text-xs text-slate-400">Redirecting you to your workspace...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-2.5 bg-red-500/20 border border-red-500/30 text-red-300 rounded text-xs font-medium">
                    ⚠️ {error}
                  </div>
                )}
                
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-bold text-slate-300">Your Name</Label>
                  <Input 
                    id="name"
                    type="text" 
                    placeholder="Jane Doe" 
                    className="bg-slate-950/60 border-slate-800 text-white placeholder-slate-500 focus-visible:ring-indigo-500 h-9 text-xs"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={handleInteraction}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-bold text-slate-300">Business Email</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="jane@company.com" 
                    className="bg-slate-950/60 border-slate-800 text-white placeholder-slate-500 focus-visible:ring-indigo-500 h-9 text-xs"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={handleInteraction}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-bold text-slate-300">Phone Number (Optional)</Label>
                  <Input 
                    id="phone"
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    className="bg-slate-950/60 border-slate-800 text-white placeholder-slate-500 focus-visible:ring-indigo-500 h-9 text-xs"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onFocus={handleInteraction}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold h-10 text-xs shadow-md border-0 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Preparing Toolkit...
                    </>
                  ) : (
                    "Download Free Toolkit"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
