import os
import sys
import re
import json

try:
    from PIL import Image, ImageOps
except ImportError:
    os.system(f'"{sys.executable}" -m pip install Pillow')
    from PIL import Image, ImageOps

try:
    import pillow_heif
except ImportError:
    os.system(f'"{sys.executable}" -m pip install pillow-heif')
    import pillow_heif

pillow_heif.register_heif_opener()

input_dir = r"D:\vs\VScode\WebDev\Abhinay-IIITP-Web\public\team\Abhinay members ( updated on 15-03-26 )"
output_dir = r"D:\vs\VScode\WebDev\Abhinay-IIITP-Web\public\team\members"

os.makedirs(output_dir, exist_ok=True)

# Delete existing processed images first to avoid stale
for f in os.listdir(output_dir):
    os.remove(os.path.join(output_dir, f))

members = []

for filename in os.listdir(input_dir):
    filepath = os.path.join(input_dir, filename)
    if not os.path.isfile(filepath):
        continue
    
    name, ext = os.path.splitext(filename)
    if ext.lower() not in ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif']:
        continue
    
    print(f"Processing {filename}...")
    
    batch_str = "Unknown"
    base_name = name
    
    # regex to catch batch like (2025-29) or 2024-2028 or 23-27
    m = re.search(r'\(?(\d{2,4})[^\d]+(\d{2,4})\)?', name)
    if m:
        start_year = m.group(1)
        end_year = m.group(2)
        if len(start_year) == 2: start_year = "20" + start_year
        if len(end_year) == 2: end_year = "20" + end_year
        if len(start_year) == 4 and len(end_year) == 4:
            batch_str = f"{start_year}-{end_year}"
            base_name = name[:m.start()].strip()
            
    # Clean up base_name
    # remove text like "(1)" or "Actor" or "Club Head"
    base_name = re.sub(r'\(\d+\)', '', base_name)
    base_name = base_name.replace("Actor", "").replace("Club Head", "").replace("Acting Head", "").replace("_", " ").strip()
    base_name = re.sub(r'[^a-zA-Z\s]', ' ', base_name)
    base_name = " ".join([word.capitalize() for word in base_name.split()])

    if not base_name:
        base_name = filename
    
    clean_name = base_name.lower().replace(" ", "_")
    output_filename = f"{clean_name}_{batch_str}.webp".replace(" ", "")
    output_path = os.path.join(output_dir, output_filename)
    
    try:
        with Image.open(filepath) as img:
            img = ImageOps.exif_transpose(img)
            if img.mode != 'RGB':
                img = img.convert('RGB')
            # Resize
            img.thumbnail((400, 400)) # passport size usually doesn't need to be huge
            img.save(output_path, "WEBP", quality=85)
            
            members.append({
                "name": base_name,
                "batch": batch_str,
                "image": f"/team/members/{output_filename}"
            })
    except Exception as e:
        print(f"Failed to process {filename}: {e}")

# Deduplicate
unique_members = {}
for m in members:
    k = f"{m['name']}_{m['batch']}"
    # Prefer non -(1) if already exist
    if k not in unique_members:
        unique_members[k] = m

final_members = list(unique_members.values())
final_members.sort(key=lambda x: (x['batch'], x['name']))

json_path = r"D:\vs\VScode\WebDev\Abhinay-IIITP-Web\src\data\members.json"
os.makedirs(os.path.dirname(json_path), exist_ok=True)
with open(json_path, 'w') as f:
    json.dump(final_members, f, indent=2)

print("Done processing images!")
