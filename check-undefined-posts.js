const { blogPosts } = require('./lib/data/blogPosts.js');

console.log('Total posts:', blogPosts.length);

blogPosts.forEach((post, index) => {
  if (!post) {
    console.log(`Post at index ${index} is undefined`);
  } else if (!post.slug) {
    console.log(`Post at index ${index} has no slug:`, post);
  }
});

console.log('Done checking.');