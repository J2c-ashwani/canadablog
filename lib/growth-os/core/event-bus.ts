/**
 * Growth OS — Pub/Sub Domain Event Bus with CEO OS Reactive Event Hooks
 * Decouples system capabilities through domain event publishing and triggers
 * 24x7 CEO OS reactive analysis on critical production anomalies.
 */

import { DomainEvent, EventHandler } from "../types"
import { appendOperationalRow, readOperationalRows, updateOperationalRow } from '@/lib/growth-os/operations-store'

const EVENT_HEADERS = ['Event ID', 'Event Name', 'Occurred At', 'Payload JSON', 'Status']

export interface QueuedGrowthOSEvent {
  rowNumber: number
  id: string
  name: string
  occurredAt: string
  payload: Record<string, unknown>
  status: string
}

export async function getQueuedGrowthOSEvents(limit = 50): Promise<QueuedGrowthOSEvent[]> {
  if (!process.env.GOOGLE_SHEET_ID && !process.env.GOOGLE_SHEETS_SPREADSHEET_ID) return []
  const rows = await readOperationalRows('GrowthOS Events', EVENT_HEADERS)
  return rows.map((row, index) => {
    let payload: Record<string, unknown> = {}
    try { payload = JSON.parse(row[3] || '{}') } catch {}
    return { rowNumber: index + 2, id: row[0] || '', name: row[1] || '', occurredAt: row[2] || '', payload, status: row[4] || '' }
  }).filter((event) => event.status === 'QUEUED_FOR_CEO_EVIDENCE_RUN').slice(0, limit)
}

export async function markGrowthOSEventsReviewed(events: QueuedGrowthOSEvent[], runId: string) {
  for (const event of events) {
    await updateOperationalRow('GrowthOS Events', EVENT_HEADERS, event.rowNumber, [
      event.id,
      event.name,
      event.occurredAt,
      JSON.stringify(event.payload),
      `REVIEWED_BY_${runId}`,
    ])
  }
}

class EventBus {
  private handlers: Map<string, EventHandler[]> = new Map()

  public subscribe<T = any>(eventName: string, handler: EventHandler<T>): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, [])
    }
    this.handlers.get(eventName)!.push(handler)
  }

  public async publish<T = any>(eventName: string, payload: T): Promise<DomainEvent<T>> {
    const event: DomainEvent<T> = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: eventName,
      timestamp: new Date().toISOString(),
      payload,
    }

    const eventHandlers = this.handlers.get(eventName) || []
    for (const handler of eventHandlers) {
      try {
        await handler(event)
      } catch (err) {
        console.error(`[EventBus] Error executing handler for ${eventName}:`, err)
      }
    }

    // Critical signals are durably queued. Starting an unawaited CEO loop with
    // setTimeout is unreliable in serverless runtimes; the scheduled CEO lease
    // consumes the current evidence without losing the originating signal.
    if (this.isCEOSignificantEvent(eventName)) {
      await this.persistCEOSignal(event)
    }

    return event
  }

  private isCEOSignificantEvent(eventName: string): boolean {
    const CRITICAL_EVENTS = [
      'PaymentFailed',
      'PaymentCaptured',
      'IntentMismatchDetected',
      'ReportDeliveryFailed',
      'CheckoutAbandoned',
      'OutboundDispatchStalled',
      'LeadCaptured'
    ]
    return CRITICAL_EVENTS.includes(eventName) || eventName.startsWith('authority.killswitch.')
  }

  private async persistCEOSignal(event: DomainEvent<any>): Promise<void> {
    if (!process.env.GOOGLE_SHEET_ID && !process.env.GOOGLE_SHEETS_SPREADSHEET_ID) return
    await appendOperationalRow('GrowthOS Events', EVENT_HEADERS, [
      event.id,
      event.name,
      event.timestamp,
      JSON.stringify(event.payload || {}),
      'QUEUED_FOR_CEO_EVIDENCE_RUN',
    ])
  }
}

export const globalEventBus = new EventBus()

export const AUTHORITY_EVENT_CHANNELS = [
  'authority.opportunity.discovered',
  'authority.opportunity.qualified',
  'authority.outreach.drafted',
  'authority.guardrail.passed',
  'authority.guardrail.failed',
  'authority.outreach.sent',
  'authority.outreach.opened',
  'authority.outreach.replied',
  'authority.backlink.earned',
  'authority.backlink.lost',
  'authority.backlink.verified',
  'authority.killswitch.triggered',
  'authority.killswitch.resumed',
  'authority.exception.queued',
  'authority.flywheel.updated',
] as const
