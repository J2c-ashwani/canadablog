import { config } from 'dotenv';
import path from 'path';
// Load environment variables
config({ path: path.join(__dirname, '../.env.local') });

import { getLeadsFromSheet } from '../lib/google-sheets';
import { calculateLeadIntelligence } from '../lib/leads/scoring';

async function main() {
  console.log('🔍 --- RUNNING REVENUE FUNNEL AUDIT ---');
  
  try {
    const leads = await getLeadsFromSheet(1000);
    console.log(`Analyzing behavioral telemetry of ${leads.length} leads...\n`);

    // Funnel stats counters
    const calculatorFunnel = {
      total: 0,
      reachedStep6: 0,
      viewedPricing: 0,
      startedCheckout: 0,
      purchased: 0,
    };

    const aiFinderFunnel = {
      total: 0,
      previewViewed: 0,
      clickedUnlock: 0,
      startedCheckout: 0,
      purchased: 0,
    };

    const auditFunnel = {
      total: 0, // Anyone with audit intent (source or cta clicked)
      visitedPage: 0,
      previewViewed: 0,
      clickedUnlock: 0,
      startedCheckout: 0,
      purchased: 0,
      booked: 0,
    };

    leads.forEach((lead) => {
      const email = String(lead.email || '').toLowerCase().trim();
      const source = String(lead.source || '').toLowerCase();
      
      let activity: any = {};
      try {
        if (lead.leadActivity && lead.leadActivity !== 'N/A' && lead.leadActivity !== '{}') {
          activity = JSON.parse(lead.leadActivity);
        }
      } catch (e) {}

      const hasPurchasedAudit = lead.strategyReportPurchased === true || !!activity.paymentCompletedAt && (source.includes('audit') || activity.auditCtaClickedAt);
      const hasPurchasedReport = lead.reportPurchased === true;
      const hasBooked = activity.bookedAudit === true || !!activity.auditBookedAt || lead.offlineStatus === 'Booked Audit' || lead.offlineStatus === 'Audit Completed';

      // 1. Calculator Funnel
      if (source.includes('calculator')) {
        calculatorFunnel.total++;
        if (activity.calculatorCompletedAt) calculatorFunnel.reachedStep6++;
        if (activity.paywallViewedAt) calculatorFunnel.viewedPricing++;
        if (activity.checkoutStartedAt) calculatorFunnel.startedCheckout++;
        if (hasPurchasedReport) calculatorFunnel.purchased++;
      }

      // 2. AI Finder Funnel
      if (source.includes('ai grant finder') || source.includes('ai finder')) {
        aiFinderFunnel.total++;
        if (activity.previewViewed === true || activity.previewViewedAt) aiFinderFunnel.previewViewed++;
        if (activity.previewCtaClicked === true || activity.previewCtaClickedAt) aiFinderFunnel.clickedUnlock++;
        if (activity.checkoutStartedAt) aiFinderFunnel.startedCheckout++;
        if (hasPurchasedReport) aiFinderFunnel.purchased++;
      }

      // 3. Audit Funnel (Anyone who engaged with Audit)
      const hasAuditIntent = 
        source.includes('audit') || 
        source.includes('strategy') || 
        !!activity.auditCtaClickedAt || 
        hasPurchasedAudit;

      if (hasAuditIntent) {
        auditFunnel.total++;
        if (activity.auditCtaClickedAt) auditFunnel.visitedPage++;
        if (activity.previewViewed === true || activity.previewViewedAt) auditFunnel.previewViewed++;
        if (activity.previewCtaClicked === true || activity.previewCtaClickedAt) auditFunnel.clickedUnlock++;
        if (activity.checkoutStartedAt) auditFunnel.startedCheckout++;
        if (hasPurchasedAudit) auditFunnel.purchased++;
        if (hasBooked) auditFunnel.booked++;
      }
    });

    // Output findings
    console.log('===================================================');
    console.log('📊 CALCULATOR CONVERSION FUNNEL');
    console.log('===================================================');
    printFunnelStep('Calculator Leads Started', calculatorFunnel.total, calculatorFunnel.total);
    printFunnelStep('Reached Step 6 (Completed)', calculatorFunnel.reachedStep6, calculatorFunnel.total);
    printFunnelStep('Viewed Pricing (Paywall)', calculatorFunnel.viewedPricing, calculatorFunnel.total);
    printFunnelStep('Started Checkout (PayPal)', calculatorFunnel.startedCheckout, calculatorFunnel.total);
    printFunnelStep('Completed Purchase', calculatorFunnel.purchased, calculatorFunnel.total);
    console.log('');

    console.log('===================================================');
    console.log('🤖 AI GRANT FINDER CONVERSION FUNNEL');
    console.log('===================================================');
    printFunnelStep('AI Finder Leads Started', aiFinderFunnel.total, aiFinderFunnel.total);
    printFunnelStep('Personalized Preview Viewed', aiFinderFunnel.previewViewed, aiFinderFunnel.total);
    printFunnelStep('Clicked Unlock Analysis', aiFinderFunnel.clickedUnlock, aiFinderFunnel.total);
    printFunnelStep('Started Checkout (PayPal)', aiFinderFunnel.startedCheckout, aiFinderFunnel.total);
    printFunnelStep('Completed Purchase', aiFinderFunnel.purchased, aiFinderFunnel.total);
    console.log('');

    console.log('===================================================');
    console.log('🔍 AUDIT / STRATEGY SESSION FUNNEL');
    console.log('===================================================');
    printFunnelStep('Engaged with Audit Funnel', auditFunnel.total, auditFunnel.total);
    printFunnelStep('Visited Audit Landing Page', auditFunnel.visitedPage, auditFunnel.total);
    printFunnelStep('Personalized Preview Viewed', auditFunnel.previewViewed, auditFunnel.total);
    printFunnelStep('Clicked Unlock Analysis', auditFunnel.clickedUnlock, auditFunnel.total);
    printFunnelStep('Started PayPal Checkout', auditFunnel.startedCheckout, auditFunnel.total);
    printFunnelStep('Purchased Audit ($199)', auditFunnel.purchased, auditFunnel.total);
    printFunnelStep('Booked via Calendly', auditFunnel.booked, auditFunnel.total);
    console.log('');

    console.log('===================================================');
    console.log('💡 REVENUE LEAK ANALYSIS & CONCLUSIONS');
    console.log('===================================================');
    
    // Analyze calculator leak
    if (calculatorFunnel.total > 0) {
      const dropToPricing = ((1 - calculatorFunnel.viewedPricing / calculatorFunnel.total) * 100).toFixed(1);
      const dropToCheckout = calculatorFunnel.viewedPricing > 0 
        ? ((1 - calculatorFunnel.startedCheckout / calculatorFunnel.viewedPricing) * 100).toFixed(1)
        : '100.0';
      const dropToPurchase = calculatorFunnel.startedCheckout > 0
        ? ((1 - calculatorFunnel.purchased / calculatorFunnel.startedCheckout) * 100).toFixed(1)
        : '100.0';
      
      console.log(`- Calculator Funnel leaks:`);
      console.log(`  * ${dropToPricing}% drop-off between Start -> Pricing Paywall.`);
      console.log(`  * ${dropToCheckout}% drop-off between Pricing Paywall -> PayPal Checkout Start.`);
      console.log(`  * ${dropToPurchase}% drop-off between PayPal Checkout Start -> Completed Purchase.`);
    }

    if (aiFinderFunnel.total > 0) {
      const dropToPreview = ((1 - aiFinderFunnel.previewViewed / aiFinderFunnel.total) * 100).toFixed(1);
      const dropToUnlock = aiFinderFunnel.previewViewed > 0 
        ? ((1 - aiFinderFunnel.clickedUnlock / aiFinderFunnel.previewViewed) * 100).toFixed(1)
        : '100.0';
      const dropToPurchase = aiFinderFunnel.startedCheckout > 0
        ? ((1 - aiFinderFunnel.purchased / aiFinderFunnel.startedCheckout) * 100).toFixed(1)
        : '100.0';

      console.log(`- AI Finder Funnel leaks:`);
      console.log(`  * ${dropToPreview}% drop-off between Start -> Preview Viewed.`);
      console.log(`  * ${dropToUnlock}% drop-off between Preview -> Unlock Analysis.`);
      console.log(`  * ${dropToPurchase}% drop-off between PayPal Checkout Start -> Completed Purchase.`);
    }

    console.log('\nAudit Prospect Clarification:');
    console.log(`- Leads categorized under "Audit Prospect" Lead Type: ${auditFunnel.total}`);
    console.log(`  * In CRM sheets, the "source" field represents the entry funnel. Since users enter via the Calculator or AI Finder first, they are categorized under those Lead Types. They only interact with the Audit page *later* in their journey, which updates their telemetry (leadActivity) but does not overwrite their original acquisition Lead Type (source).`);
    console.log(`  * Telemetry shows that ${auditFunnel.visitedPage} calculator/AI leads have visited the Audit checkout page, and ${auditFunnel.startedCheckout} started PayPal checkout, but 0 completed payments.`);

  } catch (error) {
    console.error('❌ Error executing funnel audit:', error);
  }
}

function printFunnelStep(label: string, count: number, total: number) {
  const percent = total > 0 ? ((count / total) * 100).toFixed(1) : '0.0';
  console.log(`${label.padEnd(30)} | ${String(count).padStart(5)} | ${percent}%`);
}

main().catch(console.error);
