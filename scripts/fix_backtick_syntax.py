import re

def fix_syntax(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Look for anything ending in ` \n    shortAnswer:
    # and not having a comma
    
    # regex: match a character that is NOT a comma, then whitespace, then shortAnswer:
    # We replace it by adding a comma.
    
    def replacer(match):
        char = match.group(1)
        ws = match.group(2)
        if char != ',':
            return char + ',' + ws + "shortAnswer:"
        return match.group(0)

    new_content = re.sub(r'([^,])(\s+)(shortAnswer:)', replacer, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print(f"Fixed syntax in {filepath}")

fix_syntax('lib/data/blogPosts.ts')
fix_syntax('lib/data/guides.ts')
