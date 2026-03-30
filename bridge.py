"""
bridge.py — Call a free AI model from your terminal.
No pip install needed. Uses only Python standard library.

Setup:
  1. Get a free API key at https://cloud.cerebras.ai
  2. Set it:  set CEREBRAS_API_KEY=your-key-here   (Windows)
              export CEREBRAS_API_KEY=your-key-here (Mac/Linux)
  3. Run:    python bridge.py "What is related diversification?"

This is a simplified version of a real AI bridge system.
Think of it as OUTSOURCING a task to a specialist AI.
"""

import os, sys, json, time
from urllib.request import Request, urlopen
from urllib.error import HTTPError

API_KEY = os.environ.get("CEREBRAS_API_KEY", "")

if not API_KEY:
    print("=" * 60)
    print("  CEREBRAS_API_KEY not set!")
    print()
    print("  1. Go to https://cloud.cerebras.ai")
    print("  2. Create a free account")
    print("  3. Copy your API key")
    print("  4. Run this in your terminal:")
    print()
    print("     set CEREBRAS_API_KEY=paste-your-key-here")
    print()
    print("  Then try again.")
    print("=" * 60)
    sys.exit(1)

# Get the prompt from command line args or ask for it
if len(sys.argv) > 1:
    prompt = " ".join(sys.argv[1:])
else:
    prompt = input("Enter your prompt: ")

if not prompt.strip():
    print("No prompt provided.")
    sys.exit(1)

print(f"\nSending to Cerebras (Qwen 3 235B)...")
print("-" * 40)

start = time.time()

try:
    req = Request(
        "https://api.cerebras.ai/v1/chat/completions",
        data=json.dumps({
            "model": "qwen-3-235b-a22b-instruct-2507",
            "messages": [{"role": "user", "content": prompt}]
        }).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "User-Agent": "diversification-lab/1.0"
        }
    )

    response = json.loads(urlopen(req, timeout=30).read().decode("utf-8"))
    elapsed = time.time() - start

    text = response["choices"][0]["message"]["content"]
    print(text)
    print("-" * 40)
    print(f"Model: Qwen 3 235B via Cerebras")
    print(f"Speed: {elapsed:.2f} seconds")
    print(f"Cost:  $0.00 (free tier)")

except HTTPError as e:
    print(f"API Error {e.code}: {e.read().decode('utf-8', errors='replace')}")
    if e.code == 401:
        print("Your API key might be wrong. Check it at cloud.cerebras.ai")
    sys.exit(1)
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
