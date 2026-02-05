
import fs from 'fs';
import path from 'path';

function countWords(str: string): number {
    // Remove import statements
    str = str.replace(/import\s+.*?from\s+['"].*?['"];?/g, '');
    // Remove export statements
    str = str.replace(/export\s+.*?\{.*?\};?/g, '');
    // Remove HTML/JSX tags
    str = str.replace(/<[^>]*>/g, ' ');
    // Remove braces and common code characters
    str = str.replace(/[{}]/g, ' ');
    // Normalize whitespace
    str = str.trim().split(/\s+/).length;
    return str;
}

function analyzeStaticPages(dir: string, type: 'Blog' | 'Guide') {
    if (!fs.existsSync(dir)) {
        console.log(`Directory not found: ${dir}`);
        return [];
    }

    const report = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        if (entry.isDirectory() && entry.name !== '[slug]') {
            const pagePath = path.join(dir, entry.name, 'page.tsx');
            if (fs.existsSync(pagePath)) {
                const content = fs.readFileSync(pagePath, 'utf-8');
                const words = countWords(content);
                report.push({
                    type,
                    slug: entry.name,
                    wordCount: words,
                    status: words < 800 ? 'THIN' : (words > 1800 ? 'PASS' : 'MODERATE') // User claims 1800+
                });
            }
        }
    }
    return report;
}

const blogReport = analyzeStaticPages('app/blog', 'Blog');
const guideReport = analyzeStaticPages('app/guides', 'Guide');

const allReports = [...blogReport, ...guideReport].sort((a, b) => a.wordCount - b.wordCount);

console.log(`\nAnalyzing ${allReports.length} Static Pages (app/blog/* & app/guides/*)...\n`);

const thinPages = allReports.filter(p => p.wordCount < 800);
const moderatePages = allReports.filter(p => p.wordCount >= 800 && p.wordCount < 1800);
const passPages = allReports.filter(p => p.wordCount >= 1800);

console.log(`Found ${thinPages.length} THIN pages (< 800 words)`);
if (thinPages.length > 0) {
    console.log("Top 10 Thinnest:");
    thinPages.slice(0, 10).forEach(p => console.log(`[${p.wordCount} words] /${p.type.toLowerCase()}/${p.slug}`));
}

console.log(`\nFound ${moderatePages.length} MODERATE pages (800-1800 words)`);
// moderatePages.forEach(p => console.log(`[${p.wordCount}] ${p.slug}`));

console.log(`\nFound ${passPages.length} PASS pages (> 1800 words)`);

console.log(`\nTotal Checked: ${allReports.length}`);
