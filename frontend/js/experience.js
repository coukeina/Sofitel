const cards = document.querySelectorAll(".atlas-card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
        }
    });
}, {
    threshold: 0.2
});

cards.forEach(card => observer.observe(card));