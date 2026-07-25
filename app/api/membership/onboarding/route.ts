import { NextResponse } from 'next/server';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { sendEmail } from '@/lib/emails/mailer';
import { buildMembershipBriefingHtml } from '@/lib/emails/membership-briefing';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, name, companyName, province, industry, stage, revenueBand, employees, preference, growthObjective, subscriptionId } = data;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Update subscriber record in DB
    const activityData = {
      onboardedAt: new Date().toISOString(),
      companyName,
      province,
      industry,
      stage,
      revenueBand,
      employees,
      preference,
      growthObjective,
      subscriptionId,
    };

    let subscriber = await SubscriberRepository.getSubscriberByEmail(cleanEmail);
    if (!subscriber) {
      await SubscriberRepository.saveSubscriber({
        email: cleanEmail,
        name,
        companyName,
        country: province === 'USA' ? 'USA' : 'Canada',
        region: province || 'ON',
        industry: industry || 'Software',
        companySize: '1-9',
        fundingInterests: ['Grants'],
        subscriptionStatus: 'ACTIVE',
        subscriptionId,
        leadActivity: JSON.stringify(activityData),
      });
    } else {
      await SubscriberRepository.updateSubscriberPreferences(cleanEmail, {
        name,
        companyName,
        region: province || subscriber.region,
        industry: industry || subscriber.industry,
        subscriptionStatus: 'ACTIVE',
        subscriptionId,
        leadActivity: JSON.stringify(activityData),
      });
    }

    // Build and dispatch instant First Briefing email
    const html = buildMembershipBriefingHtml({
      email: cleanEmail,
      name,
      companyName,
      province,
      industry,
      stage,
      revenueBand,
      employees,
      preference,
      growthObjective,
    });

    await sendEmail({
      to: cleanEmail,
      subject: `Founding Member Briefing #1 — Active Funding Matches for ${province || 'Your Business'}`,
      html,
      text: `Founding Member Briefing #1 for ${cleanEmail}. Log in to view matches: https://www.fsidigital.ca/membership/dashboard?email=${encodeURIComponent(cleanEmail)}`,
      tagType: 'membership-briefing',
      forceResend: true,
    });

    console.log(`✅ Onboarding completed & Briefing #1 sent to ${cleanEmail}`);

    return NextResponse.json({ success: true, email: cleanEmail });
  } catch (error: any) {
    console.error('❌ Failed onboarding submission:', error);
    return NextResponse.json({ error: error.message || 'Onboarding failed' }, { status: 500 });
  }
}
