import requests
import json
import os
import time
import re
import base64
import urllib.request
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

API_KEY = "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"

os.makedirs('public/generated', exist_ok=True)

url = "https://openrouter.ai/api/v1/chat/completions"
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

def generate_image(prompt, filename, model="google/gemini-3.1-flash-image-preview", aspect_ratio="1:1", image_size="4K"):
    """Generate an image using OpenRouter and save it."""
    payload = {
        "model": model,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "modalities": ["image", "text"],
        "image_config": {
            "aspect_ratio": aspect_ratio,
            "image_size": image_size,
        }
    }
    
    print(f"Generating: {filename} (aspect={aspect_ratio}, size={image_size})...")
    try:
        res = requests.post(url, headers=headers, json=payload, timeout=300)
        if res.status_code != 200:
            print(f"Error {res.status_code}: {res.text}")
            return False
            
        res_json = res.json()
        message = res_json.get('choices', [{}])[0].get('message', {})
        
        # GPT-5 Image returns images in message['images'] array
        images = message.get('images', [])
        if images:
            for img_obj in images:
                img_url = ''
                if isinstance(img_obj, dict):
                    img_url = img_obj.get('image_url', {}).get('url', '')
                elif isinstance(img_obj, str):
                    img_url = img_obj
                
                if img_url.startswith('data:image/'):
                    header_part, encoded = img_url.split(",", 1)
                    with open(f"public/generated/{filename}", "wb") as fh:
                        fh.write(base64.b64decode(encoded))
                    print(f"  Saved to public/generated/{filename}")
                    sz = os.path.getsize(f"public/generated/{filename}")
                    print(f"  File size: {sz / 1024:.0f} KB")
                    return True
                elif img_url.startswith('http'):
                    urllib.request.urlretrieve(img_url, f"public/generated/{filename}")
                    print(f"  Saved to public/generated/{filename}")
                    sz = os.path.getsize(f"public/generated/{filename}")
                    print(f"  File size: {sz / 1024:.0f} KB")
                    return True
        
        # Fallback: check content for URLs
        content = message.get('content', '') or ''
        if isinstance(content, str) and content:
            urls = re.findall(r'(https?://[^\s)\]"\']+)', content)
            if urls:
                urllib.request.urlretrieve(urls[0], f"public/generated/{filename}")
                print(f"  Saved to public/generated/{filename}")
                return True
        
        print(f"  No image found. Keys: {list(message.keys())}")
        return False
        
    except Exception as e:
        print(f"  Error: {e}")
        import traceback
        traceback.print_exc()
        return False


# === 1. Hero background — same style, higher res ===
hero_prompt = """Create a VERY HIGH RESOLUTION (make it as detailed and crisp as possible) wide abstract background image for a portfolio website hero section. The design should be:
- Soft, flowing organic wave shapes layered on top of each other with a nature-inspired feel
- Color palette: light sage greens (#e8f0e8, #d4e4d4), warm cream (#faf8f3), soft moss (#8fbc8f), touches of deeper green (#2d6a4f)
- Smooth gradients flowing from top-left (lighter cream/pale green) to bottom-right (richer sage/moss)
- Very subtle dot grid pattern in the lightest areas
- Flowing curves reminiscent of rolling hills abstracted into smooth shapes
- Light and airy overall feel, like morning light through leaves
- No text, no objects, pure abstract organic flowing waves
- Professional, calming, elegant
- Output at maximum resolution possible"""

generate_image(hero_prompt, "hero_bg_hd.png", aspect_ratio="16:9", image_size="4K")
time.sleep(3)

# === 2. Projects section divider — flowing waves matching hero style ===
projects_prompt = """Create a VERY HIGH RESOLUTION abstract decorative banner image that visually matches this style: soft flowing organic wave shapes in sage green tones on a cream background.

Requirements:
- Wide panoramic banner orientation (wider than tall, like 3:1 ratio)
- The waves should flow horizontally, creating a gentle separator/transition effect
- Color palette MUST match: cream (#faf8f3), light sage (#e8f0e8, #d4e4d4), soft moss (#8fbc8f), deeper green (#2d6a4f)
- Flowing organic curves similar to rolling hills, but arranged horizontally as a divider
- The top and bottom edges should fade to near-cream/near-white so it blends seamlessly
- Subtle, elegant, professional — this sits between two content sections
- No text, no icons, pure abstract flowing organic shapes
- Same visual language as layered sage-green waves
- Output at maximum resolution possible"""

generate_image(projects_prompt, "projects_divider_hd.png", aspect_ratio="4:1", image_size="4K")
time.sleep(3)

# === 3. Skills section background — flowing waves matching hero style ===
skills_prompt = """Create a VERY HIGH RESOLUTION abstract background image that visually coheres with soft flowing organic sage-green waves on cream.

Requirements:
- Square aspect ratio
- Flowing organic wave shapes, but with a slightly different composition — waves flowing from bottom-left corner upward to the right
- Color palette MUST match: cream (#faf8f3), light sage (#e8f0e8, #d4e4d4), soft moss (#8fbc8f), touches of deeper green (#2d6a4f)  
- Slightly more layered/complex than the hero — maybe 5-6 overlapping wave layers at different opacities
- Light and airy, the cream/off-white areas dominate (this will be behind text)
- Subtle dot or line texture in some areas for visual interest
- No text, no objects, pure abstract flowing organic shapes
- Same visual family as the hero background — they should look like they belong together
- Output at maximum resolution possible"""

generate_image(skills_prompt, "skills_accent_hd.png", aspect_ratio="16:9", image_size="4K")

print("\nDone! All assets saved to public/generated/")
