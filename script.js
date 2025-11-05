document.addEventListener("DOMContentLoaded", () => {
  console.log("Kavinverse | Interactive Portfolio Active ⚡");

  // Smooth scroll highlight effect for active menu item
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (pageYOffset >= sectionTop) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
});
