const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
});

const form = document.getElementById("bookingForm");
const roomType = document.getElementById("roomType");
const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");
const nightCount = document.getElementById("nightCount");
const totalPrice = document.getElementById("totalPrice");

function calculatePrice() {
    const selected = roomType.options[roomType.selectedIndex];
    const price = Number(selected.dataset.price);

    const start = new Date(checkIn.value);
    const end = new Date(checkOut.value);

    if (!checkIn.value || !checkOut.value || end <= start) {
        nightCount.textContent = "0 nights";
        totalPrice.textContent = "0€";
        return { nights: 0, total: 0 };
    }

    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const total = nights * price;

    nightCount.textContent = `${nights} night${nights > 1 ? "s" : ""}`;
    totalPrice.textContent = `${total}€`;

    return { nights, total };
}

roomType.addEventListener("change", calculatePrice);
checkIn.addEventListener("change", calculatePrice);
checkOut.addEventListener("change", calculatePrice);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const priceInfo = calculatePrice();

    if (priceInfo.nights === 0) {
        alert("Please select valid check-in and check-out dates.");
        return;
    }

    const booking = {
        id: Date.now(),
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        roomType: roomType.value,
        checkIn: checkIn.value,
        checkOut: checkOut.value,
        adults: document.getElementById("adults").value,
        children: document.getElementById("children").value,
        message: document.getElementById("message").value,
        nights: priceInfo.nights,
        estimatedTotal: priceInfo.total,
        status: "Pending"
    };

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(booking);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    window.location.href = "admin.html";
});