import glob
import re
import os

provinces = ['alberta', 'british-columbia', 'manitoba', 'new-brunswick', 'nova-scotia', 'ontario', 'quebec', 'saskatchewan']

def title_case(s):
    return ' '.join(word.capitalize() for word in s.replace('-', ' ').split())

for prov in provinces:
    path = f"app/canada/{prov}/page.tsx"
    if not os.path.exists(path): continue
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'ShortAnswerBox' in content: continue

    imports = """
import { EEATBadge } from "@/components/blog/EEATBadge"
import { ShortAnswerBox } from "@/components/blog/ShortAnswerBox"
import { EligibleCheck } from "@/components/blog/EligibleCheck"
import { InlineCTA } from "@/components/blog/InlineCTA"
"""
    content = re.sub(r'(import .*?\n)(?=export const metadata)', r'\1' + imports, content, count=1)
    
    name = title_case(prov)
    if prov == 'british-columbia': name = 'British Columbia'
    
    short_answer = f"{name} provides hundreds of millions in provincial government grants and funding programs for startups, small businesses, and expanding enterprises in 2026."
    
    h1_regex = r'(<h1[^>]*>.*?</h1>\s*<p[^>]*>.*?</p>)'
    
    replacement = f"""\\1
            <div className="mt-4">
              <ShortAnswerBox content="{short_answer}" />
            </div>
            <div className="mt-4 mb-8 flex justify-center">
              <EEATBadge authorName="Ashwani K." authorImage="/ash-author-1.jpg" date="2026-02-09" />
            </div>
            <div className="mt-8 mb-8">
              <EligibleCheck />
            </div>"""
            
    content = re.sub(h1_regex, replacement, content, count=1, flags=re.DOTALL)
    
    cta_regex = r'(<div className="grid lg:grid-cols-3 gap-8 mb-12">)'
    cta_injection = f"""
          <div className="mb-12">
            <InlineCTA 
                title="Need Strategy for {name} Grants?"
                description="Our specialists can help you navigate {name}'s provincial programs."
                buttonText="Get Funding Assistance"
                buttonLink="/contact"
            />
          </div>
          \\1"""
          
    content = re.sub(cta_regex, cta_injection, content, count=1)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Injected E-E-A-T components into {prov}")

