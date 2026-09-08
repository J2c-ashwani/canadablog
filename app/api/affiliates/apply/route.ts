import { NextResponse, type NextRequest } from 'next/server';
import { AFFILIATE_TERMS_VERSION } from '@/lib/affiliates/config';
import { createAffiliateApplication } from '@/lib/affiliates/store';
import { validateEmail } from '@/lib/email-validator';
import { escapeHtml, sendEmail } from '@/lib/emails/mailer';
import { applyRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const AUDIENCE_TYPES = new Set(['newsletter', 'community', 'website', 'social', 'professional-network', 'other']);
const AUDIENCE_SIZES = new Set(['under-500', '500-2499', '2500-9999', '10000-plus']);
const COUNTRIES = new Set(['Canada', 'United States', 'Other']);

function cleanString(value: unknown, maxLength: number) {
  return String(value || '').trim().slice(0, maxLength);
}

function cleanOptionalHttpsUrl(value: unknown) {
  const raw = cleanString(value, 500);
  if (!raw) return '';
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:' || !url.hostname.includes('.')) return null;
    url.hash = '';
    return url.toString();
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') || '0');
  if (contentLength > 20_000) return NextResponse.json({ error: 'Application payload is too large.' }, { status: 413 });

  const limit = await applyRateLimit(request, 3, 24 * 60 * 60 * 1000);
  if (limit.isLimited) return limit.response;

  try {
    const body = await request.json();
    if (cleanString(body?.website_hp, 200)) {
      return NextResponse.json({ error: 'Application could not be accepted.' }, { status: 400 });
    }

    const name = cleanString(body?.name, 100);
    const email = cleanString(body?.email, 254).toLowerCase();
    const payoutEmail = cleanString(body?.payoutEmail, 254).toLowerCase();
    const company = cleanString(body?.company, 120);
    const website = cleanOptionalHttpsUrl(body?.website);
    const country = cleanString(body?.country, 40);
    const audienceType = cleanString(body?.audienceType, 40);
    const audienceSize = cleanString(body?.audienceSize, 40);
    const promotionPlan = cleanString(body?.promotionPlan, 1500);

    if (!name || !email || !payoutEmail || !country || !audienceType || !audienceSize || !promotionPlan) {
      return NextResponse.json({ error: 'Complete every required field.' }, { status: 400 });
    }
    const contactCheck = validateEmail(email);
    const payoutCheck = validateEmail(payoutEmail);
    if (!contactCheck.isValid) return NextResponse.json({ error: contactCheck.error || 'Enter a valid contact email.' }, { status: 400 });
    if (!payoutCheck.isValid) return NextResponse.json({ error: payoutCheck.error || 'Enter a valid PayPal payout email.' }, { status: 400 });
    if (website === null) return NextResponse.json({ error: 'Website or profile must be a valid HTTPS URL.' }, { status: 400 });
    if (!COUNTRIES.has(country) || !AUDIENCE_TYPES.has(audienceType) || !AUDIENCE_SIZES.has(audienceSize)) {
      return NextResponse.json({ error: 'Select valid audience and country options.' }, { status: 400 });
    }
    if (promotionPlan.length < 30) {
      return NextResponse.json({ error: 'Please describe your promotion plan in at least 30 characters.' }, { status: 400 });
    }
    if (body?.acceptedTerms !== true) {
      return NextResponse.json({ error: 'You must accept the affiliate program terms.' }, { status: 400 });
    }

    const { partner, portalToken } = await createAffiliateApplication({
      name,
      email,
      payoutEmail,
      company,
      website,
      country,
      audienceType,
      audienceSize,
      promotionPlan,
      termsVersion: AFFILIATE_TERMS_VERSION,
      termsAcceptedAt: new Date().toISOString(),
    });

    const statusPath = `/affiliates/status?token=${encodeURIComponent(portalToken)}`;
    const siteOrigin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca').replace(/\/$/, '');
    const statusUrl = `${siteOrigin}${statusPath}`;
    const safeName = escapeHtml(name.split(/\s+/)[0] || 'Partner');
    const safeStatusUrl = escapeHtml(statusUrl);
    const emailResult = await sendEmail({
      to: email,
      subject: 'Your FSI Digital affiliate application',
      tagType: 'affiliate-application-receipt',
      companyName: company,
      html: `<p>Hi ${safeName},</p><p>We received your FSI Digital affiliate application. It is pending manual review; applying does not guarantee approval.</p><p><a href="${safeStatusUrl}">Open your private application status page</a></p><p>Keep this link private. If approved, your tracked referral links will appear there.</p><p>FSI Digital is a private business and is not affiliated with any government agency. Funding eligibility, approval, and outcomes are not guaranteed.</p>`,
      text: `Hi ${name.split(/\s+/)[0] || 'Partner'},\n\nWe received your FSI Digital affiliate application. It is pending manual review; applying does not guarantee approval.\n\nPrivate status page: ${statusUrl}\n\nKeep this link private. If approved, your tracked referral links will appear there.\n\nFSI Digital is a private business and is not affiliated with any government agency. Funding eligibility, approval, and outcomes are not guaranteed.`,
    }).catch((error): { success: boolean; providerMessageId?: string } => {
      console.error('[Affiliate application] Acknowledgement email failed:', error);
      return { success: false, providerMessageId: undefined };
    });
    const adminEmail = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';
    await sendEmail({
      to: adminEmail,
      subject: `Affiliate application awaiting review — ${company || name}`,
      tagType: 'affiliate-application-admin',
      html: `<p>A new affiliate application is awaiting manual review.</p><p><strong>Applicant:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p><p><strong>Audience:</strong> ${escapeHtml(audienceType)} · ${escapeHtml(audienceSize)} · ${escapeHtml(country)}</p><p><strong>Promotion plan:</strong><br>${escapeHtml(promotionPlan).replace(/\n/g, '<br>')}</p><p><a href="${siteOrigin}/admin/affiliates">Open Affiliate Operations</a></p>`,
      text: `Affiliate application awaiting review\n\nApplicant: ${name} (${email})\nAudience: ${audienceType} · ${audienceSize} · ${country}\nPromotion plan: ${promotionPlan}\n\nOpen: ${siteOrigin}/admin/affiliates`,
    }).catch((error) => console.error('[Affiliate application] Admin notification failed:', error));

    return NextResponse.json({
      success: true,
      partnerId: partner.partnerId,
      status: 'pending',
      statusUrl: statusPath,
      emailAccepted: Boolean(emailResult.success && emailResult.providerMessageId),
    }, { status: 201 });
  } catch (error: any) {
    console.error('[Affiliate application] Failed:', error);
    const duplicate = String(error?.code || '').toLowerCase().includes('duplicate') || String(error?.message || '').toLowerCase().includes('already');
    return NextResponse.json({
      error: duplicate ? 'An affiliate application already exists for this email.' : 'Your application could not be saved. Please try again later.',
    }, { status: duplicate ? 409 : 500 });
  }
}
