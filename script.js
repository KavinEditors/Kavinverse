// UniLink popup toggle
const helpIcon = document.getElementById('help-icon');
const unilinkPopup = document.getElementById('unilink-popup');
if (helpIcon) helpIcon.addEventListener('click', () => {
  unilinkPopup.style.display = unilinkPopup.style.display === 'block' ? 'none' : 'block';
});

// Smooth scrolling for nav links
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Typing effect for hero tagline
const tagline = document.querySelector('.hero p');
const text = "Developer | Programmer | Innovator";
let index = 0;

function typeEffect() {
  if (index < text.length) {
    tagline.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 100);
  }
}

window.addEventListener('load', () => {
  tagline.textContent = '';
  typeEffect();
});
