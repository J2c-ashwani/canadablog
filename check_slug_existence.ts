
import { getBlogPostBySlug } from './lib/data/blogPosts';

const slugs = [
    'clean-technology-2025',
    'veterans-business-grants-2025'
];

slugs.forEach(slug => {
    const post = getBlogPostBySlug(slug);
    console.log(`Slug: ${slug} -> ${post ? 'FOUND (ID: ' + post.id + ')' : 'NOT FOUND'}`);
});
