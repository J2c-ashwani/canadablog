// app/api/mca/resolve-token/route.ts
// Resolves a recovery token to fetch the associated application details securely.
// Never exposes the email address or details in the client-side URL parameters directly.

import { NextRequest, NextResponse } from 'next/server';
import { getMCAApplications, updateMCAApplicationRecovery } from '@/lib/mca/sheets';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('t');

    if (!token || !token.startsWith('mca_rec_')) {
      return NextResponse.json({ error: 'Invalid or missing recovery token.' }, { status: 400 });
    }

    // Load applications
    const applications = await getMCAApplications(2000);
    const app = applications.find(a => a.recoveryToken === token);

    if (!app) {
      return NextResponse.json({ error: 'Application not found associated with this token.' }, { status: 404 });
    }

    if (app.priorityProcessing) {
      return NextResponse.json({
        alreadyPaid: true,
        message: 'Priority Processing has already been completed for this application.',
        applicationId: app.applicationId,
      }, { status: 200 });
    }

    // Log the click event (non-blocking CRM update)
    await updateMCAApplicationRecovery(app.applicationId, {
      recoveryClicked: true,
    }).catch(() => {});

    // Return filtered safe fields for checkout render
    return NextResponse.json({
      success: true,
      applicationId: app.applicationId,
      email: app.email,
      legalBusinessName: app.legalBusinessName,
      monthlyRevenue: app.monthlyRevenue,
      fundingAmount: app.fundingAmount,
      priorityBand: app.priorityBand,
    }, { status: 200 });

  } catch (error) {
    console.error('MCA Resolve Token error:', error);
    return NextResponse.json({ error: 'Internal server error resolving token.' }, { status: 500 });
  }
}
