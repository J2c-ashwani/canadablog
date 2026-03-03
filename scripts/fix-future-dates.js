const fs = require('fs');
const path = require('path');

function fixFutureDates(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let fixedCount = 0;

    for (let i = 0; i < lines.length; i++) {
        const dateMatch = lines[i].match(/date:\s*["'](2026-(0[4-9]|1[0-2])-\d{2})["']/);
        if (dateMatch) {
            const originalDate = dateMatch[1];
            
            // Randomize the day between 01 and 05 in March 2026 so they don't all look identical
            const randomDay = Math.floor(Math.random() * 5) + 1;
            const newDate = `2026-03-0${randomDay}`;
            
            lines[i] = lines[i].replace(originalDate, newDate);
            fixedCount++;
            console.log(`✅ Replaced ${originalDate} with ${newDate} on line ${i + 1}`);
        }
    }

    if (fixedCount > 0) {
        fs.writeFileSync(filePath, lines.join('\n'));
    }
    return fixedCount;
}

console.log('=== Fixing future dates in blogPosts.ts ===');
const blogCount = fixFutureDates(path.join(__dirname, '..', 'lib/data/blogPosts.ts'));
console.log(`Blog posts fixed: ${blogCount}\n`);

console.log('=== Fixing future dates in guides.ts ===');
const guideCount = fixFutureDates(path.join(__dirname, '..', 'lib/data/guides.ts'));
console.log(`Guides fixed: ${guideCount}\n`);

console.log(`🎉 Total future dates fixed: ${blogCount + guideCount}`);
