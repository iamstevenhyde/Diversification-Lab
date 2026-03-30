# Diversification Lab: Build Your AI Portfolio

You're going to experience **related diversification** by building one.

Your group already uses different AI tools (Claude, ChatGPT, Gemini). Today you'll connect a **new specialist AI** and figure out when a diversified portfolio creates value vs. when it's just overhead.

This is the same decision a CEO faces: **Should we acquire this company, or are we fine on our own?**

---

## Setup (Do This BEFORE Class)

There are two parts: getting your **bridge** working (everyone) and making sure your **AI agent** works (depends on your tool).

### Part 1: The Bridge (Everyone Does This)

The bridge is a tiny Python script that calls a free AI (Cerebras). Think of it as **acquiring a specialist company**.

#### Step 1: Check that Python works

Open a terminal (Command Prompt, PowerShell, or Terminal) and type:
```
python --version
```

You should see something like `Python 3.11.5`. If you get an error:
- **Windows:** Go to https://python.org/downloads, download, install. CHECK the box that says "Add Python to PATH"
- **Mac:** Python 3 is usually pre-installed. Try `python3 --version` instead

#### Step 2: Get your free Cerebras API key

1. Go to **https://cloud.cerebras.ai**
2. Click **Sign Up** (use your school email or personal email)
3. Once logged in, click **API Keys** in the left sidebar
4. Click **Create API Key**
5. **Copy the key** (it starts with `csk-`)

#### Step 3: Set your API key

**Windows Command Prompt:**
```
set CEREBRAS_API_KEY=csk-paste-your-key-here
```

**Windows PowerShell:**
```
$env:CEREBRAS_API_KEY="csk-paste-your-key-here"
```

**Mac/Linux Terminal:**
```
export CEREBRAS_API_KEY=csk-paste-your-key-here
```

**IMPORTANT:** You must set this key every time you open a new terminal window. If the bridge stops working, this is probably why.

#### Step 4: Download the lab files

**Option A — Git clone (if you have git):**
```
git clone https://github.com/iamstevenhyde/Diversification-Lab.git
cd Diversification-Lab
```

**Option B — Download ZIP:**
Go to https://github.com/iamstevenhyde/Diversification-Lab, click the green **Code** button, click **Download ZIP**, unzip it, and open a terminal in that folder.

#### Step 5: Test it

```
python bridge.py "What is related diversification in one sentence?"
```

**If it works:** You'll see a response in under 1 second with a speed timer at the bottom. You're ready.

**If it doesn't work:** See [Troubleshooting](#troubleshooting) at the bottom.

---

### Part 2: Your AI Agent (Depends on What You Use)

You need to be able to ask your AI a question. Pick whichever one you already have set up:

#### If you use Claude Code (terminal)
```
claude -p "What is related diversification?"
```
If `claude` isn't installed: `npm install -g @anthropic-ai/claude-code` (requires Node.js 18+)

#### If you use Codex (terminal)
```
codex exec "What is related diversification?"
```
If `codex` isn't installed: `npm install -g @openai/codex` (requires Node.js). Note: Windows users may need WSL.

#### If you use Gemini CLI (terminal)
```
gemini -p "What is related diversification?"
```
If `gemini` isn't installed: `npm install -g @google/gemini-cli` (requires Node.js 20+). **Free** with a Google account.

#### If none of the above work (fallback)
Just use the web version of your AI:
- **Claude:** https://claude.ai
- **ChatGPT:** https://chatgpt.com
- **Gemini:** https://gemini.google.com

You can still do the full activity. You'll just type the prompts into your browser instead of the terminal.

---

## In-Class Activity

### Your Group
Each group has members using different AI tools. That means you already have a **diversified AI portfolio** and didn't realize it.

---

### Phase 1: The Baseline (7 min)
**4P Mode: Processor** — AI generates, you evaluate

Each person runs this **exact same prompt** through their own AI:

> Disney acquired Pixar for $7.4 billion in 2006. Pixar had $273M in revenue and 50% EBITDA margins. Disney's internal animation was struggling. Was this related diversification, and did it pass the better-off test? Give me a 3-paragraph analysis.

**Compare across your group:**
- Which AI was fastest?
- Which gave the best analysis?
- Did they disagree on anything?
- Did anyone get something flat-out wrong?

Write down the differences. This is your **pre-integration baseline** — what your portfolio looks like before the acquisition.

---

### Phase 2: Add the Specialist (5 min)
**4P Mode: Planner** — You direct, AI executes

Now run the same prompt through the Cerebras bridge:

```
python bridge.py "Disney acquired Pixar for $7.4 billion in 2006. Pixar had $273M in revenue and 50% EBITDA margins. Disney's internal animation was struggling. Was this related diversification, and did it pass the better-off test? Give me a 3-paragraph analysis."
```

**Compare to your baseline:**
- Speed: Cerebras responds in under 1 second. Your agent probably took 10-30 seconds.
- Quality: Is the analysis better, worse, or different?
- **Does this "acquisition" pass YOUR better-off test?** Is the speed advantage worth the setup effort?

---

### Phase 3: The Router (10 min)
**4P Mode: Prospector** — You explore, AI assists

Run the smart router:
```
python router.py
```

Try three different types of tasks:
1. A quick definition: `Define horizontal integration`
2. A calculation: `Calculate the enterprise value of a company with $500M EBITDA at a 12x multiple`
3. A strategic question: `Should a gym chain acquire a meditation app? Analyze the synergies`

**Group discussion:**
- Open `router.py` in a text editor and look at the routing table (lines 30-50). Does this routing strategy make sense?
- When would you route to a FAST model vs. a SMART model?
- What happens when a model you depend on goes down? (This actually happened — the system used to route to Groq, but Groq ran out of free credits. Sound familiar from the lecture?)
- **How is this routing decision the same as corporate headquarters deciding which business unit handles which market?**

---

### Phase 4: The Meta-Question (5 min)
**4P Mode: Portal** — AI surfaces what you didn't think of

Ask your main AI (whichever tool you use):

> I built a system that routes different tasks to different AI models based on task type. Fast models handle simple tasks, powerful models handle complex analysis. One of the models (Groq) ran out of free credits and had to be replaced. How is managing a portfolio of AI models like managing a diversified company? What are the parallels to related diversification, and what risks does a multi-model strategy have that a single-model strategy doesn't?

Read the response as a group. **The AI's answer IS the lesson.**

---

## Debrief Questions

Discuss as a group:

1. **Better-off test:** Was your analysis better with 4 AI models than with just 1? When specifically?

2. **Cost-of-entry test:** Was the time setting up the bridge + API key worth the benefit? What's the "acquisition cost" of adding a new AI?

3. **Shared resources:** What do all your AI models share? (Same prompts, same data, same user.) How is that like shared resources in a diversified firm?

4. **Integration risk:** Did anything fail? A key not work? A model give bad output? How is that like post-merger integration challenges?

5. **When to outsource vs. integrate:** For which tasks would ONE good AI be better than juggling four? When does diversification destroy value?

---

## Files in This Repo

| File | What It Is |
|------|-----------|
| `bridge.py` | Calls Cerebras AI — the "specialist acquisition" |
| `router.py` | Routes tasks to different models — the "corporate headquarters" |
| `deals/` | Real M&A deal data (Disney+Pixar, Amazon+Whole Foods, Google+Fitbit) |
| `README.md` | You're reading it |

---

## Stretch Goals (If You Finish Early)

- **Add a second bridge:** Sign up at https://console.mistral.ai (free), get an API key, and modify `bridge.py` to call Mistral instead of Cerebras. Now you have 5 models. Was the second acquisition worth it?
- **Modify the router:** Open `router.py` and change the routing table. Add new task categories. What would YOUR corporate strategy look like?
- **Analyze a real deal:** Use your agent to read one of the files in `deals/` and run a full better-off test with synergy NPV calculations.
- **Break it on purpose:** Unset your API key (`set CEREBRAS_API_KEY=`) and run the bridge. That's what synergy decay looks like.

---

## Troubleshooting

**Before asking your professor:** Copy the error message and paste it into your AI agent. Say "I'm trying to run this Python script and got this error. How do I fix it?" Your AI can probably solve it faster than anyone in the room. That's Processor mode.

### "python is not recognized"
- Windows: Install Python from https://python.org/downloads. **CHECK "Add Python to PATH"** during install, then restart your terminal.
- Mac: Try `python3 bridge.py` instead of `python bridge.py`

### "CEREBRAS_API_KEY not set"
You need to set the key every time you open a new terminal. Run the `set` or `export` command from Step 3 again.

### "API Error 401"
Your API key is wrong. Go back to https://cloud.cerebras.ai, check your key, copy it again.

### "API Error 403" or "error code: 1010"
Cloudflare is blocking the request. This sometimes happens on campus WiFi. Try:
- Using your phone as a hotspot
- Asking a group member whose connection works to demo it

### "API Error 429"
Rate limited. You've sent too many requests too fast. Wait 30 seconds and try again.

### "No module named ..."
The bridge uses only Python standard library — no pip install needed. If you're getting import errors, your Python installation might be broken. Try reinstalling Python.

### "git is not recognized"
Use Option B (download ZIP) from the setup instructions instead.

### The bridge works but my CLI agent doesn't
That's fine! Use the web version of your AI (claude.ai, chatgpt.com, or gemini.google.com) for Phases 1 and 4. The bridge is the main activity.

### Nothing works at all
Pair up with someone in your group whose setup is working. Watch what they do. The observation is still valuable — and the fact that integration failed IS the lesson about diversification risk.
