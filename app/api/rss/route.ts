import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const revalidate = 3600; // Cache the RSS feed for 1 hour

export async function GET() {
  try {
    const metadataPath = path.join(process.cwd(), 'lib/data/blogMetadata.json');
    const fileData = fs.readFileSync(metadataPath, 'utf8');
    const db = JSON.parse(fileData);
    
    // Filter active posts and sort by actual publication date if available, 
    // or fallback to whatever is naturally first in the metadata arrays.
    // Assuming metadata is roughly sorted, we'll just slice the top 30
    const posts = db.metadata
      .filter((p: any) => !p.slug.includes('-archive'))
      .slice(0, 30);

    const siteUrl = 'https://www.fsidigital.ca';

    // RSS Feed XML template
    let rssItems = '';

    for (const post of posts) {
      const url = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.date || Date.now()).toUTCString();
      
      // Clean special characters for XML safely using simple replacements
      const safeTitle = (post.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const safeDesc = (post.metaDescription || post.shortAnswer || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      rssItems += `
    <item>
      <title>${safeTitle}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${safeDesc}</description>
      ${post.category ? `<category>${post.category}</category>` : ''}
    </item>`;
    }

    const xmlData = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FSI Digital - Grant & Funding Alerts</title>
    <link>${siteUrl}</link>
    <description>Daily updates on business grants, government funding, and non-dilutive capital in USA &amp; Canada.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

    return new NextResponse(xmlData, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });

  } catch (err) {
    console.error('Error generating RSS feed:', err);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
