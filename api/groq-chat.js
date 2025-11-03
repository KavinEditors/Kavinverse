// ===============================
// /api/groq-chat.js
// ===============================
// Uses Groq API key stored securely in Vercel Environment Variables
// (Vercel Dashboard → Project Settings → Environment Variables → Key: groqapi)

export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.groqapi}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful personal assistant for the Kavinverse website. You can answer user queries and discuss Kavin's repositories: https://github.com/KavinEditors/Kavinverse, https://github.com/KavinEditors/NEXA-Next-gen-Executive-Assistant, https://github.com/KavinEditors/R.O.A.S.T, https://github.com/KavinEditors/SussyCommentor.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices?.[0]?.message?.content || "No reply." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Error reaching AI service." });
  }
}
