import re
import sys

def generate_eeat_data(title, excerpt, metrics_text, is_guide):
    # Extract some basic info for short answer
    amount = "various funding amounts"
    if "Up to" in metrics_text:
        match = re.search(r"Up to \$[\d\.]+M?", metrics_text)
        if match: amount = match.group(0).lower()
        else:
            match = re.search(r"\$[\d\.]+M?", metrics_text)
            if match: amount = match.group(0)

    # Clean title for CTA
    clean_title = re.sub(r'\s*[\-\|].*$', '', title).strip()
    if len(clean_title) > 50:
        clean_title = "these " + ("grants" if not is_guide else "programs")
    
    # Generate generic but accurate short answer based on excerpt
    doc_type = "complete guide" if is_guide else "article"
    
    if len(excerpt) > 20:
        first_sentence = excerpt.split('. ')[0] + '.'
        short_answer = f"Yes — {first_sentence} Funding amounts average {amount} for eligible applicants. Our {doc_type} covers the application process and specific eligibility requirements."
    else:
        short_answer = f"Yes — {clean_title} provide {amount} to eligible businesses. Our {doc_type} covers the application process, deadlines, and specific eligibility requirements."

    jump_links = """[
      { title: 'Programs', id: 'programs' },
      { title: 'Eligibility', id: 'eligibility' },
      { title: 'How to Apply', id: 'how-to-apply' },
      { title: 'FAQ', id: 'faq' }
    ]"""
    
    inline_cta_desc = f"Get matched with the right alternative or direct funding for {clean_title} — our specialists navigate the complex federal and provincial channels for you."
    if is_guide:
        inline_cta_desc = f"Need expert help securing {clean_title}? Our grant writers have successfully secured millions in non-dilutive funding for businesses like yours."
        
    inline_cta = f"""{{
      description: "{inline_cta_desc}",
    }}"""
    
    return short_answer, jump_links, inline_cta

def process_file(filepath, is_guide):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by object boundaries
    parts = content.split('  {\n    id: ')
    if len(parts) == 1:
        # fallback split
        parts = content.split('  {\n        id: ')
    
    out_parts = [parts[0]]
    count_injected = 0
    
    for i in range(1, len(parts)):
        # Re-attach split delimiter
        delimiter = '  {\n    id: ' if '  {\n    id: ' in content else '  {\n        id: '
        part = delimiter + parts[i]
        
        # If already has shortAnswer, skip
        if 'shortAnswer:' in part:
            out_parts.append(part)
            continue
            
        # Extract fields
        title_match = re.search(r'title:\s*"([^"]+)"', part)
        excerpt_match = re.search(r'excerpt:\s*"([^"]+)"', part)
        
        metrics_text = ""
        metrics_match = re.search(r'metrics:\s*\[(.*?)\]', part, re.DOTALL)
        if metrics_match:
            metrics_text = metrics_match.group(1)
            
        title = title_match.group(1) if title_match else "these programs"
        excerpt = excerpt_match.group(1) if excerpt_match else "This program offers substantial funding."
        
        short_answer, jump_links, inline_cta = generate_eeat_data(title, excerpt, metrics_text, is_guide)
        
        # Inject before the final closing brace of the object
        idx = part.rfind('\n  }')
        if idx == -1:
             idx = part.rfind('\n    }')
            
        if idx != -1:
            injection = f"""
    shortAnswer: "{short_answer}",
    jumpLinks: {jump_links},
    eligibleCheck: true,
    inlineCTA: {inline_cta},
"""
            part = part[:idx] + injection + part[idx:]
            count_injected += 1
            
        out_parts.append(part)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write("".join(out_parts))
        
    print(f"Successfully injected {count_injected} missing posts in {filepath}.")

process_file('lib/data/blogPosts.ts', False)
process_file('lib/data/guides.ts', True)

