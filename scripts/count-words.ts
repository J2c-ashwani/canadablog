/**
 * Accurate Word Count Analysis Script
 * Extracts actual text content from TSX files and counts words
 */

import * as fs from 'fs';
import * as path from 'path';

interface PageWordCount {
    slug: string;
    wordCount: number;
    status: string;
}

function extractTextFromTSX(content: string): string {
    // Remove import statements
    content = content.replace(/^import .+$/gm, '');

    // Remove export statements and function declarations
    content = content.replace(/export (const|default|function) .+$/gm, '');

    // Remove JSX tags but keep their text content
    // Match opening/closing tags and self-closing tags
    content = content.replace(/<[^>]+>/g, ' ');

    // Remove className, href, and other attributes that leaked
    content = content.replace(/className="[^"]*"/g, '');
    content = content.replace(/href="[^"]*"/g, '');

    // Remove JSX expressions like {variable}
    content = content.replace(/\{[^}]+\}/g, ' ');

    // Remove common code patterns
    content = content.replace(/const \w+ = /g, '');
    content = content.replace(/return \(/g, '');
    content = content.replace(/\);?$/gm, '');

    // Remove special characters and extra whitespace
    content = content.replace(/[{}()<>[\]]/g, ' ');
    content = content.replace(/["'`]/g, ' ');
    content = content.replace(/\s+/g, ' ');

    return content.trim();
}

function countWords(text: string): number {
    const words = text.split(/\s+/).filter(word => {
        // Filter out non-word content
        return word.length > 1 &&
            !/^[0-9]+$/.test(word) &&
            !/^(className|href|asChild|variant|size|mb|px|py|pt|pb|lg|md|sm|xl|w|h|mr|ml|mt|grid|flex|gap|text|bg|border|rounded|font|hover|transition|items|justify|space|max|min)/.test(word);
    });
    return words.length;
}

function analyzePages(): PageWordCount[] {
    const blogDir = path.join(process.cwd(), 'app', 'blog');
    const results: PageWordCount[] = [];

    const entries = fs.readdirSync(blogDir, { withFileTypes: true });

    for (const entry of entries) {
        if (entry.isDirectory() && entry.name !== '[slug]') {
            const pagePath = path.join(blogDir, entry.name, 'page.tsx');

            if (fs.existsSync(pagePath)) {
                const content = fs.readFileSync(pagePath, 'utf-8');
                const text = extractTextFromTSX(content);
                const wordCount = countWords(text);

                let status = '❌ THIN';
                if (wordCount >= 2500) status = '✅ OK';
                else if (wordCount >= 1500) status = '⚠️ LOW';

                results.push({
                    slug: entry.name,
                    wordCount,
                    status
                });
            }
        }
    }

    // Sort by word count ascending
    return results.sort((a, b) => a.wordCount - b.wordCount);
}

// Run analysis
const results = analyzePages();

console.log('\n📊 Word Count Analysis Report\n');
console.log('='.repeat(80));

let thin = 0, low = 0, ok = 0;

for (const page of results) {
    if (page.status.includes('THIN')) thin++;
    else if (page.status.includes('LOW')) low++;
    else ok++;

    console.log(`${page.status.padEnd(10)} ${String(page.wordCount).padStart(5)} words | ${page.slug}`);
}

console.log('\n' + '='.repeat(80));
console.log(`Summary: ${thin} THIN (<2500) | ${low} LOW (1500-2499) | ${ok} OK (2500+)`);
console.log(`Total pages analyzed: ${results.length}`);
