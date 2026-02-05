
import fs from 'fs';
import path from 'path';

function countWords(str: string): number {
    str = str.replace(/import\s+.*?from\s+['"].*?['"];?/g, '');
    str = str.replace(/export\s+.*?\{.*?\};?/g, '');
    str = str.replace(/<[^>]*>/g, ' ');
    str = str.replace(/[{}]/g, ' ');
    return str.trim().split(/\s+/).length;
}

const targetPages = [
    'app/blog/canada-federal-grants/page.tsx',
    'app/blog/usa-federal-grants/page.tsx',
    'app/blog/state-province-grants/page.tsx'
];

console.log("--- Critical Page Verification ---");
targetPages.forEach(p => {
    if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, 'utf-8');
        const count = countWords(content);
        console.log(`[${count} words] ✅ ${p}`);
    } else {
        console.log(`[MISSING] ❌ ${p}`);
    }
});
