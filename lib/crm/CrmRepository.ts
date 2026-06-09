export interface ICrmRepository {
  syncLead(email: string, details: Record<string, any>): Promise<boolean>
}

export class MockCrmRepository implements ICrmRepository {
  async syncLead(email: string, details: Record<string, any>): Promise<boolean> {
    console.log(`[CRM Mock Sync] Syncing lead: ${email} | Data:`, details)
    return true
  }
}

export const CrmRepository: ICrmRepository = new MockCrmRepository()
