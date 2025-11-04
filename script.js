// ---- Scroll Animation Logic ----
const fadeSections = document.querySelectorAll(".fade-section, .slide-left, .slide-right, .slide-up");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

fadeSections.forEach((section) => observer.observe(section));

// ---- Smooth Nav Scroll ----
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
  });
});

// ---- Hero Glow Animation ----
const glow = document.querySelector(".circle-glow");
setInterval(() => {
  glow.style.boxShadow = `0 0 ${Math.random() * 30 + 20}px rgba(0, 188, 212, 0.8)`;
}, 600);
