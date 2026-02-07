
const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(process.cwd(), 'app', 'blog');
const OUTPUT_FILE = path.join(process.cwd(), 'blog_enrichment_queue.md');
const BLOGPOSTS_FILE = path.join(process.cwd(), 'lib', 'data', 'blogPosts.ts');

function generateQueue() {
    // Read the actual blogPosts.ts file content
    const blogPostsContent = fs.readFileSync(BLOGPOSTS_FILE, 'utf-8');

    // Find all slugs in the blogPosts array
    const slugMatches = blogPostsContent.match(/slug: ["']([^"']+)["']/g);
    const allSlugs = slugMatches ? slugMatches.map(m => m.match(/["']([^"']+)["']/)[1]) : [];

    // Find all posts that already have 'metrics:' defined (enriched)
    // We'll find posts between { and their closing } that contain 'metrics:'
    const enrichedSlugs = new Set();

    // Split by object boundaries and check each
    const postBlocks = blogPostsContent.split(/\n  \{/);
    for (const block of postBlocks) {
        const slugMatch = block.match(/slug: ["']([^"']+)["']/);
        const hasMetrics = block.includes('metrics:') && block.includes('expertTip:');
        if (slugMatch && hasMetrics) {
            enrichedSlugs.add(slugMatch[1]);
        }
    }

    // Filter for unenriched (hidden) posts
    const hiddenSlugs = allSlugs.filter(slug => !enrichedSlugs.has(slug));

    let content = `# Blog Enrichment Queue (Tier C -> Tier B)\n\n`;
    content += `**Total Hidden Posts:** ${hiddenSlugs.length}\n`;
    content += `**Total Enriched Posts:** ${enrichedSlugs.size}\n`;
    content += `**Goal:** Enrich these posts with 'metrics' and 'expertTip' to unhide them.\n\n`;
    content += `---\n\n`;
    content += `## Queue\n\n`;

    hiddenSlugs.forEach(slug => {
        content += `- [ ] ${slug}\n`;
    });

    content += `\n---\n**Progress: 0/${hiddenSlugs.length} (0%)**\n`;

    fs.writeFileSync(OUTPUT_FILE, content);
    console.log(`✅ Generated queue with ${hiddenSlugs.length} hidden posts at ${OUTPUT_FILE}`);
    console.log(`   (${enrichedSlugs.size} posts are already enriched)`);
}

generateQueue();
