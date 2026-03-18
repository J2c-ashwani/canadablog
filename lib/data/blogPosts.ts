// lib/data/blogPosts.ts
import fs from 'fs';
import path from 'path';
import metadataObj from './blogMetadata.json';

export type BlogPostType = 'grant-news' | 'expert-insight';

export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor?: string;
  author: string;
  date: string;
  readTime?: string;
  image: string;
  featured?: boolean;
  content: string;
  type: BlogPostType;
  seo?: {
    keywords: string[];
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
  metrics?: {
    label: string
    value: string
    description: string
    color: string
    iconName?: string
  }[]
  expertTip?: {
    title: string
    content: string
    type: 'tip' | 'warning' | 'success'
  }
  faq?: {
    question: string
    answer: string
  }[]
  shortAnswer?: string;
  shortAnswerQuestion?: string;
  faqSchema?: { question: string; answer: string; }[];
  comparisonTable?: {
    title: string;
    description?: string;
    programs: {
      program: string;
      amount: string;
      equity: string;
      bestFor: string;
      timeline?: string;
    }[];
  };
  jumpLinks?: { title: string; id: string }[];
  eligibleCheck?: boolean;
  inlineCTA?: {
    title?: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
  };
  relatedLinks?: {
    href: string;
    title: string;
    description: string;
  }[];
  tags?: string[];
}

// Map the raw JSON to BlogPost array (it lacks content, but has everything else)
export const blogPosts: BlogPost[] = metadataObj.metadata as any;
export const slugToPath: Record<string, string> = metadataObj.slugToPath;
// (Legacy static imports and blogPosts array removed to fix Vercel NFT timeout)

export const blogCategories = [
  { id: "USA News", name: "USA News", color: "bg-blue-100 text-blue-800", description: "Federal funding programs" },
  { id: "Canada News", name: "Canada News", color: "bg-red-100 text-red-800", description: "Canadian government funding" },
  { id: "Tips & Guides", name: "Tips & Guides", color: "bg-purple-100 text-purple-800", description: "Application strategies" },
  { id: "Funding Alerts", name: "Funding Alerts", color: "bg-yellow-100 text-yellow-800", description: "Time-sensitive opportunities" },
  { id: "State-Specific", name: "State-Specific", color: "bg-green-100 text-green-800", description: "State-level grants" },
  { id: "Industry-Specific", name: "Industry-Specific", color: "bg-orange-100 text-orange-800", description: "Industry-focused funding" },
];

// (Legacy Phase 2 push and deduplication loops removed as JSON metadata is pre-sanitized and read-only)

export function getAllBlogPosts() {
  const valid = blogPosts.filter((p, i) => {
    if (!p || !p.slug || !p.date) {
      console.error("[getAllBlogPosts] Missing/invalid post at index", i, "slug:", p?.slug)
      return false
    }
    return true
  })
  return valid.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getGrantNewsPosts() {
  return getAllBlogPosts().filter(post => post.type === 'grant-news');
}

export function getExpertInsightPosts() {
  return getAllBlogPosts().filter(post => post.type === 'expert-insight');
}

export function getBlogPostBySlug(slug: string) {
  if (!slug) return null;
  return blogPosts.find((post) => post && post.slug === slug) ?? null;
}

export async function getBlogPostContent(slug: string): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), 'lib/data/blog-content', `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    
    const fileData = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(fileData);
    return parsed.content || null;
  } catch (err) {
    console.error(`Error reading content JSON for slug ${slug}:`, err);
    return null;
  }
}

/** Load rich Answer Engine fields (shortAnswer, faq, metrics, etc.) from per-slug JSON */
export async function getBlogPostRichData(slug: string): Promise<Partial<BlogPost>> {
  try {
    const filePath = path.join(process.cwd(), 'lib/data/blog-content', `${slug}.json`);
    if (!fs.existsSync(filePath)) return {};
    
    const fileData = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(fileData);
    const { content, ...richFields } = parsed;
    return richFields as Partial<BlogPost>;
  } catch (err) {
    return {};
  }
}

export function getFeaturedPosts() {
  return blogPosts
    .filter((post) => post.featured)
    .slice(0, 6);
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
  return blogPosts.filter((post) => post && post.category === category);
}

export default blogPosts;
