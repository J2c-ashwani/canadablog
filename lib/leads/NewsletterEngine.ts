import { getGoogleSheetsClient } from "../google-sheets"
import { SubscriberRepository, type SubscriberProfile } from "./SubscriberRepository"
import { getAllPrograms } from "../data/programs"
import { MatchScoreEngine } from "./MatchScoreEngine"
import {
  sendNewFundingAlertEmail,
  sendFundingMatchUpdateEmail,
  sendMissingFundingAlertEmail
} from "../emails/newsletter-marketing"

export interface NewsletterCampaignConfig {
  campaignId: string;
  campaignType: "new_funding" | "match_update" | "missing_funding";
  programSlug?: string;
  newProgramsCount?: number;
  newProgramsList?: string[];
  missingFundingAmount?: string;
  status: "idle" | "running" | "completed";
  startedAt?: string;
  sentCount: number;
}

const SETTINGS_SHEET_NAME = "CampaignSettings"

export class NewsletterEngine {
  static async getCampaignConfig(): Promise<NewsletterCampaignConfig> {
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID is missing")

    // 1. Ensure settings sheet exists
    await this.ensureSheetExists(sheets, spreadsheetId)

    // 2. Fetch config values
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SETTINGS_SHEET_NAME}!A2:I2`
    })

    const rows = response.data.values
    if (!rows || rows.length === 0) {
      // Default initial configuration
      const defaultConfig: NewsletterCampaignConfig = {
        campaignId: "default_none",
        campaignType: "new_funding",
        programSlug: "",
        newProgramsCount: 3,
        newProgramsList: ["Scale-Up Support Program", "Technology Growth Fund", "Provincial Job Grant"],
        missingFundingAmount: "$120,000",
        status: "idle",
        startedAt: "",
        sentCount: 0
      }
      await this.saveCampaignConfig(defaultConfig)
      return defaultConfig
    }

    const [
      campaignId,
      campaignType,
      programSlug,
      newProgramsCount,
      newProgramsListStr,
      missingFundingAmount,
      status,
      startedAt,
      sentCount
    ] = rows[0]

    return {
      campaignId: campaignId || "default_none",
      campaignType: (campaignType || "new_funding") as any,
      programSlug: programSlug || "",
      newProgramsCount: Number(newProgramsCount || 3),
      newProgramsList: newProgramsListStr ? newProgramsListStr.split(";").map((x: string) => x.trim()).filter(Boolean) : [],
      missingFundingAmount: missingFundingAmount || "$120,000",
      status: (status || "idle") as any,
      startedAt: startedAt || "",
      sentCount: Number(sentCount || 0)
    }
  }

  static async saveCampaignConfig(config: NewsletterCampaignConfig): Promise<void> {
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID is missing")

    await this.ensureSheetExists(sheets, spreadsheetId)

    const values = [
      [
        config.campaignId,
        config.campaignType,
        config.programSlug || "",
        config.newProgramsCount || 0,
        config.newProgramsList ? config.newProgramsList.join(";") : "",
        config.missingFundingAmount || "$120,000",
        config.status,
        config.startedAt || "",
        config.sentCount || 0
      ]
    ]

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SETTINGS_SHEET_NAME}!A2:I2`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values }
    })
  }

  private static async ensureSheetExists(sheets: any, spreadsheetId: string): Promise<void> {
    try {
      const metadata = await sheets.spreadsheets.get({ spreadsheetId })
      const sheetExists = metadata.data.sheets.some(
        (s: any) => s.properties.title === SETTINGS_SHEET_NAME
      )

      if (!sheetExists) {
        // Create the sheet
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: { title: SETTINGS_SHEET_NAME }
                }
              }
            ]
          }
        })

        // Add headers
        const headers = [
          [
            "campaignId",
            "campaignType",
            "programSlug",
            "newProgramsCount",
            "newProgramsList",
            "missingFundingAmount",
            "status",
            "startedAt",
            "sentCount"
          ]
        ]
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `${SETTINGS_SHEET_NAME}!A1:I1`,
          valueInputOption: "USER_ENTERED",
          requestBody: { values: headers }
        })
      }
    } catch (e) {
      console.error("Failed to ensure CampaignSettings sheet exists:", e)
    }
  }

  static async getTargetLeadsForCampaign(
    config: NewsletterCampaignConfig,
    allSubs: SubscriberProfile[]
  ): Promise<SubscriberProfile[]> {
    const activeSubs = allSubs.filter(sub => sub.isSubscribed && sub.email)

    if (config.campaignType === "new_funding") {
      const prog = getAllPrograms().find(p => p.slug === config.programSlug)
      if (!prog) return []

      // Match subscribers eligible for this specific program
      return activeSubs.filter(sub => {
        const matchRes = MatchScoreEngine.calculateMatch(prog, {
          country: sub.country || "Canada",
          region: sub.region || "ON",
          companySize: sub.companySize || "1-9",
          industry: sub.industry || "technology",
          fundingInterests: sub.fundingInterests || []
        })
        return matchRes.status === "Eligible"
      })
    }

    if (config.campaignType === "match_update") {
      // Completed leads only (they have completed step 3, so they have a readinessScore or companyName)
      return activeSubs.filter(sub => sub.companyName && sub.companyName !== "N/A" && sub.source !== "Screener Dropoff Draft")
    }

    if (config.campaignType === "missing_funding") {
      // Incomplete dropoffs or completed-but-unpaid report leads
      return activeSubs.filter(sub => !sub.reportPurchased)
    }

    return []
  }

  static async sendNewsletterToLead(
    config: NewsletterCampaignConfig,
    sub: SubscriberProfile
  ): Promise<boolean> {
    if (!sub.email) return false

    try {
      if (config.campaignType === "new_funding") {
        const prog = getAllPrograms().find(p => p.slug === config.programSlug)
        if (!prog) return false

        const res = await sendNewFundingAlertEmail({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          programName: prog.name,
          maxFundingAmount: prog.fundingAmount,
          region: sub.region || "ON",
          industry: sub.industry || "technology"
        })
        return res.success
      }

      if (config.campaignType === "match_update") {
        const res = await sendFundingMatchUpdateEmail({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          newProgramsCount: config.newProgramsCount || 3,
          newProgramsList: config.newProgramsList && config.newProgramsList.length > 0
            ? config.newProgramsList
            : ["Scale-Up Support Program", "Technology Growth Fund", "Provincial Job Grant"]
        })
        return res.success
      }

      if (config.campaignType === "missing_funding") {
        const res = await sendMissingFundingAlertEmail({
          to: sub.email,
          name: sub.name,
          loginToken: sub.loginToken || "",
          companyName: sub.companyName,
          missingFundingAmount: config.missingFundingAmount || "$120,000"
        })
        return res.success
      }
    } catch (err) {
      console.error(`Error sending newsletter to ${sub.email}:`, err)
    }

    return false
  }
}
