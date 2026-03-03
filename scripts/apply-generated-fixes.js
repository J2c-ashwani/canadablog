const fs = require('fs');
const path = require('path');

const fixes = JSON.parse(fs.readFileSync(path.join(__dirname, 'generated-fixes.json'), 'utf-8'));

function applyFixes(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let updatedCount = 0;

    for (let i = 0; i < lines.length; i++) {
        const sm = lines[i].match(/slug:\s*["']([^"']+)["']/);
        if (sm && fixes[sm[1]]) {
            for (let j = i; j < i + 60 && j < lines.length; j++) {
                if (lines[j].includes('shortAnswer:')) {
                    const prefixMatch = lines[j].match(/^(\s*(?:\},?\s*)?shortAnswer:\s*)/);
                    if (prefixMatch) {
                        const escapedAnswer = fixes[sm[1]].replace(/\\/g, '\\\\').replace(/"/g, '\\"');
                        lines[j] = `${prefixMatch[1]}"${escapedAnswer}",`;
                        updatedCount++;
                        console.log(`✅ Fixed: ${sm[1]}`);
                    }
                    break;
                }
            }
        }
    }

    fs.writeFileSync(filePath, lines.join('\n'));
    return updatedCount;
}

console.log('=== Applying generated fixes to blogPosts.ts ===');
const blogCount = applyFixes(path.join(__dirname, '..', 'lib/data/blogPosts.ts'));
console.log(`Blog posts fixed: ${blogCount}\n`);

console.log('=== Applying generated fixes to guides.ts ===');
const guideCount = applyFixes(path.join(__dirname, '..', 'lib/data/guides.ts'));
console.log(`Guides fixed: ${guideCount}\n`);

console.log(`🎉 Total fixed: ${blogCount + guideCount}`);
