
import os
import re

APP_DIR = "/Users/ashwanikumar/Downloads/government-grants-website/app"
COMPONENTS_DIR = "/Users/ashwanikumar/Downloads/government-grants-website/components"
ROOT_DIR = "/Users/ashwanikumar/Downloads/government-grants-website"

def get_valid_routes():
    routes = set()
    for root, dirs, files in os.walk(APP_DIR):
        if "page.tsx" in files:
            # removing APP_DIR prefix
            rel_path = os.path.relpath(root, APP_DIR)
            if rel_path == ".":
                routes.add("/")
            else:
                # Handle dynamic routes like [slug]
                # We convert [slug] to a regex pattern or keep it generic
                # For now, let's keep it as is, and we'll handle matching logic later
                route = "/" + rel_path
                routes.add(route)
    return routes

def find_links_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Match href="..." and href={'...'} and href={"..."}
    # Simple regex, might miss complex expressions but good for static strings
    links = []
    
    # Regex for href="value" or href='value'
    matches = re.finditer(r'href=["\'](/[^"\']*)["\']', content)
    for m in matches:
        links.append((m.group(1), m.start()))

    return links

def check_link_validity(link, valid_routes):
    # Ignore anchors
    link = link.split('#')[0]
    # Ignore query params
    link = link.split('?')[0]
    
    if link == "/" or link == "":
        return True
        
    # Check exact match
    if link in valid_routes:
        return True
        
    # Check dynamic routes
    # e.g. /blog/my-post should match /blog/[slug]
    for route in valid_routes:
        if "[" in route:
            # Create regex from route
            # Escape slashes
            pattern = "^" + route.replace("[", "[^/]+").replace("]", "") + "$"
            # Logic: [slug] becomes [^/]+ (one or more non-slash chars)
            # Wait, [slug] is literally in the string.
            # e.g. /blog/[slug] -> /blog/[^/]+
            # Need to handle exact replacement of [identifier]
            
            common_pattern = re.sub(r'\[.*?\]', r'[^/]+', route)
            if re.match(f"^{common_pattern}$", link):
                return True
                
    return False

def main():
    valid_routes = get_valid_routes()
    print("Valid Routes Found:", valid_routes)
    
    broken_links = []
    
    # Scan app and components
    dirs_to_scan = [APP_DIR, COMPONENTS_DIR]
    
    for scan_dir in dirs_to_scan:
        for root, dirs, files in os.walk(scan_dir):
            for file in files:
                if file.endswith('.tsx') or file.endswith('.js') or file.endswith('.ts'):
                    path = os.path.join(root, file)
                    links = find_links_in_file(path)
                    for link, pos in links:
                        if not check_link_validity(link, valid_routes):
                            # Exclude API routes or static assets if they start with slash but aren't pages?
                            # Usually static assets are in public, but they are referenced as /images/...
                            # We should check if file exists in public
                            public_path = os.path.join(ROOT_DIR, "public", link.lstrip('/'))
                            if os.path.exists(public_path):
                                continue
                                
                            broken_links.append({
                                'file': path,
                                'link': link
                            })

    print(f"\nFound {len(broken_links)} potentially broken internal links:")
    seen = set()
    for item in broken_links:
        key = f"{item['link']} in {os.path.basename(item['file'])}"
        if key not in seen:
            print(f"- {item['link']} (in {item['file']})")
            seen.add(key)

if __name__ == "__main__":
    main()
