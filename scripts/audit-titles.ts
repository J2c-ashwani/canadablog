/**
 * CTR Audit Script — scans all blog posts, guides, and state pages
 * Reports: title length, description length, FAQ/shortAnswer coverage
 *
 * Run: npx tsx scripts/audit-titles.ts
 */

import { blogPosts } from '../lib/data/blogPosts';
import { guidesDatabase } from '../lib/data/guides';
import { stateDetails } from '../lib/data/stateDetails';
import { getCleanTitle, getCleanDescription } from '../lib/seo';

const TITLE_LIMIT = 60;
const DESC_LIMIT = 155;

interface AuditRow {
    type: string;
    slug: string;
    titleLen: number;
    titleOk: boolean;
    descLen: number;
    descOk: boolean;
    hasFaq: boolean;
    hasShortAnswer: boolean;
}

const rows: AuditRow[] = [];

// --- Blog Posts ---
for (const post of blogPosts) {
    const title = getCleanTitle(post.seo?.metaTitle || post.title);
    const desc = getCleanDescription(post);
    rows.push({
        type: 'blog',
        slug: post.slug,
        titleLen: title.length,
        titleOk: title.length <= TITLE_LIMIT,
        descLen: desc.length,
        descOk: desc.length > 0 && desc.length <= DESC_LIMIT,
        hasFaq: !!post.faq && post.faq.length > 0,
        hasShortAnswer: !!post.shortAnswer,
    });
}

// --- Guides ---
for (const guide of guidesDatabase) {
    const title = getCleanTitle(guide.title);
    const rawDesc = guide.shortAnswer || guide.description;
    const desc = rawDesc.length > DESC_LIMIT ? rawDesc.substring(0, 152) + '…' : rawDesc;
    rows.push({
        type: 'guide',
        slug: guide.slug,
        titleLen: title.length,
        titleOk: title.length <= TITLE_LIMIT,
        descLen: desc.length,
        descOk: desc.length > 0 && desc.length <= DESC_LIMIT,
        hasFaq: false,
        hasShortAnswer: !!guide.shortAnswer,
    });
}

// --- State Pages ---
for (const state of stateDetails) {
    const baseTitle = `${state.name} Business Grants 2026`;
    const fundingHook = state.heroStats.totalFunding.replace(/\+$/, '');
    let title = `${baseTitle} – ${fundingHook}+ Available`;
    if (title.length > 60) title = `${baseTitle} (${fundingHook}+)`;
    if (title.length > 60) title = baseTitle;
    const desc = state.shortAnswer || state.metaDescription;
    rows.push({
        type: 'state',
        slug: state.slug,
        titleLen: title.length,
        titleOk: title.length <= TITLE_LIMIT,
        descLen: desc.length,
        descOk: desc.length > 0 && desc.length <= DESC_LIMIT,
        hasFaq: state.faqs.length > 0,
        hasShortAnswer: !!state.shortAnswer,
    });
}

// --- Report ---
const totalPages = rows.length;
const titleIssues = rows.filter(r => !r.titleOk);
const descIssues = rows.filter(r => !r.descOk);
const missingShortAnswer = rows.filter(r => !r.hasShortAnswer);
const missingFaq = rows.filter(r => !r.hasFaq && r.type !== 'guide');

console.log('\n========================================');
console.log('  CTR AUDIT REPORT — fsidigital.ca');
console.log('========================================\n');
console.log(`Total pages audited: ${totalPages}`);
console.log(`  Blog posts: ${rows.filter(r => r.type === 'blog').length}`);
console.log(`  Guides:     ${rows.filter(r => r.type === 'guide').length}`);
console.log(`  States:     ${rows.filter(r => r.type === 'state').length}`);
console.log('');

console.log(`✅ Titles OK (≤${TITLE_LIMIT} chars):   ${totalPages - titleIssues.length}/${totalPages}`);
console.log(`❌ Titles TOO LONG:           ${titleIssues.length}/${totalPages}`);
if (titleIssues.length > 0) {
    console.log('   Worst offenders:');
    titleIssues.sort((a, b) => b.titleLen - a.titleLen).slice(0, 5).forEach(r => {
        console.log(`     [${r.type}] ${r.slug} (${r.titleLen} chars)`);
    });
}

console.log('');
console.log(`✅ Descriptions OK (≤${DESC_LIMIT} chars): ${totalPages - descIssues.length}/${totalPages}`);
console.log(`❌ Description issues:          ${descIssues.length}/${totalPages}`);
if (descIssues.length > 0) {
    console.log('   Worst offenders:');
    descIssues.sort((a, b) => b.descLen - a.descLen).slice(0, 5).forEach(r => {
        console.log(`     [${r.type}] ${r.slug} (${r.descLen} chars)`);
    });
}

console.log('');
console.log(`✅ Has shortAnswer:  ${totalPages - missingShortAnswer.length}/${totalPages}`);
console.log(`❌ Missing shortAnswer: ${missingShortAnswer.length}/${totalPages}`);
console.log(`✅ Has FAQ data:     ${totalPages - missingFaq.length}/${totalPages} (excluding guides)`);
console.log(`❌ Missing FAQ:      ${missingFaq.length}/${totalPages}`);

// --- Title Preview (first 15 of each type) ---
console.log('\n--- TITLE PREVIEW (sample) ---\n');
console.log('BLOG POSTS:');
rows.filter(r => r.type === 'blog').slice(0, 10).forEach(r => {
    const post = blogPosts.find(p => p.slug === r.slug);
    const title = post ? getCleanTitle(post.seo?.metaTitle || post.title) : '???';
    const len = title.length;
    const flag = len > 60 ? '❌' : '✅';
    console.log(`  ${flag} [${len}ch] ${title}`);
});

console.log('\nSTATE PAGES:');
rows.filter(r => r.type === 'state').slice(0, 10).forEach(r => {
    const state = stateDetails.find(s => s.slug === r.slug);
    if (!state) return;
    const baseTitle = `${state.name} Business Grants 2026`;
    const fundingHook = state.heroStats.totalFunding.replace(/\+$/, '');
    let title = `${baseTitle} – ${fundingHook}+ Available`;
    if (title.length > 60) title = `${baseTitle} (${fundingHook}+)`;
    if (title.length > 60) title = baseTitle;
    const flag = title.length > 60 ? '❌' : '✅';
    console.log(`  ${flag} [${title.length}ch] ${title}`);
});

console.log('\nGUIDE PAGES:');
rows.filter(r => r.type === 'guide').slice(0, 10).forEach(r => {
    const guide = guidesDatabase.find(g => g.slug === r.slug);
    const title = guide ? getCleanTitle(guide.title) : '???';
    const flag = title.length > 60 ? '❌' : '✅';
    console.log(`  ${flag} [${title.length}ch] ${title}`);
});

console.log('\n========================================\n');
