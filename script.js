/* UniLink toggle */
const helpIcon = document.getElementById("help-icon");
const popup = document.getElementById("unilink-popup");

helpIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  popup.style.display = popup.style.display === "block" ? "none" : "block";
});

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

