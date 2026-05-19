const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if (!user || !token) {
    window.location.href = "login.html";
}

document.getElementById("welcomeText").innerText = `Welcome back, ${user.fullName}.`;

document.getElementById("profileName").innerText = user.fullName;
document.getElementById("profileEmail").innerText = user.email;
document.getElementById("profileRole").innerText = user.role;
document.getElementById("profileStatus").innerText = user.isVerified ? "Verified" : "Pending email verification";

const tabButtons = document.querySelectorAll(".tab-btn");
const tabs = document.querySelectorAll(".account-tab");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const target = button.dataset.tab;

        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabs.forEach(tab => tab.classList.remove("active"));

        button.classList.add("active");
        document.getElementById(target).classList.add("active");
    });
});

async function loadMyReservations() {
    const reservationList = document.getElementById("reservationList");

    try {
        const response = await fetch("http://localhost:5000/api/bookings/my", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const bookings = await response.json();

        if (bookings.length === 0) {
            reservationList.innerHTML = `<p class="empty-text">No reservations yet.</p>`;
            return;
        }

        reservationList.innerHTML = bookings.map(booking => `
            <div class="reservation-card">
                <span>${booking.status}</span>
                <h3>${booking.room_type}</h3>
                <p>
                    ${booking.check_in} → ${booking.check_out}<br>
                    ${booking.nights} night(s) · ${booking.adults} adult(s) · ${booking.children} child(ren)<br>
                    Estimated total: ${booking.estimated_total}€
                </p>
            </div>
        `).join("");

    } catch (error) {
        reservationList.innerHTML = `<p class="empty-text">Unable to load reservations.</p>`;
    }
}

loadMyReservations();

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";
});