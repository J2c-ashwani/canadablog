import { RevenueSprintService } from '../lib/leads/revenue-sprint-service';

async function main() {
  const result = await RevenueSprintService.processBatch(20, true);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
