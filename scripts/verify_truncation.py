import glob
import re
import os

slug_data = {}

def parse_data_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        blocks = re.split(r'slug:\s*["\']', content)
        for i in range(1, len(blocks)):
            block = blocks[i]
            slug_match = re.match(r'^([^"\']+)["\']', block)
            if not slug_match: continue
            slug = slug_match.group(1)
            
            # Using \1 to match whatever quote started the string (single or double) 
            sa_match = re.search(r'shortAnswer:\s*(["\'])(.*?)\1', block, re.DOTALL)
            if sa_match:
                slug_data[slug] = sa_match.group(2).replace("\\'", "'").replace('\\"', '"')
    except Exception as e:
        pass

parse_data_file('lib/data/guides.ts')
parse_data_file('lib/data/blogPosts.ts')
for file in glob.glob('lib/data/blog-posts/**/*.ts', recursive=True):
    parse_data_file(file)

mismatches = 0
checked = 0

for base_dir in ['app/blog', 'app/guides']:
    for path in glob.glob(f'{base_dir}/*/page.tsx'):
        if '[slug]' in path: continue
        slug = os.path.basename(os.path.dirname(path))
        if slug not in slug_data: continue
        
        expected_text = slug_data[slug].replace('"', '&quot;')
        
        with open(path, 'r', encoding='utf-8') as f:
            jsx = f.read()
            
        # extract what was injected
        injected_match = re.search(r'<ShortAnswerBox\s+content="([^"]*)"', jsx)
        if injected_match:
            checked += 1
            actual_text = injected_match.group(1)
            if actual_text != expected_text:
                mismatches += 1
                print(f"MISMATCH IN {slug}:")
                print(f"EXPECTED length: {len(expected_text)}")
                print(f"ACTUAL length: {len(actual_text)}")
                print(f"DIFF: {expected_text[len(actual_text):]}")
                print("---")

print(f"Checked {checked} hardcoded pages.")
if mismatches == 0:
    print("SUCCESS: 0 truncations found. All injected text matches the database perfectly.")
else:
    print(f"Found {mismatches} mismatches.")
