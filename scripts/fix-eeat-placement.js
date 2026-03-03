const fs = require('fs');
const path = require('path');

// Fix shortAnswer entries that are incorrectly INSIDE the seo: {} block
// Move them to root level: `}, shortAnswer: "...",`

const FILES = [
    'lib/data/blogPosts.ts',
    'lib/data/guides.ts',
    'lib/data/stateDetails.ts'
];

let totalFixed = 0;

for (const file of FILES) {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const newLines = [];
    let fixed = 0;
    let i = 0;

    while (i < lines.length) {
        // Detect pattern:
        //     seo: {
        //       keywords: [...],
        //       shortAnswer: "...",     <-- THIS IS BAD
        //     },
        // And transform to:
        //     seo: {
        //       keywords: [...],
        //     }, shortAnswer: "...",     <-- THIS IS GOOD

        if (lines[i].match(/^\s+shortAnswer:/) && i >= 2) {
            // Check if we're inside an seo block
            // Look back to see if there's a `seo: {` within 5 lines
            let insideSeo = false;
            for (let j = i - 1; j >= Math.max(0, i - 5); j--) {
                if (lines[j].match(/^\s+seo:\s*\{/)) {
                    insideSeo = true;
                    break;
                }
            }

            if (insideSeo) {
                // Extract the shortAnswer value
                const saMatch = lines[i].match(/^\s+shortAnswer:\s*(.+)$/);
                if (saMatch) {
                    const saValue = saMatch[1].trim();

                    // Look ahead for the closing `},` of the seo block
                    if (i + 1 < lines.length && lines[i + 1].match(/^\s+\},/)) {
                        // Replace the closing `},` with `}, shortAnswer: ...`
                        // Skip the shortAnswer line, modify the closing line
                        const closingLine = lines[i + 1].replace(/\},/, `}, shortAnswer: ${saValue}`);
                        // Don't add the shortAnswer line (skip it)
                        newLines.push(closingLine);
                        i += 2; // Skip both shortAnswer line and closing brace line
                        fixed++;
                        continue;
                    }
                }
            }
        }

        newLines.push(lines[i]);
        i++;
    }

    if (fixed > 0) {
        fs.writeFileSync(filePath, newLines.join('\n'));
        console.log(`✅ Fixed ${fixed} misplaced shortAnswer entries in ${file}`);
        totalFixed += fixed;
    } else {
        console.log(`✔️ No issues found in ${file}`);
    }
}

// Also check for duplicate properties
for (const file of FILES) {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // Track properties per entry
    let entryStart = -1;
    let props = {};
    let duplicates = [];

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/^\s+slug:\s*['"]/)) {
            // New entry
            props = { slug: i };
            entryStart = i;
        }

        // Track property names at the entry root level (4-space indent)
        const propMatch = lines[i].match(/^\s{4}(\w+):/);
        if (propMatch && entryStart !== -1) {
            const prop = propMatch[1];
            if (props[prop] !== undefined) {
                duplicates.push({ line: i, prop, firstAt: props[prop], file });
            } else {
                props[prop] = i;
            }
        }
    }

    if (duplicates.length > 0) {
        console.log(`\n⚠️ Found ${duplicates.length} duplicate properties in ${file}:`);
        for (const d of duplicates) {
            console.log(`  Line ${d.line}: "${d.prop}" already defined at line ${d.firstAt}`);
        }
    }
}

console.log(`\n🎉 Total fixed: ${totalFixed} misplaced shortAnswer entries`);
