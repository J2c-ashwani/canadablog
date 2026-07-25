/**
 * Growth OS — Content QA Auditor
 * Enforces explicit quality gates before any blog or asset is published.
 */

import { MasterResearchPackage } from "./master-research-package"
import { EEATMetadata } from "./eeat-engine"
import { SchemaPackage } from "./schema-internal-linking-engine"

export interface QAAuditReport {
  opportunityId: string
  wordCountPassed: boolean
  wordCountActual: number
  wordCountTarget: number
  eeatPassed: boolean
  eeatScore: number
  commercialCtaPassed: boolean
  internalLinksPassed: boolean
  internalLinksCount: number
  schemaPassed: boolean
  evidencePassed: boolean
  overallStatus: "APPROVED" | "REJECTED"
  auditWarnings: string[]
}

export class ContentQAAuditor {
  public static auditContentPackage(
    researchPackage: MasterResearchPackage,
    eeat: EEATMetadata,
    schema: SchemaPackage,
    generatedWordCount: number
  ): QAAuditReport {
    const auditWarnings: string[] = []

    // 1. Word Count Check
    const wordCountTarget = researchPackage.wordCountTarget.targetWords
    const wordCountPassed = generatedWordCount >= researchPackage.wordCountTarget.minWords
    if (!wordCountPassed) {
      auditWarnings.push(`Generated word count (${generatedWordCount}) below required target (${researchPackage.wordCountTarget.minWords}).`)
    }

    // 2. EEAT Check
    const eeatPassed = eeat.eeatScore >= 85
    if (!eeatPassed) {
      auditWarnings.push(`EEAT score (${eeat.eeatScore}) below required threshold (85). Official government citation missing.`)
    }

    // 3. Commercial CTA Check
    const commercialCtaPassed = Boolean(researchPackage.revenueOfferMapping.recommendedProduct)
    if (!commercialCtaPassed) {
      auditWarnings.push(`Commercial CTA missing. Revenue ladder product not mapped.`)
    }

    // 4. Internal Links Check
    const internalLinksCount = schema.internalLinks.length
    const internalLinksPassed = internalLinksCount >= 3
    if (!internalLinksPassed) {
      auditWarnings.push(`Internal links count (${internalLinksCount}) below required threshold (3).`)
    }

    // 5. Schema Check
    const schemaPassed = Boolean(schema.articleSchema && schema.faqSchema && schema.governmentServiceSchema)

    // 6. Evidence Check
    const evidencePassed = researchPackage.officialCitations.length > 0

    const overallStatus =
      wordCountPassed && eeatPassed && commercialCtaPassed && internalLinksPassed && schemaPassed && evidencePassed
        ? "APPROVED"
        : "REJECTED"

    return {
      opportunityId: researchPackage.opportunityId,
      wordCountPassed,
      wordCountActual: generatedWordCount,
      wordCountTarget,
      eeatPassed,
      eeatScore: eeat.eeatScore,
      commercialCtaPassed,
      internalLinksPassed,
      internalLinksCount,
      schemaPassed,
      evidencePassed,
      overallStatus,
      auditWarnings,
    }
  }
}
