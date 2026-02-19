import { blogPosts, BlogPost } from './lib/data/blogPosts.ts';

const enrichedPosts: BlogPost[] = [];
const missingEnrichmentPosts: BlogPost[] = [];

console.log(`\n=== CHECKING ${blogPosts.length} BLOG POSTS FOR ENRICHMENT ===\n`);

blogPosts.forEach(post => {
  const hasmetrics = post.metrics && post.metrics.length > 0;
  const hasexpertTip = !!post.expertTip;

  if (hasmetrics && hasexpertTip) {
    enrichedPosts.push(post);
  } else {
    // Only flag if it's genuinely missing content
    // Some posts might be intentional stubs, but we'll list them all
    missingEnrichmentPosts.push(post);
  }
});

console.log(`✅ Fully Enriched: ${enrichedPosts.length}`);
console.log(`❌ Missing Enrichment: ${missingEnrichmentPosts.length}`);
console.log(`\n--- QUEUE OF ${missingEnrichmentPosts.length} POSTS TO ENRICH ---\n`);

missingEnrichmentPosts.forEach(post => {
  const missingFields = [];
  if (!post.metrics || post.metrics.length === 0) missingFields.push('metrics');
  if (!post.expertTip) missingFields.push('expertTip');

  console.log(`- [ ] ${post.slug} (Missing: ${missingFields.join(', ')})`);
});

if (missingEnrichmentPosts.length === 0) {
  console.log('\n🎉 ALL POSTS ARE ENRICHED! GREAT JOB! 🎉');
}
