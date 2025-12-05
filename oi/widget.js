document.addEventListener("DOMContentLoaded", () => {
  const helpBtn = document.getElementById("helpBtn");
  const popup = document.getElementById("widgetPopup");

  if (!helpBtn || !popup) return;

  popup.classList.add("hidden");
  popup.setAttribute("aria-hidden", "true");

  helpBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = popup.classList.contains("hidden");

    if (isHidden) {
      popup.classList.remove("hidden");
      popup.setAttribute("aria-hidden", "false");
      helpBtn.classList.add("active");  // shrink icon
    } else {
      popup.classList.add("hidden");
      popup.setAttribute("aria-hidden", "true");
      helpBtn.classList.remove("active"); // restore size
    }
  });

  document.addEventListener("click", (e) => {
    if (!popup.classList.contains("hidden") && !popup.contains(e.target) && !helpBtn.contains(e.target)) {
      popup.classList.add("hidden");
      popup.setAttribute("aria-hidden", "true");
      helpBtn.classList.remove("active"); // restore size
    }
  });
});
