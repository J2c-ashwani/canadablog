const fs = require('fs');
const path = require('path');

function deduplicateAnswers(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let removedCount = 0;

    // We'll build a new array of lines
    const newLines = [];
    let currentSlug = null;
    let foundAnswerForSlug = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Track which object we're in
        const slugMatch = line.match(/slug:\s*["']([^"']+)["']/);
        if (slugMatch) {
            currentSlug = slugMatch[1];
            foundAnswerForSlug = false;
            newLines.push(line);
            continue;
        }

        // If we hit a shortAnswer line
        if (line.includes('shortAnswer:')) {
            if (foundAnswerForSlug) {
                // This is a duplicate! Skip it.
                removedCount++;
                console.log(`🗑️ Removed duplicate from ${currentSlug}`);
                continue;
            } else {
                // First answer for this object, keep it
                foundAnswerForSlug = true;
                newLines.push(line);
                continue;
            }
        }

        // Reset when we hit the end of an object
        if (line.match(/^\s*},?/)) {
            currentSlug = null;
            foundAnswerForSlug = false;
        }

        newLines.push(line);
    }

    fs.writeFileSync(filePath, newLines.join('\n'));
    return removedCount;
}

console.log('=== Deduplicating guides.ts ===');
const removedGuides = deduplicateAnswers(path.join(__dirname, '..', 'lib/data/guides.ts'));
console.log(`Removed ${removedGuides} duplicates.\n`);

console.log('=== Deduplicating blogPosts.ts ===');
const removedBlogs = deduplicateAnswers(path.join(__dirname, '..', 'lib/data/blogPosts.ts'));
console.log(`Removed ${removedBlogs} duplicates.\n`);
