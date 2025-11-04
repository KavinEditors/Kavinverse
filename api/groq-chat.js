export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQAPI}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant for the Kavinverse website. You can answer user queries and discuss Kavin's repositories.",
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
