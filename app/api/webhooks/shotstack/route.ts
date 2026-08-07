import { type NextRequest, NextResponse } from "next/server"
import { NativeYouTubeAdapter } from "@/lib/growth-os/execution/adapters/youtube-adapter"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Shotstack Cloud Video Render Completion Webhook
 * When Shotstack finishes rendering the 9:16 MP4 video, it calls this endpoint on Vercel.
 * Vercel then automatically uploads the video to YouTube Shorts without needing n8n or Docker!
 */
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    console.log("[ShotstackWebhook] Render callback received from Shotstack:", payload)

    const status = payload.status || payload.response?.status
    const videoUrl = payload.url || payload.response?.url

    if (status !== "done" || !videoUrl) {
      console.log(`[ShotstackWebhook] Render status '${status}' — waiting for completion.`)
      return NextResponse.json({ success: true, message: "Status acknowledged" })
    }

    const title = payload.title || "Government Business Funding Update"
    const description = payload.description || "Check your funding eligibility at fsidigital.ca"

    console.log(`[ShotstackWebhook] Video rendered successfully at ${videoUrl}. Triggering native YouTube upload...`)

    const uploadResult = await NativeYouTubeAdapter.uploadShortsFromUrl(videoUrl, title, description)

    return NextResponse.json({
      success: true,
      message: uploadResult.success
        ? `Video uploaded to YouTube Shorts: ${uploadResult.videoUrl}`
        : `Shotstack rendered, but YouTube upload failed: ${uploadResult.error}`,
      uploadResult,
    })
  } catch (error: any) {
    console.error("[ShotstackWebhook] Error processing Shotstack webhook:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process Shotstack webhook" },
      { status: 500 }
    )
  }
}
