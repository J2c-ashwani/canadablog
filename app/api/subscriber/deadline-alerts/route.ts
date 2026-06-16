import { NextRequest, NextResponse } from 'next/server';
import { appendAlertLeadToSheet } from '@/lib/google-sheets';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { sendAlertWelcomeEmail } from '@/lib/emails/alert-nurture';

export async function POST(request: NextRequest) {
  try {
    const { email, province, industry, source } = await request.json();

    if (!email || !province || !industry) {
      return NextResponse.json(
        { error: 'Missing required fields: email, province, industry' },
        { status: 400 }
      );
    }

    // 1. Record subscription in "Alerts Leads" tab
    const sheetResult = await appendAlertLeadToSheet({
      email,
      province,
      industry,
      source: source || 'alerts-widget'
    });

    if (!sheetResult.success) {
      console.warn('⚠️ Sheets logging for alerts tab failed, but proceeding to CRM sync...');
    }

    // 2. Sync / Upsert to Main CRM Leads Sheet
    let loginToken = '';
    try {
      const existing = await SubscriberRepository.getSubscriberByEmail(email);
      let activity: any = {};

      if (existing) {
        loginToken = existing.loginToken || '';
        try {
          if (existing.leadActivity && existing.leadActivity !== 'N/A' && existing.leadActivity !== '{}') {
            activity = JSON.parse(existing.leadActivity);
          }
        } catch (e) {
          // ignore
        }

        activity.alertSubscribed = true;
        activity.alertSource = source || 'alerts-widget';
        activity.alertProvince = province;
        activity.alertIndustry = industry;
        activity.alertDate = new Date().toISOString();
        activity.alertNurtureStage = 'welcome';
        activity.alertNurtureSentAt = new Date().toISOString();

        await SubscriberRepository.updateSubscriberPreferences(email, {
          region: existing.region || province,
          industry: existing.industry || industry,
          leadActivity: JSON.stringify(activity)
        });
        console.log(`✅ CRM lead synced for existing subscriber: ${email}`);
      } else {
        activity.alertSubscribed = true;
        activity.alertSource = source || 'alerts-widget';
        activity.alertProvince = province;
        activity.alertIndustry = industry;
        activity.alertDate = new Date().toISOString();
        activity.alertNurtureStage = 'welcome';
        activity.alertNurtureSentAt = new Date().toISOString();

        const saveRes = await SubscriberRepository.saveSubscriber({
          email,
          name: 'Founder',
          country: 'Canada', // default fallback
          region: province,
          industry: industry,
          companySize: '1-9',
          fundingInterests: ['Grants'],
          website: '',
          companyName: '',
          source: 'alerts-widget',
          leadActivity: JSON.stringify(activity)
        });

        if (saveRes.success) {
          // Fetch token created during save
          const newLead = await SubscriberRepository.getSubscriberByEmail(email);
          loginToken = newLead?.loginToken || '';
          console.log(`✅ CRM lead created and synced for new subscriber: ${email}`);
        }
      }
    } catch (crmErr) {
      console.error('⚠️ CRM Leads sync error:', crmErr);
    }

    // 3. Send Day 1: Welcome Email immediately
    try {
      await sendAlertWelcomeEmail({
        to: email,
        name: 'Founder',
        loginToken: loginToken || '',
        province,
        industry
      });
      console.log(`✉️ Day 1 Welcome email dispatched immediately to: ${email}`);
    } catch (emailErr) {
      console.error('⚠️ Failed to send immediate Welcome email:', emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('❌ Deadline alerts error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
