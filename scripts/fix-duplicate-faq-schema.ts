import fs from 'fs';
import path from 'path';

// Robust fix: Remove ALL second/duplicate FAQPage <script> blocks from static blog pages.
// Strategy: Find lines with `type="application/ld+json"`, then check nearby for FAQPage.
// If there are 2+ such blocks, remove all but the first.

function run() {
    const blogDir = path.resolve('app/blog');
    const dirs = fs.readdirSync(blogDir).filter(d => {
        const p = path.join(blogDir, d, 'page.tsx');
        return fs.existsSync(p) && d !== '[slug]';
    });

    let fixed = 0;

    for (const dir of dirs) {
        const filePath = path.join(blogDir, dir, 'page.tsx');
        let content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        // Find all lines that have "FAQPage"
        const faqPageLines: number[] = [];
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('"FAQPage"') || lines[i].includes("'FAQPage'")) {
                faqPageLines.push(i);
            }
        }

        if (faqPageLines.length < 2) continue; // No duplicate

        // The SECOND occurrence is the duplicate. Find the full <script> block around it.
        const secondFaqLine = faqPageLines[faqPageLines.length - 1]; // Last occurrence

        // Walk backwards from secondFaqLine to find the start of the <script> block
        let blockStart = secondFaqLine;
        for (let i = secondFaqLine; i >= Math.max(0, secondFaqLine - 10); i--) {
            if (lines[i].includes('<script') || lines[i].includes('{/* FAQ')) {
                blockStart = i;
                break;
            }
        }

        // Walk forward to find the end: `/>` that closes the script tag
        let blockEnd = secondFaqLine;
        for (let i = secondFaqLine; i < Math.min(lines.length, secondFaqLine + 80); i++) {
            // Look for the closing `/>` of the script self-closing tag
            const trimmed = lines[i].trim();
            if (trimmed === '/>' || trimmed === '/>') {
                blockEnd = i;
                break;
            }
            // Also handle `}} />` on one line
            if (trimmed.endsWith('/>') && (lines[i].includes('}}') || lines[i].includes('dangerouslySetInnerHTML'))) {
                blockEnd = i;
                break;
            }
        }

        // Remove lines from blockStart to blockEnd (inclusive)
        const newLines = [...lines.slice(0, blockStart), ...lines.slice(blockEnd + 1)];
        const newContent = newLines.join('\n');

        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent);
            fixed++;
            console.log(`✅ Fixed: ${dir} (removed lines ${blockStart + 1}-${blockEnd + 1})`);
        }
    }

    console.log(`\nDone! Fixed ${fixed} pages with duplicate FAQPage schema.`);
}

run();
