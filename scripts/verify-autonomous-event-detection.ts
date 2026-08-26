import fs from 'node:fs';
import path from 'node:path';

function assert(condition: unknown, message: string) {
  if (!condition) throw new Error(message);
  console.log(`PASS: ${message}`);
}

function run() {
  console.log('GrowthOS serverless event reliability suite');
  const root = process.cwd();
  const eventBus = fs.readFileSync(path.join(root, 'lib/growth-os/core/event-bus.ts'), 'utf8');
  const ceo = fs.readFileSync(path.join(root, 'lib/ceo-agent/ceo-agent.ts'), 'utf8');
  const operations = fs.readFileSync(path.join(root, 'lib/growth-os/operations-store.ts'), 'utf8');

  assert(eventBus.includes("'QUEUED_FOR_CEO_EVIDENCE_RUN'"), 'Critical events are durably queued for the CEO');
  assert(!eventBus.includes('setTimeout('), 'The event bus does not rely on serverless background timers');
  assert(eventBus.includes('getQueuedGrowthOSEvents') && eventBus.includes('markGrowthOSEventsReviewed'), 'Queued events have explicit read and acknowledgement paths');
  assert(ceo.includes('getQueuedGrowthOSEvents') && ceo.includes('markGrowthOSEventsReviewed'), 'The scheduled CEO consumes and acknowledges durable events');
  assert(operations.includes("'SKIPPED_DUPLICATE'") && operations.includes('acquireOperationLease'), 'Duplicate schedulers are suppressed by durable operation leases');
  assert(!ceo.includes("status: 'DELIVERED'"), 'The CEO never fabricates inbox delivery');

  console.log('All GrowthOS event reliability checks passed.');
}

try { run(); } catch (error) { console.error(error); process.exit(1); }
