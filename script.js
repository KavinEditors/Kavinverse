const chatIcon = document.getElementById("chat-icon");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input");
const chatBody = document.getElementById("chat-body");

// Open/close chat on icon click
chatIcon.addEventListener("click", () => {
  chatBox.classList.toggle("hidden");
});

// Send message
sendBtn.addEventListener("click", () => {
  const message = chatInput.value.trim();
  if (!message) return;

  // user message
  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = message;
  chatBody.appendChild(userMsg);
  chatInput.value = "";

  // scroll stays inside widget
  chatBody.scrollTop = chatBody.scrollHeight;

  // simulate AI reply
  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "bot-message";
    botMsg.textContent = "Processing your request...";
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 600);
});
