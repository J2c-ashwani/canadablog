import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

async function main() {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN?.trim() || process.env.FACEBOOK_ACCESS_TOKEN?.trim();
  const pageId = process.env.FACEBOOK_PAGE_ID?.trim() || '1077759455417325';
  const videoPath = path.resolve('public/videos/reels/nrc-irap-innovation-grants.mp4');

  if (!token) {
    throw new Error('FACEBOOK_PAGE_ACCESS_TOKEN is missing');
  }

  if (!fs.existsSync(videoPath)) {
    throw new Error(`Video file not found at ${videoPath}`);
  }

  console.log(`🚀 Uploading Reel binary (${(fs.statSync(videoPath).size / 1024 / 1024).toFixed(2)} MB) to Facebook Page ${pageId}...`);

  const title = '🇨🇦 NRC IRAP Innovation Grants 2026 (Up to $500,000 Non-Repayable)';
  const description = 
`🇨🇦 NRC IRAP Innovation Grants: Up to $500,000 Non-Repayable

The National Research Council's IRAP program is Canada's premier funding stream for technology companies.

Key features:
• Up to $500,000 non-repayable cash funding
• Zero equity dilution for founders
• Covers up to 80% of internal developer wages
• Dedicated Industrial Technology Advisor (ITA) guidance
• Legally stackable with SR&ED tax credits

Check your company's grant eligibility in 60 seconds:
👉 https://fsidigital.ca/calculator

#NRCIRAP #IRAP #InnovationGrants #CanadianTech #TechFounders #NonDilutiveFunding #BusinessGrants`;

  const videoBuffer = fs.readFileSync(videoPath);
  const blob = new Blob([videoBuffer], { type: 'video/mp4' });

  const formData = new FormData();
  formData.append('source', blob, 'nrc-irap-innovation-grants.mp4');
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
