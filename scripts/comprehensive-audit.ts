import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';

config({ path: path.join(process.cwd(), '.env.local') });

import { getLeadsFromSheet } from '../lib/google-sheets';
import { getTelemetryEvents } from '../lib/telemetry/telemetry-store';

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let value = '';
  let inQuotes = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && next === '"') { value += '"'; index += 1; continue; }
    if (char === '"') { inQuotes = !inQuotes; continue; }
    if (char === ',' && !inQuotes) { values.push(value); value = ''; continue; }
    value += char;
  }
  values.push(value);
  return values;
}

function readCsv(filePath: string): any[] {
  if (!fs.existsSync(filePath)) return [];
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/^\uFEFF/, '');
  const lines = content.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]).map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((h, i) => [h, values[i] || '']));
  });
}

function getWeekKey(dateStr: string): string {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const onejan = new Date(year, 0, 1);
  const week = Math.ceil((((d.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
  return `${year}-W${String(week).padStart(2, '0')}`;
}

function getWeekStart(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday start
  const monday = new Date(d.setDate(diff));
  return monday.toISOString().split('T')[0];
}

async function main() {
  console.log('=== COMPREHENSIVE 14-WEEK AUDIT ===\n');
  
  // 1. LOAD GSC DATA (multiple exports)
  const gscDirs = [
    path.join(process.cwd(), '3monthGSCdata'),
    path.join(process.cwd(), 'gsc report 09-07'),
    path.join(process.cwd(), 'fsidigital.ca-Performance-on-Search-2026-07-02'),
    path.join(process.cwd(), 'fsidigital.ca-Performance-on-Search-2026-06-28'),
  ];

  // Combine all chart data for weekly traffic trend
  const weeklyTraffic: Record<string, { clicks: number; impressions: number; ctrSum: number; positionSum: number; days: number }> = {};

  for (const dir of gscDirs) {
    const chartPath = path.join(dir, 'Chart.csv');
    if (!fs.existsSync(chartPath)) continue;
    const rows = readCsv(chartPath);
    for (const row of rows) {
      const date = row['Date'] || '';
      if (!date) continue;
      const weekStart = getWeekStart(date);
      if (!weeklyTraffic[weekStart]) {
        weeklyTraffic[weekStart] = { clicks: 0, impressions: 0, ctrSum: 0, positionSum: 0, days: 0 };
      }
      const clicks = Number(row['Clicks'] || 0);
      const impressions = Number(row['Impressions'] || 0);
      const ctr = parseFloat(String(row['CTR'] || '0').replace('%', '')) || 0;
      const position = parseFloat(row['Position'] || '0') || 0;
      
      // Only add if not already counted (dedup)
      weeklyTraffic[weekStart].clicks += clicks;
      weeklyTraffic[weekStart].impressions += impressions;
      weeklyTraffic[weekStart].ctrSum += ctr;
      weeklyTraffic[weekStart].positionSum += position;
      weeklyTraffic[weekStart].days++;
    }
  }

  console.log('📊 SECTION 1: GSC WEEKLY TRAFFIC TRENDS (14 Weeks)');
  console.log('=============================================');
  const sortedWeeks = Object.entries(weeklyTraffic).sort((a, b) => a[0].localeCompare(b[0]));
  console.log('| Week Starting | Clicks | Impressions | Avg CTR | Avg Position |');
  console.log('|---|---|---|---|---|');
  for (const [week, data] of sortedWeeks.slice(-14)) {
    const avgCtr = data.days > 0 ? (data.ctrSum / data.days).toFixed(2) : '0.00';
    const avgPos = data.days > 0 ? (data.positionSum / data.days).toFixed(1) : '0.0';
    console.log(`| ${week} | ${data.clicks} | ${data.impressions} | ${avgCtr}% | ${avgPos} |`);
  }

  // Top pages from most recent GSC export
  const latestGscDir = gscDirs.find(d => fs.existsSync(path.join(d, 'Pages.csv')));
  if (latestGscDir) {
    const pagesRows = readCsv(path.join(latestGscDir, 'Pages.csv'));
    console.log('\n📊 TOP 15 PAGES BY CLICKS (Latest GSC)');
    console.log('=============================================');
    const sorted = pagesRows.sort((a: any, b: any) => Number(b['Clicks'] || 0) - Number(a['Clicks'] || 0));
    console.log('| URL | Clicks | Impressions | CTR | Position |');
    console.log('|---|---|---|---|---|');
    for (const row of sorted.slice(0, 15)) {
      const url = row['Top pages'] || row['Pages'] || row['Page'] || '';
      const shortUrl = url.replace('https://www.fsidigital.ca', '');
      console.log(`| ${shortUrl || '/'} | ${row['Clicks']} | ${row['Impressions']} | ${row['CTR']} | ${row['Position']} |`);
    }
  }

  // 2. LOAD LEADS & TELEMETRY
  const leads = await getLeadsFromSheet(1000);
  const telemetry = await getTelemetryEvents();
  
  console.log(`\n\n📊 SECTION 2: LEADS ANALYSIS (${leads.length} total leads)`);
  console.log('=============================================');
  
  // Weekly leads breakdown
  const weeklyLeads: Record<string, number> = {};
  const sourceBreakdown: Record<string, number> = {};
  const provinceBreakdown: Record<string, number> = {};
  const industryBreakdown: Record<string, number> = {};
  
  for (const lead of leads) {
    const ts = lead.timestamp || '';
    if (ts) {
      try {
        const weekStart = getWeekStart(ts.split('T')[0]);
        weeklyLeads[weekStart] = (weeklyLeads[weekStart] || 0) + 1;
      } catch (e) {}
    }
    
    const source = (lead.source || 'Unknown').toLowerCase();
    sourceBreakdown[source] = (sourceBreakdown[source] || 0) + 1;
    
    const province = (lead.state || lead.region || 'Unknown');
    provinceBreakdown[province] = (provinceBreakdown[province] || 0) + 1;
    
    const industry = (lead.industry || 'Unknown');
    industryBreakdown[industry] = (industryBreakdown[industry] || 0) + 1;
  }
  
  // Weekly lead trend
  console.log('\n📈 WEEKLY LEAD ACQUISITION (Last 14 Weeks):');
  console.log('| Week Starting | New Leads |');
  console.log('|---|---|');
  const sortedLeadWeeks = Object.entries(weeklyLeads).sort((a, b) => a[0].localeCompare(b[0]));
  for (const [week, count] of sortedLeadWeeks.slice(-14)) {
    console.log(`| ${week} | ${count} |`);
  }
  
  // Source breakdown
  console.log('\n📈 LEAD SOURCE DISTRIBUTION:');
  console.log('| Source | Count | % |');
  console.log('|---|---|---|');
  const sortedSources = Object.entries(sourceBreakdown).sort((a, b) => b[1] - a[1]);
  for (const [source, count] of sortedSources.slice(0, 15)) {
    console.log(`| ${source} | ${count} | ${((count / leads.length) * 100).toFixed(1)}% |`);
  }
  
  // Province breakdown
  console.log('\n📈 GEOGRAPHIC DISTRIBUTION (Top 10):');
  console.log('| Province/State | Count | % |');
  console.log('|---|---|---|');
  const sortedProvinces = Object.entries(provinceBreakdown).sort((a, b) => b[1] - a[1]);
  for (const [prov, count] of sortedProvinces.slice(0, 10)) {
    console.log(`| ${prov} | ${count} | ${((count / leads.length) * 100).toFixed(1)}% |`);
  }

  // Industry breakdown
  console.log('\n📈 INDUSTRY DISTRIBUTION (Top 10):');
  console.log('| Industry | Count | % |');
  console.log('|---|---|---|');
  const sortedIndustries = Object.entries(industryBreakdown).sort((a, b) => b[1] - a[1]);
  for (const [ind, count] of sortedIndustries.slice(0, 10)) {
    console.log(`| ${ind} | ${count} | ${((count / leads.length) * 100).toFixed(1)}% |`);
  }

  // 3. TELEMETRY - TRAFFIC QUALITY ANALYSIS
  console.log(`\n\n📊 SECTION 3: TRAFFIC QUALITY ANALYSIS (${telemetry.length} events)`);
  console.log('=============================================');
  
  const qualityBuckets: Record<string, number> = {};
  const eventTypes: Record<string, number> = {};
  const weeklyEvents: Record<string, number> = {};
  
  for (const event of telemetry) {
    const quality = event.trafficQualityClassification || 'Unclassified';
    qualityBuckets[quality] = (qualityBuckets[quality] || 0) + 1;
    
    const evName = event.eventName || 'unknown';
    eventTypes[evName] = (eventTypes[evName] || 0) + 1;
    
    if (event.timestamp) {
      try {
        const weekStart = getWeekStart(event.timestamp.split('T')[0]);
        weeklyEvents[weekStart] = (weeklyEvents[weekStart] || 0) + 1;
      } catch (e) {}
    }
  }
  
  console.log('\n📈 TRAFFIC QUALITY DISTRIBUTION:');
  console.log('| Classification | Count | % |');
  console.log('|---|---|---|');
  const sortedQuality = Object.entries(qualityBuckets).sort((a, b) => b[1] - a[1]);
  for (const [q, count] of sortedQuality) {
    console.log(`| ${q} | ${count} | ${((count / telemetry.length) * 100).toFixed(1)}% |`);
  }
  
  console.log('\n📈 EVENT TYPE BREAKDOWN:');
  console.log('| Event Name | Count | % |');
  console.log('|---|---|---|');
  const sortedEvents = Object.entries(eventTypes).sort((a, b) => b[1] - a[1]);
  for (const [evName, count] of sortedEvents.slice(0, 20)) {
    console.log(`| ${evName} | ${count} | ${((count / telemetry.length) * 100).toFixed(1)}% |`);
  }

  console.log('\n📈 WEEKLY TELEMETRY EVENT VOLUME:');
  console.log('| Week Starting | Events |');
  console.log('|---|---|');
  const sortedEventWeeks = Object.entries(weeklyEvents).sort((a, b) => a[0].localeCompare(b[0]));
  for (const [week, count] of sortedEventWeeks.slice(-14)) {
    console.log(`| ${week} | ${count} |`);
  }

  // 4. CHECKOUT ABANDONMENT DEEP DIVE
  console.log(`\n\n📊 SECTION 4: CHECKOUT ABANDONMENT JOURNEY ANALYSIS`);
  console.log('=============================================');
  
  // Find all sessions that had checkout-related events
  const checkoutSessions = new Map<string, any[]>();
  
  for (const event of telemetry) {
    if (event.eventName.includes('checkout') || 
        event.eventName.includes('paywall') || 
        event.eventName.includes('purchase') ||
        event.eventName.includes('payment') ||
        event.eventName.includes('package_selected')) {
      const sessId = event.sessionId || 'unknown';
      if (!checkoutSessions.has(sessId)) {
        checkoutSessions.set(sessId, []);
      }
      checkoutSessions.get(sessId)!.push(event);
    }
  }
  
  // Now for each checkout session, reconstruct full journey
  console.log(`\nFound ${checkoutSessions.size} sessions with checkout/payment events.`);
  
  // Separate completed vs abandoned
  const completedSessions: string[] = [];
  const abandonedSessions: string[] = [];
  
  for (const [sessId, events] of checkoutSessions) {
    const hasPurchase = events.some(e => 
      e.eventName.includes('purchase_product') || 
      e.eventName.includes('purchase_success') ||
      e.eventName.includes('payment_capture_success')
    );
    if (hasPurchase) {
      completedSessions.push(sessId);
    } else {
      abandonedSessions.push(sessId);
    }
  }
  
  console.log(`\n✅ Completed purchase sessions: ${completedSessions.length}`);
  console.log(`❌ Abandoned checkout sessions: ${abandonedSessions.length}`);
  
  // For each abandoned session, get FULL journey
  console.log('\n🔍 ABANDONED CHECKOUT JOURNEY RECONSTRUCTION:');
  console.log('(Showing all sessions that started checkout but never completed payment)\n');
  
  let journeyCount = 0;
  for (const sessId of abandonedSessions) {
    if (journeyCount >= 20) break; // Limit output
    
    // Get ALL telemetry events for this session (not just checkout events)
    const fullJourney = telemetry
      .filter(e => e.sessionId === sessId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    
    if (fullJourney.length === 0) continue;
    
    const firstEvent = fullJourney[0];
    const lastEvent = fullJourney[fullJourney.length - 1];
    const durationMs = new Date(lastEvent.timestamp).getTime() - new Date(firstEvent.timestamp).getTime();
    const durationMin = Math.round(durationMs / 60000);
    
    // Check if this is a real lead (has email/session associated with a lead)
    const matchingLead = leads.find(l => l.email === sessId || l.sessionId === sessId);
    
    console.log(`\n--- Session: ${sessId.substring(0, 30)}${sessId.length > 30 ? '...' : ''} ---`);
    if (matchingLead) {
      console.log(`   Matched Lead: ${matchingLead.email} (${matchingLead.name || 'Unknown'})`);
    }
    console.log(`   Duration: ${durationMin} minutes | Events: ${fullJourney.length}`);
    console.log(`   Traffic Quality: ${firstEvent.trafficQualityClassification || 'Unknown'}`);
    console.log(`   Referrer: ${firstEvent.referrer || 'Direct'}`);
    console.log(`   UTM: ${firstEvent.utmSource || '-'}/${firstEvent.utmMedium || '-'}/${firstEvent.utmCampaign || '-'}`);
    console.log(`   Journey:`);
    
    for (const ev of fullJourney) {
      const time = ev.timestamp ? new Date(ev.timestamp).toLocaleTimeString() : '?';
      console.log(`     ${time} | ${ev.eventName.padEnd(35)} | ${ev.pagePath || '/'}`);
    }
    
    // Identify likely abandonment reason
    const lastEventName = lastEvent.eventName;
    let reason = 'Unknown';
    if (lastEventName === 'payment_cancelled') reason = '💳 User explicitly cancelled payment';
    else if (lastEventName.includes('paywall') || lastEventName.includes('checkout_viewed')) reason = '👀 Saw pricing but did not proceed';
    else if (lastEventName.includes('checkout_started')) reason = '🛒 Started checkout but payment not completed';
    else if (lastEventName.includes('package_selected')) reason = '📦 Selected package but did not start payment';
    else if (lastEventName.includes('page_view')) reason = '📄 Browsed away without engaging checkout';
    
    console.log(`   ⚠️ ABANDONMENT REASON: ${reason}`);
    console.log(`   LAST ACTION: ${lastEventName} at ${lastEvent.pagePath || '/'}`);
    
    journeyCount++;
  }

  // 5. LEAD-TO-REVENUE PIPELINE SUMMARY
  console.log(`\n\n📊 SECTION 5: LEAD-TO-REVENUE PIPELINE SUMMARY`);
  console.log('=============================================');
  
  let totalBuyers = 0;
  let totalCheckoutStarters = 0;
  let totalCalcUsers = 0;
  let totalAiFinderUsers = 0;
  let totalContactLeads = 0;
  let totalNewsletterLeads = 0;
  
  for (const lead of leads) {
    const source = (lead.source || '').toLowerCase();
    if (source.includes('calculator')) totalCalcUsers++;
    if (source.includes('ai') && source.includes('finder')) totalAiFinderUsers++;
    if (source.includes('contact form')) totalContactLeads++;
    if (source.includes('newsletter')) totalNewsletterLeads++;
    
    let activity: any = {};
    try {
      if (lead.leadActivity && lead.leadActivity !== 'N/A' && lead.leadActivity !== '{}') {
        activity = JSON.parse(lead.leadActivity);
      }
    } catch (e) {}
    
    if (activity.checkoutStartedAt) totalCheckoutStarters++;
    if (lead.reportPurchased === true || lead.strategyReportPurchased === true || activity.paymentCompletedAt) {
      totalBuyers++;
    }
  }
  
  console.log(`| Metric | Count | Conversion Rate |`);
  console.log(`|---|---|---|`);
  console.log(`| Total Leads | ${leads.length} | 100% |`);
  console.log(`| Calculator Users | ${totalCalcUsers} | ${((totalCalcUsers / leads.length) * 100).toFixed(1)}% |`);
  console.log(`| AI Finder Users | ${totalAiFinderUsers} | ${((totalAiFinderUsers / leads.length) * 100).toFixed(1)}% |`);
  console.log(`| Contact Form Leads | ${totalContactLeads} | ${((totalContactLeads / leads.length) * 100).toFixed(1)}% |`);
  console.log(`| Newsletter Subscribers | ${totalNewsletterLeads} | ${((totalNewsletterLeads / leads.length) * 100).toFixed(1)}% |`);
  console.log(`| Checkout Starters | ${totalCheckoutStarters} | ${((totalCheckoutStarters / leads.length) * 100).toFixed(1)}% of leads |`);
  console.log(`| Buyers (Completed Purchase) | ${totalBuyers} | ${((totalBuyers / leads.length) * 100).toFixed(1)}% of leads |`);
  console.log(`| Lead-to-Buyer Rate | ${totalBuyers}/${leads.length} | ${((totalBuyers / leads.length) * 100).toFixed(2)}% |`);
  
  if (totalCheckoutStarters > 0) {
    console.log(`| Checkout-to-Purchase Rate | ${totalBuyers}/${totalCheckoutStarters} | ${((totalBuyers / totalCheckoutStarters) * 100).toFixed(1)}% |`);
  }

  console.log('\n\n=== AUDIT COMPLETE ===');
}

main().catch(console.error);
