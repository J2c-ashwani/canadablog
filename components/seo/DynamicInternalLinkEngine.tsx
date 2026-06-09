"use client"

import Link from "next/link"
import { MapPin, Briefcase, Database, Globe } from "lucide-react"

interface DynamicInternalLinkEngineProps {
  region: string
  country: "Canada" | "USA"
  fundingType: string
  description: string
}

export function DynamicInternalLinkEngine({ region, country, fundingType, description }: DynamicInternalLinkEngineProps) {
  // 1. Map locations to cohort slugs
  const locationSlugs: Record<string, string> = {
    "Ontario": "ontario",
    "British Columbia": "british-columbia",
    "Alberta": "alberta",
    "Quebec": "quebec",
    "California": "california",
    "Texas": "texas",
    "New York": "new-york",
    "Florida": "florida",
    "Illinois": "illinois",
    "Ohio": "ohio"
  }

  const locationSlug = locationSlugs[region]
  const isUSState = country === "USA" && region !== "Federal"

  // 2. Extract matching industries from description and name
  const textToScan = `${fundingType} ${description}`.toLowerCase()
  const industries: { slug: string; name: string }[] = []

  if (textToScan.includes("software") || textToScan.includes("saas") || textToScan.includes("digital")) {
    industries.push({ slug: "saas-companies", name: "SaaS & Software" })
  }
  if (textToScan.includes("ai") || textToScan.includes("artificial") || textToScan.includes("intelligence")) {
    industries.push({ slug: "ai-startups", name: "Artificial Intelligence" })
  }
  if (textToScan.includes("manufactur") || textToScan.includes("industrial") || textToScan.includes("robot")) {
    industries.push({ slug: "manufacturers", name: "Manufacturing & Robotics" })
  }
  if (textToScan.includes("agri") || textToScan.includes("farm") || textToScan.includes("food")) {
    industries.push({ slug: "agriculture", name: "Agriculture & Agri-Food" })
  }
  if (textToScan.includes("health") || textToScan.includes("med") || textToScan.includes("biotech") || textToScan.includes("clinical")) {
    industries.push({ slug: "healthcare-medtech", name: "Healthcare & Medtech" })
  }
  if (textToScan.includes("clean") || textToScan.includes("green") || textToScan.includes("energy") || textToScan.includes("solar") || textToScan.includes("eco")) {
    industries.push({ slug: "clean-tech", name: "CleanTech & Energy" })
  }
  if (textToScan.includes("nonprofit") || textToScan.includes("charity") || textToScan.includes("association")) {
    industries.push({ slug: "non-profits", name: "Non-Profit Sector" })
  }
  if (textToScan.includes("construct") || textToScan.includes("build") || textToScan.includes("retro")) {
    industries.push({ slug: "construction", name: "Construction & Infrastructure" })
  }

  // Ensure we have at least 1-2 generic industries if no matches
  if (industries.length === 0) {
    industries.push({ slug: "saas-companies", name: "Technology & SaaS" })
  }

  return (
    <div className="mt-8 border-t border-slate-200 pt-8 space-y-4">
      <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
        <Globe className="h-4 w-4 text-emerald-700" />
        Regional Directories & Industry Guides
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Location Cohort Link */}
        {locationSlug && (
          <Link
            href={`/grants/location/${locationSlug}`}
            className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-xs transition-all text-xs font-bold text-slate-700 hover:text-emerald-800"
          >
            <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
            <span>{region} Regional Directory</span>
          </Link>
        )}

        {/* US State Guide Link */}
        {isUSState && (
          <Link
            href={`/usa/${region.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-xs transition-all text-xs font-bold text-slate-700 hover:text-emerald-800"
          >
            <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
            <span>{region} State Funding Guide</span>
          </Link>
        )}

        {/* Industry Cohort Links */}
        {industries.map((ind) => (
          <Link
            key={ind.slug}
            href={`/grants/industry/${ind.slug}`}
            className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-xs transition-all text-xs font-bold text-slate-700 hover:text-emerald-800"
          >
            <Briefcase className="h-4 w-4 text-slate-400 shrink-0" />
            <span>Grants for {ind.name}</span>
          </Link>
        ))}

        {/* Global Database Link */}
        <Link
          href={`/database?country=${country}`}
          className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-xs transition-all text-xs font-bold text-slate-700 hover:text-emerald-800"
        >
          <Database className="h-4 w-4 text-slate-400 shrink-0" />
          <span>Full {country} Funding Index</span>
        </Link>
      </div>
    </div>
  )
}
