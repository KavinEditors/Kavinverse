export default async function handler(req, res) {
  const { message } = req.body;
  const repos = [
    "https://github.com/KavinEditors/Kavinverse",
    "https://github.com/KavinEditors/NEXA-Next-gen-Executive-Assistant",
    "https://github.com/KavinEditors/R.O.A.S.T",
    "https://github.com/KavinEditors/SussyCommentor"
  ];

  const context = `You are a personal assistant for the website 'Kavinverse'. 
  Provide helpful, short, and informative responses about projects, design, and code.
  Available repos: ${repos.join(", ")}.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.groqapi}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: context },
        { role: "user", content: message }
      ],
    }),
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}
