export default async function handler(req, res) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.groqapi}`, // 👈 Your Vercel secret
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: `You are a personal assistant of a website named Kavinverse.
You can guide users about my projects:
https://github.com/KavinEditors/Kavinverse,
https://github.com/KavinEditors/NEXA-Next-gen-Executive-Assistant,
https://github.com/KavinEditors/R.O.A.S.T,
https://github.com/KavinEditors/SussyCommentor.
Be concise, engaging, and always helpful.`,
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ reply: "Error connecting to Groq API." });
  }
}
