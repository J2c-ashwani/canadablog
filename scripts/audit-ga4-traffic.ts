/**
 * scripts/audit-ga4-traffic.ts
 * 
 * Direct terminal auditor for Google Analytics 4 (GA4).
 * Connects via Google Service Account (same as Google Search Console)
 * to query real-time visitors, 30-day traffic metrics, checkout dropoffs,
 * and purchase conversions without manual dashboard exports.
 * 
 * Usage:
 *   npx tsx scripts/audit-ga4-traffic.ts
 *   npx tsx scripts/audit-ga4-traffic.ts --property 123456789 --days 30
 */

import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

function getCredentials() {
  const localCredsPath = path.resolve(process.cwd(), 'google-credentials.json');
  if (fs.existsSync(localCredsPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(localCredsPath, 'utf8'));
      if (parsed.client_email && parsed.private_key) {
        return {
          email: parsed.client_email as string,
          key: parsed.private_key as string,
          projectId: (parsed.project_id || 'fsi-digital-indexing') as string,
          source: 'google-credentials.json',
        };
      }
    } catch {}
  }

  const envEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const envKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (envEmail && envKey) {
    return {
      email: envEmail,
      key: envKey,
      projectId: '162233805371',
      source: '.env.local (GOOGLE_SHEETS_CLIENT_EMAIL)',
    };
  }

  return null;
}

async function runAudit() {
  console.log('══════════════════════════════════════════════════════════════════════');
  console.log('   FSI DIGITAL — GOOGLE ANALYTICS 4 (GA4) TERMINAL AUDIT ENGINE');
  console.log('══════════════════════════════════════════════════════════════════════\n');

  const creds = getCredentials();
  if (!creds) {
    console.error('❌ No Google Service Account credentials found.');
    console.error('   Expected either:');
    console.error('    1. google-credentials.json in the project root');
    console.error('    2. GOOGLE_SHEETS_CLIENT_EMAIL & GOOGLE_SHEETS_PRIVATE_KEY in .env.local\n');
    process.exit(1);
  }

  console.log(`🔑 Service Account: ${creds.email}`);
  console.log(`📁 Source:          ${creds.source}`);
  console.log(`🏗️  GCP Project ID:  ${creds.projectId}\n`);

  // Parse CLI args or env
  const args = process.argv.slice(2);
  let propertyId = process.env.GA4_PROPERTY_ID || '';
  const propIndex = args.indexOf('--property');
  if (propIndex !== -1 && args[propIndex + 1]) {
    propertyId = args[propIndex + 1];
  }

  let days = 30;
  const daysIndex = args.indexOf('--days');
  if (daysIndex !== -1 && args[daysIndex + 1]) {
    days = parseInt(args[daysIndex + 1], 10) || 30;
  }

  if (!propertyId) {
    console.log('⚠️  GA4_PROPERTY_ID is not set.');
    console.log('──────────────────────────────────────────────────────────────────────');
    console.log('HOW TO ATTACH GOOGLE ANALYTICS TO ANTIGRAVITY IN 2 MINUTES:');
    console.log('──────────────────────────────────────────────────────────────────────');
    console.log('Step 1: Enable the Google Analytics Data API:');
    console.log(`   👉 https://console.developers.google.com/apis/api/analyticsdata.googleapis.com/overview?project=${creds.projectId}`);
    console.log('   Click "ENABLE".\n');
    console.log('Step 2: Add Service Account to Google Analytics:');
    console.log('   👉 Open https://analytics.google.com');
    console.log('   👉 Click Admin (gear icon at bottom left)');
    console.log('   👉 Under "Property", click "Property Access Management"');
    console.log('   👉 Click the "+" icon at top right -> "Add users"');
    console.log(`   👉 Enter Email: ${creds.email}`);
    console.log('   👉 Direct Roles: select "Viewer" (or "Editor")');
    console.log('   👉 Click "Add".\n');
    console.log('Step 3: Get your GA4 Property ID:');
    console.log('   👉 In GA4 Admin -> Property -> "Property Details"');
    console.log('   👉 Copy the 9-digit "Property ID" (e.g. 398247192)');
    console.log('   👉 Add to .env.local: GA4_PROPERTY_ID=your_id');
    console.log('   👉 Or re-run: npx tsx scripts/audit-ga4-traffic.ts --property <YOUR_PROPERTY_ID>\n');
    console.log('──────────────────────────────────────────────────────────────────────\n');
    return;
  }

  // Strip prefix if user passed "properties/12345"
  const cleanPropertyId = propertyId.replace(/^properties\//, '');
  console.log(`📡 Connecting to GA4 Property: properties/${cleanPropertyId} (last ${days} days)\n`);

  const auth = new google.auth.JWT({
    email: creds.email,
    key: creds.key,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  });

  const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });

  try {
    // 1. REALTIME REPORT (Last 30 mins)
    console.log('⚡ Querying Real-Time Visitors (last 30 minutes)...');
    try {
      const realtimeRes = await analyticsdata.properties.runRealtimeReport({
        property: `properties/${cleanPropertyId}`,
        requestBody: {
          metrics: [{ name: 'activeUsers' }],
          dimensions: [{ name: 'unifiedScreenName' }],
        },
      });

      const totalActiveUsers = realtimeRes.data.rows?.reduce(
        (sum, r) => sum + parseInt(r.metricValues?.[0]?.value || '0', 10),
        0
      ) || 0;

      console.log(`   🟢 Active Users Right Now: ${totalActiveUsers}`);
      if (realtimeRes.data.rows && realtimeRes.data.rows.length > 0) {
        console.log('   Active Pages:');
        realtimeRes.data.rows.slice(0, 5).forEach((r) => {
          const page = r.dimensionValues?.[0]?.value || '/';
          const users = r.metricValues?.[0]?.value || '0';
          console.log(`     • ${page}: ${users} active`);
        });
      }
    } catch (rtErr: any) {
      console.log(`   (Real-time report not available: ${rtErr.message})`);
    }

    console.log('');

    // 2. OVERALL TRAFFIC SUMMARY (Last N days)
    console.log(`📊 Querying Overall Traffic Performance (Last ${days} Days)...`);
    const summaryRes = await analyticsdata.properties.runReport({
      property: `properties/${cleanPropertyId}`,
      requestBody: {
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
        metrics: [
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'newUsers' },
          { name: 'screenPageViews' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
        ],
      },
    });

    const metrics = summaryRes.data.rows?.[0]?.metricValues || [];
    const sessions = metrics[0]?.value || '0';
    const totalUsers = metrics[1]?.value || '0';
    const newUsers = metrics[2]?.value || '0';
    const pageviews = metrics[3]?.value || '0';
    const avgDuration = parseFloat(metrics[4]?.value || '0').toFixed(1);
    const bounceRate = (parseFloat(metrics[5]?.value || '0') * 100).toFixed(1);

    console.log(`   • Total Sessions:         ${sessions}`);
    console.log(`   • Total Users:            ${totalUsers}`);
    console.log(`   • New Users:              ${newUsers}`);
    console.log(`   • Pageviews:              ${pageviews}`);
    console.log(`   • Avg Session Duration:   ${avgDuration}s`);
    console.log(`   • Bounce Rate:            ${bounceRate}%\n`);

    // 3. CONVERSION & FUNNEL EVENTS
    console.log('🎯 Querying Conversion & Commercial Funnel Events...');
    const eventsRes = await analyticsdata.properties.runReport({
      property: `properties/${cleanPropertyId}`,
      requestBody: {
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      },
    });

    const keyEvents = ['page_view', 'generate_lead', 'begin_checkout', 'purchase', 'calculator_step_completed', 'report_opened'];
    const eventMap = new Map<string, { count: string; users: string }>();
    eventsRes.data.rows?.forEach((r) => {
      const name = r.dimensionValues?.[0]?.value || '';
      const count = r.metricValues?.[0]?.value || '0';
      const users = r.metricValues?.[1]?.value || '0';
      eventMap.set(name, { count, users });
    });

    console.log('   Tracked Funnel Milestones:');
    keyEvents.forEach((ev) => {
      const data = eventMap.get(ev);
      if (data) {
        console.log(`     ✓ ${ev.padEnd(25)}: ${data.count.padStart(6)} events (${data.users} unique users)`);
      } else {
        console.log(`     ○ ${ev.padEnd(25)}:      0 events (not fired in window)`);
      }
    });

    console.log('');

    // 4. TOP TRAFFIC SOURCES
    console.log('🚦 Querying Top Acquisition Channels...');
    const channelRes = await analyticsdata.properties.runReport({
      property: `properties/${cleanPropertyId}`,
      requestBody: {
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: '5',
      },
    });

    channelRes.data.rows?.forEach((r) => {
      const channel = r.dimensionValues?.[0]?.value || 'Unknown';
      const sess = r.metricValues?.[0]?.value || '0';
      const users = r.metricValues?.[1]?.value || '0';
      console.log(`     • ${channel.padEnd(22)}: ${sess.padStart(5)} sessions (${users} users)`);
    });

    console.log('');

    // 5. TOP PAGES BY VIEWS
    console.log('📄 Querying Top High-Intent Pages...');
    const pageRes = await analyticsdata.properties.runReport({
      property: `properties/${cleanPropertyId}`,
      requestBody: {
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: '8',
      },
    });

    pageRes.data.rows?.forEach((r) => {
      const page = r.dimensionValues?.[0]?.value || '/';
      const views = r.metricValues?.[0]?.value || '0';
      const users = r.metricValues?.[1]?.value || '0';
      console.log(`     • ${page.padEnd(42)}: ${views.padStart(4)} views (${users} users)`);
    });

    console.log('');

    // 6. DEVICE BREAKDOWN
    console.log('📱 Querying Device Breakdown...');
    const devRes = await analyticsdata.properties.runReport({
      property: `properties/${cleanPropertyId}`,
      requestBody: {
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      },
    });

    devRes.data.rows?.forEach((r) => {
      const dev = r.dimensionValues?.[0]?.value || 'other';
      const sess = r.metricValues?.[0]?.value || '0';
      const users = r.metricValues?.[1]?.value || '0';
      console.log(`     • ${dev.padEnd(15)}: ${sess.padStart(4)} sessions (${users} users)`);
    });

    console.log('');

    // 7. TOP GEOGRAPHIES
    console.log('🌍 Querying Top Countries...');
    const geoRes = await analyticsdata.properties.runReport({
      property: `properties/${cleanPropertyId}`,
      requestBody: {
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: '5',
      },
    });

    geoRes.data.rows?.forEach((r) => {
      const country = r.dimensionValues?.[0]?.value || 'Other';
      const sess = r.metricValues?.[0]?.value || '0';
      const users = r.metricValues?.[1]?.value || '0';
      console.log(`     • ${country.padEnd(18)}: ${sess.padStart(4)} sessions (${users} users)`);
    });

    console.log('\n✅ GA4 Terminal Audit Completed Successfully.\n');
  } catch (err: any) {
    console.error('\n❌ GA4 API Request Failed:');
    console.error(`   ${err.message}\n`);

    if (err.message.includes('has not been used in project') || err.message.includes('disabled')) {
      console.log('👉 ACTION REQUIRED: Enable Google Analytics Data API in your Google Cloud Console:');
      console.log(`   Link: https://console.developers.google.com/apis/api/analyticsdata.googleapis.com/overview?project=${creds.projectId}\n`);
    } else if (err.message.includes('permission') || err.message.includes('User does not have')) {
      console.log('👉 ACTION REQUIRED: Add the Service Account to your GA4 property:');
      console.log(`   1. Open Google Analytics -> Admin -> Property Access Management`);
      console.log(`   2. Add user: ${creds.email}`);
      console.log(`   3. Assign role: Viewer (or Editor)\n`);
    }
  }
}

runAudit();
