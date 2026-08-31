import { reconcileBrevoDeliveryEvents } from '../lib/emails/brevo-reconciliation';

async function main() {
  const result = await reconcileBrevoDeliveryEvents({ maxEvents: 1000 });
  console.log(JSON.stringify(result, null, 2));
  if (result.skipped && result.eligible > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(JSON.stringify({ error: error?.message || String(error) }));
  process.exitCode = 1;
});
