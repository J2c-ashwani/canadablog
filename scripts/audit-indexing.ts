import fs from 'fs';
import path from 'path';

// Indexing audit: Identify pages Google is likely NOT indexing and why
// Checks: empty content, thin content, duplicate titles, missing meta, noindex signals

interface PageAudit {
    url: string;
    type: string;
    issues: string[];
    contentLength: number;
    hasTitle: boolean;
    hasDescription: boolean;
    hasFAQ: boolean;
    hasH1: boolean;
}

function countWords(text: string): number {
    return text.replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w.length > 0).length;
}

function run() {
    const appDir = path.resolve('app');
    const results: PageAudit[] = [];
    const titleMap: Record<string, string[]> = {};

    // Scan all page.tsx files
    function scanDir(dir: string) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
                scanDir(fullPath);
            } else if (entry.name === 'page.tsx') {
                auditPage(fullPath, dir);
            }
        }
    }

    function auditPage(filePath: string, dir: string) {
        const content = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(appDir, dir);
        const url = '/' + relativePath.replace(/\\/g, '/');
        const issues: string[] = [];

        // Determine page type
        let type = 'other';
        if (url.includes('/blog/')) type = 'blog';
        else if (url.includes('/guides/')) type = 'guide';
        else if (url.includes('/usa/')) type = 'usa';
        else if (url.includes('/canada/')) type = 'canada';
        else if (url.includes('/download/')) type = 'download';

        // Skip dynamic routes for content analysis (they get their content from data)
        if (url.includes('[')) {
            return; // Dynamic routes are templates, not individual pages
        }

        // Check for title/metadata
        const hasTitle = content.includes('title:') || content.includes('generateMetadata');
        const hasDescription = content.includes('description:');
        const hasFAQ = content.includes('faqData') || content.includes('FAQPage') || content.includes('faqSchema');
        const hasH1 = content.includes('<h1') || content.includes('className="text-4xl') || content.includes('className="text-3xl');

        if (!hasTitle) issues.push('NO_TITLE: Missing title metadata');
        if (!hasDescription) issues.push('NO_DESC: Missing description metadata');

        // Check content length (rough estimate)
        const contentLength = content.length;
        if (contentLength < 2000) {
            issues.push(`THIN_CONTENT: Only ${contentLength} chars (~${countWords(content)} raw words including JSX)`);
        }

        // Check for thin FAQ (less than 3 questions)
        const faqCount = (content.match(/"question"/g) || []).length;
        if (hasFAQ && faqCount < 3) {
            issues.push(`THIN_FAQ: Only ${faqCount} FAQ questions (Google prefers 3+)`);
        }

        // Check for static export vs generateMetadata
        const hasStaticExport = content.includes('export const metadata');
        const hasDynamicMetadata = content.includes('generateMetadata');
        if (!hasStaticExport && !hasDynamicMetadata) {
            issues.push('NO_METADATA_EXPORT: No metadata export found - Google may see fallback title');
        }

        // Track titles for duplicate detection
        const titleMatch = content.match(/title:\s*["'`]([^"'`]+)["'`]/);
        if (titleMatch) {
            const title = titleMatch[1];
            if (!titleMap[title]) titleMap[title] = [];
            titleMap[title].push(url);
        }

        // Check for noindex signals
        if (content.includes('noindex') || content.includes('robots: { index: false')) {
            issues.push('NOINDEX: Page has noindex directive');
        }

        results.push({
            url,
            type,
            issues,
            contentLength,
            hasTitle,
            hasDescription,
            hasFAQ,
            hasH1,
        });
    }

    scanDir(appDir);

    // Check for duplicate titles
    for (const [title, urls] of Object.entries(titleMap)) {
        if (urls.length > 1) {
            for (const url of urls) {
                const page = results.find(r => r.url === url);
                if (page) {
                    page.issues.push(`DUPLICATE_TITLE: "${title.slice(0, 50)}..." shared with ${urls.length - 1} other page(s)`);
                }
            }
        }
    }

    // Now also audit blogPosts.ts for thin content entries
    const blogPostsPath = path.resolve('lib/data/blogPosts.ts');
    const blogContent = fs.readFileSync(blogPostsPath, 'utf8');

    // Find entries with empty content
    const emptyContentMatches = blogContent.match(/slug:\s*"([^"]+)"[\s\S]*?content:\s*"",/g) || [];
    const emptyContentSlugs: string[] = [];
    for (const match of emptyContentMatches) {
        const slugMatch = match.match(/slug:\s*"([^"]+)"/);
        if (slugMatch) emptyContentSlugs.push(slugMatch[1]);
    }

    // Check if those empty-content slugs have static pages
    const staticBlogPages = fs.readdirSync(path.resolve('app/blog')).filter(d => {
        return fs.existsSync(path.join(path.resolve('app/blog'), d, 'page.tsx')) && d !== '[slug]';
    });

    const dynamicOnlyEmptyContent = emptyContentSlugs.filter(slug => !staticBlogPages.includes(slug));

    // Report
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  INDEXING AUDIT REPORT — fsidigital.ca');
    console.log('═══════════════════════════════════════════════════════════\n');

    // Page count by type
    const typeCounts: Record<string, number> = {};
    for (const r of results) {
        typeCounts[r.type] = (typeCounts[r.type] || 0) + 1;
    }
    console.log('📊 STATIC PAGES BY TYPE:');
    for (const [type, count] of Object.entries(typeCounts).sort((a, b) => b[1] - a[1])) {
        console.log(`   ${type}: ${count}`);
    }
    console.log(`   TOTAL STATIC: ${results.length}`);
    console.log(`   Dynamic blog posts (via [slug]): ${blogContent.match(/slug:\s*"/g)?.length || 0}`);
    console.log(`   Static blog dirs: ${staticBlogPages.length}\n`);

    // Issues summary
    const pagesWithIssues = results.filter(r => r.issues.length > 0);
    console.log(`\n🚨 PAGES WITH POTENTIAL INDEXING ISSUES: ${pagesWithIssues.length}\n`);

    // Group by issue type
    const issueGroups: Record<string, string[]> = {};
    for (const page of pagesWithIssues) {
        for (const issue of page.issues) {
            const type = issue.split(':')[0];
            if (!issueGroups[type]) issueGroups[type] = [];
            issueGroups[type].push(`  ${page.url}`);
        }
    }
    for (const [type, pages] of Object.entries(issueGroups).sort()) {
        console.log(`\n${type} (${pages.length} pages):`);
        for (const p of pages.slice(0, 10)) console.log(p);
        if (pages.length > 10) console.log(`  ... and ${pages.length - 10} more`);
    }

    // Dynamic blog posts with empty content and no static page
    if (dynamicOnlyEmptyContent.length > 0) {
        console.log(`\n\n⚠️  DYNAMIC BLOG POSTS WITH EMPTY CONTENT (${dynamicOnlyEmptyContent.length}):`);
        console.log('   These render via [slug] template but have content: "" in blogPosts.ts');
        console.log('   Google may see them as thin/duplicate content:\n');
        for (const slug of dynamicOnlyEmptyContent.slice(0, 20)) {
            console.log(`   /blog/${slug}`);
        }
        if (dynamicOnlyEmptyContent.length > 20) {
            console.log(`   ... and ${dynamicOnlyEmptyContent.length - 20} more`);
        }
    }

    // Download pages - likely thin
    const downloadPages = results.filter(r => r.type === 'download');
    if (downloadPages.length > 0) {
        console.log(`\n\n📥 DOWNLOAD PAGES (${downloadPages.length}):`);
        console.log('   These are typically thin lead-gen pages. Google may not index them.');
        console.log('   Consider adding canonical tags or consolidating with parent blog posts.\n');
    }

    // Pages without FAQ (less likely to rank)
    const noFaqPages = results.filter(r => r.type === 'blog' && !r.hasFAQ);
    if (noFaqPages.length > 0) {
        console.log(`\n📝 BLOG PAGES WITHOUT FAQ SCHEMA (${noFaqPages.length}):`);
        console.log('   FAQ schema enables rich snippets in Google search results');
        for (const p of noFaqPages.slice(0, 10)) {
            console.log(`   ${p.url}`);
        }
        if (noFaqPages.length > 10) console.log(`   ... and ${noFaqPages.length - 10} more`);
    }

    console.log('\n\n═══════════════════════════════════════════════════════════');
    console.log('  RECOMMENDATIONS');
    console.log('═══════════════════════════════════════════════════════════\n');

    if (dynamicOnlyEmptyContent.length > 0) {
        console.log(`1. ADD CONTENT to ${dynamicOnlyEmptyContent.length} dynamic blog posts with empty content field`);
        console.log('   → These pages rely entirely on the [slug] template structure');
        console.log('   → Adding unique content will differentiate them and improve indexing\n');
    }

    if (downloadPages.length > 0) {
        console.log(`2. ADD CANONICAL TAGS to ${downloadPages.length} download pages`);
        console.log('   → Point back to their parent blog post to avoid thin content penalties\n');
    }

    console.log('3. SUBMIT SITEMAP to Google Search Console if not already done');
    console.log('4. REQUEST INDEXING via URL Inspection for top 50 unindexed pages');
    console.log('5. PING SITEMAP: send GET to https://www.google.com/ping?sitemap=https://www.fsidigital.ca/sitemap.xml\n');
}

run();
