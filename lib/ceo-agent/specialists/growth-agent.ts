import { GrowthTools } from '../tools/growth-tools'

export interface GrowthAgentAudit {
  pipelineStatus: string
  orphanedStagesCount: number
  criticalOrphanAlert: string | null
  recommendation: string
  evidenceState: 'VERIFIED' | 'PARTIAL' | 'UNKNOWN'
}

export class GrowthAgent {
  public static async auditGrowthOS(): Promise<GrowthAgentAudit> {
    const status = await GrowthTools.getGrowthOSStatus()
    const critical = status.orphanedStagesDetected.find((orphan) => orphan.severity === 'P0')
    return {
      pipelineStatus: critical ? '🔴 CRITICAL EVIDENCE-BACKED FAILURE' : status.orphanedStagesDetected.length > 0 ? '🟡 DEGRADED' : '🟢 HEALTHY',
      orphanedStagesCount: status.orphanedStagesDetected.length,
      criticalOrphanAlert: critical?.issue || null,
      recommendation: critical?.impact || 'Continue controlled distribution and monitor provider-verified conversion evidence.',
      evidenceState: status.evidenceState,
    }
  }
}
