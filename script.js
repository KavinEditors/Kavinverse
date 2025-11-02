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

  // User message bubble
  const userBubble = document.createElement("div");
  userBubble.className = "user-message";
  userBubble.textContent = userMsg;
  chatBody.appendChild(userBubble);
  userInput.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  // Bot loading bubble
  const botBubble = document.createElement("div");
  botBubble.className = "bot-message";
  botBubble.textContent = "Thinking...";
  chatBody.appendChild(botBubble);

  try {
    const response = await fetch("/api/groq-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userMsg })
    });

    const data = await response.json();
    botBubble.textContent = data.reply || "No response received.";
  } catch (err) {
    botBubble.textContent = "Error connecting to AI.";
  }

  chatBody.scrollTop = chatBody.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => e.key === "Enter" && sendMessage());
