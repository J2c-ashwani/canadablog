
import { blogPosts } from './lib/data/blogPosts';
import { stateDetails } from './lib/data/stateDetails';
import { guidesDatabase } from './lib/data/guides';

const targetUrls = [
    { type: 'state', slug: 'pennsylvania', url: 'usa/pennsylvania' },
    { type: 'blog', slug: '2026-grant-preview-early-bird', url: 'blog/2026-grant-preview-early-bird' },
    { type: 'guide', slug: 'women-entrepreneurship-fund-guide', url: 'guides/women-entrepreneurship-fund-guide' },
    { type: 'blog', slug: 'colorado-tech-programs', url: 'blog/colorado-tech-programs' }
];

function countWords(str: any): number {
    if (!str) return 0;
    if (typeof str !== 'string') return 0;
    return str.trim().split(/\s+/).length;
}

console.log('--- Content Quality Analysis ---');

targetUrls.forEach(target => {
    console.log(`\nAnalyzing: ${target.url}`);

    if (target.type === 'state') {
        const state = stateDetails.find(s => s.id === target.slug || s.slug === target.slug) as any;
        if (!state) {
            console.log('  Status: NOT FOUND in stateDetails.ts');
            return;
        }

        // Helper to extract text from complex overview objects
        const getOverviewText = (obj: any) => {
            if (!obj) return '';
            let text = '';
            if (typeof obj === 'string') return obj;
            if (typeof obj === 'object') {
                Object.values(obj).forEach(val => {
                    if (typeof val === 'string') text += val + ' ';
                    else if (Array.isArray(val)) text += JSON.stringify(val) + ' ';
                });
            }
            return text;
        };

        const overviewText = getOverviewText(state.overview);
        const totalWords = countWords(overviewText);

        console.log(`  Type: State Page`);
        console.log(`  Word Count (Overview): ${totalWords}`);
        console.log(`  Enrichment: `);
        console.log(`    - HeroStats: ${state.heroStats ? 'Present' : 'Missing'}`);
        console.log(`    - MetaDescription: ${state.overview?.metaDescription ? 'Present' : 'Missing'}`);

        const isRetrofitted = JSON.stringify(state).includes('2025') || JSON.stringify(state).includes('2026');
        console.log(`  Retrofit Status (2025/2026 mentions): ${isRetrofitted ? 'Yes' : 'No'}`);

    } else if (target.type === 'blog') {
        const post = blogPosts.find(p => p.slug === target.slug) as any;
        if (!post) {
            console.log('  Status: NOT FOUND in blogPosts.ts');
            return;
        }

        const contentWords = countWords(post.content);
        console.log(`  Type: Blog Post`);
        console.log(`  Word Count: ${contentWords}`);
        console.log(`  Enrichment:`);
        console.log(`    - Metrics: ${post.metrics?.length || 0} items`);
        console.log(`    - Expert Tip: ${post.expertTip ? 'Present' : 'Missing'}`);

        const isRetrofitted = (post.title.includes('2025') || post.title.includes('2026')) ||
            (post.content.includes('2025') || post.content.includes('2026'));
        console.log(`  Retrofit Status: ${isRetrofitted ? 'Yes' : 'No'}`);

    } else if (target.type === 'guide') {
        const guide = guidesDatabase.find(g => g.slug === target.slug) as any;
        if (!guide) {
            console.log('  Status: NOT FOUND in guides.ts');
            return;
        }

        const descWords = countWords(guide.description);
        const highlightWords = guide.highlights ? guide.highlights.reduce((acc: number, h: string) => acc + countWords(h), 0) : 0;
        const tipWords = countWords(guide.expertTip?.content);

        console.log(`  Type: Guide Page`);
        console.log(`  Word Count (Desc + Highlights + Tip): ${descWords + highlightWords + tipWords}`);
        console.log(`  Enrichment:`);
        console.log(`    - Metrics: ${guide.metrics?.length || 0} items`);
        console.log(`    - Expert Tip: ${guide.expertTip ? 'Present' : 'Missing'}`);
        const isRetrofitted = JSON.stringify(guide).includes('2025') || JSON.stringify(guide).includes('2026');
        console.log(`  Retrofit Status: ${isRetrofitted ? 'Yes' : 'No'}`);
    }
});

console.log('\n--- End of Analysis ---');
