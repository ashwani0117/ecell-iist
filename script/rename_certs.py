import re
import csv
from pathlib import Path
from collections import Counter
from PIL import Image
import pytesseract

# Configure tesseract path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

cert_dir = Path(r"C:\Users\ashwa\OneDrive\Desktop\Secure-Link-Access\client\public\certificates")

def extract_participant_name(img_path):
    """Extract participant name from certificate image."""
    try:
        img = Image.open(img_path)
    except Exception as e:
        print(f"  ERROR: Failed to open image - {e}")
        return None

    # OCR to get all text
    text = pytesseract.image_to_string(img)
    lines = text.splitlines()
    
    # Find "This is to certify that" or similar variations
    certify_index = -1
    for i, line in enumerate(lines):
        if "certify" in line.lower() and "that" in line.lower():
            certify_index = i
            break
    
    if certify_index == -1:
        print(f"  WARNING: 'This is to certify that' not found")
        return None
    
    # Get the next non-empty line after "This is to certify that"
    for i in range(certify_index + 1, len(lines)):
        line = lines[i].strip()
        if line and len(line) > 2:  # Skip empty or very short lines
            # Clean up the name (remove special characters, extra spaces)
            name = re.sub(r'[^A-Za-z\s]', '', line)
            name = re.sub(r'\s+', ' ', name).strip()
            if name and len(name) > 3:  # Ensure we have a valid name
                return name
    
    print(f"  WARNING: Could not find participant name after certify line")
    return None

rename_map = []
seen_names = Counter()

jpgs = sorted(cert_dir.glob("*.jpg"))
print(f"Found {len(jpgs)} JPG files to process.\n")

for idx, img_path in enumerate(jpgs, start=1):
    print(f"[{idx}/{len(jpgs)}] Processing: {img_path.name}")
    
    name = extract_participant_name(img_path)
    
    if not name:
        rename_map.append((img_path.name, "", "NO_NAME_FOUND"))
        print(f"  -> NO_NAME_FOUND")
        continue
    
    print(f"  -> Found name: {name}")
    
    # Normalize: Title Case and replace spaces with underscores
    name_normalized = "_".join(name.split())
    base = name_normalized
    
    # Handle duplicates
    seen_names[base] += 1
    suffix = f"_{seen_names[base]}" if seen_names[base] > 1 else ""
    new_name = f"{base}{suffix}.jpg"
    new_path = img_path.with_name(new_name)
    
    # Avoid overwriting existing files
    if new_path.exists() and new_path != img_path:
        rename_map.append((img_path.name, new_name, "TARGET_EXISTS"))
        print(f"  -> TARGET_EXISTS (skipped)")
        continue
    
    # Rename
    try:
        img_path.rename(new_path)
        rename_map.append((img_path.name, new_name, "RENAMED"))
        print(f"  -> RENAMED to: {new_name}")
    except Exception as e:
        rename_map.append((img_path.name, new_name, f"ERROR: {e}"))
        print(f"  -> ERROR: {e}")

# Write mapping file
map_path = cert_dir / "rename_map.csv"
with map_path.open("w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["old_name", "new_name", "status"])
    writer.writerows(rename_map)

print(f"\n✓ Processed {len(rename_map)} files")
print(f"✓ Mapping saved to: {map_path}")
print("\nSummary:")
from collections import Counter as C
for status, count in C([s for _,_,s in rename_map]).items():
    print(f"  {status}: {count}")
