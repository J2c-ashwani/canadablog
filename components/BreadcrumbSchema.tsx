"use client"

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

/**
 * BreadcrumbSchema - Generates JSON-LD BreadcrumbList structured data
 * for rich search result display in Google.
 * 
 * Usage:
 * <BreadcrumbSchema items={[
 *   { name: "Home", url: "https://www.fsidigital.ca" },
 *   { name: "Blog", url: "https://www.fsidigital.ca/blog" },
 *   { name: "Canada Federal Grants", url: "https://www.fsidigital.ca/blog/canada-federal-grants" }
 * ]} />
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Helper function to generate breadcrumb items from a page path.
 * Automatically creates the Home > Section > Page hierarchy.
 */
export function generateBreadcrumbs(
  path: string,
  pageName: string
): BreadcrumbItem[] {
  const baseUrl = "https://www.fsidigital.ca"
  const items: BreadcrumbItem[] = [
    { name: "Home", url: baseUrl }
  ]

  const segments = path.split("/").filter(Boolean)
  
  // Build intermediate breadcrumbs
  let currentPath = ""
  const sectionNames: Record<string, string> = {
    "blog": "Guides",
    "canada": "Canada Grants",
    "usa": "USA Grants",
    "guides": "How-To Guides",
    "download": "Resources",
    "grant-finder": "Grant Finder",
  }

  for (let i = 0; i < segments.length - 1; i++) {
    currentPath += `/${segments[i]}`
    const name = sectionNames[segments[i]] || segments[i].replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())
    items.push({ name, url: `${baseUrl}${currentPath}` })
  }

  // Add the current page
  items.push({ name: pageName, url: `${baseUrl}${path}` })

  return items
}
