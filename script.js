// --- Scroll-triggered animations ---
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
});
document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
document.querySelectorAll('.project').forEach(el => observer.observe(el));

// --- AI Widget & Chat Box ---
const widget = document.getElementById("ai-widget");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");

widget.addEventListener("click", () => {
  chatBox.classList.toggle("visible");
  if (chatBox.classList.contains("visible") && chatMessages.childElementCount === 0) {
    addMessage("bot", "Hello, I'm Kavinverse AI. How can I help you today?");
  }
});

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";

  addMessage("bot", "Typing...");

  try {
    const res = await fetch("/api/groq-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    chatMessages.lastChild.textContent = data.reply;
  } catch {
    chatMessages.lastChild.textContent = "Error: Unable to connect to AI.";
  }
}
