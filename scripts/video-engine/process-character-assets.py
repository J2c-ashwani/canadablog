#!/usr/bin/env python3
import os
import sys
from PIL import Image

def make_transparent(input_path, output_path, threshold=245):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        # If pixel is near white
        r, g, b, a = item
        if r > threshold and g > threshold and b > threshold:
            # Fully transparent
            new_data.append((255, 255, 255, 0))
        elif r > threshold - 20 and g > threshold - 20 and b > threshold - 20:
            # Soft antialiasing edge
            avg = (r + g + b) / 3.0
            alpha = int(255 * (1.0 - (avg - (threshold - 20)) / 20.0))
            new_data.append((r, g, b, max(0, min(255, alpha))))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"✅ Saved transparent PNG: {output_path}")

def main():
    target_dir = os.path.join(os.path.dirname(__file__), "assets", "character")
    os.makedirs(target_dir, exist_ok=True)

    sources = [
        ("/Users/ashwanikumar/.gemini/antigravity/brain/28653df2-9c0a-4ce2-9071-78bd0c0d6216/canadian_founder_pose1_confused_1794224998728.jpg", "pose1-confused.png"),
        ("/Users/ashwanikumar/.gemini/antigravity/brain/28653df2-9c0a-4ce2-9071-78bd0c0d6216/canadian_founder_pose2_warning_1794225020224.jpg", "pose2-warning.png"),
        ("/Users/ashwanikumar/.gemini/antigravity/brain/28653df2-9c0a-4ce2-9071-78bd0c0d6216/canadian_founder_pose3_solution_1794225052378.jpg", "pose3-solution.png"),
    ]

    for src, name in sources:
        dst = os.path.join(target_dir, name)
        make_transparent(src, dst)

if __name__ == "__main__":
    main()
