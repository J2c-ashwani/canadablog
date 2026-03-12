/**
 * fix_faqSchema_to_faq.js
 * 
 * Renames `faqSchema` → `faq` on blog posts that have `faqSchema` but no `faq`.
 * If a post already has `faq`, `faqSchema` is removed as a redundant orphan.
 * This ensures the blog template (which reads `post.faq`) correctly renders
 * both the accordion UI and the JSON-LD FAQPage schema.
 */

const { Project, SyntaxKind } = require('ts-morph');
const path = require('path');

const project = new Project();
const blogPostsPath = path.join(__dirname, '../lib/data/blogPosts.ts');
project.addSourceFileAtPath(blogPostsPath);
const sourceFile = project.getSourceFileOrThrow(blogPostsPath);

const blogPostsDecl = sourceFile.getVariableDeclarationOrThrow('blogPosts');
const arrayExpr = blogPostsDecl.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

const elements = arrayExpr.getElements();
let renamed = 0;
let removed = 0;
let skipped = 0;

for (const element of elements) {
    if (element.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;

    const obj = element;
    const slugProp = obj.getProperty('slug');
    const slug = slugProp?.getInitializer()?.getText()?.replace(/['"]/g, '') || 'unknown';

    const hasFaq = obj.getProperty('faq');
    const hasFaqSchema = obj.getProperty('faqSchema');

    if (!hasFaqSchema) {
        // Nothing to do
        skipped++;
        continue;
    }

    if (!hasFaq) {
        // Post has faqSchema but no faq → rename faqSchema to faq
        const faqSchemaValue = hasFaqSchema.getInitializer().getText();
        hasFaqSchema.set({ name: 'faq' });
        console.log(`✅ Renamed faqSchema → faq: ${slug}`);
        renamed++;
    } else {
        // Post already has faq → remove faqSchema as orphan
        hasFaqSchema.remove();
        console.log(`🗑️  Removed orphan faqSchema (faq already exists): ${slug}`);
        removed++;
    }
}

sourceFile.saveSync();
console.log(`\n🎉 Done. Renamed: ${renamed} | Orphans removed: ${removed} | Skipped (no faqSchema): ${skipped}`);
