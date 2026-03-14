import { blogPosts } from './lib/data/blogPosts';

blogPosts.forEach((post, i) => {
  if (!post) {
    console.log("Index", i, "is undefined!");
  } else if (!post.slug) {
    console.log("Index", i, "is missing slug! Value:", post);
  }
});

console.log("Checked all", blogPosts.length, "posts. If no undefines printed above, check phase2BlogPosts.");
