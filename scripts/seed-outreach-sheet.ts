import fs from "fs";
import path from "path";
import { config } from "dotenv";

// Load local environment variables
config({ path: ".env.local" });

import { seedOutreachProspects } from "../lib/google-sheets";

const STATUS_PATH = path.join(process.cwd(), "scratch", "outreach_status.json");

async function run() {
  if (!fs.existsSync(STATUS_PATH)) {
    console.error(`❌ Status database file not found at: ${STATUS_PATH}`);
    process.exit(1);
  }

  console.log("Reading local outreach_status.json database...");
  const data = JSON.parse(fs.readFileSync(STATUS_PATH, "utf8"));
  
  const prospects = data.prospects.map((p: any) => ({
    website: p.website,
    prospectName: p.prospectName,
    email: p.email,
    targetPage: p.targetPage,
    name: p.name,
    personalizedHook: p.personalizedHook,
    status: p.status || "pending",
    sentAt: p.sentAt || null,
    deliveryStatus: p.deliveryStatus || null,
    replied: p.replied || false,
    positiveConversation: p.positiveConversation || false,
    backlinkEarned: p.backlinkEarned || false,
  }));

  console.log(`Seeding ${prospects.length} prospects to Google Sheets database...`);
  const result = await seedOutreachProspects(prospects);

  if (result.success) {
    console.log("🎉 Database seeded successfully to Google Sheets spreadsheet!");
  } else {
    console.error("❌ Seeding failed:", result.error);
    process.exit(1);
  }
}

run().catch((e) => {
  console.error("❌ Fatal seeder error:", e);
  process.exit(1);
});
