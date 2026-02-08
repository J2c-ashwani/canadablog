
import fs from 'fs';
import path from 'path';
import { blogPosts } from '../lib/data/blogPosts';

const OUTPUT_FILE = path.join(process.cwd(), 'blog_enrichment_queue.md');

function generateQueue() {
    // Filter for posts that are "hidden" (missing metrics or expertTip)
    // We strictly check for 'metrics' as the primary flag, consistent with page.tsx logic
    const hiddenPosts = blogPosts.filter(post => !post.metrics || post.metrics.length === 0);

    let content = `# Blog Enrichment Queue (Tier C -> Tier B)\n\n`;
    content += `Total Hidden Posts: ${hiddenPosts.length}\n`;
    content += `Goal: Enrich these posts with 'metrics' and 'expertTip' to unhide them.\n\n`;
    content += `## Queue\n\n`;

    hiddenPosts.forEach(post => {
        content += `- [ ] ${post.slug}\n`;
    });

    content += `\n---\n**Progress: 0/${hiddenPosts.length} (0%)**\n`;

    fs.writeFileSync(OUTPUT_FILE, content);
    console.log(`✅ Generated queue with ${hiddenPosts.length} posts at ${OUTPUT_FILE}`);
}

generateQueue();
