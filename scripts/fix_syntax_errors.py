import os
import re

def fix_commas(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Remove duplicate/floating commas
    # We want to change things like:
    # `},\n,    shortAnswer:` into `},\n    shortAnswer:`
    
    # Let's just find any `,\s*,` and turn it into `,`
    content = re.sub(r',\s*,', ',', content)
    
    # If there is `\n,` or `\n    ,` let's strip it
    content = re.sub(r'\n\s*,\s*shortAnswer:', '\n    shortAnswer:', content)
    
    # Wait, the problem is right now we have:
    # 1. Places that correctly have `\n    shortAnswer:` but the PREVIOUS line lacks a comma.
    # 2. Places that have `\n    shortAnswer:` and the previous line HAS a comma.
    
    # Start fresh by removing ALL floating commas before shortAnswer
    content = re.sub(r',\s*shortAnswer:', ' shortAnswer:', content)
    # Now all shortAnswers have NO immediately preceding comma. They just look like `\n    shortAnswer:`
    
    # Now, look backwards from `\n    shortAnswer:` to the first non-whitespace character.
    # If it is NOT a comma, insert a comma.
    
    def add_comma(match):
        text_before = match.group(1)
        whitespace = match.group(2)
        if text_before[-1] != ',':
            return text_before + ',' + whitespace + "shortAnswer:"
        return match.group(0)

    # Match any non-whitespace, followed by whitespace, followed by shortAnswer:
    content = re.sub(r'(\S)(\s+)shortAnswer:', add_comma, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Cleaned up commas in {filepath}")

fix_commas('lib/data/blogPosts.ts')
fix_commas('lib/data/guides.ts')
