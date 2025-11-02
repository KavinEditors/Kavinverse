// Scroll animations
window.addEventListener("scroll", () => {
  document.querySelectorAll("section, .project-row").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 150) el.classList.add("visible");
  });
});

// AI Widget
const aiCircle = document.getElementById("ai-circle");
const chatBox = document.getElementById("chat-box");
aiCircle.addEventListener("click", () => chatBox.classList.toggle("hidden"));

const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

async function sendMessage() {
  const userMsg = userInput.value.trim();
  if (!userMsg) return;

  const userBubble = document.createElement("div");
  userBubble.className = "user-message";
  userBubble.textContent = userMsg;
  chatBody.appendChild(userBubble);
  userInput.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  const botBubble = document.createElement("div");
  botBubble.className = "bot-message";
  botBubble.textContent = "Thinking...";
  chatBody.appendChild(botBubble);

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VERCEL_GROQAPI}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are a helpful personal assistant for a developer’s website. Repos: https://github.com/KavinEditors/Kavinverse, https://github.com/KavinEditors/NEXA-Next-gen-Executive-Assistant, https://github.com/KavinEditors/R.O.A.S.T, https://github.com/KavinEditors/SussyCommentor" },
          { role: "user", content: userMsg }
        ]
      })
    });

    const data = await response.json();
    botBubble.textContent = data.choices?.[0]?.message?.content || "No response.";
  } catch (err) {
    botBubble.textContent = "Error connecting to AI.";
  }
  chatBody.scrollTop = chatBody.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => e.key === "Enter" && sendMessage());
