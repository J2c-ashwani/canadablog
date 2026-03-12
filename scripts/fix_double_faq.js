/**
 * fix_double_faq.js
 * 
 * Finds any blog post objects that have TWO `faq` properties
 * and removes the second (duplicate) one, keeping only the first.
 */

const { Project, SyntaxKind } = require('ts-morph');
const path = require('path');

const project = new Project();
const blogPostsPath = path.join(__dirname, '../lib/data/blogPosts.ts');
project.addSourceFileAtPath(blogPostsPath);
const sourceFile = project.getSourceFileOrThrow(blogPostsPath);

const decl = sourceFile.getVariableDeclarationOrThrow('blogPosts');
const arr = decl.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

let fixed = 0;

for (const el of arr.getElements()) {
  if (el.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;

  const props = el.getProperties();
  const faqProps = props.filter(p => p.getName && p.getName() === 'faq');
  
  if (faqProps.length > 1) {
    const slugProp = el.getProperty('slug');
    const slug = slugProp ? slugProp.getInitializer().getText().replace(/['"]/g, '') : '?';
    
    // Remove all but the FIRST faq (the original E-E-A-T one is first in the object)
    for (let i = faqProps.length - 1; i >= 1; i--) {
      faqProps[i].remove();
    }
    console.log(`✅ Fixed double faq on: ${slug} (removed ${faqProps.length - 1} duplicate(s))`);
    fixed++;
  }
}

sourceFile.saveSync();
console.log(`\n🎉 Done. Fixed ${fixed} page(s) with duplicate faq fields.`);
