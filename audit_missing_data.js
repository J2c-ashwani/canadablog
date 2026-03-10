const fs = require('fs');
const path = require('path');

const queuePath = path.join(__dirname, 'blog_enrichment_queue.md');
const queueContent = fs.readFileSync(queuePath, 'utf8');

const slugs = queueContent
    .split('\n')
    .filter(line => line.trim().startsWith('- [ ] '))
    .map(line => line.replace('- [ ] ', '').trim());

console.log("Found " + slugs.length + " slugs to check.");

const blogPostsPath = path.join(__dirname, 'lib/data/blogPosts.ts');
const bpContent = fs.readFileSync(blogPostsPath, 'utf8');

const results = [];

for (const slug of slugs) {
    const slugIdx = bpContent.indexOf('slug: "' + slug + '"');
    if (slugIdx === -1) {
        results.push({ slug, missing: true, hasMetrics: false, hasExpertTip: false });
        continue;
    }

    let nextSlugIdx = bpContent.indexOf('slug: "', slugIdx + 1);
    if (nextSlugIdx === -1) nextSlugIdx = bpContent.length;

    const postBlock = bpContent.substring(slugIdx, nextSlugIdx);

    const hasMetrics = postBlock.includes('metrics:');
    const hasExpertTip = postBlock.includes('expertTip:');

    // if (!hasMetrics || !hasExpertTip) {
    results.push({ slug, hasMetrics, hasExpertTip });
    // }
}

console.log("Here are the results:");
console.table(results);
