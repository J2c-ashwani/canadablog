/**
 * Growth OS — Schema & Internal Linking Engine
 * Generates structured JSON-LD schemas and bidirectionally injects cluster internal links.
 */

import { MasterResearchPackage } from "./master-research-package"

export interface InternalLinkItem {
  anchorText: string
  url: string
  rel: "dofollow"
}

export interface SchemaPackage {
  articleSchema: Record<string, any>
  faqSchema: Record<string, any>
  governmentServiceSchema: Record<string, any>
  internalLinks: InternalLinkItem[]
}

export class SchemaInternalLinkingEngine {
  public static generateSchemaAndLinks(researchPackage: MasterResearchPackage): SchemaPackage {
    const pageUrl = `https://fsidigital.ca/blog/${researchPackage.programTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`

    // 1. Article Schema
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: researchPackage.programTitle,
      author: {
        "@type": "Person",
        name: "Ashwani Kumar",
        jobTitle: "Founder & CEO",
        worksFor: { "@type": "Organization", name: "FSI Digital" },
      },
      publisher: {
        "@type": "Organization",
        name: "FSI Digital",
        url: "https://fsidigital.ca",
      },
      datePublished: new Date().toISOString(),
      mainEntityOfPage: pageUrl,
    }

    // 2. FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `What is the maximum funding cap for ${researchPackage.programTitle}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Eligible applicants can access non-repayable capital assistance up to $150,000.`,
          },
        },
        {
          "@type": "Question",
          name: `Can ${researchPackage.buyerSegment} stack this grant with SRED?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Yes, provided total government assistance does not exceed 75% of eligible project costs.`,
          },
        },
      ],
    }

    // 3. Government Service Schema
    const governmentServiceSchema = {
      "@context": "https://schema.org",
      "@type": "GovernmentService",
      name: researchPackage.programTitle,
      serviceType: "Grant Capital Assistance",
      provider: {
        "@type": "GovernmentOrganization",
        name: "Government of Canada",
      },
    }

    // 4. Internal Cluster Links
    const internalLinks: InternalLinkItem[] = [
      { anchorText: "Canadian Federal Grants Master Guide 2026", url: "/blog/canada-federal-grants", rel: "dofollow" },
      { anchorText: "Grant Stacking Rules & Calculator", url: "/calculators/stacking-checker", rel: "dofollow" },
      { anchorText: `Get Your ${researchPackage.revenueOfferMapping.recommendedProduct}`, url: "/canada/funding-report", rel: "dofollow" },
      { anchorText: "Book a $199 Strategy Session", url: "/contact", rel: "dofollow" },
    ]

    return {
      articleSchema,
      faqSchema,
      governmentServiceSchema,
      internalLinks,
    }
  }
}
