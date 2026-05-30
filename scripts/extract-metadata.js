const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '../app/blog');
const GUIDES_DIR = path.join(__dirname, '../app/guides');

const results = [];

function parseDirectory(dirPath, type) {
    if (!fs.existsSync(dirPath)) return;
    
    const entries = fs.readdirSync(dirPath);
    for (const entry of entries) {
        if (entry === '[slug]') continue;
        
        const pagePath = path.join(dirPath, entry, 'page.tsx');
        if (!fs.existsSync(pagePath)) continue;
        
        const content = fs.readFileSync(pagePath, 'utf8');
        
        // Use regex strictly targeted at the metadata object to avoid matching internal component text
        const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
        const descMatch = content.match(/description:\s*["']([^"']+)["']/);
        
        if (titleMatch) {
            results.push({
                type: type,
                slug: entry,
                path: pagePath.split('canadablog/')[1],
                currentTitle: titleMatch[1],
                currentDescription: descMatch ? descMatch[1] : ''
            });
        }
    }
}

parseDirectory(GUIDES_DIR, 'guide');
parseDirectory(BLOG_DIR, 'blog');

const outputPath = path.join(__dirname, 'current-metadata.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');

console.log(`✅ Extracted metadata for ${results.length} hardcoded template pages.`);
console.log(`Saved safely to scripts/current-metadata.json`);
