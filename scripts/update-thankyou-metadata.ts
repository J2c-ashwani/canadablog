import fs from 'fs';
import path from 'path';

const DOWNLOAD_DIR = path.resolve('app/download');

function run() {
  const dirs = fs.readdirSync(DOWNLOAD_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name !== 'thank-you');

  console.log(`🔍 Scanning ${dirs.length} thank-you page directories...`);

  let updatedCount = 0;

  for (const dir of dirs) {
    const thankYouPath = path.join(DOWNLOAD_DIR, dir.name, 'thank-you', 'page.tsx');

    if (!fs.existsSync(thankYouPath)) continue;

    let content = fs.readFileSync(thankYouPath, 'utf8');

    // If it already has metadata defined, skip
    if (content.includes('export const metadata') || content.includes('generateMetadata')) {
      console.log(`⚠️ [${dir.name}/thank-you] Metadata already defined. Skipping.`);
      continue;
    }

    // 1. Ensure Metadata import exists
    if (!content.includes('import type { Metadata }')) {
      // Find first import line and insert after it, or insert at the very top
      const firstImportIndex = content.indexOf('import ');
      if (firstImportIndex !== -1) {
        const nextLineIndex = content.indexOf('\n', firstImportIndex);
        content = content.slice(0, nextLineIndex + 1) + 'import type { Metadata } from "next"\n' + content.slice(nextLineIndex + 1);
      } else {
        content = 'import type { Metadata } from "next"\n' + content;
      }
    }

    // 2. Insert metadata block before the main export default function
    const exportIndex = content.indexOf('export default function');
    if (exportIndex !== -1) {
      const metadataBlock = `export const metadata: Metadata = {
  title: "Thank You - Download Confirmation | FSI Digital",
  description: "Your download request has been successfully processed. Check your email for instant access to your guide and templates.",
  robots: { index: false, follow: false }
}\n\n`;
      content = content.slice(0, exportIndex) + metadataBlock + content.slice(exportIndex);
      fs.writeFileSync(thankYouPath, content, 'utf8');
      console.log(`✅ [${dir.name}/thank-you] Injected noindex metadata.`);
      updatedCount++;
    } else {
      console.log(`❌ [${dir.name}/thank-you] Could not find default export function.`);
    }
  }

  console.log(`\n🎉 Completed. Injected metadata for ${updatedCount} thank-you pages.`);
}

run();
