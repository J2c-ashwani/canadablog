const SEO = require('../app/blog/sba-loans-grants-guide/page.tsx');
console.log('Got generateMetadata:', !!SEO.generateMetadata);
if (SEO.generateMetadata) {
  const meta = SEO.generateMetadata();
  console.log('Resulting metadata:', meta);
}
