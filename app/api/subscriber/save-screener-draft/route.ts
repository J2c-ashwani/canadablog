import { NextResponse, type NextRequest } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { getAllPrograms } from "@/lib/data/programs"
import { MatchScoreEngine } from "@/lib/leads/MatchScoreEngine"
import { PortfolioScoreEngine } from "@/lib/leads/PortfolioScoreEngine"
import crypto from "crypto"

export const runtime = "nodejs"

function calculateLeadTier(profile: {
  country?: string
  region?: string
  companySize?: string
  industry?: string
}): "Tier A" | "Tier B" | "Tier C" {
  const country = profile.country || "Canada"
  const region = profile.region || "ON"
  const companySize = profile.companySize || "1-9"
  const industry = profile.industry || "technology"

  const allPrograms = getAllPrograms()
  const eligibleSlugs: string[] = []

  allPrograms.forEach(prog => {
    const matchRes = MatchScoreEngine.calculateMatch(prog, {
      country: country as any,
      region: region,
      companySize: companySize as any,
      industry: industry,
      fundingInterests: []
    })
    if (matchRes.status === "Eligible") {
      eligibleSlugs.push(prog.slug)
    }
  })

  // Take top 5 slugs (matching default behavior in client)
  const defaultCheckedSlugs = eligibleSlugs.slice(0, 5)
  const range = PortfolioScoreEngine.calculateStackingRange(defaultCheckedSlugs, allPrograms)
  
  if (range.max >= 250000) {
    return "Tier A"
  } else if (range.max >= 100000) {
    return "Tier B"
  } else {
    return "Tier C"
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, step, pagePath, firstTouchAt, data } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 })
    }

    const existing = await SubscriberRepository.getSubscriberByEmail(email)

    if (step === 1) {
      if (existing) {
        const updates: any = {}
        if (name) updates.name = name
        if (pagePath) updates.pagePath = pagePath
        if (data) {
          if (data.country) updates.country = data.country
          if (data.region) updates.region = data.region
          if (data.companySize) updates.companySize = data.companySize
          if (data.industry) updates.industry = data.industry
        }

        // Backup attribution to leadActivity JSON
        let activity: any = {}
        try {
          if (existing.leadActivity && existing.leadActivity !== "N/A" && existing.leadActivity !== "{}") {
            activity = JSON.parse(existing.leadActivity)
          }
        } catch (e) {}
        if (!activity.firstTouchPage) activity.firstTouchPage = pagePath || "/portfolio"
        if (!activity.firstTouchAt) activity.firstTouchAt = firstTouchAt || new Date().toISOString()
        updates.leadActivity = JSON.stringify(activity)

        await SubscriberRepository.updateSubscriberPreferences(email, updates)
        return NextResponse.json({ success: true, isNew: false })
      } else {
        const country = (data?.country === "USA" || data?.country === "US") ? "USA" : "Canada"
        const region = data?.region || "ON"
        const companySize = data?.companySize || "1-9"
        const industry = data?.industry || "technology"
        
        const res = await SubscriberRepository.saveSubscriber({
          email,
          name: name || "",
          country,
          region,
          industry,
          companySize,
          fundingInterests: data?.fundingInterests || [],
          website: data?.website || "",
          companyName: data?.companyName || ""
        })

        if (res.success) {
          // Calculate initial tier and update source to show draft state
          const tier = calculateLeadTier({ country, region, companySize, industry })
          const leadActivityObj = {
            firstTouchPage: pagePath || "/portfolio",
            firstTouchAt: firstTouchAt || new Date().toISOString()
          }

          await SubscriberRepository.updateSubscriberPreferences(email, {
            source: "Screener Dropoff Draft",
            leadTier: tier,
            pagePath: pagePath || "/portfolio",
            leadActivity: JSON.stringify(leadActivityObj)
          })
          return NextResponse.json({ success: true, isNew: true })
        } else {
          return NextResponse.json({ error: res.error || "Failed to create draft." }, { status: 500 })
        }
      }
    } else if (step === 3) {
      if (!existing) {
        return NextResponse.json({ error: "Draft not found." }, { status: 404 })
      }
      
      const updates: any = {}
      if (pagePath) updates.pagePath = pagePath
      if (data) {
        if (data.country) updates.country = data.country
        if (data.region) updates.region = data.region
        if (data.companySize) updates.companySize = data.companySize
        if (data.industry) updates.industry = data.industry
        if (data.fundingInterests) updates.fundingInterests = data.fundingInterests
        if (data.website) updates.website = data.website
        if (data.companyName) updates.companyName = data.companyName

        // Re-calculate tier on step 3 completion
        const tier = calculateLeadTier({
          country: data.country || existing.country,
          region: data.region || existing.region,
          companySize: data.companySize || existing.companySize,
          industry: data.industry || existing.industry
        })
        updates.leadTier = tier
      }

      // Backup attribution to leadActivity JSON
      let activity: any = {}
      try {
        if (existing.leadActivity && existing.leadActivity !== "N/A" && existing.leadActivity !== "{}") {
          activity = JSON.parse(existing.leadActivity)
        }
      } catch (e) {}
      if (!activity.firstTouchPage) activity.firstTouchPage = pagePath || "/portfolio"
      if (!activity.firstTouchAt) activity.firstTouchAt = firstTouchAt || new Date().toISOString()
      updates.leadActivity = JSON.stringify(activity)
      
      await SubscriberRepository.updateSubscriberPreferences(email, updates)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid step." }, { status: 400 })
  } catch (err: any) {
    console.error("Error in save-screener-draft API:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
