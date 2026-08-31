import { reconcileResendDeliveryEvents } from '../lib/emails/resend-reconciliation';

async function main() {
  const result = await reconcileResendDeliveryEvents({ maxPages: 20 });
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
