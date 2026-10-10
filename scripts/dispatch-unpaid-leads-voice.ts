/**
 * FSI Digital — Dispatch Voice Calls to Unpaid Leads from Google Sheets
 *
 * Scans Google Sheets for unpaid leads (August, September, October) who:
 * 1. Did not purchase ($19 / $49 / $79 / $199)
 * 2. Provided a phone number
 * 3. Have not been called or are past the 24h cooldown
 * 4. Pass CRTC telecommunications window and DNC compliance
 *
 * Usage:
 *   npx tsx scripts/dispatch-unpaid-leads-voice.ts --dry-run
 *   npx tsx scripts/dispatch-unpaid-leads-voice.ts --month=august --dry-run
 *   npx tsx scripts/dispatch-unpaid-leads-voice.ts --limit=5 --dry-run
 *   VOICE_AGENT_ENABLED=true npx tsx scripts/dispatch-unpaid-leads-voice.ts --live --confirm
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Automatically load .env.local first, then fallback to .env
if (fs.existsSync(path.resolve(process.cwd(), '.env.local'))) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
} else {
  dotenv.config();
}

import { getLeadsFromSheet } from '../lib/google-sheets';
import { triggerVoiceCallingAgent } from '../lib/voice-agent/outbound-caller';
import { normalizeToE164, validatePhone } from '../lib/phone-validator';
import { checkCallEligibility } from '../lib/voice-agent/compliance-guard';

async function main() {
  const args = process.argv.slice(2);
  const isLive = args.includes('--live') && args.includes('--confirm');
  const monthFilter = args.find((a) => a.startsWith('--month='))?.split('=')[1]?.toLowerCase();
  const limitArg = args.find((a) => a.startsWith('--limit='))?.split('=')[1];
  const maxToProcess = limitArg ? parseInt(limitArg, 10) : 50;

  console.log('===============================================================');
  console.log('📞 FSI DIGITAL — OUTBOUND VOICE CALL DISPATCHER (UNPAID LEADS)');
  console.log('===============================================================');
  console.log(`Mode: ${isLive ? '🔴 LIVE DISPATCH (Real phone calls)' : '🟢 DRY RUN (Preview only)'}`);
  if (monthFilter) console.log(`Month Filter: ${monthFilter.toUpperCase()}`);
  console.log(`Max Candidates to Inspect: ${maxToProcess}`);
  console.log('---------------------------------------------------------------\n');

  console.log('Fetching leads from Google Sheets...');
  let rawLeads: any[] = [];
  try {
    rawLeads = await getLeadsFromSheet(1500);
  } catch (err: any) {
    console.error('❌ Failed to fetch leads from Google Sheets:', err.message);
    process.exit(1);
  }

  console.log(`Total Leads retrieved: ${rawLeads.length}\n`);

  const candidates: any[] = [];

  for (const lead of rawLeads) {
    // 1. Skip if already purchased
    const alreadyPaid = lead.reportPurchased === true ||
      lead.strategyReportPurchased === true ||
      lead.offlineStatus === 'Customer' ||
      lead.offlineStatus === 'Paid';
    if (alreadyPaid) continue;

    // 2. Check for phone number
    const rawPhone = (lead.phone || '').trim();
    if (!rawPhone || rawPhone === 'N/A' || rawPhone === 'Not provided' || rawPhone.length < 7) {
      continue;
    }

    const validation = validatePhone(rawPhone, lead.country || 'Canada');
    if (!validation.isValid) continue;

    const e164Phone = normalizeToE164(rawPhone, lead.country || 'Canada');
    if (!e164Phone) continue;

    // 3. Month filter if specified
    if (monthFilter) {
      const ts = (lead.timestamp || '').toLowerCase();
      const date = new Date(lead.timestamp);
      const monthName = date.toLocaleString('default', { month: 'long' }).toLowerCase();
      if (!ts.includes(monthFilter) && !monthName.includes(monthFilter)) {
        continue;
      }
    }

    // 4. Parse activity for previous call attempts
    let activity: any = {};
    try {
      if (lead.leadActivity) {
        activity = typeof lead.leadActivity === 'string' ? JSON.parse(lead.leadActivity) : lead.leadActivity;
      }
    } catch {}

    const attemptCount = activity.callAttempts || 0;
    const lastAttemptAt = activity.lastCallAttemptAt || activity.lastCallCompletedAt;
    const doNotCall = lead.offlineStatus === 'DNC' || activity.doNotCall === true;

    // 5. Compliance eligibility check
    const compliance = checkCallEligibility({
      consentToAiCall: true, // Lead explicitly requested funding assessment with contact
      doNotCall,
      attemptCount,
      lastAttemptAt,
      state: lead.state,
    });

    candidates.push({
      lead,
      e164Phone,
      compliance,
      activity,
    });

    if (candidates.length >= maxToProcess) break;
  }

  console.log(`📊 Found ${candidates.length} candidate leads matching criteria.\n`);

  if (candidates.length === 0) {
    console.log('No eligible unpaid leads with phone numbers found for the selected criteria.');
    return;
  }

  // Print Summary Table
  console.log('---------------------------------------------------------------------------------------------------------');
  console.log(
    '#'.padEnd(4) +
    'Date'.padEnd(12) +
    'Name'.padEnd(20) +
    'Phone'.padEnd(16) +
    'Company'.padEnd(22) +
    'Compliance'.padEnd(20) +
    'Purpose'
  );
  console.log('---------------------------------------------------------------------------------------------------------');

  candidates.forEach((c, idx) => {
    const d = c.lead.timestamp ? c.lead.timestamp.substring(0, 10) : 'N/A';
    const name = (c.lead.name || 'Founder').substring(0, 18);
    const phone = c.e164Phone.substring(0, 14);
    const comp = (c.lead.companyName || c.lead.industry || 'Business').substring(0, 20);
    const compStatus = c.compliance.eligible ? '✅ Ready' : `⚠️ ${c.compliance.reason}`;
    const purpose = (c.lead.fundingPurpose || 'Innovation').substring(0, 25);

    console.log(
      String(idx + 1).padEnd(4) +
      d.padEnd(12) +
      name.padEnd(20) +
      phone.padEnd(16) +
      comp.padEnd(22) +
      compStatus.padEnd(20) +
      purpose
    );
  });
  console.log('---------------------------------------------------------------------------------------------------------\n');

  if (!isLive) {
    console.log('🔒 DRY RUN COMPLETE. No phone calls were made.');
    console.log('To initiate live calls with Vapi / Bland, set VOICE_AGENT_ENABLED=true and run:');
    console.log('  VOICE_AGENT_ENABLED=true npx tsx scripts/dispatch-unpaid-leads-voice.ts --live --confirm\n');
    return;
  }

  // Live Execution Loop
  console.log('🚨 EXECUTING LIVE OUTBOUND CALLS...\n');
  let dispatched = 0;
  let blocked = 0;

  for (const c of candidates) {
    if (!c.compliance.eligible) {
      console.log(`⏭️  Skipping ${c.lead.name} (${c.e164Phone}): ${c.compliance.reason}`);
      blocked++;
      continue;
    }

    console.log(`📞 Calling ${c.lead.name} at ${c.e164Phone} (${c.lead.companyName || 'Business'})...`);

    try {
      const res = await triggerVoiceCallingAgent({
        name: c.lead.name,
        phone: c.e164Phone,
        email: c.lead.email,
        companyName: c.lead.companyName,
        state: c.lead.state,
        country: c.lead.country,
        industry: c.lead.industry,
        fundingAmount: c.lead.fundingAmount,
        fundingPurpose: c.lead.fundingPurpose,
        score: c.lead.score,
        tier: c.lead.tier,
        wantsAdvisorContact: true,
        consentToAiCall: true,
        attemptCount: c.activity.callAttempts || 0,
        lastAttemptAt: c.activity.lastCallAttemptAt,
      });

      if (res.success) {
        console.log(`   ✅ Dispatched successfully! (Call ID / Channel: ${res.callId || res.dispatchedTo})`);
        dispatched++;
      } else {
        console.log(`   ❌ Dispatch failed: ${res.reason}`);
      }
    } catch (err: any) {
      console.error(`   ❌ Error calling ${c.e164Phone}:`, err.message);
    }

    // Safety pause between calls to respect rate limits
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  console.log('\n===============================================================');
  console.log(`🏁 OUTBOUND RUN FINISHED: ${dispatched} dispatched, ${blocked} compliance-blocked.`);
  console.log('===============================================================');
}

main().catch(console.error);
