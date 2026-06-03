import { getAllBlogPosts } from '@/lib/data/blogPosts';

export const revalidate = 86400;

const SITE_URL = 'https://www.fsidigital.ca';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function absoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

export async function GET() {
  const posts = getAllBlogPosts()
    .filter((post) => !post.slug.endsWith('-archive'))
    .slice(0, 75);

  const items = posts.map((post) => {
    const url = `${SITE_URL}/blog/${post.slug}`;
    const image = absoluteUrl(post.seo?.ogImage || post.image || '/og-image.png');

    return [
      '    <item>',
      `      <title>${escapeXml(post.seo?.metaTitle || post.title)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <description>${escapeXml(post.seo?.metaDescription || post.excerpt || '')}</description>`,
      `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
      `      <category>${escapeXml(post.category || 'Government grants')}</category>`,
      `      <enclosure url="${escapeXml(image)}" type="image/png" />`,
      '    </item>',
    ].join('\n');
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    '    <title>FSI Digital Grant Funding Updates</title>',
    `    <link>${SITE_URL}</link>`,
    '    <description>Government grant guides, funding alerts, and application updates for USA and Canada businesses.</description>',
    '    <language>en-us</language>',
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
