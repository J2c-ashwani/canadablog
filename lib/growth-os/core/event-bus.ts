/**
 * Growth OS — Pub/Sub Domain Event Bus with CEO OS Reactive Event Hooks
 * Decouples system capabilities through domain event publishing and triggers
 * 24x7 CEO OS reactive analysis on critical production anomalies.
 */

import { DomainEvent, EventHandler } from "../types"

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

    // ─── 24x7 Reactive CEO Trigger for Critical Production Events ───
    if (this.isCEOSignificantEvent(eventName)) {
      this.triggerCEOLoopAsync(eventName, payload)
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

  private triggerCEOLoopAsync(eventName: string, payload: any): void {
    // Asynchronous non-blocking invocation of CEO Agent loop
    setTimeout(async () => {
      try {
        const { CEOAgent } = await import('../../ceo-agent/ceo-agent')
        console.log(`[EventBus -> CEO OS] ⚡ Critical Event '${eventName}' triggered reactive CEO run...`)
        await CEOAgent.runCEOLoop('event')
      } catch (err) {
        console.error(`[EventBus -> CEO OS] Failed to trigger reactive CEO loop for ${eventName}:`, err)
      }
    }, 100)
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
