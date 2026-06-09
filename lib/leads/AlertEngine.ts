import { getAllPrograms, type ProgramDetails } from "@/lib/data/programs"
import { SubscriberRepository, type SubscriberProfile } from "@/lib/leads/SubscriberRepository"

export interface AlertDraft {
  id: string
  category: "New Opportunity" | "Program Change" | "Weekly Intelligence" | "Emergency"
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  subject: string
  body: string // Template or individual sample preview
  targetSegment: string
  status: "Draft" | "Sent"
  timestamp: string
  recipientsCount: number
  programSlug?: string
  changeText?: string
}

export class AlertEngine {
  // 1. Core Profile Matching Logic
  static matchesProfile(program: ProgramDetails, sub: SubscriberProfile): boolean {
    if (!sub.isSubscribed) return false

    // Region matching: Federal matches all in same country. Local matches specific state/province.
    if (program.region !== "Federal") {
      const regionLower = program.region.toLowerCase()
      const subRegionLower = sub.region.toLowerCase()
      if (regionLower !== subRegionLower) return false
    } else {
      // Federal matches country
      if (program.country !== sub.country) return false
    }

    // Industry matching
    const textToScan = `${program.name} ${program.fundingType} ${program.description} ${program.eligibility.join(" ")}`.toLowerCase()
    
    // Check if industry is explicitly incompatible (optional safeguard, matches B2B cohort definitions)
    if (sub.industry === "technology" || sub.industry === "software") {
      // If subscriber is tech, check if program is specifically agriculture-only or non-profit-only
      if (textToScan.includes("agriculture only") || textToScan.includes("non-profit only")) return false
    }

    // Funding Interests matching (Grants, Loans, Tax Credits, Hiring Subsidies)
    if (sub.fundingInterests && sub.fundingInterests.length > 0) {
      const interestMap: Record<string, string> = {
        "Grants": "grant",
        "Loans": "loan",
        "Tax Credits": "tax credit",
        "Hiring Subsidies": "subsidy"
      }
      
      const subInterests = sub.fundingInterests.map(i => interestMap[i] || i.toLowerCase())
      const progType = program.fundingType.toLowerCase()
      const matchesType = subInterests.some(interest => progType.includes(interest))
      if (!matchesType) return false
    }

    return true
  }

  // 2. UTM Tracking Builder
  static buildTrackingUrl(programSlug: string, category: string, sub: SubscriberProfile): string {
    const campaign = `${category.toLowerCase().replace(/\s+/g, "_")}_${programSlug}`
    return `https://www.fsidigital.ca/portfolio?token=${sub.loginToken}&utm_source=funding_alerts&utm_medium=email&utm_campaign=${campaign}`
  }

  // 3. Email Template Wrapper
  static wrapEmailTemplate(content: string, sub: SubscriberProfile): string {
    const unsubLink = `https://www.fsidigital.ca/subscribe/unsubscribe?token=${sub.unsubscribeToken}`
    const prefLink = `https://www.fsidigital.ca/subscribe/preferences?email=${encodeURIComponent(sub.email)}`

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FSI Funding Intelligence</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 10px;">
          <tr>
            <td align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #0f172a; border-radius: 16px 16px 0 0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <span style="color: #60a5fa; font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; display: block; margin-bottom: 4px;">FSI DIGITAL</span>
                    <span style="color: #ffffff; font-size: 20px; font-weight: 800; tracking: tight;">FUNDING INTELLIGENCE</span>
                  </td>
                </tr>
              </table>

              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 0 0 16px 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); border-left: 1px border-slate-200; border-right: 1px border-slate-200; border-bottom: 1px border-slate-200;">
                <tr>
                  <td style="padding: 32px 24px;">
                    <p style="margin-top: 0; margin-bottom: 16px; font-size: 16px; font-weight: 600; color: #1e293b;">Hi ${sub.name || "there"},</p>
                    
                    ${content}

                    <div style="margin-top: 32px; padding-top: 24px; border-t: 1px solid #e2e8f0; text-align: center;">
                      <p style="margin: 0; font-size: 11px; color: #64748b; line-height: 1.6;">
                        <strong>Important Disclosure:</strong> FSI Digital is an independent private consultancy. We are not associated with, endorsed by, or affiliated with the CRA, NRC, SBA, or any municipal, regional, provincial, state, or federal government body. All matches are estimates; final approval is subject to official agency guidelines.
                      </p>
                      <p style="margin-top: 16px; margin-bottom: 0; font-size: 11px; color: #94a3b8;">
                        <a href="${prefLink}" style="color: #3b82f6; text-decoration: underline;">Manage Alert Preferences</a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a href="${unsubLink}" style="color: #ef4444; text-decoration: underline;">Unsubscribe</a>
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  }

  // 4. Draft Templates Generators
  static generateNewOpportunityBody(program: ProgramDetails, sub: SubscriberProfile): string {
    const url = this.buildTrackingUrl(program.slug, "New Opportunity", sub)
    return `
      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: center;">
        <span style="background-color: #10b981; color: #ffffff; font-size: 9px; font-weight: 800; padding: 2px 8px; border-radius: 9999px; text-transform: uppercase;">New Program Alert</span>
        <h3 style="margin: 8px 0 4px 0; font-size: 18px; font-weight: 800; color: #065f46;">${program.name}</h3>
        <p style="margin: 0 0 12px 0; font-size: 13px; color: #047857; font-weight: 600;">Agency: ${program.agency}</p>
        <p style="margin: 0 0 16px 0; font-size: 14px; color: #374151; line-height: 1.5;">${program.description}</p>
        <a href="${url}" style="display: inline-block; background-color: #10b981; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(16,185,129,0.2);">Analyze Match Probability & Requirements</a>
      </div>
      <table border="0" cellpadding="8" cellspacing="0" width="100%" style="font-size: 13px; border-collapse: collapse; margin-top: 16px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="color: #64748b; font-weight: 600; width: 120px;">Allocation limit:</td>
          <td style="color: #334155; font-weight: 700;">${program.fundingAmount}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="color: #64748b; font-weight: 600;">Difficulty:</td>
          <td style="color: #334155; font-weight: 700;">${program.fundingDifficulty}</td>
        </tr>
        <tr>
          <td style="color: #64748b; font-weight: 600;">Intake Cycle:</td>
          <td style="color: #334155; font-weight: 700;">${program.deadlineType}</td>
        </tr>
      </table>
    `
  }

  static generateProgramChangeBody(program: ProgramDetails, sub: SubscriberProfile, changeText: string): string {
    const url = this.buildTrackingUrl(program.slug, "Program Change", sub)
    return `
      <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: center;">
        <span style="background-color: #3b82f6; color: #ffffff; font-size: 9px; font-weight: 800; padding: 2px 8px; border-radius: 9999px; text-transform: uppercase;">Program Change Notification</span>
        <h3 style="margin: 8px 0 4px 0; font-size: 18px; font-weight: 800; color: #1e3a8a;">${program.name}</h3>
        <p style="margin: 0 0 16px 0; font-size: 14px; color: #1e40af; font-weight: 700; line-height: 1.5;">${changeText}</p>
        <a href="${url}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(59,130,246,0.2);">Review Updated Stacking Guide</a>
      </div>
    `
  }

  static generateWeeklyDigestBody(matchedPrograms: ProgramDetails[], sub: SubscriberProfile): string {
    let listHtml = ""
    for (const prog of matchedPrograms) {
      const url = this.buildTrackingUrl(prog.slug, "Weekly Intelligence", sub)
      listHtml += `
        <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 16px; background-color: #ffffff;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td>
                <span style="background-color: #f1f5f9; color: #475569; font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; margin-right: 6px;">${prog.fundingType}</span>
                <span style="color: #64748b; font-size: 11px; font-weight: 600;">${prog.region}</span>
                <h4 style="margin: 6px 0 4px 0; font-size: 15px; font-weight: 800; color: #0f172a;">${prog.name}</h4>
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b;">Allocation: <strong>${prog.fundingAmount}</strong></p>
                <p style="margin: 0 0 12px 0; font-size: 13px; color: #334155; line-height: 1.4;">${prog.description}</p>
                <a href="${url}" style="color: #2563eb; font-weight: 700; font-size: 13px; text-decoration: none;">Compute Custom Match Score &rarr;</a>
              </td>
            </tr>
          </table>
        </div>
      `
    }

    return `
      <p style="margin-top: 0; margin-bottom: 24px; font-size: 14px; color: #475569; line-height: 1.6;">
        Based on your intelligence profile (<strong>${sub.region} | ${sub.industry} | ${sub.companySize} employees</strong>), our database identified the following high-probability funding matches this week:
      </p>
      
      ${listHtml}
      
      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; text-align: center; margin-top: 24px;">
        <h4 style="margin: 0 0 6px 0; color: #15803d; font-size: 15px; font-weight: 800;">View Matches in Your Dashboard</h4>
        <p style="margin: 0 0 16px 0; color: #166534; font-size: 12px; line-height: 1.5;">Review eligibility criteria, stack active programs, and prepare filing roadmaps.</p>
        <a href="https://www.fsidigital.ca/portfolio?token=${sub.loginToken}&ref=weekly_digest" style="display: inline-block; background-color: #16a34a; color: #ffffff; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(22,163,74,0.2);">Access Your Funding Portfolio</a>
      </div>
      
      <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px; text-align: center; margin-top: 16px;">
        <h4 style="margin: 0 0 4px 0; color: #1e40af; font-size: 13px; font-weight: 800;">⚡ Premium Analysis Available</h4>
        <p style="margin: 0 0 10px 0; color: #1e3a8a; font-size: 11px; line-height: 1.4;">Unlock filing guidance, strategic stacking recommendations, and application checklists.</p>
        <a href="https://www.fsidigital.ca/portfolio?token=${sub.loginToken}&ref=premium_upgrade" style="color: #2563eb; font-weight: 700; font-size: 11px; text-decoration: underline;">Upgrade to Founding Member for $29/month &rarr;</a>
      </div>
    `
  }

  static generateEmergencyAlertBody(program: ProgramDetails, sub: SubscriberProfile): string {
    const url = this.buildTrackingUrl(program.slug, "Emergency", sub)
    return `
      <div style="background-color: #fff1f2; border: 1px solid #fecdd3; border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: center;">
        <span style="background-color: #e11d48; color: #ffffff; font-size: 9px; font-weight: 800; padding: 2px 8px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;">CRITICAL INTAKE CLOSING</span>
        <h3 style="margin: 8px 0 4px 0; font-size: 18px; font-weight: 800; color: #9f1239;">${program.name}</h3>
        <p style="margin: 0 0 16px 0; font-size: 14px; color: #be123c; font-weight: 700; line-height: 1.5;">This program is confirmed to close its application window in less than 7 days. Action is required immediately to prepare compliant budget sheets and filings.</p>
        <a href="${url}" style="display: inline-block; background-color: #e11d48; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(225,29,72,0.2);">Prepare Express Application Checklist</a>
      </div>
    `
  }

  // 5. Generate Campaign Drafts Queue
  static async createOpportunityAlertDraft(programSlug: string): Promise<AlertDraft | null> {
    const program = getAllPrograms().find(p => p.slug === programSlug)
    if (!program) return null

    const subs = await SubscriberRepository.getAllSubscribers()
    const matchedSubs = subs.filter(sub => this.matchesProfile(program, sub))

    if (matchedSubs.length === 0) return null

    // Sample preview content generated for the first matched subscriber
    const sampleBody = this.generateNewOpportunityBody(program, matchedSubs[0])
    const wrappedBody = this.wrapEmailTemplate(sampleBody, matchedSubs[0])

    return {
      id: `opp_${programSlug}_${Date.now()}`,
      category: "New Opportunity",
      priority: "HIGH",
      subject: `[New Funding opportunity] ${program.name} is now open`,
      body: wrappedBody,
      targetSegment: `${program.region} | ${program.fundingType}`,
      status: "Draft",
      timestamp: new Date().toISOString(),
      recipientsCount: matchedSubs.length,
      programSlug: programSlug
    }
  }

  static async createProgramChangeDraft(programSlug: string, changeText: string): Promise<AlertDraft | null> {
    const program = getAllPrograms().find(p => p.slug === programSlug)
    if (!program) return null

    const subs = await SubscriberRepository.getAllSubscribers()
    const matchedSubs = subs.filter(sub => this.matchesProfile(program, sub))

    if (matchedSubs.length === 0) return null

    const sampleBody = this.generateProgramChangeBody(program, matchedSubs[0], changeText)
    const wrappedBody = this.wrapEmailTemplate(sampleBody, matchedSubs[0])

    return {
      id: `change_${programSlug}_${Date.now()}`,
      category: "Program Change",
      priority: "MEDIUM",
      subject: `[Funding Alert] Updates announced for ${program.name}`,
      body: wrappedBody,
      targetSegment: `${program.region} | ${program.fundingType}`,
      status: "Draft",
      timestamp: new Date().toISOString(),
      recipientsCount: matchedSubs.length,
      programSlug: programSlug,
      changeText: changeText
    }
  }

  static async createWeeklyDigestDraft(): Promise<AlertDraft | null> {
    const subs = await SubscriberRepository.getAllSubscribers()
    const activeSubs = subs.filter(sub => sub.isSubscribed)
    
    if (activeSubs.length === 0) return null

    // Prepare a generic digest draft representation (actual sends will customize individually)
    const programs = getAllPrograms()
    const sampleSub = activeSubs[0]
    const matchedPrograms = programs
      .filter(p => this.matchesProfile(p, sampleSub))
      .slice(0, 5)

    if (matchedPrograms.length === 0) return null

    const sampleBody = this.generateWeeklyDigestBody(matchedPrograms, sampleSub)
    const wrappedBody = this.wrapEmailTemplate(sampleBody, sampleSub)

    return {
      id: `digest_${Date.now()}`,
      category: "Weekly Intelligence",
      priority: "LOW",
      subject: `Your Weekly Funding Intelligence Digest - ${matchedPrograms.length} Matched opportunities`,
      body: wrappedBody,
      targetSegment: `All Active Subscribers (Segmented Matches)`,
      status: "Draft",
      timestamp: new Date().toISOString(),
      recipientsCount: activeSubs.length
    }
  }

  static async createEmergencyAlertDraft(programSlug: string): Promise<AlertDraft | null> {
    const program = getAllPrograms().find(p => p.slug === programSlug)
    if (!program) return null

    const subs = await SubscriberRepository.getAllSubscribers()
    const matchedSubs = subs.filter(sub => this.matchesProfile(program, sub))

    if (matchedSubs.length === 0) return null

    const sampleBody = this.generateEmergencyAlertBody(program, matchedSubs[0])
    const wrappedBody = this.wrapEmailTemplate(sampleBody, matchedSubs[0])

    return {
      id: `emergency_${programSlug}_${Date.now()}`,
      category: "Emergency",
      priority: "CRITICAL",
      subject: `[Action Required] Deadline approaching: ${program.name} closes soon`,
      body: wrappedBody,
      targetSegment: `${program.region} | Matches`,
      status: "Draft",
      timestamp: new Date().toISOString(),
      recipientsCount: matchedSubs.length,
      programSlug: programSlug
    }
  }
}
