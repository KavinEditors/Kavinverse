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
