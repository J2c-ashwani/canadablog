import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  isValidAdminRequest,
  isValidAdminSession,
} from '@/lib/admin/auth';
import { getOutreachProspectsFromSheet, updateOutreachProspectInSheet } from '@/lib/google-sheets';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function normalizeHost(value: string) {
  return value.trim().toLowerCase().replace(/^www\./, '');
}

function hasSameSitePublicContact(prospect: { website?: string; email?: string; sourceUrl?: string }) {
  if (!EMAIL_PATTERN.test(String(prospect.email || '').trim())) return false;
  try {
    const source = new URL(String(prospect.sourceUrl || ''));
    if (source.protocol !== 'https:') return false;
    const website = normalizeHost(String(prospect.website || ''));
    const sourceHost = normalizeHost(source.hostname);
    const emailHost = normalizeHost(String(prospect.email || '').split('@')[1] || '');
    return Boolean(website)
      && (sourceHost === website || sourceHost.endsWith(`.${website}`))
      && (emailHost === website || emailHost.endsWith(`.${website}`));
  } catch {
    return false;
  }
}

async function isAuthorized(request: NextRequest) {
  if (isValidAdminRequest(request)) return true;
  const secret = process.env.LEAD_DASHBOARD_SECRET;
  const session = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  return Boolean(secret && session && isValidAdminSession(session, secret));
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const prospectId = String(body?.prospectId || '').trim();
    const action = String(body?.action || '').trim();
    if (!prospectId || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'A prospect ID and a valid review decision are required.' }, { status: 400 });
    }

    const prospects = await getOutreachProspectsFromSheet({ strict: true });
    const prospect = prospects.find((item) => item.prospectId === prospectId);
    if (!prospect) return NextResponse.json({ error: 'Prospect not found.' }, { status: 404 });
    if (String(prospect.status || '').trim().toLowerCase() !== 'review_required') {
      return NextResponse.json({ error: 'This prospect is no longer awaiting review.' }, { status: 409 });
    }
    if (prospect.sentAt || prospect.providerMessageId) {
      return NextResponse.json({ error: 'A previously contacted prospect cannot be re-queued.' }, { status: 409 });
    }
    if (!hasSameSitePublicContact(prospect) || String(prospect.personalizedHook || '').trim().length < 30) {
      return NextResponse.json({ error: 'This record lacks the required same-site contact and personalization evidence.' }, { status: 422 });
    }

    const approved = action === 'approve';
    const result = await updateOutreachProspectInSheet(prospect.rowIndex, {
      status: approved ? 'qualified' : 'rejected',
      deliveryStatus: approved ? 'human_approved_source_verified' : 'human_review_rejected',
    });
    if (!result.success) throw result.error || new Error('Prospect review could not be saved.');

    return NextResponse.json({
      success: true,
      prospectId,
      status: approved ? 'qualified' : 'rejected',
      message: approved
        ? 'Queued for the next capped Authority Engine run. No message was sent by this review action.'
        : 'Rejected. This prospect will not be eligible for outreach.',
    });
  } catch (error: any) {
    console.error('[Authority prospect review] Failed:', error);
    return NextResponse.json({ error: error?.message || 'Could not save the review decision.' }, { status: 500 });
  }
}
