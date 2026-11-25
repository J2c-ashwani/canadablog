import fs from 'node:fs';
import path from 'node:path';
import { classifyInboundText } from '../lib/agents/closed-loop-reply-agent';
import { normalizeBrevoEvent } from '../lib/emails/delivery-events';

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
  const closedLoop = fs.readFileSync(path.join(root, 'lib/agents/closed-loop-reply-agent.ts'), 'utf8');
  const sponsoredMedia = fs.readFileSync(path.join(root, 'lib/agents/sponsored-media-agent.ts'), 'utf8');
  const monitorAgent = fs.readFileSync(path.join(root, 'lib/agents/campaign-monitor-agent.ts'), 'utf8');

  assert(eventBus.includes("'QUEUED_FOR_CEO_EVIDENCE_RUN'"), 'Critical events are durably queued for the CEO');
  assert(!eventBus.includes('setTimeout('), 'The event bus does not rely on serverless background timers');
  assert(eventBus.includes('getQueuedGrowthOSEvents') && eventBus.includes('markGrowthOSEventsReviewed'), 'Queued events have explicit read and acknowledgement paths');
  assert(ceo.includes('getQueuedGrowthOSEvents') && ceo.includes('markGrowthOSEventsReviewed'), 'The scheduled CEO consumes and acknowledges durable events');
  assert(operations.includes("'SKIPPED_DUPLICATE'") && operations.includes('acquireOperationLease'), 'Duplicate schedulers are suppressed by durable operation leases');
  assert(!ceo.includes("status: 'DELIVERED'"), 'The CEO never fabricates inbox delivery');

  // Inbound reply classification & anti-spam guards
  assert(classifyInboundText('Not happening I told you what i need\nRe: Starter Pilot') === 'COUNTER_OR_OBJECTION', 'Hard pushback classifies as COUNTER_OR_OBJECTION instead of auto-sending canned pilot checkout');
  assert(classifyInboundText("I'll but 300 30 day aged leads for $1 usd each to start.\nRe: Starter Pilot") === 'COUNTER_OR_OBJECTION', 'Counter-offer pricing classifies as COUNTER_OR_OBJECTION for founder escalation');
  assert(closedLoop.includes('inbound_reply_handled_ledger') && closedLoop.includes('matchedPartner?.lastFollowup'), 'Inbound replies across Partners and Leads share a durable dedupe ledger');
  assert(monitorAgent.includes('/emails/receiving/${encodeURIComponent(item.id)}'), 'CampaignMonitor hydrates Resend inbound receiving bodies instead of leaving snippets empty');

  // Sponsor booking links must point to live 200 endpoints, never the 404 /advertise/order? query path
  assert(!closedLoop.includes('fsidigital.ca/advertise/order?'), 'ClosedLoopReplyAgent contains no 404 /advertise/order query URLs');
  assert(!sponsoredMedia.includes('fsidigital.ca/advertise/order?'), 'SponsoredMediaAgent contains no 404 /advertise/order query URLs');

  // Brevo polling must capture plural hardBounces/softBounces for auto-suppression
  assert(
    normalizeBrevoEvent({ event: 'hardBounces', email: 'bounce@example.com', messageId: 'm1' })?.eventType === 'email.bounced' &&
    normalizeBrevoEvent({ event: 'softBounces', email: 'soft@example.com', messageId: 'm2' })?.eventType === 'email.bounced',
    'Brevo polling normalizes hardBounces and softBounces into email.bounced suppression events'
  );

  console.log('All GrowthOS event reliability checks passed.');
}

try { run(); } catch (error) { console.error(error); process.exit(1); }
