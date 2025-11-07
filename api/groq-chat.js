// This is a placeholder serverless handler for Vercel / Netlify style deployments.
// It expects the environment variable name to be `groqapi` (process.env.groqapi).
// It does not run in the browser; it's for server-side API routes.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message } = req.body || {};
  const groqKey = process.env.groqapi;

  if (!groqKey) {
    return res.status(500).json({ error: "Missing groqapi environment variable." });
  }

  try {
    // Example POST to Groq chat completions endpoint
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await r.json();
    // safe guard if structure differs:
    const reply = data?.choices?.[0]?.message?.content ?? data?.reply ?? JSON.stringify(data);
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: "Groq API error", details: err.message });
  }
}
