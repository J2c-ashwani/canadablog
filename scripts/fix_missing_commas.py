import os
import re

def fix_commas(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find places where shortAnswer is preceded by a backtick or closing brace without a comma
    # For example: `\n    shortAnswer:` or `}\n    shortAnswer:`
    
    # regex: match anything that ends a value (like `, `, `,`, `"`, `'`, "`", `}`, `]`) followed by whitespace and `shortAnswer:`
    # Wait, the easiest way is to look for `\s+shortAnswer:` and check the preceding non-whitespace character.
    # If it's not a comma, insert a comma.
    
    def replacer(match):
        prev_chars = match.group(1)
        # Check if the last non-whitespace char is a comma
        if prev_chars.strip() and prev_chars.strip()[-1] != ',':
            return prev_chars.rstrip() + ',' + prev_chars[len(prev_chars.rstrip()):] + "shortAnswer:"
        return match.group(0)

    # find any character sequence ending in whitespace followed by `shortAnswer:`
    new_content = re.sub(r'([^,])(\s+)shortAnswer:', r'\1,\2shortAnswer:', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print(f"Fixed commas in {filepath}")

fix_commas('lib/data/blogPosts.ts')
fix_commas('lib/data/guides.ts')
