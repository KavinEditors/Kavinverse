// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
const orb1 = document.getElementById('orb1');
const orb2 = document.getElementById('orb2');
let mx = 0, my = 0, rx = 0, ry = 0;
let o1x = 0, o1y = 0, o2x = 0, o2y = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animateOrbs() {
  o1x += (mx - 200 - o1x) * 0.05;
  o1y += (my - 200 - o1y) * 0.05;
  o2x += (mx - 150 - o2x) * 0.08;
  o2y += (my - 150 - o2y) * 0.08;
  orb1.style.left = o1x + 'px';
  orb1.style.top  = o1y + 'px';
  orb2.style.left = o2x + 'px';
  orb2.style.top  = o2y + 'px';
  requestAnimationFrame(animateOrbs);
}
animateOrbs();

function animateCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObserver.observe(el));

// ── TYPING ABOUT TEXT ──
const paragraphs = [
  "I am a designer and programmer who turns ideas into visual experiences through creativity and imagination.",
  "Every project I work on is driven by precision, innovation, and meaningful design — making it accurate and efficient.",
  "My approach: understand deeply, design boldly, and craft code that transforms ideas into impactful reality."
];
let pIdx = 0, cIdx = 0;

function typeText() {
  if (pIdx >= paragraphs.length) return;
  const el = document.getElementById('p' + (pIdx + 1));
  if (!el) return;
  const text = paragraphs[pIdx];
  if (cIdx < text.length) {
    el.textContent += text.charAt(cIdx++);
    setTimeout(typeText, 22);
  } else {
    pIdx++;
    cIdx = 0;
    setTimeout(typeText, 350);
  }
}

const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      typeText();
      aboutObserver.disconnect();
    }
  });
}, { threshold: 0.4 });
aboutObserver.observe(document.querySelector('#about'));

// ── ACTIVE NAV HIGHLIGHT ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});
