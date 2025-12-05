// Toggle UniLink popup
const helpIcon = document.getElementById('help-icon');
const unilinkPopup = document.getElementById('unilink-popup');

helpIcon.addEventListener('click', () => {
  unilinkPopup.style.display =
    unilinkPopup.style.display === 'block' ? 'none' : 'block';
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

document.querySelectorAll('.project, .hero-text, .project-image')
  .forEach(el => observer.observe(el));

// Generate starfield
const numStars = 100;
for (let i = 0; i < numStars; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.width = `${Math.random()*2+1}px`;
  star.style.height = star.style.width;
  star.style.top = `${Math.random()*100}%`;
  star.style.left = `${Math.random()*100}%`;
  document.body.appendChild(star);
}
