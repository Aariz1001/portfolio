import requests
import json
import os

API_KEY = "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"

url = "https://openrouter.ai/api/v1/chat/completions"
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

payload = {
    "model": "openai/gpt-5-image",
    "messages": [
        {
            "role": "user",
            "content": "Draw a simple green circle"
        }
    ]
}

print("Sending request...")
res = requests.post(url, headers=headers, json=payload, timeout=180)
print(f"Status: {res.status_code}")
data = res.json()
print(f"Full response keys: {list(data.keys())}")
if 'choices' in data:
    for i, choice in enumerate(data['choices']):
        print(f"\nChoice {i}:")
        msg = choice.get('message', {})
        print(f"  Message keys: {list(msg.keys())}")
        content = msg.get('content')
        print(f"  Content type: {type(content)}")
        if content is None:
            print("  Content is None")
        elif isinstance(content, str):
            print(f"  Content (first 500 chars): {content[:500]}")
        elif isinstance(content, list):
            print(f"  Content is list with {len(content)} items:")
            for j, item in enumerate(content):
                if isinstance(item, dict):
                    print(f"    Item {j}: type={item.get('type')}, keys={list(item.keys())}")
                    if item.get('type') == 'image_url':
                        img_url = item.get('image_url', {}).get('url', '')
                        print(f"      URL prefix: {img_url[:80]}...")
                    elif item.get('type') == 'text':
                        print(f"      Text: {item.get('text', '')[:200]}")
                else:
                    print(f"    Item {j}: {type(item)} = {str(item)[:200]}")
        # Check other keys
        for k in msg.keys():
            if k not in ('content', 'role'):
                val = msg[k]
                print(f"  {k}: {type(val)} = {str(val)[:300]}")
else:
    print(f"No choices. Full response: {json.dumps(data, indent=2)[:2000]}")
