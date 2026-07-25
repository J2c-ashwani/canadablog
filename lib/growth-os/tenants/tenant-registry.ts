/**
 * Growth OS — Multi-Tenant Brand Registry
 * Manages tenant configurations for FSI Digital, Join2Campus, and IIAI without code forks.
 */

import { BrandConfig } from "../types"

export class TenantRegistry {
  private static tenants: Map<string, BrandConfig> = new Map([
    [
      "fsi-digital",
      {
        id: "fsi-digital",
        name: "FSI Digital",
        domain: "fsidigital.ca",
        products: [
          { name: "$19 Match Report", priceUSD: 19, targetSituation: "Unsure of grant eligibility" },
          { name: "$49 Action Plan", priceUSD: 49, targetSituation: "Needs application stacking roadmap" },
          { name: "$79 Funding Bundle", priceUSD: 79, targetSituation: "Complete pre-written template suite" },
          { name: "$29 Funding Watch", priceUSD: 29, targetSituation: "Ongoing grant intake alerts" },
          { name: "$199 Strategy Dossier", priceUSD: 199, targetSituation: "High-stakes custom application audit" },
        ],
        markets: ["Canada", "USA"],
        toneStandards: ["Authoritative", "Urgent", "Data-Backed", "Zero Fluff"],
        complianceRules: ["CASL Consent Required", "Official Source Verification Mandatory"],
      },
    ],
    [
      "join2campus",
      {
        id: "join2campus",
        name: "Join2Campus",
        domain: "join2campus.com",
        products: [
          { name: "$29 Campus Match Report", priceUSD: 29, targetSituation: "International student admission match" },
          { name: "$99 Visa Readiness Kit", priceUSD: 99, targetSituation: "Study permit application roadmap" },
        ],
        markets: ["Global", "India", "Canada"],
        toneStandards: ["Encouraging", "Clear", "Step-by-Step"],
        complianceRules: ["Immigration Disclosure Disclaimer Required"],
      },
    ],
    [
      "iiai",
      {
        id: "iiai",
        name: "Indian Institute of AI",
        domain: "iiai.in",
        products: [
          { name: "$49 AI Founder Certification", priceUSD: 49, targetSituation: "AI engineering skill validation" },
          { name: "$199 Enterprise AI Bootcamp", priceUSD: 199, targetSituation: "Executive AI implementation training" },
        ],
        markets: ["India", "Southeast Asia"],
        toneStandards: ["Technical", "Prestige", "Outcome-Oriented"],
        complianceRules: ["GST Tax Compliance Mandatory"],
      },
    ],
  ])

  public static getTenant(brandId: string): BrandConfig {
    const tenant = this.tenants.get(brandId)
    if (!tenant) {
      console.warn(`[TenantRegistry] Tenant '${brandId}' not found, falling back to 'fsi-digital'.`)
      return this.tenants.get("fsi-digital")!
    }
    return tenant
  }

  public static registerTenant(config: BrandConfig): void {
    this.tenants.set(config.id, config)
    console.log(`[TenantRegistry] Registered new tenant: '${config.name}' (${config.domain})`)
  }

  public static listTenants(): BrandConfig[] {
    return Array.from(this.tenants.values())
  }
}
