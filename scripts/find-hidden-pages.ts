// scripts/find-hidden-pages.ts
// Audit script to find all noindexed pages for AdSense purposes

import { guidesDatabase } from '../lib/data/guides';
import { blogPosts } from '../lib/data/blogPosts';

console.log('\n=====================================================');
console.log(' ADSENSE HIDDEN PAGE FINDER (NOINDEX AUDIT)');
console.log('=====================================================\n');

// ============================================================
// GUIDES ANALYSIS
// ============================================================
console.log('=== GUIDES (app/guides/[slug]) ===');
console.log('Noindex Logic: Hidden if NO metrics AND NO expertTip\n');

const hiddenGuides = guidesDatabase.filter(g => !g.metrics && !g.expertTip);
const indexedGuides = guidesDatabase.filter(g => g.metrics || g.expertTip);

console.log(`Total Guides: ${guidesDatabase.length}`);
console.log(`✅ INDEXED (Has enrichment): ${indexedGuides.length}`);
console.log(`🔒 HIDDEN (noindex): ${hiddenGuides.length}`);

if (hiddenGuides.length > 0 && hiddenGuides.length <= 20) {
    console.log('\nHidden Guide Slugs:');
    hiddenGuides.forEach(g => console.log(`  - /guides/${g.slug}`));
}

// ============================================================
// BLOG POSTS ANALYSIS
// ============================================================
console.log('\n=== BLOG POSTS (app/blog/[slug]) ===');
console.log('Noindex Logic: Hidden if NO metrics AND NO expertTip\n');

const hiddenBlogPosts = blogPosts.filter((p: any) => !p.metrics && !p.expertTip);
const indexedBlogPosts = blogPosts.filter((p: any) => p.metrics || p.expertTip);

console.log(`Total Blog Posts: ${blogPosts.length}`);
console.log(`✅ INDEXED (Has enrichment): ${indexedBlogPosts.length}`);
console.log(`🔒 HIDDEN (noindex): ${hiddenBlogPosts.length}`);

if (hiddenBlogPosts.length > 0 && hiddenBlogPosts.length <= 30) {
    console.log('\nHidden Blog Post Slugs:');
    hiddenBlogPosts.forEach((p: any) => console.log(`  - /blog/${p.slug}`));
} else if (hiddenBlogPosts.length > 30) {
    console.log('\nFirst 30 Hidden Blog Post Slugs:');
    hiddenBlogPosts.slice(0, 30).forEach((p: any) => console.log(`  - /blog/${p.slug}`));
    console.log(`  ... and ${hiddenBlogPosts.length - 30} more`);
}

// ============================================================
// SUMMARY
// ============================================================
const totalHidden = hiddenGuides.length + hiddenBlogPosts.length;
const totalIndexed = indexedGuides.length + indexedBlogPosts.length;

console.log('\n=====================================================');
console.log(' SUMMARY');
console.log('=====================================================');
console.log(`Total Hidden Pages: ${totalHidden}`);
console.log(`  - Hidden Guides: ${hiddenGuides.length}`);
console.log(`  - Hidden Blog Posts: ${hiddenBlogPosts.length}`);
console.log(`\nTotal Indexed Pages: ${totalIndexed}`);
console.log(`  - Indexed Guides: ${indexedGuides.length}`);
console.log(`  - Indexed Blog Posts: ${indexedBlogPosts.length}`);
console.log('\n=====================================================\n');

// Write full list to file
if (hiddenGuides.length + hiddenBlogPosts.length > 0) {
    const hiddenList = [
        '# Hidden Pages Report (noindex)',
        '',
        '## Hidden Guides',
        ...hiddenGuides.map(g => `- /guides/${g.slug}`),
        '',
        '## Hidden Blog Posts',
        ...hiddenBlogPosts.map((p: any) => `- /blog/${p.slug}`),
        '',
        `## Total: ${totalHidden} pages`,
    ].join('\n');

    const fs = await import('fs');
    fs.writeFileSync('hidden-pages-report.md', hiddenList);
    console.log('📄 Full report saved to: hidden-pages-report.md\n');
}
