"use client"

import React, { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  Sparkles, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Check, 
  Loader2, 
  BookOpen, 
  TrendingUp, 
  ShieldAlert, 
  Clock, 
  HelpCircle 
} from "lucide-react"
import { getAllPrograms, type ProgramDetails } from "@/lib/data/programs"
import { MatchScoreEngine, type MatchResult } from "@/lib/leads/MatchScoreEngine"
import { PortfolioScoreEngine } from "@/lib/leads/PortfolioScoreEngine"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LEAD_CONSENT_TEXT } from "@/lib/leads/scoring"
import { trackGAEvent } from "@/components/LeadConversionUpsellWatcher"

export default function PortfolioClient() {
  const router = useRouter()
  const allPrograms = useMemo(() => getAllPrograms(), [])

  // Wizard / Profile States
  const [hasProfile, setHasProfile] = useState(false)
  const [wizardStep, setWizardStep] = useState(1)
  const [showWelcome, setShowWelcome] = useState(true)
  const [step1Error, setStep1Error] = useState("")
  const [isSavingStep1, setIsSavingStep1] = useState(false)
  const [step3Error, setStep3Error] = useState("")
  const [isSavingStep3, setIsSavingStep3] = useState(false)
  
  const [profile, setProfile] = useState({
    country: "Canada",
    region: "ON",
    companySize: "1-9",
    industry: "technology",
    isIncorporated: true,
    hasRd: true,
    hasHiring: true,
    hasExporting: true,
    name: "",
    email: "",
    phone: "",
    companyName: "",
    website: ""
  })

  // Consent & Lead states
  const [consentToPartnerContact, setConsentToPartnerContact] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)
  const [leadError, setLeadError] = useState("")

  // Subscription & Trial States
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState("inactive")
  const [subscriptionId, setSubscriptionId] = useState("")
  const [trialStartedAt, setTrialStartedAt] = useState("")
  const [reportPurchased, setReportPurchased] = useState(false)
  const [reportTransactionId, setReportTransactionId] = useState("")
  const [sdkReady, setSdkReady] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [isActivatingTrial, setIsActivatingTrial] = useState(false)

  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "ATiNArUnyarxHv-FRUJ7pVi14uHjafO8fEGrRVGBSUBRIrS-Rpx-w8LNEcHyGsF5sExfJjT03aYo_0xq"

  // Clarity Results & Paywall views tracking
  useEffect(() => {
    if (isUnlocked) {
      if (typeof window !== "undefined" && (window as any).clarity) {
        const clarityFn = (window as any).clarity;
        clarityFn("event", "results_dashboard_viewed");
        if (!reportPurchased && subscriptionStatus !== "active") {
          clarityFn("event", "assessment_paywall_viewed");
        }
      }
    }
  }, [isUnlocked, reportPurchased, subscriptionStatus]);

  // Load from URL token or session storage on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const urlToken = searchParams.get("token")

    if (urlToken) {
      setIsAuthenticating(true)
      fetch(`/api/auth/subscriber?token=${urlToken}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.subscriber) {
            const sub = data.subscriber
            const loadedProfile = {
              country: sub.country || "Canada",
              region: sub.region || "ON",
              companySize: sub.companySize || "1-9",
              industry: sub.industry || "technology",
              isIncorporated: true,
              hasRd: true,
              hasHiring: true,
              hasExporting: true,
              name: sub.name || "",
              email: sub.email || "",
              phone: "",
              companyName: sub.companyName || "",
              website: sub.website || ""
            }
            setProfile(loadedProfile)
            setHasProfile(true)
            setIsUnlocked(true)
            setSubscriptionStatus(sub.subscriptionStatus || "inactive")
            setSubscriptionId(sub.subscriptionId || "")
            setTrialStartedAt(sub.trialStartedAt || "")
            setReportPurchased(!!sub.reportPurchased)
            setReportTransactionId(sub.reportTransactionId || "")
            sessionStorage.setItem("fsi_funding_profile", JSON.stringify(loadedProfile))
            sessionStorage.setItem("fsi_subscription_status", sub.subscriptionStatus || "inactive")
            sessionStorage.setItem("fsi_report_purchased", sub.reportPurchased ? "true" : "false")
            sessionStorage.setItem("fsi_report_transaction_id", sub.reportTransactionId || "")
            fetch("/api/subscriber/track-activity", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: loadedProfile.email,
                event: "login",
                source: searchParams.get("source") || searchParams.get("ref") || "token_url"
              })
            }).catch(e => console.error(e))
          }
        })
        .catch(err => console.error("Auto-login error:", err))
        .finally(() => setIsAuthenticating(false))
      return
    }

    const sourceParam = searchParams.get("source")
    if (sourceParam) {
      sessionStorage.setItem("fsi_attribution_source", sourceParam)
    }

    const cached = localStorage.getItem("fsi_funding_profile") || sessionStorage.getItem("fsi_funding_profile")
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        setProfile(prev => ({ ...prev, ...parsed }))
        setHasProfile(true)
        if (parsed.email) {
          setIsUnlocked(true)
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: parsed.email,
              event: "portfolio_viewed",
              source: searchParams.get("source") || searchParams.get("ref") || "cached_profile"
            })
          }).catch(e => console.error(e))
        }
        const cachedSub = sessionStorage.getItem("fsi_subscription_status") || "inactive"
        setSubscriptionStatus(cachedSub)
        
        const cachedReportPurchased = sessionStorage.getItem("fsi_report_purchased") === "true"
        setReportPurchased(cachedReportPurchased)
        const cachedReportTxId = sessionStorage.getItem("fsi_report_transaction_id") || ""
        setReportTransactionId(cachedReportTxId)
      } catch (e) {
        console.error("Failed to parse cached profile", e)
      }
    }
  }, [])

  /* ── PayPal SDK Load ── */
  useEffect(() => {
    if (subscriptionStatus === "active" && reportPurchased) return
    if ((window as any).paypal) {
      setSdkReady(true)
      return
    }
    const script = document.createElement("script")
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(paypalClientId)}&currency=USD&intent=capture&components=buttons`
    script.type = "text/javascript"
    script.async = true
    script.onload = () => setSdkReady(true)
    script.onerror = () => {
      console.error("PayPal SDK failed to load.")
    }
    document.head.appendChild(script)
  }, [paypalClientId, subscriptionStatus, reportPurchased])

  // A/B test setup for assessment pricing (20% Version B)
  const [abGroup, setAbGroup] = useState<"A" | "B">("A")
  useEffect(() => {
    let group = sessionStorage.getItem("fsi_report_ab_group") as "A" | "B" | null
    if (!group) {
      group = Math.random() < 0.2 ? "B" : "A"
      sessionStorage.setItem("fsi_report_ab_group", group)
    }
    setAbGroup(group)
  }, [])

  const publicPrice = abGroup === "B" ? 299 : 199
  const memberPrice = abGroup === "B" ? 149 : 99
  const isMember = subscriptionStatus === "active" || subscriptionStatus === "trial"
  const currentPrice = isMember ? memberPrice : publicPrice

  /* ── Render PayPal Buttons for Founding Member Subscription ── */
  useEffect(() => {
    if (!sdkReady || subscriptionStatus === "active" || !isUnlocked) return

    const container = document.getElementById("paypal-button-container")
    if (!container) return

    container.innerHTML = ""

    const paypal = (window as any).paypal
    if (paypal && paypal.Buttons) {
      paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'pay'
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              description: "Founding Member Subscription - FSI Digital",
              amount: {
                currency_code: "USD",
                value: "29.00"
              }
            }]
          })
        },
        onApprove: async (data: any, actions: any) => {
          return actions.order.capture().then(async (details: any) => {
            const orderId = details.id
            try {
              const res = await fetch("/api/subscriber/upgrade", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: profile.email,
                  action: "active",
                  subscriptionId: orderId
                })
              })
              const resData = await res.json()
              if (resData.success) {
                setSubscriptionStatus("active")
                setSubscriptionId(orderId)
                sessionStorage.setItem("fsi_subscription_status", "active")
                trackGAEvent("subscription_purchase", {
                  transaction_id: orderId,
                  value: 29.00,
                  currency: "USD"
                })
              } else {
                setPaymentError(resData.error || "Failed to record payment.")
              }
            } catch (err: any) {
              console.error("Upgrade error:", err)
              setPaymentError(err.message || "Failed to upgrade subscription.")
            }
          })
        },
        onError: (err: any) => {
          console.error("PayPal error:", err)
          setPaymentError("An error occurred with PayPal. Please try again.")
        }
      }).render("#paypal-button-container")
    }
  }, [sdkReady, subscriptionStatus, isUnlocked, profile.email])

  /* ── Render PayPal Buttons for Report Purchase ── */
  useEffect(() => {
    if (!sdkReady || reportPurchased || !isUnlocked) return

    const container = document.getElementById("report-paypal-container")
    if (!container) return

    container.innerHTML = ""

    const paypal = (window as any).paypal
    if (paypal && paypal.Buttons) {
      paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'checkout'
        },
        onClick: () => {
          if (typeof window !== "undefined" && (window as any).clarity) {
            (window as any).clarity("event", "paypal_checkout_clicked")
          }
          const attributionSource = sessionStorage.getItem("fsi_attribution_source") || "";
          fetch("/api/subscriber/track-activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: profile.email,
              event: "checkout_started",
              source: attributionSource
            })
          }).catch(err => console.error("Failed to track checkout start:", err))
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              description: `Executive Funding Assessment - ${profile.companyName || "Your Company"}`,
              amount: {
                currency_code: "USD",
                value: String(currentPrice)
              }
            }]
          })
        },
        onApprove: async (data: any, actions: any) => {
          return actions.order.capture().then(async (details: any) => {
            const orderId = details.id
            try {
              const res = await fetch("/api/subscriber/buy-report", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: profile.email,
                  transactionId: orderId,
                  source: sessionStorage.getItem("fsi_attribution_source") || undefined
                })
              })
              const resData = await res.json()
              if (resData.success) {
                if (typeof window !== "undefined" && (window as any).clarity) {
                  (window as any).clarity("event", "assessment_purchased")
                }
                setReportPurchased(true)
                setReportTransactionId(orderId)
                sessionStorage.setItem("fsi_report_purchased", "true")
                sessionStorage.setItem("fsi_report_transaction_id", orderId)
                trackGAEvent("report_purchase", {
                  transaction_id: orderId,
                  value: currentPrice,
                  currency: "USD"
                })
                
                // Redirect to thank-you page instead of directly to report
                const token = resData.loginToken || ""
                router.push(`/portfolio/thank-you?token=${token}`)
              } else {
                setPaymentError(resData.error || "Failed to record payment.")
              }
            } catch (err: any) {
              console.error("Report buy error:", err)
              setPaymentError(err.message || "Failed to record report purchase.")
            }
          })
        },
        onError: (err: any) => {
          console.error("PayPal error:", err)
          setPaymentError("An error occurred with PayPal. Please try again.")
        }
      }).render("#report-paypal-container")
    }
  }, [sdkReady, reportPurchased, isUnlocked, profile.email, profile.companyName, currentPrice])

  const handleStartTrial = async () => {
    setIsActivatingTrial(true)
    setPaymentError(null)
    try {
      const res = await fetch("/api/subscriber/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: profile.email,
          action: "trial"
        })
      })
      const resData = await res.json()
      if (resData.success) {
        setSubscriptionStatus("trial")
        setTrialStartedAt(resData.trialStartedAt)
        sessionStorage.setItem("fsi_subscription_status", "trial")
        trackGAEvent("trial_started", {
          subscription_status: "trial"
        })
      } else {
        setPaymentError(resData.error || "Failed to start trial.")
      }
    } catch (err: any) {
      console.error("Trial error:", err)
      setPaymentError(err.message || "Failed to start trial.")
    } finally {
      setIsActivatingTrial(false)
    }
  }

  // Run Match engine on profile
  const { eligibleMatches, ineligibleMatches } = useMemo(() => {
    if (!hasProfile) return { eligibleMatches: [], ineligibleMatches: [] }

    const eligible: { program: ProgramDetails; match: MatchResult }[] = []
    const ineligible: { program: ProgramDetails; match: MatchResult }[] = []

    allPrograms.forEach(prog => {
      // Map standard profile params to SubscriberProfile format
      const matchRes = MatchScoreEngine.calculateMatch(prog, {
        country: profile.country as any,
        region: profile.region,
        companySize: profile.companySize as any,
        industry: profile.industry,
        fundingInterests: [] // let match engine evaluate general alignment
      })

      if (matchRes.status === "Eligible") {
        eligible.push({ program: prog, match: matchRes })
      } else {
        ineligible.push({ program: prog, match: matchRes })
      }
    })

    // Sort eligible by score descending
    eligible.sort((a, b) => b.match.score - a.match.score)

    return {
      eligibleMatches: eligible,
      ineligibleMatches: ineligible
    }
  }, [hasProfile, allPrograms, profile.country, profile.region, profile.companySize, profile.industry])

  // Top 3 Matches
  const topMatches = useMemo(() => eligibleMatches.slice(0, 3), [eligibleMatches])
  // Additional Matches (4th and beyond)
  const additionalMatches = useMemo(() => eligibleMatches.slice(3), [eligibleMatches])

  // Active checkboxes for stacking
  const [checkedSlugs, setCheckedSlugs] = useState<string[]>([])

  // Automatically check top matches when profile changes
  useEffect(() => {
    if (eligibleMatches.length > 0) {
      setCheckedSlugs(eligibleMatches.slice(0, 5).map(m => m.program.slug))
    }
  }, [eligibleMatches])

  // Calculate Readiness Score & Benchmark
  const readiness = useMemo(() => {
    return PortfolioScoreEngine.calculateReadiness({
      isIncorporated: profile.isIncorporated,
      hasRd: profile.hasRd,
      hasHiring: profile.hasHiring,
      hasExporting: profile.hasExporting,
      companySize: profile.companySize
    })
  }, [profile.isIncorporated, profile.hasRd, profile.hasHiring, profile.hasExporting, profile.companySize])

  // Dynamic Opportunity Range sum
  const stackingRange = useMemo(() => {
    return PortfolioScoreEngine.calculateStackingRange(checkedSlugs, allPrograms)
  }, [checkedSlugs, allPrograms])

  // Opportunity Flags for risks section (opportunity-oriented)
  const opportunityFlags = useMemo(() => {
    const flags: { title: string; text: string }[] = []
    if (!profile.isIncorporated) {
      flags.push({
        title: "Entity Structure Recommendation",
        text: "Incorporating as a Canadian CCPC is a foundational requirement to qualify for primary programs like IRAP and SR&ED."
      })
    }
    if (!profile.hasRd) {
      flags.push({
        title: "Scientific Research Alignment",
        text: "Active technical R&D operations are essential for claiming SR&ED tax credits and securing IRAP project grants."
      })
    }
    if (!profile.hasHiring) {
      flags.push({
        title: "Growth Program Limitation",
        text: "Several wage subsidy and workforce development programs prioritize companies planning to hire."
      })
    }
    if (!profile.hasExporting) {
      flags.push({
        title: "Potential Opportunity Gap",
        text: "Export-focused programs such as CanExport may require planned international expansion activities."
      })
    }
    if (profile.companySize === "1-9") {
      flags.push({
        title: "Co-Investment Readiness",
        text: "Early-stage firms with smaller teams (under 10 FTEs) may face more rigorous financial checks to confirm co-funding capability."
      })
    }
    return flags.slice(0, 3)
  }, [profile.isIncorporated, profile.hasRd, profile.hasHiring, profile.hasExporting, profile.companySize])

  // Funding Match Score Explanation Engine
  const scoreFactors = useMemo(() => {
    const contributors: { name: string; value: number }[] = []
    const deductions: { name: string; value: number }[] = []

    if (profile.isIncorporated) {
      contributors.push({ name: "Incorporated Canadian CCPC", value: 25 })
    } else {
      deductions.push({ name: "Missing Incorporation Status", value: -25 })
    }

    if (profile.hasRd) {
      contributors.push({ name: "Active Technology R&D Operations", value: 25 })
    } else {
      deductions.push({ name: "No Active Technical R&D Operations", value: -25 })
    }

    if (profile.hasHiring) {
      contributors.push({ name: "Planned Workforce Expansion", value: 15 })
    } else {
      deductions.push({ name: "No Active Hiring Projections", value: -15 })
    }

    if (profile.hasExporting) {
      contributors.push({ name: "Active International Export Plans", value: 15 })
    } else {
      deductions.push({ name: "No Export Projections", value: -15 })
    }

    const size = profile.companySize || "1-9"
    if (size === "1-9" || size === "10-49") {
      contributors.push({ name: `SME Scale Cohort (${size} FTEs)`, value: 20 })
    } else if (size === "50-99" || size === "100-499") {
      contributors.push({ name: `Mid-Sized Cohort (${size} FTEs)`, value: 15 })
    } else {
      contributors.push({ name: `Enterprise Cohort (${size} FTEs)`, value: 10 })
    }

    return { contributors, deductions }
  }, [profile.isIncorporated, profile.hasRd, profile.hasHiring, profile.hasExporting, profile.companySize])

  // Composable "What This Means For Your Business" dynamic compositor
  const whatThisMeans = useMemo(() => {
    const sentences: string[] = []

    // Sentence 1: Entity & baseline alignment
    if (profile.isIncorporated && profile.hasRd) {
      sentences.push("Your company qualifies for multiple high-yield innovation funding programs.")
    } else if (profile.isIncorporated) {
      sentences.push("Your incorporated entity status meets the primary baseline for Canadian funding programs.")
    } else {
      sentences.push("Your current unincorporated status limits entry to major project grants, but regional startup incentives remain open.")
    }

    // Sentence 2: Specific matched streams
    const programFits: string[] = []
    if (profile.hasRd) programFits.push("SR&ED tax-credit recovery")
    if (profile.isIncorporated && profile.hasRd) programFits.push("IRAP project wage grants")
    if (profile.hasExporting) programFits.push("CanExport international marketing grants")
    if (profile.hasHiring) programFits.push("workforce expansion wage subsidies")

    if (programFits.length > 0) {
      if (programFits.length === 1) {
        sentences.push(`The primary program fit is likely ${programFits[0]}.`)
      } else {
        const last = programFits.pop()
        sentences.push(`Primary program fits include ${programFits.join(", ")} and ${last}.`)
      }
    }

    // Sentence 3: Key action points / bottlenecks
    const bottlenecks: string[] = []
    if (!profile.isIncorporated) bottlenecks.push("CCPC entity registration")
    if (!profile.hasRd) bottlenecks.push("technical R&D project structuring")
    if (profile.companySize === "1-9") bottlenecks.push("co-investment financial verification")

    if (bottlenecks.length > 0) {
      sentences.push(`However, key requirements like ${bottlenecks.join(" and ")} must be structured correctly to pass review.`)
    } else {
      sentences.push("To proceed, documentation readiness and application sequencing should be structured to maximize operational stack yields.")
    }

    return sentences.join(" ")
  }, [profile.isIncorporated, profile.hasRd, profile.hasHiring, profile.hasExporting, profile.companySize])

  // Dynamic Primary Risk selector for the Executive Summary banner
  const primaryRisk = useMemo(() => {
    if (!profile.isIncorporated) {
      return "Business is not incorporated as a Canadian CCPC."
    }
    if (!profile.hasRd) {
      return "Missing documented R&D process."
    }
    if (!profile.hasHiring) {
      return "No active hiring plans for workforce scaling."
    }
    if (!profile.hasExporting) {
      return "No international expansion or export plans."
    }
    return "Documentation readiness and application sequencing validation."
  }, [profile.isIncorporated, profile.hasRd, profile.hasHiring, profile.hasExporting])

  // Cleaner function to format program names for layout space constraints
  const getShortProgramName = (fullName: string) => {
    const match = fullName.match(/\(([^)]+)\)/);
    if (match && match[1]) {
      return match[1];
    }
    if (fullName.includes("CanExport")) return "CanExport";
    if (fullName.includes("Sustainable Canadian Agricultural")) return "Sustainable Cap (Agri)";
    if (fullName.includes("Alberta Innovates")) return "Alberta Innovates";
    if (fullName.includes("Quebec R&D")) return "Quebec R&D Tax Credit";
    if (fullName.includes("Mitacs")) return "Mitacs";
    return fullName.replace(" Program", "").replace(" Grant", "").replace(" Tax Credit", "").replace(" SMEs", "");
  };


  // Calculate Remaining Trial Days
  const trialRemainingDays = useMemo(() => {
    if (subscriptionStatus !== 'trial' || !trialStartedAt) return 0
    const started = new Date(trialStartedAt).getTime()
    const now = new Date().getTime()
    const diff = started + 7 * 24 * 60 * 60 * 1000 - now
    const days = Math.ceil(diff / (24 * 60 * 60 * 1000))
    return days > 0 ? days : 0
  }, [subscriptionStatus, trialStartedAt])

  // Handle onboarding input updates
  const updateProfileField = (field: string, val: any) => {
    setProfile(prev => ({ ...prev, [field]: val }))
  }

  // Handle Wizard Step 1 Submission (Draft Lead creation)
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep1Error("")
    if (!profile.name.trim()) {
      setStep1Error("Contact Name is required.")
      return
    }
    if (!profile.email.trim() || !profile.email.includes("@")) {
      setStep1Error("A valid Business Email is required.")
      return
    }
    if (!profile.phone.trim()) {
      setStep1Error("Phone Number is required.")
      return
    }
    setIsSavingStep1(true)
    try {
      const res = await fetch("/api/subscriber/save-screener-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: profile.email,
          name: profile.name,
          step: 1,
          pagePath: sessionStorage.getItem("fsi_entry_url") || "/portfolio",
          firstTouchAt: sessionStorage.getItem("fsi_first_touch_at") || new Date().toISOString(),
          data: profile
        })
      })
      if (!res.ok) {
        throw new Error("Failed to save draft.")
      }
      const resData = await res.json()
      if (typeof window !== "undefined" && (window as any).clarity) {
        (window as any).clarity("event", "assessment_step1_complete")
      }
      localStorage.setItem("fsi_funding_profile", JSON.stringify(profile))
      setWizardStep(2)
    } catch (err: any) {
      console.error(err)
      setStep1Error("Failed to save draft. Please try again.")
    } finally {
      setIsSavingStep1(false)
    }
  }

  // Handle Wizard Step 3 Submission (Draft Lead update & results unlock)
  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep3Error("")
    setIsSavingStep3(true)
    try {
      const res = await fetch("/api/subscriber/save-screener-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: profile.email,
          name: profile.name,
          step: 3,
          pagePath: sessionStorage.getItem("fsi_entry_url") || "/portfolio",
          firstTouchAt: sessionStorage.getItem("fsi_first_touch_at") || new Date().toISOString(),
          data: profile
        })
      })
      if (!res.ok) {
        throw new Error("Failed to update draft.")
      }
      const resData = await res.json()
      const returnedTier = resData.leadTier || "Tier C"
      const tierShort = returnedTier.replace("Tier ", "").trim()

      if (typeof window !== "undefined" && (window as any).clarity) {
        const clarityFn = (window as any).clarity;
        clarityFn("event", "assessment_completed")
        clarityFn("set", "leadTier", tierShort)
        clarityFn("set", "industry", profile.industry)
        clarityFn("set", "province", profile.region)
        clarityFn("set", "score", String(readiness))
      }

      localStorage.setItem("fsi_funding_profile", JSON.stringify(profile))
      setHasProfile(true)
      setIsUnlocked(true)
      trackGAEvent("portfolio_completed", {
        region: profile.region,
        country: profile.country,
        industry: profile.industry,
        company_size: profile.companySize
      })
    } catch (err: any) {
      console.error(err)
      setStep3Error("Failed to save progress. Please try again.")
    } finally {
      setIsSavingStep3(false)
    }
  }

  // Handle Lead Unlock form submission
  const handleUnlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingLead(true)
    setLeadError("")

    try {
      const response = await fetch("/api/grant-finder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: profile.country,
          state: profile.region,
          industry: profile.industry,
          businessStage: profile.isIncorporated ? "established" : "idea",
          fundingAmount: "100k-500k",
          fundingPurpose: profile.hasRd ? "research" : "working-capital",
          businessDescription: `Funding readiness evaluated: Score ${readiness.score}/100. Sector: ${profile.industry}.`,
          email: profile.email,
          name: profile.name,
          phone: profile.phone,
          consentToPartnerContact,
          source: "Funding Portfolio Engine",
          readinessScore: readiness.score,
          readinessBand: readiness.band,
          companySize: profile.companySize,
          fundingInterests: checkedSlugs,
          pagePath: sessionStorage.getItem("fsi_entry_url") || "/portfolio",
          firstTouchAt: sessionStorage.getItem("fsi_first_touch_at") || new Date().toISOString(),
          companyName: profile.companyName,
          website: profile.website
        })
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.error || "Failed to submit lead.")
      }

      const resData = await response.json()

      // Save complete unlocked state
      const updatedProfile = { 
        ...profile, 
        email: profile.email, 
        name: profile.name, 
        phone: profile.phone,
        companyName: profile.companyName,
        website: profile.website
      }
      sessionStorage.setItem("fsi_funding_profile", JSON.stringify(updatedProfile))
      localStorage.removeItem("fsi_funding_profile")
      
      trackGAEvent("lead_capture", {
        region: profile.region,
        country: profile.country,
        industry: profile.industry,
        company_size: profile.companySize
      })
      
      if (resData.loginToken) {
        sessionStorage.setItem("fsi_subscription_status", "inactive")
        setSubscriptionStatus("inactive")
        // Push the login token into the URL query parameters so page reloads are auto-authenticated
        const newUrl = `${window.location.pathname}?token=${resData.loginToken}`
        window.history.replaceState({}, "", newUrl)
      }
      setIsUnlocked(true)
    } catch (err: any) {
      console.error(err)
      setLeadError(err.message || "An error occurred. Please try again.")
    } finally {
      setIsSubmittingLead(false)
    }
  }

  const handleCheckboxToggle = (slug: string) => {
    setCheckedSlugs(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    )
  }

  // Prefill Consultation Link
  const queryParams = new URLSearchParams()
  queryParams.set("email", profile.email)
  queryParams.set("name", profile.name)
  queryParams.set("region", profile.region)
  queryParams.set("size", profile.companySize)
  queryParams.set("industry", profile.industry)
  queryParams.set("score", String(readiness.score))
  queryParams.set("range", stackingRange.formatted)
  queryParams.set("programs", checkedSlugs.join(","))
  queryParams.set("ref", "portfolio_engine")
  
  const bookingUrl = `/consultation?${queryParams.toString()}`

  // Wording optimization based on candidate scoring
  const ctaText = (readiness.score >= 70) ? "Schedule Priority Review" : "Get Funding Assessment"

  // RENDER WIZARD FLOW (IF NO PROFILE DETECTED)
  if (!hasProfile) {
    if (showWelcome) {
      return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-xl">
          <Card className="shadow-2xl border-slate-200 bg-white rounded-3xl overflow-hidden animate-in fade-in duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-8 text-center relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <Badge className="mb-3 bg-white/20 hover:bg-white/20 text-white border-white/20 py-1 px-3">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-yellow-300" />
                Intelligence Engine v2.2
              </Badge>
              <CardTitle className="text-3xl font-extrabold tracking-tight">Funding Match Assessment</CardTitle>
              <CardDescription className="text-blue-100 text-xs sm:text-sm mt-2 flex items-center justify-center gap-1.5 font-bold">
                <Clock className="w-4 h-4 text-emerald-300 animate-pulse" />
                ⏱ Takes about 60 seconds
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8 space-y-6 text-left">
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-800 text-sm tracking-wider uppercase">Get:</h4>
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-200 text-emerald-600 font-bold">✓</span>
                    <span>Funding Match Score</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-200 text-emerald-600 font-bold">✓</span>
                    <span>Estimated Funding Range</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-200 text-emerald-600 font-bold">✓</span>
                    <span>Top Matching Programs</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-200 text-emerald-600 font-bold">✓</span>
                    <span>Eligibility Risk Analysis</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs text-slate-600 font-medium leading-relaxed">
                Used by Canadian founders seeking grants, tax credits and innovation funding.
              </div>

              <Button
                type="button"
                onClick={() => {
                  setShowWelcome(false)
                  if (typeof window !== "undefined" && (window as any).clarity) {
                    (window as any).clarity("event", "assessment_started")
                  }
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 text-sm flex items-center justify-center gap-2 rounded-xl shadow-lg shadow-blue-600/15"
              >
                Start Free Assessment <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-2xl">
        <Card className="shadow-2xl border-slate-200 bg-white rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-8 text-center relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <Badge className="mb-3 bg-white/20 hover:bg-white/20 text-white border-white/20 py-1 px-3">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-yellow-300" />
              Intelligence Engine v2.1
            </Badge>
            <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight">Build Your Funding Portfolio</CardTitle>
            <CardDescription className="text-blue-100 text-xs sm:text-sm mt-1">
              Screen eligibility, compute readiness scores, and map program priority streams.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            {/* Steps Progress bar */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map(step => (
                <div key={step} className="flex-1 flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    wizardStep === step 
                      ? "bg-blue-600 text-white ring-4 ring-blue-100" 
                      : wizardStep > step 
                        ? "bg-emerald-600 text-white" 
                        : "bg-slate-100 text-slate-400"
                  }`}>
                    {wizardStep > step ? <Check className="w-4 h-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                      wizardStep > step ? "bg-emerald-600" : "bg-slate-100"
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* STEP 1: Contact Information */}
            {wizardStep === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {step1Error && (
                  <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-lg text-left">
                    {step1Error}
                  </div>
                )}
                
                <div className="space-y-4 text-left">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name" className="text-xs font-bold text-slate-800">Contact Name</Label>
                    <Input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={profile.name}
                      onChange={(e) => updateProfileField("name", e.target.value)}
                      className="bg-white border-slate-200 h-12 text-sm text-slate-900 rounded-xl focus:ring-blue-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email" className="text-xs font-bold text-slate-800">Business Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={profile.email}
                      onChange={(e) => updateProfileField("email", e.target.value)}
                      className="bg-white border-slate-200 h-12 text-sm text-slate-900 rounded-xl focus:ring-blue-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-phone" className="text-xs font-bold text-slate-800">Phone Number</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={profile.phone}
                      onChange={(e) => updateProfileField("phone", e.target.value)}
                      className="bg-white border-slate-200 h-12 text-sm text-slate-900 rounded-xl focus:ring-blue-600"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex gap-2.5 items-start text-[11px] text-slate-500 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>
                        I consent to receive weekly delta matching alerts and priority funding reminders from FSI Digital. I can unsubscribe at any time.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSavingStep1}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 text-sm flex items-center justify-center gap-2 rounded-xl"
                  >
                    {isSavingStep1 ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving Draft...
                      </>
                    ) : (
                      <>
                        Continue to Demographics <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 2: Demographics */}
            {wizardStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="space-y-2 text-left">
                  <Label className="text-sm font-bold text-slate-800">Business Location</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        updateProfileField("country", "Canada")
                        updateProfileField("region", "ON")
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        profile.country === "Canada" 
                          ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-100" 
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Canada</span>
                      <span className="block text-sm font-black text-slate-900 mt-0.5">🍁 Canadian Entity</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        updateProfileField("country", "USA")
                        updateProfileField("region", "CA")
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        profile.country === "USA" 
                          ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-100" 
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">United States</span>
                      <span className="block text-sm font-black text-slate-900 mt-0.5">🇺🇸 US Business</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <Label htmlFor="region" className="text-sm font-bold text-slate-800">Province or State</Label>
                  <select
                    id="region"
                    value={profile.region}
                    onChange={(e) => updateProfileField("region", e.target.value)}
                    className="w-full h-12 px-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  >
                    {profile.country === "Canada" ? (
                      <>
                        <option value="ON">Ontario (ON)</option>
                        <option value="BC">British Columbia (BC)</option>
                        <option value="QC">Quebec (QC)</option>
                        <option value="AB">Alberta (AB)</option>
                        <option value="NS">Nova Scotia (NS)</option>
                      </>
                    ) : (
                      <>
                        <option value="CA">California (CA)</option>
                        <option value="TX">Texas (TX)</option>
                        <option value="NY">New York (NY)</option>
                        <option value="FL">Florida (FL)</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="space-y-2 text-left">
                  <Label className="text-sm font-bold text-slate-800">Company size (FTEs)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {["1-9", "10-49", "50-99", "100-499", "500+"].map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => updateProfileField("companySize", size)}
                        className={`p-3 rounded-lg border text-center text-xs font-bold transition-all ${
                          profile.companySize === size 
                            ? "border-blue-600 bg-blue-50/50 text-blue-700 font-extrabold" 
                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        {size} FTEs
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    variant="outline"
                    className="flex-1 border-slate-200 text-slate-700 font-bold py-6 text-sm rounded-xl"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      localStorage.setItem("fsi_funding_profile", JSON.stringify(profile))
                      setWizardStep(3)
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 text-sm flex items-center justify-center gap-2 rounded-xl"
                  >
                    Continue to Profile <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Sector & Activities combined */}
            {wizardStep === 3 && (
              <form onSubmit={handleStep3Submit} className="space-y-6 text-left animate-in fade-in slide-in-from-bottom-4 duration-300">
                {step3Error && (
                  <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-lg">
                    {step3Error}
                  </div>
                )}

                <div className="space-y-3">
                  <Label className="text-sm font-bold text-slate-800">Primary Business Sector</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: "technology", label: "Technology / Software", desc: "Software, R&D, Tech consulting" },
                      { id: "manufacturing", label: "Manufacturing", desc: "Factories, physical products, scale" },
                      { id: "cleantech", label: "Clean Energy / Cleantech", desc: "Solar, wind, recycling, green tech" },
                      { id: "healthcare", label: "Healthcare / Life Sciences", desc: "Medical tech, labs, clinical" },
                      { id: "retail", label: "Retail / E-commerce", desc: "Online stores, consumer goods" },
                      { id: "services", label: "Professional Services", desc: "Legal, accounting, marketing agency" },
                      { id: "other", label: "Other Business", desc: "Tourism, general operations" }
                    ].map(ind => (
                      <button
                        key={ind.id}
                        type="button"
                        onClick={() => updateProfileField("industry", ind.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          profile.industry === ind.id 
                            ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-100" 
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <span className="block text-xs font-black text-slate-900">{ind.label}</span>
                        <span className="block text-[10px] text-slate-500 mt-0.5">{ind.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <Label className="text-sm font-bold text-slate-800">Check all that apply to your business:</Label>
                  
                  <div className="space-y-3">
                    {[
                      { id: "isIncorporated", label: "Our business is incorporated", desc: "Eligible for federal tax credits and regional scale-up programs" },
                      { id: "hasRd", label: "We conduct technology, software, or product R&D", desc: "Primary trigger for SR&ED and IRAP programs" },
                      { id: "hasHiring", label: "We are actively hiring or planning to hire staff/contractors", desc: "Qualifies for hiring subsidies and local employment grants" },
                      { id: "hasExporting", label: "We sell or plan to sell products internationally", desc: "Qualifies for CanExport and international market development funds" }
                    ].map(item => (
                      <label
                        key={item.id}
                        className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                          (profile as any)[item.id]
                            ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-100"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          checked={!!(profile as any)[item.id]}
                          onChange={(e) => updateProfileField(item.id, e.target.checked)}
                        />
                        <div>
                          <span className="block text-xs font-black text-slate-900">{item.label}</span>
                          <span className="block text-[10px] text-slate-500 mt-0.5">{item.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    variant="outline"
                    className="flex-1 border-slate-200 text-slate-700 font-bold py-6 text-sm rounded-xl"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSavingStep3}
                    className="flex-1 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-950 text-white font-bold py-6 text-sm flex items-center justify-center gap-2 rounded-xl shadow-lg shadow-blue-700/15"
                  >
                    {isSavingStep3 ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Evaluating...
                      </>
                    ) : (
                      <>
                        Evaluate Funding Portfolio <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // PORTFOLIO RESULTS RENDERING
  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 max-w-5xl space-y-8">
      {subscriptionStatus === "trial" && (
        <div className="p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl flex items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-700 animate-pulse shrink-0" />
            <div>
              <span className="font-bold text-xs sm:text-sm">Trial Active: {trialRemainingDays} days remaining</span>
              <p className="text-[10px] text-blue-600">You have full, unrestricted access to all checklists, matching criteria, and stacking strategies.</p>
            </div>
          </div>
          <button
            onClick={() => document.getElementById("upgrade-section")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] shrink-0"
          >
            Upgrade to Founding Member
          </button>
        </div>
      )}

      {subscriptionStatus === "active" && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <span className="font-bold text-xs sm:text-sm">Founding Member Pass Active</span>
            <p className="text-[10px] text-emerald-600">Thank you for supporting FSI Digital as a Founding Member. Your subscription ID is {subscriptionId}.</p>
          </div>
        </div>
      )}
      {/* EXECUTIVE SUMMARY BRIEFING BANNER */}
      <Card className="border-2 border-indigo-600 bg-slate-950 text-white shadow-xl rounded-3xl overflow-hidden p-8 text-left animate-in fade-in duration-300 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/20 flex items-center justify-center border border-indigo-500/30">
                <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              </div>
              <h3 className="font-extrabold text-white text-sm tracking-tight uppercase">Executive Summary</h3>
            </div>
            <Badge className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 border border-indigo-500/30 font-black tracking-widest text-[9px] uppercase px-2.5 py-1">
              Analysis Complete
            </Badge>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-bold">
            Based on your answers, your business appears to have{" "}
            <span className="text-indigo-400 underline decoration-indigo-400/30 decoration-2 underline-offset-4">
              {readiness.score >= 70 ? "strong" : "active"} alignment
            </span>{" "}
            with innovation and growth funding.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Column 1: Estimated Funding Opportunity */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-2">
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                  Estimated Funding Opportunity
                </span>
                <span className="text-2xl font-black text-indigo-400 block mt-1">
                  {stackingRange.formatted}
                </span>
              </div>
              <p className="text-[9px] text-slate-500 leading-relaxed">
                Combined potential range from qualified intakes.
              </p>
            </div>

            {/* Column 2: Highest Priority Programs */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-2">
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                  Highest Priority Programs
                </span>
                <ol className="text-xs font-bold text-slate-200 space-y-1">
                  {topMatches.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 truncate">
                      <span className="text-indigo-400 font-extrabold">{idx + 1}.</span>
                      <span>{getShortProgramName(item.program.name)}</span>
                    </li>
                  ))}
                  {topMatches.length === 0 && (
                    <li className="text-[10px] text-slate-500 italic">No qualified matches.</li>
                  )}
                </ol>
              </div>
              <p className="text-[9px] text-slate-500 leading-relaxed">
                Top recommended intake streams.
              </p>
            </div>

            {/* Column 3: Primary Risk Factor */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-2">
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
                  Primary Risk
                </span>
                <span className="text-xs font-bold text-amber-400 block mt-1.5 leading-normal">
                  ⚠ {primaryRisk}
                </span>
              </div>
              <p className="text-[9px] text-slate-500 leading-relaxed">
                Action required to verify program compliance.
              </p>
            </div>

          </div>
        </div>
      </Card>


      {/* 1. TOP SUMMARY BLOCK */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Estimated Funding Potential Block (First) */}
        <Card className="md:col-span-6 border-emerald-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white shadow-md rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <CardHeader className="p-6 pb-2 relative z-10 text-left">
            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-wider block">Estimated Funding Potential</span>
            <CardTitle className="text-3xl sm:text-4xl font-black mt-1 text-white">
              {stackingRange.formatted}
            </CardTitle>
            <CardDescription className="text-slate-300 text-xs">
              Combined potential range from eligible programs checked below.
            </CardDescription>

            {/* How We Calculated This (Credibility block) */}
            <div className="mt-5 pt-4 border-t border-slate-800/60 text-left space-y-2">
              <span className="font-extrabold uppercase tracking-wider text-[10px] text-emerald-400 block">
                How We Calculated This
              </span>
              <p className="text-[10px] text-slate-400 leading-normal">
                Your estimated funding opportunity is dynamically computed using your core business parameters:
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-semibold text-slate-300 text-[10px] pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-extrabold">✓</span> Company size ({profile.companySize} FTEs)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-extrabold">✓</span> Province ({profile.region})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-extrabold">✓</span> Industry ({profile.industry})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-extrabold">✓</span> Hiring plans ({profile.hasHiring ? "Yes" : "No"})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-extrabold">✓</span> R&D activities ({profile.hasRd ? "Yes" : "No"})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-extrabold">✓</span> Export goals ({profile.hasExporting ? "Yes" : "No"})
                </span>
              </div>
            </div>

          </CardHeader>
          <CardContent className="p-6 pt-2 relative z-10 flex flex-col justify-between h-full text-left space-y-4">
            <p className="text-[10.5px] text-slate-400 leading-relaxed font-semibold">
              Maximize your capital yield. Stacking regional grants, tax credits, and training incentives maximizes operational budgets without equity dilution.
            </p>

            {/* Potential Breakdown */}
            <div className="pt-3.5 border-t border-slate-800/60 space-y-2.5">
              <span className="font-extrabold uppercase tracking-wider text-[10px] text-indigo-400 block">
                Potential Breakdown
              </span>
              <div className="space-y-2 pt-0.5">
                {topMatches.slice(0, 3).map((item, idx) => {
                  const range = PortfolioScoreEngine.getOpportunityRange(item.program.slug, item.program.fundingAmount);
                  const formatVal = (v: number) => `$${(v / 1000).toFixed(0)}k`;
                  return (
                    <div key={idx} className="flex justify-between items-center text-[10.5px] font-bold text-slate-200">
                      <span className="text-slate-300">{getShortProgramName(item.program.name)}</span>
                      <span className="text-emerald-400">{formatVal(range.min)} - {formatVal(range.max)}+</span>
                    </div>
                  );
                })}
                {profile.hasHiring && (
                  <div className="flex justify-between items-center text-[10.5px] font-bold text-slate-200">
                    <span className="text-slate-300">Wage & Hiring Grants</span>
                    <span className="text-emerald-400">$15k - $30k</span>
                  </div>
                )}
              </div>
            </div>

            
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
              <span className="text-[10px] text-slate-400">Programs Stacked: {checkedSlugs.length}</span>
              <button
                onClick={() => {
                  sessionStorage.removeItem("fsi_funding_profile")
                  setHasProfile(false)
                  setIsUnlocked(false)
                  setWizardStep(1)
                  setShowWelcome(true)
                }}
                className="text-[10px] text-blue-400 hover:text-blue-300 font-extrabold underline bg-transparent"
              >
                Reset Screener
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Score & Benchmark Block (Second) */}
        <Card className="md:col-span-6 border-slate-200 bg-white shadow-xs rounded-2xl flex flex-col justify-between overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-900 p-6 text-white flex justify-between items-start gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-300 block">Assessment Complete</span>
              <h2 className="text-xl font-extrabold tracking-tight mt-1">Funding Match Profile</h2>
            </div>
            <Badge className="bg-white/20 text-white hover:bg-white/20 font-bold py-0.5 px-2">
              🏆 Verified
            </Badge>
          </div>
          
          <CardContent className="p-6 space-y-6">
            {/* DOMINATING SCORE SECTION */}
            <div className="text-center py-4 border-b border-slate-100 space-y-1">
              <span className="text-5xl sm:text-6xl font-black text-slate-900 block tracking-tight leading-none">
                {readiness.score}
              </span>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">
                Funding Match Score
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] font-black px-3.5 py-1 uppercase tracking-wider mt-2 shadow-2xs">
                {readiness.band}
              </span>
            </div>

            {/* SCORE EXPLANATION ENGINE */}
            <div className="space-y-4 text-left">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Why is my score {readiness.score}?</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Contributors */}
                <div className="space-y-2">
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-wider block">Positive Drivers</span>
                  <div className="space-y-1.5">
                    {scoreFactors.contributors.map((factor, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 p-2 bg-emerald-50/40 border border-emerald-100/50 rounded-lg text-[10px] text-emerald-800 font-semibold leading-normal">
                        <span className="font-extrabold text-emerald-600">+{factor.value}</span>
                        <span>{factor.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deductions */}
                <div className="space-y-2">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">Areas to Improve</span>
                  <div className="space-y-1.5">
                    {scoreFactors.deductions.length === 0 ? (
                      <div className="p-2 bg-slate-50 rounded-lg text-[10px] text-slate-400 italic">
                        No active deductions. Maximum score potential reached.
                      </div>
                    ) : (
                      scoreFactors.deductions.map((factor, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] text-slate-600 font-semibold leading-normal">
                          <span className="font-extrabold text-slate-400">{factor.value}</span>
                          <span>{factor.name}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WHAT THIS MEANS FOR YOUR BUSINESS */}
      <Card className="border border-blue-200 bg-blue-50/20 shadow-xs rounded-2xl p-6 text-left">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-5 h-5 text-blue-700" />
          <h4 className="font-extrabold text-slate-900 text-sm tracking-tight">What This Means For Your Business</h4>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-semibold">
          {whatThisMeans}
        </p>
      </Card>

      {/* OPPORTUNITY FLAGS SECTION */}
      {opportunityFlags.length > 0 && (
        <Card className="border border-amber-200/60 bg-amber-50/10 shadow-xs rounded-2xl p-5 text-left">
          <div className="flex items-center gap-2 mb-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h4 className="font-extrabold text-slate-900 text-sm tracking-tight">Eligibility Risk Analysis & Strategic Insights</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {opportunityFlags.map((flag, idx) => (
              <div key={idx} className="bg-white/80 p-4 border border-amber-100/60 rounded-xl space-y-1.5 shadow-xs">
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider block">
                  ⚠ {flag.title}
                </span>
                <p className="text-[11px] font-semibold text-slate-700 leading-normal">
                  {flag.text}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Report Purchase Section */}
      {isUnlocked && !reportPurchased && (
        <Card className="border-2 border-indigo-600 bg-slate-950 text-white shadow-2xl rounded-3xl overflow-hidden animate-in fade-in duration-300">
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 p-6 border-b border-slate-800">
            <div className="max-w-3xl mx-auto space-y-6">
              
              {/* Assessment Progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold uppercase tracking-wider text-slate-400">Assessment Status</span>
                  <span className="font-black text-emerald-400">33% Compiled (Free Tier)</span>
                </div>
                
                {/* Horizontal Progress Track */}
                <div className="grid grid-cols-3 gap-2 text-[10px] font-bold text-center">
                  <div className="p-2.5 rounded-xl border border-emerald-900/60 bg-emerald-950/20 text-emerald-400 flex items-center justify-center gap-1.5 shadow-inner">
                    <span className="text-emerald-500 font-extrabold">✓</span> Free Assessment
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-400 flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3 text-slate-500" /> Detailed Analysis
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-400 flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3 text-slate-500" /> Funding Strategy
                  </div>
                </div>
              </div>

              {/* Value Meter Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-slate-800/80">
                <div className="text-center sm:text-left space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Funding Match Score</span>
                  <span className="text-2xl font-black text-white">{readiness.score}/100</span>
                </div>
                <div className="text-center sm:text-left space-y-1 border-t sm:border-t-0 sm:border-x border-slate-800/80 pt-3 sm:pt-0 sm:px-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Estimated Funding Stack</span>
                  <span className="text-2xl font-black text-emerald-400">{stackingRange.formatted}</span>
                </div>
                <div className="text-center sm:text-left space-y-1 border-t sm:border-t-0 pt-3 sm:pt-0 sm:pl-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Identified Programs</span>
                  <span className="text-2xl font-black text-indigo-400">{eligibleMatches.length} Matched</span>
                </div>
              </div>

              {/* Potential Opportunity Gap Banner */}
              <div className="p-5 bg-amber-500/10 border-2 border-dashed border-amber-500/30 rounded-2xl text-left space-y-2 max-w-xl mx-auto">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 text-xs font-extrabold">⚠</span>
                  <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest block">
                    Potential Opportunity Gap
                  </span>
                </div>
                <h4 className="text-xs font-black text-white">
                  Money You May Be Leaving On The Table
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                  You appear aligned with <span className="text-amber-400 font-extrabold">{eligibleMatches.length} funding programs</span>. Only 3 are currently visible on this basic dashboard. The remaining programs and stack strategies are currently locked.
                </p>
              </div>

              {/* Unlock Value Prop list */}
              <div className="text-left space-y-3 max-w-xl mx-auto bg-slate-900/60 p-5 border border-slate-800/80 rounded-2xl">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider block">Detailed Analysis Locked</span>
                <p className="text-slate-300 text-xs font-semibold">
                  Unlock the full Executive Funding Assessment report to access:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[11px] text-slate-300 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-400 font-extrabold">✓</span> Full Eligibility Review
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-400 font-extrabold">✓</span> Application Checklist
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-400 font-extrabold">✓</span> Filing Timeline
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-400 font-extrabold">✓</span> Funding Stacking Strategy
                  </li>
                  <li className="flex items-center gap-2 sm:col-span-2">
                    <span className="text-indigo-400 font-extrabold">✓</span> Priority Recommendations
                  </li>
                </ul>
              </div>

            </div>
          </div>
          
          <CardContent className="p-6 sm:p-8 space-y-8">
            {/* Price Anchoring Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Anchor 1: VIP Strategy Blueprint */}
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">VIP Option</span>
                  <h4 className="font-extrabold text-sm text-slate-200">VIP Strategy Session & Blueprint</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    1-on-1 audit briefing with a Senior Funding Analyst to verify your filing roadmap. Includes full refund.
                  </p>
                </div>
                <div className="pt-2">
                  <span className="text-2xl font-black text-white">$499</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">one-time deposit</span>
                </div>
                <button
                  type="button"
                  onClick={() => router.push(bookingUrl)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  Book VIP Blueprint &rarr;
                </button>
              </div>

              {/* Anchor 2: Standalone Assessment (Highlight) */}
              <div className="p-6 bg-indigo-950/40 border-2 border-indigo-500 rounded-2xl flex flex-col justify-between space-y-4 relative">
                <div className="absolute top-0 right-4 -translate-y-1/2 bg-indigo-600 text-white font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Popular
                </div>
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider block">Best Value</span>
                  <h4 className="font-extrabold text-sm text-slate-100">Executive Funding Assessment</h4>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    Secure your digital + printable PDF assessment with stacking guidelines, typical yields, and pre-qualification checklist.
                  </p>
                </div>

                {/* ROI Value Equation Framing */}
                <div className="p-3.5 bg-slate-900/95 border border-slate-800 rounded-xl text-[10.5px] space-y-2.5 text-left">
                  <span className="text-[9px] font-black text-indigo-400 uppercase tracking-wider block">Value Equation</span>
                  <div className="space-y-1.5 font-bold text-slate-200">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-400">Potential Opportunity Identified:</span>
                      <span className="text-white font-extrabold">{stackingRange.formatted}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-800/40 pt-1.5 text-[10px]">
                      <span className="text-slate-400">Assessment Investment:</span>
                      <span className="text-white font-extrabold">${publicPrice}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-800/40 pt-1.5 text-[10.5px] text-emerald-400 font-black">
                      <span>Potential return multiple:</span>
                      <span>
                        {(() => {
                          const minVal = stackingRange.min || 180000;
                          const yieldMultiplier = Math.floor(minVal / publicPrice);
                          return `${yieldMultiplier}x+`;
                        })()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Proof Checklist */}
                <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-xl text-[10px] space-y-2 text-left">
                  <p className="text-slate-400 font-bold leading-normal text-[9.5px]">
                    Identifies priority stack pipelines for:
                  </p>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-[9px] text-slate-300 font-extrabold pt-0.5">
                    <span className="flex items-center gap-0.5"><span className="text-emerald-500">✓</span> IRAP</span>
                    <span className="flex items-center gap-0.5"><span className="text-emerald-500">✓</span> SR&ED</span>
                    <span className="flex items-center gap-0.5"><span className="text-emerald-500">✓</span> CanExport</span>
                    <span className="flex items-center gap-0.5"><span className="text-emerald-500">✓</span> Provincial Grants</span>
                  </div>
                </div>


                <div className="pt-2">
                  <span className="line-through text-slate-500 text-xs block">Normally $499</span>
                  <span className="text-3xl font-black text-white">${publicPrice}</span>
                  <span className="text-[10px] text-indigo-300 block mt-0.5">one-time payment</span>
                </div>
                
                {/* Render PayPal Button for Public Price if not member */}
                {!isMember && (
                  <div className="pt-2">
                    <div id="report-paypal-container" className="w-full min-h-[40px]" />
                  </div>
                )}
                
                {isMember && (
                  <div className="text-[10px] text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-900/60 p-2 rounded-lg text-center">
                    Founding Member active. See discounted price in Member column.
                  </div>
                )}
              </div>

              {/* Anchor 3: Member Discount Price */}
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider block">Member Price</span>
                  <h4 className="font-extrabold text-sm text-slate-200">Founding Member Discount</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Introductory price exclusively for active trials and Founding Member subscription holders.
                  </p>
                </div>
                <div className="pt-2">
                  <span className="line-through text-slate-500 text-xs block">Normally $199</span>
                  <span className="text-2xl font-black text-emerald-400">${memberPrice}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">one-time payment</span>
                </div>
                
                {isMember ? (
                  <div className="pt-2">
                    <div id="report-paypal-container" className="w-full min-h-[40px]" />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => document.getElementById("upgrade-section")?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 px-4 rounded-xl text-xs transition-all"
                  >
                    Activate Membership First
                  </button>
                )}
              </div>
            </div>

            {/* Refund Guarantee & Delivery Time */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="font-bold text-slate-200 block">100% Refund Policy</span>
                  <p className="text-[10px]">If our system identifies fewer than 2 active funding opportunities, we will issue a full refund immediately.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <span className="font-bold text-slate-200 block">Estimated Delivery Time</span>
                  <p className="text-[10px]">Usually delivered to your inbox and dashboard within 10 minutes.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Report Purchased Success Bar */}
      {isUnlocked && reportPurchased && (
        <Card className="border border-emerald-500/40 bg-emerald-950/20 shadow-md rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
            <div className="text-left">
              <span className="font-bold text-slate-900 text-sm block">Executive Funding Assessment Unlocked</span>
              <p className="text-[10px] text-slate-500">Your transaction ID is {reportTransactionId}. PDF generation and download options are fully active.</p>
            </div>
          </div>
          <button
            onClick={async () => {
              try {
                const searchParams = new URLSearchParams(window.location.search)
                let token = searchParams.get("token")
                if (!token) {
                  const res = await fetch(`/api/auth/subscriber?email=${profile.email}`)
                  const data = await res.json()
                  token = data.subscriber?.loginToken || ""
                }
                router.push(`/portfolio/report?token=${token || "N/A"}`)
              } catch (e) {
                console.error("View report error:", e)
              }
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shrink-0 flex items-center gap-1.5 transition-all shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            View Executive Report
          </button>
        </Card>
      )}

      {/* 2. PORTFOLIO SEGMENTS */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <BookOpen className="w-5 h-5 text-blue-700" />
          <h3 className="text-lg font-black text-slate-900">Your Recommended Funding Priorities</h3>
        </div>

        {eligibleMatches.length === 0 ? (
          <div className="p-10 text-center text-slate-500 bg-white border rounded-2xl">
            <ShieldAlert className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold">No eligible programs matched your current profile filters.</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting the screener and adjusting your strategic parameters.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* TOP 3 matches (UNLOCKED BASE) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topMatches.map((item, idx) => {
                const isItemChecked = checkedSlugs.includes(item.program.slug)
                const priorityData = PortfolioScoreEngine.getProgramPriority(item.program.slug)
                
                return (
                  <Card 
                    key={item.program.slug} 
                    className={`border transition-all duration-200 rounded-2xl flex flex-col justify-between relative overflow-hidden ${
                      isItemChecked 
                        ? "border-blue-600 bg-white shadow-xs" 
                        : "border-slate-200 bg-slate-50/50 opacity-80"
                    }`}
                  >
                    {/* Header badge */}
                    <div className="bg-slate-900/5 px-4 py-2 flex justify-between items-center gap-2 border-b border-slate-100">
                      <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">
                        {item.program.fundingType}
                      </span>
                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                        priorityData.priority === "Apply First" 
                          ? "bg-blue-100 text-blue-800" 
                          : priorityData.priority === "Apply Second"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-purple-100 text-purple-800"
                      }`}>
                        {priorityData.priority}
                      </span>
                    </div>

                    <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-3">
                          <h4 className="font-extrabold text-slate-900 text-sm tracking-tight leading-snug">
                            {item.program.name}
                          </h4>
                          {isUnlocked && (
                            <input
                              type="checkbox"
                              className="h-4.5 w-4.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5 cursor-pointer shrink-0"
                              checked={isItemChecked}
                              onChange={() => handleCheckboxToggle(item.program.slug)}
                            />
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 leading-normal line-clamp-3">
                          {item.program.description}
                        </p>
                      </div>

                      {/* Yield & Status details */}
                      <div className="pt-3 border-t border-slate-100 flex justify-between items-end gap-2">
                        <div>
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Typical Yield</span>
                          <span className="text-xs font-black text-slate-900">
                            {item.program.fundingAmount.split(" (")[0]}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-sm block mb-1">
                            {PortfolioScoreEngine.getOpportunityStatus(item.program.slug)}
                          </span>
                          <span className="text-[9px] font-extrabold text-blue-600 italic">
                            {item.match.fitBand} Match
                          </span>
                        </div>
                      </div>

                      {/* Rationale label */}
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="text-[8px] font-black text-slate-400 uppercase block tracking-wider mb-0.5">Priority Strategy</span>
                        <p className="text-[9px] font-bold text-slate-700 leading-normal">
                          {priorityData.rationale}
                        </p>
                      </div>

                      {/* DETAILED SCORECARD (GATED SECTION) */}
                      <div className="relative pt-2">
                        {!isUnlocked ? (
                          <div className="space-y-2 select-none pointer-events-none filter blur-[3px] opacity-30">
                            <div className="h-4 w-full bg-slate-200 rounded" />
                            <div className="h-4 w-5/6 bg-slate-200 rounded" />
                            <div className="h-4 w-4/5 bg-slate-200 rounded" />
                          </div>
                        ) : (
                          <div className="relative">
                            {subscriptionStatus !== "active" && subscriptionStatus !== "trial" && !reportPurchased && (
                              <div className="absolute inset-0 bg-white/85 backdrop-blur-xs flex flex-col items-center justify-center text-center p-2 z-10 rounded-xl">
                                <Lock className="w-4.5 h-4.5 text-blue-700 mb-1" />
                                <span className="text-[10px] font-bold text-slate-800">Filing Guide & Stacking Locked</span>
                                <button 
                                  onClick={() => document.getElementById("upgrade-section")?.scrollIntoView({ behavior: "smooth" })}
                                  className="text-[8px] text-blue-600 font-extrabold underline mt-0.5"
                                >
                                  Unlock Founding Member Pass &rarr;
                                </button>
                              </div>
                            )}
                            <div className={`space-y-2 animate-in fade-in duration-300 ${subscriptionStatus !== "active" && subscriptionStatus !== "trial" && !reportPurchased ? "filter blur-[2px] select-none pointer-events-none" : ""}`}>
                              <span className="text-[8px] font-black text-slate-400 uppercase block tracking-wider">Prequalification Checklist</span>
                              <ul className="space-y-1">
                                {item.match.explanations.slice(0, 3).map((e, index) => (
                                  <li key={index} className="text-[9px] font-medium text-slate-700 flex items-start gap-1">
                                    {e.startsWith("✓") ? (
                                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                                    ) : (
                                      <span className="text-amber-500 font-bold shrink-0">⚠</span>
                                    )}
                                    <span className="truncate">{e.substring(1).trim()}</span>
                                  </li>
                                ))}
                              </ul>
                              
                              <div className="grid grid-cols-2 gap-2 pt-2 text-[8px] border-t border-slate-100">
                                <div>
                                  <span className="text-slate-400 block uppercase">Confidence:</span>
                                  <span className="font-extrabold text-slate-800">{item.match.confidence}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400 block uppercase">Difficulty:</span>
                                  <span className="font-extrabold text-slate-800">{item.match.difficulty}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* ADDITIONAL MATCHES (GATED PANEL) */}
            {additionalMatches.length > 0 && (
              <div className="relative">
                {!isUnlocked ? (
                  <div className="p-8 border border-dashed border-slate-200 rounded-2xl bg-slate-100/30 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-xs flex items-center justify-center z-10">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border p-3 rounded-xl shadow-xs">
                        <Lock className="w-3.5 h-3.5 text-blue-700" />
                        <span>Lock wall active. Complete assessment details below to unlock {additionalMatches.length} additional matches.</span>
                      </div>
                    </div>
                    {/* Ghost elements for preview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 filter blur-[2px] opacity-25">
                      <div className="h-16 bg-slate-200 rounded" />
                      <div className="h-16 bg-slate-200 rounded" />
                    </div>
                  </div>
                ) : subscriptionStatus !== "active" && subscriptionStatus !== "trial" && !reportPurchased ? (
                  <div className="p-8 border border-dashed border-slate-200 rounded-2xl bg-slate-100/30 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/85 backdrop-blur-xs flex flex-col items-center justify-center z-10 text-center">
                      <Lock className="w-5 h-5 text-blue-700 mb-2" />
                      <h4 className="font-extrabold text-sm text-slate-900 mb-1">{additionalMatches.length} More Matches Available</h4>
                      <p className="text-xs text-slate-500 max-w-sm mb-3">Upgrade to a Founding Member pass or buy the report to view your full funding portfolio, stack programs, and get checklists.</p>
                      <button 
                        onClick={() => document.getElementById("upgrade-section")?.scrollIntoView({ behavior: "smooth" })}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-[10px] shadow-xs"
                      >
                        Unlock Full Portfolio &rarr;
                      </button>
                    </div>
                    {/* Ghost elements for preview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 filter blur-[2px] opacity-20 select-none pointer-events-none">
                      <div className="h-16 bg-slate-200 rounded" />
                      <div className="h-16 bg-slate-200 rounded" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                      Additional Matching Programs ({additionalMatches.length})
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {additionalMatches.map(item => {
                        const isItemChecked = checkedSlugs.includes(item.program.slug)
                        return (
                          <Card 
                            key={item.program.slug}
                            className={`border p-4 rounded-xl flex items-center justify-between gap-4 transition-all ${
                              isItemChecked ? "border-blue-600 bg-white" : "border-slate-200 bg-slate-50/50"
                            }`}
                          >
                            <div className="space-y-1">
                              <h5 className="font-bold text-xs text-slate-900 leading-tight">
                                {item.program.name}
                              </h5>
                              <div className="flex gap-2 text-[9px] text-slate-500">
                                <span>{item.program.fundingType}</span>
                                <span>•</span>
                                <span>Yield: {item.program.fundingAmount.split(" (")[0]}</span>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                              checked={isItemChecked}
                              onChange={() => handleCheckboxToggle(item.program.slug)}
                            />
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. WHY YOU DIDN'T MATCH (Authority Layer) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <ShieldAlert className="w-4.5 h-4.5 text-slate-400" />
          <h4 className="text-sm font-extrabold text-slate-800">Transparency Checklist (Not Eligible)</h4>
        </div>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          The following programs were evaluated against your parameters, but did not match eligibility. We map restrictions openly to save application cycles.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ineligibleMatches.slice(0, 4).map(item => (
            <div key={item.program.slug} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-slate-700 leading-tight">{item.program.name}</h5>
                <p className="text-[10px] font-medium text-amber-700 mt-1">
                  {item.match.explanations[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INCLUDED IN EXECUTIVE ASSESSMENT CURIOSITY GAP CARD */}
      {isUnlocked && !reportPurchased && subscriptionStatus !== "active" && (
        <Card className="border border-slate-200 bg-white shadow-xs rounded-2xl p-6 text-left max-w-xl mx-auto space-y-4">
          <h4 className="font-extrabold text-slate-900 text-sm tracking-tight border-b border-slate-100 pb-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-600" />
            Included In Executive Funding Assessment
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Detailed Eligibility Analysis",
              "Funding Stacking Strategy",
              "Application Roadmap",
              "Required Documentation Checklist",
              "Program Priority Ranking",
              `Why We Excluded ${allPrograms.length - eligibleMatches.length} Other Programs`
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 font-semibold select-none">
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* EMAIL CAPTURE LOCK WALL CARD - Bypassed and replaced by upfront Step 1 phone collection */}

      {/* 4.5 FOUNDING MEMBER UPGRADE CARD */}
      {isUnlocked && subscriptionStatus !== "active" && (
        <Card id="upgrade-section" className="border-2 border-indigo-600 bg-white shadow-xl rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="bg-gradient-to-r from-indigo-700 to-blue-800 p-6 text-white text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <Badge className="bg-white/20 text-white hover:bg-white/20 font-black mb-1">
                ⭐ Founding Member Offer
              </Badge>
              <h3 className="text-xl font-extrabold tracking-tight">Unlock Your Funding Intelligence Platform</h3>
              <p className="text-indigo-100 text-xs mt-1">Get immediate, unrestricted access to all checklists, stacking ratios, and weekly alerts.</p>
            </div>
            <div className="text-center sm:text-right shrink-0">
              <span className="line-through text-slate-300 text-xs block">Regular $49/mo</span>
              <span className="text-2xl font-black text-white">$29<span className="text-xs font-normal">/month</span></span>
            </div>
          </div>

          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-1">
                <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Full Checklist Access
                </h4>
                <p className="text-[10px] text-slate-500 leading-normal">See exact pre-qualification criteria, deadlines, and review periods for all 30+ programs.</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Dynamic Stacking Guide
                </h4>
                <p className="text-[10px] text-slate-500 leading-normal">Learn how to combine SR&ED tax credits, IRAP, and hiring grants to maximize non-dilutive capital.</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Weekly Matching Alerts
                </h4>
                <p className="text-[10px] text-slate-500 leading-normal">Receive automated matching notifications directly to your inbox when new intakes open or rules change.</p>
              </div>
            </div>

            {paymentError && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-lg">
                {paymentError}
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center pt-4 border-t border-slate-100">
              {subscriptionStatus === "inactive" && (
                <div className="flex-1 flex flex-col justify-between p-5 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-3">
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">1. Start Cardless Trial First</h5>
                    <p className="text-[10px] text-slate-500 mt-1">Get 7 days of full access to evaluate the platform. Cancel anytime, no credit card required.</p>
                  </div>
                  <Button
                    onClick={handleStartTrial}
                    disabled={isActivatingTrial}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 text-xs rounded-xl shadow-xs"
                  >
                    {isActivatingTrial ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                        Activating Trial...
                      </>
                    ) : (
                      "Start 7-Day Free Trial"
                    )}
                  </Button>
                </div>
              )}

              <div className="flex-1 flex flex-col justify-between p-5 bg-blue-50/50 border border-blue-200 rounded-2xl text-center space-y-3">
                <div>
                  <h5 className="font-bold text-xs text-slate-900">2. Upgrade to Founding Member</h5>
                  <p className="text-[10px] text-slate-500 mt-1">Locks in the introductory $29/mo rate forever. Secure checkout processed by PayPal.</p>
                </div>
                <div id="paypal-button-container" className="w-full z-10 min-h-[40px]" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 5. UNLOCKED CTAS / BOTTOM ACTION PANEL */}
      {isUnlocked && (
        <Card className="border border-blue-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white shadow-xl rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center gap-1.5 justify-center md:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-wider block">Priority Review Available</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Book Your Funding Strategy Briefing
              </h3>
              <p className="text-slate-300 text-xs max-w-xl leading-relaxed">
                Review your stack parameters with an advisor. We will compile your technical project scope, check compliance benchmarks, and draft an audit roadmap with a 100% money-back guarantee.
              </p>
            </div>

            <Link
              href={bookingUrl}
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-6 py-4.5 rounded-xl shadow-lg shadow-emerald-500/10 transition-colors shrink-0 w-full md:w-auto text-center"
            >
              {ctaText} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}
