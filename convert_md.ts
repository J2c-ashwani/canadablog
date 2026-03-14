import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

import { post as top10 } from './lib/data/blog-posts/grants/top-10-no-equity-grants-black-female-entrepreneurs';
import { post as sevenAcc } from './lib/data/blog-posts/grants/7-startup-accelerators-california-free-money';
import { post as fiveBest } from './lib/data/blog-posts/industry-specific/5-best-government-loans-agriculture-tech-startups';
import { post as tenEasy } from './lib/data/blog-posts/grants/10-easy-to-win-local-grants-canadian-retail-stores';
import { post as sba7a } from './lib/data/blog-posts/grants/sba-7a-loans-vs-state-grants-comparison';
import { post as sredVs } from './lib/data/blog-posts/grants/sred-tax-credits-vs-cdap-canadian-founders';
import { post as usdaVs } from './lib/data/blog-posts/industry-specific/usda-reap-grant-vs-utility-rebates';

const posts = [top10, sevenAcc, fiveBest, tenEasy, sba7a, sredVs, usdaVs];

async function run() {
  for (const post of posts) {
    if (post.content && !post.content.includes('<h2')) {
      post.content = await marked.parse(post.content);
    }
    
    if (post.expertTip && post.expertTip.content && !post.expertTip.content.includes('<p>')) {
      post.expertTip.content = await marked.parse(post.expertTip.content);
    }

    if (post.faq) {
      for (const item of post.faq) {
        if (!item.answer.includes('<p>')) {
          item.answer = await marked.parse(item.answer);
        }
      }
    }

    // Determine the path based on category logic from earlier
    let slugFolder = 'grants';
    if (post.category === 'Industry-Specific') slugFolder = 'industry-specific';
    if (post.category === 'Federal Grants') slugFolder = 'federal';
    if (post.category === 'State & Local') slugFolder = 'state-local';
    if (post.category === 'Startup & Seed') slugFolder = 'startup-seed';

    const filePath = path.join(__dirname, 'lib', 'data', 'blog-posts', slugFolder, `${post.slug}.ts`);
    
    const contentStr = `import { BlogPost } from "@/lib/types";\n\nexport const post: BlogPost = ${JSON.stringify(post, null, 2)};\n\nexport default post;\n`;

    fs.writeFileSync(filePath, contentStr, 'utf8');
    console.log(`Converted Markdown to HTML for: ${post.slug}`);
  }
}

run().catch(console.error);
