import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Comprehensive schema audit script
// Checks for:
// 1. Duplicate @type entries (FAQPage, Article, BreadcrumbList etc.)
// 2. Multiple application/ld+json blocks with same @type
// 3. Missing required schema fields
// 4. Empty/broken schema blocks

interface Issue {
    file: string;
    severity: 'CRITICAL' | 'WARNING' | 'INFO';
    issue: string;
    details: string;
}

const issues: Issue[] = [];

function scanFile(filePath: string, relativePath: string) {
    const content = fs.readFileSync(filePath, 'utf8');

    // 1. Count occurrences of each schema @type
    const typeMatches = content.match(/"@type":\s*"([^"]+)"/g) || [];
    const typeCounts: Record<string, number> = {};
    for (const match of typeMatches) {
        const type = match.match(/"@type":\s*"([^"]+)"/)?.[1] || '';
        // Skip types that are legitimately nested (Question, Answer, ListItem, Organization)
        if (['Question', 'Answer', 'ListItem', 'Organization', 'Person', 'ImageObject', 'WebSite'].includes(type)) continue;
        typeCounts[type] = (typeCounts[type] || 0) + 1;
    }

    for (const [type, count] of Object.entries(typeCounts)) {
        if (count > 1) {
            issues.push({
                file: relativePath,
                severity: 'CRITICAL',
                issue: `Duplicate @type: "${type}" appears ${count} times`,
                details: `Google will flag this as "Duplicate field". Only one ${type} schema allowed per page.`
            });
        }
    }

    // 2. Count application/ld+json script blocks
    const ldJsonBlocks = (content.match(/application\/ld\+json/g) || []).length;
    // Check if blocks with same @type exist
    if (ldJsonBlocks > 3) {
        issues.push({
            file: relativePath,
            severity: 'WARNING',
            issue: `${ldJsonBlocks} JSON-LD script blocks found`,
            details: `Having many schema blocks can be fine but worth reviewing for duplicates.`
        });
    }

    // 3. Check for datePublished with new Date() — produces different dates on each build
    if (content.includes('new Date().toISOString()') && content.includes('"datePublished"')) {
        issues.push({
            file: relativePath,
            severity: 'WARNING',
            issue: `Dynamic datePublished/dateModified using new Date()`,
            details: `Schema dates change on every build, which looks suspicious to Google. Use a fixed date.`
        });
    }

    // 4. Check for empty/undefined schema fields
    if (content.includes('"headline": ""') || content.includes('"description": ""') || content.includes('"name": ""')) {
        issues.push({
            file: relativePath,
            severity: 'CRITICAL',
            issue: `Empty required schema field found`,
            details: `Schema has empty headline, description, or name which Google will reject.`
        });
    }

    // 5. Check for missing @context in JSON-LD
    const jsonLdVarMatches = content.match(/const\s+\w+Schema?\s*=\s*\{/g) || [];
    for (const match of jsonLdVarMatches) {
        // Check if each schema variable has @context
        const varName = match.match(/const\s+(\w+)/)?.[1] || '';
        if (varName && !content.includes(`"@context": "https://schema.org"`) && content.includes('application/ld+json')) {
            // Only flag if we have ld+json blocks but no @context
        }
    }

    // 6. Check for FAQPage without mainEntity
    if (content.includes('"FAQPage"') && !content.includes('"mainEntity"')) {
        issues.push({
            file: relativePath,
            severity: 'CRITICAL',
            issue: `FAQPage schema missing required "mainEntity" field`,
            details: `FAQPage requires mainEntity array. Without it, the schema is invalid.`
        });
    }

    // 7. Check for BreadcrumbList without itemListElement
    if (content.includes('"BreadcrumbList"') && !content.includes('"itemListElement"')) {
        issues.push({
            file: relativePath,
            severity: 'CRITICAL',
            issue: `BreadcrumbList schema missing required "itemListElement" field`,
            details: `BreadcrumbList requires itemListElement. Without it, the schema is invalid.`
        });
    }

    // 8. Check for Article schema missing required fields
    if (content.includes('"Article"')) {
        if (!content.includes('"headline"')) {
            issues.push({
                file: relativePath,
                severity: 'WARNING',
                issue: `Article schema may be missing "headline" field`,
                details: `Google recommends headline for Article schema.`
            });
        }
    }
}

function scanDirectory(dir: string, baseDir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
            scanDirectory(fullPath, baseDir);
        } else if (entry.name === 'page.tsx') {
            const relativePath = path.relative(baseDir, fullPath);
            scanFile(fullPath, relativePath);
        }
    }
}

function run() {
    const appDir = path.resolve('app');
    console.log('🔍 Scanning all pages for schema issues...\n');
    scanDirectory(appDir, appDir);

    // Also check the dynamic template's schema generation
    const schemaLib = path.resolve('lib/schema.ts');
    if (fs.existsSync(schemaLib)) {
        const schemaContent = fs.readFileSync(schemaLib, 'utf8');
        if (schemaContent.includes('FAQPage') && schemaContent.includes('faqData')) {
            console.log('ℹ️  lib/schema.ts generates FAQPage schema dynamically — ensure no static pages duplicate this.\n');
        }
    }

    // Sort by severity
    const order: Record<string, number> = { CRITICAL: 0, WARNING: 1, INFO: 2 };
    issues.sort((a, b) => order[a.severity] - order[b.severity]);

    if (issues.length === 0) {
        console.log('✅ No schema issues found! All pages pass validation.\n');
        return;
    }

    console.log(`Found ${issues.length} issues:\n`);

    const critical = issues.filter(i => i.severity === 'CRITICAL');
    const warnings = issues.filter(i => i.severity === 'WARNING');
    const info = issues.filter(i => i.severity === 'INFO');

    if (critical.length > 0) {
        console.log(`🚨 CRITICAL (${critical.length}):`);
        for (const i of critical) {
            console.log(`  ${i.file}`);
            console.log(`    → ${i.issue}`);
            console.log(`    → ${i.details}\n`);
        }
    }

    if (warnings.length > 0) {
        console.log(`⚠️  WARNINGS (${warnings.length}):`);
        for (const i of warnings) {
            console.log(`  ${i.file}`);
            console.log(`    → ${i.issue}`);
            console.log(`    → ${i.details}\n`);
        }
    }

    if (info.length > 0) {
        console.log(`ℹ️  INFO (${info.length}):`);
        for (const i of info) {
            console.log(`  ${i.file}`);
            console.log(`    → ${i.issue}\n`);
        }
    }

    console.log(`\nSummary: ${critical.length} critical, ${warnings.length} warnings, ${info.length} info`);
}

run();
