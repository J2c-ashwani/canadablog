import { GrowthTools } from '../tools/growth-tools'

export interface GrowthAgentAudit {
  pipelineStatus: string
  orphanedStagesCount: number
  criticalOrphanAlert: string | null
  recommendation: string
}

export class GrowthAgent {
  public static async auditGrowthOS(): Promise<GrowthAgentAudit> {
    const status = await GrowthTools.getGrowthOSStatus()
    const orphan = status.orphanedStagesDetected.find((o) => o.severity === 'P0')

    return {
      pipelineStatus: orphan ? '🔴 ORPHANED STAGE DETECTED' : '🟢 HEALTHY',
      orphanedStagesCount: status.orphanedStagesDetected.length,
      criticalOrphanAlert: orphan ? orphan.issue : null,
      recommendation: orphan
        ? 'P0: DO NOT BUILD NEW SCRAPERS. Repair EmailAdapter dispatch queue immediately.'
        : 'Maintain SERPER distribution and monitor outreach queues.'
    }
  }
}
