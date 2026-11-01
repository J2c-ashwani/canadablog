import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

async function main() {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN?.trim() || process.env.FACEBOOK_ACCESS_TOKEN?.trim();
  const pageId = process.env.FACEBOOK_PAGE_ID?.trim() || '1077759455417325';
  const videoPath = path.resolve('public/videos/reels/grant-rejection-traps.mp4');

  if (!token) {
    throw new Error('FACEBOOK_PAGE_ACCESS_TOKEN is missing');
  }

  if (!fs.existsSync(videoPath)) {
    throw new Error(`Video file not found at ${videoPath}`);
  }

  console.log(`🚀 Uploading Reel binary (${(fs.statSync(videoPath).size / 1024 / 1024).toFixed(2)} MB) to Facebook Page ${pageId}...`);

  const title = '⚠️ Top 3 Canadian Grant Application Traps to Avoid in 2026';
  const description = 
`⚠️ Top 3 Grant Application Traps: Why 70% of Canadian Grant Applications Get Rejected

Over 70% of Canadian small business grant applications get disqualified before an advisor even reviews them.

Here are the 3 biggest traps to avoid:
1. Retroactive spending: Zero Canadian government grants reimburse past expenses. Apply before you commit capital!
2. Ineligible business structure: Sole proprietorships are disqualified from 85%+ of federal grants. You must be an incorporated CCPC.
3. Missing payroll records: Wage subsidies require formal T4 CRA remittances, not informal cash payouts.

Pre-screen your business eligibility in under 60 seconds with our free Grant Calculator:
👉 https://fsidigital.ca/calculator

#CanadianGrants #BusinessFunding #GrantTraps #StartupFunding #SmallBusinessCanada #FSIDigital #NonDilutiveFunding`;

  const videoBuffer = fs.readFileSync(videoPath);
  const blob = new Blob([videoBuffer], { type: 'video/mp4' });

  const formData = new FormData();
  formData.append('source', blob, 'grant-rejection-traps.mp4');
  formData.append('title', title);
  formData.append('description', description);
  formData.append('access_token', token);

  const res = await fetch(`https://graph-video.facebook.com/v19.0/${pageId}/videos`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  console.log('Facebook API Response:', JSON.stringify(data, null, 2));

  if (!res.ok || !data.id) {
    throw new Error(`Upload failed with status ${res.status}: ${data.error?.message || 'unknown error'}`);
  }

  console.log(`\n🎉 SUCCESS! Facebook Video Reel Published!`);
  console.log(`Video ID: ${data.id}`);
  console.log(`Post URL: https://www.facebook.com/${data.id}`);
}

main().catch((err) => {
  console.error('❌ Error publishing to Facebook:', err);
  process.exit(1);
});
