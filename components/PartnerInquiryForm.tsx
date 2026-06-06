"use client"

import React, { useState } from "react"
import { Loader2, Send, CheckCircle2, ShieldAlert, Phone } from "lucide-react"

const COUNTRY_CODES = [
  { code: "+1", label: "Canada/US (+1)", flag: "🇨🇦" },
  { code: "+91", label: "India (+91)", flag: "🇮🇳" },
  { code: "+44", label: "United Kingdom (+44)", flag: "🇬🇧" },
  { code: "+61", label: "Australia (+61)", flag: "🇦🇺" },
  { code: "+64", label: "New Zealand (+64)", flag: "🇳🇿" },
  { code: "+234", label: "Nigeria (+234)", flag: "🇳🇬" },
  { code: "+63", label: "Philippines (+63)", flag: "🇵🇭" },
  { code: "+92", label: "Pakistan (+92)", flag: "🇵🇰" },
  { code: "+880", label: "Bangladesh (+880)", flag: "🇧🇩" },
  { code: "+971", label: "United Arab Emirates (+971)", flag: "🇦🇪" },
  { code: "+65", label: "Singapore (+65)", flag: "🇸🇬" },
]

export interface PartnerInquiryFormProps {
  initialLeadType?: string
  initialGeography?: string
}

export function PartnerInquiryForm({ initialLeadType, initialGeography }: PartnerInquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    website: "",
    leadType: initialLeadType || "All / Mixed Funding Leads",
    geography: initialGeography || "Canada & United States",
    existingVolume: "None (Just starting)",
    budget: "$1,000-$5,000",
    purchaseModel: "Cost Per Lead (CPL) - Shared Leads",
    decisionMakerRole: "Founder / Owner",
    preferences: "",
    website_hp: "", // Honeypot
  })

  const [countryCode, setCountryCode] = useState("+1")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [hasTrackedStart, setHasTrackedStart] = useState(false)

  // Analytics event tracking
  const trackInteraction = () => {
    if (hasTrackedStart) return
    setHasTrackedStart(true)
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "partner_inquiry_start", {
        event_category: "B2B Partner Acquisition",
        event_label: "Form Started",
      })
    }
  }

  const trackSubmission = (status: "success" | "error") => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "partner_inquiry_submit", {
        event_category: "B2B Partner Acquisition",
        event_label: status === "success" ? "Form Submission Success" : "Form Submission Error",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage(null)

    // Assemble final phone representation
    const fullPhone = `${countryCode} ${formData.phone}`.trim()

    try {
      const response = await fetch("/api/partners/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: fullPhone,
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        trackSubmission("success")
        setFormData({
          name: "",
          email: "",
          phone: "",
          companyName: "",
          website: "",
          leadType: initialLeadType || "All / Mixed Funding Leads",
          geography: initialGeography || "Canada & United States",
          existingVolume: "None (Just starting)",
          budget: "$1,000-$5,000",
          purchaseModel: "Cost Per Lead (CPL) - Shared Leads",
          decisionMakerRole: "Founder / Owner",
          preferences: "",
          website_hp: "",
        })
      } else {
        const data = await response.json().catch(() => ({}))
        setErrorMessage(data.error || "Could not submit your inquiry. Please try again.")
        setSubmitStatus("error")
        trackSubmission("error")
      }
    } catch (error) {
      console.error("Partner inquiry form error:", error)
      setErrorMessage("Network error. Please check your connection and try again.")
      setSubmitStatus("error")
      trackSubmission("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl lg:p-8 contact-form-card" onFocus={trackInteraction}>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">Apply as an Approved Lead Buyer</h3>
      <p className="text-slate-600 text-sm mb-6">
        Specify your target filters, budget, and capacity. Our compliance and operations team will review your application and follow up within 24 hours.
      </p>

      {submitStatus === "success" && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-700" />
          <div>
            <p className="font-semibold text-emerald-950">Application Submitted & Under Review</p>
            <p className="mt-1 text-sm text-emerald-800 leading-relaxed">
              Your partner application is now in our verification queue. Our compliance team will audit your domain and ICP parameters to verify active lead inventory matching your profile. 
            </p>
            <p className="mt-2 text-xs text-emerald-700 font-semibold">
              An account status update and pilot checkout credentials will be sent to your work email within 24 hours. We have sent a receipt confirmation copy to your inbox.
            </p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <ShieldAlert className="mt-0.5 h-5 w-5 flex-none text-red-700" />
          <div>
            <p className="font-semibold text-red-950">Submission Declined</p>
            <p className="mt-1 text-sm text-red-800 leading-relaxed">
              {errorMessage || "We could not submit your request. Please try again."}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Spam Honeypot Field (visually hidden) */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="website_hp"
            tabIndex={-1}
            value={formData.website_hp}
            onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
            placeholder="Do not fill this field"
            autoComplete="off"
          />
        </div>

        {/* Name and Work Email */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Contact Name *</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white contact-input-focus"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Work Email *</label>
            <input
              type="email"
              required
              placeholder="john@advisoryfirm.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white contact-input-focus"
            />
          </div>
        </div>

        {/* Company Name and Website */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Company Name *</label>
            <input
              type="text"
              required
              placeholder="Apex Funding Group"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white contact-input-focus"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Company Website *</label>
            <input
              type="url"
              required
              placeholder="https://apexfunding.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white contact-input-focus"
            />
          </div>
        </div>

        {/* Work Phone with Country Selector and Decision Maker Role */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Work Phone *</label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-[110px] flex-none rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white cursor-pointer"
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
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white contact-input-focus"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Your Role *</label>
            <select
              value={formData.decisionMakerRole}
              onChange={(e) => setFormData({ ...formData, decisionMakerRole: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white cursor-pointer"
            >
              <option>Founder / Owner</option>
              <option>Marketing Director</option>
              <option>Sales Director</option>
              <option>Consultant</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Lead Type, Geography, and Existing Volume */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Lead Type *</label>
            <select
              value={formData.leadType}
              onChange={(e) => setFormData({ ...formData, leadType: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white cursor-pointer"
            >
              <option>All / Mixed Funding Leads</option>
              <option>Government Grant Leads</option>
              <option>Business Loan & Debt Leads</option>
              <option>SR&ED / Tax Credit Leads</option>
              <option>Equity & VC Funding Leads</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Geography *</label>
            <select
              value={formData.geography}
              onChange={(e) => setFormData({ ...formData, geography: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white cursor-pointer"
            >
              <option>Canada & United States</option>
              <option>Canada Only</option>
              <option>United States Only</option>
              <option>International / Other</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Current Lead Buying *</label>
            <select
              value={formData.existingVolume}
              onChange={(e) => setFormData({ ...formData, existingVolume: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white cursor-pointer"
            >
              <option>None (Just starting)</option>
              <option>1-10 leads / week</option>
              <option>10-50 leads / week</option>
              <option>50+ leads / week</option>
            </select>
          </div>
        </div>

        {/* Budget and Purchase Model */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Monthly Lead Budget *</label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white cursor-pointer"
            >
              <option>$1,000-$5,000</option>
              <option>$5,000-$20,000</option>
              <option>$20,000+</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Purchase Model *</label>
            <select
              value={formData.purchaseModel}
              onChange={(e) => setFormData({ ...formData, purchaseModel: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white cursor-pointer"
            >
              <option>Cost Per Lead (CPL) - Shared Leads</option>
              <option>Cost Per Lead (CPL) - Exclusive Leads</option>
              <option>Booked Calls (Warm Handoff)</option>
            </select>
          </div>
        </div>

        {/* Ideal Client Profile preferences */}
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">Ideal Client Profile (ICP) Preferences</label>
          <textarea
            rows={3}
            placeholder="E.g., Tech startups in Ontario seeking R&D/SR&ED tax credits, or established SMBs looking for expansion loans of $100k+."
            value={formData.preferences}
            onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white resize-none contact-input-focus"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center rounded-xl bg-emerald-500 px-6 py-3.5 text-base font-bold text-gray-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting Application...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Application
            </>
          )}
        </button>
      </form>
    </div>
  )
}
