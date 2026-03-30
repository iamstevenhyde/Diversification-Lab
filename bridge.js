/**
 * bridge.js — Call a free AI model from your terminal.
 * No npm install needed. Uses only Node.js built-in modules.
 *
 * Setup:
 *   1. Get a free API key at https://cloud.cerebras.ai
 *   2. Set it:  set CEREBRAS_API_KEY=your-key-here   (Windows CMD)
 *               $env:CEREBRAS_API_KEY="your-key-here" (PowerShell)
 *               export CEREBRAS_API_KEY=your-key-here  (Mac/Linux)
 *   3. Run:    node bridge.js "What is related diversification?"
 *
 * This is a simplified version of a real AI bridge system.
 * Think of it as OUTSOURCING a task to a specialist AI.
 */

const https = require("https");

const API_KEY = process.env.CEREBRAS_API_KEY || "";

if (!API_KEY) {
  console.log("=".repeat(60));
  console.log("  CEREBRAS_API_KEY not set!\n");
  console.log("  1. Go to https://cloud.cerebras.ai");
  console.log("  2. Create a free account");
  console.log("  3. Copy your API key\n");
  console.log("  Then run one of these in your terminal:\n");
  console.log("  Windows CMD:    set CEREBRAS_API_KEY=csk-your-key-here");
  console.log("  PowerShell:     $env:CEREBRAS_API_KEY=\"csk-your-key-here\"");
  console.log("  Mac/Linux:      export CEREBRAS_API_KEY=csk-your-key-here\n");
  console.log("  Then try again.");
  console.log("=".repeat(60));
  process.exit(1);
}

const prompt = process.argv.slice(2).join(" ");
if (!prompt) {
  console.log("Usage: node bridge.js \"Your question here\"");
  process.exit(1);
}

console.log("\nSending to Cerebras (Qwen 3 235B)...");
console.log("-".repeat(40));

const start = Date.now();

const body = JSON.stringify({
  model: "qwen-3-235b-a22b-instruct-2507",
  messages: [{ role: "user", content: prompt }],
});

const req = https.request(
  {
    hostname: "api.cerebras.ai",
    path: "/v1/chat/completions",
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
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

      if (res.statusCode >= 400) {
        console.log(`API Error ${res.statusCode}: ${data}`);
        if (res.statusCode === 401)
          console.log("Your API key might be wrong. Check it at cloud.cerebras.ai");
        process.exit(1);
      }

      try {
        const text = JSON.parse(data).choices[0].message.content;
        console.log(text);
        console.log("-".repeat(40));
        console.log(`Model: Qwen 3 235B via Cerebras`);
        console.log(`Speed: ${elapsed} seconds`);
        console.log(`Cost:  $0.00 (free tier)`);
      } catch (e) {
        console.log("Error parsing response:", data);
      }
    });
  }
);

req.on("error", (e) => {
  console.log(`Connection error: ${e.message}`);
  console.log("Check your internet connection.");
  process.exit(1);
});

req.write(body);
req.end();
