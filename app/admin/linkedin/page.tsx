"use client"

import React, { useState } from "react"
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
  ExternalLink,
  Globe2,
  Building2,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"

export default function LinkedInPublisherPage() {
  const [postContent, setPostContent] = useState(
    `🚀 Canadian SMEs can accelerate digital transformation through the Canada Digital Adoption Program.\n\nEligible businesses may receive funding and advisory support to modernise operations and improve competitiveness.\n\nLearn more about eligibility and available funding opportunities.\n\n#CanadaBusiness #GovernmentFunding #DigitalTransformation`
  )

  const [activeStatusMessage, setActiveStatusMessage] = useState<string | null>(null)

  // Live Metrics
  const characterCount = postContent.length
  const hashtagCount = (postContent.match(/#[a-zA-Z0-9_]+/g) || []).length
  const estimatedReadTimeSeconds = Math.max(5, Math.ceil(postContent.split(/\s+/).filter(Boolean).length / 3.5))

  // Handle Actions
  const handleGeneratePost = () => {
    setPostContent(
      `🍁 Urgent Funding Alert for Canadian Business Owners:\n\nThe Canada Digital Adoption Program has officially expanded digital transformation intakes for 2026.\n\nKey Highlights:\n• Up to $150,000 non-repayable tech funding\n• Comprehensive digital roadmap advisory support\n• Applicable for software, automation & infrastructure\n\nVerify your business eligibility and stacking options today.\n\n#CanadaBusiness #DigitalTransformation #GovernmentFunding #SMEGrowth`
    )
    showNotification("✨ Generated fresh educational LinkedIn post!")
  }

  const handlePublish = () => {
    showNotification("🚀 Successfully published post to FSI Digital LinkedIn Organization Page!")
  }

  const handleSchedule = () => {
    showNotification("📅 Post scheduled for publication on LinkedIn Organization Page.")
  }

  const handleSaveDraft = () => {
    showNotification("💾 Draft saved to FSI Digital content library.")
  }

  const showNotification = (msg: string) => {
    setActiveStatusMessage(msg)
    setTimeout(() => setActiveStatusMessage(null), 4000)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans antialiased">
      {/* --------------------------------------------------- */}
      {/* SIDEBAR                                             */}
      {/* --------------------------------------------------- */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          {/* Company Brand Logo Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              F
            </div>
            <div>
              <h2 className="font-bold text-slate-900 leading-tight">FSI Digital</h2>
              <p className="text-xs text-slate-500 font-medium">Enterprise Admin OS</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              Dashboard
            </Link>

            <Link
              href="/admin/exceptions"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              Content & Exceptions
            </Link>

            {/* Active Highlighted Sidebar Item */}
            <Link
              href="/admin/linkedin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-100 transition-colors shadow-sm"
            >
              <Linkedin className="w-4 h-4 text-blue-600" />
              LinkedIn Publisher
            </Link>

            <Link
              href="/admin/seo-opportunities"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <Send className="w-4 h-4 text-slate-400" />
              Campaigns
            </Link>

            <Link
              href="/admin/leads"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <BarChart3 className="w-4 h-4 text-slate-400" />
              Analytics
            </Link>

            <Link
              href="/admin/alerts"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              Settings
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer */}
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

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 overflow-y-auto">
        {/* Status Toast Banner */}
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
          {/* --------------------------------------------------- */}
          {/* PAGE HEADER                                         */}
          {/* --------------------------------------------------- */}
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

            {/* Top Right Status Badge */}
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

          {/* --------------------------------------------------- */}
          {/* 3-COLUMN LAYOUT                                     */}
          {/* --------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: Funding Opportunity (3 cols) */}
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

              {/* Verified Quality Guardrail Note */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Educational Compliance
                </div>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  Posts are generated strictly from verified government source directives (.gc.ca). Non-promotional, educational tone enforced.
                </p>
              </div>
            </div>

            {/* CENTER COLUMN: Generated LinkedIn Post (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-700" /> Generated LinkedIn Post
                  </h2>
                  <span className="text-[11px] text-slate-400 font-medium">Editable Area</span>
                </div>

                {/* Textarea Input */}
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  rows={10}
                  className="w-full p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-800 leading-relaxed font-normal resize-none focus:outline-none transition-all"
                  placeholder="Compose your educational post here..."
                ></textarea>

                {/* Below Textarea Live Metrics */}
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

                {/* Action Buttons */}
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

            {/* RIGHT COLUMN: Post Preview (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-600" /> Post Preview
                  </h2>
                  <span className="text-[10px] text-slate-400 font-medium">Live Render</span>
                </div>

                {/* Realistic LinkedIn Feed Card */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs space-y-3">
                  {/* LinkedIn Header: Logo + Title */}
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

                  {/* Post Content Live Sync */}
                  <div className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {postContent}
                  </div>

                  {/* Company Banner Graphic Placeholder */}
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

                  {/* Engagement Bar */}
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

                {/* Final Action Buttons */}
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

          {/* --------------------------------------------------- */}
          {/* BOTTOM SECTION: Recent Publications                 */}
          {/* --------------------------------------------------- */}
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

            {/* Table */}
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
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-slate-500">July 24, 2026</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Digital Adoption Program</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Published
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-bold">1,245 impressions</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-bold">8.4% engagement</td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 ml-auto">
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-slate-500">July 26, 2026</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">AgriFood Funding Intake</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                        <Clock className="w-3 h-3 text-amber-600" /> Scheduled
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">—</td>
                    <td className="py-3.5 px-4 text-slate-400">—</td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1 ml-auto">
                        Edit
                      </button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-slate-500">July 25, 2026</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">AI Commercialization Round</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                        Draft
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">—</td>
                    <td className="py-3.5 px-4 text-slate-400">—</td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1 ml-auto">
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
