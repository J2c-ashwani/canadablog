import { NextRequest, NextResponse } from 'next/server';
import { getPublishingOrder, savePublishingOrder } from '@/lib/advertising/store';
import { verifyOrderAccessToken } from '@/lib/advertising/config';
import { sendPublishingRevisionRequestAlert } from '@/lib/advertising/emails';
import { sendEmail, escapeHtml } from '@/lib/emails/mailer';

export const runtime = 'nodejs';

const ADMIN_EMAIL = process.env.RESEND_REPLY_TO_EMAIL || 'ashwani@fsidigital.ca';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, token, action, revisionNotes } = body;

    if (!orderId || !token || !action) {
      return NextResponse.json({ error: 'Order ID, token, and action are required.' }, { status: 400 });
    }

    const order = await getPublishingOrder(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    }

    if (!verifyOrderAccessToken(order.orderId, order.buyerEmail, token)) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    if (action === 'approve') {
      order.status = 'approved';
      order.approvedAt = new Date().toISOString();
      order.updatedAt = new Date().toISOString();
      await savePublishingOrder(order);

      // Alert editorial team to perform final human review and link qualification before publishing
      await sendEmail({
        to: ADMIN_EMAIL,
        subject: `📋 [Editorial Release Queue] ${order.companyName} — Final Editorial Sign-Off Required Before Publishing`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 8px;">
            <h2 style="color: #15803d; margin-top: 0;">📋 Customer Approved — Ready for Final Editorial Review</h2>
            <p style="font-size: 14px; color: #166534;">
              Client <strong>${escapeHtml(order.companyName)}</strong> (${escapeHtml(order.buyerName)}) has reviewed and approved their draft.
            </p>
            <div style="background: #ffffff; border: 1px solid #bbf7d0; border-radius: 6px; padding: 14px; margin: 16px 0; font-size: 13px;">
              <p style="margin: 4px 0;"><strong>Order ID:</strong> <code>${escapeHtml(order.orderId)}</code></p>
              <p style="margin: 4px 0;"><strong>Draft Title:</strong> ${escapeHtml(order.draftTitle || 'N/A')}</p>
              <p style="margin: 4px 0;"><strong>Approved At:</strong> ${order.approvedAt}</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px; font-size: 13px; color: #334155;">
              <h4 style="margin: 0 0 8px 0; color: #0f172a; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px;">Mandatory Editorial Checklist Prior to Live Publication:</h4>
              <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
                <li>Verify canonical URL is strictly set to <code>https://www.fsidigital.ca/blog/[slug]</code> (with www).</li>
                <li>Verify all outbound links are strictly qualified with <code>rel="sponsored"</code> or <code>rel="nofollow"</code> (NO dofollow links).</li>
                <li>Verify destination URLs are legitimate, secure HTTPS, and comply with anti-malware standards.</li>
                <li>Verify header disclosure badge ("Sponsored Article" or "Paid Partnership") is prominent.</li>
                <li>Verify content does not contain prohibited categories (gambling, payday loans, fraudulent finance, unverified health claims).</li>
                <li>Stage article in CMS under <code>https://www.fsidigital.ca/blog/[slug]</code> and update order record with live URL once confirmed.</li>
              </ul>
            </div>
          </div>
        `,
        text: `Customer ${order.companyName} approved their draft (Order: ${order.orderId}). It is now in the Editorial Release Queue for final link qualification and staff authorization prior to publication.`,
        tagType: 'advertising-editorial-release-queue',
        companyName: order.companyName,
      });

      return NextResponse.json({
        success: true,
        status: 'approved',
        message: 'Draft approved by client and moved to the Editorial Release Queue. An FSI Digital editor will perform final link and destination qualification checks before authorizing live publication.',
      });
    }

    if (action === 'request_revision') {
      if (!revisionNotes || !revisionNotes.trim()) {
        return NextResponse.json({ error: 'Please provide revision notes or requested changes.' }, { status: 400 });
      }

      order.status = 'revision_requested';
      order.revisionNotes = revisionNotes.trim();
      order.revisionRequestedAt = new Date().toISOString();
      order.updatedAt = new Date().toISOString();
      await savePublishingOrder(order);

      // Alert team
      await sendPublishingRevisionRequestAlert(order, revisionNotes.trim());

      return NextResponse.json({
        success: true,
        status: 'revision_requested',
        message: 'Revision notes received. Our editorial team will update your draft within 1–2 business days.',
      });
    }

    return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
  } catch (error) {
    console.error('Failed to submit draft review:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
