/**
 * Growth OS — Evidence Registry
 * First-class registry for verifying official funding source URLs and logging audit trails.
 */

import { EvidenceItem } from "../types"

export class EvidenceRegistry {
  private static registry: Map<string, EvidenceItem> = new Map()

  public static registerEvidence(sourceUrl: string, title: string, extractedFact: string, reliabilityScore = 95): EvidenceItem {
    const item: EvidenceItem = {
      id: `ev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      sourceUrl,
      title,
      extractedFact,
      verifiedTimestamp: new Date().toISOString(),
      reliabilityScore,
    }
    this.registry.set(item.id, item)
    return item
  }

  public static getEvidence(id: string): EvidenceItem | undefined {
    return this.registry.get(id)
  }

  public static verifyUrlOfficiality(url: string): boolean {
    const officialDomains = [
      "canada.ca",
      "nrc.canada.ca",
      "ic.gc.ca",
      "sdc.gc.ca",
      "ontario.ca",
      "alberta.ca",
      "quebec.ca",
      "bc.ca",
      "gov.mb.ca",
      "saskatchewan.ca",
      "nih.gov",
      "nsf.gov",
    ]
    try {
      const parsed = new URL(url)
      return officialDomains.some((d) => parsed.hostname.endsWith(d))
    } catch {
      return false
    }
  }
}
