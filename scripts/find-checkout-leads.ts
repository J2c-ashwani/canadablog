import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local') });

import { getLeadsFromSheet } from '../lib/google-sheets';
import { getTelemetryEvents } from '../lib/telemetry/telemetry-store';
import { getMCAApplications } from '../lib/mca/sheets';

async function main() {
  console.log("🔍 Searching for leads from August 7th to present who reached checkout but did not complete payment...\n");

  const START_DATE = new Date('2026-08-07T00:00:00.000Z').getTime();

  try {
    const leads = await getLeadsFromSheet(2000);
    const telemetry = await getTelemetryEvents();
    const mcaApps = await getMCAApplications(2000);

    // Group telemetry events by Session ID and Email
    const emailEventsMap = new Map<string, any[]>();
    const sessionToEmail = new Map<string, string>();

    for (const ev of telemetry) {
      const ts = new Date(ev.timestamp).getTime();
      if (isNaN(ts) || ts < START_DATE) continue;

      let email = ev.sessionId ? ev.sessionId.toLowerCase().trim() : '';
      if (!email.includes('@') && ev.pagePath && ev.pagePath.includes('email=')) {
        const match = ev.pagePath.match(/email=([^&]+)/);
        if (match && match[1]) {
          email = decodeURIComponent(match[1]).toLowerCase().trim();
        }
      }

      if (email.includes('@')) {
        if (!emailEventsMap.has(email)) {
          emailEventsMap.set(email, []);
        }
        emailEventsMap.get(email)!.push(ev);
        if (ev.sessionId) sessionToEmail.set(ev.sessionId, email);
      }
    }

    // Consolidated leads map
    const candidates = new Map<string, {
      email: string;
      name: string;
      phone: string;
      company: string;
      industry: string;
      location: string;
      source: string;
      firstTimestamp: string;
      lastTimestamp: string;
      checkoutAttempts: number;
      checkoutEvents: string[];
      totalPageViews: number;
      score: number;
      tier: string;
      productChoice: string;
      purchased: boolean;
      mcaAppId?: string;
    }>();

    // 1. Process Leads sheet
    for (const lead of leads) {
      if (!lead.email) continue;
      const ts = new Date(lead.timestamp).getTime();
      if (isNaN(ts) || ts < START_DATE) continue;

      const email = lead.email.toLowerCase().trim();
      const isPurchased = lead.reportPurchased === true || lead.strategyReportPurchased === true || lead.actualSignedValue !== "N/A" && lead.actualSignedValue !== "";
      
      let actObj: any = {};
      try {
        actObj = JSON.parse(lead.leadActivity || '{}');
      } catch (e) {}

      const hasCheckoutActivity = 
        actObj.packageSelected || 
        actObj.paypalContainerRendered || 
        actObj.checkoutStarted || 
        lead.source.includes('Checkout') || 
        lead.pagePath?.includes('/products') || 
        lead.pagePath?.includes('/audit') ||
        lead.pagePath?.includes('/consultation');

      let checkoutCount = 0;
      const checkoutEvents: string[] = [];

      if (actObj.packageSelected) { checkoutCount++; checkoutEvents.push(`Package: ${actObj.packageSelected}`); }
      if (actObj.paypalContainerRendered) { checkoutCount++; checkoutEvents.push('PayPal Container Rendered'); }

      // Check telemetry for matching events
      const userTelemetry = emailEventsMap.get(email) || [];
      for (const tEv of userTelemetry) {
        const evName = tEv.eventName.toLowerCase();
        if (
          evName.includes('checkout') || 
          evName.includes('paypal') || 
          evName.includes('step6') || 
          evName.includes('paywall') ||
          evName.includes('order_created')
        ) {
          checkoutCount++;
          checkoutEvents.push(tEv.eventName);
        }
      }

      if ((hasCheckoutActivity || checkoutCount > 0) && !isPurchased) {
        candidates.set(email, {
          email,
          name: lead.name || 'Founder',
          phone: lead.phone || 'N/A',
          company: lead.companyName || 'N/A',
          industry: lead.industry || 'General',
          location: `${lead.country || 'CA'}-${lead.state || 'ON'}`,
          source: lead.source || 'Website',
          firstTimestamp: lead.timestamp,
          lastTimestamp: lead.timestamp,
          checkoutAttempts: Math.max(1, checkoutCount),
          checkoutEvents,
          totalPageViews: userTelemetry.length,
          score: lead.score || 50,
          tier: lead.tier || 'B',
          productChoice: actObj.packageSelected || 'Funding Report / Audit',
          purchased: isPurchased,
        });
      }
    }

    // 2. Process Telemetry Events directly (even if not yet in Leads sheet or for partial sessions)
    for (const [email, events] of emailEventsMap.entries()) {
      if (candidates.has(email)) continue;

      const checkoutEvents = events.filter(e => {
        const n = e.eventName.toLowerCase();
        return n.includes('checkout') || n.includes('paypal') || n.includes('step6') || n.includes('paywall') || n.includes('order_created');
      });

      if (checkoutEvents.length > 0) {
        const timestamps = events.map(e => new Date(e.timestamp).getTime()).filter(t => !isNaN(t));
        const firstTs = new Date(Math.min(...timestamps)).toISOString();
        const lastTs = new Date(Math.max(...timestamps)).toISOString();

        candidates.set(email, {
          email,
          name: 'Founder',
          phone: 'N/A',
          company: 'N/A',
          industry: 'General',
          location: 'Canada',
          source: 'Interactive Flow',
          firstTimestamp: firstTs,
          lastTimestamp: lastTs,
          checkoutAttempts: checkoutEvents.length,
          checkoutEvents: checkoutEvents.map(e => e.eventName),
          totalPageViews: events.length,
          score: 65,
          tier: 'B',
          productChoice: checkoutEvents[0]?.productId || 'Report',
          purchased: false,
        });
      }
    }

    // 3. Process MCA Applications
    for (const app of mcaApps) {
      if (!app.email) continue;
      const ts = new Date(app.timestamp).getTime();
      if (isNaN(ts) || ts < START_DATE) continue;

      const email = app.email.toLowerCase().trim();
      const isPurchased = app.priorityProcessing === true || app.recoveryPurchased === true;

      const reachedCheckout = app.priorityRecoveryStatus === 'ACTIVE' || 
                              app.recoveryStage === 'CHECKOUT_STARTED' || 
                              app.priorityRecoveryStatus === 'EMAIL_1_SENT' ||
                              app.recoveryStage === 'EMAIL_1' ||
                              app.priorityRecoveryStatus === 'CHECKOUT_STARTED';

      if (reachedCheckout && !isPurchased) {
        let attempts = 1;
        if (app.recoveryClicked) attempts += 1;

        const existing = candidates.get(email);
        if (existing) {
          existing.checkoutAttempts += attempts;
          existing.checkoutEvents.push(`MCA Priority Checkout (${app.recoveryStage || 'Started'})`);
          existing.mcaAppId = app.applicationId;
        } else {
          candidates.set(email, {
            email,
            name: app.ownerName || 'Business Owner',
            phone: app.phone || 'N/A',
            company: app.legalBusinessName || 'N/A',
            industry: app.industry || 'General',
            location: app.province || 'CA',
            source: 'MCA Application Priority Checkout',
            firstTimestamp: app.timestamp,
            lastTimestamp: app.timestamp,
            checkoutAttempts: attempts,
            checkoutEvents: [`MCA Priority Checkout (${app.recoveryStage || 'Started'})`],
            totalPageViews: 1,
            score: app.priorityScore || 70,
            tier: app.priorityBand || 'High',
            productChoice: 'MCA Priority Processing ($49 CAD)',
            purchased: false,
            mcaAppId: app.applicationId,
          });
        }
      }
    }

    // Convert map to array
    const resultList = Array.from(candidates.values());

    // Sort by:
    // 1. Multiple checkout attempts (>1 first)
    // 2. Lead score / Tier
    // 3. Last timestamp (recency)
    resultList.sort((a, b) => {
      if (b.checkoutAttempts !== a.checkoutAttempts) {
        return b.checkoutAttempts - a.checkoutAttempts;
      }
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.lastTimestamp).getTime() - new Date(a.lastTimestamp).getTime();
    });

    console.log(`================================================================================`);
    console.log(`📊 CHECKOUT ABANDONMENT COHORT REPORT (August 7, 2026 – Present)`);
    console.log(`   Total Unique Leads Reached Checkout without Purchasing: ${resultList.length}`);
    console.log(`================================================================================\n`);

    const multipleAttemptsList = resultList.filter(l => l.checkoutAttempts > 1);
    const singleAttemptList = resultList.filter(l => l.checkoutAttempts === 1);

    console.log(`🔥 PRIORITY SECTION A: REPEATED CHECKOUT ATTEMPTS (${multipleAttemptsList.length} LEADS)\n`);
    multipleAttemptsList.forEach((l, index) => {
      console.log(`[${index + 1}] ⭐ REPEAT ATTEMPT (Attempts: ${l.checkoutAttempts})`);
      console.log(`    Name: ${l.name} | Email: ${l.email} | Phone: ${l.phone}`);
      console.log(`    Company: ${l.company} | Location: ${l.location} | Industry: ${l.industry}`);
      console.log(`    Product Interest: ${l.productChoice} | Source: ${l.source}`);
      console.log(`    Lead Score: ${l.score} (${l.tier}) | Activity Events: ${[...new Set(l.checkoutEvents)].join(', ')}`);
      console.log(`    First Reached: ${l.firstTimestamp} | Last Reached: ${l.lastTimestamp}`);
      console.log(`    ----------------------------------------------------------------------------`);
    });

    console.log(`\n⚡ PRIORITY SECTION B: SINGLE CHECKOUT ATTEMPTS (${singleAttemptList.length} LEADS)\n`);
    singleAttemptList.forEach((l, index) => {
      console.log(`[${index + 1}] SINGLE ATTEMPT`);
      console.log(`    Name: ${l.name} | Email: ${l.email} | Phone: ${l.phone}`);
      console.log(`    Company: ${l.company} | Location: ${l.location} | Industry: ${l.industry}`);
      console.log(`    Product Interest: ${l.productChoice} | Source: ${l.source}`);
      console.log(`    Lead Score: ${l.score} (${l.tier}) | Activity Events: ${[...new Set(l.checkoutEvents)].join(', ')}`);
      console.log(`    Timestamp: ${l.lastTimestamp}`);
      console.log(`    ----------------------------------------------------------------------------`);
    });

  } catch (err: any) {
    console.error("Error executing checkout abandonment search:", err?.message || err);
  }
}

main();
