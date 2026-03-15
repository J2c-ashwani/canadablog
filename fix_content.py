import pathlib
import re

path = pathlib.Path('lib/data/blogPosts.js')
text = path.read_text()

# Find the content for the Black female entrepreneurs post
start = text.find('slug: "top-10-no-equity-grants-black-female-entrepreneurs"')
if start == -1:
    print("Slug not found")
    exit(1)

content_start = text.find('content: `', start)
if content_start == -1:
    print("Content start not found")
    exit(1)

faq_start = text.find('faq: [', content_start)
if faq_start == -1:
    print("Faq not found")
    exit(1)

print(f"content_start: {content_start}, faq_start: {faq_start}")
content_end = text.rfind('`,', content_start, faq_start)
print(f"content_end: {content_end}")
if content_end == -1:
    print("Content end not found")
    exit(1)

# Extract the content string
content_str = text[content_start:content_end + 2]
print(f"content_str end: {repr(content_str[-10:])}")

# Get the inner string
inner_start = content_str.find('`') + 1
inner_end = content_str.rfind('`')
inner = content_str[inner_start:inner_end]

# Unescape
inner = inner.replace('\\"', '"')
inner = inner.replace('\\n', '\n')

# New content
new_content = f'        content: `\n{inner}\n`,'

# Replace
new_text = text[:content_start] + new_content + text[content_end + 2:]

path.write_text(new_text)
print("Fixed")