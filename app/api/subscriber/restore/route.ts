import { NextRequest, NextResponse } from 'next/server';
import { getLeadsFromSheet } from '@/lib/google-sheets';
import { getPurchasesByEmail } from '@/lib/products/purchase-store';
import { isLoginToken } from '@/lib/auth/subscriber-tokens';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Missing token parameter' }, { status: 400 });
    }

    // Read leads from sheets database
    const leads = await getLeadsFromSheet(2000);

    // Only a v3 login token may restore a session. Unsubscribe credentials and
    // retired deterministic tokens are deliberately never accepted here.
    const lead = leads.find((l) => {
      if (!l.email) return false;
      return isLoginToken(token, l.loginToken);
    });

    if (!lead) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 404 });
    }

    // Check if the user has already purchased any report products
    const emailPurchases = await getPurchasesByEmail(lead.email);
    
    // Sort purchases by created date desc to get the latest one
    // Note: 'funding-roadmap' is the product database ID for the 'Funding Action Plan'
    const sortedPurchases = emailPurchases
      .filter((p) =>
        ['funding-match-report', 'funding-bundle', 'funding-roadmap'].includes(p.productId)
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Record restoration click activity in CRM Leads sheet
    try {
      const { SubscriberRepository } = await import('@/lib/leads/SubscriberRepository');
      let activity: any = {};
      if (lead.leadActivity && lead.leadActivity !== 'N/A' && lead.leadActivity !== '{}') {
        try {
          activity = JSON.parse(lead.leadActivity);
        } catch (e) {}
      }
      if (!activity.linkClicks) activity.linkClicks = [];
      activity.linkClicks.push({
        token,
        clickedAt: new Date().toISOString(),
        restoredType: sortedPurchases.length > 0 ? 'purchased' : 'lead'
      });
      await SubscriberRepository.updateSubscriberPreferences(lead.email, {
        leadActivity: JSON.stringify(activity),
        lastClickedAt: new Date().toISOString()
      });
    } catch (crmErr) {
      console.error('⚠️ Failed to record restoration click in CRM:', crmErr);
    }

    if (sortedPurchases.length > 0) {
      // User has already purchased. Direct them straight to the report using the accessToken.
      return NextResponse.json({
        status: 'purchased',
        token: sortedPurchases[0].accessToken,
        productId: sortedPurchases[0].productId,
      });
    }

    // User is a lead but has not purchased. Return their profile to pre-fill the calculator.
    return NextResponse.json({
      status: 'lead',
      profile: {
        province: lead.state || '',
        industry: lead.industry || '',
        revenue: lead.businessStage || '',
        goal: lead.fundingPurpose || '',
        name: lead.name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        company: lead.companyName || '',
      },
    });
  } catch (error: any) {
    console.error('❌ Error restoring session by token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
