import { type NextRequest, NextResponse } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"
import { isUnsubscribeToken } from '@/lib/auth/subscriber-tokens'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, token } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const subscriber = await SubscriberRepository.getSubscriberByEmail(email)
    if (!subscriber) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 })
    }

    if (!isUnsubscribeToken(token, subscriber.unsubscribeToken)) {
      return NextResponse.json({ error: "Invalid or missing verification token. Proof of ownership is required to unsubscribe." }, { status: 401 })
    }

    const res = await SubscriberRepository.unsubscribe(token)

    if (!res.success) {
      return NextResponse.json({ error: res.error || "Failed to unsubscribe" }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: "Successfully unsubscribed!" })
  } catch (error) {
    console.error("Manual unsubscribe API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
