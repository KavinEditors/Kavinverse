const widget = document.getElementById("aiWidget");
const chatBox = document.getElementById("chatWidget");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");

widget.addEventListener("click", () => {
  chatBox.classList.toggle("hidden");
});

sendBtn.addEventListener("click", async () => {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage("You", text);
  userInput.value = "";

  const res = await fetch("/api/groq-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text }),
  });

  const data = await res.json();
  appendMessage("AI", data.reply || "Error getting response.");
});

function appendMessage(sender, msg) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${msg}`;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}
