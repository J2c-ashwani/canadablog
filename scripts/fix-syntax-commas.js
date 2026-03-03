const fs = require('fs');
const path = require('path');

function fixCommas(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let fixedCount = 0;

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].includes('shortAnswer:')) {
            const prevLine = lines[i - 1];

            // If the previous line has actual content but doesn't end with a comma, brace, or bracket
            if (prevLine.trim().length > 0 &&
                !prevLine.trim().endsWith(',') &&
                !prevLine.trim().endsWith('{') &&
                !prevLine.trim().endsWith('[')) {

                // Add a comma to the end of the previous line
                lines[i - 1] = prevLine + ',';
                fixedCount++;
                console.log(`🔧 Fixed comma before line ${i + 1}`);
            }
        }
    }

    fs.writeFileSync(filePath, lines.join('\n'));
    return fixedCount;
}

console.log('=== Fixing missing commas in guides.ts ===');
const fixedGuides = fixCommas(path.join(__dirname, '..', 'lib/data/guides.ts'));
console.log(`Fixed ${fixedGuides} missing commas in guides.\n`);

console.log('=== Fixing missing commas in blogPosts.ts ===');
const fixedBlogs = fixCommas(path.join(__dirname, '..', 'lib/data/blogPosts.ts'));
console.log(`Fixed ${fixedBlogs} missing commas in blog posts.\n`);
