const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
    card.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        card.classList.add("active");
    });
});

window.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        nav.style.background = "rgba(0,0,0,0.4)";
        nav.style.backdropFilter = "blur(5px)";
    } else {
        nav.style.background = "transparent";
    }
});