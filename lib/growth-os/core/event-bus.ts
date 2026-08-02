/**
 * Growth OS — Pub/Sub Domain Event Bus
 * Decouples system capabilities through domain event publishing.
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

    return event
  }
}

export const globalEventBus = new EventBus()

// ─── Phase 3: Authority Engine Event Registration ───────────────────────────
// Pre-register Authority Engine event channels for type-safe publishing.
// Handlers are attached lazily by the Authority Engine modules at runtime.
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
