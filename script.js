// Fade-in scroll animation
window.addEventListener("scroll", () => {
  document.querySelectorAll(".fade-section").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 150) el.classList.add("visible");
  });
});

// Select elements
const aiCircle = document.getElementById("ai-circle");
const chatBox = document.getElementById("chat-box");

// Make sure it's hidden on load
window.addEventListener("DOMContentLoaded", () => {
  chatBox.classList.add("hidden");
});

// Toggle chat visibility when AI icon is clicked
aiCircle.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent closing immediately after opening
  chatBox.classList.toggle("hidden");
});

// Close chat when clicking outside
document.addEventListener("click", (e) => {
  if (!chatBox.classList.contains("hidden") && !chatBox.contains(e.target) && !aiCircle.contains(e.target)) {
    chatBox.classList.add("hidden");
  }
});

// Chat Logic
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
