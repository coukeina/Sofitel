const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../config/db");

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        return res.status(403).json({ message: "Invalid token" });
    }
}

router.post("/", verifyToken, (req, res) => {
    const sql = `
        INSERT INTO bookings
        (user_id, full_name, email, phone, room_type, check_in, check_out, adults, children, message, nights, estimated_total, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        req.user.id,
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
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({
            message: "Booking saved successfully",
            id: result.insertId
        });
    });
});

router.get("/my", verifyToken, (req, res) => {
    db.query(
        "SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC",
        [req.user.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
});

router.get("/", (req, res) => {
    db.query("SELECT * FROM bookings ORDER BY created_at DESC", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;