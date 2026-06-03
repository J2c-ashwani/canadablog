# Google Search Console Indexing Workflow

FSI Digital should use the standard Google Search Console indexing workflow for normal blog, guide, and programmatic grant pages.

The old Indexing API submitter is disabled by default because Google limits that API to `JobPosting` and `BroadcastEvent` pages with video. Grant articles and pSEO pages should be discovered through the sitemap, internal links, and URL Inspection recrawl requests.

FAQPage schema has been removed from blog, guide, grant, state, and pSEO pages to reduce Search Console enhancement noise. The visible FAQ sections remain for users.

The priority sitemap is a static file at `/priority-sitemap.xml`. Refresh it after major SEO/content batches with:
`node scripts/generate-priority-sitemap.js`

The recovery sitemap is a static file at `/indexing-recovery-sitemap.xml`. It is for released programmatic grant pages plus other valid canonical pages that appear in GSC as noindexed, crawled-not-indexed, or discovered-not-indexed. It intentionally excludes query/filter URLs, thank-you pages, archive slugs, API routes, search pages, and assets. Refresh it after major SEO releases with:
`node scripts/generate-indexing-recovery-sitemap.js`

## After Each SEO Deployment

1. Deploy the site.
2. Open Google Search Console for `sc-domain:fsidigital.ca`.
3. Submit or refresh the sitemap:
   `https://www.fsidigital.ca/sitemap.xml`
4. Submit or refresh the priority sitemap:
   `https://www.fsidigital.ca/priority-sitemap.xml`
5. Submit or refresh the pSEO recovery sitemap:
   `https://www.fsidigital.ca/indexing-recovery-sitemap.xml`
6. Run the local priority helper:
   `node scripts/gsc-priority-urls.js`
7. Use URL Inspection on only the top 10 priority URLs and click **Request indexing** after the deployed page returns `200`, has a canonical URL, and has no `noindex`.
8. In the Pages report, validate fixes for:
   - Duplicate or invalid FAQ schema
   - Crawled - currently not indexed
   - Discovered - currently not indexed
   - Alternate page with proper canonical

## What Should Be Indexed

- Canonical blog articles
- Guide pages with useful standalone content
- Country, province, state, and city landing pages
- `/grants/{province}` and `/grants/{province}/{city}` pSEO hub pages
- Published `/grants/{province}/{city}/{industry}` pages that are not thin or duplicate

## What Should Not Be Indexed

- `/api/*`
- `/download/*/thank-you`
- `-archive` blog slugs
- Superseded 2025 slugs that redirect to 2026 versions
- Utility pages that exist only to complete a form flow

## AdSense Monitoring

After deployment, compare 14 days of data against the previous 14 days:

- Page RPM by page type
- Impressions per session
- Viewability
- Ad CTR
- Lead conversion rate from `/grant-finder`, `/contact`, and download forms

The site now sends a GA event named `adsense_page_type_view` with `page_type` and expected ad slot count. Use that to separate blog article, guide, pSEO, and lead magnet traffic before changing ad density.
