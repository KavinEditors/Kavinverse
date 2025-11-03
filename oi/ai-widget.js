// ===========================
// Kavinverse AI Widget Script
// ===========================

const aiCircle = document.getElementById("ai-circle");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

// Start with widget closed
window.addEventListener("load", () => {
  chatBox.classList.add("hidden");
});

// Toggle chat open/close
aiCircle.addEventListener("click", () => {
  chatBox.classList.toggle("hidden");
  if (!chatBox.classList.contains("hidden")) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
});

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
      body: JSON.stringify({ prompt: msg }),
    });
    const data = await res.json();
    botMsg.textContent = data.reply || "No reply.";
  } catch {
    botMsg.textContent = "⚠️ AI connection error.";
  }

  chatBody.scrollTop = chatBody.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => e.key === "Enter" && sendMessage());
