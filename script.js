// ===== Scroll-triggered animations =====
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.3 });

reveals.forEach((r) => observer.observe(r));

// ===== AI Widget =====
const aiWidget = document.getElementById("ai-widget");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

aiWidget.onclick = () => {
  chatBox.classList.toggle("hidden");
};

sendBtn.onclick = async () => {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage("user", text);
  userInput.value = "";

  appendMessage("bot", "Thinking...");

  const response = await fetch("/api/groq-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await response.json();
  chatBody.lastChild.remove();
  appendMessage("bot", data.reply);
};

function appendMessage(role, text) {
  const msg = document.createElement("div");
  msg.className = `message ${role}`;
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}
