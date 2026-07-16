import fs from 'fs';
import path from 'path';
import { getAllPrograms } from '../lib/data/programs';
import { getAllStateDetails } from '../lib/data/stateDetails';
import { INDUSTRIES, CITIES } from '../lib/pseo-data';
import { industryDatabase } from '../lib/data/industry-pages';

const BASE_URL = 'https://www.fsidigital.ca';

// 1. Gather all valid routes on the site
function getValidRoutes(): Set<string> {
    const valid = new Set<string>();

    // Root
    valid.add('/');

    // Static pages on the site (directories in app/ with page.tsx)
    const scanStaticRoutes = (dir: string, routePrefix = '') => {
        if (!fs.existsSync(dir)) return;
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                // Skip dynamic folders like [slug]
                if (item.startsWith('[') && item.endsWith(']')) continue;
                
                const hasPage = fs.existsSync(path.join(fullPath, 'page.tsx'));
                const nextPrefix = `${routePrefix}/${item}`;
                if (hasPage) {
                    valid.add(nextPrefix);
                }
                scanStaticRoutes(fullPath, nextPrefix);
            }
        }
    };
    scanStaticRoutes(path.join(__dirname, '../app'));

    // Programs
    try {
        const programs = getAllPrograms();
        programs.forEach(p => {
            valid.add(`/programs/${p.slug}`);
            valid.add(`/programs/${p.slug}/eligibility`);
            valid.add(`/programs/${p.slug}/application`);
            valid.add(`/programs/${p.slug}/mistakes`);
        });
    } catch (e) {
        console.warn('Warning loading programs:', e);
    }

    // Blog posts
    try {
        const blogMetadataPath = path.join(__dirname, '../lib/data/blogMetadata.json');
        if (fs.existsSync(blogMetadataPath)) {
            const data = JSON.parse(fs.readFileSync(blogMetadataPath, 'utf-8'));
            const posts = data.metadata || [];
            posts.forEach((p: any) => {
                if (p.slug) valid.add(`/blog/${p.slug}`);
            });
        }
    } catch (e) {
        console.warn('Warning loading blog metadata:', e);
    }

    // Partners
    const partnerRoutes = [
        '/partners',
        '/partners/business-loan-leads',
        '/partners/government-grant-leads',
        '/partners/startup-funding-leads',
        '/partners/tax-credit-leads',
        '/partners/sred-leads',
        '/partners/canada-funding-leads',
        '/partners/usa-funding-leads',
        '/partners/merchant-cash-advance-leads',
        '/partners/equipment-financing-leads',
        '/partners/working-capital-leads',
        '/partners/commercial-real-estate-leads',
        '/partners/sbir-grant-leads',
        '/partners/usda-grant-leads',
        '/partners/clean-energy-grant-leads',
        '/partners/women-owned-business-leads',
        '/partners/nonprofit-grant-leads',
        '/partners/invoice-financing-leads',
        '/partners/purchase-order-financing-leads',
        '/partners/asset-based-lending-leads',
        '/partners/sba-loan-leads',
        '/partners/agriculture-funding-leads',
        '/partners/franchise-financing-leads',
        '/partners/accounts-receivable-factoring-leads',
        '/partners/bridge-loan-leads',
        '/partners/rd-tax-credit-leads',
        '/partners/export-funding-leads',
        '/partners/venture-debt-leads',
        '/partners/business-line-of-credit-leads',
        '/partners/unsecured-business-loan-leads',
        '/partners/minority-owned-business-leads',
    ];
    partnerRoutes.forEach(r => valid.add(r));

    // States and Cities
    try {
        const states = getAllStateDetails();
        states.forEach(s => {
            valid.add(`/usa/${s.slug}`);
            if (s.cityGuides) {
                s.cityGuides.forEach(c => {
                    const citySlug = c.city.toLowerCase().replace(/\s+/g, '-');
                    valid.add(`/usa/${s.slug}/${citySlug}`);

                    // Programmatic leaf pages: /grants/[prov]/[city]/[industry]
                    const stateCode = s.abbreviation.toLowerCase();
                    INDUSTRIES.forEach(ind => {
                        valid.add(`/grants/${stateCode}/${citySlug}/${ind.slug}`);
                    });
                });
            }
        });
    } catch (e) {
        console.warn('Warning loading USA state details:', e);
    }

    // Canadian pSEO roots
    try {
        CITIES.forEach(c => {
            const provSlug = c.provSlug;
            const citySlug = c.citySlug;
            INDUSTRIES.forEach(ind => {
                valid.add(`/grants/${provSlug}/${citySlug}/${ind.slug}`);
            });
        });
    } catch (e) {
        console.warn('Warning loading Canada city details:', e);
    }

    // Location Cohort Pages
    const cohortLocations = [
        'ontario', 'british-columbia', 'alberta', 'quebec',
        'california', 'texas', 'new-york', 'florida', 'illinois', 'ohio'
    ];
    cohortLocations.forEach(loc => valid.add(`/grants/location/${loc}`));

    // Industry Cohort Pages
    try {
        Object.keys(industryDatabase).forEach(slug => {
            valid.add(`/grants/industry/${slug}`);
        });
    } catch (e) {
        console.warn('Warning loading cohort industries:', e);
    }

    // Static assets in public folder
    const scanPublicAssets = (dir: string, routePrefix = '') => {
        if (!fs.existsSync(dir)) return;
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                scanPublicAssets(fullPath, `${routePrefix}/${item}`);
            } else {
                valid.add(`${routePrefix}/${item}`);
            }
        }
    };
    scanPublicAssets(path.join(__dirname, '../public'));

    return valid;
}

// 2. Recursively find all source code files
function getSourceFiles(dir: string): string[] {
    let results: string[] = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== 'dist') {
                results = results.concat(getSourceFiles(fullPath));
            }
        } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.json')) {
            results.push(fullPath);
        }
    });
    return results;
}

interface BrokenLink {
    sourceFile: string;
    lineNumber: number;
    linkText: string;
    suggestedFix?: string;
}

function runAudit() {
    console.log('🔄 Building valid URL index map...');
    const validRoutes = getValidRoutes();
    console.log(`✅ Indexed ${validRoutes.size} valid site routes.`);

    console.log('🔍 Scanning source directories...');
    const searchDirs = [
        path.join(__dirname, '../app'),
        path.join(__dirname, '../components'),
        path.join(__dirname, '../lib/data/blog-content'),
    ];

    let files: string[] = [];
    searchDirs.forEach(d => {
        files = files.concat(getSourceFiles(d));
    });
    console.log(`📂 Found ${files.length} candidate files to audit.`);

    const brokenLinks: BrokenLink[] = [];

    // Match patterns like: href="/programs/..." or href={`/programs/...`}
    const linkRegex = /href=["'](\/[^"'#?]+)["']|href=\{\s*["'](\/[^"'#?]+)["']\s*\}/g;

    files.forEach(file => {
        const relativePath = path.relative(path.join(__dirname, '..'), file);
        
        // Skip sitemap.ts, layouts, or generation scripts themselves
        if (relativePath.includes('sitemap') || relativePath.includes('audit-internal-links')) return;

        const content = fs.readFileSync(file, 'utf-8');
        
        const lines = content.split('\n');
        lines.forEach((line, index) => {
            let match;
            linkRegex.lastIndex = 0;
            
            while ((match = linkRegex.exec(line)) !== null) {
                const url = match[1] || match[2];
                if (!url) continue;

                if (
                    url.startsWith('/api') || 
                    url.startsWith('/#') ||
                    url.endsWith('.png') ||
                    url.endsWith('.jpg') ||
                    url.endsWith('.svg') ||
                    url.endsWith('.xml') ||
                    url.includes('[') ||
                    url.includes('${')
                ) {
                    continue;
                }

                if (!validRoutes.has(url)) {
                    let suggestedFix = '';
                    let minDistance = Infinity;
                    
                    for (const route of validRoutes) {
                        if (route.startsWith(url.substring(0, 5))) {
                            const distance = Math.abs(route.length - url.length);
                            if (distance < minDistance) {
                                minDistance = distance;
                                suggestedFix = route;
                            }
                        }
                    }

                    brokenLinks.push({
                        sourceFile: relativePath,
                        lineNumber: index + 1,
                        linkText: url,
                        suggestedFix: suggestedFix || undefined
                    });
                }
            }
        });
    });

    console.log(`\n🚨 Audit Complete. Found ${brokenLinks.length} broken internal links.`);

    const reportPath = path.join(__dirname, '../reports/broken-internal-links.md');
    
    let mdContent = `# FSI Digital — Internal Link Integrity Audit\n`;
    mdContent += `**Date:** ${new Date().toLocaleDateString()}\n`;
    mdContent += `**Total Pages Indexed:** ${validRoutes.size}\n`;
    mdContent += `**Total Broken Links Found:** ${brokenLinks.length}\n\n`;

    if (brokenLinks.length === 0) {
        mdContent += `## ✅ Clean Pass\nNo broken internal links detected! All routes resolves correctly to active pages.\n`;
    } else {
        mdContent += `## 🚨 Broken Internal Links List\n\n`;
        mdContent += `| Source File | Line | Link Href | Suggested Fix / Active Match |\n`;
        mdContent += `| :--- | :--- | :--- | :--- |\n`;
        brokenLinks.forEach(b => {
            const fileLink = `[${path.basename(b.sourceFile)}](file://${path.resolve(__dirname, '..', b.sourceFile)}#L${b.lineNumber})`;
            mdContent += `| ${fileLink} | ${b.lineNumber} | \`${b.linkText}\` | ${b.suggestedFix ? `\`${b.suggestedFix}\`` : '_None found_'} |\n`;
        });
    }

    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, mdContent, 'utf-8');
    console.log(`📝 Audit report written to ${reportPath}\n`);

    if (brokenLinks.length > 0) {
        process.exit(1);
    }
}

runAudit();
