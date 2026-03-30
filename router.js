/**
 * router.js — A "corporate headquarters" that routes tasks to the right AI.
 *
 * Just like a diversified company decides which business unit handles which
 * market, this router decides which AI model handles which type of task.
 *
 * Usage: node router.js
 *
 * YOUR JOB: Look at the routing table below. Does this routing strategy
 * make sense? Would you change it? Why?
 */

const https = require("https");
const readline = require("readline");

// ============================================================
// THE ROUTING TABLE
// This is your "corporate strategy" — which unit handles what?
//
// Think about it:
//   - When do you want SPEED over QUALITY?
//   - When do you want DEPTH over COST?
//   - What if a unit goes down (like Groq running out of credits)?
// ============================================================

const ROUTING_TABLE = {
  quick_analysis: {
    description: "Fast summaries, definitions, simple calculations",
    model: "qwen-3-235b-a22b-instruct-2507",
    provider: "cerebras",
    why: "Speed specialist — sub-second response for routine tasks",
  },
  deep_strategy: {
    description: "Complex strategic analysis, multi-step reasoning",
    model: "qwen-3-235b-a22b-instruct-2507",
    provider: "cerebras",
    why: "For this demo, same model — but in a real system, this routes to a larger model",
  },
  financial: {
    description: "Calculations, valuations, financial modeling",
    model: "qwen-3-235b-a22b-instruct-2507",
    provider: "cerebras",
    why: "Quantitative specialist — structured output for numbers",
  },
};

function classifyTask(input) {
  const lower = input.toLowerCase();
  const financialWords = ["calculate", "valuation", "ebitda", "npv", "revenue", "margin", "price", "cost", "financial", "multiple"];
  const strategyWords = ["analyze", "strategy", "evaluate", "compare", "recommend", "should", "better", "synerg"];

  if (financialWords.some((w) => lower.includes(w))) return "financial";
  if (strategyWords.some((w) => lower.includes(w))) return "deep_strategy";
  return "quick_analysis";
}

function callCerebras(prompt, model) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.CEREBRAS_API_KEY || "";
    if (!apiKey) return reject(new Error("CEREBRAS_API_KEY not set. Run: set CEREBRAS_API_KEY=your-key"));

    const start = Date.now();
    const body = JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
    });

    const req = https.request(
      {
        hostname: "api.cerebras.ai",
        path: "/v1/chat/completions",
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          "User-Agent": "diversification-lab/1.0",
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          const elapsed = ((Date.now() - start) / 1000).toFixed(2);
          if (res.statusCode >= 400) return reject(new Error(`API Error ${res.statusCode}: ${data}`));
          try {
            const text = JSON.parse(data).choices[0].message.content;
            resolve({ text, timing: `${elapsed}s` });
          } catch {
            reject(new Error("Failed to parse response"));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log("=".repeat(60));
  console.log("  DIVERSIFICATION ROUTER");
  console.log("  Your AI 'corporate headquarters'");
  console.log("=".repeat(60));
  console.log();
  console.log("Available routes:");
  for (const [key, route] of Object.entries(ROUTING_TABLE)) {
    console.log(`  [${key}] ${route.description}`);
    console.log(`    -> ${route.provider} (${route.why})`);
  }
  console.log();
  console.log("Type a task and the router will classify + route it.");
  console.log("Type 'quit' to exit.\n");

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const ask = () => {
    rl.question("\nYour task: ", async (task) => {
      task = task.trim();
      if (!task || ["quit", "exit", "q"].includes(task.toLowerCase())) {
        console.log("\nSession complete.");
        rl.close();
        return;
      }

      const taskType = classifyTask(task);
      const route = ROUTING_TABLE[taskType];

      console.log(`\n  Classified as: ${taskType}`);
      console.log(`  Routing to:    ${route.provider} (${route.model})`);
      console.log(`  Reason:        ${route.why}\n`);

      try {
        const { text, timing } = await callCerebras(task, route.model);
        console.log(text);
        console.log(`\n  [Completed in ${timing} | Cost: $0.00]`);
      } catch (e) {
        console.log(`  ERROR: ${e.message}`);
      }

      ask();
    });
  };

  ask();
}

main();
