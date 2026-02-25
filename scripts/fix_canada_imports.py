import glob
import re
import os

provinces = ['alberta', 'british-columbia', 'manitoba', 'new-brunswick', 'nova-scotia', 'ontario', 'quebec', 'saskatchewan']

for prov in provinces:
    path = f"app/canada/{prov}/page.tsx"
    if not os.path.exists(path): continue
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace named imports with default ones
    content = content.replace('import { EEATBadge } from "@/components/blog/EEATBadge"', 'import EEATBadge from "@/components/blog/EEATBadge"')
    content = content.replace('import { ShortAnswerBox } from "@/components/blog/ShortAnswerBox"', 'import ShortAnswerBox from "@/components/blog/ShortAnswerBox"')
    content = content.replace('import { EligibleCheck } from "@/components/blog/EligibleCheck"', 'import EligibleCheck from "@/components/blog/EligibleCheck"')
    content = content.replace('import { InlineCTA } from "@/components/blog/InlineCTA"', 'import InlineCTA from "@/components/blog/InlineCTA"')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Fixed imports for {prov}")
