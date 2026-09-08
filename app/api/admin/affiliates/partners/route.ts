import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_SESSION_COOKIE, isValidAdminRequest, isValidAdminSession } from '@/lib/admin/auth';
import { getAffiliatePartnerById, reviewAffiliatePartner } from '@/lib/affiliates/store';
import { escapeHtml, sendEmail } from '@/lib/emails/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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
    const partnerId = String(body?.partnerId || '').trim();
    const action = String(body?.action || '').trim();
    if (!partnerId || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'A partner ID and valid review decision are required.' }, { status: 400 });
    }

    const current = await getAffiliatePartnerById(partnerId);
    if (!current) return NextResponse.json({ error: 'Affiliate partner not found.' }, { status: 404 });
    if (current.status !== 'pending') return NextResponse.json({ error: 'Only a pending application can be reviewed.' }, { status: 409 });

    const partner = await reviewAffiliatePartner({
      partnerId,
      status: action === 'approve' ? 'approved' : 'rejected',
      reviewedBy: 'authenticated-admin',
    });
    const approved = action === 'approve';
    const notification = await sendEmail({
      to: partner.email,
      subject: approved ? 'Your FSI Digital affiliate account is approved' : 'Your FSI Digital affiliate application update',
      tagType: 'affiliate-review-decision',
      html: approved
        ? `<p>Hi ${escapeHtml(partner.name.split(/\s+/)[0] || 'Partner')},</p><p>Your FSI Digital affiliate account is approved. Open the private status link in your original application receipt to access your tracked product links and commission ledger.</p><p>Every promotion must disclose the compensated relationship. FSI Digital is a private business, not a government agency, and funding is never guaranteed.</p>`
        : `<p>Hi ${escapeHtml(partner.name.split(/\s+/)[0] || 'Partner')},</p><p>We are unable to approve your FSI Digital affiliate application at this time. Referral activity is not eligible for commission.</p>`,
      text: approved
        ? `Hi ${partner.name.split(/\s+/)[0] || 'Partner'},\n\nYour FSI Digital affiliate account is approved. Open the private status link in your original application receipt to access tracked links and your commission ledger. Every promotion must disclose the compensated relationship. FSI Digital is private, not a government agency, and funding is never guaranteed.`
        : `Hi ${partner.name.split(/\s+/)[0] || 'Partner'},\n\nWe are unable to approve your FSI Digital affiliate application at this time. Referral activity is not eligible for commission.`,
    }).catch((error): { success: boolean; providerMessageId?: string } => {
      console.error('[Affiliate admin] Decision notification failed:', error);
      return { success: false, providerMessageId: undefined };
    });

    return NextResponse.json({
      success: true,
      partnerId: partner.partnerId,
      status: partner.status,
      notificationAccepted: Boolean(notification.success && notification.providerMessageId),
      message: approved
        ? `Affiliate approved and links activated. ${notification.success && notification.providerMessageId ? 'The decision email was provider-accepted.' : 'The decision was saved, but email acceptance was not verified.'}`
        : `Affiliate rejected. ${notification.success && notification.providerMessageId ? 'The decision email was provider-accepted.' : 'The decision was saved, but email acceptance was not verified.'}`,
    });
  } catch (error: any) {
    console.error('[Affiliate admin] Partner review failed:', error);
    const message = String(error?.message || 'The review decision could not be saved.');
    const status = /not found/i.test(message) ? 404 : /pending|already|status/i.test(message) ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
