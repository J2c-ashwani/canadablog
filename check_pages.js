const fs = require('fs');
const queueFile = fs.readFileSync('blog_enrichment_queue.md', 'utf8');
const lines = queueFile.split('\n');
const slugs = lines.map(l => {
    const match = l.match(/-\s+\[\s*\]\s+([A-Za-z0-9-]+)/);
    if (match) return match[1];
    return null;
}).filter(Boolean);

console.log('Total slugs found:', slugs.length);
slugs.forEach(slug => {
    const tsxPath = 'app/blog/' + slug + '/page.tsx';
    const usaTsxPath = 'app/usa/' + slug + '/page.tsx';
    if (fs.existsSync(tsxPath)) {
        console.log(slug, 'EXISTS in app/blog');
    } else if (fs.existsSync(usaTsxPath)) {
        console.log(slug, 'EXISTS in app/usa');
    } else {
        console.log(slug, 'MISSING');
    }
});
