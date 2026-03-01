document.addEventListener("DOMContentLoaded", () => {
  const pieces = document.querySelectorAll(".piece");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  pieces.forEach(piece => observer.observe(piece));
});
