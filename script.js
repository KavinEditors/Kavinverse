// Intersection Observer scroll reveals + direction control
document.addEventListener("DOMContentLoaded", () => {
  // Elements to observe
  const revealEls = document.querySelectorAll('.reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.25 });

  revealEls.forEach(el => observer.observe(el));

  // Additional: ensure hero fades in on load
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.opacity = 0;
    hero.style.transform = "translateY(10px)";
    setTimeout(() => {
      hero.style.transition = "opacity .6s ease, transform .6s ease";
      hero.style.opacity = 1;
      hero.style.transform = "translateY(0)";
    }, 80);
  }
});
