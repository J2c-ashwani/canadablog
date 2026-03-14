import { getAllBlogPosts } from './lib/data/blogPosts';

try {
  const posts = getAllBlogPosts();
  console.log("Total valid posts:", posts.length);
  const params = posts.map((post) => ({ slug: post.slug }));
  
  let valid = true;
  for (let i = 0; i < params.length; i++) {
    if (!params[i] || typeof params[i].slug !== 'string') {
      console.log("Invalid param at index", i, params[i]);
      valid = false;
    }
  }
  if (valid) console.log("All params are strictly { slug: string }");
} catch(e) {
  console.error("Error running generating params:", e);
}
