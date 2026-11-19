/**
 * FSI Digital — Zero-Upload Infinite Daily 2D Animated Video Factory & Social Publisher
 *
 * Runs on GitHub Actions (0 bytes Vercel bandwidth, 0 manual MP4 uploads):
 *  1. Rotates across 7 distinct daily formats (Mon–Sun)
 *  2. Selects a brand-new, never-posted topic from 6,400+ pages (122+ Programs, 200+ Blogs, 6,150+ City×Industry pSEO hubs)
 *  3. Dynamically builds a 5-scene 2D animated explainer config with real funding data
 *  4. Renders a fresh 1080x1920 30fps MP4 with Neural Voiceover + Ducked Lo-Fi BGM + Kinetic Captions
 *  5. Uploads directly as binary to Facebook Reels, Instagram Reels (@fsidigital), YouTube Shorts, & LinkedIn
 *  6. Syncs live links to Upstash Redis + Google Sheets for the unified 7:05 PM IST CEO Daily Briefing
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
dotenv.config()

import fs from 'fs'
import path from 'path'
import {
  acquireOperationLease,
  finishOperationLease,
  getLatestOperationalState,
  setOperationalState,
} from '../lib/growth-os/operations-store'
import { ChannelAdapters, type ChannelPublishResult } from '../lib/growth-os/execution/adapters/channel-adapters'
import { NativeYouTubeAdapter } from '../lib/growth-os/execution/adapters/youtube-adapter'
import { programsDatabase, type ProgramDetails } from '../lib/data/programs'
import { getAllBlogPosts, type BlogPost } from '../lib/data/blogPosts'
import { getPublishedPseoPages, type PseoPage } from '../lib/pseo-data'
import { sendEmail } from '../lib/emails/mailer'

const SPRINT_STATE_KEY = 'social-revenue-sprint-september-v1'
const HISTORY_STATE_KEY = 'infinite-social-video-history-v1'
const MIN_GAP_MS = process.env.SOCIAL_VARIANT_GAP_MS
  ? Number(process.env.SOCIAL_VARIANT_GAP_MS)
  : (16 * 60 * 60 * 1000)

interface InfiniteHistoryState {
  publishedKeys: string[]
  lastPublishedAt: string
  totalPublished: number
  recentItems: Array<{
    key: string
    title: string
    format: string
    publishedAt: string
  }>
}

interface DayFormatSpec {
  dayIndex: number
  formatKey: string
  formatName: string
  pillarId: number
  voice: string
  bgm: string
  badgeBg: string
  accentColor: string
  subColor: string
  topBadge: string
  hookCategory: string
  curiosityCue: string
}

const SEVEN_DAY_FORMATS: Record<number, DayFormatSpec> = {
  // Sunday (0) — Funding Caps & Active Deadlines Alert
  0: {
    dayIndex: 0,
    formatKey: 'deadlines-caps',
    formatName: 'Sunday — Funding Caps & Intake Alert',
    pillarId: 6,
    voice: 'en-CA-LiamNeural',
    bgm: 'bgm-01.mp3',
    badgeBg: '#D97706',
    accentColor: '#FBBF24',
    subColor: '#34D399',
    topBadge: '⏱️ ACTIVE FUNDING CAP ALERT',
    hookCategory: '📅 DEADLINE & ALLOCATION BRIEFING',
    curiosityCue: '⏱️',
  },
  // Monday (1) — Rejection Traps & Audit Killers
  1: {
    dayIndex: 1,
    formatKey: 'rejection-traps',
    formatName: 'Monday — Rejection Traps & Audit Killers',
    pillarId: 1,
    voice: 'en-CA-LiamNeural',
    bgm: 'bgm-01.mp3',
    badgeBg: '#DC2626',
    accentColor: '#F87171',
    subColor: '#FBBF24',
    topBadge: '⚠️ GRANT REJECTION WARNING',
    hookCategory: '🚨 AUDIT KILLER BREAKDOWN',
    curiosityCue: '⚠️',
  },
  // Tuesday (2) — Legal Grant Stacking Formula
  2: {
    dayIndex: 2,
    formatKey: 'grant-stacking',
    formatName: 'Tuesday — Legal Grant Stacking Formula',
    pillarId: 2,
    voice: 'en-CA-ClaraNeural',
    bgm: 'bgm-02.mp3',
    badgeBg: '#059669',
    accentColor: '#34D399',
    subColor: '#38BDF8',
    topBadge: '🥞 LEGAL GRANT STACKING',
    hookCategory: '💡 MULTI-STREAM CAPITAL STRATEGY',
    curiosityCue: '🥞',
  },
  // Wednesday (3) — Federal / Provincial / State Program Spotlight
  3: {
    dayIndex: 3,
    formatKey: 'program-spotlight',
    formatName: 'Wednesday — Program Deep-Dive Spotlight',
    pillarId: 3,
    voice: 'en-CA-LiamNeural',
    bgm: 'bgm-01.mp3',
    badgeBg: '#2563EB',
    accentColor: '#38BDF8',
    subColor: '#34D399',
    topBadge: '🏛️ OFFICIAL GRANT SPOTLIGHT',
    hookCategory: '🚀 NON-DILUTIVE CAPITAL BRIEFING',
    curiosityCue: '💡',
  },
  // Thursday (4) — Local City × Industry Hub (6,150+ pSEO Pages)
  4: {
    dayIndex: 4,
    formatKey: 'local-industry-hub',
    formatName: 'Thursday — Local City × Industry Spotlight',
    pillarId: 4,
    voice: 'en-CA-ClaraNeural',
    bgm: 'bgm-03.mp3',
    badgeBg: '#7C3AED',
    accentColor: '#A78BFA',
    subColor: '#34D399',
    topBadge: '📍 REGIONAL INDUSTRY FUNDING',
    hookCategory: '🏙️ LOCAL GRANT ALLOCATION',
    curiosityCue: '📍',
  },
  // Friday (5) — Niche Founder & Sector Guide
  5: {
    dayIndex: 5,
    formatKey: 'sector-guide',
    formatName: 'Friday — Sector & Founder Niche Guide',
    pillarId: 5,
    voice: 'en-CA-ClaraNeural',
    bgm: 'bgm-02.mp3',
    badgeBg: '#DB2777',
    accentColor: '#F472B6',
    subColor: '#34D399',
    topBadge: '✨ TARGETED FOUNDER FUNDING',
    hookCategory: '🎯 SECTOR GRANT OPPORTUNITY',
    curiosityCue: '🎯',
  },
  // Saturday (6) — Pre-Filing Document Checklist
  6: {
    dayIndex: 6,
    formatKey: 'preflight-checklist',
    formatName: 'Saturday — Pre-Filing Document Checklist',
    pillarId: 7,
    voice: 'en-CA-LiamNeural',
    bgm: 'bgm-03.mp3',
    badgeBg: '#0D9488',
    accentColor: '#2DD4BF',
    subColor: '#FBBF24',
    topBadge: '✅ PRE-FILING CHECKLIST',
    hookCategory: '📋 AUDIT-READY SUBMISSION RULES',
    curiosityCue: '📋',
  },
}

interface SelectedTopic {
  topicKey: string
  slug: string
  title: string
  shortTitle: string
  amountLabel: string
  regionLabel: string
  sourceType: 'program' | 'blog' | 'pseo'
  pageUrl: string
  mythTitle: string
  mythSub: string
  mythBadge: string
  nodes: Array<{ icon: string; title: string; sub: string; color: string }>
  footnote: string
  flowSource: string
  flowDest: string
  spokenScript: string
  captionChunks: Array<{ text: string; highlight: string }>
  fbCaption: string
  igCaption: string
  liCaption: string
  ytTitle: string
  ytDescription: string
  hashtags: string[]
}

function cleanText(raw: string, maxLen = 120): string {
  const cleaned = String(raw || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/["`]/g, '')
    .trim()
  if (cleaned.length <= maxLen) return cleaned
  const cut = cleaned.slice(0, maxLen - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 12 ? cut.slice(0, lastSpace) : cut).trim()}…`
}

function firstSentence(raw: string, maxLen = 140): string {
  const cleaned = String(raw || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const sentenceMatch = cleaned.match(/^[^.!?]+[.!?]/)
  const candidate = sentenceMatch ? sentenceMatch[0].trim() : cleaned
  if (candidate.length <= maxLen) return candidate.replace(/[.!?]+$/, '')
  const cut = candidate.slice(0, maxLen)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 20 ? cut.slice(0, lastSpace) : cut).trim().replace(/[,;:\-]+$/, '')
}

function cleanSpoken(raw: string): string {
  return String(raw || '')
    .replace(/SR&ED/gi, 'S R and E D')
    .replace(/R&D/gi, 'R and D')
    .replace(/&/g, ' and ')
    .replace(/IRAP/gi, 'I-RAP')
    .replace(/\((?:CRA|CCPCs?|ITC|NRC|SBA|USDA)\)/gi, '')
    .replace(/CCPCs?/gi, 'incorporated Canadian businesses')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/…/g, '')
    .replace(/[^a-zA-Z0-9.,?!$%'\- ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractMoneyHighlight(text: string, fallback = 'UP TO $250K+'): string {
  const match = String(text || '').match(/\$[\d,.]+\s*(?:[KMB]|million|thousand|billion)?\+?/i)
  if (match) return match[0].toUpperCase()
  const pct = String(text || '').match(/\d+%/i)
  if (pct) return `UP TO ${pct[0]} FUNDED`
  return fallback
}

function getISTDayOfWeek(): number {
  const istStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
  }).format(new Date())
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  return map[istStr] ?? new Date().getUTCDay()
}

function buildTopicFromProgram(p: ProgramDetails, fmt: DayFormatSpec): SelectedTopic {
  const amount = extractMoneyHighlight(p.fundingAmount, 'NON-DILUTIVE GRANT')
  const shortName = cleanText(p.name.replace(/\([^)]*\)/g, '').trim(), 46)
  const region = p.region === 'Federal' ? `${p.country} Federal` : `${p.region}, ${p.country}`
  const elig1 = cleanText(p.eligibility[0] || `Registered ${p.country} business entity`, 44)
  const elig2 = cleanText(p.eligibility[1] || 'Defined eligible project budget & timeline', 44)
  const elig3 = cleanText(p.eligibility[2] || 'Active compliance before incurring costs', 44)
  const mistake = cleanText(
    p.commonMistakes?.[0] || p.insiderTips?.[0] || 'Applying after expenses were already spent',
    52
  )
  const step1 = cleanText(p.applicationProcess[0] || 'Verify eligibility criteria first', 44)
  const step2 = cleanText(p.applicationProcess[1] || 'Prepare itemized project budget', 44)
  const step3 = cleanText(p.applicationProcess[2] || 'Submit before intake cap closes', 44)

  const isTraps = fmt.formatKey === 'rejection-traps'
  const isStack = fmt.formatKey === 'grant-stacking'
  const isChecklist = fmt.formatKey === 'preflight-checklist'
  const isDeadline = fmt.formatKey === 'deadlines-caps'

  let title = `${shortName}: ${p.fundingAmount}`
  let hookQuestion = `Did you know ${shortName} offers ${p.fundingAmount} in ${p.fundingType.toLowerCase()} funding for ${region} businesses?`
  let mythTitle = 'ONLY MASSIVE COMPANIES QUALIFY'
  let mythSub = 'Or you need venture capital backing'
  let mythBadge = '❌ FALSE: SMES & STARTUPS QUALIFY'
  let nodes = [
    { icon: '🏛️', title: cleanText(p.agency, 30), sub: cleanText(p.fundingAmount, 40), color: '#38BDF8' },
    { icon: '✅', title: 'Core Eligibility', sub: elig1, color: '#818CF8' },
    { icon: '💎', title: 'Non-Dilutive Terms', sub: elig2, color: '#34D399' },
  ]

  if (isTraps) {
    title = `Avoid Getting Rejected by ${shortName}`
    hookQuestion = `Why do most founders get rejected from ${shortName} before an officer even reviews their project?`
    mythTitle = 'GREAT IDEA GUARANTEES APPROVAL'
    mythSub = mistake
    mythBadge = '❌ TRAP: COMPLIANCE DECIDES FIRST'
    nodes = [
      { icon: '🚫', title: 'Top Disqualifier', sub: mistake, color: '#F87171' },
      { icon: '📋', title: 'Mandatory Proof', sub: elig1, color: '#FBBF24' },
      { icon: '✅', title: 'Winning Rule', sub: elig2, color: '#34D399' },
    ]
  } else if (isStack) {
    title = `How to Legally Stack ${shortName}`
    hookQuestion = `Smart founders never rely on one grant. Here is how to stack ${shortName} with other ${p.country} programs.`
    mythTitle = 'ONLY ONE GRANT ALLOWED'
    mythSub = 'Founders leave half their funding behind'
    mythBadge = '❌ FALSE: STACKING IS LEGAL'
    nodes = [
      { icon: '1️⃣', title: cleanText(shortName, 28), sub: cleanText(p.fundingAmount, 38), color: '#38BDF8' },
      { icon: '2️⃣', title: 'Pair With Tax Credits', sub: 'Combine non-overlapping eligible costs', color: '#818CF8' },
      { icon: '3️⃣', title: 'Respect Stacking Cap', sub: 'Keep total public aid under program limit', color: '#34D399' },
    ]
  } else if (isChecklist) {
    title = `Pre-Filing Checklist for ${shortName}`
    hookQuestion = `Before spending forty hours applying for ${shortName}, verify these three mandatory requirements.`
    mythTitle = 'APPLY FIRST, FIX DOCS LATER'
    mythSub = 'Incomplete files are auto-rejected'
    mythBadge = '❌ FALSE: PREPARE DOCS FIRST'
    nodes = [
      { icon: '📄', title: 'Step 1: Qualify', sub: step1, color: '#2DD4BF' },
      { icon: '📊', title: 'Step 2: Budget', sub: step2, color: '#38BDF8' },
      { icon: '🚀', title: 'Step 3: Submit', sub: step3, color: '#34D399' },
    ]
  } else if (isDeadline) {
    title = `${shortName} (${p.deadlineType}): ${amount}`
    hookQuestion = `Funding alert for ${region} businesses: ${shortName} operates on ${p.deadlineType.toLowerCase()} with ${p.fundingAmount}.`
    mythTitle = 'GRANTS STAY OPEN ALL YEAR'
    mythSub = 'Budgets close once allocation runs out'
    mythBadge = '❌ FALSE: POOLS CLOSE EARLY'
    nodes = [
      { icon: '💰', title: 'Capital Available', sub: cleanText(p.fundingAmount, 40), color: '#FBBF24' },
      { icon: '📅', title: cleanText(p.deadlineType, 28), sub: `Status: ${p.status} · ${region}`, color: '#38BDF8' },
      { icon: '✅', title: 'Fastest Qualifier', sub: elig1, color: '#34D399' },
    ]
  }

  const spokenName = p.name.replace(/\s*\([^)]*\)/g, '').trim()
  const spokenMistake = firstSentence(
    p.commonMistakes?.[0] || p.insiderTips?.[0] || 'applying after project expenses were already spent',
    120
  )
  const spokenElig1 = firstSentence(p.eligibility[0] || `being a registered ${p.country} business entity`, 90)
  const spokenElig2 = firstSentence(p.eligibility[1] || 'having a defined eligible project budget and timeline', 90)

  const spokenHook = isTraps
    ? `Why do most founders get rejected from ${spokenName} before an officer even reviews their project?`
    : isStack
      ? `Smart founders never rely on one grant. Here is how to legally stack ${spokenName} with other ${p.country} programs.`
      : isChecklist
        ? `Before spending forty hours applying for ${spokenName}, verify these mandatory requirements.`
        : isDeadline
          ? `Funding alert for ${region} businesses. ${spokenName} operates on ${p.deadlineType.toLowerCase()} with ${p.fundingAmount}.`
          : `Did you know ${spokenName} offers ${p.fundingAmount} in ${p.fundingType.toLowerCase()} funding for ${region} businesses?`

  const spokenScript = cleanSpoken(
    `${spokenHook} Most founders miss out because of one avoidable mistake: ${spokenMistake}. ` +
    `With ${spokenName} from ${p.agency}, eligible ${p.country} companies must meet clear rules: ${spokenElig1}, and ${spokenElig2}. ` +
    `Zero equity is taken when structured properly. Check your exact funding match in 60 seconds at f s i digital dot c a slash calculator.`
  )

  const captionChunks = [
    { text: cleanText(shortName, 36), highlight: amount },
    { text: `${p.fundingAmount} · ${region}`, highlight: amount },
    { text: 'Avoid the #1 rejection mistake...', highlight: 'rejection mistake' },
    { text: cleanText(mistake, 42), highlight: cleanText(mistake, 20) },
    { text: cleanText(elig1, 42), highlight: cleanText(elig1, 20) },
    { text: cleanText(elig2, 42), highlight: cleanText(elig2, 20) },
    { text: `${p.agency} · Zero Equity`, highlight: 'Zero Equity' },
    { text: 'Check your exact grant match...', highlight: 'grant match' },
    { text: 'in 60s at fsidigital.ca/calculator', highlight: 'fsidigital.ca/calculator' },
  ]

  const baseHashtags = ['#FSIDigital', '#BusinessGrants', '#NonDilutiveFunding', p.country === 'Canada' ? '#CanadianBusiness' : '#USABusiness', '#StartupFunding', '#SmallBusinessGrants']
  const pageUrl = `https://www.fsidigital.ca/programs/${p.slug}`

  return {
    topicKey: `program:${p.slug}:${fmt.formatKey}`,
    slug: `daily-${p.slug}-${fmt.formatKey}`.slice(0, 64),
    title: cleanText(title, 95),
    shortTitle: shortName,
    amountLabel: amount,
    regionLabel: region,
    sourceType: 'program',
    pageUrl,
    mythTitle,
    mythSub,
    mythBadge,
    nodes,
    footnote: cleanText(`Agency: ${p.agency} · ${p.deadlineType}`, 68),
    flowSource: cleanText(p.agency, 22),
    flowDest: 'Equity-Free Growth',
    spokenScript,
    captionChunks,
    fbCaption: `${fmt.topBadge}\n\n${title}\n\nAgency: ${p.agency} (${region})\nFunding: ${p.fundingAmount}\n\nKey Rules:\n• ${elig1}\n• ${elig2}\n• ${elig3}\n\nTest your company's exact eligibility in 60 seconds (free, zero credit impact):\n👉 https://www.fsidigital.ca/calculator\n\nFull program breakdown: ${pageUrl}`,
    igCaption: `${fmt.topBadge}\n\n${title}\n\n💰 Allocation: ${p.fundingAmount}\n🏛️ Agency: ${p.agency}\n\nKey Requirements:\n✅ ${elig1}\n✅ ${elig2}\n✅ ${elig3}\n\nCheck your company's exact grant match in 60 seconds 👇\n🔗 fsidigital.ca/calculator (link in bio)`,
    liCaption: `${title}\n\n${p.description}\n\nKey eligibility benchmarks (${p.agency}):\n• ${elig1}\n• ${elig2}\n• ${elig3}\n\nEvaluate your organization's funding match in 60 seconds with our self-serve calculator (no call required):\nhttps://www.fsidigital.ca/calculator`,
    ytTitle: cleanText(`${shortName} (${amount}) — ${fmt.formatName.split('—')[1]?.trim() || 'Grant Guide'}`, 86),
    ytDescription: `${title}\n\nAgency: ${p.agency}\nFunding: ${p.fundingAmount}\n\nKey Eligibility:\n- ${elig1}\n- ${elig2}\n- ${elig3}\n\nCheck your eligibility in 60 seconds: https://www.fsidigital.ca/calculator\nFull Guide: ${pageUrl}\n\n${baseHashtags.join(' ')} #Shorts`,
    hashtags: baseHashtags,
  }
}

function buildTopicFromBlog(post: BlogPost, fmt: DayFormatSpec): SelectedTopic {
  const amount = extractMoneyHighlight(`${post.title} ${post.excerpt}`, 'UP TO $500K+')
  const shortTitle = cleanText(post.title.replace(/\|.*$/, '').trim(), 48)
  const tipContent = cleanText(post.expertTip?.content || post.shortAnswer || post.excerpt, 56)
  const metric1 = post.metrics?.[0]
    ? `${post.metrics[0].label}: ${post.metrics[0].value}`
    : `Category: ${post.category}`
  const metric2 = post.metrics?.[1]
    ? `${post.metrics[1].label}: ${post.metrics[1].value}`
    : 'Non-dilutive, zero equity given up'
  const faqAnswer = cleanText(post.faq?.[0]?.answer || post.excerpt, 48)
  const pageUrl = `https://www.fsidigital.ca/blog/${post.slug}`

  const spokenTitle = firstSentence(post.title.replace(/\|.*$/, '').trim(), 90)
  const spokenSummary = firstSentence(post.shortAnswer || post.excerpt, 150)
  const spokenTip = firstSentence(post.expertTip?.content || post.shortAnswer || post.excerpt, 120)
  const spokenScript = cleanSpoken(
    `Here is what every founder needs to know about ${spokenTitle}. ` +
    `${spokenSummary}. ` +
    `The insider rule most applicants overlook: ${spokenTip}. ` +
    `Before spending weeks drafting an application, check your exact funding match and readiness score in 60 seconds at f s i digital dot c a slash calculator.`
  )

  const captionChunks = [
    { text: cleanText(shortTitle, 38), highlight: amount },
    { text: cleanText(metric1, 42), highlight: cleanText(metric1, 20) },
    { text: 'Most founders overlook this rule...', highlight: 'overlook this rule' },
    { text: cleanText(tipContent, 42), highlight: cleanText(tipContent, 20) },
    { text: cleanText(metric2, 42), highlight: cleanText(metric2, 20) },
    { text: cleanText(faqAnswer, 42), highlight: cleanText(faqAnswer, 18) },
    { text: 'Test your grant readiness...', highlight: 'grant readiness' },
    { text: 'in 60s at fsidigital.ca/calculator', highlight: 'fsidigital.ca/calculator' },
  ]

  const baseHashtags = ['#FSIDigital', '#GovernmentGrants', '#SmallBusinessFunding', '#StartupGrants', '#NonDilutiveCapital', '#FounderTips']

  return {
    topicKey: `blog:${post.slug}`,
    slug: `daily-blog-${post.slug}`.slice(0, 64),
    title: cleanText(post.title, 95),
    shortTitle,
    amountLabel: amount,
    regionLabel: post.category || 'North America',
    sourceType: 'blog',
    pageUrl,
    mythTitle: 'GRANTS ARE TOO HARD TO WIN',
    mythSub: 'Most rejections are simple pre-filing errors',
    mythBadge: '❌ FALSE: ELIGIBILITY IS PREDICTABLE',
    nodes: [
      { icon: '💰', title: 'Funding Scope', sub: cleanText(metric1, 42), color: '#38BDF8' },
      { icon: '🎯', title: 'Key Takeaway', sub: cleanText(metric2, 42), color: '#818CF8' },
      { icon: '🛡️', title: 'Insider Tip', sub: cleanText(tipContent, 42), color: '#34D399' },
    ],
    footnote: cleanText(`Guide: ${post.category} · Updated 2026`, 68),
    flowSource: cleanText(post.category || 'Grant Pool', 22),
    flowDest: 'Funded Business',
    spokenScript,
    captionChunks,
    fbCaption: `${fmt.topBadge}\n\n${post.title}\n\n${cleanText(post.excerpt, 240)}\n\n💡 Insider Tip: ${tipContent}\n\nCheck your exact funding eligibility in 60 seconds:\n👉 https://www.fsidigital.ca/calculator\n\nRead the full breakdown: ${pageUrl}`,
    igCaption: `${fmt.topBadge}\n\n${shortTitle}\n\n${cleanText(post.excerpt, 220)}\n\n✅ ${cleanText(metric1, 60)}\n✅ ${cleanText(metric2, 60)}\n\nSimulate your grant eligibility in 60 seconds 👇\n🔗 fsidigital.ca/calculator (link in bio)`,
    liCaption: `${post.title}\n\n${cleanText(post.excerpt, 280)}\n\nKey insight: ${tipContent}\n\nBenchmark your company's non-dilutive funding eligibility in 60 seconds (self-serve, no call required):\nhttps://www.fsidigital.ca/calculator`,
    ytTitle: cleanText(`${shortTitle} (2026 Grant Guide)`, 86),
    ytDescription: `${post.title}\n\n${post.excerpt}\n\nCheck your company's grant match in 60 seconds: https://www.fsidigital.ca/calculator\nFull Guide: ${pageUrl}\n\n${baseHashtags.join(' ')} #Shorts`,
    hashtags: baseHashtags,
  }
}

function buildTopicFromPseo(hub: PseoPage, fmt: DayFormatSpec): SelectedTopic {
  const isCanada = ['on', 'bc', 'ab', 'qc', 'mb', 'sk', 'ns', 'nb', 'nl', 'pe', 'nt', 'yt', 'nu'].includes(hub.provinceSlug.toLowerCase())
  const country = isCanada ? 'Canada' : 'USA'
  const amount = isCanada ? 'UP TO $500K+' : 'UP TO $1M+'
  const title = `${hub.industryName} Grants in ${hub.cityName}, ${hub.provinceName}`
  const shortTitle = cleanText(`${hub.cityName} ${hub.industryName} Grants`, 44)
  const federalLayer = isCanada ? 'Federal IRAP, SR&ED & CanExport' : 'Federal SBIR, SBA & USDA Pools'
  const localLayer = `${hub.provinceName} Regional & Municipal Streams`
  const pageUrl = `https://www.fsidigital.ca/grants/${hub.provinceSlug}/${hub.citySlug}/${hub.industrySlug}`

  const spokenScript = cleanSpoken(
    `Running a ${hub.industryName} business in ${hub.cityName}, ${hub.provinceName}? ` +
    `Most local founders only search federal websites and miss stacked regional capital. ` +
    `In ${hub.cityName}, eligible ${hub.industryName} companies can combine ${federalLayer} with ${localLayer} without giving up equity. ` +
    `Verify your exact ${hub.cityName} funding stack in 60 seconds at f s i digital dot c a slash calculator.`
  )

  const captionChunks = [
    { text: `${hub.industryName} in ${hub.cityName}?`, highlight: hub.cityName },
    { text: `Unlock ${amount} non-dilutive grants`, highlight: amount },
    { text: 'Do NOT search federal portals only...', highlight: 'federal portals only' },
    { text: `Layer 1: ${federalLayer}`, highlight: federalLayer.slice(0, 18) },
    { text: `Layer 2: ${hub.provinceName} Grants`, highlight: hub.provinceName },
    { text: `Built for ${hub.industryName} teams`, highlight: hub.industryName },
    { text: 'Check your local funding match...', highlight: 'local funding match' },
    { text: 'in 60s at fsidigital.ca/calculator', highlight: 'fsidigital.ca/calculator' },
  ]

  const cityTag = `#${hub.cityName.replace(/[^a-zA-Z0-9]/g, '')}`
  const provTag = `#${hub.provinceName.replace(/[^a-zA-Z0-9]/g, '')}`
  const baseHashtags = ['#FSIDigital', '#BusinessGrants', cityTag, provTag, isCanada ? '#CanadianBusiness' : '#USASmallBusiness', '#NonDilutiveFunding']

  return {
    topicKey: `pseo:${hub.provinceSlug}:${hub.citySlug}:${hub.industrySlug}`,
    slug: `daily-${hub.citySlug}-${hub.industrySlug}`.slice(0, 64),
    title,
    shortTitle,
    amountLabel: amount,
    regionLabel: `${hub.cityName}, ${hub.provinceName}`,
    sourceType: 'pseo',
    pageUrl,
    mythTitle: 'NO LOCAL GRANTS FOR MY SECTOR',
    mythSub: `Most ${hub.cityName} owners miss regional pools`,
    mythBadge: '❌ FALSE: 3 LAYERS OF FUNDING EXIST',
    nodes: [
      { icon: '🏛️', title: `${country} Federal Layer`, sub: federalLayer, color: '#38BDF8' },
      { icon: '📍', title: `${hub.provinceName} Layer`, sub: `${hub.cityName} & regional innovation pools`, color: '#A78BFA' },
      { icon: '🎯', title: cleanText(hub.industryName, 26), sub: 'Hiring, R&D, equipment & expansion', color: '#34D399' },
    ],
    footnote: cleanText(`Local Hub: ${hub.cityName}, ${hub.provinceName} · Tier ${hub.tier}`, 68),
    flowSource: cleanText(`${hub.provinceName} Grants`, 22),
    flowDest: cleanText(`${hub.cityName} Founders`, 22),
    spokenScript,
    captionChunks,
    fbCaption: `${fmt.topBadge}\n\n${title} (2026)\n\n${hub.industryName} businesses operating in ${hub.cityName}, ${hub.provinceName} can legally combine:\n• ${federalLayer}\n• ${localLayer}\n• Sector-specific hiring, R&D & equipment subsidies\n\nCheck your company's exact ${hub.cityName} grant match in 60 seconds:\n👉 https://www.fsidigital.ca/calculator\n\nExplore the ${hub.cityName} directory: ${pageUrl}`,
    igCaption: `${fmt.topBadge}\n\n${title} (2026) 💰\n\nIf you operate in ${hub.cityName}, ${hub.provinceName}, don't leave non-repayable capital on the table:\n✅ ${federalLayer}\n✅ ${localLayer}\n✅ Zero equity taken\n\nCheck your eligibility in 60 seconds 👇\n🔗 fsidigital.ca/calculator (link in bio)`,
    liCaption: `${title}: Non-Dilutive Funding Overview\n\n${hub.industryName} organizations in ${hub.cityName}, ${hub.provinceName} can layer ${federalLayer} with ${localLayer} to offset payroll, R&D, equipment, and market expansion costs.\n\nRun a 60-second self-serve eligibility scan (no call required):\nhttps://www.fsidigital.ca/calculator`,
    ytTitle: cleanText(`${hub.cityName} ${hub.industryName} Grants (${amount}) — 2026 Guide`, 86),
    ytDescription: `${title}\n\nCombine ${federalLayer} + ${localLayer} for ${hub.industryName} businesses in ${hub.cityName}, ${hub.provinceName}.\n\nCheck eligibility in 60 seconds: https://www.fsidigital.ca/calculator\nDirectory: ${pageUrl}\n\n${baseHashtags.join(' ')} #Shorts`,
    hashtags: baseHashtags,
  }
}

function selectDailyTopic(fmt: DayFormatSpec, publishedSet: Set<string>): SelectedTopic {
  const openPrograms = programsDatabase.filter((p) => p.status === 'Open' || p.status === 'Upcoming')
  const blogs = getAllBlogPosts().filter((b) => !b.slug.endsWith('-archive') && !b.slug.includes('2025'))
  const pseoPages = getPublishedPseoPages().sort((a, b) => {
    const rank = { A: 0, B: 1, C: 2 }
    return (rank[a.tier] ?? 2) - (rank[b.tier] ?? 2)
  })

  // Route each weekday format to its primary content pool, falling back smoothly across all 6,400+ pages
  if (fmt.formatKey === 'local-industry-hub') {
    const freshHub = pseoPages.find((h) => !publishedSet.has(`pseo:${h.provinceSlug}:${h.citySlug}:${h.industrySlug}`))
    if (freshHub) return buildTopicFromPseo(freshHub, fmt)
  }

  if (fmt.formatKey === 'sector-guide') {
    const freshBlog = blogs.find((b) => !publishedSet.has(`blog:${b.slug}`))
    if (freshBlog) return buildTopicFromBlog(freshBlog, fmt)
  }

  if (fmt.formatKey === 'grant-stacking') {
    const stackable = openPrograms.filter((p) => p.stackable !== false)
    const freshStack = stackable.find((p) => !publishedSet.has(`program:${p.slug}:${fmt.formatKey}`))
    if (freshStack) return buildTopicFromProgram(freshStack, fmt)
  }

  // Primary pool for Mon/Wed/Sat/Sun: Open Programs (then Blogs, then 6,150 pSEO hubs)
  const freshProgram = openPrograms.find((p) => !publishedSet.has(`program:${p.slug}:${fmt.formatKey}`))
  if (freshProgram) return buildTopicFromProgram(freshProgram, fmt)

  const freshBlog = blogs.find((b) => !publishedSet.has(`blog:${b.slug}`))
  if (freshBlog) return buildTopicFromBlog(freshBlog, fmt)

  const freshHub = pseoPages.find((h) => !publishedSet.has(`pseo:${h.provinceSlug}:${h.citySlug}:${h.industrySlug}`))
  if (freshHub) return buildTopicFromPseo(freshHub, fmt)

  // Ultimate fallback after 17+ years of daily unique videos: recycle oldest program
  return buildTopicFromProgram(openPrograms[0], fmt)
}

function buildEngineConfig(topic: SelectedTopic, fmt: DayFormatSpec) {
  const words = topic.shortTitle.toUpperCase().split(' ')
  const mid = Math.ceil(words.length / 2)
  const hookLine1 = words.slice(0, mid).join(' ').slice(0, 26)
  const hookLine2 = (words.slice(mid).join(' ') || topic.amountLabel).slice(0, 26)

  const totalBase = 28.0
  const chunkDur = totalBase / topic.captionChunks.length
  const captions = topic.captionChunks.map((c, idx) => ({
    startTime: Number((idx * chunkDur).toFixed(2)),
    endTime: Number(((idx + 1) * chunkDur).toFixed(2)),
    text: c.text,
    highlight: c.highlight,
  }))

  return {
    meta: {
      pillarId: fmt.pillarId,
      title: topic.title,
      slug: topic.slug,
      fps: 30,
      width: 1080,
      height: 1920,
    },
    audio: {
      script: topic.spokenScript,
      voice: fmt.voice,
      rate: '+6%',
      bgm: fmt.bgm,
      bgmVolume: 0.08,
    },
    scenes: [
      {
        index: 1,
        id: 'question-and-reaction',
        startTime: 0,
        endTime: 4.8,
        topBadge: fmt.topBadge,
        curiosityCue: fmt.curiosityCue,
        reactionTime: 2.1,
        badgeBg: fmt.badgeBg,
        cardBorder: 'rgba(56, 189, 248, 0.5)',
        cardShadow: 'rgba(56, 189, 248, 0.25)',
        hookCategory: fmt.hookCategory,
        hookCategoryColor: fmt.accentColor,
        hookLine1,
        hookLine2,
        hookHighlight: topic.amountLabel,
        hookSub: `${topic.amountLabel} · ${topic.regionLabel}`,
        hookSubColor: fmt.subColor,
        alertBubble: '✅ 0% EQUITY TAKEN • VERIFIED 2026 DATA',
      },
      {
        index: 2,
        id: 'correct-misconception',
        startTime: 4.8,
        endTime: 9.6,
        cardHeader: 'COMMON FOUNDER MYTH',
        cardIcon: '💼 ❌',
        conceptTitle: topic.mythTitle,
        conceptSubtitle: topic.mythSub,
        badgeText: topic.mythBadge,
        crossTime: 6.5,
      },
      {
        index: 3,
        id: 'explain-mechanism',
        startTime: 9.6,
        endTime: 16.0,
        diagramTitle: `🏛️ ${topic.shortTitle.toUpperCase().slice(0, 26)}`,
        nodes: topic.nodes,
        footnote: topic.footnote,
      },
      {
        index: 4,
        id: 'follow-movement',
        startTime: 16.0,
        endTime: 22.0,
        pathTitle: '🚀 NON-DILUTIVE FUNDING FLOW',
        sourceLabel: topic.flowSource,
        sourceIcon: '🏛️',
        destLabel: topic.flowDest,
        destIcon: '🛡️',
        tokenLabel: topic.amountLabel,
        tokenSymbol: '$',
      },
      {
        index: 5,
        id: 'reassuring-finish',
        startTime: 22.0,
        endTime: totalBase,
        ctaHeader: '🛡️ FSI DIGITAL · FUNDING ENGINE',
        ctaUrl: 'fsidigital.ca/calculator',
        ctaSub: 'Check Your Exact Grant Match in 60s →',
      },
    ],
    captions,
  }
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const force = process.argv.includes('--force')

  console.log('═══════════════════════════════════════════════════════════════')
  console.log(`🎬 FSI DIGITAL — INFINITE DAILY VIDEO FACTORY (${dryRun ? 'DRY RUN' : 'LIVE'})`)
  console.log('═══════════════════════════════════════════════════════════════')

  let lease: any = null
  if (!dryRun) {
    lease = await acquireOperationLease('social-revenue-sprint', 60 * 60 * 1000)
    if (!lease.acquired && !force) {
      // Check if an actual successful post was recorded within MIN_GAP_MS
      const existingState: any = await getLatestOperationalState<any>(SPRINT_STATE_KEY).catch(() => null)
      const lastAcceptedMs = new Date(existingState?.lastAcceptedAt || '').getTime()
      const now = Date.now()
      if (Number.isFinite(lastAcceptedMs) && now - lastAcceptedMs < MIN_GAP_MS) {
        const hrs = ((now - lastAcceptedMs) / (60 * 60 * 1000)).toFixed(1)
        console.log(`ℹ️ Already published ${hrs}h ago (< ${MIN_GAP_MS / 3600000}h guard). Skipping duplicate daily dispatch.`)
        process.exit(0)
      } else {
        console.warn(`⚠️ Lease was held by another attempt (${lease.reason}), but no successful post was recorded today (last accepted ${Number.isFinite(lastAcceptedMs) ? ((now - lastAcceptedMs) / 3600000).toFixed(1) + 'h ago' : 'never'}). Bypassing unconfirmed/failed lease lock to ensure daily social dispatch!`)
      }
    }
  }

  try {
    const now = Date.now()
    const sprintState: any = (await getLatestOperationalState<any>(SPRINT_STATE_KEY).catch(() => null)) || {
      variants: {},
      lastAcceptedAt: '',
      updatedAt: '',
    }

    const lastAcceptedMs = new Date(sprintState.lastAcceptedAt || '').getTime()
    if (!dryRun && !force && Number.isFinite(lastAcceptedMs) && now - lastAcceptedMs < MIN_GAP_MS) {
      const hrs = ((now - lastAcceptedMs) / (60 * 60 * 1000)).toFixed(1)
      console.log(`ℹ️ Already published ${hrs}h ago (< ${MIN_GAP_MS / 3600000}h guard). Skipping duplicate daily dispatch.`)
      if (lease?.acquired) {
        await finishOperationLease(lease, 'SUCCEEDED', { decision: 'WAITING_FOR_NEXT_VARIANT', hoursSinceLast: hrs })
      }
      process.exit(0)
    }

    const history: InfiniteHistoryState = (await getLatestOperationalState<InfiniteHistoryState>(HISTORY_STATE_KEY).catch(() => null)) || {
      publishedKeys: [],
      lastPublishedAt: '',
      totalPublished: 0,
      recentItems: [],
    }
    const publishedSet = new Set(history.publishedKeys || [])

    const dayIdx = getISTDayOfWeek()
    const fmt = SEVEN_DAY_FORMATS[dayIdx] || SEVEN_DAY_FORMATS[3]
    const topic = selectDailyTopic(fmt, publishedSet)

    console.log(`📅 Today's Format (${fmt.formatName})`)
    console.log(`🎯 Selected Fresh Topic [${topic.sourceType}]: ${topic.title}`)
    console.log(`🔑 Topic Key: ${topic.topicKey} (Previously published unique topics: ${publishedSet.size})`)

    // Step 1: Write dynamic config & render fresh 1080x1920 2D Animated MP4 on the fly
    const configDir = path.join(process.cwd(), 'out/videos/daily-configs')
    fs.mkdirSync(configDir, { recursive: true })
    const configPath = path.join(configDir, `${topic.slug}.json`)
    const engineConfig = buildEngineConfig(topic, fmt)
    fs.writeFileSync(configPath, JSON.stringify(engineConfig, null, 2))

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const videoEngine = require('./video-engine/2d-animated-explainer/build-animated-video.js')
    const rendered = await videoEngine.renderSingleConfig(configPath)
    const mp4Path: string = rendered.finalMasterPath

    if (!fs.existsSync(mp4Path)) {
      throw new Error(`Rendered MP4 not found at ${mp4Path}`)
    }
    const sizeMb = (fs.statSync(mp4Path).size / (1024 * 1024)).toFixed(2)
    console.log(`✅ Fresh 2D Reel rendered: ${mp4Path} (${sizeMb} MB, ${rendered.totalDuration.toFixed(1)}s)`)

    if (dryRun) {
      console.log('🧪 DRY RUN complete — skipping social API uploads and Redis state writes.')
      process.exit(0)
    }

    // Step 2: Publish directly as binary to Facebook, Instagram, YouTube Shorts, & LinkedIn
    const results: ChannelPublishResult[] = []
    const receipts: Record<string, any> = {}
    const variantKey = topic.slug

    const saveReceipt = async (channelKey: 'facebook' | 'instagram' | 'youtube' | 'linkedin', res: ChannelPublishResult) => {
      results.push(res)
      const ok = Boolean(res.externalId) && (res.status === 'API_ACCEPTED' || res.status === 'LIVE_PUBLISHED')
      if (ok) {
        const acceptedAt = new Date().toISOString()
        receipts[channelKey] = {
          status: res.status,
          externalId: res.externalId || '',
          permalink: res.permalink || '',
          acceptedAt,
          message: res.message,
        }
        sprintState.variants = sprintState.variants || {}
        sprintState.variants[variantKey] = { ...receipts }
        sprintState.lastAcceptedAt = acceptedAt
        sprintState.updatedAt = acceptedAt
        try {
          await setOperationalState(SPRINT_STATE_KEY, sprintState)
        } catch (err) {
          console.error(`[InfiniteVideoFactory] Failed incremental state write for ${channelKey}:`, err)
        }
      }
    }

    const [fbRes, igRes, ytRes, liRes] = await Promise.all([
      ChannelAdapters.postFacebookReel(mp4Path, topic.title, topic.fbCaption),
      (async (): Promise<ChannelPublishResult> => {
        // Meta placed a temporary video sharing restriction on @fsidigital until December 23, 2026.
        // Pausing active Instagram video API calls protects the account from further penalties while restriction is active.
        const igRestrictedUntil = process.env.INSTAGRAM_RESTRICTED_UNTIL || '2026-12-23T23:59:59Z'
        if (Date.now() < new Date(igRestrictedUntil).getTime()) {
          console.log(`ℹ️ [Instagram] Video posting paused until ${igRestrictedUntil} per Meta account restriction. Protecting account health.`)
          return {
            channelName: 'Instagram',
            status: 'QUEUED_FOR_APPROVAL',
            externalId: '',
            permalink: 'https://www.instagram.com/fsidigital/',
            message: `Instagram video sharing paused per Meta restriction until Dec 23, 2026. Resumes automatically on Dec 24, 2026.`,
          }
        }
        return ChannelAdapters.postInstagramReel(mp4Path, topic.igCaption, topic.hashtags)
      })(),
      (async (): Promise<ChannelPublishResult> => {
        const up = await NativeYouTubeAdapter.uploadShortsFromUrl(mp4Path, topic.ytTitle, topic.ytDescription)
        if (up.success && up.videoId) {
          return {
            channelName: 'YouTube',
            status: 'LIVE_PUBLISHED',
            externalId: up.videoId,
            permalink: up.videoUrl || `https://www.youtube.com/shorts/${up.videoId}`,
            message: `YouTube Short published live: ${up.videoUrl}`,
          }
        }
        return {
          channelName: 'YouTube',
          status: 'QUEUED_FOR_APPROVAL',
          message: `YouTube Shorts upload pending: ${up.error || 'unknown error'}`,
        }
      })(),
      ChannelAdapters.postLinkedIn(topic.liCaption, topic.hashtags),
    ])

    await saveReceipt('facebook', fbRes)
    await saveReceipt('instagram', igRes)
    await saveReceipt('youtube', ytRes)
    await saveReceipt('linkedin', liRes)

    const acceptedCount = Object.keys(receipts).length
    const failed = acceptedCount === 0

    // Step 3: Persist topic into infinite history so it NEVER repeats
    if (!failed) {
      const updatedKeys = Array.from(new Set([...(history.publishedKeys || []), topic.topicKey]))
      const updatedRecent = [
        {
          key: topic.topicKey,
          title: topic.title,
          format: fmt.formatName,
          publishedAt: new Date().toISOString(),
        },
        ...(history.recentItems || []),
      ].slice(0, 50)
      await setOperationalState(HISTORY_STATE_KEY, {
        publishedKeys: updatedKeys,
        lastPublishedAt: new Date().toISOString(),
        totalPublished: updatedKeys.length,
        recentItems: updatedRecent,
      })
    }

    if (lease?.acquired) {
      await finishOperationLease(lease, failed ? 'FAILED' : 'SUCCEEDED', {
        decision: failed ? 'PROVIDER_REJECTED' : 'PUBLISHED',
        variantId: variantKey,
        topicKey: topic.topicKey,
        format: fmt.formatName,
        accepted: acceptedCount,
        attempted: 4,
        results,
      })
    }

    console.log(`🎉 Daily Infinite Video Dispatch Complete: ${acceptedCount}/4 channels accepted!`)
    for (const r of results) {
      console.log(`   - ${r.channelName}: ${r.status} ${r.permalink || r.message}`)
    }

    // Strict 1-email/day policy: only send standalone email on total failure
    if (failed) {
      await sendEmail({
        to: process.env.GROWTH_OS_REPORT_EMAIL || 'ashwani@fsidigital.ca',
        subject: '⚠️ [Growth OS] Infinite Daily Social Video Dispatch Failed',
        html: `<p>All channels failed for topic <strong>${topic.title}</strong> (${fmt.formatName}).</p><pre>${JSON.stringify(results, null, 2)}</pre>`,
        text: `Social dispatch failed for ${topic.title}. Details: ${JSON.stringify(results)}`,
        tagType: 'social-revenue-sprint',
      }).catch(() => {})
      process.exit(1)
    }

    process.exit(0)
  } catch (err: any) {
    console.error('❌ Infinite Daily Video Factory failed:', err)
    if (lease?.acquired) {
      await finishOperationLease(lease, 'FAILED', { error: err?.message || String(err) })
    }
    process.exit(1)
  }
}

main()
