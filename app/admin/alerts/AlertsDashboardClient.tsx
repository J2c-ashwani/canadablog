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

  useEffect(() => {
    fetchStats()
    if (programs.length > 0) {
      setSelectedProgramSlug(programs[0].slug)
    }
  }, [programs])

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

          {/* Draft room layout */}
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
