document.addEventListener("DOMContentLoaded", () => {
  const helpBtn = document.getElementById("helpBtn");
  const popup = document.getElementById("widgetPopup");

  if (!helpBtn || !popup) return;

  // Initialize hidden state
  popup.classList.add("hidden");
  popup.setAttribute("aria-hidden", "true");

  helpBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = popup.classList.contains("hidden");
    if (isHidden) {
      popup.classList.remove("hidden");
      popup.setAttribute("aria-hidden", "false");
    } else {
      popup.classList.add("hidden");
      popup.setAttribute("aria-hidden", "true");
    }
  });

  // Clicking outside closes popup
  document.addEventListener("click", (e) => {
    if (!popup.classList.contains("hidden")) {
      if (!popup.contains(e.target) && !helpBtn.contains(e.target)) {
        popup.classList.add("hidden");
        popup.setAttribute("aria-hidden", "true");
      }
    }
  });
});
