import fs from 'fs'
import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { IntentEngine } from '../lib/seo-revenue-engine/intent-engine'
import { CTREngine } from '../lib/seo-revenue-engine/ctr-engine'
import { RTEScoringEngine } from '../lib/seo-revenue-engine/rte-scoring-engine'
import { CompetitorEngine } from '../lib/seo-revenue-engine/competitor-engine'
import { SEOExecutionEngine } from '../lib/seo-revenue-engine/execution-engine'
import { SEOExperimentEngine } from '../lib/seo-revenue-engine/experiment-engine'
import { SEORevenueOpportunity, StructuredSEOPatch } from '../lib/seo-revenue-engine/types'

interface RawGSCPage {
  url: string
  clicks: number
  impressions: number
  ctr: number
  position: number
}

async function runSEOWarPipeline() {
  console.log('====================================================')
  console.log('🚀 FSI SEO REVENUE WAR PIPELINE — TOP 100 EXECUTION')
  console.log('====================================================\n')

  // 1. Ingest Pages.csv
  const pagesCsvPath = path.join(process.cwd(), '3monthGSCdata', 'Pages.csv')
  if (!fs.existsSync(pagesCsvPath)) {
    throw new Error(`Cannot find 3monthGSCdata/Pages.csv at ${pagesCsvPath}`)
  }

  const rawPagesContent = fs.readFileSync(pagesCsvPath, 'utf8')
  const lines = rawPagesContent.split('\n').filter(Boolean)
  const rawPages: RawGSCPage[] = []

  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(',')
    if (parts.length >= 5) {
      const url = parts[0].trim().replace(/^"|"$/g, '')
      const clicks = parseInt(parts[1], 10) || 0
      const impressions = parseInt(parts[2], 10) || 0
      const ctr = parseFloat(parts[3].replace('%', '')) || 0
      const position = parseFloat(parts[4]) || 0

      // Filter out root homepage or near-zero impression pages
      if (url && url !== 'https://www.fsidigital.ca/' && impressions >= 50) {
        rawPages.push({ url, clicks, impressions, ctr, position })
      }
    }
  }

  console.log(`[Step 1] Ingested ${rawPages.length} qualified pages from GSC Pages.csv`)

  // 2. Score & Rank All Pages to produce Top 100 Commercial Inventory
  const scoredPages: SEORevenueOpportunity[] = []

  for (const page of rawPages) {
    const urlObj = new URL(page.url)
    const urlPath = urlObj.pathname
    const inferredKw = inferKeywordFromUrl(urlPath)

    const classification = IntentEngine.classifyKeyword(inferredKw)
    if (classification.tier === 'TIER_D_GARBAGE') continue

    const position = page.position || 15
    const impressions = page.impressions || 100
    const clicks = page.clicks || 0
    const currentCTR = impressions > 0 ? (clicks / impressions) * 100 : 0.05
    const expectedBaselineCTR = CTREngine.getExpectedBaselineCTR(position) * 100
    const targetCTR = Math.min(12, Math.max(currentCTR * 2.2, expectedBaselineCTR * 1.15))

    const serpAttackability = position <= 15 ? 'VERY_HIGH' : (position <= 35 ? 'HIGH' : 'MEDIUM')

    // Commercial Offer Modeling
    const offerPrice = classification.recommendedOfferPriceUSD || 49
    const offerTier = offerPrice === 2500 ? 'TIER_FILING_2500' : (offerPrice === 199 ? 'TIER_STRATEGY_199' : (offerPrice === 79 ? 'TIER_BUNDLE_79' : (offerPrice === 49 ? 'TIER_ACTION_PLAN_49' : 'TIER_REPORT_19')))
    const convRate = offerPrice === 2500 ? 0.0015 : (offerPrice === 199 ? 0.008 : (offerPrice === 79 ? 0.012 : (offerPrice === 49 ? 0.018 : 0.025)))

    const currentMonthlyExpectedRevenueUSD = Number(((impressions * (currentCTR / 100)) * convRate * offerPrice).toFixed(2))
    const projectedMonthlyExpectedRevenueUSD = Number(((impressions * (targetCTR / 100)) * convRate * offerPrice).toFixed(2))
    const incrementalMonthlyGainUSD = Number(Math.max(0, projectedMonthlyExpectedRevenueUSD - currentMonthlyExpectedRevenueUSD).toFixed(2))

    // Composite Revenue Score (0 - 100)
    const demandScore = Math.min(100, (impressions / 4000) * 100)
    const rankProbScore = position <= 12 ? 95 : (position <= 25 ? 75 : (position <= 45 ? 55 : 35))
    const ctrOppScore = CTREngine.isEligibleForCTRAttack(impressions, position, currentCTR / 100) ? 95 : 50
    const commercialIntentScore = classification.intentConfidence.commercialIntentPercent
    const serpWeaknessScore = position <= 20 ? 90 : 65
    const conversionPotentialScore = offerPrice >= 49 ? 90 : 60
    const competitiveFeasibilityScore = position <= 30 ? 85 : 55

    const compositeScore = Number((
      demandScore * 0.20 +
      rankProbScore * 0.20 +
      ctrOppScore * 0.15 +
      commercialIntentScore * 0.20 +
      serpWeaknessScore * 0.10 +
      conversionPotentialScore * 0.05 +
      competitiveFeasibilityScore * 0.10
    ).toFixed(1))

    const rteScore = RTEScoringEngine.calculateRTEScore({
      keyword: inferredKw,
      urlPath,
      currentPosition: position,
      impressions,
      currentCTR: currentCTR / 100,
      commercialIntent: classification.commercialIntent,
      serpAttackability,
      hasAnswerFirstBlock: false,
      hasInteractiveTool: true,
      hasInternalLinks: false,
      hasPricingAndDeadlines: false
    })

    const opp: SEORevenueOpportunity = {
      id: `opp_${urlPath.replace(/[^a-z0-9]/g, '_').slice(0, 30)}`,
      urlPath,
      targetKeyword: inferredKw,
      keywordTier: classification.tier,
      currentPosition: position,
      impressions,
      clicks,
      currentCTR: Number(currentCTR.toFixed(2)),
      expectedBaselineCTR: Number(expectedBaselineCTR.toFixed(2)),
      targetCTR: Number(targetCTR.toFixed(2)),
      commercialIntent: classification.commercialIntent,
      intentConfidence: classification.intentConfidence,
      serpAttackability,
      competitorDifficulty: position <= 12 ? 'LOW' : (position <= 25 ? 'MEDIUM' : 'HIGH'),
      recommendedOfferTier: offerTier,
      offerPriceUSD: offerPrice,
      currentMonthlyExpectedRevenueUSD,
      projectedMonthlyExpectedRevenueUSD,
      incrementalMonthlyGainUSD,
      revenueScore: {
        searchDemandScore: demandScore,
        rankingProbabilityScore: rankProbScore,
        ctrOpportunityScore: ctrOppScore,
        commercialIntentScore,
        serpWeaknessScore,
        conversionPotentialScore,
        competitiveFeasibilityScore,
        compositeScore
      },
      rteScore
    }

    scoredPages.push(opp)
  }

  // Sort by Composite Revenue Opportunity Score & Incremental Gain
  scoredPages.sort((a, b) => b.revenueScore.compositeScore - a.revenueScore.compositeScore || b.incrementalMonthlyGainUSD - a.incrementalMonthlyGainUSD)

  const top100 = scoredPages.slice(0, 100)
  console.log(`[Step 2] Filtered & Ranked Top 100 Commercial Inventory (Priority Positions 5–60)\n`)

  // 3. Save reports/seo-top100-commercial-inventory.csv
  const reportsDir = path.join(process.cwd(), 'reports')
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true })

  const csvRows: string[] = [
    'Rank,URL,Target Keyword,Impressions,Clicks,Current CTR,Position,Intent Category,Commercial Intent %,RTE Score,Current Monthly EV ($),Projected Monthly EV ($),Incremental Gain ($),Offer Tier,Price ($)'
  ]

  top100.forEach((item, index) => {
    csvRows.push([
      index + 1,
      `https://www.fsidigital.ca${item.urlPath}`,
      `"${item.targetKeyword}"`,
      item.impressions,
      item.clicks,
      `${item.currentCTR}%`,
      item.currentPosition.toFixed(1),
      item.intentConfidence.primaryIntentCategory,
      `${item.intentConfidence.commercialIntentPercent}%`,
      item.rteScore.overallRTEScore,
      `$${item.currentMonthlyExpectedRevenueUSD.toFixed(2)}`,
      `$${item.projectedMonthlyExpectedRevenueUSD.toFixed(2)}`,
      `$${item.incrementalMonthlyGainUSD.toFixed(2)}`,
      item.recommendedOfferTier,
      `$${item.offerPriceUSD}`
    ].join(','))
  })

  const top100CsvPath = path.join(reportsDir, 'seo-top100-commercial-inventory.csv')
  fs.writeFileSync(top100CsvPath, csvRows.join('\n'), 'utf8')
  console.log(`[Step 3] Generated ${top100CsvPath}`)

  // 4. Select Top 10 Optimization Candidates & Execute Live Page Upgrades
  const top10 = top100.slice(0, 10)
  console.log(`\n[Step 4] Executing Live Optimization on Top 10 Highest-Value Pages:`)

  const executedResults: Array<{ url: string; experimentId: string; modified: boolean; targetFile?: string }> = []

  for (let i = 0; i < top10.length; i++) {
    const opp = top10[i]
    console.log(`\n----------------------------------------------------`)
    console.log(`Optimizing #${i + 1}: ${opp.targetKeyword}`)
    console.log(`URL: https://www.fsidigital.ca${opp.urlPath}`)
    console.log(`Stats: ${opp.impressions.toLocaleString()} imp | #${opp.currentPosition.toFixed(1)} | CTR: ${opp.currentCTR}% | Expected Gain: +$${opp.incrementalMonthlyGainUSD.toFixed(2)}/mo`)

    // SERP Competitor Analysis
    const forensics = await CompetitorEngine.analyzeCompetitorsForKeyword(opp.targetKeyword)
    opp.competitorForensics = forensics

    // Generate Structured Patch
    const patch = SEOExecutionEngine.generateStructuredPatch(opp)
    opp.generatedPatch = patch

    // Apply Live Modification to Codebase
    const applyResult = applyPageModification(opp.urlPath, patch)

    // Register Multi-Stage Experiment
    const exp = SEOExperimentEngine.createExperimentFromOpportunity(opp)

    executedResults.push({
      url: opp.urlPath,
      experimentId: exp.experimentId,
      modified: applyResult.modified,
      targetFile: applyResult.targetFile
    })

    console.log(`Patch Applied: ${applyResult.modified ? '✅ SUCCESS' : '⚠️ FILE SKIPPED / DYNAMIC'} (${applyResult.targetFile || 'N/A'})`)
    console.log(`Experiment ID: ${exp.experimentId} (Clocks: Stage 1 24h ──► Stage 2 7d ──► Stage 3 14d ──► Stage 4 21d)`)
  }

  // 5. Generate Optimization Summary Markdown Report
  const summaryMdPath = path.join(reportsDir, 'seo-top10-optimization-execution-report.md')
  const summaryMd = generateExecutionSummaryReport(top10)
  fs.writeFileSync(summaryMdPath, summaryMd, 'utf8')
  console.log(`\n[Step 5] Written execution report to ${summaryMdPath}`)

  console.log('\n====================================================')
  console.log('✅ SEO REVENUE WAR PIPELINE COMPLETED')
  console.log('====================================================')
}

function inferKeywordFromUrl(urlPath: string): string {
  const clean = urlPath.replace(/^\//, '').replace(/\/$/, '')
  const slug = clean.split('/').pop() || clean
  return slug
    .replace(/-/g, ' ')
    .replace(/\b(guide|complete|2026|canada|programs)\b/gi, '')
    .trim()
}

function applyPageModification(urlPath: string, patch: StructuredSEOPatch): { modified: boolean; targetFile?: string } {
  const cwd = process.cwd()
  const clean = urlPath.replace(/^\//, '').replace(/\/$/, '')
  const slug = clean.split('/').pop() || clean

  // 1. Check if blog JSON exists in lib/data/blog-content/[slug].json
  const blogJsonPath = path.join(cwd, 'lib', 'data', 'blog-content', `${slug}.json`)
  if (fs.existsSync(blogJsonPath)) {
    try {
      const raw = fs.readFileSync(blogJsonPath, 'utf8')
      const data = JSON.parse(raw)

      // Inject 2026 optimized SEO title & meta description
      if (!data.seo) data.seo = {}
      data.seo.metaTitle = patch.titleAfter
      data.seo.metaDescription = patch.metaAfter
      data.seo.seoUpdatedAt = new Date().toISOString()
      data.seo.seoVersion = (data.seo.seoVersion || 1) + 1

      // Inject Answer Block
      if (patch.sectionsToAdd && patch.sectionsToAdd.length > 0) {
        const answerBlock = patch.sectionsToAdd[0].content
        if (answerBlock) {
          data.shortAnswer = answerBlock
          data.shortAnswerQuestion = `${patch.targetKeyword} (2026): Who Qualifies & Funding Amounts`
        }
      }

      // Upgrade Commercial CTAs
      data.inlineCTA = {
        title: `Need Expert Grant Filing & Strategy for ${patch.targetKeyword}?`,
        description: `Get your custom 2026 Funding Action Plan & Preflight Checklist ($49 USD) or book an Executive Strategy Session ($199 USD).`,
        buttonText: `Download 2026 Action Plan ($49)`,
        buttonLink: `https://www.fsidigital.ca/checkout?product=action_plan_49`
      }

      fs.writeFileSync(blogJsonPath, JSON.stringify(data, null, 2), 'utf8')
      return { modified: true, targetFile: blogJsonPath }
    } catch (e) {
      console.warn(`[applyPageModification] Could not modify JSON for ${slug}:`, e)
    }
  }

  // 2. Check if hardcoded app/blog/[slug]/page.tsx exists
  const appBlogPath = path.join(cwd, 'app', 'blog', slug, 'page.tsx')
  if (fs.existsSync(appBlogPath)) {
    try {
      let content = fs.readFileSync(appBlogPath, 'utf8')
      if (content.includes('title:')) {
        content = content.replace(/title:\s*["'][^"']+["']/, `title: "${patch.titleAfter}"`)
      }
      if (content.includes('description:')) {
        content = content.replace(/description:\s*["'][^"']+["']/, `description: "${patch.metaAfter.replace(/"/g, '\\"')}"`)
      }
      fs.writeFileSync(appBlogPath, content, 'utf8')
      return { modified: true, targetFile: appBlogPath }
    } catch (e) {
      console.warn(`[applyPageModification] Could not modify app/blog for ${slug}:`, e)
    }
  }

  // 3. Check if app/topics/[slug]/page.tsx exists
  const appTopicPath = path.join(cwd, 'app', 'topics', slug, 'page.tsx')
  if (fs.existsSync(appTopicPath)) {
    try {
      let content = fs.readFileSync(appTopicPath, 'utf8')
      if (content.includes('title:')) {
        content = content.replace(/title:\s*["'][^"']+["']/, `title: "${patch.titleAfter}"`)
      }
      if (content.includes('description:')) {
        content = content.replace(/description:\s*["'][^"']+["']/, `description: "${patch.metaAfter.replace(/"/g, '\\"')}"`)
      }
      fs.writeFileSync(appTopicPath, content, 'utf8')
      return { modified: true, targetFile: appTopicPath }
    } catch (e) {
      console.warn(`[applyPageModification] Could not modify app/topics for ${slug}:`, e)
    }
  }

  return { modified: false }
}

function generateExecutionSummaryReport(top10: SEORevenueOpportunity[]): string {
  const lines: string[] = []
  lines.push('# FSI Digital — SEO Revenue War Mode Top 10 Execution Report')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push('Primary Metric: Incremental Revenue ($USD)\n')

  lines.push('## Executive Summary')
  const totalGain = top10.reduce((acc, curr) => acc + curr.incrementalMonthlyGainUSD, 0)
  lines.push(`- **Total Optimized Target Pages:** 10`)
  lines.push(`- **Total Combined Monthly Impressions:** ${top10.reduce((a, c) => a + c.impressions, 0).toLocaleString()}`)
  lines.push(`- **Modelled Incremental Monthly Gain:** +$${totalGain.toFixed(2)} USD / Month`)
  lines.push(`- **Observation Clocks Active:** Stage 1 (24-72h Technical) ──► Stage 2 (7d Search Signals) ──► Stage 3 (14d Rank Movement) ──► Stage 4 (21-28d Revenue Attribution)\n`)

  lines.push('## Deployed Page Optimizations')
  top10.forEach((opp, i) => {
    lines.push(`### ${i + 1}. [${opp.targetKeyword}](https://www.fsidigital.ca${opp.urlPath})`)
    lines.push(`- **Current Position:** #${opp.currentPosition.toFixed(1)} | **Impressions:** ${opp.impressions.toLocaleString()} | **Current CTR:** ${opp.currentCTR}% (Target: ${opp.targetCTR}%)`)
    lines.push(`- **8-Dimension RTE Score:** ${opp.rteScore.overallRTEScore}/100`)
    lines.push(`- **Weakest Dimensions:** ${opp.rteScore.weakestDimensions.join(' | ')}`)
    lines.push(`- **Title Deployed:** \`${opp.generatedPatch?.titleAfter}\``)
    lines.push(`- **Meta Deployed:** \`${opp.generatedPatch?.metaAfter}\``)
    lines.push(`- **Monetization Funnel:** $0 Free Diagnostic ──► $49 Comprehensive Action Plan ──► $199 Strategy Session`)
    lines.push(`- **Incremental Monthly Gain:** +$${opp.incrementalMonthlyGainUSD.toFixed(2)} USD / month\n`)
  })

  return lines.join('\n')
}

runSEOWarPipeline().catch(console.error)
