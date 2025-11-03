// Fade-in scroll
window.addEventListener("scroll", () => {
  document.querySelectorAll(".fade-in").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 150) el.classList.add("visible");
  });
});

// AI Widget
const aiCircle = document.getElementById("ai-circle");
const chatBox = document.getElementById("chat-box");

aiCircle.addEventListener("click", () => {
  chatBox.classList.toggle("hidden");
});

const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

async function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = msg;
  chatBody.appendChild(userMsg);
  userInput.value = "";

  const botMsg = document.createElement("div");
  botMsg.className = "bot-message";
  botMsg.textContent = "Thinking...";
  chatBody.appendChild(botMsg);
  chatBody.scrollTop = chatBody.scrollHeight;

  try {
    const res = await fetch("/api/groq-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: msg })
    });
    const data = await res.json();
    botMsg.textContent = data.reply || "I'm still processing that.";
  } catch {
    botMsg.textContent = "⚠️ AI connection error.";
  }

  chatBody.scrollTop = chatBody.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => e.key === "Enter" && sendMessage());
