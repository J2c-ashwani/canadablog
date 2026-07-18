import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from '@/lib/admin/auth';
import { getGoogleSheetsClient } from '@/lib/google-sheets';
import { SubscriberRepository } from '@/lib/leads/SubscriberRepository';
import { sendPostCallSummaryEmail } from '@/lib/emails/post-call-emails';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const adminSecret = process.env.LEAD_DASHBOARD_SECRET;

    if (!adminSecret) {
      return NextResponse.json({ error: 'Private dashboard access is not ready yet.' }, { status: 500 });
    }

    // 1. Verify Admin Authentication
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

    if (!isValidAdminSession(sessionCookie, adminSecret)) {
      return NextResponse.json({ error: 'Unauthorized session.' }, { status: 401 });
    }

    // 2. Parse Request Body
    const body = await request.json();
    const { rowIndex, email, status, gaClientId, actualSignedValue } = body;

    if (!rowIndex || !email || !status) {
      return NextResponse.json({ error: 'Missing required parameters.' }, { status: 400 });
    }

    // 3. Update Status and Signed Value in Google Sheets
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      return NextResponse.json({ error: 'GOOGLE_SHEET_ID environment variable is missing.' }, { status: 500 });
    }

    // Update Status cell (Column AF is 32nd column)
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Leads!AF${rowIndex}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[status]],
      },
    });

    // If it's a won deal and value is provided, update Column AG (33rd column)
    if (status === 'Filing Client Signed' && actualSignedValue) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `Leads!AG${rowIndex}`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [[actualSignedValue]],
        },
      });
    }

    console.log(`✅ Updated status of lead ${email} at row ${rowIndex} to: ${status} (${actualSignedValue || 'no value'})`);

    // If status is updated to 'Audit Attended', trigger post-call summary email and save timestamp
    if (status === 'Audit Attended') {
      try {
        const subscriber = await SubscriberRepository.getSubscriberByEmail(email);
        if (subscriber) {
          let activity: Record<string, any> = {};
          if (subscriber.leadActivity && subscriber.leadActivity !== 'N/A' && subscriber.leadActivity !== '{}') {
            try {
              activity = JSON.parse(subscriber.leadActivity);
            } catch (e) {
              console.error('[Update Lead Status] Failed to parse leadActivity:', e);
            }
          }
          
          activity.auditAttendedAt = new Date().toISOString();
          
          await SubscriberRepository.updateSubscriberPreferences(email, {
            leadActivity: JSON.stringify(activity),
          });
          
          const emailRes = await sendPostCallSummaryEmail({
            to: email,
            name: subscriber.name || 'Founder',
            companyName: subscriber.companyName || 'Your Company'
          });
          console.log(`[Update Lead Status] Post-call email sent to ${email}. Skipped: ${emailRes.skipped}`);
        }
      } catch (err) {
        console.error('[Update Lead Status] Failed to trigger post-call email:', err);
      }
    }

    // 4. Dispatch Server-to-Server GA4 Measurement Protocol Event
    const gaApiSecret = process.env.GA_API_SECRET;
    const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-DZ55NMNLYM';

    if (gaClientId && gaClientId !== 'N/A') {
      if (gaApiSecret) {
        try {
          const eventName = status.toLowerCase().replace(/[^a-z0-9]+/g, '_'); // e.g. "audit_attended", "proposal_sent", "filing_client_signed"
          
          // Build event parameters, including value/currency for e-commerce attribution if it's the signed client event
          const eventParams: Record<string, any> = {
            engagement_time_msec: '100',
            email_lookup_hint: email,
          };

          if (status === 'Filing Client Signed' && actualSignedValue) {
            const numericValue = Number(actualSignedValue.replace(/[^0-9.]/g, ''));
            if (!Number.isNaN(numericValue) && numericValue > 0) {
              eventParams.value = numericValue;
              eventParams.currency = 'USD';
            }
          }

          const response = await fetch(`https://www.google-analytics.com/mp/collect?api_secret=${gaApiSecret}&measurement_id=${gaMeasurementId}`, {
            method: 'POST',
            body: JSON.stringify({
              client_id: gaClientId,
              events: [{
                name: eventName,
                params: eventParams,
              }]
            })
          });
          console.log(`[GA4 MP Collect] Event "${eventName}" sent with params: ${JSON.stringify(eventParams)}. Status: ${response.status}`);
        } catch (gaErr) {
          console.error('❌ Failed to dispatch GA4 server-to-server event:', gaErr);
        }
      } else {
        console.warn('⚠️ GA_API_SECRET is not configured in environment. GA4 server-to-server event skipped.');
      }
    }

    return NextResponse.json({ success: true, message: `Status updated to ${status}` });
  } catch (error) {
    console.error('Update lead status API error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
