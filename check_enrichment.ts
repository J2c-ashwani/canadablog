
import { blogPosts } from './lib/data/blogPosts';

const targetSlugs = [
  'clean-technology-2025',
  'apply-usa-grants-2025',
  'canexport-grants-2025',
  'rural-business-development-2025',
  'veterans-business-grants-2025',
  'new-york-business-grants-2025',
  'manufacturing-grants-2025',
  'digital-transformation-2025',
  'agricultural-innovation-2025',
  'minority-business-grants-2025',
  'usda-rural-grants-2025',
  'quebec-government-business-grants',
  'quebec-business-grants-2025',
  'women-business-grants-2025',
  'technology-startup-grants-2025',
  'cybersecurity-grants'
];

targetSlugs.forEach(slug => {
  const post = blogPosts.find(p => p.slug === slug);
  if (post) {
    const hasMetrics = !!post.metrics && post.metrics.length > 0;
    const hasExpertTip = !!post.expertTip;
    const isIndexed = hasMetrics || hasExpertTip;
    
    console.log(`Slug: ${slug}`);
    console.log(`  - ID: ${post.id}`);
    console.log(`  - Metrics: ${hasMetrics ? '✅' : '❌'}`);
    console.log(`  - ExpertTip: ${hasExpertTip ? '✅' : '❌'}`);
    console.log(`  - Indexable: ${isIndexed ? '✅' : '❌'}`);
  } else {
    console.log(`Slug: ${slug} NOT FOUND`);
  }
});
