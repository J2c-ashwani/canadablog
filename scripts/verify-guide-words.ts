
import fs from 'fs';
import path from 'path';

// Files to verify
const FILES = [
    '/Users/ashwanikumar/.gemini/antigravity/scratch/canadablog/app/guides/sred-application-guide/page.tsx',
    '/Users/ashwanikumar/.gemini/antigravity/scratch/canadablog/app/guides/irap-innovation-application-guide/page.tsx',
    '/Users/ashwanikumar/.gemini/antigravity/scratch/canadablog/app/guides/women-entrepreneurship-fund-guide/page.tsx',
    '/Users/ashwanikumar/.gemini/antigravity/scratch/canadablog/app/guides/sbir-research-grants-guide/page.tsx',
    '/Users/ashwanikumar/.gemini/antigravity/scratch/canadablog/app/guides/apply-quebec-business-grants/page.tsx'
];

function stripTags(content: string): string {
    // Remove imports
    content = content.replace(/^import.*$/gm, '');
    // Remove exports
    content = content.replace(/^export.*$/gm, '');
    // Rough HTML/JSX tag removal
    return content.replace(/<[^>]*>/g, ' ');
}

function countWords(str: string): number {
    return str.replace(/\s+/g, ' ').trim().split(' ').length;
}

console.log('Retrofit Guide Word Count Verification:');
console.log('---------------------------------------');

FILES.forEach(filePath => {
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const text = stripTags(content);
        const count = countWords(text);
        const status = count > 800 ? '✅ PASS' : '⚠️ LOW';
        const fileName = path.basename(path.dirname(filePath)); // Get parent folder name as slug essentially
        console.log(`${fileName.padEnd(40)}: ${count} words  ${status}`);
    } else {
        const fileName = path.basename(path.dirname(filePath));
        console.log(`${fileName.padEnd(40)}: [FILE NOT FOUND] ( Likely Tier B / Template Based )`);
    }
});
console.log('---------------------------------------');
