// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// AI widget hover pulse (handled by CSS but we can extend later)
const aiWidget = document.querySelector('.ai-widget');
aiWidget.addEventListener('click', () => {
  alert("AI Widget Placeholder — will connect to groq-chat.js soon.");
});
