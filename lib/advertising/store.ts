import {
  appendOperationalRow,
  getLatestOperationalState,
  setOperationalState,
  readOperationalRows,
  updateOperationalRow,
} from '@/lib/growth-os/operations-store';
import {
  PublishingInquiry,
  PublishingOrder,
  PublishingBrief,
  OrderStatus,
} from '@/lib/advertising/config';

const INQUIRY_HEADERS = [
  'Inquiry ID',
  'Created At',
  'Name',
  'Email',
  'Company',
  'Website',
  'Package Interest',
  'Topic / Angle',
  'Destination URL',
  'Timeline',
  'Budget',
  'Notes',
  'Score',
  'Status',
];

const ORDER_HEADERS = [
  'Order ID',
  'Created At',
  'Status',
  'Package ID',
  'Package Name',
  'Amount USD',
  'Buyer Name',
  'Buyer Email',
  'Company',
  'Website',
  'Draft Title',
  'Published URL',
  'Updated At',
];

const BRIEF_HEADERS = [
  'Order ID',
  'Submitted At',
  'Legal Company Name',
  'Brand Name',
  'Company Overview',
  'Target Customers',
  'Value Prop',
  'Primary Goal',
  'Core Message',
  'Target Keywords',
  'Audience Seniority',
  'Voice and Tone',
  'Primary URL',
  'Primary Anchor',
  'Secondary URL',
  'Secondary Anchor',
  'Reader CTA',
  'Editorial Notes',
];

// In-process resilient cache to safeguard customer checkout and reviews
// even if external spreadsheet APIs encounter transient timeouts or quota limits.
const memoryOrders = new Map<string, PublishingOrder>();
const memoryInquiries = new Map<string, PublishingInquiry>();

/**
 * Saves a new advertising/publishing inquiry to Google Sheets.
 */
export async function savePublishingInquiry(inquiry: PublishingInquiry): Promise<void> {
  memoryInquiries.set(inquiry.inquiryId, inquiry);

  try {
    await appendOperationalRow('Publishing Inquiries', INQUIRY_HEADERS, [
      inquiry.inquiryId,
      inquiry.createdAt,
      inquiry.name,
      inquiry.email,
      inquiry.companyName,
      inquiry.website,
      inquiry.packageInterest,
      inquiry.topicAngle,
      inquiry.destinationUrl || 'N/A',
      inquiry.timeline || 'Flexible',
      inquiry.budget || 'N/A',
      inquiry.notes || '',
      inquiry.score || 0,
      inquiry.status,
    ]);
  } catch (error) {
    console.warn('Google Sheets inquiry append skipped or deferred:', error);
    try {
      await setOperationalState(`pub_inquiry:${inquiry.inquiryId}`, inquiry);
    } catch {
      // Memory cache is already populated
    }
  }
}

/**
 * Saves or updates a paid publishing order in state and Google Sheets.
 */
export async function savePublishingOrder(order: PublishingOrder): Promise<void> {
  // Always update memory first
  memoryOrders.set(order.orderId, { ...order });

  // Update fast operational state
  try {
    await setOperationalState(`pub_order:${order.orderId}`, order);
  } catch (error) {
    console.warn('Operational state write deferred:', error);
  }

  // Update Google Sheets durable record
  try {
    const rows = await readOperationalRows('Publishing Orders', ORDER_HEADERS);
    const existingIndex = rows.findIndex((row) => row[0] === order.orderId);

    const values = [
      order.orderId,
      order.createdAt,
      order.status,
      order.packageId,
      order.packageName,
      order.amountUsd,
      order.buyerName,
      order.buyerEmail,
      order.companyName,
      order.website,
      order.draftTitle || 'N/A',
      order.publishedUrl || 'N/A',
      order.updatedAt,
    ];

    if (existingIndex >= 0) {
      // Row index is 2-based (header is row 1)
      await updateOperationalRow('Publishing Orders', ORDER_HEADERS, existingIndex + 2, values);
    } else {
      await appendOperationalRow('Publishing Orders', ORDER_HEADERS, values);
    }
  } catch (error) {
    console.warn(`Durable sheet write deferred for order ${order.orderId}:`, error);
  }
}

/**
 * Retrieves a publishing order by ID.
 */
export async function getPublishingOrder(orderId: string): Promise<PublishingOrder | null> {
  if (!orderId) return null;

  // 1. Check in-process cache
  if (memoryOrders.has(orderId)) {
    return memoryOrders.get(orderId)!;
  }

  // 2. Check state store
  try {
    const cached = await getLatestOperationalState<PublishingOrder>(`pub_order:${orderId}`);
    if (cached) {
      memoryOrders.set(orderId, cached);
      return cached;
    }
  } catch {
    // Non-blocking fallback
  }

  // 3. Fallback to reading from Google Sheets
  try {
    const rows = await readOperationalRows('Publishing Orders', ORDER_HEADERS);
    const found = rows.find((row) => row[0] === orderId);
    if (!found) return null;

    const order: PublishingOrder = {
      orderId: found[0],
      createdAt: found[1],
      status: found[2] as OrderStatus,
      packageId: found[3],
      packageName: found[4],
      amountUsd: found[5],
      currency: 'USD',
      buyerName: found[6],
      buyerEmail: found[7],
      companyName: found[8],
      website: found[9],
      draftTitle: found[10] !== 'N/A' ? found[10] : undefined,
      publishedUrl: found[11] !== 'N/A' ? found[11] : undefined,
      updatedAt: found[12],
      token: '', // Verified via crypto
    };
    memoryOrders.set(orderId, order);
    return order;
  } catch (error) {
    console.warn(`Failed to read order ${orderId} from sheets:`, error);
    return null;
  }
}

/**
 * Saves a completed post-purchase brief to Google Sheets and updates the order.
 */
export async function savePublishingBrief(orderId: string, brief: PublishingBrief): Promise<void> {
  const order = await getPublishingOrder(orderId);
  if (!order) throw new Error(`Order ${orderId} not found.`);

  order.brief = brief;
  order.status = 'brief_submitted';
  order.updatedAt = new Date().toISOString();

  await savePublishingOrder(order);

  try {
    await appendOperationalRow('Publishing Briefs', BRIEF_HEADERS, [
      orderId,
      brief.submittedAt,
      brief.legalCompanyName,
      brief.brandName,
      brief.companyOverview,
      brief.targetCustomers,
      brief.valueProposition,
      brief.primaryGoal,
      brief.coreMessage,
      brief.targetKeywords,
      brief.audienceSeniority,
      brief.voiceAndTone,
      brief.primaryUrl,
      brief.primaryAnchorText,
      brief.secondaryUrl || 'N/A',
      brief.secondaryAnchorText || 'N/A',
      brief.readerCtaText,
      brief.notesForEditorialTeam || '',
    ]);
  } catch (error) {
    console.warn(`Brief sheet write deferred for order ${orderId}:`, error);
  }
}
