
import re
import os

BLOG_POSTS_PATH = "/Users/ashwanikumar/Downloads/government-grants-website/lib/data/blogPosts.ts"

def get_smart_image(title, slug, current_type):
    content_text = (title + " " + slug).lower()
    
    # Priority 1: Location - Canada (Strongest signal)
    if any(k in content_text for k in ['canada', 'ontario', 'quebec', 'alberta', 'british columbia', 'saskatchewan', 'manitoba']):
        return "/images/blog/canada-grants-theme.png"
        
    # Priority 2: Specific Demographics
    if any(k in content_text for k in ['women', 'female', 'minority', 'indigenous', 'black', 'diversity', 'community']):
        return "/images/blog/community-diversity-theme.png"

    # Priority 3: Tech & Innovation
    if any(k in content_text for k in ['tech', 'ai ', 'software', 'innovation', 'startup', 'digital', 'saas']):
        return "/images/blog/tech-innovation-theme.png"
        
    # Priority 4: Health & Science
    if any(k in content_text for k in ['health', 'medical', 'science', 'research', 'biotech']):
        return "/images/blog/healthcare-science-theme.png"
        
    # Priority 5: Guides & Strategy
    if any(k in content_text for k in ['guide', 'strategy', 'tips', 'how to', 'plan']):
        return "/images/blog/strategy-planning-theme.png"

    # Priority 6: Alerts & Deadlines
    if any(k in content_text for k in ['deadline', 'alert', 'urgent', 'closing', 'q4', 'q1']):
        return "/images/blog/funding-alerts-theme.png"
        
    # Priority 7: Expert Insights (based on type or title)
    if current_type == 'expert-insight' or 'expert' in content_text:
        return "/images/blog/expert-insights-theme.png"

    # Default / USA
    return "/images/blog/usa-grants-theme.png"

def main():
    with open(BLOG_POSTS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # We will process the file line by line to be safe with the large TS file
    # and use state to track which post we are in.
    
    new_lines = []
    lines = content.split('\n')
    
    current_slug = ""
    current_title = ""
    current_type = ""
    
    # First pass: We need to update the `image:` line based on info we might not have yet (title comes before image usually, but type comes after?)
    # Actually, the standard order in the file is: slug, title, ..., image, ..., type.
    # So we should have slug and title by the time we hit image.
    
    for line in lines:
        stripped = line.strip()
        
        # Capture Slug
        if stripped.startswith('slug:'):
            match = re.search(r'slug:\s*["\'](.*?)["\']', line)
            if match:
                current_slug = match.group(1)
                
        # Capture Title
        elif stripped.startswith('title:'):
            match = re.search(r'title:\s*["\'](.*?)["\']', line)
            if match:
                current_title = match.group(1)
        
        # Capture Type (though this usually comes AFTER image in this file, we might default expert-insights if we don't have it yet, or infer from slug)
        # Note: In the previous file prints, `type` was often after `image`.
        # However, our logic relies on `type` for one rule. 
        # Since we can't look ahead easily in a single pass, we'll rely on slug/title for 'expert' detection mostly,
        # OR we can assume if it hasn't matched other specific themes, we check if it LOOKS like an expert insight.
        
        # Update Image
        elif stripped.startswith('image:'):
            # Calculate new image
            new_image = get_smart_image(current_title, current_slug, "unknown")
            
            # Preserve indentation
            indentation = line[:line.find('image:')]
            new_lines.append(f'{indentation}image: "{new_image}",')
            continue # Skip adding the old line

        new_lines.append(line)

    # Write back
    with open(BLOG_POSTS_PATH, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))
        
    print("Successfully updated blog images.")

if __name__ == "__main__":
    main()
