import { type NextRequest, NextResponse } from 'next/server'
import { isValidCronRequest } from '@/lib/admin/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized social revenue sprint.' }, { status: 401 })
  }

  // Exact-minute zero-delay bridge: when cron-job.org hits this endpoint and GITHUB_WORKFLOW_TOKEN is set,
  // immediately dispatch the GitHub Actions Infinite Daily 2D Video Factory (0 Vercel bandwidth, 15-min timeout).
  const ghToken = process.env.GITHUB_WORKFLOW_TOKEN?.trim()
  if (ghToken) {
    const repo = process.env.GITHUB_WORKFLOW_REPO?.trim() || 'J2c-ashwani/canadablog'
    const workflowFile = 'daily-social-dispatch.yml'
    const dispatchRes = await fetch(
      `https://api.github.com/repos/${repo}/actions/workflows/${workflowFile}/dispatches`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ghToken}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({ ref: 'main' }),
      }
    )
    if (dispatchRes.ok) {
      return NextResponse.json({
        success: true,
        mode: 'github-actions-infinite-video-factory',
        workflow: workflowFile,
        dispatchedAt: new Date().toISOString(),
      })
    }
    const errText = await dispatchRes.text().catch(() => '')
    return NextResponse.json(
      { success: false, error: `GitHub workflow dispatch failed (${dispatchRes.status}): ${errText.slice(0, 200)}` },
      { status: 502 }
    )
  }

  // If GITHUB_WORKFLOW_TOKEN is not configured on Vercel, do not attempt to run serverless video
  // dispatches that lack local MP4 files and FFmpeg, which would fail and create an unwanted Redis lock.
  // The infinite video factory runs safely on GitHub Actions (scheduled daily).
  return NextResponse.json({
    success: true,
    mode: 'github-actions-scheduled',
    message: 'Zero-upload 2D Video Factory runs via GitHub Actions scheduled workflow. To enable exact-minute cron-job.org dispatch from Vercel, set GITHUB_WORKFLOW_TOKEN in Vercel environment variables.',
    dispatchedAt: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  return GET(request)
}
