import { type NextRequest, NextResponse } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get("email")
    const token = searchParams.get("token")

    if (!email && !token) {
      return NextResponse.json({ error: "Email or Token is required" }, { status: 400 })
    }

    let profile = null

    if (email) {
      profile = await SubscriberRepository.getSubscriberByEmail(email)
    } else if (token) {
      const subscribers = await SubscriberRepository.getAllSubscribers()
      profile = subscribers.find(s => s.unsubscribeToken === token) || null
    }

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    console.error("Profile GET API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
