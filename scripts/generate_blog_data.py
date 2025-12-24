
import os
import re
import datetime
import random

BLOG_DIR = "/Users/ashwanikumar/Downloads/government-grants-website/app/blog"
OUTPUT_FILE = "/Users/ashwanikumar/Downloads/government-grants-website/lib/data/blogPosts.ts_new"

def extract_metadata(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    title_match = re.search(r'title:\s*["\'](.*?)["\']', content)
    desc_match = re.search(r'description:\s*["\'](.*?)["\']', content)
    
    title = title_match.group(1) if title_match else ""
    description = desc_match.group(1) if desc_match else ""
    
    return title, description

def get_category_color(category):
    colors = {
        "USA News": "bg-blue-100 text-blue-800",
        "Canada News": "bg-red-100 text-red-800",
        "Tips & Guides": "bg-purple-100 text-purple-800",
        "Funding Alerts": "bg-yellow-100 text-yellow-800",
        "State-Specific": "bg-green-100 text-green-800",
        "Industry-Specific": "bg-orange-100 text-orange-800",
        "Demographic-Specific": "bg-pink-100 text-pink-800",
        "Future-Looking": "bg-indigo-100 text-indigo-800"
    }
    return colors.get(category, "bg-gray-100 text-gray-800")

def main():
    posts = []
    
    # Process directories
    dirs = [d for d in os.listdir(BLOG_DIR) if os.path.isdir(os.path.join(BLOG_DIR, d))]
    dirs.sort()
    
    current_id = 1
    
    for dirname in dirs:
        if dirname.startswith('[') or dirname == 'page.tsx':
            continue
            
        page_path = os.path.join(BLOG_DIR, dirname, "page.tsx")
        if not os.path.exists(page_path):
            continue
            
        title, description = extract_metadata(page_path)
        
        if not title:
            # Fallback if metadata not found, try to guess from slug
            title = dirname.replace('-', ' ').title()
            
        # Determine category based on title/slug keywords
        category = "USA News"
        if "canada" in dirname.lower() or "canada" in title.lower():
            category = "Canada News"
        elif "guide" in dirname.lower():
            category = "Tips & Guides"
        elif "women" in dirname.lower():
            category = "Demographic-Specific"
        elif any(x in dirname.lower() for x in ["tech", "manufacturing", "health"]):
            category = "Industry-Specific"
        elif any(x in dirname.lower() for x in ["texas", "california", "ontario", "bc", "alberta"]):
            category = "State-Specific"

        # Image logic
        image = "/images/blog/usa-grants-theme.png"
        if category == "Canada News":
            image = "/images/blog/canada-grants-theme.png"
        elif category == "Demographic-Specific":
             image = "/images/blog/community-diversity-theme.png"
        elif category == "Industry-Specific":
             image = "/images/blog/tech-innovation-theme.png"
        
        # Date logic (spread them out)
        days_ago = random.randint(1, 60)
        date = (datetime.datetime.now() - datetime.timedelta(days=days_ago)).strftime("%B %d, %Y")

        post = {
            "id": current_id,
            "slug": dirname,
            "title": title,
            "excerpt": description or "Complete guide to government grants and funding opportunities.",
            "category": category,
            "categoryColor": get_category_color(category),
            "author": "FSI Digital Team",
            "date": date,
            "readTime": f"{random.randint(5, 15)} min read",
            "image": image,
            "featured": random.choice([True, False]),
            "content": "", # Content handles by static page
            "seo": {
                "keywords": title.split()[:5]
            }
        }
        
        posts.append(post)
        current_id += 1

    # Generate TypeScript output
    ts_content = """// lib/data/blogPosts.ts

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  content: string;
  seo: {
    keywords: string[];
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
}

export const blogPosts: BlogPost[] = [
"""
    
    for post in posts:
        ts_content += "  {\n"
        ts_content += f"    id: {post['id']},\n"
        ts_content += f"    slug: \"{post['slug']}\",\n"
        ts_content += f"    title: \"{post['title']}\",\n"
        ts_content += f"    excerpt: \"{post['excerpt']}\",\n"
        ts_content += f"    category: \"{post['category']}\",\n"
        ts_content += f"    categoryColor: \"{post['categoryColor']}\",\n"
        ts_content += f"    author: \"{post['author']}\",\n"
        ts_content += f"    date: \"{post['date']}\",\n"
        ts_content += f"    readTime: \"{post['readTime']}\",\n"
        ts_content += f"    image: \"{post['image']}\",\n"
        ts_content += f"    featured: {str(post['featured']).lower()},\n"
        ts_content += "    content: \"\",\n"
        ts_content += "    seo: {\n"
        ts_content += f"      keywords: {json.dumps(post['seo']['keywords'])}\n"
        ts_content += "    }\n"
        ts_content += "  },\n"

    ts_content += """];

export const blogCategories = [
  {
    id: "USA News",
    name: "USA News",
    color: "bg-blue-100 text-blue-800",
    description: "Federal funding programs and opportunities"
  },
  {
    id: "Canada News",
    name: "Canada News",
    color: "bg-red-100 text-red-800",
    description: "Canadian government funding and grants"
  },
  {
    id: "Tips & Guides",
    name: "Tips & Guides",
    color: "bg-purple-100 text-purple-800",
    description: "Expert guidance and application strategies"
  },
  {
    id: "Funding Alerts",
    name: "Funding Alerts",
    color: "bg-yellow-100 text-yellow-800",
    description: "Time-sensitive funding opportunities"
  },
  {
    id: "State-Specific",
    name: "State-Specific",
    color: "bg-green-100 text-green-800",
    description: "State-level grants and programs"
  },
  {
    id: "Industry-Specific",
    name: "Industry-Specific",
    color: "bg-orange-100 text-orange-800",
    description: "Industry-focused funding opportunities"
  },
  {
    id: "Demographic-Specific",
    name: "Demographic-Specific",
    color: "bg-pink-100 text-pink-800",
    description: "Targeted demographic funding programs"
  },
  {
    id: "Future-Looking",
    name: "Future-Looking",
    color: "bg-indigo-100 text-indigo-800",
    description: "Upcoming funding opportunities"
  }
];

// UTILITY FUNCTIONS
export function getAllBlogPosts() {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts() {
  return blogPosts.filter((post) => post.featured).slice(0, 6);
}

export function getFeaturedBlogPosts() {
  return blogPosts.filter((post) => post.featured).slice(0, 6);
}

export function getBlogPostsByCategory(category: string) {
  return blogPosts.filter((post) => post.category === category);
}

export function getAllCategories() {
  const categories = new Set(blogPosts.map((post) => post.category));
  return Array.from(categories);
}

export function getRecentBlogPosts(count: number = 5) {
  return getAllBlogPosts().slice(0, count);
}

export function getRecentPosts(count: number = 5) {
  return getAllBlogPosts().slice(0, count);
}

export function getCategoryWithCounts() {
  // Count posts per category
  const categoryCounts = blogPosts.reduce((counts, post) => {
    counts[post.category] = (counts[post.category] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  // Map categories with their counts
  return blogCategories.map(category => ({
    ...category,
    count: categoryCounts[category.id] || 0
  }));
}

export default blogPosts;
"""

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(ts_content)
        
    print(f"Successfully generated {len(posts)} posts to {OUTPUT_FILE}")

import json
if __name__ == "__main__":
    main()
