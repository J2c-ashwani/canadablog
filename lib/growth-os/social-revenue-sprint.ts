import { createTrackedGrowthUrl, type GrowthActionContext } from '@/lib/growth-os/action-attribution'
import { ChannelAdapters, type ChannelPublishResult } from '@/lib/growth-os/execution/adapters/channel-adapters'
import { getLatestOperationalState, setOperationalState } from '@/lib/growth-os/operations-store'
import { INFORMATIONAL_SOCIAL_LIBRARY } from '@/lib/growth-os/distribution/informational-social-library'

export const SOCIAL_REVENUE_SPRINT_END_AT = '2026-09-25T18:29:59.000Z'
const STATE_KEY = 'social-revenue-sprint-september-v1'
const MIN_VARIANT_GAP_MS = process.env.SOCIAL_VARIANT_GAP_MS ? Number(process.env.SOCIAL_VARIANT_GAP_MS) : (20 * 60 * 60 * 1000) // 36 * 60 * 60 * 1000
const INITIAL_VARIANT_ID = 'sep-match-fit-v1'

type ChannelId = 'linkedin' | 'facebook' | 'instagram' | 'youtube'

type ChannelReceipt = {
  status: ChannelPublishResult['status']
  externalId: string
  acceptedAt: string
  message: string
}

type SocialSprintState = {
  variants: Record<string, Partial<Record<ChannelId, ChannelReceipt>>>
  lastAcceptedAt: string
  updatedAt: string
}

type Variant = {
  id: string
  offerId: 'funding-bundle' | 'funding-match-report' | 'funding-roadmap' | 'funding-toolkit' | 'funding-membership'
  target: string
  linkedin: string
  facebook: string
  hashtags: string[]
}

const VARIANTS: Variant[] = [
  {
    id: 'sep-product-ladder-v1',
    offerId: 'funding-bundle',
    target: 'https://www.fsidigital.ca/calculator?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_bundle',
    linkedin: `Grant research gets expensive when a founder chases every program without a clear preparation order.\n\nBefore spending 40+ hours writing an application, test your business profile across active federal and provincial programs with FSI Digital's free Grant Calculator.\n\n• Instant estimated non-repayable funding cap\n• Personalized program matches (IRAP, SR&ED, CDAP, Regional)\n• No sales call required\n\nCalculate your funding match in 60 seconds:`,
    facebook: `Looking for a structured way to find Canadian business grants without booking a sales call?\n\nUse FSI Digital's free interactive grant calculator to estimate your funding match, discover active non-repayable programs, and get an instant readiness evaluation in under 60 seconds.`,
    hashtags: ['#FSIDigital', '#SmallBusinessGrants', '#GovernmentFunding', '#NonDilutiveFunding', '#CanadianBusiness', '#StartupFunding'],
  },
  {
    id: 'sep-match-fit-v1',
    offerId: 'funding-match-report',
    target: 'https://www.fsidigital.ca/calculator?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_report',
    linkedin: `Before spending hours on a grant application, answer four questions:\n\n1. Does the program fit the business profile?\n2. Are the planned costs eligible?\n3. Is the timing realistic?\n4. Can the program be stacked with other support?\n\nFSI Digital's free Grant Calculator evaluates your company's sector, stage, and payroll in 60 seconds to identify active non-repayable programs. No call required.\n\nCheck your company's grant matches:`,
    facebook: `A grant list is not an application plan. Start by narrowing the options to programs that fit your business profile, planned costs, and timing.\n\nUse FSI Digital's free Grant Calculator to evaluate your funding eligibility in 60 seconds. Self-serve and requires no call.`,
    hashtags: ['#FSIDigital', '#BusinessGrants', '#FundingStrategy', '#SmallBusiness', '#FounderResources', '#NonDilutiveCapital'],
  },
  {
    id: 'sep-action-plan-v1',
    offerId: 'funding-roadmap',
    target: 'https://www.fsidigital.ca/calculator?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_action_plan',
    linkedin: `Finding a possible grant is only the beginning. The harder questions are what to prepare first, which documents create risk, and how to sequence multiple applications.\n\nStart by calculating your baseline eligibility and estimated funding allocation across 100+ active Canadian government programs.\n\nFree, self-serve, and takes under 60 seconds. No sales call required.\n\nBuild your funding baseline:`,
    facebook: `A list of grants does not tell you what to prepare first.\n\nStart with FSI Digital's free interactive grant calculator to estimate your eligible funding amount and identify matching programs for your business stage. No call required.`,
    hashtags: ['#FSIDigital', '#GrantApplications', '#FundingStrategy', '#SmallBusiness', '#BusinessPlanning', '#GovernmentFunding'],
  },
  {
    id: 'sep-toolkit-v1',
    offerId: 'funding-toolkit',
    target: 'https://www.fsidigital.ca/calculator?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_toolkit',
    linkedin: `Grant preparation often stalls on the same practical work: knowing which grants your business qualifies for, building an eligible budget, and sequencing applications.\n\nCheck your company's grant eligibility and non-repayable funding matches in 60 seconds with our free interactive calculator.\n\nNo sales call or live session required. Get your instant readiness assessment:`,
    facebook: `Need the working documents and eligibility roadmap behind a Canadian grant application?\n\nFirst, check your non-repayable funding eligibility in 60 seconds using our free Grant Calculator. Fast, self-serve, and requires no call.`,
    hashtags: ['#FSIDigital', '#GrantWriting', '#BusinessTemplates', '#SmallBusiness', '#CashFlowPlanning', '#FundingReadiness'],
  },
  {
    id: 'sep-membership-radar-v1',
    offerId: 'funding-membership',
    target: 'https://www.fsidigital.ca/calculator?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_membership_radar',
    linkedin: `Government funding programs change: intake windows open, deadlines move, and program details are updated. Repeating the same research every week is difficult for a small team.\n\nStart by testing your company profile against active Canadian grants in 60 seconds with our free calculator, and see which programs match your sector right now.\n\nNo call required. Check your active matches:`,
    facebook: `Funding programs and deadlines change constantly. Start by finding out which non-repayable grants match your business profile right now with our free 60-second Grant Calculator.`,
    hashtags: ['#FSIDigital', '#FundingAlerts', '#GovernmentGrants', '#SmallBusiness', '#FundingDeadlines', '#BusinessFunding'],
  },
  {
    id: 'sep-bundle-stacking-v1',
    offerId: 'funding-bundle',
    target: 'https://www.fsidigital.ca/calculator?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_stacking',
    linkedin: `One funding program may support hiring while another supports research, equipment, exporting, or training. The planning risk is treating every program as isolated.\n\nDiscover how IRAP, SR&ED, and provincial incentives stack for your company. Test your eligibility across all three in 60 seconds with our free interactive calculator.\n\nNo call or live session required. Review your stack simulation:`,
    facebook: `Funding planning is more useful when matches, timing, documents, and program stacking are reviewed together.\n\nCalculate your non-dilutive grant matches and stacking opportunities in 60 seconds with FSI Digital's free calculator. No call required.`,
    hashtags: ['#FSIDigital', '#FundingStack', '#NonDilutiveFunding', '#BusinessGrants', '#GrowthCapital', '#FundingStrategy'],
  },
  {
    id: 'sep-match-costs-v1',
    offerId: 'funding-match-report',
    target: 'https://www.fsidigital.ca/calculator?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_eligible_costs',
    linkedin: `A business can fit a funding program while its planned expense does not. That distinction matters before application work begins.\n\nUse FSI Digital's free Grant Calculator to evaluate your eligible payroll, subcontractor, and R&D costs against current federal program rules.\n\nTakes under 60 seconds, self-serve, and requires no sales call.\n\nEvaluate your eligible costs:`,
    facebook: `A business may fit a grant while the planned expense does not. Find out which programs match your business profile, payroll, and technical expenses in 60 seconds with our free Grant Calculator.`,
    hashtags: ['#FSIDigital', '#EligibleCosts', '#BusinessFunding', '#GrantResearch', '#SmallBusiness', '#FundingMatch'],
  },
  {
    id: 'sep-action-documents-v1',
    offerId: 'funding-roadmap',
    target: 'https://www.fsidigital.ca/calculator?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_documents',
    linkedin: `Application deadlines are visible. Document readiness is often the hidden constraint. Financial statements, project budgets, hiring plans, quotes, and corporate records determine whether your timeline is realistic.\n\nCheck your company's grant eligibility and document readiness in 60 seconds with our free interactive calculator.\n\nNo call required. Start your readiness check:`,
    facebook: `The deadline is only one part of grant readiness. The document checklist determines whether the application timeline is realistic.\n\nCheck your non-repayable grant matches and application readiness in 60 seconds with FSI Digital's free calculator.`,
    hashtags: ['#FSIDigital', '#GrantReadiness', '#DocumentChecklist', '#BusinessPlanning', '#GovernmentFunding', '#ApplicationStrategy'],
  },
  {
    id: 'sep-toolkit-budget-v1',
    offerId: 'funding-toolkit',
    target: 'https://www.fsidigital.ca/calculator?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_budget_templates',
    linkedin: `A project budget should connect the work, timeline, eligible costs, and funding request. Starting from a blank spreadsheet makes that harder than it needs to be.\n\nFind out how much non-repayable grant capital your project is eligible to request before drafting your budget. Test your company in 60 seconds with our free Grant Calculator.\n\nNo call required. Calculate your project allocation:`,
    facebook: `Building a project budget from a blank spreadsheet? First, calculate your eligible non-repayable grant allocation with our free 60-second Grant Calculator. No call required.`,
    hashtags: ['#FSIDigital', '#ProjectBudget', '#CashFlow', '#GrantTemplates', '#SmallBusinessTools', '#FundingApplication'],
  },
  {
    id: 'sep-membership-changes-v1',
    offerId: 'funding-membership',
    target: 'https://www.fsidigital.ca/calculator?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_program_changes',
    linkedin: `A funding search is a snapshot. Monitoring is the ongoing job: new matches, recorded program changes, and deadlines relevant to the same business profile.\n\nBegin by benchmarking your business against Canada's current grant landscape with our free interactive calculator. Takes 60 seconds, no call required.\n\nBenchmark your profile:`,
    facebook: `A one-time funding search becomes outdated quickly. Benchmark your business against 100+ active Canadian grant programs in 60 seconds with our free calculator.`,
    hashtags: ['#FSIDigital', '#GrantMonitoring', '#FundingWatch', '#SmallBusiness', '#FundingPrograms', '#FounderTools'],
  },
  {
    id: 'sep-choose-next-step-v1',
    offerId: 'funding-match-report',
    target: 'https://www.fsidigital.ca/calculator?utm_source=organic_social&utm_medium=social&utm_campaign=revenue_sprint_choose_next_step',
    linkedin: `Choose the smallest funding step that answers your immediate question:\n\n• Which programs fit? — Instant free calculator assessment\n• How much non-repayable capital is available? — Real-time allocation formula\n• What documents come first? — Complete milestone checklist\n\nAll tools start with our free 60-second grant calculator. No call or live session required.\n\nCalculate your grant eligibility now:`,
    facebook: `Choose the next funding step by the question you need answered: matches, preparation sequence, or stacking opportunities.\n\nStart with FSI Digital's free 60-second Grant Calculator. Self-serve and requires no call.`,
    hashtags: ['#FSIDigital', '#BusinessFunding', '#GrantResearch', '#FundingPlan', '#SmallBusiness', '#FounderResources'],
  },
]

function actionContext(channel: ChannelId, variant: Variant): GrowthActionContext {
  return {
    actionId: `act_social_revenue-sprint-${variant.id}-${channel}`,
    channel: 'organic_social',
    campaign: `revenue-sprint-social-${channel}-${variant.id}`,
    recipientId: `audience-${channel}-${variant.id}`,
  }
}

function accepted(receipt?: ChannelReceipt) {
  return Boolean(receipt?.externalId)
    && (receipt?.status === 'API_ACCEPTED' || receipt?.status === 'LIVE_PUBLISHED')
}

function providerAccepted(result: ChannelPublishResult) {
  return Boolean(result.externalId)
    && (result.status === 'API_ACCEPTED' || result.status === 'LIVE_PUBLISHED')
}

export class SocialRevenueSprintService {
  public static async run() {
    const now = Date.now()
    const existing = await getLatestOperationalState<SocialSprintState>(STATE_KEY)
    const state: SocialSprintState = existing || { variants: {}, lastAcceptedAt: '', updatedAt: '' }
    const allowContinuous = process.env.ALLOW_CONTINUOUS_SOCIAL !== 'false'
    if (!allowContinuous && now > new Date(SOCIAL_REVENUE_SPRINT_END_AT).getTime()) {
      return { active: false, decision: 'EXPIRED', attempted: 0, accepted: 0, results: [] as ChannelPublishResult[] }
    }

    // The prior $79 social experiment generated only 11 organic impressions
    // and no downstream payment evidence. Start this new, isolated September
    // state with the lowest-friction $19 product to establish a paid social
    // baseline before presenting higher-value tiers.
    const orderedVariants = [...VARIANTS].sort((left, right) =>
      Number(right.id === INITIAL_VARIANT_ID) - Number(left.id === INITIAL_VARIANT_ID)
    )
    // Safeguard: Ensure the NRC IRAP Innovation Grants reel (sep-product-ladder-v1)
    // is permanently recorded as accepted so it is NEVER selected or posted again.
    if (!state.variants['sep-product-ladder-v1']?.facebook) {
      state.variants['sep-product-ladder-v1'] = {
        ...state.variants['sep-product-ladder-v1'],
        facebook: {
          status: 'LIVE_PUBLISHED',
          externalId: 'historical-dispatch-completed',
          acceptedAt: state.lastAcceptedAt || new Date().toISOString(),
          message: 'Historical dispatch verified: NRC IRAP Innovation Grants reel already published.',
        },
      }
    }

    let variant = orderedVariants.find((candidate) => {
      const receipts = state.variants[candidate.id] || {}
      return !accepted(receipts.facebook)
    })
    // When every variant has been posted to Facebook, the cycle is COMPLETE.
    // Previously `allowContinuous` wiped state and re-posted all variants from scratch,
    // causing duplicate reels on Facebook (e.g. the IRAP reel appearing 3+ times).
    // Now we stop cleanly — no more automatic reset loops.
    if (!variant) {
      return { active: true, decision: 'COMPLETE', attempted: 0, accepted: 0, results: [] as ChannelPublishResult[] }
    }

    const isFirstVariant = variant.id === INITIAL_VARIANT_ID && Object.keys(state.variants).length <= 1
    const lastAcceptedMs = new Date(state.lastAcceptedAt || '').getTime()
    if (!isFirstVariant && Number.isFinite(lastAcceptedMs) && now - lastAcceptedMs < MIN_VARIANT_GAP_MS) {
      return { active: true, decision: 'WAITING_FOR_NEXT_VARIANT', attempted: 0, accepted: 0, results: [] as ChannelPublishResult[] }
    }

    const receipts = state.variants[variant.id] || {}
    const results: ChannelPublishResult[] = []

    const formatChannelName = (channel: ChannelId) => {
      switch (channel) {
        case 'facebook': return 'Facebook'
        case 'instagram': return 'Instagram'
        case 'linkedin': return 'LinkedIn'
        case 'youtube': return 'YouTube'
      }
    }

    const dispatch = async (channel: ChannelId, send: () => Promise<ChannelPublishResult>) => {
      if (accepted(receipts[channel])) {
        results.push({
          channelName: formatChannelName(channel),
          status: receipts[channel]!.status,
          externalId: receipts[channel]!.externalId,
          message: receipts[channel]!.message,
        })
        return
      }
      try {
        const result = await send()
        results.push(result)
        if (providerAccepted(result)) {
          const acceptedAt = new Date().toISOString()
          receipts[channel] = {
            status: result.status,
            externalId: result.externalId || '',
            acceptedAt,
            message: result.message,
          }
          // Incremental per-channel persistence: Immediately save state to Redis and Google Sheets.
          // Do not wait for all 4 channels to finish, preventing duplicate posts if a later channel
          // times out or hits Vercel's 60-second limit.
          state.variants[variant.id] = { ...receipts }
          state.lastAcceptedAt = acceptedAt
          state.updatedAt = acceptedAt
          try {
            await setOperationalState(STATE_KEY, state)
          } catch (stateErr: any) {
            console.error(`[SocialRevenueSprint] Failed to save incremental operational state for ${channel}:`, stateErr)
          }
        }
      } catch (err: any) {
        results.push({
          channelName: formatChannelName(channel),
          status: 'QUEUED_FOR_APPROVAL',
          message: `Dispatch exception: ${err?.message || err}`,
        })
      }
    }

    const linkedInUrl = createTrackedGrowthUrl(variant.target, actionContext('linkedin', variant))
    const facebookUrl = createTrackedGrowthUrl(variant.target, actionContext('facebook', variant))
    const instagramUrl = createTrackedGrowthUrl(variant.target, actionContext('instagram', variant))

    // Alternating Cadence: Perfectly balanced Carousel and Reel rotation
    const VARIANT_TO_INFORMATIONAL_MAP: Record<string, string> = {
      'sep-product-ladder-v1': 'post-reel-irap-innovation',      // 🎬 REEL (IRAP $500K)
      'sep-match-fit-v1': 'post-grant-checklist',                // 📑 CAROUSEL (Grant Readiness 8-Pt Checklist)
      'sep-action-plan-v1': 'post-reel-digital-adoption',        // 🎬 REEL (Digital Adoption & CDAP)
      'sep-toolkit-v1': 'post-reel-sred-tax-credits',            // 🎬 REEL (SR&ED 35% Cash Back Secrets - published today)
      'sep-membership-radar-v1': 'post-canada-grants',           // 📑 CAROUSEL (Tomorrow: Top 5 Canadian Grants $15K-$10M)
      'sep-bundle-stacking-v1': 'post-reel-women-grants',        // 🎬 REEL (Women Entrepreneur Grants $250K)
      'sep-match-costs-v1': 'post-sbir-howto',                   // 📑 CAROUSEL (The 5-Step Non-Dilutive Playbook)
      'sep-action-documents-v1': 'post-reel-cleantech',          // 🎬 REEL (CleanTech & Sustainability Millions)
      'sep-toolkit-budget-v1': 'post-stat-shock',                // 📑 CAROUSEL (How to Legally Stack IRAP & SR&ED)
      'sep-membership-changes-v1': 'post-reel-export-development', // 🎬 REEL (CanExport Global Expansion $50K)
      'sep-choose-next-step-v1': 'post-women-grants',            // 📑 CAROUSEL (Women Entrepreneur Funding Guide)
    }
    const infoPostId = VARIANT_TO_INFORMATIONAL_MAP[variant.id]
    const infoPost = INFORMATIONAL_SOCIAL_LIBRARY.find((p) => p.id === infoPostId)

    const brandedHashtags = Array.from(new Set(['#FSIDigital', ...(variant.hashtags || [])]))
    const hashtagLine = brandedHashtags.join(' ')

    // Execute all 4 independent channels concurrently to stay well below the 60s Vercel timeout
    await Promise.allSettled([
      // 1. Facebook Dispatch (Alternating 9:16 Video Reel vs Multi-Photo Carousel Album — Zero Plain-Text Fallback)
      dispatch('facebook', async () => {
        const caption = infoPost?.captions?.facebook || variant.facebook
        const fullCaptionWithTags = `${caption}\n\n${hashtagLine}`

        if (infoPost?.format === 'CAROUSEL' && infoPost.media.carouselSlides?.length) {
          return ChannelAdapters.postFacebookMultiPhoto(infoPost.media.carouselSlides, fullCaptionWithTags, facebookUrl)
        }
        const reelVideoUrl = infoPost?.media.videoUrl
        if (!reelVideoUrl) {
          if (infoPost?.media.carouselSlides?.length) {
            return ChannelAdapters.postFacebookMultiPhoto(infoPost.media.carouselSlides, fullCaptionWithTags, facebookUrl)
          }
          return {
            channelName: 'Facebook',
            status: 'QUEUED_FOR_APPROVAL',
            message: `Variant ${variant.id} has no valid videoUrl or carouselSlides. Skipped to prevent duplicate/unintended reel uploads.`,
          }
        }
        const reelTitle = infoPost?.title || '🇨🇦 Canadian Business Grants & Non-Dilutive Funding'
        const fullDescription = `${caption}\n\n🔗 Calculate your eligibility:\n👉 ${facebookUrl}\n\n${hashtagLine}`

        const reelResult = await ChannelAdapters.postFacebookReel(reelVideoUrl, reelTitle, fullDescription)
        if (providerAccepted(reelResult)) return reelResult

        // Resilience Fallback: If Reel video upload fails, fallback to Multi-Photo Carousel
        const fallbackSlides = infoPost?.media.carouselSlides?.length
          ? infoPost.media.carouselSlides
          : INFORMATIONAL_SOCIAL_LIBRARY.find((p) => p.format === 'CAROUSEL' && p.media.carouselSlides?.length)?.media.carouselSlides

        if (fallbackSlides && fallbackSlides.length > 0) {
          console.warn(`[SocialRevenueSprint] Facebook Reel upload failed; falling back to Multi-Photo Carousel...`)
          return ChannelAdapters.postFacebookMultiPhoto(fallbackSlides, fullCaptionWithTags, facebookUrl)
        }

        return reelResult
      }),

      // 2. Instagram Dispatch (Alternating 9:16 Video Reel vs Multi-Slide Carousel — Zero Plain-Text Fallback)
      dispatch('instagram', async () => {
        if (infoPost?.format === 'CAROUSEL' && infoPost.media.carouselSlides?.length) {
          return ChannelAdapters.postInstagramCarousel(infoPost.media.carouselSlides, infoPost.captions.instagram, brandedHashtags)
        }
        const reelVideoUrl = infoPost?.media.videoUrl
        if (!reelVideoUrl) {
          if (infoPost?.media.carouselSlides?.length) {
            return ChannelAdapters.postInstagramCarousel(infoPost.media.carouselSlides, infoPost.captions.instagram, brandedHashtags)
          }
          return {
            channelName: 'Instagram',
            status: 'QUEUED_FOR_APPROVAL',
            message: `Variant ${variant.id} has no valid videoUrl or carouselSlides. Skipped.`,
          }
        }
        const caption = infoPost?.captions?.instagram || `${variant.facebook}\n\n🔗 ${instagramUrl}`

        return ChannelAdapters.postInstagramReel(reelVideoUrl, caption, brandedHashtags)
      }),

      // 3. LinkedIn Dispatch (Always Multi-Slide Carousel with Proper Captions & Hashtags — Zero Plain-Text Fallback)
      dispatch('linkedin', async () => {
        const slides = (infoPost?.format === 'CAROUSEL' && infoPost.media.carouselSlides?.length)
          ? infoPost.media.carouselSlides
          : (INFORMATIONAL_SOCIAL_LIBRARY.find((p) => p.format === 'CAROUSEL' && p.media.carouselSlides?.length)?.media.carouselSlides || [])

        const commentary = infoPost?.captions?.linkedin
          ? `${infoPost.captions.linkedin}\n\n🔗 ${linkedInUrl}`
          : `${variant.linkedin}\n\n🔗 ${linkedInUrl}`

        if (slides.length > 0) {
          return ChannelAdapters.postLinkedInCarousel(slides, commentary, brandedHashtags)
        }
        return ChannelAdapters.postLinkedIn(commentary, brandedHashtags)
      }),

      // 4. YouTube Shorts Dispatch (Automatic Shorts Upload for Vertical Video Reels)
      dispatch('youtube', async () => {
        const reelVideoUrl = infoPost?.media.videoUrl
        if (!reelVideoUrl) {
          return {
            channelName: 'YouTube',
            status: 'QUEUED_FOR_APPROVAL',
            message: `Variant ${variant.id} is a carousel or static asset; YouTube Shorts skipped.`,
          }
        }
        const title = infoPost?.title || '🇨🇦 Canadian Business Grants & Funding'
        const description = `${infoPost?.captions?.facebook || variant.facebook}\n\n🔗 Calculate your non-dilutive funding match in 60 seconds:\n👉 https://www.fsidigital.ca/calculator\n\n#FSIDigital #Shorts #Grants #BusinessFunding #StartupFunding #CanadaBusiness #NonDilutiveFunding`

        try {
          const { NativeYouTubeAdapter } = await import('@/lib/growth-os/execution/adapters/youtube-adapter')
          const result = await NativeYouTubeAdapter.uploadShortsFromUrl(reelVideoUrl, title, description)
          return {
            channelName: 'YouTube',
            status: result.success ? 'LIVE_PUBLISHED' : 'QUEUED_FOR_APPROVAL',
            externalId: result.videoId || '',
            message: result.success
              ? `YouTube Short published live: ${result.videoUrl}`
              : `YouTube upload: ${result.error || 'Pending credentials or processing'}`,
          }
        } catch (ytErr: any) {
          return {
            channelName: 'YouTube',
            status: 'QUEUED_FOR_APPROVAL',
            message: `YouTube error: ${ytErr.message}`,
          }
        }
      }),
    ])

    // Save consolidated state once after all 4 parallel dispatches complete
    const anyAccepted = results.some(providerAccepted)
    if (anyAccepted) {
      const acceptedAt = new Date().toISOString()
      state.variants[variant.id] = receipts
      state.lastAcceptedAt = acceptedAt
      state.updatedAt = acceptedAt
      try {
        await setOperationalState(STATE_KEY, state)
      } catch (stateErr: any) {
        console.error('[SocialRevenueSprint] Failed to save operational state:', stateErr)
      }
    }

    return {
      active: true,
      decision: results.some(providerAccepted)
        ? 'PUBLISHED'
        : 'PROVIDER_REJECTED',
      variantId: variant.id,
      offerId: variant.offerId,
      attempted: results.length,
      accepted: results.filter(providerAccepted).length,
      results,
    }
  }
}
