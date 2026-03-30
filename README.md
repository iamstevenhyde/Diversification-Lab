# Diversification Lab: Build Your First Harness

Today you're going to **build your first AI harness** — a system where your agent connects to a new specialist AI and learns when to use it.

This is **related diversification in action.** Your agent is the core business. The free API is the acquisition. The config file you write is your corporate strategy.

---

## The Activity

### Phase 1: Scout Your Target (3 min)

Open [FREE_AI_MENU.md](FREE_AI_MENU.md) and pick one free AI to connect to.

| | Cerebras | Mistral | Google AI Studio | Groq |
|---|---|---|---|---|
| **Best at** | Speed (<1 sec) | Code & structure | Huge context | Open-source models |
| **Sign up** | cloud.cerebras.ai | console.mistral.ai | aistudio.google.com | console.groq.com |

**Pick one. 30 seconds. Gut instinct.** There is no wrong answer — different companies acquire different specialists based on their strategy.

---

### Phase 2: Integrate (12 min)

Open your AI agent (Claude Code, Codex, Gemini CLI, or even claude.ai / chatgpt.com in a browser) and give it this prompt. Fill in the blanks with your choice:

> I want to connect to the **[Cerebras / Mistral / Google AI Studio / Groq]** API. It's free — sign up at **[URL from the menu]**.
>
> Help me:
> 1. Sign up and get an API key (walk me through it step by step)
> 2. Write a script that calls their API with a prompt and prints the response with timing
> 3. Set up the API key in my terminal
> 4. Test it by analyzing this: "Disney acquired Pixar for $7.4 billion in 2006. Pixar had $273M in revenue and 50% EBITDA margins. Was this related diversification? Did it pass the better-off test?"
>
> I'm on Windows using [Command Prompt / PowerShell / Git Bash]. I have Node.js installed.

**Then follow your agent's instructions.** It will write the code. It will tell you where to sign up. It will help you set the key. It will debug when things break.

Your only manual steps: sign up on the website, copy the API key, paste it back.

**If things break:** That's normal. Ask your agent to fix it. That's what agents do. And that's what post-merger integration feels like.

---

### Phase 3: Write Your Strategy (5 min)

Now tell your agent:

> Write me a config file for this project folder. [If using Claude Code: write a CLAUDE.md. If using Codex: write an AGENTS.md. If using Gemini: write a GEMINI.md.]
>
> Include rules for when you should use **[your chosen API]** vs. handling tasks yourself. Think about:
> - What is the API good at? (speed? code? large documents?)
> - What are YOU better at? (reasoning? creativity? multi-step analysis?)
> - When should you route to the specialist vs. do the work yourself?
> - What happens if the API goes down or runs out of free credits?

**Read what your agent writes.** Edit it if you disagree. This is YOUR corporate strategy document — the rules about how your diversified AI portfolio operates.

---

### Phase 4: Test Your Strategy (5 min)

With your config file active, try these tasks and see if the routing makes sense:

1. **A quick lookup:** "Define vertical integration in one sentence"
2. **A calculation:** "A company has $200M EBITDA. At a 10x multiple, what's the enterprise value? If synergies are worth $50M/year for 5 years at a 10% discount rate, what's the max acquisition price?"
3. **A strategic analysis:** "Should Amazon have acquired Whole Foods for $13.7B? Apply the better-off test and cost-of-entry test."

**Does your strategy work?** Did the specialist add value? Or would one AI have been fine?

---

## Debrief Questions

Discuss with your group:

1. **Read your config file out loud.** What routing rules did you write? That's your corporate strategy.

2. **Better-off test:** Was the specialist actually better for any tasks? Which ones?

3. **Cost-of-entry test:** Was the signup + integration time worth it? What's the "acquisition cost" of adding a new AI?

4. **Integration risk:** What broke? How did your agent fix it? How is that like post-merger integration?

5. **Strategic choice:** Who in your group picked the same API? Who picked differently? Why? (There's no single right diversification strategy.)

---

## What You Walk Out With

You now have a **working AI harness** with:
- Your main agent (the core business)
- A specialist API connection (the acquisition)
- A config file with routing rules (the corporate strategy)

This is yours to keep and build on. Add more APIs. Refine your routing rules. That's how a diversified company evolves.

---

## Stretch Goals (If You Finish Early)

- **Second acquisition:** Sign up for a SECOND free API from the menu. Add it to your config file. Is the second acquisition worth it, or is it just complexity?
- **Analyze a real deal:** Ask your agent to read one of the files in `deals/` and run a full better-off test with synergy NPV calculations.
- **Compare across your group:** Have everyone run the same prompt through their specialist. Whose "acquisition" created the most value?

---

## If Things Go Wrong

**Your agent is your first line of support.** If something breaks, tell your agent: "I got this error: [paste error]. Help me fix it."

That's not a workaround — that's **Processor mode** (AI handles routine problem-solving while you focus on the strategic decision). Using your AI to fix your AI integration is itself a lesson about leveraging existing capabilities.

If your agent can't fix it, pair with someone whose setup is working. The observation is still valuable — and integration failure IS the lesson about diversification risk.
