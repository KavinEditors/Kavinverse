// Fade-in on load + scroll
function runFade() {
  document.querySelectorAll('.fade-section').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight - 100) el.classList.add('visible');
  });
}
window.addEventListener('load', runFade);
window.addEventListener('scroll', runFade);

// AI widget elements
const aiCircle = document.getElementById('ai-circle');
const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBody = document.getElementById('chat-body');

// Defensive checks
if (!aiCircle) console.warn('ai-circle element not found');
if (!chatBox) console.warn('chat-box element not found');
if (!sendBtn) console.warn('send-btn element not found');

// Toggle open/close with animation, focus input when opened
aiCircle?.addEventListener('click', () => {
  chatBox.classList.toggle('active');
  const open = chatBox.classList.contains('active');
  chatBox.setAttribute('aria-hidden', open ? 'false' : 'true');
  if (open) userInput?.focus();
});

// Send message
async function sendMessage() {
  const msg = userInput?.value?.trim();
  if (!msg) return;

  // user bubble (right)
  const u = document.createElement('div');
  u.className = 'user-message';
  u.textContent = msg;
  chatBody.appendChild(u);

  // clear input
  userInput.value = '';

  // bot placeholder (left)
  const b = document.createElement('div');
  b.className = 'bot-message';
  b.textContent = 'Thinking...';
  chatBody.appendChild(b);

  chatBody.scrollTop = chatBody.scrollHeight;

  try {
    const res = await fetch('/api/groq-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: msg })
    });
    const data = await res.json();
    b.textContent = data.reply || 'No reply.';
  } catch (err) {
    console.error(err);
    b.textContent = '⚠️ AI connection error.';
  }

  chatBody.scrollTop = chatBody.scrollHeight;
}

// Events
sendBtn?.addEventListener('click', sendMessage);
userInput?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});
