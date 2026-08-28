import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from '@/lib/admin/auth';
import { applyRateLimit } from '@/lib/rate-limit';
import { getAllPrograms } from '@/lib/data/programs';
import {
  APPROVED_PRODUCT_COHORT_ID,
  NewsletterEngine,
  type NewsletterCampaignConfig,
} from '@/lib/leads/NewsletterEngine';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 180;

const REQUIRED_CONFIRMATION = 'SEND_APPROVED_20';

export async function POST(request: NextRequest) {
  const limitResult = await applyRateLimit(request, 3, 60 * 1000);
  if (limitResult.isLimited) return limitResult.response;

  const adminSecret = process.env.LEAD_DASHBOARD_SECRET;
  const sessionCookie = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!adminSecret || !isValidAdminSession(sessionCookie, adminSecret)) {
    return NextResponse.json({ success: false, error: 'Unauthorized session.' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({})) as { confirmation?: string };
  if (body.confirmation !== REQUIRED_CONFIRMATION) {
    return NextResponse.json({ success: false, error: 'Explicit cohort confirmation is required.' }, { status: 400 });
  }

  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json({ success: false, error: 'Controlled sender authentication is not configured.' }, { status: 500 });
  }

  try {
    let config = await NewsletterEngine.getCampaignConfig();
    if (config.campaignId !== APPROVED_PRODUCT_COHORT_ID) {
      const activePrograms = getAllPrograms().filter((program) => program.status === 'Open').slice(0, 3);
      if (activePrograms.length === 0) {
        return NextResponse.json({ success: false, error: 'No verified open programs are available for the approved update.' }, { status: 409 });
      }

      config = {
        campaignId: APPROVED_PRODUCT_COHORT_ID,
        campaignType: 'match_update',
        newProgramsCount: activePrograms.length,
        newProgramsList: activePrograms.map((program) => program.name),
        missingFundingAmount: '',
        status: 'running',
        startedAt: new Date().toISOString(),
        sentCount: 0,
      } satisfies NewsletterCampaignConfig;
      await NewsletterEngine.saveCampaignConfig(config);
    }

    if (config.status === 'completed' || config.sentCount >= 20) {
      return NextResponse.json({
        success: true,
        skipped: true,
        campaignId: config.campaignId,
        providerAccepted: config.sentCount,
        reason: 'The approved 20-contact cohort has already completed.',
      });
    }

    const origin = (process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin).replace(/\/$/, '');
    const dispatchResponse = await fetch(
      `${origin}/api/cron/process-newsletter?campaign=${encodeURIComponent(APPROVED_PRODUCT_COHORT_ID)}`,
      {
        method: 'POST',
        headers: { authorization: `Bearer ${cronSecret}` },
        cache: 'no-store',
      }
    );
    const dispatch = await dispatchResponse.json().catch(() => ({ success: false, error: 'Controlled sender returned invalid JSON.' }));
    return NextResponse.json(dispatch, { status: dispatchResponse.status });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Approved cohort dispatch failed.' }, { status: 500 });
  }
}
