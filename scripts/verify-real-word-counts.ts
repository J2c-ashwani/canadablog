
import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'app/blog');

function getWordCount(filePath: string): number {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');

        // Remove imports
        let cleaner = content.replace(/^import .*$/gm, ' ');

        // Remove metadata block (heuristic)
        cleaner = cleaner.replace(/export const metadata[\s\S]*?};/, ' ');

        // Remove component declaration start up to return (rough heuristic to skip props etc)
        // Actually, let's just strip HTML tags roughly to avoid counting attribute names too much
        // This is not perfect but better than raw code count.

        // Remove standard HTML tags
        cleaner = cleaner.replace(/<[^>]*>/g, ' ');

        // Remove special chars
        cleaner = cleaner.replace(/[{}();"\'=]/g, ' ');

        return cleaner.trim().split(/\s+/).filter(w => w.length > 2).length;
    } catch (e) {
        return 0;
    }
}

async function verify() {
    console.log("Verifying real word counts in app/blog/...\n");

    if (!fs.existsSync(blogDir)) {
        console.error(`Directory not found: ${blogDir}`);
        return;
    }

    const entries = fs.readdirSync(blogDir, { withFileTypes: true });
    const reports: { slug: string; words: number }[] = [];

    for (const entry of entries) {
        if (entry.isDirectory()) {
            const pagePath = path.join(blogDir, entry.name, 'page.tsx');
            if (fs.existsSync(pagePath)) {
                const words = getWordCount(pagePath);
                reports.push({ slug: entry.name, words });
            }
        }
    }

    // Sort by word count asc
    reports.sort((a, b) => a.words - b.words);

    console.log(`checked ${reports.length} pages.`);

    const lowCount = reports.filter(r => r.words < 1500);

    if (lowCount.length > 0) {
        console.log(`\n⚠️  Found ${lowCount.length} pages under 1500 words:\n`);
        lowCount.forEach(r => {
            console.log(`${r.words.toString().padStart(5)} words | ${r.slug}`);
        });
    } else {
        console.log("\n✅ All pages are over 1500 words!");
    }

    console.log("\nTop 5 Lowest Word Counts (Just in case):");
    reports.slice(0, 5).forEach(r => {
        console.log(`${r.words.toString().padStart(5)} words | ${r.slug}`);
    });
}

verify();
