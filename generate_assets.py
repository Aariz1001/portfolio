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

def generate_image(prompt, filename, model="openai/gpt-5-image"):
    """Generate an image using OpenRouter and save it."""
    payload = {
        "model": model,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }
    
    print(f"Generating: {filename}...")
    try:
        res = requests.post(url, headers=headers, json=payload, timeout=180)
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
                    return True
                elif img_url.startswith('http'):
                    urllib.request.urlretrieve(img_url, f"public/generated/{filename}")
                    print(f"  Saved to public/generated/{filename}")
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


# === 1. AW Logo ===
logo_prompt = """Design a minimal, elegant logo featuring the initials "AW" for a personal portfolio website. The style should be:
- Modern and clean with a sophisticated feel
- Use a rich emerald/sage green color palette (#2d6a4f as primary, with lighter green accents)
- The letters should be intertwined or connected in a creative, memorable way
- Background should be transparent or very light (off-white/cream like #f5f5f0)
- Suitable for use as a small navbar logo (think 40x40px display)
- No extra text, just the "AW" monogram
- Think luxury brand minimalism meets tech elegance
- Square aspect ratio
- Clean crisp edges, vector-like quality"""

generate_image(logo_prompt, "aw_logo.png")
time.sleep(3)

# === 2. Hero background visual ===
hero_prompt = """Create a wide, abstract background image for a portfolio website hero section. The design should be:
- Soft, flowing organic shapes with a nature-inspired feel
- Color palette: light sage greens (#e8f0e8, #d4e4d4), warm cream (#faf8f3), soft moss (#8fbc8f), touches of deeper green (#2d6a4f)  
- Subtle geometric patterns mixed with organic flowing lines
- Think of gentle rolling hills abstracted into smooth gradients and curves
- Very subtle, not distracting — meant as a background behind text
- Wide panoramic landscape orientation (16:9 ratio)
- Light and airy overall feel, like morning light through leaves
- No text, no objects, pure abstract/organic shapes
- Professional and calming"""

generate_image(hero_prompt, "hero_bg.png")
time.sleep(3)

# === 3. Projects section decorative visual ===
projects_prompt = """Create an abstract decorative image for a "Projects" section divider on a portfolio website. The design should:
- Feature interconnected nodes and flowing lines suggesting technology and connections
- Use a green-tinted palette: sage green (#8fbc8f), emerald (#2d6a4f), soft mint (#e0f0e0), cream (#faf8f3)
- Show abstract circuit-board or neural-network inspired patterns
- Light background with the pattern elements in various green shades
- Wide format (roughly 3:1 aspect ratio, like a banner)
- Elegant, minimal, modern aesthetic
- No text
- Suitable as a subtle section separator/decoration"""

generate_image(projects_prompt, "projects_divider.png")
time.sleep(3)

# === 4. Skills section accent visual ===
skills_prompt = """Create an abstract geometric composition representing technology skills and expertise for a portfolio website. The design should:
- Feature stacked, layered abstract shapes suggesting depth and expertise
- Hexagonal or honeycomb patterns subtly integrated
- Color palette: light warm cream background (#faf8f3), with sage green (#8fbc8f), emerald (#2d6a4f), and soft teal (#5f9ea0) accents
- Clean, modern, minimalist aesthetic
- Square aspect ratio
- Feels like a premium tech brand visual
- No text, purely abstract/geometric
- Light and airy, not dark or heavy"""

generate_image(skills_prompt, "skills_accent.png")

print("\nDone! All assets saved to public/generated/")
