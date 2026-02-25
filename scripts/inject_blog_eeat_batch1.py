import re
import sys

def generate_eeat_data(title, excerpt, metrics_text):
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
        clean_title = clean_title.split(' Grants')[0] + ' Grants'
    
    # Generate generic but accurate short answer based on excerpt
    short_answer = f"Yes — {clean_title} programs provide {amount} to eligible businesses. Our complete guide covers the application process, deadlines, and specific eligibility requirements."
    
    # If excerpt has more detail, use it to flesh out short answer
    if len(excerpt) > 20:
        # Just use a smart truncation of excerpt
        first_sentence = excerpt.split('. ')[0] + '.'
        short_answer = f"{first_sentence} Funding amounts average {amount} for eligible applicants."

    jump_links = """[
      { title: 'Programs', id: 'programs' },
      { title: 'Eligibility', id: 'eligibility' },
      { title: 'How to Apply', id: 'how-to-apply' },
      { title: 'FAQ', id: 'faq' }
    ]"""
    
    inline_cta = f"""{{
      description: "Get matched with the right alternative or direct funding for {clean_title} — our specialists navigate the complex federal and provincial channels for you.",
    }}"""
    
    return short_answer, jump_links, inline_cta

def main():
    filepath = 'lib/data/blogPosts.ts'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by object boundaries
    parts = content.split('  {\n    id: ')
    
    out_parts = [parts[0]]
    count_injected = 0
    target_batch_size = 30
    
    for i in range(1, len(parts)):
        part = '  {\n    id: ' + parts[i]
        
        # If already has shortAnswer, skip
        if 'shortAnswer:' in part:
            out_parts.append(part)
            continue
            
        if count_injected >= target_batch_size:
            out_parts.append(part)
            continue
            
        # Needs injection
        title_match = re.search(r'title:\s*"([^"]+)"', part)
        excerpt_match = re.search(r'excerpt:\s*"([^"]+)"', part)
        
        # Also let's extract metrics
        metrics_text = ""
        metrics_match = re.search(r'metrics:\s*\[(.*?)\]', part, re.DOTALL)
        if metrics_match:
            metrics_text = metrics_match.group(1)
            
        title = title_match.group(1) if title_match else "these grants"
        excerpt = excerpt_match.group(1) if excerpt_match else ""
        
        short_answer, jump_links, inline_cta = generate_eeat_data(title, excerpt, metrics_text)
        
        # Clean up existing part to safely inject before the end
        # Find the last closing brace of the object
        # Since part ends with '  },\n' or '  }\n];', we can insert before it
        
        # Let's insert right after the faq or expertTip, or just before the end of the object
        # The safest way is to replace `\n  },\n` with the new properties
        
        # Note: part might end with `\n  }\n];` for the very last item.
        
        injection = f"""
    shortAnswer: "{short_answer}",
    jumpLinks: {jump_links},
    eligibleCheck: true,
    inlineCTA: {inline_cta},
"""
        # Replace the last occurrence of "\n  }" (before the comma or semicolon)
        # Using rfind
        idx = part.rfind('\n  }')
        if idx != -1:
            part = part[:idx] + injection + part[idx:]
            count_injected += 1
            print(f"[{count_injected}] Injected: {title}")
            
        out_parts.append(part)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write("".join(out_parts))
        
    print(f"Successfully injected {count_injected} posts in this batch.")

if __name__ == "__main__":
    main()
