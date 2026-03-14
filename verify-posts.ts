import { blogPosts, blogCategories } from './lib/data/blogPosts';

let hasError = false;

blogPosts.forEach((post, index) => {
  if (post === undefined) {
    console.error(`Error: Post at index ${index} in blogPosts array is undefined!`);
    hasError = true;
  } else if (!post.slug) {
    console.error(`Error: Post at index ${index} (${post.title || 'Unknown'}) is missing a slug!`);
    hasError = true;
  }
});

if (!hasError) {
  console.log("Success: All blog posts are defined and have slugs.");
} else {
  process.exit(1);
}
