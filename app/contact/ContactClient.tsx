"use client"

import React, { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import {
    ArrowRight,
    CheckCircle,
    Clock,
    FileSearch,
    Loader2,
    Mail,
    Phone,
    Sparkles,
} from "lucide-react"
import { LEAD_CONSENT_TEXT } from "@/lib/leads/scoring"

const CONTACT_CATEGORY_DEFAULT = "Funding Eligibility Question"

const CONTACT_CATEGORIES = [
    "Funding Eligibility Question",
    "Grant Calculator Result",
    "Strategy Session Question",
    "Program Deadline Question",
    "Application Roadmap Question",
    "Partnership or Media Inquiry",
    "Website Support",
]

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

  .contact-value-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .contact-value-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px -5px rgba(0,0,0,0.08);
  }

  .contact-form-card {
    box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 30px -8px rgba(0,0,0,0.06);
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

  .contact-session-badge {
    background: linear-gradient(90deg, #065f46, #047857, #059669, #047857, #065f46);
    background-size: 200% auto;
    animation: contact-shimmer 4s linear infinite;
  }
`

export default function ContactClient() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        category: CONTACT_CATEGORY_DEFAULT,
        message: "",
        consentToPartnerContact: false,
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [newsletterEmail, setNewsletterEmail] = useState("")
    const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success" | "error">("idle")
    const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            phone: "",
            category: CONTACT_CATEGORY_DEFAULT,
            message: "",
            consentToPartnerContact: false,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus("idle")
        setErrorMessage(null)

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    pagePath: window.location.pathname,
                }),
            })

            if (response.ok) {
                setSubmitStatus("success")
                resetForm()
            } else {
                const data = await response.json().catch(() => ({}))
                setErrorMessage(data.error || "We could not send your request. Please try again.")
                setSubmitStatus("error")
            }
        } catch (error) {
            console.error("Contact form error:", error)
            setErrorMessage("We could not send your request. Please check your internet connection and try again.")
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setNewsletterStatus("idle")
        setIsNewsletterSubmitting(true)

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: newsletterEmail,
                    name: "",
                }),
            })

            if (response.ok) {
                setNewsletterStatus("success")
                setNewsletterEmail("")
            } else {
                setNewsletterStatus("error")
            }
        } catch (error) {
            console.error("Newsletter error:", error)
            setNewsletterStatus("error")
        } finally {
            setIsNewsletterSubmitting(false)
        }
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: AD_SUPPRESSION_CSS }} />
            <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />
            <Header />
            <main className="min-h-screen bg-slate-50">

                {/* ─── HERO SECTION ─── */}
                <section className="contact-hero-gradient border-b border-emerald-100/60">
                    <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
                        <div className="contact-animate-in">
                            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                                Get a Clear Path to{" "}
                                <span className="bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
                                    Your Funding
                                </span>
                            </h1>
                        </div>
                        <p className="contact-animate-in contact-animate-delay-1 mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
                            Tell us about your business and funding goal. We&apos;ll point you to
                            the strongest programs — and after you submit, you can unlock a
                            private strategy session with a researched roadmap built for you.
                        </p>
                    </div>
                </section>

                {/* ─── VALUE STRIP ─── */}
                <section className="border-b border-slate-100 bg-white">
                    <div className="mx-auto grid max-w-4xl gap-4 px-6 py-8 sm:grid-cols-3">
                        {[
                            {
                                icon: <FileSearch className="h-5 w-5 text-emerald-700" />,
                                title: "2-Hour Deep Research",
                                desc: "We study your industry, region, and entity type before we talk.",
                            },
                            {
                                icon: <Phone className="h-5 w-5 text-emerald-700" />,
                                title: "30-Min Private Call",
                                desc: "Top 3 programs, eligibility risks, and exact next steps.",
                            },
                            {
                                icon: <Sparkles className="h-5 w-5 text-emerald-700" />,
                                title: "Custom Funding Roadmap",
                                desc: "Grants, loans, and tax credits matched to your business.",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="contact-value-card contact-animate-in contact-animate-delay-2 flex gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4"
                            >
                                <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-emerald-50 shadow-sm">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">{item.title}</p>
                                    <p className="mt-0.5 text-[13px] leading-5 text-slate-500">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mx-auto max-w-4xl px-6 pb-6 text-center">
                        <p className="text-xs text-slate-400">
                            The strategy session ($199) is available <span className="font-medium text-slate-500">after</span> you submit your message — no commitment upfront.
                        </p>
                    </div>
                </section>

                {/* ─── FORM SECTION ─── */}
                <section className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
                    <div
                        id="contact-form"
                        className="contact-form-card contact-animate-in contact-animate-delay-3 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-10"
                    >
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-950">Send your message</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                What are you trying to fund? Where is your business based? What decision
                                are you making next?
                            </p>
                        </div>

                        {submitStatus === "success" && (
                            <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                                <CheckCircle className="mt-0.5 h-5 w-5 flex-none text-emerald-700" />
                                <div>
                                    <p className="font-semibold text-emerald-900">Message received — check the next step.</p>
                                    <p className="mt-1 text-sm leading-6 text-emerald-800">
                                        A secure checkout window will appear now so you can reserve your private strategy session if you&apos;d like a researched roadmap.
                                    </p>
                                </div>
                            </div>
                        )}

                        {submitStatus === "error" && (
                            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
                                <p className="font-semibold text-red-800">{errorMessage || "We could not send your request. Please try again."}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400"
                                        placeholder="you@company.com"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">Phone Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">Request Type *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 text-base text-slate-900 outline-none transition"
                                    >
                                        {CONTACT_CATEGORIES.map((category) => (
                                            <option key={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">Message *</label>
                                <textarea
                                    rows={5}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="contact-input-focus w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400"
                                    placeholder="Briefly describe your business, location, funding goal, timeline, and question."
                                />
                            </div>

                            <label className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4 text-sm leading-6 text-slate-600 transition hover:border-slate-200">
                                <input
                                    type="checkbox"
                                    className="mt-1 h-4 w-4 rounded border-slate-300 accent-emerald-700"
                                    checked={formData.consentToPartnerContact}
                                    onChange={(e) =>
                                        setFormData({ ...formData, consentToPartnerContact: e.target.checked })
                                    }
                                />
                                <span>
                                    <strong className="text-slate-700">Optional:</strong> {LEAD_CONSENT_TEXT} You can unsubscribe or request deletion at any time.
                                </span>
                            </label>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="contact-submit-btn inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Subtle session teaser below the submit button */}
                        <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>
                                After submitting, you&apos;ll have the option to book a
                                <span className="font-semibold text-emerald-700"> $199 Strategy Session</span> — includes 2 hrs research + a private call
                            </span>
                        </div>
                    </div>
                </section>

                {/* ─── FOOTER SECTION: Contact Info + Newsletter ─── */}
                <section className="border-t border-slate-100 bg-white">
                    <div className="mx-auto grid max-w-4xl gap-8 px-6 py-12 sm:grid-cols-2">
                        {/* Contact info */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Get in touch directly</h3>
                            <div className="mt-5 space-y-4">
                                <div className="flex gap-3">
                                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-emerald-50">
                                        <Mail className="h-4 w-4 text-emerald-700" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">hello@fsidigital.ca</p>
                                        <p className="text-sm text-slate-500">General replies within 24–48 hours.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-amber-50">
                                        <Clock className="h-4 w-4 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">Deadline approaching?</p>
                                        <p className="text-sm text-slate-500">
                                            Submit the form above — the strategy session after checkout gets you a
                                            researched answer before your window closes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Funding alerts</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                New grant deadlines, program changes, and application tips — straight to your inbox.
                            </p>

                            {newsletterStatus === "success" && (
                                <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                                    <p className="text-sm font-semibold text-emerald-800">You&apos;re subscribed!</p>
                                </div>
                            )}

                            {newsletterStatus === "error" && (
                                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
                                    <p className="text-sm text-red-800">Could not subscribe. Please try again.</p>
                                </div>
                            )}

                            <form onSubmit={handleNewsletterSubmit} className="mt-4 flex gap-2">
                                <input
                                    type="email"
                                    required
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="contact-input-focus min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400"
                                />
                                <button
                                    type="submit"
                                    disabled={isNewsletterSubmitting}
                                    className="flex-none rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isNewsletterSubmitting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        "Subscribe"
                                    )}
                                </button>
                            </form>
                            <p className="mt-2 text-xs text-slate-400">Free. Unsubscribe anytime.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
