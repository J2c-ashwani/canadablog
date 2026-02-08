const fs = require('fs');
const path = require('path');

function auditFile(filePath, type) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let currentSlug = null;
    let hasMetrics = false;
    let missing = [];
    let processingObj = false;

    lines.forEach(line => {
        if (line.includes('slug:')) {
            // New object start roughly
            if (currentSlug && !hasMetrics) {
                missing.push(currentSlug);
            }
            const match = line.match(/slug:\s*["']([^"']+)["']/);
            if (match) {
                currentSlug = match[1];
                hasMetrics = false;
                processingObj = true;
            }
        }
        if (line.includes('metrics: [')) {
            hasMetrics = true;
        }
    });
    // Check last one
    if (currentSlug && !hasMetrics) {
        missing.push(currentSlug);
    }

    console.log(`\n--- ${type} Audit ---`);
    console.log(`Missing Count: ${missing.length}`);
    missing.forEach(m => console.log(m));
}

const blogPath = path.join(__dirname, '../lib/data/blogPosts.ts');
const guidesPath = path.join(__dirname, '../lib/data/guides.ts');

auditFile(blogPath, "Blog Posts");
auditFile(guidesPath, "Guides");
