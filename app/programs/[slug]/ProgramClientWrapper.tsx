"use client"

import React, { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { ArrowRight, Shield, Award, FileText, ChevronRight } from "lucide-react"
import type { ProgramDetails } from "@/lib/data/programs"
import { MatchScoreEngine, type MatchResult } from "@/lib/leads/MatchScoreEngine"
import type { SubscriberProfile } from "@/lib/leads/SubscriberRepository"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProgramTabs } from "@/components/seo/ProgramTabs"
import EEATBadge from "@/components/blog/EEATBadge"
import { DynamicInternalLinkEngine } from "@/components/seo/DynamicInternalLinkEngine"
import { MatchScoreCard } from "@/components/seo/MatchScoreCard"
import { StackingPortfolio } from "@/components/seo/StackingPortfolio"
import { InlineMatchEvaluator } from "@/components/seo/InlineMatchEvaluator"
import { resolveBenchmarkBySlug } from "@/lib/editorial/eligibilityBenchmarks"
import { EligibilityBenchmarkWidget } from "@/components/seo/EligibilityBenchmarkWidget"

interface ProgramClientWrapperProps {
  program: ProgramDetails
  initialSearch: {
    region?: string
    industry?: string
    size?: string
    interests?: string
    email?: string
    token?: string
  }
}

export function ProgramClientWrapper({ program, initialSearch }: ProgramClientWrapperProps) {
  const [profile, setProfile] = useState<Partial<SubscriberProfile> | null>(null)
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null)
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initProfile() {
      // 1. Check dynamic search parameters
      const { region, industry, size, interests, email, token } = initialSearch

      let activeProfile: Partial<SubscriberProfile> | null = null

      if (token) {
        try {
          const res = await fetch(`/api/subscribe/profile?token=${token}`)
          const data = await res.json()
          if (data.success && data.profile) {
            activeProfile = data.profile
          }
        } catch (err) {
          console.error("Failed to load profile by token:", err)
        }
      } else if (email) {
        try {
          const res = await fetch(`/api/subscribe/profile?email=${encodeURIComponent(email)}`)
          const data = await res.json()
          if (data.success && data.profile) {
            activeProfile = data.profile
          }
        } catch (err) {
          console.error("Failed to load profile by email:", err)
        }
      }

      // If profile not found in sheets but params exist, construct a temporary one
      if (!activeProfile && (region || industry || size || interests)) {
        activeProfile = {
          region: region || "ON",
          country: program.country, // default to program country
          industry: industry || "technology",
          companySize: (size || "10-49") as any,
          fundingInterests: interests ? interests.split(",") as any[] : ["Grants", "Tax Credits"]
        }
      }

      // 2. If still no profile, check sessionStorage
      if (!activeProfile && typeof window !== "undefined") {
        const stored = window.sessionStorage.getItem("fsi_cdp_profile")
        if (stored) {
          try {
            activeProfile = JSON.parse(stored)
          } catch (e) {}
        }
      }

      if (activeProfile) {
        const result = MatchScoreEngine.calculateMatch(program, activeProfile)
        setProfile(activeProfile)
        setMatchResult(result)
        // If we have their email address, they have full access.
        if (activeProfile.email) {
          setHasAccess(true)
        }
      }
      setLoading(false)
    }

    initProfile()
  }, [program, initialSearch])

  const handleUnlock = (newProfile: Partial<SubscriberProfile>, result: MatchResult) => {
    setProfile(newProfile)
    setMatchResult(result)
    setHasAccess(true)
  }

  // Contextual CTAs
  const getContextualCTA = (p: typeof program, scoreResult: MatchResult | null) => {
    if (scoreResult && scoreResult.status === "Eligible" && (scoreResult.fitBand === "Excellent" || scoreResult.fitBand === "Strong")) {
      return {
        text: `Claim Your ${scoreResult.fitBand} Match Audit`,
        subtext: `Secure up to ${p.fundingAmount.split(" (")[0]} allocation`
      }
    }
    
    switch (p.id) {
      case 'irap-grant':
        return { text: 'Book an IRAP Eligibility Review', subtext: 'Assess wage subsidy potential' };
      case 'sred-tax-credit':
        return { text: 'Review Your SR&ED Claim Potential', subtext: 'Calculate R&D tax credit yields' };
      case 'canexport':
        return { text: 'Prepare CanExport Intake Plan', subtext: 'Plan international marketing match' };
      case 'nih-sbir':
      case 'nsf-sbir':
        return { text: 'Request SBIR Proposal Screening', subtext: 'Evaluate technical research risk score' };
      default:
        return { text: `Check ${p.region} Funding Eligibility`, subtext: 'Get custom pre-qualification analysis' };
    }
  }

  const cta = getContextualCTA(program, matchResult)

  const isHighFit = matchResult && matchResult.status === "Eligible" && (matchResult.fitBand === "Excellent" || matchResult.fitBand === "Strong")

  // Prefill checkout/consultation links
  const checkoutUrl = useMemo(() => {
    const queryParams = new URLSearchParams()
    if (profile?.email) queryParams.set("email", profile.email)
    if (profile?.name) queryParams.set("name", profile.name)
    if (profile?.region) queryParams.set("region", profile.region)
    if (profile?.industry) queryParams.set("industry", profile.industry)
    if (profile?.companySize) queryParams.set("size", profile.companySize)
    queryParams.set("ref", "program_page_bottom_cta")
    if (matchResult?.score) queryParams.set("match_score", String(matchResult.score))
    
    return `/consultation?${queryParams.toString()}`
  }, [profile, matchResult])

  return (
    <div className="min-h-screen bg-slate-50/30">
      <Header />

      <main className="py-8 sm:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <Link href="/grants" className="hover:text-emerald-700 transition-colors">Grant Database</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800 shrink-0 truncate max-w-[200px] sm:max-w-xs">{program.name}</span>
          </nav>

          {/* Hero Banner Grid */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 mb-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-3xl relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-emerald-600/90 text-white hover:bg-emerald-600/90 border-none font-bold">
                  {program.fundingType} Program
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20">
                  {program.region === 'Federal' ? `${program.country} Federal` : `${program.region} Region`}
                </Badge>
                <Badge className={
                  program.status === 'Open' ? 'bg-emerald-500 hover:bg-emerald-500 text-slate-950 border-none font-extrabold text-[10px]' :
                  program.status === 'Upcoming' ? 'bg-blue-500 hover:bg-blue-500 text-white border-none font-extrabold text-[10px]' :
                  program.status === 'Paused' ? 'bg-amber-500 hover:bg-amber-500 text-slate-950 border-none font-extrabold text-[10px]' :
                  'bg-rose-500 hover:bg-rose-500 text-white border-none font-extrabold text-[10px]'
                }>
                  Status: {program.status}
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
                {program.name}
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-6">
                Official funding support offered by the <span className="text-white font-bold">{program.agency}</span>. Offset costs with up to <span className="text-emerald-400 font-extrabold">{program.fundingAmount}</span>.
              </p>

              <div className="flex items-center">
                <EEATBadge authorName="Ashwani" authorImage="/author-ashwani.jpg" date="2026-06-09" />
              </div>
            </div>
          </div>

          {/* Main Content Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Main Program Details) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* E-E-A-T Short Answer Box */}
              <Card className="border border-slate-200 bg-white shadow-sm overflow-hidden rounded-2xl">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50/30 px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-700" />
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800">
                    How does a business qualify for the {program.id.split('-').join(' ').toUpperCase()}?
                  </h2>
                </div>
                <CardContent className="p-6">
                  <p className="text-base text-slate-700 leading-relaxed font-medium">
                    To qualify for the {program.name}, a business must be incorporated in {program.country === 'Canada' ? 'Canada' : 'the United States'} and demonstrate active operations. The program offers up to {program.fundingAmount} in non-dilutive capital, which is categorized under a {program.fundingDifficulty} funding difficulty level. Applicants must ensure they meet all technical benchmarks and file using official channels before {program.deadlineType === 'Rolling Intake' ? 'funds are fully allocated for the fiscal period' : 'specific application windows close'}.
                  </p>
                </CardContent>
              </Card>

              {/* Eligibility Benchmark Widget (Phase 1 rollout) */}
              {(() => {
                const TOP_10_PROGRAMS = new Set([
                  'irap-grant',
                  'sred-tax-credit',
                  'canexport',
                  'cdap',
                  'nih-sbir',
                  'nsf-sbir',
                  'usda-reap',
                  'doe-clean-energy',
                  'california-competes-tax-credit',
                  'texas-enterprise-fund'
                ]);
                if (TOP_10_PROGRAMS.has(program.slug)) {
                  const benchmark = resolveBenchmarkBySlug(program.slug);
                  if (benchmark) {
                    return <EligibilityBenchmarkWidget benchmark={benchmark} />;
                  }
                }
                return null;
              })()}

              {/* Dynamic Score Card Presentation */}
              {profile && matchResult && hasAccess && (
                <div className="animate-fade-in">
                  <MatchScoreCard result={matchResult} />
                </div>
              )}

              {/* Recent Changes Timeline Widget */}
              {program.recentChanges && program.recentChanges.length > 0 && (
                <Card className="border border-emerald-100 bg-emerald-50/10 shadow-sm overflow-hidden rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Program Status & Update Log
                  </div>
                  <ul className="space-y-2 text-slate-700 text-sm font-semibold">
                    {program.recentChanges.map((change, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="text-emerald-600 shrink-0 font-extrabold">•</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Interactive Tabs Cluster */}
              <Card className="border border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden p-6">
                <ProgramTabs program={program} />
              </Card>

              {/* Related Resources & Guides (Content Clusters) */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="h-5.5 w-5.5 text-emerald-600" />
                  Related Resources & Guides
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(program.slug === 'sred-tax-credit' || program.slug === 'quebec-innovation-tax-credit') && (
                    <>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/sred-application-guide">SR&ED Application & Documentation Guide</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Playbook for tracking software development hours and claiming CRA R&D credits.</p>
                          </div>
                          <Link href="/guides/sred-application-guide" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/programs/irap-grant">Industrial Research Assistance Program (IRAP)</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Stack direct wage grants alongside your year-end SR&ED R&D tax tax credits.</p>
                          </div>
                          <Link href="/programs/irap-grant" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            View Program <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {program.slug === 'irap-grant' && (
                    <>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/irap-innovation-application-guide">How to Apply for IRAP Funding Guide</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Best practices for contacting ITAs and building project milestones.</p>
                          </div>
                          <Link href="/guides/irap-innovation-application-guide" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/programs/sred-tax-credit">SR&ED Tax Credit Program Guide</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Stack retroactive tax refunds on remaining developer payroll unfunded by IRAP.</p>
                          </div>
                          <Link href="/programs/sred-tax-credit" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            View Program <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {program.slug === 'canexport' && (
                    <>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/programs/cdap">Canada Digital Adoption Program (CDAP)</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Secure interest-free loans and hiring incentives to scale ecommerce globally.</p>
                          </div>
                          <Link href="/programs/cdap" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            View Program <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/grants/location/ontario">Ontario Regional Grant Guide</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Explore Ontario provincial and municipal growth initiatives.</p>
                          </div>
                          <Link href="/grants/location/ontario" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            View Location <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {program.slug !== 'sred-tax-credit' && program.slug !== 'quebec-innovation-tax-credit' && program.slug !== 'irap-grant' && program.slug !== 'canexport' && (
                    <>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/guides/apply-federal-grants">Federal Grant Application Strategies</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Core guidelines for submitting technical proposals to government agencies.</p>
                          </div>
                          <Link href="/guides/apply-federal-grants" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            Read Guide <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                      <Card className="border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
                        <CardContent className="p-5 flex flex-col justify-between h-full">
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors">
                              <Link href="/case-studies">Illustrative Stacking Models & Case Studies</Link>
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Examine how typical companies combine wage support, research funds, and local credits.</p>
                          </div>
                          <Link href="/case-studies" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-4">
                            View Case Studies <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>

              {/* Dynamic Internal Link Engine */}
              <DynamicInternalLinkEngine 
                region={program.region} 
                country={program.country} 
                fundingType={program.fundingType} 
                description={program.description} 
              />

              {/* Stacking Opportunity Portfolio (The Core CTA) */}
              {profile && hasAccess && (
                <div className="animate-fade-in pt-4">
                  <StackingPortfolio profile={profile} currentProgramSlug={program.slug} />
                </div>
              )}

              {/* Call to Action Grid (Default when not matched or not unlocked) */}
              {(!profile || !hasAccess) && (
                <Card className={`border rounded-2xl p-6 sm:p-8 shadow-sm ${
                  isHighFit ? "border-emerald-300 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30" : "border-slate-200 bg-white"
                }`}>
                  <div className="md:flex md:items-center md:justify-between gap-6">
                    <div className="space-y-2 mb-4 md:mb-0">
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                        Determine Your Funding Match Probability
                      </h3>
                      <p className="text-slate-600 text-sm">
                        Our pre-qualification review analyzes program requirements, stacking possibilities, and alignment to minimize filing rejections.
                      </p>
                    </div>
                    <Button asChild size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold shadow-md whitespace-nowrap">
                      <Link href={checkoutUrl} className="flex items-center gap-2">
                        {cta.text} <ArrowRight className="h-4.5 w-4.5" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column (Estimator & Lead Magnets) */}
            <div className="space-y-6">
              
              {/* Sticky Estimator & Lead Capture Wall */}
              <div className="sticky top-28 space-y-6">
                {!loading && (
                  profile && hasAccess && matchResult ? (
                    // Show a mini Scorecard summary in the sidebar if unlocked
                    <Card className="border border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden">
                      <div className="bg-slate-950 text-white p-4 font-bold text-xs flex justify-between items-center">
                        <span>Portfolio Match Active</span>
                        <Badge className="bg-emerald-600 border-none font-bold text-[9px]">Live</Badge>
                      </div>
                      <CardContent className="p-5 space-y-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">Matched Cohort</span>
                          <span className={`text-lg font-black block ${
                            matchResult.fitBand === "Excellent" ? "text-emerald-600" : "text-blue-600"
                          }`}>
                            {matchResult.fitBand} Fit
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">Opportunity</span>
                          <span className="text-xs font-bold text-slate-800 block">{matchResult.potentialOpportunity}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-[10px] font-bold text-slate-500">
                          <div>
                            <span>Difficulty</span>
                            <span className="text-xs font-extrabold text-slate-800 block mt-0.5">{matchResult.difficulty}</span>
                          </div>
                          <div>
                            <span>Confidence</span>
                            <span className="text-xs font-extrabold text-slate-800 block mt-0.5">{matchResult.confidence}</span>
                          </div>
                        </div>
                        <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 text-xs mt-2">
                          <Link href={checkoutUrl}>
                            Request Pre-Call Audit
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    // Otherwise show the wizard to calculate score
                    <InlineMatchEvaluator program={program} onUnlock={handleUnlock} />
                  )
                )}

                {/* Secure Trust Indicators */}
                <div className="p-4 border border-slate-200 rounded-xl bg-white flex items-start gap-3 shadow-xs">
                  <Shield className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-500 space-y-1">
                    <p className="font-bold text-slate-700">Official Program Alignment</p>
                    <p>FSI Digital reviews eligibility standards in accordance with official guidelines. We never guarantee funding; all approvals are subject to official government program review.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
