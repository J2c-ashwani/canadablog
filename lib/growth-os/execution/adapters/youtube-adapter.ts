/**
 * Growth OS — Native Vercel YouTube Shorts Uploader
 * Uploads rendered MP4 videos directly to YouTube Shorts via YouTube Data API v3 without needing n8n or Docker.
 */

export interface YouTubeUploadResult {
  success: boolean
  videoId?: string
  videoUrl?: string
  error?: string
}

export class NativeYouTubeAdapter {
  /**
   * Exchange Google Refresh Token for Access Token
   */
  private static async getAccessToken(): Promise<string | null> {
    const clientId = process.env.YOUTUBE_CLIENT_ID?.trim()
    const clientSecret = process.env.YOUTUBE_CLIENT_SECRET?.trim()
    const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN?.trim()

    if (!clientId || !clientSecret || !refreshToken) {
      console.warn("[YouTubeAdapter] YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, or YOUTUBE_REFRESH_TOKEN missing.")
      return null
    }

    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }),
      })

      if (!response.ok) {
        const errText = await response.text()
        console.error("[YouTubeAdapter] Failed to refresh Google access token:", errText)
        return null
      }

      const data = await response.json()
      return data.access_token || null
    } catch (err) {
      console.error("[YouTubeAdapter] Error fetching Google access token:", err)
      return null
    }
  }

  /**
   * Upload MP4 Video URL directly to YouTube Shorts via YouTube Data API v3
   */
  public static async uploadShortsFromUrl(
    videoUrl: string,
    title: string,
    description: string
  ): Promise<YouTubeUploadResult> {
    const accessToken = await this.getAccessToken()
    if (!accessToken) {
      return {
        success: false,
        error: "Google OAuth access token unavailable. Set YOUTUBE_REFRESH_TOKEN in Vercel.",
      }
    }

    try {
      console.log(`[YouTubeAdapter] Downloading rendered MP4 video from Shotstack: ${videoUrl}...`)
      const videoRes = await fetch(videoUrl)
      if (!videoRes.ok) {
        throw new Error(`Failed to fetch video binary from ${videoUrl}`)
      }
      const videoBuffer = await videoRes.arrayBuffer()

      console.log(`[YouTubeAdapter] Initiating YouTube Resumable Upload for: '${title}'...`)

      // Step 1: Create Resumable Upload Session
      const metadata = {
        snippet: {
          title: `${title.slice(0, 90)} #Shorts`,
          description: `${description}\n\n#Shorts #Grants #BusinessFunding #FSIDigital`,
          tags: ["Shorts", "Grants", "Business Funding", "Government Grants", "Canada"],
          categoryId: "22", // People & Blogs
        },
        status: {
          privacyStatus: "public",
          selfDeclaredMadeForKids: false,
        },
      }

      const initRes = await fetch(
        "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "X-Upload-Content-Length": videoBuffer.byteLength.toString(),
            "X-Upload-Content-Type": "video/mp4",
          },
          body: JSON.stringify(metadata),
        }
      )

      if (!initRes.ok) {
        const errText = await initRes.text()
        throw new Error(`YouTube init upload error ${initRes.status}: ${errText}`)
      }

      const uploadUrl = initRes.headers.get("location")
      if (!uploadUrl) {
        throw new Error("YouTube API did not return upload location URL.")
      }

      // Step 2: Upload MP4 Binary
      console.log(`[YouTubeAdapter] Uploading ${videoBuffer.byteLength} bytes to YouTube...`)
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "video/mp4",
        },
        body: videoBuffer,
      })

      if (!uploadRes.ok) {
        const errText = await uploadRes.text()
        throw new Error(`YouTube binary upload error ${uploadRes.status}: ${errText}`)
      }

      const uploadData = await uploadRes.json()
      const videoId = uploadData.id
      const youtubeShortUrl = `https://www.youtube.com/shorts/${videoId}`

      console.log(`[YouTubeAdapter] ✅ YouTube Short published successfully: ${youtubeShortUrl}`)

      return {
        success: true,
        videoId,
        videoUrl: youtubeShortUrl,
      }
    } catch (err: any) {
      console.error("[YouTubeAdapter] Error publishing video to YouTube:", err)
      return {
        success: false,
        error: err.message,
      }
    }
  }
}
