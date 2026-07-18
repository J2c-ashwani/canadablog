import { type NextRequest, NextResponse } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { isLoginToken } from '@/lib/auth/subscriber-tokens'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, country, region, industry, companySize, fundingInterests } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const existing = await SubscriberRepository.getSubscriberByEmail(email)
    if (existing) {
      const token = body.token
      if (!isLoginToken(token, existing.loginToken)) {
        return NextResponse.json({ error: "Authentication token is required to update preferences for this email address." }, { status: 401 })
      }
    }

    const res = await SubscriberRepository.saveSubscriber({
      email,
      name,
      country,
      region,
      industry,
      companySize,
      fundingInterests,
    })

    if (!res.success) {
      return NextResponse.json({ error: res.error || "Failed to save preferences" }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: "Preferences saved successfully!" })
  } catch (error) {
    console.error("Preferences POST API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
