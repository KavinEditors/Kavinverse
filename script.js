const chatIcon = document.getElementById("chat-icon");
const chatBox = document.getElementById("chat-box");
const closeChat = document.getElementById("close-chat");
const chatBody = document.getElementById("chat-body");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");

// Toggle chat open
chatIcon.addEventListener("click", () => {
  chatBox.classList.remove("hidden");
});

// Close chat box
closeChat.addEventListener("click", () => {
  chatBox.classList.add("hidden");
});

// Send message
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  const userMsg = document.createElement("div");
  userMsg.classList.add("msg", "user");
  userMsg.textContent = text;
  chatBody.appendChild(userMsg);

  userInput.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  // Fake AI reply (replace this part with your actual Groq API)
  setTimeout(() => {
    const aiMsg = document.createElement("div");
    aiMsg.classList.add("msg", "ai");
    aiMsg.textContent = "🤖 Thinking... (Replace this with Groq API reply)";
    chatBody.appendChild(aiMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 800);
}
