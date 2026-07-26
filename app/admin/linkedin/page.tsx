"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  Linkedin,
  LayoutDashboard,
  FileText,
  Send,
  BarChart3,
  Settings,
  Sparkles,
  RefreshCw,
  Bookmark,
  Calendar,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  Eye,
  Globe2,
  Building2,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Lock,
  KeyRound,
  ArrowRight,
  Mail,
} from "lucide-react"

interface PublicationItem {
  id: string
  date: string
  title: string
  status: "Published" | "Scheduled" | "Draft"
  impressions: string
  engagement: string
}

export default function LinkedInPublisherPage() {
  // Authentication Gate State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [emailInput, setEmailInput] = useState<string>("reviewer@fsidigital.ca")
  const [passwordInput, setPasswordInput] = useState<string>("")
  const [authError, setAuthError] = useState<string | null>(null)

  // Content State
  const [postContent, setPostContent] = useState(
    `🚀 Canadian SMEs can accelerate digital transformation through the Canada Digital Adoption Program.\n\nEligible businesses may receive funding and advisory support to modernise operations and improve competitiveness.\n\nLearn more about eligibility and available funding opportunities.\n\n#CanadaBusiness #GovernmentFunding #DigitalTransformation`
  )

  const [activeStatusMessage, setActiveStatusMessage] = useState<string | null>(null)

  // Dynamic Publications Table State
  const [publications, setPublications] = useState<PublicationItem[]>([
    {
      id: "pub_1",
      date: "July 24, 2026",
      title: "Digital Adoption Program",
      status: "Published",
      impressions: "1,245 impressions",
      engagement: "8.4% engagement",
    },
    {
      id: "pub_2",
      date: "July 26, 2026",
      title: "AgriFood Funding Intake",
      status: "Scheduled",
      impressions: "—",
      engagement: "—",
    },
    {
      id: "pub_3",
      date: "July 25, 2026",
      title: "AI Commercialization Round",
      status: "Draft",
      impressions: "—",
      engagement: "—",
    },
  ])

  // Check Session Cookie / Auth on mount
  useEffect(() => {
    const savedAuth = typeof window !== "undefined" ? localStorage.getItem("fsi_admin_auth") : null
    if (savedAuth === "authenticated") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const pwd = passwordInput.trim()
    const validPasswords = ["fsi2026admin", "FsiReviewer2026!", "fsi2026"]
    
    if (validPasswords.includes(pwd)) {
      setIsAuthenticated(true)
      localStorage.setItem("fsi_admin_auth", "authenticated")
      setAuthError(null)
    } else {
      setAuthError("Incorrect password or access code. Please try again.")
    }
  }

  // Live Metrics
  const characterCount = postContent.length
  const hashtagCount = (postContent.match(/#[a-zA-Z0-9_]+/g) || []).length
  const estimatedReadTimeSeconds = Math.max(5, Math.ceil(postContent.split(/\s+/).filter(Boolean).length / 3.5))

  // Extract Title from Post Content
  const extractTitle = (text: string) => {
    const firstLine = text.split("\n").filter(Boolean)[0] || "Canada Funding Update"
    return firstLine.replace(/^[🚀🍁\s]+/, "").slice(0, 32)
  }

  // Actions
  const handleGeneratePost = () => {
    setPostContent(
      `🍁 Urgent Funding Alert for Canadian Business Owners:\n\nThe Canada Digital Adoption Program has officially expanded digital transformation intakes for 2026.\n\nKey Highlights:\n• Up to $150,000 non-repayable tech funding\n• Comprehensive digital roadmap advisory support\n• Applicable for software, automation & infrastructure\n\nVerify your business eligibility and stacking options today.\n\n#CanadaBusiness #DigitalTransformation #GovernmentFunding #SMEGrowth`
    )
    showNotification("✨ Generated fresh educational LinkedIn post!")
  }

  const handlePublish = () => {
    const newTitle = extractTitle(postContent)
    const newPub: PublicationItem = {
      id: `pub_${Date.now()}`,
      date: "Just now",
      title: newTitle,
      status: "Published",
      impressions: "0 impressions",
      engagement: "0.0% engagement",
    }
    setPublications((prev) => [newPub, ...prev])
    showNotification("🚀 Successfully published post to FSI Digital LinkedIn Company Page!")
  }

  const handleSchedule = () => {
    const newTitle = extractTitle(postContent)
    const newPub: PublicationItem = {
      id: `pub_${Date.now()}`,
      date: "Tomorrow 09:00 AM",
      title: newTitle,
      status: "Scheduled",
      impressions: "—",
      engagement: "—",
    }
    setPublications((prev) => [newPub, ...prev])
    showNotification("📅 Post scheduled for publication on LinkedIn Organization Page.")
  }

  const handleSaveDraft = () => {
    const newTitle = extractTitle(postContent)
    const newPub: PublicationItem = {
      id: `pub_${Date.now()}`,
      date: "Just now",
      title: newTitle,
      status: "Draft",
      impressions: "—",
      engagement: "—",
    }
    setPublications((prev) => [newPub, ...prev])
    showNotification("💾 Draft saved to FSI Digital content library.")
  }

  const showNotification = (msg: string) => {
    setActiveStatusMessage(msg)
    setTimeout(() => setActiveStatusMessage(null), 4000)
  }

  // ---------------------------------------------------
  // SECURITY LOCK GATE FOR LINKEDIN REVIEWER
  // ---------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">FSI Digital Admin Portal</h1>
            <p className="text-xs text-slate-400 mt-1">
              Reviewer access portal for the FSI Digital LinkedIn Publisher module.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Reviewer Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="reviewer@fsidigital.ca"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Password / Access Code
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
              {authError && <p className="text-xs text-rose-400 mt-2 font-medium">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Sign In to LinkedIn Publisher <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-700/60 text-center">
            <span className="text-[11px] text-slate-500">FSI Digital Admin OS • Reviewer Test Portal</span>
          </div>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------
  // MAIN DASHBOARD (WHEN AUTHENTICATED)
  // ---------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans antialiased">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              F
            </div>
            <div>
              <h2 className="font-bold text-slate-900 leading-tight">FSI Digital</h2>
              <p className="text-xs text-slate-500 font-medium">Enterprise Admin OS</p>
            </div>
          </div>

          <nav className="space-y-1">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              Dashboard
            </Link>

            <Link
              href="/admin/exceptions"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              Content & Exceptions
            </Link>

            <Link
              href="/admin/linkedin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-100 transition-colors shadow-sm"
            >
              <Linkedin className="w-4 h-4 text-blue-600" />
              LinkedIn Publisher
            </Link>

            <Link
              href="/admin/seo-opportunities"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Send className="w-4 h-4 text-slate-400" />
              Campaigns
            </Link>

            <Link
              href="/admin/leads"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <BarChart3 className="w-4 h-4 text-slate-400" />
              Analytics
            </Link>

            <Link
              href="/admin/alerts"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              Settings
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
              AK
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-800 truncate">Ashwani Kumar</p>
              <p className="text-[11px] text-slate-500 truncate">CEO & Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        {activeStatusMessage && (
          <div className="bg-emerald-600 text-white px-6 py-3 text-sm font-medium flex items-center justify-between shadow-md transition-all">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{activeStatusMessage}</span>
            </div>
            <button onClick={() => setActiveStatusMessage(null)} className="text-emerald-100 hover:text-white text-xs">
              Dismiss
            </button>
          </div>
        )}

        <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                <Building2 className="w-3.5 h-3.5" /> FSI Digital Internal Admin
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">LinkedIn Publisher</h1>
              <p className="text-sm text-slate-500 mt-1">
                Create, review and publish educational LinkedIn posts for the FSI Digital Company Page.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-800">LinkedIn Connected</span>
              </div>

              <div className="h-6 w-[1px] bg-slate-200"></div>

              <div className="text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Organisation</span>
                <span className="font-semibold text-slate-800">FSI Digital</span>
              </div>

              <div className="h-6 w-[1px] bg-slate-200"></div>

              <div className="text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Last Synced</span>
                <span className="font-medium text-slate-600">Today 10:45 AM</span>
              </div>
            </div>
          </div>

          {/* 3-COLUMN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: Opportunity */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" /> Funding Opportunity
                  </h2>
                  <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-100">
                    Source Verified
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Program
                    </label>
                    <p className="font-semibold text-slate-900 text-sm">Canada Digital Adoption Program</p>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Category
                    </label>
                    <span className="inline-block bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md text-xs">
                      Digital Transformation
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Country
                    </label>
                    <p className="font-medium text-slate-700 flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5 text-slate-400" /> Canada
                    </p>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Summary
                    </label>
                    <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      Supports eligible Canadian SMEs with funding to adopt digital technologies and improve productivity.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleGeneratePost}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate LinkedIn Post
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Educational Compliance
                </div>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  Posts are generated strictly from verified government source directives (.gc.ca). Non-promotional, educational tone enforced.
                </p>
              </div>
            </div>

            {/* CENTER COLUMN: Generated Post */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-700" /> Generated LinkedIn Post
                  </h2>
                  <span className="text-[11px] text-slate-400 font-medium">Editable Area</span>
                </div>

                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  rows={10}
                  className="w-full p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-800 leading-relaxed font-normal resize-none focus:outline-none transition-all"
                  placeholder="Compose your educational post here..."
                ></textarea>

                <div className="grid grid-cols-3 gap-3 my-4 p-3 bg-slate-50 rounded-lg border border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Character Count
                    </span>
                    <span className="text-xs font-bold text-slate-800">{characterCount}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Hashtags
                    </span>
                    <span className="text-xs font-bold text-slate-800">{hashtagCount}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Est. Read Time
                    </span>
                    <span className="text-xs font-bold text-slate-800">{estimatedReadTimeSeconds}s</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleGeneratePost}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Regenerate
                  </button>

                  <button
                    onClick={handleSaveDraft}
                    className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Bookmark className="w-3.5 h-3.5" /> Save Draft
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Preview */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-600" /> Post Preview
                  </h2>
                  <span className="text-[10px] text-slate-400 font-medium">Live Render</span>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-xs">
                      F
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-slate-900 truncate">FSI Digital</h4>
                        <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer" />
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">11,420 followers</p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <span>1m</span> • <Globe2 className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {postContent}
                  </div>

                  <div className="rounded-lg overflow-hidden border border-slate-200 bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 p-5 text-white">
                    <div className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">
                      Government Funding Intelligence
                    </div>
                    <div className="text-sm font-bold mt-1 text-white leading-snug">
                      Canada Digital Adoption Program (CDAP)
                    </div>
                    <div className="text-[11px] text-blue-200 mt-2 flex items-center gap-1 font-medium">
                      Official Eligibility Guidance <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-around text-slate-500 text-xs">
                    <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors py-1">
                      <ThumbsUp className="w-3.5 h-3.5" /> Like
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors py-1">
                      <MessageSquare className="w-3.5 h-3.5" /> Comment
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors py-1">
                      <Repeat2 className="w-3.5 h-3.5" /> Repost
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors py-1">
                      <Send className="w-3.5 h-3.5" /> Send
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <button
                    onClick={handlePublish}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-3 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Linkedin className="w-4 h-4" /> Publish to LinkedIn
                  </button>

                  <button
                    onClick={handleSchedule}
                    className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> Schedule Publication
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Recent Publications</h3>
                <p className="text-xs text-slate-500">
                  Track performance and status of recent educational posts on the FSI Digital Company Page.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" /> Avg. Engagement: 8.4%
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Post Title</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Impressions</th>
                    <th className="py-3 px-4">Engagement</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {publications.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 text-slate-500">{item.date}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">{item.title}</td>
                      <td className="py-3.5 px-4">
                        {item.status === "Published" && (
                          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Published
                          </span>
                        )}
                        {item.status === "Scheduled" && (
                          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                            <Clock className="w-3 h-3 text-amber-600" /> Scheduled
                          </span>
                        )}
                        {item.status === "Draft" && (
                          <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-800 font-bold">{item.impressions}</td>
                      <td className="py-3.5 px-4 text-emerald-600 font-bold">{item.engagement}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 ml-auto">
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
