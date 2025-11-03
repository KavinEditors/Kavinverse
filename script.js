// ---------- Fade Section Animation ----------
window.addEventListener("scroll", () => {
  document.querySelectorAll(".fade-section").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) el.classList.add("visible");
  });
});

// ---------- AI Widget Behavior ----------
const aiCircle = document.getElementById("ai-circle");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

// Toggle widget open/close
if (aiCircle) {
  aiCircle.addEventListener("click", () => {
    chatBox.classList.toggle("hidden");
  });
}

// ---------- Chat Logic ----------
async function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  // Create user bubble (right)
  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = msg;
  chatBody.appendChild(userMsg);

  // Clear input
  userInput.value = "";

  // Create bot placeholder bubble (left)
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
  } catch (e) {
    botMsg.textContent = "⚠️ AI connection error.";
  }

  chatBody.scrollTop = chatBody.scrollHeight;
}

// Send button + Enter key
if (sendBtn) sendBtn.addEventListener("click", sendMessage);
if (userInput) {
  userInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });
}
