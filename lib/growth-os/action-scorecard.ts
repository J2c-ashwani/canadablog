import { getGrowthActionEvents, isLikelyAutomatedUserAgent } from '@/lib/growth-os/action-attribution';
import { readOperationalRows } from '@/lib/growth-os/operations-store';
import { getLatestMembershipSubscriptions, getMembershipPayments } from '@/lib/membership/membership-store';
import { getAllPurchases, type PurchaseRecord } from '@/lib/products/purchase-store';
import { getTelemetryEvents } from '@/lib/telemetry/telemetry-store';

const EMAIL_EVENT_HEADERS = [
  'Event ID', 'Provider', 'Provider Message ID', 'Event Type', 'Recipient', 'Occurred At', 'Received At',
];

export interface ActionPerformanceRow {
  actionId: string;
  channel: string;
  campaign: string;
  qualifiedLeadsAffected: number;
  providerAccepted: number;
  delivered: number;
  providerFailures: number;
  clicks: number;
  productCheckoutViews: number;
  deliveryEmailsReady: number;
  paypalButtonsRendered: number;
  paypalButtonClicks: number;
  paypalApprovals: number;
  paypalFailures: number;
  checkouts: number;
  purchases: number;
  activeSubscriptions: number;
  revenueUSD: number;
  revenueCAD: number;
  mrrUSD: number;
  costUSD: number;
  netImpactUSD: number;
  revenuePerQualifiedLeadUSD: number;
  checkoutToPurchaseRate: number;
  decision: 'SCALE' | 'HOLD' | 'STOP';
  decisionReason: string;
}

export interface ActionPerformanceScorecard {
  windowDays: number;
  generatedAt: string;
  totalQualifiedLeadsAffected: number;
  totalPurchases: number;
  totalRevenueUSD: number;
  totalRevenueCAD: number;
  totalAttributedMRRUSD: number;
  verifiedRevenuePerQualifiedLeadUSD: number;
  recoveryEfficiencyPer1kLeadsUSD?: number;
  actions: ActionPerformanceRow[];
}

function dateValue(value: string) {
  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : 0;
}

function isVerifiedPurchase(purchase: PurchaseRecord) {
  const paymentStatus = String(purchase.paymentStatus || '').toLowerCase();
  const status = String(purchase.status || '').toLowerCase();
  return Boolean(purchase.paypalCaptureId)
    && ['provider_capture_verified', 'stripe_payment_verified', 'completed'].includes(paymentStatus)
    && !['refunded', 'revoked', 'failed', 'cancelled'].includes(status);
}

function roundMoney(value: number) {
  return Number(value.toFixed(2));
}

function isTestIdentity(email: string, name = '') {
  const normalized = `${email} ${name}`.toLowerCase();
  return normalized.includes('@example.com')
    || normalized.includes('@test.com')
    || normalized.includes('@fsidigital.ca')
    || normalized.includes('test purchase')
    || normalized.includes('audit test');
}

export async function getActionPerformanceScorecard(windowDays = 30): Promise<ActionPerformanceScorecard> {
  const [events, emailEvents, purchases, membershipPayments, memberships, telemetry] = await Promise.all([
    getGrowthActionEvents(),
    readOperationalRows('Email Events', EMAIL_EVENT_HEADERS),
    getAllPurchases({ strict: true }),
    getMembershipPayments(),
    getLatestMembershipSubscriptions(),
    getTelemetryEvents({ strict: true }),
  ]);
  const cutoff = Date.now() - windowDays * 24 * 60 * 60 * 1000;
  const recentEvents = events.filter((event) => dateValue(event.occurredAt) >= cutoff);
  const checkoutEventNames = new Set(['checkout_started', 'standalone_checkout_started', 'begin_checkout']);
  const explicitHumanSessions = new Set(telemetry
    .filter((event) => dateValue(event.timestamp) >= cutoff)
    .filter((event) => event.trafficQualityClassification === 'High Confidence Human'
      || checkoutEventNames.has(event.eventName)
      || event.eventName === 'purchase_completed')
    .map((event) => event.sessionId)
    .filter(Boolean));
  const humanTelemetry = telemetry
    .filter((event) => dateValue(event.timestamp) >= cutoff)
    .filter((event) => explicitHumanSessions.has(event.sessionId))
    .filter((event) => !['Likely Bot', 'Suspicious'].includes(event.trafficQualityClassification || ''));
  const verifiedPageViewKeys = new Set(humanTelemetry
    .filter((event) => event.eventName === 'page_view' && event.actionId && event.actionRecipientId)
    .map((event) => `${event.actionId}:${event.actionRecipientId}`));
  const isVerifiedBrowserClick = (event: (typeof recentEvents)[number]) =>
    event.eventType === 'click'
    && !isLikelyAutomatedUserAgent(event.metadata?.userAgent)
    && verifiedPageViewKeys.has(`${event.actionId}:${event.recipientId}`);
  const actionIds = new Set(recentEvents.map((event) => event.actionId).filter(Boolean));
  purchases.filter((purchase) => dateValue(purchase.createdAt) >= cutoff && purchase.actionId).forEach((purchase) => actionIds.add(purchase.actionId!));
  membershipPayments.filter((payment) => dateValue(payment.occurredAt) >= cutoff && payment.actionId).forEach((payment) => actionIds.add(payment.actionId));
  memberships.filter((membership) => membership.status === 'ACTIVE' && membership.actionId).forEach((membership) => actionIds.add(membership.actionId));

  const providerState = new Map<string, Set<string>>();
  emailEvents.forEach((row) => {
    const messageId = row[2] || '';
    if (!messageId) return;
    const states = providerState.get(messageId) || new Set<string>();
    states.add(String(row[3] || '').toLowerCase());
    providerState.set(messageId, states);
  });

  const rows: ActionPerformanceRow[] = Array.from(actionIds).map((actionId) => {
    const actionEvents = recentEvents.filter((event) => event.actionId === actionId);
    const actionTelemetry = humanTelemetry.filter((event) => event.actionId === actionId);
    const uniqueTelemetrySessions = (...eventNames: string[]) => new Set(actionTelemetry
      .filter((event) => eventNames.includes(event.eventName))
      .map((event) => event.sessionId)
      .filter(Boolean)).size;
    const acceptedEvents = actionEvents.filter((event) => event.eventType === 'provider_accepted');
    const acceptedMessageIds = new Set(acceptedEvents.map((event) => event.providerMessageId).filter(Boolean));
    const delivered = Array.from(acceptedMessageIds).filter((messageId) => {
      const states = providerState.get(messageId) || new Set<string>();
      return states.has('email.delivered') || states.has('email.opened') || states.has('email.clicked');
    }).length;
    const bounced = Array.from(acceptedMessageIds).filter((messageId) => providerState.get(messageId)?.has('email.bounced')).length;
    const complained = Array.from(acceptedMessageIds).filter((messageId) => providerState.get(messageId)?.has('email.complained')).length;
    const providerFailures = Array.from(acceptedMessageIds).filter((messageId) => providerState.get(messageId)?.has('email.failed')).length;
    const actionPurchases = purchases.filter((purchase) =>
      purchase.actionId === actionId
      && dateValue(purchase.createdAt) >= cutoff
      && isVerifiedPurchase(purchase)
      && !isTestIdentity(purchase.email, purchase.name)
    );
    const actionMembershipPayments = membershipPayments.filter((payment) =>
      payment.actionId === actionId
      && dateValue(payment.occurredAt) >= cutoff
      && payment.status.toLowerCase() === 'completed'
      && !isTestIdentity(payment.email)
    );
    const activeSubscriptions = memberships.filter((membership) =>
      membership.actionId === actionId
      && membership.status === 'ACTIVE'
      && !isTestIdentity(membership.email)
    );
    const verifiedClickEvents = actionEvents.filter(isVerifiedBrowserClick);
    const organicClickEvents = verifiedClickEvents.filter((event) => event.channel.startsWith('organic_'));
    const deliveredMessageIds = new Set(Array.from(acceptedMessageIds).filter((messageId) => {
      const states = providerState.get(messageId) || new Set<string>();
      return states.has('email.delivered') || states.has('email.opened') || states.has('email.clicked');
    }));
    const deliveredRecipientIds = acceptedEvents
      .filter((event) => deliveredMessageIds.has(event.providerMessageId))
      .map((event) => event.recipientId);
    const qualifiedLeads = new Set([
      ...deliveredRecipientIds,
      ...organicClickEvents.map((event) => event.recipientId),
    ].filter(Boolean)).size;
    const checkouts = new Set(actionEvents.filter((event) => event.eventType === 'checkout_started').map((event) => event.referenceId || event.eventId)).size;
    const productCheckoutViews = uniqueTelemetrySessions('product_checkout_viewed');
    const deliveryEmailsReady = uniqueTelemetrySessions('checkout_delivery_email_ready');
    const paypalButtonsRendered = uniqueTelemetrySessions('paypal_buttons_rendered');
    const paypalButtonClicks = uniqueTelemetrySessions('paypal_button_clicked');
    const paypalApprovals = uniqueTelemetrySessions('paypal_payment_approved');
    const paypalFailures = uniqueTelemetrySessions(
      'paypal_sdk_load_failed',
      'paypal_buttons_render_failed',
      'paypal_order_create_failed',
      'paypal_checkout_error',
      'paypal_capture_failed'
    );
    const productTransactions = new Set(actionPurchases.map((purchase) => purchase.paypalCaptureId || purchase.paypalOrderId).filter(Boolean));
    const membershipTransactions = new Set(actionMembershipPayments.map((payment) => payment.paymentId));
    const purchasesCount = productTransactions.size + membershipTransactions.size;
    const productRevenueUSD = actionPurchases
      .filter((purchase) => String(purchase.currency || 'USD').toUpperCase() === 'USD')
      .reduce((sum, purchase) => sum + Number(purchase.amount || 0), 0);
    const productRevenueCAD = actionPurchases
      .filter((purchase) => String(purchase.currency || '').toUpperCase() === 'CAD')
      .reduce((sum, purchase) => sum + Number(purchase.amount || 0), 0);
    const membershipRevenueUSD = actionMembershipPayments
      .filter((payment) => payment.currency.toUpperCase() === 'USD')
      .reduce((sum, payment) => sum + payment.amount, 0);
    const revenueUSD = roundMoney(productRevenueUSD + membershipRevenueUSD);
    const revenueCAD = roundMoney(productRevenueCAD + actionMembershipPayments
      .filter((payment) => payment.currency.toUpperCase() === 'CAD')
      .reduce((sum, payment) => sum + payment.amount, 0));
    const mrrUSD = roundMoney(activeSubscriptions.reduce((sum, membership) => sum + membership.amountUSD, 0));
    const complaintOrBounceRate = acceptedMessageIds.size > 0 ? (bounced + complained) / acceptedMessageIds.size : 0;
    let decision: ActionPerformanceRow['decision'] = 'HOLD';
    let decisionReason = 'Continue the controlled cohort until verified payment evidence is sufficient.';
    if (complained > 0 || (acceptedMessageIds.size >= 10 && complaintOrBounceRate >= 0.1)) {
      decision = 'STOP';
      decisionReason = 'Complaint or excessive provider-confirmed bounce evidence requires an immediate stop.';
    } else if (purchasesCount >= 1 && revenueUSD > 0) {
      decision = 'SCALE';
      decisionReason = 'At least one provider-verified payment is directly attributed to this action.';
    } else if ((deliveredMessageIds.size >= 20 || organicClickEvents.length >= 20) && checkouts === 0) {
      decision = 'STOP';
      decisionReason = 'Twenty verified deliveries or first-party human product clicks produced no measured checkout; stop and replace the action.';
    } else if (providerFailures > 0 && deliveredMessageIds.size === 0) {
      decisionReason = 'Provider-confirmed failures exist; repair the provider path before retrying or scaling this action.';
    } else if (acceptedMessageIds.size > 0 && deliveredMessageIds.size === 0) {
      decisionReason = 'Provider acceptance exists, but delivery is not verified; reconcile provider evidence before scaling or stopping.';
    }
    const first = actionEvents[0];
    return {
      actionId,
      channel: first?.channel || actionPurchases[0]?.actionChannel || activeSubscriptions[0]?.actionChannel || '',
      campaign: first?.campaign || actionPurchases[0]?.actionCampaign || activeSubscriptions[0]?.actionCampaign || '',
      qualifiedLeadsAffected: qualifiedLeads,
      providerAccepted: acceptedMessageIds.size,
      delivered,
      providerFailures,
      clicks: new Set(verifiedClickEvents.map((event) => event.recipientId || event.eventId)).size,
      productCheckoutViews,
      deliveryEmailsReady,
      paypalButtonsRendered,
      paypalButtonClicks,
      paypalApprovals,
      paypalFailures,
      checkouts,
      purchases: purchasesCount,
      activeSubscriptions: activeSubscriptions.length,
      revenueUSD,
      revenueCAD,
      mrrUSD,
      costUSD: 0,
      netImpactUSD: revenueUSD,
      revenuePerQualifiedLeadUSD: qualifiedLeads > 0 ? roundMoney(revenueUSD / qualifiedLeads) : 0,
      checkoutToPurchaseRate: checkouts > 0 ? Number((purchasesCount / checkouts).toFixed(4)) : 0,
      decision,
      decisionReason,
    };
  }).sort((left, right) => right.revenueUSD - left.revenueUSD || right.mrrUSD - left.mrrUSD || right.providerAccepted - left.providerAccepted);

  const deliveredProviderMessageIds = new Set(Array.from(providerState.entries())
    .filter(([, states]) => states.has('email.delivered') || states.has('email.opened') || states.has('email.clicked'))
    .map(([messageId]) => messageId));
  const totalQualifiedLeadsAffected = new Set(recentEvents
    .filter((event) => (
      (event.eventType === 'provider_accepted' && deliveredProviderMessageIds.has(event.providerMessageId))
      || (event.channel.startsWith('organic_') && isVerifiedBrowserClick(event))
    ))
    .map((event) => event.recipientId)
    .filter(Boolean)).size;
  const totalRevenueUSD = roundMoney(rows.reduce((sum, row) => sum + row.revenueUSD, 0));
  return {
    windowDays,
    generatedAt: new Date().toISOString(),
    totalQualifiedLeadsAffected,
    totalPurchases: rows.reduce((sum, row) => sum + row.purchases, 0),
    totalRevenueUSD,
    totalRevenueCAD: roundMoney(rows.reduce((sum, row) => sum + row.revenueCAD, 0)),
    totalAttributedMRRUSD: roundMoney(rows.reduce((sum, row) => sum + row.mrrUSD, 0)),
    verifiedRevenuePerQualifiedLeadUSD: totalQualifiedLeadsAffected > 0
      ? roundMoney(totalRevenueUSD / totalQualifiedLeadsAffected)
      : 0,
    recoveryEfficiencyPer1kLeadsUSD: totalQualifiedLeadsAffected > 0
      ? roundMoney((totalRevenueUSD / totalQualifiedLeadsAffected) * 1000)
      : 0,
    actions: rows,
  };
}
