/**
 * Growth OS — Shotstack Cloud Video Rendering Adapter
 * Converts text video scripts into vertical 9:16 MP4 videos for YouTube Shorts & Instagram Reels via Shotstack REST API.
 */

export interface VideoRenderResult {
  success: boolean;
  videoUrl?: string;
  renderId?: string;
  error?: string;
}

export class ShotstackVideoAdapter {
  public static async renderShortVideo(
    hook: string,
    body: string,
    callToAction: string
  ): Promise<VideoRenderResult> {
    const apiKey = process.env.SHOTSTACK_API_KEY?.trim();
    if (!apiKey) {
      console.warn("[ShotstackAdapter] SHOTSTACK_API_KEY missing. Skipping cloud MP4 video render.");
      return {
        success: false,
        error: "SHOTSTACK_API_KEY missing in Vercel environment variables.",
      };
    }

    try {
      console.log(`[ShotstackAdapter] Dispatching cloud MP4 render for hook: '${hook}'...`);

      // Shotstack JSON Edit Payload for Vertical 9:16 YouTube Short (1080x1920)
      const payload = {
        timeline: {
          background: "#0f172a",
          tracks: [
            {
              clips: [
                {
                  asset: {
                    type: "html",
                    html: `<div style="font-family: sans-serif; color: #ffffff; text-align: center; padding: 40px; font-size: 48px; font-weight: bold; line-height: 1.3;">${hook}</div>`,
                    css: "div { display: flex; align-items: center; justify-content: center; height: 100%; }",
                    width: 1080,
                    height: 1920,
                  },
                  start: 0,
                  length: 5,
                  transition: { in: "fade", out: "fade" },
                },
                {
                  asset: {
                    type: "html",
                    html: `<div style="font-family: sans-serif; color: #4ade80; text-align: center; padding: 40px; font-size: 36px; line-height: 1.4;">${body}</div>`,
                    css: "div { display: flex; align-items: center; justify-content: center; height: 100%; }",
                    width: 1080,
                    height: 1920,
                  },
                  start: 5,
                  length: 10,
                  transition: { in: "fade", out: "fade" },
                },
                {
                  asset: {
                    type: "html",
                    html: `<div style="font-family: sans-serif; color: #ffffff; text-align: center; padding: 40px; font-size: 42px; font-weight: bold;"><span style="background: #059669; padding: 20px 40px; border-radius: 12px; display: inline-block;">${callToAction}</span></div>`,
                    css: "div { display: flex; align-items: center; justify-content: center; height: 100%; }",
                    width: 1080,
                    height: 1920,
                  },
                  start: 15,
                  length: 5,
                  transition: { in: "fade", out: "fade" },
                },
              ],
            },
          ],
        },
        output: {
          format: "mp4",
          resolution: "1080",
          aspectRatio: "9:16",
          fps: 30,
        },
        callback: "https://www.fsidigital.ca/api/webhooks/shotstack",
      };

      // Shotstack has separate production (/edit/v1/) and sandbox (/edit/stage/) endpoints.
      // Each requires its own API key. Default to stage (sandbox) which works with free-tier keys.
      const env = process.env.SHOTSTACK_ENV?.trim()?.toLowerCase();
      const baseUrl = (env === 'production' || env === 'v1')
        ? 'https://api.shotstack.io/edit/v1/render'
        : 'https://api.shotstack.io/edit/stage/render';

      console.log(`[ShotstackAdapter] Using endpoint: ${baseUrl}`);

      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error(`[ShotstackAdapter] API Error ${response.status}: ${errText.slice(0, 500)}`);
        throw new Error(`Shotstack API Error ${response.status}: ${errText.slice(0, 200)}`);
      }

      const resData = await response.json();
      const renderId = resData.response?.id;

      return {
        success: true,
        renderId,
        videoUrl: resData.response?.url || `https://api.shotstack.io/edit/v1/render/${renderId}`,
      };
    } catch (err: any) {
      console.error("[ShotstackAdapter] Error rendering video:", err);
      return {
        success: false,
        error: err.message,
      };
    }
  }
}
