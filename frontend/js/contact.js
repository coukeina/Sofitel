// src/pages/Contact.js

import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Votre message a bien été envoyé ✨");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-overlay">
        <div className="contact-container">
          <h1>Contact Us</h1>
          <p>
            Une question, une demande spéciale ou besoin d’assistance ?
            Notre équipe Sofitel est à votre disposition.
          </p>

          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Votre nom"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Sujet"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Votre message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Envoyer</button>
          </form>

          <div className="contact-info">
            <div className="info-box">
              <h3>Téléphone</h3>
              <p>+33 1 40 00 00 00</p>
            </div>

            <div className="info-box">
              <h3>Email</h3>
              <p>contact@sofitel.com</p>
            </div>

            <div className="info-box">
              <h3>Adresse</h3>
              <p>Paris, France</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;