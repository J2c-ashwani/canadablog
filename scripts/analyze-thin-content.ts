
import fs from 'fs';
import path from 'path';

const appDir = path.join(process.cwd(), 'app');

function getWordCount(content: string): number {
    // Remove imports
    let cleaner = content.replace(/^import .*$/gm, ' ');
    // Remove metadata
    cleaner = cleaner.replace(/export const metadata[\s\S]*?};/, ' ');
    // Remove tags
    cleaner = cleaner.replace(/<[^>]*>/g, ' ');
    // Remove special chars
    cleaner = cleaner.replace(/[{}();"\'=]/g, ' ');

    return cleaner.trim().split(/\s+/).filter(w => w.length > 2).length;
}

function hasPlaceholderText(content: string): string | null {
    const placeholders = [
        "Lorem Ipsum",
        "Coming Soon",
        "Under Construction",
        "TODO:",
        "Placeholder"
    ];
    for (const p of placeholders) {
        if (content.toLowerCase().includes(p.toLowerCase())) {
            return p;
        }
    }
    return null;
}

function scanDirectory(dir: string, results: any[]) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            scanDirectory(fullPath, results);
        } else if (entry.name === 'page.tsx' || entry.name === 'page.js') {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const words = getWordCount(content);
            const placeholder = hasPlaceholderText(content);
            const relativePath = path.relative(process.cwd(), fullPath);

            results.push({
                path: relativePath,
                words,
                placeholder
            });
        }
    }
}

console.log("Deep searching for thin/placeholder content in app/...\n");
const results: any[] = [];
scanDirectory(appDir, results);

// Sort by word count
results.sort((a, b) => a.words - b.words);

// Filter for suspicious pages
const suspicious = results.filter(r => r.words < 200 || r.placeholder);

if (suspicious.length > 0) {
    console.log("⚠️ Potential Issues Found:\n");
    suspicious.forEach(r => {
        let warning = "";
        if (r.placeholder) warning += `[CONTAINS "${r.placeholder}"] `;
        if (r.words < 200) warning += `[THIN: ${r.words} words] `;
        console.log(`${warning} ${r.path}`);
    });
} else {
    console.log("✅ No obvious placeholder or empty pages found (min 200 words).");
}

console.log("\n--- Bottom 10 Word Counts ---");
results.slice(0, 10).forEach(r => {
    console.log(`${r.words} words | ${r.path}`);
});
