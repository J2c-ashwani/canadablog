import { type NextRequest, NextResponse } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { isLoginToken } from '@/lib/auth/subscriber-tokens'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get("email")
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Token verification is required to fetch profiles." }, { status: 401 })
    }

    let profile = null

    if (email) {
      const found = await SubscriberRepository.getSubscriberByEmail(email)
      if (found) {
        if (isLoginToken(token, found.loginToken)) {
          profile = found
        } else {
          return NextResponse.json({ error: "Unauthorized access token for this email profile." }, { status: 401 })
        }
      }
    } else {
      const subscribers = await SubscriberRepository.getAllSubscribers(true)
      profile = subscribers.find(s => isLoginToken(token, s.loginToken)) || null
    }

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    const {
      loginToken,
      unsubscribeToken,
      reportTransactionId,
      strategyReportTransactionId,
      subscriptionId,
      gaClientId,
      ipAddress,
      userAgent,
      ...sanitizedProfile
    } = profile as any;

    return NextResponse.json({ success: true, profile: sanitizedProfile })
  } catch (error) {
    console.error("Profile GET API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
