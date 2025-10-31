document.addEventListener("DOMContentLoaded", () => {
  console.log("Kavinverse hero loaded.");

  // Smooth scrolling for nav
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
});
