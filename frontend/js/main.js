const navbar = document.querySelector(".navbar");
const cards = document.querySelectorAll(".vitrine-card");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 80);
});

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
    });
});