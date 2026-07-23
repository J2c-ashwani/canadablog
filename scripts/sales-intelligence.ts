import { config } from 'dotenv';
import { resolve } from 'path';

// Load environmental variables
config({ path: resolve(process.cwd(), '.env.local') });

import { getLeadsFromSheet } from '../lib/google-sheets';
import { getTelemetryEvents, TelemetryEvent } from '../lib/telemetry/telemetry-store';

interface LeadPriorityCard {
  email: string;
  name: string;
  phone: string;
  companyName: string;
  country: string;
  state: string;
  industry: string;
  companySize: string;
  fundingAmount: string;
  source: string;
  behaviorScore: number;
  icpScore: number;
  priorityScore: number;
  sessionCount: number;
  pageViews: number;
  checkoutStarts: number;
  calculatorSteps: number;
  pricingViews: number;
  signals: string[];
  personalizedEmail: string;
}

// Map regions to formatted names
const regionMap: Record<string, string> = {
  ON: 'Ontario',
  AB: 'Alberta',
  BC: 'British Columbia',
  QC: 'Quebec',
  SK: 'Saskatchewan',
  MB: 'Manitoba',
  NS: 'Nova Scotia',
  NB: 'New Brunswick',
  PE: 'Prince Edward Island',
  NL: 'Newfoundland and Labrador',
};

async function main() {
  console.log("📊 Running B2B Sales Intelligence Lead Scoring Engine (Behavior + ICP)...");
  try {
    const leads = await getLeadsFromSheet(1000);
    const telemetry = await getTelemetryEvents();

    // Map telemetry events by session ID
    const sessionEventsMap = new Map<string, TelemetryEvent[]>();
    const emailToSessions = new Map<string, Set<string>>();

    for (const event of telemetry) {
      const sessId = event.sessionId || '';
      if (sessId) {
        if (!sessionEventsMap.has(sessId)) {
          sessionEventsMap.set(sessId, []);
        }
        sessionEventsMap.get(sessId)!.push(event);

        if (sessId.includes('@')) {
          const email = sessId.toLowerCase().trim();
          if (!emailToSessions.has(email)) {
            emailToSessions.set(email, new Set());
          }
          emailToSessions.get(email)!.add(sessId);
        }
      }

      const pagePath = event.pagePath || '';
      if (pagePath.includes('email=')) {
        const match = pagePath.match(/email=([^&]+)/);
        if (match && match[1]) {
          const email = decodeURIComponent(match[1]).toLowerCase().trim();
          if (email.includes('@')) {
            if (!emailToSessions.has(email)) {
              emailToSessions.set(email, new Set());
            }
            if (sessId) emailToSessions.get(email)!.add(sessId);
          }
        }
      }
    }

    const priorityLeads: LeadPriorityCard[] = [];

    for (const lead of leads) {
      if (!lead.email) continue;
      const email = lead.email.toLowerCase().trim();

      // ── 1. BEHAVIOR SCORE CALCULATION (Max 100) ──
      let behaviorScore = 50; // Base for form submission
      const behaviorSignals: string[] = ['Lead form submitted (+50)'];
      
      const sessions = emailToSessions.get(email) || new Set<string>();
      let pageViews = 0;
      let calculatorSteps = 0;
      let pricingViews = 0;
      let checkoutStarts = 0;
      let maxSessionDurationMs = 0;
      const uniquePages = new Set<string>();
      const allEvents: TelemetryEvent[] = [];

      if (sessionEventsMap.has(email)) {
        allEvents.push(...sessionEventsMap.get(email)!);
      }
      for (const sId of sessions) {
        if (sessionEventsMap.has(sId)) {
          allEvents.push(...sessionEventsMap.get(sId)!);
        }
      }

      if (allEvents.length > 0) {
        const eventsBySession = new Map<string, TelemetryEvent[]>();
        for (const ev of allEvents) {
          const sId = ev.sessionId || email;
          if (!eventsBySession.has(sId)) {
            eventsBySession.set(sId, []);
          }
          eventsBySession.get(sId)!.push(ev);
        }

        for (const [sId, evs] of eventsBySession.entries()) {
          const timestamps = evs.map(e => new Date(e.timestamp).getTime()).filter(t => !isNaN(t));
          if (timestamps.length > 1) {
            const dur = Math.max(...timestamps) - Math.min(...timestamps);
            if (dur > maxSessionDurationMs) maxSessionDurationMs = dur;
          }
        }

        for (const ev of allEvents) {
          pageViews++;
          if (ev.pagePath) {
            uniquePages.add(ev.pagePath);
            if (ev.pagePath.includes('pricing') || ev.pagePath.includes('products')) {
              pricingViews++;
            }
          }
          if (ev.eventName.includes('calculator_step_') || ev.eventName === 'calculator_started') {
            calculatorSteps++;
          }
          if (ev.eventName === 'checkout_started' || ev.eventName === 'checkout_viewed') {
            checkoutStarts++;
          }
        }
      }

      if (checkoutStarts > 0) { behaviorScore += 40; behaviorSignals.push('Checkout viewed (+40)'); }
      if (calculatorSteps > 0) { behaviorScore += 30; behaviorSignals.push('Calculator completed (+30)'); }
      if (pricingViews > 0) { behaviorScore += 20; behaviorSignals.push('Pricing page viewed (+20)'); }
      if (uniquePages.size >= 3) { behaviorScore += 15; behaviorSignals.push('Visited 3+ pages (+15)'); }
      if (maxSessionDurationMs > 5 * 60 * 1000) { behaviorScore += 15; behaviorSignals.push('Session > 5 minutes (+15)'); }
      if (sessions.size > 1) { behaviorScore += 20; behaviorSignals.push('Multiple return visits (+20)'); }

      behaviorScore = Math.min(100, behaviorScore);

      // ── 2. ICP SCORE CALCULATION (Max 100) ──
      let icpScore = 10; // Base score
      const icpSignals: string[] = [];

      const country = lead.country ? lead.country.toUpperCase().trim() : 'N/A';
      if (country === 'CANADA' || country === 'CAN' || country === 'USA' || country === 'US') {
        icpScore += 30;
        icpSignals.push(`Top-tier market: ${country} (+30)`);
      }

      const size = lead.companySize || 'N/A';
      if (size === '10-49') { icpScore += 20; icpSignals.push('Medium B2B (10-49 team) (+20)'); }
      else if (size === '50-99') { icpScore += 30; icpSignals.push('High-value scaleup (50-99 team) (+30)'); }
      else if (size === '100-499' || size === '500+') { icpScore += 40; icpSignals.push('Enterprise lead (+40)'); }

      const ind = lead.industry ? lead.industry.toLowerCase().trim() : 'N/A';
      if (['technology', 'tech', 'software'].some(x => ind.includes(x))) { icpScore += 25; icpSignals.push('Tech B2B sector (+25)'); }
      else if (['manufacturing', 'industrial'].some(x => ind.includes(x))) { icpScore += 25; icpSignals.push('Manufacturing sector (+25)'); }
      else if (['healthcare', 'medical', 'pharma'].some(x => ind.includes(x))) { icpScore += 25; icpSignals.push('Healthcare sector (+25)'); }
      else if (['agriculture', 'food'].some(x => ind.includes(x))) { icpScore += 20; icpSignals.push('Agriculture sector (+20)'); }

      const amount = lead.fundingAmount || 'N/A';
      if (['100k', '500k'].some(x => amount.toLowerCase().includes(x))) { icpScore += 20; icpSignals.push('Significant funding intent (+20)'); }
      else if (['1m', 'million'].some(x => amount.toLowerCase().includes(x))) { icpScore += 30; icpSignals.push('High-value funding ticket (+30)'); }

      icpScore = Math.min(100, icpScore);

      // ── 3. OVERALL PRIORITY SCORE (Weighted average) ──
      const priorityScore = Math.round((behaviorScore + icpScore) / 2);

      // ── 4. PERSONALIZED EMAIL COPY GENERATION ──
      const name = lead.name && lead.name !== 'N/A' ? lead.name.split(' ')[0] : 'Founder';
      const industryPhrase = ind !== 'n/a' && ind !== 'other' ? `${ind} technology` : 'business operations';
      
      const stateCode = lead.state || 'ON';
      const provincePhrase = regionMap[stateCode] ? `in ${regionMap[stateCode]}` : '';

      let contextHook = 'I was reviewing your government grant assessment inquiry on FSI Digital.';
      if (calculatorSteps > 0) {
        contextHook = `I noticed you explored our interactive funding calculators to estimate potential non-repayable B2B grants for your business ${provincePhrase}.`;
      }
      
      let specificRecommendations = 'Based on your operational focus, there are several regional innovation funding programs currently open that B2B startups are utilizing to stack capital.';
      if (ind.includes('tech') || ind.includes('software')) {
        specificRecommendations = 'Based on your software technology focus, you should be stacking both the **IRAP R&D Grant** (supporting salary costs) and provincial tax credits to cover development milestones.';
      } else if (ind.includes('manufacturing')) {
        specificRecommendations = 'Since manufacturing capital is highly subsidized in Canada, you should evaluate the **Aero-Space or Green Tech Manufacturing Initiatives** to offset capital expenditure and machinery purchases.';
      }

      const personalizedEmail = `Subject: Quick question regarding B2B grant eligibility for your business

Hi ${name},

${contextHook}

${specificRecommendations}

I've put together a personalized eligibility diagnostic outlining the top 3 high-probability programs for B2B firms matching your B2B profile. Let me know if you have 10 minutes next Tuesday for a quick strategy call to review these options.

You can also lock in your strategy session directly on our booking calendar if you'd like to secure a slot: https://www.fsidigital.ca/booking

Best regards,

Ashwani Kumar
Founder & CEO, FSI Digital`;

      priorityLeads.push({
        email,
        name: lead.name && lead.name !== 'N/A' ? lead.name : 'Unknown Founder',
        phone: lead.phone && lead.phone !== 'N/A' ? lead.phone : 'N/A',
        companyName: lead.companyName && lead.companyName !== 'N/A' ? lead.companyName : 'B2B Founder',
        country: lead.country || 'N/A',
        state: lead.state || 'N/A',
        industry: lead.industry || 'N/A',
        companySize: lead.companySize || 'N/A',
        fundingAmount: lead.fundingAmount || 'N/A',
        source: lead.source || 'Registration',
        behaviorScore,
        icpScore,
        priorityScore,
        sessionCount: Math.max(1, sessions.size),
        pageViews,
        checkoutStarts,
        calculatorSteps,
        pricingViews,
        signals: [...behaviorSignals, ...icpSignals],
        personalizedEmail,
      });
    }

    // Sort by Overall Priority Score
    priorityLeads.sort((a, b) => b.priorityScore - a.priorityScore);

    console.log(`\n✅ Total Priority Scored B2B Leads: ${priorityLeads.length}`);
    
    console.log("\n================================================================================");
    console.log("                     TOP 10 HIGH-PRIORITY B2B TARGET LEADS                      ");
    console.log("================================================================================");

    priorityLeads.slice(0, 10).forEach((l, index) => {
      console.log(`\n[${index + 1}] Lead: ${l.name} | Company: ${l.companyName} (${l.email})`);
      console.log(`    Phone: ${l.phone} | Market: ${l.country}-${l.state} | Industry: ${l.industry} | Team: ${l.companySize}`);
      console.log(`    Priority Score: ⭐ ${l.priorityScore} (Behavior: ${l.behaviorScore} | ICP: ${l.icpScore})`);
      console.log(`    Engagement: ${l.pageViews} views | ${l.sessionCount} sessions | ${l.calculatorSteps} calc steps | ${l.checkoutStarts} checkout starts`);
      console.log(`    Signals: ${l.signals.join(', ')}`);
      console.log(`    --- Personalized B2B Outreach Draft ---`);
      console.log(l.personalizedEmail);
      console.log(`    --------------------------------------`);
    });

  } catch (err) {
    console.error("Critical error running sales intelligence engine:", err);
  }
}

main();
