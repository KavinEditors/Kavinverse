// ===== Kavinverse AI Widget =====
const aiCircle = document.getElementById("ai-circle");
const chatBox = document.getElementById("chat-box");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// Toggle open/close
aiCircle.addEventListener("click", () => {
  chatBox.classList.toggle("hidden");
  if (!chatBox.classList.contains("hidden")) chatInput.focus();
});

// Send button or Enter key
sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const prompt = chatInput.value.trim();
  if (!prompt) return;

  addMessage("user", prompt);
  chatInput.value = "";
  const loading = addMessage("bot", "Thinking...");

  try {
    const response = await fetch("/api/groq-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    chatBody.removeChild(loading);
    addMessage("bot", data.reply);
  } catch (error) {
    chatBody.removeChild(loading);
    addMessage("bot", "⚠️ Error connecting to AI.");
  }
}

function addMessage(role, text) {
  const div = document.createElement("div");
  div.classList.add(role === "user" ? "user-message" : "bot-message");
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
  return div;
}
