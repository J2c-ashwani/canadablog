/**
 * FSI Digital — Multi-Touch Reactivation Campaign CLI Runner
 * 
 * Usage:
 *   npx tsx scripts/run-reactivation-campaign.ts --dry-run
 *   npx tsx scripts/run-reactivation-campaign.ts --execute --limit=25
 *   npx tsx scripts/run-reactivation-campaign.ts --execute --limit=25 --max=60
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env.production.local' });

import { MultiTouchReactivationEngine } from '../lib/leads/MultiTouchReactivationEngine';

async function main() {
  const args = process.argv.slice(2);
  const isExecute = args.includes('--execute');
  const dryRun = !isExecute;

  const limitArg = args.find(a => a.startsWith('--limit='));
  const touch1Limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 25;

  const maxArg = args.find(a => a.startsWith('--max='));
  const maxTotalLimit = maxArg ? parseInt(maxArg.split('=')[1], 10) : 60;

  console.log('════════════════════════════════════════════════════════════════════');
  console.log(`🚀 MULTI-TOUCH REACTIVATION RUNNER`);
  console.log(`   Execution Mode: ${dryRun ? '🔍 DRY RUN (Simulation - Zero emails sent)' : '⚡ LIVE DISPATCH'}`);
  console.log(`   Touch 1 Ingest Limit: ${touch1Limit}`);
  console.log(`   Maximum Daily Dispatch Ceiling: ${maxTotalLimit}`);
  console.log('════════════════════════════════════════════════════════════════════\n');

  try {
    const result = await MultiTouchReactivationEngine.executeDailyRun({
      dryRun,
      touch1Limit,
      maxTotalLimit,
    });

    console.log('📊 EXECUTION SUMMARY REPORT:');
    console.log(`   - Success: ${result.success}`);
    console.log(`   - Total Loaded DB Rows: ${result.totalLoadedRows}`);
    console.log(`   - Total Qualified Reactivation Pool: ${result.totalQualifiedPool}`);
    console.log(`   - Dispatched Touch 1 (The Funding Leak Receipt): ${result.dispatchedTouch1}`);
    console.log(`   - Dispatched Touch 2 (Pre-Fiscal Allocation Notice): ${result.dispatchedTouch2}`);
    console.log(`   - Dispatched Touch 3 (Advisory Closeout Memo): ${result.dispatchedTouch3}`);
    console.log(`   - Total Emails Sent: ${result.totalDispatched}`);
    console.log(`   - Resend Quota Remaining Today: ${result.dailyQuotaRemaining}/100\n`);

    if (result.errors.length > 0) {
      console.warn(`⚠️ Errors encountered during dispatch:`, result.errors);
    }
  } catch (err: any) {
    console.error('❌ Fatal error running campaign:', err?.message || err);
    process.exit(1);
  }
}

main();
