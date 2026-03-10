/* UniLink toggle */
const helpIcon = document.getElementById("help-icon");
const popup = document.getElementById("unilink-popup");
const uniLink = document.getElementById("unilink-btn");

let lastClick = 0;

/* UniLink double-click open */
if (uniLink) {
  uniLink.addEventListener("click", function (e) {
    e.preventDefault();

    const now = Date.now();

    if (now - lastClick < 400) {
      window.open("https://pagenotfound-phi.vercel.app/", "_blank");
    }

    lastClick = now;
  });
}

/* Help icon popup toggle */
helpIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  popup.style.display = popup.style.display === "block" ? "none" : "block";
});

/* Close popup when clicking outside */
document.addEventListener("click", () => {
  popup.style.display = "none";
});

/* Scroll reveal */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.2 });

document.querySelectorAll(".hero-text, .project, .project-image")
  .forEach(el => observer.observe(el));
