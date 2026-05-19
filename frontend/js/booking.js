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

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login before making a reservation.");
        window.location.href = "login.html";
        return;
    }

    const priceInfo = calculatePrice();

    if (priceInfo.nights === 0) {
        alert("Please select valid check-in and check-out dates.");
        return;
    }

    const booking = {
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
        estimatedTotal: priceInfo.total
    };

    try {

        const response = await fetch("http://localhost:5000/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(booking)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Booking request failed");
        }

        alert("Reservation request sent successfully!");

        form.reset();
        calculatePrice();

    } catch (error) {
        alert("Error while sending reservation.");
        console.error(error);
    }
});