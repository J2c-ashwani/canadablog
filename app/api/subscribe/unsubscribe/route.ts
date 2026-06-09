import { type NextRequest, NextResponse } from "next/server"
import { SubscriberRepository } from "@/lib/leads/SubscriberRepository"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    const res = await SubscriberRepository.unsubscribe(token)

    if (!res.success) {
      return NextResponse.json({ error: res.error || "Failed to unsubscribe" }, { status: 400 })
    }

    // Redirect to the frontend unsubscribe page showing confirmation
    return NextResponse.redirect(new URL(`/subscribe/unsubscribe?success=true&token=${token}`, request.url))
  } catch (error) {
    console.error("Unsubscribe API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
