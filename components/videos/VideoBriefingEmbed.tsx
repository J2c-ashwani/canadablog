"use client"

import React, { useState } from "react"
import { Play, CheckCircle2, ArrowRight, Sparkles, ExternalLink } from "lucide-react"
import { safeSessionStorage } from "@/lib/storage"
import { usePathname } from "next/navigation"

export interface VideoBriefingProps {
  videoId: string
  title: string
  duration?: string
  topic: string
  keyTakeaways: string[]
  ctaText?: string
  ctaHref?: string
  guideAnchorText?: string
  guideAnchorHref?: string
  className?: string
}

export function VideoBriefingEmbed({
  videoId,
  title,
  duration = "0:58",
  topic,
  keyTakeaways,
  ctaText = "Check Eligibility in 60s →",
  ctaHref = "/calculator",
  guideAnchorText,
  guideAnchorHref,
  className = "",
}: VideoBriefingProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const pathname = usePathname() || ""

  const handlePlay = () => {
    setIsPlaying(true)
    try {
      safeSessionStorage.setItem("fsi_video_touch", topic)
      safeSessionStorage.setItem("fsi_video_touch_id", videoId)

      // Universal internal telemetry
      const email = safeSessionStorage.getItem("fsi_checkout_email") || ""
      fetch("/api/subscriber/track-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          event: "video_briefing_play",
          journeyId: safeSessionStorage.getItem("fsi_journey_id") || "",
          metadata: {
            videoId,
            topic,
            title,
            pathname,
          },
        }),
      }).catch(() => {})

      // Standard Google Analytics 4 event
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("event", "video_briefing_play", {
          video_id: videoId,
          video_title: title,
          video_topic: topic,
          page_location: window.location.href,
        })
      }
    } catch (e) {}
  }

  const handleCtaClick = () => {
    try {
      safeSessionStorage.setItem("fsi_video_cta_clicked", topic)

      const email = safeSessionStorage.getItem("fsi_checkout_email") || ""
      fetch("/api/subscriber/track-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          event: "video_briefing_cta_click",
          journeyId: safeSessionStorage.getItem("fsi_journey_id") || "",
          metadata: {
            videoId,
            topic,
            ctaHref,
            pathname,
          },
        }),
      }).catch(() => {})

      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("event", "video_briefing_cta_click", {
          video_id: videoId,
          video_topic: topic,
          cta_destination: ctaHref,
        })
      }
    } catch (e) {}
  }

  // Build clean UTM tagged link to preserve commercial funnel attribution
  const resolvedCtaHref = ctaHref.includes("?")
    ? `${ctaHref}&utm_source=in_article_video&utm_medium=video_embed&utm_campaign=${encodeURIComponent(topic.toLowerCase().replace(/[^a-z0-9]/g, "_"))}`
    : `${ctaHref}?utm_source=in_article_video&utm_medium=video_embed&utm_campaign=${encodeURIComponent(topic.toLowerCase().replace(/[^a-z0-9]/g, "_"))}`

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

  return (
    <section
      aria-label={`Video Briefing: ${title}`}
      className={`my-8 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white shadow-xl overflow-hidden ${className}`}
    >
      <div className="p-5 sm:p-7 grid md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Lightweight Click-to-Play Video Player Facade */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0 rounded-xl"
              />
            ) : (
              <button
                type="button"
                onClick={handlePlay}
                aria-label={`Play video: ${title}`}
                className="group relative w-full h-full block text-left cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-400 rounded-xl overflow-hidden"
              >
                {/* Fallback image with zero layout shift */}
                <img
                  src={thumbnailUrl}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 opacity-90"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  <Sparkles className="w-3 h-3" />
                  <span>60s Video Briefing</span>
                </div>

                {/* Duration Pill */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono font-semibold text-slate-200">
                  {duration}
                </div>

                {/* Centered Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-200 border-2 border-white/20">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Bottom Caption Pill */}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-xs font-semibold text-slate-200 line-clamp-2 leading-snug">
                    {title}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <span>Tap to play on YouTube Shorts</span>
                  </p>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Executive Takeaways & Conversion Funnel */}
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Executive Video Summary</span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
            {title}
          </h3>

          <div className="space-y-2.5 pt-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Key Requirements &amp; Eligibility Highlights:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Pathways: 1 Direct Next Step + Optional Guide Link */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={resolvedCtaHref}
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all text-center"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {guideAnchorText && guideAnchorHref && (
              <a
                href={guideAnchorHref}
                className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-2 text-center"
              >
                <span>{guideAnchorText}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <p className="text-[11px] text-slate-500 pt-1">
            💡 Verified non-dilutive criteria. Self-serve evaluation with zero sales call required.
          </p>
        </div>
      </div>
    </section>
  )
}
