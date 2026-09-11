import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readWithQuotaRetry } from '../lib/sheets-read-retry';

async function main() {
  let attempts = 0;
  const delays: number[] = [];
  const result = await readWithQuotaRetry(async () => {
    attempts++;
    if (attempts < 3) throw { response: { status: 429 } };
    return ['verified-ledger-row'];
  }, async (ms) => { delays.push(ms); });
  assert.deepEqual(result, ['verified-ledger-row']);
  assert.equal(attempts, 3);
  assert.ok(delays[0] >= 1000 && delays[0] < 1500);
  assert.ok(delays[1] >= 2000 && delays[1] < 2500);
  for (const status of [401, 403, 404, 429, 503]) {
    attempts = 0;
    const failure = { status };
    await assert.rejects(readWithQuotaRetry(async () => {
      attempts++;
      throw failure;
    }, async () => {}), (error) => error === failure);
    assert.equal(attempts, [429, 503].includes(status) ? 3 : 1);
  }
  console.log('PASS: transient reads retry with bounded backoff; permanent/exhausted failures remain errors.');
  // Source guards complement the executable retry tests; they do not simulate
  // provider availability or establish a successful live recovery run.
  const intentSource = readFileSync('lib/payments/product-payment-intents.ts', 'utf8');
  for (const functionName of ['findIntent', 'getAllProductPaymentIntents']) {
    const body = intentSource.split(`function ${functionName}(`)[1]?.split('\n}')[0];
    assert.ok(body, `${functionName} exists`);
    assert.ok(body.includes('getSheetContext()'));
    assert.ok(!body.includes('ensureSheet()'), 'Ledger reads must not create or rewrite sheet headers');
    assert.ok(body.includes('readWithQuotaRetry('));
  }
  const recoverySource = readFileSync('lib/leads/cart-recovery-service.ts', 'utf8');
  assert.ok(recoverySource.includes('getAllPurchases({ strict: true })'), 'Recovery must fail closed when purchase evidence is unavailable');
  const routeSource = readFileSync('app/api/cron/process-cart-recovery/route.ts', 'utf8');
  assert.ok(routeSource.includes("finishOperationLease(lease, 'FAILED'"), 'Failed runs must attempt to finalize their lease');
  console.log('PASS: source guards preserve read-only intent lookup, strict buyer evidence, and failed-run finalization.');
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
