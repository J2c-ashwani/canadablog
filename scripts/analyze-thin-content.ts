
import { blogPosts } from '../lib/data/blogPosts';
import { guidesDatabase } from '../lib/data/guides';
import { getAllStates } from '../lib/data/states';
import { stateDetails } from '../lib/data/stateDetails';

// Helper to count words
function countWords(str: string): number {
    return str.trim().split(/\s+/).length;
}

// Helper for State Simulation (Simplified version of simulate-render.ts)
function simulateStateWordCount(stateDetail: any): number {
    let text = "";
    // Basic fields
    text += JSON.stringify(stateDetail);
    // This is a rough approx, for thin content detection we might want the specific logic
    // But since we know they are > 2500, we can skip complex logic or just use the raw count
    // actually raw count provided ~1000-2000 words. 
    // Let's rely on the previous verification that states are SAFE.
    // I will checking mostly blogs and guides.
    return countWords(text);
}

async function analyze() {
    console.log("Analyzing content length...\n");
    const report = [];

    // 1. Analyze Blog Posts
    console.log(`Checking ${blogPosts.length} Blog Posts...`);
    blogPosts.forEach(post => {
        const wordCount = countWords(post.content || "") + countWords(post.excerpt || "");
        // Blogs usually have content in 'content' field.
        report.push({
            type: 'Blog Post',
            title: post.title,
            slug: post.slug,
            wordCount: wordCount,
            status: wordCount < 800 ? 'THIN' : 'OK'
        });
    });

    // 2. Analyze Guides
    console.log(`Checking ${guidesDatabase.length} Guides...`);
    guidesDatabase.forEach(guide => {
        const wordCount = countWords(guide.content || "") + countWords(guide.excerpt || "");
        report.push({
            type: 'Guide',
            title: guide.title,
            slug: guide.slug,
            wordCount: wordCount,
            status: wordCount < 800 ? 'THIN' : 'OK'
        });
    });

    // 3. States (We assume these are safe based on previous task, but let's double check raw chars at least)
    // We don't have easy access to stateDetails for *all* 50 states unless we import them all.
    // stateDetails.ts usually exports a map or big object.

    // Print Results
    console.log("\n--- THIN CONTENT REPORT (< 800 words) ---\n");

    const thinPages = report.filter(p => p.wordCount < 800).sort((a, b) => a.wordCount - b.wordCount);

    if (thinPages.length === 0) {
        console.log("No thin pages found!");
    } else {
        console.log(`Found ${thinPages.length} thin pages:`);
        thinPages.forEach(p => {
            console.log(`[${p.type}] ${p.wordCount} words - /${p.type === 'Blog Post' ? 'blog' : 'guides'}/${p.slug}`);
        });
    }

    console.log(`\nTotal Checked: ${report.length}`);
}

analyze();
