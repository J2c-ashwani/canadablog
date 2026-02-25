import os
import re

provinces = ['alberta', 'british-columbia', 'manitoba', 'new-brunswick', 'nova-scotia', 'ontario', 'quebec', 'saskatchewan']

imports = """
import EEATBadge from "@/components/blog/EEATBadge"
import ShortAnswerBox from "@/components/blog/ShortAnswerBox"
import EligibleCheck from "@/components/blog/EligibleCheck"
import InlineCTA from "@/components/blog/InlineCTA"
"""

for prov in provinces:
    path = f"app/canada/{prov}/page.tsx"
    if not os.path.exists(path): continue
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if already imported
    if "import EEATBadge" in content:
        continue
        
    # Inject imports at the very beginning of the file, right after the first line
    lines = content.split('\n')
    lines.insert(1, imports.strip())
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    
    print(f"Added imports to {prov}")
