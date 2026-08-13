import { DeepCompetitorForensics } from './types'

export interface RTEMatrixRow {
  dimension: string
  fsiCurrent: string
  competitor1: string
  competitor2: string
  competitor3: string
  fsiTargetUpgraded: string
}

export interface RTEGapAnalysis {
  keyword: string
  urlPath: string
  googleExpects: string
  competitorsProvide: string
  fsiCurrentlyProvides: string
  missingGaps: string[]
  fsiDifferentiators: string[]
  matrix: RTEMatrixRow[]
}

/**
 * FSI RTE 15-Dimension Competitor Matrix Engine
 * 
 * Conducts forensic comparison across 15 core dimensions to isolate competitor consensus,
 * pinpoint deficiencies, and inject proprietary FSI differentiation.
 */

export class RTEMatrixEngine {
  public static generate15DimensionMatrix(
    keyword: string,
    urlPath: string,
    forensics?: DeepCompetitorForensics
  ): RTEGapAnalysis {
    const comp1 = forensics?.topCompetitors[0]?.domain || 'mentorworks.ca'
    const comp2 = forensics?.topCompetitors[1]?.domain || 'canada.ca'
    const comp3 = forensics?.topCompetitors[2]?.domain || 'pocketed.io'

    const matrix: RTEMatrixRow[] = [
      {
        dimension: '1. Search Intent',
        fsiCurrent: 'Commercial Informational Guide',
        competitor1: 'Directory / Lead Gen',
        competitor2: 'Official Gov Program Specs',
        competitor3: 'Portal Wall / Signup Gate',
        fsiTargetUpgraded: 'Direct Answer + Instant Diagnostic + $49 Action Plan'
      },
      {
        dimension: '2. H1 Headline',
        fsiCurrent: `${keyword} Overview`,
        competitor1: `${keyword} 2024 / 2025 Grants`,
        competitor2: `Official Program Intake Notice`,
        competitor3: `Funding Directory for Canadian SMEs`,
        fsiTargetUpgraded: `${keyword} (2026): Eligibility, Active Programs & Funding Caps`
      },
      {
        dimension: '3. Answer in First 100 Words',
        fsiCurrent: 'Generic opening paragraph',
        competitor1: '600+ words of preamble and filler',
        competitor2: 'Legislative summary / CRA jargon',
        competitor3: 'Marketing copy forcing sign up',
        fsiTargetUpgraded: '⚡ Explicit dollar amounts ($25K–$500K), eligibility criteria, and 2026 intake status in first 100 words'
      },
      {
        dimension: '4. Funding Amount & Caps',
        fsiCurrent: 'High-level range mentioned',
        competitor1: 'Outdated 2023–2024 numbers',
        competitor2: 'Exact program statutory caps',
        competitor3: 'Range locked behind account',
        fsiTargetUpgraded: 'Verified 2026 funding caps broken down by TRL stage and company size'
      },
      {
        dimension: '5. Eligibility Criteria',
        fsiCurrent: 'Standard incorporation note',
        competitor1: 'Basic bullet list',
        competitor2: 'Dense legal compliance rules',
        competitor3: 'Self-serve questionnaire only',
        fsiTargetUpgraded: 'Instant 60-Second Interactive Qualification Screener with pass/fail preflight metrics'
      },
      {
        dimension: '6. Application Process',
        fsiCurrent: 'High-level 3-step summary',
        competitor1: 'Sales pitch for consulting',
        competitor2: 'Direct link to government portal',
        competitor3: 'Platform walkthrough',
        fsiTargetUpgraded: 'Step-by-step document checklist, portal navigation, and submission roadmap'
      },
      {
        dimension: '7. Current-Year Information (2026)',
        fsiCurrent: '2025/2026 mentions',
        competitor1: 'Outdated or generic timestamps',
        competitor2: 'Official current fiscal updates',
        competitor3: 'Static dates',
        fsiTargetUpgraded: 'Verified 2026 fiscal cycle intake windows, deadlines, and active tranches'
      },
      {
        dimension: '8. Province Specificity',
        fsiCurrent: 'National perspective',
        competitor1: 'Ontario / Federal heavy',
        competitor2: 'Jurisdiction specific',
        competitor3: 'Filterable list',
        fsiTargetUpgraded: 'Province-by-province breakdown with matching regional development agencies'
      },
      {
        dimension: '9. Data Comparison Tables',
        fsiCurrent: 'Basic HTML table',
        competitor1: 'Text bullets (no tables)',
        competitor2: 'Dense multi-page tables',
        competitor3: 'Interactive grid',
        fsiTargetUpgraded: 'Structured comparison tables: Grant vs Loan vs Wage Subsidy with amounts & co-pay %'
      },
      {
        dimension: '10. FAQ Section',
        fsiCurrent: '3 standard questions',
        competitor1: 'None or generic 2 FAQs',
        competitor2: 'Comprehensive official FAQ',
        competitor3: 'Support FAQ',
        fsiTargetUpgraded: 'Schema-enabled FAQ answering top search queries (rejection reasons, stacking, tax interactions)'
      },
      {
        dimension: '11. Authoritative Sources',
        fsiCurrent: '1–2 government links',
        competitor1: 'Zero external citations',
        competitor2: 'Primary source regulations',
        competitor3: 'Self-referential',
        fsiTargetUpgraded: 'Verified primary source links (ISED, NRC IRAP, CRA, provincial ministries)'
      },
      {
        dimension: '12. Internal Links',
        fsiCurrent: 'Standard footer links',
        competitor1: 'Ad-hoc blog links',
        competitor2: 'Navigational breadcrumbs',
        competitor3: 'Platform routing',
        fsiTargetUpgraded: 'Server-rendered topical authority graph (informational ──► hub ──► calculator ──► action plan)'
      },
      {
        dimension: '13. Commercial CTAs',
        fsiCurrent: 'Standard contact form',
        competitor1: '$2,500+ consultation only',
        competitor2: 'None (Public service)',
        competitor3: 'SaaS subscription ($99/mo)',
        fsiTargetUpgraded: '4-Tier Revenue Ladder: Free Diagnostic ($0) ──► Action Plan ($49) ──► Strategy Session ($199) ──► Full Filing ($2,500+)'
      },
      {
        dimension: '14. Trust & E-E-A-T',
        fsiCurrent: 'Verified author badge',
        competitor1: 'Consulting agency bio',
        competitor2: 'Government domain authority (.gc.ca)',
        competitor3: 'Startup team page',
        fsiTargetUpgraded: 'Funding specialist authorship, structured Organization schema, verified methodologies'
      },
      {
        dimension: '15. Unique Proprietary Information',
        fsiCurrent: 'Aggregated summaries',
        competitor1: 'High-ticket sales pitch',
        competitor2: 'Legal statutes',
        competitor3: 'Scraped database',
        fsiTargetUpgraded: 'Proprietary Capital Stacking Matrix (Combining Federal + Provincial + SR&ED without clawbacks)'
      }
    ]

    return {
      keyword,
      urlPath,
      googleExpects: `Authoritative 2026 guidance answering exact funding caps, eligibility criteria, and application steps for "${keyword}".`,
      competitorsProvide: `Static directory lists, high-ticket consulting gates, or bureaucratic jargon without instant decision tools.`,
      fsiCurrentlyProvides: `High-level eligibility summary with standard grant descriptions and general contact forms.`,
      missingGaps: [
        'Answer-First Block in the top 100 words with exact funding amounts and intake status',
        'Structured program comparison tables showing co-pay percentages and approval timelines',
        'Multi-grant capital stacking rules (how to combine federal and provincial awards legally)'
      ],
      fsiDifferentiators: [
        '⚡ 100-Word Answer Block with explicit dollar caps and live intake status',
        '🎯 Instant 60-Second Interactive Grant Calculator & Eligibility Screener',
        '📊 Actionable $49 Comprehensive Funding Action Plan & Preflight Checklist',
        '🔗 Legal Multi-Grant Capital Stacking Framework (IRAP + SR&ED + Regional)',
        '🤝 Direct routing to 1-on-1 Executive Strategy Sessions ($199) and Full-Service Filing ($2,500+)'
      ],
      matrix
    }
  }
}
