require('ts-node').register({ 
  transpileOnly: true,
  compilerOptions: {
    module: "commonjs",
    moduleResolution: "node"
  }
});

const fs = require('fs');
const path = require('path');

async function generateMetadata() {
  console.log("Analyzing 189 blog posts...");
  const postsDir = path.join(__dirname, '../lib/data/blog-posts');
  
  const metadata = [];
  const slugToPath = {};

  const contentDir = path.join(__dirname, '../lib/data/blog-content');
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (fullPath.endsWith('.ts')) {
        const relativePath = path.relative(path.join(__dirname, '../lib/data'), fullPath);
        try {
          // require the module to get the default export
          const module = require(fullPath);
          const post = module.default;
          
          if (post && post.slug) {
            metadata.push({
              id: post.id,
              slug: post.slug,
              title: post.title,
              excerpt: post.excerpt,
              category: post.category,
              categoryColor: post.categoryColor,
              author: post.author,
              date: post.date,
              readTime: post.readTime,
              image: post.image,
              featured: post.featured,
              type: post.type
            });
            
            // Decouple full content + rich fields to per-slug JSON
            // (keeps blogMetadata.json lightweight for Webpack, rich data loaded at runtime via fs.readFileSync)
            const contentFile = path.join(contentDir, `${post.slug}.json`);
            const richData = {
              content: post.content || "",
              // Answer Engine fields
              shortAnswer: post.shortAnswer || undefined,
              shortAnswerQuestion: post.shortAnswerQuestion || undefined,
              // FAQ & Schema
              faq: post.faq || undefined,
              faqSchema: post.faqSchema || undefined,
              // Metrics & Expert
              metrics: post.metrics || undefined,
              expertTip: post.expertTip || undefined,
              // SEO
              seo: post.seo || undefined,
              // Rich components
              comparisonTable: post.comparisonTable || undefined,
              jumpLinks: post.jumpLinks || undefined,
              eligibleCheck: post.eligibleCheck || undefined,
              inlineCTA: post.inlineCTA || undefined,
              relatedLinks: post.relatedLinks || undefined,
              tags: post.tags || undefined,
            };
            // Remove undefined keys to keep JSON clean
            Object.keys(richData).forEach(k => richData[k] === undefined && delete richData[k]);
            fs.writeFileSync(contentFile, JSON.stringify(richData));
            
            slugToPath[post.slug] = './' + relativePath.replace(/\\/g, '/');
          }
        } catch (err) {
          console.warn(`[WARN] Skipping broken file ${relativePath}: ${err.message}`);
        }
      }
    }
  }

  walk(postsDir);

  const outputPath = path.join(__dirname, '../lib/data/blogMetadata.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    metadata,
    slugToPath
  }, null, 2));

  console.log(`Generated lightweight metadata for ${metadata.length} posts at ${outputPath}`);
}

generateMetadata().catch(console.error);
