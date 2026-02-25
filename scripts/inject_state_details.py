import re
import sys

def inject_eeat(filepath):
    print(f"Processing {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add properties to the interface if not already there
    if 'shortAnswer?: string;' not in content:
        print("Injecting interface fields...")
        interface_insert = """
    // E-E-A-T Components
    shortAnswer?: string;
    eligibleCheck?: boolean;
    inlineCTA?: {
        title?: string;
        description: string;
        buttonText?: string;
        buttonLink?: string;
    };"""
        content = re.sub(
            r'(export interface (StateDetailedGrant|ProvincialGrant).*?)(\n\})',
            r'\1' + interface_insert + r'\3',
            content,
            flags=re.MULTILINE | re.DOTALL,
            count=1
        )

    # Find the main array (e.g. export const stateDetails: StateDetailedGrant[] = [ )
    # We will split the file into chunks matching `    {` (with 4 spaces)
    lines = content.split('\n')
    new_lines = []
    
    in_entry = False
    current_name = ""
    current_total = "$0"
    current_count = "0"
    current_time = "N/A"
    
    for i in range(len(lines)):
        line = lines[i]
        
        # Extract data to build short answer
        if re.search(r"^\s*name:\s*['\"]([^'\"]+)['\"]", line):
            current_name = re.search(r"^\s*name:\s*['\"]([^'\"]+)['\"]", line).group(1)
        if re.search(r"^\s*totalFunding:\s*['\"]([^'\"]+)['\"]", line):
            current_total = re.search(r"^\s*totalFunding:\s*['\"]([^'\"]+)['\"]", line).group(1)
        if re.search(r"^\s*programCount:\s*['\"]([^'\"]+)['\"]", line):
            current_count = re.search(r"^\s*programCount:\s*['\"]([^'\"]+)['\"]", line).group(1)
        if re.search(r"^\s*avgProcessingTime:\s*['\"]([^'\"]+)['\"]", line):
            current_time = re.search(r"^\s*avgProcessingTime:\s*['\"]([^'\"]+)['\"]", line).group(1)

        # Skip if already injected
        if re.search(r"^\s*shortAnswer:", line):
            print(f"Already injected for {current_name}")
            
        # Inject right before overview: {
        if re.search(r"^\s*overview:\s*\{", line):
            # Check if previous lines already have it
            prev_content = "\n".join(lines[max(0, i-5):i])
            if 'shortAnswer:' not in prev_content:
                indent = re.match(r"^\s*", line).group(0)
                
                injection = f"""{indent}shortAnswer: "{current_name} offers {current_total} in small business funding through {current_count} active programs. The average processing time is {current_time}.",
{indent}eligibleCheck: true,
{indent}inlineCTA: {{
{indent}    title: "Need expert help applying for {current_name} grants?",
{indent}    description: "Our funding specialists can help you navigate {current_name}'s government programs and maximize your funding potential.",
{indent}    buttonText: "Get Funding Assistance",
{indent}    buttonLink: "/contact"
{indent}}},
"""
                new_lines.append(injection.rstrip('\n'))
                print(f"Injected data for {current_name}")
        
        new_lines.append(line)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))
    print(f"Finished processing {filepath}\n")

inject_eeat('lib/data/stateDetails.ts')
inject_eeat('lib/data/provincialDetails.ts')
