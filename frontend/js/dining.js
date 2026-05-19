const glow = document.querySelector(".cursor-glow");
const buttons = document.querySelectorAll(".dining-switcher button");
const panels = document.querySelectorAll(".restaurant-panel");

window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
});

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const target = button.dataset.target;

        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        panels.forEach(panel => {
            panel.classList.toggle("active", panel.id === target);
        });
    });
});