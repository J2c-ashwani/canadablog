import { NextResponse } from 'next/server';
import { verifyPayPalSubscription } from '@/lib/payments/paypal';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { appendLeadToSheet } from '@/lib/google-sheets';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subscriptionId, email, name } = body;

    if (!subscriptionId || !email) {
      return NextResponse.json({ error: 'Missing subscriptionId or email' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Verify subscription status with PayPal API
    const subVerification = await verifyPayPalSubscription(subscriptionId);
    if (!subVerification.verified) {
      console.warn(`⚠️ PayPal Subscription Verification failed for ${cleanEmail}:`, subVerification.error);
      return NextResponse.json({ error: subVerification.error || 'Subscription verification failed' }, { status: 400 });
    }

    // Update DB Subscriber Record
    let subscriber = await SubscriberRepository.getSubscriberByEmail(cleanEmail);
    if (!subscriber) {
      await SubscriberRepository.saveSubscriber({
        email: cleanEmail,
        name: name || '',
        country: 'Canada',
        region: 'ON',
        industry: 'Software',
        companySize: '1-9',
        fundingInterests: ['Grants'],
        source: 'Founding Member Beta Checkout',
        subscriptionStatus: 'ACTIVE',
        subscriptionId,
      });
    } else {
      await SubscriberRepository.updateSubscriberPreferences(cleanEmail, {
        subscriptionStatus: 'ACTIVE',
        subscriptionId,
      });
    }

    // Sync to Google Sheets
    await appendLeadToSheet({
      timestamp: new Date().toISOString(),
      source: 'Founding Member Beta Checkout ($29/mo)',
      category: 'Founding Member Beta',
      email: cleanEmail,
      name: name || '',
      businessDescription: `Active Founding Member Subscription ($29/mo USD). PayPal Subscription ID: ${subscriptionId}`,
      consentToPartnerContact: true,
    });

    console.log(`✅ Founding Member Beta Activated for ${cleanEmail} (Sub ID: ${subscriptionId})`);

    return NextResponse.json({
      success: true,
      subscriptionId,
      email: cleanEmail,
      redirectUrl: `/membership/onboarding?email=${encodeURIComponent(cleanEmail)}&sub=${encodeURIComponent(subscriptionId)}`,
    });
  } catch (error: any) {
    console.error('❌ Failed to capture PayPal subscription:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
