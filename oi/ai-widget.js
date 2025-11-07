const widget = document.getElementById("aiWidget");
const chatBox = document.getElementById("chatWidget");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");

// Toggle open/close on click
widget.addEventListener("click", () => {
  if (chatBox.classList.contains("hidden")) {
    chatBox.classList.remove("hidden");
    chatBox.style.opacity = "1";
  } else {
    chatBox.classList.add("hidden");
    chatBox.style.opacity = "0";
  }
});

// Send message to Groq API
sendBtn.addEventListener("click", async () => {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage("You", text);
  userInput.value = "";

  try {
    const res = await fetch("/api/groq-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    appendMessage("AI", data.reply || "Error getting response.");
  } catch {
    appendMessage("AI", "⚠️ Connection error. Please try again.");
  }
});

function appendMessage(sender, msg) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${msg}`;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}
