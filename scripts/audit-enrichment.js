const fs = require('fs');
const path = require('path');

function auditFile(filePath, type) {
    const content = fs.readFileSync(filePath, 'utf8');
    // detailed splitting might be tricky, but let's try splitting by "id:" 
    // assuming uniform formatting.
    // The file starts with export ..., then [ { id: ...

    const chunks = content.split(/\n\s+id: /);
    // remove first chunk (header)
    chunks.shift();

    let total = 0;
    let enriched = 0;
    const missing = [];

    chunks.forEach(chunk => {
        // extract slug
        const slugMatch = chunk.match(/slug: ["']([^"']+)["']/);
        if (!slugMatch) return;

        const slug = slugMatch[1];
        total++;

        // check for metrics
        if (chunk.includes('metrics: [')) {
            enriched++;
        } else {
            missing.push(slug);
        }
    });

    console.log(`\n--- ${type} Audit ---`);
    console.log(`Total: ${total}`);
    console.log(`Enriched: ${enriched}`);
    console.log(`Missing (${total - enriched}):`);
    missing.forEach(m => console.log(`- ${m}`));
}

const blogPath = path.join(__dirname, '../lib/data/blogPosts.ts');
const guidesPath = path.join(__dirname, '../lib/data/guides.ts');

auditFile(blogPath, "Blog Posts");
auditFile(guidesPath, "Guides");
