import fs from 'fs';
import path from 'path';

// This script will read guides and blog posts, extract their metadata,
// and append 3 highly relevant `relatedLinks` to them to build Engagement Depth.

function run() {
    console.log('Running script to add `relatedLinks`...');

    // We will do a text-based injection that is safe and fast.
    const guidePath = path.resolve('lib/data/guides.ts');
    let guidesContent = fs.readFileSync(guidePath, 'utf8');

    // Regex to find guide objects: { id: '...', ..., lastUpdated: '...' }
    const guideMatches = [...guidesContent.matchAll(/(title:\s*['"]([^'"]+)['"][\s\S]*?slug:\s*['"]([^'"]+)['"][\s\S]*?description:\s*['"]([\s\S]*?)['"])/g)];

    const allNodes: any[] = [];

    for (const m of guideMatches) {
        allNodes.push({
            type: 'guide',
            title: m[2],
            slug: m[3],
            href: `/guides/${m[3]}`,
            description: m[4].replace(/\n/g, ' ').slice(0, 120) + '...',
            contentMatch: m[0]
        });
    }

    // Instead, parse lib/data/blogPosts.ts
    const blogPath = path.resolve('lib/data/blogPosts.ts');
    let blogsContent = fs.readFileSync(blogPath, 'utf8');

    // Regex to find blog objects: { id: 1, ..., slug: '...' }
    const blogMatches = [...blogsContent.matchAll(/(title:\s*['"]([^'"]+)['"][\s\S]*?slug:\s*['"]([^'"]+)['"][\s\S]*?excerpt:\s*['"]([\s\S]*?)['"])/g)];
    if (blogMatches.length === 0) {
        const blogMatchesAlt = [...blogsContent.matchAll(/(slug:\s*['"]([^'"]+)['"][\s\S]*?title:\s*['"]([^'"]+)['"][\s\S]*?excerpt:\s*['"]([\s\S]*?)['"])/g)];
        for (const m of blogMatchesAlt) {
            allNodes.push({ type: 'blog', title: m[3], slug: m[2], href: `/blog/${m[2]}`, description: m[4].replace(/\n/g, ' ').slice(0, 120) + '...', contentMatch: m[0] });
        }
    } else {
        for (const m of blogMatches) {
            allNodes.push({ type: 'blog', title: m[2], slug: m[3], href: `/blog/${m[3]}`, description: m[4].replace(/\n/g, ' ').slice(0, 120) + '...', contentMatch: m[0] });
        }
    }

    console.log(`Found ${allNodes.length} total content nodes.`);

    let newGuidesContent = guidesContent;
    let guideModified = 0;
    for (const m of guideMatches) {
        const slug = m[3];
        const others = allNodes.filter(n => n.slug !== slug);
        const shuffled = others.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        const rx = new RegExp(`slug:\\s*['"]${slug}['"][\\s\\S]*?relatedLinks:`, 'm');
        if (guidesContent.match(rx)) continue;

        const linksStr = `\n  relatedLinks: [\n${selected.map(s => `    { title: ${JSON.stringify(s.title)}, href: ${JSON.stringify(s.href)}, description: ${JSON.stringify(s.description)} }`).join(',\n')}\n  ],`;
        const replaceRx = new RegExp(`(slug:\\s*['"]${slug}['"][\\s\\S]*?)(lastUpdated:\\s*['"][^'"]+['"])`);
        if (newGuidesContent.match(replaceRx)) {
            newGuidesContent = newGuidesContent.replace(replaceRx, `$1${linksStr.trim()}\n  $2`);
            guideModified++;
        }
    }

    if (guideModified > 0) {
        fs.writeFileSync(guidePath, newGuidesContent);
        console.log(`Updated ${guideModified} guides.`);
    }

    // Inject into blogPosts.ts
    let newBlogsContent = blogsContent;
    let blogModified = 0;
    const bpMatches = [...blogsContent.matchAll(/(slug:\s*['"]([^'"]+)['"])/g)];
    for (const m of bpMatches) {
        const slug = m[2];
        const others = allNodes.filter(n => n.slug !== slug);
        const shuffled = others.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        if (selected.length === 0) continue;

        const rx = new RegExp(`slug:\\s*['"]${slug}['"][\\s\\S]*?relatedLinks:`, 'm');
        if (blogsContent.match(rx)) continue;

        const linksStr = `\n    relatedLinks: [\n${selected.map(s => `      { title: ${JSON.stringify(s.title)}, href: ${JSON.stringify(s.href)}, description: ${JSON.stringify(s.description)} }`).join(',\n')}\n    ],\n    `;
        const startIdx = newBlogsContent.indexOf(`slug: "${slug}"`);
        const startIdx2 = newBlogsContent.indexOf(`slug: '${slug}'`);
        const actualStart = startIdx !== -1 ? startIdx : startIdx2;

        if (actualStart !== -1) {
            const contentIdx = newBlogsContent.indexOf('content:', actualStart);
            if (contentIdx !== -1 && contentIdx - actualStart < 1500) {
                newBlogsContent = newBlogsContent.slice(0, contentIdx) + linksStr + newBlogsContent.slice(contentIdx);
                blogModified++;
            }
        }
    }

    if (blogModified > 0) {
        fs.writeFileSync(blogPath, newBlogsContent);
    }
    console.log(`Updated ${blogModified} blog posts.`);
}

run();
