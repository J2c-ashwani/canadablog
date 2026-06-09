import fs from "fs"
import path from "path"

export interface CampaignMetrics {
  campaignId: string
  category: string
  subject: string
  sentCount: number
  opens: number
  clicks: number
  conversions: number // Estimator completes
  audits: number // Bookings
  revenue: number // Payments verified
  timestamp: string
}

const METRICS_FILE_PATH = path.join(process.cwd(), "lib/data/alert-metrics.json")

function ensureMetricsFileExists() {
  const dir = path.dirname(METRICS_FILE_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(METRICS_FILE_PATH)) {
    fs.writeFileSync(METRICS_FILE_PATH, JSON.stringify({}), "utf8")
  }
}

export async function getAllCampaignMetrics(): Promise<Record<string, CampaignMetrics>> {
  try {
    ensureMetricsFileExists()
    const content = fs.readFileSync(METRICS_FILE_PATH, "utf8")
    return JSON.parse(content || "{}")
  } catch (err) {
    console.error("Error reading campaign metrics:", err)
    return {}
  }
}

export async function getCampaignMetrics(campaignId: string): Promise<CampaignMetrics | null> {
  const all = await getAllCampaignMetrics()
  return all[campaignId] || null
}

export async function saveCampaignMetrics(metrics: CampaignMetrics): Promise<void> {
  try {
    const all = await getAllCampaignMetrics()
    all[metrics.campaignId] = metrics
    fs.writeFileSync(METRICS_FILE_PATH, JSON.stringify(all, null, 2), "utf8")
  } catch (err) {
    console.error("Error saving campaign metrics:", err)
  }
}

export async function recordCampaignEvent(
  campaignId: string, 
  event: "open" | "click" | "conversion" | "audit" | "revenue",
  value = 1
): Promise<void> {
  try {
    const all = await getAllCampaignMetrics()
    if (!all[campaignId]) {
      // Create a default campaign record if it doesn't exist
      all[campaignId] = {
        campaignId,
        category: "Unknown",
        subject: "Manual/Untracked Alert",
        sentCount: 0,
        opens: 0,
        clicks: 0,
        conversions: 0,
        audits: 0,
        revenue: 0,
        timestamp: new Date().toISOString()
      }
    }

    const campaign = all[campaignId]
    if (event === "open") campaign.opens += value
    else if (event === "click") campaign.clicks += value
    else if (event === "conversion") campaign.conversions += value
    else if (event === "audit") campaign.audits += value
    else if (event === "revenue") campaign.revenue += value

    fs.writeFileSync(METRICS_FILE_PATH, JSON.stringify(all, null, 2), "utf8")
  } catch (err) {
    console.error(`Error recording event ${event} for campaign ${campaignId}:`, err)
  }
}
