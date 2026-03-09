const fs = require('fs');

function extractSlugs(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const items = content.split('slug:');
    
    // skip the first chunk (imports/types)
    const genericSlugs = [];
    
    for (let i = 1; i < items.length; i++) {
        const item = items[i];
        
        // Match slug name (single or double quotes)
        const slugMatch = item.match(/^\s*['"]([^'"]+)['"]/);
        if (!slugMatch) continue;
        const slug = slugMatch[1];
        
        // Check for generic author in this chunk
        if (
            item.includes('author: "FSI Digital Team"') || 
            item.includes("author: 'FSI Digital Team'") ||
            item.includes('author: "Veteran Support Team"') ||
            item.includes('author: "Veterans Support Team"') ||
            item.includes('author: "Innovation Funding Team"')
        ) {
            genericSlugs.push(slug);
        }
    }
    return genericSlugs;
}

console.log("=== BLOG POSTS ===");
const blogSlugs = extractSlugs('lib/data/blogPosts.ts');
blogSlugs.forEach(s => console.log(s));

console.log("\n=== GUIDES ===");
const guideSlugs = extractSlugs('lib/data/guides.ts');
guideSlugs.forEach(s => console.log(s));

