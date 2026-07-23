import { config } from 'dotenv';
import { resolve } from 'path';

// Load env variables
config({ path: resolve(process.cwd(), '.env.local') });

import { getLeadsFromSheet } from '../lib/google-sheets';
import { getTelemetryEvents, TelemetryEvent } from '../lib/telemetry/telemetry-store';

interface LeadScoreCard {
  email: string;
  name: string;
  phone: string;
  source: string;
  timestamp: string;
  score: number;
  category: 'Hot' | 'Warm' | 'Cold';
  signals: string[];
  sessionCount: number;
  pageViews: number;
  calculatorSteps: number;
  pricingViews: number;
  checkoutStarts: number;
  maxSessionDurationMinutes: number;
}

async function main() {
  console.log("🚀 Running Telemetry-Driven B2B Lead Scoring & Prioritization...");
  try {
    const leads = await getLeadsFromSheet(1000);
    const telemetry = await getTelemetryEvents();

    console.log(`📊 Total Leads: ${leads.length}`);
    console.log(`📊 Total Telemetry Events: ${telemetry.length}`);

    // Map to group telemetry events by session ID
    const sessionEventsMap = new Map<string, TelemetryEvent[]>();
    // Map to associate emails with session IDs and direct email events
    const emailToSessions = new Map<string, Set<string>>();
    const emailDirectEvents = new Map<string, TelemetryEvent[]>();

    for (const event of telemetry) {
      const sessId = event.sessionId || '';
      if (sessId) {
        if (!sessionEventsMap.has(sessId)) {
          sessionEventsMap.set(sessId, []);
        }
        sessionEventsMap.get(sessId)!.push(event);

        // If the session ID itself is an email, map it
        if (sessId.includes('@')) {
          const email = sessId.toLowerCase().trim();
          if (!emailToSessions.has(email)) {
            emailToSessions.set(email, new Set());
          }
          emailToSessions.get(email)!.add(sessId);
        }
      }

      // Check if pagePath or heuristicMetadata contains emails, or if eventName is related
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

    // Map lead email to their respective leads for matching
    const leadsMap = new Map<string, typeof leads[0]>();
    for (const lead of leads) {
      if (lead.email) {
        leadsMap.set(lead.email.toLowerCase().trim(), lead);
      }
    }

    const scoredLeads: LeadScoreCard[] = [];

    for (const [email, lead] of leadsMap.entries()) {
      let score = 50; // Lead form submitted = +50 base score
      const signals: string[] = ['Lead form submitted (+50)'];
      
      const sessions = emailToSessions.get(email) || new Set<string>();
      
      // Also look for sessions that contain events where email was used
      let pageViews = 0;
      let calculatorSteps = 0;
      let pricingViews = 0;
      let checkoutStarts = 0;
      let maxSessionDurationMs = 0;
      const uniquePages = new Set<string>();

      // Pull all events for all sessions linked to this email
      const allEvents: TelemetryEvent[] = [];
      
      // If the email itself was used as a session ID
      if (sessionEventsMap.has(email)) {
        allEvents.push(...sessionEventsMap.get(email)!);
      }

      for (const sessId of sessions) {
        if (sessionEventsMap.has(sessId)) {
          allEvents.push(...sessionEventsMap.get(sessId)!);
        }
      }

      // If we have telemetry events for this lead
      if (allEvents.length > 0) {
        // Group by session to calculate durations
        const eventsBySession = new Map<string, TelemetryEvent[]>();
        for (const ev of allEvents) {
          const sId = ev.sessionId || email;
          if (!eventsBySession.has(sId)) {
            eventsBySession.set(sId, []);
          }
          eventsBySession.get(sId)!.push(ev);
        }

        // Calculate session durations
        for (const [sId, evs] of eventsBySession.entries()) {
          const timestamps = evs
            .map(e => new Date(e.timestamp).getTime())
            .filter(t => !isNaN(t));
          if (timestamps.length > 1) {
            const duration = Math.max(...timestamps) - Math.min(...timestamps);
            if (duration > maxSessionDurationMs) {
              maxSessionDurationMs = duration;
            }
          }
        }

        // Process event types
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

      // Apply Scoring Matrix
      if (checkoutStarts > 0) {
        score += 40;
        signals.push(`Reached checkout (+40)`);
      }
      if (calculatorSteps > 0) {
        score += 30;
        signals.push(`Used a calculator (+30)`);
      }
      if (pricingViews > 0) {
        score += 25;
        signals.push(`Viewed pricing/product page (+25)`);
      }
      if (uniquePages.size >= 3) {
        score += 15;
        signals.push(`Visited 3+ unique pages (+15)`);
      }
      if (maxSessionDurationMs > 5 * 60 * 1000) {
        score += 15;
        signals.push(`Session duration > 5 minutes (+15)`);
      }
      if (sessions.size > 1) {
        score += 20;
        signals.push(`Multiple return visits (+20)`);
      }

      // Determine Category
      let category: 'Hot' | 'Warm' | 'Cold' = 'Cold';
      if (score >= 80) category = 'Hot';
      else if (score >= 50) category = 'Warm';

      scoredLeads.push({
        email,
        name: lead.name && lead.name !== 'N/A' ? lead.name : 'Unknown Founder',
        phone: lead.phone && lead.phone !== 'N/A' ? lead.phone : 'N/A',
        source: lead.source || 'Unknown',
        timestamp: lead.timestamp || '',
        score,
        category,
        signals,
        sessionCount: Math.max(1, sessions.size),
        pageViews,
        calculatorSteps,
        pricingViews,
        checkoutStarts,
        maxSessionDurationMinutes: Math.round(maxSessionDurationMs / (60 * 1000)),
      });
    }

    // Sort by Score descending
    scoredLeads.sort((a, b) => b.score - a.score);

    const hotLeads = scoredLeads.filter(l => l.category === 'Hot');
    const warmLeads = scoredLeads.filter(l => l.category === 'Warm');
    const coldLeads = scoredLeads.filter(l => l.category === 'Cold');

    console.log(`\n🔥 HOT Leads (Score 80+): ${hotLeads.length}`);
    console.log(`🟡 WARM Leads (Score 50-79): ${warmLeads.length}`);
    console.log(`❄️ COLD Leads (Score <50): ${coldLeads.length}`);

    console.log("\n================================================================================");
    console.log("                      TOP 15 PRIORITY SHORTLISTED B2B LEADS                      ");
    console.log("================================================================================");
    
    scoredLeads.slice(0, 15).forEach((l, index) => {
      console.log(`\n[${index + 1}] Lead: ${l.name} (${l.email})`);
      console.log(`    Phone: ${l.phone} | Source: ${l.source}`);
      console.log(`    Priority Score: ⭐ ${l.score} [${l.category}]`);
      console.log(`    Sessions: ${l.sessionCount} | Views: ${l.pageViews} | Calculator Steps: ${l.calculatorSteps} | Pricing Views: ${l.pricingViews}`);
      console.log(`    Max Session Time: ${l.maxSessionDurationMinutes} min | Checkout Starts: ${l.checkoutStarts}`);
      console.log(`    Behavioral Signals: ${l.signals.join(', ')}`);
    });

  } catch (err) {
    console.error("Critical error in scoring lead telemetry:", err);
  }
}

main();
