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

/* Scroll reveal – directional & repeatable */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show"); // re-trigger on re-entry
      }
    });
  },
  { threshold: 0.25 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
