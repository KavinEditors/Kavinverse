// =============== Scroll Reveal Animations ===============
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    const revealPoint = 150;
    if (revealTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// =============== AI Chat Widget ===============
const widget = document.getElementById("ai-widget");
const chatBox = document.getElementById("chat-box");
const chatBody = document.getElementById("chat-body");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Toggle chat visibility
widget.addEventListener("click", () => {
  chatBox.classList.toggle("hidden");
  setTimeout(() => chatBox.classList.toggle("visible"), 10);
});

// Handle send message
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;
  appendMessage("user", message);
  userInput.value = "";

  // Typing effect placeholder
  const loadingMsg = appendMessage("bot", "...");
  try {
    const res = await fetch("/api/groq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    loadingMsg.textContent = data.reply || "Error getting response.";
  } catch (err) {
    loadingMsg.textContent = "⚠️ Unable to reach AI server.";
  }
}

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
  return msg;
}
