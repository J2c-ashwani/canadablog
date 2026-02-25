import glob
import re
import os

# 1. Parse data files to extract shortAnswer map
slug_data = {}

def parse_data_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Match objects that have slug and shortAnswer properties.
        # This matches everything between { ... } roughly
        # It's better to find slug and then look forward/backward for shortAnswer in the same block.
        blocks = re.split(r'slug:\s*["\']', content)
        for i in range(1, len(blocks)):
            block = blocks[i]
            slug_match = re.match(r'^([^"\']+)["\']', block)
            if not slug_match:
                continue
            slug = slug_match.group(1)
            
            # Find shortAnswer in the same block (up to the next slug or end of object)
            sa_match = re.search(r'shortAnswer:\s*["\'](.*?)["\']', block, re.DOTALL)
            if sa_match:
                # remove any trailing slash escapes or newlines
                sa = sa_match.group(1).replace("\\'", "'").replace('\\"', '"')
                slug_data[slug] = sa
    except Exception as e:
        print(f"Error reading {filepath}: {e}")

parse_data_file('lib/data/guides.ts')
parse_data_file('lib/data/blogPosts.ts')
# Also parse the individual files in blog-posts directory since we use dynamic imports for many.
for file in glob.glob('lib/data/blog-posts/**/*.ts', recursive=True):
    parse_data_file(file)

print(f"Found shortAnswer data for {len(slug_data)} slugs.")

# 2. Iterate through all page.tsx in app/blog and app/guides
injected_count = 0
skipped_no_data = 0
skipped_already_injected = 0

for base_dir in ['app/blog', 'app/guides']:
    for path in glob.glob(f'{base_dir}/*/page.tsx'):
        if '[slug]' in path:
            continue
            
        slug = os.path.basename(os.path.dirname(path))
        
        if slug not in slug_data:
            skipped_no_data += 1
            continue
            
        shortAnswer = slug_data[slug]
        
        with open(path, 'r', encoding='utf-8') as f:
            jsx = f.read()
            
        if 'ShortAnswerBox' in jsx:
            skipped_already_injected += 1
            continue
            
        # Needs injection
        # Step A: Add import if needed
        if "import ShortAnswerBox" not in jsx:
            # Find the last import
            imports_end = jsx.rfind('import ')
            next_newline = jsx.find('\n', imports_end)
            if next_newline == -1: next_newline = imports_end
            
            jsx = jsx[:next_newline+1] + "import ShortAnswerBox from '@/components/blog/ShortAnswerBox';\n" + jsx[next_newline+1:]
            
        # Step B: Find hero injection point.
        # Usually it's right after the </p> that follows <h1 ...>
        # Let's find the first <h1
        h1_start = jsx.find('<h1')
        if h1_start == -1:
            print(f"Warning: No <h1> found in {path}")
            continue
            
        h1_end = jsx.find('</h1>', h1_start)
        if h1_end == -1:
            continue
            
        # Now find the ending of the immediate next <p> block, or if there's no <p> block, just inject after </h1>
        next_p_start = jsx.find('<p', h1_end)
        next_button_start = jsx.find('<Button', h1_end)
        next_div_flex = jsx.find('<div className="flex', h1_end)
        
        # We want to inject BEFORE the first Button or flex container that appears after the H1/P
        # Find the earliest element that typically follows the hero description
        injection_candidates = []
        if next_button_start != -1: injection_candidates.append(next_button_start)
        if next_div_flex != -1: injection_candidates.append(next_div_flex)
        
        if not injection_candidates:
            # Fallback: Just inject right after the </p> or </h1>
            next_p_end = jsx.find('</p>', h1_end)
            if next_p_end != -1 and next_p_end - h1_end < 1000:
                inject_pos = next_p_end + 4
            else:
                inject_pos = h1_end + 5
        else:
            inject_pos = min(injection_candidates)

        # Build injection string
        # We need to escape any quotes in shortAnswer
        safe_sa = shortAnswer.replace('"', '&quot;')
        injection = f"""
              <div className="text-left mb-8 max-w-4xl mx-auto shadow-sm">
                 <ShortAnswerBox content="{safe_sa}" />
              </div>
"""
        
        jsx = jsx[:inject_pos] + injection + jsx[inject_pos:]
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(jsx)
            
        injected_count += 1
        print(f"Injecting into {slug}")

print("---")
print(f"Successfully injected: {injected_count}")
print(f"Skipped (No Data): {skipped_no_data}")
print(f"Skipped (Already Injected): {skipped_already_injected}")
