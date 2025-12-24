
import os
import re
import json

CURRENT_BLOG_FILE = "/Users/ashwanikumar/Downloads/government-grants-website/lib/data/blogPosts.ts"
BACKUP_DIR = "/Users/ashwanikumar/Downloads/government-grants-website/lib/data/blog-posts"
OUTPUT_FILE = "/Users/ashwanikumar/Downloads/government-grants-website/lib/data/blogPosts.ts"

def get_category_color(category):
    colors = {
        "USA News": "bg-blue-100 text-blue-800",
        "Canada News": "bg-red-100 text-red-800",
        "Tips & Guides": "bg-purple-100 text-purple-800",
        "Funding Alerts": "bg-yellow-100 text-yellow-800",
        "State-Specific": "bg-green-100 text-green-800",
        "Industry-Specific": "bg-orange-100 text-orange-800",
        "Demographic-Specific": "bg-pink-100 text-pink-800", 
        "Seasonal": "bg-indigo-100 text-indigo-800"
    }
    return colors.get(category, "bg-gray-100 text-gray-800")

def parse_ts_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the template literal content
    match = re.search(r'export default `(.*?)`;', content, re.DOTALL)
    if match:
        return match.group(1)
    return ""

def clean_html(raw_html):
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext.strip()

def main():
    # 1. Read existing posts (we'll simpler regex extract them or just keep the variable structure)
    # Actually, it's easier to just regenerate the static ones from the directory scan again OR read the file.
    # Since I wrote the file, I know the format. But parsing TS with regex is flaky.
    # BETTER APPROACH: I will just re-run the logic from `generate_blog_data.py` for the static pages,
    # and add the new logic for the dynamic pages.
    
    # Rerun logic for static pages (Grant News)
    static_posts = []
    BLOG_DIR = "/Users/ashwanikumar/Downloads/government-grants-website/app/blog"
    if os.path.exists(BLOG_DIR):
        dirs = [d for d in os.listdir(BLOG_DIR) if os.path.isdir(os.path.join(BLOG_DIR, d))]
        dirs.sort()
        current_id = 1
        for dirname in dirs:
            if dirname.startswith('[') or dirname == 'page.tsx':
                continue
            
            page_path = os.path.join(BLOG_DIR, dirname, "page.tsx")
            if not os.path.exists(page_path):
                continue
                
            with open(page_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            title_match = re.search(r'title:\s*["\'](.*?)["\']', content)
            desc_match = re.search(r'description:\s*["\'](.*?)["\']', content)
            title = title_match.group(1) if title_match else dirname.replace('-', ' ').title()
            description = desc_match.group(1) if desc_match else "Complete guide to government grants."

            # Category logic
            category = "USA News"
            if "canada" in dirname.lower(): category = "Canada News"
            elif "guide" in dirname.lower(): category = "Tips & Guides"
            elif "women" in dirname.lower(): category = "Demographic-Specific"
            
            static_posts.append({
                "id": current_id,
                "slug": dirname,
                "title": title,
                "excerpt": description,
                "category": category,
                "categoryColor": get_category_color(category),
                "author": "FSI Digital Team",
                "date": "2025-12-01", # Placeholder date
                "readTime": "10 min read",
                "image": "/images/blog/usa-grants-theme.png",
                "featured": False,
                "content": "",
                "seo": {"keywords": title.split()[:5]},
                "type": "grant-news"
            })
            current_id += 1
            
    # 2. Generate Expert Insight posts
    expert_posts = []
    start_id = 1000 # distinct IDs
    
    for root, dirs, files in os.walk(BACKUP_DIR):
        for file in files:
            if not file.endswith('.ts'): continue
            
            full_path = os.path.join(root, file)
            slug = file.replace('.ts', '')
            
            # Determine category from folder name
            folder_name = os.path.basename(root)
            category_map = {
                "usa-news": "USA News",
                "canada-news": "Canada News",
                "tips-guides": "Tips & Guides",
                "funding-alerts": "Funding Alerts",
                "demographic-specific": "Demographic-Specific",
                "industry-specific": "Industry-Specific",
                "state-specific": "State-Specific",
                "seasonal": "Seasonal"
            }
            category = category_map.get(folder_name, "USA News")
            
            # Extract content
            html_content = parse_ts_file(full_path)
            clean_text = clean_html(html_content)
            excerpt = clean_text[:150] + "..." if clean_text else "Expert insights on government grants."
            title = slug.replace('-', ' ').title()
            
            expert_posts.append({
                "id": start_id,
                "slug": slug,
                "title": title,
                "excerpt": excerpt,
                "category": category,
                "categoryColor": get_category_color(category),
                "author": "Expert",
                "date": "2025-12-25",
                "readTime": "5 min read",
                "image": "/images/blog/expert-insights-theme.png", # Different theme
                "featured": True,
                "content": html_content.replace('`', '\\`').replace('${', '\\${'), # Escape for TS string
                "seo": {"keywords": title.split()[:5]},
                "type": "expert-insight"
            })
            start_id += 1

    # 3. Combine and Write
    all_posts = static_posts + expert_posts
    
    ts_content = """// lib/data/blogPosts.ts

export type BlogPostType = 'grant-news' | 'expert-insight';

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
  type: BlogPostType;
  seo: {
    keywords: string[];
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
}

export const blogPosts: BlogPost[] = [
"""
    
    for post in all_posts:
        ts_content += "  {\n"
        ts_content += f"    id: {post['id']},\n"
        ts_content += f"    slug: {json.dumps(post['slug'])},\n"
        ts_content += f"    title: {json.dumps(post['title'])},\n"
        ts_content += f"    excerpt: {json.dumps(post['excerpt'])},\n"
        ts_content += f"    category: {json.dumps(post['category'])},\n"
        ts_content += f"    categoryColor: {json.dumps(post['categoryColor'])},\n"
        ts_content += f"    author: {json.dumps(post['author'])},\n"
        ts_content += f"    date: {json.dumps(post['date'])},\n"
        ts_content += f"    readTime: {json.dumps(post['readTime'])},\n"
        ts_content += f"    image: {json.dumps(post['image'])},\n"
        ts_content += f"    featured: {str(post['featured']).lower()},\n"
        ts_content += f"    type: {json.dumps(post['type'])},\n"
        # Content handling: Use backticks for HTML content, double quotes for empty
        if post['content']:
             ts_content += f"    content: {json.dumps(post['content'])},\n"
        else:
             ts_content += f"    content: \"\",\n"
             
        ts_content += "    seo: {\n"
        ts_content += f"      keywords: {json.dumps(post['seo']['keywords'])}\n"
        ts_content += "    }\n"
        ts_content += "  },\n"

    ts_content += """];

export const blogCategories = [
  { id: "USA News", name: "USA News", color: "bg-blue-100 text-blue-800", description: "Federal funding programs" },
  { id: "Canada News", name: "Canada News", color: "bg-red-100 text-red-800", description: "Canadian government funding" },
  { id: "Tips & Guides", name: "Tips & Guides", color: "bg-purple-100 text-purple-800", description: "Application strategies" },
  { id: "Funding Alerts", name: "Funding Alerts", color: "bg-yellow-100 text-yellow-800", description: "Time-sensitive opportunities" },
  { id: "State-Specific", name: "State-Specific", color: "bg-green-100 text-green-800", description: "State-level grants" },
  { id: "Industry-Specific", name: "Industry-Specific", color: "bg-orange-100 text-orange-800", description: "Industry-focused funding" },
  { id: "Demographic-Specific", name: "Demographic-Specific", color: "bg-pink-100 text-pink-800", description: "Targeted demographic funding" },
  { id: "Seasonal", name: "Seasonal", color: "bg-indigo-100 text-indigo-800", description: "Upcoming opportunities" }
];

export function getAllBlogPosts() {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getGrantNewsPosts() {
  return getAllBlogPosts().filter(post => post.type === 'grant-news');
}

export function getExpertInsightPosts() {
  return getAllBlogPosts().filter(post => post.type === 'expert-insight');
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts() {
  return blogPosts.filter((post) => post.featured).slice(0, 6);
}

export function getCategoryWithCounts(type?: BlogPostType) {
  return blogCategories.map(category => {
    const count = blogPosts.filter(post =>
      post.category === category.name &&
      (!type || post.type === type)
    ).length;

    return {
      ...category,
      count,
      slug: category.id
    };
  });
}

export function getBlogPostsByCategory(category: string) {
  return blogPosts.filter((post) => post.category === category);
}

export default blogPosts;
"""

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"Successfully merged {len(static_posts)} news posts and {len(expert_posts)} expert insights to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
