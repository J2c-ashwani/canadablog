import fs from 'fs';
import path from 'path';

const DOWNLOAD_DIR = path.resolve('app/download');

const MANUAL_PARENTS: Record<string, string> = {
  'agriculture-agri-food-application-kit': '/blog/agriculture-agri-food-canada-government-grants',
  'alberta-business-grants-kit': '/blog/alberta-small-business-grants-guide',
  'british-columbia-grants-kit': '/blog/bc-small-business-grants-guide',
  'canada-aerospace-defence-funding-guide': '/blog/canada-aerospace-defence-innovation-grants',
  'canada-agri-food-funding-guide': '/blog/canada-agriculture-agrifood-grants-guide',
  'canada-cleantech-funding-guide': '/blog/canada-clean-technology-innovation-grants',
  'canada-digital-ai-funding-guide': '/blog/canada-digital-ai-innovation-grants',
  'canada-life-sciences-funding-guide': '/blog/canada-life-sciences-innovation-grants',
  'canada-manufacturing-funding-guide': '/blog/manufacturing-grants-2026',
  'csbfp-government-financing-kit': '/blog/csbfp-canada-small-business-financing-program',
  'irap-government-application-kit': '/blog/irap-industrial-research-assistance-program',
  'irap-innovation-application-guide': '/blog/irap-industrial-research-assistance-program',
  'nserc-research-grants-guide': '/blog/nserc-research-grants-canada',
  'ontario-business-grants-kit': '/blog/ontario-small-business-grants-guide',
  'quebec-business-grants-kit': '/blog/quebec-business-grants-2026',
  'rda-regional-application-kit': '/blog/regional-development-agencies-government-grants',
  'sba-application-checklist': '/blog/sba-loans-grants-guide',
  'sif-application-kit': '/blog/strategic-innovation-fund-canada-guide',
  'sred-application-kit': '/blog/sred-scientific-research-experimental-development',
  'women-entrepreneurship-application-kit': '/blog/women-business-grants-2026'
};

function run() {
  const dirs = fs.readdirSync(DOWNLOAD_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name !== 'thank-you');

  console.log(`🔍 Scanning ${dirs.length} download directories...`);

  let updatedCount = 0;

  for (const dir of dirs) {
    const dirPath = path.join(DOWNLOAD_DIR, dir.name);
    const pagePath = path.join(dirPath, 'page.tsx');
    const clientPath = path.join(dirPath, 'DownloadClient.tsx');

    if (!fs.existsSync(pagePath)) continue;

    const pageContent = fs.readFileSync(pagePath, 'utf8');
    let clientContent = '';
    if (fs.existsSync(clientPath)) {
      clientContent = fs.readFileSync(clientPath, 'utf8');
    }

    // Combine contents to search for parent guide links
    const combinedContent = pageContent + '\n' + clientContent;

    // Regex to find related guide links: /blog/slug, /guides/slug, /canada/slug, /usa/slug
    const links = [];
    const linkRegex = /href="(\/(blog|guides|canada|usa)\/[a-zA-Z0-9_-]+)"/g;
    let match;
    while ((match = linkRegex.exec(combinedContent)) !== null) {
      const url = match[1];
      // Skip archive links
      if (!url.includes('-archive') && !url.includes('/thank-you')) {
        links.push(url);
      }
    }

    // Fallbacks if no regex match (sometimes it's inside Link href={...} or similar)
    const linkRegex2 = /href=\{\s*['"](\/(blog|guides|canada|usa)\/[a-zA-Z0-9_-]+)['"]\s*\}/g;
    while ((match = linkRegex2.exec(combinedContent)) !== null) {
      const url = match[1];
      if (!url.includes('-archive') && !url.includes('/thank-you')) {
        links.push(url);
      }
    }

    // Unique links
    const uniqueLinks = Array.from(new Set(links));

    if (uniqueLinks.length > 0 || MANUAL_PARENTS[dir.name]) {
      const parentRoute = MANUAL_PARENTS[dir.name] || uniqueLinks[0];
      const targetCanonical = `https://www.fsidigital.ca${parentRoute}`;

      // Now find and replace the canonical tag in page.tsx
      const canonicalRegex = /canonical:\s*["'](https:\/\/www\.fsidigital\.ca\/download\/[a-zA-Z0-9_-]+)["']/g;
      
      if (canonicalRegex.test(pageContent)) {
        const updatedPageContent = pageContent.replace(canonicalRegex, `canonical: "${targetCanonical}"`);
        fs.writeFileSync(pagePath, updatedPageContent, 'utf8');
        console.log(`✅ [${dir.name}] Updated canonical -> ${targetCanonical}`);
        updatedCount++;
      } else {
        // Check if there is already a different canonical or no alternates block
        console.log(`⚠️ [${dir.name}] Found parent ${parentRoute} but canonical tag format didn't match default regex.`);
      }
    } else {
      console.log(`❌ [${dir.name}] No parent blog post or guide found.`);
    }
  }

  console.log(`\n🎉 Completed. Updated canonical tags for ${updatedCount} download pages.`);
}

run();
