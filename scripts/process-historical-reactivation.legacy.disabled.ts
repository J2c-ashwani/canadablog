import { config } from 'dotenv';
config({ path: '.env.local' });

import { HistoricalReactivationEngine } from '@/lib/leads/HistoricalReactivationEngine';

async function run() {
  try {
    const args = process.argv.slice(2);
    const dryRun = args.includes('--dry-run') || args.includes('--dry');
    const limitArg = args.find(arg => arg.startsWith('--limit='));
    const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 70;

    console.log(`🚀 Starting historical reactivation batch (limit: ${limit}, dryRun: ${dryRun}) via CLI...`);
    const result = await HistoricalReactivationEngine.processDailyBatch(limit, dryRun);
    console.log(`✅ Reactivation Batch ${dryRun ? "Simulation" : ""} completed successfully!`);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("❌ Failed to run reactivation batch:", err);
  }
}

run();
