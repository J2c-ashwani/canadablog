const { Project, SyntaxKind } = require('ts-morph');
const path = require('path');
const project = new Project();
const filePath = path.join(process.cwd(), 'lib/data/blogPosts.ts');
project.addSourceFileAtPath(filePath);
const sf = project.getSourceFileOrThrow(filePath);
const decl = sf.getVariableDeclarationOrThrow('blogPosts');
const arr = decl.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

let doublesFaq = 0;
let orphansFaqSchema = 0;

for (const el of arr.getElements()) {
  if (el.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
  const props = el.getProperties();
  const faqCount = props.filter(p => p.getName && p.getName() === 'faq').length;
  const faqSchemaCount = props.filter(p => p.getName && p.getName() === 'faqSchema').length;
  const slugProp = el.getProperty('slug');
  const slug = slugProp ? slugProp.getInitializer().getText().replace(/['"]/g,'') : '?';

  if (faqCount > 1) {
    console.log('RED DOUBLE faq on:', slug);
    doublesFaq++;
  }
  if (faqSchemaCount > 0) {
    console.log('YELLOW Orphan faqSchema still on:', slug);
    orphansFaqSchema++;
  }
}

console.log('\nDouble faq fields found:', doublesFaq);
console.log('Orphan faqSchema fields found:', orphansFaqSchema);
