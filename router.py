"""
router.py — A "corporate headquarters" that routes tasks to the right AI.

This is the strategy layer. Just like a diversified company decides
which business unit handles which market, this router decides which
AI model handles which type of task.

Usage:
  python router.py

It will ask you for a task, classify it, and route it to the best model.

YOUR JOB: Look at the routing table below. Does this routing strategy
make sense? Would you change it? Why?

This is related diversification in code:
  - Same infrastructure (Python, API calls, your terminal)
  - Different specialists (speed model vs. quality model)
  - Shared resources (API keys, prompt format, output handling)
  - Value comes from ROUTING correctly, not just having more models
"""

import os, sys, json, time
from urllib.request import Request, urlopen
from urllib.error import HTTPError

# ============================================================
# THE ROUTING TABLE
# This is your "corporate strategy" — which unit handles what?
#
# Think about it:
#   - When do you want SPEED over QUALITY?
#   - When do you want DEPTH over COST?
#   - What if a unit goes down (like Groq running out of credits)?
# ============================================================

ROUTING_TABLE = {
    "quick_analysis": {
        "description": "Fast summaries, definitions, simple calculations",
        "model": "qwen-3-235b-a22b-instruct-2507",
        "provider": "cerebras",
        "why": "Speed specialist — sub-second response for routine tasks"
    },
    "deep_strategy": {
        "description": "Complex strategic analysis, multi-step reasoning",
        "model": "qwen-3-235b-a22b-instruct-2507",
        "provider": "cerebras",
        "why": "For this demo, same model — but in a real system, this routes to a larger model"
    },
    "financial": {
        "description": "Calculations, valuations, financial modeling",
        "model": "qwen-3-235b-a22b-instruct-2507",
        "provider": "cerebras",
        "why": "Quantitative specialist — structured output for numbers"
    }
}

def classify_task(user_input):
    """Simple keyword-based classifier. A real router uses AI to classify."""
    lower = user_input.lower()
    if any(w in lower for w in ["calculate", "valuation", "ebitda", "npv", "revenue", "margin", "price", "cost", "financial"]):
        return "financial"
    elif any(w in lower for w in ["analyze", "strategy", "evaluate", "compare", "recommend", "should", "better"]):
        return "deep_strategy"
    else:
        return "quick_analysis"

def call_cerebras(prompt, model="qwen-3-235b-a22b-instruct-2507"):
    """Send a prompt to Cerebras and return the response + timing."""
    api_key = os.environ.get("CEREBRAS_API_KEY", "")
    if not api_key:
        return None, "CEREBRAS_API_KEY not set. Run: set CEREBRAS_API_KEY=your-key"

    start = time.time()
    try:
        req = Request(
            "https://api.cerebras.ai/v1/chat/completions",
            data=json.dumps({
                "model": model,
                "messages": [{"role": "user", "content": prompt}]
            }).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
                "User-Agent": "diversification-lab/1.0"
            }
        )
        response = json.loads(urlopen(req, timeout=30).read().decode("utf-8"))
        elapsed = time.time() - start
        text = response["choices"][0]["message"]["content"]
        return text, f"{elapsed:.2f}s"
    except HTTPError as e:
        return None, f"API Error {e.code}"
    except Exception as e:
        return None, str(e)


def main():
    print("=" * 60)
    print("  DIVERSIFICATION ROUTER")
    print("  Your AI 'corporate headquarters'")
    print("=" * 60)
    print()
    print("Available routes:")
    for key, route in ROUTING_TABLE.items():
        print(f"  [{key}] {route['description']}")
        print(f"    → {route['provider']} ({route['why']})")
    print()
    print("Type a task and the router will classify + route it.")
    print("Type 'quit' to exit.")
    print()

    while True:
        task = input("\nYour task: ").strip()
        if task.lower() in ("quit", "exit", "q"):
            break
        if not task:
            continue

        # Classify
        task_type = classify_task(task)
        route = ROUTING_TABLE[task_type]

        print(f"\n  Classified as: {task_type}")
        print(f"  Routing to:    {route['provider']} ({route['model']})")
        print(f"  Reason:        {route['why']}")
        print()

        # Execute
        result, timing = call_cerebras(task, route["model"])
        if result:
            print(result)
            print(f"\n  [Completed in {timing} | Cost: $0.00]")
        else:
            print(f"  ERROR: {timing}")

    print("\nSession complete.")


if __name__ == "__main__":
    main()
