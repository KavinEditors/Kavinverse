document.addEventListener("DOMContentLoaded", () => {
  const helpBtn = document.getElementById("helpBtn");
  const popup = document.getElementById("widgetPopup");

  if (!helpBtn || !popup) return;

  popup.classList.add("hidden");
  popup.setAttribute("aria-hidden", "true");

  helpBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    popup.classList.toggle("hidden");
    helpBtn.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!popup.classList.contains("hidden") && !popup.contains(e.target) && !helpBtn.contains(e.target)) {
      popup.classList.add("hidden");
      helpBtn.classList.remove("active");
    }
  });
});
