"use client"

import { useState, useEffect, useMemo } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Database, 
  Users, 
  Send, 
  Trash2, 
  TrendingUp, 
  Mail, 
  MousePointerClick, 
  DollarSign, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  AlertTriangle,
  Eye,
  FileText
} from "lucide-react"
import { getAllPrograms } from "@/lib/data/programs"

export default function AlertsDashboardClient() {
  const programs = useMemo(() => getAllPrograms(), [])

  // Stats States
  const [stats, setStats] = useState({
    totalSubscribers: 0,
    activeSubscribers: 0,
    unsubscribed: 0,
    averageEngagement: 100,
  })
  const [metrics, setMetrics] = useState<any[]>([])
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  // Draft Room States
  const [selectedCategory, setSelectedCategory] = useState("New Opportunity")
  const [selectedProgramSlug, setSelectedProgramSlug] = useState("")
  const [changeText, setChangeText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [draftError, setDraftError] = useState("")

  // Active Draft States
  const [activeDraft, setActiveDraft] = useState<any | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [sendSuccess, setSendSuccess] = useState("")

  // Newsletter Tab States
  const [activeTab, setActiveTab] = useState<"alerts" | "newsletter">("alerts")
  const [newsletterType, setNewsletterType] = useState<"new_funding" | "match_update" | "missing_funding">("new_funding")
  const [newsletterProgramSlug, setNewsletterProgramSlug] = useState("")
  const [newProgramsCount, setNewProgramsCount] = useState(3)
  const [newProgramsListText, setNewProgramsListText] = useState("Scale-Up Support Program; Technology Growth Fund; Provincial Job Grant")
  const [missingFundingAmount, setMissingFundingAmount] = useState("$120,000")

  const [newsletterConfig, setNewsletterConfig] = useState<any | null>(null)
  const [newsletterStats, setNewsletterStats] = useState({ totalTargets: 0, sentCount: 0, pendingCount: 0 })
  const [newsletterPreview, setNewsletterPreview] = useState("")
  const [isLoadingNewsletter, setIsLoadingNewsletter] = useState(false)
  const [isLaunchingNewsletter, setIsLaunchingNewsletter] = useState(false)
  const [newsletterError, setNewsletterError] = useState("")
  const [newsletterSuccess, setNewsletterSuccess] = useState("")

  const [authChecking, setAuthChecking] = useState(true)

  useEffect(() => {
    async function checkAndEstablishSession() {
      const searchParams = new URLSearchParams(window.location.search);
      const urlKey = searchParams.get('key');
      
      if (urlKey) {
        try {
          console.log("Found key in URL, establishing session cookie...");
          const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: urlKey }),
          });
          if (res.ok) {
            console.log("Session cookie established successfully!");
          } else {
            console.error("Failed to establish session cookie with URL key.");
          }
        } catch (err) {
          console.error("Error establishing session cookie:", err);
        }
      }
      setAuthChecking(false);
    }
    checkAndEstablishSession();
  }, []);

  useEffect(() => {
    if (authChecking) return;
    fetchStats()
    if (programs.length > 0) {
      setSelectedProgramSlug(programs[0].slug)
      setNewsletterProgramSlug(programs[0].slug)
    }
  }, [programs, authChecking])

  useEffect(() => {
    if (authChecking) return;
    if (activeTab === "newsletter") {
      fetchNewsletterStatus()
    }
  }, [activeTab, authChecking])

  // Real-time preview update as configuration fields change (debounced/triggered as they change state)
  useEffect(() => {
    if (authChecking) return;
    if (activeTab === "newsletter" && newsletterConfig?.status !== "running") {
      const timer = setTimeout(() => {
        generatePreviewHTML()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [activeTab, newsletterType, newsletterProgramSlug, newProgramsCount, newProgramsListText, missingFundingAmount, newsletterConfig?.status, authChecking])

  const fetchNewsletterStatus = async () => {
    setIsLoadingNewsletter(true)
    setNewsletterError("")
    try {
      const response = await fetch("/api/admin/alerts/newsletter")
      const data = await response.json()
      if (response.ok && data.success) {
        setNewsletterConfig(data.config)
        setNewsletterStats(data.stats)
        setNewsletterPreview(data.previewHtml)
      } else {
        setNewsletterError(data.error || "Failed to load newsletter status.")
      }
    } catch (err) {
      console.error(err)
      setNewsletterError("Failed to fetch campaign status.")
    } finally {
      setIsLoadingNewsletter(false)
    }
  }

  const generatePreviewHTML = async () => {
    const list = newProgramsListText.split(";").map(x => x.trim()).filter(Boolean)
    try {
      // Fetch live preview of how the configured newsletter compiles
      const response = await fetch("/api/admin/alerts/newsletter/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignType: newsletterType,
          programSlug: newsletterProgramSlug,
          newProgramsCount,
          newProgramsList: list,
          missingFundingAmount
        })
      })
      const data = await response.json()
      if (response.ok && data.success) {
        setNewsletterPreview(data.previewHtml)
      }
    } catch (err) {
      // Silent error for preview
    }
  }

  const handleLaunchNewsletterCampaign = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLaunchingNewsletter(true)
    setNewsletterError("")
    setNewsletterSuccess("")

    const list = newProgramsListText.split(";").map(x => x.trim()).filter(Boolean)

    try {
      const response = await fetch("/api/admin/alerts/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaignType: newsletterType,
          programSlug: newsletterType === "new_funding" ? newsletterProgramSlug : undefined,
          newProgramsCount: newsletterType === "match_update" ? newProgramsCount : undefined,
          newProgramsList: newsletterType === "match_update" ? list : undefined,
          missingFundingAmount: newsletterType === "missing_funding" ? missingFundingAmount : undefined,
        }),
      })

      const data = await response.json()
      if (response.ok && data.success) {
        setNewsletterSuccess(data.message)
        await fetchNewsletterStatus()
      } else {
        setNewsletterError(data.error || "Failed to launch campaign.")
      }
    } catch (err) {
      console.error(err)
      setNewsletterError("An unexpected error occurred.")
    } finally {
      setIsLaunchingNewsletter(false)
    }
  }

  const fetchStats = async () => {
    setIsLoadingStats(true)
    try {
      const response = await fetch("/api/admin/alerts/stats")
      const data = await response.json()
      if (response.ok && data.success) {
        setStats(data.stats)
        setMetrics(data.metrics)
      }
    } catch (err) {
      console.error("Failed to load admin stats:", err)
    } finally {
      setIsLoadingStats(false)
    }
  }

  const handleGenerateDraft = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setDraftError("")
    setSendSuccess("")
    
    try {
      const response = await fetch("/api/admin/alerts/draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: selectedCategory,
          programSlug: selectedProgramSlug,
          changeText: selectedCategory === "Program Change" ? changeText : undefined,
        }),
      })

      const data = await response.json()
      if (response.ok && data.success) {
        setActiveDraft(data.draft)
      } else {
        setDraftError(data.error || "Failed to generate draft.")
      }
    } catch (err) {
      console.error(err)
      setDraftError("An unexpected error occurred.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleBroadcastAlert = async () => {
    if (!activeDraft) return
    setIsSending(true)
    setDraftError("")
    
    try {
      const response = await fetch("/api/admin/alerts/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activeDraft),
      })

      const data = await response.json()
      if (response.ok && data.success) {
        setSendSuccess(data.message)
        setActiveDraft(null)
        fetchStats() // Refresh metrics table
      } else {
        setDraftError(data.error || "Failed to send campaign alert.")
      }
    } catch (err) {
      console.error(err)
      setDraftError("Failed to dispatch alert.")
    } finally {
      setIsSending(false)
    }
  }

  // Calculate totals
  const totalAlertsSent = useMemo(() => {
    return metrics.reduce((acc, m) => acc + m.sentCount, 0)
  }, [metrics])

  const totalRevenueAttributed = useMemo(() => {
    return metrics.reduce((acc, m) => acc + m.revenue, 0)
  }, [metrics])

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs font-black uppercase text-blue-400 tracking-wider">CDP Console</span>
              <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
                Audience & Notification Control Center
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Manage user health data, draft campaign alerts, and analyze revenue attribution metrics.
              </p>
            </div>
            <Badge variant="outline" className="border-slate-800 bg-slate-950 text-slate-300 font-bold py-1.5 px-3">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-yellow-400" />
              Live Database Hooked
            </Badge>
          </div>

          {/* CDP Summary stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border border-slate-800 bg-slate-950 text-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Active Audiences</span>
                  <div className="text-2xl font-black">{isLoadingStats ? "..." : stats.activeSubscribers}</div>
                  <span className="text-[10px] text-slate-400">Total registers: {stats.totalSubscribers}</span>
                </div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl text-emerald-400">
                  <Users className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-800 bg-slate-950 text-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Subscriber Health</span>
                  <div className="text-2xl font-black">{isLoadingStats ? "..." : `${stats.averageEngagement}/100`}</div>
                  <span className="text-[10px] text-slate-400">Opt-outs: {stats.unsubscribed}</span>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/25 rounded-2xl text-blue-400">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-800 bg-slate-950 text-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Alerts Dispatched</span>
                  <div className="text-2xl font-black">{isLoadingStats ? "..." : totalAlertsSent}</div>
                  <span className="text-[10px] text-slate-400">Campaigns: {metrics.length}</span>
                </div>
                <div className="p-3 bg-purple-500/10 border border-purple-500/25 rounded-2xl text-purple-400">
                  <Mail className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-800 bg-slate-950 text-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Attribution Revenue</span>
                  <div className="text-2xl font-black text-emerald-400">${isLoadingStats ? "..." : totalRevenueAttributed}</div>
                  <span className="text-[10px] text-slate-400">Filing Audits booked</span>
                </div>
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/25 rounded-2xl text-yellow-400">
                  <DollarSign className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-slate-800 gap-2">
            <button
              onClick={() => setActiveTab("alerts")}
              className={`pb-3 text-sm font-bold border-b-2 px-4 transition-colors ${
                activeTab === "alerts"
                  ? "border-blue-500 text-white"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Alerts Control Room
            </button>
            <button
              onClick={() => setActiveTab("newsletter")}
              className={`pb-3 text-sm font-bold border-b-2 px-4 transition-colors ${
                activeTab === "newsletter"
                  ? "border-blue-500 text-white"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Newsletter Campaigns
            </button>
          </div>

          {activeTab === "alerts" ? (
            /* Alerts Tab Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Col: Generator */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="border border-slate-800 bg-slate-950 text-white rounded-2xl shadow-xl h-full">
                  <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-yellow-400" />
                      Alerts Draft Room
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-xs">
                      Compose campaigns, select segments, and prepare previews.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleGenerateDraft} className="space-y-4">
                      {/* Category Selection */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Campaign Category</label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full h-10 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="New Opportunity">New Opportunity Alert (High Priority)</option>
                          <option value="Program Change">Program Change Notification (Medium Priority)</option>
                          <option value="Weekly Intelligence">Weekly Intelligence Digest (Low Priority)</option>
                          <option value="Emergency">Emergency Intake Warning (Critical Priority)</option>
                        </select>
                      </div>

                      {/* Program Selector */}
                      {selectedCategory !== "Weekly Intelligence" && (
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Target Program Stream</label>
                          <select
                            value={selectedProgramSlug}
                            onChange={(e) => setSelectedProgramSlug(e.target.value)}
                            className="w-full h-10 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 select-scrollbar"
                          >
                            {programs.map(prog => (
                              <option key={prog.slug} value={prog.slug}>
                                {prog.region === "Federal" ? "🍁 [Fed]" : `🇺🇸 [${prog.region}]`} {prog.name.slice(0, 50)}...
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Change Log Text Area */}
                      {selectedCategory === "Program Change" && (
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Modified Updates Details</label>
                          <Textarea
                            placeholder="e.g. Funding cap increased from $50,000 to $100,000 for local digital marketing software adopters."
                            value={changeText}
                            onChange={(e) => setChangeText(e.target.value)}
                            required
                            className="bg-slate-900 border-slate-800 text-white placeholder-slate-500 text-xs h-24"
                          />
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isGenerating || (selectedCategory === "Program Change" && !changeText)}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 text-xs flex items-center justify-center gap-2 mt-4 shadow-lg shadow-blue-500/10"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Compiling Segment Draft...
                          </>
                        ) : (
                          <>
                            <FileText className="h-4 w-4" />
                            Compile Campaign Draft
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Right Col: Active Draft Queue */}
              <div className="lg:col-span-7 space-y-6">
                <Card className="border border-slate-800 bg-slate-950 text-white rounded-2xl shadow-xl h-full flex flex-col justify-between">
                  <div>
                    <CardHeader className="p-6 pb-2">
                      <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Eye className="h-5 w-5 text-blue-400" />
                        Active Draft Preview
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-xs">
                        Inspect generated templates and verify segment matching criteria.
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-6 space-y-4">
                      {sendSuccess && (
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-emerald-400 text-xs font-semibold text-center flex items-center justify-center gap-2 animate-pulse">
                          <CheckCircle2 className="h-5 w-5 shrink-0" />
                          <span>{sendSuccess}</span>
                        </div>
                      )}

                      {draftError && (
                        <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-xl text-amber-400 text-xs font-semibold text-center flex items-center justify-center gap-2">
                          <AlertTriangle className="h-5 w-5 shrink-0" />
                          <span>{draftError}</span>
                        </div>
                      )}

                      {activeDraft ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 border border-slate-800 bg-slate-900/30 rounded-xl p-4 text-xs">
                            <div>
                              <span className="text-slate-500 font-semibold block">Subject:</span>
                              <span className="text-white font-bold">{activeDraft.subject}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 font-semibold block">Category:</span>
                              <span className="text-white font-bold">{activeDraft.category}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 font-semibold block">Segment Match:</span>
                              <Badge className="bg-blue-600 hover:bg-blue-600 text-[10px] font-bold py-0.5 px-2.5">
                                {activeDraft.targetSegment}
                              </Badge>
                            </div>
                            <div>
                              <span className="text-slate-500 font-semibold block">Recipients Count:</span>
                              <span className="text-emerald-400 font-black">{activeDraft.recipientsCount} active profiles</span>
                            </div>
                          </div>

                          {/* Iframe for safe HTML rendering */}
                          <div className="border border-slate-800 rounded-xl overflow-hidden bg-white h-72">
                            <iframe
                              srcDoc={activeDraft.body}
                              className="w-full h-full border-none"
                              title="Campaign Preview"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-20 text-slate-500 space-y-2">
                          <Mail className="h-10 w-10 text-slate-700 mx-auto" />
                          <p className="text-xs">No active draft in queue. Select a category and compile a campaign draft above.</p>
                        </div>
                      )}
                    </CardContent>
                  </div>

                  {activeDraft && (
                    <CardContent className="p-6 pt-0 border-t border-slate-900 flex gap-4">
                      <Button
                        onClick={handleBroadcastAlert}
                        disabled={isSending}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-5 text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
                      >
                        {isSending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Broadcasting Alert...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Approve & Broadcast Campaign
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => setActiveDraft(null)}
                        variant="outline"
                        className="border-slate-800 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 px-5"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  )}
                </Card>
              </div>
            </div>
          ) : (
            /* Newsletter Tab Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Col: Campaign Builder Form */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="border border-slate-800 bg-slate-950 text-white rounded-2xl shadow-xl h-full">
                  <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Mail className="h-5 w-5 text-emerald-400" />
                      Newsletter Campaigns
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-xs">
                      Select high-conversion copy models and launch email broadcasts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleLaunchNewsletterCampaign} className="space-y-4">
                      {/* Campaign Type Dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Campaign Copy Model</label>
                        <select
                          value={newsletterType}
                          onChange={(e) => setNewsletterType(e.target.value as any)}
                          disabled={newsletterConfig?.status === "running"}
                          className="w-full h-10 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                        >
                          <option value="new_funding">Type 1: New Funding Alert (Ontario AI, etc.)</option>
                          <option value="match_update">Type 2: Funding Match Update (New Programs Added)</option>
                          <option value="missing_funding">Type 3: Missing Funding Alert (Reactivation)</option>
                        </select>
                      </div>

                      {/* Config 1: Program Selector (New Funding Alert) */}
                      {newsletterType === "new_funding" && (
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Select Program Focus</label>
                          <select
                            value={newsletterProgramSlug}
                            onChange={(e) => setNewsletterProgramSlug(e.target.value)}
                            disabled={newsletterConfig?.status === "running"}
                            className="w-full h-10 px-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 select-scrollbar disabled:opacity-50"
                          >
                            {programs.map(prog => (
                              <option key={prog.slug} value={prog.slug}>
                                {prog.region === "Federal" ? "🍁 [Fed]" : `🇺🇸 [${prog.region}]`} {prog.name.slice(0, 50)}...
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Config 2: Programs Count & List (Match Update) */}
                      {newsletterType === "match_update" && (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Added Programs Count</label>
                            <Input
                              type="number"
                              min="1"
                              value={newProgramsCount}
                              onChange={(e) => setNewProgramsCount(Number(e.target.value))}
                              disabled={newsletterConfig?.status === "running"}
                              className="bg-slate-900 border-slate-800 text-white placeholder-slate-500 text-xs disabled:opacity-50"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Added Program Names (Semicolon Separated)</label>
                            <Textarea
                              placeholder="Scale-Up Support Program; Technology Growth Fund; Provincial Job Grant"
                              value={newProgramsListText}
                              onChange={(e) => setNewProgramsListText(e.target.value)}
                              disabled={newsletterConfig?.status === "running"}
                              className="bg-slate-900 border-slate-800 text-white placeholder-slate-500 text-xs h-20 disabled:opacity-50"
                            />
                          </div>
                        </>
                      )}

                      {/* Config 3: Missing Funding Amount (Missing Alert) */}
                      {newsletterType === "missing_funding" && (
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Estimated Missing Amount</label>
                          <Input
                            type="text"
                            placeholder="e.g. $120,000"
                            value={missingFundingAmount}
                            onChange={(e) => setMissingFundingAmount(e.target.value)}
                            disabled={newsletterConfig?.status === "running"}
                            className="bg-slate-900 border-slate-800 text-white placeholder-slate-500 text-xs disabled:opacity-50"
                          />
                        </div>
                      )}

                      <div className="pt-2">
                        {newsletterConfig?.status === "running" ? (
                          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs text-center font-semibold">
                            ⚠️ A Campaign is currently in progress. Changes are locked.
                          </div>
                        ) : (
                          <Button
                            type="submit"
                            disabled={isLaunchingNewsletter}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-5 text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
                          >
                            {isLaunchingNewsletter ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Initializing Queue...
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4" />
                                Launch Newsletter Campaign
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Right Col: Active Campaign Monitor & Live Preview */}
              <div className="lg:col-span-7 space-y-6">
                <Card className="border border-slate-800 bg-slate-950 text-white rounded-2xl shadow-xl h-full flex flex-col justify-between">
                  <div>
                    <CardHeader className="p-6 pb-2 flex flex-row justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                          <Eye className="h-5 w-5 text-emerald-400" />
                          Live Template Preview
                        </CardTitle>
                        <CardDescription className="text-slate-400 text-xs">
                          Real-time preview of how this campaign looks for targets.
                        </CardDescription>
                      </div>
                      
                      {newsletterConfig?.status === "running" && (
                        <Button
                          onClick={fetchNewsletterStatus}
                          variant="outline"
                          disabled={isLoadingNewsletter}
                          className="border-slate-800 hover:bg-slate-900 text-slate-300 text-xs font-bold py-1 px-3"
                        >
                          {isLoadingNewsletter ? (
                            <Loader2 className="h-3 w-3 animate-spin mr-1" />
                          ) : (
                            <Users className="h-3 w-3 mr-1" />
                          )}
                          Refresh Progress
                        </Button>
                      )}
                    </CardHeader>

                    <CardContent className="p-6 space-y-4">
                      {/* Launch success message */}
                      {newsletterSuccess && (
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-emerald-400 text-xs font-semibold text-center flex items-center justify-center gap-2 animate-pulse">
                          <CheckCircle2 className="h-5 w-5 shrink-0" />
                          <span>{newsletterSuccess}</span>
                        </div>
                      )}

                      {/* Campaign errors */}
                      {newsletterError && (
                        <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-xl text-amber-400 text-xs font-semibold text-center flex items-center justify-center gap-2">
                          <AlertTriangle className="h-5 w-5 shrink-0" />
                          <span>{newsletterError}</span>
                        </div>
                      )}

                      {/* Active Campaign Stats Tracker */}
                      {newsletterConfig && (
                        <div className="border border-slate-800 bg-slate-900/30 rounded-xl p-4 text-xs space-y-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-slate-500 font-semibold block text-[10px] uppercase">Active Campaign ID</span>
                              <span className="text-white font-mono text-[11px] font-bold">{newsletterConfig.campaignId}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 font-semibold block text-[10px] uppercase text-right">Status</span>
                              {newsletterConfig.status === "running" ? (
                                <Badge className="bg-emerald-600 hover:bg-emerald-600 animate-pulse text-[10px] font-bold py-0.5 px-2">
                                  Sending Broadcast
                                </Badge>
                              ) : newsletterConfig.status === "completed" ? (
                                <Badge className="bg-slate-700 hover:bg-slate-700 text-[10px] font-bold py-0.5 px-2">
                                  Completed
                                </Badge>
                              ) : (
                                <Badge className="bg-slate-800 hover:bg-slate-800 text-[10px] font-bold py-0.5 px-2">
                                  Idle / Ready
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-900">
                            <div>
                              <span className="text-slate-500 block text-[9px] uppercase font-bold">Audience Targets</span>
                              <span className="text-white font-extrabold text-sm">{newsletterStats.totalTargets} leads</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[9px] uppercase font-bold text-center">Dispatched</span>
                              <span className="text-emerald-400 font-black text-sm block text-center">{newsletterStats.sentCount}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[9px] uppercase font-bold text-right">Pending Queue</span>
                              <span className="text-blue-400 font-extrabold text-sm block text-right">{newsletterStats.pendingCount}</span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          {newsletterStats.totalTargets > 0 && (
                            <div className="space-y-1 pt-1">
                              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                                <span>Progress</span>
                                <span>{Math.round((newsletterStats.sentCount / newsletterStats.totalTargets) * 100)}%</span>
                              </div>
                              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                                <div 
                                  className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                                  style={{ width: `${(newsletterStats.sentCount / newsletterStats.totalTargets) * 100}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Preview HTML Render Frame */}
                      {newsletterPreview ? (
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Template Preview</label>
                          <div className="border border-slate-800 rounded-xl overflow-hidden bg-white h-72">
                            <iframe
                              srcDoc={newsletterPreview}
                              className="w-full h-full border-none"
                              title="Newsletter Preview"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-20 text-slate-500">
                          <Loader2 className="h-6 w-6 animate-spin text-slate-700 mx-auto mb-2" />
                          <p className="text-xs">Generating layout preview...</p>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* CDP Campaign Registry */}
          <Card className="border border-slate-800 bg-slate-950 text-white rounded-2xl shadow-xl overflow-hidden">
            <CardHeader className="p-6 border-b border-slate-900 flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-lg font-bold">CDP Campaign Registry (Attribution & Analytics)</CardTitle>
                <CardDescription className="text-slate-400 text-xs mt-0.5">
                  Track sent alert campaigns and dynamic lead-to-revenue performance loops.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              {metrics.length > 0 ? (
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-900 bg-slate-950 text-slate-400 uppercase tracking-wider font-bold">
                      <th className="p-4 pl-6">Campaign Subject</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Sent</th>
                      <th className="p-4">Clicks (CTR)</th>
                      <th className="p-4">Conversions</th>
                      <th className="p-4">Audit Bookings</th>
                      <th className="p-4 pr-6">Attributed Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60">
                    {metrics.map((item, idx) => {
                      const ctr = item.sentCount > 0 ? Math.round((item.clicks / item.sentCount) * 100) : 0
                      const bookingRate = item.clicks > 0 ? Math.round((item.audits / item.clicks) * 100) : 0
                      return (
                        <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-4 pl-6 font-bold text-white max-w-xs truncate">{item.subject}</td>
                          <td className="p-4">{item.category}</td>
                          <td className="p-4 font-semibold">{item.sentCount}</td>
                          <td className="p-4 font-semibold text-slate-300">
                            {item.clicks} <span className="text-blue-400 text-[10px] ml-1">({ctr}%)</span>
                          </td>
                          <td className="p-4 font-semibold text-slate-300">{item.conversions}</td>
                          <td className="p-4 font-semibold text-slate-300">
                            {item.audits} <span className="text-purple-400 text-[10px] ml-1">({bookingRate}%)</span>
                          </td>
                          <td className="p-4 pr-6 font-black text-emerald-400">${item.revenue}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <Database className="h-10 w-10 text-slate-700 mx-auto mb-2" />
                  <p>No campaigns have been broadcasted yet. Metric records will appear here post-send.</p>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </main>

      <Footer />
    </div>
  )
}
