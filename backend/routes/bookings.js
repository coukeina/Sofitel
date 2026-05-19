const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", (req, res) => {
    const sql = `
        INSERT INTO bookings
        (full_name, email, phone, room_type, check_in, check_out, adults, children, message, nights, estimated_total, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        req.body.fullName,
        req.body.email,
        req.body.phone,
        req.body.roomType,
        req.body.checkIn,
        req.body.checkOut,
        req.body.adults,
        req.body.children,
        req.body.message,
        req.body.nights,
        req.body.estimatedTotal,
        "Pending"
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
            message: "Booking saved successfully",
            id: result.insertId
        });
    });
});

router.get("/", (req, res) => {
    db.query("SELECT * FROM bookings ORDER BY created_at DESC", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
});

module.exports = router;