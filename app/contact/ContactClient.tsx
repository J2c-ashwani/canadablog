"use client"

import React, { useState, useEffect, useRef } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  Phone,
  Sparkles,
  Flame,
  Zap,
  BookOpen,
  Send,
  X,
  Lock,
  Building,
  DollarSign,
  TrendingUp,
  FileCheck2
} from "lucide-react"
import { Button } from "@/components/ui/button"

const AD_SUPPRESSION_CSS = `
  .adsbygoogle,
  .google-auto-placed,
  .adsbygoogle-noablate,
  ins.adsbygoogle,
  iframe[name^="google_ads_iframe"],
  iframe[id^="google_ads_iframe"],
  iframe[src*="googleads"],
  div[id^="google_ads_iframe"],
  google-rabs-container,
  #google_vignette {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    height: 0 !important;
    width: 0 !important;
    max-height: 0 !important;
    max-width: 0 !important;
    pointer-events: none !important;
  }
`

const PAGE_STYLES = `
  @keyframes contact-fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes contact-shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .contact-animate-in {
    animation: contact-fade-up 0.5s ease-out both;
  }
  .contact-animate-delay-1 { animation-delay: 0.1s; }
  .contact-animate-delay-2 { animation-delay: 0.2s; }
  .contact-animate-delay-3 { animation-delay: 0.3s; }
  
  .contact-hero-gradient {
    background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 30%, #f0f9ff 70%, #eff6ff 100%);
  }

  .contact-input-focus:focus {
    border-color: #059669;
    box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
  }

  .contact-submit-btn {
    background: linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%);
    background-size: 200% auto;
    transition: background-position 0.4s ease, transform 0.15s ease, box-shadow 0.2s ease;
  }
  .contact-submit-btn:hover:not(:disabled) {
    background-position: right center;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px -4px rgba(5, 150, 105, 0.4);
  }
  .contact-submit-btn:active:not(:disabled) {
    transform: translateY(0);
  }
`

const COUNTRY_CODES = [
  { code: "+1", label: "US/Canada (+1)", flag: "🇺🇸/🇨🇦" },
  { code: "+91", label: "India (+91)", flag: "🇮🇳" },
  { code: "+44", label: "UK (+44)", flag: "🇬🇧" },
  { code: "+61", label: "Australia (+61)", flag: "🇦🇺" },
]

const INDUSTRIES = [
  "Technology",
  "Artificial Intelligence",
  "Manufacturing",
  "Construction",
  "Healthcare",
  "Agriculture",
  "Retail",
  "Hospitality",
  "Professional Services",
  "Clean Technology",
  "Education",
  "Non-Profit",
  "Other"
]

const BUSINESS_STAGES = [
  { value: "idea", label: "Idea Stage" },
  { value: "pre_revenue", label: "Pre-Revenue Startup" },
  { value: "early_revenue", label: "Early Revenue (< $100K)" },
  { value: "growth", label: "Growth Stage ($100K–$1M)" },
  { value: "established", label: "Established Business ($1M–$10M)" },
  { value: "enterprise", label: "Enterprise ($10M+)" },
  { value: "non_profit", label: "Non-Profit" }
]

const EMPLOYEE_OPTIONS = ["0", "1–5", "6–20", "21–100", "100+"]

const REVENUE_OPTIONS = [
  "Pre-Revenue",
  "Under $100K",
  "$100K–$500K",
  "$500K–$1M",
  "$1M–$5M",
  "$5M+"
]

const FUNDING_AMOUNT_OPTIONS = [
  "Under $25K",
  "$25K–$100K",
  "$100K–$250K",
  "$250K–$500K",
  "$500K–$1M",
  "Over $1M"
]

const FUNDING_PURPOSES = [
  "Hiring",
  "Equipment",
  "Expansion",
  "R&D",
  "Technology Development",
  "Exporting",
  "Training",
  "Facility Upgrade",
  "Working Capital",
  "Marketing",
  "Other"
]

const TIMELINE_OPTIONS = [
  "Immediately",
  "Within 30 Days",
  "Within 90 Days",
  "Within 6 Months",
  "Exploring Options"
]

const REQUEST_TYPES = [
  "Funding Eligibility Question",
  "Grant Application Support",
  "Funding Strategy",
  "SR&ED Support",
  "Government Grants",
  "Tax Credits",
  "Funding Audit",
  "Other"
]

const CANADIAN_PROVINCES = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
  "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
  "Northwest Territories", "Nunavut", "Yukon"
]

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
]

const getPrimaryOpportunity = (purposes: string[], industry: string) => {
  if (purposes.includes('Hiring') || purposes.includes('Training')) {
    return "Hiring & Wage Subsidies (Upskilling programs, student placements, Co-op funding)";
  }
  if (['Technology', 'Artificial Intelligence', 'Clean Technology'].includes(industry) || purposes.includes('R&D') || purposes.includes('Technology Development')) {
    return "R&D Innovation Subsidies (SR&ED tax credits and IRAP grants)";
  }
  if (purposes.includes('Exporting')) {
    return "Exporting & International Market Expansion (CanExport programs)";
  }
  if (purposes.includes('Equipment') || purposes.includes('Facility Upgrade')) {
    return "Capital Equipment & Green Facility Upgrades (Equipment acquisition and retrofits)";
  }
  return "General Business Development Grants (Operational scale-up funding)";
}

const getSecondaryOpportunity = (purposes: string[], industry: string) => {
  if (['Technology', 'Artificial Intelligence', 'Clean Technology'].includes(industry) || purposes.includes('R&D') || purposes.includes('Technology Development')) {
    return "Technology & Digital Adoption Programs (CDAP, technology integration grants)";
  }
  if (purposes.includes('Hiring') || purposes.includes('Training')) {
    return "Workforce Training Subsidies (Provincial job grants for staff upskilling)";
  }
  return "Business Expansion Credits & Regional Development Grants";
}

const getTertiaryOpportunity = (purposes: string[], industry: string) => {
  if (purposes.includes('Exporting')) {
    return "International Business Growth Grants & Trade Development";
  }
  return "Government Guaranteed Low-Interest Loans (BDC/SBA co-financing)";
}

export default function ContactClient() {
  const router = useRouter()
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    country: "Canada",
    state: "",
    city: "",
    industry: "",
    businessStage: "",
    employees: "",
    annualRevenue: "",
    fundingAmount: "",
    fundingPurpose: [] as string[],
    timeline: "",
    businessDescription: "",
    requestType: "Funding Eligibility Question",
    consentToPartnerContact: false,
    confirmEmail: "", // Honeypot
    referralSource: "",
  })

  const [countryCode, setCountryCode] = useState("+1")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  
  // OTP Verification Modal State
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [otpToken, setOtpToken] = useState("")
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [otpError, setOtpError] = useState<string | null>(null)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [resendCount, setResendCount] = useState(0)

  // Assessment Score State
  const [emailVerified, setEmailVerified] = useState(false)
  const [assessmentResult, setAssessmentResult] = useState<{
    score: number;
    tier: "A" | "B" | "C";
    isAuditCandidate: boolean;
  } | null>(null)
  const [isSendingAssessmentCopy, setIsSendingAssessmentCopy] = useState(false)
  const [assessmentCopySent, setAssessmentCopySent] = useState(false)

  // Tracking Form Start
  const [formStarted, setFormStarted] = useState(false)

  // Telemetry Session Helper
  const getSessionId = () => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('fsi_session_id') || 'sess_anonymous';
    }
    return 'sess_anonymous';
  }

  // Telemetry Event Trigger
  const trackEvent = (eventName: string, extra = {}) => {
    try {
      const sessId = getSessionId();
      fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName,
          sessionId: sessId,
          pagePath: window.location.pathname,
          referrer: document.referrer || 'direct',
          ...extra
        })
      }).catch(err => console.error(`Telemetry error for ${eventName}:`, err));
      
      // GA4 support
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, extra);
      }
    } catch (e) {}
  }

  // Resend OTP Countdown Cooldown Timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown(c => c - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Form input changes
  const handleInputChange = (field: string, value: any) => {
    if (!formStarted) {
      setFormStarted(true);
      trackEvent('contact_form_started');
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  // Purpose multi-select handler
  const handlePurposeToggle = (purpose: string) => {
    if (!formStarted) {
      setFormStarted(true);
      trackEvent('contact_form_started');
    }
    setFormData(prev => {
      const current = [...prev.fundingPurpose];
      const index = current.indexOf(purpose);
      if (index === -1) {
        current.push(purpose);
      } else {
        current.splice(index, 1);
      }
      return { ...prev, fundingPurpose: current };
    });
  }

  // Submit Lead Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fundingPurpose.length === 0) {
      setErrorMessage("Please select at least one funding purpose.");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage(null);

    try {
      let rawPhone = formData.phone.replace(/[^0-9]/g, "");
      if (countryCode === "+1" && rawPhone.startsWith("1") && rawPhone.length > 10) {
        // Already starts with 1 and is full length
      } else {
        rawPhone = `${countryCode}${rawPhone}`;
      }
      const formattedPhone = rawPhone.startsWith("+") ? rawPhone : `+${rawPhone}`;

      // 1. Submit lead to database immediately (Email Verified = "No")
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: formattedPhone,
          pagePath: window.location.pathname,
          utmSource: typeof window !== 'undefined' ? sessionStorage.getItem('fsi:utm_source') || '' : '',
          utmMedium: typeof window !== 'undefined' ? sessionStorage.getItem('fsi:utm_medium') || '' : '',
          utmCampaign: typeof window !== 'undefined' ? sessionStorage.getItem('fsi:utm_campaign') || '' : '',
          gaClientId: typeof window !== 'undefined' ? document.cookie.match(/_ga=GA1\.[0-9]\.([^;]+)/)?.[1] || '' : '',
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setAssessmentResult({
          score: result.score,
          tier: result.tier,
          isAuditCandidate: result.isAuditCandidate
        });

        if (typeof window !== 'undefined') {
          localStorage.setItem('fsi:lead_email', formData.email.trim());
          localStorage.setItem('fsi:lead_name', formData.name.trim());
          localStorage.setItem('fsi:lead_company', formData.companyName.trim());
          localStorage.setItem('fsi:lead_industry', formData.industry);
          localStorage.setItem('fsi:lead_region', formData.state);
          localStorage.setItem('fsi:lead_saved_at', Date.now().toString());
        }

        // Track Lead scoring in telemetry
        trackEvent('lead_scored', { score: result.score, tier: result.tier });
        if (result.tier === 'A') trackEvent('tier_a_assigned');
        else if (result.tier === 'B') trackEvent('tier_b_assigned');
        else trackEvent('tier_c_assigned');

        // Send OTP code and open the OTP verification modal
        setShowOtpModal(true);
        setOtpError(null);
        try {
          const otpResponse = await fetch("/api/contact/otp/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email }),
          });
          if (otpResponse.ok) {
            const otpData = await otpResponse.json();
            setOtpToken(otpData.token);
            setResendCooldown(60);
          } else {
            const data = await otpResponse.json();
            setOtpError(data.error || "Failed to send verification code. Please request resend.");
          }
        } catch (otpErr) {
          setOtpError("Network error sending verification code. Please request resend.");
        }

        setSubmitStatus("success");
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data.error || "Lead submission failed. Please check required fields.");
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setErrorMessage("Network error. Please check your internet connection.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    if (resendCount >= 3) {
      setOtpError("Maximum resend attempts reached. Please submit again or contact hello@fsidigital.ca.");
      return;
    }

    setOtpError(null);
    setIsVerifyingOtp(true);

    try {
      const response = await fetch("/api/contact/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        const result = await response.json();
        setOtpToken(result.token);
        setOtpCode("");
        setResendCooldown(60);
        setResendCount(c => c + 1);
      } else {
        const data = await response.json();
        setOtpError(data.error || "Failed to resend code.");
      }
    } catch (err) {
      setOtpError("Failed to connect. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  }

  // Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.trim().length !== 6) {
      setOtpError("Please enter a 6-digit code.");
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError(null);

    try {
      const response = await fetch("/api/contact/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          code: otpCode,
          token: otpToken
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setEmailVerified(true);
        setShowOtpModal(false);
        trackEvent('email_verified');
        trackEvent('contact_form_completed');
        
        // Track the routing recomendations
        if (assessmentResult?.tier === 'A') {
          trackEvent('audit_recommended');
        } else if (assessmentResult?.tier === 'B') {
          trackEvent('calculator_recommended');
        }
      } else {
        if (result.token) {
          // Update verification token with the decremented attempt state
          setOtpToken(result.token);
        }
        setOtpError(result.error || "Verification failed. Code may be invalid.");
      }
    } catch (err) {
      setOtpError("Verification request failed. Try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  }

  // Send score summary copy to inbox
  const handleSendAssessmentCopy = async () => {
    if (!assessmentResult) return;
    setIsSendingAssessmentCopy(true);

    try {
      const fundingRange = getEstimatedOpportunityRange(formData.fundingAmount);
      const matchedCats = getMatchedCategoriesList(formData.fundingPurpose);

      const response = await fetch("/api/contact/assessment/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          score: assessmentResult.score,
          tier: assessmentResult.tier,
          range: fundingRange,
          categories: matchedCats,
        })
      });

      if (response.ok) {
        setAssessmentCopySent(true);
        trackEvent('assessment_email_sent');
      } else {
        alert("Failed to send copy. Please try again.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSendingAssessmentCopy(false);
    }
  }

  // Helper: Opportunity range translation
  const getEstimatedOpportunityRange = (amount: string) => {
    if (amount === "Under $25K") return "$5,000 – $25,000";
    if (amount === "$25K–$100K") return "$25,000 – $100,000";
    if (amount === "$100K–$250K") return "$100,000 – $250,000";
    if (amount === "$250K–$500K") return "$250,000 – $500,000";
    if (amount === "$500K–$1M") return "$500,000 – $1,000,000";
    if (amount === "Over $1M") return "$1,000,000 – $5,000,000+";
    return "TBD (Profile review pending)";
  }

  // Helper: Matched categories translation
  const getMatchedCategoriesList = (purposes: string[]) => {
    const list: string[] = [];
    if (purposes.includes('Hiring') || purposes.includes('Training')) {
      list.push('Hiring Grants (Wage subsidies & upskilling)');
    }
    if (purposes.includes('Equipment') || purposes.includes('Facility Upgrade')) {
      list.push('Capital Equipment Funding (Upgrades & facility expansion)');
    }
    if (purposes.includes('Expansion')) {
      list.push('Business Expansion Credits & regional development grants');
    }
    if (purposes.includes('R&D') || purposes.includes('Technology Development')) {
      list.push('R&D Innovation Subsidies (e.g. SR&ED Tax Credits / IRAP grants)');
    }
    if (purposes.includes('Exporting')) {
      list.push('CanExport SME International Marketing Grants');
    }
    if (list.length === 0) {
      list.push('General Business Development Subsidies');
    }
    return list;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: AD_SUPPRESSION_CSS }} />
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />
      <Header />
      <main className="min-h-screen bg-slate-50">
        
        {/* HERO SECTION */}
        <section className="contact-hero-gradient border-b border-emerald-100/60">
          <div className="mx-auto max-w-3xl px-6 py-12 text-center sm:py-16">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl contact-animate-in">
              Qualify Your Business for{" "}
              <span className="bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
                Government Funding
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-md sm:text-lg leading-relaxed text-slate-650 contact-animate-in contact-animate-delay-1">
              Complete our B2B qualification screener to calculate your Funding Readiness Score. Verify your business profile to view your matched categories immediately.
            </p>
          </div>
        </section>

        {/* ASSESSMENT DASHBOARD VIEW (ONCE EMAIL IS OTP VERIFIED) */}
        {emailVerified && assessmentResult && (
          <section className="mx-auto max-w-3xl px-6 py-12">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xl contact-animate-in">
              
              {/* Header Status */}
              <div className="text-center pb-8 border-b border-slate-100">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Assessment Completed!</h2>
                <p className="text-sm text-slate-500 mt-1">Your business profile has been qualified and verified.</p>
              </div>

              {/* Score Metric Ring */}
              <div className="py-8 grid sm:grid-cols-2 gap-6 items-center">
                <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-6 text-center shadow-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Funding Readiness Score</span>
                  <div className="text-6xl font-black text-emerald-600 font-mono tracking-tighter mb-2">
                    {assessmentResult.score} <span className="text-slate-400 text-2xl font-normal">/100</span>
                  </div>
                  
                  {/* Lead Temperature Status */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white border border-slate-200 shadow-2xs">
                    {assessmentResult.tier === 'A' && (
                      <span className="text-amber-800 flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> 🔥 High Potential Funding Candidate</span>
                    )}
                    {assessmentResult.tier === 'B' && (
                      <span className="text-indigo-800 flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" /> ⚡ Funding Opportunities Available</span>
                    )}
                    {assessmentResult.tier === 'C' && (
                      <span className="text-slate-600 flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-slate-400" /> 📚 Continue Exploring Available Programs</span>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Potential Funding Range</span>
                    <span className="text-2xl font-black text-slate-900">{getEstimatedOpportunityRange(formData.fundingAmount)}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 leading-relaxed">Not a guarantee. Just an estimate based on profile.</span>
                  </div>
                  
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Matched Funding Categories</span>
                    <div className="space-y-1.5 mt-1.5 text-xs text-slate-700 font-medium">
                      {getMatchedCategoriesList(formData.fundingPurpose).map((cat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{cat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Funding Priority for Tier A leads */}
              {assessmentResult.tier === 'A' && (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-6 text-left">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Current Funding Priorities:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0 mt-0.5">1</span>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Primary Opportunity:</span>
                        <span className="text-xs text-slate-600 font-medium">{getPrimaryOpportunity(formData.fundingPurpose, formData.industry)}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold shrink-0 mt-0.5">2</span>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Secondary Opportunity:</span>
                        <span className="text-xs text-slate-600 font-medium">{getSecondaryOpportunity(formData.fundingPurpose, formData.industry)}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold shrink-0 mt-0.5">3</span>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Tertiary Opportunity:</span>
                        <span className="text-xs text-slate-650 font-medium">{getTertiaryOpportunity(formData.fundingPurpose, formData.industry)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Simple Explanations Checkpoints */}
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 mb-8 text-left">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Why am I {assessmentResult.score}/100?</h4>
                <ul className="grid sm:grid-cols-2 gap-3 text-xs text-slate-600 font-semibold">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold text-sm">✓</span> Verified contact information
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold text-sm">✓</span> {["$100K–$250K", "$250K–$500K", "$500K–$1M", "Over $1M"].includes(formData.fundingAmount) ? "Funding need above $100K" : "Funding need matches active programs"}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold text-sm">✓</span> {["growth", "established", "enterprise"].includes(formData.businessStage) ? "Established business stage" : "Growing business stage"}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold text-sm">✓</span> {["Technology", "Artificial Intelligence", "Clean Technology", "Manufacturing"].includes(formData.industry) ? "Technology/high-growth sector" : "Active industry sector"}
                  </li>
                  {formData.state && (
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold text-sm">✓</span> Regional B2B profile qualified
                    </li>
                  )}
                </ul>
              </div>

              {/* PERSONALIZED RECOMMENDATION ROUTING ACTION */}
              <div className="rounded-2xl border border-indigo-250 bg-indigo-50/50 p-6 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl uppercase">Recommended Next Step</div>
                
                {assessmentResult.tier === 'A' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-sm uppercase tracking-wider">
                      <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
                      Priority Matching Opportunities
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">Personalized Outcome Preview</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      We identified high-probability opportunity categories matching your business profile. Specific program names and application strategies are currently locked.
                    </p>

                    {/* Lock Overlay Container */}
                    <div className="relative border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                      {/* Blurred Cards */}
                      <div className="space-y-3 filter blur-[1.5px] opacity-80 pointer-events-none select-none">
                        <div className="border border-slate-200 rounded-xl p-3 bg-white">
                          <span className="text-[9px] font-bold text-indigo-600 uppercase">Primary Opportunity Category</span>
                          <h4 className="font-bold text-slate-800 text-sm mt-0.5">{getPrimaryOpportunity(formData.fundingPurpose, formData.industry)}</h4>
                          <span className="text-xs font-bold text-emerald-600 block mt-1">Est. Benefit: {getEstimatedOpportunityRange(formData.fundingAmount)}</span>
                          <span className="text-[10px] text-slate-450 block mt-1">Program Details: [Program Name Hidden]</span>
                        </div>
                        <div className="border border-slate-200 rounded-xl p-3 bg-white">
                          <span className="text-[9px] font-bold text-indigo-600 uppercase">Secondary Opportunity Category</span>
                          <h4 className="font-bold text-slate-800 text-sm mt-0.5">{getSecondaryOpportunity(formData.fundingPurpose, formData.industry)}</h4>
                          <span className="text-xs font-bold text-emerald-600 block mt-1">Est. Benefit: Up to $50,000</span>
                          <span className="text-[10px] text-slate-450 block mt-1">Program Details: [Program Name Hidden]</span>
                        </div>
                      </div>

                      {/* Glassmorphic Lock Banner Overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center bg-white/75 backdrop-blur-[3.5px] rounded-2xl border-2 border-indigo-200 shadow-md">
                        <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-150 mb-2">
                          <Lock className="w-4 h-4 text-indigo-600" />
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 mb-1">Funding Program Details Locked</h4>
                        <p className="text-[10px] sm:text-xs text-slate-500 max-w-sm leading-relaxed mb-3">
                          Schedule a Funding Strategy Session to unlock program names, eligibility criteria, and your stacking roadmap.
                        </p>
                        
                        <Button 
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm px-5 py-3.5 rounded-xl shadow-md flex items-center animate-in fade-in duration-300"
                          onClick={() => {
                            trackEvent('audit_recommended_preview');
                            router.push(`/audit?email=${encodeURIComponent(formData.email)}&name=${encodeURIComponent(formData.name)}&industry=${encodeURIComponent(formData.industry)}&region=${encodeURIComponent(formData.state)}&source=personalized_preview`);
                          }}
                        >
                          Unlock My Full Funding Analysis
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {assessmentResult.tier === 'B' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-sm uppercase tracking-wider">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                      Roadmap & Report Match
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Unlock Matched Programs & Reports</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Your business profile has matched active government grants and loans. We recommend loading your parameters directly into the Grant Calculator to select your report package ($19 / $49 / $79) and view named programs, deadlines, and next steps immediately.
                    </p>
                    <Button 
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-xl font-black shadow-md shadow-indigo-150"
                      onClick={() => {
                        trackEvent('calculator_recommended');
                        router.push(`/calculator?step=6&email=${encodeURIComponent(formData.email)}&name=${encodeURIComponent(formData.name)}&phone=${encodeURIComponent(formData.phone)}&company=${encodeURIComponent(formData.companyName)}&province=${encodeURIComponent(formData.state)}&industry=${encodeURIComponent(formData.industry)}&revenue=${encodeURIComponent(formData.annualRevenue)}&goal=${encodeURIComponent(formData.fundingPurpose[0] || 'expansion')}&source=contact_form`);
                      }}
                    >
                      Unlock Program Matches ($19+)
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}

                {assessmentResult.tier === 'C' && (
                  <div className="space-y-6 text-left">
                    <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 space-y-4 shadow-xs">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-950">Want an expert to review your profile within 24 hours?</h3>
                      <p className="text-xs text-slate-550 leading-relaxed">
                        Although you are in the researching stage, you can fast-track your eligibility assessment with a professional manual review.
                      </p>
                      
                      <ul className="text-xs text-slate-700 space-y-2.5 font-medium">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>Funding Eligibility Review:</strong> Custom manual audit of federal, state, and provincial options.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>Programs Matched:</strong> Exact program names, deadlines, and stacking roadmaps.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>Priority Roadmap:</strong> Strategy session recommendations to stack multiple subsidies.</span>
                        </li>
                      </ul>

                      <div className="pt-4 border-t border-slate-200">
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-2xl font-black text-slate-950">$199</span>
                          <span className="text-xs text-slate-500 font-bold uppercase">USD One-Time</span>
                        </div>

                        <Button 
                          className="w-full bg-indigo-650 hover:bg-indigo-700 text-white py-6 rounded-xl font-black shadow-md shadow-indigo-150 flex items-center justify-center gap-2"
                          onClick={() => {
                            trackEvent('audit_recommended_tier_c');
                            router.push(`/audit?email=${encodeURIComponent(formData.email)}&name=${encodeURIComponent(formData.name)}&industry=${encodeURIComponent(formData.industry)}&region=${encodeURIComponent(formData.state)}&source=contact_tier_c`);
                          }}
                        >
                          Get My Strategy Audit
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 text-xs text-slate-500 text-center">
                      <span className="font-semibold block text-slate-700 mb-1">Standard Free Option:</span>
                      Your free email summary will still be processed. We will email you if any active matching programs arise. No immediate action is required.
                    </div>
                  </div>
                )}
              </div>

              {/* Send assessment copy to inbox banner card */}
              <div className="mt-8 border-t border-slate-150 pt-8 text-center bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                <p className="text-sm font-bold text-slate-800 mb-3">Would you like a copy of your assessment sent to your inbox?</p>
                <Button 
                  disabled={isSendingAssessmentCopy || assessmentCopySent}
                  onClick={handleSendAssessmentCopy}
                  className="w-full sm:w-auto px-8 py-5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-100"
                >
                  {isSendingAssessmentCopy ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Sending Assessment...
                    </>
                  ) : assessmentCopySent ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Assessment Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Assessment
                    </>
                  )}
                </Button>
              </div>

            </div>
          </section>
        )}

        {/* REGULAR QUALIFICATION FORM (HIDDEN ONCE VERIFIED) */}
        {!emailVerified && (
          <section className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-xl contact-animate-in contact-animate-delay-2">
              
              <div className="mb-8 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-slate-950">Check B2B Funding Eligibility</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Provide your business parameters below. We will analyze your profile and compile your Funding Readiness Score.
                </p>
              </div>

              {submitStatus === "error" && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 animate-in fade-in duration-300">
                  <p className="font-semibold text-red-800 text-xs sm:text-sm">{errorMessage || "Submission failed. Please check required fields."}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Honeypot */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <input
                    type="text"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={(e) => handleInputChange("confirmEmail", e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* ─── SECTION 1: CONTACT DETAILS ─── */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-1">1. Contact Information</h3>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400"
                        placeholder="Legal business name"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">Business Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">Phone Number *</label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="contact-input-focus rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-2.5 text-sm text-slate-900 outline-none transition w-[95px] flex-none cursor-pointer"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.label} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          required
                          placeholder="(555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">Country (Optional)</label>
                      <select
                        value={formData.country}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData(prev => ({ ...prev, country: val, state: "" }));
                        }}
                        className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition cursor-pointer"
                      >
                        <option value="Canada">Canada</option>
                        <option value="United States">United States</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {formData.country === "Canada" && (
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">Province (Optional)</label>
                        <select
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition cursor-pointer"
                        >
                          <option value="">Select Province</option>
                          {CANADIAN_PROVINCES.map(p => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {formData.country === "United States" && (
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">State (Optional)</label>
                        <select
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition cursor-pointer"
                        >
                          <option value="">Select State</option>
                          {US_STATES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {formData.country === "Other" && (
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">Region (Optional)</label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          placeholder="State / Region"
                          className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition"
                        />
                      </div>
                    )}

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">City (Optional)</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="e.g. Toronto"
                        className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                {/* ─── SECTION 2: BUSINESS PROFILE ─── */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-1">2. Business Profile</h3>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">Primary Industry *</label>
                      <select
                        required
                        value={formData.industry}
                        onChange={(e) => handleInputChange("industry", e.target.value)}
                        className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition cursor-pointer"
                      >
                        <option value="">Select Industry</option>
                        {INDUSTRIES.map(ind => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">Business Stage *</label>
                      <select
                        required
                        value={formData.businessStage}
                        onChange={(e) => handleInputChange("businessStage", e.target.value)}
                        className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition cursor-pointer"
                      >
                        <option value="">Select Stage</option>
                        {BUSINESS_STAGES.map(stg => (
                          <option key={stg.value} value={stg.value}>{stg.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">Number of Employees (Optional)</label>
                      <select
                        value={formData.employees}
                        onChange={(e) => handleInputChange("employees", e.target.value)}
                        className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition cursor-pointer"
                      >
                        <option value="">Select Count</option>
                        {EMPLOYEE_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">Annual Revenue (Optional)</label>
                      <select
                        value={formData.annualRevenue}
                        onChange={(e) => handleInputChange("annualRevenue", e.target.value)}
                        className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition cursor-pointer"
                      >
                        <option value="">Select Revenue</option>
                        {REVENUE_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">How did you hear about us? (Optional)</label>
                    <select
                      value={formData.referralSource}
                      onChange={(e) => handleInputChange("referralSource", e.target.value)}
                      className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition cursor-pointer"
                    >
                      <option value="">Select Option</option>
                      <option value="Google Search">Google Search</option>
                      <option value="Referral">Referral</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Government Website">Government Website</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* ─── SECTION 3: FUNDING REQUIREMENTS ─── */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-1">3. Funding Requirements</h3>
                  
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">Funding Needed *</label>
                      <select
                        required
                        value={formData.fundingAmount}
                        onChange={(e) => handleInputChange("fundingAmount", e.target.value)}
                        className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition cursor-pointer"
                      >
                        <option value="">Select Amount</option>
                        {FUNDING_AMOUNT_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">Timeline (Optional)</label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => handleInputChange("timeline", e.target.value)}
                        className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition cursor-pointer"
                      >
                        <option value="">Select Timeline</option>
                        {TIMELINE_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">Request Type *</label>
                      <select
                        required
                        value={formData.requestType}
                        onChange={(e) => handleInputChange("requestType", e.target.value)}
                        className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition cursor-pointer"
                      >
                        {REQUEST_TYPES.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-700">Funding Purpose * (Select all that apply)</label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                      {FUNDING_PURPOSES.map(opt => {
                        const isChecked = formData.fundingPurpose.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handlePurposeToggle(opt)}
                            className={`px-3 py-2 text-xs font-semibold border rounded-lg transition text-left flex items-center justify-between ${isChecked ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-500' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                          >
                            <span>{opt}</span>
                            {isChecked && <span className="text-[10px] text-emerald-700 font-bold">✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">Tell Us About Your Business *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.businessDescription}
                      onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                      className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400"
                      placeholder="Briefly describe your business, current stage, growth plans, and how you intend to use funding."
                    />
                  </div>
                </div>

                <label className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4 text-xs leading-5 text-slate-550 transition hover:border-slate-200">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-emerald-700 shrink-0"
                    checked={formData.consentToPartnerContact}
                    onChange={(e) => handleInputChange("consentToPartnerContact", e.target.checked)}
                  />
                  <span>
                    I agree that FSI Digital and vetted funding specialists may contact me about grants, loans, tax credits, and business funding options. Unsubscribe anytime.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact-submit-btn inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Analyzing Qualification Profile...
                    </>
                  ) : (
                    <>
                      Check Funding Eligibility
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>
        )}

        {/* ─── OTP EMAIL VERIFICATION MODAL OVERLAY ─── */}
        {showOtpModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/70 px-4 py-6 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 text-center animate-in zoom-in duration-300">
              
              <button 
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="absolute right-4 top-4 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full">
                <CheckCircle className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-black text-slate-900 tracking-tight">Assessment Complete!</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                Your preliminary funding score has been calculated and is ready to view.
              </p>

              <div className="my-4 p-3.5 bg-emerald-50/50 border border-emerald-100/60 rounded-xl">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block mb-0.5">Status</span>
                <span className="text-xs font-extrabold text-slate-800 flex items-center justify-center gap-1">
                  🔒 Score Locked (Email Verification Required)
                </span>
              </div>

              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                We sent a 6-digit verification code to <strong>{formData.email}</strong>. Enter it below to unlock your detailed funding assessment.
              </p>

              {otpError && (
                <div className="mt-3 rounded-lg bg-red-50 border border-red-200 p-2.5 text-xs text-red-800">
                  {otpError}
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    pattern="[0-9]{6}"
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full text-center tracking-[12px] font-mono text-2xl font-bold rounded-xl border border-slate-200 bg-slate-50 py-3.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-150 outline-none"
                    autoFocus
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isVerifyingOtp || otpCode.length !== 6}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl text-sm"
                >
                  {isVerifyingOtp ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Verifying Code...
                    </>
                  ) : (
                    "Verify & Show Score"
                  )}
                </Button>
              </form>

              <div className="mt-4 flex flex-col items-center justify-center gap-1.5 text-xs">
                <span className="text-slate-400">Didn't receive the code?</span>
                <button
                  type="button"
                  disabled={resendCooldown > 0 || resendCount >= 3}
                  onClick={handleResendOtp}
                  className="text-indigo-600 hover:underline font-semibold disabled:text-slate-350 disabled:no-underline"
                >
                  {resendCooldown > 0 
                    ? `Resend Code in ${resendCooldown}s` 
                    : resendCount >= 3 
                      ? "Limit Reached" 
                      : "Resend Code"
                  }
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  )
}
