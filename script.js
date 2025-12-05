document.addEventListener("DOMContentLoaded", () => {
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

  // Starfield generation
  const numStars = 120;
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.opacity = Math.random() * 0.8 + 0.2;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    document.body.appendChild(star);
  }
});
