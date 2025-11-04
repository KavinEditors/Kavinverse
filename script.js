// Scroll fade animation
window.addEventListener("scroll", () => {
  document.querySelectorAll(".fade-section").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 150) el.classList.add("visible");
  });
});
