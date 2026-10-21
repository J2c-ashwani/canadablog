import { NextRequest, NextResponse } from 'next/server';
import { getPublishingOrder, savePublishingBrief } from '@/lib/advertising/store';
import {
  verifyOrderAccessToken,
  PublishingBrief,
} from '@/lib/advertising/config';
import {
  sendPublishingBriefConfirmation,
  sendPublishingBriefAdminAlert,
} from '@/lib/advertising/emails';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, token, brief } = body;

    if (!orderId || !token || !brief) {
      return NextResponse.json({ error: 'Order ID, security token, and brief payload are required.' }, { status: 400 });
    }

    const order = await getPublishingOrder(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    }

    if (!verifyOrderAccessToken(order.orderId, order.buyerEmail, token)) {
      return NextResponse.json({ error: 'Unauthorized access token.' }, { status: 401 });
    }

    // Validate essential brief fields
    if (!brief.legalCompanyName || !brief.brandName || !brief.companyOverview) {
      return NextResponse.json({ error: 'Section A (Company Background) fields are required.' }, { status: 400 });
    }

    if (!brief.coreMessage || !brief.targetKeywords) {
      return NextResponse.json({ error: 'Section B (Core Message & Keywords) fields are required.' }, { status: 400 });
    }

    if (!brief.keyPointsToInclude) {
      return NextResponse.json({ error: 'Section C (Key Points to Include) is required.' }, { status: 400 });
    }

    if (!brief.primaryUrl || !brief.primaryAnchorText) {
      return NextResponse.json({ error: 'Section D: Primary URL and preferred anchor text are required.' }, { status: 400 });
    }

    if (!brief.agreesToEditorialPolicy || !brief.agreesToDisclosureRequirement) {
      return NextResponse.json(
        { error: 'You must agree to the editorial review standard and transparent sponsored disclosure policy.' },
        { status: 400 }
      );
    }

    const briefRecord: PublishingBrief = {
      legalCompanyName: brief.legalCompanyName.trim(),
      brandName: brief.brandName.trim(),
      companyOverview: brief.companyOverview.trim(),
      targetCustomers: brief.targetCustomers.trim(),
      valueProposition: brief.valueProposition.trim(),
      primaryGoal: brief.primaryGoal || 'thought_leadership',
      coreMessage: brief.coreMessage.trim(),
      targetKeywords: brief.targetKeywords.trim(),
      referenceArticles: brief.referenceArticles ? brief.referenceArticles.trim() : undefined,
      audienceSeniority: brief.audienceSeniority || 'Founders & C-Suite',
      suggestedHeadlines: brief.suggestedHeadlines ? brief.suggestedHeadlines.trim() : undefined,
      keyPointsToInclude: brief.keyPointsToInclude.trim(),
      voiceAndTone: brief.voiceAndTone || 'authoritative',
      primaryUrl: brief.primaryUrl.trim(),
      primaryAnchorText: brief.primaryAnchorText.trim(),
      secondaryUrl: brief.secondaryUrl ? brief.secondaryUrl.trim() : undefined,
      secondaryAnchorText: brief.secondaryAnchorText ? brief.secondaryAnchorText.trim() : undefined,
      readerCtaText: brief.readerCtaText ? brief.readerCtaText.trim() : 'Visit website for details',
      agreesToEditorialPolicy: Boolean(brief.agreesToEditorialPolicy),
      agreesToDisclosureRequirement: Boolean(brief.agreesToDisclosureRequirement),
      notesForEditorialTeam: brief.notesForEditorialTeam ? brief.notesForEditorialTeam.trim() : undefined,
      submittedAt: new Date().toISOString(),
    };

    await savePublishingBrief(orderId, briefRecord);

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fsidigital.ca').replace(/\/$/, '');
    const statusUrl = `${siteUrl}/advertise/order/${orderId}/status?token=${encodeURIComponent(token)}`;

    // Dispatch emails
    await Promise.allSettled([
      sendPublishingBriefConfirmation(order, statusUrl),
      sendPublishingBriefAdminAlert(order, briefRecord),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Editorial brief submitted successfully.',
      redirectUrl: `/advertise/order/${orderId}/status?token=${encodeURIComponent(token)}`,
    });
  } catch (error) {
    console.error('Failed to submit publishing brief:', error);
    return NextResponse.json(
      { error: 'An error occurred while saving your editorial brief. Please try again.' },
      { status: 500 }
    );
  }
}
