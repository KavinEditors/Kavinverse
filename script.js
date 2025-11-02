// Scroll-triggered animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      entry.target.querySelectorAll('.slide-left, .slide-right, .slide-up').forEach(el => el.classList.add('active'));
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.fade-section').forEach(section => observer.observe(section));

// AI Widget toggle
const aiCircle = document.getElementById('ai-circle');
const chatBox = document.getElementById('chat-box');

aiCircle.addEventListener('click', () => {
  chatBox.classList.toggle('show');
});

// Chat interaction
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBody = document.getElementById('chat-body');

async function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'user-message';
  userMsgDiv.textContent = msg;
  chatBody.appendChild(userMsgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;

  userInput.value = '';

  const botMsgDiv = document.createElement('div');
  botMsgDiv.className = 'bot-message';
  botMsgDiv.textContent = 'Thinking...';
  chatBody.appendChild(botMsgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;

  try {
    const res = await fetch('/api/groq-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg })
    });
    const data = await res.json();
    botMsgDiv.textContent = data.reply;
  } catch (err) {
    botMsgDiv.textContent = 'Error fetching response.';
  }

  chatBody.scrollTop = chatBody.scrollHeight;
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});
