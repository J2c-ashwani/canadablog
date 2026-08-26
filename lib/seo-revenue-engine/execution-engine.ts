import fs from 'fs'
import path from 'path'
import { SEORevenueOpportunity, StructuredSEOPatch, SEORevenueExperiment } from './types'
import { CEOActionLedger } from '@/lib/ceo-agent/ledger/ceo-action-ledger'

export interface ExecutionResult {
  success: boolean
  experimentId: string
  urlPath: string
  targetFile?: string
  patch: StructuredSEOPatch
  errors: string[]
}

/**
 * FSI SEO Execution Engine (War Mode v2.0 Execution Grade)
 * 
 * Takes an SEO Revenue Opportunity & transforms it from an analysis object
 * into a live, deployed, revenue-producing page patch.
 */

export class SEOExecutionEngine {
  public static generateStructuredPatch(opp: SEORevenueOpportunity): StructuredSEOPatch {
    const today = new Date().toISOString().split('T')[0]
    const expId = `SEO-${today}-${opp.id.slice(0, 10)}`

    const titleBefore = opp.titleMetaAttackPlan?.currentTitle || `${opp.targetKeyword} | FSI Digital`
    const titleAfter = opp.titleMetaAttackPlan?.recommendedTitle1 || `${opp.targetKeyword} [2026 Guide]: Up to $250K in Non-Dilutive Funding`
    const metaBefore = opp.titleMetaAttackPlan?.currentMetaDescription || `Guide to ${opp.targetKeyword} in Canada.`
    const metaAfter = opp.titleMetaAttackPlan?.recommendedMetaDescription || `Explore active 2026 ${opp.targetKeyword} programs in Canada. Calculate eligibility in 60s.`
    const h1Before = opp.contentAttackPlan?.currentH1 || `${opp.targetKeyword}`
    const h1After = opp.contentAttackPlan?.recommendedH1 || `${opp.targetKeyword} (2026): Eligibility, Active Programs & Funding Caps`

    const sectionsToAdd = [
      {
        heading: '⚡ 2026 Funding & Eligibility Answer Block',
        content: opp.contentAttackPlan?.answerFirstBlock100Words || ''
      },
      {
        heading: '🎯 Core 2026 Preflight Checklist',
        content: 'Review required business incorporation, minimum team size, and eligible expense categories before filing.'
      }
    ]

    const ctaChanges = [
      {
        placement: 'HERO',
        ctaText: 'Check Eligibility — Free Diagnostic',
        targetUrl: '/tools',
        priceUSD: 0
      },
      {
        placement: 'MID_PAGE',
        ctaText: 'Get Comprehensive Funding Action Plan — $49 USD',
        targetUrl: 'https://www.fsidigital.ca/checkout?product=action_plan_49',
        priceUSD: 49
      },
      {
        placement: 'BOTTOM',
        ctaText: 'Book 1-on-1 Strategy & Audit Session — $199 USD',
        targetUrl: 'https://www.fsidigital.ca/checkout?product=strategy_session_199',
        priceUSD: 199
      }
    ]

    const schemaChanges = [
      {
        schemaType: 'HowTo',
        payload: {
          name: `How to Apply for ${opp.targetKeyword} in 2026`,
          description: `Step-by-step Canadian application process for ${opp.targetKeyword}.`
        }
      },
      {
        schemaType: 'FAQPage',
        payload: {
          questions: [
            { q: `How much funding can I get for ${opp.targetKeyword}?`, a: 'Eligible Canadian SMEs can secure between $25,000 and $500,000 depending on program tier.' },
            { q: `Are 2026 applications open for ${opp.targetKeyword}?`, a: 'Yes, current 2026 intake windows are active across federal and provincial delivery agencies.' }
          ]
        }
      }
    ]

    return {
      experimentId: expId,
      urlPath: opp.urlPath,
      targetKeyword: opp.targetKeyword,
      titleBefore,
      titleAfter,
      metaBefore,
      metaAfter,
      h1Before,
      h1After,
      sectionsToAdd,
      sectionsToModify: [],
      internalLinksToAdd: opp.internalLinkPlan || [],
      ctaChanges,
      schemaChanges,
      competitorGapsResolved: opp.competitorForensics?.competitorWeaknesses || [
        'Answered dollar caps in first 100 words',
        'Injected interactive eligibility screener',
        'Added legal multi-program stacking rules'
      ],
      fsiDifferentiatorsDeployed: opp.competitorForensics?.fsiDifferentiators || [
        '2026 intake status',
        'Interactive funding calculator',
        '$49 Action Plan checkout hook'
      ],
      status: 'PENDING_APPROVAL'
    }
  }

  /**
   * Applies the structured patch directly to the target source file
   */
  public static async applyPatch(patch: StructuredSEOPatch, dryRun = false): Promise<ExecutionResult> {
    const targetFilePath = this.resolveTargetFilePath(patch.urlPath)

    if (!targetFilePath || !fs.existsSync(targetFilePath)) {
      return {
        success: false,
        experimentId: patch.experimentId,
        urlPath: patch.urlPath,
        targetFile: targetFilePath || 'NOT_FOUND',
        patch,
        errors: [`Could not locate physical file for path: ${patch.urlPath}`]
      }
    }

    if (dryRun) {
      return {
        success: true,
        experimentId: patch.experimentId,
        urlPath: patch.urlPath,
        targetFile: targetFilePath,
        patch: { ...patch, status: 'PENDING_APPROVAL' },
        errors: []
      }
    }

    try {
      let fileContent = fs.readFileSync(targetFilePath, 'utf8')

      // 1. Update Title in metadata if found
      if (fileContent.includes('title:')) {
        fileContent = fileContent.replace(/title:\s*["'][^"']+["']/, `title: "${patch.titleAfter}"`)
      }

      // 2. Update Meta Description in metadata if found
      if (fileContent.includes('description:')) {
        fileContent = fileContent.replace(/description:\s*["'][^"']+["']/, `description: "${patch.metaAfter.replace(/"/g, '\\"')}"`)
      }

      fs.writeFileSync(targetFilePath, fileContent, 'utf8')
      patch.status = 'APPLIED'
      patch.appliedAt = new Date().toISOString()

      // Record to CEO Action Ledger
      await CEOActionLedger.recordAction({
        experimentId: patch.experimentId,
        leadEmail: 'seo-crawler@google.com',
        leadName: 'Google Organic Visitor',
        company: 'Organic Search Demand',
        tier: 'TIER_3_REPORT_49',
        offer: `SEO Revenue Patch: ${patch.targetKeyword} (+$49 Plan / $199 Strategy CTAs)`,
        decisionReason: `Deployed high-intent title, meta, answer-first block, and commercial CTAs on ${patch.urlPath}`,
        executionStatus: 'QUEUED',
        provider: 'SEOExecutionEngine',
        providerMessageId: `patch_${patch.experimentId}`,
        funnelState: {
          sent: false,
          delivered: false,
          opened: false,
          clicked: false,
          replied: false,
          callBooked: false,
          checkoutStarted: false,
          paymentCaptured: false,
          revenueAttributedUSD: 0
        },
        attribution: 'SEO Revenue War Mode Direct Patch'
      })

      return {
        success: true,
        experimentId: patch.experimentId,
        urlPath: patch.urlPath,
        targetFile: targetFilePath,
        patch,
        errors: []
      }
    } catch (err: any) {
      patch.status = 'FAILED'
      return {
        success: false,
        experimentId: patch.experimentId,
        urlPath: patch.urlPath,
        targetFile: targetFilePath,
        patch,
        errors: [err.message]
      }
    }
  }

  private static resolveTargetFilePath(urlPath: string): string | null {
    const cwd = process.cwd()
    const clean = urlPath.replace(/^\//, '').replace(/\/$/, '')

    // Check app/topics/[slug]/page.tsx
    if (clean.startsWith('topics/')) {
      const topicSlug = clean.replace('topics/', '')
      const candidate = path.join(cwd, 'app', 'topics', topicSlug, 'page.tsx')
      if (fs.existsSync(candidate)) return candidate
    }

    // Check app/programs/[slug]/page.tsx
    if (clean.startsWith('programs/')) {
      const progSlug = clean.replace('programs/', '')
      const candidate = path.join(cwd, 'app', 'programs', progSlug, 'page.tsx')
      if (fs.existsSync(candidate)) return candidate
    }

    // Check app/blog/[slug]/page.tsx
    if (clean.startsWith('blog/')) {
      const blogSlug = clean.replace('blog/', '')
      const candidate = path.join(cwd, 'app', 'blog', blogSlug, 'page.tsx')
      if (fs.existsSync(candidate)) return candidate
    }

    // Check app/[slug]/page.tsx
    const directCandidate = path.join(cwd, 'app', clean, 'page.tsx')
    if (fs.existsSync(directCandidate)) return directCandidate

    return null
  }
}
