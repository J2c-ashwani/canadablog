const fs = require('fs');
const path = require('path');

const DOWNLOADS_DIR = path.resolve('app/download');

function run() {
    if (!fs.existsSync(DOWNLOADS_DIR)) {
        console.error('Downloads directory does not exist:', DOWNLOADS_DIR);
        return;
    }

    const dirs = fs.readdirSync(DOWNLOADS_DIR).filter(entry => {
        const fullPath = path.join(DOWNLOADS_DIR, entry);
        return fs.statSync(fullPath).isDirectory() && entry !== 'thank-you';
    });

    console.log(`Found ${dirs.length} download guide directories. Starting split...`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const dirName of dirs) {
        const filePath = path.join(DOWNLOADS_DIR, dirName, 'page.tsx');
        if (!fs.existsSync(filePath)) {
            console.log(`[SKIP] No page.tsx found in ${dirName}`);
            skippedCount++;
            continue;
        }

        const content = fs.readFileSync(filePath, 'utf8');

        // Check if page has already been split (must start with "use client" to be split)
        if (!content.trim().startsWith('"use client"') && !content.trim().startsWith("'use client'")) {
            console.log(`[SKIP] ${dirName} is already a Server Component (does not start with "use client")`);
            skippedCount++;
            continue;
        }

        // Extract metadata tags
        const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/);
        const descMatch = content.match(/<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/?>/);
        const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="([\s\S]*?)"\s*\/?>/);

        if (!titleMatch || !descMatch || !canonicalMatch) {
            console.log(`[WARNING] Meta tags missing in ${dirName}. Skipping split to avoid data loss.`);
            skippedCount++;
            continue;
        }

        const title = titleMatch[1].trim();
        const description = descMatch[1].trim();
        const canonical = canonicalMatch[1].trim();

        // 1. Create DownloadClient.tsx content (strip out metadata tags)
        let clientContent = content
            .replace(/<title>[\s\S]*?<\/title>\r?\n?/, '')
            .replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>\r?\n?/, '')
            .replace(/<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>\r?\n?/, '');

        // Write DownloadClient.tsx in the directory
        const clientFilePath = path.join(DOWNLOADS_DIR, dirName, 'DownloadClient.tsx');
        fs.writeFileSync(clientFilePath, clientContent, 'utf8');

        // 2. Create the new page.tsx Server Component content
        const serverPageContent = `import type { Metadata } from "next"
import DownloadClient from "./DownloadClient"

export const metadata: Metadata = {
  title: "${title.replace(/"/g, '\\"')}",
  description: "${description.replace(/"/g, '\\"')}",
  alternates: {
    canonical: "${canonical}",
  },
}

export default function Page() {
  return <DownloadClient />
}
`;

        // Overwrite page.tsx
        fs.writeFileSync(filePath, serverPageContent, 'utf8');
        console.log(`[SUCCESS] Refactored ${dirName} into page.tsx + DownloadClient.tsx`);
        updatedCount++;
    }

    console.log('\n======================================');
    console.log(`Split operation complete:`);
    console.log(`- Refactored: ${updatedCount} directories`);
    console.log(`- Skipped: ${skippedCount} directories`);
    console.log('======================================');
}

run();
