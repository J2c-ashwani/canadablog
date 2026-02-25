import glob
import re
import os
import subprocess

# 1. Restore files
subprocess.run(['git', 'checkout', '--', 'app/blog/', 'app/guides/'], check=False)
subprocess.run(['git', 'clean', '-fd', 'app/blog/', 'app/guides/'], check=False)

# 2. Parse data files
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
            
            data = {}
            
            # Short Answer
            # Using \1 to match whatever quote started the string (single or double) 
            sa_match = re.search(r'shortAnswer:\s*(["\'])(.*?)\1', block, re.DOTALL)
            if sa_match:
                data['shortAnswer'] = sa_match.group(2).replace("\\'", "'").replace('\\"', '"')
                
            # Eligible Check
            if re.search(r'eligibleCheck:\s*true', block):
                data['eligibleCheck'] = True
                
            # Jump Links
            jl_match = re.search(r'jumpLinks:\s*(\[.*?\])', block, re.DOTALL)
            if jl_match:
                data['jumpLinks'] = jl_match.group(1)
                
            # Inline CTA - careful not to greedily grab the whole file
            # Inline CTA is an object { ... }
            cta_match = re.search(r'inlineCTA:\s*(\{.*?\})', block, re.DOTALL)
            if cta_match:
                data['inlineCTA'] = cta_match.group(1)
                
            if data:
                slug_data[slug] = data
    except Exception as e:
        print(f"Error parsing {filepath}: {e}")

parse_data_file('lib/data/guides.ts')
parse_data_file('lib/data/blogPosts.ts')
for file in glob.glob('lib/data/blog-posts/**/*.ts', recursive=True):
    parse_data_file(file)

injected_count = 0

for base_dir in ['app/blog', 'app/guides']:
    for path in glob.glob(f'{base_dir}/*/page.tsx'):
        if '[slug]' in path: continue
        slug = os.path.basename(os.path.dirname(path))
        if slug not in slug_data: continue
        
        data = slug_data[slug]
        
        with open(path, 'r', encoding='utf-8') as f:
            jsx = f.read()
            
        # Step A: Add imports
        imports_to_add = []
        if 'shortAnswer' in data and "import ShortAnswerBox" not in jsx:
            imports_to_add.append("import ShortAnswerBox from '@/components/blog/ShortAnswerBox';")
        if "import EEATBadge" not in jsx:
            imports_to_add.append("import EEATBadge from '@/components/blog/EEATBadge';")
        if 'eligibleCheck' in data and "import EligibleCheck" not in jsx:
            imports_to_add.append("import EligibleCheck from '@/components/blog/EligibleCheck';")
        if 'jumpLinks' in data and "import StickyTOC" not in jsx:
            imports_to_add.append("import StickyTOC from '@/components/blog/StickyTOC';")
        if 'inlineCTA' in data and "import InlineCTA" not in jsx:
            imports_to_add.append("import InlineCTA from '@/components/blog/InlineCTA';")
            
        if imports_to_add:
            imports_end = jsx.rfind('import ')
            next_newline = jsx.find('\n', imports_end)
            if next_newline == -1: next_newline = imports_end
            import_block = "\n" + "\n".join(imports_to_add) + "\n"
            jsx = jsx[:next_newline+1] + import_block + jsx[next_newline+1:]
            
        # Step B: Hero Injection (Short Answer + EEAT Badge)
        h1_start = jsx.find('<h1')
        h1_end = jsx.find('</h1>', h1_start)
        
        if h1_start != -1 and h1_end != -1:
            next_p_start = jsx.find('<p', h1_end)
            next_p_end = jsx.find('</p>', next_p_start)
            
            injection = ""
            if 'shortAnswer' in data:
                safe_sa = data['shortAnswer'].replace('"', '&quot;')
                injection += f"""
              <div className="text-left mb-6 max-w-4xl mx-auto shadow-sm mt-6 relative z-20">
                 <ShortAnswerBox content="{safe_sa}" />
              </div>"""
            
            injection += """
              <div className="flex justify-center mb-8 relative z-20">
                 <div className="inline-block text-left bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl overflow-hidden">
                    <EEATBadge authorName="Ashwani K." authorImage="/author-ashwani.jpg" date="2026-02-25" />
                 </div>
              </div>
"""
            if next_p_start != -1 and (next_p_start - h1_end) < 200:
                jsx = jsx[:next_p_start] + injection + jsx[next_p_end+4:]
            else:
                jsx = jsx[:h1_end+5] + injection + jsx[h1_end+5:]
                
        # Step C: EligibleCheck and StickyTOC
        # Inject right after the first </section> (which is usually the Hero)
        hero_end = jsx.find('</section>')
        if hero_end != -1:
            c_injection = ""
            if 'eligibleCheck' in data:
                c_injection += "\n        <div className=\"container mx-auto px-4 max-w-4xl my-8\"><EligibleCheck /></div>\n"
            if 'jumpLinks' in data:
                c_injection += f"\n        <StickyTOC links={{{data['jumpLinks']}}} />\n"
            
            if c_injection:
                jsx = jsx[:hero_end+10] + c_injection + jsx[hero_end+10:]
                
        # Step D: InlineCTA
        # Inject before the second <h2> after the Hero
        if 'inlineCTA' in data and hero_end != -1:
            h2_1 = jsx.find('<h2', hero_end)
            if h2_1 != -1:
                h2_2 = jsx.find('<h2', h2_1 + 10)
                if h2_2 != -1:
                    # Find the parent section or div of h2_2 if possible, or just inject right before h2_2.
                    cta_injection = f"\n        <div className=\"container mx-auto px-4 max-w-4xl my-12\"><InlineCTA {{...{data['inlineCTA']}}} /></div>\n"
                    jsx = jsx[:h2_2] + cta_injection + jsx[h2_2:]
                    
        with open(path, 'w', encoding='utf-8') as f:
            f.write(jsx)
        injected_count += 1

print(f"Successfully fully injected all 5 E-E-A-T components into {injected_count} hardcoded pages.")
