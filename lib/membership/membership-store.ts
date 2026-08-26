import { appendOperationalRow, readOperationalRows } from '@/lib/growth-os/operations-store';

export type MembershipSubscriptionStatus = 'ACTIVE' | 'APPROVED' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED';

export interface MembershipSubscriptionRecord {
  subscriptionId: string;
  email: string;
  planId: string;
  status: MembershipSubscriptionStatus;
  amountUSD: number;
  providerVerifiedAt: string;
  lastPaymentId: string;
  lastPaymentAt: string;
  cancelledAt: string;
  updatedAt: string;
  evidenceSource: string;
  actionId: string;
  actionChannel: string;
  actionCampaign: string;
  actionRecipientId: string;
}

const SUBSCRIPTION_HEADERS = [
  'Subscription ID', 'Email', 'Plan ID', 'Status', 'Amount USD', 'Provider Verified At',
  'Last Payment ID', 'Last Payment At', 'Cancelled At', 'Updated At', 'Evidence Source',
  'Action ID', 'Action Channel', 'Action Campaign', 'Action Recipient ID',
];
const PAYMENT_HEADERS = [
  'Payment ID', 'Subscription ID', 'Email', 'Amount', 'Currency', 'Status', 'Occurred At', 'Recorded At',
  'Action ID', 'Action Channel', 'Action Campaign', 'Action Recipient ID',
];

function parseSubscription(row: string[]): MembershipSubscriptionRecord {
  return {
    subscriptionId: row[0] || '',
    email: String(row[1] || '').toLowerCase(),
    planId: row[2] || '',
    status: (row[3] || 'CANCELLED') as MembershipSubscriptionStatus,
    amountUSD: Number(row[4] || 0),
    providerVerifiedAt: row[5] || '',
    lastPaymentId: row[6] || '',
    lastPaymentAt: row[7] || '',
    cancelledAt: row[8] || '',
    updatedAt: row[9] || '',
    evidenceSource: row[10] || '',
    actionId: row[11] || '',
    actionChannel: row[12] || '',
    actionCampaign: row[13] || '',
    actionRecipientId: row[14] || '',
  };
}

export async function recordMembershipSubscription(
  record: Omit<MembershipSubscriptionRecord, 'updatedAt' | 'actionId' | 'actionChannel' | 'actionCampaign' | 'actionRecipientId'> & {
    updatedAt?: string;
    actionId?: string;
    actionChannel?: string;
    actionCampaign?: string;
    actionRecipientId?: string;
  }
) {
  const normalized: MembershipSubscriptionRecord = {
    ...record,
    email: record.email.toLowerCase().trim(),
    updatedAt: record.updatedAt || new Date().toISOString(),
    actionId: record.actionId || '',
    actionChannel: record.actionChannel || '',
    actionCampaign: record.actionCampaign || '',
    actionRecipientId: record.actionRecipientId || '',
  };
  await appendOperationalRow('Membership Subscriptions', SUBSCRIPTION_HEADERS, [
    normalized.subscriptionId,
    normalized.email,
    normalized.planId,
    normalized.status,
    normalized.amountUSD,
    normalized.providerVerifiedAt,
    normalized.lastPaymentId,
    normalized.lastPaymentAt,
    normalized.cancelledAt,
    normalized.updatedAt,
    normalized.evidenceSource,
    normalized.actionId,
    normalized.actionChannel,
    normalized.actionCampaign,
    normalized.actionRecipientId,
  ]);
  return normalized;
}

export async function getLatestMembershipSubscriptions(): Promise<MembershipSubscriptionRecord[]> {
  const rows = await readOperationalRows('Membership Subscriptions', SUBSCRIPTION_HEADERS);
  const latest = new Map<string, MembershipSubscriptionRecord>();
  rows.map(parseSubscription).forEach((record) => latest.set(record.subscriptionId, record));
  return Array.from(latest.values());
}

export async function getMembershipSubscription(subscriptionId: string) {
  return (await getLatestMembershipSubscriptions()).find((record) => record.subscriptionId === subscriptionId) || null;
}

export async function recordMembershipPayment(data: {
  paymentId: string;
  subscriptionId: string;
  email: string;
  amount: string;
  currency: string;
  status: string;
  occurredAt: string;
  actionId?: string;
  actionChannel?: string;
  actionCampaign?: string;
  actionRecipientId?: string;
}) {
  const rows = await readOperationalRows('Membership Payments', PAYMENT_HEADERS);
  if (rows.some((row) => row[0] === data.paymentId)) return { duplicate: true };
  await appendOperationalRow('Membership Payments', PAYMENT_HEADERS, [
    data.paymentId,
    data.subscriptionId,
    data.email.toLowerCase().trim(),
    data.amount,
    data.currency,
    data.status,
    data.occurredAt,
    new Date().toISOString(),
    data.actionId || '',
    data.actionChannel || '',
    data.actionCampaign || '',
    data.actionRecipientId || '',
  ]);
  return { duplicate: false };
}

export interface MembershipPaymentRecord {
  paymentId: string;
  subscriptionId: string;
  email: string;
  amount: number;
  currency: string;
  status: string;
  occurredAt: string;
  actionId: string;
  actionChannel: string;
  actionCampaign: string;
  actionRecipientId: string;
}

export async function getMembershipPayments(): Promise<MembershipPaymentRecord[]> {
  return (await readOperationalRows('Membership Payments', PAYMENT_HEADERS)).map((row) => ({
    paymentId: row[0] || '',
    subscriptionId: row[1] || '',
    email: String(row[2] || '').toLowerCase(),
    amount: Number(row[3] || 0),
    currency: row[4] || '',
    status: row[5] || '',
    occurredAt: row[6] || '',
    actionId: row[8] || '',
    actionChannel: row[9] || '',
    actionCampaign: row[10] || '',
    actionRecipientId: row[11] || '',
  }));
}
